import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isGalleryPage = location.pathname.startsWith('/gallery');

  if (isGalleryPage) return null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navColor = scrolled || !isHomePage ? 'var(--primary)' : 'white';
  const bgColor = scrolled || !isHomePage ? 'rgba(255, 255, 255, 0.95)' : 'transparent';

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: scrolled ? '15px 5%' : '30px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 2500,
      transition: 'var(--transition)',
      backgroundColor: bgColor,
      backdropFilter: scrolled || !isHomePage ? 'blur(20px)' : 'none',
      boxShadow: scrolled || !isHomePage ? '0 5px 30px rgba(0,0,0,0.03)' : 'none'
    }}>
      <Link to="/" className="luxury-text" style={{ 
        fontSize: '1.8rem', 
        fontWeight: '400', 
        letterSpacing: '0.1em',
        color: navColor,
        textDecoration: 'none',
        textTransform: 'uppercase'
      }}>
        VINI'S <span style={{ color: 'var(--accent)', fontWeight: '400' }}>STUDIO</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }} className="nav-links">
        {['About', 'Projects', 'Testimonials', 'Contact'].map((item) => (
          <a key={item} href={isHomePage ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`} style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: '500',
            color: navColor,
            opacity: scrolled || !isHomePage ? 0.7 : 0.9,
            transition: 'var(--transition)'
          }}>
            {item}
          </a>
        ))}
        <a href="#contact" style={{
          backgroundColor: scrolled || !isHomePage ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
          color: 'white',
          padding: '12px 25px',
          borderRadius: '50px',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          backdropFilter: 'blur(10px)'
        }}>
          Get in Touch
        </a>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
