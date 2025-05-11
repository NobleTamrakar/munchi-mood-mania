
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GameOverModalProps {
  score: number;
  highScore: number;
  onClose: () => void;
  onRestart: () => void;
}

const GameOverModal = ({ score, highScore, onClose, onRestart }: GameOverModalProps) => {
  const isNewHighScore = score >= highScore;
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-black border-2 border-game-neon shadow-[0_0_15px_#39FF14] p-6 max-w-md w-full text-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-orbitron text-game-red">
            Game Over
          </h2>
          
          <div className="py-6">
            <p className="text-2xl text-game-white">
              Final Score: <span className="text-game-neon">{score}</span>
            </p>
            
            <p className="text-lg mt-2 text-gray-400">
              High Score: <span className={`${isNewHighScore ? 'text-game-neon' : 'text-gray-300'}`}>
                {highScore}
              </span>
              {isNewHighScore && ' 🎉'}
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={onRestart}
              className="bg-transparent border-2 border-game-neon text-game-neon hover:bg-game-neon hover:text-black transition-all"
            >
              Play Again
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-800"
            >
              Back to Menu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverModal;
