
import { useState, useEffect } from 'react';
import { MoodType } from '../../types/game';

interface MunchiProps {
  mood: MoodType;
  onDrop: (emoji: string) => void;
  draggedEmoji: string | null;
}

const Munchi = ({ mood, onDrop, draggedEmoji }: MunchiProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  
  // Mood configurations
  const moodConfigs = {
    neutral: {
      color: '#aaaaaa',
      eyes: '• •',
      mouth: '‿',
      animation: 'animate-bounce-subtle'
    },
    happy: {
      color: '#39FF14',
      eyes: '^ ^',
      mouth: '‿‿',
      animation: 'animate-bounce-subtle'
    },
    angry: {
      color: '#FF3B3B',
      eyes: '> <',
      mouth: '︿',
      animation: 'animate-shake'
    },
    sad: {
      color: '#4444ff',
      eyes: '• •',
      mouth: '︵',
      animation: ''
    },
    sleepy: {
      color: '#aa44ff',
      eyes: '- -',
      mouth: '⋯',
      animation: ''
    },
    love: {
      color: '#ff44aa',
      eyes: '♥ ♥',
      mouth: '‿',
      animation: 'animate-pulse'
    }
  };

  const currentMood = moodConfigs[mood];

  // Make Munchi periodically open its mouth
  useEffect(() => {
    if (mood !== 'sleepy') {
      const intervalId = setInterval(() => {
        setIsOpen(prev => !prev);
        
        // Close mouth after a short time
        if (!isOpen) {
          setTimeout(() => {
            setIsOpen(false);
          }, 500);
        }
      }, 3000);
      
      return () => clearInterval(intervalId);
    }
  }, [mood, isOpen]);

  // When dragged emoji is over Munchi
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropZoneActive(true);
    setIsOpen(true);
  };

  // When dragged emoji leaves Munchi
  const handleDragLeave = () => {
    setIsDropZoneActive(false);
    setIsOpen(false);
  };

  // When emoji is dropped on Munchi
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropZoneActive(false);
    
    // Get the dragged emoji data
    const emoji = draggedEmoji;
    if (emoji) {
      onDrop(emoji);
      
      // Animation for eating
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drop zone highlight */}
      {isDropZoneActive && (
        <div className="absolute w-40 h-40 rounded-full opacity-30 bg-game-neon animate-pulse-neon" />
      )}
      
      {/* Munchi character */}
      <div 
        className={`relative w-32 h-32 rounded-full transition-all duration-300 ${currentMood.animation}`} 
        style={{ backgroundColor: currentMood.color }}
      >
        {/* Eyes */}
        <div className="absolute top-1/4 left-0 right-0 flex justify-center space-x-8 text-black font-bold text-2xl">
          <span>{currentMood.eyes.split(' ')[0]}</span>
          <span>{currentMood.eyes.split(' ')[1]}</span>
        </div>
        
        {/* Mouth */}
        <div 
          className={`absolute bottom-1/4 left-0 right-0 text-center text-3xl text-black transition-all duration-300 ${isOpen ? 'scale-y-[3] translate-y-1' : ''}`}
        >
          {isOpen ? 'O' : currentMood.mouth}
        </div>
      </div>
      
      {/* Munchi name */}
      <div className="mt-4 font-orbitron font-bold text-xl neon-text">
        Munchi
      </div>
    </div>
  );
};

export default Munchi;
