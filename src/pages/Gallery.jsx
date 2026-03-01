import React, { useState } from 'react';
import {
  Camera,
  Heart,
  MapPin,
  User,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  Hash,
  Eye,
} from 'lucide-react';
import toast from 'react-hot-toast';

const galleryItems = [
  {
    id: 1,
    before: 'https://picsum.photos/seed/gbefore1/600/450',
    after: 'https://picsum.photos/seed/gafter1/600/450',
    location: 'Hindpiri Market, Ranchi',
    user: 'Priya Sharma',
    avatar: 'PS',
    date: 'March 12, 2026',
    likes: 234,
    hashtag: '#ZeroWasteStreet',
    challenge: 'ZeroWasteStreet',
    category: 'latest',
  },
  {
    id: 2,
    before: 'https://picsum.photos/seed/gbefore2/600/450',
    after: 'https://picsum.photos/seed/gafter2/600/450',
    location: 'Ranchi Lake, Ranchi',
    user: 'Amit Verma',
    avatar: 'AV',
    date: 'March 10, 2026',
    likes: 189,
    hashtag: '#RiverRevival',
    challenge: 'RiverRevival',
    category: 'most-liked',
  },
  {
    id: 3,
    before: 'https://picsum.photos/seed/gbefore3/600/450',
    after: 'https://picsum.photos/seed/gafter3/600/450',
    location: 'Morabadi Ground, Ranchi',
    user: 'Sneha Kumari',
    avatar: 'SK',
    date: 'March 8, 2026',
    likes: 312,
    hashtag: '#MyBinMyPride',
    challenge: 'MyBinMyPride',
    category: 'most-liked',
  },
  {
    id: 4,
    before: 'https://picsum.photos/seed/gbefore4/600/450',
    after: 'https://picsum.photos/seed/gafter4/600/450',
    location: 'Kanke Road, Ranchi',
    user: 'Vikash Oraon',
    avatar: 'VO',
    date: 'March 6, 2026',
    likes: 145,
    hashtag: '#ZeroWasteStreet',
    challenge: 'ZeroWasteStreet',
    category: 'latest',
  },
  {
    id: 5,
    before: 'https://picsum.photos/seed/gbefore5/600/450',
    after: 'https://picsum.photos/seed/gafter5/600/450',
    location: 'BIT Mesra Campus',
    user: 'Anjali Singh',
    avatar: 'AS',
    date: 'March 5, 2026',
    likes: 278,
    hashtag: '#CollegeCleanWars',
    challenge: 'CollegeCleanWars',
    category: 'most-liked',
  },
  {
    id: 6,
    before: 'https://picsum.photos/seed/gbefore6/600/450',
    after: 'https://picsum.photos/seed/gafter6/600/450',
    location: 'Jumar River Bank',
    user: 'Ravi Mahto',
    avatar: 'RM',
    date: 'March 3, 2026',
    likes: 198,
    hashtag: '#RiverRevival',
    challenge: 'RiverRevival',
    category: 'latest',
  },
  {
    id: 7,
    before: 'https://picsum.photos/seed/gbefore7/600/450',
    after: 'https://picsum.photos/seed/gafter7/600/450',
    location: 'Doranda, Ranchi',
    user: 'Neha Gupta',
    avatar: 'NG',
    date: 'March 1, 2026',
    likes: 167,
    hashtag: '#ZeroWasteStreet',
    challenge: 'ZeroWasteStreet',
    category: 'latest',
  },
  {
    id: 8,
    before: 'https://picsum.photos/seed/gbefore8/600/450',
    after: 'https://picsum.photos/seed/gafter8/600/450',
    location: 'Harmu Road, Ranchi',
    user: 'Sanjay Tirkey',
    avatar: 'ST',
    date: 'Feb 28, 2026',
    likes: 256,
    hashtag: '#MyBinMyPride',
    challenge: 'MyBinMyPride',
    category: 'most-liked',
  },
  {
    id: 9,
    before: 'https://picsum.photos/seed/gbefore9/600/450',
    after: 'https://picsum.photos/seed/gafter9/600/450',
    location: 'Lalpur Chowk, Ranchi',
    user: 'Pooja Devi',
    avatar: 'PD',
    date: 'Feb 25, 2026',
    likes: 134,
    hashtag: '#30DayGreenStreak',
    challenge: '30DayGreenStreak',
    category: 'latest',
  },
  {
    id: 10,
    before: 'https://picsum.photos/seed/gbefore10/600/450',
    after: 'https://picsum.photos/seed/gafter10/600/450',
    location: 'Xavier\'s College, Ranchi',
    user: 'Deepak Sahu',
    avatar: 'DS',
    date: 'Feb 22, 2026',
    likes: 289,
    hashtag: '#CollegeCleanWars',
    challenge: 'CollegeCleanWars',
    category: 'most-liked',
  },
  {
    id: 11,
    before: 'https://picsum.photos/seed/gbefore11/600/450',
    after: 'https://picsum.photos/seed/gafter11/600/450',
    location: 'Ratu Road, Ranchi',
    user: 'Kavita Lakra',
    avatar: 'KL',
    date: 'Feb 20, 2026',
    likes: 176,
    hashtag: '#ZeroWasteStreet',
    challenge: 'ZeroWasteStreet',
    category: 'latest',
  },
  {
    id: 12,
    before: 'https://picsum.photos/seed/gbefore12/600/450',
    after: 'https://picsum.photos/seed/gafter12/600/450',
    location: 'Namkum, Ranchi',
    user: 'Manish Kumar',
    avatar: 'MK',
    date: 'Feb 18, 2026',
    likes: 203,
    hashtag: '#RiverRevival',
    challenge: 'RiverRevival',
    category: 'latest',
  },
];

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'latest', label: 'Latest' },
  { id: 'most-liked', label: 'Most Liked' },
  { id: 'ZeroWasteStreet', label: '#ZeroWasteStreet' },
  { id: 'CollegeCleanWars', label: '#CollegeCleanWars' },
  { id: 'RiverRevival', label: '#RiverRevival' },
  { id: 'MyBinMyPride', label: '#MyBinMyPride' },
  { id: '30DayGreenStreak', label: '#30DayGreenStreak' },
];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [likedItems, setLikedItems] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'latest') return item.category === 'latest';
    if (activeFilter === 'most-liked') return item.category === 'most-liked';
    return item.challenge === activeFilter;
  });

  const sortedItems = activeFilter === 'most-liked'
    ? [...filteredItems].sort((a, b) => b.likes - a.likes)
    : filteredItems;

  const toggleLike = (id, e) => {
    e.stopPropagation();
    if (likedItems.includes(id)) {
      setLikedItems((prev) => prev.filter((i) => i !== id));
    } else {
      setLikedItems((prev) => [...prev, id]);
      toast.success('Liked! ❤️', { duration: 1500 });
    }
  };

  const openLightbox = (item) => {
    setLightbox(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction) => {
    if (!lightbox) return;
    const currentIndex = sortedItems.findIndex((i) => i.id === lightbox.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex < sortedItems.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : sortedItems.length - 1;
    }
    setLightbox(sortedItems[newIndex]);
  };

  const getLikeCount = (item) => {
    const isLiked = likedItems.includes(item.id);
    return isLiked ? item.likes + 1 : item.likes;
  };

  return (
    <div className="gallery-page page-wrapper">
      <div className="container">
        {/* Hero */}
        <div className="gal-hero">
          <div className="gal-hero-badge">
            <Camera size={14} />
            <span>Community Gallery</span>
          </div>
          <h1>Before & After</h1>
          <p>
            Witness the incredible transformations made by our TrashItt community.
            Every cleanup tells a story of change!
          </p>
        </div>

        {/* Filters */}
        <div className="gal-filters">
          <div className="gal-filters-label">
            <Filter size={16} />
            <span>Filter:</span>
          </div>
          <div className="gal-filters-scroll">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                className={`gal-filter-btn ${activeFilter === filter.id ? 'gal-filter-active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gal-grid">
          {sortedItems.map((item, i) => {
            const isLiked = likedItems.includes(item.id);
            return (
              <div
                className="gal-card"
                key={item.id}
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => openLightbox(item)}
              >
                <div className="gal-card-images">
                  <div className="gal-card-img-wrap">
                    <img src={item.before} alt={`Before - ${item.location}`} loading="lazy" />
                    <span className="gal-label gal-label-before">Before</span>
                  </div>
                  <div className="gal-card-img-wrap">
                    <img src={item.after} alt={`After - ${item.location}`} loading="lazy" />
                    <span className="gal-label gal-label-after">After</span>
                  </div>
                  <div className="gal-card-overlay">
                    <Eye size={22} />
                    <span>View</span>
                  </div>
                </div>

                <div className="gal-card-content">
                  <div className="gal-card-top-row">
                    <div className="gal-card-user">
                      <div className="gal-card-avatar">{item.avatar}</div>
                      <div className="gal-card-user-info">
                        <span className="gal-card-username">{item.user}</span>
                        <span className="gal-card-date">{item.date}</span>
                      </div>
                    </div>
                    <button
                      className={`gal-like-btn ${isLiked ? 'gal-like-active' : ''}`}
                      onClick={(e) => toggleLike(item.id, e)}
                      aria-label={isLiked ? 'Unlike' : 'Like'}
                    >
                      <Heart size={18} fill={isLiked ? '#dc2626' : 'none'} />
                      <span>{getLikeCount(item)}</span>
                    </button>
                  </div>

                  <div className="gal-card-location">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>

                  <span className="gal-card-hashtag">{item.hashtag}</span>
                </div>
              </div>
            );
          })}
        </div>

        {sortedItems.length === 0 && (
          <div className="gal-empty">
            <Camera size={48} />
            <h3>No photos found</h3>
            <p>Try a different filter</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="gal-lightbox" onClick={closeLightbox}>
          <div className="gal-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="gal-lightbox-close" onClick={closeLightbox} aria-label="Close">
              <X size={22} />
            </button>

            <button
              className="gal-lightbox-nav gal-lightbox-prev"
              onClick={() => navigateLightbox('prev')}
              aria-label="Previous"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              className="gal-lightbox-nav gal-lightbox-next"
              onClick={() => navigateLightbox('next')}
              aria-label="Next"
            >
              <ChevronRight size={28} />
            </button>

            <div className="gal-lightbox-images">
              <div className="gal-lightbox-img-wrap">
                <img src={lightbox.before} alt={`Before - ${lightbox.location}`} />
                <span className="gal-label gal-label-before">Before</span>
              </div>
              <div className="gal-lightbox-img-wrap">
                <img src={lightbox.after} alt={`After - ${lightbox.location}`} />
                <span className="gal-label gal-label-after">After</span>
              </div>
            </div>

            <div className="gal-lightbox-info">
              <div className="gal-lightbox-user">
                <div className="gal-lightbox-avatar">{lightbox.avatar}</div>
                <div>
                  <span className="gal-lightbox-username">{lightbox.user}</span>
                  <span className="gal-lightbox-date">{lightbox.date}</span>
                </div>
              </div>
              <div className="gal-lightbox-details">
                <span className="gal-lightbox-loc">
                  <MapPin size={14} />
                  {lightbox.location}
                </span>
                <span className="gal-lightbox-tag">
                  <Hash size={14} />
                  {lightbox.hashtag}
                </span>
              </div>
              <button
                className={`gal-lightbox-like-btn ${likedItems.includes(lightbox.id) ? 'gal-like-active' : ''}`}
                onClick={(e) => toggleLike(lightbox.id, e)}
              >
                <Heart size={18} fill={likedItems.includes(lightbox.id) ? '#dc2626' : 'none'} />
                <span>{getLikeCount(lightbox)} Likes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-page {
          padding-top: calc(var(--navbar-height) + 24px);
          padding-bottom: 80px;
          animation: fadeInUp 0.5s ease forwards;
        }

        /* ========== HERO ========== */
        .gal-hero {
          text-align: center;
          margin-bottom: 32px;
          padding: 24px 0;
        }

        .gal-hero-badge {
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

        .gal-hero h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 12px;
          background: linear-gradient(135deg, var(--green), var(--teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gal-hero p {
          color: var(--muted);
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ========== FILTERS ========== */
        .gal-filters {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 32px;
          overflow-x: auto;
          padding-bottom: 8px;
          -webkit-overflow-scrolling: touch;
        }

        .gal-filters::-webkit-scrollbar {
          height: 0;
        }

        .gal-filters-label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--muted);
          font-size: 0.88rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .gal-filters-scroll {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .gal-filter-btn {
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text2);
          background: var(--card);
          border: 1.5px solid var(--border);
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }

        .gal-filter-btn:hover {
          border-color: var(--green);
          color: var(--green);
        }

        .gal-filter-active {
          background: rgba(22,163,74,0.1);
          border-color: var(--green);
          color: var(--green);
        }

        /* ========== GRID ========== */
        .gal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .gal-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        .gal-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .gal-card-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          position: relative;
          overflow: hidden;
        }

        .gal-card-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .gal-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gal-card:hover .gal-card-img-wrap img {
          transform: scale(1.08);
        }

        .gal-label {
          position: absolute;
          top: 8px;
          left: 8px;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #ffffff;
          z-index: 2;
        }

        .gal-label-before {
          background: rgba(220,38,38,0.85);
        }

        .gal-label-after {
          background: rgba(22,163,74,0.85);
        }

        .gal-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 3;
        }

        .gal-card:hover .gal-card-overlay {
          opacity: 1;
        }

        .gal-card-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .gal-card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .gal-card-user {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .gal-card-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--green), var(--accent));
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          flex-shrink: 0;
        }

        .gal-card-user-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .gal-card-username {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .gal-card-date {
          font-size: 0.72rem;
          color: var(--muted);
        }

        .gal-like-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 9999px;
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--muted);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
          font-family: 'DM Sans', sans-serif;
        }

        .gal-like-btn:hover {
          border-color: #dc2626;
          color: #dc2626;
        }

        .gal-like-active {
          background: rgba(220,38,38,0.08);
          border-color: #dc2626;
          color: #dc2626;
        }

        .gal-like-btn:active {
          transform: scale(0.92);
        }

        .gal-card-location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--text2);
          font-weight: 500;
        }

        .gal-card-location svg {
          color: var(--green);
          flex-shrink: 0;
        }

        .gal-card-hashtag {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--green);
          background: rgba(22,163,74,0.08);
          padding: 3px 10px;
          border-radius: 9999px;
          width: fit-content;
        }

        /* ========== EMPTY STATE ========== */
        .gal-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 80px 24px;
          color: var(--muted);
          text-align: center;
        }

        .gal-empty svg {
          opacity: 0.4;
        }

        .gal-empty h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          color: var(--text2);
        }

        /* ========== LIGHTBOX ========== */
        .gal-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeInScale 0.3s ease;
        }

        .gal-lightbox-content {
          background: var(--card);
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: scaleIn 0.3s ease;
        }

        .gal-lightbox-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.5);
          color: #ffffff;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transition: all 0.25s ease;
        }

        .gal-lightbox-close:hover {
          background: var(--red);
          transform: rotate(90deg);
        }

        .gal-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.5);
          color: #ffffff;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transition: all 0.25s ease;
        }

        .gal-lightbox-nav:hover {
          background: var(--green);
        }

        .gal-lightbox-prev {
          left: -56px;
        }

        .gal-lightbox-next {
          right: -56px;
        }

        .gal-lightbox-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3px;
          border-radius: 20px 20px 0 0;
          overflow: hidden;
        }

        .gal-lightbox-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .gal-lightbox-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gal-lightbox-info {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .gal-lightbox-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .gal-lightbox-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--green), var(--accent));
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
        }

        .gal-lightbox-username {
          display: block;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
        }

        .gal-lightbox-date {
          display: block;
          font-size: 0.8rem;
          color: var(--muted);
        }

        .gal-lightbox-details {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .gal-lightbox-loc,
        .gal-lightbox-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          color: var(--text2);
          font-weight: 500;
        }

        .gal-lightbox-loc svg,
        .gal-lightbox-tag svg {
          color: var(--green);
        }

        .gal-lightbox-like-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 12px;
          background: var(--bg2);
          border: 1.5px solid var(--border);
          color: var(--text2);
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          align-self: flex-start;
          font-family: 'DM Sans', sans-serif;
        }

        .gal-lightbox-like-btn:hover {
          border-color: #dc2626;
          color: #dc2626;
        }

        .gal-lightbox-like-btn.gal-like-active {
          background: rgba(220,38,38,0.08);
          border-color: #dc2626;
          color: #dc2626;
        }

        .gal-lightbox-like-btn:active {
          transform: scale(0.95);
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .gal-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .gal-lightbox-prev {
            left: 12px;
          }

          .gal-lightbox-next {
            right: 12px;
          }
        }

        @media (max-width: 768px) {
          .gallery-page {
            padding-top: calc(var(--navbar-height) + 16px);
            padding-bottom: 56px;
          }

          .gal-hero h1 {
            font-size: 1.8rem;
          }

          .gal-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .gal-filters {
            gap: 10px;
          }

          .gal-filter-btn {
            padding: 6px 14px;
            font-size: 0.78rem;
          }

          .gal-lightbox-content {
            max-width: 100%;
            border-radius: 16px;
          }

          .gal-lightbox-images {
            grid-template-columns: 1fr;
          }

          .gal-lightbox-info {
            padding: 18px;
          }

          .gal-lightbox-prev {
            left: 8px;
            top: 40%;
          }

          .gal-lightbox-next {
            right: 8px;
            top: 40%;
          }

          .gal-lightbox-nav {
            width: 36px;
            height: 36px;
          }

          .gal-lightbox {
            padding: 12px;
          }
        }

        @media (max-width: 480px) {
          .gal-hero h1 {
            font-size: 1.5rem;
          }

          .gal-card-content {
            padding: 12px;
          }

          .gal-card-avatar {
            width: 30px;
            height: 30px;
            font-size: 0.65rem;
          }

          .gal-card-username {
            font-size: 0.82rem;
          }

          .gal-like-btn {
            padding: 5px 10px;
            font-size: 0.78rem;
          }

          .gal-filters-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default Gallery;