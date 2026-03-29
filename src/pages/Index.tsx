import { useState, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { type GameItem, type Zone, levels } from '@/data/gameData';
import AnimatedBackground from '@/components/AnimatedBackground';
import GameHeader from '@/components/GameHeader';
import GameCard from '@/components/GameCard';
import DropZone from '@/components/DropZone';
import FeedbackOverlay from '@/components/FeedbackOverlay';
import LevelComplete from '@/components/LevelComplete';

const Index = () => {
  const { state, currentLevelData, remainingItems, placeItem, nextLevel, restartLevel, restartGame, allBadges } = useGameState();
  const [draggedItem, setDraggedItem] = useState<GameItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<GameItem | null>(null);

  const handleDragStart = useCallback((item: GameItem) => {
    setDraggedItem(item);
  }, []);

  const handleDrop = useCallback((itemId: string, zone: Zone) => {
    placeItem(itemId, zone);
    setDraggedItem(null);
  }, [placeItem]);

  // Touch-based: tap card then tap zone
  const handleCardTap = useCallback((item: GameItem) => {
    setSelectedItem(prev => prev?.id === item.id ? null : item);
  }, []);

  const handleZoneTap = useCallback((zone: Zone) => {
    if (selectedItem) {
      placeItem(selectedItem.id, zone);
      setSelectedItem(null);
    }
  }, [selectedItem, placeItem]);

  const placedByZone = (zone: Zone) =>
    currentLevelData.items.filter(i => state.placedItems[i.id] === zone).length;

  const progress = Object.keys(state.placedItems).length / currentLevelData.items.length;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <AnimatedBackground />

      <GameHeader
        chocoCoins={state.chocoCoins}
        mistakes={state.mistakes}
        level={currentLevelData}
        completedLevels={state.completedLevels}
        timeRemaining={state.timeRemaining}
        earnedBadges={state.earnedBadges}
      />

      {/* Progress bar */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-4">
        <div className="glass rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-center font-body">
          {Object.keys(state.placedItems).length} / {currentLevelData.items.length} sorted
        </p>
      </div>

      {/* Instructions */}
      {selectedItem && (
        <div className="text-center mb-2 animate-bounce-in">
          <p className="glass rounded-full inline-block px-4 py-1 text-sm font-body text-foreground">
            Now tap a zone to place <strong>{selectedItem.emoji} {selectedItem.name}</strong>
          </p>
        </div>
      )}

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pb-8 flex flex-col gap-6">
        {/* Drop Zones */}
        <div className="grid grid-cols-3 gap-4">
          {(['ocean', 'forest', 'recycle'] as Zone[]).map(zone => (
            <div key={zone} onClick={() => handleZoneTap(zone)}>
              <DropZone zone={zone} onDrop={handleDrop} placedCount={placedByZone(zone)} />
            </div>
          ))}
        </div>

        {/* Draggable Cards */}
        <div>
          <p className="text-center text-sm text-muted-foreground mb-3 font-body">
            {remainingItems.length > 0 ? '👆 Drag each item to the correct zone!' : '✅ All items sorted!'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {remainingItems.map(item => (
              <div key={item.id} onClick={() => handleCardTap(item)}>
                <div className={selectedItem?.id === item.id ? 'ring-2 ring-primary rounded-lg' : ''}>
                  <GameCard item={item} onDragStart={handleDragStart} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restart button */}
        <div className="text-center">
          <button
            onClick={restartLevel}
            className="glass rounded-xl px-4 py-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            🔄 Restart Level
          </button>
        </div>
      </main>

      {/* Feedback */}
      {state.feedback && (
        <FeedbackOverlay
          type={state.feedback.type}
          message={state.feedback.message}
          emoji={state.feedback.item.emoji}
        />
      )}

      {/* Level Complete */}
      {state.showLevelComplete && (
        <LevelComplete
          level={state.currentLevel}
          stars={state.stars}
          chocoCoins={state.chocoCoins}
          mistakes={state.mistakes}
          earnedBadges={state.earnedBadges}
          isLastLevel={state.currentLevel === levels.length}
          onNext={nextLevel}
          onRestart={restartLevel}
          onRestartGame={restartGame}
        />
      )}
    </div>
  );
};

export default Index;
