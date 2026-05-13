"""
Courses router — CRUD operations for courses.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime

from database import get_db
from models import User, Course
from routers.auth import get_current_user, require_lecturer

router = APIRouter(prefix="/api/courses", tags=["Courses"])


# --- Schemas ---

class CourseCreate(BaseModel):
    title: str
    description: str | None = None

class CourseResponse(BaseModel):
    id: int
    title: str
    description: str | None
    lecturer_id: int
    created_at: datetime | None = None
    material_count: int = 0
    question_count: int = 0

    class Config:
        from_attributes = True


# --- Endpoints ---

@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(
    request: CourseCreate,
    current_user: User = Depends(require_lecturer),
    db: Session = Depends(get_db)
):
    """Create a new course (lecturers only)."""
    course = Course(
        title=request.title,
        description=request.description,
        lecturer_id=current_user.id,
    )
    db.add(course)
    db.commit()
    db.refresh(course)

    return CourseResponse(
        id=course.id,
        title=course.title,
        description=course.description,
        lecturer_id=course.lecturer_id,
        created_at=course.created_at,
        material_count=0,
        question_count=0,
    )


@router.get("/", response_model=list[CourseResponse])
def list_courses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List courses. Lecturers see their own; students see all."""
    if current_user.role == "lecturer":
        courses = db.query(Course).filter(Course.lecturer_id == current_user.id).all()
    else:
        courses = db.query(Course).all()

    result = []
    for c in courses:
        result.append(CourseResponse(
            id=c.id,
            title=c.title,
            description=c.description,
            lecturer_id=c.lecturer_id,
            created_at=c.created_at,
            material_count=len(c.materials),
            question_count=len(c.questions),
        ))
    return result


@router.get("/{course_id}", response_model=CourseResponse)
def get_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a single course by ID."""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    return CourseResponse(
        id=course.id,
        title=course.title,
        description=course.description,
        lecturer_id=course.lecturer_id,
        created_at=course.created_at,
        material_count=len(course.materials),
        question_count=len(course.questions),
    )


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(
    course_id: int,
    current_user: User = Depends(require_lecturer),
    db: Session = Depends(get_db)
):
    """Delete a course (lecturers only, own courses)."""
    course = db.query(Course).filter(
        Course.id == course_id,
        Course.lecturer_id == current_user.id
    ).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found or not owned by you")

    db.delete(course)
    db.commit()
