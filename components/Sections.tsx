'use client';
import { useEffect, useRef } from 'react';
import { WHY_POINTS, BLOG_POSTS, METRICS, US_UNIS, UK_UNIS, GLOBAL_UNIS } from '@/lib/data';

export function CareerAdvisor() {
  return (
    <section className="advisor-section" id="advisor">
      <div className="container">
        <div className="advisor-inner">
          <div className="advisor-left">
            <div className="section-eyebrow reveal">Strategy Consulting Model</div>
            <h2 className="section-title reveal">Every Student Works with a<br /><em>Global Strategy Consultant</em></h2>
            <p className="section-sub reveal">Not tutors. Not counsellors. At OmniQuest, you are assigned a dedicated team of specialists who work as your personal admissions architecture firm.</p>
            <div className="advisor-roles">
              <div className="advisor-role reveal">
                <div className="ar-icon">🧭</div>
                <div>
                  <div className="ar-title">Career Strategy Advisor</div>
                  <div className="ar-desc">Maps your cognitive profile to long-term career trajectories and identifies the optimal university and programme combination for your goals.</div>
                </div>
              </div>
              <div className="advisor-role reveal" style={{ transitionDelay: '.1s' }}>
                <div className="ar-icon">🏗️</div>
                <div>
                  <div className="ar-title">Profile Architect</div>
                  <div className="ar-desc">Designs your extracurricular narrative, leadership positioning, and academic profile to meet Ivy League and top-50 university standards.</div>
                </div>
              </div>
              <div className="advisor-role reveal" style={{ transitionDelay: '.2s' }}>
                <div className="ar-icon">✍️</div>
                <div>
                  <div className="ar-title">Admissions Strategist</div>
                  <div className="ar-desc">Orchestrates your full application — essays, recommendations, interviews, and school selection — with surgical precision and insider knowledge.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="advisor-right">
            <div className="advisor-panel reveal">
              <p className="ap-quote">
                We do not fill out applications. We build the candidate that elite universities want to admit — long before the application opens.
              </p>
              <div className="ap-divider" />
              <div className="ap-stats">
                <div><div className="ap-stat-num">92%</div><div className="ap-stat-lbl">First-Choice Rate</div></div>
                <div><div className="ap-stat-num">15+</div><div className="ap-stat-lbl">Years Experience</div></div>
                <div><div className="ap-stat-num">40+</div><div className="ap-stat-lbl">Destination Countries</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Ecosystem({ onOpenChat }: { onOpenChat: (msg: string) => void }) {
  return (
    <section className="ecosystem-section" id="ecosystem">
      <div className="container">
        <div className="ecosystem-header reveal">
          <div className="section-eyebrow">OmniQuest Global Education System</div>
          <h2 className="section-title">Three Divisions.<br /><em>One Integrated Strategy.</em></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Each division operates as a specialist consulting unit. Together, they cover every stage of your global education and career journey.</p>
        </div>
        <div className="ecosystem-grid">
          <article className="eco-card reveal">
            <div className="eco-tag">School Division · EduQuest</div>
            <div className="eco-icon">🏛️</div>
            <h3 className="eco-title">Ivy League &amp; Global UG Admissions</h3>
            <p className="eco-desc">End-to-end admissions architecture for students targeting Ivy League, Oxbridge, and top-50 global universities — from cognitive profiling to offer letter.</p>
            <div className="eco-features">
              <div className="eco-feature"><span className="eco-feat-dot" />SAT / ACT / AP Coaching</div>
              <div className="eco-feature"><span className="eco-feat-dot" />Ivy League Profile Building</div>
              <div className="eco-feature"><span className="eco-feat-dot" />Essay &amp; Application Architecture</div>
              <div className="eco-feature"><span className="eco-feat-dot" />Scholarship &amp; Financial Aid Strategy</div>
            </div>
            <button className="eco-cta" onClick={() => onOpenChat('Tell me about the School Division for Ivy League admissions')}>Explore School Strategy →</button>
          </article>
          <article className="eco-card reveal" style={{ transitionDelay: '.1s' }}>
            <div className="eco-tag">MBA Division · MbaWizards</div>
            <div className="eco-icon">💼</div>
            <h3 className="eco-title">Elite MBA &amp; Master&apos;s Admissions</h3>
            <p className="eco-desc">Precision MBA consulting for M7, ISB, INSEAD, and top European schools — built by former admissions officers and alumni of the programmes themselves.</p>
            <div className="eco-features">
              <div className="eco-feature"><span className="eco-feat-dot" />GMAT / GRE Strategy (720+ avg)</div>
              <div className="eco-feature"><span className="eco-feat-dot" />School Selection Architecture</div>
              <div className="eco-feature"><span className="eco-feat-dot" />Essay &amp; Interview Coaching</div>
              <div className="eco-feature"><span className="eco-feat-dot" />Post-MBA Career Positioning</div>
            </div>
            <button className="eco-cta" onClick={() => onOpenChat('Tell me about the MBA Division for elite MBA admissions')}>Explore MBA Strategy →</button>
          </article>
          <article className="eco-card reveal" style={{ transitionDelay: '.2s' }}>
            <div className="eco-tag">Tech &amp; Skills Division · Aptech</div>
            <div className="eco-icon">⚡</div>
            <h3 className="eco-title">Future-Ready Career Acceleration</h3>
            <p className="eco-desc">Industry-designed programmes in AI, Data Science, and technology — built for professionals who want to pivot fast and land elite roles in the digital economy.</p>
            <div className="eco-features">
              <div className="eco-feature"><span className="eco-feat-dot" />AI &amp; Data Science Bootcamp</div>
              <div className="eco-feature"><span className="eco-feat-dot" />Tech Career Strategy</div>
              <div className="eco-feature"><span className="eco-feat-dot" />Portfolio &amp; Project Architecture</div>
              <div className="eco-feature"><span className="eco-feat-dot" />Placement &amp; Hiring Support</div>
            </div>
            <button className="eco-cta" onClick={() => onOpenChat('Tell me about the Tech & Skills Division career programs')}>Explore Tech Pathways →</button>
          </article>
        </div>
      </div>
    </section>
  );
}

export function WhyOmniQuest() {
  return (
    <section className="why-section" id="why">
      <div className="container why-inner">
        <div className="why-header reveal">
          <div className="section-eyebrow">Our Difference</div>
          <h2 className="section-title">We Don&apos;t Coach.<br /><em>We Build Global Profiles.</em></h2>
          <p className="section-sub">OmniQuest is not a coaching centre. We are a global admissions strategy firm — competing with the best international education consultants, not the local coaching institute down the road.</p>
        </div>
        <div className="why-grid">
          {WHY_POINTS.map((p, i) => (
            <div key={i} className="why-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="why-card-num">{p.n}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Results() {
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    const animate = (el: HTMLSpanElement, target: number) => {
      let start: number;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1800, 1);
        const val = Math.round((1 - Math.pow(1 - p, 3)) * target);
        el.textContent = val >= 1000 ? val.toLocaleString() + '+' : val + '+';
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLSpanElement;
          animate(el, parseInt(el.dataset.target || '0', 10));
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    numRefs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <section className="results-section" id="results">
      <div className="container">
        <div className="results-header reveal">
          <div className="section-eyebrow">Success Outcomes</div>
          <h2 className="section-title">Numbers That Speak<br /><em>For Themselves</em></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>A decade of strategic consulting, precision profile building, and data-driven admissions outcomes.</p>
        </div>
        <div className="metrics-row reveal">
          {METRICS.map((m, i) => (
            <div key={i} className="metric-cell">
              <span className="metric-badge">{m.badge}</span>
              <span className="metric-num" data-target={m.target} ref={el => { numRefs.current[i] = el; }}>0</span>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="outcomes-block reveal">
          <div className="outcome-group">
            <h4>United States &amp; United Kingdom</h4>
            <div className="outcome-logos">
              {[...US_UNIS, ...UK_UNIS].map(u => <div key={u} className="outcome-tag">{u}</div>)}
            </div>
          </div>
          <div className="outcome-group">
            <h4>Global Institutions</h4>
            <div className="outcome-logos">
              {GLOBAL_UNIS.map(u => <div key={u} className="outcome-tag">{u}</div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GlobalMap() {
  return (
    <section className="global-map" id="global-map">
      <div className="container">
        <div className="map-header reveal">
          <div className="section-eyebrow">Global Reach</div>
          <h2 className="section-title">From India to<br /><em>Every Elite Institution</em></h2>
          <p className="section-sub">We place students from across India into the world&apos;s most competitive universities — in the USA, UK, Canada, Europe, and beyond.</p>
        </div>
        <div className="map-visual reveal">
          <div className="map-bg">
            <div className="map-dots" />
            <div className="map-label ml-usa"><span className="map-ping" />United States</div>
            <div className="map-label ml-uk"><span className="map-ping" />United Kingdom</div>
            <div className="map-label ml-canada"><span className="map-ping" />Canada</div>
            <div className="map-label ml-europe"><span className="map-ping" />Europe</div>
            <div className="map-label ml-india"><span className="map-ping" />India 🇮🇳</div>
            <div className="map-label ml-aus"><span className="map-ping" />Australia</div>
            <div className="map-center">
              <h3>40+ Destination Countries</h3>
              <p>Students admitted to 200+ elite institutions worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <div className="blog-header reveal">
          <div>
            <div className="section-eyebrow">Strategic Insights</div>
            <h2 className="section-title">Intelligence for<br /><em>Your Journey</em></h2>
          </div>
          <a href="#" className="btn btn-ghost" style={{ flexShrink: 0 }}>View All Insights →</a>
        </div>
        <div className="blog-grid reveal">
          {BLOG_POSTS.map((p, i) => (
            <article key={i} className="blog-card">
              <div className={`blog-thumb ${p.thumbClass}`}>{p.thumb}</div>
              <div className="blog-body">
                <div className="blog-tag">{p.tag}</div>
                <h3 className="blog-title">{p.title}</h3>
                <p className="blog-meta">{p.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta" id="final-cta">
      <div className="cta-orb-a" /><div className="cta-orb-b" />
      <div className="container final-cta-inner">
        <div className="urgency-badge reveal">⬥ Limited Advisory Slots · Fall 2026 Intake</div>
        <h2 className="reveal">Your Global Journey<br />Starts with a <em>Strategy</em></h2>
        <p className="reveal">Join 10,000+ students whose globally competitive futures were designed by OmniQuest.</p>
        <div className="final-cta-btns reveal">
          <a href="#" className="btn btn-primary btn-lg">📅 Book Strategy Session</a>
          <a href="#psychometric" className="btn btn-outline btn-lg">🧠 Start Psychometric Test</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">Omni<span>Quest</span></div>
              <p className="footer-tagline">India&apos;s premium global admissions strategy firm — designing globally competitive futures through psychometric intelligence and profile architecture.</p>
              <div className="footer-sub-brands">
                <span className="fsb">School Division</span>
                <span className="fsb">MBA Division</span>
                <span className="fsb">Tech &amp; Skills</span>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Strategy</div>
              <ul className="footer-links">
                <li><a href="#">Ivy League Admissions</a></li>
                <li><a href="#">UG Profile Building</a></li>
                <li><a href="#">MBA Admissions</a></li>
                <li><a href="#">GMAT Strategy</a></li>
                <li><a href="#">Tech Career Programs</a></li>
                <li><a href="#">Psychometric Assessment</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Offices</div>
              <ul className="footer-links">
                <li><a href="#">Delhi / NCR</a></li>
                <li><a href="#">Bangalore</a></li>
                <li><a href="#">Mumbai</a></li>
                <li><a href="#">Hyderabad</a></li>
                <li><a href="#">Online — Pan India</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><a href="#">About OmniQuest</a></li>
                <li><a href="#">Success Outcomes</a></li>
                <li><a href="#blog">Strategic Insights</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Join Our Team</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 OmniQuest. All rights reserved. A premium division of EduQuest · MbaWizards · Aptech.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
