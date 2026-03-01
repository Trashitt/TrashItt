import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import WasteGuide from './pages/WasteGuide.jsx';
import WasteScanner from './pages/WasteScanner.jsx';
import Challenges from './pages/Challenges.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Gallery from './pages/Gallery.jsx';
import NgoDrives from './pages/NgoDrives.jsx';
import About from './pages/About.jsx';
import FAQ from './pages/FAQ.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('trashitt-theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('trashitt-theme', theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#071a0e' : '#f0fdf4');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const hideFooterRoutes = ['/login', '/signup'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/waste-guide" element={<WasteGuide />} />
          <Route path="/scanner" element={<WasteScanner />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/ngo-drives" element={<NgoDrives />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: 'calc(100vh - 72px)',
                  paddingTop: '72px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '16px',
                  textAlign: 'center',
                  padding: '72px 24px 48px',
                }}
              >
                <div
                  style={{
                    fontSize: '6rem',
                    lineHeight: 1,
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, var(--green), var(--teal))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  404
                </div>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem' }}>
                  Page Not Found
                </h2>
                <p style={{ color: 'var(--muted)', maxWidth: '400px' }}>
                  Looks like this page got recycled! Let's get you back on track.
                </p>
                <a
                  href="/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, var(--green), var(--accent))',
                    color: '#ffffff',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    marginTop: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
                  }}
                >
                  ♻️ Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default App;