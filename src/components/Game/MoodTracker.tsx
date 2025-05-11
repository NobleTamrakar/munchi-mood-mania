
import { MoodType } from '../../types/game';

interface MoodTrackerProps {
  moodHistory: MoodType[];
  currentMood: MoodType;
}

const MoodTracker = ({ moodHistory, currentMood }: MoodTrackerProps) => {
  // Get the last 5 moods
  const recentMoods = [...moodHistory].reverse().slice(0, 5);
  
  // Mood emoji mapping
  const moodEmojis: Record<MoodType, string> = {
    neutral: '😐',
    happy: '😊',
    angry: '😡',
    sad: '😢',
    sleepy: '😴',
    love: '😍'
  };

  return (
    <div className="absolute bottom-4 left-4 p-3 neon-border bg-black/50 backdrop-blur-sm">
      <div className="text-xs text-game-neon font-orbitron mb-1">MOOD TRACKER</div>
      
      <div className="flex space-x-2">
        {recentMoods.length > 0 ? (
          recentMoods.map((mood, index) => (
            <div 
              key={index} 
              className="text-2xl transition-all duration-300 hover:scale-125"
              title={mood}
            >
              {moodEmojis[mood]}
            </div>
          ))
        ) : (
          <div className="text-xs text-gray-400 italic">No moods yet</div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-game-white">
        Current: <span className="text-game-neon">{currentMood}</span>
      </div>
    </div>
  );
};

export default MoodTracker;
