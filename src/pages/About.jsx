import React from 'react';
import {
  Leaf,
  Heart,
  Users,
  Target,
  MapPin,
  Instagram,
  ArrowRight,
  Sparkles,
  Globe,
  Recycle,
  TrendingUp,
  Calendar,
  Code,
  Palette,
  Search,
  Coffee,
  Star,
  Zap,
  ChevronRight,
  Award,
  Building2,
  Lightbulb,
} from 'lucide-react';

const teamMembers = [
  {
    name: 'Member 1',
    role: 'Project Lead',
    quote: 'Code is my superpower!',
    emoji: '🚀',
    icon: Code,
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.1)',
  },
  {
    name: 'Member 2',
    role: 'Frontend Dev',
    quote: 'Making pixels save the planet!',
    emoji: '🎨',
    icon: Palette,
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.1)',
  },
  {
    name: 'Member 3',
    role: 'UI/UX & Social',
    quote: 'If it\'s not on Instagram, did it even happen?',
    emoji: '📸',
    icon: Instagram,
    color: '#d946ef',
    bg: 'rgba(217,70,239,0.1)',
  },
  {
    name: 'Member 4',
    role: 'Research & Data',
    quote: 'Data doesn\'t lie — Ranchi needs TrashItt!',
    emoji: '📊',
    icon: Search,
    color: '#d97706',
    bg: 'rgba(217,119,6,0.1)',
  },
];

const timeline = [
  {
    date: 'January 2025',
    title: 'The Idea Was Born',
    desc: 'Four friends in a hostel room realized Ranchi deserves better waste management. The idea of TrashItt was born over chai at 2 AM.',
    emoji: '💡',
  },
  {
    date: 'March 2025',
    title: 'Research Phase',
    desc: 'Surveyed 50+ localities in Ranchi, documented waste patterns, and studied existing waste management infrastructure.',
    emoji: '🔍',
  },
  {
    date: 'June 2025',
    title: 'Development Begins',
    desc: 'Started building the TrashItt platform — AI scanner, waste guide, gamification system, and community features.',
    emoji: '⚡',
  },
  {
    date: 'October 2025',
    title: 'Beta Launch',
    desc: 'First beta version launched with 50 early adopters from BIT Mesra. Received incredible feedback and iterated rapidly.',
    emoji: '🚀',
  },
  {
    date: 'January 2026',
    title: 'Public Launch',
    desc: 'TrashItt officially launched for all citizens of Ranchi. 500+ users in the first week! Partnership with 3 NGOs.',
    emoji: '🎉',
  },
  {
    date: 'March 2026',
    title: 'Growing Strong',
    desc: '1,247 citizens joined, 5 active challenges, 12,450 KG waste segregated. TrashItt is now a movement!',
    emoji: '🌍',
  },
];

const ranchiFacts = [
  { label: 'Daily Waste', value: '400+', unit: 'Tons', icon: Recycle, color: '#dc2626' },
  { label: 'Population', value: '15L+', unit: 'People', icon: Users, color: '#2563eb' },
  { label: 'Waste Processed', value: '~40%', unit: 'Only', icon: TrendingUp, color: '#d97706' },
  { label: 'Landfill Sites', value: '2', unit: 'Overflowing', icon: MapPin, color: '#7c3aed' },
];

