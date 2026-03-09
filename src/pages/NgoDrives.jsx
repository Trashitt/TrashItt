import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Building2,
  Sparkles,
  Trophy,
  Recycle,
  TreePine,
  Waves,
  Leaf,
  Flag,
  Target,
  TrendingUp,
} from 'lucide-react';
import toast from 'react-hot-toast';

const upcomingDrives = [
  {
    id: 1,
    title: 'Harmu River Cleanup',
    date: 'February 27, 2026',
    time: '7:00 AM – 12:00 PM',
    location: 'Harmu River Bank, Ranchi',
    organizer: 'GreenRanchi NGO',
    organizerLogo: '🌿',
    description: 'Join us for a massive cleanup drive along the Jumar River. We aim to remove 500+ kg of waste and restore the natural beauty of this vital water body. All cleaning equipment provided.',
    participants: 89,
    maxParticipants: 150,
    points: 100,
    progress: 59,
    icon: Waves,
    color: '#0d9488',
    bg: 'rgba(13,148,136,0.1)',
    tasks: ['River bank cleanup', 'Waste segregation on-site', 'Water quality documentation'],
  },
  {
    id: 2,
    title: 'Hindpiri Market Cleanup',
    date: 'March 2, 2026',
    time: '6:00 AM – 11:00 AM',
    location: 'Hindpiri Market, Ranchi',
    organizer: 'SwachhJharkhand Foundation',
    organizerLogo: '🏛️',
    description: 'Transform Hindpiri Market into a model clean market. We will set up waste segregation bins, educate vendors, and conduct a thorough cleanup of all lanes and drainage.',
    participants: 67,
    maxParticipants: 120,
    points: 100,
    progress: 56,
    icon: Building2,
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.1)',
    tasks: ['Lane-by-lane cleanup', 'Vendor awareness session', 'Bin installation drive'],
  },
  {
    id: 3,
    title: 'YSM Green Day',
    date: 'March 22, 2026',
    time: '8:00 AM – 1:00 PM',
    location: 'YSM Campus, Ranchi',
    organizer: 'BIT Eco Club',
    organizerLogo: '🎓',
    description: 'A campus-wide green initiative! Plant trees, set up compost stations, conduct waste audits, and make BIT Mesra the greenest campus in Jharkhand.',
    participants: 134,
    maxParticipants: 200,
    points: 100,
    progress: 67,
    icon: TreePine,
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.1)',
    tasks: ['Tree plantation (50 saplings)', 'Campus waste audit', 'Compost station setup'],
  },
  {
    id: 4,
    title: 'Ranchi Lake Revival',
    date: 'February 28, 2026',
    time: '6:30 AM – 11:30 AM',
    location: 'Ranchi Lake, Ranchi',
    organizer: 'Lake Warriors',
    organizerLogo: '🌊',
    description: 'A community effort to clean and revive Ranchi Lake. Remove floating waste, plant aquatic vegetation, and raise awareness about lake conservation among visitors.',
    participants: 78,
    maxParticipants: 130,
    points: 100,
    progress: 60,
    icon: Waves,
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.1)',
    tasks: ['Floating waste removal', 'Aquatic plant setup', 'Visitor awareness campaign'],
  },
  {
    id: 5,
    title: 'Morabadi Ground Makeover',
    date: 'April 2, 2026',
    time: '7:00 AM – 12:00 PM',
    location: 'Morabadi Ground, Ranchi',
    organizer: 'Youth For Ranchi',
    organizerLogo: '💚',
    description: 'Complete makeover of Morabadi Ground — cleanup, waste bin installation, signage placement, and a tree plantation drive. Make Morabadi a model public space!',
    participants: 56,
    maxParticipants: 100,
    points: 100,
    progress: 56,
    icon: TreePine,
    color: '#d97706',
    bg: 'rgba(217,119,6,0.1)',
    tasks: ['Ground cleanup & leveling', 'Waste bin installation', 'Tree plantation (30 saplings)'],
  },
];

