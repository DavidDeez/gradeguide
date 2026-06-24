import re

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix Terminal CSS
# Find and replace the terminal-bg-container block
old_terminal_css = """    .terminal-bg-container {
      position: fixed; bottom: 0; left: 0; width: 100%; height: 40vh; z-index: -1;
      overflow: hidden; pointer-events: none; opacity: 0.15;
      background: linear-gradient(to top, rgba(13,17,23,0) 0%, #0d1117 100%);
      font-family: monospace; font-size: 0.8rem; line-height: 1.4; color: var(--text-muted);
      padding: 20px; display: flex; flex-direction: column; justify-content: flex-end;
    }
    .terminal-bg-container::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(to bottom, #0d1117 0%, transparent 100%); z-index: 1;
    }"""

new_terminal_css = """    .terminal-bg-container {
      position: fixed; bottom: 0; left: 0; width: 100%; height: 40vh; z-index: -1;
      overflow: hidden; pointer-events: none; opacity: 0.25;
      font-family: monospace; font-size: 0.85rem; line-height: 1.5; color: var(--text-muted);
      padding: 30px; display: flex; flex-direction: column; justify-content: flex-end;
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 50%);
      mask-image: linear-gradient(to bottom, transparent 0%, black 50%);
    }"""

if old_terminal_css in content:
    content = content.replace(old_terminal_css, new_terminal_css)

# Add spinPropeller3D keyframes if needed
if "@keyframes spinPropeller3D" not in content:
    css_3d = """
    @keyframes spinPropeller3D {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .propeller-3d {
      animation: spinPropeller3D 0.1s linear infinite;
    }
"""
    content = content.replace("  `}} />\n);\n", css_3d + "\n  `}} />\n);\n")

# 2. Replace FlyingBiplaneLogo with the Isometric 3D version
new_biplane = """const FlyingBiplaneLogo = () => (
  <div className="biplane-flyer">
    <svg width="240" height="200" viewBox="0 0 240 200" fill="none" style={{ filter: 'grayscale(100%)' }}>
      <g transform="translate(40, 20)">
        {/* Tail (vertical stabilizer) */}
        <path d="M 20 80 L 20 40 L 40 60 L 40 80 Z" fill="#8b949e" />
        <path d="M 20 40 L 40 60 L 35 55 L 15 35 Z" fill="#c9d1d9" />
        
        {/* Fuselage (body) - isometric */}
        <path d="M 20 80 L 140 120 L 140 140 L 20 100 Z" fill="#30363d" /> {/* side */}
        <path d="M 20 80 L 140 120 L 130 110 L 10 70 Z" fill="#8b949e" /> {/* top */}
        <path d="M 140 120 A 10 10 0 0 0 140 140 A 10 10 0 0 0 140 120" fill="#c9d1d9" /> {/* nose cone */}
        
        {/* Bottom Wing */}
        <path d="M 80 115 L 140 155 L 130 165 L 70 125 Z" fill="#30363d" /> {/* top surface near */}
        <path d="M 140 155 L 130 165 L 130 170 L 140 160 Z" fill="#161b22" /> {/* edge near */}
        <path d="M 80 115 L 60 75 L 50 85 L 70 125 Z" fill="#161b22" opacity="0.8" /> {/* top surface far */}
        
        {/* Wheels */}
        <circle cx="110" cy="170" r="12" fill="#161b22" />
        <circle cx="110" cy="170" r="4" fill="#c9d1d9" />
        
        <circle cx="80" cy="140" r="10" fill="#161b22" />
        <circle cx="80" cy="140" r="3" fill="#c9d1d9" />
        
        {/* Struts */}
        <line x1="85" y1="105" x2="85" y2="75" stroke="#c9d1d9" strokeWidth="2" strokeLinecap="round" />
        <line x1="125" y1="130" x2="125" y2="100" stroke="#c9d1d9" strokeWidth="2" strokeLinecap="round" />
        <line x1="65" y1="80" x2="65" y2="50" stroke="#8b949e" strokeWidth="2" strokeLinecap="round" />
        
        {/* Top Wing */}
        <path d="M 80 75 L 140 115 L 130 125 L 70 85 Z" fill="#8b949e" /> {/* top surface near */}
        <path d="M 140 115 L 130 125 L 130 130 L 140 120 Z" fill="#30363d" /> {/* edge near */}
        <path d="M 80 75 L 60 35 L 50 45 L 70 85 Z" fill="#8b949e" /> {/* top surface far */}
        <path d="M 60 35 L 50 45 L 50 50 L 60 40 Z" fill="#30363d" /> {/* edge far */}
        
        {/* Propeller Group */}
        <g className="propeller-3d" style={{ transformOrigin: '140px 130px' }}>
          <ellipse cx="140" cy="130" rx="4" ry="45" fill="#c9d1d9" opacity="0.9" />
          <ellipse cx="140" cy="130" rx="45" ry="4" fill="#8b949e" opacity="0.9" />
          <circle cx="140" cy="130" r="6" fill="#161b22" />
        </g>
      </g>
    </svg>
  </div>
);"""

# We need to find the old FlyingBiplaneLogo definition using regex to handle variations
old_biplane_regex = re.compile(r'const FlyingBiplaneLogo = \(\) => \([\s\S]*?</div>\s*\);', re.MULTILINE)

content = old_biplane_regex.sub(new_biplane, content)

with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Isometric 3D Biplane and Terminal CSS applied.")
