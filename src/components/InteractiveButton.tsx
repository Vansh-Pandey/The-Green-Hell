import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface InteractiveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function InteractiveButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md' 
}: InteractiveButtonProps) {
  const sizes = {
    sm: 'px-6 py-2',
    md: 'px-8 py-3',
    lg: 'px-12 py-4',
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border-2 border-amber-900 ${sizes[size]} transition-all duration-300`}
      style={{
        background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)',
        boxShadow: 'inset 0 2px 10px rgba(101, 67, 33, 0.8), inset 0 -2px 10px rgba(62, 39, 35, 0.8), 0 4px 15px rgba(0, 0, 0, 0.5)',
        fontFamily: 'Nosifer, cursive'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
      
      {/* Nail heads for wooden effect */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-800 shadow-inner" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-800 shadow-inner" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-800 shadow-inner" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-800 shadow-inner" />

      <span className="relative z-10 flex items-center gap-2 text-amber-200">
        {children}
      </span>
    </motion.button>
  );
}
