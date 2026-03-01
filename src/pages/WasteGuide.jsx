import React, { useState, useMemo } from 'react';
import {
  Search,
  Droplets,
  Package,
  AlertTriangle,
  Leaf,
  Info,
  ChevronRight,
  Lightbulb,
  Recycle,
  Apple,
  Coffee,
  Egg,
  Trees,
  Flower2,
  Shirt,
  Smartphone,
  Battery,
  Lamp,
  Paintbrush,
  Bug,
  Pill,
  Syringe,
  Printer,
  BookOpen,
  Wine,
  Footprints,
  Gamepad2,
  CircleDot,
  ShieldAlert,
  Newspaper,
  Milk,
  Sandwich,
  Trash2,
} from 'lucide-react';

const wetWasteItems = [
  { name: 'Vegetable Peels', icon: '🥕', tip: 'Compost at home or use community compost bins.' },
  { name: 'Fruit Waste', icon: '🍌', tip: 'Banana peels and apple cores make great compost.' },
  { name: 'Leftover Food', icon: '🍛', tip: 'Avoid wasting food. Compost leftovers if possible.' },
  { name: 'Tea Bags', icon: '🍵', tip: 'Remove staples before composting tea bags.' },
  { name: 'Coffee Grounds', icon: '☕', tip: 'Coffee grounds are excellent plant fertilizer.' },
  { name: 'Egg Shells', icon: '🥚', tip: 'Crush egg shells and add to compost for calcium.' },
  { name: 'Dry Leaves', icon: '🍂', tip: 'Use dry leaves as mulch or add to compost pile.' },
  { name: 'Flowers', icon: '🌸', tip: 'Wilted flowers are perfect compost material.' },
  { name: 'Coconut Shells', icon: '🥥', tip: 'Break into small pieces before composting.' },
  { name: 'Bread Scraps', icon: '🍞', tip: 'Stale bread can be composted or fed to birds.' },
  { name: 'Garden Waste', icon: '🌿', tip: 'Grass clippings and small branches are compostable.' },
  { name: 'Spoiled Milk', icon: '🥛', tip: 'Small amounts can go in compost. Avoid drains.' },
];

const dryWasteItems = [
  { name: 'Plastic Bottles', icon: '🧴', tip: 'Rinse, crush, and send to recycling center.' },
  { name: 'Plastic Bags', icon: '🛍️', tip: 'Reuse or collect for plastic recycling drives.' },
  { name: 'Cardboard', icon: '📦', tip: 'Flatten cardboard boxes for easy recycling.' },
  { name: 'Newspaper', icon: '📰', tip: 'Bundle newspapers and sell to local kabadiwala.' },
  { name: 'Glass Bottles', icon: '🍾', tip: 'Handle carefully. Glass is 100% recyclable.' },
  { name: 'Metal Cans', icon: '🥫', tip: 'Clean and crush metal cans before recycling.' },
  { name: 'Aluminium Foil', icon: '🔲', tip: 'Clean foil can be recycled. Ball it up first.' },
  { name: 'Old Clothes', icon: '👕', tip: 'Donate wearable clothes. Recycle torn ones.' },
  { name: 'Old Shoes', icon: '👟', tip: 'Donate usable shoes. Rubber can be recycled.' },
  { name: 'Old Books', icon: '📚', tip: 'Donate to libraries or sell to kabadiwala.' },
  { name: 'Rubber Items', icon: '🔴', tip: 'Rubber can be recycled into new products.' },
  { name: 'Old Toys', icon: '🧸', tip: 'Donate working toys. Recycle broken plastic ones.' },
];

const hazardousItems = [
  { name: 'Mobile Phones', icon: '📱', tip: 'Take to e-waste collection centers only.', warning: true },
  { name: 'Batteries', icon: '🔋', tip: 'Never throw in regular bins. Use e-waste bins.', warning: true },
  { name: 'Light Bulbs', icon: '💡', tip: 'CFLs contain mercury. Handle with care.', warning: true },
  { name: 'Tube Lights', icon: '🔦', tip: 'Wrap carefully and take to hazardous waste collection.', warning: true },
  { name: 'Paint Cans', icon: '🎨', tip: 'Never pour paint in drains. Dry and dispose safely.', warning: true },
  { name: 'Pesticides', icon: '☠️', tip: 'Keep in original container. Take to collection point.', warning: true },
  { name: 'Medicine Strips', icon: '💊', tip: 'Return to pharmacies or use medicine take-back programs.', warning: true },
  { name: 'Syringes', icon: '💉', tip: 'Use puncture-proof containers. Never throw openly.', warning: true },
  { name: 'Printer Cartridges', icon: '🖨️', tip: 'Return to manufacturer or recycle at e-waste center.', warning: true },
];

