import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Layout, BrainCircuit } from 'lucide-react';

const skillCategories = [
  {
    id: 'core',
    title: 'Core Engineering',
    icon: <Code2 size={24} />,
    color: '#00ffff', // cyan
    skills: ['Python', 'JavaScript (ES6+)', 'Java', 'C', 'System Architecture']
  },
  {
    id: 'frontend',
    title: 'Frontend & Interaction',
    icon: <Layout size={24} />,
    color: '#ff5555', // red/pink
    skills: ['React.js', 'Next.js', 'Three.js', 'Framer Motion', 'Advanced CSS']
  },
  {
    id: 'backend',
    title: 'Backend & Data',
    icon: <Database size={24} />,
    color: '#8a2be2', // violet
    skills: ['Node.js', 'FastAPI', 'RESTful APIs', 'PostgreSQL', 'MongoDB']
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: <BrainCircuit size={24} />,
    color: '#ffaa00', // orange
    skills: ['Vector Embeddings (FAISS)', 'Retrieval-Augmented Gen', 'Predictive Modeling', 'Foundational Models']
  }
];

const allSkillsFlat = skillCategories.flatMap(c => c.skills);

const InfiniteMarquee = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: 0,
      width: '100%',
      transform: 'translateY(-50%)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      opacity: 0.03, // extremely subtle background text
      pointerEvents: 'none',
      zIndex: 0
    }}>
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        style={{ display: 'inline-block' }}
      >
        <span style={{ fontSize: '15vw', fontWeight: 900, textTransform: 'uppercase', paddingRight: '50px' }}>
          {allSkillsFlat.join(' • ')}
        </span>
      </motion.div>
    </div>
  );
};

const SkillsVisualizer = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div style={{ position: 'relative', padding: '4rem 0', minHeight: '600px', display: 'flex', alignItems: 'center' }}>
      
      {/* Background Marquee */}
      <InfiniteMarquee />

      {/* Foreground Interactive Accordion List */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {skillCategories.map((category) => {
            const isHovered = hoveredCategory === category.id;
            const isDimmed = hoveredCategory !== null && hoveredCategory !== category.id;

            return (
              <div
                key={category.id}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  padding: '2rem',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  opacity: isDimmed ? 0.3 : 1,
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Background Glow on Hover */}
                {isHovered && (
                  <motion.div
                    layoutId="activeGlow"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: `linear-gradient(90deg, ${category.color}15, transparent)`,
                      borderLeft: `4px solid ${category.color}`,
                      zIndex: -1
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ color: isHovered ? category.color : 'var(--text-secondary)', transition: 'color 0.3s' }}>
                      {category.icon}
                    </div>
                    <h3 style={{ 
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
                      fontWeight: 700,
                      color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'color 0.3s'
                    }}>
                      {category.title}
                    </h3>
                  </div>
                </div>

                {/* Skills Expansion */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: '2rem' }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {category.skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            style={{
                              padding: '0.75rem 1.5rem',
                              borderRadius: '30px',
                              border: `1px solid ${category.color}40`,
                              backgroundColor: 'rgba(0,0,0,0.4)',
                              color: 'var(--text-primary)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.9rem',
                              backdropFilter: 'blur(5px)'
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsVisualizer;
