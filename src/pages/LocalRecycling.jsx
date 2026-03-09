import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Navigation, Clock, Phone, Search, 
  Recycle, Smartphone, Battery, Droplets, Package, ArrowRight
} from 'lucide-react';

// Mock Data for Ranchi Recycling Centers
const recyclingCenters = [
  {
    id: 1,
    name: 'Eco-Connect E-Waste Hub',
    categories: ['E-Waste', 'Batteries'],
    address: 'Circular Road, Lalpur, Ranchi',
    distance: '2.4 km',
    hours: '9:00 AM - 6:00 PM',
    status: 'Open Now',
    phone: '+91 98765 43210'
  },
  {
    id: 2,
    name: 'Green Ranchi Plastic Recyclers',
    categories: ['Plastic', 'Dry Waste'],
    address: 'Harmu Housing Colony, Ranchi',
    distance: '3.8 km',
    hours: '10:00 AM - 5:00 PM',
    status: 'Open Now',
    phone: '+91 98765 43211'
  },
  {
    id: 3,
    name: 'Kanke Composting Facility',
    categories: ['Wet Waste'],
    address: 'Kanke Road, Near Rock Garden, Ranchi',
    distance: '5.1 km',
    hours: '8:00 AM - 4:00 PM',
    status: 'Closes Soon',
    phone: '+91 98765 43212'
  },
  {
    id: 4,
    name: 'Ranchi Metal & Glass Scraps',
    categories: ['Recyclable'],
    address: 'Kokar Industrial Area, Ranchi',
    distance: '6.5 km',
    hours: '9:00 AM - 7:00 PM',
    status: 'Open Now',
    phone: '+91 98765 43213'
  }
];

const categories = [
  { id: 'All', icon: Recycle },
  { id: 'E-Waste', icon: Smartphone },
  { id: 'Plastic', icon: Package },
  { id: 'Wet Waste', icon: Droplets },
  { id: 'Batteries', icon: Battery }
];

