import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Skull } from 'lucide-react';
import signImage from 'figma:asset/58f55d820deb6dacb16be73ee7a39aa9827efd27.png';

export function HorrorSign() {
  const [isActivated, setIsActivated] = useState(false);
  const [bloodDrops, setBloodDrops] = useState<number[]>([]);

  const activateHorror = () => {
    setIsActivated(true);
    // Create multiple blood drops
    const drops = Array.from({ length: 20 }, (_, i) => i);
    setBloodDrops(drops);
    
    // Reset after animation
    setTimeout(() => {
      setIsActivated(false);
      setBloodDrops([]);
    }, 4000);
  };

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto my-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Sign Image */}
      <div className="relative">
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          animate={isActivated ? {
            filter: [
              'hue-rotate(0deg) saturate(1)',
              'hue-rotate(-30deg) saturate(1.5) brightness(1.2)',
              'hue-rotate(0deg) saturate(1)',
            ],
            scale: [1, 1.02, 1],
          } : {}}
          transition={{ duration: 2 }}
        >
          <img
            src={signImage}
            alt="Horror Sign"
            className="w-full h-auto"
          />
          
          {/* Red overlay when activated */}
          <AnimatePresence>
            {isActivated && (
              <motion.div
                className="absolute inset-0 bg-red-900/40 mix-blend-multiply"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              />
            )}
          </AnimatePresence>

          {/* Blood dripping from skull */}
          <AnimatePresence>
            {isActivated && bloodDrops.map((drop, index) => (
              <motion.div
                key={drop}
                className="absolute w-2 h-2 bg-red-700 rounded-full"
                style={{
                  left: `${45 + Math.random() * 10}%`,
                  top: '30%',
                  filter: 'blur(0.5px)',
                }}
                initial={{ y: 0, opacity: 1, scale: 1 }}
                animate={{
                  y: [0, 400 + Math.random() * 200],
                  opacity: [1, 0.8, 0],
                  scale: [1, 1.5, 0.5],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5 + Math.random() * 1,
                  delay: index * 0.1,
                  ease: 'easeIn',
                }}
              />
            ))}
          </AnimatePresence>

          {/* Pulsing glow effect when activated */}
          <AnimatePresence>
            {isActivated && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  boxShadow: [
                    '0 0 0px rgba(220, 38, 38, 0)',
                    '0 0 100px rgba(220, 38, 38, 0.8), inset 0 0 100px rgba(220, 38, 38, 0.5)',
                    '0 0 0px rgba(220, 38, 38, 0)',
                  ],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Text on wooden board */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl mb-2"
            style={{
              fontFamily: 'Creepster, cursive',
              color: isActivated ? '#dc2626' : '#7c2d12',
              textShadow: isActivated
                ? '0 0 20px rgba(220, 38, 38, 0.9), 0 0 40px rgba(220, 38, 38, 0.6)'
                : '2px 2px 4px rgba(0, 0, 0, 0.8)',
            }}
            animate={isActivated ? {
              scale: [1, 1.1, 1],
              color: ['#7c2d12', '#dc2626', '#7c2d12'],
            } : {}}
            transition={{ duration: 2 }}
          >
            ENTER IF YOU DARE
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl"
            style={{
              fontFamily: 'Nosifer, cursive',
              color: isActivated ? '#b91c1c' : '#92400e',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
            }}
          >
            The Cursed Souls Await...
          </motion.p>
        </motion.div>

        {/* Interactive Button */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={activateHorror}
            disabled={isActivated}
            className="relative bg-gradient-to-r from-red-900 to-red-800 text-white px-8 py-4 rounded-lg border-2 border-red-600 flex items-center gap-3 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!isActivated ? { 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(220, 38, 38, 0.8)',
            } : {}}
            whileTap={!isActivated ? { scale: 0.95 } : {}}
          >
            <motion.div
              animate={!isActivated ? {
                rotate: [0, 10, -10, 0],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Skull className="w-6 h-6" />
            </motion.div>
            <span className="text-lg" style={{ fontFamily: 'Creepster, cursive' }}>
              {isActivated ? 'The Curse Awakens...' : 'Awaken The Curse'}
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating particles around sign when activated */}
      <AnimatePresence>
        {isActivated && (
          <>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-500 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
