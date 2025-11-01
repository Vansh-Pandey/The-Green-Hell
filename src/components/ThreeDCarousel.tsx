import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import aman from '../assets/aman.jpg';
import kunal from '../assets/kunal.jpg';
import pratibha from '../assets/pratibha.jpg';
import vansh from '../assets/vansh.jpg';

interface CreatorProps {
  name: string;
  role: string;
  image: string;
  story: string;
  character: string;
}

const creators: CreatorProps[] = [
  {
    name: 'Aman Gupta',
    role: 'Spooky Developer',
    character: 'Ancient Curse Bearer',
    image: aman,
    story: 'Ganji Chudail roams the desolate paths at night, her bald head gleaming under the moonlight. Legend tells of a woman wronged in life, who returned as a vengeful spirit. She preys on lone travelers, especially men who dare to cross her path after sunset. Her backward feet leave tracks that lead the curious to their doom.',
  },
  {
    name: 'Kunal Mittal',
    role: 'Pookie Developer',
    character: 'Innocent Yet Cursed',
    image: kunal,
    story: 'Munjiya is the restless spirit of a child who died before their time. They haunt the village wells and banyan trees, seeking playmates in the mortal realm. Though appearing innocent, Munjiya\'s pranks can turn deadly. Children who venture too close to sacred trees at dusk may hear giggles that chill the soul.',
  },
  {
    name: 'Pratibha Bharti',
    role: 'Haunted UI/UX Developer',
    character: 'Wandering Shadow',
    image: pratibha,
    story: 'Bhoot is the tormented soul of a man who met an untimely end. He wanders the ruins of old havelis and abandoned temples, forever searching for peace. His presence is marked by sudden cold winds and the smell of burning incense. Those who encounter him speak of a profound sadness that lingers long after he vanishes.',
  },
  {
    name: 'Vansh Pandey',
    role: 'Scary Developer',
    character: 'Eternal Wanderer',
    image: vansh,
    story: 'Bhootni appears as a beautiful woman in white, often seen near rivers and cremation grounds. She calls out to travelers in the voice of a loved one, luring them into the darkness. Her true face reveals itself only when it\'s too late to escape. She is bound to the mortal realm by unfinished business from her past life.',
  },
];

