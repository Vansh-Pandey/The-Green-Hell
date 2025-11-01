import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Ghost, Crosshair, Trophy } from 'lucide-react';
import { InteractiveButton } from './InteractiveButton';

interface GhostPosition {
  id: number;
  x: number;
  y: number;
  caught: boolean;
}

export function GhostHuntGame() {
  const [ghosts, setGhosts] = useState<GhostPosition[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            setGameStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const spawnGhost = setInterval(() => {
        const newGhost: GhostPosition = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20,
          caught: false,
        };
        setGhosts((prev) => [...prev, newGhost]);

        setTimeout(() => {
          setGhosts((prev) => prev.filter((g) => g.id !== newGhost.id));
        }, 3000);
      }, 1500);

      return () => clearInterval(spawnGhost);
    }
  }, [gameStarted, gameOver]);

  const catchGhost = (id: number) => {
    setGhosts((prev) => prev.filter((g) => g.id !== id));
    setScore((prev) => prev + 1);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setGhosts([]);
  };

  const resetGame = () => {
    setGameOver(false);
    setGameStarted(false);
    setScore(0);
    setTimeLeft(30);
    setGhosts([]);
  };

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border-4 border-red-900/50">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-950/30" />
      
      {/* Score and Timer */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <motion.div
          className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-red-600/50"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-white">Score: {score}</span>
          </div>
        </motion.div>

        {gameStarted && (
          <motion.div
            className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-red-600/50"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-red-500" />
              <span className="text-white">Time: {timeLeft}s</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Game Area */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {ghosts.map((ghost) => (
            <motion.button
              key={ghost.id}
              className="absolute cursor-crosshair"
              style={{
                left: `${ghost.x}%`,
                top: `${ghost.y}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -20, 0],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                y: { duration: 2, repeat: Infinity },
              }}
              onClick={() => catchGhost(ghost.id)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <Ghost className="w-12 h-12 text-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Start Screen */}
      {!gameStarted && !gameOver && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.h3
            className="text-white mb-4 text-center"
            animate={{
              textShadow: [
                '0 0 20px rgba(239, 68, 68, 0.5)',
                '0 0 40px rgba(239, 68, 68, 0.8)',
                '0 0 20px rgba(239, 68, 68, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Ghost Hunt Challenge
          </motion.h3>
          <p className="text-gray-300 mb-8 text-center max-w-md px-4">
            Click the ghosts before they disappear! You have 30 seconds to catch as many as you can.
          </p>
          <InteractiveButton onClick={startGame} variant="primary" size="lg">
            <Ghost className="w-5 h-5" />
            Start Hunting
          </InteractiveButton>
        </motion.div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-center"
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-white mb-2">Hunt Complete!</h3>
            <p className="text-gray-300 mb-8">
              You caught <span className="text-red-500">{score}</span> ghost{score !== 1 ? 's' : ''}!
            </p>
            <div className="flex gap-4">
              <InteractiveButton onClick={startGame} variant="primary">
                Hunt Again
              </InteractiveButton>
              <InteractiveButton onClick={resetGame} variant="secondary">
                Exit
              </InteractiveButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
