import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import mapImg from '../assets/map.png';
import { AuthContext } from '../AuthContext';
import { PickupService } from '../services/pickupService';
import {
  Truck, MapPin, Calendar, Package, CheckCircle, Clock,
  ArrowRight, Droplets, AlertTriangle, Recycle, Navigation,
  Camera, Upload, X, Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function SchedulePickup() {
  const { user, userRole, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wasteType, setWasteType] = useState('Recyclable');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  // Image Upload State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Requests state - will be populated from Firestore
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  // Subscribe to user's pickup requests
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = PickupService.subscribeToUserRequests(user.uid, (userRequests) => {
      setRequests(userRequests);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Redirect only if a collector somehow lands here; regular users (logged out or not)
  // can still view the form. submission is blocked by handleSubmit when not logged in.
  useEffect(() => {
    if (authLoading) return; // wait until auth state resolved

    if (userRole === 'Waste Collector') {
      // collectors should not use this page
      navigate('/collector-dashboard');
    }
  }, [authLoading, userRole, navigate]);

  const wasteCategories = [
    { id: 'Wet Waste', icon: Droplets, color: '#16a34a' },
    { id: 'Dry Waste', icon: Package, color: '#2563eb' },
    { id: 'Hazardous Waste', icon: AlertTriangle, color: '#dc2626' },
    { id: 'Recyclable', icon: Recycle, color: '#0d9488' }
  ];

  // Image Handlers
  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file!');
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  // Location Handler – open Google Maps for user to pick address manually
  const handleDetectLocation = (e) => {
    e.preventDefault();
    // open maps in new tab; user can select a point and then paste the address here
    window.open('https://www.google.com/maps', '_blank');
    toast('Please select your location on the map and copy the address into the field.', { icon: '🗺️' });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to schedule a pickup!');
      return;
    }

    if (!address || !date || !wasteType) {
      toast.error('Please fill in all required fields!');
      return;
    }

    try {
      const pickupData = {
        userId: user.uid,
        userName: user.displayName || user.email,
        userEmail: user.email,
        wasteType,
        address,
        preferredDate: date,
        imageUrl: imagePreview || null,
        location: {
          // You can add actual coordinates here if available
          address: address
        }
      };

      console.log('Submitting pickup request:', pickupData);
      await PickupService.createPickupRequest(pickupData);

      toast.success('Pickup scheduled successfully! We will notify you when a collector accepts it.');

      // Reset form
      setAddress('');
      setDate('');
      setImageFile(null);
      setImagePreview(null);
      setWasteType('Recyclable');

    } catch (error) {
      console.error('Error scheduling pickup:', error);
      toast.error('Failed to schedule pickup. Please try again.');
    }
  };

  const getCategoryIcon = (type) => {
    const cat = wasteCategories.find(c => c.id === type);
    if (!cat) return <Package size={20} />;
    const IconComp = cat.icon;
    return <IconComp size={20} color={cat.color} />;
  };

  if (authLoading) {
    return (
      <div className="pickup-page page-wrapper">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pickup-page page-wrapper">
      <div className="container">

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pickup-hero"
        >
          <div className="pickup-badge">
            <Truck size={14} />
            <span>Doorstep Service</span>
          </div>
          <h1>Schedule a <span className="hero-highlight"> Waste Pickup</span></h1>
          <p>Got bulky waste or hazardous materials? Don't dump it. Schedule a pickup, upload a photo, and our verified collectors will take it off your hands.</p>
        </motion.div>

        <div className="pickup-grid">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="pickup-form-card"
          >
            <h3>Request New Pickup</h3>
            <form onSubmit={handleSubmit} className="pickup-form">
              
              {/* 1. Waste Category Section */}
              <div className="form-group">
                <label>Waste Category</label>
                <div className="waste-type-grid">
                  {wasteCategories.map((cat) => {
                    const IconComp = cat.icon;
                    const isActive = wasteType === cat.id;
                    return (
                      <button 
                        key={cat.id}
                        type="button" 
                        className={`type-btn ${isActive ? 'active' : ''}`}
                        style={{ '--active-color': cat.color }}
                        onClick={() => setWasteType(cat.id)}
                      >
                        <div className="type-icon-wrapper" style={{ color: isActive ? cat.color : 'var(--muted)' }}>
                          <IconComp size={24} />
                        </div>
                        <span>{cat.id}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 2. Location Section */}
              <div className="form-group">
                <label><MapPin size={16} /> Pickup Address</label>
                <div className="location-wrapper">
                  <div 
  className="map-placeholder" 
  style={{ backgroundImage: `url(${mapImg})` }}
>
                    <div className="map-overlay">
                      <button 
                        className="detect-btn" 
                        onClick={handleDetectLocation}
                      >
                        <Navigation size={18} /> Choose Location
                      </button>
                    </div>
                  </div>
                  <textarea 
                    placeholder="Enter your full address in Ranchi manually or use detect location..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="2"
                    className="address-input"
                  ></textarea>
                </div>
              </div>

              {/* 3. Image Upload Section */}
              <div className="form-group">
                <label><ImageIcon size={16} /> Upload Waste Image (Optional)</label>
                
                <AnimatePresence mode="wait">
                  {imagePreview ? (
                    <motion.div 
                      key="preview"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="image-preview-container"
                    >
                      <img src={imagePreview} alt="Waste Preview" />
                      <button type="button" className="remove-image-btn" onClick={() => { setImagePreview(null); setImageFile(null); }}>
                        <X size={16} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="upload-zone"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="upload-zone"
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <div className="upload-icon-bg"><Camera size={28} /></div>
                      <p>Show collectors what to expect!</p>
                      <div className="upload-actions">
                        <button type="button" className="action-btn file-btn" onClick={() => fileInputRef.current?.click()}>
                          <Upload size={16} /> Browse Files
                        </button>
                        <button type="button" className="action-btn cam-btn" onClick={() => cameraInputRef.current?.click()}>
                          <Camera size={16} /> Take Photo
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hidden Inputs */}
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
              </div>

              {/* 4. Date Section */}
              <div className="form-group">
                <label><Calendar size={16} /> Preferred Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="date-input"
                />
              </div>

              <button type="submit" className="submit-btn">
                Confirm Pickup Request <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>

          {/* History Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="pickup-history"
          >
            <h3>Your Requests</h3>
            <div className="requests-list">
              <AnimatePresence>
                {requests.map((req) => (
                  <motion.div 
                    key={req.id}
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                    className="request-card"
                  >
                    <div className="req-img-box">
                      {req.imageUrl ? (
                        <img src={req.imageUrl} alt="waste" className="req-thumbnail" />
                      ) : (
                        <div className="req-icon-fallback" style={{ background: 'rgba(13,148,136,0.1)' }}>
                          {getCategoryIcon(req.wasteType)}
                        </div>
                      )}
                    </div>

                    <div className="req-details">
                      <h4>{req.wasteType}</h4>
                      <span><Calendar size={12} /> {req.preferredDate}</span>
                    </div>

                    <div className={`req-status ${req.status.toLowerCase()}`}>
                      {req.status === 'pending' ? <Clock size={14} /> : req.status === 'completed' ? <CheckCircle size={14} /> : <Package size={14} />}
                      {req.status === 'pending' ? 'Pending' : req.status === 'accepted' ? 'Accepted' : req.status === 'in_progress' ? 'In Progress' : req.status === 'completed' ? 'Completed' : req.status}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .pickup-page { padding-top: calc(var(--navbar-height) + 24px); padding-bottom: 80px; }
        .pickup-hero { text-align: center; margin-bottom: 48px; }
        .pickup-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: rgba(255, 255, 255, 0.1); color: #ffffff; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
        [data-theme=light] .pickup-badge{ background: rgba(0, 0, 0, 0.1); color: #000000 ;}
        .pickup-hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 12px; }
        .hero-highlight { background: linear-gradient(135deg, var(--green), var(--teal)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .pickup-hero p { color: var(--muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }
        
        .pickup-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 32px; }
        
        .pickup-form-card, .pickup-history { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 32px; }
        .pickup-form-card h3, .pickup-history h3 { font-family: 'Syne', sans-serif; margin-bottom: 24px; font-size: 1.4rem; color: var(--text); }
        
        .form-group { margin-bottom: 24px; }
        .form-group label { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: 600; color: var(--text); margin-bottom: 12px; }
        
        /* 4-Category Grid */
        .waste-type-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .type-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 18px 12px; background: var(--bg); border: 1.5px solid var(--border); border-radius: 14px; color: var(--text2); font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); font-family: 'DM Sans', sans-serif; }
        .type-icon-wrapper { transition: all 0.3s; }
        .type-btn:hover { border-color: var(--active-color); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .type-btn.active { background: color-mix(in srgb, var(--active-color) 8%, transparent); border-color: var(--active-color); color: var(--text); }
        .type-btn.active .type-icon-wrapper { transform: scale(1.15); }

        /* Map & Location */
        .location-wrapper { display: flex; flex-direction: column; gap: 12px; }
        .map-placeholder { height: 140px; border-radius: 12px; background-color: var(--bg2); background-size: cover; background-position: center; position: relative; overflow: hidden; border: 1px solid var(--border); }        .map-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--card) 50%, transparent); backdrop-filter: blur(1px); }        .detect-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: var(--text); color: var(--bg); border: none; border-radius: 9999px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .detect-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.2); }
        .detect-btn:disabled { opacity: 0.8; cursor: wait; }
        .address-input, .date-input { width: 100%; padding: 14px 16px; background: var(--bg); border: 1.5px solid var(--border); border-radius: 12px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.95rem; transition: all 0.3s; resize: vertical; }
        .address-input:focus, .date-input:focus { border-color: var(--green); outline: none; box-shadow: 0 0 0 4px rgba(22,163,74,0.1); }

        /* Image Upload */
        .upload-zone { border: 2px dashed var(--border); border-radius: 16px; padding: 32px 20px; text-align: center; background: var(--bg); transition: all 0.3s; }
        .upload-zone:hover { border-color: var(--green); background: rgba(22,163,74,0.02); }
        .upload-icon-bg { width: 64px; height: 64px; background: rgba(22,163,74,0.1); color: var(--green); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .upload-zone p { color: var(--muted); font-size: 0.95rem; margin-bottom: 20px; }
        .upload-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .action-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 10px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .file-btn { background: var(--green); color: white; border: none; }
        .file-btn:hover { background: #15803d; }
        .cam-btn { background: transparent; color: var(--green); border: 1.5px solid var(--green); }
        .cam-btn:hover { background: rgba(22,163,74,0.05); }

        .image-preview-container { position: relative; width: 100%; height: 200px; border-radius: 16px; overflow: hidden; border: 2px solid var(--border); }
        .image-preview-container img { width: 100%; height: 100%; object-fit: cover; }
        .remove-image-btn { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,0.6); color: white; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(4px); transition: background 0.2s; }
        .remove-image-btn:hover { background: var(--red); }

        /* Submit Button */
        .submit-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 16px; background: linear-gradient(135deg, var(--green), var(--teal)); color: white; border: none; border-radius: 12px; font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; margin-top: 32px; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(22,163,74,0.25); }
        
        /* History List */
        .requests-list { display: flex; flex-direction: column; }
        .request-card { display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--bg); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
        .req-img-box { width: 56px; height: 56px; flex-shrink: 0; border-radius: 10px; overflow: hidden; }
        .req-thumbnail { width: 100%; height: 100%; object-fit: cover; }
        .req-icon-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        
        .req-details { flex: 1; min-width: 0; }
        .req-details h4 { font-size: 1rem; margin-bottom: 4px; 
        color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .req-details span { display: flex; align-items: center; gap: 4px; font-size: 0.8rem; color: var(--muted); }
        
        .req-status { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; flex-shrink: 0; }
        .req-status.pending { background: rgba(217,119,6,0.1); color: #d97706; }
        .req-status.completed { background: rgba(22,163,74,0.1); color: var(--green); }

        @media (max-width: 992px) {
          .pickup-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .waste-type-grid { grid-template-columns: 1fr; }
          .upload-actions { flex-direction: column; }
          .action-btn { width: 100%; justify-content: center; }
          .request-card { flex-direction: column; align-items: flex-start; }
          .req-status { align-self: flex-start; }
        }
      `}</style>
    </div>
  );
}