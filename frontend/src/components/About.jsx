import React from 'react';

const About = () => {
  return (
    <section className="about-section" style={{ padding: '60px 5%', backgroundColor: 'var(--white)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="about-grid">
          
          <div className="about-text-content reveal">
            <p style={{ 
              fontSize: '0.8rem', 
              letterSpacing: '0.3em', 
              textTransform: 'uppercase', 
              color: 'var(--accent)',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              The Studio
            </p>
            
            <h2 className="stylized-heading" style={{ 
              fontSize: '3rem', 
              marginBottom: '20px',
              color: 'var(--primary)',
              lineHeight: '1.1'
            }}>
              DESIGN WITH <br />
              <em>INTENTION</em>
            </h2>
            
            <div style={{ maxWidth: '500px' }}>
              <p style={{ 
                fontSize: '1.1rem', 
                color: 'var(--text-muted)', 
                marginBottom: '30px', 
                lineHeight: '1.8'
              }}>
                At Vini's Studio, we believe that interior design is not just about how 
                a space looks – it's about how it makes you feel. We approach each 
                project as a layered composition of light, form, and purpose.
              </p>

              <div style={{ display: 'flex', gap: '60px', marginBottom: '30px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
                <div>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '500', marginBottom: '5px' }}>4+</h3>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>Years of Experience</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '500', marginBottom: '5px' }}>60+</h3>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>Projects Completed</p>
                </div>
              </div>

            </div>
          </div>

          <div className="about-image-stack reveal" style={{ position: 'relative', display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
            <div style={{ 
              width: '60%', 
              borderRadius: '10px', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-soft)',
              transition: 'transform 0.8s ease'
            }} className="main-img">
              <img 
                src="/assets/Living room with Kitchen/WhatsApp Image 2026-05-01 at 22.58.07.jpeg" 
                alt="Main Portfolio" 
                style={{ width: '100%', height: '650px', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div style={{ 
              width: '40%', 
              marginTop: '80px', 
              borderRadius: '10px', 
              overflow: 'hidden', 
              boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
              transition: 'transform 1.2s ease'
            }} className="side-img">
              <img 
                src="/assets/TOILET AND WALK IN WADROBE/WhatsApp Image 2026-05-01 at 22.50.12.jpeg" 
                alt="Detail View" 
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .learn-more-btn:hover {
          letter-spacing: 0.3em;
          color: var(--accent);
          border-color: var(--accent);
        }
        .about-image-stack:hover .main-img {
          transform: translateY(-10px);
        }
        .about-image-stack:hover .side-img {
          transform: translateY(20px);
        }
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 80px !important; }
          .about-image-stack { flex-direction: row !important; }
          .about-image-stack img { height: 450px !important; }
          .main-img { width: 55% !important; }
          .side-img { width: 45% !important; margin-top: 40px !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
