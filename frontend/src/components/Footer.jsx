import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profileData, navLinks } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

const FooterParticle = ({ style }) => (
  <div style={{
    position: 'absolute', borderRadius: '50%',
    background: 'rgba(0,255,136,0.4)',
    animation: `floatParticle${Math.floor(Math.random() * 3)} ${3 + Math.random() * 4}s ease-in-out infinite`,
    ...style
  }} />
);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 60, filter: 'blur(8px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 92%', once: true }
      }
    );
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const particles = [
    { width: '3px', height: '3px', top: '15%', left: '8%', opacity: 0.5 },
    { width: '4px', height: '4px', top: '40%', left: '18%', opacity: 0.3 },
    { width: '2px', height: '2px', top: '70%', left: '30%', opacity: 0.6 },
    { width: '3px', height: '3px', top: '20%', right: '12%', opacity: 0.4 },
    { width: '5px', height: '5px', top: '55%', right: '22%', opacity: 0.25 },
    { width: '2px', height: '2px', top: '80%', right: '38%', opacity: 0.5 },
    { width: '3px', height: '3px', top: '30%', left: '50%', opacity: 0.35 },
    { width: '4px', height: '4px', top: '65%', left: '65%', opacity: 0.45 },
  ];

  return (
    <footer
      ref={footerRef}
      style={{
        background: '#030305',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: 'clamp(48px, 6vw, 72px) clamp(24px, 6vw, 80px) clamp(36px, 4vw, 56px)',
        position: 'relative'
      }}
    >
      {/* Floating particles */}
      {particles.map((p, i) => <FooterParticle key={i} style={p} />)}

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '300px', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(0,255,136,0.04) 0%, transparent 70%)'
      }} />

      <div style={{ position: 'relative' }}>
        {/* Top row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
          alignItems: 'flex-start', gap: '40px', marginBottom: '48px'
        }}>
          {/* Brand */}
          <div style={{ maxWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '14px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Shield size={16} color="#00ff88" />
              </div>
              <span style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px',
                color: '#ffffff', letterSpacing: '-0.02em'
              }}>
                Jaz<span style={{ color: '#00ff88' }}>eel</span>
              </span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{
              fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
              color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em',
              textTransform: 'uppercase', marginBottom: '16px'
            }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => navClick(link.href)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', fontSize: '13px',
                    color: 'rgba(255,255,255,0.45)', textAlign: 'left', padding: 0,
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#00ff88'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social icons */}
          <div>
            <h4 style={{
              fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
              color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em',
              textTransform: 'uppercase', marginBottom: '16px'
            }}>
              Connect
            </h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { Icon: Github, href: profileData.github, label: 'GitHub' },
                { Icon: Linkedin, href: profileData.linkedin, label: 'LinkedIn' },
                { Icon: Mail, href: `mailto:${profileData.email}`, label: 'Email' }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                    transition: 'border-color 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)';
                    e.currentTarget.style.background = 'rgba(0,255,136,0.08)';
                    e.currentTarget.style.color = '#00ff88';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(0,255,136,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '24px' }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
          alignItems: 'center', gap: '16px'
        }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            color: 'rgba(255,255,255,0.2)', margin: 0, letterSpacing: '0.05em'
          }}>
            © 2025 T Mohammed Jazeel · Crafted with precision
          </p>
          <button
            onClick={scrollToTop}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,255,136,0.09)', border: '1px solid rgba(0,255,136,0.35)',
              color: '#00ff88', fontFamily: 'Inter, sans-serif', fontSize: '13px',
              fontWeight: 700, padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              boxShadow: '0 0 10px rgba(0,255,136,0.1)',
              transition: 'background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,255,136,0.18)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,136,0.25)';
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,255,136,0.09)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0,255,136,0.1)';
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.35)';
            }}
          >
            <ArrowUp size={14} />
            Back to Top
          </button>
        </div>
      </div>

      <style>{`
        @keyframes floatParticle0 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.1; }
        }
        @keyframes floatParticle1 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(15px) translateX(-8px); opacity: 0.15; }
        }
        @keyframes floatParticle2 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
          50% { transform: translateY(-12px) translateX(6px); opacity: 0.1; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
