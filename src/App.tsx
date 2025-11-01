import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { MemoryCardGame } from './components/MemoryCardGame';
import { InteractiveButton } from './components/InteractiveButton';
import { ThreeDCarousel } from './components/ThreeDCarousel';
import { HalloweenFrame } from './components/HalloweenFrame';
import { SpiritCarousel } from './components/SpiritCarousel';
import { ChatBot3D } from './components/ChatBot3D';
import { Ghost } from 'lucide-react';
import heroImage from 'figma:asset/570b076b95f69ec469997e8ff25d38ec725013cd.png';

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <NavigationBar />
      <ChatBot3D />

      {/* Hero Section with Parallax Layers */}
      <section id="home" ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background Layer 1 - Darkest/Furthest */}
        <motion.div
          className="absolute inset-0"
          style={{ y: layer1Y, scale }}
        >
          <div className="absolute inset-0 w-full h-full opacity-95">
            <img
              src={heroImage}
              alt="Haunted Mansion Background"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7) blur(2px)' }}
            />
          </div>
        </motion.div>

        {/* Layer 2 - Mid */}
        <motion.div
          className="absolute inset-0"
          style={{ y: layer2Y }}
        >
          <div className="absolute inset-0 w-full h-full opacity-98">
            <img
              src={heroImage}
              alt="Haunted Mansion Mid"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.85) blur(1px)' }}
            />
          </div>
        </motion.div>

        {/* Layer 3 - Front (Mansion coming out) */}
        <motion.div
          className="absolute inset-0"
          style={{ y: layer3Y }}
        >
          <div className="absolute inset-0 w-full h-full opacity-100">
            <img
              src={heroImage}
              alt="Haunted Mansion Front"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1)' }}
            />
          </div>
        </motion.div>

        {/* Dark Overlays - More black, less green */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90" />

        {/* Simple Smoke - Single layer */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-2/5 opacity-40"
          animate={{
            background: [
              'linear-gradient(to top, rgba(15, 60, 30, 0.3) 0%, transparent 100%)',
              'linear-gradient(to top, rgba(10, 40, 20, 0.2) 0%, transparent 100%)',
              'linear-gradient(to top, rgba(15, 60, 30, 0.3) 0%, transparent 100%)',
            ],
            x: ['-5%', '5%', '-5%'],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        {/* Hero Content - FULLY RESPONSIVE */}
        <motion.div
          style={{ opacity }}
          className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-5xl"
          >
            {/* Subtitle - Responsive text */}
            <motion.p
              className="text-green-500 mb-3 sm:mb-4 tracking-widest text-sm sm:text-base md:text-lg lg:text-xl"
              style={{ fontFamily: 'Nosifer, cursive' }}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ~ Enter The Darkness ~
            </motion.p>

            {/* Main Title - Responsive sizing */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 text-green-500 px-2"
              style={{ 
                fontFamily: 'Nosifer, cursive',
                textShadow: '0 0 15px rgba(34, 197, 94, 0.5), 0 10px 30px rgba(0, 0, 0, 1)',
                letterSpacing: '0.05em',
              }}
              animate={{
                textShadow: [
                  '0 0 15px rgba(34, 197, 94, 0.5), 0 10px 30px rgba(0, 0, 0, 1)',
                  '0 0 20px rgba(34, 197, 94, 0.6), 0 10px 35px rgba(0, 0, 0, 1)',
                  '0 0 15px rgba(34, 197, 94, 0.5), 0 10px 30px rgba(0, 0, 0, 1)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              HAUNTED MANSION
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-6 sm:mb-8"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-400 mb-2 sm:mb-3 px-4" style={{ fontFamily: 'Nosifer, cursive' }}>
                Where Spirits Never Rest
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-4">
                An ancient cursed mansion shrouded in eternal darkness. 
                The spirits hunger for new souls...
              </p>
            </motion.div>

            {/* Call to Action Button - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <motion.button
                onClick={scrollToStory}
                className="relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl overflow-hidden border-2 border-amber-900 flex items-center gap-2 sm:gap-3 mx-auto"
                style={{
                  background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)',
                  boxShadow: 'inset 0 2px 10px rgba(101, 67, 33, 0.8), inset 0 -2px 10px rgba(62, 39, 35, 0.8), 0 4px 15px rgba(0, 0, 0, 0.5)',
                  fontFamily: 'Nosifer, cursive'
                }}
                whileHover={{ 
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
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
                <Ghost className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 relative z-10" />
                <span className="text-base sm:text-lg md:text-xl text-amber-200 relative z-10">Enter If You Dare</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section with Halloween Frame - RESPONSIVE */}
      <section 
        id="story" 
        className="relative min-h-screen py-12 sm:py-16 md:py-20 bg-black"
      >
        <div className="absolute inset-0 bg-black" />
        
        <div className="relative z-99 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-green-500 mb-4 sm:mb-6 px-4"
              style={{ fontFamily: 'Nosifer, cursive' }}
            >
              The Dark Legend
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-green-400 mb-3 sm:mb-4" style={{ fontFamily: 'Nosifer, cursive' }}>
              UNCOVER THE TRUTH
            </p>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-6 sm:mb-8" />
          </motion.div>

          {/* Halloween Frame with Story and Reveal */}
          <HalloweenFrame />
        </div>
      </section>

      {/* Spirit Carousel Section - RESPONSIVE */}
      <section 
        className="relative py-12 sm:py-16 md:py-20 bg-black"
      >
        <div className="absolute inset-0 bg-black" />
        <div className="relative z-199">
          <SpiritCarousel />
        </div>
      </section>

      {/* Game Section - RESPONSIVE */}
      <section 
        id="game" 
        className="relative min-h-screen py-12 sm:py-16 md:py-20 bg-black"
      >
        <div className="absolute inset-0 bg-black" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-green-500 mb-3 sm:mb-4 px-4"
              style={{ fontFamily: 'Nosifer, cursive' }}
            >
              Break The Curse
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-green-400 mb-2" style={{ fontFamily: 'Nosifer, cursive' }}>
              MATCH THE HAUNTED SYMBOLS
            </p>
            <p className="text-sm sm:text-base text-gray-400 max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Match the cursed symbols to free the trapped souls. Each pair you find weakens the dark magic...
            </p>
          </motion.div>

          {/* Interior Preview Gallery - RESPONSIVE GRID */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0"
          >
            {[
              'https://images.unsplash.com/photo-1683710761484-e826e1016dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaG9zdCUyMHdvbWFuJTIwc3Bpcml0fGVufDF8fHx8MTc2MjAxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              'https://images.unsplash.com/photo-1666437599791-61668817d207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2VsZXRvbiUyMHNrdWxsJTIwaG9ycm9yfGVufDF8fHx8MTc2MjAxNjA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              'https://images.unsplash.com/photo-1667379861537-589bcd302f0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXQlMjBmbHlpbmclMjBkYXJrfGVufDF8fHx8MTc2MjAxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              'https://images.unsplash.com/photo-1608590898839-de14c56b7fe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxsb3dlZW4lMjBwdW1wa2luJTIwc2Nhcnl8ZW58MXx8fHwxNzYyMDE2MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            ].map((img, index) => (
              <motion.div
                key={index}
                className="relative h-28 sm:h-32 md:h-36 lg:h-40 rounded-lg overflow-hidden border-2 border-green-900/50 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(34, 197, 94, 0.8)' }}
              >
                <img
                  src={img}
                  alt={`Cursed Spirit ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>

          <MemoryCardGame />

          {/* Warning Box - RESPONSIVE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-r from-green-950/40 via-green-900/40 to-green-950/40 backdrop-blur-md border-2 border-green-600/50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center relative overflow-hidden mx-2 sm:mx-0"
          >
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <p className="text-sm sm:text-base md:text-lg text-green-400 italic relative z-10">
              "Remember, those who enter this mansion... are never the same again."
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 relative z-10">
              - The curse binds all who dare to challenge it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Creators Carousel Section - RESPONSIVE */}
      <section 
        className="relative py-12 sm:py-16 md:py-20 bg-black"
      >
        <div className="absolute inset-0 bg-black" />
        <div className="relative z-10">
          <ThreeDCarousel />
        </div>
      </section>

      {/* Footer - RESPONSIVE */}
      <footer 
        className="relative py-10 sm:py-12 md:py-16 bg-black"
      >
        <div className="absolute inset-0 bg-black" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-lg sm:text-xl md:text-2xl text-green-500 mb-3 sm:mb-4"
              style={{ fontFamily: 'Nosifer, cursive' }}
            >
              The Haunted Mansion Awaits...
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-4">
              Will you survive the night among the spirits, or become one of them?
            </p>

            <motion.p
              className="text-xs sm:text-sm md:text-base text-gray-600"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ fontFamily: 'Nosifer, cursive' }}
            >
              Enter at your own risk...
            </motion.p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}