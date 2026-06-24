import re

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add CSS to GlobalStyles
css_additions = """
    .blueprint-grid {
      position: fixed; inset: 0; z-index: -2;
      background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 30px 30px; pointer-events: none;
    }
    
    .skeleton-pulse {
      animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      background: #21262d; border-radius: 4px;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .spotlight-wrapper {
      position: relative; overflow: hidden; border-radius: 6px;
      background: var(--panel-bg); border: 1px solid var(--panel-border);
      transition: border-color 0.2s, transform 0.2s;
    }
    .spotlight-wrapper:hover {
      border-color: var(--text-muted); transform: translateY(-4px);
    }
    .spotlight-glow {
      position: absolute; pointer-events: none;
      top: 0; left: 0; width: 100%; height: 100%;
      background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%);
      opacity: 0; transition: opacity 0.3s;
    }
    .spotlight-wrapper:hover .spotlight-glow { opacity: 1; }
"""

# Insert CSS right before the closing backtick in GlobalStyles
content = content.replace("  `}} />\n);\n", css_additions + "\n  `}} />\n);\n")


# 2. Define the React Components
react_components = """
// --- Premium UI Components ---

const TypewriterText = ({ text, delay = 50, className }) => {
  const [currentText, setCurrentText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <p className={className}>
      {currentText}
      <span style={{ animation: 'pulse 1s infinite' }}>█</span>
    </p>
  );
};

const SpotlightCard = ({ children, onClick, style, className }) => {
  const divRef = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={divRef} 
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`spotlight-wrapper ${className || ''}`}
      style={{ ...style, cursor: onClick ? 'pointer' : 'default', '--mouse-x': `${position.x}px`, '--mouse-y': `${position.y}px` }}
    >
      <div className="spotlight-glow" />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

const MagneticButton = ({ children, onClick, className, style }) => {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 }); // pull strength
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={ref}
      className={`btn ${className || ''}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? 'transform 0.5s cubic-bezier(0.3, 0, 0.5, 1)' : 'none'
      }}
    >
      {children}
    </button>
  );
};

const ActivityHeatmap = () => {
  // Generate mock GitHub-style heatmap data
  const data = React.useMemo(() => {
    return Array.from({ length: 7 * 16 }, () => Math.random() > 0.6 ? Math.floor(Math.random() * 4) : 0);
  }, []);

  const getColor = (val) => {
    if (val === 0) return '#161b22';
    if (val === 1) return '#0e4429';
    if (val === 2) return '#006d32';
    if (val === 3) return '#26a641';
    return '#39d353';
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', marginTop: '24px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Activity size={18} color="var(--text-muted)" /> Grading Activity (Past 90 Days)
      </h3>
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 1fr)', gridAutoFlow: 'column', gap: '4px', overflowX: 'auto', paddingBottom: '8px' }}>
        {data.map((val, i) => (
          <div key={i} style={{ width: '12px', height: '12px', background: getColor(val), borderRadius: '2px', outline: '1px solid rgba(255,255,255,0.05)', outlineOffset: '-1px' }} title={`${val} submissions graded`} />
        ))}
      </div>
    </div>
  );
};

const SkeletonBlock = ({ width, height, style }) => (
  <div className="skeleton-pulse" style={{ width, height, ...style }} />
);

// --- End Premium UI Components ---
"""

# Insert React components right above ParticleBackground
content = content.replace("const ParticleBackground =", react_components + "\nconst ParticleBackground =")

# 3. Replace target JSX with new components

# Add Blueprint Grid to LoginScreen
if '<div className="blueprint-grid" />' not in content:
    content = content.replace('<ParticleBackground />', '<ParticleBackground /><div className="blueprint-grid" />')

