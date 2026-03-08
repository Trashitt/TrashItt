import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, RotateCcw, Info, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { analyzeWaste } from "../gemini";

export default function WasteScanner() {
  const [state, setState] = useState("idle");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please upload an image!");
      return;
    }
    setImageFile(file);
    setImage(URL.createObjectURL(file));
    setState("uploaded");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleScan = async () => {
    if (!imageFile) return;
    setState("scanning");
    try {
      const res = await analyzeWaste(imageFile);
      setResult(res);
      setState("result");
      toast.success("+10 points earned!");
    } catch {
      toast.error("Scan failed! Try again!");
      setState("uploaded");
    }
  };

  const handleReset = () => {
    setState("idle");
    setImage(null);
    setImageFile(null);
    setResult(null);
  };

  const getBinColor = (bin) => {
    if (!bin) return "#16a34a";
    if (bin.includes("Green")) return "#16a34a";
    if (bin.includes("Blue")) return "#2563eb";
    if (bin.includes("Red")) return "#dc2626";
    return "#16a34a";
  };

  const getCategoryColor = (cat) => {
    if (!cat) return "#16a34a";
    if (cat.includes("Wet")) return "#16a34a";
    if (cat.includes("Dry")) return "#2563eb";
    if (cat.includes("Hazardous")) return "#dc2626";
    return "#16a34a";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      paddingTop: "80px",
      paddingBottom: "60px"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "50px",
            padding: "8px 20px",
            marginBottom: "20px"
          }}>
            <span style={{ color: "#16a34a", fontSize: "14px", fontWeight: "600" }}>
              AI Powered by Gemini
            </span>
          </div>

          <h1 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "800",
            color: "var(--text)",
            marginBottom: "16px",
            lineHeight: "1.1"
          }}>
            AI Waste Scanner
          </h1>

          <p style={{
            color: "var(--muted)",
            fontSize: "1.1rem",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Upload any waste photo and AI tells you exactly which bin to use!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "40px",
            marginBottom: "30px"
          }}
        >
          <AnimatePresence mode="wait">

            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: "2px dashed #16a34a",
                    borderRadius: "20px",
                    padding: "60px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "rgba(22,163,74,0.03)",
                    transition: "all 0.3s"
                  }}
                >
                  <div style={{ fontSize: "64px", marginBottom: "20px" }}>📷</div>
                  <h3 style={{
                    fontFamily: "Syne, sans-serif",
                    color: "var(--text)",
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    marginBottom: "8px"
                  }}>
                    Drop your image here
                  </h3>
                  <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
                    or click to upload from your device
                  </p>
                  <div style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    flexWrap: "wrap"
                  }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      style={{
                        background: "#16a34a",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        padding: "12px 24px",
                        fontSize: "15px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <Upload size={18} />
                      Upload Photo
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click(); }}
                      style={{
                        background: "transparent",
                        color: "#16a34a",
                        border: "2px solid #16a34a",
                        borderRadius: "12px",
                        padding: "12px 24px",
                        fontSize: "15px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <Camera size={18} />
                      Use Camera
                    </button>
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "16px" }}>
                    Supports JPG, PNG, WEBP
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </motion.div>
            )}

            {state === "uploaded" && (
              <motion.div
                key="uploaded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: "center" }}
              >
                <img
                  src={image}
                  alt="Uploaded"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "350px",
                    borderRadius: "16px",
                    objectFit: "contain",
                    marginBottom: "24px",
                    border: "2px solid var(--border)"
                  }}
                />
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={handleScan}
                    style={{
                      background: "linear-gradient(135deg, #16a34a, #0d9488)",
                      color: "white",
                      border: "none",
                      borderRadius: "14px",
                      padding: "16px 40px",
                      fontSize: "17px",
                      fontWeight: "700",
                      cursor: "pointer",
                      fontFamily: "Syne, sans-serif"
                    }}
                  >
                    Scan This Item
                  </button>
                  <button
                    onClick={handleReset}
                    style={{
                      background: "transparent",
                      color: "var(--muted)",
                      border: "1px solid var(--border)",
                      borderRadius: "14px",
                      padding: "16px 24px",
                      fontSize: "15px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <RotateCcw size={16} />
                    Choose Different
                  </button>
                </div>
              </motion.div>
            )}

            {state === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: "center", padding: "40px 0" }}
              >
                <div style={{ position: "relative", marginBottom: "30px" }}>
                  <img
                    src={image}
                    alt="Scanning"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "250px",
                      borderRadius: "16px",
                      objectFit: "contain",
                      opacity: 0.4,
                      filter: "blur(2px)"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ fontSize: "48px" }}
                    >
                      🌿
                    </motion.div>
                  </div>
                </div>
                <h3 style={{
                  fontFamily: "Syne, sans-serif",
                  color: "var(--text)",
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  marginBottom: "8px"
                }}>
                  AI is analysing your waste...
                </h3>
                <p style={{ color: "var(--muted)" }}>
                  Gemini AI is identifying the item!
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px" }}>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#16a34a"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {state === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    background: "linear-gradient(135deg, #16a34a, #0d9488)",
                    borderRadius: "14px",
                    padding: "12px 20px",
                    textAlign: "center",
                    marginBottom: "24px",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "16px"
                  }}
                >
                  +10 Points Earned for Scanning!
                </motion.div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "24px"
                }}>
                  <img
                    src={image}
                    alt="Scanned"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      border: "2px solid var(--border)"
                    }}
                  />
                  <div>
                    <h2 style={{
                      fontFamily: "Syne, sans-serif",
                      color: "var(--text)",
                      fontSize: "1.5rem",
                      fontWeight: "800",
                      marginBottom: "12px"
                    }}>
                      {result.itemName}
                    </h2>
                    <div style={{
                      display: "inline-block",
                      background: getCategoryColor(result.category),
                      color: "white",
                      borderRadius: "8px",
                      padding: "6px 16px",
                      fontSize: "14px",
                      fontWeight: "700",
                      marginBottom: "16px"
                    }}>
                      {result.category}
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px",
                      background: "var(--bg)",
                      borderRadius: "12px",
                      border: "2px solid " + getBinColor(result.bin)
                    }}>
                      <Trash2 size={24} color={getBinColor(result.bin)} />
                      <div>
                        <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: "600" }}>
                          CORRECT BIN
                        </div>
                        <div style={{ color: getBinColor(result.bin), fontWeight: "700", fontSize: "15px" }}>
                          {result.bin}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  marginBottom: "20px"
                }}>
                  {[
                    { label: "Recyclable", value: result.recyclable, emoji: "♻️" },
                    { label: "Biodegradable", value: result.biodegradable, emoji: "🌱" },
                    { label: "Hazardous", value: result.hazardous, emoji: "⚠️", invert: true }
                  ].map(item => (
                    <div key={item.label} style={{
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "16px",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: "24px", marginBottom: "6px" }}>{item.emoji}</div>
                      <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: "600", marginBottom: "4px" }}>
                        {item.label.toUpperCase()}
                      </div>
                      <div style={{
                        fontWeight: "700",
                        fontSize: "15px",
                        color: item.invert
                          ? (item.value ? "#dc2626" : "#16a34a")
                          : (item.value ? "#16a34a" : "#dc2626")
                      }}>
                        {item.value ? "YES" : "NO"}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: "rgba(22,163,74,0.08)",
                  border: "1px solid rgba(22,163,74,0.3)",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  marginBottom: "20px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start"
                }}>
                  <Info size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: "700", marginBottom: "4px" }}>
                      DISPOSAL TIP
                    </div>
                    <p style={{ color: "var(--text2)", margin: 0, lineHeight: "1.5" }}>
                      {result.disposalTip}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "center", color: "var(--muted)", fontSize: "13px", marginBottom: "20px" }}>
                  AI Confidence: {result.confidence} - Powered by Gemini AI
                </div>

                <button
                  onClick={handleReset}
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #16a34a, #0d9488)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: "14px",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontFamily: "Syne, sans-serif"
                  }}
                >
                  <RotateCcw size={16} />
                  Scan Another Item
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

        {state === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 style={{
              fontFamily: "Syne, sans-serif",
              color: "var(--text)",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "1.2rem",
              fontWeight: "700"
            }}>
              How It Works
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px"
            }}>
              {[
                { emoji: "📸", title: "Upload Photo", desc: "Take or upload any waste item photo" },
                { emoji: "🤖", title: "AI Analyses", desc: "Gemini AI identifies the waste item" },
                { emoji: "✅", title: "Get Result", desc: "Know the bin and earn points!" }
              ].map(item => (
                <div key={item.title} style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "20px",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>{item.emoji}</div>
                  <h4 style={{ color: "var(--text)", fontWeight: "700", marginBottom: "6px", fontSize: "14px" }}>
                    {item.title}
                  </h4>
                  <p style={{ color: "var(--muted)", fontSize: "12px", lineHeight: "1.4", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}