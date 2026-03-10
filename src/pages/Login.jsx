import React, { useState , useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Shield,
  Zap,
  Trophy,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Firebase Imports
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  // 1. ADD THIS LINE: Grab the login function from our loudspeaker
  const { login } = useContext(AuthContext); 
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const benefits = [
    {
      icon: Shield,
      title: 'Track Your Impact',
      desc: 'See your waste segregation stats, points earned, and environmental contribution.',
    },
    {
      icon: Zap,
      title: 'AI Waste Scanner',
      desc: 'Use our smart AI scanner to instantly identify waste types and get disposal tips.',
    },
    {
      icon: Trophy,
      title: 'Compete & Win',
      desc: 'Join eco challenges, climb the leaderboard, and earn badges for a greener Ranchi.',
    },
  ];

  // Error messaging from original Firebase logic
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/user-not-found": return "No account found! Please signup first!";
      case "auth/wrong-password": return "Wrong password! Try again!";
      case "auth/invalid-email": return "Invalid email format!";
      case "auth/too-many-requests": return "Too many attempts! Try later!";
      case "auth/invalid-credential": return "Wrong email or password!";
      default: return "Login failed! Please try again!";
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Firebase Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userRole = userDoc.exists() ? (userDoc.data().role || 'Citizen') : 'Citizen';
      
      toast.success("Welcome back! 🌿", {
        duration: 3000,
      });
      
      // Tell the whole app the user is logged in and pass the role!
      login(userRole); 
      
      // Redirect based on role
      if (userRole === 'Waste Collector') {
        navigate("/collector-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast('Google signin coming soon! 🚀');
  };
  
  return (
    <div className="login-page">
      {/* Left Panel */}
      <div className="login-left">
        <div className="login-left-overlay" />
        <div className="login-left-content">
          

          <div className="login-left-main">
            <h1 className="login-left-title">
              Welcome Back,<br />
              <span className="eco-warrior-text">Eco Warrior!</span>
            </h1>
            <p className="login-left-sub">
              Continue your journey towards making Ranchi cleaner.
              Every scan, every report, every challenge counts!
            </p>

            <div className="login-benefits">
              {benefits.map((benefit, i) => {
                const IconComp = benefit.icon;
                return (
                  <div
                    className="login-benefit"
                    key={i}
                    style={{ animationDelay: `${0.6 + i * 0.15}s` }}
                  >
                    <div className="login-benefit-icon">
                      <IconComp size={20} />
                    </div>
                    <div className="login-benefit-text">
                      <strong>{benefit.title}</strong>
                      <span>{benefit.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="login-left-footer">
            <p>Making Ranchi Cleaner, One Step at a Time 🌿</p>
          </div>
        </div>

        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="login-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: `${6 + Math.random() * 14}px`,
              height: `${6 + Math.random() * 14}px`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0.15 + Math.random() * 0.2,
            }}
          />
        ))}
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-form-header">
            <h2>Log In</h2>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="login-field">
              <label htmlFor="email">Email Address</label>
              <div className={`login-input-wrap ${errors.email ? 'login-input-error' : ''}`}>
                <Mail size={18} className="login-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="login-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className={`login-input-wrap ${errors.password ? 'login-input-error' : ''}`}>
                <Lock size={18} className="login-input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="login-error">{errors.password}</span>}
            </div>

            {/* Remember & Forgot */}
            <div className="login-row">
              <label className="login-checkbox-wrap">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span className="login-checkbox-custom">
                  {formData.remember && <CheckCircle size={14} />}
                </span>
                <span className="login-checkbox-label">Remember me</span>
              </label>
              <button
                type="button"
                className="login-forgot-btn"
                onClick={() => toast('Password reset link sent to your email! 📧')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`login-submit-btn ${loading ? 'login-submit-loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <div className="login-spinner" />
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Log In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="login-divider">
              <span>or continue with</span>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="login-google-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="login-signup-link">
            <span>Don't have an account?</span>
            <Link to="/signup">
              Create Account <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        /* ... Your styles remain exactly the same ... */
        .login-page {
          display: flex;
          min-height: 100vh;
          overflow: hidden;
        }

        /* ========== LEFT PANEL ========== */
        .login-left {
          width: 50%;
          position: relative;
          background: linear-gradient(135deg, #064e2b 0%, #0d2818 40%, #0d2818 70%, #0d2818 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          transform: translateY(70px);
        }

        .login-left-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 30% 20%, rgba(132,204,22,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 80%, rgba(13,148,136,0.12) 0%, transparent 50%);
          z-index: 1;
        }

        .login-left-content {
          position: relative;
          z-index: 2;
          padding: 48px;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          max-width: 520px;
        }

        .login-left-main {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .login-left-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 2.8rem);
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.02em;
          animation: fadeInUp 0.6s ease forwards;
        }

        .eco-warrior-text {
          background: linear-gradient(135deg, var(--green), var(--teal));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
           color: transparent;
         }
        

        .login-left-sub {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          max-width: 400px;
          animation: fadeInUp 0.6s ease 0.2s forwards;
          opacity: 0;
        }

        .login-benefits {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: 8px;
        }

        .login-benefit {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        .login-benefit-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 11px;
          color: var(--lime);
          flex-shrink: 0;
        }

        .login-benefit-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .login-benefit-text strong {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .login-benefit-text span {
          color: rgba(255,255,255,0.6);
          font-size: 0.83rem;
          line-height: 1.5;
        }

        .login-left-footer {
          padding-top: 24px;
          transform: translateY(-100px);

        }

        .login-left-footer p {
          color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
          font-style: italic;
        }

        .login-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          z-index: 1;
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }

        /* ========== RIGHT PANEL ========== */
        .login-right {
          width: 50%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 48px;
          background: var(--bg);
          overflow-y: auto;
          transform:translateY(80px)
        }

        .login-form-container {
          width: 100%;
          max-width: 440px;
          animation: fadeInUp 0.6s ease forwards;
        }

        .login-form-header {
          margin-bottom: 32px;
        }

        .login-form-header h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.8rem;
          color: var(--text);
          margin-bottom: 8px;
        }

        .login-form-header p {
          color: var(--muted);
          font-size: 0.95rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .login-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .login-field label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text2);
        }

        .login-input-wrap {
          display: flex;
          align-items: center;
          gap: 0;
          background: var(--card);
          border: 2px solid var(--border);
          border-radius: 12px;
          padding: 0 14px;
          transition: all 0.3s ease;
        }

        .login-input-wrap:focus-within {
          border-color: var(--green);
          box-shadow: 0 0 0 4px rgba(22,163,74,0.08);
        }

        .login-input-error {
          border-color: var(--red);
        }

        .login-input-error:focus-within {
          border-color: var(--red);
          box-shadow: 0 0 0 4px rgba(220,38,38,0.08);
        }

        .login-input-icon {
          color: var(--muted);
          flex-shrink: 0;
        }

        .login-input-wrap input {
          flex: 1;
          padding: 13px 12px;
          font-size: 0.95rem;
          color: var(--text);
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
        }

        .login-input-wrap input::placeholder {
          color: var(--muted);
        }

        .login-eye-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--muted);
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.25s ease;
        }

        .login-eye-btn:hover {
          color: var(--green);
        }

        .login-error {
          font-size: 0.8rem;
          color: var(--red);
          font-weight: 500;
        }

        .login-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .login-checkbox-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;
        }

        .login-checkbox-wrap input {
          display: none;
        }

        .login-checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          color: #ffffff;
          background: transparent;
          flex-shrink: 0;
        }

        .login-checkbox-wrap input:checked + .login-checkbox-custom {
          background: var(--green);
          border-color: var(--green);
        }

        .login-checkbox-label {
          font-size: 0.88rem;
          color: var(--text2);
        }

        .login-forgot-btn {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--green);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.25s ease;
          padding: 0;
          white-space: nowrap;
        }

        .login-forgot-btn:hover {
          color: var(--accent);
          text-decoration: underline;
        }

        .login-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, var(--green), var(--teal));
          color: #ffffff;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(22,163,74,0.25);
          min-height: 52px;
          font-family: 'DM Sans', sans-serif;
        }

        .login-submit-btn:hover {
          box-shadow: 0 6px 24px rgba(22,163,74,0.35);
          transform: translateY(-2px);
        }

        .login-submit-btn:active {
          transform: scale(0.97);
        }

        .login-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .login-submit-loading {
          pointer-events: none;
        }

        .login-spinner {
          width: 22px;
          height: 22px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          color: var(--muted);
          font-size: 0.85rem;
        }

        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .login-google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 13px 28px;
          background: var(--card);
          border: 2px solid var(--border);
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .login-google-btn:hover {
          border-color: var(--green);
          box-shadow: 0 2px 12px var(--shadow);
          transform: translateY(-1px);
        }

        .login-google-btn:active {
          transform: scale(0.97);
        }

        .login-google-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-signup-link {
          text-align: center;
          margin-top: 28px;
          font-size: 0.92rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .login-signup-link a {
          color: var(--green);
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.25s ease;
        }

        .login-signup-link a:hover {
          gap: 8px;
          text-decoration: underline;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .login-left-content {
            padding: 36px;
          }

          .login-right {
            padding: 36px;
          }
        }

        @media (max-width: 768px) {
          .login-page {
            flex-direction: column;
          }

          .login-left {
            width: 100%;
            min-height: auto;
            padding: 48px 24px;
          }

          .login-left-content {
            padding: 0;
            height: auto;
            max-width: 100%;
          }

          .login-left-main {
            gap: 16px;
          }

          .login-left-title {
            font-size: 1.8rem;
          }

          .login-left-sub {
            font-size: 0.95rem;
            animation-delay: 0s;
            opacity: 1;
          }

          .login-benefits {
            display: none;
          }

          .login-left-footer {
            display: none;
          }

          .login-right {
            width: 100%;
            padding: 32px 24px 48px;
          }

          .login-form-header h2 {
            font-size: 1.5rem;
          }

          .login-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .login-left {
            padding: 36px 16px;
          }

          .login-right {
            padding: 24px 16px 40px;
          }

          .login-left-title {
            font-size: 1.5rem;
          }

          .login-form-header h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;