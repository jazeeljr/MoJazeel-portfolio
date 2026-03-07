import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ExternalLink, Award, ZoomIn } from 'lucide-react';
import { certifications } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

// ── Certificate Lightbox ──────────────────────────────────────
const CertLightbox = ({ cert, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(contentRef.current,
      { scale: 0.92, y: 20 },
      { scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
    );
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    document.body.style.overflow = '';
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { scale: 0.93, duration: 0.25, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, '-=0.1');
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 60px)'
      }}
    >
      <div ref={contentRef} style={{
        position: 'relative', maxWidth: '900px', width: '100%',
        borderRadius: '14px', overflow: 'hidden',
        boxShadow: '0 0 60px rgba(0,212,170,0.15), 0 0 0 1px rgba(255,255,255,0.08)'
      }}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 10,
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#ffffff', transition: 'background 0.2s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; }}
        >
          <X size={16} />
        </button>
        <img
          src={cert.image}
          alt={cert.title}
          style={{
            width: '100%', height: 'auto', display: 'block',
            maxHeight: '85vh', objectFit: 'contain', background: '#0a0a0a'
          }}
        />
      </div>
    </div>
  );
};

// ── Cert Card ──────────────────────────────────────
const CertCard = ({ cert, onView }) => {
  const isGoogle = cert.issuer === 'Google';
  const accentColor = isGoogle ? '#4285F4' : '#00d4aa';
  const borderDefault = isGoogle ? 'rgba(66,133,244,0.2)' : 'rgba(0,212,170,0.2)';
  const borderHover = isGoogle ? 'rgba(66,133,244,0.45)' : 'rgba(0,212,170,0.45)';
  const glowHover = isGoogle ? 'rgba(66,133,244,0.12)' : 'rgba(0,212,170,0.1)';
  const accentRgb = isGoogle ? '66,133,244' : '0,212,170';

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${borderDefault}`,
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = borderHover;
        e.currentTarget.style.boxShadow = `0 0 40px ${glowHover}, 0 20px 40px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = borderDefault;
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
      }}
    >
      {/* Certificate image thumbnail */}
      <div
        style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden', cursor: 'pointer', background: '#0a0a12' }}
        onClick={() => onView(cert)}
      >
        <img
          src={cert.image}
          alt={cert.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: 'top center', display: 'block',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        />
        {/* Zoom overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s ease'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; }}
        >
          <div style={{
            background: 'rgba(0,0,0,0.7)', borderRadius: '8px', padding: '8px 14px',
            display: 'flex', alignItems: 'center', gap: '6px',
            opacity: 0, transition: 'opacity 0.2s ease'
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0'; }}
          >
            <ZoomIn size={13} color="#fff" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#fff' }}>View Full</span>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Issuer badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: `rgba(${accentRgb},0.1)`,
          border: `1px solid rgba(${accentRgb},0.28)`,
          borderRadius: '6px', padding: '4px 10px', marginBottom: '12px', width: 'fit-content'
        }}>
          <Award size={11} color={accentColor} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', fontWeight: 700,
            color: accentColor, letterSpacing: '0.12em', textTransform: 'uppercase'
          }}>
            {cert.badge}
          </span>
        </div>

        <h3 style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 700,
          fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#ffffff',
          letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3
        }}>
          {cert.title}
        </h3>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '13px',
          color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: '16px', flex: 1
        }}>
          {cert.description}
        </p>

        {/* Date + buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
            color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em'
          }}>
            {cert.date}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onView(cert)}
              style={{
                background: `rgba(${accentRgb},0.08)`,
                border: `1px solid rgba(${accentRgb},0.3)`,
                color: accentColor, fontFamily: 'Inter, sans-serif', fontSize: '11px',
                fontWeight: 600, padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px',
                transition: 'background 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `rgba(${accentRgb},0.16)`;
                e.currentTarget.style.boxShadow = `0 0 12px rgba(${accentRgb},0.2)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `rgba(${accentRgb},0.08)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <ZoomIn size={11} /> View
            </button>
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif',
                  fontSize: '11px', fontWeight: 600, padding: '6px 12px', borderRadius: '6px',
                  display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none',
                  transition: 'background 0.2s ease, color 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
              >
                <ExternalLink size={11} /> Verify
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Certifications Section ──────────────────────────────────────
const CertificationsSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const headRef = useRef(null);
  const [activeCert, setActiveCert] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate only transforms — no opacity, so content is always visible
      gsap.from(headRef.current, {
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top bottom',
          once: true
        }
      });

      if (gridRef.current) {
        gsap.from(Array.from(gridRef.current.children), {
          y: 50,
          scale: 0.97,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top bottom',
            once: true
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      style={{
        background: '#060609',
        padding: 'clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '20%', left: '-5%', width: '500px', height: '500px',
        borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(66,133,244,0.05) 0%, transparent 70%)'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px',
        borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)'
      }} />

      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px'
      }} />

      {/* Section heading — always visible */}
      <div ref={headRef} style={{ position: 'relative', marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            width: '40px', height: '2px',
            background: 'linear-gradient(90deg, #00ff88, rgba(0,255,136,0.3))'
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '15px',
            fontWeight: 600, color: '#00ff88', letterSpacing: '0.3em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(0,255,136,0.5), 0 0 40px rgba(0,255,136,0.2)'
          }}>
            03. Certifications
          </span>
        </div>

        <h2 style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 700,
          fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#ffffff',
          letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 12px'
        }}>
          Credentials &amp; <span style={{ color: '#00ff88' }}>Certifications</span>
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 'clamp(13px, 1.5vw, 15px)',
          color: 'rgba(255,255,255,0.4)', maxWidth: '500px'
        }}>
          Verified training and certifications in cybersecurity, SOC operations, and incident response.
        </p>
      </div>

      {/* Cards grid — always visible */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: '20px',
          position: 'relative'
        }}
      >
        {certifications.map(cert => (
          <CertCard key={cert.id} cert={cert} onView={setActiveCert} />
        ))}
      </div>

      {activeCert && (
        <CertLightbox cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </section>
  );
};

export default CertificationsSection;
