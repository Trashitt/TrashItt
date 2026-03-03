import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  Users,
  Award,
  Zap,
  ChevronUp,
  ChevronDown,
  Minus,
  Shield,
  Target,
  Flame,
  Leaf,
  ScanLine,
  Flag,
  Recycle,
} from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Priya Sharma', points: 2840, badge: 'Planet Hero', avatar: 'PS', trend: 'up', scans: 156, college: 'BIT Mesra' },
  { rank: 2, name: 'Amit Verma', points: 2650, badge: 'Planet Hero', avatar: 'AV', trend: 'up', scans: 143, college: 'Xavier\'s Ranchi' },
  { rank: 3, name: 'Sneha Kumari', points: 2410, badge: 'Eco Champion', avatar: 'SK', trend: 'same', scans: 128, college: 'DPS Ranchi' },
  { rank: 4, name: 'Vikash Oraon', points: 2180, badge: 'Eco Champion', avatar: 'VO', trend: 'up', scans: 115, college: 'Ranchi University' },
  { rank: 5, name: 'Anjali Singh', points: 1950, badge: 'Eco Champion', avatar: 'AS', trend: 'down', scans: 102, college: 'St. Xavier\'s' },
  { rank: 6, name: 'Ravi Mahto', points: 1820, badge: 'Eco Champion', avatar: 'RM', trend: 'up', scans: 98, college: 'Marwari College' },
  { rank: 7, name: 'Neha Gupta', points: 1690, badge: 'Eco Champion', avatar: 'NG', trend: 'same', scans: 91, college: 'BIT Mesra' },
  { rank: 8, name: 'Sanjay Tirkey', points: 1540, badge: 'Eco Champion', avatar: 'ST', trend: 'up', scans: 84, college: 'Gossner College' },
  { rank: 9, name: 'Pooja Devi', points: 1420, badge: 'Eco Champion', avatar: 'PD', trend: 'down', scans: 78, college: 'Nirmala College' },
  { rank: 10, name: 'Deepak Sahu', points: 1350, badge: 'Eco Champion', avatar: 'DS', trend: 'up', scans: 72, college: 'Ranchi University' },
  { rank: 11, name: 'Kavita Lakra', points: 1280, badge: 'Green Warrior', avatar: 'KL', trend: 'same', scans: 68, college: 'Xavier\'s Ranchi' },
  { rank: 12, name: 'Manish Kumar', points: 1190, badge: 'Green Warrior', avatar: 'MK', trend: 'up', scans: 63, college: 'BIT Mesra' },
  { rank: 13, name: 'Sunita Munda', points: 1100, badge: 'Green Warrior', avatar: 'SM', trend: 'down', scans: 59, college: 'DPS Ranchi' },
  { rank: 14, name: 'Rohit Prasad', points: 1020, badge: 'Green Warrior', avatar: 'RP', trend: 'up', scans: 54, college: 'Marwari College' },
  { rank: 15, name: 'Anita Toppo', points: 940, badge: 'Green Warrior', avatar: 'AT', trend: 'same', scans: 50, college: 'Gossner College' },
  { rank: 16, name: 'Suresh Minj', points: 870, badge: 'Green Warrior', avatar: 'SM', trend: 'up', scans: 46, college: 'Nirmala College' },
  { rank: 17, name: 'Meena Kerketta', points: 790, badge: 'Green Warrior', avatar: 'MK', trend: 'down', scans: 42, college: 'St. Xavier\'s' },
  { rank: 18, name: 'Arun Ekka', points: 720, badge: 'Green Warrior', avatar: 'AE', trend: 'up', scans: 38, college: 'Ranchi University' },
  { rank: 19, name: 'Deepa Kumari', points: 650, badge: 'Green Warrior', avatar: 'DK', trend: 'same', scans: 34, college: 'BIT Mesra' },
  { rank: 20, name: 'Bijay Horo', points: 580, badge: 'Green Warrior', avatar: 'BH', trend: 'up', scans: 30, college: 'Xavier\'s Ranchi' },
  { rank: 21, name: 'Suman Devi', points: 510, badge: 'Eco Starter', avatar: 'SD', trend: 'down', scans: 27, college: 'DPS Ranchi' },
  { rank: 22, name: 'Prakash Nag', points: 450, badge: 'Eco Starter', avatar: 'PN', trend: 'up', scans: 24, college: 'Gossner College' },
  { rank: 23, name: 'Rahul Kumar', points: 340, badge: 'Green Warrior', avatar: 'RK', trend: 'up', scans: 42, college: 'BIT Mesra', isUser: true },
  { rank: 24, name: 'Geeta Munda', points: 280, badge: 'Eco Starter', avatar: 'GM', trend: 'same', scans: 15, college: 'Marwari College' },
  { rank: 25, name: 'Ashok Tirkey', points: 210, badge: 'Eco Starter', avatar: 'AT', trend: 'up', scans: 11, college: 'Nirmala College' },
];

