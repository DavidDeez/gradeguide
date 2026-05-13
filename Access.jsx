import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, Camera, Upload, Book, FileText, CheckCircle, 
  BarChart, X, Plus, Trash2, Check, Video, Layout, LogOut, 
  FileBadge, Sliders, Play, Save, ChevronRight, Activity, 
  ShieldCheck, Brain, Star, Smartphone
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
      margin: 0; padding: 0;
      background: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font-family);
      min-height: 100vh;
      overflow-x: hidden;
    }
    .glass-panel {
      background: var(--panel-bg);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--panel-border);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    }
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      gap: 8px; padding: 10px 20px; border-radius: 8px;
      font-weight: 600; cursor: pointer; transition: all 0.2s ease;
      border: none; font-size: 0.9rem; white-space: nowrap;
    }
    .btn-primary { background: var(--gradient-brand); color: white; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4); }
    .btn-outline { background: transparent; color: var(--text-main); border: 1px solid var(--panel-border); }
    .btn-outline:hover { background: rgba(255, 255, 255, 0.05); }
    .input-field {
      width: 100%; padding: 12px 16px; border-radius: 8px;
      background: rgba(0, 0, 0, 0.2); border: 1px solid var(--panel-border);
      color: white; font-family: var(--font-family); outline: none;
      transition: border-color 0.2s; font-size: 1rem;
    }
    .nav-tab {
      padding: 12px 24px; cursor: pointer; font-weight: 600; color: var(--text-muted);
      border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap;
    }
    .nav-tab.active { color: white; border-bottom-color: var(--primary); }
    .role-card {
      padding: 24px; border-radius: 16px; border: 1px solid var(--panel-border);
      background: rgba(255,255,255,0.02); cursor: pointer; transition: all 0.3s;
      text-align: center; display: flex; flexDirection: column; align-items: center;
    }
    .role-card.active { border-color: var(--primary); background: rgba(59,130,246,0.1); box-shadow: 0 0 20px rgba(59,130,246,0.2); }
    
    /* MOBILE RESPONSIVENESS */
    @media (max-width: 768px) {
      .login-title { fontSize: 2rem !important; }
      .role-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
      .nav-container { overflow-x: auto; padding-bottom: 4px; }
      .header-actions { flex-direction: column; width: 100%; gap: 10px; }
      .header-actions .btn { width: 100%; }
      .stat-grid { grid-template-columns: 1fr !important; }
      .dashboard-main { padding: 10px !important; }
      .glass-panel { border-radius: 12px; padding: 20px !important; }
      .header-content { flex-direction: column; gap: 16px; text-align: center; }
      .material-grid { grid-template-columns: 1fr !important; }
    }

    .modal-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center; z-index: 2000;
      padding: 20px;
    }
    .animate-spin { animation: spin 1s linear infinite; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    .progress-bar-bg { background: rgba(255,255,255,0.1); border-radius: 99px; height: 8px; overflow: hidden; }
    .progress-bar-fill { height: 100%; background: var(--gradient-brand); transition: width 0.3s ease; }
    .camera-guides { position: absolute; inset: 20px; border: 2px dashed rgba(255,255,255,0.5); border-radius: 12px; pointer-events: none; }
    .scrollbar::-webkit-scrollbar { width: 6px; }
    .scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
  `}} />
);

const ScoreRing = ({ score, size = 100, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  let color = score >= 70 ? 'var(--success)' : score >= 50 ? 'var(--warning)' : 'var(--danger)';
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1s ease' }} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: size * 0.2 }}>{score}%</div>
    </div>
  );
};

export default function AccessApp() {
  const [role, setRole] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [aiSettings, setAiSettings] = useState({
    provider: 'gemini',
    anthropicKey: '',
    hfToken: '',
    hfModelId: 'mistralai/Mistral-7B-Instruct-v0.3',
    geminiKey: '',
    hfMaxTokens: 1024
  });
  
  const [courseMaterial, setCourseMaterial] = useState({ text: '', pdfBase64: null, pdfName: '' });
  const [assessments, setAssessments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('access_ai_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAssessments(parsed.assessments || []);
      setSubmissions(parsed.submissions || []);
      setAiSettings(prev => ({ ...prev, ...parsed.settings }));
    } else {
      setAssessments([{ id: 1, title: 'Web Development Basics', published: true, questions: [
        { id: 1, title: 'HTML', text: 'What does HTML stand for?', maxMarks: 10 },
        { id: 2, title: 'CSS', text: 'Explain the box model in CSS.', maxMarks: 10 }
      ]}]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('access_ai_data', JSON.stringify({ assessments, submissions, settings: aiSettings }));
  }, [assessments, submissions, aiSettings]);

  const callGeminiAPI = async (prompt, system, isImage = false, imageData = null) => {
    if (!aiSettings.geminiKey) throw new Error("Google Gemini API key missing. Get one for free at aistudio.google.com");
    
    const contents = [{
      parts: [{ text: system ? `${system}\n\nTask: ${prompt}` : prompt }]
    }];

    if (isImage && imageData) {
      contents[0].parts.push({
        inline_data: { mime_type: "image/jpeg", data: imageData.split(',')[1] }
      });
    }

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${aiSettings.geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });
    
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  };

  const callAnthropicAPI = async (prompt, system) => {
    if (!aiSettings.anthropicKey) throw new Error("Anthropic API key missing");
    const messages = [{ role: "user", content: [{ type: "text", text: prompt }] }];
    if (courseMaterial.pdfBase64) {
      messages[0].content.unshift({ type: "document", source: { type: "base64", media_type: "application/pdf", data: courseMaterial.pdfBase64 } });
    }
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': aiSettings.anthropicKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: 'claude-3-7-sonnet-20250219', max_tokens: 1500, system, messages, temperature: 0.2 })
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.content[0].text;
  };

  const callHuggingFaceAPI = async (prompt, system) => {
    if (!aiSettings.hfToken) throw new Error("HuggingFace Token missing");
    const fullPrompt = `<s>[INST] ${system}\n\nContext:\n${courseMaterial.text}\n\nTask:\n${prompt} [/INST]`;
    const res = await fetch(`https://api-inference.huggingface.co/models/${aiSettings.hfModelId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${aiSettings.hfToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: fullPrompt, parameters: { max_new_tokens: aiSettings.hfMaxTokens, temperature: 0.1 } })
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data[0].generated_text;
  };

  const markSubmission = async (assessment, answers) => {
    const system = `Grade student answers based on course material. Return raw JSON array: [{"questionId": "id", "score": 0, "grade": "A-F", "feedback": "...", "strengths": [], "improvements": []}]`;
    const prompt = `Assessment: ${assessment.title}\nAnswers:\n${assessment.questions.map(q => `Q: ${q.text}\nStudent: ${answers[q.id]}`).join('\n\n')}`;
    let result = '';
    if (aiSettings.provider === 'gemini') result = await callGeminiAPI(prompt, system);
    else if (aiSettings.provider === 'anthropic') result = await callAnthropicAPI(prompt, system);
    else result = await callHuggingFaceAPI(prompt, system);
    try {
      return JSON.parse(result.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch (e) { throw new Error("AI returned invalid JSON."); }
  };

  const extractTextFromImage = async (base64Img) => {
    if (aiSettings.geminiKey) return await callGeminiAPI("Extract all text from this image.", null, true, base64Img);
    if (aiSettings.anthropicKey) {
        const base64Data = base64Img.split(',')[1];
        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': aiSettings.anthropicKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
            body: JSON.stringify({ model: 'claude-3-7-sonnet-20250219', max_tokens: 1000, messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Data } }, { type: "text", text: "Extract text." }] }] })
        });
        const data = await res.json();
        return data.content[0].text;
    }
    throw new Error("Gemini or Anthropic API key required for OCR.");
  };

  const LoginScreen = () => {
    const [selectedRole, setSelectedRole] = useState('Student');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px' }}>
          <Brain size={64} color="var(--primary)" style={{ marginBottom: '20px' }} />
          <h1 className="login-title" style={{ fontSize: '3.5rem', margin: '0 0 10px 0', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AccessAI</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>The Intelligent Grading Infrastructure</p>
        </div>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '40px' }}>
          <div className="role-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
            {[
              { id: 'Student', icon: Book, label: 'Student' },
              { id: 'Lecturer', icon: FileBadge, label: 'Lecturer' },
              { id: 'Admin', icon: ShieldCheck, label: 'Admin' }
            ].map(r => (
              <div key={r.id} className={`role-card ${selectedRole === r.id ? 'active' : ''}`} onClick={() => setSelectedRole(r.id)}>
                <r.icon size={32} color={selectedRole === r.id ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginBottom: '12px' }} />
                <span style={{ fontWeight: 'bold' }}>{r.label}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }} onClick={() => setRole(selectedRole)}>Continue to Portal <ChevronRight size={20}/></button>
        </div>
      </div>
    );
  };

  const SettingsModal = () => (
    <div className="modal-overlay">
      <div className="glass-panel scrollbar" style={{ width: '100%', maxWidth: '500px', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><Sliders size={24} /> API Configuration</h2>
          <button className="btn-outline" style={{ padding: '8px', border: 'none' }} onClick={() => setShowSettings(false)}><X size={20} /></button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>AI Provider</label>
          <select className="input-field" value={aiSettings.provider} onChange={e => setAiSettings({...aiSettings, provider: e.target.value})}>
            <option value="gemini">Google Gemini (Free Tier)</option>
            <option value="anthropic">Anthropic Claude</option>
            <option value="huggingface">HuggingFace API</option>
          </select>
        </div>
        {aiSettings.provider === 'gemini' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Gemini API Key</label>
            <input type="password" className="input-field" value={aiSettings.geminiKey} onChange={e => setAiSettings({...aiSettings, geminiKey: e.target.value})} placeholder="AIza..." />
          </div>
        )}
        {aiSettings.provider === 'anthropic' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Anthropic API Key</label>
            <input type="password" className="input-field" value={aiSettings.anthropicKey} onChange={e => setAiSettings({...aiSettings, anthropicKey: e.target.value})} placeholder="sk-ant-..." />
          </div>
        )}
        {aiSettings.provider === 'huggingface' && (
          <>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', color: 'var(--text-muted)' }}>HF Token</label>
              <input type="password" className="input-field" value={aiSettings.hfToken} onChange={e => setAiSettings({...aiSettings, hfToken: e.target.value})} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', color: 'var(--text-muted)' }}>Model ID</label>
              <input type="text" className="input-field" value={aiSettings.hfModelId} onChange={e => setAiSettings({...aiSettings, hfModelId: e.target.value})} />
            </div>
          </>
        )}
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowSettings(false)}>Save Settings</button>
      </div>
    </div>
  );

  const LecturerDashboard = () => {
    const [tab, setTab] = useState('material');
    const [showCam, setShowCam] = useState(false);
    return (
      <div>
        <div className="nav-container" style={{ display: 'flex', borderBottom: '1px solid var(--panel-border)', marginBottom: '24px' }}>
          <div className={`nav-tab ${tab === 'material' ? 'active' : ''}`} onClick={() => setTab('material')}>Material</div>
          <div className={`nav-tab ${tab === 'build' ? 'active' : ''}`} onClick={() => setTab('build')}>Create</div>
          <div className={`nav-tab ${tab === 'results' ? 'active' : ''}`} onClick={() => setTab('results')}>Submissions</div>
        </div>
        {tab === 'material' && (
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div className="material-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div style={{ border: '1px dashed var(--panel-border)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <Camera size={32} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                <h3>OCR Scan</h3>
                <button className="btn btn-outline" onClick={() => setShowCam(true)}>Start Camera</button>
              </div>
              <div style={{ border: '1px dashed var(--panel-border)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <Upload size={32} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                <h3>Upload Content</h3>
                <input type="file" id="up" style={{ display: 'none' }} onChange={e => {
                  const f = e.target.files[0];
                  const r = new FileReader();
                  r.onload = ev => setCourseMaterial({...courseMaterial, text: ev.target.result});
                  r.readAsText(f);
                }} />
                <label htmlFor="up" className="btn btn-outline" style={{ cursor: 'pointer' }}>Choose File</label>
              </div>
            </div>
            <textarea className="input-field scrollbar" rows={8} placeholder="Course material context..." value={courseMaterial.text} onChange={e => setCourseMaterial({...courseMaterial, text: e.target.value})} />
            {showCam && <CameraModal onClose={() => setShowCam(false)} onExtract={t => setCourseMaterial(p => ({...p, text: p.text + '\n' + t}))} />}
          </div>
        )}
        {tab === 'build' && (
            <div className="glass-panel" style={{ padding: '32px' }}>
                <h2 style={{marginTop:0}}>New Assessment</h2>
                <input className="input-field" placeholder="Untitled Exam" style={{marginBottom:'20px'}} onChange={e => setAssessments([{id:Date.now(), title:e.target.value, published:true, questions:[]}, ...assessments])} />
                <p style={{color:'var(--text-muted)'}}>Manage questions in the full desktop version or add them manually here.</p>
            </div>
        )}
        {tab === 'results' && (
            <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
                {submissions.map((s,i) => (
                    <div key={i} className="glass-panel" style={{padding:'20px'}}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <span>{s.studentId}</span>
                            <ScoreRing score={Math.round(s.results.reduce((a,r)=>a+r.score,0) / 20 * 100)} size={60} />
                        </div>
                    </div>
                ))}
                {submissions.length === 0 && <p style={{textAlign:'center', padding:'40px'}}>No submissions.</p>}
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
                <div key={q.id} style={{marginBottom:'20px'}}>
                    <p>{q.text}</p>
                    <textarea className="input-field" rows={3} onChange={e => setAns({...ans, [q.id]: e.target.value})} />
                </div>
            ))}
            <button className="btn btn-primary" style={{width:'100%'}} disabled={loading} onClick={async () => {
                setLoading(true);
                try {
                    const results = await markSubmission(active, ans);
                    setSubmissions([...submissions, { assessmentId: active.id, studentId: 'Student', results }]);
                    setActive(null);
                } catch(e) { alert(e.message); }
                setLoading(false);
            }}>{loading ? <Activity className="animate-spin" /> : 'Submit'}</button>
        </div>
    );

    return (
        <div className="stat-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
            {assessments.map(a => (
                <div key={a.id} className="glass-panel" style={{padding:'24px'}}>
                    <h3>{a.title}</h3>
                    <button className="btn btn-primary" onClick={() => setActive(a)}>Start</button>
                </div>
            ))}
        </div>
    );
  };

  if (!role) return ( <> <GlobalStyles /> <LoginScreen /> </> );

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header className="glass-panel" style={{ margin: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Brain color="var(--primary)" />
            <h2 style={{ margin: 0, fontSize: '1.2rem' }}>AccessAI</h2>
          </div>
          <div className="header-actions" style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline" onClick={() => setShowSettings(true)}><Settings size={18} /></button>
            <button className="btn btn-outline" style={{ color: 'var(--danger)' }} onClick={() => setRole(null)}><LogOut size={18}/></button>
          </div>
        </header>
        <main className="dashboard-main" style={{ flex: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {role === 'Lecturer' && <LecturerDashboard />}
          {role === 'Student' && <StudentDashboard />}
          {role === 'Admin' && <div className="glass-panel" style={{padding:'40px', textAlign:'center'}}>Admin analytics coming soon.</div>}
        </main>
        {showSettings && <SettingsModal />}
      </div>
    </>
  );
}
