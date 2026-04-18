import { useMemo } from 'react';

export default function StarsBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 0.5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 5}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
}
