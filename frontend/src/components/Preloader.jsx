import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const logoRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressTextRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(logoRef.current,
      { opacity: 0, y: 30, filter: 'blur(20px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    const progressValue = { val: 0 };
    tl.to(progressValue, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(progressValue.val);
        if (percentRef.current) percentRef.current.textContent = v + '%';
        if (progressBarRef.current) progressBarRef.current.style.width = v + '%';
      }
    }, '+=0.2');

    tl.to([logoRef.current, subtitleRef.current, progressTextRef.current], {
      opacity: 0, y: -20, duration: 0.5, ease: 'power2.in'
    }, '+=0.3')
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: 'power3.inOut',
      onComplete: () => {
        if (preloaderRef.current) preloaderRef.current.style.display = 'none';
        if (onComplete) onComplete();
      }
    }, '-=0.2');

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050508',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Scanline texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.01) 2px, rgba(0,255,136,0.01) 4px)',
        pointerEvents: 'none'
      }} />

      <div ref={logoRef} style={{ textAlign: 'center', marginBottom: '12px' }}>
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(52px, 10vw, 88px)',
          letterSpacing: '-0.04em',
          color: '#ffffff',
          margin: 0,
          lineHeight: 1
        }}>
          JAZ<span style={{ color: '#00ff88', textShadow: '0 0 40px rgba(0,255,136,0.6)' }}>EEL</span>
        </h1>
      </div>

      <div ref={subtitleRef} style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        letterSpacing: '0.3em',
        color: 'rgba(255,255,255,0.3)',
        textTransform: 'uppercase',
        marginBottom: '64px'
      }}>
        GRC Analyst · Portfolio
      </div>

      <div ref={progressTextRef} style={{ width: 'min(300px, 80vw)' }}>
        <div style={{
          width: '100%',
          height: '2px',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '12px'
        }}>
          <div
            ref={progressBarRef}
            style={{
              height: '100%',
              width: '0%',
              background: 'linear-gradient(90deg, #00ff88, #06b6d4)',
              borderRadius: '2px',
              boxShadow: '0 0 12px rgba(0,255,136,0.6)'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.2em'
          }}>
            INITIALIZING SYSTEMS
          </span>
          <span ref={percentRef} style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            color: '#00ff88',
            textShadow: '0 0 8px rgba(0,255,136,0.5)'
          }}>
            0%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
