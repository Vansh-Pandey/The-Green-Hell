import { motion } from 'motion/react';

interface FloatingGhostProps {
  delay?: number;
  x: number;
  y: number;
}

export function FloatingGhost({ delay = 0, x, y }: FloatingGhostProps) {
  return (
    <motion.div
      className="absolute text-white/10 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.3, 0],
        y: [20, -100, -200],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatDelay: 5,
      }}
    >
      <svg width="60" height="80" viewBox="0 0 60 80" fill="currentColor">
        <path d="M30 0C15 0 5 10 5 25C5 35 5 60 5 70C5 72 7 75 10 75C13 75 15 72 15 70C15 68 15 65 15 65C15 65 17 67 20 67C23 67 25 65 25 65C25 65 25 68 25 70C25 72 27 75 30 75C33 75 35 72 35 70C35 68 35 65 35 65C35 65 37 67 40 67C43 67 45 65 45 65C45 65 45 68 45 70C45 72 47 75 50 75C53 75 55 72 55 70C55 60 55 35 55 25C55 10 45 0 30 0Z" />
      </svg>
    </motion.div>
  );
}
