import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowUpRight,
  Menu,
  X,
  Youtube,
  Instagram,
  Linkedin,
  Github,
} from 'lucide-react';

// Profile & Project assets
import avatarImg from './assets/images/surendra_profile.png';
import rakshaShastraImg from './assets/images/raksha_shastra_banner_1793121412707.jpg';
import mailTraceImg from './assets/images/mailtrace_ai_preview_1793121412032.jpg';

export default function App() {
  // Navigation & UI state
  const [activeSection, setActiveSection] = useState<string>('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Steps interactive state
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Projects accordion state
  const [openProjects, setOpenProjects] = useState<{ [key: string]: boolean }>({
    'mailtrace-ai': true,
    'password-checker': false,
  });

  // Password analyzer demo
  const [testPassword, setTestPassword] = useState('Secur!ty#2026');
  const [showPassword, setShowPassword] = useState(false);

  // Toggle project accordion
  const toggleProject = (key: string) => {
    setOpenProjects((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Scrollspy Intersection Observer
  useEffect(() => {
    const sectionIds = [
      'top',
      'about',
      'raksha-shastra',
      'how',
      'projects',
      'skills',
      'experience',
      'certifications',
      'elsewhere',
      'contact',
    ];

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });

    return () => navObserver.disconnect();
  }, []);



  // Calculate password strength entropy metrics
  const analyzePassword = (pwd: string) => {
    const len = pwd.length;
    let poolSize = 0;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 33;

    if (poolSize === 0 || len === 0) {
      return {
        entropy: 0,
        label: 'Empty',
        color: '#9AA3B6',
        crackTime: 'Instant',
        checks: { length: false, upper: false, lower: false, number: false, symbol: false },
      };
    }

    const entropy = Math.round(len * Math.log2(poolSize));
    const checks = {
      length: len >= 12,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      symbol: /[^a-zA-Z0-9]/.test(pwd),
    };

    let label = 'Very Weak';
    let color = '#f87171';
    let crackTime = '< 1 second';

    if (entropy > 75) {
      label = 'Very Strong';
      color = '#4ade80';
      crackTime = 'Centuries (Resistant to modern GPU clusters)';
    } else if (entropy > 55) {
      label = 'Strong';
      color = '#F2B134';
      crackTime = 'Several decades';
    } else if (entropy > 35) {
      label = 'Moderate';
      color = '#fbbf24';
      crackTime = 'Hours to days';
    } else {
      label = 'Weak';
      color = '#f87171';
      crackTime = 'Seconds to minutes';
    }

    return { entropy, label, color, crackTime, checks };
  };

  const passwordAnalysis = useMemo(() => analyzePassword(testPassword), [testPassword]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Header */}
      <header className="site-header">
        <div className="wrap site-nav">
          <a className="brand font-sans-custom" href="#top">
            <span className="brand-badge">SD</span>
            <span>Surendra Deshnoor</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:block" aria-label="Sections">
            <ul>
              <li>
                <a href="#about" aria-current={activeSection === 'about' ? 'true' : undefined}>
                  About
                </a>
              </li>
              <li>
                <a href="#raksha-shastra" aria-current={activeSection === 'raksha-shastra' ? 'true' : undefined}>
                  Raksha Shastra
                </a>
              </li>
              <li>
                <a href="#projects" aria-current={activeSection === 'projects' || activeSection === 'github' ? 'true' : undefined}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" aria-current={activeSection === 'skills' ? 'true' : undefined}>
                  Skills
                </a>
              </li>
              <li>
                <a href="#experience" aria-current={activeSection === 'experience' || activeSection === 'certifications' ? 'true' : undefined}>
                  Experience
                </a>
              </li>
              <li>
                <a href="#contact" aria-current={activeSection === 'contact' ? 'true' : undefined}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Trigger */}
            <button
              type="button"
              className="md:hidden p-2 text-[#ECE8DE] hover:text-[#F2B134] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#252D40] bg-[#0E1320] px-6 py-4">
            <nav className="flex flex-col gap-3">
              {[
                { href: '#about', label: 'About' },
                { href: '#raksha-shastra', label: 'Raksha Shastra' },
                { href: '#projects', label: 'Projects' },
                { href: '#skills', label: 'Skills' },
                { href: '#experience', label: 'Experience & Certifications' },
                { href: '#contact', label: 'Contact' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans-custom text-base py-1.5 text-[#9AA3B6] hover:text-[#ECE8DE] border-b border-[#252D40]/40"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main" className="wrap">
        {/* Hero Section */}
        <section className="hero" id="top">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10 mb-8">
            <h1 className="hero-name !mb-0">
              <span className="hero-line">
                <span>Surendra</span>
              </span>
              <span className="hero-line">
                <span>Deshnoor</span>
              </span>
            </h1>

            {/* Profile Avatar Card beside name with clear look */}
            <div className="shrink-0 flex items-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-2xl overflow-hidden border-2 border-[#252D40] bg-[#141b2c] shadow-2xl">
                <img
                  src={avatarImg}
                  alt="Surendra Deshnoor"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <div className="hero-meta">
            <p className="hero-role">
              Cybersecurity trainee at Torii Minds, working on penetration testing, AI security and application security. I like to build the thing first, then see how it breaks.
            </p>
            <div className="hero-aside">
              <p className="hero-place">Bengaluru, Karnataka, India</p>
              <ul className="hero-links">
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#raksha-shastra">Raksha Shastra</a>
                </li>
                <li>
                  <a href="#contact">Email</a>
                </li>
                <li>
                  <a
                    href="https://github.com/surendra-deshnoor"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1"
                  >
                    GitHub
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/surendra-deshnoor-074690373/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1"
                  >
                    LinkedIn
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section" id="about">
          <h2 className="section-title">About</h2>
          <div className="section-body">
            <p className="lede">
              I am studying for a B.E. in Computer Science and Engineering, focused on IoT and cybersecurity with blockchain technology, at Nagarjuna College of Engineering and Technology in Bengaluru.
            </p>
            <p>
              My interest is in how systems get attacked, how weaknesses are found through authorized testing, and how to make what people run harder to break. Lately that means the security of applications built on large language models.
            </p>
            <p>
              I also want security to make sense to students and people outside tech. Everyone should know the common threats and how to protect themselves, not only the specialists.
            </p>

            <h3 className="subhead">What I focus on</h3>
            <ul className="plain-list two-col">
              <li>Penetration testing and ethical hacking</li>
              <li>AI and LLM security</li>
            </ul>
          </div>
        </section>

        {/* Raksha Shastra Spotlight Section */}
        <section className="section" id="raksha-shastra">
          <h2 className="section-title">Raksha Shastra</h2>
          <div className="section-body">
            <div className="mb-6 rounded-lg overflow-hidden border border-[#252D40] bg-[#141b2c]">
              <img
                src={rakshaShastraImg}
                alt="Raksha Shastra - Cyber Defense and Intelligence"
                className="w-full h-auto max-h-72 object-cover"
                loading="lazy"
              />
            </div>

            <p className="lede">
              <strong>Raksha Shastra (सुरक्षा शास्त्र)</strong> is my security education initiative dedicated to democratizing cyber defense knowledge for students, developers, and non-specialists across India.
            </p>

            <p>
              Security shouldn't remain an esoteric mystery locked inside enterprise SOC rooms. Through hands-on video breakdowns, visual attack dissections, and practical mitigation checklists, Raksha Shastra covers real-world threat actors, scam prevention, password hygiene, and AI security governance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <a
                href="https://www.youtube.com/@rakshashastra"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded border border-[#252D40] bg-[#141b2c]/80 hover:border-[#F2B134] transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Youtube className="w-5 h-5 text-[#f87171] group-hover:scale-110 transition-transform" />
                  <span className="font-sans-custom font-bold text-sm text-[#ECE8DE]">YouTube Channel</span>
                </div>
                <p className="text-xs text-[#9AA3B6] mb-0">
                  Video lessons, vulnerability demonstrations, and Hindi/English cyber defense guides.
                </p>
                <span className="mt-2 text-xs font-mono-custom text-[#F2B134] inline-flex items-center gap-1">
                  @rakshashastra <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>

              <a
                href="https://www.instagram.com/raksha_shastra/"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded border border-[#252D40] bg-[#141b2c]/80 hover:border-[#F2B134] transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Instagram className="w-5 h-5 text-[#F2B134] group-hover:scale-110 transition-transform" />
                  <span className="font-sans-custom font-bold text-sm text-[#ECE8DE]">Instagram Guides</span>
                </div>
                <p className="text-xs text-[#9AA3B6] mb-0">
                  Bite-sized infographics on smishing, QR code frauds, and everyday account hardening.
                </p>
                <span className="mt-2 text-xs font-mono-custom text-[#F2B134] inline-flex items-center gap-1">
                  @raksha_shastra <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* How I work Section */}
        <section className="section" id="how">
          <h2 className="section-title">How I work</h2>
          <div className="section-body">
            <p>The order is the philosophy. Each step feeds the next.</p>
            <ol className="steps">
              {[
                {
                  word: 'Learn',
                  body: 'Certifications and hands-on training, from Google Cloud security operations to bug bounty methods.',
                },
                {
                  word: 'Build',
                  body: 'Small tools that teach, such as a password strength and data breach checker, and MailTrace AI for email threats.',
                },
                {
                  word: 'Break',
                  body: 'Authorized testing of systems and applications, to see the way an attacker would.',
                },
                {
                  word: 'Understand',
                  body: 'Working out why a weakness exists, not only how to use it or how to patch it.',
                },
                {
                  word: 'Secure',
                  body: 'Turning findings into fixes and assessments that teams can act on.',
                },
                {
                  word: 'Share',
                  body: 'Making security knowledge available to students and beginners.',
                },
              ].map((step, idx) => (
                <li
                  key={step.word}
                  className={`step ${activeStep === idx ? 'is-current' : ''}`}
                  onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <span className="step-word">{step.word}</span>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section" id="projects">
          <h2 className="section-title">Projects</h2>
          <div className="section-body">
            <ul className="project-list">
              {/* Project 1: MailTrace AI */}
              <li className={`project ${openProjects['mailtrace-ai'] ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="project-summary"
                  onClick={() => toggleProject('mailtrace-ai')}
                  aria-expanded={openProjects['mailtrace-ai']}
                >
                  <div>
                    <div className="project-name">MailTrace AI</div>
                    <div className="project-tags">AI, phishing detection, threat intelligence</div>
                  </div>
                  <div className="project-summary-icon" aria-hidden="true">
                    <span className="project-summary-cross" />
                  </div>
                </button>

                {openProjects['mailtrace-ai'] && (
                  <div className="project-body">
                    <div className="mb-4 rounded border border-[#252D40] overflow-hidden">
                      <img
                        src={mailTraceImg}
                        alt="MailTrace AI Forensic Engine Architecture"
                        className="w-full h-auto max-h-64 object-cover"
                        loading="lazy"
                      />
                    </div>

                    <p>
                      An AI-powered email threat detection and forensic intelligence platform. It explores phishing detection, email analysis and threat intelligence.
                    </p>
                  </div>
                )}
              </li>

              {/* Project 2: Password Strength */}
              <li className={`project ${openProjects['password-checker'] ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="project-summary"
                  onClick={() => toggleProject('password-checker')}
                  aria-expanded={openProjects['password-checker']}
                >
                  <div>
                    <div className="project-name">Password Strength and Data Breach Checker</div>
                    <div className="project-tags">Password security, data breaches</div>
                  </div>
                  <div className="project-summary-icon" aria-hidden="true">
                    <span className="project-summary-cross" />
                  </div>
                </button>

                {openProjects['password-checker'] && (
                  <div className="project-body">
                    <p>Built to help users understand password security.</p>
                    <p>
                      <a
                        href="https://github.com/surendra-deshnoor"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans-custom font-semibold"
                      >
                        Source code on GitHub
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </p>

                    {/* Interactive Password Analyzer preview */}
                    <div className="interactive-lab">
                      <div className="flex items-center justify-between mb-3 border-b border-[#252D40] pb-2">
                        <div className="flex items-center gap-2 text-xs font-mono-custom text-[#F2B134]">
                          <ShieldCheck className="w-4 h-4" />
                          <span>INTERACTIVE ENTROPY LAB</span>
                        </div>
                        <span className="text-xs font-mono-custom text-[#9AA3B6]">Client-Side Only</span>
                      </div>

                      <div className="mb-3">
                        <label className="block text-xs font-sans-custom text-[#9AA3B6] mb-1.5">
                          Test a candidate password string:
                        </label>
                        <div className="relative flex items-center">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={testPassword}
                            onChange={(e) => setTestPassword(e.target.value)}
                            className="w-full bg-[#0E1320] border border-[#252D40] text-[#ECE8DE] px-3 py-2 pr-10 rounded font-mono-custom text-sm focus:outline-none focus:border-[#F2B134]"
                            placeholder="Type a password..."
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 text-[#9AA3B6] hover:text-[#ECE8DE]"
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono-custom mb-3 bg-[#0E1320]/60 p-2.5 rounded border border-[#252D40]">
                        <div>
                          <span className="text-[#9AA3B6]">Entropy Score: </span>
                          <span className="text-[#ECE8DE] font-semibold tabular-nums">
                            {passwordAnalysis.entropy} bits
                          </span>
                        </div>
                        <div>
                          <span className="text-[#9AA3B6]">Rating: </span>
                          <span style={{ color: passwordAnalysis.color }} className="font-semibold">
                            {passwordAnalysis.label}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[#9AA3B6]">Brute Force Time: </span>
                          <span className="text-[#ECE8DE]">{passwordAnalysis.crackTime}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[11px] font-sans-custom text-[#9AA3B6]">
                        <span className={passwordAnalysis.checks.length ? 'text-[#4ade80]' : 'text-[#9AA3B6]'}>
                          {passwordAnalysis.checks.length ? '✓ 12+ chars' : '○ 12+ chars'}
                        </span>
                        <span className="text-[#252D40]">·</span>
                        <span className={passwordAnalysis.checks.upper ? 'text-[#4ade80]' : 'text-[#9AA3B6]'}>
                          {passwordAnalysis.checks.upper ? '✓ Uppercase' : '○ Uppercase'}
                        </span>
                        <span className="text-[#252D40]">·</span>
                        <span className={passwordAnalysis.checks.lower ? 'text-[#4ade80]' : 'text-[#9AA3B6]'}>
                          {passwordAnalysis.checks.lower ? '✓ Lowercase' : '○ Lowercase'}
                        </span>
                        <span className="text-[#252D40]">·</span>
                        <span className={passwordAnalysis.checks.number ? 'text-[#4ade80]' : 'text-[#9AA3B6]'}>
                          {passwordAnalysis.checks.number ? '✓ Number' : '○ Number'}
                        </span>
                        <span className="text-[#252D40]">·</span>
                        <span className={passwordAnalysis.checks.symbol ? 'text-[#4ade80]' : 'text-[#9AA3B6]'}>
                          {passwordAnalysis.checks.symbol ? '✓ Special Symbol' : '○ Special Symbol'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </li>

            </ul>
          </div>
        </section>



        {/* Skills Section */}
        <section className="section" id="skills">
          <h2 className="section-title">Skills</h2>
          <div className="section-body skill-cols">
            <div>
              <h3>Security</h3>
              <ul className="plain-list">
                <li>Penetration testing</li>
                <li>Ethical hacking</li>
                <li>Vulnerability assessment</li>
                <li>Threat detection</li>
                <li>Security automation</li>
              </ul>
            </div>
            <div>
              <h3>AI security</h3>
              <ul className="plain-list">
                <li>LLM and AI application security</li>
                <li>AI security and governance</li>
                <li>AI for risk management</li>
                <li>Global AI laws and compliance</li>
              </ul>
            </div>
            <div>
              <h3>Foundations</h3>
              <ul className="plain-list">
                <li>Application and web security</li>
                <li>Networking</li>
                <li>Programming (Python, JS/TS)</li>
                <li>Security fundamentals</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experience and Education Section */}
        <section className="section" id="experience">
          <h2 className="section-title">Experience and education</h2>
          <div className="section-body">
            <article className="entry">
              <h3>Cybersecurity trainee</h3>
              <p className="entry-meta">Torii Minds, 2025 to present</p>
              <p>Hands-on training in penetration testing, AI security and application security.</p>
            </article>

            <article className="entry">
              <h3>B.E. Computer Science and Engineering</h3>
              <p className="entry-meta">
                Nagarjuna College of Engineering and Technology, Bengaluru, currently pursuing
              </p>
              <p>Specialization in IoT and cybersecurity with blockchain technology.</p>
            </article>

            <article className="entry">
              <h3>Pre-University, Science</h3>
              <p className="entry-meta">Alva's College, Moodabidri, Karnataka</p>
            </article>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="section" id="certifications">
          <h2 className="section-title">Certifications</h2>
          <div className="section-body">
            <ul className="plain-list">
              <li className="flex items-center justify-between">
                <span>Cyber job simulation</span>
                <span className="text-xs text-[#9AA3B6] font-mono-custom">Verified</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Google Cloud Chronicle Security Operations Platform Fundamentals</span>
                <span className="text-xs text-[#9AA3B6] font-mono-custom">Google Cloud</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Introduction to Bug Bounty</span>
                <span className="text-xs text-[#9AA3B6] font-mono-custom">Hands-on</span>
              </li>
              <li className="flex items-center justify-between">
                <span>AI Security and Governance</span>
                <span className="text-xs text-[#9AA3B6] font-mono-custom">Governance & Risk</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Elsewhere Section */}
        <section className="section" id="elsewhere">
          <h2 className="section-title">Elsewhere</h2>
          <div className="section-body">
            <p>
              Education content goes out under the Raksha Shastra name, on YouTube and Instagram. Code lives on GitHub, and professional updates are on LinkedIn.
            </p>
            <ul className="link-rows">
              <li>
                <a
                  href="https://www.youtube.com/@rakshashastra"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Youtube className="w-4 h-4 text-[#f87171]" />
                  <span>YouTube</span>
                </a>
                <span>@rakshashastra</span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/raksha_shastra/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="w-4 h-4 text-[#F2B134]" />
                  <span>Instagram</span>
                </a>
                <span>@raksha_shastra</span>
              </li>
              <li>
                <a
                  href="https://x.com/SurendraDe35pz"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="font-bold text-xs font-mono-custom">𝕏</span>
                  <span>X (Twitter)</span>
                </a>
                <span>@SurendraDe35pz</span>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/surendra-deshnoor-074690373/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="w-4 h-4 text-[#60a5fa]" />
                  <span>LinkedIn</span>
                </a>
                <span>Surendra Deshnoor</span>
              </li>
              <li>
                <a
                  href="https://github.com/surendra-deshnoor"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="w-4 h-4 text-[#ECE8DE]" />
                  <span>GitHub</span>
                </a>
                <span>surendra-deshnoor</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section" id="contact">
          <h2 className="section-title">Contact</h2>
          <div className="section-body">
            <p className="lede">
              Open to conversations with security professionals, AI security researchers, educators and teams doing responsible security work.
            </p>
            <a className="email-big" href="mailto:surendradeshanur01@gmail.com">
              surendradeshanur01@gmail.com
            </a>
            <div className="mt-4">
              <a
                href="https://www.linkedin.com/in/surendra-deshnoor-074690373/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-sans-custom font-semibold text-[#9AA3B6] hover:text-[#ECE8DE]"
              >
                Connect on LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#252D40] py-8 mt-12">
        <div className="wrap text-left">
          <p className="!mb-0 text-sm font-sans-custom text-[#ECE8DE]/90">
            &copy; 2026 Surendra Deshnoor
          </p>
          <p className="!mb-0 text-xs font-sans-custom text-[#9AA3B6] mt-1">
            Built with code and curiosity.
          </p>
        </div>
      </footer>
    </>
  );
}
