import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  ScanLine,
  Recycle,
  Leaf,
  AlertTriangle,
  Droplets,
  Package,
  CheckCircle,
  XCircle,
  ArrowRight,
  Share2,
  RotateCcw,
  Sparkles,
  Zap,
  Star,
  Info,
  ShieldAlert,
  Image,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { analyzeWaste, isAPIConfigured } from '../gemini.js';

const mockResults = [
  {
    name: 'Plastic Bottle',
    category: 'Dry Waste',
    categoryColor: '#2563eb',
    categoryBg: 'rgba(37,99,235,0.1)',
    categoryEmoji: '🔵',
    binColor: 'Blue',
    recyclable: true,
    biodegradable: false,
    hazardous: false,
    correctBin: 'Dry Waste Bin (Blue)',
    tip: 'Rinse the bottle, remove the cap, crush it flat, and place in the dry waste recycling bin. Plastic bottles are 100% recyclable and can be turned into new products!',
  },
  {
    name: 'Banana Peel',
    category: 'Wet Waste',
    categoryColor: '#16a34a',
    categoryBg: 'rgba(22,163,74,0.1)',
    categoryEmoji: '🟢',
    binColor: 'Green',
    recyclable: false,
    biodegradable: true,
    hazardous: false,
    correctBin: 'Wet Waste Bin (Green)',
    tip: 'Banana peels are excellent for composting. They decompose quickly and add potassium to the soil. You can also use them as natural fertilizer for plants!',
  },
  {
    name: 'Battery',
    category: 'Hazardous Waste',
    categoryColor: '#dc2626',
    categoryBg: 'rgba(220,38,38,0.1)',
    categoryEmoji: '🔴',
    binColor: 'Red',
    recyclable: false,
    biodegradable: false,
    hazardous: true,
    correctBin: 'Hazardous Waste Bin (Red)',
    tip: '⚠️ NEVER throw batteries in regular bins! They contain toxic chemicals like lead and mercury. Take them to the nearest e-waste collection center or designated drop-off point.',
  },
  {
    name: 'Newspaper',
    category: 'Dry Waste',
    categoryColor: '#2563eb',
    categoryBg: 'rgba(37,99,235,0.1)',
    categoryEmoji: '🔵',
    binColor: 'Blue',
    recyclable: true,
    biodegradable: true,
    hazardous: false,
    correctBin: 'Dry Waste Bin (Blue)',
    tip: 'Bundle old newspapers together and sell them to your local kabadiwala or place in the dry waste bin. Recycling 1 ton of newspaper saves 17 trees!',
  },
  {
    name: 'Food Scraps',
    category: 'Wet Waste',
    categoryColor: '#16a34a',
    categoryBg: 'rgba(22,163,74,0.1)',
    categoryEmoji: '🟢',
    binColor: 'Green',
    recyclable: false,
    biodegradable: true,
    hazardous: false,
    correctBin: 'Wet Waste Bin (Green)',
    tip: 'Food scraps should always go in the wet waste bin. Consider composting at home — it reduces landfill waste and creates nutrient-rich soil for your garden!',
  },
  {
    name: 'Glass Bottle',
    category: 'Dry Waste',
    categoryColor: '#2563eb',
    categoryBg: 'rgba(37,99,235,0.1)',
    categoryEmoji: '🔵',
    binColor: 'Blue',
    recyclable: true,
    biodegradable: false,
    hazardous: false,
    correctBin: 'Dry Waste Bin (Blue)',
    tip: 'Glass is 100% recyclable and can be recycled endlessly without loss in quality. Rinse the bottle and handle carefully to avoid breakage. Remove caps before recycling.',
  },
  {
    name: 'Medicine Strip',
    category: 'Hazardous Waste',
    categoryColor: '#dc2626',
    categoryBg: 'rgba(220,38,38,0.1)',
    categoryEmoji: '🔴',
    binColor: 'Red',
    recyclable: false,
    biodegradable: false,
    hazardous: true,
    correctBin: 'Hazardous Waste Bin (Red)',
    tip: '⚠️ Never throw medicines in regular bins or flush them! Return expired or unused medicines to pharmacies. Medicine strips contain aluminium and chemicals that can contaminate soil and water.',
  },
  {
    name: 'Cardboard Box',
    category: 'Dry Waste',
    categoryColor: '#2563eb',
    categoryBg: 'rgba(37,99,235,0.1)',
    categoryEmoji: '🔵',
    binColor: 'Blue',
    recyclable: true,
    biodegradable: true,
    hazardous: false,
    correctBin: 'Dry Waste Bin (Blue)',
    tip: 'Flatten cardboard boxes to save space. Remove any tape or labels if possible. Cardboard is one of the most recyclable materials and can be reused multiple times!',
  },
];

