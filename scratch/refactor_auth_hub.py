import re

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update StudentLoginScreen
new_student_login = """
  const StudentLoginScreen = () => {
    const [step, setStep] = React.useState('matric'); // 'matric' or 'otp'
    const [form, setForm] = React.useState({ matricNo: '', pin: '' });
    const [err, setErr] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleGenerateOtp = async (e) => {
      e.preventDefault();
      setErr('');
      const foundIndex = students.findIndex(s => s.matricNo.toLowerCase() === form.matricNo.toLowerCase());
      if (foundIndex === -1) return setErr('No account found for this Matric Number.');
      
      setLoading(true);
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      const updatedStudents = [...students];
      updatedStudents[foundIndex].pin = otp;
      setStudents(updatedStudents);
      
      const sent = await sendOtpEmail(updatedStudents[foundIndex].email, updatedStudents[foundIndex].name, otp);
      setLoading(false);
      
      if (!sent) {
        setErr('Failed to send OTP email. Please contact the administrator.');
      } else {
        setStep('otp');
      }
    };

    const handleLogin = (e) => {
      e.preventDefault();
      setErr('');
      const found = students.find(s => s.matricNo.toLowerCase() === form.matricNo.toLowerCase() && s.pin === form.pin);
      if (!found) return setErr('Invalid OTP. Please check your email and try again.');
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
            {step === 'matric' ? (
              <form onSubmit={handleGenerateOtp}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Matric Number</label>
                  <input className="input-field" placeholder="e.g. 200101234" value={form.matricNo} onChange={e => setForm({...form, matricNo: e.target.value})} required />
                </div>
                {err && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.85rem', color: 'var(--danger)' }}>{err}</div>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }} disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Generate OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>6-Digit OTP</label>
                  <input className="input-field" type="password" inputMode="numeric" maxLength={6} placeholder="e.g. 123456" value={form.pin} onChange={e => setForm({...form, pin: e.target.value})} required />
                  <p style={{ margin: '8px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Sent to your registered email address.</p>
                </div>
                {err && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.85rem', color: 'var(--danger)' }}>{err}</div>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                  <LogOut size={18}/> Log In
                </button>
                <button type="button" className="btn btn-outline" style={{ width: '100%', marginTop: '10px', fontSize: '0.85rem' }} onClick={() => setStep('matric')}>
                  Change Matric Number
                </button>
              </form>
            )}
            <button className="btn btn-outline" style={{ width: '100%', marginTop: '10px', fontSize: '0.85rem', border: 'none' }} onClick={() => setAuthScreen('landing')}>
              ← Back to Portal Selection
            </button>
          </div>
        </div>
      </div>
    );
  };
"""

content = re.sub(
    r"  const StudentLoginScreen = \(\) => \{.*?// ─── Landing Screen",
    new_student_login + "\n  // ─── Landing Screen",
    content,
    flags=re.DOTALL
)

