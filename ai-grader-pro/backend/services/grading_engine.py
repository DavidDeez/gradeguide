"""
Local AI Grading Engine — FREE, no API keys required.

Uses TF-IDF vectorization + cosine similarity to evaluate student answers
against uploaded course materials. This is a Retrieval-Augmented Grading approach
that works entirely offline.

How it works:
1. RETRIEVE: Find the most relevant chunks from course materials using TF-IDF similarity
2. ANALYZE: Compare the student's answer against those relevant chunks
3. SCORE: Calculate a score based on content coverage, keyword matching, and completeness
4. FEEDBACK: Generate detailed feedback explaining what was covered and what was missed
"""

import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from config import SIMILARITY_THRESHOLD, TOP_K_CHUNKS


def grade_answer(
    answer_text: str,
    question_text: str,
    course_chunks: list[str],
    rubric: str | None = None,
    max_score: int = 100
) -> dict:
    """
    Grade a student's answer based on course material chunks.

    Args:
        answer_text: The student's submitted answer
        question_text: The question being answered
        course_chunks: List of text chunks from uploaded course materials
        rubric: Optional grading rubric/criteria
        max_score: Maximum possible score

    Returns:
        dict with keys: score, feedback, referenced_content, confidence
    """
    if not answer_text or not answer_text.strip():
        return {
            "score": 0,
            "feedback": "No answer was provided. Please submit your response to receive a grade.",
            "referenced_content": "",
            "confidence": 1.0
        }

    if not course_chunks:
        return {
            "score": 0,
            "feedback": "No course materials have been uploaded for this course. Please ask your lecturer to upload materials before grading can occur.",
            "referenced_content": "",
            "confidence": 0.0
        }

    # Step 1: RETRIEVE — Find relevant chunks
    relevant_chunks, similarity_scores = _retrieve_relevant_chunks(
        query=question_text + " " + answer_text,
        chunks=course_chunks,
        top_k=TOP_K_CHUNKS
    )

    if not relevant_chunks:
        return {
            "score": max(0, int(max_score * 0.1)),
            "feedback": (
                "Your answer does not closely match the uploaded course material. "
                "The content you provided may be from external sources rather than the course material. "
                "Please review the uploaded materials and try again."
            ),
            "referenced_content": "",
            "confidence": 0.3
        }

    # Step 2: ANALYZE — Compute detailed metrics
    metrics = _analyze_answer(answer_text, question_text, relevant_chunks, rubric)

    # Step 3: SCORE — Calculate final grade
    raw_score = _calculate_score(metrics, max_score)

    # Step 4: FEEDBACK — Generate detailed explanation
    feedback = _generate_feedback(metrics, raw_score, max_score, relevant_chunks)
    referenced = _format_references(relevant_chunks, similarity_scores)

    # Confidence is based on how much relevant material was found
    avg_similarity = float(np.mean(similarity_scores[:len(relevant_chunks)])) if similarity_scores else 0
    confidence = min(1.0, avg_similarity * 3 + 0.4)  # Scale to reasonable range

    return {
        "score": raw_score,
        "feedback": feedback,
        "referenced_content": referenced,
        "confidence": round(confidence, 2)
    }


def _retrieve_relevant_chunks(query: str, chunks: list[str], top_k: int = 5) -> tuple[list[str], list[float]]:
    """
    Retrieve the most relevant chunks using TF-IDF + cosine similarity.
    """
    if not chunks:
        return [], []

    # Combine query with chunks for TF-IDF vectorization
    all_texts = [query] + chunks
    
    try:
        vectorizer = TfidfVectorizer(
            stop_words="english",
            max_features=10000,
            ngram_range=(1, 2),  # Unigrams and bigrams for better matching
            min_df=1
        )
        tfidf_matrix = vectorizer.fit_transform(all_texts)
    except ValueError:
        # If vectorization fails (e.g., all stop words), return empty
        return [], []

    # Calculate similarity between query and each chunk
    query_vector = tfidf_matrix[0:1]
    chunk_vectors = tfidf_matrix[1:]
    similarities = cosine_similarity(query_vector, chunk_vectors).flatten()

    # Get top-k chunks above threshold
    top_indices = similarities.argsort()[::-1][:top_k]
    relevant = []
    scores = []

    for idx in top_indices:
        if similarities[idx] >= SIMILARITY_THRESHOLD:
            relevant.append(chunks[idx])
            scores.append(float(similarities[idx]))

    return relevant, scores


