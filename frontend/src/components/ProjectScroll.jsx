import React from 'react';
import { Link } from 'react-router-dom';
import { projects, categories } from '../data/projects';

const ProjectScroll = () => {
  // Get unique categories that have projects
  const displayCategories = categories.map(cat => {
    const firstProject = projects.find(p => p.categoryId === cat.id);
    return {
      ...cat,
      thumbnail: firstProject?.thumbnail || '',
      subtitle: firstProject?.subtitle || 'View Portfolio'
    };
  }).filter(cat => cat.thumbnail);

  return (
    <section id="projects" className="projects-section" style={{ padding: '120px 0', backgroundColor: 'var(--white)' }}>
      <div style={{ padding: '0 5%', marginBottom: '60px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px', fontWeight: '600' }}>
          Portfolio
        </p>
        <h2 className="stylized-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
          IMPRESSIONS THAT <br />
          <em>ENDURE</em>
        </h2>
        <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent)', margin: '30px auto' }}></div>
      </div>
      
      <div className="projects-scroll-container" style={{ 
        display: 'flex',
        gap: '30px', 
        padding: '0 5% 60px 5%',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none'
      }}>
        {displayCategories.map((cat, index) => (
          <Link key={cat.id} to={`/gallery/${cat.id}`} className="project-card" style={{
            position: 'relative',
            flex: '0 0 380px', // Reduced from 450px as per Image 2 feedback
            height: '550px', // Slightly reduced height to match
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
            transition: 'var(--transition)',
            textDecoration: 'none',
            scrollSnapAlign: 'start',
            backgroundColor: '#f9f9f9'
          }}>
            <img 
              src={cat.thumbnail} 
              alt={cat.name} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.8s ease'
              }}
              loading="lazy"
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '60px 25px 30px 25px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px', opacity: 0.8 }}>{cat.subtitle}</p>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '500', fontFamily: 'var(--font-serif)', textTransform: 'uppercase', marginBottom: '12px' }}>{cat.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>View Collection</span>
                <span style={{ fontSize: '1.1rem' }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .projects-scroll-container::-webkit-scrollbar { display: none; }
        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 70px rgba(0,0,0,0.12);
        }
        .project-card:hover img {
          transform: scale(1.08);
        }
        @media (max-width: 768px) {
          .projects-section { padding: 80px 0 !important; }
          .projects-scroll-container {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important; // 2 columns as per Image 4
            gap: 12px !important;
            padding: 0 15px !important;
            overflow-x: hidden !important;
          }
          .project-card {
            flex: none !important;
            width: 100% !important;
            height: 280px !important; // Adjusted height for mobile grid
          }
          .project-card h3 {
            font-size: 1.1rem !important;
            margin-bottom: 5px !important;
          }
          .project-card p {
            font-size: 0.6rem !important;
            margin-bottom: 4px !important;
          }
          .project-card span {
            font-size: 0.65rem !important;
          }
          .project-card div {
            padding: 20px 15px 15px 15px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectScroll;