export default function LocalRecycling() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredCenters = recyclingCenters.filter(center => {
    const matchesCategory = activeCategory === 'All' || center.categories.includes(activeCategory);
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          center.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="recycling-page page-wrapper">
      <div className="container">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="recycling-header"
        >
          <div className="header-badge">
            <MapPin size={14} /> Local Drop-offs
          </div>
          <h1>Find Nearby <span className="hero-highlight">Recyclers</span></h1>
          <p>Locate verified recycling centers, scrap dealers, and e-waste drop-off points across Ranchi.</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="recycling-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by area or facility name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="category-filters">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button 
                  key={cat.id}
                  className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon size={16} /> {cat.id}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="recycling-grid">
          
          {/* List View */}
          <div className="centers-list">
            <AnimatePresence>
              {filteredCenters.length > 0 ? (
                filteredCenters.map((center, index) => (
                  <motion.div 
                    key={center.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                    className="center-card"
                  >
                    <div className="center-card-top">
                      <div>
                        <h3>{center.name}</h3>
                        <div className="tags-wrapper">
                          {center.categories.map(tag => (
                            <span key={tag} className="center-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="distance-badge">{center.distance}</div>
                    </div>
                    
                    <div className="center-details">
                      <p><MapPin size={14} /> {center.address}</p>
                      <p><Clock size={14} /> {center.hours} <span className={`status ${center.status === 'Open Now' ? 'open' : 'closing'}`}>• {center.status}</span></p>
                      <p><Phone size={14} /> {center.phone}</p>
                    </div>

                    <div className="center-actions">
                      <button className="direction-btn">
                        <Navigation size={16} /> Get Directions
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="no-results">
                  <Recycle size={48} />
                  <h3>No centers found</h3>
                  <p>Try adjusting your search or category filter.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Map View (Hackathon Trick: Embedded Iframe of Ranchi) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="map-container"
          >
            <div className="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117223.77976815204!2d85.239322!3d23.3432048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104aa5db7dd%3A0xdc09d49d6899f43e!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ranchi Recycling Map"
              ></iframe>
              <div className="map-overlay-btn">
                <button className="interactive-map-btn">Open Interactive Map <ArrowRight size={16}/></button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .recycling-page { padding-top: calc(var(--navbar-height) + 24px); padding-bottom: 80px; }
        
        .recycling-header { text-align: center; margin-bottom: 40px; }
        .header-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: rgba(255, 255, 255, 0.1); color: #ffffff ; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
        [data-theme=light] .header-badge{  background: rgba(0, 0, 0, 0.1); color: #000000 }
        .recycling-header h1 { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 12px; }
        .hero-highlight { background: linear-gradient(135deg, var(--green), var(--teal)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .recycling-header p { color: var(--muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }

        .recycling-controls { display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px; }
        
        .search-box { position: relative; max-width: 600px; width: 100%; margin: 0 auto; }
        .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--muted); }
        .search-box input { width: 100%; padding: 16px 20px 16px 48px; background: var(--card); border: 1px solid var(--border); border-radius: 16px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 1rem; transition: all 0.3s; box-shadow: var(--shadow-sm); }
        .search-box input:focus { border-color: var(--teal); outline: none; box-shadow: 0 0 0 4px rgba(13,148,136,0.1); }

        .category-filters { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
        .filter-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: var(--bg); border: 1px solid var(--border); border-radius: 9999px; color: var(--text2); font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
        .filter-btn:hover { background: var(--card); border-color: var(--teal); }
        .filter-btn.active { background: var(--teal); color: white; border-color: var(--teal); box-shadow: 0 4px 12px rgba(13,148,136,0.2); }

        .recycling-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; height: 600px; }

        .centers-list { display: flex; flex-direction: column; gap: 16px; overflow-y: auto; padding-right: 8px; }
        /* Custom Scrollbar for list */
        .centers-list::-webkit-scrollbar { width: 6px; }
        .centers-list::-webkit-scrollbar-track { background: var(--bg); border-radius: 8px; }
        .centers-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 8px; }
        
        .center-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; transition: transform 0.2s, box-shadow 0.2s; }
        .center-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: rgba(13,148,136,0.3); }
        
        .center-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .center-card-top h3 { font-family: 'Syne', sans-serif; font-size: 1.2rem; margin-bottom: 8px; }
        .tags-wrapper { display: flex; gap: 6px; flex-wrap: wrap; }
        .center-tag { padding: 4px 10px; background: rgba(22,163,74,0.1); color: var(--green); border-radius: 6px; font-size: 0.75rem; font-weight: 700; }
        
        .distance-badge { background: var(--bg2); padding: 6px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; color: var(--text); border: 1px solid var(--border); }

        .center-details { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .center-details p { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--text2); margin: 0; }
        .status { font-weight: 600; font-size: 0.85rem; }
        .status.open { color: var(--green); }
        .status.closing { color: #d97706; }

        .center-actions { padding-top: 16px; border-top: 1px solid var(--border); }
        .direction-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: transparent; border: 1px solid var(--teal); color: var(--teal); border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .direction-btn:hover { background: var(--teal); color: white; }

        .no-results { text-align: center; padding: 60px 20px; color: var(--muted); display: flex; flex-direction: column; align-items: center; gap: 12px; background: var(--card); border-radius: 16px; border: 1px dashed var(--border); }

        .map-container { height: 100%; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); position: relative; }
        .map-wrapper { width: 100%; height: 100%; position: relative; }
        .map-overlay-btn { position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); }
        .interactive-map-btn { display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: var(--card); color: var(--text); border: 1px solid var(--border); border-radius: 9999px; font-weight: 600; cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .interactive-map-btn:hover { transform: translateY(-2px); border-color: var(--teal); color: var(--teal); }

        @media (max-width: 992px) {
          .recycling-grid { grid-template-columns: 1fr; height: auto; }
          .centers-list { max-height: 500px; padding-right: 0; }
          .map-container { height: 400px; }
        }
      `}</style>
    </div>
  );
}