
import { useEffect, useRef } from 'react';
import { FallingEmojiProps } from '../../types/game';

const FallingEmoji = ({ id, emoji, speed, position, onDragStart, onDrop }: FallingEmojiProps) => {
  const emojiRef = useRef<HTMLDivElement>(null);
  
  // Handle drag start of emoji
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('emoji', emoji);
    onDragStart(emoji);
  };
  
  // Check if emoji has fallen off screen
  useEffect(() => {
    const checkPosition = () => {
      const element = emojiRef.current;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        onDrop(emoji); // Now passing emoji string instead of id
      }
    };
    
    // Set the fall animation time
    if (emojiRef.current) {
      emojiRef.current.style.setProperty('--fall-speed', `${speed}s`);
    }
    
    const timer = setTimeout(checkPosition, speed * 1000);
    return () => clearTimeout(timer);
  }, [emoji, speed, onDrop]);

  return (
    <div
      ref={emojiRef}
      className="absolute emoji animate-emoji-fall select-none" 
      style={{ 
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      draggable
      onDragStart={handleDragStart}
    >
      {emoji}
    </div>
  );
};

export default FallingEmoji;
