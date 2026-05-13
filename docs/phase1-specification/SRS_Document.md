# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

## AI-Grader Pro — Intelligent Course-Based Assessment System

---

| Field | Details |
|-------|---------|
| **Document Title** | Software Requirements Specification |
| **Project Name** | AI-Grader Pro |
| **Version** | 1.0 |
| **Date** | May 7, 2026 |
| **Prepared By** | _(Your Full Name)_ |
| **Supervisor** | _(Supervisor's Name)_ |
| **Institution** | _(Your University Name)_ |
| **Department** | _(Your Department)_ |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [Project Scope](#3-project-scope)
4. [System Objectives](#4-system-objectives)
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [System Constraints](#7-system-constraints)
8. [User Characteristics](#8-user-characteristics)
9. [Assumptions and Dependencies](#9-assumptions-and-dependencies)
10. [Acceptance Criteria](#10-acceptance-criteria)
11. [Glossary](#11-glossary)
12. [Approval and Signature Page](#12-approval-and-signature-page)

---

## 1. Introduction

### 1.1 Purpose

This document defines the complete software requirements for **AI-Grader Pro**, an AI-powered web application that evaluates students' theoretical answers strictly based on course materials uploaded by the instructor. Unlike general-purpose AI assistants, AI-Grader Pro is **grounded exclusively** in user-provided content — meaning it will not rely on external knowledge for grading.

This SRS serves as the binding agreement between the development team and all stakeholders regarding what the system will do and how it will perform.

### 1.2 Document Conventions

| Convention | Meaning |
|-----------|---------|
| **SHALL** | Mandatory requirement |
| **SHOULD** | Strongly recommended |
| **MAY** | Optional feature |
| FR-XX | Functional Requirement identifier |
| NFR-XX | Non-Functional Requirement identifier |

### 1.3 Intended Audience

- Project Supervisor / Examiner
- Developer (you)
- End Users (Lecturers and Students)
- Quality Assurance / Testers

### 1.4 References

- IEEE 830-1998 — Recommended Practice for Software Requirements Specifications
- ISO/IEC 25010 — Systems and Software Quality Requirements
- Nielsen's 10 Usability Heuristics (for HCI compliance)

---

## 2. Overall Description

### 2.1 Product Perspective

AI-Grader Pro is a **standalone web application** that integrates:

- A **user authentication system** for secure access
- A **document upload module** for ingesting course material (PDF, DOCX, TXT)
- An **AI marking engine** that uses Retrieval-Augmented Generation (RAG) to evaluate student answers against only the uploaded content
- A **results dashboard** showing scores, feedback, and answer breakdowns

The system does **not** replace human grading entirely but serves as a **first-pass automated evaluation tool** for theoretical/essay-type questions.

### 2.2 Product Features (High-Level)

1. User registration and authentication
2. Course material upload and processing
3. Question and answer submission interface
4. AI-powered grading with content-grounded evaluation
5. Score and detailed feedback display
6. Grading history and export

### 2.3 Operating Environment

| Component | Technology |
|-----------|-----------|
| Frontend | HTML, CSS, JavaScript (React or vanilla) |
| Backend | Python (Flask or FastAPI) |
| AI Engine | OpenAI API / Google Gemini API with RAG pipeline |
| Database | SQLite (development) / PostgreSQL (production) |
| File Processing | PyPDF2, python-docx |
| Deployment | Local development server (with cloud deployment option) |

> **DECISION NEEDED:** Which AI provider do you prefer — OpenAI (GPT-4), Google Gemini, or a free/local model like Ollama? This affects cost and setup complexity.

### 2.4 User Classes

| User Class | Description | Permissions |
|-----------|-------------|------------|
| **Lecturer / Instructor** | Uploads course materials, creates questions, reviews AI grades | Full access |
| **Student** | Submits answers, views their own grades and feedback | Limited access |
| **Admin** | Manages users, monitors system health | Full system access |

---

## 3. Project Scope

### 3.1 In Scope

- Web-based application accessible via modern browsers
- User registration, login, and role-based access
- Upload and parsing of PDF, DOCX, and TXT course materials
- AI evaluation of theoretical/essay answers grounded in uploaded materials
- Scoring with detailed feedback explaining the grade
- Grading history dashboard
- Responsive design following HCI principles

### 3.2 Out of Scope

- Grading of mathematical/computational questions (requires code execution)
- Plagiarism detection
- Real-time proctoring or exam monitoring
- Mobile native applications (iOS/Android)
- Multi-language support (English only for v1.0)
- Integration with existing LMS (Moodle, Blackboard, etc.) — future enhancement

---

## 4. System Objectives

| ID | Objective | Success Metric |
|----|-----------|---------------|
| OBJ-01 | Provide accurate, content-grounded grading | ≥80% agreement with manual grading on test set |
| OBJ-02 | Ensure fast turnaround for grading | Results returned within 30 seconds per question |
| OBJ-03 | Support multiple document formats | PDF, DOCX, TXT upload with successful parsing |
| OBJ-04 | Provide actionable feedback to students | Each grade accompanied by explanation referencing course material |
| OBJ-05 | Maintain data security and privacy | All passwords hashed; uploaded materials isolated per user |
| OBJ-06 | Follow HCI best practices for usability | UI passes Nielsen's heuristic evaluation checklist |

---

## 5. Functional Requirements

### 5.1 Authentication Module

| ID | Requirement | Priority |
|----|------------|----------|
| FR-01 | The system SHALL allow users to register with email and password | High |
| FR-02 | The system SHALL authenticate users via email/password login | High |
| FR-03 | The system SHALL enforce role-based access (Lecturer, Student, Admin) | High |
| FR-04 | The system SHALL hash all passwords before storage | High |
| FR-05 | The system SHALL allow users to reset their password via email | Medium |
| FR-06 | The system SHALL automatically log out inactive sessions after 30 minutes | Low |

### 5.2 Course Material Upload Module

| ID | Requirement | Priority |
|----|------------|----------|
| FR-07 | The system SHALL allow lecturers to upload PDF, DOCX, and TXT files | High |
| FR-08 | The system SHALL extract and store text content from uploaded files | High |
| FR-09 | The system SHALL reject files exceeding 20 MB in size | Medium |
| FR-10 | The system SHALL display a list of all uploaded course materials | High |
| FR-11 | The system SHALL allow lecturers to delete uploaded materials | Medium |
| FR-12 | The system SHALL support uploading multiple files per course | High |

### 5.3 AI Marking Engine

| ID | Requirement | Priority |
|----|------------|----------|
| FR-13 | The system SHALL evaluate student answers using ONLY the uploaded course material as the knowledge base | High |
| FR-14 | The system SHALL use Retrieval-Augmented Generation (RAG) to retrieve relevant sections from the uploaded material before generating a grade | High |
| FR-15 | The system SHALL assign a numerical score (0–100) to each submitted answer | High |
| FR-16 | The system SHALL provide written feedback explaining why the score was given, referencing specific parts of the course material | High |
| FR-17 | The system SHALL support grading of multiple questions in a single session | Medium |
| FR-18 | The system SHALL allow lecturers to set the marking rubric or criteria for each question | Medium |

### 5.4 Question & Answer Interface

| ID | Requirement | Priority |
|----|------------|----------|
| FR-19 | The system SHALL allow lecturers to create questions linked to uploaded course material | High |
| FR-20 | The system SHALL allow students to submit text answers to questions | High |
| FR-21 | The system SHALL display questions with their associated course/material context | Medium |
| FR-22 | The system SHALL allow students to save draft answers before final submission | Low |

### 5.5 Results & Dashboard

| ID | Requirement | Priority |
|----|------------|----------|
| FR-23 | The system SHALL display grading results with score, feedback, and material references | High |
| FR-24 | The system SHALL maintain a grading history for each student | Medium |
| FR-25 | The system SHALL allow lecturers to view all students' grades for a course | Medium |
| FR-26 | The system SHALL allow export of results to CSV format | Low |

---

## 6. Non-Functional Requirements

### 6.1 Performance

| ID | Requirement |
|----|------------|
| NFR-01 | The system SHALL return grading results within 30 seconds per question |
| NFR-02 | The system SHALL support at least 50 concurrent users |
| NFR-03 | Page load times SHALL not exceed 3 seconds on standard broadband |

### 6.2 Security

| ID | Requirement |
|----|------------|
| NFR-04 | All passwords SHALL be hashed using bcrypt or equivalent |
| NFR-05 | The system SHALL use HTTPS for all communications (in production) |
| NFR-06 | Uploaded materials SHALL be isolated per user/course — no cross-access |
| NFR-07 | The system SHALL validate and sanitize all user inputs |

### 6.3 Usability (HCI Compliance)

| ID | Requirement |
|----|------------|
| NFR-08 | The UI SHALL follow Nielsen's 10 Usability Heuristics |
| NFR-09 | The system SHALL be fully responsive (desktop, tablet, mobile) |
| NFR-10 | The system SHALL provide clear error messages for all failure scenarios |
| NFR-11 | The system SHALL use consistent visual design throughout |

### 6.4 Reliability & Maintainability

| ID | Requirement |
|----|------------|
| NFR-12 | The system SHALL have modular architecture for easy maintenance |
| NFR-13 | The system SHALL include inline code documentation and API documentation |
| NFR-14 | The system SHALL use version control (Git) for all source code |
| NFR-15 | The system SHALL gracefully handle AI API failures with user-friendly error messages |

### 6.5 Compatibility

| ID | Requirement |
|----|------------|
| NFR-16 | The system SHALL work on Chrome, Firefox, Edge, and Safari (latest 2 versions) |
| NFR-17 | The system SHALL function on Windows, macOS, and Linux |

---

## 7. System Constraints

| Constraint | Description |
|-----------|-------------|
| C-01 | The AI engine requires an API key for the chosen provider (OpenAI/Gemini) — cost implications |
| C-02 | File parsing accuracy depends on document formatting quality |
| C-03 | The system is limited to English language content in v1.0 |
| C-04 | Maximum file upload size: 20 MB per file |
| C-05 | Academic project timeline: approximately 8 weeks |

---

## 8. User Characteristics

| Characteristic | Description |
|---------------|-------------|
| Technical Skill | Users are assumed to have basic computer and web browser literacy |
| Primary Users | University lecturers and students |
| Usage Frequency | Lecturers: weekly (uploading and reviewing); Students: per-assignment |
| Accessibility | Standard web accessibility (WCAG 2.1 Level A compliance) |

---

## 9. Assumptions and Dependencies

### 9.1 Assumptions

1. Users have a stable internet connection for accessing the web app and AI API
2. Lecturers upload course materials in supported formats (PDF, DOCX, TXT)
3. Uploaded materials are in English
4. The AI API provider maintains uptime ≥ 99.5%
5. Users have access to modern web browsers

### 9.2 Dependencies

1. **AI API** — Requires active API key (OpenAI, Google Gemini, or local model)
2. **Python ecosystem** — Flask/FastAPI, PyPDF2, python-docx
3. **Database** — SQLite for development; PostgreSQL for production
4. **File storage** — Local filesystem or cloud storage (S3/GCS) for uploaded documents

---

## 10. Acceptance Criteria

The system will be considered acceptable when:

| # | Criterion |
|---|----------|
| AC-01 | A user can register, log in, and log out successfully |
| AC-02 | A lecturer can upload a PDF/DOCX file and see its content processed |
| AC-03 | A student can submit a text answer and receive an AI-generated grade within 30 seconds |
| AC-04 | The AI grade includes a numerical score and text feedback referencing course material |
| AC-05 | The AI does NOT use knowledge outside the uploaded materials in its evaluation |
| AC-06 | The system works on Chrome and Firefox without errors |
| AC-07 | All pages are responsive on desktop and tablet viewports |

---

## 11. Glossary

| Term | Definition |
|------|-----------|
| **RAG** | Retrieval-Augmented Generation — an AI technique where relevant document sections are retrieved first, then used as context for the AI's response |
| **SRS** | Software Requirements Specification |
| **HCI** | Human-Computer Interaction — the study of designing user-friendly interfaces |
| **API** | Application Programming Interface |
| **SDLC** | Software Development Life Cycle |
| **LMS** | Learning Management System (e.g., Moodle, Blackboard) |
| **WCAG** | Web Content Accessibility Guidelines |
| **Grounding** | Restricting AI responses to only use information from provided documents |

---

## 12. Approval and Signature Page

### Document Approval

This Software Requirements Specification has been reviewed and approved by the undersigned stakeholders. By signing below, each party confirms that this document accurately represents the requirements for the AI-Grader Pro system.

---

**Prepared By:**

| | |
|---|---|
| Name | _________________________________ |
| Role | Developer / Student |
| Matric No. | _________________________________ |
| Signature | _________________________________ |
| Date | _________________________________ |

---

**Reviewed By:**

| | |
|---|---|
| Name | _________________________________ |
| Role | Project Supervisor |
| Department | _________________________________ |
| Signature | _________________________________ |
| Date | _________________________________ |

---

**Approved By:**

| | |
|---|---|
| Name | _________________________________ |
| Role | Head of Department / Course Coordinator |
| Department | _________________________________ |
| Signature | _________________________________ |
| Date | _________________________________ |

---

### Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | May 7, 2026 | _(Your Name)_ | Initial release |

---

*End of Software Requirements Specification*
