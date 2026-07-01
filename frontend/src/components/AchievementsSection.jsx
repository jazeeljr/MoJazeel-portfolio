import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Trophy, MapPin, Calendar, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useWindowWidth = () => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize, { passive: true });
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return width;
};

// ── Achievement data ──────────────────────────────────────
const achievements = [
    {
        id: 1,
        title: '🥈 2nd Prize — College Mini Project Competition',
        date: 'November 20, 2025',
        location: 'P.A College of Engineering, Mangalore',
        description:
            'I won 2nd Prize in a College Mini Project Competition for the project "Phishing Simulation, Splunk Dashboard & Mobile Forensics." The project demonstrated real-world cybersecurity skills including phishing simulation, SIEM dashboard creation using Splunk, and mobile forensics investigation.',
        image: '/assets/achievements/mini-project-prize.jpg',
        tags: ['Splunk', 'Phishing Simulation', 'Mobile Forensics', 'SIEM'],
    },
    {
        id: 2,
        title: '🥉 3rd Place — Portfolio Building Competition',
        date: 'Recent',
        location: 'IEEE',
        description: 'Achieved 3rd Place in a Portfolio Building Competition conducted by IEEE for creating a cybersecurity portfolio website highlighting projects and skills.',
        image: '/images/achievements/ieee-portfolio.jpg',
        tags: ['Cybersecurity', 'Portfolio', 'IEEE'],
    },
];

// ── Achievement Lightbox ──────────────────────────────────────
const AchievementLightbox = ({ achievement, onClose }) => {
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
                boxShadow: '0 0 60px rgba(0,255,136,0.15), 0 0 0 1px rgba(255,255,255,0.08)'
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
                    src={achievement.image}
                    alt={achievement.title}
                    style={{
                        width: '100%', height: 'auto', display: 'block',
                        maxHeight: '85vh', objectFit: 'contain', background: '#0a0a0a'
                    }}
                />
            </div>
        </div>
    );
};

