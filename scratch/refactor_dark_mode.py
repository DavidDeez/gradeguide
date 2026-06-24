import re

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace GlobalStyles CSS block
new_css = """
  <style dangerouslySetInnerHTML={{__html: `
    :root {
      --bg-dark: #0d1117;
      --panel-bg: #161b22;
      --panel-border: #30363d;
      --primary: #f0f6fc;
      --primary-hover: #c9d1d9;
      --text-main: #c9d1d9;
      --text-muted: #8b949e;
      --danger: #f85149;
      --success: #2ea043;
      --warning: #d29922;
      --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }
    * { box-sizing: border-box; }
    body {
      margin: 0; padding: 0; background: var(--bg-dark); color: var(--text-main);
      font-family: var(--font-family); min-height: 100vh; overflow-x: hidden;
      display: block !important;
      line-height: 1.5;
    }
    .glass-panel {
      background: var(--panel-bg);
      border: 1px solid var(--panel-border); 
      border-radius: 6px;
    }
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      gap: 8px; padding: 6px 16px; border-radius: 6px;
      font-weight: 500; cursor: pointer; transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
      border: 1px solid var(--panel-border); font-size: 14px; white-space: nowrap;
      background: #21262d; color: var(--text-main);
    }
    .btn:hover { background: #30363d; border-color: #8b949e; }
    
    .btn-primary { 
      background: var(--primary); color: var(--bg-dark); border-color: rgba(27,31,36,0.15); 
    }
    .btn-primary:hover { background: var(--primary-hover); border-color: rgba(27,31,36,0.15); }
    
    .btn-outline { background: transparent; color: var(--text-main); border: 1px solid var(--panel-border); }
    .btn-outline:hover { background: #21262d; border-color: #8b949e; }
    
    .input-field {
      width: 100%; padding: 6px 12px; border-radius: 6px;
      background: #0d1117; border: 1px solid var(--panel-border);
      color: var(--text-main); font-family: var(--font-family); outline: none;
      font-size: 14px; line-height: 20px;
    }
    .input-field:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(240, 246, 252, 0.1); }
    
    .nav-tab {
      padding: 8px 16px; cursor: pointer; font-weight: 500; color: var(--text-muted);
      border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap; font-size: 14px;
    }
    .nav-tab:hover { color: var(--text-main); border-bottom-color: var(--panel-border); }
    .nav-tab.active { color: var(--text-main); border-bottom-color: #f78166; font-weight: 600; }
    
    .role-card {
      padding: 24px; border-radius: 6px; border: 1px solid var(--panel-border);
      background: var(--panel-bg); cursor: pointer; transition: border-color 0.2s;
      text-align: left; display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
    }
    .role-card:hover { border-color: var(--text-muted); }
    .role-card.active { border-color: var(--primary); }
    
    .role-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; width: 100%; max-width: 800px; }
    .dashboard-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
    .two-col-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .audit-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 24px; }
    .score-detail-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 24px; }
    
    .header-content {
      margin: 16px; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center;
      border-radius: 6px; background: var(--panel-bg); border: 1px solid var(--panel-border);
    }

    @media (max-width: 1024px) {
      .role-grid, .dashboard-grid, .two-col-grid, .audit-grid, .score-detail-grid {
        grid-template-columns: 1fr !important; gap: 16px !important;
      }
    }

    @media (max-width: 768px) {
      .dashboard-main { padding: 16px !important; }
      .header-content { margin: 8px !important; padding: 12px !important; flex-direction: column !important; gap: 12px !important; }
      .header-brand-row { flex-wrap: wrap !important; justify-content: center !important; }
      .glass-panel { padding: 16px !important; }
      .btn-text { display: none; }
      .nav-container { overflow-x: auto; flex-wrap: nowrap !important; }
      .main-layout { flex-direction: column; margin: 0 8px; gap: 16px; }
      .side-menu { 
        position: fixed !important; top: 0 !important; left: -320px !important; height: 100vh !important;
        z-index: 2000 !important; background: var(--panel-bg) !important; padding-top: 24px !important;
        border-right: 1px solid var(--panel-border) !important; transition: left 0.2s !important;
      }
      .side-menu.open { left: 0 !important; }
      .mobile-menu-btn { display: block !important; }
    }

    .mobile-menu-btn { display: none; }
    .drawer-overlay { position: fixed; inset: 0; background: rgba(1,4,9,0.8); z-index: 1500; }
    .main-layout { display: flex; gap: 24px; align-items: flex-start; margin: 0 24px; }
    .side-menu { width: 256px; position: sticky; top: 24px; display: flex; flex-direction: column; gap: 4px; }
    
    .side-nav-tab {
      padding: 8px 16px; border-radius: 6px; cursor: pointer; color: var(--text-main);
      transition: background 0.2s; display: flex; align-items: center; gap: 12px; font-size: 14px;
    }
    .side-nav-tab:hover { background: #21262d; }
    .side-nav-tab.active { background: #21262d; font-weight: 600; }

    .modal-overlay {
      position: fixed; inset: 0; background: rgba(1,4,9,0.8);
      display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 16px;
    }
    
    .badge { padding: 2px 8px; border-radius: 2em; font-size: 12px; font-weight: 500; border: 1px solid var(--panel-border); }
    .badge-primary { background: rgba(56,139,253,0.1); color: #79c0ff; border-color: rgba(56,139,253,0.4); }
    .badge-success { background: rgba(46,160,67,0.1); color: #56d364; border-color: rgba(46,160,67,0.4); }
    
    .auth-card { width: 100%; max-width: 400px; }
    .otp-input {
      width: 48px; height: 56px; text-align: center; font-size: 24px; font-weight: 600;
      border-radius: 6px; background: #0d1117; border: 1px solid var(--panel-border);
      color: var(--text-main); outline: none;
    }
    .otp-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(240, 246, 252, 0.1); }
    .auth-screen { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; }
    
    .brand-title { font-size: 32px; font-weight: 600; margin: 0 0 8px 0; color: var(--text-main); letter-spacing: -0.5px; }
    .auth-title { margin: 0 0 8px 0; font-size: 24px; font-weight: 400; color: var(--text-main); }
    .otp-container { display: flex; gap: 8px; justify-content: center; margin-bottom: 24px; }
  `}} />
"""

