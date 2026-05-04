import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects, categories } from '../data/projects';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';

// --- Helper Components ---
const ImageCard = React.memo(({ src, alt, onClick }) => (
  <div className="gallery-img-container" onClick={onClick} style={{
    position: 'relative',
    aspectRatio: '1',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer'
  }}>
    <img 
      src={src} 
      alt={alt} 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      loading="lazy"
    />
    <div className="img-overlay">
      <Maximize2 color="white" size={24} />
    </div>
  </div>
));

const GalleryPage = () => {
  const { categoryId } = useParams();
  const [lightboxData, setLightboxData] = useState({ isOpen: false, images: [], index: 0, projectTitle: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  // Find category or project
  const { category, categoryProjects } = useMemo(() => {
    if (!categoryId) return { category: null, categoryProjects: [] };

    // 1. Is it a specific project?
    const proj = projects.find(p => p.id === categoryId);
    if (proj) {
      return { 
        category: { name: proj.title, id: proj.id }, 
        categoryProjects: [proj] 
      };
    }

    // 2. Is it the residential group?
    if (categoryId === 'residential') {
      const projs = projects.filter(p => p.categoryId !== 'commercial');
      return { 
        category: { name: 'Residential Collection', id: 'residential' }, 
        categoryProjects: projs 
      };
    }

    // 3. Normal category
    const cat = categories.find(c => c.id === categoryId);
    const projs = projects.filter(p => p.categoryId === categoryId);
    return { category: cat, categoryProjects: projs };
  }, [categoryId]);

  if (!category) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2>Category not found: {categoryId}</h2>
        <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Return Home</Link>
      </div>
    );
  }

  const openLightbox = (images, index, title) => {
    setLightboxData({ isOpen: true, images, index, projectTitle: title });
  };

  return (
    <div className="gallery-page" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #eee',
        padding: '20px 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600' }}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </Link>
        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: '700' }}>
          {category.name}
        </span>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: '600' }}>
          VINI'S <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>STUDIO</span>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 5%' }}>
        {categoryProjects.map((project) => (
          <section key={project.id} style={{ marginBottom: '80px' }}>
            <div style={{ marginBottom: '40px' }}>
              <p style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: '700' }}>
                {project.subtitle}
              </p>
              <h2 className="stylized-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '15px' }}>
                {project.title}
              </h2>
              <p style={{ color: '#666', lineHeight: '1.6', maxWidth: '800px' }}>
                {project.description}
              </p>
            </div>

            {project.sections ? (
              project.sections.map((section, sIndex) => (
                <div key={sIndex} style={{ marginBottom: '50px' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', paddingLeft: '15px', borderLeft: '3px solid var(--accent)' }}>
                    {section.title}
                  </h3>
                  <div className="images-grid">
                    {section.images.map((img, iIndex) => (
                      <ImageCard
                        key={iIndex}
                        src={img}
                        alt={`${project.title} ${section.title}`}
                        onClick={() => openLightbox(section.images, iIndex, `${project.title} - ${section.title}`)}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="images-grid">
                {(project.images || []).map((img, iIndex) => (
                  <ImageCard
                    key={iIndex}
                    src={img}
                    alt={project.title}
                    onClick={() => openLightbox(project.images, iIndex, project.title)}
                  />
                ))}
              </div>
            )}
          </section>
        ))}
      </main>

      {lightboxData.isOpen && (
        <Lightbox
          images={lightboxData.images}
          initialIndex={lightboxData.index}
          onClose={() => setLightboxData({ ...lightboxData, isOpen: false })}
          projectTitle={lightboxData.projectTitle}
        />
      )}

      <style>{`
        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .img-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(0,0,0,0.3); opacity: 0;
          display: flex; justify-content: center; align-items: center;
          transition: 0.3s ease;
        }
        .gallery-img-container:hover .img-overlay { opacity: 1; }
        .gallery-img-container:hover img { transform: scale(1.05); }
        @media (max-width: 768px) {
          .images-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
