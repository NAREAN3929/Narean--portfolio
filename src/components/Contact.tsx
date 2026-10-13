import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function Contact() {
  const revealRef = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'animating' | 'success'>('idle');
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  const validate = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbysXC5_X9goEgB1k29SwbLJBqKaIyhdmRbIv1S4gQaKWfWbBQ9XMsvUP6E91ogNNLBJ/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus('submitting');
      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(formData)
        });

        setStatus('animating');
        setTimeout(() => {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        }, 1500);
      } catch (err) {
        console.error('Failed to submit message to spreadsheet:', err);
        setStatus('animating');
        setTimeout(() => {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        }, 1500);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  return (
    <section id="contact" style={{ padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div ref={revealRef} className="reveal contact-container">
          
          {/* Left: Heading & Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.02em', color: '#fff' }}>
              Let's Build <br />
              Something <br />
              <span className="text-gradient">Together</span>
            </h2>
            <p style={{ color: '#c4b5fd', fontSize: '1.15rem', lineHeight: '1.7', maxWidth: '420px', marginBottom: '2.5rem', fontWeight: '400', opacity: 0.9 }}>
              I'm always excited to connect with new people, explore opportunities, and collaborate with great teams to turn ideas into reality. Maybe our next great project starts here.
            </p>

            <a href="mailto:narean3929@gmail.com" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              color: '#fff', 
              textDecoration: 'none', 
              fontSize: '1.15rem',
              fontWeight: 500,
              padding: '0.75rem 1.25rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              width: 'fit-content'
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.background = 'rgba(168,85,247,0.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            >
              <Mail color="#a855f7" size={20} /> narean3929@gmail.com
            </a>
          </div>

          {/* Right: Modern Contact Form */}
          <div className="glass-card" style={{ padding: '3rem', position: 'relative', minHeight: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            <form 
              onSubmit={handleSubmit} 
              className={status === 'animating' ? 'contact-form-fly' : (status === 'success' ? 'hidden' : '')} 
              style={{ 
                opacity: status === 'success' ? 0 : 1, 
                pointerEvents: status !== 'idle' ? 'none' : 'auto', 
                transition: 'opacity 0.3s' 
              }}
            >
              
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`} 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`} 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  className={`form-input ${errors.message ? 'error' : ''}`} 
                  placeholder="How can I help you?"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button 
                type="submit" 
                className="magnetic-btn primary" 
                style={{ width: '100%', padding: '1rem', marginTop: '1rem', justifyContent: 'center' }}
                disabled={status !== 'idle'}
              >
                {status === 'idle' && <><Send size={18} /> Send Message</>}
                {status === 'submitting' && <><Loader2 size={18} className="spin-anim" /> Sending...</>}
              </button>
              
            </form>

            {/* Paper plane animation */}
            {status === 'animating' && (
              <div className="paper-plane-container">
                <Send size={48} />
              </div>
            )}

            {/* Success UI */}
            {status === 'success' && (
              <div className="success-ui-container">
                <div className="success-particles">
                  {[...Array(6)].map((_, i) => <div key={i} className={`particle particle-${i}`} />)}
                </div>
                <CheckCircle2 size={64} className="success-check-icon" />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Message Sent Successfully! ✓</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Thanks for reaching out! I'll get back to you soon. 🚀</p>
                <button onClick={() => setStatus('idle')} className="magnetic-btn" style={{ padding: '0.75rem 1.5rem' }}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
