import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajeshbhai Patel',
    role: 'Bedroom Interior',
    content: 'The bedroom design is incredibly calm and comfortable. The lighting and color combination are absolutely wonderful.',
  },
  {
    name: 'Smitaben Shah',
    role: 'Master Bedroom',
    content: 'We are extremely happy with the final outcome. The house feels elegant, spacious, and exactly the way we imagined. Every detail was thoughtfully designed.',
  },
  {
    name: 'Hardikbhai Mehta',
    role: 'Bedroom Design',
    content: 'The finish on the wardrobe and bed is stunning. They utilized every inch of space efficiently without sacrificing style.',
  },
  {
    name: 'Daxaben Tandel',
    role: 'Modular Kitchen',
    content: 'Our kitchen work is so beautiful that cooking has become a joy. Everything has its perfect place now.',
  },
  {
    name: 'Vipulbhai Desai',
    role: 'Cloth Store',
    content: 'Vini’s Studio completely elevated the look of our store. Customers immediately notice the premium and welcoming atmosphere.',
  },
  {
    name: 'Ketanbhai Gandhi',
    role: 'Commercial Office',
    content: 'The office design is both professional and modern. Our clients are always impressed when they visit.',
  },
  {
    name: 'Manishaben Solanki',
    role: 'Retail Showroom',
    content: 'The layout, lighting, and display planning were done brilliantly by Vini’s Studio. The interiors genuinely improved the customer experience.',
  },
  {
    name: 'Jayeshbhai Ahir',
    role: 'Commercial Project',
    content: 'Thank you to the Studio Vini team for delivering such high-quality work within our budget and timeframe.',
  },
  {
    name: 'Pritiben Gajjar',
    role: 'Full Home Interior',
    content: 'Our entire home has turned out so beautiful that every guest asks who did the interior! Absolutely wonderful work.',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
    
    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isMobile]);

  return (
    <section id="testimonials" className="testimonials-section" style={{ padding: '60px 0', backgroundColor: 'var(--secondary)', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px', padding: '0 20px' }} className="reveal">
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '15px', fontWeight: '600' }}>
          Testimonials
        </p>
        <h2 className="stylized-heading" style={{ fontSize: '3rem' }}>
          CLIENT <br />
          <em>STORIES</em>
        </h2>
        <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent)', margin: '20px auto' }}></div>
      </div>
      
      <div className="reveal" style={{ animationDelay: '0.3s' }}>
        {isMobile ? (
          <div 
            className="testimonial-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ 
              position: 'relative', 
              maxWidth: '90vw', 
              margin: '0 auto',
              minHeight: '360px'
            }}
          >
            {testimonials.map((t, index) => {
              let position = 'next';
              if (index === currentIndex) position = 'active';
              if (index === (currentIndex - 1 + testimonials.length) % testimonials.length) position = 'prev';

              return (
                <div 
                  key={index} 
                  className={`testimonial-slide ${position}`}
                  style={{
                    backgroundColor: 'var(--white)',
                    padding: '40px 30px',
                    borderRadius: '15px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.05)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    opacity: position === 'active' ? 1 : 0,
                    transform: position === 'active' ? 'translateX(0) scale(1)' : 
                               position === 'prev' ? 'translateX(-100%) scale(0.95)' : 'translateX(100%) scale(0.95)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    visibility: position === 'active' ? 'visible' : 'hidden',
                    zIndex: position === 'active' ? 10 : 0
                  }}
                >
                  <Quote size={50} color="var(--accent)" style={{ opacity: 0.08, position: 'absolute', top: '25px', right: '30px' }} />
                  <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                    "{t.content}"
                  </p>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '5px', fontWeight: '600' }}>{t.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '600' }}>{t.role}</p>
                  </div>
                </div>
              );
            })}
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '10px', 
              position: 'absolute', 
              bottom: '0px', 
              width: '100%' 
            }}>
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setCurrentIndex(i)}
                  style={{
                    width: i === currentIndex ? '25px' : '8px',
                    height: '2px',
                    backgroundColor: i === currentIndex ? 'var(--accent)' : '#ccc',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer'
                  }}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="testimonial-scroll" style={{ 
            display: 'flex', 
            gap: '40px', 
            padding: '0 5% 60px 5%',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none'
          }}>
            {testimonials.map((t, index) => (
              <div key={index} className="testimonial-card" style={{
                backgroundColor: 'var(--white)',
                padding: '50px',
                borderRadius: '12px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
                position: 'relative',
                flex: '0 0 450px',
                scrollSnapAlign: 'start',
                transition: 'var(--transition)'
              }}>
                <Quote size={60} color="var(--accent)" style={{ opacity: 0.08, position: 'absolute', top: '40px', right: '40px' }} />
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '40px', fontSize: '1.15rem', lineHeight: '1.8' }}>
                  "{t.content}"
                </p>
                <div>
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '5px', fontWeight: '600' }}>{t.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .testimonial-scroll::-webkit-scrollbar { display: none; }
        .testimonial-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 70px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
