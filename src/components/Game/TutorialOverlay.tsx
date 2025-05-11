
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Egg, Pepper, Zzz, Heart, Onion } from 'lucide-react';

interface TutorialOverlayProps {
  onClose: () => void;
  onSkip: () => void;
}

const TutorialOverlay = ({ onClose, onSkip }: TutorialOverlayProps) => {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "Hi! I'm Munchi",
      description: "I get moody — feed me right!",
      icon: <div className="w-20 h-20 mx-auto rounded-full bg-game-neon animate-bounce-subtle" />,
    },
    {
      title: "Drag & Drop",
      description: "Drag the emoji into my mouth before it hits the ground.",
      icon: <div className="flex justify-center space-x-4">
        <div className="text-4xl animate-bounce">🍩</div>
        <div className="text-4xl">👉</div>
        <div className="w-10 h-10 rounded-full bg-game-neon flex items-center justify-center">
          <span className="text-black">O</span>
        </div>
      </div>,
    },
    {
      title: "Mood Changes",
      description: "Each emoji changes my mood. Try these:",
      icon: <div className="grid grid-cols-2 gap-4 px-10">
        <div className="flex items-center">
          <span className="text-2xl mr-2">🍩</span>
          <Egg className="text-game-neon" />
          <span className="ml-2">Happy</span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">🌶️</span>
          <Pepper className="text-game-red" />
          <span className="ml-2">Angry</span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">💤</span>
          <Zzz className="text-purple-500" />
          <span className="ml-2">Sleepy</span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">💌</span>
          <Heart className="text-pink-500" />
          <span className="ml-2">Love</span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">🧅</span>
          <Onion className="text-blue-500" />
          <span className="ml-2">Sad</span>
        </div>
      </div>,
    },
    {
      title: "Keep Me Happy",
      description: "The better you feed me, the longer I stay cheerful!",
      icon: <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-game-neon animate-pulse-neon flex items-center justify-center">
          <span className="text-black text-2xl">^‿^</span>
        </div>
      </div>,
    },
    {
      title: "Let's Go!",
      description: "Beat your last Mood Score!",
      icon: <div className="text-5xl text-center animate-pulse">🎯</div>,
    },
  ];
  
  const currentStep = steps[step];
  
  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="bg-black border-2 border-game-neon shadow-[0_0_15px_#39FF14] p-6 max-w-md w-full text-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-orbitron text-game-neon">
            {currentStep.title}
          </h2>
          
          <div className="py-6">
            {currentStep.icon}
          </div>
          
          <p className="text-lg">
            {currentStep.description}
          </p>
          
          <div className="flex flex-col space-y-2 pt-4">
            <Button 
              onClick={handleNextStep}
              className="bg-transparent border-2 border-game-neon text-game-neon hover:bg-game-neon hover:text-black transition-all"
            >
              {step < steps.length - 1 ? "Next" : "Got It!"}
            </Button>
            
            {step === 0 && (
              <button 
                onClick={onSkip}
                className="text-sm text-gray-400 hover:text-white mt-2"
              >
                Remind me later
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialOverlay;
