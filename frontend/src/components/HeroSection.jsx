import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
import { profileData } from '../data/mock';

const HeroSection = () => {
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const splineRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const scrollHintRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    // Using gsap.from() so elements start visible by default (CSS) and only animate FROM a state
    const ctx = gsap.context(() => {
      gsap.from(statusRef.current, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out', delay: 0.3 });
      gsap.from(headlineRef.current, { opacity: 0, y: 40, filter: 'blur(8px)', duration: 1, ease: 'power3.out', delay: 0.5 });
      gsap.from(subtitleRef.current, { opacity: 0, y: 25, duration: 0.8, ease: 'power3.out', delay: 0.9 });
      gsap.from(ctaRef.current, { opacity: 0, y: 15, scale: 0.97, duration: 0.6, ease: 'back.out(1.7)', delay: 1.2 });
      gsap.from(scrollHintRef.current, { opacity: 0, duration: 0.5, delay: 1.6 });
      gsap.from(splineRef.current, { opacity: 0, duration: 1.5, ease: 'power2.out', delay: 0 });

      // Floating orbs
      gsap.to(orb1Ref.current, { y: -35, duration: 4.5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      gsap.to(orb2Ref.current, { y: 28, x: -20, duration: 5.5, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: 2 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#050508'
      }}
    >
      {/* Spline 3D background */}
      <div ref={splineRef} style={{
        position: 'absolute', inset: 0, zIndex: 0
      }}>
        <iframe
          src="https://my.spline.design/particlesflow-WVfASjLx2rXsZ6bZvrMGkoH8/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ border: 'none', pointerEvents: 'none', display: 'block' }}
          title="Spline 3D Particles"
        />
        {/* Cover the "Built with Spline" badge at bottom-right */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '180px',
          height: '48px',
          background: '#050508',
          zIndex: 5,
          pointerEvents: 'none'
        }} />
      </div>

      {/* Gradient overlay for text readability */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(110deg, rgba(5,5,8,0.92) 38%, rgba(5,5,8,0.25) 100%)'
      }} />

      {/* Floating glow orbs */}
      <div ref={orb1Ref} style={{ position: 'absolute', top: '15%', left: '3%', zIndex: 1, pointerEvents: 'none' }}>
        <div style={{
          width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(100px)',
          background: 'radial-gradient(circle, rgba(0,255,136,0.07) 0%, transparent 70%)'
        }} />
      </div>
      <div ref={orb2Ref} style={{ position: 'absolute', bottom: '25%', left: '20%', zIndex: 1, pointerEvents: 'none' }}>
        <div style={{
          width: '350px', height: '350px', borderRadius: '50%', filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)'
        }} />
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(80px, 10vh, 110px) clamp(24px, 6vw, 80px) clamp(40px, 5vh, 60px)',
        maxWidth: '760px'
      }}>
        {/* Status pill */}
        <div ref={statusRef} style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.18)',
          borderRadius: '100px', padding: '5px 14px', marginBottom: '20px'
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88',
            boxShadow: '0 0 8px #00ff88', display: 'inline-block',
            animation: 'pulseDot 2s ease-in-out infinite'
          }} />
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
            color: '#00ff88', letterSpacing: '0.1em', textTransform: 'uppercase'
          }}>
            Available for Opportunities
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(12px, 1.5vw, 15px)',
            fontWeight: 400, color: 'rgba(255,255,255,0.45)',
            marginBottom: '4px', letterSpacing: '0.04em', margin: '0 0 4px'
          }}>
            Hi, I'm
          </p>
          <h1 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 800,
            fontSize: 'clamp(38px, 6.5vw, 72px)', lineHeight: 1.0,
            letterSpacing: '-0.03em', margin: '0 0 6px', color: '#ffffff'
          }}>
            T Mohammed<br />
            <span style={{
              background: 'linear-gradient(135deg, #00ff88 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>Jazeel</span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #00ff88, transparent)' }} />
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              fontSize: 'clamp(13px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.02em'
            }}>
              Security Analyst
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} style={{
          fontFamily: 'Inter, sans-serif', fontSize: 'clamp(12px, 1.4vw, 14px)',
          fontWeight: 400, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7,
          marginTop: '16px', maxWidth: '480px'
        }}>
          {profileData.subtitle}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,136,0.13), rgba(6,182,212,0.09))',
              border: '1px solid rgba(0,255,136,0.38)', color: '#00ff88',
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px',
              padding: '12px 30px', borderRadius: '9px', cursor: 'pointer',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              transition: 'box-shadow 0.3s ease, transform 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 28px rgba(0,255,136,0.22), 0 0 56px rgba(0,255,136,0.09)';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Hire Me
          </button>
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.13)',
              color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif',
              fontWeight: 500, fontSize: '13px', padding: '12px 30px', borderRadius: '9px',
              cursor: 'pointer', letterSpacing: '0.03em',
              transition: 'border-color 0.2s ease, color 0.2s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
          >
            View Work
          </button>
        </div>

        {/* Scroll hint */}
        <button
          ref={scrollHintRef}
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', marginTop: '36px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif',
            fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; }}
        >
          <ArrowDown size={13} style={{ animation: 'bounceDown 2s ease-in-out infinite' }} />
          Scroll to explore
        </button>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #00ff88; }
          50% { opacity: 0.4; box-shadow: 0 0 4px #00ff88; }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
