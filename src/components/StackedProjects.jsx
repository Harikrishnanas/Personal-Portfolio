import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: "Lumora Search Engine",
    subtitle: "Hybrid Semantic Retrieval",
    description: "Engineered a high-performance semantic search engine integrating FAISS vector search and BM25 sparse retrieval. Features cross-encoder reranking mechanisms for intelligent document processing.",
    tech: ["Python", "FastAPI", "FAISS", "Next.js"],
    color: "#8a2be2",
    bgColor: "#110b1a"
  },
  {
    title: "SIEM System",
    subtitle: "Cybersecurity Analytics",
    description: "Designed a centralized platform to aggregate and parse security logs from multiple network nodes, featuring an automated threat detection pipeline and instant visualization of network anomalies.",
    tech: ["Python", "FastAPI", "Next.js"],
    color: "#00ffff",
    bgColor: "#08161a"
  },
  {
    title: "Canteen Management",
    subtitle: "Full-Stack Facility Platform",
    description: "Digitized daily administrative workflows with secure user authentication and real-time order tracking pipelines, supported by a scalable non-relational database architecture.",
    tech: ["React.js", "Node.js", "MongoDB", "Express"],
    color: "#ff5555",
    bgColor: "#1a0b0b"
  },
  {
    title: "Zero Knowledge E-Learning",
    subtitle: "Low-Bandwidth Hackathon Build",
    description: "Architected an optimized e-learning platform functioning on 2G networks. Implemented custom video slicing and adaptive delivery protocols to minimize data consumption.",
    tech: ["Video Slicing", "Adaptive Protocols", "Offline-First"],
    color: "#ffaa00",
    bgColor: "#1a1305"
  }
];

const StackCard = ({ project, index, progress, targetScale }) => {
  const containerRef = useRef(null);
  
  // Calculate specific scroll transforms for this card
  // As we scroll past, it scales down slightly and darkens via an overlay to create depth without becoming transparent
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);
  const overlayOpacity = useTransform(progress, [index * 0.25, 1], [0, 0.7]); // Card darkens as it goes back

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'sticky',
        top: '10vh', // Where the card pins on the screen
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
        marginTop: index === 0 ? '0' : '10vh'
      }}
    >
      <motion.div
        style={{
          backgroundColor: project.bgColor,
          width: '100%',
          maxWidth: '1200px',
          height: '100%',
          borderRadius: '24px',
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: `0 20px 40px -20px ${project.color}40`,
          transformOrigin: 'top center',
          scale,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Darkening Overlay for Depth */}
        <motion.div 
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#000000',
            opacity: overlayOpacity,
            zIndex: 10,
            pointerEvents: 'none'
          }} 
        />
        {/* Abstract background elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }} />

        <div>
          <div style={{ 
            display: 'inline-block',
            color: project.color,
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            borderBottom: `1px solid ${project.color}40`,
            paddingBottom: '0.5rem'
          }}>
            {project.subtitle}
          </div>
          <h3 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem', maxWidth: '800px' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6 }}>
            {project.description}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: 'auto' }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '30px',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              backdropFilter: 'blur(10px)'
            }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const StackedProjects = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress through the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={containerRef} style={{ position: 'relative', marginTop: '10vh', paddingBottom: '10vh' }}>
      <div className="container" style={{ marginBottom: '5vh' }}>
        <h2 className="section-title">
          Engineered <span className="text-accent">Solutions</span>
        </h2>
        <p className="section-subtitle">
          A curated selection of high-performance architectures. Scroll to explore.
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        {projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05); // each subsequent card scales down slightly more
          return (
            <StackCard 
              key={i} 
              index={i} 
              project={project} 
              progress={scrollYProgress} 
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StackedProjects;
