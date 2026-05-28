import re

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Make LecturerDashboard render for Admin as well
content = content.replace("{role === 'Lecturer' && LecturerDashboard()}", "{(role === 'Lecturer' || role === 'Admin') && LecturerDashboard()}")

# Hide tabs in LecturerDashboard if role === 'Admin'
# Replace the side menu
side_menu_old = """
        <div className={`side-menu glass-panel ${isMobileMenuOpen ? 'open' : ''}`} style={{ padding: '20px 12px' }}>
          <h3 style={{ margin: '0 0 16px 12px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Faculty Portal</h3>
          <div className={`side-nav-tab ${lecturerTab === 'build' ? 'active' : ''}`} onClick={() => { setLecturerTab('build'); setIsMobileMenuOpen(false); }}>🛠️ Assessment Builder</div>
          <div className={`side-nav-tab ${lecturerTab === 'scanner' ? 'active' : ''}`} onClick={() => { setLecturerTab('scanner'); setIsMobileMenuOpen(false); }}>📸 Offline Scanner</div>
          <div className={`side-nav-tab ${lecturerTab === 'students' ? 'active' : ''}`} onClick={() => { setLecturerTab('students'); setIsMobileMenuOpen(false); }}>👥 Student Management</div>
          <div className={`side-nav-tab ${lecturerTab === 'results' ? 'active' : ''}`} onClick={() => { setLecturerTab('results'); setIsMobileMenuOpen(false); }}>
            📝 Grading Desk
            {retakeRequests.filter(r => r.status === 'pending').length > 0 && (
              <span className="badge badge-success" style={{ marginLeft: 'auto', background: 'var(--danger)', color: 'white' }}>
                {retakeRequests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </div>
          <div className={`side-nav-tab ${lecturerTab === 'audit' ? 'active' : ''}`} onClick={() => setLecturerTab('audit')}>⚙️ System Audit & Engine</div>
        </div>
"""

side_menu_new = """
        <div className={`side-menu glass-panel ${isMobileMenuOpen ? 'open' : ''}`} style={{ padding: '20px 12px' }}>
          <h3 style={{ margin: '0 0 16px 12px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{role === 'Admin' ? 'Admin Portal' : 'Faculty Portal'}</h3>
          
          {role !== 'Admin' && (
            <>
              <div className={`side-nav-tab ${lecturerTab === 'build' ? 'active' : ''}`} onClick={() => { setLecturerTab('build'); setIsMobileMenuOpen(false); }}>🛠️ Assessment Builder</div>
              <div className={`side-nav-tab ${lecturerTab === 'scanner' ? 'active' : ''}`} onClick={() => { setLecturerTab('scanner'); setIsMobileMenuOpen(false); }}>📸 Offline Scanner</div>
              <div className={`side-nav-tab ${lecturerTab === 'students' ? 'active' : ''}`} onClick={() => { setLecturerTab('students'); setIsMobileMenuOpen(false); }}>👥 Student Management</div>
              <div className={`side-nav-tab ${lecturerTab === 'results' ? 'active' : ''}`} onClick={() => { setLecturerTab('results'); setIsMobileMenuOpen(false); }}>
                📝 Grading Desk
                {retakeRequests.filter(r => r.status === 'pending').length > 0 && (
                  <span className="badge badge-success" style={{ marginLeft: 'auto', background: 'var(--danger)', color: 'white' }}>
                    {retakeRequests.filter(r => r.status === 'pending').length}
                  </span>
                )}
              </div>
            </>
          )}
          <div className={`side-nav-tab ${lecturerTab === 'audit' ? 'active' : ''}`} onClick={() => setLecturerTab('audit')}>⚙️ System Audit & Engine</div>
        </div>
"""
content = content.replace(side_menu_old.strip(), side_menu_new.strip())

# Replace the desktop top nav
top_nav_old = """
          <div className="nav-container" style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid var(--panel-border)' }}>
            <div className={`nav-tab ${lecturerTab === 'build' ? 'active' : ''}`} onClick={() => setLecturerTab('build')}>Assessment Builder</div>
            <div className={`nav-tab ${lecturerTab === 'scanner' ? 'active' : ''}`} onClick={() => setLecturerTab('scanner')}>Offline Scanner</div>
            <div className={`nav-tab ${lecturerTab === 'students' ? 'active' : ''}`} onClick={() => setLecturerTab('students')}>Student Management</div>
            <div className={`nav-tab ${lecturerTab === 'results' ? 'active' : ''}`} onClick={() => setLecturerTab('results')}>
              Grading Desk
              {retakeRequests.filter(r => r.status === 'pending').length > 0 && (
                <span className="badge badge-success" style={{ marginLeft: '8px', background: 'var(--danger)', color: 'white' }}>
                  {retakeRequests.filter(r => r.status === 'pending').length} New
                </span>
              )}
            </div>
            <div className={`nav-tab ${lecturerTab === 'audit' ? 'active' : ''}`} onClick={() => setLecturerTab('audit')}>System Audit & Engine</div>
          </div>
"""

top_nav_new = """
          <div className="nav-container" style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid var(--panel-border)' }}>
            {role !== 'Admin' && (
              <>
                <div className={`nav-tab ${lecturerTab === 'build' ? 'active' : ''}`} onClick={() => setLecturerTab('build')}>Assessment Builder</div>
                <div className={`nav-tab ${lecturerTab === 'scanner' ? 'active' : ''}`} onClick={() => setLecturerTab('scanner')}>Offline Scanner</div>
                <div className={`nav-tab ${lecturerTab === 'students' ? 'active' : ''}`} onClick={() => setLecturerTab('students')}>Student Management</div>
                <div className={`nav-tab ${lecturerTab === 'results' ? 'active' : ''}`} onClick={() => setLecturerTab('results')}>
                  Grading Desk
                  {retakeRequests.filter(r => r.status === 'pending').length > 0 && (
                    <span className="badge badge-success" style={{ marginLeft: '8px', background: 'var(--danger)', color: 'white' }}>
                      {retakeRequests.filter(r => r.status === 'pending').length} New
                    </span>
                  )}
                </div>
              </>
            )}
            <div className={`nav-tab ${lecturerTab === 'audit' ? 'active' : ''}`} onClick={() => setLecturerTab('audit')}>System Audit & Engine</div>
          </div>
"""
content = content.replace(top_nav_old.strip(), top_nav_new.strip())

# When role is Admin, force default tab to audit upon login.
role_login_modal_old = """
      if (loginModalRole === 'Admin') {
        if (usernameInput.trim().toLowerCase() === 'admin@evaluate.com' && passwordInput === 'admin') {
          setRole('Admin');
          setLoginModalRole(null);
        } else {
"""

role_login_modal_new = """
      if (loginModalRole === 'Admin') {
        if (usernameInput.trim().toLowerCase() === 'admin@evaluate.com' && passwordInput === 'admin') {
          setRole('Admin');
          setLecturerTab('audit');
          setLoginModalRole(null);
        } else {
"""
content = content.replace(role_login_modal_old, role_login_modal_new)


with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Admin dashboard logic fixed.")
