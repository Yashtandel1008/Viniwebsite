import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectScroll from './components/ProjectScroll';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import GalleryPage from './components/GalleryPage';
import FloatingButtons from './components/FloatingButtons';

// Scroll to top or to hash on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      // Small timeout to allow content to render before scrolling
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
};

const HomePage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <div id="about" className="reveal"><About /></div>
      <div id="projects" className="reveal"><ProjectScroll /></div>
      <div id="testimonials" className="reveal"><Testimonials /></div>
      <div id="contact" className="reveal"><Contact /></div>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery/:categoryId" element={<GalleryPage />} />
        </Routes>
        
        <FloatingButtons />

        <footer style={{ padding: '100px 5% 60px 5%', backgroundColor: 'var(--primary)', color: 'white' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '2rem', 
              fontWeight: '600', 
              letterSpacing: '0.05em', 
              marginBottom: '30px',
              textTransform: 'uppercase'
            }}>
              VINI'S <span style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: '400' }}>STUDIO</span>
            </div>
            
            <div className="footer-links" style={{ display: 'flex', gap: '30px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['About', 'Projects', 'Testimonials', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="footer-link" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.6, whiteSpace: 'nowrap' }}>
                  {item}
                </a>
              ))}
            </div>

            <p style={{ opacity: 0.3, fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              © {new Date().getFullYear()} Vini's Interior Design Studio. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
