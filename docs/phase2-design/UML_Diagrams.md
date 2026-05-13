# UML Design Diagrams — AI-Grader Pro

**Version:** 1.0 | **Date:** May 7, 2026

---

## 1. Use Case Diagram

```mermaid
graph TB
    subgraph "AI-Grader Pro System"
        UC1["Register Account"]
        UC2["Login / Logout"]
        UC3["Upload Course Material"]
        UC4["View Uploaded Materials"]
        UC5["Delete Course Material"]
        UC6["Create Questions"]
        UC7["Set Marking Rubric"]
        UC8["Submit Answers"]
        UC9["Grade Answers via AI"]
        UC10["View Grades & Feedback"]
        UC11["View All Student Grades"]
        UC12["Export Results to CSV"]
        UC13["Manage Users"]
        UC14["Monitor System Health"]
    end

    Lecturer["🧑‍🏫 Lecturer"]
    Student["🧑‍🎓 Student"]
    Admin["🔧 Admin"]
    AI["🤖 AI Engine"]

    Lecturer --> UC1
    Lecturer --> UC2
    Lecturer --> UC3
    Lecturer --> UC4
    Lecturer --> UC5
    Lecturer --> UC6
    Lecturer --> UC7
    Lecturer --> UC11
    Lecturer --> UC12

    Student --> UC1
    Student --> UC2
    Student --> UC8
    Student --> UC10

    Admin --> UC2
    Admin --> UC13
    Admin --> UC14

    UC8 --> UC9
    UC9 --> AI
```

### Use Case Descriptions

| Use Case | Actor(s) | Description |
|----------|----------|-------------|
| UC1 — Register Account | Lecturer, Student | Create a new account with email, password, and role |
| UC2 — Login / Logout | All | Authenticate and manage sessions |
| UC3 — Upload Course Material | Lecturer | Upload PDF, DOCX, or TXT files as grading knowledge base |
| UC4 — View Uploaded Materials | Lecturer | Browse and preview uploaded documents |
| UC5 — Delete Course Material | Lecturer | Remove previously uploaded files |
| UC6 — Create Questions | Lecturer | Write questions linked to uploaded materials |
| UC7 — Set Marking Rubric | Lecturer | Define grading criteria and point allocation |
| UC8 — Submit Answers | Student | Write and submit answers to assigned questions |
| UC9 — Grade Answers via AI | System/AI | AI retrieves relevant content and evaluates the answer |
| UC10 — View Grades & Feedback | Student | See score, AI feedback, and material references |
| UC11 — View All Student Grades | Lecturer | Dashboard of all student results per course |
| UC12 — Export Results | Lecturer | Download grades as CSV |
| UC13 — Manage Users | Admin | Create, edit, disable user accounts |
| UC14 — Monitor System Health | Admin | View logs, API usage, error reports |

---

## 2. Data Flow Diagram (DFD)

### Level 0 — Context Diagram

```mermaid
graph LR
    Lecturer["🧑‍🏫 Lecturer"] -->|"Course materials, Questions, Rubrics"| SYS["AI-Grader Pro"]
    Student["🧑‍🎓 Student"] -->|"Answers"| SYS
    SYS -->|"Grades, Feedback"| Student
    SYS -->|"Grade reports, Analytics"| Lecturer
    SYS <-->|"Grading requests & responses"| AI["🤖 AI API"]
```

### Level 1 — Detailed Data Flow

```mermaid
graph TD
    L["🧑‍🏫 Lecturer"] -->|"Upload files"| P1["1.0 Process & Store Materials"]
    P1 -->|"Extracted text"| D1[("Materials Database")]
    
    L -->|"Create questions + rubric"| P2["2.0 Manage Questions"]
    P2 -->|"Questions & rubrics"| D2[("Questions Database")]
    
    S["🧑‍🎓 Student"] -->|"Submit answer"| P3["3.0 Receive Answers"]
    P3 -->|"Answer text"| D3[("Answers Database")]
    
    D1 -->|"Relevant content chunks"| P4["4.0 AI Grading Engine"]
    D2 -->|"Question + rubric"| P4
    D3 -->|"Student answer"| P4
    P4 <-->|"Prompt & Response"| AI["🤖 AI API"]
    
    P4 -->|"Score + feedback"| D4[("Grades Database")]
    D4 -->|"Results"| P5["5.0 Display Results"]
    P5 -->|"Grades & feedback"| S
    P5 -->|"Reports & analytics"| L
```

### Data Dictionary

| Data Flow | Description | Format |
|-----------|-------------|--------|
| Course materials | Uploaded lecture notes/textbooks | PDF, DOCX, TXT (≤20MB) |
| Extracted text | Parsed plain text from documents | UTF-8 text chunks |
| Questions | Theoretical questions set by lecturer | Text with point values |
| Rubric | Grading criteria per question | Text guidelines |
| Answers | Student-submitted responses | Free-form text |
| Grading prompt | Assembled prompt with context + answer + rubric | Structured text |
| Score + feedback | AI-generated grade and explanation | JSON (score: 0–100, feedback: text) |

---

## 3. Process Flow Diagram — Grading Workflow

```mermaid
flowchart TD
    A([Student Opens App]) --> B{Logged In?}
    B -->|No| C[Show Login Page]
    C --> D[Enter Credentials]
    D --> E{Valid?}
    E -->|No| F[Show Error Message]
    F --> D
    E -->|Yes| G[Dashboard]
    B -->|Yes| G
    
    G --> H[Select Course / Assignment]
    H --> I[View Questions]
    I --> J[Type Answer]
    J --> K[Click Submit]
    
    K --> L["Retrieve Relevant Content Chunks from Uploaded Materials (RAG)"]
    L --> M["Assemble Grading Prompt: Question + Rubric + Content + Answer"]
    M --> N["Send to AI API"]
    N --> O{API Success?}
    
    O -->|No| P[Show Error: Retry Later]
    O -->|Yes| Q["Parse AI Response: Score + Feedback"]
    Q --> R["Save Grade to Database"]
    R --> S["Display Score & Feedback to Student"]
    S --> T{More Questions?}
    T -->|Yes| I
    T -->|No| U([End / View Summary])
```

---

## 4. Lecturer Upload Flow

```mermaid
flowchart TD
    A([Lecturer Logs In]) --> B[Navigate to Course Materials]
    B --> C[Click Upload]
    C --> D[Select File from Device]
    D --> E{Valid Format & Size?}
    E -->|No| F["Show Error: Invalid file type or exceeds 20MB"]
    F --> C
    E -->|Yes| G["Extract Text Content (PyPDF2 / python-docx)"]
    G --> H["Split Text into Chunks"]
    H --> I["Generate Embeddings for Each Chunk"]
    I --> J["Store Chunks + Embeddings in Vector Store"]
    J --> K["Show Success: Material Ready for Grading"]
    K --> L{Upload More?}
    L -->|Yes| C
    L -->|No| M([Return to Dashboard])
```

---

*End of UML Diagrams Document*
