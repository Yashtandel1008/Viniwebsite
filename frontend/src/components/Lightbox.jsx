import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ images, initialIndex, onClose, projectTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance in pixels
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) handleNext(new Event('swipe'));
    if (isRightSwipe) handlePrev(new Event('swipe'));
  };

  const handleNext = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="lightbox-overlay" 
      onClick={onClose} 
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.98)',
        zIndex: 3000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(15px)',
        userSelect: 'none'
      }}
    >
      {/* Top Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: '30px 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        color: 'white',
        zIndex: 3010,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)'
      }}>
        <div style={{ textAlign: 'left' }}>
          <h3 className="stylized-heading" style={{ 
            margin: '0 0 10px 0', 
            fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', 
            fontWeight: '500',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            {projectTitle}
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.6, letterSpacing: '0.1em' }}>
            {currentIndex + 1} <span style={{ opacity: 0.4 }}>/</span> {images.length}
          </p>
        </div>
        <button onClick={onClose} style={{
          color: 'white',
          padding: '12px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          display: 'flex',
          transition: 'var(--transition)'
        }} className="close-btn">
          <X size={28} />
        </button>
      </div>

      <button className="nav-btn prev" onClick={handlePrev} style={{
        position: 'absolute',
        left: '20px',
        color: 'white',
        zIndex: 3010,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ChevronLeft size={40} />
      </button>

      <div style={{ maxWidth: '90%', maxHeight: '75vh', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <img 
          src={images[currentIndex]} 
          alt={`Gallery ${currentIndex}`} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '75vh', 
            objectFit: 'contain',
            borderRadius: '10px',
            boxShadow: '0 0 50px rgba(0,0,0,0.5)'
          }} 
        />
      </div>

      <button className="nav-btn next" onClick={handleNext} style={{
        position: 'absolute',
        right: '20px',
        color: 'white',
        zIndex: 3010,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ChevronRight size={40} />
      </button>

      <style>{`
        @media (max-width: 768px) {
          .nav-btn {
            background: none !important;
            width: 50px !important;
            height: 50px !important;
          }
          .nav-btn svg {
            width: 32px !important;
          }
          .nav-btn.prev { left: 5px !important; }
          .nav-btn.next { right: 5px !important; }
          .stylized-heading {
            font-size: 1.2rem !important;
            line-height: 1.4 !important;
            margin-bottom: 5px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Lightbox;
