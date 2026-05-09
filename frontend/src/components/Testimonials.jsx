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
    content: 'Studio Vini transformed our master bedroom into a luxury hotel suite. Their precision and attention to detail is remarkable.',
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
    role: 'Kitchen Renovation',
    content: 'The fittings and material quality in our modular kitchen are top-notch. Thank you for completing the work right on time.',
  },
  {
    name: 'Rekhaben Mistry',
    role: 'Kitchen Interior',
    content: 'The storage solutions are so smartly designed. Our kitchen stays clean and organized effortlessly.',
  },
  {
    name: 'Ketanbhai Gandhi',
    role: 'Commercial Office',
    content: 'The office design is both professional and modern. Our clients are always impressed when they visit.',
  },
  {
    name: 'Manishaben Solanki',
    role: 'Retail Showroom',
    content: 'The lighting and display areas in our showroom are so well done that we have seen a significant increase in customer footfall.',
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
