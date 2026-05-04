import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const whatsappMessage = `New Inquiry from Studio Vini Website:%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Message:* ${formData.message}`;
    
    // Open WhatsApp URL
    window.open(`https://wa.me/919687206812?text=${whatsappMessage}`, '_blank');
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section" style={{ padding: '80px 20px', backgroundColor: 'var(--white)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }} className="contact-container">
        
        {/* Info */}
        <div className="reveal">
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '20px', fontFamily: 'var(--font-serif)', textTransform: 'uppercase', lineHeight: '1.2' }}>Let's Create Your <br /><span style={{ fontStyle: 'italic', fontWeight: '400', color: 'var(--accent)' }}>Dream Space</span></h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.1rem' }}>
            Ready to transform your home or office? Contact us for a free consultation and let's bring your vision to life.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ padding: '15px', backgroundColor: 'var(--secondary)', borderRadius: '50%', color: 'var(--accent)' }}>
                <Phone size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Call / WhatsApp</p>
                <a href="https://wa.me/919687206812" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', fontWeight: '600' }}>+91 96872 06812</a>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ padding: '15px', backgroundColor: 'var(--secondary)', borderRadius: '50%', color: 'var(--accent)' }}>
                <Mail size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Email</p>
                <a href="mailto:vinitandel0331@gmail.com" style={{ fontSize: '1.2rem', fontWeight: '600' }}>vinitandel0331@gmail.com</a>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ padding: '15px', backgroundColor: 'var(--secondary)', borderRadius: '50%', color: 'var(--accent)' }}>
                <MapPin size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Studio Location</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>Valsad, Gujarat, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="reveal">
          <form onSubmit={handleSubmit} style={{ 
            backgroundColor: 'var(--secondary)', 
            padding: '40px', 
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-soft)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ marginBottom: '30px' }}>
              <textarea 
                name="message" 
                placeholder="Tell us about your project" 
                rows="4" 
                value={formData.message}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }}
              ></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              Send via WhatsApp <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-container { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