const badges = [
  { name: 'Eco Starter', range: '0 – 100 pts', color: '#94a3b8', icon: Leaf, desc: 'Just getting started on your green journey.' },
  { name: 'Green Warrior', range: '101 – 500 pts', color: '#16a34a', icon: Shield, desc: 'A dedicated eco warrior making real impact.' },
  { name: 'Eco Champion', range: '501 – 1500 pts', color: '#2563eb', icon: Award, desc: 'Leading the charge in waste management.' },
  { name: 'Planet Hero', range: '1501+ pts', color: '#d97706', icon: Crown, desc: 'The ultimate green champion of Ranchi!' },
];

const earningGuide = [
  { action: 'Scan waste item', points: '+10', icon: ScanLine, color: '#16a34a' },
  { action: 'Submit waste report', points: '+20', icon: Flag, color: '#2563eb' },
  { action: 'Join a challenge', points: '+50', icon: Trophy, color: '#d97706' },
  { action: 'Complete challenge', points: '+100–1000', icon: Target, color: '#dc2626' },
  { action: 'Refer a friend', points: '+25', icon: Users, color: '#0d9488' },
  { action: 'Daily streak bonus', points: '+15/day', icon: Flame, color: '#f97316' },
  { action: 'Join NGO drive', points: '+100', icon: Recycle, color: '#7c3aed' },
  { action: 'Earn a new badge', points: '+100', icon: Award, color: '#ec4899' },
];

const timePeriods = ['All Time', 'This Month', 'This Week'];