content = re.sub(
    r"  <style dangerouslySetInnerHTML=\{\{__html: `\n    :root \{.*?`\}\} \/>",
    new_css.strip(),
    content,
    flags=re.DOTALL
)

# 2. Refactor inline gradient styles and glass panel overrides
# E.g. background: 'var(--gradient-brand)' -> color/background updates
content = content.replace("background: 'var(--gradient-brand)'", "background: 'var(--primary)'")
content = content.replace("-webkit-background-clip: 'text'", "")
content = content.replace("-webkit-text-fill-color: 'transparent'", "")

# Re-style inline background highlights (rgba(...)) to Github-like colors
content = re.sub(r"background: 'rgba\(239, ?68, ?68, ?[0-9.]+\)'", "background: 'rgba(248,81,73,0.1)'", content)
content = re.sub(r"background: 'rgba\(16, ?185, ?129, ?[0-9.]+\)'", "background: 'rgba(46,160,67,0.1)'", content)
content = re.sub(r"background: 'rgba\(245, ?158, ?11, ?[0-9.]+\)'", "background: 'rgba(210,153,34,0.1)'", content)

# Remove huge inline paddings and border radii to match github style
content = re.sub(r"borderRadius: '2[0-9]px'", "borderRadius: '6px'", content)
content = re.sub(r"borderRadius: '30px'", "borderRadius: '8px'", content)

# Clean up Role cards in JS to not center everything, align left like github cards
content = content.replace("alignItems: 'center'", "alignItems: 'center'") # Maybe leave standard flex alone, but fix specific ones if needed

# 3. Standardize icons using primary color. Primary is now very light gray/white, so maybe icons should be text-main or text-muted
content = content.replace("color=\"var(--primary)\"", "color=\"var(--text-main)\"")
content = content.replace("color: 'var(--primary)'", "color: 'var(--text-main)'")

with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Redesign applied.")
