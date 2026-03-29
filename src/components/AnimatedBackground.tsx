const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,80%,8%)] via-[hsl(200,70%,12%)] to-[hsl(160,50%,10%)]" />

      {/* Ocean side */}
      <div className="absolute left-0 top-0 w-1/2 h-full opacity-30">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[hsl(199,89%,30%)] to-transparent animate-wave" />
        <div className="absolute bottom-10 left-10 text-6xl animate-float opacity-20">🌊</div>
        <div className="absolute bottom-32 left-32 text-4xl animate-float opacity-15" style={{ animationDelay: '1s' }}>🐠</div>
        <div className="absolute bottom-20 left-[60%] text-5xl animate-float opacity-15" style={{ animationDelay: '2s' }}>🐬</div>
      </div>

      {/* Forest side */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[hsl(142,50%,15%)] to-transparent" />
        <div className="absolute bottom-10 right-10 text-6xl animate-float opacity-20" style={{ animationDelay: '0.5s' }}>🌳</div>
        <div className="absolute bottom-40 right-32 text-4xl animate-float opacity-15" style={{ animationDelay: '1.5s' }}>🦋</div>
        <div className="absolute bottom-20 right-[60%] text-5xl animate-float opacity-15" style={{ animationDelay: '2.5s' }}>🌿</div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-foreground/5 animate-float"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
