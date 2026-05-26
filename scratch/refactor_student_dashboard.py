import re

with open("Evaluate.jsx", "r", encoding="utf-8") as f:
    content = f.read()


# 1. Hide AI Feedback for Students in DetailedCorrectionsModal
hide_feedback_code = """
          {role !== 'Student' && (
            <>
              {/* Question-by-Question Corrections breakdown */}
              <h3 style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Detailed Evaluation Breakdown</h3>
              <div style={{ display: 'grid', gap: '32px' }}>
                {selectedSub.results.map((res, index) => {
"""

content = re.sub(
    r"          \{\/\* Question-by-Question Corrections breakdown \*\/\}\n          <h3 style=\{\{ marginBottom: '20px', color: 'var\(--text-muted\)' \}\}>Detailed Evaluation Breakdown<\/h3>\n          <div style=\{\{ display: 'grid', gap: '32px' \}\}>\n            \{selectedSub\.results\.map\(\(res, index\) => \{",
    hide_feedback_code,
    content
)

close_feedback_code = """
                </div>
              );
            })}
          </div>
          </>
          )}

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--panel-border)', paddingTop: '24px' }}>
"""

content = re.sub(
    r"                <\/div>\n              \);\n            \}\)}\n          <\/div>\n\n          <div style=\{\{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var\(--panel-border\)', paddingTop: '24px' \}\}>",
    close_feedback_code,
    content
)

# 2. Add Auto-Save Draft logic to EvaluateApp
draft_effects = """
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
"""

content = content.replace("  // --- EmailJS Helpers ---", draft_effects)


# 3. Clear draft on successful submission
clear_draft_code = """
            // Auto-send results email
            if (studentProfile?.email) {
              sendResultsEmail(studentProfile, activeExam.title, results, totalScore, totalMax);
            }
            if (studentProfile) {
              localStorage.removeItem(`draft_${studentProfile.matricNo}_${activeExam.id}`);
            }
"""

content = content.replace("""
            // Auto-send results email
            if (studentProfile?.email) {
              sendResultsEmail(studentProfile, activeExam.title, results, totalScore, totalMax);
            }
""", clear_draft_code)


with open("Evaluate.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Student Dashboard updates applied successfully.")
