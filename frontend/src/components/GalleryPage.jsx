import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects, categories } from '../data/projects';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';

const GalleryPage = () => {
  const { categoryId } = useParams();

  // Memoize search for better performance
  const { category, categoryProjects } = useMemo(() => {
    if (!categoryId) return { category: null, categoryProjects: [] };
    const cat = categories.find(c => c.id === categoryId);
    const projs = projects.filter(p => p.categoryId === categoryId);
    return { category: cat, categoryProjects: projs };
  }, [categoryId]);

  const [lightboxData, setLightboxData] = useState({ isOpen: false, images: [], index: 0, projectTitle: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2>Category not found</h2>
        <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Return Home</Link>
      </div>
    );
  }

  const openLightbox = (projectImages, index, projectTitle) => {
    setLightboxData({ isOpen: true, images: projectImages, index, projectTitle });
  };

  return (
    <div className="gallery-page" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Fixed Header with Logo & Back Button */}
      <header className="gallery-header" style={{
        padding: 'var(--header-padding, 12px 5%)',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(10px)',
        transition: 'padding 0.3s ease'
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/#projects" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--primary)',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            <ArrowLeft size={18} />
            <span className="back-text">Back</span>
          </Link>
        </div>

        <div style={{ textAlign: 'center', flex: 2 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: '600' }}>
            {category.name}
          </span>
        </div>

        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            VINI'S <span style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: '400' }}>STUDIO</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="gallery-content" style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 5%' }}>
        {categoryProjects.map((project, pIndex) => (
          <section key={project.id} style={{ marginBottom: '100px' }} className="reveal active">
            <div style={{ marginBottom: '40px' }}>
              <p style={{ color: 'var(--accent)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '15px', fontWeight: '600' }}>
                {project.subtitle}
              </p>
              <h2 className="stylized-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>
                {project.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '800px', lineHeight: '1.7' }}>
                {project.description}
              </p>
            </div>

            {/* Support for Sections (Design vs Reality) */}
            {project.sections ? (
              project.sections.map((section, sIndex) => (
                <div key={sIndex} style={{ marginBottom: '60px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '25px', color: 'var(--primary)', letterSpacing: '0.05em', borderLeft: '3px solid var(--accent)', paddingLeft: '15px' }}>
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
              /* Regular Project Grid */
              <div className="images-grid">
                {project.images.map((img, iIndex) => (
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

      {/* Lightbox Component */}
      {lightboxData.isOpen && (
        <Lightbox
          images={lightboxData.images}
          initialIndex={lightboxData.index}
          projectTitle={lightboxData.projectTitle}
          onClose={() => setLightboxData({ ...lightboxData, isOpen: false })}
        />
      )}

      <style>{`
        :root {
          --header-padding: 22px 5%; /* Increased by approx 40%+ from 12px */
        }
        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }
        @media (max-width: 768px) {
          :root {
            --header-padding: 12px 5%;
          }
          .back-text { display: none; }
          .gallery-content { padding: 40px 15px !important; }
          .images-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

// Extracted Sub-component for performance (uses memo)
const ImageCard = React.memo(({ src, alt, onClick }) => (
  <div className="gallery-img-container" onClick={onClick} style={{
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'zoom-in',
    aspectRatio: '1',
    backgroundColor: '#f5f5f5',
    transition: 'var(--transition)'
  }}>
    <img
      src={src}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
      loading="lazy"
    />
    <div className="img-overlay">
      <Maximize2 color="white" size={28} />
    </div>
    <style>{`
      .gallery-img-container:hover img { transform: scale(1.08); }
      .img-overlay {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.3); opacity: 0;
        display: flex; justify-content: center; align-items: center;
        transition: 0.3s ease;
      }
      .gallery-img-container:hover .img-overlay { opacity: 1; }
    `}</style>
  </div>
));

export default GalleryPage;