# Replace Subtitle with TypewriterText in LoginScreen
content = content.replace(
    '<p style={{ color: \'var(--text-muted)\', fontSize: \'1.3rem\', fontWeight: \'500\' }}>Academic Grading Infrastructure for the AI Age</p>',
    '<TypewriterText text="Academic Grading Infrastructure for the AI Age" delay={40} style={{ color: \'var(--text-muted)\', fontSize: \'1.3rem\', fontWeight: \'500\' }} />'
)

# Replace role cards in LoginScreen with SpotlightCard
content = re.sub(
    r'<div key=\{r\.id\} className="role-card" onClick=\{([^}]+)\}>([\s\S]*?)</div>\s*\)\)}',
    r'<SpotlightCard key={r.id} onClick={\1} className="role-card-inner" style={{ padding: "32px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", height: "100%" }}>\2</SpotlightCard>\n        ))}',
    content
)

# Fix classnames inside the spotlight replacement
# (Since the Spotlight wrapper takes over border/bg, we shouldn't have duplicate borders)
# Actually, SpotlightCard is a drop-in replacement, we can just replace `<div key={r.id} className="role-card"` with `<SpotlightCard key={r.id}`.
content = content.replace(
    '<SpotlightCard key={r.id} onClick={() => {\n            if (r.id === \'Student\') {\n              setAuthScreen(\'student-login\');\n            } else {\n              setLoginModalRole(\'Faculty\');\n              setLoginError(\'\');\n              setUsernameInput(\'\');\n              setPasswordInput(\'\');\n            }\n          }} className="role-card-inner" style={{ padding: "32px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", height: "100%" }}>',
    ''
) # roll back bad sub
content = content.replace('</SpotlightCard>\n        ))}', '</div>\n        ))}') # roll back

# Correct substitution for role-card -> SpotlightCard
content = content.replace(
    '<div key={r.id} className="role-card"', 
    '<SpotlightCard key={r.id} className="role-card"'
)
content = content.replace(
    '</p>\n            <div className="btn btn-outline" style={{ marginTop: \'auto\', width: \'100%\' }}>Enter <ChevronRight size={16}/></div>\n          </div>',
    '</p>\n            <div className="btn btn-outline" style={{ marginTop: \'auto\', width: \'100%\' }}>Enter <ChevronRight size={16}/></div>\n          </SpotlightCard>'
)

# Replace Dashboard overview with Heatmap
if "<ActivityHeatmap />" not in content:
    content = content.replace(
        '<div className="dashboard-grid" style={{ marginBottom: \'24px\' }}>',
        '<div className="dashboard-grid" style={{ marginBottom: \'24px\' }}>\n        <ActivityHeatmap />'
    )
    
# Replace standard loading with Skeleton Loaders
content = content.replace(
    '<div style={{ padding: \'40px\', textAlign: \'center\', color: \'var(--text-muted)\' }}><div className="animate-spin" style={{ width: \'24px\', height: \'24px\', border: \'3px solid var(--primary)\', borderTopColor: \'transparent\', borderRadius: \'50%\', margin: \'0 auto 16px auto\' }}></div>Loading Exam Module...</div>',
    '<div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "16px" }}><SkeletonBlock height="24px" width="30%" /><SkeletonBlock height="100px" width="100%" /><SkeletonBlock height="100px" width="100%" /></div>'
)
content = content.replace(
    '<div style={{ textAlign: \'center\', padding: \'60px\' }}>Loading...</div>',
    '<div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "24px" }}><SkeletonBlock height="40px" width="200px" /><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}><SkeletonBlock height="120px" width="100%" /><SkeletonBlock height="120px" width="100%" /><SkeletonBlock height="120px" width="100%" /></div></div>'
)

# Replace 'Enter' buttons with MagneticButton in LoginScreen
content = content.replace(
    '<div className="btn btn-outline" style={{ marginTop: \'auto\', width: \'100%\' }}>Enter <ChevronRight size={16}/></div>',
    '<MagneticButton className="btn-outline" style={{ marginTop: \'auto\', width: \'100%\' }}>Enter <ChevronRight size={16}/></MagneticButton>'
)


with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Premium UI features applied.")
