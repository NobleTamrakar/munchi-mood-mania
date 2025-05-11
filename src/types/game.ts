
export type MoodType = 'neutral' | 'happy' | 'angry' | 'sad' | 'sleepy' | 'love';

export interface EmojiFood {
  emoji: string;
  resultMood: MoodType;
}

export interface FallingEmojiProps {
  id: number;
  emoji: string;
  speed: number;
  position: { x: number, y: number };
  onDragStart: (emoji: string) => void;
  onDrop: (emoji: string) => void;
}

export interface MoodConfig {
  color: string;
  eyes: string;
  mouth: string;
  animation: string;
}
