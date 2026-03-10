import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import myLogo from '../assets/logo.png';
import {
  Leaf,
  Recycle,
  ScanLine,
  Trophy,
  Users,
  MapPin,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Droplets,
  Package,
  AlertTriangle,
  Camera,
  Zap,
  TrendingUp,
  Star,
  Clock,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import Ticker from '../components/Ticker.jsx';

function useCountUp(end, duration, shouldStart) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime = null;
    let animFrame = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [end, duration, shouldStart]);

  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function AnimateOnScroll({ children, className, delay = 0 }) {
  const [ref, inView] = useInView(0.15);

  return (
    <div
      ref={ref}
      className={className || ''}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const leafParticles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: 12 + Math.random() * 16,
  duration: 8 + Math.random() * 12,
  delay: Math.random() * 10,
  drift: -60 + Math.random() * 120,
  driftEnd: -40 + Math.random() * 80,
  opacity: 0.15 + Math.random() * 0.3,
}));

const statsData = [
  { label: 'KG Waste Segregated', value: 450, icon: Recycle, suffix: ' KG' },
  { label: 'Active Challenges', value: 5, icon: Trophy, suffix: '' },
  { label: 'Citizens Joined', value: 124, icon: Users, suffix: '' },
  { label: 'Areas Cleaned', value: 23, icon: MapPin, suffix: '' },
];

const binsData = [
  {
    title: 'Wet Waste',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.08)',
    borderColor: 'rgba(22,163,74,0.2)',
    icon: Droplets,
    items: ['Vegetable Peels', 'Fruit Waste', 'Leftover Food', 'Tea Bags'],
    emoji: '🟢',
  },
  {
    title: 'Dry Waste',
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.08)',
    borderColor: 'rgba(37,99,235,0.2)',
    icon: Package,
    items: ['Plastic Bottles', 'Cardboard', 'Newspaper', 'Metal Cans'],
    emoji: '🔵',
  },
  {
    title: 'Hazardous Waste',
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.08)',
    borderColor: 'rgba(220,38,38,0.2)',
    icon: AlertTriangle,
    items: ['Batteries', 'Medicine Strips', 'Light Bulbs', 'Paint Cans'],
    emoji: '🔴',
  },
];

const challengesPreview = [
  {
    tag: '#ZeroWasteStreet',
    title: 'Zero Waste Street Challenge',
    desc: 'Make your street 100% waste-free for 30 days',
    participants: 234,
    points: 500,
    progress: 72,
    emoji: '🔥',
  },
  {
    tag: '#CollegeCleanWars',
    title: 'College Clean Wars',
    desc: 'Inter-college competition for the greenest campus',
    participants: 156,
    points: 300,
    progress: 58,
    emoji: '🏫',
  },
  {
    tag: '#RiverRevival',
    title: 'River Revival Mission',
    desc: 'Clean and restore Ranchi\'s rivers and water bodies',
    participants: 89,
    points: 400,
    progress: 45,
    emoji: '🌊',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Scan Your Waste',
    desc: 'Use our AI scanner to identify waste type instantly with your phone camera.',
    icon: Camera,
  },
  {
    step: 2,
    title: 'Segregate Correctly',
    desc: 'Follow our smart guide to put waste in the right bin — Wet, Dry, or Hazardous.',
    icon: Recycle,
  },
  {
    step: 3,
    title: 'Earn & Compete',
    desc: 'Earn green points, climb the leaderboard, and join exciting eco challenges!',
    icon: Trophy,
  },
];

const galleryPreview = [
  { id: 1, before: 'https://picsum.photos/seed/trash1/400/300', after: 'https://picsum.photos/seed/clean1/400/300', location: 'Hindpiri Market' },
  { id: 2, before: 'https://picsum.photos/seed/trash2/400/300', after: 'https://picsum.photos/seed/clean2/400/300', location: 'Ranchi Lake' },
  { id: 3, before: 'https://picsum.photos/seed/trash3/400/300', after: 'https://picsum.photos/seed/clean3/400/300', location: 'Morabadi Ground' },
  { id: 4, before: 'https://picsum.photos/seed/trash4/400/300', after: 'https://picsum.photos/seed/clean4/400/300', location: 'Kanke Road' },
  { id: 5, before: 'https://picsum.photos/seed/trash5/400/300', after: 'https://picsum.photos/seed/clean5/400/300', location: 'BIT Mesra Campus' },
  { id: 6, before: 'https://picsum.photos/seed/trash6/400/300', after: 'https://picsum.photos/seed/clean6/400/300', location: 'Jumar River Bank' },
];

