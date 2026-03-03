import React from 'react';

const tickerItems = [
  '🔥 #ZeroWasteStreet • 234 joined today',
  '♻️ #CollegeCleanWars • BIT Mesra leading!',
  '🌊 #RiverRevival • 45 reports this week',
  '⚡ #MyBinMyPride • New challenge live!',
  '🌍 #30DayGreenStreak • 89 active streaks',
  '🏆 #TrashIttRanchi • 1247 citizens joined',
];

function Ticker() {
  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        {tickerItems.map((item, index) => (
          <div className="ticker-item" key={`a-${index}`}>
            <span className="ticker-text">{item}</span>
            <span className="ticker-separator">✦</span>
          </div>
        ))}
        {tickerItems.map((item, index) => (
          <div className="ticker-item" key={`b-${index}`}>
            <span className="ticker-text">{item}</span>
            <span className="ticker-separator">✦</span>
          </div>
        ))}
        {tickerItems.map((item, index) => (
          <div className="ticker-item" key={`c-${index}`}>
            <span className="ticker-text">{item}</span>
            <span className="ticker-separator">✦</span>
          </div>
        ))}
        {tickerItems.map((item, index) => (
          <div className="ticker-item" key={`d-${index}`}>
            <span className="ticker-text">{item}</span>
            <span className="ticker-separator">✦</span>
          </div>
        ))}
      </div>

      <style>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
          background: linear-gradient(90deg, #064e2b, #0a5c32, #064e2b);
          padding: 12px 0;
          position: relative;
          user-select: none;
          -webkit-user-select: none;
        }

        [data-theme="dark"] .ticker-wrapper {
          background: linear-gradient(90deg, #072e19, #0a3d22, #072e19);
        }

        .ticker-wrapper::before,
        .ticker-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          z-index: 2;
          pointer-events: none;
        }

        .ticker-wrapper::before {
          left: 0;
          background: linear-gradient(90deg, #064e2b 0%, transparent 100%);
        }

        .ticker-wrapper::after {
          right: 0;
          background: linear-gradient(270deg, #064e2b 0%, transparent 100%);
        }

        [data-theme="dark"] .ticker-wrapper::before {
          background: linear-gradient(90deg, #072e19 0%, transparent 100%);
        }

        [data-theme="dark"] .ticker-wrapper::after {
          background: linear-gradient(270deg, #072e19 0%, transparent 100%);
        }

        .ticker-track {
          display: flex;
          align-items: center;
          animation: tickerScroll 45s linear infinite;
          width: max-content;
        }

        .ticker-wrapper:hover .ticker-track {
          animation-play-state: paused;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 8px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .ticker-text {
          font-family: "Syne Mono", monospace;
          font-size: 0.88rem;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 0.01em;
          opacity: 0.95;
        }

        .ticker-separator {
          color: rgba(132, 204, 22, 0.6);
          font-size: 0.65rem;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .ticker-text {
            font-size: 0.8rem;
          }

          .ticker-wrapper {
            padding: 10px 0;
          }

          .ticker-wrapper::before,
          .ticker-wrapper::after {
            width: 30px;
          }

          .ticker-track {
            animation-duration: 35s;
          }
        }

        @media (max-width: 480px) {
          .ticker-text {
            font-size: 0.75rem;
          }

          .ticker-item {
            gap: 12px;
            padding: 0 6px;
          }

          .ticker-track {
            animation-duration: 30s;
          }
        }
      `}</style>
    </div>
  );
}

export default Ticker;