function WasteScanner() {
  const [state, setState] = useState('idle');
  const [result, setResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error('Image must be less than 20MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target.result);
      setUploadedFile(file);
      startScanning(file);
    };
    reader.readAsDataURL(file);
  };

  const startScanning = (file) => {
    setState('uploading');
    setTimeout(async () => {
      setState('scanning');

      if (!isAPIConfigured()) {
        console.log('⚠️ No Gemini API key — using mock results');
        setTimeout(() => {
          const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
          setResult(randomResult);
          setState('result');
          toast.success('+10 Green Points earned! 🌿');
        }, 2000);
        return;
      }

      try {
        const aiResult = await analyzeWaste(file);
        setResult(aiResult);
        setState('result');
        toast.success('+10 Green Points earned! 🌿');
      } catch (err) {
        console.error('AI scan failed:', err.message);
        toast.error('AI scan failed — showing sample result');
        const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
        setResult(randomResult);
        setState('result');
      }
    }, 800);
  };

  const handleScanAgain = () => {
    setState('idle');
    setResult(null);
    setUploadedImage(null);
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: `TrashItt - ${result.name}`,
        text: `I just scanned "${result.name}" with TrashItt AI Scanner! It's ${result.category}. ${result.tip}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `I just scanned "${result.name}" with TrashItt AI Scanner! It's ${result.category}. Check it out at trashitt.in`
      );
      toast.success('Result copied to clipboard! 📋');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target.result);
        setUploadedFile(file);
        startScanning(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="scanner-page page-wrapper">
      <div className="container">
        {/* Hero */}
        <div className="scanner-hero">
          <div className="scanner-hero-badge">
            <Sparkles size={14} />
            <span>AI-Powered</span>
          </div>
          <h1>Waste Scanner</h1>
          <p>
            Upload or capture a photo of any waste item and our AI will instantly
            identify it, tell you the correct bin, and give you disposal tips!
          </p>
        </div>

        {/* Scanner Area */}
        <div className="scanner-main">
          {/* IDLE STATE */}
          {state === 'idle' && (
            <div className="scanner-idle">
              <div
                className="scanner-upload-zone"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="scanner-upload-icon">
                  <Upload size={36} />
                </div>
                <h3>Upload Waste Image</h3>
                <p>Drag & drop an image here, or click to browse</p>
                <span className="scanner-upload-formats">
                  Supports: JPG, PNG, WEBP (max 20MB)
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="scanner-divider-or">
                <span>OR</span>
              </div>

              <button
                className="scanner-camera-btn"
                onClick={() => cameraInputRef.current && cameraInputRef.current.click()}
              >
                <Camera size={22} />
                <span>Take Photo with Camera</span>
              </button>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              {/* How it works mini */}
              <div className="scanner-how-mini">
                <h4>How it works</h4>
                <div className="scanner-how-steps">
                  <div className="scanner-how-step">
                    <div className="scanner-how-num">1</div>
                    <span>Upload or capture a photo</span>
                  </div>
                  <div className="scanner-how-step">
                    <div className="scanner-how-num">2</div>
                    <span>AI analyses the waste item</span>
                  </div>
                  <div className="scanner-how-step">
                    <div className="scanner-how-num">3</div>
                    <span>Get results + earn points!</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* UPLOADING STATE */}
          {state === 'uploading' && (
            <div className="scanner-processing">
              <div className="scanner-processing-card">
                {uploadedImage && (
                  <div className="scanner-preview-img-wrap">
                    <img src={uploadedImage} alt="Uploaded waste" className="scanner-preview-img" />
                  </div>
                )}
                <div className="scanner-upload-progress">
                  <div className="scanner-upload-progress-bar">
                    <div className="scanner-upload-progress-fill" />
                  </div>
                  <span>Uploading image...</span>
                </div>
              </div>
            </div>
          )}

          {/* SCANNING STATE */}
          {state === 'scanning' && (
            <div className="scanner-processing">
              <div className="scanner-processing-card">
                {uploadedImage && (
                  <div className="scanner-preview-img-wrap scanner-preview-scanning">
                    <img src={uploadedImage} alt="Scanning waste" className="scanner-preview-img" />
                    <div className="scanner-scan-overlay">
                      <div className="scanner-scan-line" />
                    </div>
                    <div className="scanner-scan-corners">
                      <span /><span /><span /><span />
                    </div>
                  </div>
                )}
                <div className="scanner-analyzing">
                  <div className="scanner-spinner" />
                  <h3>AI Analysing...</h3>
                  <p>Identifying waste type, category, and disposal method</p>
                  <div className="scanner-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RESULT STATE */}
          {state === 'result' && result && (
            <div className="scanner-result">
              <div className="scanner-result-card">
                {/* Result Header */}
                <div className="scanner-result-header" style={{ background: result.categoryBg }}>
                  <div className="scanner-result-header-content">
                    <span className="scanner-result-emoji">{result.categoryEmoji}</span>
                    <div>
                      <h2 className="scanner-result-name">{result.name}</h2>
                      <span
                        className="scanner-result-category-badge"
                        style={{ background: result.categoryColor, color: '#ffffff' }}
                      >
                        {result.category}
                      </span>
                    </div>
                    <div className="scanner-result-pts-earned">
                      <Star size={18} />
                      <span>+10 pts</span>
                    </div>
                  </div>
                </div>

                {/* Uploaded Image Preview */}
                {uploadedImage && (
                  <div className="scanner-result-image-wrap">
                    <img src={uploadedImage} alt={result.name} className="scanner-result-image" />
                    <div className="scanner-result-image-label" style={{ background: result.categoryColor }}>
                      <ScanLine size={14} />
                      <span>Scanned</span>
                    </div>
                  </div>
                )}

                {/* Info Boxes */}
                <div className="scanner-result-info-grid">
                  <div className="scanner-info-box">
                    <div className="scanner-info-icon-wrap" style={{ background: result.recyclable ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.1)' }}>
                      {result.recyclable ? <CheckCircle size={20} color="#16a34a" /> : <XCircle size={20} color="#dc2626" />}
                    </div>
                    <div className="scanner-info-label">Recyclable</div>
                    <div className="scanner-info-value" style={{ color: result.recyclable ? '#16a34a' : '#dc2626' }}>
                      {result.recyclable ? 'Yes' : 'No'}
                    </div>
                  </div>

                  <div className="scanner-info-box">
                    <div className="scanner-info-icon-wrap" style={{ background: result.biodegradable ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.1)' }}>
                      {result.biodegradable ? <Leaf size={20} color="#16a34a" /> : <XCircle size={20} color="#dc2626" />}
                    </div>
                    <div className="scanner-info-label">Biodegradable</div>
                    <div className="scanner-info-value" style={{ color: result.biodegradable ? '#16a34a' : '#dc2626' }}>
                      {result.biodegradable ? 'Yes' : 'No'}
                    </div>
                  </div>

                  <div className="scanner-info-box">
                    <div className="scanner-info-icon-wrap" style={{ background: result.hazardous ? 'rgba(220,38,38,0.1)' : 'rgba(22,163,74,0.1)' }}>
                      {result.hazardous ? <ShieldAlert size={20} color="#dc2626" /> : <CheckCircle size={20} color="#16a34a" />}
                    </div>
                    <div className="scanner-info-label">Hazardous</div>
                    <div className="scanner-info-value" style={{ color: result.hazardous ? '#dc2626' : '#16a34a' }}>
                      {result.hazardous ? '⚠️ Yes' : 'No'}
                    </div>
                  </div>

                  <div className="scanner-info-box">
                    <div className="scanner-info-icon-wrap" style={{ background: result.categoryBg }}>
                      <Recycle size={20} style={{ color: result.categoryColor }} />
                    </div>
                    <div className="scanner-info-label">Correct Bin</div>
                    <div className="scanner-info-value" style={{ color: result.categoryColor, fontSize: '0.82rem' }}>
                      {result.correctBin}
                    </div>
                  </div>
                </div>

                {/* Disposal Tip */}
                <div className="scanner-result-tip" style={{ borderLeftColor: result.categoryColor }}>
                  <div className="scanner-tip-header">
                    <Info size={18} style={{ color: result.categoryColor }} />
                    <strong>Disposal Tip</strong>
                  </div>
                  <p>{result.tip}</p>
                </div>

                {/* Points Earned Banner */}
                <div className="scanner-result-points-banner">
                  <div className="scanner-points-content">
                    <Zap size={22} />
                    <div>
                      <strong>+10 Green Points Earned!</strong>
                      <span>Keep scanning to earn more points and climb the leaderboard</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="scanner-result-actions">
                  <button className="scanner-action-btn scanner-action-primary" onClick={handleScanAgain}>
                    <RotateCcw size={18} />
                    <span>Scan Again</span>
                  </button>
                  <button className="scanner-action-btn scanner-action-secondary" onClick={handleShare}>
                    <Share2 size={18} />
                    <span>Share Result</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .scanner-page {
          padding-top: calc(var(--navbar-height) + 24px);
          padding-bottom: 80px;
          animation: fadeInUp 0.5s ease forwards;
        }

        /* ========== HERO ========== */
        .scanner-hero {
          text-align: center;
          margin-bottom: 40px;
          padding: 24px 0;
        }

        .scanner-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          background: rgba(22,163,74,0.1);
          color: var(--green);
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 14px;
        }

        .scanner-hero h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 12px;
          background: linear-gradient(135deg, var(--green), var(--teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .scanner-hero p {
          color: var(--muted);
          font-size: 1.05rem;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ========== MAIN AREA ========== */
        .scanner-main {
          max-width: 680px;
          margin: 0 auto;
        }

        /* ========== IDLE STATE ========== */
        .scanner-idle {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          animation: fadeInUp 0.5s ease;
        }

        .scanner-upload-zone {
          width: 100%;
          padding: 56px 32px;
          border: 3px dashed var(--border);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--card);
          text-align: center;
        }

        .scanner-upload-zone:hover {
          border-color: var(--green);
          background: rgba(22,163,74,0.03);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .scanner-upload-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(22,163,74,0.1);
          color: var(--green);
          border-radius: 20px;
          margin-bottom: 8px;
          animation: float 3s ease-in-out infinite;
        }

        .scanner-upload-zone h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          color: var(--text);
        }

        .scanner-upload-zone p {
          font-size: 0.92rem;
          color: var(--muted);
        }

        .scanner-upload-formats {
          font-size: 0.78rem;
          color: var(--muted);
          opacity: 0.7;
        }

        .scanner-divider-or {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          max-width: 300px;
          color: var(--muted);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .scanner-divider-or::before,
        .scanner-divider-or::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .scanner-camera-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 36px;
          background: linear-gradient(135deg, var(--green), var(--accent));
          color: #ffffff;
          border: none;
          border-radius: 14px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(22,163,74,0.25);
          font-family: 'DM Sans', sans-serif;
        }

        .scanner-camera-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(22,163,74,0.35);
        }

        .scanner-camera-btn:active {
          transform: scale(0.97);
        }

        /* How Mini */
        .scanner-how-mini {
          width: 100%;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          margin-top: 16px;
        }

        .scanner-how-mini h4 {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          color: var(--text);
          margin-bottom: 16px;
          text-align: center;
        }

        .scanner-how-steps {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .scanner-how-step {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text2);
        }

        .scanner-how-num {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(22,163,74,0.1);
          color: var(--green);
          border-radius: 50%;
          font-size: 0.8rem;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          flex-shrink: 0;
        }

        /* ========== PROCESSING STATES ========== */
        .scanner-processing {
          display: flex;
          justify-content: center;
          animation: fadeInScale 0.4s ease;
        }

        .scanner-processing-card {
          width: 100%;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .scanner-preview-img-wrap {
          width: 100%;
          max-width: 400px;
          aspect-ratio: 4/3;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
        }

        .scanner-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .scanner-preview-scanning {
          position: relative;
        }

        .scanner-scan-overlay {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .scanner-scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--green), var(--lime), var(--green), transparent);
          box-shadow: 0 0 15px var(--green), 0 0 30px rgba(22,163,74,0.3);
          animation: scanLineMove 1.5s ease-in-out infinite;
        }

        @keyframes scanLineMove {
          0% { top: 0; }
          50% { top: calc(100% - 3px); }
          100% { top: 0; }
        }

        .scanner-scan-corners {
          position: absolute;
          inset: 12px;
        }

        .scanner-scan-corners span {
          position: absolute;
          width: 28px;
          height: 28px;
          border-color: var(--green);
          border-style: solid;
          border-width: 0;
        }

        .scanner-scan-corners span:nth-child(1) {
          top: 0; left: 0;
          border-top-width: 3px; border-left-width: 3px;
          border-top-left-radius: 8px;
        }

        .scanner-scan-corners span:nth-child(2) {
          top: 0; right: 0;
          border-top-width: 3px; border-right-width: 3px;
          border-top-right-radius: 8px;
        }

        .scanner-scan-corners span:nth-child(3) {
          bottom: 0; left: 0;
          border-bottom-width: 3px; border-left-width: 3px;
          border-bottom-left-radius: 8px;
        }

        .scanner-scan-corners span:nth-child(4) {
          bottom: 0; right: 0;
          border-bottom-width: 3px; border-right-width: 3px;
          border-bottom-right-radius: 8px;
        }

        .scanner-upload-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 300px;
        }

        .scanner-upload-progress span {
          font-size: 0.88rem;
          color: var(--muted);
          font-weight: 500;
        }

        .scanner-upload-progress-bar {
          width: 100%;
          height: 6px;
          background: var(--bg2);
          border-radius: 9999px;
          overflow: hidden;
        }

        .scanner-upload-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--green), var(--lime));
          border-radius: 9999px;
          animation: progressAnim 0.8s ease forwards;
        }

        @keyframes progressAnim {
          0% { width: 0; }
          100% { width: 100%; }
        }

        .scanner-analyzing {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          text-align: center;
        }

        .scanner-spinner {
          width: 52px;
          height: 52px;
          border: 4px solid var(--border);
          border-top-color: var(--green);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .scanner-analyzing h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          color: var(--text);
        }

        .scanner-analyzing p {
          font-size: 0.9rem;
          color: var(--muted);
        }

        .scanner-dots {
          display: flex;
          gap: 6px;
        }

        .scanner-dots span {
          width: 8px;
          height: 8px;
          background: var(--green);
          border-radius: 50%;
          animation: dotPulse 1.4s ease-in-out infinite;
        }

        .scanner-dots span:nth-child(2) { animation-delay: 0.2s; }
        .scanner-dots span:nth-child(3) { animation-delay: 0.4s; }

        /* ========== RESULT STATE ========== */
        .scanner-result {
          animation: fadeInUp 0.5s ease;
        }

        .scanner-result-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
        }

        .scanner-result-header {
          padding: 28px;
        }

        .scanner-result-header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .scanner-result-emoji {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .scanner-result-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: var(--text);
          margin-bottom: 6px;
        }

        .scanner-result-category-badge {
          display: inline-flex;
          padding: 4px 14px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .scanner-result-pts-earned {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(217,119,6,0.1);
          color: var(--yellow);
          padding: 8px 16px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 0.95rem;
          flex-shrink: 0;
          animation: pulse 2s ease-in-out infinite;
        }

        /* Uploaded Image */
        .scanner-result-image-wrap {
          position: relative;
          margin: 0 24px;
          border-radius: 14px;
          overflow: hidden;
          max-height: 280px;
        }

        .scanner-result-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          max-height: 280px;
        }

        .scanner-result-image-label {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 9999px;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* Info Grid */
        .scanner-result-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          padding: 24px;
        }

        .scanner-info-box {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .scanner-info-box:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .scanner-info-icon-wrap {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .scanner-info-label {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .scanner-info-value {
          font-size: 0.92rem;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
        }

        /* Tip */
        .scanner-result-tip {
          margin: 0 24px;
          padding: 20px;
          background: var(--bg);
          border-radius: 14px;
          border-left: 4px solid;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .scanner-tip-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .scanner-tip-header strong {
          font-size: 0.95rem;
          font-family: 'Syne', sans-serif;
          color: var(--text);
        }

        .scanner-result-tip p {
          font-size: 0.9rem;
          color: var(--text2);
          line-height: 1.7;
        }

        /* Points Banner */
        .scanner-result-points-banner {
          margin: 24px;
          padding: 18px 24px;
          background: linear-gradient(135deg, rgba(22,163,74,0.1), rgba(132,204,22,0.08));
          border: 1px solid rgba(22,163,74,0.15);
          border-radius: 14px;
        }

        .scanner-points-content {
          display: flex;
          align-items: center;
          gap: 14px;
          color: var(--green);
        }

        .scanner-points-content svg {
          flex-shrink: 0;
        }

        .scanner-points-content strong {
          display: block;
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          color: var(--green);
          margin-bottom: 2px;
        }

        .scanner-points-content span {
          font-size: 0.82rem;
          color: var(--muted);
        }

        /* Actions */
        .scanner-result-actions {
          display: flex;
          gap: 12px;
          padding: 0 24px 24px;
        }

        .scanner-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }

        .scanner-action-btn:active {
          transform: scale(0.97);
        }

        .scanner-action-primary {
          background: linear-gradient(135deg, var(--green), var(--accent));
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(22,163,74,0.25);
        }

        .scanner-action-primary:hover {
          box-shadow: 0 6px 24px rgba(22,163,74,0.35);
          transform: translateY(-2px);
        }

        .scanner-action-secondary {
          background: transparent;
          color: var(--green);
          border: 2px solid var(--green);
        }

        .scanner-action-secondary:hover {
          background: var(--green);
          color: #ffffff;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .scanner-page {
            padding-top: calc(var(--navbar-height) + 16px);
            padding-bottom: 56px;
          }

          .scanner-hero {
            margin-bottom: 28px;
            padding: 16px 0;
          }

          .scanner-hero h1 {
            font-size: 1.8rem;
          }

          .scanner-upload-zone {
            padding: 40px 20px;
          }

          .scanner-upload-icon {
            width: 64px;
            height: 64px;
          }

          .scanner-upload-icon svg {
            width: 28px;
            height: 28px;
          }

          .scanner-how-steps {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
            padding-left: 16px;
          }

          .scanner-result-header-content {
            flex-wrap: wrap;
          }

          .scanner-result-pts-earned {
            margin-left: 0;
          }

          .scanner-result-info-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 16px;
          }

          .scanner-result-tip {
            margin: 0 16px;
          }

          .scanner-result-points-banner {
            margin: 16px;
          }

          .scanner-result-actions {
            flex-direction: column;
            padding: 0 16px 16px;
          }

          .scanner-result-image-wrap {
            margin: 0 16px;
          }

          .scanner-processing-card {
            padding: 24px 16px;
          }
        }

        @media (max-width: 480px) {
          .scanner-upload-zone h3 {
            font-size: 1.1rem;
          }

          .scanner-result-name {
            font-size: 1.3rem;
          }

          .scanner-result-emoji {
            font-size: 2rem;
          }

          .scanner-result-info-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 12px;
          }

          .scanner-info-box {
            padding: 14px 10px;
          }

          .scanner-result-header {
            padding: 20px 16px;
          }

          .scanner-camera-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default WasteScanner;