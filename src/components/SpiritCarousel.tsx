import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Flame } from 'lucide-react';

interface SpiritProps {
  name: string;
  title: string;
  image: string;
  bio: string;
  curse: string;
}

const spirits: SpiritProps[] = [
  {
    name: 'Ganji Chudail',
    title: 'The Bald Witch',
    image: 'https://images.unsplash.com/photo-1730404835539-6474f8e34285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FyeSUyMHdpdGNoJTIwaG9ycm9yJTIwZmFjZXxlbnwxfHx8fDE3NjIwMTYwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Once a beautiful woman betrayed by her lover and cursed by dark magic, Ganji Chudail now roams the mansion with a bald head, long razor-sharp nails, and feet twisted backwards. She appears on moonless nights, her skeletal fingers reaching out from the shadows. Her haunting cries echo through empty corridors, luring the unwary to their doom.',
    curse: 'Those who hear her wailing three times are marked for eternal torment.',
  },
  {
    name: 'Munjiya',
    title: 'The Vengeful Child',
    image: 'https://images.unsplash.com/photo-1665028464248-f29dcbccdad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVlcHklMjBjaGlsZCUyMGdob3N0fGVufDF8fHx8MTc2MjAxNjA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Munjiya died as a young Brahmin boy before his sacred thread ceremony could be performed. His spirit, trapped in eternal childhood, seeks to possess young men who dare enter the mansion. Playful yet malevolent, he causes madness and chaos. His presence brings sudden coldness, the smell of burning incense, and childish laughter in empty rooms.',
    curse: 'He possesses those who mock death or disrespect the sacred.',
  },
  {
    name: 'Bhoot',
    title: 'The Skeletal Specter',
    image: 'https://images.unsplash.com/photo-1666437599791-61668817d207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2VsZXRvbiUyMHNrdWxsJTIwaG9ycm9yfGVufDF8fHx8MTc2MjAxNjA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'The Bhoot is a restless spirit trapped between the realm of the living and the dead. Once the mansion\'s caretaker, he was murdered and left to rot in the cellar. His skeletal form materializes in mirrors and dark corners, bones rattling with each step. He guards the mansion\'s darkest secrets and attacks those who venture too deep into forbidden areas.',
    curse: 'Touch his bones and your soul becomes his eternal prisoner.',
  },
  {
    name: 'Bhootni',
    title: 'The Weeping Woman',
    image: 'https://images.unsplash.com/photo-1683710761484-e826e1016dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaG9zdCUyMHdvbWFuJTIwc3Bpcml0fGVufDF8fHx8MTc2MjAxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Bhootni appears as a woman in flowing white robes, her face hidden behind cascading black hair. She died with unfulfilled desires and eternal longing. At midnight, her mournful wails pierce the silence as she searches for the love she lost. Her touch brings visions of death and despair. Those who see her face are driven to madness.',
    curse: 'She steals the happiness from those who have what she could never have.',
  },
];

