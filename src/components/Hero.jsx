import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrambleText = ({ text, className, style, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));
  
  useEffect(() => {
    // Left-to-right cryptographic decode over exactly 600ms
    const chars = '!@#$%^&*()_+{}[]|:;"\'<>,.?/~0123456789ABCDEFx';
    const totalDuration = 600; // strictly 600ms
    const fps = 30;
    const totalFrames = Math.floor((totalDuration / 1000) * fps);
    let frame = 0;
    
    let timeout;
    let interval;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        
        const scrambled = text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          // Determine at what frame this character should lock in
          const lockFrame = Math.floor((index / text.length) * totalFrames);
          
          if (frame >= lockFrame) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        
        setDisplayText(scrambled);

        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplayText(text); // Ensure final text
        }
      }, 1000 / fps);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className={className} style={style}>{displayText}</span>;
};

const ParticleField = () => {
  const points = useRef();
  const particlesCount = 2000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      const isCyan = Math.random() > 0.5;
      const color = new THREE.Color(isCyan ? '#ffffff' : '#888888');
      color.toArray(colors, i * 3);
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
      
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      
      points.current.rotation.x += (mouseY - points.current.rotation.x) * 0.05;
      points.current.rotation.y += (mouseX - points.current.rotation.y) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  );
};

const Hero = () => {
  const heroContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade hero opacity to 20% when scrolled out to yield focus
      gsap.to(heroContentRef.current, {
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "100vh top", 
          scrub: true,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center z-0">
      {/* WebGL Background */}
      <div className="absolute inset-0 w-full h-full -z-10 bg-black">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div 
        ref={heroContentRef} 
        className="container relative z-10 flex flex-col items-start justify-center h-full max-w-[90vw]"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-4"
        >
          <ScrambleText 
            text="SYSTEM ARCHITECTURE & VISUAL AI"
            delay={200}
            className="text-text-secondary font-mono text-sm md:text-base font-semibold tracking-[0.2em]"
          />
        </motion.div>

        <h1 className="text-white w-[90vw] max-w-[1400px] uppercase block" style={{ 
          fontSize: 'clamp(3rem, 11vw, 12rem)', // Brutalist, massive, 80% screen width proxy
          fontWeight: 900, 
          lineHeight: 0.9,
          letterSpacing: '-0.05em',
          marginLeft: '-0.05em',
          marginBottom: '2rem'
        }}>
          <ScrambleText text="HARIKRISHNAN AS" delay={400} />
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }} // Reveals exactly after 600ms scramble
          className="max-w-[1000px] mb-12"
        >
          <p className="liquid-chrome-text font-medium" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.3 }}>
            Architecting zero-latency backend systems and identity-consistent AI video models.
          </p>
        </motion.div>

        <motion.a 
          href="#projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="inline-flex items-center gap-3 text-white text-lg font-bold border-b-2 border-transparent hover:border-white transition-all pb-1"
        >
          Explore Architecture
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.a>
      </div>
      
      {/* Optional gradient fade at bottom to blend with next section if needed */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Hero;
