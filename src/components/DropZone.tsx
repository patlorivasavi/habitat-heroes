import { useState, useCallback } from 'react';
import type { Zone } from '@/data/gameData';

interface DropZoneProps {
  zone: Zone;
  onDrop: (itemId: string, zone: Zone) => void;
  placedCount: number;
}

const zoneConfig = {
  ocean: { emoji: '🌊', label: 'Ocean', glassClass: 'glass-ocean', gradient: 'from-[hsl(199,89%,48%/0.1)] to-[hsl(210,80%,25%/0.1)]' },
  forest: { emoji: '🌱', label: 'Forest', glassClass: 'glass-forest', gradient: 'from-[hsl(142,71%,45%/0.1)] to-[hsl(150,60%,20%/0.1)]' },
  recycle: { emoji: '♻️', label: 'Recycle', glassClass: 'glass-recycle', gradient: 'from-[hsl(45,93%,58%/0.1)] to-[hsl(30,70%,35%/0.1)]' },
};

const DropZone = ({ zone, onDrop, placedCount }: DropZoneProps) => {
  const [isOver, setIsOver] = useState(false);
  const config = zoneConfig[zone];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsOver(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) onDrop(itemId, zone);
  }, [onDrop, zone]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${config.glassClass} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 min-h-[180px] transition-all duration-300 ${
        isOver ? 'drop-hover scale-105 ring-2 ring-foreground/20' : ''
      }`}
    >
      <span className={`text-5xl md:text-6xl transition-transform duration-300 ${isOver ? 'scale-125' : ''}`}>
        {config.emoji}
      </span>
      <span className="font-display font-bold text-lg text-foreground">
        {config.label}
      </span>
      {placedCount > 0 && (
        <div className="glass rounded-full px-3 py-1 text-sm font-body text-muted-foreground">
          {placedCount} sorted
        </div>
      )}
      {isOver && (
        <div className="absolute inset-0 rounded-2xl bg-foreground/5 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

export default DropZone;
