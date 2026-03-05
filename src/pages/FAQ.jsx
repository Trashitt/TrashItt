import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  Recycle,
  Star,
  Trophy,
  Users,
  MessageCircle,
  Mail,
  Instagram,
  ArrowRight,
  BookOpen,
  ScanLine,
  Shield,
  Heart,
  Leaf,
} from 'lucide-react';

const faqCategories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'general', label: 'General', icon: HelpCircle },
  { id: 'points', label: 'Points & Badges', icon: Star },
  { id: 'waste', label: 'Waste Guide', icon: Recycle },
  { id: 'challenges', label: 'Challenges', icon: Trophy },
  { id: 'community', label: 'NGO & Community', icon: Users },
];

const faqs = [
  {
    id: 1,
    category: 'general',
    question: 'What is TrashItt?',
    answer: 'TrashItt is a smart waste segregation and recycling platform built for the citizens of Ranchi, Jharkhand. It helps you identify waste types using AI, learn correct disposal methods, earn green points, join challenges, and be part of a community making Ranchi cleaner. Think of it as your personal waste management companion!',
  },
  {
    id: 2,
    category: 'general',
    question: 'Is TrashItt free to use?',
    answer: 'Yes! TrashItt is completely free for all citizens of Ranchi. Our mission is to make waste management accessible and engaging for everyone. There are no hidden charges, premium plans, or in-app purchases. Just sign up and start your green journey!',
  },
  {
    id: 3,
    category: 'general',
    question: 'Who created TrashItt?',
    answer: 'TrashItt was created by a team of 4 passionate students from Ranchi who saw the waste management challenges in their city and decided to build a technology-driven solution. What started as a hostel room idea at 2 AM is now a platform serving over 1,200 citizens. You can learn more on our About page!',
  },
  {
    id: 4,
    category: 'points',
    question: 'How do I earn Green Points?',
    answer: 'You can earn Green Points through multiple activities: scanning waste items (+10 pts), submitting waste reports (+20 pts), joining challenges (+50 pts), completing challenges (+100–1000 pts), referring friends (+25 pts), maintaining daily streaks (+15 pts/day), and participating in NGO drives (+100 pts). The more active you are, the more points you earn!',
  },
  {
    id: 5,
    category: 'points',
    question: 'What are the badge levels?',
    answer: 'TrashItt has 4 badge levels: Eco Starter (0–100 pts) for beginners, Green Warrior (101–500 pts) for dedicated segregators, Eco Champion (501–1500 pts) for community leaders, and Planet Hero (1501+ pts) for the ultimate eco warriors. Each badge unlocks new features and recognition on the leaderboard!',
  },
  {
    id: 6,
    category: 'points',
    question: 'Can I redeem my Green Points for rewards?',
    answer: 'We are currently working on partnerships with local businesses in Ranchi to offer exciting rewards for Green Points. Soon you\'ll be able to redeem points for discounts at eco-friendly stores, free saplings, reusable products, and more! Stay tuned for announcements on our Instagram @trashitt_official.',
  },
  {
    id: 7,
    category: 'waste',
    question: 'How does the AI Waste Scanner work?',
    answer: 'The AI Waste Scanner uses image recognition technology to identify waste items from photos. Simply upload or capture a photo of any waste item, and our AI will instantly tell you: the type of waste (Wet, Dry, or Hazardous), the correct bin color, whether it\'s recyclable or biodegradable, and specific disposal tips. You also earn +10 Green Points for every scan!',
  },
  {
    id: 8,
    category: 'waste',
    question: 'What are the three types of waste bins?',
    answer: 'TrashItt follows the standard 3-bin waste segregation system: Green Bin for Wet Waste (food scraps, vegetable peels, flowers, tea bags, etc.), Blue Bin for Dry Waste (plastic, paper, cardboard, glass, metal, old clothes, etc.), and Red Bin for Hazardous Waste (batteries, medicines, chemicals, e-waste, paint, etc.). Proper segregation at source is the key to effective waste management!',
  },
  {
    id: 9,
    category: 'waste',
    question: 'What should I do with e-waste like old phones and batteries?',
    answer: 'E-waste like old phones, batteries, chargers, and computer parts should NEVER be thrown in regular bins. They contain toxic chemicals that can contaminate soil and water. Instead, take them to designated e-waste collection centers in Ranchi, or wait for our NGO e-waste drives. You can also check our Waste Guide for specific disposal instructions for each item.',
  },
  {
    id: 10,
    category: 'challenges',
    question: 'How do I join a challenge?',
    answer: 'Joining a challenge is easy! Go to the Challenges page, browse active challenges, and click "Join Challenge" on any challenge that interests you. You\'ll earn +50 bonus points just for joining, and you can earn the full challenge points (100–1000 pts) by completing all the required tasks within the deadline. You can join multiple challenges simultaneously!',
  },
  {
    id: 11,
    category: 'challenges',
    question: 'Can my college participate in College Clean Wars?',
    answer: 'Absolutely! Any college, school, or educational institution in Ranchi can participate in the #CollegeCleanWars challenge. Get your eco club or student body to register on TrashItt, and all your members\' points will count towards your institution\'s total score on the College Leaderboard. The college with the most points wins the Green Campus crown!',
  },
  {
    id: 12,
    category: 'challenges',
    question: 'What happens if I miss a day in the 30-Day Green Streak?',
    answer: 'The #30DayGreenStreak challenge requires daily scans without any missed days. If you miss a day, your streak resets to zero and you\'ll need to start again. But don\'t worry — you can rejoin the challenge anytime! Pro tip: Set a daily reminder on your phone to scan at least one waste item every day.',
  },
  {
    id: 13,
    category: 'community',
    question: 'How can my NGO partner with TrashItt?',
    answer: 'We love partnering with NGOs and community organizations! If your NGO works in waste management, environmental conservation, or community development in Ranchi, we\'d love to collaborate. We can help you promote and manage cleanup drives, recruit volunteers, and track impact. Contact us at hello@trashitt.in or DM us on Instagram @trashitt_official.',
  },
  {
    id: 14,
    category: 'community',
    question: 'How do NGO cleanup drives work on TrashItt?',
    answer: 'NGO cleanup drives are community events organized by partner NGOs and listed on TrashItt. You can browse upcoming drives on the NGO Drives page, see details like date, location, and organizer, and register to participate. On the day of the drive, show up, participate in the cleanup, and earn +100 Green Points! Each drive also tracks impact like waste collected and volunteers participated.',
  },
  {
    id: 15,
    category: 'general',
    question: 'Is TrashItt available outside Ranchi?',
    answer: 'Currently, TrashItt is focused exclusively on Ranchi, Jharkhand. However, our vision is to expand to other cities in Jharkhand and eventually across all of India! The waste segregation guide and AI scanner work for any location, but features like challenges, leaderboards, and NGO drives are currently Ranchi-specific. Follow us on Instagram for expansion announcements!',
  },
];

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    let results = faqs;

    if (activeCategory !== 'all') {
      results = results.filter((faq) => faq.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return results;
  }, [activeCategory, searchQuery]);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const getCategoryIcon = (categoryId) => {
    const cat = faqCategories.find((c) => c.id === categoryId);
    if (!cat) return HelpCircle;
    return cat.icon;
  };

  const getCategoryLabel = (categoryId) => {
    const cat = faqCategories.find((c) => c.id === categoryId);
    return cat ? cat.label : '';
  };

  return (
    <div className="faq-page page-wrapper">
      <div className="container">
        {/* Hero */}
        <div className="faq-hero">
          <div className="faq-hero-badge">
            <HelpCircle size={14} />
            <span>FAQ</span>
          </div>
          <h1>Frequently <span className="hero-highlight">Asked Questions</span></h1>
          <p>
            Everything you need to know about TrashItt — from waste segregation
            to earning points and joining challenges.
          </p>
        </div>

        {/* Search */}
        <div className="faq-search-area">
          <div className="faq-search-bar">
            <Search size={20} className="faq-search-icon" />
            <input
              type="text"
              placeholder="Search questions... (e.g., points, scanner, challenge)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="faq-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery.trim() && (
            <span className="faq-search-count">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found
            </span>
          )}
        </div>

        {/* Category Filters */}
        <div className="faq-categories">
          {faqCategories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                className={`faq-category-btn ${activeCategory === cat.id ? 'faq-category-active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenFaq(null);
                }}
              >
                <IconComp size={16} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => {
              const isOpen = openFaq === faq.id;
              const CatIcon = getCategoryIcon(faq.category);

              return (
                <div
                  className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
                  key={faq.id}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-question-left">
                      <span className="faq-question-num">
                        {String(faq.id).padStart(2, '0')}
                      </span>
                      <div className="faq-question-text">
                        <span className="faq-question-title">{faq.question}</span>
                        <span className="faq-question-cat">
                          <CatIcon size={12} />
                          {getCategoryLabel(faq.category)}
                        </span>
                      </div>
                    </div>
                    <div className={`faq-chevron ${isOpen ? 'faq-chevron-open' : ''}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <div className={`faq-answer ${isOpen ? 'faq-answer-open' : ''}`}>
                    <div className="faq-answer-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="faq-empty">
              <HelpCircle size={48} />
              <h3>No questions found</h3>
              <p>Try a different search term or category</p>
            </div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="faq-cta-section">
          <div className="faq-cta-card">
            <div className="faq-cta-glow" />
            <div className="faq-cta-content">
              <MessageCircle size={32} />
              <h3>Still Have Questions?</h3>
              <p>
                Can't find what you're looking for? Reach out to us directly
                and we'll get back to you within 24 hours!
              </p>
              <div className="faq-cta-actions">
                <a href="mailto:hello@trashitt.in" className="faq-cta-btn faq-cta-btn-primary">
                  <Mail size={18} />
                  <span>trashitt.eco@gmail.com</span>
                </a>
                <a
                  href="https://instagram.com/trashitt_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq-cta-btn faq-cta-btn-secondary"
                >
                  <Instagram size={18} />
                  <span>@trashitt_official</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="faq-quick-links">
          <h4>Helpful Resources</h4>
          <div className="faq-quick-grid">
            <a href="/waste-guide" className="faq-quick-card">
              <div className="faq-quick-icon" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                <BookOpen size={22} />
              </div>
              <div className="faq-quick-info">
                <strong>Waste Guide</strong>
                <span>Learn to segregate every type of waste</span>
              </div>
              <ArrowRight size={16} className="faq-quick-arrow" />
            </a>
            <a href="/scanner" className="faq-quick-card">
              <div className="faq-quick-icon" style={{ background: 'rgba(13,148,136,0.1)', color: '#0d9488' }}>
                <ScanLine size={22} />
              </div>
              <div className="faq-quick-info">
                <strong>AI Scanner</strong>
                <span>Scan waste items to identify them</span>
              </div>
              <ArrowRight size={16} className="faq-quick-arrow" />
            </a>
            <a href="/challenges" className="faq-quick-card">
              <div className="faq-quick-icon" style={{ background: 'rgba(217,119,6,0.1)', color: '#d97706' }}>
                <Trophy size={22} />
              </div>
              <div className="faq-quick-info">
                <strong>Challenges</strong>
                <span>Join eco challenges and earn points</span>
              </div>
              <ArrowRight size={16} className="faq-quick-arrow" />
            </a>
            <a href="/ngo-drives" className="faq-quick-card">
              <div className="faq-quick-icon" style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626' }}>
                <Heart size={22} />
              </div>
              <div className="faq-quick-info">
                <strong>NGO Drives</strong>
                <span>Volunteer for cleanup drives</span>
              </div>
              <ArrowRight size={16} className="faq-quick-arrow" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .faq-page {
          padding-top: calc(var(--navbar-height) + 24px);
          padding-bottom: 80px;
          animation: fadeInUp 0.5s ease forwards;
        }

        /* ========== HERO ========== */
        .faq-hero {
          text-align: center;
          margin-bottom: 32px;
          padding: 24px 0;
        }

        .faq-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 14px;
        }
          [data-theme='light'] .faq-hero-badge {
          color: #000000 ;
          background: rgba(0, 0, 0, 0.1);

        }
        .faq-hero h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 12px;
          background: linear-gradient(135deg, var(--green), var(--teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .faq-hero p {
          color: var(--muted);
          font-size: 1.05rem;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ========== SEARCH ========== */
        .faq-search-area {
          max-width: 600px;
          margin: 0 auto 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .faq-search-bar {
          position: relative;
          width: 100%;
        }

        .faq-search-bar input {
          width: 100%;
          padding: 16px 48px 16px 52px;
          background: var(--card);
          border: 2px solid var(--border);
          border-radius: 9999px;
          font-size: 0.95rem;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
        }

        .faq-search-bar input:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 4px rgba(22,163,74,0.1);
          outline: none;
        }

        .faq-search-bar input::placeholder {
          color: var(--muted);
        }

        .faq-search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
        }

        .faq-search-clear {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg2);
          color: var(--muted);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s ease;
        }

        .faq-search-clear:hover {
          background: var(--red);
          color: #ffffff;
        }

        .faq-search-count {
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 500;
        }

        /* ========== CATEGORIES ========== */
        .faq-categories {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .faq-category-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text2);
          background: var(--card);
          border: 1.5px solid var(--border);
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }

        .faq-category-btn:hover {
          border-color: var(--green);
          color: var(--green);
        }

        .faq-category-active {
          background: rgba(22,163,74,0.1);
          border-color: var(--green);
          color: var(--green);
        }

        /* ========== FAQ LIST ========== */
        .faq-list {
          max-width: 800px;
          margin: 0 auto 56px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-item {
          background: var(--card);
          border: 1.5px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .faq-item:hover {
          border-color: rgba(22,163,74,0.3);
          box-shadow: var(--shadow-sm);
        }

        .faq-item-open {
          border-color: var(--green);
          border-left: 4px solid var(--green);
          box-shadow: var(--shadow-md);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s ease;
        }

        .faq-question:hover {
          background: rgba(22,163,74,0.02);
        }

        .faq-question-left {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          flex: 1;
          min-width: 0;
        }

        .faq-question-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.82rem;
          color: var(--green);
          background: rgba(22,163,74,0.08);
          padding: 4px 10px;
          border-radius: 8px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .faq-question-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .faq-question-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.4;
        }

        .faq-item-open .faq-question-title {
          color: var(--green);
        }

        .faq-question-cat {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--muted);
          background: var(--bg2);
          padding: 2px 10px;
          border-radius: 9999px;
          width: fit-content;
        }

        .faq-chevron {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          background: var(--bg2);
          border-radius: 10px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .faq-chevron-open {
          transform: rotate(180deg);
          background: rgba(22,163,74,0.1);
          color: var(--green);
        }

        /* ========== ANSWER ========== */
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .faq-answer-open {
          max-height: 500px;
        }

        .faq-answer-inner {
          padding: 0 24px 24px;
          padding-left: 70px;
        }

        .faq-answer-inner p {
          font-size: 0.92rem;
          color: var(--text2);
          line-height: 1.8;
          padding: 16px 20px;
          background: var(--bg);
          border-radius: 12px;
          border-left: 3px solid var(--green);
        }

        /* ========== EMPTY ========== */
        .faq-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 64px 24px;
          color: var(--muted);
          text-align: center;
        }

        .faq-empty svg {
          opacity: 0.4;
        }

        .faq-empty h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          color: var(--text2);
        }

        /* ========== CTA ========== */
        .faq-cta-section {
          max-width: 800px;
          margin: 0 auto 48px;
        }

        .faq-cta-card {
          background: linear-gradient(135deg, #064e2b, #0a6e3a, #0d9488);
          border-radius: 20px;
          padding: 48px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .faq-cta-glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(132,204,22,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .faq-cta-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          color: #ffffff;
        }

        .faq-cta-content svg {
          color: var(--lime);
        }

        .faq-cta-content h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          color: #ffffff;
        }

        .faq-cta-content p {
          font-size: 1rem;
          color: rgba(255,255,255,0.75);
          max-width: 480px;
          line-height: 1.7;
        }

        .faq-cta-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }

        .faq-cta-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 0.92rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .faq-cta-btn:hover {
          transform: translateY(-2px);
        }

        .faq-cta-btn:active {
          transform: scale(0.97);
        }

        .faq-cta-btn-primary {
          background: #ffffff;
          color: #064e2b;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .faq-cta-btn-primary:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.2);
        }

        .faq-cta-btn-secondary {
          background: rgba(255,255,255,0.12);
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .faq-cta-btn-secondary:hover {
          background: rgba(255,255,255,0.2);
        }

        /* ========== QUICK LINKS ========== */
        .faq-quick-links {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-quick-links h4 {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .faq-quick-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .faq-quick-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          text-decoration: none;
          color: var(--text);
          transition: all 0.3s ease;
        }

        .faq-quick-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--green);
        }

        .faq-quick-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .faq-quick-info {
          flex: 1;
          min-width: 0;
        }

        .faq-quick-info strong {
          display: block;
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 2px;
        }

        .faq-quick-info span {
          font-size: 0.78rem;
          color: var(--muted);
        }

        .faq-quick-arrow {
          color: var(--muted);
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .faq-quick-card:hover .faq-quick-arrow {
          color: var(--green);
          transform: translateX(4px);
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .faq-page {
            padding-top: calc(var(--navbar-height) + 16px);
            padding-bottom: 56px;
          }

          .faq-hero h1 {
            font-size: 1.8rem;
          }

          .faq-categories {
            gap: 6px;
          }

          .faq-category-btn {
            padding: 7px 14px;
            font-size: 0.8rem;
          }

          .faq-question {
            padding: 16px 18px;
            gap: 12px;
          }

          .faq-question-left {
            gap: 12px;
          }

          .faq-question-num {
            display: none;
          }

          .faq-answer-inner {
            padding: 0 18px 18px;
            padding-left: 18px;
          }

          .faq-answer-inner p {
            padding: 14px 16px;
          }

          .faq-chevron {
            width: 32px;
            height: 32px;
          }

          .faq-cta-card {
            padding: 32px 20px;
          }

          .faq-cta-content h3 {
            font-size: 1.3rem;
          }

          .faq-cta-actions {
            flex-direction: column;
            width: 100%;
          }

          .faq-cta-btn {
            width: 100%;
            justify-content: center;
          }

          .faq-quick-grid {
            grid-template-columns: 1fr;
          }

          .faq-search-bar input {
            padding: 14px 44px 14px 48px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .faq-hero h1 {
            font-size: 1.5rem;
          }

          .faq-categories {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 8px;
            -webkit-overflow-scrolling: touch;
          }

          .faq-categories::-webkit-scrollbar {
            height: 0;
          }

          .faq-question-title {
            font-size: 0.92rem;
          }

          .faq-item-open {
            border-left-width: 3px;
          }

          .faq-quick-card {
            padding: 14px 16px;
          }

          .faq-quick-icon {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
}

export default FAQ;