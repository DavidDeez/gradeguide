"""
File processing service — extracts text from PDF, DOCX, and TXT files.
"""

import os
from PyPDF2 import PdfReader
from docx import Document


def extract_text_from_file(file_path: str) -> str:
    """
    Extract plain text from a file based on its extension.
    Supports: .pdf, .docx, .txt
    """
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        return _extract_from_pdf(file_path)
    elif ext == ".docx":
        return _extract_from_docx(file_path)
    elif ext == ".txt":
        return _extract_from_txt(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")


def _extract_from_pdf(file_path: str) -> str:
    """Extract text from all pages of a PDF file."""
    reader = PdfReader(file_path)
    text_parts = []
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text_parts.append(page_text)
    return "\n\n".join(text_parts)


def _extract_from_docx(file_path: str) -> str:
    """Extract text from all paragraphs of a DOCX file."""
    doc = Document(file_path)
    text_parts = []
    for paragraph in doc.paragraphs:
        if paragraph.text.strip():
            text_parts.append(paragraph.text)
    return "\n\n".join(text_parts)


def _extract_from_txt(file_path: str) -> str:
    """Read plain text file."""
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """
    Split text into overlapping chunks for retrieval.

    Args:
        text: The full document text
        chunk_size: Maximum characters per chunk
        overlap: Number of overlapping characters between chunks

    Returns:
        List of text chunks
    """
    if not text or not text.strip():
        return []

    chunks = []
    start = 0
    text_length = len(text)

    while start < text_length:
        end = start + chunk_size

        # Try to break at a sentence boundary
        if end < text_length:
            # Look for the last period, question mark, or newline within the chunk
            for boundary_char in [". ", "? ", "! ", "\n"]:
                last_boundary = text.rfind(boundary_char, start, end)
                if last_boundary > start:
                    end = last_boundary + 1
                    break

        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)

        start = end - overlap if end < text_length else text_length

    return chunks
