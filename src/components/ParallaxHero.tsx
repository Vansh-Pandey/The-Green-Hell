import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import heroImage from 'figma:asset/8902c6003c1e19e25df506be4343bbad936513a0.png';

interface ParallaxHeroProps {
  onStartJourney: () => void;
}

export function ParallaxHero({ onStartJourney }: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background Layers */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 w-full h-full">
          <img
            src={heroImage}
            alt="Haunted Mansion"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      
      {/* Animated Fog Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(100, 100, 150, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(100, 100, 150, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(100, 100, 150, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 140, 0, 0.5)',
                '0 0 40px rgba(255, 140, 0, 0.8)',
                '0 0 60px rgba(255, 140, 0, 1)',
                '0 0 40px rgba(255, 140, 0, 0.8)',
                '0 0 20px rgba(255, 140, 0, 0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 text-orange-400">
              THE HAUNTED MANOR
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            A centuries-old mansion where spirits roam freely, seeking peace... or revenge.
          </motion.p>

          <motion.p
            className="text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Enter if you dare. Uncover the dark secrets hidden within these cursed walls.
          </motion.p>

          <motion.button
            onClick={onStartJourney}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-gradient-to-r from-orange-600 to-red-700 text-white px-12 py-4 rounded-lg border-2 border-orange-500 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{
                  x: '100%',
                  transition: { duration: 0.6, ease: 'easeInOut' },
                }}
              />
              <span className="relative z-10">Enter The Manor</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Floating Pumpkins */}
        <motion.div
          className="absolute bottom-20 left-1/4"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="text-6xl">🎃</div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-1/4"
          animate={{
            y: [0, -30, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <div className="text-6xl">🎃</div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity }}
      >
        <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-orange-500 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
