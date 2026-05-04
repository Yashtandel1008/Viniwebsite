import React from 'react';
import { Link } from 'react-router-dom';
import { projects, categories } from '../data/projects';

const ProjectScroll = () => {
  const residentialProjects = projects.filter(p => p.categoryId !== 'commercial');
  const commercialProjects = projects.filter(p => p.categoryId === 'commercial');

  const scrollItems = [
    {
      id: 'residential-group',
      name: 'Residential Collection',
      subtitle: 'Homes & Private Spaces',
      thumbnail: residentialProjects[0]?.thumbnail || '',
      link: '/gallery/residential',
      type: 'collection'
    },
    ...commercialProjects.map(p => ({
      id: p.id,
      name: p.title,
      subtitle: p.subtitle,
      thumbnail: p.thumbnail,
      link: `/gallery/project/${p.id}`,
      type: 'project'
    }))
  ];

  return (
    <section id="projects" className="projects-section" style={{ padding: '120px 0', backgroundColor: 'var(--white)' }}>
      <div style={{ padding: '0 5%', marginBottom: '60px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px', fontWeight: '600' }}>
          Portfolio
        </p>
        <h2 className="stylized-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
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
        {scrollItems.map((item, index) => (
          <Link key={item.id} to={item.link} className="project-card" style={{
            position: 'relative',
            flex: '0 0 380px',
            height: '550px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
            transition: 'var(--transition)',
            textDecoration: 'none',
            scrollSnapAlign: 'start',
            backgroundColor: '#1a1a1a'
          }}>
            <img 
              src={item.thumbnail} 
              alt={item.name} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.85,
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
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              <p style={{ 
                fontSize: '0.7rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em', 
                marginBottom: '8px', 
                color: 'var(--accent)',
                fontWeight: '600' 
              }}>{item.subtitle}</p>
              <h3 style={{ 
                fontSize: '1.6rem', 
                fontWeight: '500', 
                fontFamily: 'var(--font-serif)', 
                textTransform: 'uppercase', 
                marginBottom: '15px',
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>{item.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: '600', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  color: 'var(--accent)'
                }}>View Collection</span>
                <span style={{ fontSize: '1.1rem', color: 'var(--accent)' }}>→</span>
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