// Separate Modal Component
function SpiritModal({ spirit, onClose }: { spirit: SpiritProps; onClose: () => void }) {
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // onClick={onClose}
    >
      <motion.div
        className="relative max-w-3xl w-full bg-gradient-to-br from-green-950/95 via-black to-black rounded-3xl border-4 border-green-800/80 overflow-hidden shadow-2xl"
        initial={{ scale: 0.5, rotateY: 90, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        exit={{ scale: 0.5, rotateY: -90, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.7 }}
        // onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {/* <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-green-900/70 hover:bg-green-800 text-white rounded-full p-3 transition-all shadow-lg"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button> */}

        {/* Image Section */}
        <div 
          className="h-80 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${spirit.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          
          {/* Animated particles */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.4) 0%, transparent 60%)',
                'radial-gradient(circle at 70% 60%, rgba(34, 197, 94, 0.4) 0%, transparent 60%)',
                'radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.4) 0%, transparent 60%)',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          <div className="absolute bottom-6 left-8">
            <motion.h2 
              className="text-green-500 mb-2 text-3xl md:text-4xl"
              style={{ fontFamily: 'Nosifer, cursive' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {spirit.name}
            </motion.h2>
            <motion.p 
              className="text-green-400 text-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {spirit.title}
            </motion.p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h3 
                className="text-green-500 text-2xl mb-4"
                style={{ fontFamily: 'Nosifer, cursive' }}
              >
                The Dark Tale
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {spirit.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-green-900/40">
              <h4 className="text-green-400 mb-2" style={{ fontFamily: 'Nosifer, cursive' }}>
                The Curse
              </h4>
              <p className="text-green-400 italic">
                {spirit.curse}
              </p>
            </div>
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            className="mt-8 pt-6 border-t border-green-900/40 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-500 italic text-sm">
              "These spirits are bound to this mansion. Their curse is eternal..."
            </p>
          </motion.div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: [
              'inset 0 0 40px rgba(34, 197, 94, 0.3)',
              'inset 0 0 60px rgba(34, 197, 94, 0.5)',
              'inset 0 0 40px rgba(34, 197, 94, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>,
    document.body
  );
}

export function SpiritCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSpirit, setSelectedSpirit] = useState<SpiritProps | null>(null);

  const rotateLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + spirits.length) % spirits.length);
  };

  const rotateRight = () => {
    setCurrentIndex((prev) => (prev + 1) % spirits.length);
  };

  const handleCardClick = (index: number) => {
    setSelectedSpirit(spirits[index]);
  };

  return (
    <div className="relative w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.h2 
          className="text-4xl md:text-6xl text-green-500 mb-4"
          style={{ fontFamily: 'Nosifer, cursive' }}
          animate={{
            textShadow: [
              '0 0 20px rgba(34, 197, 94, 0.5)',
              '0 0 40px rgba(34, 197, 94, 0.8)',
              '0 0 20px rgba(34, 197, 94, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          THE CURSED SPIRITS
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Four tortured souls bound to this mansion for eternity. Click to uncover their dark stories...
        </p>
      </motion.div>

      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4">
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Carousel Stage */}
          <div 
            className="relative w-full h-full"
            style={{
              perspective: '2500px',
              perspectiveOrigin: 'center center',
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {spirits.map((spirit, index) => {
                const position = (index - currentIndex + spirits.length) % spirits.length;
                const angle = (position * 360) / spirits.length;
                const radius = 400;
                
                // Calculate 3D position
                const x = Math.sin((angle * Math.PI) / 180) * radius;
                const z = Math.cos((angle * Math.PI) / 180) * radius;
                const scale = (z + radius) / (radius * 2);
                const rotationY = -angle;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute cursor-pointer"
                    animate={{
                      x: x,
                      z: z,
                      scale: scale,
                      rotateY: rotationY,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 60,
                      damping: 15,
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: Math.round(scale * 100),
                    }}
                    // onClick={() => handleCardClick(index)}
                    whileHover={{ 
                      scale: scale * 1.15,
                      y: -30,
                    }}
                  >
                    <div className="w-80 h-[450px] bg-gradient-to-b from-green-950/90 via-black to-black rounded-3xl border-4 border-green-800/70 overflow-hidden shadow-2xl backdrop-blur-sm relative">
                      {/* Creepy background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <motion.div
                          className="w-full h-full"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, #8B0000 0px, #8B0000 2px, transparent 2px, transparent 10px)',
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        />
                      </div>

                      {/* Image Section */}
                      <div 
                        className="h-64 bg-cover bg-center relative overflow-hidden"
                        style={{ backgroundImage: `url(${spirit.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        
                        {/* Eerie glow */}
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: [
                              'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 60%)',
                              'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.5) 0%, transparent 60%)',
                              'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 60%)',
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6 relative">
                        <div className="flex items-center justify-center mb-3">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Flame className="w-5 h-5 text-green-600 mr-2" />
                          </motion.div>
                          <h3 
                            className="text-green-500 text-center"
                            style={{ fontFamily: 'Nosifer, cursive' }}
                          >
                            {spirit.name}
                          </h3>
                          <motion.div
                            animate={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Flame className="w-5 h-5 text-green-600 ml-2" />
                          </motion.div>
                        </div>
                        
                        <p className="text-green-400 text-center mb-4 text-sm">
                          {spirit.title}
                        </p>
                        
                        {/* <div className="text-center">
                          <span className="inline-block bg-gradient-to-r from-green-900/50 to-green-800/50 border-2 border-green-700/60 rounded-full px-4 py-2 text-sm text-gray-300">
                            Click to Reveal Bio
                          </span>
                        </div> */}
                      </div>

                      {/* Animated Border Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(34, 197, 94, 0.4), inset 0 0 30px rgba(34, 197, 94, 0.2)',
                            '0 0 50px rgba(34, 197, 94, 0.8), inset 0 0 50px rgba(34, 197, 94, 0.4)',
                            '0 0 20px rgba(34, 197, 94, 0.4), inset 0 0 30px rgba(34, 197, 94, 0.2)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />

                      {/* Dripping effect */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-green-700 to-transparent"
                        animate={{
                          scaleY: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-12 mt-12">
          <motion.button
            onClick={rotateLeft}
            className="bg-gradient-to-r from-green-800 to-green-900 text-white px-8 py-4 rounded-xl border-3 border-green-600 flex items-center gap-3 shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)',
            }}
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: 'Nosifer, cursive' }}
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Previous Spirit</span>
          </motion.button>

          <motion.button
            onClick={rotateRight}
            className="bg-gradient-to-r from-green-900 to-green-800 text-white px-8 py-4 rounded-xl border-3 border-green-600 flex items-center gap-3 shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)',
            }}
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: 'Nosifer, cursive' }}
          >
            <span>Next Spirit</span>
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Carousel Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {spirits.map((_, index) => (
            <motion.button
              key={index}
              // onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-green-600 w-8'
                  : 'bg-green-900/50 hover:bg-green-700'
              }`}
              whileHover={{ scale: 1.2 }}
              animate={
                index === currentIndex
                  ? {
                      boxShadow: [
                        '0 0 10px rgba(34, 197, 94, 0.5)',
                        '0 0 20px rgba(34, 197, 94, 0.8)',
                        '0 0 10px rgba(34, 197, 94, 0.5)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      {/* Modal Portal - Renders outside DOM hierarchy */}
      <AnimatePresence>
        {selectedSpirit && (
          <SpiritModal 
            spirit={selectedSpirit} 
            onClose={() => setSelectedSpirit(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}