function About() {
  return (
    <div className="about-page page-wrapper">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-badge">
              <Sparkles size={14} />
              <span>Our Story</span>
            </div>
            <h1>
              We Are <span className="about-hero-green">TrashItt</span>
            </h1>
            <p className="about-hero-sub">
              Born in Ranchi. Built for India.
            </p>
            <p className="about-hero-desc">
              We're a team of passionate students who believe that technology
              can solve Ranchi's waste crisis. TrashItt is our answer —
              a smart, gamified waste segregation platform that makes
              recycling fun, rewarding, and impactful.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="container">
          <div className="about-mission-card">
            <div className="about-mission-icon-wrap">
              <Target size={32} />
            </div>
            <div className="about-mission-content">
              <h2>Our Mission</h2>
              <p>
                To revolutionize waste management in Ranchi through technology,
                community engagement, and gamification. We want every citizen
                of Ranchi to know exactly how to segregate their waste, feel
                rewarded for doing so, and be part of a movement that
                transforms our city into one of the cleanest in India.
              </p>
              <div className="about-mission-values">
                <div className="about-mission-value">
                  <Lightbulb size={18} />
                  <span>Educate</span>
                </div>
                <div className="about-mission-value">
                  <Recycle size={18} />
                  <span>Segregate</span>
                </div>
                <div className="about-mission-value">
                  <Heart size={18} />
                  <span>Motivate</span>
                </div>
                <div className="about-mission-value">
                  <Globe size={18} />
                  <span>Transform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ranchi */}
      <section className="about-ranchi">
        <div className="container">
          <div className="about-section-header">
            <div className="about-section-badge">
              <MapPin size={14} />
              <span>Why Ranchi?</span>
            </div>
            <h2>The Problem We're Solving</h2>
            <p>Ranchi's waste crisis in numbers — and why TrashItt exists</p>
          </div>

          <div className="about-ranchi-grid">
            {ranchiFacts.map((fact, i) => {
              const IconComp = fact.icon;
              return (
                <div
                  className="about-ranchi-card"
                  key={fact.label}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    '--fact-color': fact.color,
                  }}
                >
                  <div
                    className="about-ranchi-icon"
                    style={{ background: `${fact.color}12`, color: fact.color }}
                  >
                    <IconComp size={24} />
                  </div>
                  <div className="about-ranchi-value" style={{ color: fact.color }}>
                    {fact.value}
                  </div>
                  <div className="about-ranchi-unit">{fact.unit}</div>
                  <div className="about-ranchi-label">{fact.label}</div>
                </div>
              );
            })}
          </div>

          <div className="about-ranchi-text">
            <p>
              Ranchi produces over <strong>400 tons of waste daily</strong>, but only about
              40% is properly processed. The rest ends up in overflowing landfills,
              rivers, and streets. With a growing population of over 15 lakh people,
              this problem is only getting worse. TrashItt aims to change this by
              empowering citizens with knowledge, tools, and motivation to segregate
              waste at the source — where it matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="container">
          <div className="about-section-header">
            <div className="about-section-badge">
              <Calendar size={14} />
              <span>Our Journey</span>
            </div>
            <h2>From Idea to Impact</h2>
            <p>The TrashItt story — one milestone at a time</p>
          </div>

          <div className="about-timeline-list">
            {timeline.map((item, i) => (
              <div
                className="about-timeline-item"
                key={i}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="about-timeline-line">
                  <div className="about-timeline-dot">
                    <span>{item.emoji}</span>
                  </div>
                  {i < timeline.length - 1 && <div className="about-timeline-connector" />}
                </div>
                <div className="about-timeline-content">
                  <span className="about-timeline-date">{item.date}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="container">
          <div className="about-section-header">
            <div className="about-section-badge">
              <Users size={14} />
              <span>The Team</span>
            </div>
            <h2>Meet the Brains</h2>
            <p>Four students on a mission to make Ranchi cleaner</p>
          </div>

          <div className="about-team-grid">
            {teamMembers.map((member, i) => {
              const IconComp = member.icon;
              return (
                <div
                  className="about-team-card"
                  key={i}
                  style={{
                    '--member-color': member.color,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="about-team-avatar">
                    <span>{member.emoji}</span>
                  </div>
                  <h4 className="about-team-name">{member.name}</h4>
                  <span
                    className="about-team-role"
                    style={{ color: member.color, background: member.bg }}
                  >
                    {member.role}
                  </span>
                  <div
                    className="about-team-icon-wrap"
                    style={{ background: member.bg, color: member.color }}
                  >
                    <IconComp size={20} />
                  </div>
                  <p className="about-team-quote">"{member.quote}"</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hostel Story */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-card">
            <div className="about-story-glow" />
            <div className="about-story-content">
              <Coffee size={32} className="about-story-icon" />
              <h3>The Hostel Room Story</h3>
              <p>
                It all started in a cramped hostel room at 2 AM. Four friends,
                exhausted from assignments, were sipping chai and complaining
                about the overflowing dustbins outside their window. "Why can't
                someone just make an app that tells people where to throw their
                waste?" one of us joked. But the joke stuck. We couldn't sleep
                that night — not because of the chai, but because we realized
                WE could be that "someone." We opened our laptops, started
                sketching wireframes on the back of old assignment papers, and
                by sunrise, TrashItt had a name, a logo, and a mission. What
                started as a midnight rant became a platform that now serves
                over 1,200 citizens of Ranchi. Turns out, the best ideas really
                do come at 2 AM — with the right amount of chai and frustration.
              </p>
              <div className="about-story-signature">
                — Team TrashItt, Hostel Room 304 ☕🌿
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="about-instagram">
        <div className="container">
          <div className="about-insta-card">
            <div className="about-insta-content">
              <Instagram size={36} className="about-insta-icon" />
              <h3>Follow Us on Instagram</h3>
              <p>
                Stay updated with the latest challenges, community stories,
                cleanup drives, and green tips from TrashItt!
              </p>
              <a
                href="https://instagram.com/trashitt_official"
                target="_blank"
                rel="noopener noreferrer"
                className="about-insta-btn"
              >
                <Instagram size={18} />
                <span>@trashitt_official</span>
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="about-insta-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div className="about-insta-thumb" key={n}>
                  <img
                    src={`https://picsum.photos/seed/insta${n}/200/200`}
                    alt={`Instagram post ${n}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="about-vision">
        <div className="container">
          <div className="about-vision-card">
            <div className="about-vision-glow" />
            <div className="about-vision-content">
              <Globe size={36} />
              <h2>Our Vision for India</h2>
              <p>
                TrashItt started in Ranchi, but our vision is much bigger. We dream
                of a day when every city, town, and village in India has access to
                smart waste segregation tools. We want to build a nationwide network
                of eco-warriors who take pride in keeping their surroundings clean.
                From Ranchi to the rest of Jharkhand, from Jharkhand to all of India
                — TrashItt is just getting started. If we can change one city, we can
                change a nation. And if we can change a nation, we can change the world.
              </p>
              <div className="about-vision-roadmap">
                <div className="about-vision-step about-vision-step-done">
                  <CheckMark />
                  <span>Ranchi</span>
                </div>
                <div className="about-vision-arrow">
                  <ChevronRight size={16} />
                </div>
                <div className="about-vision-step">
                  <div className="about-vision-dot" />
                  <span>Jharkhand</span>
                </div>
                <div className="about-vision-arrow">
                  <ChevronRight size={16} />
                </div>
                <div className="about-vision-step">
                  <div className="about-vision-dot" />
                  <span>East India</span>
                </div>
                <div className="about-vision-arrow">
                  <ChevronRight size={16} />
                </div>
                <div className="about-vision-step">
                  <div className="about-vision-dot" />
                  <span>All India 🇮🇳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-page {
          padding-top: var(--navbar-height);
          animation: fadeInUp 0.5s ease forwards;
        }

        /* ========== HERO ========== */
        .about-hero {
          position: relative;
          padding: 80px 0 64px;
          background: linear-gradient(135deg, #064e2b, #0a6e3a, #0d9488);
          overflow: hidden;
          text-align: center;
        }

        .about-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 40%, rgba(132,204,22,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 60%, rgba(255,255,255,0.05) 0%, transparent 50%);
        }

        .about-hero-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto;
          color: #ffffff;
        }

        .about-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 9999px;
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 20px;
        }

        .about-hero h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 6vw, 3.5rem);
          color: #ffffff;
          margin-bottom: 12px;
        }

        .about-hero-green {
          color: var(--lime);
        }

        .about-hero-sub {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 1.3rem;
          color: rgba(255,255,255,0.85);
          margin-bottom: 16px;
        }

        .about-hero-desc {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto;
        }

        /* ========== MISSION ========== */
        .about-mission {
          padding: 80px 0;
        }

        .about-mission-card {
          display: flex;
          align-items: flex-start;
          gap: 32px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px;
        }

        .about-mission-icon-wrap {
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(22,163,74,0.1);
          color: var(--green);
          border-radius: 18px;
          flex-shrink: 0;
        }

        .about-mission-content {
          flex: 1;
        }

        .about-mission-content h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          margin-bottom: 14px;
        }

        .about-mission-content p {
          font-size: 1rem;
          color: var(--text2);
          line-height: 1.8;
          margin-bottom: 24px;
        }

        .about-mission-values {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .about-mission-value {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(22,163,74,0.06);
          border: 1px solid rgba(22,163,74,0.12);
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--green);
        }

        /* ========== SECTION HEADER ========== */
        .about-section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .about-section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(22,163,74,0.1);
          color: var(--green);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }

        .about-section-header h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          margin-bottom: 8px;
        }

        .about-section-header p {
          color: var(--muted);
          font-size: 0.95rem;
        }

        /* ========== WHY RANCHI ========== */
        .about-ranchi {
          padding: 80px 0;
          background: var(--bg2);
        }

        .about-ranchi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .about-ranchi-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .about-ranchi-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--fact-color);
        }

        .about-ranchi-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-ranchi-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          line-height: 1;
        }

        .about-ranchi-unit {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--muted);
        }

        .about-ranchi-label {
          font-size: 0.88rem;
          color: var(--text2);
          font-weight: 500;
        }

        .about-ranchi-text {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }

        .about-ranchi-text p {
          font-size: 1rem;
          color: var(--text2);
          line-height: 1.8;
        }

        .about-ranchi-text strong {
          color: var(--text);
        }

        /* ========== TIMELINE ========== */
        .about-timeline {
          padding: 80px 0;
        }

        .about-timeline-list {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .about-timeline-item {
          display: flex;
          gap: 24px;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .about-timeline-line {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 48px;
        }

        .about-timeline-dot {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--card);
          border: 2px solid var(--green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
          z-index: 1;
        }

        .about-timeline-connector {
          width: 2px;
          flex: 1;
          background: var(--border);
          min-height: 40px;
        }

        .about-timeline-content {
          padding-bottom: 36px;
          flex: 1;
        }

        .about-timeline-date {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--green);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: block;
          margin-bottom: 6px;
        }

        .about-timeline-content h4 {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          margin-bottom: 8px;
          color: var(--text);
        }

        .about-timeline-content p {
          font-size: 0.92rem;
          color: var(--muted);
          line-height: 1.7;
        }

        /* ========== TEAM ========== */
        .about-team {
          padding: 80px 0;
          background: var(--bg2);
        }

        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .about-team-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 32px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .about-team-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--member-color);
        }

        .about-team-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--bg2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border: 3px solid var(--border);
        }

        .about-team-card:hover .about-team-avatar {
          border-color: var(--member-color);
        }

        .about-team-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          color: var(--text);
        }

        .about-team-role {
          font-size: 0.78rem;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: 9999px;
        }

        .about-team-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-team-quote {
          font-size: 0.85rem;
          color: var(--muted);
          font-style: italic;
          line-height: 1.5;
        }

        /* ========== STORY ========== */
        .about-story {
          padding: 80px 0;
        }

        .about-story-card {
          background: linear-gradient(135deg, #1a0f05, #2d1a0a, #3d2510);
          border-radius: 24px;
          padding: 56px;
          position: relative;
          overflow: hidden;
        }

        .about-story-glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .about-story-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          color: #ffffff;
        }

        .about-story-icon {
          color: #d97706;
          margin-bottom: 16px;
        }

        .about-story-content h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .about-story-content p {
          font-size: 1rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.9;
          margin-bottom: 20px;
        }

        .about-story-signature {
          font-style: italic;
          color: #d97706;
          font-size: 0.95rem;
          font-weight: 600;
        }

        /* ========== INSTAGRAM ========== */
        .about-instagram {
          padding: 80px 0;
          background: var(--bg2);
        }

        .about-insta-card {
          display: flex;
          align-items: center;
          gap: 48px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px;
        }

        .about-insta-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .about-insta-icon {
          color: #e1306c;
        }

        .about-insta-content h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
        }

        .about-insta-content p {
          font-size: 0.95rem;
          color: var(--muted);
          line-height: 1.7;
        }

        .about-insta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #e1306c, #c13584, #833ab4);
          color: #ffffff;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          width: fit-content;
          box-shadow: 0 4px 16px rgba(225,48,108,0.3);
        }

        .about-insta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(225,48,108,0.4);
        }

        .about-insta-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          flex-shrink: 0;
          width: 280px;
        }

        .about-insta-thumb {
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
        }

        .about-insta-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .about-insta-thumb:hover img {
          transform: scale(1.1);
        }

        /* ========== VISION ========== */
        .about-vision {
          padding: 80px 0 100px;
        }

        .about-vision-card {
          background: linear-gradient(135deg, #064e2b, #0a6e3a, #0d7c42);
          border-radius: 24px;
          padding: 56px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .about-vision-glow {
          position: absolute;
          bottom: -80px;
          left: -80px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(132,204,22,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .about-vision-content {
          position: relative;
          z-index: 1;
          color: #ffffff;
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .about-vision-content svg {
          color: var(--lime);
        }

        .about-vision-content h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          color: #ffffff;
        }

        .about-vision-content p {
          font-size: 1rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.8;
          margin-bottom: 8px;
        }

        .about-vision-roadmap {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }

        .about-vision-step {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #ffffff;
        }

        .about-vision-step-done {
          background: rgba(132,204,22,0.2);
          border-color: rgba(132,204,22,0.3);
          color: var(--lime);
        }

        .about-vision-dot {
          width: 8px;
          height: 8px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
        }

        .about-vision-arrow {
          color: rgba(255,255,255,0.3);
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .about-ranchi-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-team-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-insta-card {
            flex-direction: column;
          }

          .about-insta-grid {
            width: 100%;
            max-width: 320px;
          }
        }

        @media (max-width: 768px) {
          .about-hero {
            padding: 56px 0 48px;
          }

          .about-hero h1 {
            font-size: 2rem;
          }

          .about-mission,
          .about-ranchi,
          .about-timeline,
          .about-team,
          .about-story,
          .about-instagram,
          .about-vision {
            padding: 56px 0;
          }

          .about-mission-card {
            flex-direction: column;
            padding: 28px;
          }

          .about-ranchi-grid,
          .about-team-grid {
            grid-template-columns: 1fr;
          }

          .about-story-card,
          .about-vision-card {
            padding: 32px 20px;
          }

          .about-insta-card {
            padding: 28px;
          }

          .about-mission-values {
            justify-content: center;
          }

          .about-timeline-item {
            gap: 16px;
          }

          .about-timeline-line {
            width: 36px;
          }

          .about-timeline-dot {
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }

          .about-vision-roadmap {
            gap: 8px;
          }

          .about-vision-step {
            padding: 6px 14px;
            font-size: 0.8rem;
          }

          .about-vision-content h2 {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 480px) {
          .about-hero h1 {
            font-size: 1.6rem;
          }

          .about-hero-sub {
            font-size: 1.05rem;
          }

          .about-mission-content h2 {
            font-size: 1.3rem;
          }

          .about-mission-value {
            padding: 8px 14px;
            font-size: 0.82rem;
          }

          .about-team-card {
            padding: 24px 18px;
          }

          .about-team-avatar {
            width: 60px;
            height: 60px;
            font-size: 1.6rem;
          }

          .about-insta-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }

          .about-vision-roadmap {
            flex-direction: column;
          }

          .about-vision-arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}

function CheckMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default About;