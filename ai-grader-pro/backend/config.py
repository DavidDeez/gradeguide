"""
Application configuration settings.
All settings are centralized here for easy maintenance.
"""

import os

# --- Database ---
DATABASE_URL = "sqlite:///./ai_grader.db"

# --- JWT Authentication ---
SECRET_KEY = os.getenv("SECRET_KEY", "ai-grader-pro-secret-key-change-in-production-2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# --- File Upload ---
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
MAX_FILE_SIZE_MB = 20
ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt"}

# --- Grading Engine ---
# Minimum similarity threshold to consider content relevant (0.0 - 1.0)
SIMILARITY_THRESHOLD = 0.05
# Number of top chunks to retrieve for grading
TOP_K_CHUNKS = 5
# Chunk size for splitting documents (in characters)
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50

# --- CORS ---
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

# Create upload directory if it doesn't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
