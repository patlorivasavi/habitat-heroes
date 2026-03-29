import { type Level } from '@/data/gameData';

interface GameHeaderProps {
  chocoCoins: number;
  mistakes: number;
  level: Level;
  completedLevels: number[];
  timeRemaining: number | null;
  earnedBadges: string[];
}

const GameHeader = ({ chocoCoins, mistakes, level, completedLevels, timeRemaining, earnedBadges }: GameHeaderProps) => {
  return (
    <header className="w-full px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* Title */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌍</span>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground text-glow leading-tight">
              EcoSort
            </h1>
            <p className="text-xs text-muted-foreground">SDG 14 & 15</p>
          </div>
        </div>

        {/* Level info */}
        <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Level {level.id}</span>
          <span className="font-display font-bold text-foreground">{level.name}</span>
          {level.id === 4 && <span className="text-lg">⚡</span>}
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(l => (
            <div
              key={l}
              className={`w-3 h-3 rounded-full transition-all ${
                completedLevels.includes(l)
                  ? 'bg-secondary scale-110 shadow-[0_0_8px_hsl(var(--secondary))]'
                  : l === level.id
                  ? 'bg-primary shadow-[0_0_8px_hsl(var(--primary))]'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Timer */}
        {timeRemaining !== null && (
          <div className={`glass rounded-xl px-4 py-2 font-display font-bold text-lg ${timeRemaining <= 10 ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
            ⏱️ {timeRemaining}s
          </div>
        )}

        {/* Choco Coins */}
        <div className="choco-badge rounded-xl px-5 py-2 flex items-center gap-2 animate-pulse-glow">
          <span className="text-2xl">🍫</span>
          <span className="font-display font-bold text-lg text-accent-foreground">{chocoCoins}</span>
        </div>

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <div className="flex gap-1">
            {earnedBadges.map(b => (
              <span key={b} className="text-xl" title={b}>
                {b === 'ocean-protector' ? '🐋' : b === 'forest-guardian' ? '🦁' : b === 'eco-warrior' ? '♻️' : b === 'speed-hero' ? '⚡' : '🍫'}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default GameHeader;
