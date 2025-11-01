import { motion } from 'motion/react';

interface FloatingSkullProps {
  delay?: number;
  startX: number;
  startY: number;
  size?: number;
}

export function FloatingSkull({ delay = 0, startX, startY, size = 60 }: FloatingSkullProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: `${startX}vw`, y: `${startY}vh`, opacity: 0, scale: 0 }}
      animate={{
        x: [`${startX}vw`, `${startX + 5}vw`, `${startX - 5}vw`, `${startX}vw`],
        y: [`${startY}vh`, `${startY + 10}vh`, `${startY - 5}vh`, `${startY}vh`],
        opacity: [0, 0.8, 0.8, 0.8, 0],
        scale: [0, 1, 1.2, 1, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        repeatDelay: 5,
        ease: 'easeInOut',
      }}
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        fill="currentColor"
        className="text-red-900 drop-shadow-[0_0_15px_rgba(139,0,0,0.8)]"
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Skull Shape */}
        <ellipse cx="50" cy="45" rx="30" ry="35" fill="#1a1a1a" stroke="currentColor" strokeWidth="2" />
        
        {/* Eye Sockets */}
        <motion.ellipse
          cx="38" cy="38" rx="8" ry="12"
          fill="#8B0000"
          animate={{
            fill: ['#8B0000', '#FF0000', '#8B0000'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <motion.ellipse
          cx="62" cy="38" rx="8" ry="12"
          fill="#8B0000"
          animate={{
            fill: ['#8B0000', '#FF0000', '#8B0000'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
        
        {/* Nose Cavity */}
        <path d="M 45 50 L 50 58 L 55 50 Z" fill="#1a1a1a" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Teeth/Jaw */}
        <motion.path
          d="M 32 58 Q 50 68 68 58"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{
            d: [
              'M 32 58 Q 50 68 68 58',
              'M 32 58 Q 50 70 68 58',
              'M 32 58 Q 50 68 68 58',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        <line x1="35" y1="60" x2="35" y2="66" stroke="currentColor" strokeWidth="1.5" />
        <line x1="40" y1="62" x2="40" y2="68" stroke="currentColor" strokeWidth="1.5" />
        <line x1="45" y1="63" x2="45" y2="69" stroke="currentColor" strokeWidth="1.5" />
        <line x1="50" y1="64" x2="50" y2="70" stroke="currentColor" strokeWidth="1.5" />
        <line x1="55" y1="63" x2="55" y2="69" stroke="currentColor" strokeWidth="1.5" />
        <line x1="60" y1="62" x2="60" y2="68" stroke="currentColor" strokeWidth="1.5" />
        <line x1="65" y1="60" x2="65" y2="66" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Glow effect */}
        <motion.ellipse
          cx="50" cy="45" rx="32" ry="37"
          fill="none"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.5"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.svg>
    </motion.div>
  );
}
