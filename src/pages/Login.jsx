import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields!");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back! 🌱");
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
          <div style={{ fontSize: "64px", marginBottom: "24px" }}>🌿</div>
          <h1 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "white",
            marginBottom: "8px"
          }}>
            Trash<span style={{ color: "#84cc16" }}>itt</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "40px" }}>
            Smart Segregation and Recycling
          </p>
          {[
            { emoji: "📊", text: "Track your waste impact" },
            { emoji: "🏆", text: "Earn points and badges" },
            { emoji: "🔥", text: "Join cleanup challenges" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
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
              <span style={{ color: "white", fontWeight: "500" }}>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 50px",
          background: "var(--card)"
        }}
      >
        <div style={{ maxWidth: "400px", width: "100%" }}>
          <h2 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "2rem",
            fontWeight: "800",
            color: "var(--text)",
            marginBottom: "8px"
          }}>
            Welcome Back! 👋
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "36px" }}>
            Enter your credentials to continue
          </p>

          <form onSubmit={handleLogin}>

            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block",
                color: "var(--text2)",
                fontWeight: "600",
                marginBottom: "8px",
                fontSize: "14px"
              }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{
                  position: "absolute", left: "14px",
                  top: "50%", transform: "translateY(-50%)",
                  color: "var(--muted)"
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 44px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--text)",
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                color: "var(--text2)",
                fontWeight: "600",
                marginBottom: "8px",
                fontSize: "14px"
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{
                  position: "absolute", left: "14px",
                  top: "50%", transform: "translateY(-50%)",
                  color: "var(--muted)"
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 44px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--text)",
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "14px",
                    top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none",
                    cursor: "pointer", color: "var(--muted)"
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%",
                padding: "14px",
                background: loading ? "var(--muted)" : "linear-gradient(135deg, #16a34a, #0d9488)",
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
                marginBottom: "20px",
                fontFamily: "Syne, sans-serif"
              }}
            >
              {loading ? "Signing in..." : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </motion.button>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px"
            }}>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              <span style={{ color: "var(--muted)", fontSize: "13px" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>

            <button
              type="button"
              onClick={() => toast("Google signin coming soon! 🌱")}
              style={{
                width: "100%",
                padding: "12px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                color: "var(--text)",
                marginBottom: "24px"
              }}
            >
              G &nbsp; Continue with Google
            </button>

            <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "14px" }}>
              No account?{" "}
              <Link to="/signup" style={{
                color: "#16a34a",
                fontWeight: "700",
                textDecoration: "none"
              }}>
                Create Account
              </Link>
            </p>

          </form>
        </div>
      </motion.div>

    </div>
  );
}