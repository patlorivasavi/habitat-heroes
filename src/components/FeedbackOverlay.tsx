interface FeedbackOverlayProps {
  type: 'correct' | 'incorrect';
  message: string;
  emoji: string;
}

const FeedbackOverlay = ({ type, message, emoji }: FeedbackOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className={`glass rounded-2xl p-8 max-w-md mx-4 animate-bounce-in text-center pointer-events-auto ${
        type === 'correct' ? 'border-secondary/50 shadow-[0_0_40px_hsl(var(--secondary)/0.3)]' : 'border-destructive/50 shadow-[0_0_40px_hsl(var(--destructive)/0.3)]'
      }`}>
        <span className="text-6xl block mb-4">{type === 'correct' ? '🎉' : '😅'}</span>
        <span className="text-4xl block mb-3">{emoji}</span>
        <p className={`font-display font-bold text-xl mb-2 ${type === 'correct' ? 'text-secondary' : 'text-destructive'}`}>
          {type === 'correct' ? '+10 Choco Coins! 🍫' : '-5 Choco Coins'}
        </p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {message}
        </p>
      </div>

      {type === 'correct' && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti text-2xl"
              style={{
                left: `${40 + Math.random() * 20}%`,
                top: '50%',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {['🍫', '⭐', '✨', '🎉'][i % 4]}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeedbackOverlay;
