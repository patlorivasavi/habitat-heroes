import { useRef } from 'react';
import type { GameItem } from '@/data/gameData';

interface GameCardProps {
  item: GameItem;
  onDragStart: (item: GameItem) => void;
}

const GameCard = ({ item, onDragStart }: GameCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(item);
    if (cardRef.current) cardRef.current.classList.add('dragging');
  };

  const handleDragEnd = () => {
    if (cardRef.current) cardRef.current.classList.remove('dragging');
  };

  // Touch support
  const handleTouchStart = () => {
    onDragStart(item);
  };

  return (
    <div
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      className="glass-card p-4 flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing select-none animate-bounce-in min-w-[100px]"
    >
      <span className="text-4xl md:text-5xl drop-shadow-lg">{item.emoji}</span>
      <span className="font-display font-semibold text-sm text-foreground text-center leading-tight">
        {item.name}
      </span>
    </div>
  );
};

export default GameCard;