function StatCard({ stat, delay, shouldStart }) {
  const count = useCountUp(stat.value, 2000, shouldStart);
  const IconComp = stat.icon;

  return (
    <AnimateOnScroll delay={delay}>
      <div className="home-stat-card">
        <div className="home-stat-icon-wrap">
          <IconComp size={26} />
        </div>
        <div className="home-stat-value">
          {count.toLocaleString()}{stat.suffix}
        </div>
        <div className="home-stat-label">{stat.label}</div>
      </div>
    </AnimateOnScroll>
  );
}

function Home() {
  const [statsRef, statsInView] = useInView(0.2);
  const heroWords = ['Segregate', 'Smart.', 'Recycle', 'Right.', 'Save', 'Ranchi.'];

  return (
    <div className="home-page">
      {/* SECTION 1: HERO */}
      <section className="home-hero">
  <div className="home-hero-gradient" />
  <div className="home-hero-mesh" />

  {/* Leaf Particles */}
  {leafParticles.map((leaf) => (
    <div
      key={leaf.id}
      className="home-leaf-particle"
      style={{
        left: leaf.left,
        fontSize: `${leaf.size}px`,
        animationDuration: `${leaf.duration}s`,
        animationDelay: `${leaf.delay}s`,
        '--leaf-drift': `${leaf.drift}px`,
        '--leaf-drift-end': `${leaf.driftEnd}px`,
        opacity: 0,
      }}
    >
      🍃
    </div>
  ))}

  {/* NEW: Wrapper to hold the left and right sides next to each other */}
  <div className="home-hero-inner container">
    
    {/* LEFT SIDE: Your existing text content */}
    <div className="home-hero-content">
      <div className="home-hero-badge">
        <Sparkles size={14} />
        <span>Smart Waste Management for Ranchi</span>
      </div>

      <h1 className="home-hero-title">
        {heroWords.map((word, i) => (
          <span
            key={i}
            className="home-hero-word"
            style={{ animationDelay: `${0.3 + i * 0.15}s` }}
          >
            {word}{' '}
          </span>
        ))}
      </h1>

      <p className="home-hero-sub">
        India's smartest waste segregation platform. Scan, segregate, earn points,
        and join Ranchi's green revolution. Together, we make a difference!
      </p>

      <div className="home-hero-ctas">
        <Link to="/scanner" className="btn btn-primary btn-lg home-hero-btn">
          <ScanLine size={20} />
          <span>Try AI Scanner</span>
        </Link>
        <Link to="/local-recycling" className="btn btn-secondary btn-lg home-hero-btn">
          <Recycle size={20} />
          <span>Recycling Centers</span>
        </Link>
      </div>

      <div className="home-hero-stats-mini">
        <div className="home-hero-mini-stat">
          <strong>1,247</strong>
          <span>Citizens</span>
        </div>
        <div className="home-hero-mini-divider" />
        <div className="home-hero-mini-stat">
          <strong>12,450</strong>
          <span>KG Segregated</span>
        </div>
        <div className="home-hero-mini-divider" />
        <div className="home-hero-mini-stat">
          <strong>5</strong>
          <span>Live Challenges</span>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE: Your new 3D Orb Visual */}
    <div className="landing-hero-visual">
      <div className="orb-container">
        <div className="orbital-ring ring-1"></div>
        <div className="orbital-ring ring-2"></div>
        
        <div className="tech-orb">
          <div className="sphere-content">
            {/* Make sure logo.png is in your 'public' folder! */}
            <img src={myLogo} alt="TrashIt" className="orb-logo" />
            
            {/* <Link to="/scanner" className="btn-sphere-action">
              <Camera size={16} /> Segregate Waste
            </Link> */}
          </div>
        </div>
      </div>
      
      <div className="floating-card fc-1">
        <Camera size={20} className="fc-icon" style={{ color: 'var(--green)' }}/>
        <strong>AI Scanner</strong>
        <span>94% Accuracy</span>
      </div>

      <div className="floating-card fc-2">
        <MapPin size={20} className="fc-icon" style={{ color: '#2563eb' }}/>
        <strong>Local Recycling</strong>
        <span>Find drop-offs</span>
      </div>

      <div className="floating-card fc-3">
        <Leaf size={20} className="fc-icon" style={{ color: 'var(--yellow)' }}/>
        <strong>EcoPoints</strong>
        <span>Trash to rewards</span>
      </div>

      <div className="floating-card fc-4">
        <Users size={20} className="fc-icon" style={{ color: '#ec4899' }}/>
        <strong>Community</strong>
        <span>Join challenges</span>
      </div>

      <div className="floating-card fc-5">
        <Link to="/waste-pickup" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <Package size={20} className="fc-icon" style={{ color: '#7c3aed' }}/>
          <strong>Schedule Pickup</strong>
          <span>Doorstep collection</span>
        </Link>
      </div>

      <div className="floating-card fc-6">
        <BookOpen size={20} className="fc-icon" style={{ color: 'var(--teal)' }}/>
        <strong>Waste Guide</strong>
        <span>How to segregate</span>
      </div>
    </div>
    
  </div>

  <div className="home-hero-scroll-arrow">
    <ChevronDown size={28} />
  </div>
</section>

      {/* SECTION 2: TICKER */}
      <Ticker />

      {/* SECTION 3: LIVE STATS */}
      <section className="home-stats-section" ref={statsRef}>
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <TrendingUp size={14} />
                <span>Live Impact</span>
              </div>
              <h2>Our Impact in Numbers</h2>
              <p>Real-time stats from TrashItt's growing community in Ranchi</p>
            </div>
          </AnimateOnScroll>

          <div className="home-stats-grid">
            {statsData.map((stat, i) => (
              <StatCard
                key={stat.label}
                stat={stat}
                delay={i * 0.1}
                shouldStart={statsInView}
              />
            ))}
          </div>
        </div>
      </section>
<Ticker />
      {/* SECTION 4: AI SCANNER PROMO */}
      <section className="home-scanner-promo-section">
        <div className="container">
          <AnimateOnScroll>
            <div className="home-scanner-promo">
              <div className="home-scanner-promo-glow" />
              <div className="home-scanner-promo-content">
                <div className="home-scanner-promo-badge">
                  <Zap size={14} />
                  <span>NEW</span>
                </div>
                <h2>AI-Powered Waste Scanner</h2>
                <p>
                  Just snap a photo of any waste item and our AI instantly tells you
                  the type, correct bin, recycling tips, and earns you green points!
                  No more confusion about waste segregation.
                </p>
                <Link to="/scanner" className="btn btn-lg home-scanner-promo-btn">
                  <Camera size={20} />
                  <span>Try Scanner Now</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
              <div className="home-scanner-promo-visual">
                <div className="home-scanner-phone">
                  <div className="home-scanner-phone-screen">
                    <div className="home-scanner-phone-header">
                      <ScanLine size={18} />
                      <span>Scanning...</span>
                    </div>
                    <div className="home-scanner-phone-viewfinder">
                      <div className="home-scanner-corners">
                        <span /><span /><span /><span />
                      </div>
                      <Recycle size={40} className="home-scanner-phone-icon" />
                    </div>
                    <div className="home-scanner-phone-result">
                      <span className="home-scanner-result-badge">♻️ Recyclable</span>
                      <span className="home-scanner-result-pts">+10 pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
<Ticker />
      {/* SECTION 5: THREE BINS */}
      <section className="home-bins-section">
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <Recycle size={14} />
                <span>Know Your Bins</span>
              </div>
              <h2>Three Bins, One Mission</h2>
              <p>Understanding waste segregation is the first step to a cleaner Ranchi</p>
            </div>
          </AnimateOnScroll>

          <div className="home-bins-grid">
            {binsData.map((bin, i) => {
              const IconComp = bin.icon;
              return (
                <AnimateOnScroll key={bin.title} delay={i * 0.12}>
                  <Link to="/waste-guide" className="home-bin-card" style={{ '--bin-color': bin.color, '--bin-bg': bin.bg, '--bin-border': bin.borderColor }}>
                    <div className="home-bin-emoji">{bin.emoji}</div>
                    <div className="home-bin-icon-wrap" style={{ background: bin.bg, color: bin.color }}>
                      <IconComp size={28} />
                    </div>
                    <h3 className="home-bin-title">{bin.title}</h3>
                    <ul className="home-bin-items">
                      {bin.items.map((item) => (
                        <li key={item}>
                          <ChevronDown size={12} style={{ transform: 'rotate(-90deg)' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="home-bin-cta">
                      View All <ArrowRight size={14} />
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>
<Ticker />
      {/* SECTION 6: TRENDING CHALLENGES */}
      <section className="home-challenges-section">
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <Trophy size={14} />
                <span>Trending Now</span>
              </div>
              <h2>Trending Challenges</h2>
              <p>Join the movement and compete for a greener Ranchi</p>
            </div>
          </AnimateOnScroll>

          <div className="home-challenges-grid">
            {challengesPreview.map((challenge, i) => (
              <AnimateOnScroll key={challenge.tag} delay={i * 0.12}>
                <Link to="/challenges" className="home-challenge-card">
                  <div className="home-challenge-header">
                    <span className="home-challenge-emoji">{challenge.emoji}</span>
                    <span className="home-challenge-tag">{challenge.tag}</span>
                    <span className="home-challenge-pts">
                      <Star size={12} /> {challenge.points} pts
                    </span>
                  </div>
                  <h4 className="home-challenge-title">{challenge.title}</h4>
                  <p className="home-challenge-desc">{challenge.desc}</p>
                  <div className="home-challenge-progress-area">
                    <div className="home-challenge-progress-info">
                      <span>{challenge.participants} participants</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="home-challenge-progress-bar">
                      <div
                        className="home-challenge-progress-fill"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="home-challenge-join">
                    Join Now <ArrowUpRight size={14} />
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
<Ticker />
      {/* SECTION 7: HOW IT WORKS */}
      <section className="home-how-section">
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <Sparkles size={14} />
                <span>Simple & Easy</span>
              </div>
              <h2>How TrashItt Works</h2>
              <p>Three simple steps to become a waste segregation champion</p>
            </div>
          </AnimateOnScroll>

          <div className="home-how-grid">
            {howItWorks.map((step, i) => {
              const IconComp = step.icon;
              return (
                <AnimateOnScroll key={step.step} delay={i * 0.15}>
                  <div className="home-how-card">
                    {i < howItWorks.length - 1 && (
                      <div className="home-how-connector" />
                    )}
                    <div className="home-how-step-num">{step.step}</div>
                    <div className="home-how-icon-wrap">
                      <IconComp size={30} />
                    </div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>
<Ticker />
      {/* SECTION 8: GALLERY PREVIEW */}
      <section className="home-gallery-section">
        <div className="container">
          <AnimateOnScroll>
            <div className="section-header">
              <div className="section-badge">
                <Camera size={14} />
                <span>Before & After</span>
              </div>
              <h2>Community Gallery</h2>
              <p>See the incredible transformations by our TrashItt community</p>
            </div>
          </AnimateOnScroll>

          <div className="home-gallery-grid">
            {galleryPreview.map((item, i) => (
              <AnimateOnScroll key={item.id} delay={i * 0.08}>
                <div className="home-gallery-card">
                  <div className="home-gallery-images">
                    <div className="home-gallery-img-wrap">
                      <img src={item.before} alt={`Before - ${item.location}`} loading="lazy" />
                      <span className="home-gallery-label home-gallery-label-before">Before</span>
                    </div>
                    <div className="home-gallery-img-wrap">
                      <img src={item.after} alt={`After - ${item.location}`} loading="lazy" />
                      <span className="home-gallery-label home-gallery-label-after">After</span>
                    </div>
                  </div>
                  <div className="home-gallery-info">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <div className="home-gallery-cta">
              <Link to="/gallery" className="btn btn-secondary">
                View Full Gallery <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <style>{`
        .home-page {
          overflow-x: hidden;
        }

        /* ===================== HERO ===================== */
.home-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 100px 24px 60px;
}

.home-hero-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(22,163,74,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(13,148,136,0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(132,204,22,0.08) 0%, transparent 50%);
  z-index: 0;
}

.home-hero-mesh {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(22,163,74,0.06) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(13,148,136,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 0;
}

.home-leaf-particle {
  position: absolute;
  bottom: -20px;
  z-index: 1;
  pointer-events: none;
  animation: leafFloat linear infinite;
}

/* NEW: Layout wrapper to split left and right */
.home-hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  position: relative;
  z-index: 2;
}

/* LEFT SIDE: Content */
.home-hero-content {
  flex: 1; /* Takes up available space */
  max-width: 850px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Aligns text to the left */
  text-align: left;
  gap: 24px;
  transform: translateX(-80px);
}

.home-hero-badge,
.home-scanner-promo-badge {
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
          transform: translateY(10px)
}
  .section-badge{
  color: #ffffff !important;       
  background: rgba(255, 255, 255, 0.1) !important;
  font-size: 0.90rem;
  font-weight: 400;
  // font-family: "Syne Mono", monospace;
  }
  [data-theme='light'] .home-hero-badge {
          color: #000000 !important;
          background: rgba(0, 0, 0, 0.1)  !important ;    //sledgehammer
        }
  [data-theme='light'] .section-badge {
          color: #000000 !important; 
             background: rgba(0, 0, 0, 0.1)  !important ;//sledgehammer
        }


.home-hero-title {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.15;
  letter-spacing: 2px;
  
}

.home-hero-word {
  display: inline-block;
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}

.home-hero-word:nth-child(1),
.home-hero-word:nth-child(3),
.home-hero-word:nth-child(5) {
  background: linear-gradient(135deg, var(--green), var(--teal));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-hero-sub {
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: var(--muted);
  line-height: 1.7;
  animation: fadeInUp 0.6s ease 1.2s forwards;
  opacity: 0;
}

.home-hero-ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-start; /* Aligns buttons to left */
  animation: fadeInUp 0.6s ease 1.4s forwards;
  opacity: 0;
}

.home-hero-btn {
  min-width: 180px;
  
}

.home-hero-stats-mini {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 16px;
  animation: fadeInUp 0.6s ease 1.6s forwards;
  opacity: 0;
  margin-left:10px;

}

.home-hero-mini-stat {
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 2px;
}

.home-hero-mini-stat strong {
  font-family: var(--text);
  font-size: 2.2rem;
  font-weight: 1000;
    color : #ffffffdc;

}

.home-hero-mini-stat span {
  font-size: 0.80rem;
    color : #ffffffdc;
    font-weight :500;

}
    [data-theme='light'] .home-hero-mini-stat strong , .home-hero-mini-stat span{
    color: #363636;
    }

.home-hero-mini-divider {
  width: 1px;
  height: 32px;
  background: var(--border);
}
.btn.btn-primary.home-hero-btn {
  background: linear-gradient(135deg, var(--green), var(--teal));
  color: #ffffff;
  border: none;
}

/* Secondary Button (Join Challenges) */
.btn.btn-secondary.home-hero-btn {
  background: transparent;
  border: 2px solid  var(--green); 
  color: #ffffff;            
}


.btn.btn-secondary.home-hero-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  background: linear-gradient(135deg, var(--green), var(--teal));
}

[data-theme=light] .btn.btn-secondary.home-hero-btn{
color: var(--green);
}
[data-theme=light] .btn.btn-secondary.home-hero-btn:hover{
color: white;
}
  

/* RIGHT SIDE: 3D Orb Visual */
.landing-hero-visual { 
  flex: 1.2; 
  position: relative; 
  height: 600px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
transform: translateX(60px);
      }

.orb-container {
  position: relative;
  width: 320px; 
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: breathe 4s ease-in-out infinite;
  z-index: 5;
}

.tech-orb {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden; 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  background: 
    radial-gradient(circle at 30% 30%, rgba(0, 210, 106, 0.8), transparent 60%),
    radial-gradient(circle at 70% 70%, rgba(0, 30, 15, 0.8), transparent 40%),
    radial-gradient(circle at 15% 55%, rgba(0, 255, 120, 0.25), transparent 25%),
    radial-gradient(circle at 50% 50%, rgba(15, 35, 25, 0.9), rgba(8, 8, 10, 0.98) 85%);
  box-shadow: 0 0 40px rgba(0, 210, 106, 0.4), 0 0 100px rgba(0, 210, 106, 0.2);
  border: 1px solid rgba(0, 210, 106, 0.15);
}

.tech-orb::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 50%;
  box-shadow: 
    inset -25px -25px 60px rgba(0,0,0,0.95), 
    inset 15px 15px 35px rgba(255,255,255,0.25), 
    inset -50px 10px 45px rgba(0, 150, 70, 0.15), 
    inset 20px -30px 40px rgba(0, 50, 20, 0.6);
  pointer-events: none; 
  z-index: 10;
}

.sphere-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  margin-top: -25px; 
  transform: perspective(300px) rotateX(12deg) scale(1.05);
}

.orb-logo {
  width: 240px; 
  filter: invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.15);
}

.btn-sphere-action {
  background: rgba(0, 210, 106, 0.15);
  border: 1px solid rgba(0, 210, 106, 0.4);
  color: #fff; /* Changed to white for visibility */
  padding: 10px 22px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  text-decoration: none; /* since it is a Link now */
}

.btn-sphere-action:hover {
  background: var(--green);
  color: var(--bg);
  transform: scale(1.05);
}

.orbital-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px dashed rgba(0, 210, 106, 0.4);
  box-shadow: 0 0 20px rgba(0, 210, 106, 0.1);
  pointer-events: none;
}

.ring-1 {
  width: 400px;
  height: 400px;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 180, 216, 0.3) transparent;
  animation: spin 15s linear infinite;
}

.ring-2 {
  width: 460px;
  height: 460px;
  border-color: rgba(255, 193, 7, 0.2) transparent;
  animation: spin-reverse 20s linear infinite;
}

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}
@keyframes spin { 100% { transform: rotateX(60deg) rotateY(20deg) rotateZ(360deg); } }
@keyframes spin-reverse { 100% { transform: rotateX(70deg) rotateY(-20deg) rotateZ(-360deg); } }

/* Floating Cards Layout */
.floating-card {
  position: absolute;
  background: var(--glass-bg);           /* 👈 Magic variable applied! */
  color: var(--glass-text);              /* 👈 Magic variable applied! */
  backdrop-filter: blur(15px);
  border: 1px solid var(--border);       /* Uses your existing border variable */
  border-radius: 16px;
  padding: 14px 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15); /* Softened the shadow a bit */
  animation: orbCardFloat 6s ease-in-out infinite;
  z-index: 10;
  white-space: nowrap;
}
.fc-1 { top: 5%; right: 5%; animation-delay: 0s; border-color: rgba(0, 210, 106, 0.5); }
.fc-2 { bottom: 5%; left: 5%; animation-delay: 1.5s; border-color: rgba(0, 102, 255, 0.5); }
.fc-3 { bottom: 8%; right: 8%; animation-delay: 3s; border-color: rgba(255, 193, 7, 0.5); }
.fc-4 { top: 10%; left: 5%; animation-delay: 2s; border-color: rgba(236, 72, 153, 0.5); }
.fc-5 { top: 45%; right: -5%; animation-delay: 4.5s; border-color: rgba(124, 58, 237, 0.5); }
.fc-6 { top: 45%; left: -5%; animation-delay: 1s; border-color: rgba(0, 180, 216, 0.5); }

.fc-icon { margin-bottom: 6px; display: block; }
.floating-card strong { display: block; font-size: 15px; margin-bottom: 2px; }
.floating-card span { font-size: 11px; color: var(--muted); }

@keyframes orbCardFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.home-hero-scroll-arrow {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--green);
  animation: bounceSoft 1.5s ease-in-out infinite;
  z-index: 2;
  opacity: 0.7;
}

/* Make sure it stacks nicely on mobile screens */
@media (max-width: 992px) {
  .home-hero-inner {
    flex-direction: column;
    text-align: center;
  }
  .home-hero-content {
    align-items: center;
    text-align: center;
  }
  .home-hero-ctas {
    justify-content: center;
  }
  .home-hero-mini-stat {
    align-items: center;
  }
  .landing-hero-visual {
    transform: scale(0.8);
    margin-top: 40px;
  }
}
  
        /* ===================== STATS ===================== */
        .home-stats-section {
          padding: 80px 0;
          background: var(--bg2);
        }

        .home-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .home-stat-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .home-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .home-stat-icon-wrap {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(22,163,74,0.1);
          color: var(--green);
          border-radius: 14px;
        }

        .home-stat-value {
          font-family: var(--text);
          font-weight: 1000;
          font-size: 2.7rem;
          color: var(--text);
          line-height: 1;
        }

        .home-stat-label {
          font-size: 0.9rem;
          color: var(--muted);
          font-weight: 500;
        }
          
        /* ===================== SCANNER PROMO ===================== */
        .home-scanner-promo-section {
          padding: 80px 0;
        }

        .home-scanner-promo {
          background: linear-gradient(135deg, #064e2b, #0a6e3a, #0d7c42);
          border-radius: 24px;
          padding: 56px;
          display: flex;
          align-items: center;
          gap: 48px;
          position: relative;
          overflow: hidden;
          color: #ffffff;
        }

        .home-scanner-promo-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(132,204,22,0.2) 0%, transparent 60%);
          pointer-events: none;
        }

        .home-scanner-promo-content {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .home-scanner-promo-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(132,204,22,0.2);
          border: 1px solid rgba(132,204,22,0.3);
          border-radius: 9999px;
          color: #ffffff;
          font-size: 0.90rem;
          font-weight: 400;
          font-family: "Syne Mono", monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
          animation: pulse 2s ease-in-out infinite;
        }

        .home-scanner-promo-content h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          color: #ffffff;
          margin-bottom: 16px;
        }

        .home-scanner-promo-content p {
          color: rgba(255,255,255,0.8);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 24px;
          max-width: 500px;
        }

        .home-scanner-promo-btn {
          background: #ffffff;
          color: #064e2b;
          font-weight: 700;
          border: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .home-scanner-promo-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        }

        .home-scanner-promo-btn:active {
          transform: scale(0.97);
        }

        .home-scanner-promo-visual {
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .home-scanner-phone {
          width: 200px;
          height: 380px;
          background: #111;
          border-radius: 28px;
          padding: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          position: relative;
          animation: float 4s ease-in-out infinite;
        }

        .home-scanner-phone-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #0a2e18, #0d3b1e);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 16px;
          gap: 16px;
        }

        .home-scanner-phone-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--lime);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .home-scanner-phone-viewfinder {
          width: 130px;
          height: 130px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .home-scanner-corners span {
          position: absolute;
          width: 24px;
          height: 24px;
          border-color: var(--lime);
          border-style: solid;
          border-width: 0;
        }

        .home-scanner-corners span:nth-child(1) {
          top: 0; left: 0;
          border-top-width: 3px;
          border-left-width: 3px;
          border-top-left-radius: 8px;
        }

        .home-scanner-corners span:nth-child(2) {
          top: 0; right: 0;
          border-top-width: 3px;
          border-right-width: 3px;
          border-top-right-radius: 8px;
        }

        .home-scanner-corners span:nth-child(3) {
          bottom: 0; left: 0;
          border-bottom-width: 3px;
          border-left-width: 3px;
          border-bottom-left-radius: 8px;
        }

        .home-scanner-corners span:nth-child(4) {
          bottom: 0; right: 0;
          border-bottom-width: 3px;
          border-right-width: 3px;
          border-bottom-right-radius: 8px;
        }

        .home-scanner-phone-icon {
          color: rgba(132,204,22,0.4);
          animation: pulse 2s ease-in-out infinite;
        }

        .home-scanner-phone-result {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .home-scanner-result-badge {
          padding: 6px 16px;
          background: rgba(22,163,74,0.2);
          color: var(--lime);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .home-scanner-result-pts {
          font-size: 1.2rem;
          font-weight: 800;
          color: #ffffff;
          font-family: 'Syne', sans-serif;
        }

        /* ===================== BINS ===================== */
        .home-bins-section {
          padding: 80px 0;
          background: var(--bg2);
        }

        .home-bins-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .home-bin-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: var(--card);
          border: 2px solid var(--bin-border);
          border-radius: 20px;
          padding: 36px 28px;
          gap: 16px;
          text-decoration: none;
          color: var(--text);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .home-bin-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
          border-color: var(--bin-color);
        }

        .home-bin-emoji {
          font-size: 2rem;
        }

        .home-bin-icon-wrap {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
        }

        .home-bin-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          color: var(--bin-color);
        }

        .home-bin-items {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }

        .home-bin-items li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text2);
          justify-content: center;
        }

        .home-bin-items li svg {
          color: var(--bin-color);
          flex-shrink: 0;
        }

        .home-bin-cta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--bin-color);
          margin-top: 8px;
          transition: gap 0.3s ease;
        }

        .home-bin-card:hover .home-bin-cta {
          gap: 10px;
        }

        /* ===================== CHALLENGES ===================== */
        .home-challenges-section {
          padding: 80px 0;
        }

        .home-challenges-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .home-challenge-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-decoration: none;
          color: var(--text);
          transition: all 0.3s ease;
        }

        .home-challenge-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--green);
        }

        .home-challenge-header {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .home-challenge-emoji {
          font-size: 1.4rem;
        }

        .home-challenge-tag {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--green);
          background: rgba(22,163,74,0.1);
          padding: 4px 12px;
          border-radius: 9999px;
        }

        .home-challenge-pts {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--yellow);
        }

        .home-challenge-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
        }

        .home-challenge-desc {
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.6;
        }

        .home-challenge-progress-area {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .home-challenge-progress-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--muted);
        }

        .home-challenge-progress-bar {
          width: 100%;
          height: 8px;
          background: var(--bg2);
          border-radius: 9999px;
          overflow: hidden;
        }

        .home-challenge-progress-fill {
          height: 100%;
          background: linear-gradient(135deg, var(--green), var(--teal));
          border-radius: 9999px;
          transition: width 1s ease;
        }

        .home-challenge-join {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--green);
          margin-top: 4px;
        }

        .home-challenge-card:hover .home-challenge-join {
          gap: 10px;
        }

        /* ===================== HOW IT WORKS ===================== */
        .home-how-section {
          padding: 80px 0;
          background: var(--bg2);
        }

        .home-how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          position: relative;
        }

        .home-how-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px 28px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          position: relative;
          transition: all 0.3s ease;
        }

        .home-how-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .home-how-connector {
          position: absolute;
          top: 50%;
          right: -32px;
          width: 32px;
          height: 2px;
          border-top: 2px dashed var(--border);
          z-index: 2;
        }

        .home-how-step-num {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 28px;
          background: #ffffff;
          color: #000000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
        }
          [data-theme=light] .home-how-step-num {
          background: #000000;
          color: #ffffff;}

        .home-how-icon-wrap {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(22,163,74,0.1);
          color: var(--green);
          border-radius: 18px;
        }

        .home-how-card h4 {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
        }

        .home-how-card p {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.6;
        }

        /* ===================== GALLERY ===================== */
        .home-gallery-section {
          padding: 80px 0;
        }

        .home-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .home-gallery-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .home-gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .home-gallery-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }

        .home-gallery-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .home-gallery-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .home-gallery-card:hover .home-gallery-img-wrap img {
          transform: scale(1.05);
        }

        .home-gallery-label {
          position: absolute;
          top: 8px;
          left: 8px;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #ffffff;
        }

        .home-gallery-label-before {
          background: rgba(220,38,38,0.85);
        }

        .home-gallery-label-after {
          background: rgba(22,163,74,0.85);
        }

        .home-gallery-info {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 16px;
          font-size: 0.88rem;
          color: var(--text2);
          font-weight: 500;
        }

        .home-gallery-info svg {
          color: var(--green);
          flex-shrink: 0;
        }

        .home-gallery-cta {
          text-align: center;
          margin-top: 40px;
        }
        .btn.btn-secondary{
        color : #ffffff;
        }
        .btn.btn-secondary:hover{
        background: linear-gradient(135deg, var(--green), var(--teal));
        }
        [data-theme=light] .btn.btn-secondary{
        color : var(--green);
        }
        [data-theme=light] .btn.btn-secondary:hover{
        color : white;
        }
        /* ===================== RESPONSIVE ===================== */
        @media (max-width: 1024px) {
          /* Reset the extreme horizontal shifts for smaller laptops/tablets */
          .home-hero-content {
            transform: translateX(0);
          }
          .landing-hero-visual {
            transform: translateX(0) scale(0.9);
          }

          .home-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .home-scanner-promo {
            padding: 40px;
          }

          .home-scanner-phone {
            width: 170px;
            height: 320px;
          }

          .home-how-connector {
            display: none;
          }

          .home-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 992px) {
          /* Stack the hero section elements */
          .home-hero-inner {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }
          
          /* Center the text and remove the shift completely */
          .home-hero-content {
            align-items: center;
            text-align: center;
            transform: none; 
            max-width: 100%;
          }
          
          .home-hero-ctas {
            justify-content: center;
          }
          
          .home-hero-stats-mini {
            margin-left: 0;
            justify-content: center;
          }
          
          /* Scale down the 3D orb and pull it up slightly */
          .landing-hero-visual {
            transform: scale(0.8); 
            margin: -20px 0; 
            display: flex;
            justify-content: center;
            width: 100%;
          }

          /* Keep floating cards inside the viewport */
          .fc-5 { right: 0; }
          .fc-6 { left: 0; }
        }

        @media (max-width: 768px) {
          .home-hero {
            padding: 120px 16px 48px;
            min-height: auto;
          }

          /* Scale the visual down more to fit phone widths and reduce vertical gap */
          .landing-hero-visual {
            transform: scale(0.65);
            margin: -80px 0;
          }

          /* Pull outer cards tighter to the orb on mobile */
          .fc-1 { top: 0; right: 0; }
          .fc-2 { bottom: 0; left: 0; }
          .fc-3 { bottom: 0; right: 0; }
          .fc-4 { top: 0; left: 0; }
          .fc-5 { top: 40%; right: -5%; }
          .fc-6 { top: 40%; left: -5%; }

          .home-hero-stats-mini {
            gap: 16px;
          }

          .home-hero-mini-stat strong {
            font-size: 1.1rem;
          }

          .home-stats-grid,
          .home-bins-grid,
          .home-challenges-grid,
          .home-how-grid,
          .home-gallery-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .home-stats-section,
          .home-scanner-promo-section,
          .home-bins-section,
          .home-challenges-section,
          .home-how-section,
          .home-gallery-section {
            padding: 56px 0;
          }

          .home-scanner-promo {
            flex-direction: column;
            padding: 32px 24px;
            text-align: center;
          }

          .home-scanner-promo-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .home-scanner-promo-content p {
            max-width: 100%;
          }

          .home-scanner-phone {
            width: 160px;
            height: 300px;
          }

          .home-how-connector {
            display: none;
          }

          .home-gallery-grid {
            grid-template-columns: 1fr;
          }

          .home-hero-ctas {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
          }

          .home-hero-btn {
            width: 100%;
            min-width: unset;
          }
        }

        @media (max-width: 480px) {
          .home-hero-title {
            font-size: clamp(2.2rem, 10vw, 3rem);
          }

          /* Maximum shrink for small phones like iPhone SE */
          .landing-hero-visual {
            transform: scale(0.48);
            margin: -140px 0;
          }

          .home-hero-stats-mini {
            flex-direction: column;
            gap: 12px;
          }

          .home-hero-mini-divider {
            width: 40px;
            height: 1px;
          }

          .home-stat-value {
            font-size: 1.6rem;
          }

          .home-scanner-promo {
            padding: 24px 16px;
          }

          .home-scanner-promo-btn {
            padding: 12px 24px;
            font-size: 0.9rem;
          }

          .home-bin-card {
            padding: 28px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;