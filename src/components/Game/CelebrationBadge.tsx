
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface CelebrationBadgeProps {
  isNewHighScore: boolean;
  isLevelUp: boolean;
}

const CelebrationBadge = ({ isNewHighScore, isLevelUp }: CelebrationBadgeProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isNewHighScore || isLevelUp) {
      setVisible(true);
      
      // Hide after 3 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isNewHighScore, isLevelUp]);
  
  if (!visible) return null;
  
  return (
    <div className="absolute top-16 left-0 right-0 flex justify-center z-50">
      <Badge 
        className={`
          text-lg px-4 py-2 bg-transparent border-2 border-game-neon
          shadow-[0_0_10px_#39FF14,0_0_20px_#39FF14]
          font-orbitron text-white 
          animate-fade-in
        `}
      >
        {isNewHighScore ? '🎉 New High Score!' : isLevelUp ? '🔥 Level Up!' : ''}
      </Badge>
    </div>
  );
};

export default CelebrationBadge;
