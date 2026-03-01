import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Trophy,
  Star,
  TrendingUp,
  ScanLine,
  Recycle,
  MapPin,
  Award,
  ChevronRight,
  Download,
  Camera,
  Flag,
  Clock,
  Zap,
  Shield,
  Leaf,
  CheckCircle,
  ArrowUpRight,
  BarChart3,
  Target,
  Calendar,
} from 'lucide-react';
import toast from 'react-hot-toast';

const dummyUser = {
  name: 'Rahul Kumar',
  email: 'rahul.kumar@email.com',
  city: 'Ranchi',
  college: 'BIT Mesra',
  role: 'Student',
  points: 340,
  rank: 23,
  badge: 'Green Warrior',
  nextBadge: 'Eco Champion',
  nextBadgePoints: 500,
  reports: 7,
  challenges: 3,
  scans: 42,
  joinDate: 'January 2026',
  avatar: null,
};

const statCards = [
  {
    label: 'Green Points',
    value: '340',
    icon: Star,
    color: '#d97706',
    bg: 'rgba(217,119,6,0.1)',
    trend: '+25 this week',
  },
  {
    label: 'Leaderboard Rank',
    value: '#23',
    icon: Trophy,
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.1)',
    trend: 'Up 4 places',
  },
  {
    label: 'Waste Reports',
    value: '7',
    icon: Flag,
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.1)',
    trend: '2 this month',
  },
  {
    label: 'Challenges Joined',
    value: '3',
    icon: Target,
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.1)',
    trend: '1 active now',
  },
];

const quickActions = [
  {
    label: 'Scan Waste',
    icon: ScanLine,
    path: '/scanner',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.1)',
  },
  {
    label: 'Waste Guide',
    icon: Recycle,
    path: '/waste-guide',
    color: '#0d9488',
    bg: 'rgba(13,148,136,0.1)',
  },
  {
    label: 'Challenges',
    icon: Trophy,
    path: '/challenges',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.1)',
  },
  {
    label: 'Leaderboard',
    icon: BarChart3,
    path: '/leaderboard',
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.1)',
  },
];

const activityFeed = [
  {
    id: 1,
    type: 'scan',
    icon: Camera,
    text: 'Scanned a Plastic Bottle — correctly identified as Dry Waste',
    points: '+10',
    time: '2 hours ago',
    color: '#2563eb',
  },
  {
    id: 2,
    type: 'challenge',
    icon: Trophy,
    text: 'Joined #ZeroWasteStreet challenge',
    points: '+50',
    time: '1 day ago',
    color: '#d97706',
  },
  {
    id: 3,
    type: 'report',
    icon: Flag,
    text: 'Reported waste dump near Hindpiri Market',
    points: '+20',
    time: '2 days ago',
    color: '#dc2626',
  },
  {
    id: 4,
    type: 'badge',
    icon: Award,
    text: 'Earned "Green Warrior" badge! 🎉',
    points: '+100',
    time: '5 days ago',
    color: '#16a34a',
  },
  {
    id: 5,
    type: 'scan',
    icon: Camera,
    text: 'Scanned Medicine Strips — identified as Hazardous Waste',
    points: '+10',
    time: '1 week ago',
    color: '#2563eb',
  },
];

