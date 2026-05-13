/**
 * API Client — handles all HTTP requests to the FastAPI backend.
 */
const API_BASE = 'http://localhost:8000/api';

const api = {
    /** Get stored JWT token */
    getToken() { return localStorage.getItem('token'); },

    /** Set JWT token */
    setToken(token) { localStorage.setItem('token', token); },

    /** Clear auth data */
    clearAuth() { localStorage.removeItem('token'); localStorage.removeItem('user'); },

    /** Get stored user */
    getUser() { const u = localStorage.getItem('user'); return u ? JSON.parse(u) : null; },

    /** Set stored user */
    setUser(user) { localStorage.setItem('user', JSON.stringify(user)); },

    /** Core fetch wrapper with auth headers */
    async request(endpoint, options = {}) {
        const headers = options.headers || {};
        const token = this.getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';

        const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
        if (res.status === 401) { this.clearAuth(); window.location.reload(); return; }
        if (res.status === 204) return null;
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Request failed');
        return data;
    },

    // --- Auth ---
    async register(email, password, fullName, role) {
        const data = await this.request('/auth/register', {
            method: 'POST', body: JSON.stringify({ email, password, full_name: fullName, role })
        });
        this.setToken(data.access_token); this.setUser(data.user);
        return data;
    },
    async login(email, password) {
        const data = await this.request('/auth/login', {
            method: 'POST', body: JSON.stringify({ email, password })
        });
        this.setToken(data.access_token); this.setUser(data.user);
        return data;
    },

    // --- Courses ---
    getCourses() { return this.request('/courses'); },
    getCourse(id) { return this.request(`/courses/${id}`); },
    createCourse(title, description) {
        return this.request('/courses', { method: 'POST', body: JSON.stringify({ title, description }) });
    },
    deleteCourse(id) { return this.request(`/courses/${id}`, { method: 'DELETE' }); },

    // --- Materials ---
    getMaterials(courseId) { return this.request(`/courses/${courseId}/materials`); },
    async uploadMaterial(courseId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.request(`/courses/${courseId}/materials`, { method: 'POST', body: formData });
    },
    deleteMaterial(id) { return this.request(`/materials/${id}`, { method: 'DELETE' }); },

    // --- Questions ---
    getQuestions(courseId) { return this.request(`/courses/${courseId}/questions`); },
    createQuestion(courseId, questionText, rubric, maxScore) {
        return this.request(`/courses/${courseId}/questions`, {
            method: 'POST', body: JSON.stringify({ question_text: questionText, rubric, max_score: maxScore })
        });
    },
    deleteQuestion(id) { return this.request(`/questions/${id}`, { method: 'DELETE' }); },

    // --- Grading ---
    submitAnswer(questionId, answerText, isDraft = false) {
        return this.request(`/questions/${questionId}/submit`, {
            method: 'POST', body: JSON.stringify({ answer_text: answerText, is_draft: isDraft })
        });
    },
    getMyGrades() { return this.request('/grades/my'); },
    getCourseGrades(courseId) { return this.request(`/courses/${courseId}/grades`); },
};
