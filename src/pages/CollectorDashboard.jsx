import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Package, CheckCircle, Navigation, 
  Trash2, ShieldCheck, Clock, Award, LogOut
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CollectorDashboard() {
  const [activeTab, setActiveTab] = useState('available');
  
  // Mock Data
  const [availableRequests, setAvailableRequests] = useState([
    { id: 101, user: 'Rahul Verma', type: 'E-Waste', qty: 'Medium (TV, Wires)', address: 'Lalpur Chowk, Ranchi', points: 50 },
    { id: 102, user: 'Priya Singh', type: 'Bulk Dry', qty: 'Large (Cardboards)', address: 'Kanke Road, Ranchi', points: 30 },
  ]);
  
  const [myTasks, setMyTasks] = useState([
    { id: 103, user: 'Amit K.', type: 'E-Waste', qty: 'Small (Batteries)', address: 'Harmu, Ranchi', status: 'Accepted' }
  ]);

  const handleAccept = (req) => {
    setAvailableRequests(availableRequests.filter(r => r.id !== req.id));
    setMyTasks([{ ...req, status: 'Accepted' }, ...myTasks]);
    toast.success(`Accepted pickup for ${req.user}!`);
  };

  const handleComplete = (id) => {
    setMyTasks(myTasks.filter(t => t.id !== id));
    toast.success('Pickup marked as completed! Points awarded to user. 🏆');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    // Add your actual logout routing logic here
  };

  return (
    <div className="collector-page page-wrapper">
      <div className="container">
        
        {/* Collector Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="collector-header"
        >
          {/* Logout Button (Top Right) */}
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={14} /> Logout
          </button>

          <div className="header-text">
            <p className="welcome-text">Welcome back!</p>
            <h1>Ranchi Municipal Team!</h1>
            <div className="header-tags">
              <div className="collector-badge"><ShieldCheck size={14}/> Collector Portal</div>
              <span className="location-tag"><MapPin size={14}/> Ranchi</span>
            </div>
          </div>

          <div className="collector-stats">
            <div className="stat-box">
              <h3>24</h3>
              <span>Pickups Today</span>
            </div>
            <div className="stat-box highlight-box">
              <h3>340 KG</h3>
              <span>Waste Recovered</span>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="collector-tabs">
          <button 
            className={`c-tab ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            Available Requests <span className="badge">{availableRequests.length}</span>
          </button>
          <button 
            className={`c-tab ${activeTab === 'mytasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('mytasks')}
          >
            My Pickups <span className="badge">{myTasks.length}</span>
          </button>
        </div>

        {/* Task Grid */}
        <div className="task-grid">
          <AnimatePresence mode="popLayout">
            
            {activeTab === 'available' && availableRequests.map((req) => (
              <motion.div 
                key={req.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="task-card"
              >
                <div className="task-top">
                  <div className="task-type">
                    {req.type === 'E-Waste' ? <Trash2 size={18} color="#dc2626"/> : <Package size={18} color="#2563eb"/>}
                    {req.type}
                  </div>
                  <div className="task-reward"><Award size={14}/> User gets +{req.points} pts</div>
                </div>
                
                <h3>{req.user}</h3>
                <p className="task-qty">Quantity: {req.qty}</p>
                
                <div className="task-address">
                  <MapPin size={16} color="var(--green)" />
                  {req.address}
                </div>
                
                <button className="accept-btn" onClick={() => handleAccept(req)}>
                  Accept Pickup
                </button>
              </motion.div>
            ))}

            {activeTab === 'mytasks' && myTasks.map((task) => (
              <motion.div 
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="task-card active-task"
              >
                <div className="task-top">
                  <span className="status-badge"><Clock size={14}/> In Progress</span>
                </div>
                
                <h3>{task.user}</h3>
                <p className="task-qty">Quantity: {task.qty}</p>
                
                <div className="task-address">
                  <MapPin size={16} color="var(--green)" />
                  {task.address}
                </div>
                
                <div className="task-actions">
                  <button className="nav-btn">
                    <Navigation size={16} /> Navigate
                  </button>
                  <button className="complete-btn" onClick={() => handleComplete(task.id)}>
                    <CheckCircle size={16} /> Mark Completed
                  </button>
                </div>
              </motion.div>
            ))}

            {(activeTab === 'available' && availableRequests.length === 0) && (
              <div className="empty-state">No new requests in your area!</div>
            )}
            {(activeTab === 'mytasks' && myTasks.length === 0) && (
              <div className="empty-state">You have no active pickups. Great job!</div>
            )}

          </AnimatePresence>
        </div>

      </div>

      <style>{`
        .collector-page { padding-top: calc(var(--navbar-height) + 24px); padding-bottom: 80px; background: var(--bg2); min-height: 100vh;}
        
        .collector-header { position: relative; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 24px; background: var(--card); padding: 40px 32px 32px; border-radius: 20px; border: 1px solid var(--border); margin-bottom: 32px; }
        
        .logout-btn { position: absolute; top: 16px; right: 35px; display: flex; align-items: center; gap: 6px; padding: 6px 14px; background: transparent; border: 1px solid var(--border); color: var(--text); border-radius: 10px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .logout-btn:hover { background: rgba(220,38,38,0.1); color: #dc2626; border-color: #dc2626; }

        .header-text { display: flex; flex-direction: column; gap: 4px; }
        .welcome-text { font-size: 0.95rem; color: var(--muted); font-weight: 500; margin: 0; }
        .collector-header h1 { font-family: 'Syne', sans-serif; font-size: 2.2rem; margin: 0; color: var(--text); font-weight: 800; }
        
        .header-tags { display: flex; align-items: center; gap: 12px; margin-top: 6px; }
        .collector-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(13,148,136,0.1); color: var(--teal); border-radius: 8px; font-weight: 700; font-size: 0.8rem; margin: 0; }
        .location-tag { display: flex; align-items: center; gap: 4px; font-size: 0.85rem; color: var(--muted); font-weight: 500; }
        
        .collector-stats { display: flex; gap: 16px; }
        .stat-box { background: linear-gradient(135deg, rgba(22,163,74,0.1), rgba(13,148,136,0.1)); padding: 16px 24px; border-radius: 14px; text-align: center; border: 1px solid var(--green); color: var(--green); margin-top: 25px }
        .stat-box h3 { font-size: 1.8rem; font-family: 'Syne', sans-serif; }
        .stat-box span { font-size: 0.8rem; color: var(--muted); }
        .highlight-box { background: linear-gradient(135deg, rgba(22,163,74,0.1), rgba(13,148,136,0.1)); border-color: var(--green); color: var(--green); }
        
        .collector-tabs { display: flex; gap: 12px; margin-bottom: 24px; }
        .c-tab { display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; font-weight: 600; color: var(--text2); cursor: pointer; transition: all 0.3s; }
        .c-tab.active { background: var(--green); color: white; border-color: var(--green); }
        .c-tab .badge { background: var(--bg2); padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; color: var(--text); }
        .c-tab.active .badge { background: rgba(255,255,255,0.2); color: white; }
        
        .task-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .task-card { background: var(--card); padding: 24px; border-radius: 16px; border: 1px solid var(--border); transition: transform 0.2s; }
        .task-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .task-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .task-type { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.9rem; }
        .task-reward { display: flex; align-items: center; gap: 4px; font-size: 0.8rem; color: #d97706; background: rgba(217,119,6,0.1); padding: 4px 10px; border-radius: 8px; font-weight: 600;}
        
        .task-card h3 { font-family: 'Syne', sans-serif; font-size: 1.2rem; margin-bottom: 4px; }
        .task-qty { font-size: 0.9rem; color: var(--text2); margin-bottom: 16px; }
        .task-address { display: flex; align-items: flex-start; gap: 8px; font-size: 0.9rem; color: var(--text); background: var(--bg); padding: 12px; border-radius: 10px; margin-bottom: 20px; line-height: 1.4; }
        
        .accept-btn { width: 100%; padding: 14px; background: var(--bg); border: 2px dashed var(--green); color: var(--green); font-weight: 700; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
        .accept-btn:hover { background: var(--green); color: white; border-style: solid; }
        
        .active-task { border-color: var(--teal); box-shadow: 0 0 0 1px var(--teal); }
        .status-badge { display: flex; align-items: center; gap: 6px; color: var(--teal); font-weight: 700; font-size: 0.85rem; }
        .task-actions { display: flex; gap: 10px; }
        .nav-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-weight: 600; cursor: pointer; }
        .complete-btn { flex: 1.5; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px; background: var(--green); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; }
        
        .empty-state { grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--muted); font-size: 1.1rem; }

        @media (max-width: 768px) {
          .collector-header { flex-direction: column; align-items: flex-start; padding-top: 60px; }
          .collector-stats { width: 100%; }
          .stat-box { flex: 1; }
        }
      `}</style>
    </div>
  );
}