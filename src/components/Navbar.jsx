import React, { useState, useEffect, useRef , useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import myLogo from '../assets/logo.png';
import {
  Home,
  BookOpen,
  ScanLine,
  Trophy,
  Medal,
  Image,
  Heart,
  Info,
  HelpCircle,
  Sun,
  Moon,
  Menu,
  X,
  LogIn,
  UserPlus,
  UserCircle,
  Truck,
} from 'lucide-react';

const allNavLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/waste-guide', label: 'Waste Guide', icon: BookOpen },
  { path: '/scanner', label: 'Scanner', icon: ScanLine, hideFor: ['Waste Collector'] },
  { path: '/challenges', label: 'Challenges', icon: Trophy, comingSoon: true },
  { path: '/leaderboard', label: 'Leaderboard', icon: Medal, comingSoon: true },
  { path: '/ngo-drives', label: 'NGO Drives', icon: Heart, comingSoon: true },
  { path: '/waste-pickup', label: 'Waste Pickup', icon: Truck, hideFor: ['Waste Collector'] },
  { path: '/about', label: 'About', icon: Info },
  { path: '/faq', label: 'FAQ', icon: HelpCircle },
];

function Navbar({ theme, toggleTheme  }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const { isAuthenticated, userRole, loading } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Filter nav links based on user role
  const getFilteredNavLinks = () => {
    return allNavLinks.filter(link => {
      if (link.hideFor && link.hideFor.includes(userRole)) {
        return false;
      }
      return true;
    });
  };

  const navLinks = getFilteredNavLinks();

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner">
          
          <Link to="/" className="navbar-logo" aria-label="Home">
            <img src={myLogo} alt="Logo" className="navbar-logo-img" />
          </Link>

          <div className="navbar-links-desktop">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={(e) => {
                  if (link.comingSoon) {
                    e.preventDefault();
                    setShowToast(true);
                  }
                }}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? 'navbar-link-active' : ''}`
                }
                end={link.path === '/'}
              >
                <span className="navbar-link-label">{link.label}</span>
                <span className="navbar-link-dot" />
              </NavLink>
            ))}
          </div>

          <div className="navbar-actions">
            <button
              className="navbar-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <div className="theme-toggle-track">
                <div className={`theme-toggle-thumb ${theme === 'dark' ? 'theme-toggle-thumb-dark' : ''}`}>
                  {theme === 'light' ? <Sun size={14} /> : <Moon size={14} />}
                </div>
              </div>
            </button>

            {/* CONDITIONAL RENDERING FOR DESKTOP AUTH BUTTONS */}
            {/* ENHANCED PROFILE ICON FOR DESKTOP */}
{isAuthenticated ? (
  <Link to={userRole === 'Waste Collector' ? "/collector-dashboard" : "/dashboard"} className="navbar-profile-container" aria-label="Dashboard">
      <UserCircle size={32} strokeWidth={1.2} />
      <div className="profile-online-indicator"></div>
  </Link>
) : (
  <>
    <Link to="/login" className="navbar-btn navbar-btn-login">
      <LogIn size={16} />
      <span>Login</span>
    </Link>

    <Link to="/signup" className="navbar-btn navbar-btn-signup">
      <UserPlus size={16} />
      <span>Sign Up</span>
    </Link>
  </>
)}

            <button
              className="navbar-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {showToast && (
        <div className="navbar-toast">
          <div className="navbar-toast-content">
            <span className="navbar-toast-text">Coming Soon! This feature will be live very soon!</span>
          </div>
        </div>
      )}

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}

      <div
        ref={mobileMenuRef}
        className={`mobile-menu ${mobileOpen ? 'mobile-menu-open' : ''}`}
      >
        <div className="mobile-menu-header">
          {/* MOBILE MENU LOGO */}
          <Link to="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
            <img src={myLogo} alt="Logo" className="navbar-logo-img" />
          </Link>
          <button
            className="mobile-menu-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mobile-menu-links">
          {navLinks.map((link, index) => {
            const IconComp = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`
                }
                end={link.path === '/'}
                onClick={(e) => {
                  if (link.comingSoon) {
                    e.preventDefault();
                    setShowToast(true);
                  }
                  setMobileOpen(false);
                }}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <IconComp size={20} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="mobile-menu-footer">
          <div className="mobile-menu-auth">
            {/* CONDITIONAL RENDERING FOR MOBILE AUTH BUTTONS */}
            {isAuthenticated ? (
              <Link
                to={userRole === 'Waste Collector' ? "/collector-dashboard" : "/dashboard"}
                className="navbar-btn navbar-btn-signup mobile-auth-btn"
                onClick={() => setMobileOpen(false)}
              >
                <UserCircle size={18} />
                <span>Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="navbar-btn navbar-btn-login mobile-auth-btn"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="navbar-btn navbar-btn-signup mobile-auth-btn"
                  onClick={() => setMobileOpen(false)}
                >
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          <button
            className="mobile-theme-toggle"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </div>

      <style>{`
        /* EXISTING STYLES... */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          transition: all 0.3s ease;
        }

        [data-theme="dark"] .navbar {
          background: rgba(7, 26, 14, 0.8);
        }

        .navbar-scrolled {
          height: 80px;
          background: rgba(240, 253, 244, 0.92);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 2px 20px var(--shadow);
        }

        [data-theme="dark"] .navbar-scrolled {
          background: rgba(7, 26, 14, 0.95);
        }

        .navbar-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          z-index: 10;
        }

        .navbar-logo-img {
          height: 70px;
          width: auto;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .navbar-logo:hover .navbar-logo-img {
          transform: scale(1.05);
        }

        [data-theme="dark"] .navbar-logo-img {
          filter: invert(1) hue-rotate(180deg) brightness(1.2); 
        }

        .navbar-links-desktop {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .navbar-link {
          position: relative;
          padding: 8px 14px;
          font-size: 0.88rem;
          font-weight: 500;
          color: rgb(255,255,255);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        [data-theme='light'] .navbar-link {
          color: #000000;
        }

        .navbar-link:hover {
          color: var(--green);
          background: rgba(22, 163, 74, 0.06);
        }

        .navbar-link-active {
          color: var(--green);
          font-weight: 600;
        }

        .navbar-link-dot {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%) scale(0);
          width: 80%;
          height: 2px;
          background: var(--green);
          border-radius: 2px;
          transition: transform 0.25s ease;
        }

        .navbar-link-active .navbar-link-dot {
          transform: translateX(-50%) scale(1);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .navbar-theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        .theme-toggle-track {
          width: 48px;
          height: 26px;
          background: var(--bg2);
          border: 2px solid var(--border);
          border-radius: 13px;
          position: relative;
          transition: all 0.3s ease;
        }

        .theme-toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, var(--green), var(--accent));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .theme-toggle-thumb-dark {
          left: calc(100% - 20px);
        }

        .navbar-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .navbar-btn:active {
          transform: scale(0.97);
        }

        .navbar-btn-login {
          background: transparent;
          border: 1.5px solid var(--green);
        }

        .navbar-btn-login:hover {
          background: linear-gradient(135deg, var(--green), var(--teal));
          color: #ffffff;
        }

        .navbar-btn-signup {
          color: #ffffff;
          background: linear-gradient(135deg, var(--green), var(--teal));
          border: 1.5px solid transparent;
          box-shadow: 0 2px 10px rgba(22, 163, 74, 0.2);
        }

        .navbar-btn-signup:hover {
          box-shadow: 0 4px 16px rgba(22, 163, 74, 0.35);
          transform: translateY(-1px);
        }

.navbar-profile-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-left: 10px;
}

.navbar-profile-container:hover {
  transform: scale(1.1);
}

.navbar-profile-container:hover {
border-radius:50%;  
background: linear-gradient(135deg, var(--green), var(--teal));
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3);
}


/* Adjustments for Mobile */
@media (max-width: 768px) {
  .profile-avatar-wrapper {
    width: 38px;
    height: 38px;
  }
  
  .navbar-profile-container:hover {
    transform: none; /* Disable hover scale on touch devices */
  }
}
        .navbar-hamburger {
          display: none;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          color: var(--text);
          border-radius: 10px;
          transition: all 0.25s ease;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .navbar-hamburger:hover {
          background: var(--bg2);
          color: var(--green);
        }

        .navbar-toast {
          position: fixed;
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999;
          animation: slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .navbar-toast-content {
          background: linear-gradient(135deg, var(--green), var(--teal));
          color: #ffffff;
          padding: 14px 24px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(22, 163, 74, 0.3);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          font-size: 0.95rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          min-width: 300px;
          justify-content: center;
        }

        .navbar-toast-text {
          text-align: center;
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 1001;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 320px;
          max-width: 85vw;
          height: 100vh;
          height: 100dvh;
          background: var(--card);
          border-left: 1px solid var(--border);
          z-index: 1002;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          box-shadow: -8px 0 30px rgba(0, 0, 0, 0.15);
        }

        .mobile-menu-open {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .mobile-menu-close {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          color: var(--text);
          background: var(--bg2);
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mobile-menu-close:hover {
          color: var(--red);
          background: rgba(220, 38, 38, 0.08);
        }

        .mobile-menu-links {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .mobile-menu-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 16px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text2);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.25s ease;
          animation: fadeInRight 0.4s ease forwards;
          opacity: 0;
        }

        .mobile-menu-link:hover {
          background: rgba(22, 163, 74, 0.06);
          color: var(--green);
        }

        .mobile-menu-link-active {
          background: rgba(22, 163, 74, 0.1);
          color: var(--green);
          font-weight: 600;
        }

        .mobile-menu-link-active svg {
          color: var(--green);
        }

        .mobile-menu-footer {
          padding: 16px 20px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
        }

        .mobile-menu-auth {
          display: flex;
          gap: 10px;
        }

        .mobile-auth-btn {
          flex: 1;
          justify-content: center;
          padding: 10px 12px;
          font-size: 0.85rem;
        }

        .mobile-theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text2);
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mobile-theme-toggle:hover {
          color: var(--green);
          border-color: var(--green);
        }

        @media (max-width: 1200px) {
          .navbar-links-desktop {
            gap: 2px;
          }

          .navbar-link {
            padding: 8px 10px;
            font-size: 0.82rem;
          }
        }

        @media (max-width: 1024px) {
          .navbar-links-desktop {
            display: none;
          }

          .navbar-hamburger {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .navbar-inner {
            padding: 0 16px;
          }

          .navbar-logo-img {
            height: 36px;
          }

          .mobile-menu {
            width: 300px;
          }

          .navbar-actions .navbar-btn span {
            display: none;
          }
          .navbar-actions .navbar-btn {
            padding: 8px 10px;
          }

          .navbar-toast-content {
            min-width: 250px;
            font-size: 0.9rem;
            padding: 12px 20px;
          }
        }

        @media (max-width: 480px) {
          .mobile-menu {
            width: 100%;
            max-width: 100vw;
          }

          .mobile-menu-auth {
            flex-direction: column;
          }

          .navbar-theme-toggle {
            display: none;
          }

          .navbar-actions {
            gap: 6px;
          }
        }

        @media (min-width: 1025px) {
          .mobile-menu,
          .mobile-overlay,
          .navbar-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;