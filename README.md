# GradeGuide AI

**GradeGuide AI** is an Intelligent Academic Assessment Platform that leverages cutting-edge LLM and Vision AI models to completely automate the grading of student coursework and exams. It is built as a highly responsive, standalone React application.

![GradeGuide Interface](https://img.shields.io/badge/GradeGuide-Intelligent_Grading-3b82f6?style=for-the-badge)

## 🌟 Key Features

### 1. Multi-Role Portals
- **Lecturer Dashboard**: Manage course context, create assessments via a built-in builder, scan documents using the camera for OCR, and upload PDF grounding material. View live student submissions, AI feedback, and manually override scores.
- **Student Dashboard**: Browse available assessments, take tests with an animated live AI marking interface, and view detailed analytical feedback (scores, strengths, areas to improve).
- **Admin Dashboard**: Live system analytics monitoring assessment completions, submission throughput, and infrastructure compliance checks.

### 2. Dual AI Engine Configuration
The Global Settings modal allows seamless switching between two powerful backend inferencing approaches:
- **Anthropic Claude (Vision + Instruct)**: Utilize `claude-3-5-sonnet` (via your API key) to allow advanced PDF parsing and intelligent image OCR for course material ingestion.
- **HuggingFace Inference API**: Connect to any open-weights model (e.g., `mistralai/Mistral-7B-Instruct-v0.3`) for fully customizable, instruction-tuned LLM grading using a provided Access Token.

### 3. Smart Course Grounding
Upload PDFs or use your device camera to scan physical documents. GradeGuide automatically extracts the text via Claude Vision and uses it to establish a strict "source of truth" context window for the grading AI, ensuring zero hallucinations and purely objective marking.

### 4. Zero-Friction Architecture
Designed as a standalone, single-file React application (`GradeGuide.jsx`). The system utilizes intelligent global state management for instant cross-portal updates without requiring a backend database. Includes a sleek, modern UI with:
- Dark navy premium theming
- Smooth gradients
- Glassmorphism panels
- Animated SVG score rings

## 🚀 How to Run Locally

You do not need Node.js or `npm` installed! A native `index.html` wrapper handles the live Babel JSX transpilation.

1. Clone the repository:
   ```bash
   git clone https://github.com/DavidDeez/GradeGuide.git
   cd GradeGuide
   ```
2. Run a local HTTP server:
   ```bash
   python -m http.server 3000
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure
- `GradeGuide.jsx`: The core single-file React application containing all UI components, state logic, and API interactions.
- `index.html`: The standalone HTML wrapper with ES Module `importmap` configuring Babel and React CDNs.
- `docs/`: Phase 2 architectural design documents and UML diagrams.
- `ai-grader-pro/`: Initial legacy prototype components (Frontend/Backend).
