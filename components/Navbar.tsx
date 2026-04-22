'use client';
import { useEffect, useState } from 'react';

export default function Navbar({ onOpenChat }: { onOpenChat: (msg: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="nav-logo" aria-label="OmniQuest Home">
              <div className="logo-mark">OQ</div>
              Omni<span className="logo-accent">Quest</span>
            </a>
            <ul className="nav-links">
              <li className="nav-item">
                <span className="nav-link" tabIndex={0}>
                  Divisions
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
                <div className="dropdown">
                  <a href="#ecosystem" className="dropdown-item">
                    <div className="di-icon" style={{background:'#EFF6FF'}}>🎓</div>
                    <div><span className="di-label">School Division</span><span className="di-sub">Ivy League · Global UG Admissions</span></div>
                  </a>
                  <a href="#ecosystem" className="dropdown-item">
                    <div className="di-icon" style={{background:'#F5F3FF'}}>💼</div>
                    <div><span className="di-label">MBA Division</span><span className="di-sub">Elite MBA & Master's Strategy</span></div>
                  </a>
                  <a href="#ecosystem" className="dropdown-item">
                    <div className="di-icon" style={{background:'#ECFDF5'}}>💻</div>
                    <div><span className="di-label">Tech & Skills Division</span><span className="di-sub">Future-Ready Career Acceleration</span></div>
                  </a>
                  <a href="#psychometric" className="dropdown-item">
                    <div className="di-icon" style={{background:'#FDF6E7'}}>🧠</div>
                    <div><span className="di-label">Psychometric Assessment</span><span className="di-sub">Free · AI-Powered · 2 Minutes</span></div>
                  </a>
                </div>
              </li>
              <li><a href="#advisor" className="nav-link">Strategy Team</a></li>
              <li><a href="#why" className="nav-link">Why OmniQuest</a></li>
              <li><a href="#results" className="nav-link">Outcomes</a></li>
              <li><a href="#blog" className="nav-link">Insights</a></li>
              <li><a href="#footer" className="nav-link">Contact</a></li>
            </ul>
            <a href="#final-cta" className="btn btn-primary nav-cta">Book Strategy Session</a>
            <button className="hamburger" aria-label="Toggle menu" onClick={() => setMobileOpen(v => !v)}>
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <a href="#psychometric" onClick={() => setMobileOpen(false)}>🧠 Psychometric Assessment</a>
        <a href="#advisor" onClick={() => setMobileOpen(false)}>👤 Strategy Team</a>
        <a href="#ecosystem" onClick={() => setMobileOpen(false)}>🏛️ Our Divisions</a>
        <a href="#why" onClick={() => setMobileOpen(false)}>✦ Why OmniQuest</a>
        <a href="#results" onClick={() => setMobileOpen(false)}>🏆 Success Outcomes</a>
        <a href="#blog" onClick={() => setMobileOpen(false)}>📖 Insights</a>
        <a href="#footer" onClick={() => setMobileOpen(false)}>📞 Contact</a>
        <a href="#final-cta" onClick={() => setMobileOpen(false)} className="m-cta">Book Strategy Session →</a>
      </div>
    </>
  );
}
