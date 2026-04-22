import { CONFIG } from './config';

export interface GateData {
  name: string;
  email: string;
  mobile: string;
  city: string;
  role: string;
  goal: string;
}

export interface TraitReport {
  label: string;
  score: number;
  desc: string;
}

export interface PersonalityReport {
  personality_type: string;
  tagline: string;
  traits: TraitReport[];
  recommended_pathway: { title: string; brand: string; description: string };
  strengths: string[];
  next_step: string;
}

export async function supabaseInsert(table: string, data: Record<string, unknown>) {
  try {
    const r = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: CONFIG.SUPABASE_KEY,
        Authorization: `Bearer ${CONFIG.SUPABASE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(data),
    });
    return r.ok;
  } catch (e) {
    console.warn('Supabase error:', e);
    return false;
  }
}

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CONFIG.RESEND_KEY}` },
      body: JSON.stringify({ from: 'OmniQuest <noreply@yourdomain.com>', to, subject, html }),
    });
  } catch (e) {
    console.warn('Resend error:', e);
  }
}

export function adminLeadEmailHtml(data: Record<string, string>) {
  return `
<div style="font-family:sans-serif;max-width:600px;margin:auto;background:#f8fafc;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#0B1C3D,#102454);padding:24px 28px;">
    <h2 style="color:#fff;margin:0;font-size:18px;">🎯 New Lead — OmniQuest</h2>
    <p style="color:rgba(255,255,255,.5);margin:4px 0 0;font-size:13px;">Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
  </div>
  <div style="padding:24px 28px;background:#fff;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${Object.entries(data)
        .map(
          ([k, v]) =>
            `<tr><td style="padding:9px 12px;font-weight:600;color:#475569;border-bottom:1px solid #f1f5f9;white-space:nowrap">${k}</td><td style="padding:9px 12px;color:#1e293b;border-bottom:1px solid #f1f5f9">${v || '—'}</td></tr>`
        )
        .join('')}
    </table>
  </div>
</div>`;
}

export function userConfirmEmailHtml(name: string, goal: string, reportHtml = '') {
  return `
<div style="font-family:sans-serif;max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
  <div style="background:linear-gradient(135deg,#0B1C3D,#102454);padding:28px 32px;">
    <h1 style="color:#fff;font-size:22px;margin:0;">Hi ${name}! 🎉</h1>
    <p style="color:rgba(255,255,255,.6);margin:8px 0 0;font-size:14px;">Your OmniQuest personality report is ready</p>
  </div>
  <div style="padding:28px 32px;">
    ${reportHtml ? `<div style="background:#f0f7ff;border-radius:10px;padding:20px;margin-bottom:22px;">${reportHtml}</div>` : ''}
    <p style="color:#475569;font-size:14px;line-height:1.7;">Based on your goal of <strong style="color:#0B1C3D;">${goal}</strong>, our counsellors will reach out within 1–2 business days with a personalised roadmap.</p>
    <div style="margin-top:22px;">
      <a href="https://eduquest.org.in" style="display:inline-block;background:linear-gradient(135deg,#00C9B1,#2563EB);color:#fff;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:700;font-size:14px;text-align:center;">🌐 Explore OmniQuest Programs</a>
    </div>
    <hr style="margin:24px 0;border:none;border-top:1px solid #f1f5f9;"/>
    <p style="font-size:12px;color:#94a3b8;">EduQuest · 1210 Galleria Boulevard, DLF Phase IV, Gurugram · +91-9958041888</p>
  </div>
</div>`;
}

export function getFallbackReport(gateData: GateData): PersonalityReport {
  return {
    personality_type: 'Global Achiever',
    tagline: `${gateData.name} shows the hallmarks of someone ready to make a mark on the world stage.`,
    traits: [
      { label: 'Analytical Thinking', score: 82, desc: 'Strong ability to break down complex problems' },
      { label: 'Global Ambition', score: 90, desc: 'Clear drive toward international opportunities' },
      { label: 'Leadership Drive', score: 76, desc: 'Natural inclination to lead and inspire others' },
      { label: 'Adaptability', score: 74, desc: 'Comfortable navigating new environments' },
    ],
    recommended_pathway: {
      title:
        gateData.goal === 'MBA / PG Abroad'
          ? 'MBA Admissions Program'
          : gateData.goal === 'Career Switch to Tech'
          ? 'AI & Data Science Bootcamp'
          : 'Study Abroad — UG Admissions',
      brand:
        gateData.goal === 'MBA / PG Abroad'
          ? 'MbaWizards'
          : gateData.goal === 'Career Switch to Tech'
          ? 'Aptech'
          : 'EduQuest',
      description: `Based on your goal of "${gateData.goal}", this programme offers the most direct and effective path to your aspirations. Our experts will craft a personalised strategy tailored to your strengths.`,
    },
    strengths: ['Strategic thinking', 'Strong academic foundation', 'Global mindset', 'Goal-oriented approach', 'Resilience under pressure'],
    next_step: 'Book a free 30-minute counselling session to get your personalised application roadmap.',
  };
}

export async function generateReportFromAI(gateData: GateData, answers: number[], questions: Array<{ q: string; opts: string[] }>): Promise<PersonalityReport> {
  const summary = questions.map((q, i) => `Q${i + 1}: ${q.q}\nAnswer: ${q.opts[answers[i] || 0]}`).join('\n\n');

  const prompt = `You are OmniQuest's AI education counsellor. Analyse this personality assessment and return ONLY valid JSON (no markdown, no explanation).

Student profile:
Name: ${gateData.name}
Role: ${gateData.role}
Goal: ${gateData.goal}
City: ${gateData.city}

Quiz answers:
${summary}

Return this exact JSON structure:
{
  "personality_type": "2-3 word label like 'Strategic Achiever'",
  "tagline": "One inspiring sentence about this person's potential",
  "traits": [
    {"label": "Analytical Thinking", "score": 85, "desc": "Short insight"},
    {"label": "Global Ambition", "score": 92, "desc": "Short insight"},
    {"label": "Leadership Drive", "score": 78, "desc": "Short insight"},
    {"label": "Adaptability", "score": 70, "desc": "Short insight"}
  ],
  "recommended_pathway": {
    "title": "Best-fit programme title",
    "brand": "EduQuest / MbaWizards / Aptech",
    "description": "Why this pathway fits them specifically (2-3 sentences)"
  },
  "strengths": ["strength1","strength2","strength3","strength4","strength5"],
  "next_step": "One specific actionable recommendation"
}`;

  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CONFIG.GROK_API_KEY}` },
    body: JSON.stringify({ model: 'grok-3-latest', messages: [{ role: 'user', content: prompt }], temperature: 0.7, max_tokens: 900 }),
  });
  const data = await res.json();
  let raw = data.choices?.[0]?.message?.content || '{}';
  raw = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(raw) as PersonalityReport;
}
