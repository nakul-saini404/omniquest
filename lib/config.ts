// ── Replace with your actual API keys ──────────────────────────
// GROK_API_KEY  : your xAI / Grok API key
// SUPABASE_URL  : https://xxxx.supabase.co
// SUPABASE_KEY  : your anon/public key
// RESEND_KEY    : your Resend API key
// ADMIN_EMAIL   : email that gets lead notifications
// ────────────────────────────────────────────────────────────────

export const CONFIG = {
  GROK_API_KEY: process.env.NEXT_PUBLIC_GROK_API_KEY || 'YOUR_GROK_API_KEY',
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL',
  SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY || 'YOUR_SUPABASE_ANON_KEY',
  RESEND_KEY: process.env.NEXT_PUBLIC_RESEND_KEY || 'YOUR_RESEND_API_KEY',
  ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'contact@eduquest.org.in',
};
