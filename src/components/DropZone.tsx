import { useState, useCallback } from 'react';
import type { Zone } from '@/data/gameData';

interface DropZoneProps {
  zone: Zone;
  onDrop: (itemId: string, zone: Zone) => void;
  placedCount: number;
}

const zoneConfig = {
  ocean: { emoji: '🌊', label: 'Ocean', sublabel: 'Life Below Water', glassClass: 'glass-ocean' },
  forest: { emoji: '🌱', label: 'Forest', sublabel: 'Life on Land', glassClass: 'glass-forest' },
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
      className={`${config.glassClass} rounded-2xl p-6 flex flex-col items-center justify-center gap-2 min-h-[200px] transition-all duration-300 relative ${
        isOver ? 'drop-hover scale-105 ring-2 ring-foreground/20' : ''
      }`}
    >
      <span className={`text-5xl md:text-7xl transition-transform duration-300 ${isOver ? 'scale-125' : ''}`}>
        {config.emoji}
      </span>
      <span className="font-display font-bold text-xl text-foreground">
        {config.label}
      </span>
      <span className="text-xs text-muted-foreground font-body">
        {config.sublabel}
      </span>
      {placedCount > 0 && (
        <div className="glass rounded-full px-3 py-1 text-sm font-body text-muted-foreground mt-1">
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
