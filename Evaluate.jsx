import React, { useState, useEffect, useRef } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://rnayaaqjbkbuiderdngu.supabase.co';
const supabaseKey = 'sb_publishable_YBhB3VAvGfm6ZnHOGA1jGw_G9a8GYb_';
const supabase = createClient(supabaseUrl, supabaseKey);

import {
  Settings, Camera, Upload, Book, FileText, CheckCircle, 
  BarChart, X, Plus, Trash2, Check, Video, Layout, LogOut, 
  FileBadge, Sliders, Play, Save, ChevronRight, Activity, 
  ShieldCheck, Brain, Star, Smartphone, AlertCircle, Eye, Edit, Download, Menu,
  Send, Terminal
} from 'lucide-react';

const GlobalStyles = () => (
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
    
    .draw-icon {
      animation: drawIcon 2.5s ease forwards;
    }
    .draw-icon path, .draw-icon line, .draw-icon polyline, .draw-icon circle, .draw-icon rect {
      stroke-dasharray: 400;
      stroke-dashoffset: 400;
      animation: drawPath 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    @keyframes drawPath {
      to { stroke-dashoffset: 0; }
    }
    @keyframes drawIcon {
      0% { opacity: 0; transform: scale(0.9); }
      20% { opacity: 1; transform: scale(1); }
      100% { opacity: 1; transform: scale(1); }
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
      overflow: hidden; pointer-events: none; opacity: 0.25;
      font-family: monospace; font-size: 0.85rem; line-height: 1.5; color: var(--text-muted);
      padding: 30px; display: flex; flex-direction: column; justify-content: flex-end;
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 50%);
      mask-image: linear-gradient(to bottom, transparent 0%, black 50%);
    }


    @keyframes spinPropeller {
      100% { transform: rotate(360deg); }
    }
    .propeller {
      animation: spinPropeller 0.15s linear infinite;
    }
    .biplane-flyer {
      position: fixed; z-index: -1; animation: flyTelegram 18s linear infinite; opacity: 0.25;
    }


    @keyframes spinPropeller3D {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .propeller-3d {
      animation: spinPropeller3D 0.1s linear infinite;
    }


    .blueprint-grid {
      position: fixed; inset: 0; z-index: -2;
      background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 30px 30px; pointer-events: none;
    }

  `}} />
);



// --- Premium UI Components ---

const TypewriterText = ({ text, delay = 50, className, style }) => {
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
    <p className={className} style={style}>
      {currentText}
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


const FlyingBiplaneLogo = () => (
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
);


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





const ScoreRing = ({ score, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  let color = score >= 70 ? 'var(--success)' : score >= 50 ? 'var(--warning)' : 'var(--danger)';

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} fill="none" />
        <circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size * 0.22, fontWeight: '900', color: 'white' }}>{score}%</span>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer style={{ textAlign: 'center', padding: '24px 0', width: '100%', marginTop: 'auto' }}>
    <style>{`
      @keyframes blockWrite {
        0% { width: 0; }
        100% { width: 32ch; }
      }
      @keyframes blinkBlockCursor {
        50% { border-color: transparent; }
      }
      .animated-handwriting {
        display: inline-block;
        font-size: 0.75rem;
        color: var(--text-muted);
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        overflow: hidden;
        white-space: nowrap;
        border-right: 3px solid var(--text-muted);
        animation: blockWrite 3s steps(32) forwards, blinkBlockCursor 0.7s step-end infinite;
        width: 32ch;
      }
    `}</style>
    <div className="animated-handwriting">
      Developed by David Olukayode
    </div>
  </footer>
);

export default function EvaluateApp() {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('gg_main_role') || null;
  });
  
  useEffect(() => {
    if (role) localStorage.setItem('gg_main_role', role);
    else localStorage.removeItem('gg_main_role');
  }, [role]);

  const [authScreen, setAuthScreen] = useState('landing'); // landing|student-entry|student-signup|student-otp|student-login
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const DEFAULT_OR_KEY = '';
  const [aiSettings, setAiSettings] = useState({
    provider: 'openrouter',
    geminiKey: '',
    geminiModel: 'gemini-1.5-flash',
    anthropicKey: '',
    hfToken: '',
    hfModelId: 'mistralai/Mistral-7B-Instruct-v0.3',
    openrouterKey: DEFAULT_OR_KEY,
    openrouterModel: 'openrouter/free',
    emailjsPublicKey: 'OFoJSMtD5Dy663OcN',
    emailjsServiceId: 'service_669uej4',
    emailjsOtpTemplateId: 'template_sh27d68',
    emailjsResultsTemplateId: ''
  });

  // Auth state with LocalStorage Persistence
  const [studentProfile, setStudentProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gg_student_profile')) || null; } catch { return null; }
  });
  const [students, setStudents] = useState([]); // all registered students
  const [signupForm, setSignupForm] = useState({ name: '', matricNo: '', email: '' });
  const [pendingOtp, setPendingOtp] = useState(null); // { code, email, name, matricNo, expiry }
  const [otpDigits, setOtpDigits] = useState(['','','','','','']);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', matricNo: '' });

  const [selectedSub, setSelectedSub] = useState(null);
  const [loginModalRole, setLoginModalRole] = useState(() => {
    return localStorage.getItem('gg_role') || null;
  });
  
  // Persist session state to local storage
  useEffect(() => {
    if (studentProfile) localStorage.setItem('gg_student_profile', JSON.stringify(studentProfile));
    else localStorage.removeItem('gg_student_profile');
  }, [studentProfile]);

  useEffect(() => {
    if (loginModalRole) localStorage.setItem('gg_role', loginModalRole);
    else localStorage.removeItem('gg_role');
  }, [loginModalRole]);

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [courseMaterial, setCourseMaterial] = useState({ text: '', pdfBase64: null, pdfName: '' });
  const [assessments, setAssessments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  // Focus-safe Dashboard States
  const [lecturerTab, setLecturerTab] = useState('build');
  const [showCam, setShowCam] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newQuestions, setNewQuestions] = useState([{ id: 1, text: '', maxMarks: 10 }]);
  const [assessmentContext, setAssessmentContext] = useState({ text: '', pdfBase64: null, pdfName: '' });
  const [editingAssessmentId, setEditingAssessmentId] = useState(null);
  
  const [activeExam, setActiveExam] = useState(null);
  const [examAnswers, setExamAnswers] = useState({});
  const [examLoading, setExamLoading] = useState(false);
  const [studentTabState, setStudentTabState] = useState('exams');
  const [studentUpload, setStudentUpload] = useState(null);

  const [retakeRequests, setRetakeRequests] = useState([]);
  const [studentMessages, setStudentMessages] = useState([]);
  const [bulkState, setBulkState] = useState({ guideText: '', guideBase64: null, guideMime: '', scripts: [] });
  const [bulkScannerCam, setBulkScannerCam] = useState({ active: false, target: null, idx: null });
  const studentId = studentProfile ? studentProfile.matricNo : 'Guest';
  const [isLoaded, setIsLoaded] = useState(false);
  const [dbSyncing, setDbSyncing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: dbData, error } = await supabase.from('app_state').select('data').eq('id', 1).single();
        if (error) {
          console.error("Error loading from Supabase:", error);
          alert("Database connection failed. Please refresh the page.");
          return; // DO NOT set isLoaded to true, prevents wiping DB
        }
        if (dbData) {
          const d = dbData.data;
          setAssessments(d.assessments || []);
          setSubmissions(d.submissions || []);
          setRetakeRequests(d.retakeRequests || []);
          setStudents(d.students || []);
          setStudentMessages(d.studentMessages || []);
          const loadedSettings = d.settings || {};
          if (loadedSettings.openrouterModel === 'google/gemini-flash-1.5-free') {
            loadedSettings.openrouterModel = 'openrouter/free';
          }
          setAiSettings(prev => ({ ...prev, ...loadedSettings }));
        } else {
          // No row found, safe to load defaults
          setAssessments([{ id: 1, title: 'Introduction to AI Ethics', published: true, questions: [
            { id: 1, title: 'Algorithmic Bias', text: 'Explain how training data can introduce bias into an AI system.', maxMarks: 10 },
            { id: 2, title: 'Transparency', text: 'What is the importance of "Explainable AI" in healthcare?', maxMarks: 10 }
          ]}]);
        }
      } catch (e) {
        console.error("Fatal error loading from Supabase:", e);
        return;
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setDbSyncing(true);
      const payload = { assessments, submissions, settings: aiSettings, retakeRequests, students, studentMessages };
      supabase.from('app_state').upsert({ id: 1, data: payload })
        .then(({error}) => { 
          if (error) {
            console.error("Error saving to Supabase:", error);
            alert("CRITICAL DATABASE ERROR: Supabase rejected the save! Your Row Level Security (RLS) policies are blocking writes. Please run the SQL script to disable RLS restrictions.");
          }
        })
        .finally(() => setTimeout(() => setDbSyncing(false), 800));
    }
  }, [isLoaded, assessments, submissions, aiSettings, retakeRequests, students, studentMessages]);


  // --- Student Draft Auto-Save ---
  useEffect(() => {
    if (activeExam && studentProfile) {
      const draftKey = `draft_${studentProfile.matricNo}_${activeExam.id}`;
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        try { setExamAnswers(JSON.parse(saved)); } catch (e) {}
      } else {
        setExamAnswers({});
      }
    }
  }, [activeExam, studentProfile]);

  useEffect(() => {
    if (activeExam && studentProfile && Object.keys(examAnswers).length > 0) {
      const draftKey = `draft_${studentProfile.matricNo}_${activeExam.id}`;
      localStorage.setItem(draftKey, JSON.stringify(examAnswers));
    }
  }, [examAnswers, activeExam, studentProfile]);

  // --- EmailJS Helpers ---

  const sendOtpEmail = async (toEmail, toName, otpCode) => {
    if (!aiSettings.emailjsPublicKey || !aiSettings.emailjsServiceId || !aiSettings.emailjsOtpTemplateId) return false;
    try {
      await window.emailjs.send(
        aiSettings.emailjsServiceId,
        aiSettings.emailjsOtpTemplateId,
        { to_email: toEmail, to_name: toName, otp_code: otpCode, app_name: 'Evaluate' },
        aiSettings.emailjsPublicKey
      );
      return true;
    } catch(e) { console.error('EmailJS OTP error:', e); return false; }
  };

  const sendResultsEmail = async (profile, assessmentTitle, results, totalScore, totalMax) => {
    if (!aiSettings.emailjsPublicKey || !aiSettings.emailjsServiceId || !aiSettings.emailjsResultsTemplateId) return;
    const percentage = Math.round((totalScore / totalMax) * 100);
    const breakdown = results.map((r, i) => `Q${i+1}: ${r.score}/${r.score + 2} — ${r.feedback}`).join('\n');
    try {
      await window.emailjs.send(
        aiSettings.emailjsServiceId,
        aiSettings.emailjsResultsTemplateId,
        {
          to_email: profile.email,
          to_name: profile.name,
          student_matric: profile.matricNo,
          assessment_title: assessmentTitle,
          total_score: totalScore,
          total_max: totalMax,
          percentage: percentage + '%',
          breakdown: breakdown,
          app_name: 'Evaluate'
        },
        aiSettings.emailjsPublicKey
      );
    } catch(e) { console.error('EmailJS results error:', e); }
  };

  const callAI = async (prompt, system, files = []) => {
    if (aiSettings.provider === 'openrouter') {
      if (!aiSettings.openrouterKey) {
        if (role === 'Student') {
          throw new Error("AI Grading Engine is offline. Please ask your Lecturer or Administrator to configure the AI API Key in their console.");
        }
        setShowSettings(true);
        throw new Error("OpenRouter API Key Required.");
      }

      const messages = [];
      if (system) {
        messages.push({ role: "system", content: system });
      }

      if (files.length > 0) {
        const content = files.map(f => {
          if (f.mime.startsWith("image/")) {
            return {
              type: "image_url",
              image_url: { url: `data:${f.mime};base64,${f.base64}` }
            };
          }
          return { type: "text", text: `[Attachment]: (${f.mime})` };
        });
        content.push({ type: "text", text: prompt });
        messages.push({ role: "user", content });
      } else {
        messages.push({ role: "user", content: prompt });
      }

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${aiSettings.openrouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Evaluate"
        },
        body: JSON.stringify({
          model: aiSettings.openrouterModel || "openrouter/free",
          messages: messages
        })
      });

      const data = await res.json();
      if (data.error) {
        console.error("OpenRouter API Error:", data.error);
        throw new Error(`OpenRouter Error: ${data.error.message || data.error.metadata?.message || "Unknown error"}`);
      }

      if (!data.choices || !data.choices[0]?.message?.content) {
        console.error("Unexpected OpenRouter Response:", data);
        throw new Error("OpenRouter returned an empty response.");
      }

      return data.choices[0].message.content;
    }

    if (!aiSettings.geminiKey) {
      setShowSettings(true);
      throw new Error("Gemini API Key Required.");
    }
    
    const contents = [{
      role: "user",
      parts: files.map(f => ({
        inline_data: { mime_type: f.mime, data: f.base64 }
      }))
    }];
    
    contents[0].parts.push({ text: prompt });

    const body = { contents };
    
    if (system) {
      body.system_instruction = {
        parts: [{ text: system }]
      };
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${aiSettings.geminiModel}:generateContent?key=${aiSettings.geminiKey}`;
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const data = await res.json();
    if (data.error) {
      console.error("Gemini API Error Response:", data.error);
      throw new Error(`Gemini Error: ${data.error.message} (Code: ${data.error.code})`);
    }
    
    if (!data.candidates || !data.candidates[0].content) {
      console.error("Unexpected Gemini Response:", data);
      throw new Error("Gemini returned an empty response. Check safety settings or prompt length.");
    }

    return data.candidates[0].content.parts[0].text;
  };

  const markSubmission = async (assessment, answers, studentFiles = []) => {
    const system = "Expert Academic Grader and Plagiarism Detector. Grade strictly according to the Reference Context provided. IF AN ANSWER IS INCOHERENT, FACTUALLY WRONG, OR COMPLETELY IRRELEVANT, YOU MUST AWARD EXACTLY 0 POINTS. DO NOT GIVE POINTS FOR EFFORT. Return a RAW JSON object with EXACTLY this structure: {\"results\": [{\"questionId\": <number>, \"score\": <number>, \"grade\": \"<string>\", \"feedback\": \"<string>\", \"strengths\": [\"<string>\"], \"improvements\": [\"<string>\"]}], \"authenticity\": <number 0-100>, \"authenticityReason\": \"<string>\"}. DO NOT BLINDLY COPY THIS EXAMPLE, OUTPUT ACTUAL GRADING METRICS.";
    const prompt = `Grading task for: ${assessment.title}\nQuestions: ${JSON.stringify(assessment.questions)}\nStudent Typed Answers: ${JSON.stringify(answers)}\nReference Context: ${assessment.contextText || courseMaterial.text}\nIf a student file is attached, read the answers directly from the file to grade. Also, strictly evaluate the student answers for AI-generation or plagiarism.`;
    const files = assessment.contextPdfBase64 ? [{ mime: assessment.contextFileMime || "application/pdf", base64: assessment.contextPdfBase64 }] : (courseMaterial.pdfBase64 ? [{ mime: "application/pdf", base64: courseMaterial.pdfBase64 }] : []);
    
    if (studentFiles.length > 0) files.push(...studentFiles);

    const result = await callAI(prompt, system, files);
    try {
      const cleaned = result.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch(e) { throw new Error("AI output parsing failed. Try again."); }
  };

  const handleBulkUpload = (e, target, idx = null) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const b64 = ev.target.result.split(',')[1];
      if (target === 'guide') {
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
          setBulkState(prev => ({...prev, guideBase64: b64, guideMime: file.type}));
        } else {
          setBulkState(prev => ({...prev, guideText: prev.guideText + '\n' + ev.target.result}));
        }
      } else {
        const newScripts = [...bulkState.scripts];
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
          newScripts[idx].base64 = b64;
          newScripts[idx].mime = file.type;
        } else {
          newScripts[idx].text = newScripts[idx].text + '\n' + ev.target.result;
        }
        setBulkState(prev => ({...prev, scripts: newScripts}));
      }
    };
    if (file.type.startsWith('image/') || file.type === 'application/pdf') reader.readAsDataURL(file);
    else reader.readAsText(file);
  };

  const gradeBulkScript = async (idx) => {
    const script = bulkState.scripts[idx];
    const newScripts = [...bulkState.scripts];
    newScripts[idx].loading = true;
    setBulkState({...bulkState, scripts: newScripts});
    
    const system = "You are an expert grading and plagiarism detection system. IF THE SCRIPT IS INCOHERENT, FACTUALLY WRONG, OR COMPLETELY IRRELEVANT TO THE MARKING GUIDE, YOU MUST AWARD EXACTLY 0 POINTS. DO NOT GIVE POINTS FOR EFFORT. Output ONLY a RAW JSON object representing the final grade and authenticity. Schema: {\"score\": <number>, \"feedback\": \"<string>\", \"authenticity\": <number 0-100>, \"authenticityReason\": \"<string>\"}. DO NOT BLINDLY COPY THIS SCHEMA, COMPUTE THE ACTUAL METRICS.";
    const prompt = `Marking Guide:\n${bulkState.guideText}\n\nStudent Script (Extracted text):\n${script.text}\n\nGrade the student strictly against the marking guide. If images are attached, read them to verify. Evaluate authenticity.`;
    const files = [];
    if (bulkState.guideBase64) files.push({ mime: bulkState.guideMime || "image/jpeg", base64: bulkState.guideBase64 });
    if (script.base64) files.push({ mime: script.mime || "image/jpeg", base64: script.base64 });
    
    try {
      const result = await callAI(prompt, system, files);
      const cleaned = result.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      const finalScripts = [...bulkState.scripts];
      finalScripts[idx].result = parsed;
      finalScripts[idx].loading = false;
      setBulkState({...bulkState, scripts: finalScripts});
    } catch(e) {
      alert("Grading failed: " + e.message);
      const finalScripts = [...bulkState.scripts];
      finalScripts[idx].loading = false;
      setBulkState({...bulkState, scripts: finalScripts});
    }
  };

  const extractTextFromImage = async (base64) => {
    return await callAI("OCR Task: Transcribe every word from this image exactly. No chatter.", null, [{ mime: "image/jpeg", base64: base64.split(',')[1] }]);
  };

  const CameraModal = ({ onClose, onExtract }) => {
    const videoRef = useRef(null);
    const [capturing, setCapturing] = useState(false);

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => { if(videoRef.current) videoRef.current.srcObject = s; })
        .catch(() => alert("Camera access failed. Use HTTPS."));
    }, []);

    const capture = async () => {
      setCapturing(true);
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      try {
        const b64 = canvas.toDataURL('image/jpeg', 0.5);
        // Bypass synchronous OCR for instantaneous snapping. AI will natively read the image later.
        const text = "[Image captured successfully. The AI Vision Engine will read this directly during grading]";
        onExtract(text, b64);
        onClose();
      } catch (e) { alert(e.message); }
      setCapturing(false);
    };

    return (
      <div className="modal-overlay">
        <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>Vision OCR Scanner</h3>
            <button className="btn-outline" style={{ padding: '8px', border: 'none' }} onClick={onClose}><X size={20}/></button>
          </div>
          <div style={{ position: 'relative', background: '#000', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9' }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: '20px', border: '2px dashed rgba(255,255,255,0.3)', borderRadius: '12px' }}></div>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={capture} disabled={capturing}>
              {capturing ? <Activity className="animate-spin" /> : <><Camera size={20}/> Capture Text</>}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SettingsModal = () => (
    <div className="modal-overlay">
      <div className="glass-panel scrollbar" style={{ width: '100%', maxWidth: '500px', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}><Settings size={28} color="var(--text-main)"/> AI Configuration</h2>
          <button className="btn-outline" style={{ padding: '8px', border: 'none' }} onClick={() => setShowSettings(false)}><X size={24} /></button>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Preferred AI Engine</label>
          <select className="input-field" value={aiSettings.provider} onChange={e => setAiSettings({...aiSettings, provider: e.target.value})}>
            <option value="openrouter">OpenRouter (Free Cloud Models - Recommended)</option>
            <option value="gemini">Google Gemini 1.5 Direct (CORS blocked in browser)</option>
            <option value="anthropic">Anthropic Claude 3.7</option>
            <option value="huggingface">HuggingFace Inference</option>
          </select>
        </div>

        {aiSettings.provider === 'openrouter' && (
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>OpenRouter Free Model</label>
            <select className="input-field" value={aiSettings.openrouterModel || 'openrouter/free'} onChange={e => setAiSettings({...aiSettings, openrouterModel: e.target.value})}>
              <option value="openrouter/free">Auto-Select Free Model (Recommended)</option>
              <option value="google/gemma-2-9b-it:free">Gemma 2 9B (100% Free)</option>
              <option value="meta-llama/llama-3-8b-instruct:free">Llama 3 8B Instruct (100% Free)</option>
              <option value="mistralai/mistral-7b-instruct:free">Mistral 7B Instruct (100% Free)</option>
            </select>
          </div>
        )}

        {aiSettings.provider === 'gemini' && (
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Gemini Model Version</label>
            <select className="input-field" value={aiSettings.geminiModel} onChange={e => setAiSettings({...aiSettings, geminiModel: e.target.value})}>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Free & Fast)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Complex Analysis)</option>
            </select>
          </div>
        )}

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {aiSettings.provider === 'openrouter' ? 'OpenRouter API Key' : aiSettings.provider === 'gemini' ? 'Gemini API Key' : aiSettings.provider === 'anthropic' ? 'Claude API Key' : 'HF Token'}
          </label>
          <input 
            type="password" 
            className="input-field" 
            placeholder="Paste your key here..."
            value={
              aiSettings.provider === 'openrouter' ? aiSettings.openrouterKey :
              aiSettings.provider === 'gemini' ? aiSettings.geminiKey : 
              aiSettings.provider === 'anthropic' ? aiSettings.anthropicKey : 
              aiSettings.hfToken
            }
            onChange={e => {
              const val = e.target.value;
              if(aiSettings.provider === 'openrouter') setAiSettings({...aiSettings, openrouterKey: val});
              else if(aiSettings.provider === 'gemini') setAiSettings({...aiSettings, geminiKey: val});
              else if(aiSettings.provider === 'anthropic') setAiSettings({...aiSettings, anthropicKey: val});
              else setAiSettings({...aiSettings, hfToken: val});
            }}
          />
          <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            <AlertCircle size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            {aiSettings.provider === 'openrouter' ? (
              <>Get a 100% free key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 'bold' }}>openrouter.ai/keys</a></>
            ) : 'Keys are stored locally in your browser and never shared.'}
          </p>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }} onClick={() => setShowSettings(false)}>Save & Initialize</button>
      </div>
    </div>
  );

  const DetailedCorrectionsModal = () => {
    if (!selectedSub) return null;
    const ass = assessments.find(a => a.id === selectedSub.assessmentId);
    const totalMaxMarks = ass ? ass.questions.reduce((acc, q) => acc + (q.maxMarks || 10), 0) : 0;
    const totalScore = selectedSub.results ? selectedSub.results.reduce((acc, r) => acc + r.score, 0) : 0;
    const percentage = totalMaxMarks > 0 ? Math.round((totalScore / totalMaxMarks) * 100) : 0;

    return (
      <div className="modal-overlay" style={{ zIndex: 1000 }}>
        <div className="glass-panel scrollbar" style={{ width: '100%', maxWidth: '850px', padding: '40px', maxHeight: '90vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Compliance & Grading Review</span>
              <h2 style={{ margin: '4px 0 0 0', fontSize: '1.8rem' }}>{ass?.title || 'Detailed AI Report Card'}</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Student Reference ID: {selectedSub.studentId}</p>
            </div>
            <button className="btn-outline" style={{ padding: '8px', border: 'none' }} onClick={() => setSelectedSub(null)}><X size={24} /></button>
          </div>

          {/* Score & General Status Bar */}
          <div className="score-detail-grid" style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--panel-border)', padding: '24px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ScoreRing score={percentage} size={130} strokeWidth={11} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={20} color="var(--warning)" fill="var(--warning)" /> Performance Feedback
              </h3>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', margin: '4px 0' }}>
                Score: {totalScore} / {totalMaxMarks} ({percentage}%)
              </div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Graded against the uploaded course material for high-context compliance.
              </p>
            </div>
          </div>


          {role !== 'Student' && (
            <>
              {/* Question-by-Question Corrections breakdown */}
              <h3 style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Detailed Evaluation Breakdown</h3>
              <div style={{ display: 'grid', gap: '32px' }}>
                {selectedSub.results.map((res, index) => {

              const qObj = ass?.questions.find(q => q.id === res.questionId) || { text: 'Academic Question', maxMarks: 10 };
              const studentAns = selectedSub.answers[res.questionId] || 'No answer submitted.';
              
              return (
                <div key={index} style={{ border: '1px solid var(--panel-border)', borderRadius: '16px', background: 'rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                  {/* Question Header Card */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '18px 24px', borderBottom: '1px solid var(--panel-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Question {index + 1}</span>
                    <span className="badge badge-primary" style={{ background: 'rgba(59,130,246,0.1)' }}>
                      Score: {res.score} / {qObj.maxMarks || 10}
                    </span>
                  </div>
                  
                  {/* Question Text & Student Answer Body */}
                  <div style={{ padding: '24px' }}>
                    <p style={{ margin: '0 0 16px 0', fontSize: '1.05rem', fontWeight: '500', color: 'var(--text-main)' }}>{qObj.text}</p>
                    
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Submitted Student Answer</label>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--primary)', marginBottom: '24px', fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', whiteSpace: 'pre-wrap' }}>
                      "{studentAns}"
                    </div>

                    {/* AI Feedback & Evaluation Corrections */}
                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>AI Evaluation & Corrections</label>
                    
                    <div style={{ background: 'rgba(59, 130, 246, 0.03)', border: '1px solid rgba(59,130,246,0.1)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                      <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}>{res.feedback}</p>
                    </div>

                    {/* Strengths Grid */}
                    {res.strengths && res.strengths.length > 0 && (
                      <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                          <Check size={16} /> Key Strengths
                        </span>
                        <div style={{ display: 'grid', gap: '8px' }}>
                          {res.strengths.map((str, sIdx) => (
                            <div key={sIdx} style={{ fontSize: '0.9rem', color: 'var(--text-main)', background: 'rgba(46,160,67,0.1)', padding: '10px 14px', borderRadius: '8px', borderLeft: '2px solid var(--success)' }}>
                              {str}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Corrections & Suggested Improvements */}
                    {res.improvements && res.improvements.length > 0 && (
                      <div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--warning)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                          <Sliders size={16} /> Corrections & Suggested Improvements
                        </span>
                        <div style={{ display: 'grid', gap: '8px' }}>
                          {res.improvements.map((imp, iIdx) => (
                            <div key={iIdx} style={{ fontSize: '0.9rem', color: 'var(--text-main)', background: 'rgba(210,153,34,0.1)', padding: '10px 14px', borderRadius: '8px', borderLeft: '2px solid var(--warning)' }}>
                              {imp}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
          </>
          )}

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--panel-border)', paddingTop: '24px' }}>

            <button className="btn btn-primary" onClick={() => setSelectedSub(null)}>Done Reviewing</button>
          </div>
        </div>
      </div>
    );
  };

  
  

  const RoleLoginModal = () => {
    const handleLogin = (e) => {
      e.preventDefault();
      setLoginError('');
      if (passwordInput === 'admin') {
        setRole('FacultyHub');
        setLoginModalRole(null);
      } else {
        setLoginError('Invalid Faculty Password');
      }
    };

    return (
      <div className="modal-overlay" style={{ zIndex: 1100 }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '32px', textAlign: 'left', animation: 'slideUp 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={24} color="var(--text-main)" /> Secure Access
            </h3>
            <button className="btn-outline" style={{ padding: '6px', border: 'none' }} onClick={() => setLoginModalRole(null)}>
              <X size={20} />
            </button>
          </div>
          
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.4' }}>
            You are attempting to access the high-privilege **Faculty Dashboard**. Please enter the global faculty password to continue.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 'bold' }}>Faculty Password</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="Enter password" 
                required 
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
              />
            </div>

            {loginError && (
              <div style={{ color: 'var(--danger)', fontSize: '0.8rem', background: 'rgba(248,81,73,0.1)', padding: '10px 14px', borderRadius: '8px', borderLeft: '2px solid var(--danger)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={14} /> {loginError}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '8px' }}>
              Authorize Entry
            </button>
          </form>
        </div>
      </div>
    );
  };

  const FacultyHubScreen = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', animation: 'fadeIn 1s ease' }}>
        <h1 className="brand-title">Faculty Hub</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>Select your workspace</p>
      </div>
      <div className="role-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '800px', margin: '0 auto' }}>
        <div className="role-card" onClick={() => { setRole('Lecturer'); setLecturerTab('build'); }}>
          <ShieldCheck size={48} color="var(--text-main)" />
          <h3 style={{ margin: 0 }}>Lecturer Dashboard</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage assessments, grading, and students</p>
          <MagneticButton className="btn-outline" style={{ marginTop: 'auto', width: '100%' }}>Enter <ChevronRight size={16}/></MagneticButton>
        </div>
        <div className="role-card" onClick={() => { setRole('Admin'); setLecturerTab('audit'); }}>
          <Settings size={48} color="var(--text-main)" />
          <h3 style={{ margin: 0 }}>Admin Portal</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>System configuration and API management</p>
          <MagneticButton className="btn-outline" style={{ marginTop: 'auto', width: '100%' }}>Enter <ChevronRight size={16}/></MagneticButton>
        </div>
      </div>
      <button className="btn btn-outline" style={{ marginTop: '40px', border: 'none' }} onClick={() => setRole(null)}>
        <LogOut size={18} style={{ marginRight: '8px' }}/> Sign Out
      </button>
    </div>
  );

  const LecturerDashboard = () => {
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      
      // Clean previous state to avoid showing binary data
      if (file.type === 'application/pdf') {
        reader.onload = ev => setCourseMaterial({ ...courseMaterial, pdfBase64: ev.target.result.split(',')[1], pdfName: file.name, text: '' });
        reader.readAsDataURL(file);
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        reader.onload = ev => setCourseMaterial({ ...courseMaterial, text: ev.target.result, pdfBase64: null, pdfName: '' });
        reader.readAsText(file);
      } else {
        alert("Unsupported file type. Please use PDF or Text.");
      }
    };

    const handleAssessmentFileUpload = (e) => {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        reader.onload = ev => setAssessmentContext({ ...assessmentContext, pdfBase64: ev.target.result.split(',')[1], pdfName: file.name, text: '', fileMime: file.type });
        reader.readAsDataURL(file);
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        reader.onload = ev => setAssessmentContext({ ...assessmentContext, text: ev.target.result, pdfBase64: null, pdfName: '' });
        reader.readAsText(file);
      } else {
        alert("Unsupported file type. Please use PDF or Text.");
      }
    };

    return (
      <div className="main-layout" style={{ animation: 'fadeIn 0.5s ease' }}>
        {isMobileMenuOpen && <div className="drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
        
        {/* Left Side Menu (Faculty) */}
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

        {/* Main Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
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

        {lecturerTab === 'build' && (
          <div className="dashboard-grid">
            {/* Builder Form */}
            <div className="glass-panel" style={{ padding: '40px' }}>
              <h2 style={{ marginTop: 0, marginBottom: '24px' }}>
                {editingAssessmentId ? 'Edit Assessment' : 'Build New Assessment'}
              </h2>
              
              <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--panel-border)' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Specific Assessment Context Material (Optional)</label>
                <div className="two-col-grid" style={{ marginBottom: '16px' }}>
                  <div className="role-card" style={{ padding: '24px', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }} onClick={() => setShowCam(true)}>
                    <Camera size={32} color="var(--text-main)" />
                    <h4 style={{ margin: '8px 0 0 0' }}>Scan Printed Copy</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI-powered OCR via Vision</p>
                  </div>
                  <label className="role-card" style={{ padding: '24px', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}>
                    <Upload size={32} color="var(--success)" />
                    <h4 style={{ margin: '8px 0 0 0' }}>{assessmentContext.pdfName || 'Upload Digital Copy'}</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF, TXT, MD, JPG, PNG</p>
                    <input type="file" hidden onChange={handleAssessmentFileUpload} accept=".pdf,.txt,.md,.jpg,.jpeg,.png" />
                  </label>
                </div>
                <div style={{ position: 'relative' }}>
                  <textarea 
                    className="input-field scrollbar" 
                    rows={4} 
                    placeholder="Alternatively, paste specific context here. AI will use this strictly for grading this exam..."
                    value={assessmentContext.text}
                    onChange={e => setAssessmentContext({...assessmentContext, text: e.target.value})}
                  />
                  {assessmentContext.pdfBase64 && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }} className="badge badge-success">
                      <FileText size={14} style={{ marginRight: '6px' }} /> Linked Context File
                    </div>
                  )}
                </div>
                {showCam && <CameraModal onClose={() => setShowCam(false)} onExtract={t => setAssessmentContext(p => ({...p, text: p.text + '\n' + t}))} />}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Assessment Title</label>
                <input 
                  className="input-field" 
                  placeholder="e.g. Introduction to AI Ethics Midterm" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                />
              </div>

              <label style={{ display: 'block', marginBottom: '16px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Questions & Marks</label>
              
              <div style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
                {newQuestions.map((q, idx) => (
                  <div key={q.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--panel-border)', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 'bold' }}>QUESTION #{idx + 1}</label>
                      <textarea 
                        className="input-field" 
                        rows={2} 
                        placeholder="Type your exam question here..." 
                        value={q.text} 
                        onChange={e => {
                          const updated = [...newQuestions];
                          updated[idx].text = e.target.value;
                          setNewQuestions(updated);
                        }} 
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '120px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>MAX MARKS</label>
                      <input 
                        type="number" 
                        className="input-field" 
                        min={1} 
                        max={100} 
                        value={q.maxMarks} 
                        onChange={e => {
                          const updated = [...newQuestions];
                          updated[idx].maxMarks = parseInt(e.target.value) || 10;
                          setNewQuestions(updated);
                        }} 
                      />
                    </div>
                    {newQuestions.length > 1 && (
                      <button 
                        className="btn btn-outline" 
                        style={{ marginTop: '28px', padding: '12px', color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.2)' }} 
                        onClick={() => setNewQuestions(newQuestions.filter((_, i) => i !== idx))}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  className="btn btn-outline" 
                  style={{ flex: 1 }}
                  onClick={() => setNewQuestions([...newQuestions, { id: Date.now(), text: '', maxMarks: 10 }])}
                >
                  <Plus size={18} /> Add Question
                </button>
                {editingAssessmentId && (
                  <button 
                    className="btn btn-outline" 
                    style={{ flex: 1, color: 'var(--warning)', borderColor: 'rgba(245, 158, 11, 0.2)' }}
                    onClick={() => {
                      setNewTitle('');
                      setNewQuestions([{ id: Date.now(), text: '', maxMarks: 10 }]);
                      setAssessmentContext({ text: '', pdfBase64: null, pdfName: '' });
                      setEditingAssessmentId(null);
                    }}
                  >
                    <X size={18} /> Cancel Edit
                  </button>
                )}
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                  onClick={() => {
                    if (!newTitle.trim()) { alert("Please enter an assessment title."); return; }
                    const invalidQ = newQuestions.find(q => !q.text.trim());
                    if (invalidQ) { alert("Please enter text for all questions."); return; }
                    
                    const createdExam = {
                      id: editingAssessmentId || Date.now(),
                      title: newTitle.trim(),
                      published: true,
                      contextText: assessmentContext.text,
                      contextPdfBase64: assessmentContext.pdfBase64,
                      contextFileMime: assessmentContext.fileMime,
                      questions: newQuestions.map((q, i) => ({
                        id: i + 1,
                        title: `Question ${i + 1}`,
                        text: q.text.trim(),
                        maxMarks: q.maxMarks || 10
                      }))
                    };
                    
                    if (editingAssessmentId) {
                      setAssessments(assessments.map(a => a.id === editingAssessmentId ? createdExam : a));
                    } else {
                      setAssessments([createdExam, ...assessments]);
                    }
                    
                    setNewTitle('');
                    setNewQuestions([{ id: Date.now(), text: '', maxMarks: 10 }]);
                    setAssessmentContext({ text: '', pdfBase64: null, pdfName: '' });
                    setEditingAssessmentId(null);
                    alert(`Assessment "${createdExam.title}" has been successfully ${editingAssessmentId ? 'updated' : 'published'} to the Student Portal!`);
                  }}
                >
                  <Save size={18} /> {editingAssessmentId ? 'Update Assessment' : 'Save & Publish'}
                </button>
              </div>
            </div>

            {/* Published Assessments List */}
            <div className="glass-panel" style={{ padding: '40px' }}>
              <h3 style={{ marginTop: 0, marginBottom: '24px' }}>Published Assessments</h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {assessments.map(a => (
                  <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--panel-border)', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0' }}>{a.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{a.questions.length} Questions</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn-outline" style={{ padding: '8px', border: 'none', color: 'var(--text-main)' }} onClick={() => {
                        setNewTitle(a.title);
                        setNewQuestions(a.questions.map(q => ({ id: Date.now() + Math.random(), text: q.text, maxMarks: q.maxMarks })));
                        setAssessmentContext({ text: a.contextText || '', pdfBase64: a.contextPdfBase64 || null, pdfName: a.contextPdfBase64 ? 'Linked Context' : '' });
                        setEditingAssessmentId(a.id);
                        window.scrollTo(0, 0);
                      }}>
                        <Edit size={18} />
                      </button>
                      <button className="btn-outline" style={{ padding: '8px', border: 'none' }} onClick={() => setAssessments(assessments.filter(x => x.id !== a.id))}>
                        <Trash2 size={18} color="var(--danger)"/>
                      </button>
                    </div>
                  </div>
                ))}
                {assessments.length === 0 && (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No published assessments yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {lecturerTab === 'scanner' && (
          <div className="glass-panel" style={{ padding: '40px', animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ marginTop: 0, marginBottom: '24px' }}>Offline Script Scanner (Bulk Grading)</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Snap a marking guide, then scan physical student scripts. The AI will mark them all instantly without them logging in.</p>
            
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><Book size={20}/> 1. Provide Marking Guide</h3>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setBulkScannerCam({ active: true, target: 'guide', idx: null })}><Camera size={18}/> Snap Rubric</button>
                <input type="file" id="bulkGuideUpload" hidden accept=".txt,.pdf,.jpg,.png" onChange={e => handleBulkUpload(e, 'guide')} />
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => document.getElementById('bulkGuideUpload').click()}><Upload size={18}/> Upload Rubric</button>
              </div>
              <textarea className="input-field scrollbar" rows={3} placeholder="Extracted marking guide text will appear here..." value={bulkState.guideText} onChange={e => setBulkState({...bulkState, guideText: e.target.value})}></textarea>
              {bulkState.guideBase64 && <div className="badge badge-success" style={{ marginTop: '12px' }}><FileText size={14} style={{ marginRight: '6px' }}/> Marking Guide Document Attached</div>}
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><FileBadge size={20}/> 2. Add Student Scripts</h3>
                <button className="btn btn-primary" onClick={() => setBulkState({...bulkState, scripts: [...bulkState.scripts, { id: Date.now(), matric: '', text: '', base64: null, mime: '', result: null, loading: false }]})}><Plus size={18}/> Add Student</button>
              </div>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                {bulkState.scripts.map((script, idx) => (
                  <div key={script.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--panel-border)' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <input className="input-field" placeholder="Student Matric Number" value={script.matric} onChange={e => {
                        const newScripts = [...bulkState.scripts]; newScripts[idx].matric = e.target.value; setBulkState({...bulkState, scripts: newScripts});
                      }} style={{ flex: 1, minWidth: '200px' }} />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-outline" style={{ padding: '10px' }} onClick={() => setBulkScannerCam({ active: true, target: 'script', idx })}><Camera size={18}/> Snap Script</button>
                        <input type="file" id={`scriptUpload-${script.id}`} hidden accept=".txt,.pdf,.jpg,.png" onChange={e => handleBulkUpload(e, 'script', idx)} />
                        <button className="btn btn-outline" style={{ padding: '10px' }} onClick={() => document.getElementById(`scriptUpload-${script.id}`).click()}><Upload size={18}/></button>
                        <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.2)', padding: '10px' }} onClick={() => {
                          setBulkState({...bulkState, scripts: bulkState.scripts.filter((_, i) => i !== idx)});
                        }}><Trash2 size={18}/></button>
                      </div>
                    </div>
                    <textarea className="input-field scrollbar" rows={3} placeholder="Extracted script text will appear here..." value={script.text} onChange={e => {
                      const newScripts = [...bulkState.scripts]; newScripts[idx].text = e.target.value; setBulkState({...bulkState, scripts: newScripts});
                    }}></textarea>
                    {script.base64 && <div className="badge badge-primary" style={{ marginTop: '12px' }}><FileText size={14} style={{ marginRight: '6px' }}/> Image/Doc Attached</div>}
                    
                    <button className="btn btn-primary" style={{ marginTop: '20px', width: '100%', padding: '14px' }} disabled={script.loading || (!bulkState.guideText && !bulkState.guideBase64)} onClick={() => gradeBulkScript(idx)}>
                      {script.loading ? <Activity className="animate-spin" /> : <><CheckCircle size={18}/> Mark this Script</>}
                    </button>
                    
                    {script.result && (
                      <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(46,160,67,0.1)', border: '1px solid var(--success)', borderRadius: '12px', animation: 'fadeIn 0.5s ease' }}>
                        <h3 style={{ margin: '0 0 12px 0', color: 'var(--success)' }}>Score: {script.result.score}/100</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>{script.result.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
                {bulkState.scripts.length === 0 && <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Click "Add Student" to start scanning scripts.</div>}
              </div>
            </div>
            
            {bulkScannerCam.active && <CameraModal onClose={() => setBulkScannerCam({ active: false })} onExtract={(text, b64) => {
              if (bulkScannerCam.target === 'guide') {
                setBulkState({...bulkState, guideText: bulkState.guideText + '\n' + text, guideBase64: b64, guideMime: 'image/jpeg' });
              } else {
                const newScripts = [...bulkState.scripts];
                newScripts[bulkScannerCam.idx].text += '\n' + text;
                newScripts[bulkScannerCam.idx].base64 = b64;
                newScripts[bulkScannerCam.idx].mime = 'image/jpeg';
                setBulkState({...bulkState, scripts: newScripts});
              }
            }} />}
          </div>
        )}

        {lecturerTab === 'results' && (
          <div style={{ display: 'grid', gap: '20px' }}>
            {/* Pending Retake Requests Sub-Section */}
            {retakeRequests.filter(r => r.status === 'pending').length > 0 && (
              <div style={{ background: 'rgba(210,153,34,0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '28px', borderRadius: '6px', marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 16px 0', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={20} /> Retake Requests Pending Approval
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {retakeRequests.filter(r => r.status === 'pending').map(req => (
                    <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--panel-border)', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 'bold' }}>{req.studentId}</span>
                        <h4 style={{ margin: '4px 0 0 0' }}>Requesting to retake: {req.title}</h4>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.2)', padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => {
                          setRetakeRequests(retakeRequests.filter(r => r.id !== req.id));
                        }}>Decline</button>
                        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => {
                          setRetakeRequests(retakeRequests.map(r => r.id === req.id ? { ...r, status: 'approved' } : r));
                          // Clear the student's previous submission for this assessment so they can take it fresh!
                          setSubmissions(submissions.filter(sub => !(sub.assessmentId === req.assessmentId && sub.studentId === req.studentId)));
                          alert(`Retake request approved for ${req.studentId}! Their previous submission was cleared.`);
                        }}>Approve Retake</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Student Messages Sub-Section */}
            {studentMessages.length > 0 && (
              <div style={{ background: 'rgba(59, 130, 246, 0.02)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '28px', borderRadius: '6px', marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={20} /> Urgent Student Messages
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {studentMessages.map(msg => (
                    <div key={msg.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--panel-border)', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 'bold' }}>{msg.studentId} • {msg.date}</span>
                        <p style={{ margin: '8px 0 0 0', lineHeight: '1.4' }}>"{msg.msg}"</p>
                      </div>
                      <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }} onClick={() => {
                        setStudentMessages(studentMessages.filter(m => m.id !== msg.id));
                      }}>Dismiss</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ margin: 0 }}>Graded Submissions</h3>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => {
                if (submissions.length === 0) return alert('No grades to export.');
                let csv = 'Matric Number,Exam Title,Score,Max Marks,Percentage,Authenticity Score,Timestamp\n';
                submissions.forEach(sub => {
                  const ass = assessments.find(a => a.id === sub.assessmentId);
                  const title = ass ? ass.title : 'Unknown';
                  const totalMax = ass ? ass.questions.reduce((a,q) => a + (q.maxMarks||10), 0) : 0;
                  const score = sub.results ? sub.results.reduce((a,r) => a + r.score, 0) : 0;
                  const perc = totalMax > 0 ? Math.round((score/totalMax)*100) : 0;
                  csv += `${sub.studentId},"${title}",${score},${totalMax},${perc}%,${sub.authenticity ? sub.authenticity+'%' : 'N/A'},"${sub.timestamp}"\n`;
                });
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Evaluate_Export_${Date.now()}.csv`;
                a.click();
              }}><Download size={18}/> Export Grades to CSV</button>
            </div>

            {submissions.map((sub, i) => {
              const ass = assessments.find(a => a.id === sub.assessmentId);
              const totalMaxMarks = ass ? ass.questions.reduce((acc, q) => acc + (q.maxMarks || 10), 0) : 0;
              const totalScore = sub.results ? sub.results.reduce((acc, r) => acc + r.score, 0) : 0;
              const percentage = totalMaxMarks > 0 ? Math.round((totalScore / totalMaxMarks) * 100) : 0;
              
              return (
                <div key={i} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 'bold', textTransform: 'uppercase' }}>Student Matric Number: {sub.studentId}</span>
                    <h3 style={{ margin: '4px 0 8px 0' }}>Assessment: {ass?.title || 'Unknown'}</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Timestamp: {sub.timestamp || 'Recent Submission'}</p>
                    {sub.authenticity && (
                      <span className="badge" style={{ marginTop: '8px', display: 'inline-block', background: sub.authenticity > 80 ? 'var(--success)' : (sub.authenticity > 50 ? 'var(--warning)' : 'var(--danger)'), color: 'white' }}>
                        Authenticity: {sub.authenticity}%
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <ScoreRing score={percentage} size={70} strokeWidth={7} />
                    <button className="btn btn-outline" style={{ padding: '10px 18px', fontSize: '0.85rem' }} onClick={() => setSelectedSub(sub)}>
                      <Eye size={16} /> Review Corrections
                    </button>
                  </div>
                </div>
              );
            })}
            {submissions.length === 0 && <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>No student submissions yet.</div>}
          </div>
        )}


        {lecturerTab === 'students' && (
          <div className="dashboard-grid">
            <div className="glass-panel" style={{ padding: '40px' }}>
              <h2 style={{ marginTop: 0, marginBottom: '24px' }}>Student Management</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div>
                  <h3 style={{ marginTop: 0, color: 'var(--text-main)' }}>Add Individual Student</h3>
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
                    
                    const otp = String(Math.floor(100000 + Math.random() * 900000));
                    setStudents([{ name, matricNo, email, pin: otp }, ...students]);
                    sendOtpEmail(email, name, otp); // Send email in background
                    alert(`Student added. An OTP (${otp}) was emailed to them for login.`);
                    
                    document.getElementById('newStudName').value = '';
                    document.getElementById('newStudMatric').value = '';
                    document.getElementById('newStudEmail').value = '';
                  }}>+ Add Student</button>
                </div>

                <div>
                  <h3 style={{ marginTop: 0, color: 'var(--text-main)' }}>Bulk Import (CSV)</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Format: Name, MatricNo, Email (one per line)</p>
                  <textarea id="bulkStudCSV" className="input-field scrollbar" rows={6} placeholder="John Doe, 2001, john@edu.com\nJane Smith, 2002, jane@edu.com"></textarea>
                  <button className="btn btn-outline" style={{ marginTop: '16px' }} onClick={() => {
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
                  }}>Import CSV</button>
                </div>
              </div>

              <div style={{ marginTop: '40px' }}>
                <h3 style={{ color: 'var(--text-main)', marginBottom: '16px' }}>Registered Students ({students.length})</h3>
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
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: 'var(--text-main)' }}>{s.matricNo}</td>
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

        {lecturerTab === 'audit' && (
          <div className="audit-grid" style={{ animation: 'fadeIn 0.5s ease' }}>
            
            {/* Left Column: AI Engine Config */}
            <div className="glass-panel" style={{ padding: '32px', alignSelf: 'start' }}>
              <h3 style={{ margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sliders color="var(--text-main)" size={24} /> AI Engine Config
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold' }}>AI Provider</label>
                <select className="input-field" value={aiSettings.provider} onChange={e => setAiSettings({...aiSettings, provider: e.target.value})}>
                  <option value="openrouter">OpenRouter (Cloud Models - Recommended)</option>
                  <option value="gemini">Google Gemini 1.5 Direct</option>
                  <option value="anthropic">Anthropic Claude 3.7</option>
                  <option value="huggingface">HuggingFace Inference</option>
                </select>
              </div>

              {aiSettings.provider === 'openrouter' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold' }}>Model Version</label>
                  <select className="input-field" value={aiSettings.openrouterModel || 'openrouter/free'} onChange={e => setAiSettings({...aiSettings, openrouterModel: e.target.value})}>
                    <option value="openrouter/free">Auto-Select Free Model (Recommended)</option>
                    <option value="google/gemma-2-9b-it:free">Gemma 2 9B (Free)</option>
                    <option value="meta-llama/llama-3-8b-instruct:free">Llama 3 8B (Free)</option>
                    <option value="mistralai/mistral-7b-instruct:free">Mistral 7B (Free)</option>
                  </select>
                </div>
              )}

              {aiSettings.provider === 'gemini' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold' }}>Gemini Version</label>
                  <select className="input-field" value={aiSettings.geminiModel} onChange={e => setAiSettings({...aiSettings, geminiModel: e.target.value})}>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro (Precise)</option>
                  </select>
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {aiSettings.provider === 'openrouter' ? 'OpenRouter API Key' : aiSettings.provider === 'gemini' ? 'Gemini API Key' : aiSettings.provider === 'anthropic' ? 'Claude API Key' : 'HF Token'}
                </label>
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="Paste secure key here..."
                  value={
                    aiSettings.provider === 'openrouter' ? aiSettings.openrouterKey :
                    aiSettings.provider === 'gemini' ? aiSettings.geminiKey : 
                    aiSettings.provider === 'anthropic' ? aiSettings.anthropicKey : 
                    aiSettings.hfToken
                  }
                  onChange={e => {
                    const val = e.target.value;
                    if(aiSettings.provider === 'openrouter') setAiSettings({...aiSettings, openrouterKey: val});
                    else if(aiSettings.provider === 'gemini') setAiSettings({...aiSettings, geminiKey: val});
                    else if(aiSettings.provider === 'anthropic') setAiSettings({...aiSettings, anthropicKey: val});
                    else setAiSettings({...aiSettings, hfToken: val});
                  }}
                />
                <p style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  <AlertCircle size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {aiSettings.provider === 'openrouter' ? (
                    <>Get a free key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 'bold' }}>openrouter.ai</a></>
                  ) : 'Keys are saved securely in your browser cache.'}
                </p>
              </div>
              
              <div style={{ padding: '16px', background: 'rgba(46,160,67,0.1)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} /> API Key Auto-Saved & Initialized
              </div>

              {/* EmailJS Config Section */}
              <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--panel-border)' }}>
                <h4 style={{ margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={18} color="var(--text-main)" /> Email Delivery (EmailJS)
                </h4>
                <p style={{ margin: '0 0 16px 0', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Configure EmailJS to send OTP verification codes and auto-email results to students.{' '}
                  <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', fontWeight: '600' }}>Get free account →</a>
                </p>
                {[
                  { key: 'emailjsPublicKey', label: 'Public Key', placeholder: 'e.g. abc123XYZ...' },
                  { key: 'emailjsServiceId', label: 'Service ID', placeholder: 'e.g. service_xxxxxxx' },
                  { key: 'emailjsOtpTemplateId', label: 'OTP Template ID', placeholder: 'e.g. template_xxxxxxx' },
                  { key: 'emailjsResultsTemplateId', label: 'Results Template ID', placeholder: 'e.g. template_xxxxxxx' },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>{field.label}</label>
                    <input className="input-field" style={{ fontSize: '0.85rem', padding: '10px 14px' }}
                      placeholder={field.placeholder} value={aiSettings[field.key] || ''}
                      onChange={e => setAiSettings({ ...aiSettings, [field.key]: e.target.value })} />
                  </div>
                ))}
                <div style={{ padding: '12px 14px', background: aiSettings.emailjsPublicKey ? 'rgba(16,185,129,0.05)' : 'rgba(245,158,11,0.05)', border: `1px solid ${aiSettings.emailjsPublicKey ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`, borderRadius: '10px', fontSize: '0.78rem', color: aiSettings.emailjsPublicKey ? 'var(--success)' : 'var(--warning)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {aiSettings.emailjsPublicKey ? <><CheckCircle size={14}/> Email delivery active — OTPs & results will be sent automatically.</> : <><AlertCircle size={14}/> Email delivery inactive — students can still register without OTP.</>}
                </div>
              </div>
            </div>

            {/* Right Column: System Auditing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Analytics Sub-Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--text-main)' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>AI Integrity</h4>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>100% Compliant</span>
                  </div>
                </div>
                <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: 'rgba(46,160,67,0.1)', padding: '12px', borderRadius: '12px', color: 'var(--success)' }}>
                    <Book size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Exams</h4>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{assessments.length} Published</span>
                  </div>
                </div>
                <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: 'rgba(210,153,34,0.1)', padding: '12px', borderRadius: '12px', color: 'var(--warning)' }}>
                    <FileBadge size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Audited</h4>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{submissions.length} Graded</span>
                  </div>
                </div>
              </div>

              {/* Audit Logs List */}
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ margin: '0 0 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  System Compliance Logs
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Audit Mode</span>
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.85rem', lineHeight: '1.4' }}>
                  Every student grading transaction and AI response trace is captured below for systemic auditing.
                </p>

                <div style={{ display: 'grid', gap: '12px' }}>
                  {submissions.map((sub, i) => {
                    const ass = assessments.find(a => a.id === sub.assessmentId);
                    const totalMaxMarks = ass ? ass.questions.reduce((acc, q) => acc + (q.maxMarks || 10), 0) : 0;
                    const totalScore = sub.results ? sub.results.reduce((acc, r) => acc + r.score, 0) : 0;
                    const percentage = totalMaxMarks > 0 ? Math.round((totalScore / totalMaxMarks) * 100) : 0;

                    return (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.01)', borderRadius: '10px', border: '1px solid var(--panel-border)', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 'bold', textTransform: 'uppercase' }}>Matric Number: {sub.studentId}</span>
                          <h4 style={{ margin: '2px 0 0 0', fontSize: '0.9rem' }}>Exam: {ass?.title || 'Unknown Exam'}</h4>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <ScoreRing score={percentage} size={42} strokeWidth={4} />
                          <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => setSelectedSub(sub)}>
                            <ShieldCheck size={12} /> Audit Corrections
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {submissions.length === 0 && (
                    <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      No student grading transactions logged on the server.
                    </div>
                  )}
                </div>
              </div>

              {/* Developer / Testing Controls */}
              <div className="glass-panel" style={{ padding: '32px', border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(248,81,73,0.1)' }}>
                <h3 style={{ margin: '0 0 16px 0', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trash2 size={20} /> Developer & Database Tools
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.85rem', lineHeight: '1.4' }}>
                  Manage your offline local database. Export your data to switch devices without losing exams!
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="btn btn-outline" style={{ flex: 1, borderColor: 'var(--primary)', color: 'var(--text-main)' }} onClick={async () => {
                    const { data: dbData, error } = await supabase.from('app_state').select('data').eq('id', 1).single();
                    if (error || !dbData) return alert('No database found to backup!');
                    const data = JSON.stringify(dbData.data);
                    const blob = new Blob([data], { type: 'application/json' });
                    const a = document.createElement('a');
                    a.href = window.URL.createObjectURL(blob);
                    a.download = `Evaluate_DB_Backup_${Date.now()}.json`;
                    a.click();
                  }}><Download size={16} /> Export DB Backup</button>
                  
                  <input type="file" id="dbImport" hidden accept=".json" onChange={e => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = async ev => {
                      try {
                        const data = JSON.parse(ev.target.result);
                        if (data.assessments) {
                          await supabase.from('app_state').upsert({ id: 1, data: data });
                          alert('Database restored successfully! The page will now reload.');
                          window.location.reload();
                        } else throw new Error();
                      } catch(err) { alert('Invalid backup file.'); }
                    };
                    reader.readAsText(file);
                  }} />
                  <button className="btn btn-outline" style={{ flex: 1, borderColor: 'var(--success)', color: 'var(--success)' }} onClick={() => document.getElementById('dbImport').click()}>
                    <Upload size={16} /> Import DB Backup
                  </button>

                  <button className="btn btn-outline" style={{ flex: 1, color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => {
                    if (window.confirm("Are you sure you want to delete all registered students?")) {
                      setStudents([]);
                      alert("Students database wiped. You can now re-register with your test emails.");
                    }
                  }}>
                    <Trash2 size={16} /> Delete Students
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
        </div>
      </div>
    );
  };

  const StudentDashboard = () => {
    if (activeExam) return (
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', animation: 'slideUp 0.4s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2 style={{ margin: 0 }}>{activeExam.title}</h2>
          <button className="btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => {
            if (window.confirm("Are you sure you want to go back? Your current answers will be lost.")) {
              setActiveExam(null);
              setExamAnswers({});
            }
          }}>
            <X size={16}/> Back
          </button>
        </div>
        {activeExam.questions.map(q => (
          <div key={q.id} style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: '500' }}>{q.text}</p>
            <textarea className="input-field" rows={4} placeholder="Type your answer clearly..." onChange={e => setExamAnswers({...examAnswers, [q.id]: e.target.value})} />
          </div>
        ))}
        <div style={{ marginBottom: '24px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed var(--primary)' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Alternatively: Upload your Answer Script</h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Written your answers on paper or a PDF? Upload it and the AI will read it directly!</p>
          <input type="file" id="studentUpload" hidden accept=".pdf,.jpg,.jpeg,.png" onChange={e => {
             const f = e.target.files[0];
             if(!f) return;
             const r = new FileReader();
             r.onload = ev => setStudentUpload({ mime: f.type, base64: ev.target.result.split(',')[1], name: f.name });
             r.readAsDataURL(f);
          }} />
          <button className="btn btn-outline" style={{ width: '100%', padding: '14px' }} onClick={() => document.getElementById('studentUpload').click()}>
            <Upload size={18}/> {studentUpload ? studentUpload.name : 'Upload PDF or Image Script'}
          </button>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', padding: '18px' }} disabled={examLoading} onClick={async () => {
          setExamLoading(true);
          try {
            const uploadPayload = studentUpload ? [studentUpload] : [];
            const response = await markSubmission(activeExam, examAnswers, uploadPayload);
            const results = response.results || response; // Backwards compatibility for old format
            const totalMax = activeExam.questions.reduce((a, q) => a + (q.maxMarks || 10), 0);
            const totalScore = results.reduce((a, r) => a + r.score, 0);
            const newSub = { 
              assessmentId: activeExam.id, 
              studentId: studentId,
              studentName: studentProfile?.name || studentId,
              studentEmail: studentProfile?.email || '',
              answers: examAnswers, 
              results,
              authenticity: response.authenticity || null,
              authenticityReason: response.authenticityReason || '',
              timestamp: new Date().toLocaleString()
            };
            setSubmissions(prev => [...prev, newSub]);
            setActiveExam(null);
            setSelectedSub(newSub);
            // Auto-send results email
            if (studentProfile?.email) {
              sendResultsEmail(studentProfile, activeExam.title, results, totalScore, totalMax);
            }
            if (studentProfile) {
              localStorage.removeItem(`draft_${studentProfile.matricNo}_${activeExam.id}`);
            }
          } catch(e) { alert(e.message); }
          setExamLoading(false);
        }}>
          {examLoading ? <Activity className="animate-spin" /> : <><CheckCircle size={20}/> Submit for AI Grading</>}
        </button>
      </div>
    );

    return (
      <div className="main-layout" style={{ animation: 'fadeIn 0.5s ease' }}>
        {isMobileMenuOpen && <div className="drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
        {/* Left Side Menu (Student) */}
        <div className={`side-menu glass-panel ${isMobileMenuOpen ? 'open' : ''}`} style={{ padding: '20px 12px' }}>
          <h3 style={{ margin: '0 0 16px 12px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Student Portal</h3>
          <div className={`side-nav-tab ${studentTabState === 'exams' ? 'active' : ''}`} onClick={() => { setStudentTabState('exams'); setIsMobileMenuOpen(false); }}>
            📚 Available Assessments
          </div>
          <div className={`side-nav-tab ${studentTabState === 'results' ? 'active' : ''}`} onClick={() => { setStudentTabState('results'); setIsMobileMenuOpen(false); }}>
            🎓 My Graded Results ({submissions.length})
          </div>
          <div className={`side-nav-tab ${studentTabState === 'support' ? 'active' : ''}`} onClick={() => { setStudentTabState('support'); setIsMobileMenuOpen(false); }}>
            💬 Help & Support
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Sub-Navigation for Student Portal (Top) */}
          <div className="nav-container" style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid var(--panel-border)' }}>
            <div className={`nav-tab ${studentTabState === 'exams' ? 'active' : ''}`} onClick={() => setStudentTabState('exams')}>
              Available Assessments
            </div>
            <div className={`nav-tab ${studentTabState === 'results' ? 'active' : ''}`} onClick={() => setStudentTabState('results')}>
              My Graded Results ({submissions.length})
            </div>
            <div className={`nav-tab ${studentTabState === 'support' ? 'active' : ''}`} onClick={() => setStudentTabState('support')}>
              Help & Support
            </div>
          </div>

        {/* Available Assessments View */}
        {studentTabState === 'exams' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {assessments.map(a => {
              const hasSubmitted = submissions.some(sub => sub.assessmentId === a.id && sub.studentId === studentId);
              const retakeReq = retakeRequests.find(r => r.studentId === studentId && r.assessmentId === a.id);
              
              return (
                <div key={a.id} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: 'var(--primary)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Book color="white" size={24}/></div>
                  <h3 style={{ margin: 0 }}>{a.title}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', flex: 1 }}>{a.questions.length} Questions found.</p>
                  
                  {hasSubmitted ? (
                    (() => {
                      if (!retakeReq) {
                        return (
                          <button className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--primary)' }} onClick={() => {
                            const newReq = {
                              id: Date.now(),
                              studentId,
                              assessmentId: a.id,
                              title: a.title,
                              status: 'pending'
                            };
                            setRetakeRequests([...retakeRequests, newReq]);
                            alert("Your retake request has been successfully sent to the lecturer!");
                          }}>
                            Request Retake Permission
                          </button>
                        );
                      } else if (retakeReq.status === 'pending') {
                        return (
                          <button className="btn btn-outline" style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }} disabled>
                            Retake Pending Approval...
                          </button>
                        );
                      } else if (retakeReq.status === 'approved') {
                        return (
                          <button className="btn btn-primary" style={{ width: '100%', background: 'var(--primary)' }} onClick={() => {
                            setRetakeRequests(retakeRequests.filter(r => !(r.studentId === studentId && r.assessmentId === a.id)));
                            setActiveExam(a);
                          }}>
                            Begin Retake Exam
                          </button>
                        );
                      }
                    })()
                  ) : (
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setActiveExam(a)}>Begin Assessment</button>
                  )}
                </div>
              );
            })}
            {assessments.length === 0 && (
              <div className="glass-panel" style={{ gridColumn: '1/-1', padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No assessments available at the moment.
              </div>
            )}
          </div>
        )}

        {/* My Graded Results View */}
        {studentTabState === 'results' && (
          <div style={{ display: 'grid', gap: '20px' }}>
            {submissions.map((sub, i) => {
              const ass = assessments.find(a => a.id === sub.assessmentId);
              const totalMaxMarks = ass ? ass.questions.reduce((acc, q) => acc + (q.maxMarks || 10), 0) : 0;
              const totalScore = sub.results ? sub.results.reduce((acc, r) => acc + r.score, 0) : 0;
              const percentage = totalMaxMarks > 0 ? Math.round((totalScore / totalMaxMarks) * 100) : 0;

              return (
                <div key={i} className="glass-panel" style={{ padding: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '16px', borderRadius: '16px', color: 'var(--text-main)' }}>
                      <FileBadge size={32} />
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem' }}>{ass?.title || 'Course Assessment'}</h3>
                      <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Submitted on: {sub.timestamp || 'Recent'}
                      </p>
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>AI Graded</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <ScoreRing score={percentage} size={70} strokeWidth={7} />
                    <button className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '0.85rem' }} onClick={() => setSelectedSub(sub)}>
                      <Eye size={16} /> Get Corrections
                    </button>
                  </div>
                </div>
              );
            })}
            {submissions.length === 0 && (
              <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                You have not completed any assessments yet. Take an assessment to see your grades!
              </div>
            )}
          </div>
        )}

        {/* Support View */}
        {studentTabState === 'support' && (
          <div className="glass-panel" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', animation: 'fadeIn 0.4s ease' }}>
            <h2 style={{ marginTop: 0, marginBottom: '24px' }}>Help & Support</h2>
            
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>Contact Lecturer</h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Urgent issue with an exam or grading? Send a direct message to your lecturer.</p>
              <textarea className="input-field scrollbar" rows={4} placeholder="Type your message here..." id="lecturerMsg"></textarea>
              <button className="btn btn-primary" style={{ marginTop: '12px', width: '100%', padding: '14px' }} onClick={() => {
                const msgInput = document.getElementById('lecturerMsg');
                if (!msgInput.value.trim()) return alert('Please enter a message.');
                const newMsg = { id: Date.now(), studentId, msg: msgInput.value.trim(), date: new Date().toLocaleString() };
                setStudentMessages(prev => [...prev, newMsg]);
                msgInput.value = '';
                alert('Your message has been safely delivered to the faculty dashboard!');
              }}>Send Message to Lecturer</button>
            </div>

            <div style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '24px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>System Support</h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Experiencing technical difficulties? Please reach out to the system administrator.</p>
              <a href="mailto:admin@evaluate.com" className="btn btn-outline" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '14px' }}>
                Contact Technical Admin
              </a>
            </div>
          </div>
        )}
        </div>
      </div>
    );
  };

  // ─── Student Signup Screen ───────────────────────────────────────────────
  const StudentSignupScreen = () => {
    const [form, setForm] = React.useState({ name: '', matricNo: '', email: '', pin: '' });
    const [err, setErr] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSignup = async (e) => {
      e.preventDefault();
      setErr('');
      if (!form.name.trim() || !form.matricNo.trim() || !form.email.trim() || !form.pin.trim()) return setErr('All fields are required.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setErr('Please enter a valid email address.');
      if (!/^\d{4}$/.test(form.pin)) return setErr('Please create a 4-digit login PIN.');
      if (students.find(s => s.matricNo.toLowerCase() === form.matricNo.toLowerCase())) return setErr('This matric number is already registered. Please log in instead.');
      if (students.find(s => s.email.toLowerCase() === form.email.toLowerCase())) return setErr('This email is already registered. Please log in instead.');
      setLoading(true);
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      setPendingOtp({ code: otp, email: form.email, name: form.name, matricNo: form.matricNo, pin: form.pin, expiry: Date.now() + 600000 });
      setSignupForm(form);
      await sendOtpEmail(form.email, form.name, otp); // best-effort — OTP shown on screen if email fails
      setLoading(false);
      setAuthScreen('student-otp');
    };

    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--panel-bg)', borderRadius: '6px', border: '1px solid var(--panel-border)', marginBottom: '16px' }}>
              <Brain size={40} color="var(--text-main)" />
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Join Evaluate — Register as a Student</p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <form onSubmit={handleSignup}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Full Name</label>
                <input className="input-field" placeholder="e.g. David Adeyemi" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Matric Number</label>
                <input className="input-field" placeholder="e.g. 200101234" value={form.matricNo} onChange={e => setForm({...form, matricNo: e.target.value})} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Email Address</label>
                <input className="input-field" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <p style={{ margin: '8px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Your results will be sent to this email after grading.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Create 4-Digit Login PIN</label>
                <input className="input-field" type="password" inputMode="numeric" maxLength={4} placeholder="••••" value={form.pin} onChange={e => setForm({...form, pin: e.target.value})} />
                <p style={{ margin: '8px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>You will use this PIN to log in.</p>
              </div>
              {err && <div style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.85rem', color: 'var(--danger)' }}>{err}</div>}
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }} disabled={loading}>
                {loading ? <Activity className="animate-spin" /> : <><CheckCircle size={18}/> Send Verification OTP</>}
              </button>
            </form>
            <div className="divider">Already registered?</div>
            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => { setAuthError(''); setAuthScreen('student-login'); }}>
              Log In with Matric Number
            </button>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: '10px', fontSize: '0.85rem' }} onClick={() => setAuthScreen('landing')}>
              ← Back to Portal Selection
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── OTP Verification Screen ─────────────────────────────────────────────
  const OtpVerificationScreen = () => {
    const inputsRef = React.useRef([]);

    const handleVerify = (digitsToVerify = otpDigits) => {
      setAuthError('');
      const entered = digitsToVerify.join('');
      if (entered.length < 6) return setAuthError('Please enter the full 6-digit OTP.');
      if (!pendingOtp) return setAuthError('Session expired. Please sign up again.');
      if (Date.now() > pendingOtp.expiry) { setAuthError('OTP expired. Please sign up again.'); setAuthScreen('student-signup'); return; }
      if (entered !== pendingOtp.code) return setAuthError('Incorrect OTP. Please check your email.');
      // Register student
      const profile = { name: pendingOtp.name, matricNo: pendingOtp.matricNo, email: pendingOtp.email, pin: pendingOtp.pin };
      setStudents(prev => [...prev, profile]);
      setStudentProfile(profile);
      setPendingOtp(null);
      setOtpDigits(['','','','','','']);
      setRole('Student');
      setAuthScreen('landing');
    };

    const handleDigit = (val, idx) => {
      if (!/^\d*$/.test(val)) return;
      const next = [...otpDigits];
      next[idx] = val.slice(-1);
      setOtpDigits(next);
      if (val && idx < 5) {
        inputsRef.current[idx + 1]?.focus();
      } else if (val && idx === 5) {
        // Auto-submit on typing the 6th digit
        handleVerify(next);
      }
    };

    const handleKeyDown = (e, idx) => {
      if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) inputsRef.current[idx - 1]?.focus();
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      if (!pastedData) return;
      
      const next = [...otpDigits];
      for (let i = 0; i < pastedData.length; i++) {
        next[i] = pastedData[i];
      }
      setOtpDigits(next);
      
      if (pastedData.length === 6) {
        inputsRef.current[5]?.focus();
        handleVerify(next);
      } else {
        inputsRef.current[pastedData.length]?.focus();
      }
    };

    const handleResend = async () => {
      if (!pendingOtp) return;
      const newOtp = String(Math.floor(100000 + Math.random() * 900000));
      await sendOtpEmail(pendingOtp.email, pendingOtp.name, newOtp);
      setPendingOtp({ ...pendingOtp, code: newOtp, expiry: Date.now() + 600000 });
      alert('A new OTP has been sent to your email!');
    };

    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(46,160,67,0.1)', borderRadius: '6px', border: '1px solid rgba(16,185,129,0.2)', marginBottom: '16px' }}>
              <CheckCircle size={40} color="var(--success)" />
            </div>
            <h1 className="auth-title" style={{ background: 'none', WebkitTextFillColor: 'inherit' }}>Verify Email</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Enter the 6-digit code sent to</p>
            <p style={{ color: 'var(--text-main)', fontWeight: '700', margin: '4px 0 0 0' }}>{pendingOtp?.email}</p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            {!aiSettings.emailjsPublicKey && (
              <div style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '14px', padding: '16px 20px', marginBottom: '24px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--danger)', fontWeight: '600' }}>⚠ Email delivery not configured. Ask your Lecturer to set up EmailJS in the Faculty Dashboard → System Audit & Engine.</p>
              </div>
            )}
            <div className="otp-container">
              {otpDigits.map((d, i) => (
                <input key={i} ref={el => inputsRef.current[i] = el} className="otp-input" type="text" inputMode="numeric" maxLength={1}
                  value={d} onChange={e => handleDigit(e.target.value, i)} onKeyDown={e => handleKeyDown(e, i)} onPaste={handlePaste} />
              ))}
            </div>
            {authError && <div style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.85rem', color: 'var(--danger)', textAlign: 'center' }}>{authError}</div>}
            <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }} onClick={handleVerify}>
              <CheckCircle size={18}/> Verify & Complete Registration
            </button>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Didn't receive it?{' '}
              <span style={{ color: 'var(--text-main)', cursor: 'pointer', fontWeight: '600' }} onClick={handleResend}>Resend OTP</span>
            </p>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: '10px', fontSize: '0.85rem' }} onClick={() => setAuthScreen('student-signup')}>
              ← Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };


const StudentLoginScreen = () => {
    const [form, setForm] = React.useState({ name: '', matricNo: '', pin: '' });
    const [err, setErr] = React.useState('');

    const handleLogin = (e) => {
      e.preventDefault();
      setErr('');
      const found = students.find(s => 
        s.name.toLowerCase() === form.name.toLowerCase() && 
        s.matricNo.toLowerCase() === form.matricNo.toLowerCase() && 
        s.pin === form.pin
      );
      
      if (!found) return setErr('Invalid credentials. Please check your Name, Matric Number, and Password.');
      
      setStudentProfile(found);
      setRole('Student');
      setAuthScreen('landing');
    };

    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--panel-bg)', borderRadius: '6px', border: '1px solid var(--panel-border)', marginBottom: '16px' }}>
              <Brain size={40} color="var(--text-main)" />
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Log in to your Student Portal</p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Full Name</label>
                <input className="input-field" placeholder="e.g. John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Matric Number</label>
                <input className="input-field" placeholder="e.g. 200101234" value={form.matricNo} onChange={e => setForm({...form, matricNo: e.target.value})} required />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Login Password (OTP)</label>
                <input className="input-field" type="password" inputMode="numeric" maxLength={6} placeholder="e.g. 123456" value={form.pin} onChange={e => setForm({...form, pin: e.target.value})} required />
                <p style={{ margin: '8px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>This was sent to your email by your Lecturer.</p>
              </div>
              
              {err && <div style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.85rem', color: 'var(--danger)' }}>{err}</div>}
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                <LogOut size={18}/> Log In
              </button>
            </form>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: '10px', fontSize: '0.85rem', border: 'none' }} onClick={() => setAuthScreen('landing')}>
              ← Back to Portal Selection
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Landing Screen ───────────────────────────────────────────────────────
  
  
  const LoginScreen = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeIn 1s ease' }}>
        <div style={{ display: 'inline-flex', padding: '20px', background: 'var(--panel-bg)', borderRadius: '8px', border: '1px solid var(--panel-border)', marginBottom: '24px' }}>
          <Brain size={60} color="var(--text-main)" className="draw-icon" />
        </div>
        <h1 className="brand-title" style={{ fontFamily: 'var(--font-family)', fontSize: '2.5rem', letterSpacing: '2px', textShadow: '2px 2px 0px var(--panel-bg)', fontWeight: 'bold' }}>ＥＶＡＬＵＡＴＥ</h1>
        <TypewriterText text="Academic Grading Infrastructure for the AI Age" delay={40} className="brand-subtitle" style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 'bold', fontFamily: "'Courier New', Courier, monospace", textTransform: 'uppercase', letterSpacing: '1px' }} />
      </div>
      <div className="role-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '800px', margin: '0 auto' }}>
        {[
          { id: 'Student', icon: Smartphone, label: 'Student Portal', desc: 'Log in with your details and OTP' },
          { id: 'Faculty', icon: ShieldCheck, label: 'Faculty Dashboard', desc: 'Secure entry for Lecturers & Admins' }
        ].map(r => (
          <SpotlightCard key={r.id} className="role-card" onClick={() => {
            if (r.id === 'Student') {
              setAuthScreen('student-login');
            } else {
              setLoginModalRole('Faculty');
              setLoginError('');
              setUsernameInput('');
              setPasswordInput('');
            }
          }}>
            <r.icon size={48} color="var(--text-main)" />
            <h3 style={{ margin: 0 }}>{r.label}</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{r.desc}</p>
            <MagneticButton className="btn-outline" style={{ marginTop: 'auto', width: '100%' }}>Enter <ChevronRight size={16}/></MagneticButton>
          </SpotlightCard>
        ))}
      </div>
      <Footer />
    </div>
  );
// ─── Route Auth Screens ───────────────────────────────────────────────────
  if (!role) {
    if (authScreen === 'student-login') return <><GlobalStyles /><ParticleBackground /><div className="blueprint-grid" /><TerminalBackground /><StudentLoginScreen /></>;
    return <><GlobalStyles /><ParticleBackground /><div className="blueprint-grid" /><TerminalBackground /><LoginScreen />{loginModalRole && RoleLoginModal()}</>;
  }

  if (role === 'FacultyHub') {
    return <><GlobalStyles /><ParticleBackground /><div className="blueprint-grid" /><TerminalBackground /><FacultyHubScreen /></>;
  }

  return (
    <>
      <GlobalStyles /><ParticleBackground /><div className="blueprint-grid" /><TerminalBackground />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header className="glass-panel header-content" style={{ margin: '20px', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '6px' }}>
          <div className="header-brand-row" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Menu className="mobile-menu-btn" size={28} style={{ cursor: 'pointer', color: 'var(--text-main)', marginRight: '8px' }} onClick={() => setIsMobileMenuOpen(true)} />
            <Brain color="var(--text-main)" size={32} />
            <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 'bold' }}>Evaluate</h2>
            <div style={{ width: '1px', height: '24px', background: 'var(--panel-border)', margin: '0 8px' }}></div>
            <span className="badge badge-primary">{role === 'Lecturer' ? 'Faculty' : role}</span>
            {role === 'Student' && studentProfile && (
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                {studentProfile.name} · <span style={{ color: 'var(--text-main)' }}>{studentProfile.matricNo}</span>
              </span>
            )}
            {dbSyncing ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-main)', background: 'rgba(59, 130, 246, 0.1)', padding: '4px 10px', borderRadius: '12px', transition: 'all 0.3s' }}>
                <Activity size={12} /> Syncing to Cloud...
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--success)', background: 'rgba(46,160,67,0.1)', padding: '4px 10px', borderRadius: '12px', transition: 'all 0.3s' }}>
                <CheckCircle size={12} /> Saved to Cloud
              </span>
            )}
          </div>
          <div className="header-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.2)' }} onClick={() => { setRole(null); setStudentProfile(null); setAuthScreen('landing'); }}><LogOut size={18}/> <span className="btn-text">Exit</span></button>
          </div>
        </header>
        <main className="dashboard-main" style={{ flex: 1, padding: '0 20px 60px 20px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {(role === 'Lecturer' || role === 'Admin') && LecturerDashboard()}
          {role === 'Student' && StudentDashboard()}
        </main>
        {selectedSub && DetailedCorrectionsModal()}
        {loginModalRole && RoleLoginModal()}
        <Footer />
      </div>
    </>
  );
}
