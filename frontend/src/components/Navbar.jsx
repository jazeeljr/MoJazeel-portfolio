import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Shield } from 'lucide-react';
import { navLinks } from '../data/mock';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.35, ease: 'power3.out' }
      );
    } else {
      gsap.to(mobileMenuRef.current, { opacity: 0, x: '100%', duration: 0.25, ease: 'power3.in' });
    }
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '12px clamp(20px, 5vw, 60px)' : '22px clamp(20px, 5vw, 60px)',
          background: scrolled ? 'rgba(5,5,8,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.3s ease, background 0.3s ease'
        }}
      >
        <button
          onClick={() => handleNavClick('#home')}
          style={{
            display: 'flex', alignItems: 'center', gap: '9px',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0
          }}
        >
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Shield size={16} color="#00ff88" />
          </div>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px',
            color: '#ffffff', letterSpacing: '-0.02em'
          }}>
            Jaz<span style={{ color: '#00ff88' }}>eel</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
                color: 'rgba(255,255,255,0.55)', padding: '8px 16px', borderRadius: '8px',
                letterSpacing: '0.01em', transition: 'color 0.2s ease, background 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#00ff88'; e.currentTarget.style.background = 'rgba(0,255,136,0.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'none'; }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            style={{
              marginLeft: '10px', background: 'rgba(0,255,136,0.08)',
              border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88',
              fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600,
              padding: '8px 22px', borderRadius: '8px', cursor: 'pointer',
              letterSpacing: '0.03em', transition: 'background 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,136,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Hire Me
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', padding: '4px' }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 150,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Mobile slide menu */}
      <div
        ref={mobileMenuRef}
        style={{
          position: 'fixed', top: 0, right: 0, width: '72vw', maxWidth: '300px',
          height: '100vh', background: 'rgba(8,8,14,0.98)', backdropFilter: 'blur(30px)',
          borderLeft: '1px solid rgba(255,255,255,0.07)', zIndex: 200,
          display: 'flex', flexDirection: 'column',
          padding: '80px 28px 40px',
          opacity: 0, transform: 'translateX(100%)',
          pointerEvents: menuOpen ? 'all' : 'none'
        }}
        className="mobile-menu"
      >
        {navLinks.map((link, i) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: 'none', border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 500,
              color: 'rgba(255,255,255,0.7)', padding: '18px 0', textAlign: 'left'
            }}
          >
            <span style={{ color: '#00ff88', fontSize: '11px', marginRight: '12px', fontFamily: 'JetBrains Mono, monospace' }}>0{i + 1}.</span>
            {link.label}
          </button>
        ))}
        <button
          onClick={() => handleNavClick('#contact')}
          style={{
            marginTop: '32px', background: 'rgba(0,255,136,0.08)',
            border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88',
            fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600,
            padding: '14px 20px', borderRadius: '10px', cursor: 'pointer',
            letterSpacing: '0.08em', textTransform: 'uppercase'
          }}
        >
          Hire Me
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
