import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, Camera, Upload, Book, FileText, CheckCircle, 
  BarChart, X, Plus, Trash2, Check, Video, Layout, LogOut, 
  FileBadge, Sliders, Play, Save, ChevronRight, Activity, 
  ShieldCheck, Brain, Star, Smartphone, AlertCircle
} from 'lucide-react';

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    :root {
      --bg-dark: #0a0f1c;
      --panel-bg: rgba(255, 255, 255, 0.03);
      --panel-border: rgba(255, 255, 255, 0.08);
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --gradient-brand: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --danger: #ef4444;
      --success: #10b981;
      --warning: #f59e0b;
      --font-family: 'Inter', system-ui, sans-serif;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg-dark); color: var(--text-main); font-family: var(--font-family); min-height: 100vh; overflow-x: hidden; }
    .glass-panel { background: var(--panel-bg); backdrop-filter: blur(12px); border: 1px solid var(--panel-border); border-radius: 16px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; font-size: 0.9rem; }
    .btn-primary { background: var(--gradient-brand); color: white; }
    .btn-outline { background: transparent; color: var(--text-main); border: 1px solid var(--panel-border); }
    .input-field { width: 100%; padding: 12px 16px; border-radius: 8px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--panel-border); color: white; outline: none; }
    .nav-tab { padding: 12px 24px; cursor: pointer; font-weight: 600; color: var(--text-muted); border-bottom: 2px solid transparent; }
    .nav-tab.active { color: white; border-bottom-color: var(--primary); }
    .role-card { padding: 24px; border-radius: 16px; border: 1px solid var(--panel-border); background: rgba(255,255,255,0.02); cursor: pointer; transition: 0.3s; text-align: center; }
    .role-card.active { border-color: var(--primary); background: rgba(59,130,246,0.1); }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
    .animate-spin { animation: spin 1s linear infinite; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    @media (max-width: 768px) {
      .role-grid { grid-template-columns: 1fr !important; }
      .header-actions { display: none !important; }
      .mobile-menu { display: flex !important; }
    }
  `}} />
);

const ScoreRing = ({ score, size = 100 }) => {
  const radius = 40;
  const circum = 2 * Math.PI * radius;
  const offset = circum - (score / 100) * circum;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
        <circle cx="50" cy="50" r={radius} stroke="var(--primary)" strokeWidth="8" fill="none" strokeDasharray={circum} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{score}%</div>
    </div>
  );
};

export default function AccessApp() {
  const [role, setRole] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [aiSettings, setAiSettings] = useState({
    provider: 'gemini',
    geminiKey: 'AIzaSyD5xglhc3fmMk5Sm50t2ru3MzttEh0iHhI',
    anthropicKey: '',
    hfToken: '',
    hfModelId: 'mistralai/Mistral-7B-Instruct-v0.3'
  });
  const [courseMaterial, setCourseMaterial] = useState({ text: '', pdfBase64: null, pdfName: '' });
  const [assessments, setAssessments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('access_ai_v2');
    if (saved) {
        const d = JSON.parse(saved);
        setAssessments(d.assessments || []);
        setSubmissions(d.submissions || []);
        if(d.settings) setAiSettings(prev => ({...prev, ...d.settings}));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('access_ai_v2', JSON.stringify({ assessments, submissions, settings: aiSettings }));
  }, [assessments, submissions, aiSettings]);

  const callGeminiAPI = async (prompt, system, files = []) => {
    const contents = [{ parts: [{ text: system ? `${system}\n\n${prompt}` : prompt }] }];
    files.forEach(f => {
        contents[0].parts.push({ inline_data: { mime_type: f.mime, data: f.base64 } });
    });
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${aiSettings.geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates[0].content.parts[0].text;
  };

  const markSubmission = async (assessment, answers) => {
    const system = "Grade strictly based on course material. Return JSON: [{\"questionId\":1, \"score\":5, \"feedback\":\"...\"}]";
    const prompt = `Assessment: ${assessment.title}\nMaterial: ${courseMaterial.text}\nAnswers: ${JSON.stringify(answers)}`;
    const files = courseMaterial.pdfBase64 ? [{ mime: "application/pdf", base64: courseMaterial.pdfBase64 }] : [];
    const result = await callGeminiAPI(prompt, system, files);
    return JSON.parse(result.replace(/```json/g, '').replace(/```/g, '').trim());
  };

  const extractTextFromImage = async (base64) => {
    return await callGeminiAPI("Transcribe all text from this image exactly.", null, [{ mime: "image/jpeg", base64: base64.split(',')[1] }]);
  };

  const CameraModal = ({ onClose, onExtract }) => {
    const videoRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => { if(videoRef.current) videoRef.current.srcObject = s; })
        .catch(() => alert("Camera error. Ensure you are on HTTPS."));
    }, []);
    const capture = async () => {
      setCapturing(true);
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      try {
        const text = await extractTextFromImage(canvas.toDataURL('image/jpeg'));
        onExtract(text);
        onClose();
      } catch (e) { alert(e.message); }
      setCapturing(false);
    };
    return (
      <div className="modal-overlay">
        <div className="glass-panel" style={{ padding: '20px', width: '90%', maxWidth: '500px' }}>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '12px' }} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={capture} disabled={capturing}>{capturing ? <Activity className="animate-spin"/> : 'Capture & Extract'}</button>
            <button className="btn btn-outline" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  const LecturerDashboard = () => {
    const [tab, setTab] = useState('material');
    const [showCam, setShowCam] = useState(false);
    const handleFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file.type === 'application/pdf') {
            reader.onload = ev => setCourseMaterial({...courseMaterial, pdfBase64: ev.target.result.split(',')[1], pdfName: file.name});
            reader.readAsDataURL(file);
        } else {
            reader.onload = ev => setCourseMaterial({...courseMaterial, text: ev.target.result});
            reader.readAsText(file);
        }
    };
    return (
      <div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button className={`nav-tab ${tab === 'material' ? 'active' : ''}`} onClick={() => setTab('material')}>Grounding</button>
          <button className={`nav-tab ${tab === 'build' ? 'active' : ''}`} onClick={() => setTab('build')}>Exams</button>
        </div>
        {tab === 'material' && (
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <button className="btn btn-outline" onClick={() => setShowCam(true)}><Camera size={18}/> Scan Paper</button>
                <label className="btn btn-outline"><Upload size={18}/> {courseMaterial.pdfName || 'Upload PDF/Text'}<input type="file" hidden onChange={handleFile}/></label>
            </div>
            <textarea className="input-field" rows={10} placeholder="Paste course content here..." value={courseMaterial.text} onChange={e => setCourseMaterial({...courseMaterial, text: e.target.value})} />
            {showCam && <CameraModal onClose={() => setShowCam(false)} onExtract={t => setCourseMaterial(p => ({...p, text: p.text + '\n' + t}))} />}
          </div>
        )}
        {tab === 'build' && (
            <div className="glass-panel" style={{padding:'24px'}}>
                <input className="input-field" placeholder="Exam Title" onBlur={e => e.target.value && setAssessments([{id:Date.now(), title:e.target.value, published:true, questions:[{id:1, text:'Sample Question', maxMarks:10}]}, ...assessments])} />
                <div style={{marginTop:'20px'}}>
                    {assessments.map(a => <div key={a.id} style={{padding:'10px', borderBottom:'1px solid var(--panel-border)'}}>{a.title}</div>)}
                </div>
            </div>
        )}
      </div>
    );
  };

  const StudentDashboard = () => {
    const [active, setActive] = useState(null);
    const [ans, setAns] = useState({});
    const [loading, setLoading] = useState(false);
    if (active) return (
        <div className="glass-panel" style={{padding:'24px'}}>
            <h2>{active.title}</h2>
            {active.questions.map(q => (
                <div key={q.id} style={{marginBottom:'15px'}}>
                    <p>{q.text}</p>
                    <textarea className="input-field" rows={3} onChange={e => setAns({...ans, [q.id]: e.target.value})} />
                </div>
            ))}
            <button className="btn btn-primary" style={{width:'100%'}} onClick={async () => {
                setLoading(true);
                try {
                    const results = await markSubmission(active, ans);
                    setSubmissions([...submissions, { assessmentId: active.id, studentId: 'User', results }]);
                    setActive(null);
                } catch(e) { alert(e.message); }
                setLoading(false);
            }}>{loading ? <Activity className="animate-spin"/> : 'Submit for AI Grading'}</button>
        </div>
    );
    return (
        <div style={{display:'grid', gap:'15px'}}>
            {assessments.map(a => (
                <div key={a.id} className="glass-panel" style={{padding:'20px', display:'flex', justifyContent:'space-between'}}>
                    <span>{a.title}</span>
                    <button className="btn btn-primary" onClick={() => setActive(a)}>Take Exam</button>
                </div>
            ))}
        </div>
    );
  };

  if (!role) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <GlobalStyles />
      <Brain size={60} color="var(--primary)" style={{ marginBottom: '20px' }} />
      <h1 style={{ fontSize: '3rem', margin: 0, background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AccessAI</h1>
      <div className="role-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '40px', width: '100%', maxWidth: '800px' }}>
        {['Student', 'Lecturer', 'Admin'].map(r => <div key={r} className="role-card" onClick={() => setRole(r)}>{r} Portal</div>)}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <GlobalStyles />
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>AccessAI - {role}</h2>
        <button className="btn btn-outline" onClick={() => setRole(null)}>Logout</button>
      </header>
      <main>
        {role === 'Lecturer' && <LecturerDashboard />}
        {role === 'Student' && <StudentDashboard />}
        {role === 'Admin' && <div className="glass-panel" style={{padding:'40px'}}>System Admin Dashboard</div>}
      </main>
    </div>
  );
}