const funFacts = [
  {
    emoji: '🌍',
    title: 'India produces 62 million tonnes of waste per year',
    desc: 'Only 20% of this is properly processed. TrashItt aims to change that in Ranchi!',
  },
  {
    emoji: '♻️',
    title: 'Recycling 1 ton of paper saves 17 trees',
    desc: 'That\'s enough oxygen for 170 people to breathe for a whole day!',
  },
  {
    emoji: '🥫',
    title: 'Aluminium cans can be recycled infinite times',
    desc: 'A recycled can is back on the shelf in just 60 days.',
  },
  {
    emoji: '🍌',
    title: 'Food waste in landfills produces methane',
    desc: 'Methane is 25x more potent than CO2 as a greenhouse gas.',
  },
  {
    emoji: '📱',
    title: '1 million phones recycled recovers 35,000 lbs of copper',
    desc: 'Plus 772 lbs of silver, 75 lbs of gold, and 33 lbs of palladium!',
  },
  {
    emoji: '🏙️',
    title: 'Ranchi produces 400+ tons of waste daily',
    desc: 'Proper segregation at source can reduce landfill burden by 60%.',
  },
];

const tabs = [
  { id: 'wet', label: 'Wet Waste', icon: Droplets, color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  { id: 'dry', label: 'Dry Waste', icon: Package, color: '#2563eb', bg: 'rgba(37,99,235,0.1)' },
  { id: 'hazardous', label: 'Hazardous', icon: AlertTriangle, color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
];

function WasteGuide() {
  const [activeTab, setActiveTab] = useState('wet');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);

  const allItems = useMemo(() => {
    return {
      wet: wetWasteItems,
      dry: dryWasteItems,
      hazardous: hazardousItems,
    };
  }, []);

  const filteredItems = useMemo(() => {
    const items = allItems[activeTab];
    if (!searchQuery.trim()) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tip.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery, allItems]);

  const allFilteredCount = useMemo(() => {
    if (!searchQuery.trim()) return null;
    let count = 0;
    Object.values(allItems).forEach((items) => {
      items.forEach((item) => {
        if (
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tip.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          count++;
        }
      });
    });
    return count;
  }, [searchQuery, allItems]);

  const getTabColor = () => {
    const tab = tabs.find((t) => t.id === activeTab);
    return tab ? tab.color : '#16a34a';
  };

  const getTabBg = () => {
    const tab = tabs.find((t) => t.id === activeTab);
    return tab ? tab.bg : 'rgba(22,163,74,0.1)';
  };

  const toggleItem = (name) => {
    setExpandedItem(expandedItem === name ? null : name);
  };

  return (
    <div className="wasteguide-page page-wrapper">
      <div className="container">
        {/* Hero */}
        <div className="wg-hero">
          <div className="wg-hero-badge">
            <BookOpen size={14} />
            <span>Waste Guide</span>
          </div>
          <h1>Know Your Waste</h1>
          <p>
            Learn to identify, segregate, and dispose of every type of waste correctly.
            A cleaner Ranchi starts with you!
          </p>
        </div>

        {/* Search */}
        <div className="wg-search-area">
          <div className="wg-search-bar">
            <Search size={20} className="wg-search-icon" />
            <input
              type="text"
              placeholder="Search waste items... (e.g., plastic, battery, food)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="wg-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {allFilteredCount !== null && (
            <span className="wg-search-count">
              {allFilteredCount} result{allFilteredCount !== 1 ? 's' : ''} found across all categories
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="wg-tabs">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                className={`wg-tab ${activeTab === tab.id ? 'wg-tab-active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setExpandedItem(null);
                }}
                style={{
                  '--tab-color': tab.color,
                  '--tab-bg': tab.bg,
                }}
              >
                <IconComp size={18} />
                <span>{tab.label}</span>
                <span className="wg-tab-count">{allItems[tab.id].length}</span>
              </button>
            );
          })}
        </div>

        {/* Items Grid */}
        <div className="wg-items-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                className={`wg-item-card ${expandedItem === item.name ? 'wg-item-expanded' : ''}`}
                key={item.name}
                style={{
                  '--item-color': getTabColor(),
                  '--item-bg': getTabBg(),
                  animationDelay: `${index * 0.04}s`,
                }}
                onClick={() => toggleItem(item.name)}
              >
                <div className="wg-item-top">
                  <span className="wg-item-emoji">{item.icon}</span>
                  <div className="wg-item-info">
                    <h4 className="wg-item-name">{item.name}</h4>
                    <span className="wg-item-category" style={{ color: getTabColor(), background: getTabBg() }}>
                      {activeTab === 'wet' && '🟢 Wet Waste'}
                      {activeTab === 'dry' && '🔵 Dry Waste'}
                      {activeTab === 'hazardous' && '🔴 Hazardous'}
                    </span>
                  </div>
                  {item.warning && (
                    <span className="wg-item-warning">
                      <ShieldAlert size={14} />
                      WARNING
                    </span>
                  )}
                  <ChevronRight
                    size={18}
                    className={`wg-item-chevron ${expandedItem === item.name ? 'wg-item-chevron-open' : ''}`}
                  />
                </div>
                <div className={`wg-item-bottom ${expandedItem === item.name ? 'wg-item-bottom-open' : ''}`}>
                  <div className="wg-item-tip">
                    <Lightbulb size={16} />
                    <p>{item.tip}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="wg-empty">
              <Trash2 size={48} />
              <h3>No items found</h3>
              <p>Try a different search term or category</p>
            </div>
          )}
        </div>

        {/* Fun Facts */}
        <div className="wg-facts-section">
          <div className="wg-facts-header">
            <div className="wg-facts-badge">
              <Info size={14} />
              <span>Did You Know?</span>
            </div>
            <h2>Fun Facts About Waste</h2>
            <p>Knowledge is the first step towards change</p>
          </div>

          <div className="wg-facts-grid">
            {funFacts.map((fact, i) => (
              <div
                className="wg-fact-card"
                key={i}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="wg-fact-emoji">{fact.emoji}</span>
                <h4>{fact.title}</h4>
                <p>{fact.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .wasteguide-page {
          padding-top: calc(var(--navbar-height) + 24px);
          padding-bottom: 80px;
          animation: fadeInUp 0.5s ease forwards;
        }

        /* ========== HERO ========== */
        .wg-hero {
          text-align: center;
          margin-bottom: 36px;
          padding: 24px 0;
        }

        .wg-hero-badge {
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

        .wg-hero h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 12px;
          background: linear-gradient(135deg, var(--green), var(--teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .wg-hero p {
          color: var(--muted);
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ========== SEARCH ========== */
        .wg-search-area {
          max-width: 600px;
          margin: 0 auto 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .wg-search-bar {
          position: relative;
          width: 100%;
        }

        .wg-search-bar input {
          width: 100%;
          padding: 16px 48px 16px 52px;
          background: var(--card);
          border: 2px solid var(--border);
          border-radius: 9999px;
          font-size: 0.95rem;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
        }

        .wg-search-bar input:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 4px rgba(22,163,74,0.1);
          outline: none;
        }

        .wg-search-bar input::placeholder {
          color: var(--muted);
        }

        .wg-search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
        }

        .wg-search-clear {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg2);
          color: var(--muted);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s ease;
        }

        .wg-search-clear:hover {
          background: var(--red);
          color: #ffffff;
        }

        .wg-search-count {
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 500;
        }

        /* ========== TABS ========== */
        .wg-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .wg-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text2);
          background: var(--card);
          border: 2px solid var(--border);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .wg-tab:hover {
          border-color: var(--tab-color);
          color: var(--tab-color);
        }

        .wg-tab-active {
          background: var(--tab-bg);
          border-color: var(--tab-color);
          color: var(--tab-color);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .wg-tab-count {
          background: var(--bg2);
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .wg-tab-active .wg-tab-count {
          background: var(--tab-color);
          color: #ffffff;
        }

        /* ========== ITEMS GRID ========== */
        .wg-items-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 64px;
        }

        .wg-item-card {
          background: var(--card);
          border: 1.5px solid var(--border);
          border-radius: 14px;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .wg-item-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--item-color);
        }

        .wg-item-expanded {
          border-color: var(--item-color);
          box-shadow: var(--shadow-md);
        }

        .wg-item-top {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 18px;
        }

        .wg-item-emoji {
          font-size: 1.8rem;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--item-bg);
          border-radius: 10px;
        }

        .wg-item-info {
          flex: 1;
          min-width: 0;
        }

        .wg-item-name {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 4px;
        }

        .wg-item-category {
          display: inline-flex;
          align-items: center;
          padding: 2px 10px;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .wg-item-warning {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 10px;
          background: rgba(220,38,38,0.1);
          color: var(--red);
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          flex-shrink: 0;
          animation: pulse 2s ease-in-out infinite;
        }

        .wg-item-chevron {
          color: var(--muted);
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .wg-item-chevron-open {
          transform: rotate(90deg);
          color: var(--item-color);
        }

        .wg-item-bottom {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.35s ease;
          padding: 0 18px;
        }

        .wg-item-bottom-open {
          max-height: 150px;
          padding: 0 18px 18px;
        }

        .wg-item-tip {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px;
          background: var(--bg2);
          border-radius: 10px;
          border-left: 3px solid var(--item-color);
        }

        .wg-item-tip svg {
          color: var(--item-color);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .wg-item-tip p {
          font-size: 0.85rem;
          color: var(--text2);
          line-height: 1.6;
        }

        /* Empty State */
        .wg-empty {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 64px 24px;
          color: var(--muted);
          text-align: center;
        }

        .wg-empty svg {
          opacity: 0.4;
        }

        .wg-empty h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          color: var(--text2);
        }

        .wg-empty p {
          font-size: 0.92rem;
        }

        /* ========== FUN FACTS ========== */
        .wg-facts-section {
          margin-top: 16px;
        }

        .wg-facts-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .wg-facts-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(13,148,136,0.1);
          color: var(--teal);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }

        .wg-facts-header h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: 8px;
        }

        .wg-facts-header p {
          color: var(--muted);
          font-size: 0.95rem;
        }

        .wg-facts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .wg-fact-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: all 0.3s ease;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .wg-fact-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .wg-fact-emoji {
          font-size: 2rem;
        }

        .wg-fact-card h4 {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1.4;
        }

        .wg-fact-card p {
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.6;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .wg-items-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .wg-facts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .wasteguide-page {
            padding-top: calc(var(--navbar-height) + 16px);
            padding-bottom: 56px;
          }

          .wg-hero {
            margin-bottom: 24px;
            padding: 16px 0;
          }

          .wg-hero h1 {
            font-size: 1.8rem;
          }

          .wg-hero p {
            font-size: 0.95rem;
          }

          .wg-tabs {
            gap: 6px;
          }

          .wg-tab {
            padding: 10px 16px;
            font-size: 0.85rem;
          }

          .wg-items-grid,
          .wg-facts-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .wg-search-bar input {
            padding: 14px 44px 14px 48px;
            font-size: 0.9rem;
          }

          .wg-item-top {
            padding: 14px;
          }

          .wg-item-bottom-open {
            padding: 0 14px 14px;
          }
        }

        @media (max-width: 480px) {
          .wg-tabs {
            flex-direction: column;
          }

          .wg-tab {
            justify-content: center;
          }

          .wg-item-emoji {
            width: 38px;
            height: 38px;
            font-size: 1.5rem;
          }

          .wg-item-name {
            font-size: 0.88rem;
          }

          .wg-item-warning {
            font-size: 0.6rem;
            padding: 2px 8px;
          }

          .wg-fact-card {
            padding: 20px 18px;
          }
        }
      `}</style>
    </div>
  );
}

export default WasteGuide;