import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, Camera, Upload, Book, FileText, CheckCircle, 
  BarChart, X, Plus, Trash2, Check, Video, Layout, LogOut, 
  FileBadge, Sliders, Play, Save, ChevronRight, Activity, 
  ShieldCheck, Brain, Star, Smartphone, AlertCircle, Eye
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
      --gradient-success: linear-gradient(135deg, #10b981 0%, #059669 100%);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --danger: #ef4444;
      --success: #10b981;
      --warning: #f59e0b;
      --font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0; padding: 0; background: var(--bg-dark); color: var(--text-main);
      font-family: var(--font-family); min-height: 100vh; overflow-x: hidden;
    }
    .glass-panel {
      background: var(--panel-bg); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--panel-border); border-radius: 20px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2); transition: all 0.3s ease;
    }
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      gap: 8px; padding: 12px 24px; border-radius: 12px;
      font-weight: 600; cursor: pointer; transition: all 0.2s ease;
      border: none; font-size: 0.95rem; white-space: nowrap;
    }
    .btn-primary { background: var(--gradient-brand); color: white; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4); }
    .btn-outline { background: transparent; color: var(--text-main); border: 1px solid var(--panel-border); }
    .btn-outline:hover { background: rgba(255, 255, 255, 0.05); transform: translateY(-1px); }
    
    .input-field {
      width: 100%; padding: 14px 18px; border-radius: 12px;
      background: rgba(0, 0, 0, 0.3); border: 1px solid var(--panel-border);
      color: white; font-family: var(--font-family); outline: none;
      transition: all 0.2s; font-size: 1rem;
    }
    .input-field:focus { border-color: var(--primary); background: rgba(0,0,0,0.4); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
    
    .nav-tab {
      padding: 16px 32px; cursor: pointer; font-weight: 600; color: var(--text-muted);
      border-bottom: 2px solid transparent; transition: all 0.3s; white-space: nowrap;
    }
    .nav-tab.active { color: white; border-bottom-color: var(--primary); background: rgba(59, 130, 246, 0.05); }
    
    .role-card {
      padding: 40px 24px; border-radius: 24px; border: 1px solid var(--panel-border);
      background: rgba(255,255,255,0.01); cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px;
    }
    .role-card:hover { border-color: var(--primary); background: rgba(59,130,246,0.05); transform: translateY(-8px); }
    .role-card.active { border-color: var(--primary); background: rgba(59,130,246,0.12); box-shadow: 0 10px 40px rgba(59,130,246,0.2); }
    
    @media (max-width: 768px) {
      .role-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
      .dashboard-main { padding: 16px !important; }
      .header-content { padding: 12px 20px !important; margin: 10px !important; }
      .btn-text { display: none; }
      .nav-container { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    }

    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
      display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px;
    }
    .animate-spin { animation: spin 1s linear infinite; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    .scrollbar::-webkit-scrollbar { width: 8px; }
    .scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
    
    .badge { padding: 4px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; }
    .badge-primary { background: rgba(59, 130, 246, 0.2); color: var(--primary); }
    .badge-success { background: rgba(16, 185, 129, 0.2); color: var(--success); }
  `}} />
);

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

export default function AccessApp() {
  const [role, setRole] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [aiSettings, setAiSettings] = useState({
    provider: 'gemini',
    geminiKey: '',
    anthropicKey: '',
    hfToken: '',
    hfModelId: 'mistralai/Mistral-7B-Instruct-v0.3'
  });
  
  const [courseMaterial, setCourseMaterial] = useState({ text: '', pdfBase64: null, pdfName: '' });
  const [assessments, setAssessments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('access_ai_pro_v1');
    if (saved) {
      const d = JSON.parse(saved);
      setAssessments(d.assessments || []);
      setSubmissions(d.submissions || []);
      setAiSettings(prev => ({ ...prev, ...d.settings }));
    } else {
      setAssessments([{ id: 1, title: 'Introduction to AI Ethics', published: true, questions: [
        { id: 1, title: 'Algorithmic Bias', text: 'Explain how training data can introduce bias into an AI system.', maxMarks: 10 },
        { id: 2, title: 'Transparency', text: 'What is the importance of "Explainable AI" in healthcare?', maxMarks: 10 }
      ]}]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('access_ai_pro_v1', JSON.stringify({ assessments, submissions, settings: aiSettings }));
  }, [assessments, submissions, aiSettings]);

  const callGeminiAPI = async (prompt, system, files = []) => {
    if (!aiSettings.geminiKey) {
      setShowSettings(true);
      throw new Error("Gemini API Key Required. I've opened the 'Engine Setup' for you - please paste your key there!");
    }
    const contents = [{ parts: [{ text: system ? `${system}\n\n${prompt}` : prompt }] }];
    files.forEach(f => contents[0].parts.push({ inline_data: { mime_type: f.mime, data: f.base64 } }));
    
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
    const system = "Expert Academic Grader. Return RAW JSON array only: [{\"questionId\":1, \"score\":8, \"grade\":\"A\", \"feedback\":\"...\", \"strengths\":[], \"improvements\":[]}]";
    const prompt = `Grading task for: ${assessment.title}\nStudent Answers: ${JSON.stringify(answers)}\nReference Context: ${courseMaterial.text}`;
    const files = courseMaterial.pdfBase64 ? [{ mime: "application/pdf", base64: courseMaterial.pdfBase64 }] : [];
    
    const result = await callGeminiAPI(prompt, system, files);
    try {
      const cleaned = result.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch(e) { throw new Error("AI output parsing failed. Try again."); }
  };

  const extractTextFromImage = async (base64) => {
    return await callGeminiAPI("OCR Task: Transcribe every word from this image exactly. No chatter.", null, [{ mime: "image/jpeg", base64: base64.split(',')[1] }]);
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
        const text = await extractTextFromImage(canvas.toDataURL('image/jpeg'));
        onExtract(text);
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
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}><Settings size={28} color="var(--primary)"/> AI Configuration</h2>
          <button className="btn-outline" style={{ padding: '8px', border: 'none' }} onClick={() => setShowSettings(false)}><X size={24} /></button>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Preferred AI Engine</label>
          <select className="input-field" value={aiSettings.provider} onChange={e => setAiSettings({...aiSettings, provider: e.target.value})}>
            <option value="gemini">Google Gemini 1.5 Flash (Recommended)</option>
            <option value="anthropic">Anthropic Claude 3.7</option>
            <option value="huggingface">HuggingFace Inference</option>
          </select>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {aiSettings.provider === 'gemini' ? 'Gemini API Key' : aiSettings.provider === 'anthropic' ? 'Claude API Key' : 'HF Token'}
          </label>
          <input 
            type="password" 
            className="input-field" 
            placeholder="Paste your key here..."
            value={aiSettings.provider === 'gemini' ? aiSettings.geminiKey : aiSettings.provider === 'anthropic' ? aiSettings.anthropicKey : aiSettings.hfToken}
            onChange={e => {
              const val = e.target.value;
              if(aiSettings.provider === 'gemini') setAiSettings({...aiSettings, geminiKey: val});
              else if(aiSettings.provider === 'anthropic') setAiSettings({...aiSettings, anthropicKey: val});
              else setAiSettings({...aiSettings, hfToken: val});
            }}
          />
          <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            <AlertCircle size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Keys are stored locally in your browser and never shared.
          </p>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }} onClick={() => setShowSettings(false)}>Save & Initialize</button>
      </div>
    </div>
  );

  const LecturerDashboard = () => {
    const [tab, setTab] = useState('material');
    const [showCam, setShowCam] = useState(false);
    
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

    return (
      <div style={{ animation: 'fadeIn 0.5s ease' }}>
        <div className="nav-container" style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid var(--panel-border)' }}>
          <div className={`nav-tab ${tab === 'material' ? 'active' : ''}`} onClick={() => setTab('material')}>Source Material</div>
          <div className={`nav-tab ${tab === 'build' ? 'active' : ''}`} onClick={() => setTab('build')}>Assessment Builder</div>
          <div className={`nav-tab ${tab === 'results' ? 'active' : ''}`} onClick={() => setTab('results')}>Grading Desk</div>
        </div>

        {tab === 'material' && (
          <div className="glass-panel" style={{ padding: '40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div className="role-card" style={{ padding: '32px' }} onClick={() => setShowCam(true)}>
                <Camera size={40} color="var(--primary)" />
                <h3 style={{ margin: 0 }}>Scan Printed Copy</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>AI-powered OCR via Vision</p>
              </div>
              <label className="role-card" style={{ padding: '32px', cursor: 'pointer' }}>
                <Upload size={40} color="var(--success)" />
                <h3 style={{ margin: 0 }}>{courseMaterial.pdfName || 'Upload Digital Copy'}</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>PDF, TXT, or MD support</p>
                <input type="file" hidden onChange={handleFileUpload} accept=".pdf,.txt,.md" />
              </label>
            </div>
            
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Context Material (Raw Text)</label>
              <textarea 
                className="input-field scrollbar" 
                rows={12} 
                placeholder="The AI will use this content as the only truth for grading..."
                value={courseMaterial.text}
                onChange={e => setCourseMaterial({...courseMaterial, text: e.target.value})}
              />
              {courseMaterial.pdfBase64 && (
                <div style={{ position: 'absolute', top: '10px', right: '10px' }} className="badge badge-success">
                  <FileText size={14} style={{ marginRight: '6px' }} /> PDF Linked
                </div>
              )}
            </div>
            {showCam && <CameraModal onClose={() => setShowCam(false)} onExtract={t => setCourseMaterial(p => ({...p, text: p.text + '\n' + t}))} />}
          </div>
        )}

        {tab === 'build' && (
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h2 style={{ marginTop: 0 }}>Build New Assessment</h2>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <input className="input-field" placeholder="Assessment Title (e.g. Final Exam)" onBlur={e => {
                if(!e.target.value) return;
                setAssessments([{ id: Date.now(), title: e.target.value, published: true, questions: [] }, ...assessments]);
                e.target.value = '';
              }} />
            </div>
            <div style={{ display: 'grid', gap: '16px' }}>
              {assessments.map(a => (
                <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
                  <span style={{ fontWeight: 'bold' }}>{a.title}</span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span className="badge badge-primary">{a.questions.length} Questions</span>
                    <button className="btn-outline" style={{ padding: '4px', border: 'none' }} onClick={() => setAssessments(assessments.filter(x => x.id !== a.id))}><Trash2 size={18} color="var(--danger)"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'results' && (
          <div style={{ display: 'grid', gap: '20px' }}>
            {submissions.map((sub, i) => {
              const ass = assessments.find(a => a.id === sub.assessmentId);
              const score = sub.results.reduce((acc, r) => acc + r.score, 0);
              return (
                <div key={i} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0' }}>Student ID: {sub.studentId}</h3>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>Exams: {ass?.title || 'Unknown'}</p>
                  </div>
                  <ScoreRing score={Math.round((score / 20) * 100)} size={80} strokeWidth={8} />
                </div>
              );
            })}
            {submissions.length === 0 && <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>No student submissions yet.</div>}
          </div>
        )}
      </div>
    );
  };

  const StudentDashboard = () => {
    const [active, setActive] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);

    if (active) return (
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', animation: 'slideUp 0.4s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2 style={{ margin: 0 }}>{active.title}</h2>
          <button className="btn-outline" onClick={() => setActive(null)}><X size={20}/></button>
        </div>
        {active.questions.map(q => (
          <div key={q.id} style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: '500' }}>{q.text}</p>
            <textarea className="input-field" rows={4} placeholder="Type your answer clearly..." onChange={e => setAnswers({...answers, [q.id]: e.target.value})} />
          </div>
        ))}
        <button className="btn btn-primary" style={{ width: '100%', padding: '18px' }} disabled={loading} onClick={async () => {
          setLoading(true);
          try {
            const results = await markSubmission(active, answers);
            setSubmissions([...submissions, { assessmentId: active.id, studentId: 'User_' + Math.floor(Math.random()*900), answers, results }]);
            setActive(null);
            alert("Submission graded successfully!");
          } catch(e) { alert(e.message); }
          setLoading(false);
        }}>
          {loading ? <Activity className="animate-spin" /> : <><CheckCircle size={20}/> Submit for AI Grading</>}
        </button>
      </div>
    );

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {assessments.map(a => (
          <div key={a.id} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'var(--gradient-brand)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Book color="white" size={24}/></div>
            <h3 style={{ margin: 0 }}>{a.title}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', flex: 1 }}>{a.questions.length} Questions found.</p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setActive(a)}>Begin Assessment</button>
          </div>
        ))}
      </div>
    );
  };

  const LoginScreen = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeIn 1s ease' }}>
          <div style={{ display: 'inline-flex', padding: '20px', background: 'var(--panel-bg)', borderRadius: '30px', border: '1px solid var(--panel-border)', marginBottom: '24px' }}>
            <Brain size={60} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', margin: '0 0 16px 0', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-2px' }}>AccessAI</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', fontWeight: '500' }}>Academic Grading Infrastructure for the AI Age</p>
        </div>
        
        <div className="role-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', width: '100%', maxWidth: '1000px' }}>
          {[
            { id: 'Student', icon: Smartphone, label: 'Student Portal', desc: 'Take exams & get instant AI feedback' },
            { id: 'Lecturer', icon: FileBadge, label: 'Lecturer Portal', desc: 'Create assessments & manage grading' },
            { id: 'Admin', icon: ShieldCheck, label: 'Admin Console', desc: 'Monitor system-wide AI compliance' }
          ].map(r => (
            <div key={r.id} className="role-card" onClick={() => setRole(r.id)}>
              <r.icon size={48} color="var(--primary)" />
              <h3 style={{ margin: 0 }}>{r.label}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{r.desc}</p>
              <div className="btn btn-outline" style={{ marginTop: 'auto', width: '100%' }}>Enter <ChevronRight size={16}/></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!role) return ( <> <GlobalStyles /> <LoginScreen /> </> );

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header className="glass-panel header-content" style={{ margin: '20px', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Brain color="var(--primary)" size={32} />
            <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 'bold' }}>AccessAI</h2>
            <div style={{ width: '1px', height: '24px', background: 'var(--panel-border)', margin: '0 8px' }}></div>
            <span className="badge badge-primary">{role}</span>
          </div>
          <div className="header-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: aiSettings.geminiKey ? 'var(--success)' : 'var(--danger)', background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: '99px', border: '1px solid var(--panel-border)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: aiSettings.geminiKey ? 'var(--success)' : 'var(--danger)', boxShadow: aiSettings.geminiKey ? '0 0 10px var(--success)' : 'none' }}></div>
              {aiSettings.geminiKey ? 'API Connected' : 'Key Required'}
            </div>
            <button className="btn btn-outline" onClick={() => setShowSettings(true)}><Sliders size={18} /> <span className="btn-text">Engine</span></button>
            <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.2)' }} onClick={() => setRole(null)}><LogOut size={18}/> <span className="btn-text">Exit</span></button>
          </div>
        </header>
        <main className="dashboard-main" style={{ flex: 1, padding: '0 20px 60px 20px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {role === 'Lecturer' && <LecturerDashboard />}
          {role === 'Student' && <StudentDashboard />}
          {role === 'Admin' && (
            <div className="glass-panel" style={{ padding: '100px', textAlign: 'center' }}>
              <ShieldCheck size={64} color="var(--primary)" style={{ marginBottom: '24px' }} />
              <h2>System Oversight Console</h2>
              <p style={{ color: 'var(--text-muted)' }}>Administrative analytics and model fine-tuning coming in Phase 3.</p>
            </div>
          )}
        </main>
        {showSettings && <SettingsModal />}
      </div>
    </>
  );
}
