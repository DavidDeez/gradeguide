import re

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove MatrixBackground definition
matrix_regex = re.compile(r'const MatrixBackground = \(\) => \{[\s\S]*?\};\n', re.MULTILINE)
content = matrix_regex.sub('', content)

# 2. Define the new, excited ParticleBackground
particle_component = """
const ParticleBackground = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Increased velocity for "more excited" electrons
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 209, 217, 0.6)'; // slightly brighter
        ctx.fill();
      }
    }

    const particleCount = Math.floor((canvas.width * canvas.height) / 10000); // more particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => p.update());
      particles.forEach(p => p.draw());
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 140) { // increased connection distance
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201, 209, 217, ${0.2 - distance / 140 * 0.2})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
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

# Insert ParticleBackground before TerminalBackground
content = content.replace("const TerminalBackground = () => {", particle_component + "\nconst TerminalBackground = () => {")

# 3. Restore the blueprint grid CSS
css_grid = """
    .blueprint-grid {
      position: fixed; inset: 0; z-index: -2;
      background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 30px 30px; pointer-events: none;
    }
"""
if ".blueprint-grid" not in content:
    content = content.replace("  `}} />\n);\n", css_grid + "\n  `}} />\n);\n")

# 4. Swap JSX tags globally
content = content.replace("<MatrixBackground />", '<ParticleBackground /><div className="blueprint-grid" />')
# Fix any double insertions due to previous duplicate bug fix
content = content.replace('<ParticleBackground /><div className="blueprint-grid" /><ParticleBackground /><div className="blueprint-grid" />', '<ParticleBackground /><div className="blueprint-grid" />')


with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Restored excited particles and blueprint grid.")
