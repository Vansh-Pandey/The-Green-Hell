import { motion } from 'motion/react';
import { Ghost, Home, Gamepad2, BookOpen } from 'lucide-react';
import { useState } from 'react';
import ghostLogo from 'figma:asset/484fcfb914b2677c4588d6b55b2b0b669c6c6d2f.png';

export function NavigationBar() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-green-900/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
          >
            <motion.div
              className="w-10 h-10"
              animate={{ 
                y: [0, -5, 0],
                rotateY: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={ghostLogo}
                alt="Ghost Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <span className="text-green-500" style={{ fontFamily: 'Nosifer, cursive' }}>
              HAUNTED MANSION
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <motion.button
              onClick={() => scrollToSection('home')}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden border-2 border-amber-900"
              style={{
                background: activeSection === 'home' 
                  ? 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)'
                  : 'linear-gradient(135deg, #6B3410 0%, #4A2C1A 50%, #2E1F17 100%)',
                boxShadow: 'inset 0 1px 5px rgba(101, 67, 33, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-4 h-4 text-amber-200 relative z-10" />
              <span className="text-amber-200 relative z-10">Home</span>
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)`,
              }} />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('story')}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden border-2 border-amber-900"
              style={{
                background: activeSection === 'story'
                  ? 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)'
                  : 'linear-gradient(135deg, #6B3410 0%, #4A2C1A 50%, #2E1F17 100%)',
                boxShadow: 'inset 0 1px 5px rgba(101, 67, 33, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-4 h-4 text-amber-200 relative z-10" />
              <span className="text-amber-200 relative z-10">Story</span>
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)`,
              }} />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('game')}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden border-2 border-amber-900"
              style={{
                background: activeSection === 'game'
                  ? 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)'
                  : 'linear-gradient(135deg, #6B3410 0%, #4A2C1A 50%, #2E1F17 100%)',
                boxShadow: 'inset 0 1px 5px rgba(101, 67, 33, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gamepad2 className="w-4 h-4 text-amber-200 relative z-10" />
              <span className="text-amber-200 relative z-10">Game</span>
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)`,
              }} />
            </motion.button>

            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Ghost className="w-6 h-6 text-green-400" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
