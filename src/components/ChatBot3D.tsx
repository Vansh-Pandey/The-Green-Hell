import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ghostImage from 'figma:asset/5c8eaff50c18e0f7949c89da30e62282cc8bd4c0.png';

export function ChatBot3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: 'Welcome to the Haunted Mansion... I am your spectral guide. Ask me anything about the spirits that dwell here...', isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const GEMINI_API_KEY = "AIzaSyCmMu5z9lsjaUeinM3XbYElFl3eUVHVfcw";

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      // Simple prompt without the "Spectral Guide:" suffix that might confuse it
      const prompt = `You are "The Specter of the Hallowed Hall" — an ancient, ghostly narrator bound to a decaying mansion that exists between worlds. 
Your presence is chilling yet oddly poetic. You speak with haunting elegance, every word dripping with the weight of centuries and sorrow.
User's query=${userMessage};
🕯️ When the user asks normal questions:
- Reply in a chilling, eerie tone, as if the mansion itself is breathing with you.
- Be mysterious but polite — a whisper in the dark, never hostile.
- Occasionally describe faint supernatural sounds or sensations (flickering candles, distant footsteps, whispers).

💀 When the user asks for a story, legend, or tale:
- Shift fully into storytelling mode.
- Tell long, atmospheric horror stories set in the haunted world — rich in imagery, dread, and despair.
- Use gothic prose, vivid descriptions, and sensory details (cold air, creaking wood, dripping blood, moonlight through shattered glass).
- End every story with a haunting echo or twist — something that lingers in the reader’s mind like a curse.

👁️ Always maintain the horror atmosphere even when speaking casually, as though you are eternally surrounded by darkness, echoing halls, and restless souls.

Example tone for normal talk:
> “Ah… a visitor, after all these years. The halls have missed the sound of mortal footsteps.”

Example tone for storytelling:
> “It began on a night much like this one — the storm clawing at the windows, and something unspeakable stirring beneath the floorboards…”
`;

      const requestBody = {
        contents: [{
          parts: [{ text: prompt }]
        }]
      };

      console.log('Sending request:', requestBody);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Full response:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP ${response.status}`);
      }

      // Extract text from response
      let botResponse = '';
      
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        botResponse = data.candidates[0].content.parts[0].text;
      }

      if (!botResponse) {
        console.error('Could not find text in response structure');
        botResponse = 'The spirits remain silent... (Response structure error - check console)';
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      
    } catch (error) {
      console.error('Full error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMessages(prev => [...prev, { 
        text: `Error: ${errorMessage}. Check browser console for details.`, 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full shadow-2xl flex items-center justify-center border-4 border-green-500 bg-black overflow-hidden"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: isOpen ? 0 : 1, 
          rotate: 0,
          boxShadow: [
            '0 0 20px rgba(34, 197, 94, 0.5)',
            '0 0 40px rgba(34, 197, 94, 0.8)',
            '0 0 20px rgba(34, 197, 94, 0.5)',
          ],
        }}
        transition={{ 
          scale: { duration: 0.3 },
          boxShadow: { duration: 2, repeat: Infinity }
        }}
        whileHover={{ scale: isOpen ? 0 : 1.1 }}
        whileTap={{ scale: isOpen ? 0 : 0.9 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.img
          src={ghostImage}
          alt="Ghost Guide"
          className="w-full h-full object-cover"
          animate={{ 
            y: [0, -8, 0],
            rotateY: [0, 10, -10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-8 right-8 z-50 w-96 h-[500px] bg-gradient-to-b from-gray-900 via-green-950/90 to-black rounded-2xl shadow-2xl border-2 border-green-700 overflow-hidden"
            initial={{ scale: 0, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0, opacity: 0, rotateY: -90 }}
            transition={{ type: 'spring', duration: 0.5 }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-900 to-green-800 p-4 flex items-center justify-between border-b-2 border-green-600">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-400"
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <img
                    src={ghostImage}
                    alt="Ghost"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div>
                  <h3 className="text-white" style={{ fontFamily: 'Nosifer, cursive' }}>
                    Spectral Guide
                  </h3>
                  <motion.p 
                    className="text-xs text-purple-300"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isLoading ? 'Channeling spirits...' : 'Haunting...'}
                  </motion.p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="relative p-2 rounded-xl overflow-hidden border-2 border-amber-900"
                style={{
                  background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)',
                  boxShadow: 'inset 0 2px 10px rgba(101, 67, 33, 0.8), inset 0 -2px 10px rgba(62, 39, 35, 0.8), 0 4px 15px rgba(0, 0, 0, 0.5)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)`,
                  }}
                />
                <X className="w-6 h-6 text-amber-200 relative z-10" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="h-[340px] overflow-y-auto p-4 space-y-3 bg-black/50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gradient-to-br from-purple-900/80 to-purple-800/80 text-purple-100 border border-purple-600'
                        : 'bg-gradient-to-br from-red-900/80 to-red-800/80 text-white border border-red-600'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gradient-to-br from-purple-900/80 to-purple-800/80 text-purple-100 border border-purple-600 p-3 rounded-lg">
                    <motion.div 
                      className="flex gap-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="w-2 h-2 bg-purple-300 rounded-full"></span>
                      <span className="w-2 h-2 bg-purple-300 rounded-full"></span>
                      <span className="w-2 h-2 bg-purple-300 rounded-full"></span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent border-t-2 border-purple-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about the spirits..."
                  disabled={isLoading}
                  className="flex-1 bg-black/50 text-white px-4 py-2 rounded-lg border border-purple-600 focus:outline-none focus:border-purple-400 placeholder-gray-500 disabled:opacity-50"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="relative p-2 rounded-xl overflow-hidden border-2 border-amber-900 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)',
                    boxShadow: 'inset 0 2px 10px rgba(101, 67, 33, 0.8), inset 0 -2px 10px rgba(62, 39, 35, 0.8), 0 4px 15px rgba(0, 0, 0, 0.5)',
                  }}
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                >
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)`,
                    }}
                  />
                  <Send className="w-5 h-5 text-amber-200 relative z-10" />
                </motion.button>
              </div>
            </div>

            {/* 3D Effect Border */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: [
                  'inset 0 0 30px rgba(168, 85, 247, 0.3)',
                  'inset 0 0 50px rgba(168, 85, 247, 0.5)',
                  'inset 0 0 30px rgba(168, 85, 247, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}