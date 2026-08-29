import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, Database, WifiOff, Car, ExternalLink, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TechTag = ({ children }) => (
  <span style={{
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-cyan)',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    display: 'inline-block'
  }}>
    {children}
  </span>
);

const CanteenProject = () => {
  const containerRef = useRef(null);
  const diagramRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const diagram = diagramRef.current;

    // Horizontal sliding effect on scroll
    gsap.to(diagram, {
      x: '0%', // slides in to 0
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      }
    });
  }, []);

  return (
    <div className="bento-item wide" ref={containerRef} style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, zIndex: 1, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Database size={32} color="var(--accent-violet)" />
          <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>Smart Canteen Management</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px' }}>
          A full-stack facility management platform digitizing administrative workflows with secure user authentication and real-time order tracking.
        </p>
        <div>
          <TechTag>React.js</TechTag>
          <TechTag>Node.js</TechTag>
          <TechTag>Express.js</TechTag>
          <TechTag>MongoDB</TechTag>
        </div>
      </div>
      
      {/* Scroll-triggered Diagram Overlay (Simulated UI/Diagram) */}
      <div 
        ref={diagramRef}
        style={{
          position: 'absolute',
          top: 0,
          right: '-10%',
          width: '60%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(0, 255, 255, 0.05))',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          transform: 'translateX(100%)', // Starts offscreen
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <div style={{
          width: '100%',
          height: '80%',
          background: 'rgba(10, 10, 10, 0.5)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.5rem'
        }}>
          <div style={{ width: '40%', height: '20px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }} />
          <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
            <div style={{ flex: 1, background: 'rgba(0, 255, 255, 0.1)', borderRadius: '4px' }} />
            <div style={{ flex: 2, background: 'rgba(138, 43, 226, 0.1)', borderRadius: '4px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const LumoraProject = () => {
  return (
    <div className="bento-item medium" style={{ background: '#101014' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Server size={28} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Lumora Search Engine</h3>
        </div>
        <a href="#" style={{ opacity: 0.5 }}><ExternalLink size={20} /></a>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Hybrid semantic search engine combining FAISS vector search and BM25 sparse retrieval. Integrated cross-encoder reranking.
      </p>
      
      {/* Code Editor Aesthetic */}
      <div style={{
        background: '#0d0d0d',
        borderRadius: '8px',
        padding: '1rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: '#a0a0a0',
        marginTop: 'auto',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <div style={{ color: '#8a2be2' }}>def <span style={{ color: '#00ffff' }}>hybrid_search</span>(query):</div>
        <div style={{ paddingLeft: '1rem' }}>
          <span style={{ color: '#ff7b72' }}>vector_res</span> = faiss_index.search(query)<br/>
          <span style={{ color: '#ff7b72' }}>sparse_res</span> = bm25.retrieve(query)<br/>
          <span style={{ color: '#ff7b72' }}>return</span> rerank(vector_res, sparse_res)
        </div>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <TechTag>Python</TechTag><TechTag>FAISS</TechTag><TechTag>FastAPI</TechTag>
      </div>
    </div>
  );
};

const SIEMProject = () => {
  return (
    <div className="bento-item medium" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: 'var(--accent-violet)', filter: 'blur(80px)', opacity: 0.2 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Shield size={28} color="var(--accent-violet)" />
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>SIEM System</h3>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Centralized platform aggregating security logs from multiple network nodes. Features real-time dashboard visualization of anomalies.
      </p>
      
      {/* Live Feed Mockup */}
      <div style={{
        marginTop: 'auto',
        borderLeft: '2px solid var(--accent-violet)',
        paddingLeft: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
          <span style={{ color: '#ff5f56', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>[ALERT] Unauthorized access attempt</span>
        </motion.div>
        <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
          [INFO] Node 4 heartbeat OK
        </div>
      </div>
      
      <div style={{ marginTop: '1.5rem' }}>
        <TechTag>Cybersecurity</TechTag><TechTag>Next.js</TechTag><TechTag>Python</TechTag>
      </div>
    </div>
  );
};

const GlitchText = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }
    
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iterations = 0;
    
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (index < iterations) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1/3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: isHovered ? 'var(--font-mono)' : 'inherit', cursor: 'default' }}
    >
      {displayText}
    </span>
  );
};

const ELearningProject = () => (
  <div className="bento-item small" style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#050505' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <WifiOff size={24} color="#a0a0a0" />
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}><GlitchText text="Zero Knowledge E-Learning" /></h3>
    </div>
    <div style={{ background: 'var(--accent-cyan)', color: '#000', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '1rem', textTransform: 'uppercase' }}>
      Hackathon Build
    </div>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
      Optimized architecture for low-bandwidth 2G networks. Implemented custom video slicing and adaptive delivery protocols to minimize data consumption.
    </p>
  </div>
);

const PickADriverProject = () => (
  <div className="bento-item small">
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <Car size={24} color="#a0a0a0" />
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Pick a Driver</h3>
    </div>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
      Java Swing desktop app with dynamic fare calculation and dual-sided ratings. Optimized relational SQL schema.
    </p>
    <TechTag>Java</TechTag><TechTag>SQL</TechTag>
  </div>
);

const BentoGrid = () => {
  return (
    <div className="bento-grid">
      <CanteenProject />
      <LumoraProject />
      <SIEMProject />
      <ELearningProject />
      <PickADriverProject />
    </div>
  );
};

export default BentoGrid;
