import re
import os

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update StudentLoginScreen to use OTP (PIN)
new_login_screen = """const StudentLoginScreen = () => {
    const [form, setForm] = React.useState({ matricNo: '', pin: '' });
    const [err, setErr] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleLogin = (e) => {
      e.preventDefault();
      setErr('');
      const found = students.find(s => s.matricNo.toLowerCase() === form.matricNo.toLowerCase() && s.pin === form.pin);
      if (!found) return setErr('No account found. Please check your matric number and OTP/PIN.');
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
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Matric Number</label>
                <input className="input-field" placeholder="e.g. 200101234" value={form.matricNo} onChange={e => setForm({...form, matricNo: e.target.value})} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>6-Digit OTP / PIN</label>
                <input className="input-field" type="password" inputMode="numeric" maxLength={6} placeholder="e.g. 123456" value={form.pin} onChange={e => setForm({...form, pin: e.target.value})} />
                <p style={{ margin: '8px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Sent to your email by your Lecturer.</p>
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
  };"""

content = re.sub(
    r"const StudentLoginScreen = \(\) => \{.*?// ─── Landing Screen",
    new_login_screen + "\n\n  // ─── Landing Screen",
    content,
    flags=re.DOTALL
)

# 2. Update Student Management logic to generate and send OTP
add_student_logic = """
                    const name = document.getElementById('newStudName').value.trim();
                    const matricNo = document.getElementById('newStudMatric').value.trim();
                    const email = document.getElementById('newStudEmail').value.trim();
                    if(!name || !matricNo || !email) return alert("All fields are required.");
                    if(students.find(s => s.matricNo.toLowerCase() === matricNo.toLowerCase())) return alert("Matric Number exists!");
                    if(students.find(s => s.email.toLowerCase() === email.toLowerCase())) return alert("Email exists!");
                    
                    const otp = String(Math.floor(100000 + Math.random() * 900000));
                    setStudents([{ name, matricNo, email, pin: otp }, ...students]);
                    sendOtpEmail(email, name, otp); // Send email in background
                    alert(`Student added. An OTP (${otp}) was emailed to them for login.`);
                    
                    document.getElementById('newStudName').value = '';
                    document.getElementById('newStudMatric').value = '';
                    document.getElementById('newStudEmail').value = '';
"""

content = re.sub(
    r"                    const name = document\.getElementById\('newStudName'\)\.value\.trim\(\);\n.*?document\.getElementById\('newStudEmail'\)\.value = '';",
    add_student_logic.strip(),
    content,
    flags=re.DOTALL
)

bulk_import_logic = """
                    const text = document.getElementById('bulkStudCSV').value;
                    const lines = text.split('\\n').filter(l => l.trim());
                    const added = [];
                    lines.forEach(line => {
                      const [name, matricNo, email] = line.split(',').map(s => s.trim());
                      if(name && matricNo && email && !students.find(s => s.matricNo.toLowerCase() === matricNo.toLowerCase()) && !added.find(a => a.matricNo.toLowerCase() === matricNo.toLowerCase())) {
                        const otp = String(Math.floor(100000 + Math.random() * 900000));
                        added.push({ name, matricNo, email, pin: otp });
                        sendOtpEmail(email, name, otp); // Send emails in background
                      }
                    });
                    if(added.length > 0) {
                      setStudents([...added, ...students]);
                      alert(`Successfully imported ${added.length} students! OTP emails are being sent.`);
                      document.getElementById('bulkStudCSV').value = '';
                    } else {
                      alert("No valid new students found to import. Check format and duplicates.");
                    }
"""

content = re.sub(
    r"                    const text = document\.getElementById\('bulkStudCSV'\)\.value;\n.*?alert\(\"No valid new students found to import\. Check format and duplicates\.\"\);\n                    \}",
    bulk_import_logic.strip(),
    content,
    flags=re.DOTALL
)


with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Student management OTP and login updated successfully.")
