import re

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

matrix_component = """
const MatrixBackground = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    let columns = width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // translucent black background to create fade effect
      ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      // text color: github gray
      ctx.fillStyle = 'rgba(201, 209, 217, 0.35)';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = width / fontSize;
      while (drops.length < columns) drops.push(1);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -3,
        pointerEvents: 'none',
        background: 'var(--bg-dark)'
      }}
    />
  );
};
"""

# Find the old ParticleBackground and replace it with MatrixBackground
particle_regex = re.compile(r'const ParticleBackground = \(\) => \{(?:[^{}]*|\{(?:[^{}]*|\{[^{}]*\})*\})*\};', re.MULTILINE)
# Since regex for nested brackets is hard in standard re, I'll use simple string splitting

# It's safer to just inject MatrixBackground before ParticleBackground, and then remove ParticleBackground/FlyingBiplaneLogo tags in JSX
content = content.replace("const ParticleBackground = () => {", matrix_component + "\nconst ParticleBackground = () => {")

# Replace `<ParticleBackground /><div className="blueprint-grid" /><FlyingBiplaneLogo />` 
# with `<MatrixBackground />`
content = content.replace('<ParticleBackground /><div className="blueprint-grid" /><FlyingBiplaneLogo />', '<MatrixBackground />')
# also handle spaces or just find the components individually
content = content.replace('<ParticleBackground />', '')
content = content.replace('<div className="blueprint-grid" />', '')
content = content.replace('<FlyingBiplaneLogo />', '')

# Remove blueprint grid from GlobalStyles
content = content.replace("""    .blueprint-grid {
      position: fixed; inset: 0; z-index: -2;
      background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 30px 30px; pointer-events: none;
    }""", "")

# If the TerminalBackground is still desired (they didn't say remove it), we leave it.

# Now insert `<MatrixBackground />` right before `<TerminalBackground />`
content = content.replace('<TerminalBackground />', '<MatrixBackground /><TerminalBackground />')

with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Matrix background added and old backgrounds removed.")
