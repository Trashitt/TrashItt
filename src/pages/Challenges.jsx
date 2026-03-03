import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Flame,
  Users,
  Star,
  Clock,
  ArrowRight,
  ChevronRight,
  Zap,
  Target,
  MapPin,
  GraduationCap,
  Medal,
  TrendingUp,
  Calendar,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Ticker from '../components/Ticker.jsx';

const challenges = [
  {
    id: 1,
    tag: '#ZeroWasteStreet',
    title: 'Zero Waste Street Challenge',
    desc: 'Make your street 100% waste-free for 30 days. Report daily, clean regularly, and inspire your neighbors to segregate waste properly.',
    emoji: '🔥',
    points: 500,
    participants: 234,
    progress: 72,
    duration: '30 Days',
    difficulty: 'Hard',
    difficultyColor: '#dc2626',
    status: 'active',
    startDate: 'March 1, 2026',
    endDate: 'March 31, 2026',
    tasks: ['Daily waste report', 'Street cleanup weekly', 'Neighbor onboarding'],
  },
  {
    id: 2,
    tag: '#CollegeCleanWars',
    title: 'College Clean Wars',
    desc: 'Inter-college competition for the greenest campus in Ranchi. Each college earns collective points through waste segregation and cleanup drives.',
    emoji: '🏫',
    points: 300,
    participants: 156,
    progress: 58,
    duration: '21 Days',
    difficulty: 'Medium',
    difficultyColor: '#d97706',
    status: 'active',
    startDate: 'March 5, 2026',
    endDate: 'March 26, 2026',
    tasks: ['Campus audit', 'Bin labelling drive', 'Team cleanup event'],
  },
  {
    id: 3,
    tag: '#RiverRevival',
    title: 'River Revival Mission',
    desc: 'Clean and restore Ranchi\'s rivers and water bodies. Report pollution, organize cleanup drives, and monitor water quality improvements.',
    emoji: '🌊',
    points: 400,
    participants: 89,
    progress: 45,
    duration: '45 Days',
    difficulty: 'Hard',
    difficultyColor: '#dc2626',
    status: 'active',
    startDate: 'Feb 15, 2026',
    endDate: 'March 31, 2026',
    tasks: ['River site report', 'Pollution documentation', 'Cleanup participation'],
  },
  {
    id: 4,
    tag: '#MyBinMyPride',
    title: 'My Bin My Pride',
    desc: 'Decorate and maintain your own waste segregation bin at home. Share photos, inspire others, and earn points for consistent segregation.',
    emoji: '🗑️',
    points: 200,
    participants: 445,
    progress: 83,
    duration: '14 Days',
    difficulty: 'Easy',
    difficultyColor: '#16a34a',
    status: 'active',
    startDate: 'March 10, 2026',
    endDate: 'March 24, 2026',
    tasks: ['Bin setup photo', 'Daily segregation log', '3 friend referrals'],
  },
  {
    id: 5,
    tag: '#30DayGreenStreak',
    title: '30 Day Green Streak',
    desc: 'Maintain a perfect 30-day streak of daily waste scanning and correct segregation. The ultimate test of consistency and commitment!',
    emoji: '🌍',
    points: 1000,
    participants: 89,
    progress: 32,
    duration: '30 Days',
    difficulty: 'Expert',
    difficultyColor: '#7c3aed',
    status: 'active',
    startDate: 'March 1, 2026',
    endDate: 'March 31, 2026',
    tasks: ['Daily scan (min 1)', 'No missed days', 'Share 5 results'],
  },
];

