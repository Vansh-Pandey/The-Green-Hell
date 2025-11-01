import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface StoryChapterProps {
  chapter: number;
  title: string;
  description: string;
  backgroundImage: string;
  children?: ReactNode;
  reverse?: boolean;
}

export function StoryChapter({ 
  chapter, 
  title, 
  description, 
  backgroundImage,
  children,
  reverse = false 
}: StoryChapterProps) {
  return (
    <div className="relative min-h-screen flex items-center py-20">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={reverse ? 'lg:order-2' : ''}
          >
            <motion.div
              className="inline-block bg-red-600/20 backdrop-blur-sm border-2 border-red-600/50 rounded-lg px-4 py-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-red-400">Chapter {chapter}</span>
            </motion.div>
            
            <motion.h2
              className="text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="text-gray-300 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              {description}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reverse ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={reverse ? 'lg:order-1' : ''}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