function Dashboard() {
  const profileCardRef = useRef(null);
  const badgeProgress = (dummyUser.points / dummyUser.nextBadgePoints) * 100;

  const handleDownloadCard = () => {
    toast.success('Profile card downloaded! 🎉', { duration: 2500 });
  };

  return (
    <div className="dashboard-page page-wrapper">
      <div className="container">
        {/* Welcome Banner */}
        <div className="dash-welcome">
          <div className="dash-welcome-overlay" />
          <div className="dash-welcome-content">
            <div className="dash-welcome-left">
              <div className="dash-welcome-avatar">
                <div className="dash-avatar-circle">
                  <span>{dummyUser.name.charAt(0)}</span>
                </div>
                <div className="dash-avatar-badge-wrap">
                  <div className="dash-avatar-badge">
                    <Shield size={10} />
                  </div>
                </div>
              </div>
              <div className="dash-welcome-info">
                <div className="dash-welcome-greeting">
                  <span className="dash-greeting-wave">👋</span>
                  <span>Welcome back,</span>
                </div>
                <h1 className="dash-welcome-name">{dummyUser.name}</h1>
                <div className="dash-welcome-meta">
                  <span className="dash-meta-item">
                    <MapPin size={14} />
                    {dummyUser.city}
                  </span>
                  <span className="dash-meta-item">
                    <Award size={14} />
                    {dummyUser.badge}
                  </span>
                  <span className="dash-meta-item">
                    <Calendar size={14} />
                    Since {dummyUser.joinDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="dash-welcome-right">
              <div className="dash-welcome-points">
                <Star size={22} />
                <span className="dash-points-num">{dummyUser.points}</span>
                <span className="dash-points-label">Green Points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="dash-stats-grid">
          {statCards.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <div
                className="dash-stat-card"
                key={stat.label}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="dash-stat-top">
                  <div
                    className="dash-stat-icon"
                    style={{ background: stat.bg, color: stat.color }}
                  >
                    <IconComp size={22} />
                  </div>
                  <span className="dash-stat-trend">
                    <TrendingUp size={12} />
                    {stat.trend}
                  </span>
                </div>
                <div className="dash-stat-value">{stat.value}</div>
                <div className="dash-stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Badge Progress */}
        <div className="dash-badge-section">
          <div className="dash-badge-card">
            <div className="dash-badge-header">
              <div className="dash-badge-info">
                <Award size={22} className="dash-badge-icon-main" />
                <div>
                  <h3>Badge Progress</h3>
                  <p>
                    Current: <strong>{dummyUser.badge}</strong> → Next:{' '}
                    <strong>{dummyUser.nextBadge}</strong>
                  </p>
                </div>
              </div>
              <div className="dash-badge-points-display">
                <span className="dash-badge-current">{dummyUser.points}</span>
                <span className="dash-badge-separator">/</span>
                <span className="dash-badge-total">{dummyUser.nextBadgePoints}</span>
                <span className="dash-badge-pts-label">pts</span>
              </div>
            </div>
            <div className="dash-badge-progress-wrap">
              <div className="dash-badge-progress-bar">
                <div
                  className="dash-badge-progress-fill"
                  style={{ width: `${badgeProgress}%` }}
                />
              </div>
              <span className="dash-badge-percent">{Math.round(badgeProgress)}%</span>
            </div>
            <div className="dash-badge-milestones">
              <div className="dash-milestone dash-milestone-done">
                <CheckCircle size={16} />
                <span>Eco Starter (100)</span>
              </div>
              <div className="dash-milestone dash-milestone-done">
                <CheckCircle size={16} />
                <span>Green Warrior (250)</span>
              </div>
              <div className="dash-milestone">
                <div className="dash-milestone-circle" />
                <span>Eco Champion (500)</span>
              </div>
              <div className="dash-milestone">
                <div className="dash-milestone-circle" />
                <span>Planet Hero (1000)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dash-section">
          <h3 className="dash-section-title">
            <Zap size={20} />
            Quick Actions
          </h3>
          <div className="dash-actions-grid">
            {quickActions.map((action) => {
              const IconComp = action.icon;
              return (
                <Link
                  to={action.path}
                  className="dash-action-card"
                  key={action.label}
                >
                  <div
                    className="dash-action-icon"
                    style={{ background: action.bg, color: action.color }}
                  >
                    <IconComp size={24} />
                  </div>
                  <span className="dash-action-label">{action.label}</span>
                  <ChevronRight size={16} className="dash-action-arrow" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Activity Feed + Profile Card */}
        <div className="dash-bottom-grid">
          {/* Activity Feed */}
          <div className="dash-section dash-activity-section">
            <h3 className="dash-section-title">
              <Clock size={20} />
              Recent Activity
            </h3>
            <div className="dash-activity-feed">
              {activityFeed.map((item) => {
                const IconComp = item.icon;
                return (
                  <div className="dash-activity-item" key={item.id}>
                    <div
                      className="dash-activity-icon"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      <IconComp size={16} />
                    </div>
                    <div className="dash-activity-content">
                      <p className="dash-activity-text">{item.text}</p>
                      <span className="dash-activity-time">{item.time}</span>
                    </div>
                    <span
                      className="dash-activity-points"
                      style={{ color: item.color }}
                    >
                      {item.points}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Downloadable Profile Card */}
          <div className="dash-section dash-profile-section">
            <h3 className="dash-section-title">
              <User size={20} />
              Your Profile Card
            </h3>
            <div className="dash-profile-card" ref={profileCardRef}>
              <div className="dash-profile-card-header">
                <div className="dash-profile-card-logo">
                  <Leaf size={16} />
                  <span>TrashItt</span>
                </div>
              </div>
              <div className="dash-profile-card-body">
                <div className="dash-profile-card-avatar">
                  <span>{dummyUser.name.charAt(0)}</span>
                </div>
                <h4 className="dash-profile-card-name">{dummyUser.name}</h4>
                <div className="dash-profile-card-badge-text">
                  <Award size={14} />
                  <span>{dummyUser.badge}</span>
                </div>
                <div className="dash-profile-card-stats-row">
                  <div className="dash-pc-stat">
                    <strong>{dummyUser.points}</strong>
                    <span>Points</span>
                  </div>
                  <div className="dash-pc-divider" />
                  <div className="dash-pc-stat">
                    <strong>#{dummyUser.rank}</strong>
                    <span>Rank</span>
                  </div>
                  <div className="dash-pc-divider" />
                  <div className="dash-pc-stat">
                    <strong>{dummyUser.scans}</strong>
                    <span>Scans</span>
                  </div>
                </div>
                <div className="dash-profile-card-meta-row">
                  <span>
                    <MapPin size={12} /> {dummyUser.city}
                  </span>
                  <span>
                    <Calendar size={12} /> {dummyUser.joinDate}
                  </span>
                </div>
              </div>
              <div className="dash-profile-card-footer">
                <span>@trashitt_official</span>
                <Recycle size={14} />
              </div>
            </div>

            <button className="dash-download-btn" onClick={handleDownloadCard}>
              <Download size={18} />
              <span>Download Card</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-page {
          padding-top: calc(var(--navbar-height) + 24px);
          padding-bottom: 80px;
          animation: fadeInUp 0.5s ease forwards;
        }

        /* ========== WELCOME BANNER ========== */
        .dash-welcome {
          background: linear-gradient(135deg, #064e2b, #0a6e3a, #0d9488);
          border-radius: 20px;
          padding: 36px 40px;
          position: relative;
          overflow: hidden;
          margin-bottom: 28px;
        }

        .dash-welcome-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(132,204,22,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 30%, rgba(255,255,255,0.06) 0%, transparent 50%);
          pointer-events: none;
        }

        .dash-welcome-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .dash-welcome-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .dash-welcome-avatar {
          position: relative;
          flex-shrink: 0;
        }

        .dash-avatar-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 3px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
        }

        .dash-avatar-badge-wrap {
          position: absolute;
          bottom: -2px;
          right: -2px;
        }

        .dash-avatar-badge {
          width: 24px;
          height: 24px;
          background: var(--lime);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #064e2b;
          border: 2px solid #064e2b;
        }

        .dash-welcome-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .dash-welcome-greeting {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.75);
          font-size: 0.9rem;
        }

        .dash-greeting-wave {
          font-size: 1.2rem;
          animation: wiggle 1s ease-in-out infinite;
        }

        .dash-welcome-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .dash-welcome-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .dash-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(255,255,255,0.65);
          font-size: 0.82rem;
        }

        .dash-welcome-right {
          flex-shrink: 0;
        }

        .dash-welcome-points {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 16px;
          padding: 18px 28px;
          color: #ffffff;
        }

        .dash-points-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          line-height: 1;
          color: var(--lime);
        }

        .dash-points-label {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }

        /* ========== STAT CARDS ========== */
        .dash-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 28px;
        }

        .dash-stat-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        .dash-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .dash-stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dash-stat-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dash-stat-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--green);
          background: rgba(22,163,74,0.08);
          padding: 4px 8px;
          border-radius: 9999px;
        }

        .dash-stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.8rem;
          color: var(--text);
          line-height: 1;
        }

        .dash-stat-label {
          font-size: 0.88rem;
          color: var(--muted);
          font-weight: 500;
        }

        /* ========== BADGE PROGRESS ========== */
        .dash-badge-section {
          margin-bottom: 28px;
        }

        .dash-badge-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dash-badge-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .dash-badge-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .dash-badge-icon-main {
          color: var(--yellow);
          flex-shrink: 0;
        }

        .dash-badge-info h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          margin-bottom: 2px;
        }

        .dash-badge-info p {
          font-size: 0.85rem;
          color: var(--muted);
        }

        .dash-badge-info p strong {
          color: var(--text);
        }

        .dash-badge-points-display {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .dash-badge-current {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: var(--green);
        }

        .dash-badge-separator {
          color: var(--muted);
          font-size: 1.2rem;
          margin: 0 2px;
        }

        .dash-badge-total {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--muted);
        }

        .dash-badge-pts-label {
          font-size: 0.78rem;
          color: var(--muted);
          margin-left: 4px;
        }

        .dash-badge-progress-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .dash-badge-progress-bar {
          flex: 1;
          height: 12px;
          background: var(--bg2);
          border-radius: 9999px;
          overflow: hidden;
        }

        .dash-badge-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--green), var(--lime));
          border-radius: 9999px;
          transition: width 1.5s ease;
          position: relative;
        }

        .dash-badge-progress-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 200px 100%;
          animation: shimmer 2s ease-in-out infinite;
        }

        .dash-badge-percent {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--green);
          min-width: 40px;
          text-align: right;
        }

        .dash-badge-milestones {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .dash-milestone {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          background: var(--bg2);
          color: var(--muted);
        }

        .dash-milestone-done {
          background: rgba(22,163,74,0.1);
          color: var(--green);
        }

        .dash-milestone-circle {
          width: 14px;
          height: 14px;
          border: 2px solid var(--border);
          border-radius: 50%;
        }

        /* ========== QUICK ACTIONS ========== */
        .dash-section {
          margin-bottom: 28px;
        }

        .dash-section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 18px;
        }

        .dash-section-title svg {
          color: var(--green);
        }

        .dash-actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .dash-action-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 20px;
          text-decoration: none;
          color: var(--text);
          transition: all 0.3s ease;
        }

        .dash-action-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--green);
        }

        .dash-action-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dash-action-label {
          flex: 1;
          font-size: 0.92rem;
          font-weight: 600;
        }

        .dash-action-arrow {
          color: var(--muted);
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .dash-action-card:hover .dash-action-arrow {
          transform: translateX(4px);
          color: var(--green);
        }

        /* ========== BOTTOM GRID ========== */
        .dash-bottom-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
        }

        /* ========== ACTIVITY FEED ========== */
        .dash-activity-feed {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 8px;
          overflow: hidden;
        }

        .dash-activity-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 12px;
          transition: background 0.2s ease;
        }

        .dash-activity-item:hover {
          background: var(--bg2);
        }

        .dash-activity-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dash-activity-content {
          flex: 1;
          min-width: 0;
        }

        .dash-activity-text {
          font-size: 0.88rem;
          color: var(--text);
          font-weight: 500;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .dash-activity-time {
          font-size: 0.75rem;
          color: var(--muted);
          margin-top: 2px;
          display: block;
        }

        .dash-activity-points {
          font-size: 0.85rem;
          font-weight: 700;
          flex-shrink: 0;
          white-space: nowrap;
        }

        /* ========== PROFILE CARD ========== */
        .dash-profile-card {
          background: linear-gradient(135deg, #064e2b, #0a6e3a, #0d7c42);
          border-radius: 18px;
          overflow: hidden;
          color: #ffffff;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }

        .dash-profile-card-header {
          padding: 16px 20px 12px;
          display: flex;
          justify-content: flex-end;
        }

        .dash-profile-card-logo {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
        }

        .dash-profile-card-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 24px 20px;
          gap: 10px;
        }

        .dash-profile-card-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 3px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
        }

        .dash-profile-card-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
        }

        .dash-profile-card-badge-text {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--lime);
          font-size: 0.82rem;
          font-weight: 600;
        }

        .dash-profile-card-stats-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 8px;
          padding: 12px 20px;
          background: rgba(255,255,255,0.08);
          border-radius: 10px;
          width: 100%;
          justify-content: center;
        }

        .dash-pc-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .dash-pc-stat strong {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
        }

        .dash-pc-stat span {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.6);
        }

        .dash-pc-divider {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,0.15);
        }

        .dash-profile-card-meta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.55);
        }

        .dash-profile-card-meta-row span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dash-profile-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          background: rgba(0,0,0,0.15);
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
        }

        .dash-download-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 13px;
          background: var(--card);
          border: 2px solid var(--border);
          border-radius: 12px;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--green);
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 16px;
          font-family: 'DM Sans', sans-serif;
        }

        .dash-download-btn:hover {
          border-color: var(--green);
          background: rgba(22,163,74,0.05);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .dash-download-btn:active {
          transform: scale(0.97);
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .dash-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dash-actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dash-bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-page {
            padding-top: calc(var(--navbar-height) + 16px);
            padding-bottom: 56px;
          }

          .dash-welcome {
            padding: 24px 20px;
            border-radius: 16px;
          }

          .dash-welcome-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .dash-welcome-left {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }

          .dash-welcome-name {
            font-size: 1.3rem;
          }

          .dash-welcome-meta {
            gap: 10px;
          }

          .dash-welcome-right {
            width: 100%;
          }

          .dash-welcome-points {
            flex-direction: row;
            gap: 12px;
            padding: 14px 20px;
            justify-content: center;
          }

          .dash-points-num {
            font-size: 1.6rem;
          }

          .dash-stats-grid,
          .dash-actions-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .dash-stat-card {
            padding: 18px;
          }

          .dash-stat-value {
            font-size: 1.4rem;
          }

          .dash-badge-card {
            padding: 20px;
          }

          .dash-badge-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .dash-badge-milestones {
            gap: 8px;
          }

          .dash-milestone {
            font-size: 0.72rem;
            padding: 5px 10px;
          }

          .dash-bottom-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .dash-activity-item {
            padding: 12px;
          }
        }

        @media (max-width: 480px) {
          .dash-stats-grid {
            grid-template-columns: 1fr;
          }

          .dash-actions-grid {
            grid-template-columns: 1fr;
          }

          .dash-welcome {
            padding: 20px 16px;
          }

          .dash-avatar-circle {
            width: 56px;
            height: 56px;
            font-size: 1.3rem;
          }

          .dash-welcome-name {
            font-size: 1.15rem;
          }

          .dash-meta-item {
            font-size: 0.75rem;
          }

          .dash-badge-milestones {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;