
import { useEffect } from 'react';
import GameScreen from '@/components/Game/GameScreen';

const Index = () => {
  // Set title and meta
  useEffect(() => {
    document.title = "MoodMunch - Feed the Emotional Blob!";
  }, []);

  return (
    <div className="min-h-screen bg-game-black text-game-white font-montserrat overflow-hidden">
      <GameScreen />
    </div>
  );
};

export default Index;