# 2. Update LoginScreen
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
      <div className="role-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '800px', margin: '0 auto' }}>
        {[
          { id: 'Student', icon: Smartphone, label: 'Student Portal', desc: 'Log in with Matric No. & Email OTP' },
          { id: 'Faculty', icon: ShieldCheck, label: 'Faculty Dashboard', desc: 'Secure entry for Lecturers & Admins' }
        ].map(r => (
          <div key={r.id} className="role-card" onClick={() => {
            if (r.id === 'Student') {
              setAuthScreen('student-login');
            } else {
              setLoginModalRole('Faculty');
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
    r"  const LoginScreen = \(\) => \(.*?</Footer>.*?</div>.*?</div>.*?\);",
    new_login_screen.strip(),
    content,
    flags=re.DOTALL
)

# 3. Update RoleLoginModal
new_role_modal = """
  const RoleLoginModal = () => {
    const handleLogin = (e) => {
      e.preventDefault();
      setLoginError('');
      if (passwordInput === 'admin') {
        setRole('FacultyHub');
        setLoginModalRole(null);
      } else {
        setLoginError('Invalid Faculty Password');
      }
    };

    return (
      <div className="modal-overlay" style={{ zIndex: 1100 }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '32px', textAlign: 'left', animation: 'slideUp 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={24} color="var(--primary)" /> Secure Access
            </h3>
            <button className="btn-outline" style={{ padding: '6px', border: 'none' }} onClick={() => setLoginModalRole(null)}>
              <X size={20} />
            </button>
          </div>
          
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.4' }}>
            You are attempting to access the high-privilege **Faculty Dashboard**. Please enter the global faculty password to continue.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 'bold' }}>Faculty Password</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="Enter password" 
                required 
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
              />
            </div>

            {loginError && (
              <div style={{ color: 'var(--danger)', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.08)', padding: '10px 14px', borderRadius: '8px', borderLeft: '2px solid var(--danger)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={14} /> {loginError}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '8px' }}>
              Authorize Entry
            </button>
          </form>
        </div>
      </div>
    );
  };

  const FacultyHubScreen = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', animation: 'fadeIn 1s ease' }}>
        <h1 className="brand-title">Faculty Hub</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>Select your workspace</p>
      </div>
      <div className="role-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '800px', margin: '0 auto' }}>
        <div className="role-card" onClick={() => { setRole('Lecturer'); setLecturerTab('build'); }}>
          <ShieldCheck size={48} color="var(--primary)" />
          <h3 style={{ margin: 0 }}>Lecturer Dashboard</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage assessments, grading, and students</p>
          <div className="btn btn-outline" style={{ marginTop: 'auto', width: '100%' }}>Enter <ChevronRight size={16}/></div>
        </div>
        <div className="role-card" onClick={() => { setRole('Admin'); setLecturerTab('audit'); }}>
          <Settings size={48} color="var(--primary)" />
          <h3 style={{ margin: 0 }}>Admin Portal</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>System configuration and API management</p>
          <div className="btn btn-outline" style={{ marginTop: 'auto', width: '100%' }}>Enter <ChevronRight size={16}/></div>
        </div>
      </div>
      <button className="btn btn-outline" style={{ marginTop: '40px', border: 'none' }} onClick={() => setRole(null)}>
        <LogOut size={18} style={{ marginRight: '8px' }}/> Sign Out
      </button>
    </div>
  );
"""

content = re.sub(
    r"  const RoleLoginModal = \(\) => \{.*?</div>\n    \);\n  \};\n",
    new_role_modal,
    content,
    flags=re.DOTALL
)

# 4. Route FacultyHubScreen at the bottom
route_auth_screens = """
  // ─── Route Auth Screens ───────────────────────────────────────────────────
  if (!role) {
    if (authScreen === 'student-login') return <><GlobalStyles /><StudentLoginScreen /></>;
    return <><GlobalStyles /><LoginScreen />{loginModalRole && RoleLoginModal()}</>;
  }

  if (role === 'FacultyHub') {
    return <><GlobalStyles /><FacultyHubScreen /></>;
  }
"""

content = re.sub(
    r"  // ─── Route Auth Screens ───────────────────────────────────────────────────\n  if \(\!role\) \{\n    if \(authScreen === 'student-login'\) return <><GlobalStyles \/><StudentLoginScreen \/><\/>;\n    return <><GlobalStyles \/><LoginScreen \/>\{loginModalRole && RoleLoginModal\(\)\}<\/>;\n  \}",
    route_auth_screens.strip(),
    content,
    flags=re.DOTALL
)


# 5. Remove automatic OTP generation from Lecturer "Add Student" and "Bulk Import"
add_student_clean = """
                    const name = document.getElementById('newStudName').value.trim();
                    const matricNo = document.getElementById('newStudMatric').value.trim();
                    const email = document.getElementById('newStudEmail').value.trim();
                    if(!name || !matricNo || !email) return alert("All fields are required.");
                    if(students.find(s => s.matricNo.toLowerCase() === matricNo.toLowerCase())) return alert("Matric Number exists!");
                    if(students.find(s => s.email.toLowerCase() === email.toLowerCase())) return alert("Email exists!");
                    
                    setStudents([{ name, matricNo, email }, ...students]);
                    alert(`Student added. They can generate an OTP from the Student Portal to log in.`);
                    
                    document.getElementById('newStudName').value = '';
                    document.getElementById('newStudMatric').value = '';
                    document.getElementById('newStudEmail').value = '';
"""

content = re.sub(
    r"                    const name = document\.getElementById\('newStudName'\)\.value\.trim\(\);\n.*?document\.getElementById\('newStudEmail'\)\.value = '';",
    add_student_clean.strip(),
    content,
    flags=re.DOTALL
)

bulk_import_clean = """
                    const text = document.getElementById('bulkStudCSV').value;
                    const lines = text.split('\\n').filter(l => l.trim());
                    const added = [];
                    lines.forEach(line => {
                      const [name, matricNo, email] = line.split(',').map(s => s.trim());
                      if(name && matricNo && email && !students.find(s => s.matricNo.toLowerCase() === matricNo.toLowerCase()) && !added.find(a => a.matricNo.toLowerCase() === matricNo.toLowerCase())) {
                        added.push({ name, matricNo, email });
                      }
                    });
                    if(added.length > 0) {
                      setStudents([...added, ...students]);
                      alert(`Successfully imported ${added.length} students! They can generate OTPs from the Student Portal.`);
                      document.getElementById('bulkStudCSV').value = '';
                    } else {
                      alert("No valid new students found to import. Check format and duplicates.");
                    }
"""

content = re.sub(
    r"                    const text = document\.getElementById\('bulkStudCSV'\)\.value;\n.*?alert\(\"No valid new students found to import\. Check format and duplicates\.\"\);\n                    \}",
    bulk_import_clean.strip(),
    content,
    flags=re.DOTALL
)

with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Auth refactor complete.")
