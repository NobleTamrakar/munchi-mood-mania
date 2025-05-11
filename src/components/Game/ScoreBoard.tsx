
import { Heart } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  level: number;
  lives: number;
}

const ScoreBoard = ({ score, level, lives }: ScoreBoardProps) => {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-center px-4 py-2 neon-border bg-black/50 backdrop-blur-sm font-orbitron">
      <div className="flex items-center space-x-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Heart 
            key={i} 
            className={`h-6 w-6 transition-all duration-300 ${
              i < lives 
                ? 'fill-red-500 text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)] animate-pulse' 
                : 'text-gray-700 fill-gray-700/20'
            }`}
          />
        ))}
      </div>
      
      <div className="text-xl text-game-neon">
        LVL {level}
      </div>
      
      <div className="flex items-center">
        <span className="text-xl text-game-white">Score:</span>
        <span className="text-2xl ml-2 text-game-neon">{score}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
