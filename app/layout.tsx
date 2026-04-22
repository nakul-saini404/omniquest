import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OmniQuest — Global Profile Building & Admissions Strategy Consultancy',
  description:
    "OmniQuest is India's premium global admissions strategy firm. We design globally competitive futures through psychometric intelligence, Ivy League profile building, MBA admissions consulting, and career strategy architecture.",
  keywords:
    'study abroad consultant India, Ivy League admissions consulting, profile building for top universities, career counselling for students, psychometric test for career, MBA admissions consulting India, US university application help, UK university admissions guidance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
