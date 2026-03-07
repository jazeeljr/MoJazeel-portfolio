import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, Github, Linkedin, Mail, AlertCircle } from 'lucide-react';
import { profileData } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeerqawd';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const formColRef = useRef(null);
  const infoColRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only use transform (no opacity) so content is always visible
      gsap.from(formColRef.current, {
        x: -40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          once: true
        }
      });
      gsap.from(infoColRef.current, {
        x: 40,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          once: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message })
      });
      if (response.ok) {
        setSubmitted(true);
        gsap.from('.success-msg', { scale: 0.92, duration: 0.4, ease: 'back.out(1.7)' });
      } else {
        const data = await response.json();
        setError(data?.errors?.[0]?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please email me directly.');
    } finally {
      setSending(false);
    }
  };

  const inputBase = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', padding: '13px 16px',
    fontFamily: 'Inter, sans-serif', fontSize: '14px',
    color: '#ffffff', outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
  };
  const labelBase = {
    fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
    color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em',
    textTransform: 'uppercase', display: 'block', marginBottom: '8px'
  };
  const onFocus = (e) => {
    e.currentTarget.style.borderColor = 'rgba(0,255,136,0.45)';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,255,136,0.08)';
  };
  const onBlur = (e) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: '#060609',
        padding: 'clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px'
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '300px', borderRadius: '50%',
        filter: 'blur(100px)', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(0,255,136,0.05) 0%, transparent 70%)'
      }} />

      {/* Always-visible heading */}
      <div style={{ position: 'relative', marginBottom: '48px' }}>
        <h2 style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 700,
          fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#ffffff',
          letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 12px'
        }}>
          Let's Work <span style={{ color: '#00ff88' }}>Together</span>
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 'clamp(13px, 1.5vw, 15px)',
          color: 'rgba(255,255,255,0.4)', maxWidth: '480px'
        }}>
          Available for security analyst roles, freelance investigations, and consulting.
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: 'clamp(32px, 5vw, 64px)',
        alignItems: 'start',
        position: 'relative'
      }}>
        {/* Form column */}
        <div ref={formColRef}>
          {submitted ? (
            <div className="success-msg" style={{
              background: 'rgba(0,255,136,0.06)',
              border: '1px solid rgba(0,255,136,0.25)',
              borderRadius: '14px', padding: '40px 32px', textAlign: 'center'
            }}>
              <CheckCircle size={40} color="#00ff88" style={{ marginBottom: '16px' }} />
              <h3 style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                fontSize: '20px', color: '#ffffff', marginBottom: '10px'
              }}>
                Message Sent!
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '14px',
                color: 'rgba(255,255,255,0.5)'
              }}>
                Thanks for reaching out. I'll get back to you at {profileData.email}
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                style={{
                  marginTop: '20px', background: 'none',
                  border: '1px solid rgba(0,255,136,0.3)',
                  color: '#00ff88', fontFamily: 'Inter, sans-serif',
                  fontSize: '13px', padding: '10px 24px',
                  borderRadius: '8px', cursor: 'pointer'
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelBase}>Name</label>
                <input
                  type="text" name="name" value={form.name} required
                  onChange={handleChange} placeholder="Your name"
                  style={inputBase} onFocus={onFocus} onBlur={onBlur}
                />
              </div>
              <div>
                <label style={labelBase}>Email</label>
                <input
                  type="email" name="email" value={form.email} required
                  onChange={handleChange} placeholder="your@email.com"
                  style={inputBase} onFocus={onFocus} onBlur={onBlur}
                />
              </div>
              <div>
                <label style={labelBase}>Message</label>
                <textarea
                  name="message" value={form.message} required
                  onChange={handleChange} placeholder="What's on your mind?"
                  rows={5}
                  style={{ ...inputBase, resize: 'vertical', minHeight: '130px' }}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              {error && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: '8px', padding: '10px 14px'
                }}>
                  <AlertCircle size={14} color="#ef4444" />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#ef4444' }}>
                    {error}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  background: 'rgba(0,255,136,0.1)',
                  border: '1px solid rgba(0,255,136,0.38)',
                  color: '#00ff88', fontFamily: 'Inter, sans-serif',
                  fontWeight: 600, fontSize: '13px', padding: '14px 32px',
                  borderRadius: '10px', cursor: sending ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '8px',
                  opacity: sending ? 0.65 : 1,
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease'
                }}
                onMouseEnter={e => {
                  if (!sending) {
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(0,255,136,0.2)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Send size={14} />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Info column */}
        <div ref={infoColRef} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Email */}
          <div>
            <h3 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: '18px', color: '#ffffff', marginBottom: '8px'
            }}>
              Direct Contact
            </h3>
            <a
              href={`mailto:${profileData.email}`}
              style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '14px',
                color: '#00ff88', textDecoration: 'none', letterSpacing: '0.02em'
              }}
            >
              {profileData.email}
            </a>
          </div>

          {/* Social links */}
          <div>
            <h3 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px',
              color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em',
              textTransform: 'uppercase', marginBottom: '14px'
            }}>
              Find Me Online
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { Icon: Github,   href: profileData.github,            sublabel: '@jazeeljr',           label: 'GitHub' },
                { Icon: Linkedin, href: profileData.linkedin,          sublabel: 'T Mohammed Jazeel',   label: 'LinkedIn' },
                { Icon: Mail,     href: `mailto:${profileData.email}`, sublabel: profileData.email,     label: 'Email' }
              ].map(({ Icon, href, label, sublabel }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px', padding: '13px 16px',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,136,0.28)';
                    e.currentTarget.style.background = 'rgba(0,255,136,0.05)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: 'rgba(0,255,136,0.08)',
                    border: '1px solid rgba(0,255,136,0.15)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0
                  }}>
                    <Icon size={16} color="#00ff88" />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif', fontWeight: 600,
                      fontSize: '14px', color: '#ffffff'
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '12px',
                      color: 'rgba(255,255,255,0.38)'
                    }}>
                      {sublabel}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div style={{
            background: 'rgba(0,255,136,0.04)',
            border: '1px solid rgba(0,255,136,0.15)',
            borderRadius: '12px', padding: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#00ff88', boxShadow: '0 0 8px #00ff88',
                display: 'inline-block', animation: 'pulseDotCt 2s ease-in-out infinite'
              }} />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: '12px',
                fontWeight: 600, color: '#00ff88'
              }}>
                Currently Available
              </span>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13px',
              color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0
            }}>
              Open to full-time security analyst positions, SOC roles, and freelance security consulting work.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseDotCt {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.22); }
      `}</style>
    </section>
  );
};

export default ContactSection;
