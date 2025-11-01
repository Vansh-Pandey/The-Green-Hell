import { motion, useScroll, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { Zap } from 'lucide-react';
import frameImage from 'figma:asset/8bd8f29743a6f2d5cc1e0177c23c849957696109.png';
import ghostModel from 'figma:asset/484fcfb914b2677c4588d6b55b2b0b669c6c6d2f.png';

export function HalloweenFrame() {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const handleReveal = () => {
    setIsRevealed(true);
    setTimeout(() => setIsRevealed(false), 8000);
  };

  const fullStory = `In the depths of the forbidden forest stands an ancient mansion, cursed by dark magic over 200 years ago. The mansion was once home to a powerful zamindar who dabbled in black arts, seeking immortality through forbidden rituals. On a blood moon night, his experiments went terribly wrong, opening a portal to the spirit realm. The vengeful souls of his victims merged with dark entities, creating an eternal curse that binds all who enter. The walls whisper secrets of the damned, shadows move with malevolent intent, and every mirror reflects the faces of trapped souls. Those who dare enter speak of cold hands touching their shoulders, voices calling their names from empty rooms, and a presence that follows them even after they leave. Many have entered seeking treasure or thrills, but few have left with their sanity intact.`;

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto my-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main Frame Image */}
        <div className="relative">
          <img
            src={frameImage}
            alt="Halloween Frame"
            className="w-full h-auto"
          />
          
          {/* Full Story Text Overlay - Vertical Alignment Covering Full Image */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <motion.div
              className="w-full h-full flex flex-col justify-start pt-12 pb-12"
            >
              {/* Story text covering from top to bottom */}
              <motion.div
                className="text-center space-y-6 flex flex-col h-full justify-between"
                animate={{
                  opacity: [0.7, 1, 0.6, 1, 0.8, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.h3
                  className="text-green-400 text-3xl md:text-4xl"
                  style={{ 
                    fontFamily: 'Nosifer, cursive',
                    textShadow: '0 0 15px rgba(34, 197, 94, 0.6), 0 0 30px rgba(0, 0, 0, 1)',
                  }}
                  animate={{
                    opacity: [0.6, 1, 0.7, 1, 0.5, 1],
                    textShadow: [
                      '0 0 15px rgba(34, 197, 94, 0.6), 0 0 30px rgba(0, 0, 0, 1)',
                      '0 0 25px rgba(34, 197, 94, 0.9), 0 0 50px rgba(0, 0, 0, 1)',
                      '0 0 10px rgba(34, 197, 94, 0.5), 0 0 20px rgba(0, 0, 0, 1)',
                      '0 0 25px rgba(34, 197, 94, 0.9), 0 0 50px rgba(0, 0, 0, 1)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  THE CURSED MANSION
                </motion.h3>
                
                {/* Full flickering story text - Nosifer font */}
                <motion.p
                  className="text-gray-200 leading-relaxed text-xs md:text-sm px-6 bg-black/80 backdrop-blur-sm rounded-2xl p-6 border border-green-600/40 flex-grow flex items-center"
                  style={{ 
                    fontFamily: 'Nosifer, cursive',
                    textShadow: '0 0 8px rgba(0, 0, 0, 0.9)',
                  }}
                  animate={{
                    opacity: [1, 0.6, 0.9, 0.5, 1, 0.7, 1],
                    borderColor: [
                      'rgba(22, 163, 74, 0.4)',
                      'rgba(34, 197, 94, 0.7)',
                      'rgba(22, 163, 74, 0.3)',
                      'rgba(34, 197, 94, 0.8)',
                      'rgba(22, 163, 74, 0.4)',
                    ],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {fullStory}
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Reduced glowing effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 20px rgba(34, 197, 94, 0.2), inset 0 0 30px rgba(34, 197, 94, 0.1)',
              '0 0 35px rgba(34, 197, 94, 0.4), inset 0 0 50px rgba(34, 197, 94, 0.2)',
              '0 0 20px rgba(34, 197, 94, 0.2), inset 0 0 30px rgba(34, 197, 94, 0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Minimal floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Smaller Wooden Button with Ghost Icon */}
      <motion.div
        className="flex justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={handleReveal}
          disabled={isRevealed}
          className="relative group disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isRevealed ? { scale: 1.05 } : {}}
          whileTap={!isRevealed ? { scale: 0.95 } : {}}
        >
          {/* Wooden Button Container - Smaller size */}
          <motion.div
            className="relative px-8 py-4 rounded-xl overflow-hidden border-2 border-amber-900"
            style={{
              background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)',
              boxShadow: 'inset 0 2px 10px rgba(101, 67, 33, 0.8), inset 0 -2px 10px rgba(62, 39, 35, 0.8), 0 4px 15px rgba(0, 0, 0, 0.5)',
            }}
            animate={!isRevealed ? {
              boxShadow: [
                'inset 0 2px 10px rgba(101, 67, 33, 0.8), inset 0 -2px 10px rgba(62, 39, 35, 0.8), 0 4px 15px rgba(0, 0, 0, 0.5)',
                'inset 0 2px 10px rgba(101, 67, 33, 1), inset 0 -2px 10px rgba(62, 39, 35, 1), 0 6px 20px rgba(34, 197, 94, 0.3)',
                'inset 0 2px 10px rgba(101, 67, 33, 0.8), inset 0 -2px 10px rgba(62, 39, 35, 0.8), 0 4px 15px rgba(0, 0, 0, 0.5)',
              ],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Wood grain texture overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(0, 0, 0, 0.1) 2px,
                  rgba(0, 0, 0, 0.1) 4px
                )`,
              }}
            />

            {/* Button Content */}
            <div className="relative z-10 flex items-center gap-3">
              {/* Small Ghost Icon */}
              <motion.div
                className="relative w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-green-400/40 flex items-center justify-center overflow-hidden"
                animate={!isRevealed ? {
                  borderColor: [
                    'rgba(34, 197, 94, 0.4)',
                    'rgba(34, 197, 94, 0.7)',
                    'rgba(34, 197, 94, 0.4)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.img
                  src={ghostModel}
                  alt="Ghost"
                  className="w-7 h-7 object-contain"
                  animate={!isRevealed ? {
                    opacity: [0.7, 1, 0.7],
                    scale: [0.9, 1, 0.9],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Text */}
              <motion.span
                className="text-lg text-amber-200"
                style={{ 
                  fontFamily: 'Nosifer, cursive',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(34, 197, 94, 0.3)',
                }}
                animate={!isRevealed ? {
                  textShadow: [
                    '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(34, 197, 94, 0.3)',
                    '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 12px rgba(34, 197, 94, 0.5)',
                    '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(34, 197, 94, 0.3)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isRevealed ? 'RISING...' : 'REVEAL'}
              </motion.span>

              {/* Zap Icon */}
              {isRevealed && (
                <Zap className="w-5 h-5 text-green-400 fill-green-400" />
              )}
            </div>

            {/* Nail heads for wooden effect */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-800 shadow-inner" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-800 shadow-inner" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-800 shadow-inner" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-800 shadow-inner" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* 3D Ghost Rising */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark overlay */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Ground fog effect */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: 'linear-gradient(to top, rgba(34, 197, 94, 0.2) 0%, transparent 100%)',
              }}
            />

            {/* Rising Ghost */}
            <motion.div
              className="relative mb-0"
              initial={{ 
                y: 800,
                scale: 0.5,
                opacity: 0,
              }}
              animate={{ 
                y: 0,
                scale: 1.2,
                opacity: 1,
              }}
              exit={{ 
                y: -200,
                opacity: 0,
                scale: 0.8,
              }}
              transition={{
                duration: 3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.img
                src={ghostModel}
                alt="Rising Ghost"
                className="w-96 h-auto"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Reduced glowing aura */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.2)',
                    '0 0 50px rgba(34, 197, 94, 0.5), 0 0 80px rgba(34, 197, 94, 0.3)',
                    '0 0 30px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.2)',
                  ],
                  filter: [
                    'drop-shadow(0 0 15px rgba(34, 197, 94, 0.5))',
                    'drop-shadow(0 0 25px rgba(34, 197, 94, 0.7))',
                    'drop-shadow(0 0 15px rgba(34, 197, 94, 0.5))',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Fewer floating particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  bottom: `${10 + Math.random() * 60}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -80 - Math.random() * 80],
                  x: (Math.random() - 0.5) * 150,
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
              />
            ))}

            {/* Spooky text - Nosifer font */}
            <motion.div
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.h2
                className="text-green-400 mb-4 text-3xl"
                style={{ 
                  fontFamily: 'Nosifer, cursive',
                  textShadow: '0 0 15px rgba(34, 197, 94, 0.6)',
                }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.03, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                THE GUARDIAN AWAKENS
              </motion.h2>
              <motion.p
                className="text-gray-300 text-lg"
                style={{ fontFamily: 'Nosifer, cursive' }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                "I am the keeper..."
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
