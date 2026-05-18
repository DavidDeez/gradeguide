# 🛡️ GradeGuide AI
### *Academic Grading Infrastructure for the AI Age*

**GradeGuide AI** is an Intelligent Academic Assessment Platform that leverages cutting-edge Large Language Models (LLMs) and Vision OCR AI to completely automate the ingestion, grading, and auditing of student coursework and exams. 

Built as a highly responsive, standalone React application, it provides zero-hallucination, context-grounded evaluation to guarantee strict compliance with course materials.

---

## 🌟 Key Features

### 1. Unified Faculty Dashboard
Instead of fragmenting educator tasks across multiple consoles, GradeGuide integrates all administrative controls under a single secure gateway (`admin`/`admin` authorization):
* **Source Material Ingestion:** Scan physical, printed assessment papers via a live **Vision OCR Camera scanner** or upload digital copy files (PDF, TXT, MD).
* **Assessment Builder:** Create dynamic examinations by directly setting custom questions, allocating maximum marks, and publishing tests.
* **Grading Desk:** Review student answer sheets, read detailed AI corrections, key strengths, and suggested areas of improvement.
* **System Audit & Engine Control:** A dedicated, side-by-side panel displaying real-time system metrics (Integrity, Active Exams, Audited Submissions), a reactive **AI Engine configuration form** (Provider choice, Model select, API Key input), and full **System Compliance Logs** displaying every student trace.

### 2. Student Portal & Retake Gates
A secure, simplified workspace for student testing:
* **Frictionless Testing:** Start published exams, input detailed answers, and watch the live, animated AI grading interface process papers in real-time.
* **Detailed Corrections:** Get immediate performance score rings and inspect correction notes, strengths, and exact improvement suggestions.
* **Retake Permission Gate:** To prevent abuse, students are strictly locked out after submission. To retake an exam, they must click **"Request Retake Permission"**, which routes a request to the Faculty's dashboard. Once approved, their lockout is wiped and they are welcomed with a **"Begin Retake Exam"** call to action!

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
