import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="floating-buttons" style={{
      position: 'fixed',
      bottom: '30px',
      right: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      zIndex: 2500
    }}>
      {/* Phone Button */}
      <a href="tel:+919687206812" style={{
        width: '60px',
        height: '60px',
        backgroundColor: 'var(--primary)',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        transition: 'var(--transition)'
      }} className="fab-btn">
        <Phone size={24} />
      </a>

      {/* WhatsApp Button */}
      <a href="https://wa.me/919687206812" target="_blank" rel="noopener noreferrer" style={{
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(22,163,74,0.3)',
        transition: 'var(--transition)'
      }} className="fab-btn">
        <MessageCircle size={28} />
      </a>

      <style>{`
        .fab-btn:hover {
          transform: translateY(-5px) scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default FloatingButtons;
