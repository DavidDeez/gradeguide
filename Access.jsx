import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, Camera, Upload, Book, FileText, CheckCircle, 
  BarChart, X, Plus, Trash2, Check, Video, Layout, LogOut, 
  FileBadge, Sliders, Play, Save, ChevronRight, Activity, 
  ShieldCheck, Brain, Star
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
      margin: 0;
      padding: 0;
      background: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font-family);
      min-height: 100vh;
    }
    .glass-panel {
      background: var(--panel-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--panel-border);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    }
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      gap: 8px; padding: 10px 20px; border-radius: 8px;
      font-weight: 600; cursor: pointer; transition: all 0.2s ease;
      border: none; font-size: 0.9rem;
    }
    .btn-primary {
      background: var(--gradient-brand); color: white;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
    .btn-primary:hover {
      transform: translateY(-1px); box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
    }
    .btn-success {
      background: var(--gradient-success); color: white;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
    .btn-outline {
      background: transparent; color: var(--text-main);
      border: 1px solid var(--panel-border);
    }
    .btn-outline:hover { background: rgba(255, 255, 255, 0.05); }
    .input-field {
      width: 100%; padding: 12px 16px; border-radius: 8px;
      background: rgba(0, 0, 0, 0.2); border: 1px solid var(--panel-border);
      color: white; font-family: var(--font-family); outline: none;
      transition: border-color 0.2s;
    }
    .input-field:focus { border-color: var(--primary); }
    .nav-tab {
      padding: 12px 24px; cursor: pointer; font-weight: 600; color: var(--text-muted);
      border-bottom: 2px solid transparent; transition: all 0.2s;
    }
    .nav-tab.active { color: white; border-bottom-color: var(--primary); }
    .nav-tab:hover:not(.active) { color: white; }
    .role-card {
      padding: 24px; border-radius: 16px; border: 1px solid var(--panel-border);
      background: rgba(255,255,255,0.02); cursor: pointer; transition: all 0.3s;
      text-align: center;
    }
    .role-card:hover {
      border-color: var(--primary); background: rgba(59,130,246,0.05);
      transform: translateY(-4px);
    }
    .role-card.active {
      border-color: var(--primary); background: rgba(59,130,246,0.1);
      box-shadow: 0 0 20px rgba(59,130,246,0.2);
    }
    .modal-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center; z-index: 1000;
    }
    .animate-spin { animation: spin 1s linear infinite; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    .progress-bar-bg { background: rgba(255,255,255,0.1); border-radius: 99px; height: 8px; overflow: hidden; }
    .progress-bar-fill { height: 100%; background: var(--gradient-brand); transition: width 0.3s ease; }
    .camera-guides { position: absolute; inset: 20px; border: 2px dashed rgba(255,255,255,0.5); border-radius: 12px; pointer-events: none; }
    .camera-guides::before, .camera-guides::after { content: ''; position: absolute; width: 40px; height: 40px; border-color: var(--primary); border-style: solid; }
    .camera-guides::before { top: -2px; left: -2px; border-width: 4px 0 0 4px; }
    .camera-guides::after { bottom: -2px; right: -2px; border-width: 0 4px 4px 0; }
    .scrollbar::-webkit-scrollbar { width: 8px; }
    .scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
    .scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
  `}} />
);

const ScoreRing = ({ score, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  let color = 'var(--danger)';
  if (score >= 70) color = 'var(--success)';
  else if (score >= 50) color = 'var(--warning)';

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} fill="none"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <span style={{ fontSize: size * 0.25, fontWeight: 'bold', color: 'white' }}>{score}%</span>
      </div>
    </div>
  );
};

export default function AccessApp() {
  const [role, setRole] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const [aiSettings, setAiSettings] = useState({
    provider: 'anthropic',
    anthropicKey: '',
    hfToken: '',
    hfModelId: 'mistralai/Mistral-7B-Instruct-v0.3',
    hfMaxTokens: 1024
  });
  
  const [courseMaterial, setCourseMaterial] = useState({
    text: '',
    pdfBase64: null,
    pdfName: ''
  });
  
  const [assessments, setAssessments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    setAssessments([
      { id: 1, title: 'Introduction to React', published: true, questions: [
        { id: 1, title: 'Component Lifecycle', text: 'Explain the difference between useEffect and useLayoutEffect.', maxMarks: 10 },
        { id: 2, title: 'State Management', text: 'Why is mutating state directly in React an anti-pattern?', maxMarks: 10 }
      ]}
    ]);
  }, []);

  const callAnthropicAPI = async (prompt, system) => {
    if (!aiSettings.anthropicKey) throw new Error("Anthropic API key missing");
    
    let messages = [{ role: "user", content: [] }];
    
    if (courseMaterial.pdfBase64) {
      messages[0].content.push({
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: courseMaterial.pdfBase64
        }
      });
    }
    
    messages[0].content.push({ type: "text", text: prompt });

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': aiSettings.anthropicKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 1500,
        system: system,
        messages: messages,
        temperature: 0.2
      })
    });
    
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.content[0].text;
  };

  const callHuggingFaceAPI = async (prompt, system) => {
    if (!aiSettings.hfToken) throw new Error("HuggingFace Token missing");
    
    const fullPrompt = \`<s>[INST] \${system}\\n\\nContext Material:\\n\${courseMaterial.text}\\n\\nTask:\\n\${prompt} [/INST]\`;
    
    const res = await fetch(\`https://api-inference.huggingface.co/models/\${aiSettings.hfModelId}\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${aiSettings.hfToken}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: aiSettings.hfMaxTokens,
          return_full_text: false,
          temperature: 0.1
        }
      })
    });
    
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data[0].generated_text;
  };

  const markSubmission = async (assessment, answers) => {
    const systemPrompt = \`You are an expert academic grader. Grade the student's answers based ONLY on the provided course material. Return a JSON array of objects, one for each question, in this EXACT format:
[
  {
    "questionId": "id",
    "score": 0,
    "grade": "A/B/C/D/F",
    "feedback": "Detailed feedback",
    "strengths": ["strength 1", "strength 2"],
    "improvements": ["improvement 1"]
  }
]
No markdown wrapping, just raw JSON.\`;

    const promptText = \`Assessment Title: \${assessment.title}
Questions and Answers:
\${assessment.questions.map((q, i) => \`Q\${i+1} (ID: \${q.id}) [Max \${q.maxMarks}]: \${q.text}\\nStudent Answer: \${answers[q.id] || 'No answer'}\`).join('\\n\\n')}\`;

    let resultText = '';
    if (aiSettings.provider === 'anthropic') {
      resultText = await callAnthropicAPI(promptText, systemPrompt);
    } else {
      resultText = await callHuggingFaceAPI(promptText, systemPrompt);
    }

    try {
      const cleaned = resultText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.error("Failed to parse AI response:", resultText);
      throw new Error("AI returned invalid JSON format.");
    }
  };

  const extractTextFromImage = async (base64Img) => {
    if (!aiSettings.anthropicKey) throw new Error("Anthropic key required for OCR");
    const base64Data = base64Img.split(',')[1];
    
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': aiSettings.anthropicKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Data } },
              { type: "text", text: "Extract all legible text from this image exactly as written. Do not add any conversational filler." }
            ]
          }
        ]
      })
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.content[0].text;
  };

  const LoginScreen = () => {
    const [selectedRole, setSelectedRole] = useState('Student');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--panel-bg)', borderRadius: '24px', marginBottom: '24px', border: '1px solid var(--panel-border)' }}>
            <Brain size={48} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '3rem', margin: '0 0 16px 0', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AccessAI
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', margin: 0 }}>Intelligent Academic Assessment Platform</p>
        </div>

        <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '800px' }}>
          <h2 style={{ margin: '0 0 24px 0', textAlign: 'center' }}>Select your portal</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {['Student', 'Lecturer', 'Admin'].map(r => (
              <div key={r} className={\`role-card \${selectedRole === r ? 'active' : ''}\`} onClick={() => setSelectedRole(r)}>
                {r === 'Student' && <Book size={32} color={selectedRole === r ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginBottom: '16px' }}/>}
                {r === 'Lecturer' && <FileBadge size={32} color={selectedRole === r ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginBottom: '16px' }}/>}
                {r === 'Admin' && <ShieldCheck size={32} color={selectedRole === r ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginBottom: '16px' }}/>}
                <h3 style={{ margin: 0, color: selectedRole === r ? 'white' : 'var(--text-muted)' }}>{r}</h3>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }} onClick={() => setRole(selectedRole)}>
            Enter Portal <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const SettingsModal = () => {
    return (
      <div className="modal-overlay">
        <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><Settings size={24} /> AI Engine Settings</h2>
            <button className="btn-outline" style={{ padding: '8px', border: 'none' }} onClick={() => setShowSettings(false)}><X size={20} /></button>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Provider</label>
            <select className="input-field" value={aiSettings.provider} onChange={e => setAiSettings({...aiSettings, provider: e.target.value})}>
              <option value="anthropic">Anthropic Claude</option>
              <option value="huggingface">HuggingFace Inference API</option>
            </select>
          </div>

          {aiSettings.provider === 'anthropic' ? (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Anthropic API Key</label>
              <input type="password" className="input-field" value={aiSettings.anthropicKey} onChange={e => setAiSettings({...aiSettings, anthropicKey: e.target.value})} placeholder="sk-ant-..." />
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>HF Access Token</label>
                <input type="password" className="input-field" value={aiSettings.hfToken} onChange={e => setAiSettings({...aiSettings, hfToken: e.target.value})} placeholder="hf_..." />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Model ID</label>
                <input type="text" className="input-field" value={aiSettings.hfModelId} onChange={e => setAiSettings({...aiSettings, hfModelId: e.target.value})} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Max Tokens</label>
                <input type="number" className="input-field" value={aiSettings.hfMaxTokens} onChange={e => setAiSettings({...aiSettings, hfMaxTokens: parseInt(e.target.value)})} />
              </div>
            </>
          )}

          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowSettings(false)}>Save Configuration</button>
        </div>
      </div>
    );
  };

  const CameraModal = ({ onClose, onExtract }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [capturing, setCapturing] = useState(false);

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => { setStream(s); if(videoRef.current) videoRef.current.srcObject = s; })
        .catch(err => alert("Camera access denied or unavailable."));
      return () => { if(stream) stream.getTracks().forEach(t => t.stop()); };
    }, []);

    const capture = async () => {
      setCapturing(true);
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const base64 = canvas.toDataURL('image/jpeg', 0.8);
      try {
        const text = await extractTextFromImage(base64);
        onExtract(text);
        onClose();
      } catch (e) {
        alert("OCR failed: " + e.message);
      }
      setCapturing(false);
    };

    return (
      <div className="modal-overlay">
        <div className="glass-panel" style={{ width: '90%', maxWidth: '600px', padding: '24px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0 }}>Scan Document</h3>
            <button className="btn-outline" onClick={onClose} style={{ padding: '4px' }}><X size={20}/></button>
          </div>
          <div style={{ position: 'relative', background: '#000', borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/3' }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="camera-guides"></div>
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={capture} disabled={capturing} style={{ borderRadius: '99px', padding: '16px 32px' }}>
              {capturing ? <><div className="animate-spin"><Activity size={20}/></div> Extracting...</> : <><Camera size={24}/> Snap & Extract</>}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const LecturerDashboard = () => {
    const [tab, setTab] = useState('material');
    const [showCam, setShowCam] = useState(false);
    const [newAss, setNewAss] = useState({ title: '', questions: [] });
    
    const handlePdfUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const b64 = ev.target.result.split(',')[1];
        setCourseMaterial({ ...courseMaterial, pdfBase64: b64, pdfName: file.name });
      };
      reader.readAsDataURL(file);
    };

    return (
      <div>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--panel-border)', marginBottom: '32px' }}>
          <div className={\`nav-tab \${tab === 'material' ? 'active' : ''}\`} onClick={() => setTab('material')}>Course Material</div>
          <div className={\`nav-tab \${tab === 'build' ? 'active' : ''}\`} onClick={() => setTab('build')}>Create Assessment</div>
          <div className={\`nav-tab \${tab === 'results' ? 'active' : ''}\`} onClick={() => setTab('results')}>Results & Override</div>
        </div>

        {tab === 'material' && (
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '12px' }}><Book color="var(--primary)"/> Grounding Material</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Provide the source material the AI will use to strictly grade assessments.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{ padding: '24px', border: '1px dashed var(--panel-border)', borderRadius: '12px', textAlign: 'center' }}>
                <Upload size={32} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
                <h3 style={{ margin: '0 0 8px 0' }}>Upload PDF</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>For Anthropic vision context</p>
                <input type="file" id="pdf-upload" accept="application/pdf" style={{ display: 'none' }} onChange={handlePdfUpload} />
                <label htmlFor="pdf-upload" className="btn btn-outline" style={{ cursor: 'pointer' }}>Select File</label>
                {courseMaterial.pdfName && <div style={{ marginTop: '16px', color: 'var(--success)' }}><Check size={16}/> {courseMaterial.pdfName} loaded</div>}
              </div>

              <div style={{ padding: '24px', border: '1px dashed var(--panel-border)', borderRadius: '12px', textAlign: 'center' }}>
                <Camera size={32} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
                <h3 style={{ margin: '0 0 8px 0' }}>Scan Document</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>OCR via Claude Vision</p>
                <button className="btn btn-outline" onClick={() => setShowCam(true)}>Open Camera</button>
              </div>
            </div>

            <textarea 
              className="input-field scrollbar" 
              style={{ minHeight: '300px', resize: 'vertical' }}
              placeholder="Or type/paste course content here..."
              value={courseMaterial.text}
              onChange={e => setCourseMaterial({...courseMaterial, text: e.target.value})}
            />
            {showCam && <CameraModal onClose={() => setShowCam(false)} onExtract={(text) => setCourseMaterial(prev => ({...prev, text: prev.text + '\\n' + text}))} />}
          </div>
        )}

        {tab === 'build' && (
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h2 style={{ marginTop: 0 }}>Create Assessment</h2>
            <input className="input-field" placeholder="Assessment Title" style={{ fontSize: '1.2rem', padding: '16px', marginBottom: '24px' }} value={newAss.title} onChange={e => setNewAss({...newAss, title: e.target.value})} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {newAss.questions.map((q, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--panel-border)', position: 'relative' }}>
                  <button className="btn-outline" style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px', color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }}
                    onClick={() => setNewAss({...newAss, questions: newAss.questions.filter((_, idx) => idx !== i)})}>
                    <Trash2 size={16} />
                  </button>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingRight: '40px' }}>
                    <input className="input-field" placeholder="Question Title (e.g. Q1)" style={{ flex: 1 }} value={q.title} onChange={e => { const qs = [...newAss.questions]; qs[i].title = e.target.value; setNewAss({...newAss, questions: qs}); }} />
                    <input type="number" className="input-field" placeholder="Max Marks" style={{ width: '120px' }} value={q.maxMarks} onChange={e => { const qs = [...newAss.questions]; qs[i].maxMarks = parseInt(e.target.value); setNewAss({...newAss, questions: qs}); }} />
                  </div>
                  <textarea className="input-field" placeholder="Question Text" rows={3} value={q.text} onChange={e => { const qs = [...newAss.questions]; qs[i].text = e.target.value; setNewAss({...newAss, questions: qs}); }} />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-outline" onClick={() => setNewAss({...newAss, questions: [...newAss.questions, { id: Date.now(), title: '', text: '', maxMarks: 10 }]})}>
                <Plus size={18} /> Add Question
              </button>
              <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => {
                if(!newAss.title) return alert("Title required");
                setAssessments([...assessments, { ...newAss, id: Date.now(), published: true }]);
                setNewAss({ title: '', questions: [] });
                alert("Published!");
              }}>
                <Save size={18} /> Publish Assessment
              </button>
            </div>
          </div>
        )}

        {tab === 'results' && (
          <div style={{ display: 'grid', gap: '24px' }}>
            {submissions.map((sub, i) => {
              const ass = assessments.find(a => a.id === sub.assessmentId);
              const totalScore = sub.results.reduce((acc, r) => acc + r.score, 0);
              const maxScore = ass.questions.reduce((acc, q) => acc + q.maxMarks, 0);
              const pct = Math.round((totalScore / maxScore) * 100);

              return (
                <div key={i} className="glass-panel" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px 0' }}>Student: {sub.studentId}</h3>
                      <p style={{ color: 'var(--text-muted)', margin: 0 }}>Assessment: {ass.title}</p>
                    </div>
                    <ScoreRing score={pct} size={80} strokeWidth={8} />
                  </div>
                  
                  {sub.results.map((r, idx) => {
                    const q = ass.questions.find(qx => qx.id === r.questionId) || {};
                    return (
                      <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', marginBottom: '16px', borderLeft: \`4px solid \${r.score === q.maxMarks ? 'var(--success)' : 'var(--warning)'}\` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <strong>{q.title || \`Q\${idx+1}\`}</strong>
                          <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{r.score} / {q.maxMarks}</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', margin: '0 0 12px 0' }}><em>Ans: {sub.answers[r.questionId]}</em></p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>AI: {r.feedback}</p>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <input type="number" className="input-field" style={{ width: '80px', padding: '8px' }} defaultValue={r.score} placeholder="Override" />
                          <button className="btn btn-outline" style={{ padding: '8px 12px' }}>Update Score</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {submissions.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No submissions yet.</div>}
          </div>
        )}
      </div>
    );
  };

  const StudentDashboard = () => {
    const [tab, setTab] = useState('assessments');
    const [activeAss, setActiveAss] = useState(null);
    const [answers, setAnswers] = useState({});
    const [markingProgress, setMarkingProgress] = useState(0);
    const [isMarking, setIsMarking] = useState(false);

    const handleSubmit = async () => {
      setIsMarking(true);
      setMarkingProgress(10);
      
      const interval = setInterval(() => {
        setMarkingProgress(p => p < 90 ? p + 10 : p);
      }, 500);

      try {
        const results = await markSubmission(activeAss, answers);
        clearInterval(interval);
        setMarkingProgress(100);
        
        setTimeout(() => {
          setSubmissions([...submissions, { assessmentId: activeAss.id, studentId: 'stu_' + Math.floor(Math.random()*1000), answers, results }]);
          setActiveAss(null);
          setIsMarking(false);
          setTab('results');
        }, 800);
      } catch (e) {
        clearInterval(interval);
        setIsMarking(false);
        alert("Marking failed: " + e.message);
      }
    };

    if (activeAss) {
      return (
        <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ margin: 0 }}>{activeAss.title}</h2>
            <button className="btn-outline" onClick={() => setActiveAss(null)}>Cancel</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
            {activeAss.questions.map((q, i) => (
              <div key={q.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ margin: 0, color: 'var(--primary)' }}>{q.title || \`Question \${i+1}\`}</h3>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem' }}>{q.maxMarks} Marks</span>
                </div>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>{q.text}</p>
                <textarea className="input-field scrollbar" rows={4} placeholder="Type your answer here..."
                  value={answers[q.id] || ''} onChange={e => setAnswers({...answers, [q.id]: e.target.value})} />
              </div>
            ))}
          </div>

          {isMarking ? (
            <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.3)' }}>
              <Activity className="animate-spin" color="var(--primary)" style={{ marginBottom: '16px' }} />
              <h3 style={{ margin: '0 0 16px 0' }}>AI is grading your work...</h3>
              <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: \`\${markingProgress}%\` }}></div></div>
            </div>
          ) : (
            <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }} onClick={handleSubmit}>
              <Play size={20} /> Submit & Get Instant Grade
            </button>
          )}
        </div>
      );
    }

    return (
      <div>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--panel-border)', marginBottom: '32px' }}>
          <div className={\`nav-tab \${tab === 'assessments' ? 'active' : ''}\`} onClick={() => setTab('assessments')}>Available Assessments</div>
          <div className={\`nav-tab \${tab === 'results' ? 'active' : ''}\`} onClick={() => setTab('results')}>My Results</div>
        </div>

        {tab === 'assessments' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {assessments.filter(a => a.published).map(a => {
              const isCompleted = submissions.some(s => s.assessmentId === a.id);
              return (
                <div key={a.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: '0 0 8px 0' }}>{a.title}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px', flex: 1 }}>{a.questions.length} Questions</p>
                  {isCompleted ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 'bold' }}>
                      <CheckCircle size={18} /> Completed
                    </div>
                  ) : (
                    <button className="btn btn-primary" onClick={() => { setActiveAss(a); setAnswers({}); }}>Take Assessment</button>
                  )}
                </div>
              );
            })}
            {assessments.length === 0 && <div style={{ color: 'var(--text-muted)' }}>No assessments available.</div>}
          </div>
        )}

        {tab === 'results' && (
          <div style={{ display: 'grid', gap: '32px' }}>
            {submissions.map((sub, i) => {
              const ass = assessments.find(a => a.id === sub.assessmentId);
              if(!ass) return null;
              const totalScore = sub.results.reduce((acc, r) => acc + r.score, 0);
              const maxScore = ass.questions.reduce((acc, q) => acc + q.maxMarks, 0);
              const pct = Math.round((totalScore / maxScore) * 100);

              let gradeLetter = 'F';
              if (pct >= 90) gradeLetter = 'A+';
              else if (pct >= 80) gradeLetter = 'A';
              else if (pct >= 70) gradeLetter = 'B';
              else if (pct >= 60) gradeLetter = 'C';

              return (
                <div key={i} className="glass-panel" style={{ overflow: 'hidden' }}>
                  <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--panel-border)', display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <h2 style={{ margin: '0 0 8px 0' }}>{ass.title}</h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>{gradeLetter}</span>
                        <div style={{ height: '40px', width: '2px', background: 'var(--panel-border)' }}></div>
                        <div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Score</div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{totalScore} / {maxScore}</div>
                        </div>
                      </div>
                    </div>
                    <ScoreRing score={pct} size={100} strokeWidth={8} />
                  </div>
                  
                  <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {sub.results.map((r, idx) => {
                      const q = ass.questions.find(qx => qx.id === r.questionId) || {};
                      return (
                        <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{q.title || \`Q\${idx+1}\`}</h4>
                            <span style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '99px', fontWeight: 'bold' }}>
                              {r.score} / {q.maxMarks}
                            </span>
                          </div>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontStyle: 'italic' }}>"{sub.answers[r.questionId]}"</p>
                          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', color: 'var(--primary)' }}>
                              <Brain size={18} /> <strong>AI Feedback</strong>
                            </div>
                            <p style={{ margin: 0, lineHeight: '1.5' }}>{r.feedback}</p>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.05)', padding: '16px', borderRadius: '8px' }}>
                              <strong style={{ color: 'var(--success)', display: 'block', marginBottom: '8px' }}>Strengths</strong>
                              <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)' }}>
                                {r.strengths?.map((s, si) => <li key={si}>{s}</li>) || <li>Good effort</li>}
                              </ul>
                            </div>
                            <div style={{ border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)', padding: '16px', borderRadius: '8px' }}>
                              <strong style={{ color: 'var(--warning)', display: 'block', marginBottom: '8px' }}>Areas to Improve</strong>
                              <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)' }}>
                                {r.improvements?.map((s, si) => <li key={si}>{s}</li>) || <li>None noted</li>}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {submissions.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No results yet. Take an assessment to see your scores.</div>}
          </div>
        )}
      </div>
    );
  };

  const AdminDashboard = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(59,130,246,0.1)', padding: '12px', borderRadius: '12px' }}><BarChart color="var(--primary)" size={24}/></div>
            <h2 style={{ margin: 0 }}>System Stats</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--panel-border)', paddingBottom: '16px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Assessments</span>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{assessments.length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--panel-border)', paddingBottom: '16px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Submissions</span>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{submissions.length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Active Provider</span>
            <span style={{ background: 'var(--gradient-brand)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>
              {aiSettings.provider === 'anthropic' ? 'Claude' : 'HuggingFace'}
            </span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(16,185,129,0.1)', padding: '12px', borderRadius: '12px' }}><ShieldCheck color="var(--success)" size={24}/></div>
            <h2 style={{ margin: 0 }}>Compliance Checklist</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'API Keys Configured', state: (aiSettings.provider === 'anthropic' && aiSettings.anthropicKey) || (aiSettings.provider === 'huggingface' && aiSettings.hfToken) },
              { label: 'Course Material Grounding Active', state: courseMaterial.text.length > 0 || courseMaterial.pdfBase64 },
              { label: 'OCR Vision Integration Ready', state: !!aiSettings.anthropicKey },
            ].map((chk, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {chk.state ? <CheckCircle color="var(--success)" size={20}/> : <div style={{ width: '20px', height: '20px', border: '2px solid var(--text-muted)', borderRadius: '50%' }}></div>}
                <span style={{ color: chk.state ? 'white' : 'var(--text-muted)' }}>{chk.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!role) {
    return (
      <>
        <GlobalStyles />
        <LoginScreen />
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <header className="glass-panel" style={{ margin: '20px', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Brain color="var(--primary)" size={28} />
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AccessAI</h1>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem', marginLeft: '16px' }}>{role} Portal</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-outline" onClick={() => setShowSettings(true)}><Sliders size={18} /> Engine Setup</button>
            <button className="btn btn-outline" onClick={() => setRole(null)} style={{ borderColor: 'rgba(239,68,68,0.3)', color: 'var(--danger)' }}><LogOut size={18} /> Exit</button>
          </div>
        </header>

        <main style={{ flex: 1, padding: '0 20px 40px 20px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {role === 'Lecturer' && <LecturerDashboard />}
          {role === 'Student' && <StudentDashboard />}
          {role === 'Admin' && <AdminDashboard />}
        </main>

        {showSettings && <SettingsModal />}
      </div>
    </>
  );
}

  );
}

