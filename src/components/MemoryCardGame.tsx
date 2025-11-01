import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { InteractiveButton } from './InteractiveButton';

interface Card {
  id: number;
  icon: string;
  image: string;
  matched: boolean;
  flipped: boolean;
}

const cardData = [
  { 
    icon: '👻', 
    image: 'https://images.unsplash.com/photo-1683710761484-e826e1016dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaG9zdCUyMHdvbWFuJTIwc3Bpcml0fGVufDF8fHx8MTc2MjAxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    icon: '💀', 
    image: 'https://images.unsplash.com/photo-1666437599791-61668817d207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2VsZXRvbiUyMHNrdWxsJTIwaG9ycm9yfGVufDF8fHx8MTc2MjAxNjA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    icon: '🦇', 
    image: 'https://images.unsplash.com/photo-1667379861537-589bcd302f0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXQlMjBmbHlpbmclMjBkYXJrfGVufDF8fHx8MTc2MjAxNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    icon: '🎃', 
    image: 'https://images.unsplash.com/photo-1608590898839-de14c56b7fe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxsb3dlZW4lMjBwdW1wa2luJTIwc2Nhcnl8ZW58MXx8fHwxNzYyMDE2MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    icon: '🕷️', 
    image: 'https://images.unsplash.com/photo-1730404835539-6474f8e34285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FyeSUyMHdpdGNoJTIwaG9ycm9yJTIwZmFjZXxlbnwxfHx8fDE3NjIwMTYwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    icon: '🐱', 
    image: 'https://images.unsplash.com/photo-1665028464248-f29dcbccdad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVlcHklMjBjaGlsZCUyMGdob3N0fGVufDF8fHx8MTc2MjAxNjA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    icon: '🧛', 
    image: 'https://images.unsplash.com/photo-1598311415207-c8875c577522?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVlcHklMjBkb2xsJTIwaG9ycm9yfGVufDF8fHx8MTc2MjAxNjA3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    icon: '🧟', 
    image: 'https://images.unsplash.com/photo-1613752555210-36d1976a2f3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXVudGVkJTIwaG91c2UlMjBuaWdodHxlbnwxfHx8fDE3NjE5OTI4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
];

export function MemoryCardGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGame = () => {
    const shuffledCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map((data, index) => ({
        id: index,
        icon: data.icon,
        image: data.image,
        matched: false,
        flipped: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameWon(false);
    setGameStarted(true);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = flippedCards;
      
      if (cards[first].icon === cards[second].icon) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, matched: true }
                : card
            )
          );
          setMatches((prev) => prev + 1);
          setFlippedCards([]);

          // Check if game is won
          if (matches + 1 === cardData.length) {
            setTimeout(() => setGameWon(true), 500);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matches]);

  const handleCardClick = (id: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(id) ||
      cards[id].matched ||
      cards[id].flipped
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );
    setFlippedCards((prev) => [...prev, id]);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Game Stats */}
      {gameStarted && !gameWon && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-8 mb-8"
        >
          <div className="bg-green-950/50 backdrop-blur-md border-2 border-green-700 rounded-lg px-6 py-3">
            <p className="text-green-400 text-sm">Matches</p>
            <p className="text-white text-2xl" style={{ fontFamily: 'Nosifer, cursive' }}>
              {matches} / {cardData.length}
            </p>
          </div>
          <div className="bg-green-950/50 backdrop-blur-md border-2 border-green-700 rounded-lg px-6 py-3">
            <p className="text-green-400 text-sm">Moves</p>
            <p className="text-white text-2xl" style={{ fontFamily: 'Nosifer, cursive' }}>
              {moves}
            </p>
          </div>
        </motion.div>
      )}

      {/* Game Board */}
      {gameStarted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-4 gap-4 mb-8"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="relative aspect-square cursor-pointer"
              onClick={() => handleCardClick(card.id)}
              whileHover={!card.flipped && !card.matched ? { scale: 1.05 } : {}}
              whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : {}}
            >
              <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
                <motion.div
                  className="absolute w-full h-full"
                  animate={{
                    rotateY: card.flipped || card.matched ? 180 : 0,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Card Back */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-green-900 to-green-700 rounded-xl border-4 border-green-500 flex items-center justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <span className="text-5xl">❓</span>
                    </motion.div>
                  </div>

                  {/* Card Front */}
                  <div
                    className="absolute w-full h-full rounded-xl border-4 border-green-600 overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {/* Horror Image */}
                    <div
                      className="w-full h-full bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${card.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      
                      {/* Icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-6xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                          animate={card.matched ? {
                            scale: [1, 1.3, 1],
                            rotate: [0, 360],
                          } : {}}
                          transition={{ duration: 0.6 }}
                        >
                          {card.icon}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Matched glow effect */}
              <AnimatePresence>
                {card.matched && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      boxShadow: [
                        '0 0 0px rgba(34, 197, 94, 0)',
                        '0 0 30px rgba(34, 197, 94, 0.8)',
                        '0 0 0px rgba(34, 197, 94, 0)',
                      ],
                    }}
                    transition={{ duration: 1 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <h3 
            className="text-3xl text-green-500 mb-6"
            style={{ fontFamily: 'Nosifer, cursive' }}
          >
            Ready to Challenge the Spirits?
          </h3>
          <p className="text-gray-400 mb-8">
            Match the cursed symbols to break the ancient spell
          </p>
        </motion.div>
      )}

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        {!gameStarted ? (
          <InteractiveButton onClick={initializeGame} variant="primary" size="lg">
            Start Game
          </InteractiveButton>
        ) : (
          <InteractiveButton onClick={initializeGame} variant="secondary" size="md">
            <RotateCcw className="w-5 h-5" />
            Restart
          </InteractiveButton>
        )}
      </div>

      {/* Victory Modal */}
      <AnimatePresence>
        {gameWon && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-b from-green-900 via-green-800 to-green-900 p-12 rounded-3xl border-4 border-yellow-500 max-w-md text-center relative overflow-hidden"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.7 }}
            >
              {/* Confetti effect */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
              </motion.div>

              <h2 
                className="text-4xl text-yellow-400 mb-4"
                style={{ fontFamily: 'Nosifer, cursive' }}
              >
                Curse Broken!
              </h2>
              <p className="text-white mb-6">
                You've matched all the symbols in {moves} moves!
                <br />
                The spirits grant you safe passage...
              </p>
              <InteractiveButton onClick={initializeGame} variant="primary" size="lg">
                Play Again
              </InteractiveButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
