import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, MapPin, BookOpen, Camera } from "lucide-react";
import toast from "react-hot-toast";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "Ranchi",
    college: "",
    role: "Citizen"
  });

  const getPasswordStrength = (pass) => {
    if (pass.length === 0) return { strength: 0, label: "", color: "" };
    if (pass.length < 4) return { strength: 1, label: "Weak", color: "#dc2626" };
    if (pass.length < 6) return { strength: 2, label: "Medium", color: "#d97706" };
    if (pass.length < 10) return { strength: 3, label: "Strong", color: "#16a34a" };
    return { strength: 4, label: "Very Strong", color: "#0d9488" };
  };

  const passwordStrength = getPasswordStrength(form.password);

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use": return "Email already registered! Please login!";
      case "auth/weak-password": return "Password too weak! Min 6 characters!";
      case "auth/invalid-email": return "Invalid email format!";
      default: return "Signup failed! Try again!";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) {
      toast.error("Please fill all required fields!");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: form.fullName });
      await setDoc(doc(db, "users", user.uid), {
        name: form.fullName,
        email: form.email,
        city: form.city || "Ranchi",
        college: form.college || "",
        role: form.role || "Citizen",
        points: 10,
        badge: "Beginner",
        reportsCount: 0,
        challengesCount: 0,
        rank: 0,
        createdAt: serverTimestamp()
      });
      toast.success("Welcome to TrashItt!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      background: "var(--bg)"
    }}>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 50px",
          background: "var(--card)",
          overflowY: "auto"
        }}
      >
        <div style={{ maxWidth: "400px", width: "100%" }}>

          <h2 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "2rem",
            fontWeight: "800",
            color: "var(--text)",
            marginBottom: "4px"
          }}>
            Join TrashItt!
          </h2>

          <p style={{ color: "var(--muted)", marginBottom: "20px", fontSize: "14px" }}>
            Join thousands of citizens making Ranchi cleaner
          </p>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <label style={{ cursor: "pointer" }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "var(--bg)",
                border: "2px dashed #16a34a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                overflow: "hidden"
              }}>
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" style={{
                    width: "100%", height: "100%", objectFit: "cover"
                  }} />
                ) : (
                  <>
                    <Camera size={20} color="#16a34a" />
                    <span style={{ fontSize: "10px", color: "#16a34a", marginTop: "4px" }}>
                      Photo
                    </span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhoto}
              />
            </label>
          </div>

          <form onSubmit={handleSignup}>

            <div style={{ marginBottom: "14px" }}>
              <label style={{
                display: "block",
                color: "var(--text2)",
                fontWeight: "600",
                marginBottom: "6px",
                fontSize: "13px"
              }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <User size={15} style={{
                  position: "absolute", left: "12px",
                  top: "50%", transform: "translateY(-50%)",
                  color: "var(--muted)"
                }} />
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  style={{
                    width: "100%",
                    padding: "11px 12px 11px 36px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    color: "var(--text)",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{
                display: "block",
                color: "var(--text2)",
                fontWeight: "600",
                marginBottom: "6px",
                fontSize: "13px"
              }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{
                  position: "absolute", left: "12px",
                  top: "50%", transform: "translateY(-50%)",
                  color: "var(--muted)"
                }} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    padding: "11px 12px 11px 36px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    color: "var(--text)",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "6px" }}>
              <label style={{
                display: "block",
                color: "var(--text2)",
                fontWeight: "600",
                marginBottom: "6px",
                fontSize: "13px"
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{
                  position: "absolute", left: "12px",
                  top: "50%", transform: "translateY(-50%)",
                  color: "var(--muted)"
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  style={{
                    width: "100%",
                    padding: "11px 36px 11px 36px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    color: "var(--text)",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "12px",
                    top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none",
                    cursor: "pointer", color: "var(--muted)"
                  }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {form.password.length > 0 && (
              <div style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{
                      flex: 1,
                      height: "4px",
                      borderRadius: "2px",
                      background: i <= passwordStrength.strength
                        ? passwordStrength.color
                        : "var(--border)",
                      transition: "all 0.3s"
                    }} />
                  ))}
                </div>
                <span style={{
                  fontSize: "11px",
                  color: passwordStrength.color,
                  fontWeight: "600"
                }}>
                  {passwordStrength.label}
                </span>
              </div>
            )}

            <div style={{ marginBottom: "14px" }}>
              <label style={{
                display: "block",
                color: "var(--text2)",
                fontWeight: "600",
                marginBottom: "6px",
                fontSize: "13px"
              }}>
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{
                  position: "absolute", left: "12px",
                  top: "50%", transform: "translateY(-50%)",
                  color: "var(--muted)"
                }} />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  style={{
                    width: "100%",
                    padding: "11px 36px 11px 36px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    color: "var(--text)",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{
                    position: "absolute", right: "12px",
                    top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none",
                    cursor: "pointer", color: "var(--muted)"
                  }}
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "14px"
            }}>
              <div>
                <label style={{
                  display: "block",
                  color: "var(--text2)",
                  fontWeight: "600",
                  marginBottom: "6px",
                  fontSize: "13px"
                }}>
                  City
                </label>
                <div style={{ position: "relative" }}>
                  <MapPin size={13} style={{
                    position: "absolute", left: "10px",
                    top: "50%", transform: "translateY(-50%)",
                    color: "var(--muted)"
                  }} />
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px 10px 10px 30px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      color: "var(--text)",
                      fontSize: "13px",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: "block",
                  color: "var(--text2)",
                  fontWeight: "600",
                  marginBottom: "6px",
                  fontSize: "13px"
                }}>
                  College
                </label>
                <div style={{ position: "relative" }}>
                  <BookOpen size={13} style={{
                    position: "absolute", left: "10px",
                    top: "50%", transform: "translateY(-50%)",
                    color: "var(--muted)"
                  }} />
                  <input
                    type="text"
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    placeholder="Optional"
                    style={{
                      width: "100%",
                      padding: "10px 10px 10px 30px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      color: "var(--text)",
                      fontSize: "13px",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block",
                color: "var(--text2)",
                fontWeight: "600",
                marginBottom: "6px",
                fontSize: "13px"
              }}>
                I am a...
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  color: "var(--text)",
                  fontSize: "14px",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="Citizen">Citizen</option>
                <option value="Student">Student</option>
                <option value="NGO Member">NGO Member</option>
              </select>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%",
                padding: "14px",
                background: loading
                  ? "var(--muted)"
                  : "linear-gradient(135deg, #16a34a, #0d9488)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "16px",
                fontFamily: "Syne, sans-serif"
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>

            <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "14px" }}>
              Already have account?{" "}
              <Link to="/login" style={{
                color: "#16a34a",
                fontWeight: "700",
                textDecoration: "none"
              }}>
                Sign In
              </Link>
            </p>

          </form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          background: "linear-gradient(135deg, #0a2a14, #16a34a, #0d9488)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 40px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "60px", marginBottom: "24px" }}>♻️</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "2.2rem",
            fontWeight: "800",
            color: "white",
            marginBottom: "16px",
            lineHeight: "1.2"
          }}>
            Join the Green Revolution!
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.8)",
            marginBottom: "32px",
            lineHeight: "1.6"
          }}>
            Be part of Ranchi biggest waste management community
          </p>
          {[
            { emoji: "🔍", text: "AI Powered Scanner" },
            { emoji: "🏆", text: "Earn Green Points" },
            { emoji: "🤝", text: "Join Challenges" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "12px 20px"
              }}
            >
              <span style={{ fontSize: "20px" }}>{item.emoji}</span>
              <span style={{ color: "white", fontWeight: "600" }}>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}