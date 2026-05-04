import React from 'react';

const Hero = () => {
  return (
    <section className="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      color: 'white',
      backgroundColor: '#000',
      padding: '100px 0 60px 0' // Added padding to prevent overlap with navbar
    }}>
      {/* Background Image */}
      <div className="hero-bg" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <img 
          src="/assets/Living room with Kitchen/WhatsApp Image 2026-05-01 at 22.58.07.jpeg" 
          alt="Luxury Interior" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.5) contrast(1.05)'
          }}
          loading="eager"
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 50%, rgba(0,0,0,0.7) 100%)'
        }}></div>
      </div>
      
      {/* Content Container */}
      <div className="hero-content" style={{ 
        position: 'relative',
        zIndex: 1,
        width: '100%',
        padding: '0 5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div className="animate-up" style={{ animationDelay: '0.2s' }}>
          <p style={{ 
            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', 
            letterSpacing: '0.4em', 
            textTransform: 'uppercase', 
            fontWeight: '400',
            opacity: 0.8,
            marginBottom: '20px'
          }}>
            Vini's Interior Design Studio
          </p>
        </div>

        <h1 className="stylized-heading animate-up" style={{ 
          fontSize: 'clamp(3rem, 11vw, 8rem)', 
          lineHeight: '1.1',
          animationDelay: '0.4s',
          marginBottom: '30px'
        }}>
          VISION. <br />
          <em>PASSION.</em> <br />
          PERFECTION.
        </h1>

        <div className="animate-up" style={{ animationDelay: '0.6s', maxWidth: '600px', marginBottom: '50px' }}>
          <p style={{ 
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', 
            fontWeight: '300',
            lineHeight: '1.7',
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.01em'
          }}>
            A bespoke interior design studio dedicated to creating light-filled, 
            emotionally resonant spaces that reflect your unique narrative.
          </p>
        </div>

        <div className="animate-up" style={{ animationDelay: '0.8s' }}>
          <a href="#contact" style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            padding: '14px 35px',
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: '50px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: '500',
            backdropFilter: 'blur(5px)',
            transition: 'var(--transition)'
          }} className="hero-btn">
            GET IN TOUCH 
            <span style={{ fontSize: '1.1rem' }}>→</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        opacity: 0.4
      }} className="fade-in">
        <div style={{
          width: '1px',
          height: '50px',
          background: 'linear-gradient(to bottom, white, transparent)',
          animation: 'scrollLine 2.5s infinite'
        }}></div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { height: 0; opacity: 0; transform: translateY(0); }
          50% { height: 50px; opacity: 1; }
          100% { height: 0; opacity: 0; transform: translateY(50px); }
        }
        .hero-btn:hover {
          background-color: white;
          color: black;
          border-color: white;
        }
        @media (max-width: 768px) {
          .hero { padding: 120px 0 80px 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