function Leaderboard() {
  const [activePeriod, setActivePeriod] = useState('All Time');

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <ChevronUp size={14} />;
    if (trend === 'down') return <ChevronDown size={14} />;
    return <Minus size={14} />;
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return '#16a34a';
    if (trend === 'down') return '#dc2626';
    return '#94a3b8';
  };

  const getAvatarGradient = (rank) => {
    if (rank === 1) return 'linear-gradient(135deg, #f59e0b, #d97706)';
    if (rank === 2) return 'linear-gradient(135deg, #94a3b8, #64748b)';
    if (rank === 3) return 'linear-gradient(135deg, #c2854a, #a16b3d)';
    return 'linear-gradient(135deg, var(--green), var(--accent))';
  };

  const top3 = leaderboardData.slice(0, 3);
  const restList = leaderboardData.slice(3);

  return (
    <div className="leaderboard-page page-wrapper">
      <div className="container">
        {/* Hero */}
        <div className="lb-hero">
          <div className="lb-hero-badge">
            <Trophy size={14} />
            <span>Leaderboard</span>
          </div>
          <h1>Top <span className="hero-highlight">Eco Warriors</span> of Ranchi</h1>
          <p>See who's leading the charge for a cleaner Ranchi. Scan, segregate, and climb the ranks!</p>
        </div>

        {/* Period Toggle */}
        <div className="lb-period-tabs">
          {timePeriods.map((period) => (
            <button
              key={period}
              className={`lb-period-tab ${activePeriod === period ? 'lb-period-active' : ''}`}
              onClick={() => setActivePeriod(period)}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="lb-podium">
          {/* 2nd Place */}
          <div className="lb-podium-card lb-podium-2">
            <div className="lb-podium-medal">🥈</div>
            <div className="lb-podium-avatar" style={{ background: getAvatarGradient(2) }}>
              <span>{top3[1].avatar}</span>
            </div>
            <h3 className="lb-podium-name">{top3[1].name}</h3>
            <span className="lb-podium-badge-label">{top3[1].badge}</span>
            <div className="lb-podium-pts">
              <Star size={14} />
              <span>{top3[1].points.toLocaleString()}</span>
            </div>
            <div className="lb-podium-college">{top3[1].college}</div>
            <div className="lb-podium-bar lb-bar-silver" />
          </div>

          {/* 1st Place */}
          <div className="lb-podium-card lb-podium-1">
            <div className="lb-podium-crown">👑</div>
            <div className="lb-podium-medal">🏆</div>
            <div className="lb-podium-avatar lb-avatar-gold" style={{ background: getAvatarGradient(1) }}>
              <span>{top3[0].avatar}</span>
            </div>
            <h3 className="lb-podium-name">{top3[0].name}</h3>
            <span className="lb-podium-badge-label lb-badge-gold">{top3[0].badge}</span>
            <div className="lb-podium-pts lb-pts-gold">
              <Star size={16} />
              <span>{top3[0].points.toLocaleString()}</span>
            </div>
            <div className="lb-podium-college">{top3[0].college}</div>
            <div className="lb-podium-bar lb-bar-gold" />
          </div>

          {/* 3rd Place */}
          <div className="lb-podium-card lb-podium-3">
            <div className="lb-podium-medal">🥉</div>
            <div className="lb-podium-avatar" style={{ background: getAvatarGradient(3) }}>
              <span>{top3[2].avatar}</span>
            </div>
            <h3 className="lb-podium-name">{top3[2].name}</h3>
            <span className="lb-podium-badge-label">{top3[2].badge}</span>
            <div className="lb-podium-pts">
              <Star size={14} />
              <span>{top3[2].points.toLocaleString()}</span>
            </div>
            <div className="lb-podium-college">{top3[2].college}</div>
            <div className="lb-podium-bar lb-bar-bronze" />
          </div>
        </div>

        {/* Full Table */}
        <div className="lb-table-wrap">
          <table className="lb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Badge</th>
                <th>College</th>
                <th>Scans</th>
                <th>Points</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr
                  key={user.rank}
                  className={`lb-row ${user.isUser ? 'lb-row-user' : ''} ${user.rank <= 3 ? 'lb-row-top3' : ''}`}
                >
                  <td>
                    <span className="lb-rank-cell">
                      {user.rank <= 3 ? (
                        <span className="lb-rank-medal">
                          {user.rank === 1 && '🥇'}
                          {user.rank === 2 && '🥈'}
                          {user.rank === 3 && '🥉'}
                        </span>
                      ) : (
                        <span className="lb-rank-num">#{user.rank}</span>
                      )}
                    </span>
                  </td>
                  <td>
                    <div className="lb-user-cell">
                      <div
                        className="lb-user-avatar"
                        style={{ background: getAvatarGradient(user.rank) }}
                      >
                        {user.avatar}
                      </div>
                      <div className="lb-user-info">
                        <span className="lb-user-name">
                          {user.name}
                          {user.isUser && <span className="lb-you-badge">You</span>}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="lb-badge-cell">{user.badge}</span>
                  </td>
                  <td>
                    <span className="lb-college-cell">{user.college}</span>
                  </td>
                  <td>
                    <span className="lb-scans-cell">{user.scans}</span>
                  </td>
                  <td>
                    <span className="lb-points-cell">{user.points.toLocaleString()}</span>
                  </td>
                  <td>
                    <span
                      className="lb-trend-cell"
                      style={{ color: getTrendColor(user.trend) }}
                    >
                      {getTrendIcon(user.trend)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Badge System + Earning Guide */}
        <div className="lb-info-grid">
          {/* Badge System */}
          <div className="lb-info-card">
            <div className="lb-info-header">
              <Award size={22} />
              <h3>Badge System</h3>
            </div>
            <div className="lb-badges-list">
              {badges.map((badge) => {
                const IconComp = badge.icon;
                return (
                  <div className="lb-badge-item" key={badge.name}>
                    <div
                      className="lb-badge-icon-wrap"
                      style={{ background: `${badge.color}15`, color: badge.color }}
                    >
                      <IconComp size={20} />
                    </div>
                    <div className="lb-badge-info">
                      <strong style={{ color: badge.color }}>{badge.name}</strong>
                      <span className="lb-badge-range">{badge.range}</span>
                      <p className="lb-badge-desc">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Points Earning Guide */}
          <div className="lb-info-card">
            <div className="lb-info-header">
              <Zap size={22} />
              <h3>How to Earn Points</h3>
            </div>
            <div className="lb-earning-list">
              {earningGuide.map((item) => {
                const IconComp = item.icon;
                return (
                  <div className="lb-earning-item" key={item.action}>
                    <div
                      className="lb-earning-icon"
                      style={{ background: `${item.color}12`, color: item.color }}
                    >
                      <IconComp size={16} />
                    </div>
                    <span className="lb-earning-action">{item.action}</span>
                    <span
                      className="lb-earning-points"
                      style={{ color: item.color }}
                    >
                      {item.points}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .leaderboard-page {
          padding-top: calc(var(--navbar-height) + 24px);
          padding-bottom: 80px;
          animation: fadeInUp 0.5s ease forwards;
        }

        /* ========== HERO ========== */
        .lb-hero {
          text-align: center;
          margin-bottom: 32px;
          padding: 24px 0;
        }

        .lb-hero-badge {
          margin-bottom: 14px;
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
        }
          [data-theme='light'] .lb-hero-badge {
          color: #000000 ;
          background: rgba(0, 0, 0, 0.1);
        }
        

        .lb-hero h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 12px;
          background: linear-gradient(135deg, var(--yellow), #e5ff00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lb-hero p {
          color: var(--muted);
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ========== PERIOD TABS ========== */
        .lb-period-tabs {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 40px;
          padding: 4px;
          background: var(--bg2);
          border-radius: 14px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        .lb-period-tab {
          padding: 10px 24px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--muted);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .lb-period-tab:hover {
          color: var(--text);
        }

        .lb-period-active {
          background: var(--card);
          color: var(--green);
          box-shadow: var(--shadow-sm);
        }

        /* ========== PODIUM ========== */
        .lb-podium {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 48px;
          padding: 0 16px;
        }

        .lb-podium-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          background: var(--card);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 24px 24px 0;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .lb-podium-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
        }

        .lb-podium-1 {
          order: 2;
          min-width: 200px;
          border-color: rgba(245,158,11,0.3);
        }

        .lb-podium-2 {
          order: 1;
          min-width: 170px;
        }

        .lb-podium-3 {
          order: 3;
          min-width: 170px;
        }

        .lb-podium-crown {
          font-size: 1.6rem;
          animation: bounce 2s ease infinite;
          position: absolute;
          top: 8px;
          right: 12px;
        }

        .lb-podium-medal {
          font-size: 1.6rem;
        }

        .lb-podium-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          border: 3px solid var(--card);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .lb-avatar-gold {
          width: 68px;
          height: 68px;
          font-size: 1.3rem;
          box-shadow: 0 0 20px rgba(245,158,11,0.3);
        }

        .lb-podium-name {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
        }

        .lb-podium-badge-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--muted);
          padding: 3px 10px;
          background: var(--bg2);
          border-radius: 9999px;
        }

        .lb-badge-gold {
          background: rgba(245,158,11,0.1);
          color: #d97706;
        }

        .lb-podium-pts {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--green);
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
        }

        .lb-pts-gold {
          color: #d97706;
          font-size: 1.15rem;
        }

        .lb-podium-college {
          font-size: 0.75rem;
          color: var(--muted);
        }

        .lb-podium-bar {
          width: 100%;
          margin-top: 12px;
          border-radius: 10px 10px 0 0;
        }

        .lb-bar-gold {
          height: 90px;
          background: linear-gradient(180deg, #f59e0b, #d97706);
        }

        .lb-bar-silver {
          height: 60px;
          background: linear-gradient(180deg, #94a3b8, #64748b);
        }

        .lb-bar-bronze {
          height: 44px;
          background: linear-gradient(180deg, #c2854a, #a16b3d);
        }

        /* ========== TABLE ========== */
        .lb-table-wrap {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 48px;
        }

        .lb-table {
          width: 100%;
          border-collapse: collapse;
        }

        .lb-table thead {
          background: var(--bg2);
        }

        .lb-table th {
          padding: 14px 18px;
          text-align: left;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-bottom: 1px solid var(--border);
        }

        .lb-table td {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
          font-size: 0.9rem;
          vertical-align: middle;
        }

        .lb-table tr:last-child td {
          border-bottom: none;
        }

        .lb-table tbody tr {
          transition: background 0.2s ease;
        }

        .lb-table tbody tr:hover {
          background: rgba(22,163,74,0.03);
        }

        .lb-row-top3 {
          background: rgba(245,158,11,0.02);
        }

        .lb-row-user {
          background: rgba(22,163,74,0.08) !important;
          border-left: 4px solid var(--green);
        }

        .lb-row-user td:first-child {
          padding-left: 14px;
        }

        .lb-rank-cell {
          display: flex;
          align-items: center;
        }

        .lb-rank-medal {
          font-size: 1.3rem;
        }

        .lb-rank-num {
          font-weight: 700;
          color: var(--muted);
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
        }

        .lb-user-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lb-user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.8rem;
          font-family: 'Syne', sans-serif;
          flex-shrink: 0;
        }

        .lb-user-name {
          font-weight: 600;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .lb-you-badge {
          padding: 2px 8px;
          background: var(--green);
          color: #ffffff;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .lb-badge-cell {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text2);
          padding: 3px 10px;
          background: var(--bg2);
          border-radius: 9999px;
          white-space: nowrap;
        }

        .lb-college-cell {
          font-size: 0.85rem;
          color: var(--muted);
        }

        .lb-scans-cell {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text2);
        }

        .lb-points-cell {
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          color: var(--green);
          font-size: 0.95rem;
        }

        .lb-trend-cell {
          display: flex;
          align-items: center;
        }

        /* ========== INFO GRID ========== */
        .lb-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .lb-info-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 28px;
        }

        .lb-info-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .lb-info-header svg {
          color: var(--green);
        }

        .lb-info-header h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          color: var(--text);
        }

        /* Badge List */
        .lb-badges-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .lb-badge-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .lb-badge-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .lb-badge-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .lb-badge-info strong {
          font-size: 0.95rem;
          font-family: 'Syne', sans-serif;
        }

        .lb-badge-range {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--muted);
        }

        .lb-badge-desc {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.5;
          margin-top: 2px;
        }

        /* Earning List */
        .lb-earning-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .lb-earning-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: var(--bg);
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .lb-earning-item:hover {
          background: var(--bg2);
          transform: translateX(4px);
        }

        .lb-earning-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .lb-earning-action {
          flex: 1;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text2);
        }

        .lb-earning-points {
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .lb-info-grid {
            grid-template-columns: 1fr;
          }

          .lb-table th:nth-child(4),
          .lb-table td:nth-child(4) {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .leaderboard-page {
            padding-top: calc(var(--navbar-height) + 16px);
            padding-bottom: 56px;
          }

          .lb-hero h1 {
            font-size: 1.8rem;
          }

          .lb-podium {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }

          .lb-podium-1,
          .lb-podium-2,
          .lb-podium-3 {
            order: unset;
            min-width: 100%;
            max-width: 320px;
            padding-bottom: 0;
          }

          .lb-podium-bar {
            height: 8px !important;
            border-radius: 0;
          }

          .lb-podium-crown {
            position: static;
          }

          .lb-table th,
          .lb-table td {
            padding: 10px 12px;
            font-size: 0.82rem;
          }

          .lb-table th:nth-child(3),
          .lb-table td:nth-child(3),
          .lb-table th:nth-child(5),
          .lb-table td:nth-child(5) {
            display: none;
          }

          .lb-user-avatar {
            width: 30px;
            height: 30px;
            font-size: 0.7rem;
          }

          .lb-period-tabs {
            width: 100%;
          }

          .lb-period-tab {
            flex: 1;
            text-align: center;
            padding: 8px 12px;
            font-size: 0.82rem;
          }

          .lb-info-card {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .lb-hero h1 {
            font-size: 1.5rem;
          }

          .lb-table th:nth-child(7),
          .lb-table td:nth-child(7) {
            display: none;
          }

          .lb-table th,
          .lb-table td {
            padding: 8px 8px;
            font-size: 0.78rem;
          }

          .lb-user-cell {
            gap: 8px;
          }

          .lb-user-avatar {
            width: 26px;
            height: 26px;
            font-size: 0.65rem;
          }

          .lb-you-badge {
            font-size: 0.6rem;
            padding: 1px 6px;
          }

          .lb-earning-item {
            padding: 8px 10px;
          }

          .lb-badge-item {
            gap: 10px;
          }

          .lb-badge-icon-wrap {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </div>
  );
}

export default Leaderboard;