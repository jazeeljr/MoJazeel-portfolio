import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ExternalLink, FileText } from 'lucide-react';
import { projects } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

// ── Terminal Modal ──────────────────────────────────────────────
const TerminalModal = ({ project, onClose }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
      .fromTo(modalRef.current,
        { opacity: 0, scale: 0.88, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' },
        '-=0.1'
      );

    // Scanline flicker
    gsap.fromTo(modalRef.current,
      { filter: 'brightness(0.3)' },
      { filter: 'brightness(1)', duration: 0.4, ease: 'steps(4)' }
    );

    // Scroll content to top
    if (contentRef.current) contentRef.current.scrollTop = 0;

    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    document.body.style.overflow = '';
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { opacity: 0, scale: 0.92, y: 20, duration: 0.3, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, '-=0.15');
  };

  const glowColor = project.caseColor === 'red' ? 'rgba(239,68,68,0.6)' : 'rgba(6,182,212,0.6)';
  const borderColor = project.caseColor === 'red' ? 'rgba(239,68,68,0.3)' : 'rgba(6,182,212,0.3)';
  const textColor = project.caseColor === 'red' ? '#ff6b6b' : '#00ff88';

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 40px)'
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: '100%', maxWidth: '860px',
          height: 'min(88vh, 700px)',
          background: '#0a0a0a',
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          boxShadow: `0 0 60px ${glowColor}, 0 0 120px rgba(0,0,0,0.8)`,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Scanline texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)'
        }} />

        {/* Terminal title bar */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0, position: 'relative', zIndex: 2
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em'
            }}>
              analyst@jazeel:~/case-files $
            </span>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px', letterSpacing: '0.05em', display: 'flex',
              alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '4px',
              transition: 'color 0.2s ease, background 0.2s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'none'; }}
          >
            <X size={14} /> [X] close
          </button>
        </div>

        {/* Terminal content */}
        <div
          ref={contentRef}
          style={{
            flex: 1, overflowY: 'auto', padding: '20px 24px',
            position: 'relative', zIndex: 2,
            scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,255,136,0.2) transparent'
          }}
        >
          <pre style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(10px, 1.4vw, 12px)',
            color: textColor === '#ff6b6b' ? '#ff9999' : '#00ff88',
            lineHeight: 1.7, margin: 0,
            whiteSpace: 'pre-wrap', wordBreak: 'break-word'
          }}>
            {project.terminalContent}
          </pre>
          {/* Blinking cursor */}
          <span style={{
            display: 'inline-block', width: '9px', height: '15px',
            background: textColor === '#ff6b6b' ? '#ff9999' : '#00ff88',
            verticalAlign: 'text-bottom', marginLeft: '2px',
            animation: 'blinkCursor 1s step-end infinite'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// ── Project Card ──────────────────────────────────────────────
const ProjectCard = ({ project, onOpenTerminal }) => {
  const cardRef = useRef(null);

  const glowOnHover = (e, enter) => {
    if (project.caseFile) {
      const color = project.caseColor === 'red' ? 'rgba(239,68,68,0.15)' : 'rgba(6,182,212,0.15)';
      const border = project.caseColor === 'red' ? 'rgba(239,68,68,0.35)' : 'rgba(6,182,212,0.35)';
      e.currentTarget.style.borderColor = enter ? border : (project.caseColor === 'red' ? 'rgba(239,68,68,0.2)' : 'rgba(6,182,212,0.2)');
      e.currentTarget.style.boxShadow = enter ? `0 0 40px ${color}, 0 20px 40px rgba(0,0,0,0.5)` : '0 4px 24px rgba(0,0,0,0.4)';
    } else {
      e.currentTarget.style.borderColor = enter ? 'rgba(0,255,136,0.25)' : 'rgba(255,255,255,0.07)';
      e.currentTarget.style.boxShadow = enter ? '0 0 30px rgba(0,255,136,0.08), 0 20px 40px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.4)';
    }
    e.currentTarget.style.transform = enter ? 'translateY(-6px)' : 'translateY(0)';
  };

  const caseBadgeStyle = project.caseColor === 'red'
    ? { color: '#ff6b6b', borderColor: 'rgba(239,68,68,0.5)', textShadow: '0 0 10px rgba(239,68,68,0.8)' }
    : { color: '#06b6d4', borderColor: 'rgba(6,182,212,0.5)', textShadow: '0 0 10px rgba(6,182,212,0.8)' };

  const caseCardBorder = project.caseColor === 'red' ? 'rgba(239,68,68,0.2)' : 'rgba(6,182,212,0.2)';

  return (
    <div
      ref={cardRef}
      style={{
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${project.caseFile ? caseCardBorder : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        cursor: 'default'
      }}
      onMouseEnter={e => glowOnHover(e, true)}
      onMouseLeave={e => glowOnHover(e, false)}
    >
      {/* Case File badge */}
      {project.caseFile && (
        <div style={{
          position: 'absolute', top: '14px', left: '14px', zIndex: 10,
          background: 'rgba(0,0,0,0.7)', border: `1px solid ${caseBadgeStyle.borderColor}`,
          borderRadius: '5px', padding: '3px 8px',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
          fontWeight: 700, letterSpacing: '0.15em', color: caseBadgeStyle.color,
          textShadow: caseBadgeStyle.textShadow
        }}>
          [ CASE FILE ]
        </div>
      )}

      {/* Image */}
      <div style={{ width: '100%', height: '180px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%', height: '100%',
            objectFit: project.imageContain ? 'contain' : 'cover',
            background: project.imageContain ? '#111116' : 'transparent',
            padding: project.imageContain ? '20px' : '0',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={e => { if (!project.imageContain) e.currentTarget.style.transform = 'scale(1.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,15,0.7) 0%, transparent 60%)'
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 700,
          fontSize: 'clamp(14px, 1.6vw, 16px)', color: '#ffffff',
          letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '13px',
          color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: '16px'
        }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: project.caseFile ? '16px' : '0' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
              fontWeight: 500, color: 'rgba(0,255,136,0.7)',
              background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.15)',
              borderRadius: '4px', padding: '3px 8px', letterSpacing: '0.04em'
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Case file button */}
        {project.caseFile && (
          <button
            onClick={() => onOpenTerminal(project)}
            style={{
              width: '100%', marginTop: '4px',
              background: project.caseColor === 'red' ? 'rgba(239,68,68,0.08)' : 'rgba(6,182,212,0.08)',
              border: `1px solid ${project.caseColor === 'red' ? 'rgba(239,68,68,0.3)' : 'rgba(6,182,212,0.3)'}`,
              color: project.caseColor === 'red' ? '#ff6b6b' : '#06b6d4',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              fontWeight: 600, padding: '10px 16px', borderRadius: '8px',
              cursor: 'pointer', letterSpacing: '0.05em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'background 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              const c = project.caseColor === 'red';
              e.currentTarget.style.background = c ? 'rgba(239,68,68,0.15)' : 'rgba(6,182,212,0.15)';
              e.currentTarget.style.boxShadow = c ? '0 0 16px rgba(239,68,68,0.2)' : '0 0 16px rgba(6,182,212,0.2)';
            }}
            onMouseLeave={e => {
              const c = project.caseColor === 'red';
              e.currentTarget.style.background = c ? 'rgba(239,68,68,0.08)' : 'rgba(6,182,212,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FileText size={13} />
            View Investigation Notes
          </button>
        )}
      </div>
    </div>
  );
};

// ── Projects Section ──────────────────────────────────────────────
const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const st = { trigger: sectionRef.current, start: 'top 78%', once: true };
    gsap.fromTo(labelRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: st }
    );
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1, scrollTrigger: st }
    );
    if (gridRef.current) {
      gsap.fromTo(Array.from(gridRef.current.children),
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          delay: 0.2, scrollTrigger: st
        }
      );
    }
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        background: '#050508',
        padding: 'clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)',
        position: 'relative', overflow: 'hidden'
      }}
    >
      {/* Ambient */}
      <div style={{
        position: 'absolute', top: '30%', right: '-10%', width: '600px', height: '600px',
        borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)'
      }} />

      {/* Section label */}
      <div ref={labelRef} style={{
        display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'
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
          02. Projects
        </span>
      </div>

      <div ref={headingRef} style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 700,
          fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#ffffff',
          letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0
        }}>
          Case Files &amp; <span style={{ color: '#00ff88' }}>Projects</span>
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 'clamp(13px, 1.5vw, 15px)',
          color: 'rgba(255,255,255,0.38)', marginTop: '12px', maxWidth: '500px'
        }}>
          From real SOC investigations to security tools — a collection of hands-on work.
        </p>
      </div>

      {/* Bento grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: '20px'
        }}
      >
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenTerminal={setActiveModal}
          />
        ))}
      </div>

      {/* Terminal modal */}
      {activeModal && (
        <TerminalModal
          project={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
