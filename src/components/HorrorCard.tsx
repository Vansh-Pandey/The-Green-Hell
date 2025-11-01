import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useState } from 'react';

interface HorrorCardProps {
  title: string;
  description: string;
  imageUrl: string;
  delay?: number;
}

export function HorrorCard({ title, description, imageUrl, delay = 0 }: HorrorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative h-[400px] rounded-lg overflow-hidden cursor-pointer"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"
        animate={{
          opacity: isHovered ? 0.6 : 0.8,
        }}
      />
      
      <motion.img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6 }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 z-20"
        style={{ transform: 'translateZ(50px)' }}
      >
        <motion.h3
          className="text-red-500 mb-2"
          animate={{
            x: isHovered ? 5 : 0,
          }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-300"
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{ delay: 0.05 }}
        >
          {description}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute inset-0 border-2 border-red-900/50 rounded-lg z-30 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered ? '0 0 30px rgba(139, 0, 0, 0.5)' : '0 0 0px rgba(139, 0, 0, 0)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
