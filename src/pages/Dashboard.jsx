import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Camera, Flame, BookOpen, Users, Trophy, Leaf, Star, ChevronRight, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const getBadge = (pts) => {
  if (pts >= 5000) return "TrashItt Hero";
  if (pts >= 1001) return "Recycling Legend";
  if (pts >= 501) return "Eco Champion";
  if (pts >= 101) return "Green Warrior";
  return "Beginner";
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        navigate("/login");
        return;
      }
      setUser(firebaseUser);
      try {
        const snap = await getDoc(doc(db, "users", firebaseUser.uid));
        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          setUserData({
            name: firebaseUser.displayName || "TrashItt User",
            email: firebaseUser.email,
            points: 0,
            badge: "Beginner",
            reportsCount: 0,
            challengesCount: 0,
            city: "Ranchi"
          });
        }
      } catch {
        setUserData({
          name: firebaseUser.displayName || "TrashItt User",
          points: 0,
          reportsCount: 0,
          challengesCount: 0,
          city: "Ranchi"
        });
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out!");
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        flexDirection: "column",
        gap: "16px"
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ fontSize: "48px" }}
        >
          🌿
        </motion.div>
        <p style={{ color: "var(--muted)", fontWeight: "600" }}>
          Loading your dashboard...
        </p>
      </div>
    );
  }

  const points = userData?.points || 0;
  const badge = getBadge(points);

  const nextTarget = points >= 5000 ? 5000 : points >= 1001 ? 5000 : points >= 501 ? 1001 : points >= 101 ? 501 : 101;
  const progress = Math.min(Math.round((points / nextTarget) * 100), 100);
  const nextName = points >= 5000 ? "Max!" : points >= 1001 ? "TrashItt Hero" : points >= 501 ? "Recycling Legend" : points >= 101 ? "Eco Champion" : "Green Warrior";

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      paddingTop: "80px",
      paddingBottom: "60px"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "linear-gradient(135deg, #0a2a14, #16a34a, #0d9488)",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "24px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{
            position: "absolute", right: "-20px",
            top: "-20px", fontSize: "120px", opacity: 0.08
          }}>
            🌿
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", marginBottom: "4px" }}>
                Welcome back!
              </p>
              <h1 style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "2rem",
                fontWeight: "800",
                color: "white",
                marginBottom: "8px"
              }}>
                {userData?.name || user?.displayName || "Eco Warrior"}!
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  padding: "4px 14px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "600"
                }}>
                  {badge}
                </span>
                <span style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  <MapPin size={14} />
                  {userData?.city || "Ranchi"}
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "white",
                lineHeight: "1"
              }}>
                {points}
              </div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
                Total Points
              </div>
            </div>
          </div>

          <button onClick={handleLogout} style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "10px",
            padding: "8px 14px",
            color: "white",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: "600"
          }}>
            <LogOut size={14} />
            Logout
          </button>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px"
        }}>
          {[
            { icon: "🏆", value: points, label: "Total Points", color: "#d97706" },
            { icon: "📍", value: userData?.rank ? "#" + userData.rank : "--", label: "Your Rank", color: "#16a34a" },
            { icon: "📸", value: userData?.reportsCount || 0, label: "Reports Filed", color: "#0d9488" },
            { icon: "🔥", value: userData?.challengesCount || 0, label: "Challenges", color: "#dc2626" }
          ].map((stat, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "20px",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{stat.icon}</div>
              <div style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "1.6rem",
                fontWeight: "800",
                color: stat.color,
                marginBottom: "4px"
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: "600" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "24px"
        }}>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Trophy size={18} color="#16a34a" />
              <h3 style={{
                fontFamily: "Syne, sans-serif",
                color: "var(--text)",
                fontWeight: "700",
                fontSize: "1rem"
              }}>
                Badge Progress
              </h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#16a34a", fontWeight: "700", fontSize: "14px" }}>{badge}</span>
              <span style={{ color: "var(--muted)", fontSize: "13px" }}>{points} pts</span>
            </div>
            <div style={{
              background: "var(--bg)",
              borderRadius: "10px",
              height: "10px",
              marginBottom: "8px",
              overflow: "hidden"
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: progress + "%" }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #16a34a, #0d9488)",
                  borderRadius: "10px"
                }}
              />
            </div>
            <p style={{ color: "var(--muted)", fontSize: "12px" }}>
              Next badge: {nextName}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Star size={18} color="#16a34a" />
              <h3 style={{
                fontFamily: "Syne, sans-serif",
                color: "var(--text)",
                fontWeight: "700",
                fontSize: "1rem"
              }}>
                Quick Actions
              </h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { icon: <Camera size={22} />, label: "Scan Waste", sub: "+10 pts", color: "#16a34a", path: "/scanner" },
                { icon: <Flame size={22} />, label: "Challenges", sub: "Earn pts", color: "#dc2626", path: "/challenges" },
                { icon: <BookOpen size={22} />, label: "Waste Guide", sub: "Learn", color: "#0d9488", path: "/waste-guide" },
                { icon: <Users size={22} />, label: "NGO Drives", sub: "+30 pts", color: "#d97706", path: "/ngo-drives" }
              ].map((action, i) => (
                <motion.button key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(action.path)}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "14px 10px",
                    cursor: "pointer",
                    textAlign: "center"
                  }}
                >
                  <div style={{ color: action.color, marginBottom: "6px" }}>{action.icon}</div>
                  <div style={{ color: "var(--text)", fontSize: "12px", fontWeight: "700", marginBottom: "2px" }}>
                    {action.label}
                  </div>
                  <div style={{ color: action.color, fontSize: "11px", fontWeight: "600" }}>
                    {action.sub}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "24px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <Leaf size={18} color="#16a34a" />
            <h3 style={{
              fontFamily: "Syne, sans-serif",
              color: "var(--text)",
              fontWeight: "700",
              fontSize: "1rem"
            }}>
              Getting Started
            </h3>
          </div>

          {[
            { emoji: "🌿", text: "Account created! Welcome to TrashItt!", time: "Done!", pts: "+10" },
            { emoji: "🔍", text: "Scan a waste item with AI Scanner", time: "Try now", pts: "+10" },
            { emoji: "🔥", text: "Join a cleanup challenge", time: "Available", pts: "+200" },
            { emoji: "🤝", text: "Join an NGO drive in Ranchi", time: "Available", pts: "+30" },
            { emoji: "📸", text: "Report a dirty area near you", time: "Available", pts: "+50" }
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileHover={{ x: 4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px",
                background: "var(--bg)",
                borderRadius: "12px",
                marginBottom: "10px",
                cursor: "pointer"
              }}
            >
              <div style={{
                width: "40px",
                height: "40px",
                background: "var(--card)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                flexShrink: 0
              }}>
                {item.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "var(--text)", fontSize: "14px", fontWeight: "600", marginBottom: "2px" }}>
                  {item.text}
                </div>
                <div style={{ color: "var(--muted)", fontSize: "12px" }}>{item.time}</div>
              </div>
              <div style={{ color: "#16a34a", fontSize: "13px", fontWeight: "700" }}>{item.pts}</div>
              <ChevronRight size={16} color="var(--muted)" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}