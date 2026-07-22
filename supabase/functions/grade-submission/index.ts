import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { assessment, answers, studentFiles } = await req.json();

    const hasAnswers = Object.values(answers || {}).some((val: any) => typeof val === 'string' && val.trim().length > 0) || (studentFiles && studentFiles.length > 0);
    
    if (!hasAnswers) {
      const emptyResult = {
        results: assessment.questions.map((q: any) => ({
          questionId: q.id, score: 0, grade: "Fail", feedback: "No answer was provided for this question.", strengths: [], improvements: ["Provide an answer next time."]
        })),
        authenticity: 100,
        authenticityReason: "No content submitted to analyze."
      };
      return new Response(JSON.stringify(emptyResult), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const system = "You are an objective, highly accurate academic grading system. 1. ANCHORING: Base your evaluation STRICTLY on the provided Reference Context. Recognize conceptual understanding and synonyms; do not penalize for exact phrasing unless quoting is required. 2. FAIRNESS & PARTIAL CREDIT: Award proportional partial credit. If an answer hits 3 out of 4 required points, award 75%. 3. MAINTAIN RIGOR: Do not be overly lax. Deduct points for factual inaccuracies, hallucinations, or irrelevant rambling. Students must demonstrate true comprehension. 4. ANTI-BIAS: Grade purely on factual accuracy and logical coherence. Ignore minor typos or grammatical errors. Be constructive. 5. FEEDBACK: Explain exactly why points were awarded or lost. Return ONLY a RAW JSON object exactly matching this schema: {\"results\": [{\"questionId\": <number>, \"score\": <number>, \"grade\": \"<string>\", \"feedback\": \"<string>\", \"strengths\": [\"<string>\"], \"improvements\": [\"<string>\"]}], \"authenticity\": <number 0-100>, \"authenticityReason\": \"<string>\"}. CRITICAL: You MUST escape all double quotes inside your JSON string values using a backslash (e.g. \\\"). DO NOT output markdown blocks or unescaped newlines.";
    const prompt = `Grading task for: ${assessment.title}\nQuestions: ${JSON.stringify(assessment.questions)}\nStudent Typed Answers: ${JSON.stringify(answers)}\nReference Context: ${assessment.contextText || ""}\nIf a student file is attached, read the answers directly from the file to grade. Also, strictly evaluate the student answers for AI-generation or plagiarism.`;
    
    const files = assessment.contextPdfBase64 ? [{ mime: assessment.contextFileMime || "application/pdf", base64: assessment.contextPdfBase64 }] : [];
    if (studentFiles && studentFiles.length > 0) files.push(...studentFiles);

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set in Edge Function secrets.");

    const body: any = {
      contents: [{
        role: "user",
        parts: [
          ...files.map((f: any) => ({ inline_data: { mime_type: f.mime, data: f.base64 } })),
          { text: prompt }
        ]
      }],
      systemInstruction: { parts: [{ text: system }] },
      generationConfig: { responseMimeType: "application/json" }
    };

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    const resultText = data.candidates?.[0]?.content?.parts?.find((p: any) => p.text)?.text || "{}";
    let cleaned = resultText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const match = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (match) cleaned = match[0];
    
    const parsedResult = JSON.parse(cleaned);

    return new Response(JSON.stringify(parsedResult), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
