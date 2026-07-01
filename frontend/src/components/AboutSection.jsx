import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Target, Lock } from 'lucide-react';
import { profileData } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const labelRef = useRef(null);
  const ringsRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const st = { trigger: sectionRef.current, start: 'top 72%', once: true };

    gsap.fromTo(labelRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: st }
    );
    gsap.fromTo(imageRef.current,
      { opacity: 0, x: -60, filter: 'blur(12px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: 0.1, scrollTrigger: st }
    );
    gsap.fromTo(textRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2, scrollTrigger: st }
    );
    
    // Animate rings
    if (ringsRef.current) {
      gsap.to(ringsRef.current.children[0], { rotation: 360, duration: 25, repeat: -1, ease: 'linear' });
      gsap.to(ringsRef.current.children[1], { rotation: -360, duration: 35, repeat: -1, ease: 'linear' });
    }

    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current,
        { opacity: 0, scale: 0, rotation: -20 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.6, scrollTrigger: st }
      );
      gsap.to(badgeRef.current, {
        y: -12, duration: 2.5, repeat: -1, yoyo: true, ease: 'power1.inOut'
      });
    }

  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: '#060609',
        padding: 'clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background accents */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px'
      }} />
      <div style={{
        position: 'absolute', top: '10%', right: '20%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(0,255,136,0.03) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '10%', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none'
      }} />

      {/* Section label */}
      <div ref={labelRef} style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        marginBottom: '70px', position: 'relative'
      }}>
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
          01. About Me
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: 'clamp(60px, 8vw, 100px)', alignItems: 'center', position: 'relative'
      }}>
        {/* Left: Image with dynamic rings */}
        <div ref={imageRef} style={{ display: 'flex', justifyContent: 'center', position: 'relative', padding: '30px' }}>
          
          {/* Animated Rings */}
          <div ref={ringsRef} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{
              width: 'clamp(270px, 36vw, 350px)', height: 'clamp(270px, 36vw, 350px)', position: 'absolute',
              border: '1px dashed rgba(0,255,136,0.3)', borderRadius: '50%'
            }} />
            <div style={{
              width: 'clamp(300px, 40vw, 390px)', height: 'clamp(300px, 40vw, 390px)', position: 'absolute',
              border: '1px solid rgba(6,182,212,0.15)', borderRadius: '50%',
              borderTopColor: 'rgba(6,182,212,0.6)', borderBottomColor: 'rgba(6,182,212,0.6)'
            }} />
          </div>

          {/* Profile Image */}
          <div style={{
            width: 'clamp(230px, 30vw, 300px)', height: 'clamp(230px, 30vw, 300px)',
            borderRadius: '50%', padding: '4px',
            background: 'linear-gradient(135deg, #00ff88, #06b6d4)',
            boxShadow: '0 0 50px rgba(0,255,136,0.2), 0 0 100px rgba(0,255,136,0.1)',
            position: 'relative', zIndex: 5,
            transition: 'transform 0.4s ease, box-shadow 0.4s ease', cursor: 'pointer'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.03) rotate(2deg)';
              e.currentTarget.style.boxShadow = '0 0 70px rgba(0,255,136,0.3), 0 0 120px rgba(0,255,136,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 0 50px rgba(0,255,136,0.2), 0 0 100px rgba(0,255,136,0.1)';
            }}
          >
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '4px solid #060609' }}>
              <img src={profileData.profileImage} alt={profileData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Floating Badge */}
          <div ref={badgeRef} style={{
            position: 'absolute', bottom: '15px', right: '0px', zIndex: 10,
            background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,255,136,0.3)', borderRadius: '16px',
            padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,136,0.15)'
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(0,255,136,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(0,255,136,0.3)'
            }}>
              <ShieldCheck size={18} color="#00ff88" />
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>
                Specialization
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
                GRC Analyst
              </div>
            </div>
          </div>
        </div>

        {/* Right: Bio & Philosophy (Glassmorphism Card) */}
        <div ref={textRef} style={{
          background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px',
          padding: 'clamp(30px, 5vw, 50px)', position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}>
          {/* Decorative corner */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '40px', height: '40px',
            borderTop: '2px solid rgba(0,255,136,0.5)', borderLeft: '2px solid rgba(0,255,136,0.5)',
            borderTopLeftRadius: '24px'
          }} />

          <h2 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 42px)', color: '#ffffff',
            letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '24px'
          }}>
            Building resilience,<br />
            <span style={{ color: '#00ff88' }}>one framework at a time.</span>
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 1.5vw, 16px)',
            fontWeight: 400, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '32px'
          }}>
            {profileData.bio}
          </p>

          <div style={{
            display: 'flex', gap: '24px', flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Target size={18} color="#06b6d4" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#06b6d4', letterSpacing: '0.02em' }}>Risk Management</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={18} color="#00ff88" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#00ff88', letterSpacing: '0.02em' }}>AI Compliance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
