import re

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add CSS animations to GlobalStyles
css_additions = """
    @keyframes flyTelegram {
      0% { transform: translate(-10vw, 110vh) rotate(15deg); opacity: 0; }
      10% { opacity: 0.15; }
      90% { opacity: 0.15; }
      100% { transform: translate(110vw, -10vh) rotate(15deg); opacity: 0; }
    }
    .telegram-flyer {
      position: fixed; z-index: -1; animation: flyTelegram 12s linear infinite;
    }
    
    .terminal-bg-container {
      position: fixed; bottom: 0; left: 0; width: 100%; height: 40vh; z-index: -1;
      overflow: hidden; pointer-events: none; opacity: 0.15;
      background: linear-gradient(to top, rgba(13,17,23,0) 0%, #0d1117 100%);
      font-family: monospace; font-size: 0.8rem; line-height: 1.4; color: var(--text-muted);
      padding: 20px; display: flex; flex-direction: column; justify-content: flex-end;
    }
    .terminal-bg-container::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(to bottom, #0d1117 0%, transparent 100%); z-index: 1;
    }
"""

content = content.replace("  `}} />\n);\n", css_additions + "\n  `}} />\n);\n")

# 2. Define the React Components
react_components = """
const FlyingTelegramLogo = () => (
  <div className="telegram-flyer">
    <Send size={120} color="var(--text-main)" strokeWidth={1} />
  </div>
);

const TerminalBackground = () => {
  const [logs, setLogs] = React.useState([]);
  
  React.useEffect(() => {
    const commands = [
      "Initializing core modules...",
      "[OK] Database connection established.",
      "Awaiting authentication token...",
      "Loading heuristic models...",
      "[WARN] Unverified access attempt blocked.",
      "Syncing offline cache...",
      "Evaluating prompt schema...",
      "[OK] System ready."
    ];
    
    let currentLogs = [];
    
    const interval = setInterval(() => {
      const randomCmd = commands[Math.floor(Math.random() * commands.length)];
      const timestamp = new Date().toISOString().split('T')[1].substring(0,8);
      currentLogs.push(`> [${timestamp}] ${randomCmd}`);
      
      if (currentLogs.length > 15) {
        currentLogs.shift();
      }
      
      setLogs([...currentLogs]);
    }, 1200);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-bg-container">
      <div style={{ position: 'relative', zIndex: 0 }}>
        {logs.map((log, i) => (
          <div key={i} style={{ animation: 'fadeIn 0.3s ease' }}>{log}</div>
        ))}
      </div>
    </div>
  );
};
"""

content = content.replace("const ParticleBackground =", react_components + "\nconst ParticleBackground =")

# 3. Add to LoginScreen
# It currently has `<ParticleBackground /><div className="blueprint-grid" />`
if "<FlyingTelegramLogo />" not in content:
    content = content.replace(
        '<ParticleBackground /><div className="blueprint-grid" />',
        '<ParticleBackground /><div className="blueprint-grid" /><FlyingTelegramLogo /><TerminalBackground />'
    )

with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Telegram and Terminal backgrounds added.")
