"""
AI-Grader Pro — Main Application Entry Point
=============================================
A free, AI-powered grading system that evaluates student answers
based exclusively on uploaded course materials.

Run with: uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import init_db
from config import CORS_ORIGINS
from routers import auth, courses, materials, grading

# Create FastAPI app
app = FastAPI(
    title="AI-Grader Pro",
    description="AI-powered grading system based on uploaded course materials",
    version="1.0.0",
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(materials.router)
app.include_router(grading.router)


@app.on_event("startup")
def on_startup():
    """Initialize database tables on app startup."""
    init_db()
    print("✅ AI-Grader Pro backend is running!")
    print("📚 API docs: http://localhost:8000/docs")


@app.get("/api/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "app": "AI-Grader Pro", "version": "1.0.0"}