// ── Achievement Card ──────────────────────────────────────
const AchievementCard = ({ achievement, onView }) => {
    const [imgHovered, setImgHovered] = useState(false);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < 640;

    return (
        <div
            style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,255,136,0.2)',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                position: 'relative',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(0,255,136,0.45)';
                e.currentTarget.style.boxShadow = '0 0 48px rgba(0,255,136,0.1), 0 20px 40px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0,255,136,0.2)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
            }}
        >
            {/* [ ACHIEVEMENT ] badge */}
            <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                background: 'rgba(0,255,136,0.1)',
                border: '1px solid rgba(0,255,136,0.4)',
                borderRadius: '6px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
            }}>
                <Trophy size={10} color="#00ff88" />
                <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '9px',
                    fontWeight: 700,
                    color: '#00ff88',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    textShadow: '0 0 10px rgba(0,255,136,0.5)',
                }}>
                    Achievement
                </span>
            </div>

            {/* Image side */}
            <div
                onClick={() => onView(achievement)}
                onMouseEnter={() => setImgHovered(true)}
                onMouseLeave={() => setImgHovered(false)}
                style={{
                    flexShrink: 0,
                    width: '100%',
                    height: '260px',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    background: '#0a0a12',
                }}
            >
                <img
                    src={achievement.image}
                    alt={achievement.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        transition: 'transform 0.5s ease',
                        transform: imgHovered ? 'scale(1.06)' : 'scale(1)',
                    }}
                />
                {/* Glowing border effect on hover */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    border: imgHovered
                        ? '2px solid rgba(0,255,136,0.6)'
                        : '2px solid transparent',
                    borderRadius: 'inherit',
                    transition: 'border-color 0.3s ease',
                    boxShadow: imgHovered
                        ? 'inset 0 0 24px rgba(0,255,136,0.12)'
                        : 'none',
                    pointerEvents: 'none',
                }} />
                {/* Zoom overlay hint */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: imgHovered ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    padding: '14px',
                    transition: 'background 0.3s ease',
                }}>
                    <div style={{
                        background: 'rgba(0,0,0,0.75)',
                        borderRadius: '7px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        opacity: imgHovered ? 1 : 0,
                        transition: 'opacity 0.25s ease',
                    }}>
                        <ZoomIn size={12} color="#00ff88" />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#00ff88' }}>
                            View Full
                        </span>
                    </div>
                </div>
            </div>

            {/* Content side */}
            <div style={{
                flex: 1,
                padding: 'clamp(24px, 3vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}>
                <h3 style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(16px, 2vw, 22px)',
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    marginBottom: '16px',
                    lineHeight: 1.3,
                    paddingRight: '90px', // avoid overlap with badge
                }}>
                    {achievement.title}
                </h3>

                {/* Meta info */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '16px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={12} color="rgba(0,255,136,0.7)" />
                        <span style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.45)',
                            letterSpacing: '0.05em',
                        }}>
                            {achievement.date}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={12} color="rgba(0,255,136,0.7)" />
                        <span style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.45)',
                            letterSpacing: '0.05em',
                        }}>
                            {achievement.location}
                        </span>
                    </div>
                </div>

                <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(12px, 1.3vw, 14px)',
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                }}>
                    {achievement.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {achievement.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '10px',
                                fontWeight: 600,
                                color: '#00ff88',
                                background: 'rgba(0,255,136,0.07)',
                                border: '1px solid rgba(0,255,136,0.22)',
                                borderRadius: '5px',
                                padding: '4px 10px',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* View full image button */}
                <div style={{ marginTop: '24px' }}>
                    <button
                        onClick={() => onView(achievement)}
                        style={{
                            background: 'rgba(0,255,136,0.08)',
                            border: '1px solid rgba(0,255,136,0.3)',
                            color: '#00ff88',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '8px 18px',
                            borderRadius: '7px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'background 0.2s ease, box-shadow 0.2s ease',
                            letterSpacing: '0.04em',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(0,255,136,0.16)';
                            e.currentTarget.style.boxShadow = '0 0 16px rgba(0,255,136,0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(0,255,136,0.08)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <ZoomIn size={12} /> View Photo
                    </button>
                </div>
            </div>

        </div>
    );
};

// ── Achievements Section ──────────────────────────────────────
const AchievementsSection = () => {
    const sectionRef = useRef(null);
    const headRef = useRef(null);
    const cardRef = useRef(null);
    const [activeAchievement, setActiveAchievement] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headRef.current,
                    start: 'top 88%',
                    once: true,
                },
            });

            if (cardRef.current) {
                gsap.from(cardRef.current, {
                    y: 60,
                    opacity: 0,
                    scale: 0.97,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 88%',
                        once: true,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="achievements"
            ref={sectionRef}
            style={{
                background: '#080810',
                padding: 'clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Ambient glows */}
            <div style={{
                position: 'absolute', top: '10%', right: '-5%', width: '500px', height: '500px',
                borderRadius: '50%', filter: 'blur(130px)', pointerEvents: 'none',
                background: 'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)',
            }} />
            <div style={{
                position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px',
                borderRadius: '50%', filter: 'blur(110px)', pointerEvents: 'none',
                background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)',
            }} />

            {/* Grid texture */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: `
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
        `,
                backgroundSize: '64px 64px',
            }} />

            {/* Section heading */}
            <div ref={headRef} style={{ position: 'relative', marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <div style={{
                        width: '40px', height: '2px',
                        background: 'linear-gradient(90deg, #00ff88, rgba(0,255,136,0.3))',
                    }} />
                    <span style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '15px',
                        fontWeight: 600, color: '#00ff88', letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        textShadow: '0 0 20px rgba(0,255,136,0.5), 0 0 40px rgba(0,255,136,0.2)',
                    }}>
                        04. Achievements
                    </span>
                </div>

                <h2 style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#ffffff',
                    letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 12px',
                }}>
                    Awards &amp; <span style={{ color: '#00ff88' }}>Recognition</span>
                </h2>
                <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 'clamp(13px, 1.5vw, 15px)',
                    color: 'rgba(255,255,255,0.4)', maxWidth: '500px',
                }}>
                    Milestones and recognition earned through hands-on cybersecurity projects and competitions.
                </p>
            </div>

            {/* Cards */}
            <div ref={cardRef} style={{ 
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                gap: 'clamp(24px, 4vw, 40px)',
                alignItems: 'stretch'
            }}>
                {achievements.map((achievement) => (
                    <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        onView={setActiveAchievement}
                    />
                ))}
            </div>

            {activeAchievement && (
                <AchievementLightbox
                    achievement={activeAchievement}
                    onClose={() => setActiveAchievement(null)}
                />
            )}
        </section>
    );
};

export default AchievementsSection;
