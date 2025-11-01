import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface ParallaxSectionProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  reverse?: boolean;
}

export function ParallaxSection({ imageUrl, title, subtitle, reverse = false }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], reverse ? ['-20%', '20%'] : ['20%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%]"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        style={{ opacity, scale }}
        className="relative h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-red-600 mb-4"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-gray-300 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>
  );
}