const collegeLeaderboard = [
  { rank: 1, name: 'BIT Mesra', points: 4520, members: 89, emoji: '🏆', trend: '+340' },
  { rank: 2, name: 'Xavier\'s Ranchi', points: 3890, members: 67, emoji: '🥈', trend: '+280' },
  { rank: 3, name: 'DPS Ranchi', points: 3210, members: 54, emoji: '🥉', trend: '+190' },
  { rank: 4, name: 'Ranchi University', points: 2980, members: 72, emoji: '4️⃣', trend: '+150' },
  { rank: 5, name: 'St. Xavier\'s College', points: 2640, members: 45, emoji: '5️⃣', trend: '+120' },
  { rank: 6, name: 'Marwari College', points: 2180, members: 38, emoji: '6️⃣', trend: '+95' },
  { rank: 7, name: 'Nirmala College', points: 1920, members: 31, emoji: '7️⃣', trend: '+80' },
  { rank: 8, name: 'Gossner College', points: 1650, members: 28, emoji: '8️⃣', trend: '+65' },
];

function Challenges() {
  const [activeTab, setActiveTab] = useState('challenges');
  const [joinedChallenges, setJoinedChallenges] = useState([4]);
  const [expandedChallenge, setExpandedChallenge] = useState(null);

  const handleJoin = (id, tag) => {
    if (joinedChallenges.includes(id)) {
      toast('You\'ve already joined this challenge! 💪');
      return;
    }
    setJoinedChallenges((prev) => [...prev, id]);
    toast.success(`Joined ${tag}! +50 bonus points 🎉`);
  };

  const toggleExpand = (id) => {
    setExpandedChallenge(expandedChallenge === id ? null : id);
  };

  return (
    <div className="challenges-page page-wrapper">
      {/* Hero */}
      <section className="ch-hero">
        <div className="ch-hero-bg" />
        <div className="ch-hero-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="ch-fire-particle"
              style={{
                left: `${10 + Math.random() * 80}%`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${14 + Math.random() * 18}px`,
                opacity: 0.3 + Math.random() * 0.5,
              }}
            >
              🔥
            </div>
          ))}
        </div>
        <div className="container">
          <div className="ch-hero-content">
            <div className="ch-hero-badge">
              <Flame size={14} />
              <span>Active Challenges</span>
            </div>
            <h1>
              <span className="hero-highlight">Compete.</span> Clean.<br />
              <span className="hero-highlight">Conquer.</span>
            </h1>
            <p>
              Join exciting eco-challenges, compete with fellow citizens,
              and earn massive green points while making Ranchi cleaner!
            </p>
            <div className="ch-hero-stats">
              <div className="ch-hero-stat">
                <strong>5</strong>
                <span>Active Challenges</span>
              </div>
              <div className="ch-hero-stat-divider" />
              <div className="ch-hero-stat">
                <strong>1,013</strong>
                <span>Total Participants</span>
              </div>
              <div className="ch-hero-stat-divider" />
              <div className="ch-hero-stat">
                <strong>2,400</strong>
                <span>Max Points</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* Main Content */}
      <section className="ch-main">
        <div className="container">
          {/* Tabs */}
          <div className="ch-tabs">
            <button
              className={`ch-tab ${activeTab === 'challenges' ? 'ch-tab-active' : ''}`}
              onClick={() => setActiveTab('challenges')}
            >
              <Trophy size={18} />
              <span>Challenges</span>
            </button>
            <button
              className={`ch-tab ${activeTab === 'college' ? 'ch-tab-active' : ''}`}
              onClick={() => setActiveTab('college')}
            >
              <GraduationCap size={18} />
              <span>College Leaderboard</span>
            </button>
          </div>

          {/* Challenges Tab */}
          {activeTab === 'challenges' && (
            <div className="ch-challenges-list">
              {challenges.map((challenge, i) => {
                const isJoined = joinedChallenges.includes(challenge.id);
                const isExpanded = expandedChallenge === challenge.id;

                return (
                  <div
                    className={`ch-challenge-card ${isExpanded ? 'ch-card-expanded' : ''}`}
                    key={challenge.id}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="ch-card-main" onClick={() => toggleExpand(challenge.id)}>
                      <div className="ch-card-left">
                        <span className="ch-card-emoji">{challenge.emoji}</span>
                        <div className="ch-card-info">
                          <div className="ch-card-top-row">
                            <span className="ch-card-tag">{challenge.tag}</span>
                            <span
                              className="ch-card-difficulty"
                              style={{
                                color: challenge.difficultyColor,
                                background: `${challenge.difficultyColor}15`,
                              }}
                            >
                              {challenge.difficulty}
                            </span>
                          </div>
                          <h3 className="ch-card-title">{challenge.title}</h3>
                          <p className="ch-card-desc">{challenge.desc}</p>

                          <div className="ch-card-meta">
                            <span className="ch-card-meta-item">
                              <Users size={14} />
                              {challenge.participants} joined
                            </span>
                            <span className="ch-card-meta-item">
                              <Clock size={14} />
                              {challenge.duration}
                            </span>
                            <span className="ch-card-meta-item">
                              <Star size={14} />
                              {challenge.points} pts
                            </span>
                          </div>

                          <div className="ch-card-progress-area">
                            <div className="ch-card-progress-info">
                              <span>Progress</span>
                              <span>{challenge.progress}%</span>
                            </div>
                            <div className="ch-card-progress-bar">
                              <div
                                className="ch-card-progress-fill"
                                style={{ width: `${challenge.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ch-card-right">
                        <div className="ch-card-points-badge">
                          <Zap size={16} />
                          <span>{challenge.points}</span>
                          <small>pts</small>
                        </div>
                        <ChevronRight
                          size={20}
                          className={`ch-card-chevron ${isExpanded ? 'ch-card-chevron-open' : ''}`}
                        />
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <div className={`ch-card-expanded-content ${isExpanded ? 'ch-card-expanded-open' : ''}`}>
                      <div className="ch-expanded-inner">
                        <div className="ch-expanded-grid">
                          <div className="ch-expanded-detail">
                            <Calendar size={16} />
                            <div>
                              <strong>Duration</strong>
                              <span>{challenge.startDate} — {challenge.endDate}</span>
                            </div>
                          </div>
                          <div className="ch-expanded-detail">
                            <Target size={16} />
                            <div>
                              <strong>Difficulty</strong>
                              <span style={{ color: challenge.difficultyColor }}>{challenge.difficulty}</span>
                            </div>
                          </div>
                        </div>

                        <div className="ch-expanded-tasks">
                          <strong>Tasks to Complete:</strong>
                          <ul>
                            {challenge.tasks.map((task, ti) => (
                              <li key={ti}>
                                <CheckCircle size={14} />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          className={`ch-join-btn ${isJoined ? 'ch-join-btn-joined' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoin(challenge.id, challenge.tag);
                          }}
                        >
                          {isJoined ? (
                            <>
                              <CheckCircle size={18} />
                              <span>Joined</span>
                            </>
                          ) : (
                            <>
                              <ArrowUpRight size={18} />
                              <span>Join Challenge</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* College Leaderboard Tab */}
          {activeTab === 'college' && (
            <div className="ch-college-section">
              <div className="ch-college-header">
                <div className="ch-college-header-badge">
                  <GraduationCap size={14} />
                  <span>#CollegeCleanWars</span>
                </div>
                <h2>College Leaderboard</h2>
                <p>Which college will take the crown for the greenest campus in Ranchi?</p>
              </div>

              {/* Top 3 Podium */}
              <div className="ch-podium">
                <div className="ch-podium-item ch-podium-2">
                  <div className="ch-podium-avatar">🥈</div>
                  <div className="ch-podium-rank">2</div>
                  <h4>{collegeLeaderboard[1].name}</h4>
                  <span className="ch-podium-pts">{collegeLeaderboard[1].points.toLocaleString()} pts</span>
                  <span className="ch-podium-members">{collegeLeaderboard[1].members} members</span>
                  <div className="ch-podium-bar ch-podium-bar-2" />
                </div>

                <div className="ch-podium-item ch-podium-1">
                  <div className="ch-podium-crown">👑</div>
                  <div className="ch-podium-avatar ch-podium-avatar-gold">🏆</div>
                  <div className="ch-podium-rank ch-podium-rank-gold">1</div>
                  <h4>{collegeLeaderboard[0].name}</h4>
                  <span className="ch-podium-pts">{collegeLeaderboard[0].points.toLocaleString()} pts</span>
                  <span className="ch-podium-members">{collegeLeaderboard[0].members} members</span>
                  <div className="ch-podium-bar ch-podium-bar-1" />
                </div>

                <div className="ch-podium-item ch-podium-3">
                  <div className="ch-podium-avatar">🥉</div>
                  <div className="ch-podium-rank">3</div>
                  <h4>{collegeLeaderboard[2].name}</h4>
                  <span className="ch-podium-pts">{collegeLeaderboard[2].points.toLocaleString()} pts</span>
                  <span className="ch-podium-members">{collegeLeaderboard[2].members} members</span>
                  <div className="ch-podium-bar ch-podium-bar-3" />
                </div>
              </div>

              {/* Full Table */}
              <div className="ch-college-table-wrap">
                <table className="ch-college-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>College</th>
                      <th>Members</th>
                      <th>Points</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeLeaderboard.map((college) => (
                      <tr key={college.rank} className={college.rank <= 3 ? 'ch-row-top3' : ''}>
                        <td>
                          <span className="ch-table-rank">{college.emoji}</span>
                        </td>
                        <td>
                          <span className="ch-table-name">{college.name}</span>
                        </td>
                        <td>
                          <span className="ch-table-members">
                            <Users size={14} />
                            {college.members}
                          </span>
                        </td>
                        <td>
                          <span className="ch-table-points">{college.points.toLocaleString()}</span>
                        </td>
                        <td>
                          <span className="ch-table-trend">
                            <TrendingUp size={12} />
                            {college.trend}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .challenges-page {
          padding-top: var(--navbar-height);
          animation: fadeInUp 0.5s ease forwards;
        }

        /* ========== HERO ========== */
        .ch-hero {
          position: relative;
          padding: 64px 0 56px;
          background: linear-gradient(135deg, #000000, #01380d, #024e0e);
          overflow: hidden;
        }

        .ch-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 30% 50%, rgba(251,146,60,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 20%, rgba(220,38,38,0.1) 0%, transparent 50%);
        }

        .ch-hero-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .ch-fire-particle {
          position: absolute;
          bottom: -20px;
          animation: fireFloat linear infinite;
        }

        @keyframes fireFloat {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-400px) scale(0.3);
            opacity: 0;
          }
        }

        .ch-hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: #ffffff;
        }

        .ch-hero-badge {
          margin-bottom: 18px;
          animation: pulse 2s ease-in-out infinite;
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


        .ch-hero h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3.2rem);
          line-height: 1.15;
          color: #ffffff !important;
          margin-bottom: 16px;
        }

        .ch-hero-highlight {
          color: #fb923c;
        }

        .ch-hero p {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.7);
          max-width: 580px;
          margin: 0 auto 28px;
          line-height: 1.7;
        }

        .ch-hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
        }

        .ch-hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .ch-hero-stat strong {
          font-family: var(--font-number);
          font-weight: 500;
          font-size: 2.5rem;
          color: #ffffff;
        }

        .ch-hero-stat span {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.55);
        }

        .ch-hero-stat-divider {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.15);
        }

        /* ========== MAIN ========== */
        .ch-main {
          padding: 48px 0 80px;
        }

        /* ========== TABS ========== */
        .ch-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .ch-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text2);
          background: var(--card);
          border: 2px solid var(--border);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .ch-tab:hover {
          border-color: var(--green);
          color: var(--green);
        }

        .ch-tab-active {
          background: rgba(22,163,74,0.08);
          border-color: var(--green);
          color: var(--green);
          box-shadow: 0 2px 12px rgba(22,163,74,0.1);
        }

        /* ========== CHALLENGE CARDS ========== */
        .ch-challenges-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .ch-challenge-card {
          background: var(--card);
          border: 1.5px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .ch-challenge-card:hover {
          border-color: var(--green);
          box-shadow: var(--shadow-md);
        }

        .ch-card-main {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 28px;
          cursor: pointer;
          gap: 20px;
        }

        .ch-card-left {
          display: flex;
          gap: 18px;
          flex: 1;
          min-width: 0;
        }

        .ch-card-emoji {
          font-size: 2.4rem;
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg2);
          border-radius: 14px;
        }

        .ch-card-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ch-card-top-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .ch-card-tag {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--green);
          background: rgba(22,163,74,0.1);
          padding: 4px 12px;
          border-radius: 9999px;
        }

        .ch-card-difficulty {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .ch-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text);
        }

        .ch-card-desc {
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ch-card-meta {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        .ch-card-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 500;
        }

        .ch-card-meta-item svg {
          color: var(--green);
        }

        .ch-card-progress-area {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-width: 400px;
        }

        .ch-card-progress-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--muted);
          font-weight: 600;
        }

        .ch-card-progress-bar {
          width: 100%;
          height: 8px;
          background: var(--bg2);
          border-radius: 9999px;
          overflow: hidden;
        }

        .ch-card-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--green), var(--teal));
          border-radius: 9999px;
          transition: width 1s ease;
        }

        .ch-card-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .ch-card-points-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 10px 18px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border-radius: 12px;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
        }

        .ch-card-points-badge small {
          font-size: 0.7rem;
          font-weight: 600;
          opacity: 0.7;
        }

        .ch-card-chevron {
          color: var(--muted);
          transition: transform 0.3s ease;
        }

        .ch-card-chevron-open {
          transform: rotate(90deg);
          color: var(--green);
        }

        /* Expanded Content */
        .ch-card-expanded-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .ch-card-expanded-open {
          max-height: 400px;
        }

        .ch-expanded-inner {
          padding: 0 28px 28px;
          border-top: 1px solid var(--border);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .ch-expanded-grid {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .ch-expanded-detail {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .ch-expanded-detail svg {
          color: var(--green);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .ch-expanded-detail strong {
          display: block;
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 600;
          margin-bottom: 2px;
        }

        .ch-expanded-detail span {
          font-size: 0.9rem;
          color: var(--text);
          font-weight: 600;
        }

        .ch-expanded-tasks strong {
          font-size: 0.88rem;
          color: var(--text);
          display: block;
          margin-bottom: 10px;
        }

        .ch-expanded-tasks ul {
          display: flex;
          flex-direction: column;
          gap: 8px;
          list-style: none;
        }

        .ch-expanded-tasks li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text2);
        }

        .ch-expanded-tasks li svg {
          color: var(--green);
          flex-shrink: 0;
        }

        .ch-join-btn {
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
          border: none;
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, var(--green), var(--accent));
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(22,163,74,0.25);
          align-self: flex-start;
        }

        .ch-join-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(22,163,74,0.35);
        }

        .ch-join-btn:active {
          transform: scale(0.97);
        }

        .ch-join-btn-joined {
          background: rgba(22,163,74,0.1);
          color: var(--green);
          box-shadow: none;
          border: 2px solid var(--green);
        }

        .ch-join-btn-joined:hover {
          transform: none;
          box-shadow: none;
        }

        /* ========== COLLEGE LEADERBOARD ========== */
        .ch-college-section {
          animation: fadeInUp 0.5s ease;
        }

        .ch-college-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .ch-college-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(22,163,74,0.1);
          color: var(--green);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .ch-college-header h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: 8px;
        }

        .ch-college-header p {
          color: var(--muted);
          font-size: 0.95rem;
        }

        /* Podium */
        .ch-podium {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 16px;
          margin-bottom: 40px;
          padding: 0 16px;
        }

        .ch-podium-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 24px 20px 0;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .ch-podium-item:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .ch-podium-1 {
          order: 2;
          min-width: 180px;
        }

        .ch-podium-2 {
          order: 1;
          min-width: 160px;
        }

        .ch-podium-3 {
          order: 3;
          min-width: 160px;
        }

        .ch-podium-crown {
          font-size: 1.5rem;
          animation: bounce 2s ease infinite;
        }

        .ch-podium-avatar {
          font-size: 2rem;
        }

        .ch-podium-avatar-gold {
          font-size: 2.5rem;
        }

        .ch-podium-rank {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg2);
          border-radius: 50%;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          color: var(--text);
        }

        .ch-podium-rank-gold {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #ffffff;
        }

        .ch-podium-item h4 {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          color: var(--text);
        }

        .ch-podium-pts {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--green);
        }

        .ch-podium-members {
          font-size: 0.75rem;
          color: var(--muted);
        }

        .ch-podium-bar {
          width: 100%;
          margin-top: 12px;
          border-radius: 8px 8px 0 0;
        }

        .ch-podium-bar-1 {
          height: 80px;
          background: linear-gradient(180deg, #f59e0b, #d97706);
        }

        .ch-podium-bar-2 {
          height: 56px;
          background: linear-gradient(180deg, #94a3b8, #64748b);
        }

        .ch-podium-bar-3 {
          height: 40px;
          background: linear-gradient(180deg, #c2854a, #a16b3d);
        }

        /* Table */
        .ch-college-table-wrap {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
        }

        .ch-college-table {
          width: 100%;
          border-collapse: collapse;
        }

        .ch-college-table th {
          padding: 14px 20px;
          text-align: left;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
        }

        .ch-college-table td {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          font-size: 0.92rem;
        }

        .ch-college-table tr:last-child td {
          border-bottom: none;
        }

        .ch-college-table tr:hover {
          background: rgba(22,163,74,0.03);
        }

        .ch-row-top3 {
          background: rgba(22,163,74,0.02);
        }

        .ch-table-rank {
          font-size: 1.2rem;
        }

        .ch-table-name {
          font-weight: 600;
          color: var(--text);
        }

        .ch-table-members {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--muted);
          font-size: 0.85rem;
        }

        .ch-table-points {
          font-weight: 700;
          color: var(--green);
          font-family: 'Syne', sans-serif;
        }

        .ch-table-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--green);
          font-size: 0.82rem;
          font-weight: 600;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .ch-hero {
            padding: 48px 0 40px;
          }

          .ch-hero h1 {
            font-size: 1.8rem;
          }

          .ch-hero-stats {
            gap: 16px;
          }

          .ch-hero-stat strong {
            font-size: 1.2rem;
          }

          .ch-main {
            padding: 32px 0 56px;
          }

          .ch-card-main {
            flex-direction: column;
            padding: 20px;
          }

          .ch-card-left {
            flex-direction: column;
          }

          .ch-card-emoji {
            width: 48px;
            height: 48px;
            font-size: 2rem;
          }

          .ch-card-right {
            flex-direction: row;
            align-self: flex-end;
          }

          .ch-expanded-inner {
            padding: 16px 20px 20px;
          }

          .ch-podium {
            flex-direction: column;
            align-items: center;
          }

          .ch-podium-1,
          .ch-podium-2,
          .ch-podium-3 {
            order: unset;
            min-width: 100%;
            max-width: 320px;
            padding-bottom: 0;
          }

          .ch-podium-bar {
            height: 8px !important;
            border-radius: 0;
          }

          .ch-college-table th,
          .ch-college-table td {
            padding: 12px 14px;
            font-size: 0.82rem;
          }

          .ch-tabs {
            gap: 6px;
          }

          .ch-tab {
            padding: 10px 18px;
            font-size: 0.88rem;
          }
        }

        @media (max-width: 480px) {
          .ch-hero h1 {
            font-size: 1.5rem;
          }

          .ch-hero-stats {
            flex-direction: column;
            gap: 12px;
          }

          .ch-hero-stat-divider {
            width: 40px;
            height: 1px;
          }

          .ch-card-meta {
            gap: 10px;
          }

          .ch-card-points-badge {
            font-size: 0.95rem;
            padding: 8px 14px;
          }

          .ch-college-table {
            font-size: 0.78rem;
          }

          .ch-college-table th,
          .ch-college-table td {
            padding: 10px 10px;
          }

          .ch-join-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Challenges;