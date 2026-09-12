import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Command, Layout, Code2, User } from 'lucide-react';

export default function FloatingCommandNode({ lenis }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleTeleport = (targetId) => {
    setIsOpen(false);
    
    // Calculate scroll target based on id
    let targetScroll = 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    switch(targetId) {
      case '#hero': targetScroll = 0; break;
      case '#projects': targetScroll = maxScroll * 0.33; break;
      case '#skills': targetScroll = maxScroll * 0.66; break;
      case '#about': targetScroll = maxScroll; break;
      default: targetScroll = 0;
    }

    if (lenis) {
      // Lenis smooth programmatic scroll
      lenis.scrollTo(targetScroll, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
      });
    } else {
      // Fallback
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'System Overview', id: '#hero', icon: <Terminal size={18} /> },
    { label: 'Architecture & Projects', id: '#projects', icon: <Layout size={18} /> },
    { label: 'Skill Matrices', id: '#skills', icon: <Code2 size={18} /> },
    { label: 'Secure Channel (Contact)', id: '#about', icon: <User size={18} /> },
  ];

  return (
    <>
      {/* Floating Pill Node */}
      <motion.button
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-full glass-panel text-text-primary hover:text-accent-cyan transition-colors"
        onClick={() => setIsOpen(true)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Command size={18} />
        <span className="font-mono text-sm font-medium">CMD K</span>
        
        {/* Subtle Pulse */}
        <span className="absolute -z-10 inset-0 rounded-full bg-accent-cyan/20 animate-ping" style={{ animationDuration: '3s' }}></span>
      </motion.button>

      {/* Command Palette Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-lg glass-panel overflow-hidden border border-white/10 shadow-2xl shadow-accent-violet/20"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Command className="text-text-secondary" size={20} />
                  <span className="text-text-primary font-mono text-sm">Navigation Sequence</span>
                </div>
                <div className="flex gap-1 text-[10px] font-mono text-text-tertiary bg-white/5 px-2 py-1 rounded">
                  <span>ESC</span>
                </div>
              </div>
              
              <div className="p-2 flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
                {navItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTeleport(item.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-md text-left text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors group"
                  >
                    <span className="group-hover:text-accent-cyan transition-colors">
                      {item.icon}
                    </span>
                    <span className="font-mono text-sm">{item.label}</span>
                    <span className="ml-auto text-xs font-mono text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                      JUMP
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
