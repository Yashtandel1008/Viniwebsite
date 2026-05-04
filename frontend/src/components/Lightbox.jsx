import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ images, initialIndex, onClose, projectTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
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
    <div className="lightbox-overlay" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.95)',
      zIndex: 3000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
      userSelect: 'none'
    }}>
      {/* Top Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        zIndex: 3010
      }}>
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{projectTitle}</h3>
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.6 }}>{currentIndex + 1} / {images.length}</p>
        </div>
        <button onClick={onClose} style={{
          color: 'white',
          padding: '10px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          display: 'flex'
        }}>
          <X size={24} />
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
        }
      `}</style>
    </div>
  );
};

export default Lightbox;
