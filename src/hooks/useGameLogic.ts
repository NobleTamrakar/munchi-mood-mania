
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MoodType, EmojiFood } from '../types/game';

// Map of emoji to resulting mood
const emojiEffects: Record<string, EmojiFood> = {
  '🍩': { emoji: '🍩', resultMood: 'happy' },
  '🍦': { emoji: '🍦', resultMood: 'happy' },
  '🍪': { emoji: '🍪', resultMood: 'happy' },
  '🌶️': { emoji: '🌶️', resultMood: 'angry' },
  '💢': { emoji: '💢', resultMood: 'angry' },
  '⚡': { emoji: '⚡', resultMood: 'angry' },
  '💤': { emoji: '💤', resultMood: 'sleepy' },
  '🛏️': { emoji: '🛏️', resultMood: 'sleepy' },
  '📚': { emoji: '📚', resultMood: 'sleepy' },
  '💌': { emoji: '💌', resultMood: 'love' },
  '❤️': { emoji: '❤️', resultMood: 'love' },
  '🌹': { emoji: '🌹', resultMood: 'love' },
  '🧅': { emoji: '🧅', resultMood: 'sad' },
  '☔': { emoji: '☔', resultMood: 'sad' },
  '😢': { emoji: '😢', resultMood: 'sad' },
};

// Available emojis for the game
const availableEmojis = Object.keys(emojiEffects);

export const useGameLogic = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [mood, setMood] = useState<MoodType>('neutral');
  const [moodHistory, setMoodHistory] = useState<MoodType[]>([]);
  const [fallingEmojis, setFallingEmojis] = useState<Array<{ id: number; emoji: string; speed: number; position: { x: number, y: number } }>>([]);
  const [draggedEmoji, setDraggedEmoji] = useState<string | null>(null);
  
  // Start the game
  const startGame = useCallback(() => {
    setIsGameActive(true);
    setScore(0);
    setLives(3);
    setLevel(1);
    setMood('neutral');
    setMoodHistory([]);
    setFallingEmojis([]);
    toast.success("Game started! Feed Munchi!");
  }, []);

  // End the game
  const endGame = useCallback(() => {
    setIsGameActive(false);
    toast.error(`Game over! Final score: ${score}`);
  }, [score]);

  // Handle feeding Munchi with an emoji
  const feedMunchi = useCallback((emoji: string) => {
    const food = emojiEffects[emoji];
    
    if (food) {
      setMood(food.resultMood);
      setScore(prevScore => prevScore + 10);
      setMoodHistory(prev => [...prev, food.resultMood]);
      
      // Show feedback
      toast.success(`Munchi reacts: ${food.resultMood}!`, { 
        duration: 1500,
        style: { backgroundColor: '#000', border: '1px solid #39FF14', color: '#fff' },
        position: 'top-center'
      });
      
      // Level up every 50 points
      if ((score + 10) % 50 === 0) {
        setLevel(prevLevel => prevLevel + 1);
        toast.info(`Level up! ${level + 1}`, {
          duration: 2000,
          style: { backgroundColor: '#000', border: '1px solid #39FF14', color: '#39FF14' }
        });
      }
    }
  }, [score, level]);
  
  // Spawn a new falling emoji
  const spawnEmoji = useCallback(() => {
    if (!isGameActive) return;
    
    // Random emoji
    const randomEmoji = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
    // Random x position (5-95% of screen width)
    const randomX = 5 + Math.random() * 90;
    // Speed increases with level
    const speed = 5 - (level * 0.5) + Math.random() * 2;
    // Spawn at top of screen
    const newEmoji = {
      id: Date.now(),
      emoji: randomEmoji,
      speed: Math.max(speed, 1), // Minimum speed of 1 second
      position: { x: randomX, y: 0 }
    };
    
    setFallingEmojis(prev => [...prev, newEmoji]);
  }, [isGameActive, level]);

  // Game tick - spawn emojis at intervals
  useEffect(() => {
    if (!isGameActive) return;

    // Spawn rate gets faster with level
    const spawnRate = Math.max(2000 - (level * 150), 500);
    const intervalId = setInterval(spawnEmoji, spawnRate);
    
    return () => clearInterval(intervalId);
  }, [isGameActive, level, spawnEmoji]);

  // Handle emoji miss
  const missEmoji = useCallback(() => {
    setLives(prev => prev - 1);
    toast.error("Missed an emoji!", { duration: 1000 });
    
    if (lives <= 1) {
      endGame();
    }
  }, [lives, endGame]);

  // Handle drag start
  const handleDragStart = useCallback((emoji: string) => {
    setDraggedEmoji(emoji);
  }, []);

  // Handle drop on Munchi
  const handleDrop = useCallback((emoji: string) => {
    setDraggedEmoji(null);
    feedMunchi(emoji);
    
    // Remove the dropped emoji from falling emojis
    setFallingEmojis(prev => 
      prev.filter(e => !(e.emoji === emoji))
    );
  }, [feedMunchi]);
  
  // Remove emoji when it falls off screen - update this to accept a string parameter
  const removeEmoji = useCallback((emoji: string) => {
    setFallingEmojis(prev => prev.filter(e => e.emoji !== emoji));
    missEmoji();
  }, [missEmoji]);
  
  return {
    isGameActive,
    score,
    lives,
    level,
    mood,
    moodHistory,
    fallingEmojis,
    draggedEmoji,
    startGame,
    endGame,
    feedMunchi,
    handleDragStart,
    handleDrop,
    removeEmoji
  };
};
