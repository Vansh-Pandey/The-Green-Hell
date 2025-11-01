import { motion } from 'motion/react';

interface FlyingBatProps {
  delay?: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function FlyingBat({ delay = 0, startX, startY, endX, endY }: FlyingBatProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: `${startX}vw`, y: `${startY}vh`, opacity: 0 }}
      animate={{
        x: [`${startX}vw`, `${endX}vw`, `${startX}vw`],
        y: [`${startY}vh`, `${endY}vh`, `${startY}vh`],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: 'easeInOut',
      }}
    >
      <motion.svg
        width="40"
        height="30"
        viewBox="0 0 40 30"
        fill="currentColor"
        className="text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
        animate={{
          rotateY: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <path d="M20 5 L10 0 Q5 5 5 10 L10 15 Q15 12 20 15 Q25 12 30 15 L35 10 Q35 5 30 0 L20 5 Z M20 15 L18 25 L20 30 L22 25 Z" />
        <ellipse cx="15" cy="8" rx="1.5" ry="2" fill="#8B0000" />
        <ellipse cx="25" cy="8" rx="1.5" ry="2" fill="#8B0000" />
      </motion.svg>
    </motion.div>
  );
}