export function ThreeDCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCreator, setSelectedCreator] = useState<CreatorProps | null>(null);

  const rotateLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + creators.length) % creators.length);
  };

  const rotateRight = () => {
    setCurrentIndex((prev) => (prev + 1) % creators.length);
  };

  const handleCardClick = (index: number) => {
    setSelectedCreator(creators[index]);
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
          THE CURSED CREATORS
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Four souls bound together by fate, crafting nightmares from folklore...
        </p>
      </motion.div>

      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4">
        <div className="relative h-[550px] flex items-center justify-center">
          {/* Carousel Stage */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {creators.map((creator, index) => {
                const position = (index - currentIndex + creators.length) % creators.length;
                
                // Simple horizontal positioning without 3D
                const isActive = position === 0;
                const offset = position - 1;
                const x = offset * 320;
                const scale = isActive ? 1 : 0.85;
                const opacity = Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.6;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute cursor-pointer"
                    animate={{
                      x: x,
                      scale: scale,
                      opacity: opacity,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 80,
                      damping: 20,
                    }}
                    style={{
                      zIndex: isActive ? 100 : 50 - Math.abs(offset),
                    }}
                    // onClick={() => handleCardClick(index)}
                    whileHover={{ 
                      scale: scale * 1.05,
                      y: -10,
                    }}
                  >
                    <div className="w-72 h-96 bg-gradient-to-b from-orange-950/90 via-black to-red-950/90 rounded-2xl border-4 border-orange-700/50 overflow-hidden shadow-2xl backdrop-blur-sm">
                      {/* Image Section */}
                      <div 
                        className="h-56 bg-cover bg-center relative overflow-hidden"
                        style={{ backgroundImage: `url(${creator.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        
                        {/* Floating particles */}
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: [
                              'radial-gradient(circle at 20% 30%, rgba(234, 88, 12, 0.2) 0%, transparent 50%)',
                              'radial-gradient(circle at 80% 70%, rgba(234, 88, 12, 0.2) 0%, transparent 50%)',
                              'radial-gradient(circle at 20% 30%, rgba(234, 88, 12, 0.2) 0%, transparent 50%)',
                            ],
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-5 relative">
                        <div className="flex items-center justify-center mb-2">
                          <Sparkles className="w-4 h-4 text-orange-500 mr-2" />
                          <h3 
                            className="text-orange-400 text-center"
                            style={{ fontFamily: 'Creepster, cursive' }}
                          >
                            {creator.name}
                          </h3>
                          <Sparkles className="w-4 h-4 text-orange-500 ml-2" />
                        </div>
                        
                        <p className="text-red-400 text-center mb-3 text-sm">
                          {creator.role}
                        </p>
                        
                        <div className="text-center">
                          <span className="inline-block bg-gradient-to-r from-orange-900/40 to-red-900/40 border-2 border-orange-600/50 rounded-full px-4 py-1.5 text-sm text-gray-300">
                            Developer
                          </span>
                        </div>
                      </div>

                      {/* Animated Border Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(234, 88, 12, 0.3), inset 0 0 20px rgba(234, 88, 12, 0.1)',
                            '0 0 40px rgba(234, 88, 12, 0.6), inset 0 0 30px rgba(234, 88, 12, 0.2)',
                            '0 0 20px rgba(234, 88, 12, 0.3), inset 0 0 20px rgba(234, 88, 12, 0.1)',
                          ],
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
            className="bg-gradient-to-r from-green-700 to-green-900 text-white px-8 py-4 rounded-xl border-3 border-green-500 flex items-center gap-3 shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
            <span style={{ fontFamily: 'Nosifer, cursive' }}>Previous Soul</span>
          </motion.button>

          <motion.button
            onClick={rotateRight}
            className="bg-gradient-to-r from-green-900 to-green-700 text-white px-8 py-4 rounded-xl border-3 border-green-500 flex items-center gap-3 shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{ fontFamily: 'Nosifer, cursive' }}>Next Soul</span>
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Carousel Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {creators.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-orange-500 w-8'
                  : 'bg-orange-900/50 hover:bg-orange-700'
              }`}
              whileHover={{ scale: 1.2 }}
              animate={
                index === currentIndex
                  ? {
                      boxShadow: [
                        '0 0 10px rgba(234, 88, 12, 0.5)',
                        '0 0 20px rgba(234, 88, 12, 0.8)',
                        '0 0 10px rgba(234, 88, 12, 0.5)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      {/* Modal for Creator Story */}
      <AnimatePresence>
        {selectedCreator && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCreator(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full bg-gradient-to-br from-orange-950/90 via-black to-red-950/90 rounded-3xl border-4 border-orange-700/70 overflow-hidden shadow-2xl"
              initial={{ scale: 0.5, rotateY: 90, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotateY: -90, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.7 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedCreator(null)}
                className="absolute top-6 right-6 z-10 bg-red-900/70 hover:bg-red-800 text-white rounded-full p-3 transition-all shadow-lg"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Image Section */}
              <div 
                className="h-80 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${selectedCreator.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                
                {/* Animated particles */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 40%, rgba(234, 88, 12, 0.4) 0%, transparent 60%)',
                      'radial-gradient(circle at 70% 60%, rgba(234, 88, 12, 0.4) 0%, transparent 60%)',
                      'radial-gradient(circle at 30% 40%, rgba(234, 88, 12, 0.4) 0%, transparent 60%)',
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                
                <div className="absolute bottom-6 left-8">
                  <motion.h2 
                    className="text-orange-400 mb-2"
                    style={{ fontFamily: 'Creepster, cursive' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedCreator.name}
                  </motion.h2>
                  <motion.p 
                    className="text-red-400 text-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedCreator.role}
                  </motion.p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-10">
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-block bg-gradient-to-r from-orange-900/50 to-red-900/50 border-2 border-orange-600/60 rounded-full px-6 py-2 text-gray-200">
                    ✨ {selectedCreator.character}
                  </span>
                </motion.div>

                <motion.div
                  className="space-y-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 
                    className="text-orange-400 text-2xl"
                    style={{ fontFamily: 'Eater, cursive' }}
                  >
                    The Story Behind the Curse
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedCreator.story}
                  </p>
                </motion.div>

                {/* Decorative Element */}
                <motion.div
                  className="mt-8 pt-6 border-t border-orange-900/40 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-gray-500 italic">
                    "Together we weave tales that transcend time and terror..."
                  </p>
                </motion.div>
              </div>

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{
                  boxShadow: [
                    'inset 0 0 40px rgba(234, 88, 12, 0.3)',
                    'inset 0 0 60px rgba(234, 88, 12, 0.5)',
                    'inset 0 0 40px rgba(234, 88, 12, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
