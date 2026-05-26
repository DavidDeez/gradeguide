import re
import os

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Insert Tab in Mobile Menu
mobile_tab = """          <div className={`side-nav-tab ${lecturerTab === 'scanner' ? 'active' : ''}`} onClick={() => { setLecturerTab('scanner'); setIsMobileMenuOpen(false); }}>📸 Offline Scanner</div>
          <div className={`side-nav-tab ${lecturerTab === 'students' ? 'active' : ''}`} onClick={() => { setLecturerTab('students'); setIsMobileMenuOpen(false); }}>👥 Student Management</div>"""
content = re.sub(
    r"          <div className=\{`side-nav-tab \$\{lecturerTab === 'scanner' \? 'active' : ''\}`\} onClick=\{\(\) => \{ setLecturerTab\('scanner'\); setIsMobileMenuOpen\(false\); \}\}>📸 Offline Scanner</div>",
    mobile_tab,
    content
)

# 2. Insert Tab in Desktop Menu
desktop_tab = """            <div className={`nav-tab ${lecturerTab === 'scanner' ? 'active' : ''}`} onClick={() => setLecturerTab('scanner')}>Offline Scanner</div>
            <div className={`nav-tab ${lecturerTab === 'students' ? 'active' : ''}`} onClick={() => setLecturerTab('students')}>Student Management</div>"""
content = re.sub(
    r"            <div className=\{`nav-tab \$\{lecturerTab === 'scanner' \? 'active' : ''\}`\} onClick=\{\(\) => setLecturerTab\('scanner'\)\}>Offline Scanner</div>",
    desktop_tab,
    content
)

# 3. Create Student Management Component Code
student_mgmt_code = """
        {lecturerTab === 'students' && (
          <div className="dashboard-grid">
            <div className="glass-panel" style={{ padding: '40px' }}>
              <h2 style={{ marginTop: 0, marginBottom: '24px' }}>Student Management</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div>
                  <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Add Individual Student</h3>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>Full Name</label>
                    <input className="input-field" id="newStudName" placeholder="e.g. John Doe" />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>Matric Number</label>
                    <input className="input-field" id="newStudMatric" placeholder="e.g. 200101234" />
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>Email Address</label>
                    <input className="input-field" id="newStudEmail" type="email" placeholder="student@university.edu" />
                  </div>
                  <button className="btn btn-primary" onClick={() => {
                    const name = document.getElementById('newStudName').value.trim();
                    const matricNo = document.getElementById('newStudMatric').value.trim();
                    const email = document.getElementById('newStudEmail').value.trim();
                    if(!name || !matricNo || !email) return alert("All fields are required.");
                    if(students.find(s => s.matricNo.toLowerCase() === matricNo.toLowerCase())) return alert("Matric Number exists!");
                    if(students.find(s => s.email.toLowerCase() === email.toLowerCase())) return alert("Email exists!");
                    setStudents([{ name, matricNo, email }, ...students]);
                    document.getElementById('newStudName').value = '';
                    document.getElementById('newStudMatric').value = '';
                    document.getElementById('newStudEmail').value = '';
                  }}>+ Add Student</button>
                </div>

                <div>
                  <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Bulk Import (CSV)</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Format: Name, MatricNo, Email (one per line)</p>
                  <textarea id="bulkStudCSV" className="input-field scrollbar" rows={6} placeholder="John Doe, 2001, john@edu.com\\nJane Smith, 2002, jane@edu.com"></textarea>
                  <button className="btn btn-outline" style={{ marginTop: '16px' }} onClick={() => {
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
                      alert(`Successfully imported ${added.length} students!`);
                      document.getElementById('bulkStudCSV').value = '';
                    } else {
                      alert("No valid new students found to import. Check format and duplicates.");
                    }
                  }}>Import CSV</button>
                </div>
              </div>

              <div style={{ marginTop: '40px' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Registered Students ({students.length})</h3>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }} className="scrollbar">
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.05)', position: 'sticky', top: 0 }}>
                      <tr>
                        <th style={{ padding: '12px' }}>Name</th>
                        <th style={{ padding: '12px' }}>Matric No</th>
                        <th style={{ padding: '12px' }}>Email</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(s => (
                        <tr key={s.matricNo} style={{ borderBottom: '1px solid var(--panel-border)' }}>
                          <td style={{ padding: '12px' }}>{s.name}</td>
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: 'var(--primary)' }}>{s.matricNo}</td>
                          <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{s.email}</td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>
                            <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '0.8rem', color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.2)' }} onClick={() => {
                              if(window.confirm(`Remove ${s.name}?`)) setStudents(students.filter(stud => stud.matricNo !== s.matricNo));
                            }}>Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
"""

content = re.sub(
    r"        \{lecturerTab === 'audit' && \(",
    student_mgmt_code + "\n        {lecturerTab === 'audit' && (",
    content
)


with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Student management tab inserted successfully.")
