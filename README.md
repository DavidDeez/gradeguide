# GradeGuide 🧠

![GradeGuide Banner](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge) ![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react) ![Supabase](https://img.shields.io/badge/Database-Supabase-green?style=for-the-badge&logo=supabase)

**GradeGuide** is an advanced, serverless single-page React application designed to modernize and automate academic grading using state-of-the-art Artificial Intelligence. Built entirely without a Node.js backend dependency, GradeGuide uses on-the-fly Babel transpilation to execute instantly in the browser.

## 🌟 Key Features

### 1. Asymmetric Dual-Portal Ecosystem 🔐
- **Faculty Dashboard:** A high-privilege environment where lecturers can build assessments, upload marking guides, scan physical handwritten scripts using OCR, audit the AI Engine, and export structured CSV grade data.
- **Student Portal:** A secure, OTP-verified portal for students to take exams, upload PDF answer scripts, and receive instantly generated grade reports and qualitative AI feedback.
- **Robust Persistence:** Secure `localStorage` mechanisms maintain session state to prevent accidental logouts across both environments.

### 2. Multi-Model AI Grading Engine 🤖
GradeGuide does not rely on a single vendor. The application intelligently routes requests between multiple LLM architectures based on lecturer configuration:
- **OpenRouter Integration:** Access hundreds of models, including Llama 3, Mistral, and Gemma 2.
- **Google Gemini Direct API:** Native support for Gemini 1.5 Flash & Pro for high-speed multimodal processing.
- **Anthropic Claude & HuggingFace:** Configurable support for advanced logic pipelines.

*The prompt engineering forces the AI to act as a rigorous academic grader and plagiarism detector, returning mathematically parsed JSON data for the UI to digest.*

### 3. Serverless Cloud Synchronization ☁️
- Bypasses traditional REST APIs by interacting natively with a **Supabase PostgreSQL database**. 
- Utilizes a synchronized JSON blob (`app_state`) allowing real-time data flow between the Faculty and Student portals without a backend intermediary.

### 4. Advanced Technical Integrations 🛠️
- **EmailJS OTP Authentication:** Securely authenticates students and automatically dispatches beautifully formatted Grading Reports directly to their inboxes.
- **Browser-Native OCR:** Uses `navigator.mediaDevices.getUserMedia` to hijack the device camera, allowing lecturers to scan and transcribe handwritten, physical exam scripts entirely offline before pushing to the AI for grading.

### 5. Hyper-Responsive Glassmorphism UI 🎨
- The interface is heavily optimized for both massive desktop displays and mobile phones.
- Features deep backdrop blurring, dynamic SVG rendering (circular score rings), and a highly optimized **sliding-drawer mobile navigation architecture**.

## 🚀 Installation & Usage

Because GradeGuide is a truly serverless application utilizing in-browser JSX transpilation, installation is instant:

1. Clone this repository:
   ```bash
   git clone https://github.com/DavidDeez/GradeGuide.git
   ```
2. Open `index.html` in any modern browser. 
3. *No `npm install`, no build steps, no local server required.*

*(Note: In production environments, it is recommended to host the files on Vercel, Netlify, or GitHub Pages).*

## ⚙️ Configuration
Lecturers must configure the AI Engine upon first launch:
1. Log into the **Faculty Dashboard** (Default: `lecturer@gradeguide.com` / `admin123`).
2. Navigate to **System Audit & Engine**.
3. Select your preferred AI Provider and input your API Key.
4. Add your EmailJS public credentials if you wish to enable automated Student OTPs and Grade Emailing.

## 👨‍💻 Developer
Developed by **David Olukayode** for modern, AI-driven educational infrastructure.
