
import { useGameLogic } from '../../hooks/useGameLogic';
import { useState, useEffect } from 'react';
import Munchi from './Munchi';
import FallingEmoji from './FallingEmoji';
import ScoreBoard from './ScoreBoard';
import MoodTracker from './MoodTracker';
import TutorialOverlay from './TutorialOverlay';
import { Button } from '@/components/ui/button';

const GameScreen = () => {
  const {
    isGameActive,
    score,
    lives,
    level,
    mood,
    moodHistory,
    fallingEmojis,
    draggedEmoji,
    startGame,
    handleDragStart,
    handleDrop,
    removeEmoji,
  } = useGameLogic();

  // Tutorial state
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Check if this is the first visit
  useEffect(() => {
    const tutorialSeen = localStorage.getItem('moodmunch-tutorial-seen');
    if (!tutorialSeen && !isGameActive) {
      setShowTutorial(true);
    }
  }, [isGameActive]);
  
  // Handle tutorial completion
  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('moodmunch-tutorial-seen', 'true');
  };
  
  // Handle tutorial skip
  const handleTutorialSkip = () => {
    setShowTutorial(false);
  };
  
  // Start game with tutorial button
  const handleStartGameWithTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <div className="game-container relative">
      {/* Tutorial overlay */}
      {showTutorial && (
        <TutorialOverlay 
          onClose={handleTutorialComplete}
          onSkip={handleTutorialSkip}
        />
      )}
    
      {/* Game area - show only when game is active */}
      {isGameActive ? (
        <>
          <ScoreBoard score={score} level={level} lives={lives} />
          
          {/* Falling emojis */}
          <div className="relative h-full w-full">
            {fallingEmojis.map((emoji) => (
              <FallingEmoji
                key={emoji.id}
                id={emoji.id}
                emoji={emoji.emoji}
                speed={emoji.speed}
                position={emoji.position}
                onDragStart={handleDragStart}
                onDrop={removeEmoji}
              />
            ))}
          </div>
          
          {/* Character positioned at bottom */}
          <div className="absolute bottom-20 left-0 right-0 flex justify-center">
            <Munchi 
              mood={mood} 
              onDrop={handleDrop} 
              draggedEmoji={draggedEmoji}
            />
          </div>
          
          {/* Mood tracker */}
          <MoodTracker moodHistory={moodHistory} currentMood={mood} />
        </>
      ) : (
        /* Start screen */
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-5xl font-bold font-orbitron mb-4 neon-text animate-pulse">
            MoodMunch
          </div>
          
          <div className="text-xl mb-10 text-center max-w-md">
            Feed <span className="text-game-neon font-bold">Munchi</span> the right emojis to change its mood!
          </div>
          
          <div className="mb-10 relative w-40 h-40">
            <div className="absolute inset-0 bg-game-neon opacity-10 rounded-full animate-pulse-neon" />
            <Munchi mood="neutral" onDrop={() => {}} draggedEmoji={null} />
          </div>
          
          <div className="text-sm max-w-md text-center mb-8 text-gray-400">
            <p>Drag falling emojis to Munchi's mouth. Different foods create different moods!</p>
            <p className="mt-2">How long can you keep up?</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <Button 
              onClick={startGame}
              className="bg-transparent border-2 border-game-neon text-game-neon hover:bg-game-neon hover:text-black transition-all font-orbitron px-8 py-6 text-xl"
            >
              START GAME
            </Button>
            
            <Button
              onClick={handleStartGameWithTutorial}
              variant="outline"
              className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-800 transition-all font-orbitron"
            >
              HOW TO PLAY
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-12 absolute bottom-2">
            Drag & drop emojis to Munchi. Don't let them fall!
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
