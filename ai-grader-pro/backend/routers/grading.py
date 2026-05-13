"""
Questions and Grading router — create questions, submit answers, get grades.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime

from database import get_db
from models import User, Course, CourseMaterial, Question, Answer, Grade
from routers.auth import get_current_user, require_lecturer
from services.grading_engine import grade_answer
from services.file_processor import chunk_text

router = APIRouter(prefix="/api", tags=["Questions & Grading"])


# --- Schemas ---

class QuestionCreate(BaseModel):
    question_text: str
    rubric: str | None = None
    max_score: int = 100

class QuestionResponse(BaseModel):
    id: int
    course_id: int
    question_text: str
    rubric: str | None
    max_score: int
    created_at: datetime | None = None

    class Config:
        from_attributes = True

class AnswerSubmit(BaseModel):
    answer_text: str
    is_draft: bool = False

class GradeResponse(BaseModel):
    answer_id: int
    score: int
    max_score: int
    percentage: float
    feedback: str
    referenced_content: str | None
    confidence: float | None
    graded_at: datetime | None = None

class AnswerResponse(BaseModel):
    id: int
    question_id: int
    answer_text: str
    is_draft: bool
    submitted_at: datetime | None = None
    grade: GradeResponse | None = None

    class Config:
        from_attributes = True

class StudentGradeSummary(BaseModel):
    student_name: str
    student_email: str
    question_text: str
    score: int
    max_score: int
    percentage: float
    submitted_at: datetime | None = None


# --- Question Endpoints ---

@router.post("/courses/{course_id}/questions", response_model=QuestionResponse, status_code=201)
def create_question(
    course_id: int,
    request: QuestionCreate,
    current_user: User = Depends(require_lecturer),
    db: Session = Depends(get_db)
):
    """Create a new question for a course (lecturers only)."""
    course = db.query(Course).filter(
        Course.id == course_id,
        Course.lecturer_id == current_user.id
    ).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found or not owned by you")

    question = Question(
        course_id=course_id,
        created_by=current_user.id,
        question_text=request.question_text,
        rubric=request.rubric,
        max_score=request.max_score,
    )
    db.add(question)
    db.commit()
    db.refresh(question)
    return QuestionResponse.model_validate(question)


@router.get("/courses/{course_id}/questions", response_model=list[QuestionResponse])
def list_questions(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List all questions for a course."""
    questions = db.query(Question).filter(Question.course_id == course_id).all()
    return [QuestionResponse.model_validate(q) for q in questions]


@router.delete("/questions/{question_id}", status_code=204)
def delete_question(
    question_id: int,
    current_user: User = Depends(require_lecturer),
    db: Session = Depends(get_db)
):
    """Delete a question (lecturers only)."""
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    course = db.query(Course).filter(
        Course.id == question.course_id,
        Course.lecturer_id == current_user.id
    ).first()
    if not course:
        raise HTTPException(status_code=403, detail="Not authorized")
    db.delete(question)
    db.commit()


# --- Answer & Grading Endpoints ---

@router.post("/questions/{question_id}/submit", response_model=AnswerResponse)
def submit_answer(
    question_id: int,
    request: AnswerSubmit,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Submit an answer to a question. If not a draft, triggers AI grading."""
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    # Check if student already submitted a non-draft answer
    existing = db.query(Answer).filter(
        Answer.question_id == question_id,
        Answer.student_id == current_user.id,
        Answer.is_draft == False
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You have already submitted an answer to this question")

    # Delete any existing draft
    db.query(Answer).filter(
        Answer.question_id == question_id,
        Answer.student_id == current_user.id,
        Answer.is_draft == True
    ).delete()

    # Create answer
    answer = Answer(
        question_id=question_id,
        student_id=current_user.id,
        answer_text=request.answer_text,
        is_draft=request.is_draft,
    )
    db.add(answer)
    db.commit()
    db.refresh(answer)

    grade_data = None

    # If not a draft, trigger grading
    if not request.is_draft:
        # Get all course materials for this question's course
        materials = db.query(CourseMaterial).filter(
            CourseMaterial.course_id == question.course_id
        ).all()

        # Build chunks from all materials
        all_chunks = []
        for mat in materials:
            chunks = chunk_text(mat.extracted_text)
            all_chunks.extend(chunks)

        # Run the grading engine
        result = grade_answer(
            answer_text=request.answer_text,
            question_text=question.question_text,
            course_chunks=all_chunks,
            rubric=question.rubric,
            max_score=question.max_score,
        )

        # Save grade
        grade = Grade(
            answer_id=answer.id,
            score=result["score"],
            ai_feedback=result["feedback"],
            referenced_content=result["referenced_content"],
            confidence=result["confidence"],
        )
        db.add(grade)
        db.commit()
        db.refresh(grade)

        grade_data = GradeResponse(
            answer_id=answer.id,
            score=grade.score,
            max_score=question.max_score,
            percentage=round((grade.score / question.max_score) * 100, 1),
            feedback=grade.ai_feedback,
            referenced_content=grade.referenced_content,
            confidence=grade.confidence,
            graded_at=grade.graded_at,
        )

    return AnswerResponse(
        id=answer.id,
        question_id=answer.question_id,
        answer_text=answer.answer_text,
        is_draft=answer.is_draft,
        submitted_at=answer.submitted_at,
        grade=grade_data,
    )


@router.get("/grades/my", response_model=list[AnswerResponse])
def my_grades(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all graded answers for the current student."""
    answers = db.query(Answer).filter(
        Answer.student_id == current_user.id,
        Answer.is_draft == False
    ).all()

    result = []
    for a in answers:
        grade_data = None
        if a.grade:
            question = db.query(Question).filter(Question.id == a.question_id).first()
            max_score = question.max_score if question else 100
            grade_data = GradeResponse(
                answer_id=a.id,
                score=a.grade.score,
                max_score=max_score,
                percentage=round((a.grade.score / max_score) * 100, 1),
                feedback=a.grade.ai_feedback,
                referenced_content=a.grade.referenced_content,
                confidence=a.grade.confidence,
                graded_at=a.grade.graded_at,
            )
        result.append(AnswerResponse(
            id=a.id,
            question_id=a.question_id,
            answer_text=a.answer_text,
            is_draft=a.is_draft,
            submitted_at=a.submitted_at,
            grade=grade_data,
        ))
    return result


@router.get("/courses/{course_id}/grades", response_model=list[StudentGradeSummary])
def course_grades(
    course_id: int,
    current_user: User = Depends(require_lecturer),
    db: Session = Depends(get_db)
):
    """Get all student grades for a course (lecturers only)."""
    course = db.query(Course).filter(
        Course.id == course_id,
        Course.lecturer_id == current_user.id
    ).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    results = []
    for question in course.questions:
        for answer in question.answers:
            if answer.grade and not answer.is_draft:
                results.append(StudentGradeSummary(
                    student_name=answer.student.full_name,
                    student_email=answer.student.email,
                    question_text=question.question_text[:100],
                    score=answer.grade.score,
                    max_score=question.max_score,
                    percentage=round((answer.grade.score / question.max_score) * 100, 1),
                    submitted_at=answer.submitted_at,
                ))
    return results
