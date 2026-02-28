type PortfolioMode = "default" | "upwork";

type PortfolioPageProps = {
  mode?: PortfolioMode;
};

const navigation = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    title: "SaaS Product Dashboard",
    description:
      "A conversion-focused analytics dashboard with role-based access, charting, and strong loading performance.",
  },
  {
    title: "Commerce Storefront",
    description:
      "A mobile-first ecommerce experience with frictionless checkout, reusable UI blocks, and SEO-driven content pages.",
  },
  {
    title: "Internal Ops Platform",
    description:
      "An internal tool that streamlined workflows through clear information architecture and reliable component patterns.",
  },
];

const skills = [
  {
    title: "Frontend Architecture",
    description: "Scalable React and Next.js systems with maintainable patterns and predictable growth paths.",
  },
  {
    title: "Interface Design",
    description: "Purposeful visual design, responsive behavior, and strong accessibility across phone and tablet breakpoints.",
  },
  {
    title: "Performance & Quality",
    description: "Fast page loads, measurable quality checks, and production-ready standards for long-term product health.",
  },
];

const results = [
  { value: "200%+", label: "Engagement Lift" },
  { value: "3.5x", label: "Faster Delivery" },
  { value: "100+", label: "Shipped Features" },
];

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="section-heading">
      <span className="section-line" aria-hidden="true" />
      <h2>{title}</h2>
      <span className="section-line" aria-hidden="true" />
    </div>
  );
}

export function PortfolioPage({ mode = "default" }: PortfolioPageProps) {
  const isUpworkMode = mode === "upwork";

  return (
    <div className="portfolio-page">
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#home" className="brand">
            KT | Portfolio
          </a>
          <nav aria-label="Top menu">
            <ul className="top-menu">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {isUpworkMode ? (
        <div className="upwork-banner-wrap">
          <div className="container upwork-banner" role="status" aria-live="polite">
            <strong>Upwork Notice:</strong>
            <span>Communication for this opportunity is handled on Upwork until contract start.</span>
          </div>
        </div>
      ) : null}

      <main className="container page-main">
        <section id="home" className="section hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1>Home</h1>
              <p className="hero-title">
                Build Products With <span>Clarity</span>, Speed, and a Premium User Experience
              </p>
              <p className="hero-body">
                I design and develop high-impact web experiences focused on performance, visual polish, and measurable
                business outcomes.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#contact">
                  Start a Project
                </a>
                <a className="button-secondary" href="#projects">
                  View Work
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="screen">
                <div className="screen-toolbar" />
                <div className="screen-content">
                  <div className="line line-wide" />
                  <div className="line line-mid" />
                  <div className="line line-wide" />
                  <div className="line line-narrow" />
                </div>
              </div>
              <div className="laptop-base" />
              <div className="floating-chip chip-roi">ROI</div>
              <div className="floating-chip chip-growth">+Growth</div>
              <div className="floating-chip chip-speed">Fast</div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <SectionHeading title="About" />
          <p className="section-intro">
            I am a frontend-focused developer with a product mindset, building polished digital experiences from
            concept to launch.
          </p>
          <div className="about-panel">
            <article className="soft-card">
              <h3>Approach</h3>
              <p>
                I combine clean engineering practices with thoughtful UI direction so each release feels intentional,
                stable, and easy to evolve.
              </p>
            </article>
            <article className="soft-card">
              <h3>Focus</h3>
              <p>
                I prioritize responsive behavior, accessibility, and maintainable architecture to keep products fast
                and reliable over time.
              </p>
            </article>
          </div>
        </section>

        <section id="projects" className="section">
          <SectionHeading title="Projects" />
          <p className="section-intro">Selected portfolio work with measurable goals, delivery quality, and impact.</p>
          <div className="card-grid">
            {projects.map((project) => (
              <article key={project.title} className="feature-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <SectionHeading title="Skills" />
          <p className="section-intro">Core capabilities used to ship production-ready products with confidence.</p>
          <div className="card-grid">
            {skills.map((skill) => (
              <article key={skill.title} className="feature-card">
                <div className="skill-dot" aria-hidden="true" />
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <SectionHeading title="Experience" />
          <p className="section-intro">Delivery results across product teams and real-world production environments.</p>
          <div className="results-panel">
            <div className="results-grid">
              {results.map((result) => (
                <article key={result.label} className="result-item">
                  <h3>{result.value}</h3>
                  <p>{result.label}</p>
                </article>
              ))}
            </div>
            <div className="chart-overlay" aria-hidden="true" />
          </div>
        </section>

        <section id="contact" className="section">
          <SectionHeading title="Contact" />
          {isUpworkMode ? (
            <div className="contact-panel">
              <p>
                To keep communication compliant before contract start, please message me directly through Upwork for
                project discussions.
              </p>
              <p className="upwork-safe-badge">Upwork messages only</p>
            </div>
          ) : (
            <div className="contact-panel">
              <p>
                Open to freelance, contract, and full-time opportunities. Let us build a product experience that
                performs as well as it looks.
              </p>
              <a className="button-primary" href="mailto:hello@example.com">
                Contact Me
              </a>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">© {new Date().getFullYear()} Kahlil Portfolio. All rights reserved.</div>
      </footer>
    </div>
  );
}
