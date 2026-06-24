import re

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update CSS
css_additions = """
    @keyframes spinPropeller {
      100% { transform: rotate(360deg); }
    }
    .propeller {
      animation: spinPropeller 0.15s linear infinite;
    }
    .biplane-flyer {
      position: fixed; z-index: -1; animation: flyTelegram 18s linear infinite; opacity: 0.25;
    }
"""

content = content.replace("  `}} />\n);\n", css_additions + "\n  `}} />\n);\n")

# 2. Define the new component
biplane_component = """
const FlyingBiplaneLogo = () => (
  <div className="biplane-flyer">
    <svg width="200" height="150" viewBox="0 0 200 150" fill="none" stroke="var(--text-main)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'grayscale(100%)' }}>
      {/* Tail */}
      <path d="M 30,60 L 10,40 L 10,80 Z" fill="var(--bg-dark)" />
      
      {/* Body */}
      <rect x="30" y="50" width="110" height="20" rx="10" fill="var(--bg-dark)" />
      
      {/* Wings */}
      <rect x="50" y="35" width="80" height="8" rx="4" fill="var(--bg-dark)" />
      <rect x="50" y="77" width="80" height="8" rx="4" fill="var(--bg-dark)" />
      
      {/* Wing Struts */}
      <line x1="60" y1="43" x2="60" y2="77" />
      <line x1="120" y1="43" x2="120" y2="77" />
      <line x1="90" y1="43" x2="90" y2="77" />
      
      {/* Wheel Struts */}
      <line x1="70" y1="85" x2="60" y2="105" />
      <line x1="110" y1="85" x2="100" y2="105" />
      
      {/* Wheels */}
      <circle cx="60" cy="105" r="10" fill="var(--bg-dark)" />
      <circle cx="60" cy="105" r="3" fill="var(--text-main)" />
      <circle cx="100" cy="105" r="10" fill="var(--bg-dark)" />
      <circle cx="100" cy="105" r="3" fill="var(--text-main)" />
      
      {/* Nose */}
      <path d="M 140,50 C 150,50 155,55 155,60 C 155,65 150,70 140,70 Z" fill="var(--bg-dark)" />
      
      {/* Rotating Propeller */}
      <g className="propeller" style={{ transformOrigin: '155px 60px' }}>
        <ellipse cx="155" cy="60" rx="4" ry="35" fill="var(--text-main)" />
        <ellipse cx="155" cy="60" rx="35" ry="4" fill="var(--text-main)" />
        <circle cx="155" cy="60" r="5" fill="var(--bg-dark)" />
      </g>
    </svg>
  </div>
);
"""

# Replace FlyingTelegramLogo definition
old_telegram = """const FlyingTelegramLogo = () => (
  <div className="telegram-flyer">
    <Send size={120} color="var(--text-main)" strokeWidth={1} />
  </div>
);"""

content = content.replace(old_telegram, biplane_component.strip())

# 3. Replace all JSX usages
content = content.replace("<FlyingTelegramLogo />", "<FlyingBiplaneLogo />")

with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Biplane replaced telegram.")
