import React from 'react';
import { Link } from 'react-router-dom';
import { projects, categories } from '../data/projects';

const ProjectScroll = () => {
  // 1. Residence Section Data (by category)
  const residenceCategories = categories
    .filter(cat => cat.id !== 'commercial')
    .map(cat => {
      const firstProject = projects.find(p => p.categoryId === cat.id);
      return {
        ...cat,
        thumbnail: firstProject?.thumbnail || '',
        subtitle: firstProject?.subtitle || 'Residential'
      };
    })
    .filter(cat => cat.thumbnail);

  // 2. Commercial Section Data (individual projects)
  const commercialItems = projects.filter(p => p.categoryId === 'commercial');

  return (
    <section id="projects" className="projects-section" style={{ padding: '120px 0', backgroundColor: 'var(--white)' }}>
      {/* --- RESIDENCE SECTION --- */}
      <div style={{ padding: '0 5%', marginBottom: '40px' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '15px', fontWeight: '600' }}>
          Portfolio
        </p>
        <h2 className="stylized-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Residence <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Projects</span>
        </h2>
      </div>

      <div className="projects-scroll-container" style={{
        display: 'flex',
        gap: '25px',
        padding: '0 5% 80px 5%',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none'
      }}>
        {residenceCategories.map((cat) => (
          <Link key={cat.id} to={`/gallery/${cat.id}`} className="project-card">
            <img src={cat.thumbnail} alt={cat.name} loading="lazy" />
            <div className="card-overlay">
              <p className="card-subtitle">{cat.subtitle}</p>
              <h3 className="card-title">{cat.name}</h3>
              <div className="card-cta">
                <span>View Collection</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* --- COMMERCIAL SECTION --- */}
      <div style={{ padding: '0 5%', marginBottom: '40px' }}>
        <h2 className="stylized-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Commercial <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Projects</span>
        </h2>
      </div>

      <div className="projects-scroll-container" style={{
        display: 'flex',
        gap: '25px',
        padding: '0 5% 60px 5%',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none'
      }}>
        {commercialItems.map((project) => (
          <Link key={project.id} to={`/gallery/project/${project.id}`} className="project-card">
            <img src={project.thumbnail} alt={project.title} loading="lazy" />
            <div className="card-overlay">
              <p className="card-subtitle">{project.subtitle}</p>
              <h3 className="card-title">{project.title}</h3>
              <div className="card-cta">
                <span>Explore Project</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .projects-scroll-container::-webkit-scrollbar { display: none; }
        
        .project-card {
          position: relative;
          flex: 0 0 380px;
          height: 520px;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.06);
          transition: var(--transition);
          text-decoration: none;
          scroll-snap-align: start;
          background-color: #1a1a1a;
        }

        .project-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.9;
          transition: transform 0.8s ease;
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 50px 25px 30px 25px;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .card-subtitle {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 8px;
          color: var(--accent);
          font-weight: 600;
        }

        .card-title {
          font-size: 1.6rem;
          font-weight: 500;
          font-family: var(--font-serif);
          text-transform: uppercase;
          margin-bottom: 15px;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .card-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
        }

        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 70px rgba(0,0,0,0.12);
        }

        .project-card:hover img {
          transform: scale(1.08);
          opacity: 1;
        }

        @media (max-width: 768px) {
          .projects-section { padding: 80px 0 !important; }
          .project-card {
            flex: 0 0 280px;
            height: 400px;
          }
          .card-title { font-size: 1.2rem; }
        }
      `}</style>
    </section>
  );
};

export default ProjectScroll;
