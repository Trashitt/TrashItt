import React from 'react';
import { Link } from 'react-router-dom';
import myLogo from 'C:/Users/WELLCOM/Desktop/TrashItt frontend/TrashItt/src/logo.png';

import {
  Leaf,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Heart,
  ArrowUpRight,
  ChevronRight,
  Recycle,
} from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Waste Guide', path: '/waste-guide' },
    { label: 'AI Scanner', path: '/scanner' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'FAQ', path: '/faq' },
  ];

  const challengeLinks = [
    { label: '#ZeroWasteStreet', path: '/challenges' },
    { label: '#CollegeCleanWars', path: '/challenges' },
    { label: '#RiverRevival', path: '/challenges' },
    { label: '#MyBinMyPride', path: '/challenges' },
    { label: '#30DayGreenStreak', path: '/challenges' },
  ];

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Column 1: About */}
            <div className="footer-col footer-col-about">
               <Link to="/" className="footer-logo" aria-label="TrashItt Home">
                          <img src={myLogo} alt="TrashItt Logo" className="footer-logo-img" />
                        </Link>
              <p className="footer-about-text">
                Making Ranchi Cleaner, One Step at a Time. TrashItt is a smart waste segregation 
                and recycling platform built for the people of Ranchi, Jharkhand.
              </p>
              <div className="footer-socials">
                <a
                  href="https://instagram.com/trashitt_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">
                      <ChevronRight size={14} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Challenges */}
            <div className="footer-col">
              <h4 className="footer-col-title">Challenges</h4>
              <ul className="footer-links">
                {challengeLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">
                      <ChevronRight size={14} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact</h4>
              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <MapPin size={16} />
                  <span>Ranchi, Jharkhand, India</span>
                </li>
                <li className="footer-contact-item">
                  <Mail size={16} />
                  <a href="mailto:hello@trashitt.in">hello@trashitt.in</a>
                </li>
                <li className="footer-contact-item">
                  <Phone size={16} />
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </li>
                <li className="footer-contact-item">
                  <Instagram size={16} />
                  <a
                    href="https://instagram.com/trashitt_official"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @trashitt_official
                  </a>
                </li>
              </ul>

              <div className="footer-newsletter">
                <p className="footer-newsletter-label">Stay Updated</p>
                <div className="footer-newsletter-form">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="footer-newsletter-input"
                    aria-label="Email for newsletter"
                  />
                  <button className="footer-newsletter-btn" aria-label="Subscribe">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-inner">
            <div className="footer-copyright">
              <Recycle size={16} className="footer-recycle-icon" />
              <span>
                © {currentYear} TrashItt. All rights reserved. Made with{' '}
                <Heart size={12} style={{ display: 'inline', verticalAlign: 'middle', color: '#dc2626', fill: '#dc2626' }} />{' '}
                in Ranchi
              </span>
            </div>
            <div className="footer-tagline">
              Making Ranchi Cleaner, One Step at a Time 🌿
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: linear-gradient(180deg, #064e2b 0%, #042f1a 60%, #021a0f 100%);
          color: #c8e6d0;
          position: relative;
          overflow: hidden;
        }

        [data-theme="dark"] .footer {
          background: linear-gradient(180deg, #0a2415 0%, #061a0d 60%, #030f07 100%);
        }

        .footer-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 240px;
          background: radial-gradient(ellipse, rgba(22, 163, 74, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .footer-top {
          padding: 64px 0 48px;
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
          gap: 40px;
        }

        .footer-col-about {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          z-index: 10;
          transform: translateX(-20px);
        }

        /* NEW LOGO IMAGE STYLES */
        .footer-logo-img {
          height: 100px; 
          width: auto;
          object-fit: contain;
          transition: transform 0.3s ease;
          filter: invert(1) hue-rotate(180deg) brightness(1.2); 
                 }

        .footer-logo:hover .footer-logo-img {
          transform: scale(1.05); 
        }

        
[data-theme="dark"] .footer-logo-img {
  filter: invert(1) hue-rotate(180deg) brightness(1.2); 
}

        .footer-about-text {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #9cc5a6;
          max-width: 300px;
        }

        .footer-socials {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .footer-social-link {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #c8e6d0;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .footer-social-link:hover {
          background: var(--green);
          color: #ffffff;
          border-color: var(--green);
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
        }

        .footer-col-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #ffffff;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 12px;
        }

        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 3px;
          background: linear-gradient(90deg, var(--green), var(--teal));
          border-radius: 2px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: #9cc5a6;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .footer-link:hover {
          color: #ffffff;
          transform: translateX(4px);
        }

        .footer-link:hover svg {
          color: var(--green);
        }

        .footer-link svg {
          flex-shrink: 0;
          transition: color 0.25s ease;
        }

        .footer-contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: #9cc5a6;
        }

        .footer-contact-item svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--green);
        }

        .footer-contact-item a {
          color: #9cc5a6;
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .footer-contact-item a:hover {
          color: #ffffff;
        }

        .footer-newsletter {
          margin-top: 20px;
        }

        .footer-newsletter-label {
          font-size: 0.85rem;
          color: #9cc5a6;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .footer-newsletter-form {
          display: flex;
          gap: 0;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .footer-newsletter-input {
          flex: 1;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          font-size: 0.85rem;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
        }

        .footer-newsletter-input::placeholder {
          color: #6b9c78;
        }

        .footer-newsletter-input:focus {
          background: rgba(255, 255, 255, 0.1);
        }

        .footer-newsletter-btn {
          width: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--green), var(--accent));
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .footer-newsletter-btn:hover {
          background: linear-gradient(135deg, var(--accent), var(--teal));
        }

        .footer-newsletter-btn:active {
          transform: scale(0.95);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 20px 0;
          position: relative;
          z-index: 1;
        }

        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-copyright {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #7aac87;
        }

        .footer-recycle-icon {
          color: var(--green);
          animation: spin 8s linear infinite;
        }

        .footer-tagline {
          font-size: 0.85rem;
          color: #7aac87;
          font-style: italic;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }

          .footer-top {
            padding: 48px 0 40px;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .footer-about-text {
            max-width: 100%;
          }

          .footer-top {
            padding: 40px 0 32px;
          }

          .footer-container {
            padding: 0 16px;
          }

          .footer-bottom-inner {
            flex-direction: column;
            text-align: center;
          }

          .footer-glow {
            width: 400px;
            height: 160px;
          }
        }

        @media (max-width: 480px) {
          .footer-socials {
            justify-content: flex-start;
          }

          .footer-newsletter-form {
            flex-direction: column;
          }

          .footer-newsletter-btn {
            width: 100%;
            height: 42px;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;