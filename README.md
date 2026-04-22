# OmniQuest — Next.js

India's premier global education platform. Built with **Next.js 15 (App Router)** + **TypeScript**.

## Project Structure

```
omniquest/
├── app/
│   ├── globals.css       # All CSS (design tokens, components, responsive)
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Main page — assembles all sections
├── components/
│   ├── Navbar.tsx        # Sticky navbar + mobile menu
│   ├── Hero.tsx          # Hero section with SVG world map
│   ├── Sections.tsx      # BrandStrip, Pathways, WhyUs, Results,
│   │                     #   GlobalMap, Legacy, Blog, FinalCta, Footer
│   ├── PersonalityTest.tsx  # Multi-step quiz (gate → quiz → loading → report)
│   ├── ChatBox.tsx       # Floating AI chat (Grok API)
│   └── ScrollReveal.tsx  # IntersectionObserver scroll animations
├── lib/
│   ├── config.ts         # API keys (reads from env vars)
│   ├── data.ts           # Static data (questions, cards, metrics)
│   └── api.ts            # Grok AI, Supabase, Resend helpers
└── .env.example          # Environment variable template
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Add your API keys
cp .env.example .env.local
# Edit .env.local with your real keys

# 3. Run the dev server
npm run dev
# → http://localhost:3000
```

## API Keys Required

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_GROK_API_KEY` | [console.x.ai](https://console.x.ai) |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_KEY` | Your Supabase anon/public key |
| `NEXT_PUBLIC_RESEND_KEY` | [resend.com](https://resend.com) |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Email to receive lead notifications |

> **Note:** All keys are prefixed `NEXT_PUBLIC_` so they are accessible in the browser. For production, move Supabase/Resend calls to API Routes (`app/api/`) to keep keys server-side only.

## Features

- **Navbar** — Fixed, scroll-aware, dropdown menus, mobile hamburger
- **Hero** — Animated SVG world map, floating stat cards, trust badges
- **Brand Strip** — EduQuest + MbaWizards + Aptech → OmniQuest
- **Pathways** — 3 pathway cards with hover effects
- **Personality Test** — 4-step flow: gate form → 8-question quiz → AI loading → full report with animated trait bars
- **Why Us** — 6 feature cards with scroll reveal
- **Results** — Animated number counters, university logos
- **Global Map** — Pulsing location badges
- **Legacy** — Brand heritage cards
- **Blog** — 4 article cards
- **Final CTA** — Urgency-focused conversion section
- **Chat** — Floating Grok AI chatbot with quick replies
- **Scroll Reveal** — IntersectionObserver animations throughout

## Build for Production

```bash
npm run build
npm start
```
