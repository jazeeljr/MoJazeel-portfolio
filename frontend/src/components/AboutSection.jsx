import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Wifi, Cpu, Shield, Terminal, Network, Search, Eye, Award, FileText } from 'lucide-react';
import { profileData, skillIcons, skills } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

const iconMap = { Code, Wifi, Cpu, Shield, Terminal, Network, Search, Eye };

const SkillBar = ({ name, level, index }) => {
  const barRef = useRef(null);
  const rowRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(barRef.current,
      { width: '0%' },
      {
        width: level + '%',
        duration: 1.3,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top 92%',
          once: true
        }
      }
    );
  }, [level, index]);

  return (
    <div ref={rowRef} style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
          {name}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#00ff88' }}>
          {level}%
        </span>
      </div>
      <div style={{
        width: '100%', height: '3px', background: 'rgba(255,255,255,0.07)',
        borderRadius: '3px', overflow: 'hidden'
      }}>
        <div ref={barRef} style={{
          height: '100%', width: '0%',
          background: 'linear-gradient(90deg, #00ff88, #06b6d4)',
          borderRadius: '3px', boxShadow: '0 0 8px rgba(0,255,136,0.4)'
        }} />
      </div>
    </div>
  );
};

const stats = [
  { value: '2', label: 'Cases Resolved', Icon: FileText },
  { value: '3+', label: 'Certifications', Icon: Award }
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const iconsRef = useRef(null);
  const labelRef = useRef(null);

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
    if (iconsRef.current) {
      gsap.fromTo(Array.from(iconsRef.current.children),
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.7)',
          delay: 0.4, scrollTrigger: st
        }
      );
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
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px'
      }} />

      {/* Section label */}
      <div ref={labelRef} style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        marginBottom: '60px', position: 'relative'
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start', position: 'relative'
      }}>
        {/* Left: Image + stats + skill icons */}
        <div ref={imageRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
          {/* Glowing profile image */}
          <div style={{
            width: 'clamp(200px, 28vw, 270px)', height: 'clamp(200px, 28vw, 270px)',
            borderRadius: '50%', padding: '3px',
            background: 'linear-gradient(135deg, #00ff88, #06b6d4)',
            boxShadow: '0 0 40px rgba(0,255,136,0.18), 0 0 80px rgba(0,255,136,0.07)',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease', cursor: 'pointer'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04) rotate(2deg)';
              e.currentTarget.style.boxShadow = '0 0 60px rgba(0,255,136,0.32), 0 0 100px rgba(0,255,136,0.14)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,136,0.18), 0 0 80px rgba(0,255,136,0.07)';
            }}
          >
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '3px solid #060609' }}>
              <img src={profileData.profileImage} alt={profileData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {stats.map(({ value, label, Icon }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px', padding: '14px 16px', textAlign: 'center', minWidth: '76px'
              }}>
                <Icon size={13} color="#00ff88" style={{ marginBottom: '5px' }} />
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px', color: '#ffffff', lineHeight: 1.2 }}>
                  {value}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em', marginTop: '2px' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Skill icon grid */}
          <div
            ref={iconsRef}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', width: '100%', maxWidth: '280px' }}
          >
            {skillIcons.map((skill) => {
              const Icon = iconMap[skill.icon] || Shield;
              return (
                <div
                  key={skill.name}
                  title={skill.name}
                  style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px', padding: '12px 8px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                    cursor: 'default', transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,136,0.28)';
                    e.currentTarget.style.background = 'rgba(0,255,136,0.05)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {skill.image ? (
                    <svg
                      width="17" height="17"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Wireshark shark fin shape */}
                      <rect x="4" y="4" width="92" height="92" rx="10" stroke="#00ff88" strokeWidth="6" fill="none" />
                      {/* Shark fin */}
                      <path
                        d="M18 75 C18 75 28 72 38 60 C42 54 44 44 50 32 C52 28 54 25 57 24 C60 23 62 26 63 30 C65 36 63 46 68 52 C74 60 82 65 82 75 Z"
                        fill="#00ff88"
                      />
                      {/* Base line */}
                      <line x1="14" y1="75" x2="86" y2="75" stroke="#00ff88" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <Icon size={17} color="#00ff88" />
                  )}
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 1.2 }}>
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Bio + skill bars */}
        <div ref={textRef}>
          <h2 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 700,
            fontSize: 'clamp(26px, 4vw, 44px)', color: '#ffffff',
            letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '20px'
          }}>
            Defending systems,<br />
            <span style={{ color: '#00ff88' }}>one threat at a time.</span>
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(13px, 1.5vw, 15px)',
            fontWeight: 400, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '40px'
          }}>
            {profileData.bio}
          </p>

          <h3 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px',
            color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: '20px'
          }}>
            Technical Proficiency
          </h3>
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
