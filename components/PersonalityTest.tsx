'use client';
import { useState, useEffect, useRef } from 'react';
import { QUESTIONS } from '@/lib/data';
import {
  GateData,
  PersonalityReport,
  supabaseInsert,
  sendEmail,
  adminLeadEmailHtml,
  userConfirmEmailHtml,
  generateReportFromAI,
  getFallbackReport,
} from '@/lib/api';
import { CONFIG } from '@/lib/config';

type Step = 'gate' | 'quiz' | 'loading' | 'report';

export default function PersonalityTest() {
  const [step, setStep] = useState<Step>('gate');
  const [gateData, setGateData] = useState<GateData>({ name: '', email: '', mobile: '', city: '', role: '', goal: '' });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [report, setReport] = useState<PersonalityReport | null>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animate trait bars when report shows
  useEffect(() => {
    if (step === 'report' && report) {
      setTimeout(() => {
        barRefs.current.forEach((bar, i) => {
          if (bar) bar.style.width = report.traits[i]?.score + '%';
        });
      }, 200);
    }
  }, [step, report]);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function startQuiz() {
    const { name, email, mobile, city, role, goal } = gateData;
    if (!name || !email || !mobile || !city || !role || !goal) {
      alert('Please fill in all fields to continue.');
      return;
    }
    setCurrentQ(0);
    setAnswers([]);
    setStep('quiz');
  }

  function selectOpt(idx: number) {
    const updated = [...answers];
    updated[currentQ] = idx;
    setAnswers(updated);
  }

  function quizBack() {
    if (currentQ > 0) setCurrentQ(q => q - 1);
  }

  function quizNext() {
    if (answers[currentQ] === undefined) return;
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
    } else {
      runGenerate();
    }
  }

  async function runGenerate() {
    setStep('loading');
    let result: PersonalityReport;
    try {
      result = await generateReportFromAI(gateData, answers, QUESTIONS);
    } catch {
      result = getFallbackReport(gateData);
    }

    // Save to Supabase
    supabaseInsert('personality_leads', {
      name: gateData.name, email: gateData.email, mobile: gateData.mobile,
      city: gateData.city, role: gateData.role, goal: gateData.goal,
      personality_type: result.personality_type,
      recommended_pathway: result.recommended_pathway?.title,
      source: 'personality_test',
      created_at: new Date().toISOString(),
    });

    // Admin email
    sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: `🧠 New Personality Test — ${gateData.name} (${result.personality_type})`,
      html: adminLeadEmailHtml({
        Name: gateData.name, Email: gateData.email, Mobile: gateData.mobile,
        City: gateData.city, Role: gateData.role, Goal: gateData.goal,
        'Personality Type': result.personality_type,
        'Recommended Pathway': result.recommended_pathway?.title,
      }),
    });

    // User email
    const snippetHtml = `<p style="font-size:14px;color:#0B1C3D;"><strong>Your Type:</strong> ${result.personality_type}<br/><strong>Best Pathway:</strong> ${result.recommended_pathway?.title}</p>`;
    sendEmail({
      to: gateData.email,
      subject: `Your OmniQuest Personality Report is Ready, ${gateData.name}! 🧠`,
      html: userConfirmEmailHtml(gateData.name, gateData.goal, snippetHtml),
    });

    setReport(result);
    setStep('report');
  }

  function retakeTest() {
    setStep('gate');
    setGateData({ name: '', email: '', mobile: '', city: '', role: '', goal: '' });
    setAnswers([]);
    setCurrentQ(0);
    setReport(null);
    document.getElementById('psychometric')?.scrollIntoView({ behavior: 'smooth' });
  }

  const pct = ((currentQ + 1) / QUESTIONS.length * 100).toFixed(0);

  return (
    <section className="psycho-section" id="psychometric">
      <div className="p-orb-1" />
      <div className="p-orb-2" />
      <div className="container personality-inner">
        <div className="personality-header reveal">
          <div className="section-eyebrow" style={{ color: 'var(--gold)' }}>Free Psychometric Evaluation</div>
          <h2 className="section-title" style={{ color: '#fff' }}>Intelligence First.<br /><em>Applications Later.</em></h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,.48)', margin: '0 auto' }}>We begin every advisory engagement with a deep understanding of you — your cognitive style, personality, and career alignment — before recommending a single strategy.</p>
        </div>

        {/* ── GATE FORM ── */}
        {step === 'gate' && (
          <div id="pt-gate" className="reveal">
            <h3>Start Your Psychometric Profile</h3>
            <p>Complete your profile to receive a personalised cognitive and career alignment report — sent directly to your inbox.</p>
            <div className="gate-form-grid">
              <div>
                <label className="gf-label">Full Name *</label>
                <input className="gf-input" type="text" placeholder="Your full name" value={gateData.name}
                  onChange={e => setGateData(d => ({ ...d, name: e.target.value }))} required />
              </div>
              <div>
                <label className="gf-label">Mobile Number *</label>
                <input className="gf-input" type="tel" placeholder="+91 XXXXX XXXXX" value={gateData.mobile}
                  onChange={e => setGateData(d => ({ ...d, mobile: e.target.value }))} required />
              </div>
              <div>
                <label className="gf-label">Email Address *</label>
                <input className="gf-input" type="email" placeholder="your@email.com" value={gateData.email}
                  onChange={e => setGateData(d => ({ ...d, email: e.target.value }))} required />
              </div>
              <div>
                <label className="gf-label">City *</label>
                <input className="gf-input" type="text" placeholder="Your city" value={gateData.city}
                  onChange={e => setGateData(d => ({ ...d, city: e.target.value }))} required />
              </div>
              <div className="full">
                <label className="gf-label">I am a *</label>
                <select className="gf-input gf-select" value={gateData.role}
                  onChange={e => setGateData(d => ({ ...d, role: e.target.value }))}>
                  <option value="">Select your profile...</option>
                  <option>School Student (Grade 9–12)</option>
                  <option>Undergraduate Student</option>
                  <option>Working Professional</option>
                  <option>Recent Graduate</option>
                  <option>Parent planning for child</option>
                </select>
              </div>
              <div className="full">
                <label className="gf-label">Primary Goal *</label>
                <select className="gf-input gf-select" value={gateData.goal}
                  onChange={e => setGateData(d => ({ ...d, goal: e.target.value }))}>
                  <option value="">What&apos;s your main goal?</option>
                  <option>Study Abroad (UG)</option>
                  <option>MBA / PG Abroad</option>
                  <option>Career Switch to Tech</option>
                  <option>Score higher on SAT/GMAT</option>
                  <option>Not sure yet</option>
                </select>
              </div>
            </div>
            <button className="gate-btn" onClick={startQuiz}>🧠 Begin Psychometric Evaluation →</button>
            <p className="gate-privacy">🔒 Your data is safe. We&apos;ll email your full report and never spam.</p>
          </div>
        )}

        {/* ── QUIZ ── */}
        {step === 'quiz' && (
          <div className="quiz-wrapper active">
            <div className="quiz-step-label">Question {currentQ + 1} of {QUESTIONS.length}</div>
            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill" style={{ width: pct + '%' }} />
            </div>
            <div className="quiz-q">{QUESTIONS[currentQ].q}</div>
            <div className="quiz-options">
              {QUESTIONS[currentQ].opts.map((opt, i) => (
                <button
                  key={i}
                  className={`quiz-opt${answers[currentQ] === i ? ' selected' : ''}`}
                  onClick={() => selectOpt(i)}
                >
                  <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>
            <div className="quiz-nav">
              <button className="quiz-back" onClick={quizBack} style={{ visibility: currentQ === 0 ? 'hidden' : 'visible' }}>← Back</button>
              <button className="quiz-next" onClick={quizNext} disabled={answers[currentQ] === undefined}>
                {currentQ < QUESTIONS.length - 1 ? 'Next →' : 'See My Report →'}
              </button>
            </div>
          </div>
        )}

        {/* ── LOADING ── */}
        {step === 'loading' && (
          <div className="loading-wrapper active">
            <div className="loader" />
            <p>Analysing your cognitive profile with AI…</p>
          </div>
        )}

        {/* ── REPORT ── */}
        {step === 'report' && report && (
          <div className="report-wrapper active">
            <div className="report-header" style={{ animation: 'slideDown .5s ease' }}>
              <div className="r-name">{gateData.name}</div>
              <div className="r-type">{report.personality_type}</div>
              <p className="r-tagline">{report.tagline}</p>
            </div>

            <div className="report-traits">
              {report.traits.map((t, i) => (
                <div key={i} className="trait-card">
                  <div className="trait-label">{t.label}</div>
                  <div className="trait-bar-track">
                    <div
                      className="trait-bar-fill"
                      style={{ width: '0%' }}
                      ref={el => { barRefs.current[i] = el; }}
                    />
                  </div>
                  <div className="trait-score">
                    {t.score}<span style={{ fontSize: '.65em', color: 'rgba(255,255,255,.4)' }}>/100</span>
                  </div>
                  <div className="trait-desc">{t.desc}</div>
                </div>
              ))}
            </div>

            <div className="report-pathway">
              <div className="rp-label">🎯 Recommended Pathway · {report.recommended_pathway.brand}</div>
              <div className="rp-title">{report.recommended_pathway.title}</div>
              <p className="rp-desc">{report.recommended_pathway.description}</p>
            </div>

            <div className="report-strengths">
              <div className="rs-title">Your Key Strengths</div>
              <div className="strengths-list">
                {report.strengths.map((s, i) => (
                  <span key={i} className="strength-tag">✦ {s}</span>
                ))}
              </div>
            </div>

            <div className="report-cta">
              <h3>🚀 Next Step: {report.next_step}</h3>
              <p>
                Your personalised report has been sent to <strong>{gateData.email}</strong>. Our counsellor will reach out within 24 hours.
              </p>
              <div className="report-cta-btns">
                <a href="#final-cta" className="btn btn-primary">📅 Book Strategy Session</a>
                <button
                  className="btn btn-outline"
                  style={{ background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}
                  onClick={retakeTest}
                >
                  ↺ Retake Test
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
