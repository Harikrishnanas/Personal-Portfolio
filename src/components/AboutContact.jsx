import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const TimelineItem = ({ year, title, subtitle, details, isLast }) => (
  <div style={{ display: 'flex', gap: '2rem', marginBottom: isLast ? '0' : '3rem', position: 'relative' }}>
    {/* Timeline line */}
    {!isLast && <div style={{ position: 'absolute', left: '6px', top: '24px', bottom: '-48px', width: '2px', background: 'rgba(255,255,255,0.1)' }} />}
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--accent-violet)', zIndex: 1, marginTop: '5px' }} />
    </div>
    
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      style={{ flex: 1 }}
    >
      <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>{year}</span>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h3>
      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 400 }}>{subtitle}</h4>
      {details && (
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
          {details.map((detail, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>{detail}</li>
          ))}
        </ul>
      )}
    </motion.div>
  </div>
);

const MagneticButton = ({ children, href }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * 0.3); // Magnetic pull strength
    mouseY.set((clientY - centerY) * 0.3);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        x,
        y,
        textDecoration: 'none',
        position: 'relative'
      }}
    >
      {children}
    </motion.a>
  );
};

const AboutContact = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
      
      {/* Timeline Section */}
      <div>
        <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Journey</h2>
        
        <div style={{ position: 'relative' }}>
          <TimelineItem 
            year="Jun 2025 – Jul 2025"
            title="Machine Learning Intern"
            subtitle="JYESTA Corporate Entity"
            details={[
              "Developed predictive ML algorithms in Python to analyze large-scale datasets.",
              "Evaluated foundational regression models to extract actionable insights."
            ]}
          />
          <TimelineItem 
            year="May 2026"
            title="AI/ML Intern"
            subtitle="Linnk Group"
            details={[
              "Implemented AI solutions in Python to optimize algorithmic efficiency.",
              "Tested and fine-tuned machine learning pipelines."
            ]}
          />
          <TimelineItem 
            year="2023 – 2027"
            title="B.Tech in Computer Science"
            subtitle="College of Engineering Kidangoor (CGPA: 8.45)"
            isLast={true}
          />
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Let's Build.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '400px' }}>
            Currently seeking opportunities to architect high-performance solutions and engineer intelligent systems.
          </p>
        </div>
        
        <div style={{ marginTop: '4rem', paddingBottom: '2rem' }}>
          <MagneticButton href="mailto:harikrishnanas20054@gmail.com">
            <motion.div 
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
              whileHover={{ color: 'var(--accent-cyan)' }}
            >
              Get in touch <ArrowUpRight size={48} strokeWidth={3} />
            </motion.div>
          </MagneticButton>
          
          <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', fontFamily: 'var(--font-mono)' }}>
            <a href="https://github.com/Harikrishnanas" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--text-primary)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>GitHub</a>
            <a href="https://linkedin.com/in/Harikrishnan AS" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--text-primary)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>LinkedIn</a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AboutContact;
