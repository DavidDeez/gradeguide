import re
import os

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Basic Text Replacements
content = content.replace("GradeGuideApp", "EvaluateApp")
content = content.replace("GradeGuide AI", "Evaluate")
content = content.replace("GradeGuide", "Evaluate")
content = content.replace("gradeguide.com", "evaluate.com")

# 2. Authentication Logic Changes
# In StudentLoginScreen, change PIN to Email
content = re.sub(
    r"const StudentLoginScreen = \(\) => \{.*?(?=const LoginScreen = \(\) => \{)",
    """const StudentLoginScreen = () => {
    const [form, setForm] = React.useState({ matricNo: '', email: '' });
    const [err, setErr] = React.useState('');

    const handleLogin = (e) => {
      e.preventDefault();
      setErr('');
      const found = students.find(s => s.matricNo.toLowerCase() === form.matricNo.toLowerCase() && s.email.toLowerCase() === form.email.toLowerCase());
      if (!found) return setErr('No account found. Please check your matric number and email.');
      setStudentProfile(found);
      setRole('Student');
      setAuthScreen('landing');
    };

    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--panel-bg)', borderRadius: '20px', border: '1px solid var(--panel-border)', marginBottom: '16px' }}>
              <Brain size={40} color="var(--primary)" />
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Log in to your Student Portal</p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Email Address</label>
                <input className="input-field" type="email" placeholder="e.g. student@evaluate.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Matric Number</label>
                <input className="input-field" placeholder="e.g. 200101234" value={form.matricNo} onChange={e => setForm({...form, matricNo: e.target.value})} />
              </div>
              {err && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.85rem', color: 'var(--danger)' }}>{err}</div>}
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                <LogOut size={18}/> Log In
              </button>
            </form>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: '10px', fontSize: '0.85rem' }} onClick={() => setAuthScreen('landing')}>
              ← Back to Portal Selection
            </button>
          </div>
        </div>
      </div>
    );
  };

  """,
    content,
    flags=re.DOTALL
)

# Delete StudentSignupScreen and OtpVerificationScreen
content = re.sub(
    r"// ─── Student Signup Screen ───────────────────────────────────────────────.*?// ─── Student Login Screen",
    "// ─── Student Login Screen",
    content,
    flags=re.DOTALL
)

content = re.sub(
    r"// ─── Student Entry Choice Screen ─────────────────────────────────────────.*?// ─── Landing Screen ───────────────────────────────────────────────────────",
    "// ─── Landing Screen ───────────────────────────────────────────────────────",
    content,
    flags=re.DOTALL
)


# Route Auth Screens modifications
auth_routing = """
  if (!role) {
    if (authScreen === 'student-login') return <><GlobalStyles /><StudentLoginScreen /></>;
    return <><GlobalStyles /><LoginScreen />{loginModalRole && RoleLoginModal()}</>;
  }
"""

content = re.sub(
    r"// ─── Route Auth Screens ───────────────────────────────────────────────────.*?return \(",
    f"// ─── Route Auth Screens ───────────────────────────────────────────────────{auth_routing}\n  return (",
    content,
    flags=re.DOTALL
)


# Modify LoginScreen to add Admin role and remove Entry screen routing
new_login_screen = """
  const LoginScreen = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeIn 1s ease' }}>
        <div style={{ display: 'inline-flex', padding: '20px', background: 'var(--panel-bg)', borderRadius: '30px', border: '1px solid var(--panel-border)', marginBottom: '24px' }}>
          <Brain size={60} color="var(--primary)" />
        </div>
        <h1 className="brand-title">Evaluate</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', fontWeight: '500' }}>Academic Grading Infrastructure for the AI Age</p>
      </div>
      <div className="role-grid">
        {[
          { id: 'Student', icon: Smartphone, label: 'Student Portal', desc: 'Log in to take exams & view results' },
          { id: 'Lecturer', icon: ShieldCheck, label: 'Lecturer Dashboard', desc: 'Manage assessments, grading, and students' },
          { id: 'Admin', icon: Settings, label: 'Admin Portal', desc: 'System configuration and API management' }
        ].map(r => (
          <div key={r.id} className="role-card" onClick={() => {
            if (r.id === 'Student') {
              setAuthScreen('student-login');
            } else {
              setLoginModalRole(r.id);
              setLoginError('');
              setUsernameInput('');
              setPasswordInput('');
            }
          }}>
            <r.icon size={48} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>{r.label}</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{r.desc}</p>
            <div className="btn btn-outline" style={{ marginTop: 'auto', width: '100%' }}>Enter <ChevronRight size={16}/></div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
"""

content = re.sub(
    r"const LoginScreen = \(\) => \(.*?\);\n",
    new_login_screen,
    content,
    flags=re.DOTALL
)

# Update the RoleLoginModal logic for Admin and Lecturer
new_login_modal = """
  const RoleLoginModal = () => {
    const handleLogin = (e) => {
      e.preventDefault();
      setLoginError('');
      if (loginModalRole === 'Admin') {
        if (usernameInput.trim().toLowerCase() === 'admin@evaluate.com' && passwordInput === 'admin123') {
          setRole('Admin');
          setLoginModalRole(null);
        } else {
          setLoginError('Invalid Admin credentials');
        }
      } else if (loginModalRole === 'Lecturer') {
        if (usernameInput.trim().toLowerCase() === 'lecturer@evaluate.com' && passwordInput === 'lecturer123') {
          setRole('Lecturer');
          setLoginModalRole(null);
        } else {
          setLoginError('Invalid Lecturer credentials');
        }
      }
    };
"""

content = re.sub(
    r"const RoleLoginModal = \(\) => \{.*?const handleLogin = \(e\) => \{.*?\};",
    new_login_modal,
    content,
    flags=re.DOTALL
)


with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Evaluate.jsx updated successfully via script.")