const pastDrives = [
  {
    id: 101,
    title: 'Station Area Cleanup',
    date: 'February 10, 2026',
    location: 'Ranchi Railway Station',
    organizer: 'CleanRanchi Initiative',
    participants: 112,
    wasteCollected: '340 KG',
    status: 'completed',
    emoji: '🚉',
  },
  {
    id: 102,
    title: 'Kanke Dam Restoration',
    date: 'January 28, 2026',
    location: 'Kanke Dam, Ranchi',
    organizer: 'GreenRanchi NGO',
    participants: 87,
    wasteCollected: '280 KG',
    status: 'completed',
    emoji: '🏞️',
  },
  {
    id: 103,
    title: 'Main Road Beautification',
    date: 'January 15, 2026',
    location: 'Main Road, Ranchi',
    organizer: 'Youth For Ranchi',
    participants: 145,
    wasteCollected: '520 KG',
    status: 'completed',
    emoji: '🛤️',
  },
];

function NgoDrives() {
  const [joinedDrives, setJoinedDrives] = useState([]);
  const [expandedDrive, setExpandedDrive] = useState(null);

  const handleJoin = (id, title) => {
    if (joinedDrives.includes(id)) {
      toast('You\'ve already joined this drive! 💪');
      return;
    }
    setJoinedDrives((prev) => [...prev, id]);
    toast.success(`Joined "${title}"! +100 points on completion 🎉`, { duration: 3500 });
  };

  const toggleExpand = (id) => {
    setExpandedDrive(expandedDrive === id ? null : id);
  };
  const navigate = useNavigate();

  return (
    <div className="ngo-page page-wrapper">
      <div className="container">
        {/* Hero */}
        <div className="ngo-hero">
          <div className="ngo-hero-badge">
            <Heart size={14} />
            <span>NGO Drives</span>
          </div>
          <h1>Community <span className="hero-highlight">Cleanup Drives</span></h1>
          <p>
            Join hands with NGOs and community organizations to make Ranchi cleaner.
            Participate in drives, earn points, and create real impact!
          </p>
          <div className="ngo-hero-stats">
            <div className="ngo-hero-stat">
              <strong>5</strong>
              <span>Upcoming Drives</span>
            </div>
            <div className="ngo-hero-stat-divider" />
            <div className="ngo-hero-stat">
              <strong>424</strong>
              <span>Volunteers</span>
            </div>
            <div className="ngo-hero-stat-divider" />
            <div className="ngo-hero-stat">
              <strong>+100</strong>
              <span>Points Per Drive</span>
            </div>
          </div>
        </div>

        {/* Upcoming Drives */}
        <div className="ngo-section">
          <div className="ngo-section-header">
            <div className="ngo-section-title-row">
              <Sparkles size={22} className="ngo-section-icon" />
              <h2>Upcoming Drives</h2>
            </div>
            <p>Register now and be part of the change!</p>
          </div>

          <div className="ngo-drives-list">
            {upcomingDrives.map((drive, i) => {
              const isJoined = joinedDrives.includes(drive.id);
              const isExpanded = expandedDrive === drive.id;
              const IconComp = drive.icon;
              const spotsLeft = drive.maxParticipants - drive.participants;

              return (
                <div
                  className={`ngo-drive-card ${isExpanded ? 'ngo-card-expanded' : ''}`}
                  key={drive.id}
                  style={{
                    '--drive-color': drive.color,
                    '--drive-bg': drive.bg,
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <div className="ngo-card-main" onClick={() => toggleExpand(drive.id)}>
                    <div className="ngo-card-icon-wrap" style={{ background: drive.bg, color: drive.color }}>
                      <IconComp size={26} />
                    </div>

                    <div className="ngo-card-content">
                      <div className="ngo-card-top">
                        <h3 className="ngo-card-title">{drive.title}</h3>
                        <div className="ngo-card-points-badge">
                          <Star size={14} />
                          <span>+{drive.points} pts</span>
                        </div>
                      </div>

                      <div className="ngo-card-org">
                        <span className="ngo-card-org-logo">{drive.organizerLogo}</span>
                        <span className="ngo-card-org-name">{drive.organizer}</span>
                      </div>

                      <div className="ngo-card-meta">
                        <span className="ngo-card-meta-item">
                          <Calendar size={14} />
                          {drive.date}
                        </span>
                        <span className="ngo-card-meta-item">
                          <Clock size={14} />
                          {drive.time}
                        </span>
                        <span className="ngo-card-meta-item">
                          <MapPin size={14} />
                          {drive.location}
                        </span>
                      </div>

                      <div className="ngo-card-progress-area">
                        <div className="ngo-card-progress-info">
                          <span>
                            <Users size={12} />
                            {drive.participants}/{drive.maxParticipants} volunteers
                          </span>
                          <span className="ngo-spots-left">{spotsLeft} spots left</span>
                        </div>
                        <div className="ngo-card-progress-bar">
                          <div
                            className="ngo-card-progress-fill"
                            style={{ width: `${drive.progress}%`, background: `linear-gradient(90deg, ${drive.color}, var(--lime))` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div className={`ngo-card-expand ${isExpanded ? 'ngo-card-expand-open' : ''}`}>
                    <div className="ngo-expand-inner">
                      <p className="ngo-expand-desc">{drive.description}</p>

                      <div className="ngo-expand-tasks">
                        <strong>
                          <Target size={16} />
                          Key Activities:
                        </strong>
                        <ul>
                          {drive.tasks.map((task, ti) => (
                            <li key={ti}>
                              <CheckCircle size={14} />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="ngo-expand-what">
                        <div className="ngo-expand-what-item">
                          <Flag size={16} />
                          <div>
                            <strong>What to Bring</strong>
                            <span>Water bottle, sunscreen, comfortable shoes</span>
                          </div>
                        </div>
                        <div className="ngo-expand-what-item">
                          <Recycle size={16} />
                          <div>
                            <strong>Equipment</strong>
                            <span>Gloves, bags, and tools provided by organizer</span>
                          </div>
                        </div>
                      </div>

                      <button
                        className={`ngo-join-btn ${isJoined ? 'ngo-join-btn-joined' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJoin(drive.id, drive.title);
                        }}
                        style={{
                          background: isJoined ? 'transparent' : `linear-gradient(135deg, ${drive.color}, var(--accent))`,
                          borderColor: isJoined ? drive.color : 'transparent',
                          color: isJoined ? drive.color : '#ffffff',
                        }}
                      >
                        {isJoined ? (
                          <>
                            <CheckCircle size={18} />
                            <span>Joined</span>
                          </>
                        ) : (
                          <>
                            <Heart size={18} />
                            <span>Join Drive</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Past Drives */}
        <div className="ngo-section ngo-past-section">
          <div className="ngo-section-header">
            <div className="ngo-section-title-row">
              <Trophy size={22} className="ngo-section-icon" />
              <h2>Completed Drives</h2>
            </div>
            <p>Look at the impact our community has already made!</p>
          </div>

          <div className="ngo-past-grid">
            {pastDrives.map((drive, i) => (
              <div
                className="ngo-past-card"
                key={drive.id}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="ngo-past-header">
                  <span className="ngo-past-emoji">{drive.emoji}</span>
                  <span className="ngo-past-status">
                    <CheckCircle size={12} />
                    Completed
                  </span>
                </div>
                <h4 className="ngo-past-title">{drive.title}</h4>
                <div className="ngo-past-meta">
                  <span>
                    <Calendar size={13} />
                    {drive.date}
                  </span>
                  <span>
                    <MapPin size={13} />
                    {drive.location}
                  </span>
                </div>
                <div className="ngo-past-org">
                  <Building2 size={13} />
                  <span>{drive.organizer}</span>
                </div>
                <div className="ngo-past-stats">
                  <div className="ngo-past-stat">
                    <Users size={14} />
                    <strong>{drive.participants}</strong>
                    <span>Volunteers</span>
                  </div>
                  <div className="ngo-past-stat-divider" />
                  <div className="ngo-past-stat">
                    <Recycle size={14} />
                    <strong>{drive.wasteCollected}</strong>
                    <span>Waste Collected</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="ngo-cta-section">
          <div className="ngo-cta-card">
            <div className="ngo-cta-glow" />
            <div className="ngo-cta-content">
              <Leaf size={28} />
              <h3>Want to Organize a Drive?</h3>
              <p>
                If you're an NGO, college club, or community group in Ranchi,
                partner with TrashItt to organize and promote your cleanup drives.
              </p>
              <button
                className="ngo-cta-btn"
                onClick={() => navigate('/Login')}
              >
                <span>Get in Touch</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ngo-page {
          padding-top: calc(var(--navbar-height) + 24px);
          padding-bottom: 80px;
          animation: fadeInUp 0.5s ease forwards;
        }

        /* ========== HERO ========== */
        .ngo-hero {
          text-align: center;
          margin-bottom: 48px;
          padding: 24px 0;
        }

        .ngo-hero-badge {
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
          [data-theme='light'] .ngo-hero-badge {
          color: #000000 ;
          background: rgba(0, 0, 0, 0.1);

        }

        .ngo-hero h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 12px;
          background: linear-gradient(135deg, var(--green), var(--teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ngo-hero p {
          color: var(--muted);
          font-size: 1.05rem;
          max-width: 620px;
          margin: 0 auto 28px;
          line-height: 1.7;
        }

        .ngo-hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
        }

        .ngo-hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .ngo-hero-stat strong {
          font-family: var(--text);
          font-weight: 1000;
          font-size: 2.2rem;
          color: #ffffff;
        }
          [data-theme=light] .ngo-hero-stat strong{
          color: #000000;
          }

        .ngo-hero-stat span {
          font-size: 0.78rem;
          color: var(--muted);
        }

        .ngo-hero-stat-divider {
          width: 1px;
          height: 36px;
          background: var(--border);
        }

        /* ========== SECTIONS ========== */
        .ngo-section {
          margin-bottom: 56px;
        }

        .ngo-section-header {
          margin-bottom: 28px;
        }

        .ngo-section-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }

        .ngo-section-icon {
          color: var(--green);
        }

        .ngo-section-header h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
        }

        .ngo-section-header p {
          color: var(--muted);
          font-size: 0.95rem;
          margin-left: 34px;
        }

        /* ========== DRIVE CARDS ========== */
        .ngo-drives-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .ngo-drive-card {
          background: var(--card);
          border: 1.5px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .ngo-drive-card:hover {
          border-color: var(--drive-color);
          box-shadow: var(--shadow-md);
        }

        .ngo-card-main {
          display: flex;
          gap: 20px;
          padding: 28px;
          cursor: pointer;
        }

        .ngo-card-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ngo-card-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ngo-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ngo-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text);
        }

        .ngo-card-points-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 14px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
          animation: pulse 2s ease-in-out infinite;
        }
          [data-theme=light] .ngo-card-points-badge{
          background: rgba(0, 0, 0, 0.1);
          color: #000000;
          }

        .ngo-card-org {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ngo-card-org-logo {
          font-size: 1.1rem;
        }

        .ngo-card-org-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text2);
        }

        .ngo-card-meta {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        .ngo-card-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 500;
        }

        .ngo-card-meta-item svg {
          color: var(--drive-color);
          flex-shrink: 0;
        }

        .ngo-card-progress-area {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-width: 450px;
        }

        .ngo-card-progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.78rem;
          color: var(--muted);
          font-weight: 500;
        }

        .ngo-card-progress-info span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ngo-spots-left {
          color: var(--green);
          font-weight: 600;
        }

        .ngo-card-progress-bar {
          width: 100%;
          height: 8px;
          background: var(--bg2);
          border-radius: 9999px;
          overflow: hidden;
        }

        .ngo-card-progress-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 1s ease;
          background: linear-gradient(90deg, var(--green), var(--teal)) !important;
        }

        /* Expanded */
        .ngo-card-expand {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .ngo-card-expand-open {
          max-height: 500px;
        }

        .ngo-expand-inner {
          padding: 0 28px 28px;
          border-top: 1px solid var(--border);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .ngo-expand-desc {
          font-size: 0.92rem;
          color: var(--text2);
          line-height: 1.7;
        }

        .ngo-expand-tasks strong {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.92rem;
          color: var(--text);
          margin-bottom: 10px;
        }

        .ngo-expand-tasks strong svg {
          color: var(--drive-color);
        }

        .ngo-expand-tasks ul {
          display: flex;
          flex-direction: column;
          gap: 8px;
          list-style: none;
        }

        .ngo-expand-tasks li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text2);
        }

        .ngo-expand-tasks li svg {
          color: var(--green);
          flex-shrink: 0;
        }

        .ngo-expand-what {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .ngo-expand-what-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          flex: 1;
          min-width: 200px;
        }

        .ngo-expand-what-item svg {
          color: var(--drive-color);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .ngo-expand-what-item strong {
          display: block;
          font-size: 0.85rem;
          color: var(--text);
          margin-bottom: 2px;
        }

        .ngo-expand-what-item span {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.5;
        }

        .ngo-join-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          font-family: 'DM Sans', sans-serif;
          align-self: flex-start;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .ngo-join-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.15);
        }

        .ngo-join-btn:active {
          transform: scale(0.97);
        }

        .ngo-join-btn-joined {
          box-shadow: none;
        }

        .ngo-join-btn-joined:hover {
          transform: none;
          box-shadow: none;
        }

        /* ========== PAST DRIVES ========== */
        .ngo-past-section {
          margin-top: 16px;
        }

        .ngo-past-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .ngo-past-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s ease;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .ngo-past-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .ngo-past-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ngo-past-emoji {
          font-size: 1.8rem;
        }

        .ngo-past-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--green);
          background: rgba(22,163,74,0.1);
          padding: 4px 12px;
          border-radius: 9999px;
          text-transform: uppercase;
        }

        .ngo-past-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          color: var(--text);
        }

        .ngo-past-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ngo-past-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--muted);
        }

        .ngo-past-meta svg {
          color: var(--green);
          flex-shrink: 0;
        }

        .ngo-past-org {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--text2);
          font-weight: 500;
        }

        .ngo-past-org svg {
          color: var(--muted);
        }

        .ngo-past-stats {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px;
          background: var(--bg2);
          border-radius: 12px;
          margin-top: 4px;
        }

        .ngo-past-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          text-align: center;
        }

        .ngo-past-stat svg {
          color: var(--green);
        }

        .ngo-past-stat strong {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text);
        }

        .ngo-past-stat span {
          font-size: 0.72rem;
          color: var(--muted);
        }

        .ngo-past-stat-divider {
          width: 1px;
          height: 36px;
          background: var(--border);
        }

        /* ========== CTA ========== */
        .ngo-cta-section {
          margin-top: 16px;
        }

        .ngo-cta-card {
          background: linear-gradient(135deg, #064e2b, #0a6e3a, #0d9488);
          border-radius: 20px;
          padding: 48px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .ngo-cta-glow {
          position: absolute;
          top: -80px;
          right: -80px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(132,204,22,0.2) 0%, transparent 60%);
          pointer-events: none;
        }

        .ngo-cta-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: #ffffff;
        }

        .ngo-cta-content svg {
          color: var(--lime);
        }

        .ngo-cta-content h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          color: #ffffff;
        }

        .ngo-cta-content p {
          font-size: 1rem;
          color: rgba(255,255,255,0.75);
          max-width: 500px;
          line-height: 1.7;
        }

        .ngo-cta-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: #ffffff;
          color: #064e2b;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
          margin-top: 8px;
        }

        .ngo-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .ngo-cta-btn:active {
          transform: scale(0.97);
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .ngo-past-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .ngo-page {
            padding-top: calc(var(--navbar-height) + 16px);
            padding-bottom: 56px;
          }

          .ngo-hero h1 {
            font-size: 1.8rem;
          }

          .ngo-hero-stats {
            gap: 16px;
          }

          .ngo-hero-stat strong {
            font-size: 1.2rem;
          }

          .ngo-card-main {
            flex-direction: column;
            padding: 20px;
          }

          .ngo-card-icon-wrap {
            width: 48px;
            height: 48px;
          }

          .ngo-card-meta {
            gap: 10px;
          }

          .ngo-expand-inner {
            padding: 16px 20px 20px;
          }

          .ngo-expand-what {
            flex-direction: column;
            gap: 14px;
          }

          .ngo-past-grid {
            grid-template-columns: 1fr;
          }

          .ngo-cta-card {
            padding: 32px 20px;
          }

          .ngo-cta-content h3 {
            font-size: 1.3rem;
          }

          .ngo-section-header p {
            margin-left: 0;
          }

          .ngo-join-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .ngo-hero h1 {
            font-size: 1.5rem;
          }

          .ngo-hero-stats {
            flex-direction: column;
            gap: 12px;
          }

          .ngo-hero-stat-divider {
            width: 40px;
            height: 1px;
          }

          .ngo-card-title {
            font-size: 1.05rem;
          }

          .ngo-card-points-badge {
            font-size: 0.72rem;
            padding: 4px 10px;
          }

          .ngo-past-card {
            padding: 18px;
          }

          .ngo-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default NgoDrives;