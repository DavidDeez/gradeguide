/**
 * AI-Grader Pro — Main Application
 * Single-page app with client-side routing
 */

const App = {
    currentPage: 'login',
    currentCourse: null,

    init() {
        const user = api.getUser();
        if (user && api.getToken()) { this.currentPage = 'dashboard'; }
        this.render();
    },

    navigate(page, data) {
        this.currentPage = page;
        if (data) this.currentCourse = data;
        this.render();
    },

    showToast(message, type = 'success') {
        const t = document.createElement('div');
        t.className = `toast toast-${type}`;
        t.textContent = message;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    },

    logout() {
        api.clearAuth();
        this.currentCourse = null;
        this.navigate('login');
    },

    render() {
        const app = document.getElementById('app');
        switch (this.currentPage) {
            case 'login': app.innerHTML = this.renderLogin(); this.bindLogin(); break;
            case 'register': app.innerHTML = this.renderRegister(); this.bindRegister(); break;
            case 'dashboard': app.innerHTML = this.renderDashboard(); this.loadDashboard(); break;
            case 'course': app.innerHTML = this.renderCoursePage(); this.loadCourse(); break;
            case 'questions': app.innerHTML = this.renderQuestionsPage(); this.loadQuestions(); break;
            case 'grades': app.innerHTML = this.renderGradesPage(); this.loadGrades(); break;
        }
    },

    // ======== AUTH PAGES ========
    renderLogin() {
        return `<div class="auth-container"><div class="auth-box fade-in">
            <div class="auth-logo"><h1><i class="fas fa-brain"></i> AI-Grader Pro</h1><p>Intelligent Course Assessment System</p></div>
            <div id="authError" class="auth-error" style="display:none"></div>
            <div class="form-group"><label>Email</label><input class="form-input" id="loginEmail" type="email" placeholder="you@university.edu"></div>
            <div class="form-group"><label>Password</label><input class="form-input" id="loginPass" type="password" placeholder="Enter password"></div>
            <button class="btn btn-primary btn-block" id="loginBtn"><i class="fas fa-sign-in-alt"></i> Sign In</button>
            <div class="auth-toggle">Don't have an account? <a id="goRegister">Register here</a></div>
        </div></div>`;
    },
    bindLogin() {
        document.getElementById('goRegister').onclick = () => this.navigate('register');
        document.getElementById('loginBtn').onclick = async () => {
            const btn = document.getElementById('loginBtn');
            btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
            try {
                await api.login(document.getElementById('loginEmail').value, document.getElementById('loginPass').value);
                this.navigate('dashboard');
            } catch (e) {
                document.getElementById('authError').style.display = 'block';
                document.getElementById('authError').textContent = e.message;
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
            }
        };
        document.getElementById('loginPass').onkeydown = (e) => { if (e.key === 'Enter') document.getElementById('loginBtn').click(); };
    },

    renderRegister() {
        return `<div class="auth-container"><div class="auth-box fade-in">
            <div class="auth-logo"><h1><i class="fas fa-brain"></i> AI-Grader Pro</h1><p>Create your account</p></div>
            <div id="authError" class="auth-error" style="display:none"></div>
            <div class="form-group"><label>Full Name</label><input class="form-input" id="regName" placeholder="John Doe"></div>
            <div class="form-group"><label>Email</label><input class="form-input" id="regEmail" type="email" placeholder="you@university.edu"></div>
            <div class="form-group"><label>Password</label><input class="form-input" id="regPass" type="password" placeholder="Min 6 characters"></div>
            <div class="form-group"><label>I am a</label>
                <div class="role-toggle"><button class="role-option active" data-role="student">Student</button><button class="role-option" data-role="lecturer">Lecturer</button></div>
            </div>
            <input type="hidden" id="regRole" value="student">
            <button class="btn btn-primary btn-block" id="regBtn"><i class="fas fa-user-plus"></i> Create Account</button>
            <div class="auth-toggle">Already have an account? <a id="goLogin">Sign in</a></div>
        </div></div>`;
    },
    bindRegister() {
        document.getElementById('goLogin').onclick = () => this.navigate('login');
        document.querySelectorAll('.role-option').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.role-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('regRole').value = btn.dataset.role;
            };
        });
        document.getElementById('regBtn').onclick = async () => {
            const btn = document.getElementById('regBtn');
            btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
            try {
                await api.register(
                    document.getElementById('regEmail').value,
                    document.getElementById('regPass').value,
                    document.getElementById('regName').value,
                    document.getElementById('regRole').value
                );
                this.navigate('dashboard');
            } catch (e) {
                document.getElementById('authError').style.display = 'block';
                document.getElementById('authError').textContent = e.message;
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
            }
        };
    },

    // ======== DASHBOARD LAYOUT ========
    dashboardShell(content, activePage) {
        const user = api.getUser();
        const initial = user ? user.full_name.charAt(0).toUpperCase() : '?';
        const isLecturer = user && (user.role === 'lecturer' || user.role === 'admin');
        return `<div class="dashboard">
            <aside class="sidebar">
                <div class="sidebar-logo"><h2><i class="fas fa-brain"></i> AI-Grader</h2><span>Pro v1.0</span></div>
                <nav class="nav-menu">
                    <div class="nav-item ${activePage==='dashboard'?'active':''}" onclick="App.navigate('dashboard')"><i class="fas fa-home"></i> Dashboard</div>
                    <div class="nav-item ${activePage==='grades'?'active':''}" onclick="App.navigate('grades')"><i class="fas fa-chart-bar"></i> ${isLecturer?'All Grades':'My Grades'}</div>
                </nav>
                <div class="sidebar-footer">
                    <div class="user-info"><div class="user-avatar">${initial}</div><div><div class="user-name">${user?user.full_name:''}</div><div class="user-role">${user?user.role:''}</div></div></div>
                    <button class="btn btn-secondary btn-sm btn-block" style="margin-top:12px" onclick="App.logout()"><i class="fas fa-sign-out-alt"></i> Logout</button>
                </div>
            </aside>
            <main class="main-content">${content}</main>
        </div>`;
    },

    // ======== DASHBOARD ========
    renderDashboard() {
        return this.dashboardShell(`
            <div class="page-header"><h1>Dashboard</h1><p>Welcome back! Manage your courses and assessments.</p></div>
            <div class="stats-grid" id="statsGrid"></div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                <h2>Your Courses</h2>
                ${api.getUser()?.role==='lecturer'?'<button class="btn btn-primary btn-sm" onclick="App.showCreateCourse()"><i class="fas fa-plus"></i> New Course</button>':''}
            </div>
            <div class="content-grid" id="coursesList"></div>
            <div id="modalContainer"></div>
        `, 'dashboard');
    },
    async loadDashboard() {
        try {
            const courses = await api.getCourses();
            const user = api.getUser();
            const isLecturer = user.role === 'lecturer';

            // Stats
            let totalQ = 0; courses.forEach(c => totalQ += c.question_count);
            document.getElementById('statsGrid').innerHTML = `
                <div class="stat-card"><div class="stat-icon purple"><i class="fas fa-book"></i></div><div><div class="stat-value">${courses.length}</div><div class="stat-label">Courses</div></div></div>
                <div class="stat-card"><div class="stat-icon green"><i class="fas fa-file-alt"></i></div><div><div class="stat-value">${courses.reduce((a,c)=>a+c.material_count,0)}</div><div class="stat-label">Materials</div></div></div>
                <div class="stat-card"><div class="stat-icon yellow"><i class="fas fa-question-circle"></i></div><div><div class="stat-value">${totalQ}</div><div class="stat-label">Questions</div></div></div>
                <div class="stat-card"><div class="stat-icon blue"><i class="fas fa-robot"></i></div><div><div class="stat-value">Free</div><div class="stat-label">AI Engine (Local NLP)</div></div></div>
            `;

            // Course cards
            if (!courses.length) {
                document.getElementById('coursesList').innerHTML = `<div class="empty-state"><i class="fas fa-book-open"></i><h3>No courses yet</h3><p>${isLecturer?'Create your first course to get started.':'No courses available. Ask your lecturer to create one.'}</p></div>`;
                return;
            }
            document.getElementById('coursesList').innerHTML = courses.map(c => `
                <div class="card fade-in" style="cursor:pointer" onclick="App.navigate('course',${JSON.stringify(c).replace(/"/g,'&quot;')})">
                    <div class="card-header"><div class="card-title">${this.esc(c.title)}</div><span class="badge badge-info">${c.material_count} files</span></div>
                    <p style="color:var(--text-secondary);font-size:14px;margin-bottom:12px">${this.esc(c.description||'No description')}</p>
                    <div style="display:flex;gap:12px;font-size:13px;color:var(--text-muted)">
                        <span><i class="fas fa-question-circle"></i> ${c.question_count} questions</span>
                    </div>
                </div>
            `).join('');
        } catch (e) { this.showToast(e.message, 'error'); }
    },
    showCreateCourse() {
        document.getElementById('modalContainer').innerHTML = `
            <div class="modal-overlay" onclick="if(event.target===this)App.closeModal()">
                <div class="modal fade-in">
                    <div class="modal-header"><h2>Create Course</h2><button class="modal-close" onclick="App.closeModal()">&times;</button></div>
                    <div class="form-group"><label>Course Title</label><input class="form-input" id="courseTitle" placeholder="e.g. CSC301 — Operating Systems"></div>
                    <div class="form-group"><label>Description (optional)</label><textarea class="form-textarea" id="courseDesc" placeholder="Brief course description" rows="3"></textarea></div>
                    <button class="btn btn-primary btn-block" id="createCourseBtn"><i class="fas fa-plus"></i> Create Course</button>
                </div>
            </div>`;
        document.getElementById('createCourseBtn').onclick = async () => {
            try {
                await api.createCourse(document.getElementById('courseTitle').value, document.getElementById('courseDesc').value);
                this.closeModal(); this.showToast('Course created!'); this.loadDashboard();
            } catch (e) { this.showToast(e.message, 'error'); }
        };
    },
    closeModal() { document.getElementById('modalContainer').innerHTML = ''; },

    // ======== COURSE PAGE ========
    renderCoursePage() {
        const c = this.currentCourse;
        const isLecturer = api.getUser()?.role === 'lecturer';
        return this.dashboardShell(`
            <div class="page-header">
                <p style="cursor:pointer;color:var(--accent);margin-bottom:8px" onclick="App.navigate('dashboard')"><i class="fas fa-arrow-left"></i> Back to Dashboard</p>
                <h1>${this.esc(c.title)}</h1>
                <p>${this.esc(c.description||'')}</p>
            </div>
            ${isLecturer?`
            <div class="card" style="margin-bottom:24px">
                <div class="card-header"><div class="card-title"><i class="fas fa-upload"></i> Upload Course Material</div></div>
                <div class="upload-zone" id="uploadZone">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Click or drag files here to upload</p>
                    <p class="formats">Supported: PDF, DOCX, TXT (max 20MB)</p>
                    <input type="file" id="fileInput" style="display:none" accept=".pdf,.docx,.txt">
                </div>
                <div id="uploadProgress" style="display:none;margin-top:12px;color:var(--accent)"><i class="fas fa-spinner fa-spin"></i> Uploading and processing...</div>
            </div>`:''}
            <h2 style="margin-bottom:16px"><i class="fas fa-file-alt"></i> Materials</h2>
            <div id="materialsList" style="margin-bottom:32px"></div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
                <h2><i class="fas fa-question-circle"></i> Questions</h2>
                ${isLecturer?'<button class="btn btn-primary btn-sm" onclick="App.showCreateQuestion()"><i class="fas fa-plus"></i> Add Question</button>':''}
            </div>
            <div id="questionsList"></div>
            <div id="modalContainer"></div>
        `, 'dashboard');
    },
    async loadCourse() {
        const c = this.currentCourse;
        const isLecturer = api.getUser()?.role === 'lecturer';
        // Bind upload
        if (isLecturer) {
            const zone = document.getElementById('uploadZone');
            const input = document.getElementById('fileInput');
            if (zone) {
                zone.onclick = () => input.click();
                zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('dragover'); };
                zone.ondragleave = () => zone.classList.remove('dragover');
                zone.ondrop = (e) => { e.preventDefault(); zone.classList.remove('dragover'); this.handleUpload(e.dataTransfer.files[0]); };
                input.onchange = () => { if (input.files[0]) this.handleUpload(input.files[0]); };
            }
        }
        // Load materials
        try {
            const mats = await api.getMaterials(c.id);
            if (!mats.length) {
                document.getElementById('materialsList').innerHTML = '<div class="empty-state"><i class="fas fa-folder-open"></i><h3>No materials uploaded</h3></div>';
            } else {
                document.getElementById('materialsList').innerHTML = mats.map(m => `
                    <div class="file-item fade-in">
                        <div class="file-info">
                            <div class="file-icon"><i class="fas fa-file-${m.file_type==='pdf'?'pdf':m.file_type==='docx'?'word':'alt'}"></i></div>
                            <div><div style="font-weight:500">${this.esc(m.filename)}</div><div style="font-size:12px;color:var(--text-muted)">${(m.file_size_bytes/1024).toFixed(1)} KB • ${m.file_type.toUpperCase()}</div></div>
                        </div>
                        ${isLecturer?`<button class="btn btn-danger btn-sm" onclick="App.deleteMaterial(${m.id})"><i class="fas fa-trash"></i></button>`:''}
                    </div>
                `).join('');
            }
        } catch (e) { this.showToast(e.message, 'error'); }
        // Load questions
        try {
            const qs = await api.getQuestions(c.id);
            if (!qs.length) {
                document.getElementById('questionsList').innerHTML = '<div class="empty-state"><i class="fas fa-clipboard-question"></i><h3>No questions yet</h3></div>';
            } else {
                document.getElementById('questionsList').innerHTML = qs.map(q => `
                    <div class="card fade-in" style="margin-bottom:12px">
                        <div class="card-header">
                            <div class="card-title">Q: ${this.esc(q.question_text.substring(0,100))}${q.question_text.length>100?'...':''}</div>
                            <span class="badge badge-info">${q.max_score} pts</span>
                        </div>
                        ${q.rubric?`<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px"><strong>Rubric:</strong> ${this.esc(q.rubric.substring(0,150))}</p>`:''}
                        <div style="display:flex;gap:8px">
                            ${!isLecturer?`<button class="btn btn-primary btn-sm" onclick='App.showAnswerForm(${JSON.stringify(q).replace(/'/g,"&#39;")})'><i class="fas fa-pen"></i> Answer</button>`:''}
                            ${isLecturer?`<button class="btn btn-danger btn-sm" onclick="App.deleteQuestion(${q.id})"><i class="fas fa-trash"></i></button>`:''}
                        </div>
                    </div>
                `).join('');
            }
        } catch (e) { this.showToast(e.message, 'error'); }
    },
    async handleUpload(file) {
        if (!file) return;
        document.getElementById('uploadProgress').style.display = 'block';
        try {
            await api.uploadMaterial(this.currentCourse.id, file);
            this.showToast('Material uploaded and processed!');
            document.getElementById('uploadProgress').style.display = 'none';
            this.loadCourse();
        } catch (e) {
            document.getElementById('uploadProgress').style.display = 'none';
            this.showToast(e.message, 'error');
        }
    },
    async deleteMaterial(id) {
        if (!confirm('Delete this material?')) return;
        try { await api.deleteMaterial(id); this.showToast('Material deleted'); this.loadCourse(); }
        catch (e) { this.showToast(e.message, 'error'); }
    },
    showCreateQuestion() {
        document.getElementById('modalContainer').innerHTML = `
            <div class="modal-overlay" onclick="if(event.target===this)App.closeModal()">
                <div class="modal fade-in">
                    <div class="modal-header"><h2>Create Question</h2><button class="modal-close" onclick="App.closeModal()">&times;</button></div>
                    <div class="form-group"><label>Question</label><textarea class="form-textarea" id="qText" rows="4" placeholder="Type your theoretical question here..."></textarea></div>
                    <div class="form-group"><label>Rubric / Marking Guide (optional)</label><textarea class="form-textarea" id="qRubric" rows="3" placeholder="e.g. Must mention X, Y, Z concepts"></textarea></div>
                    <div class="form-group"><label>Max Score</label><input class="form-input" id="qMax" type="number" value="100" min="1"></div>
                    <button class="btn btn-primary btn-block" id="createQBtn"><i class="fas fa-plus"></i> Create Question</button>
                </div>
            </div>`;
        document.getElementById('createQBtn').onclick = async () => {
            try {
                await api.createQuestion(this.currentCourse.id, document.getElementById('qText').value, document.getElementById('qRubric').value || null, parseInt(document.getElementById('qMax').value));
                this.closeModal(); this.showToast('Question created!'); this.loadCourse();
            } catch (e) { this.showToast(e.message, 'error'); }
        };
    },
    async deleteQuestion(id) {
        if (!confirm('Delete this question?')) return;
        try { await api.deleteQuestion(id); this.showToast('Question deleted'); this.loadCourse(); }
        catch (e) { this.showToast(e.message, 'error'); }
    },
    showAnswerForm(question) {
        document.getElementById('modalContainer').innerHTML = `
            <div class="modal-overlay" onclick="if(event.target===this)App.closeModal()">
                <div class="modal fade-in">
                    <div class="modal-header"><h2>Submit Answer</h2><button class="modal-close" onclick="App.closeModal()">&times;</button></div>
                    <div style="background:var(--bg-input);padding:14px;border-radius:8px;margin-bottom:16px;font-size:14px"><strong>Question:</strong> ${this.esc(question.question_text)}</div>
                    ${question.rubric?`<div style="font-size:13px;color:var(--text-muted);margin-bottom:16px"><strong>Marking criteria:</strong> ${this.esc(question.rubric)}</div>`:''}
                    <div class="form-group"><label>Your Answer</label><textarea class="form-textarea" id="answerText" rows="8" placeholder="Type your answer here..."></textarea></div>
                    <div style="display:flex;gap:8px">
                        <button class="btn btn-primary" id="submitAnswerBtn" style="flex:1"><i class="fas fa-paper-plane"></i> Submit & Grade</button>
                    </div>
                    <div id="gradingResult" style="margin-top:20px"></div>
                </div>
            </div>`;
        document.getElementById('submitAnswerBtn').onclick = async () => {
            const btn = document.getElementById('submitAnswerBtn');
            btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Grading with AI...';
            try {
                const result = await api.submitAnswer(question.id, document.getElementById('answerText').value);
                if (result.grade) {
                    const g = result.grade;
                    const pct = g.percentage;
                    const cls = pct >= 80 ? 'grade-excellent' : pct >= 60 ? 'grade-good' : pct >= 40 ? 'grade-fair' : 'grade-poor';
                    document.getElementById('gradingResult').innerHTML = `
                        <div class="card fade-in" style="text-align:center">
                            <div class="grade-circle ${cls}" style="--pct:${pct}" data-score="${g.score}/${g.max_score}"></div>
                            <div style="font-size:18px;font-weight:600;margin-bottom:4px">${pct}%</div>
                            <span class="badge ${pct>=80?'badge-success':pct>=60?'badge-info':pct>=40?'badge-warning':'badge-danger'}">${pct>=80?'Excellent':pct>=60?'Good':pct>=40?'Fair':'Needs Improvement'}</span>
                            <div class="feedback-box" style="text-align:left;margin-top:16px">${this.esc(g.feedback)}</div>
                            ${g.referenced_content?`<details style="margin-top:12px;text-align:left;font-size:13px"><summary style="cursor:pointer;color:var(--accent)">View Referenced Material</summary><div class="feedback-box" style="margin-top:8px;font-size:12px">${this.esc(g.referenced_content)}</div></details>`:''}
                        </div>`;
                    btn.style.display = 'none';
                }
            } catch (e) {
                this.showToast(e.message, 'error');
                btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit & Grade';
            }
        };
    },

    // ======== GRADES PAGE ========
    renderGradesPage() {
        const isLecturer = api.getUser()?.role === 'lecturer';
        return this.dashboardShell(`
            <div class="page-header"><h1>${isLecturer?'All Student Grades':'My Grades'}</h1><p>${isLecturer?'View grades across your courses':'View your graded submissions'}</p></div>
            ${isLecturer?`<div class="form-group"><label>Select Course</label><select class="form-select" id="gradeCourseSelect"><option value="">Loading...</option></select></div>`:''}
            <div id="gradesContent"></div>
        `, 'grades');
    },
    async loadGrades() {
        const isLecturer = api.getUser()?.role === 'lecturer';
        if (isLecturer) {
            const courses = await api.getCourses();
            const sel = document.getElementById('gradeCourseSelect');
            sel.innerHTML = '<option value="">— Select a course —</option>' + courses.map(c => `<option value="${c.id}">${this.esc(c.title)}</option>`).join('');
            sel.onchange = async () => {
                if (!sel.value) return;
                try {
                    const grades = await api.getCourseGrades(sel.value);
                    if (!grades.length) { document.getElementById('gradesContent').innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><h3>No submissions yet</h3></div>'; return; }
                    document.getElementById('gradesContent').innerHTML = `<div class="card"><table class="data-table">
                        <thead><tr><th>Student</th><th>Question</th><th>Score</th><th>%</th></tr></thead>
                        <tbody>${grades.map(g => `<tr><td>${this.esc(g.student_name)}</td><td>${this.esc(g.question_text)}</td><td>${g.score}/${g.max_score}</td><td><span class="badge ${g.percentage>=80?'badge-success':g.percentage>=60?'badge-info':g.percentage>=40?'badge-warning':'badge-danger'}">${g.percentage}%</span></td></tr>`).join('')}</tbody>
                    </table></div>`;
                } catch (e) { this.showToast(e.message, 'error'); }
            };
        } else {
            try {
                const grades = await api.getMyGrades();
                if (!grades.length) { document.getElementById('gradesContent').innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><h3>No grades yet</h3><p>Submit answers to questions to see your grades here.</p></div>'; return; }
                document.getElementById('gradesContent').innerHTML = grades.filter(a=>a.grade).map(a => {
                    const g = a.grade;
                    const pct = g.percentage;
                    return `<div class="card fade-in" style="margin-bottom:16px">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                            <div class="card-title">Question #${a.question_id}</div>
                            <span class="badge ${pct>=80?'badge-success':pct>=60?'badge-info':pct>=40?'badge-warning':'badge-danger'}">${g.score}/${g.max_score} (${pct}%)</span>
                        </div>
                        <div class="feedback-box">${this.esc(g.feedback)}</div>
                    </div>`;
                }).join('');
            } catch (e) { this.showToast(e.message, 'error'); }
        }
    },

    renderQuestionsPage() { return this.renderCoursePage(); },
    loadQuestions() { this.loadCourse(); },
    esc(str) { if(!str)return''; const d=document.createElement('div'); d.textContent=str; return d.innerHTML; }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
