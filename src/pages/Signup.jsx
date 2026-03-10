import React, { useState, useRef, useContext } from 'react'; // Added useContext
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Added AuthContext
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  MapPin,
  GraduationCap,
  ChevronDown,
  Camera,
  CheckCircle,
  ArrowRight,
  UserPlus,
  Shield,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Firebase Imports
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function Signup() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Grab the login function from our loudspeaker
  const { login } = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: 'Ranchi',
    college: '',
    role: 'Citizen',
    terms: false,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const roles = ['Citizen', 'Student', 'NGO', 'Waste Collector'];

  // Password Strength Logic
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 20, label: 'Very Weak', color: '#dc2626' };
    if (score === 2) return { level: 40, label: 'Weak', color: '#f97316' };
    if (score === 3) return { level: 60, label: 'Fair', color: '#d97706' };
    if (score === 4) return { level: 80, label: 'Strong', color: '#16a34a' };
    return { level: 100, label: 'Very Strong', color: '#059669' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Error messaging from original Firebase logic
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use": return "Email already registered! Please login!";
      case "auth/weak-password": return "Password too weak! Min 6 characters!";
      case "auth/invalid-email": return "Invalid email format!";
      default: return "Signup failed! Try again!";
    }
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Firebase Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors below');
      return;
    }

    setLoading(true);
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      // Update Auth Profile
      await updateProfile(user, { displayName: formData.fullName });
      
      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.fullName,
        email: formData.email,
        city: formData.city || "Ranchi",
        college: formData.college || "",
        role: formData.role || "Citizen",
        points: 10,
        badge: "Beginner",
        reportsCount: 0,
        challengesCount: 0,
        rank: 0,
        createdAt: serverTimestamp()
      });

      toast.success('Account created successfully! 🌿 Welcome to TrashItt!', {
        duration: 4000,
      });

      // Tell the whole app the user is logged in and pass the role!
      login(formData.role);

      // Redirect based on role
      if (formData.role === 'Waste Collector') {
        navigate('/collector-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Left Panel - Form */}
      <div className="signup-left">
        <div className="signup-form-container">
        
          <div className="signup-form-header">
            <h2>Create Account</h2>
            <p>Join 1,247+ citizens making Ranchi cleaner</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            {/* Photo Upload */}
            <div className="signup-photo-section">
              <div
                className="signup-photo-circle"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                {photoPreview ? (
                  <>
                    <img src={photoPreview} alt="Profile" className="signup-photo-img" />
                    <button
                      type="button"
                      className="signup-photo-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto();
                      }}
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <div className="signup-photo-placeholder">
                    <Camera size={24} />
                    <span>Upload</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* Full Name */}
            <div className="signup-field">
              <label htmlFor="fullName">Full Name</label>
              <div className={`signup-input-wrap ${errors.fullName ? 'signup-input-error' : ''}`}>
                <User size={18} className="signup-input-icon" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Rahul Kumar"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
              {errors.fullName && <span className="signup-error">{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div className="signup-field">
              <label htmlFor="signupEmail">Email Address</label>
              <div className={`signup-input-wrap ${errors.email ? 'signup-input-error' : ''}`}>
                <Mail size={18} className="signup-input-icon" />
                <input
                  id="signupEmail"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="signup-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="signup-field">
              <label htmlFor="signupPassword">Password</label>
              <div className={`signup-input-wrap ${errors.password ? 'signup-input-error' : ''}`}>
                <Lock size={18} className="signup-input-icon" />
                <input
                  id="signupPassword"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="signup-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.password && (
                <div className="signup-strength">
                  <div className="signup-strength-bar">
                    <div
                      className="signup-strength-fill"
                      style={{
                        width: `${passwordStrength.level}%`,
                        background: passwordStrength.color,
                      }}
                    />
                  </div>
                  <span
                    className="signup-strength-label"
                    style={{ color: passwordStrength.color }}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
              )}
              {errors.password && <span className="signup-error">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="signup-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={`signup-input-wrap ${errors.confirmPassword ? 'signup-input-error' : ''}`}>
                <Lock size={18} className="signup-input-icon" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="signup-eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="signup-error">{errors.confirmPassword}</span>
              )}
            </div>

            {/* City + College Row */}
            {/* City */}
            <div className="signup-field">
              <label htmlFor="city">City</label>
              <div className={`signup-input-wrap ${errors.city ? 'signup-input-error' : ''}`}>
                <MapPin size={18} className="signup-input-icon" />
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Ranchi"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              {errors.city && <span className="signup-error">{errors.city}</span>}
            </div>

            {/* College */}
            <div className="signup-field">
              <label htmlFor="college">College (Optional)</label>
              <div className="signup-input-wrap">
                <GraduationCap size={18} className="signup-input-icon" />
                <input
                  id="college"
                  name="college"
                  type="text"
                  placeholder="BIT Mesra"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="signup-field">
              <label htmlFor="role">I am a</label>
              <div className="signup-input-wrap signup-select-wrap">
                <Shield size={18} className="signup-input-icon" />
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="signup-select"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="signup-select-arrow" />
              </div>
            </div>

            {/* Terms */}
            <div className="signup-field">
              <label
                className={`signup-checkbox-wrap ${errors.terms ? 'signup-checkbox-error' : ''}`}
              >
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <span className="signup-checkbox-custom">
                  {formData.terms && <CheckCircle size={14} />}
                </span>
                <span className="signup-checkbox-label">
                  I agree to the{' '}
                  <button
                    type="button"
                    className="signup-terms-link"
                    onClick={() => toast('Terms & Conditions page coming soon! 📄')}
                  >
                    Terms & Conditions
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    className="signup-terms-link"
                    onClick={() => toast('Privacy Policy page coming soon! 🔒')}
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
              {errors.terms && <span className="signup-error">{errors.terms}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`signup-submit-btn ${loading ? 'signup-submit-loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <div className="signup-spinner" />
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Create Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="signup-login-link">
            <span>Already have an account?</span>
            <Link to="/login">
              Sign In <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="signup-right">
        <div className="signup-right-overlay" />
        <div className="signup-right-content">
          
          <div className="signup-right-main">
            <h1 className="signup-right-title">
              Join the Green<br />
              <span className="signup-right-title-green">Revolution!</span>
            </h1>
            <p className="signup-right-sub">
              Be part of Ranchi's biggest waste management community.
              Together, we're building a cleaner, greener future.
            </p>

            <div className="signup-features">
              <div className="signup-feature">
                <div className="signup-feature-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <strong>AI-Powered Scanner</strong>
                  <span>Instantly identify waste types</span>
                </div>
              </div>
              <div className="signup-feature">
                <div className="signup-feature-icon">
                  <Trophy size={20} />
                </div>
                <div>
                  <strong>Earn Green Points</strong>
                  <span>Compete on the leaderboard</span>
                </div>
              </div>
              <div className="signup-feature">
                <div className="signup-feature-icon">
                  <Shield size={20} />
                </div>
                <div>
                  <strong>Join Challenges</strong>
                  <span>Make real impact in Ranchi</span>
                </div>
              </div>
            </div>

            {/* <div className="signup-right-stats">
              <div className="signup-right-stat">
                <strong>1,247+</strong>
                <span>Citizens</span>
              </div>
              <div className="signup-right-stat-divider" />
              <div className="signup-right-stat">
                <strong>12,450</strong>
                <span>KG Waste</span>
              </div>
              <div className="signup-right-stat-divider" />
              <div className="signup-right-stat">
                <strong>89</strong>
                <span>Areas</span>
              </div>
            </div> */}
          </div>

          <div className="signup-right-footer">
            <p>Instagram: @trashitt_official 🌿</p>
          </div>
        </div>

        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="signup-particle"
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

      <style>{`
        /* Your styles remain exactly the same */
        .signup-page {
          display: flex;
          min-height: 100vh;
          overflow: hidden;
        }

        /* ========== LEFT PANEL (FORM) ========== */
        .signup-left {
          width: 50%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          align-content:center;
          padding: 48px;
          background: var(--bg);
          overflow-y: auto;
          max-height: 100vh;
          transform: translateY(50px);

        }

        .signup-form-container {
          width: 100%;
          max-width: 480px;
          padding: 24px 0 48px;
          animation: fadeInUp 0.6s ease forwards;
        }

        .signup-form-header {
          margin-bottom: 28px;
          text-align: center
        }

        .signup-form-header h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.8rem;
          color: var(--text);
          margin-bottom: 6px;
        }

        .signup-form-header p {
          color: var(--muted);
          font-size: 0.95rem;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* Photo Upload */
        .signup-photo-section {
          display: flex;
          justify-content: center;
          margin-bottom: 4px;
        }

        .signup-photo-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 3px dashed var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          background: var(--bg2);
        }

        .signup-photo-circle:hover {
          border-color: var(--green);
          transform: scale(1.05);
        }

        .signup-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .signup-photo-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--muted);
        }

        .signup-photo-placeholder span {
          font-size: 0.7rem;
          font-weight: 600;
        }

        .signup-photo-remove {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .signup-photo-remove:hover {
          transform: scale(1.1);
        }

        /* Fields */
        .signup-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .signup-field label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text2);
        }

        .signup-input-wrap {
          display: flex;
          align-items: center;
          background: var(--card);
          border: 2px solid var(--border);
          border-radius: 12px;
          padding: 0 14px;
          transition: all 0.3s ease;
        }

        .signup-input-wrap:focus-within {
          border-color: var(--green);
          box-shadow: 0 0 0 4px rgba(22,163,74,0.08);
        }

        .signup-input-error {
          border-color: var(--red);
        }

        .signup-input-error:focus-within {
          border-color: var(--red);
          box-shadow: 0 0 0 4px rgba(220,38,38,0.08);
        }

        .signup-input-icon {
          color: var(--muted);
          flex-shrink: 0;
        }

        .signup-input-wrap input {
          flex: 1;
          padding: 12px 12px;
          font-size: 0.95rem;
          color: var(--text);
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
        }

        .signup-input-wrap input::placeholder {
          color: var(--muted);
        }

        .signup-eye-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--muted);
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.25s ease;
        }

        .signup-eye-btn:hover {
          color: var(--green);
        }

        .signup-error {
          font-size: 0.8rem;
          color: var(--red);
          font-weight: 500;
        }

        /* Password Strength */
        .signup-strength {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .signup-strength-bar {
          flex: 1;
          height: 6px;
          background: var(--bg2);
          border-radius: 9999px;
          overflow: hidden;
        }

        .signup-strength-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 0.4s ease, background 0.4s ease;
        }

        .signup-strength-label {
          font-size: 0.75rem;
          font-weight: 700;
          white-space: nowrap;
        }

        /* Row */
        .signup-row {
          display: flex;
          gap: 14px;
        }

        .signup-field-half {
          flex: 1;
        }

        /* Select */
        .signup-select-wrap {
          position: relative;
        }

        .signup-select {
          flex: 1;
          padding: 12px 12px;
          font-size: 0.95rem;
          color: var(--text);
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          padding-right: 30px;
        }

        .signup-select option {
          background: var(--card);
          color: var(--text);
        }

        .signup-select-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
        }

        /* Checkbox */
        .signup-checkbox-wrap {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .signup-checkbox-wrap input {
          display: none;
        }

        .signup-checkbox-custom {
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
          margin-top: 2px;
        }

        .signup-checkbox-wrap input:checked + .signup-checkbox-custom {
          background: var(--green);
          border-color: var(--green);
        }

        .signup-checkbox-error .signup-checkbox-custom {
          border-color: var(--red);
        }

        .signup-checkbox-label {
          font-size: 0.85rem;
          color: var(--text2);
          line-height: 1.5;
        }

        .signup-terms-link {
          background: none;
          border: none;
          color: var(--green);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.85rem;
          padding: 0;
          text-decoration: underline;
          font-family: 'DM Sans', sans-serif;
        }

        .signup-terms-link:hover {
          color: var(--accent);
        }

        /* Submit */
        .signup-submit-btn {
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
          margin-top: 4px;
        }

        .signup-submit-btn:hover {
          box-shadow: 0 6px 24px rgba(22,163,74,0.35);
          transform: translateY(-2px);
        }

        .signup-submit-btn:active {
          transform: scale(0.97);
        }

        .signup-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .signup-submit-loading {
          pointer-events: none;
        }

        .signup-spinner {
          width: 22px;
          height: 22px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .signup-login-link {
          text-align: center;
          margin-top: 24px;
          font-size: 0.92rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .signup-login-link a {
          color: var(--green);
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.25s ease;
        }

        .signup-login-link a:hover {
          gap: 8px;
          text-decoration: underline;
        }

        /* ========== RIGHT PANEL ========== */
        .signup-right {
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

        .signup-right-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 70% 30%, rgba(132,204,22,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 80%, rgba(13,148,136,0.12) 0%, transparent 50%);
          z-index: 1;
        }

        .signup-right-content {
          position: relative;
          z-index: 2;
          padding: 48px;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          max-width: 480px;
        }

        .signup-right-main {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .signup-right-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 2.8rem);
          color: #ffffff;
          line-height: 1.15;
        }

        .signup-right-title-green {
          background: linear-gradient(135deg, var(--green), var(--teal));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
           color: transparent;
         }

        .signup-right-sub {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          max-width: 400px;
        }

        .signup-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .signup-feature {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .signup-feature-icon {
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

        .signup-feature div:last-child {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .signup-feature strong {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .signup-feature span {
          color: rgba(255,255,255,0.6);
          font-size: 0.83rem;
        }

        .signup-right-stat-divider {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.2);
        }

        .signup-right-footer p {
          color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
          font-style: italic;
          transform: translateY(-100px);
        }

        .signup-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          z-index: 1;
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .signup-left {
            padding: 36px;
          }

          .signup-right-content {
            padding: 36px;
          }
        }

        @media (max-width: 768px) {
          .signup-page {
            flex-direction: column;
          }

          .signup-left {
            width: 100%;
            max-height: none;
            padding: 32px 24px 40px;
            order: 1;
          }

          .signup-right {
            width: 100%;
            display: none;
          }

          .signup-logo-mobile {
            display: flex;
          }

          .signup-form-header h2 {
            font-size: 1.5rem;
          }

          .signup-row {
            flex-direction: column;
            gap: 18px;
          }

          .signup-photo-circle {
            width: 80px;
            height: 80px;
          }
        }

        @media (max-width: 480px) {
          .signup-left {
            padding: 24px 16px 36px;
          }

          .signup-form-header h2 {
            font-size: 1.3rem;
          }

          .signup-form {
            gap: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default Signup;