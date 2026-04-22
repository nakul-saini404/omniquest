export default function Hero() {
  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero-orb hero-orb-1"/>
      <div className="hero-orb hero-orb-2"/>
      <div className="hero-orb hero-orb-3"/>
      <div className="container">
        <div className="hero-content">
          <div className="fade-up">
            <div className="hero-eyebrow"><span className="eyebrow-dot"/>India&apos;s Premium Global Admissions Strategy Firm</div>
            <h1 className="hero-h1">
              We Design<br/>
              <em>Globally Competitive</em><br/>
              Futures.
            </h1>
            <p className="hero-sub">
              A premium admissions and career strategy consultancy helping students secure Ivy League, top global universities, and elite careers — through psychometric intelligence and structured profile architecture.
            </p>
            <div className="hero-ctas">
              <a href="#psychometric" className="btn btn-primary btn-lg">Start Psychometric Profile</a>
              <a href="#final-cta" className="btn btn-outline btn-lg">Book Advisory Session</a>
            </div>
            <div className="hero-divider"/>
            <div className="trust-row">
              <div className="trust-pill"><span className="chk">✦</span> Ivy League Admits</div>
              <div className="trust-pill"><span className="chk">✦</span> 10,000+ Profiles Built</div>
              <div className="trust-pill"><span className="chk">✦</span> 40+ Countries</div>
              <div className="trust-pill"><span className="chk">✦</span> 4.9 Advisory Rating</div>
            </div>
          </div>

          <div className="hero-visual fade-up d2">
            <div className="hero-stat-panel">
              <div className="hsp-title">Strategy Outcomes · 2024</div>
              <div className="hsp-stats">
                <div><div className="hsp-num">92%</div><div className="hsp-lbl">First-choice admit rate</div></div>
                <div><div className="hsp-num">8K+</div><div className="hsp-lbl">UG admits secured</div></div>
                <div><div className="hsp-num">720+</div><div className="hsp-lbl">Average GMAT score</div></div>
                <div><div className="hsp-num">$2M+</div><div className="hsp-lbl">Scholarships won</div></div>
              </div>
            </div>
            <div className="hero-badge-row">
              <div className="hero-badge"><span className="bd-icon">🏛️</span> Ivy League Strategy</div>
              <div className="hero-badge"><span className="bd-icon">🧠</span> Psychometric Profiling</div>
              <div className="hero-badge"><span className="bd-icon">🗺️</span> Global Profile Architecture</div>
            </div>
          </div>
        </div>
      </div>
      <div className="seo-strip">
        <div className="container">
          <p>
            OmniQuest — India&apos;s premier <strong>global admissions strategy consultancy</strong> — specialises in
            Ivy League profile building, GMAT &amp; MBA consulting, and future-ready career strategy.
            Through psychometric intelligence and structured <strong>profile architecture</strong>, we help students
            secure admits at Harvard, MIT, Wharton, Oxford, and 200+ elite institutions worldwide.
            Trusted by 10,000+ students across India for <strong>study abroad consulting</strong>, UG admissions, and career strategy.
          </p>
        </div>
      </div>
    </section>
  );
}