def _analyze_answer(
    answer: str,
    question: str,
    relevant_chunks: list[str],
    rubric: str | None
) -> dict:
    """
    Analyze the answer against relevant content and produce metrics.
    """
    # Combine relevant chunks into reference text
    reference_text = " ".join(relevant_chunks).lower()
    answer_lower = answer.lower()

    # Extract key terms from the reference material
    key_terms = _extract_key_terms(reference_text)
    answer_terms = _extract_key_terms(answer_lower)

    # Calculate keyword coverage — what % of key terms does the answer mention?
    matched_terms = key_terms.intersection(answer_terms)
    keyword_coverage = len(matched_terms) / max(len(key_terms), 1)

    # Calculate content similarity using TF-IDF
    try:
        vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2))
        vectors = vectorizer.fit_transform([reference_text, answer_lower])
        content_similarity = float(cosine_similarity(vectors[0:1], vectors[1:2])[0][0])
    except ValueError:
        content_similarity = 0.0

    # Answer completeness — length relative to reference material
    answer_word_count = len(answer.split())
    min_expected_words = max(20, len(reference_text.split()) // 10)
    completeness = min(1.0, answer_word_count / min_expected_words)

    # Check if rubric criteria are addressed (if rubric provided)
    rubric_coverage = 0.0
    rubric_items = []
    if rubric:
        rubric_items = [item.strip() for item in rubric.split("\n") if item.strip()]
        if rubric_items:
            matched_criteria = sum(
                1 for item in rubric_items
                if any(word in answer_lower for word in item.lower().split() if len(word) > 3)
            )
            rubric_coverage = matched_criteria / len(rubric_items)

    return {
        "keyword_coverage": keyword_coverage,
        "content_similarity": content_similarity,
        "completeness": completeness,
        "rubric_coverage": rubric_coverage,
        "matched_terms": matched_terms,
        "missed_terms": key_terms - answer_terms,
        "key_terms": key_terms,
        "answer_word_count": answer_word_count,
        "rubric_items": rubric_items,
        "has_rubric": rubric is not None and len(rubric_items) > 0,
    }


def _extract_key_terms(text: str) -> set[str]:
    """
    Extract important terms from text using simple NLP heuristics.
    Filters out common stop words and short words.
    """
    stop_words = {
        "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
        "have", "has", "had", "do", "does", "did", "will", "would", "could",
        "should", "may", "might", "shall", "can", "need", "must", "ought",
        "this", "that", "these", "those", "i", "you", "he", "she", "it",
        "we", "they", "me", "him", "her", "us", "them", "my", "your",
        "his", "its", "our", "their", "mine", "yours", "hers", "ours",
        "theirs", "what", "which", "who", "whom", "whose", "when", "where",
        "why", "how", "all", "each", "every", "both", "few", "more", "most",
        "other", "some", "such", "no", "nor", "not", "only", "own", "same",
        "so", "than", "too", "very", "just", "because", "as", "until",
        "while", "of", "at", "by", "for", "with", "about", "against",
        "between", "through", "during", "before", "after", "above", "below",
        "to", "from", "up", "down", "in", "out", "on", "off", "over",
        "under", "again", "further", "then", "once", "also", "and", "but",
        "or", "if", "however", "therefore", "thus", "hence", "although",
        "though", "even", "still", "yet", "already", "always", "never",
        "sometimes", "often", "usually", "one", "two", "three", "first",
        "second", "new", "old", "many", "much", "used", "using", "make",
        "made", "like", "well", "back", "way", "also", "get", "got",
    }

    # Extract words, keeping only meaningful terms (4+ chars, not stop words)
    words = re.findall(r'\b[a-z]{4,}\b', text)
    return {w for w in words if w not in stop_words} - stop_words


def _calculate_score(metrics: dict, max_score: int) -> int:
    """
    Calculate final score from analysis metrics.

    Weighting:
    - Content similarity: 35%
    - Keyword coverage: 30%
    - Completeness: 15%
    - Rubric coverage: 20% (if rubric exists, else redistributed)
    """
    if metrics["has_rubric"]:
        weights = {
            "content_similarity": 0.35,
            "keyword_coverage": 0.30,
            "completeness": 0.15,
            "rubric_coverage": 0.20,
        }
    else:
        weights = {
            "content_similarity": 0.45,
            "keyword_coverage": 0.35,
            "completeness": 0.20,
            "rubric_coverage": 0.0,
        }

    weighted_score = (
        metrics["content_similarity"] * weights["content_similarity"]
        + metrics["keyword_coverage"] * weights["keyword_coverage"]
        + metrics["completeness"] * weights["completeness"]
        + metrics["rubric_coverage"] * weights["rubric_coverage"]
    )

    # Scale to max_score and apply slight curve for fairness
    raw = weighted_score * max_score
    # Gentle curve: sqrt scaling to avoid harsh low scores
    curved = (raw / max_score) ** 0.85 * max_score
    return max(0, min(max_score, int(round(curved))))


def _generate_feedback(metrics: dict, score: int, max_score: int, relevant_chunks: list[str]) -> str:
    """
    Generate human-readable feedback explaining the grade.
    """
    feedback_parts = []

    # Overall assessment
    percentage = (score / max_score) * 100
    if percentage >= 80:
        feedback_parts.append(f"Excellent work! You scored {score}/{max_score} ({percentage:.0f}%).")
        feedback_parts.append("Your answer demonstrates strong understanding of the course material.")
    elif percentage >= 60:
        feedback_parts.append(f"Good effort. You scored {score}/{max_score} ({percentage:.0f}%).")
        feedback_parts.append("Your answer covers key concepts but could be more comprehensive.")
    elif percentage >= 40:
        feedback_parts.append(f"You scored {score}/{max_score} ({percentage:.0f}%).")
        feedback_parts.append("Your answer partially addresses the question but is missing important concepts from the course material.")
    else:
        feedback_parts.append(f"You scored {score}/{max_score} ({percentage:.0f}%).")
        feedback_parts.append("Your answer does not sufficiently address the question based on the course material.")

    # Keyword analysis
    if metrics["matched_terms"]:
        top_matched = sorted(metrics["matched_terms"])[:8]
        feedback_parts.append(
            f"\n**Key concepts covered:** {', '.join(top_matched)}"
        )

    if metrics["missed_terms"]:
        top_missed = sorted(metrics["missed_terms"])[:8]
        feedback_parts.append(
            f"\n**Key concepts missing from your answer:** {', '.join(top_missed)}"
        )
        feedback_parts.append(
            "Consider reviewing these topics in the course material for a more complete answer."
        )

    # Completeness feedback
    if metrics["completeness"] < 0.5:
        feedback_parts.append(
            f"\n**Length:** Your answer ({metrics['answer_word_count']} words) is quite brief. "
            "A more detailed response would likely earn a higher score."
        )

    # Rubric feedback
    if metrics["has_rubric"] and metrics["rubric_coverage"] < 0.5:
        feedback_parts.append(
            "\n**Rubric:** Your answer does not fully address the marking criteria. "
            "Review the rubric and ensure each criterion is covered."
        )

    return "\n".join(feedback_parts)


def _format_references(chunks: list[str], scores: list[float]) -> str:
    """Format referenced content for display."""
    if not chunks:
        return "No relevant course material found."

    refs = []
    for i, (chunk, score) in enumerate(zip(chunks[:3], scores[:3]), 1):
        # Truncate long chunks for readability
        display = chunk[:200] + "..." if len(chunk) > 200 else chunk
        refs.append(f"[Reference {i}] (Relevance: {score:.0%})\n{display}")

    return "\n\n".join(refs)
