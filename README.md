# 🛡️ GradeGuide AI
### *Academic Grading Infrastructure for the AI Age*

**GradeGuide AI** is an Intelligent Academic Assessment Platform that leverages cutting-edge Large Language Models (LLMs) and Vision OCR AI to completely automate the ingestion, grading, and auditing of student coursework and exams. 

Built as a highly responsive, standalone React application, it provides zero-hallucination, context-grounded evaluation to guarantee strict compliance with course materials.

---

## 🌟 Key Features

### 1. Unified Faculty Dashboard
Instead of fragmenting educator tasks across multiple consoles, GradeGuide integrates all administrative controls under a single secure gateway (`admin`/`admin` authorization):
* **Source Material Ingestion:** Upload digital copy files (PDF, TXT, MD, Images) to strictly ground the AI grading.
* **Assessment Builder:** Create dynamic examinations by directly setting custom questions, allocating maximum marks, and publishing tests.
* **Bulk Offline Scanner:** Snap your physical marking rubric, then rapidly snap images of physical student scripts. The AI Vision model automatically cross-references and bulk-grades them instantly!
* **Grading Desk:** Review student answer sheets, read detailed AI corrections, and **Export Grades to CSV** with one click.
* **System Audit & Engine Control:** Full System Compliance Logs displaying every student trace. Includes full **Database Backup & Restore** capabilities to easily switch devices without losing exams.

### 2. Student Portal & Advanced Uploads
A secure, simplified workspace for student testing:
* **Frictionless Testing:** Start published exams and input detailed answers, or simply **Upload your PDF/Image Answer Script** for the AI to natively read and grade!
* **Detailed Corrections & Authenticity:** Get immediate performance score rings, correction notes, and an AI-powered **Plagiarism / Authenticity Score** to deter cheating.
* **Retake Permission Gate:** Students are locked out after submission and must request retakes. Includes a direct **Lecturer Messaging System** for urgent support.

### 3. Integrated AI Engine Config
Directly configure and save provider settings inside your workspace. Supports four top-tier inferencing providers:
1. **OpenRouter (Recommended):** Tap into 100% free open-weights models (Gemma 2 9B, Llama 3 8B, Mistral 7B) using a free API key.
2. **Google Gemini 1.5 Direct:** Access direct low-latency inferencing (Gemini 1.5 Flash / Pro) with native API key storage.
3. **Anthropic Claude 3.7:** Run complex, multi-modal vision and text analyses.
4. **HuggingFace Inference:** Connect custom models using standard inference tokens.

---

## 🏗️ Architecture & Security Safeguards
* **Persistent Session Tracing:** Assigns unique, local-storage based `studentId` references to trace student grading sheets and request pipelines.
* **Student Sandbox Lockout:** Completely hides the API connection status, sliders, configurations, and administrative audit panels from student interfaces to ensure absolute server integrity.
* **Zero-Hallucination Grounding:** Custom-builds grading prompts that strictly bound the AI's marking behavior to the uploaded context materials, avoiding grading hallucinations.

---

## 🚀 How to Run Locally

You do not need heavy Node.js libraries or server-side installs! The root of the repository houses a lightweight standalone React deployment transpiled natively via Babel CDNs:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DavidDeez/gradeguide.git
   cd gradeguide
   ```
2. **Launch a local HTTP server:**
   ```bash
   python -m http.server 3000
   ```
3. **Navigate in your browser:**
   Open [http://localhost:3000](http://localhost:3000) and choose your portal!

---

## 📂 Project Structure

```
.
├── GradeGuide.jsx      # Core standalone React single-file application (UI, State, API engine)
├── index.html          # Lightweight HTML wrapper loading React, Lucide Icons, and Babel transpilers
├── README.md           # The primary documentation file
├── docs/               # System Requirement Specifications (SRS) and Phase 1/2 blueprints
└── ai-grader-pro/      # Legacy prototype components (Frontend & Backend templates)
```

---

## 🛡️ License & Academic Integrity
Designed to bring transparent, objective, and accessible grading to educational institutions worldwide. Built with love for **hackathon judges** and educators in the AI era.
