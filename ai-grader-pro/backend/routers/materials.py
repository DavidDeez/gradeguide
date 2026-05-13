"""
Materials router — upload, list, and delete course materials.
"""

import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime

from database import get_db
from models import User, Course, CourseMaterial
from routers.auth import require_lecturer, get_current_user
from services.file_processor import extract_text_from_file, chunk_text
from config import UPLOAD_DIR, MAX_FILE_SIZE_MB, ALLOWED_EXTENSIONS

router = APIRouter(prefix="/api", tags=["Materials"])


# --- Schemas ---

class MaterialResponse(BaseModel):
    id: int
    course_id: int
    filename: str
    file_type: str
    file_size_bytes: int
    uploaded_at: datetime | None = None
    text_preview: str = ""

    class Config:
        from_attributes = True


# --- Endpoints ---

@router.post("/courses/{course_id}/materials", response_model=MaterialResponse, status_code=status.HTTP_201_CREATED)
async def upload_material(
    course_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(require_lecturer),
    db: Session = Depends(get_db)
):
    """Upload a course material file (PDF, DOCX, or TXT)."""
    # Verify course exists and belongs to lecturer
    course = db.query(Course).filter(
        Course.id == course_id,
        Course.lecturer_id == current_user.id
    ).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found or not owned by you")

    # Validate file extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{ext}'. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    # Read file content and check size
    content = await file.read()
    file_size = len(content)
    if file_size > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE_MB} MB"
        )

    # Save file to disk
    course_dir = os.path.join(UPLOAD_DIR, str(course_id))
    os.makedirs(course_dir, exist_ok=True)
    file_path = os.path.join(course_dir, file.filename)

    with open(file_path, "wb") as f:
        f.write(content)

    # Extract text
    try:
        extracted_text = extract_text_from_file(file_path)
    except Exception as e:
        # Clean up file if extraction fails
        os.remove(file_path)
        raise HTTPException(status_code=400, detail=f"Failed to extract text from file: {str(e)}")

    if not extracted_text.strip():
        os.remove(file_path)
        raise HTTPException(status_code=400, detail="No text could be extracted from this file. It may be scanned/image-based.")

    # Save to database
    material = CourseMaterial(
        course_id=course_id,
        filename=file.filename,
        file_path=file_path,
        file_type=ext.replace(".", ""),
        file_size_bytes=file_size,
        extracted_text=extracted_text,
    )
    db.add(material)
    db.commit()
    db.refresh(material)

    return MaterialResponse(
        id=material.id,
        course_id=material.course_id,
        filename=material.filename,
        file_type=material.file_type,
        file_size_bytes=material.file_size_bytes,
        uploaded_at=material.uploaded_at,
        text_preview=extracted_text[:200] + "..." if len(extracted_text) > 200 else extracted_text,
    )


@router.get("/courses/{course_id}/materials", response_model=list[MaterialResponse])
def list_materials(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List all materials for a course."""
    materials = db.query(CourseMaterial).filter(CourseMaterial.course_id == course_id).all()
    return [
        MaterialResponse(
            id=m.id,
            course_id=m.course_id,
            filename=m.filename,
            file_type=m.file_type,
            file_size_bytes=m.file_size_bytes,
            uploaded_at=m.uploaded_at,
            text_preview=m.extracted_text[:200] + "..." if len(m.extracted_text) > 200 else m.extracted_text,
        )
        for m in materials
    ]


@router.delete("/materials/{material_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_material(
    material_id: int,
    current_user: User = Depends(require_lecturer),
    db: Session = Depends(get_db)
):
    """Delete an uploaded material."""
    material = db.query(CourseMaterial).filter(CourseMaterial.id == material_id).first()
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")

    # Verify ownership
    course = db.query(Course).filter(
        Course.id == material.course_id,
        Course.lecturer_id == current_user.id
    ).first()
    if not course:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Delete file from disk
    if os.path.exists(material.file_path):
        os.remove(material.file_path)

    db.delete(material)
    db.commit()
