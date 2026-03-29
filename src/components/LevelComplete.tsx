import { badges } from '@/data/gameData';
import { levels } from '@/data/gameData';

interface LevelCompleteProps {
  level: number;
  stars: number;
  chocoCoins: number;
  mistakes: number;
  earnedBadges: string[];
  isLastLevel: boolean;
  onNext: () => void;
  onRestart: () => void;
  onRestartGame: () => void;
}

const LevelComplete = ({ level, stars, chocoCoins, mistakes, earnedBadges, isLastLevel, onNext, onRestart, onRestartGame }: LevelCompleteProps) => {
  const levelData = levels.find(l => l.id === level)!;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
      <div className="glass rounded-3xl p-8 max-w-md mx-4 text-center animate-bounce-in">
        <h2 className="font-display text-3xl font-bold text-foreground mb-2">
          {isLastLevel ? '🏆 Game Complete!' : '🎉 Level Complete!'}
        </h2>
        <p className="text-muted-foreground font-body mb-4">{levelData.name}</p>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map(i => (
            <span
              key={i}
              className={`text-4xl transition-all duration-500 ${
                i <= stars ? 'scale-110 drop-shadow-[0_0_8px_hsl(var(--accent))]' : 'opacity-30 grayscale'
              }`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="glass rounded-xl p-3">
            <span className="text-2xl">🍫</span>
            <p className="font-display font-bold text-lg text-foreground">{chocoCoins}</p>
            <p className="text-xs text-muted-foreground">Choco Coins</p>
          </div>
          <div className="glass rounded-xl p-3">
            <span className="text-2xl">❌</span>
            <p className="font-display font-bold text-lg text-foreground">{mistakes}</p>
            <p className="text-xs text-muted-foreground">Mistakes</p>
          </div>
        </div>

        {/* New badges */}
        {earnedBadges.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Badges Earned:</p>
            <div className="flex justify-center gap-3">
              {earnedBadges.map(bId => {
                const badge = badges.find(b => b.id === bId);
                return badge ? (
                  <div key={bId} className="glass rounded-xl p-3 text-center">
                    <span className="text-3xl">{badge.emoji}</span>
                    <p className="text-xs font-display font-semibold text-foreground mt-1">{badge.name}</p>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Fun fact */}
        <div className="glass rounded-xl p-3 mb-6 text-left">
          <p className="text-xs font-bold text-accent mb-1">💡 Did You Know?</p>
          <p className="text-xs text-muted-foreground">
            {level === 1 && "Over 80% of the ocean remains unexplored and unmapped!"}
            {level === 2 && "Forests cover about 31% of Earth's land surface!"}
            {level === 3 && "8 million tons of plastic enter the ocean every year!"}
            {level === 4 && "One tree can absorb 48 pounds of CO2 per year!"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onRestart}
            className="glass rounded-xl px-5 py-3 font-display font-semibold text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            🔄 Replay
          </button>
          {!isLastLevel ? (
            <button
              onClick={onNext}
              className="choco-badge rounded-xl px-6 py-3 font-display font-bold text-sm text-accent-foreground hover:scale-105 transition-transform"
            >
              Next Level ➡️
            </button>
          ) : (
            <button
              onClick={onRestartGame}
              className="choco-badge rounded-xl px-6 py-3 font-display font-bold text-sm text-accent-foreground hover:scale-105 transition-transform"
            >
              🏠 Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelComplete;
