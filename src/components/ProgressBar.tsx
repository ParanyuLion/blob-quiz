'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full px-1">
      <div className="flex items-center justify-between mb-2">
        <span className="font-display text-sm text-pink-400 tracking-wide">
          ข้อ {current} / {total}
        </span>
        <span className="font-body text-xs text-gray-400 font-semibold">{pct}%</span>
      </div>

      <div className="relative h-4 bg-pink-100 rounded-full overflow-hidden shadow-inner">
        {/* Animated fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #FFB3C6 0%, #FF85A2 50%, #FF5C8D 100%)',
          }}
        />
        {/* Shine overlay */}
        <div
          className="absolute inset-y-0 left-0 rounded-full opacity-40"
          style={{
            width: `${pct}%`,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
        {/* Dot markers */}
        <div className="absolute inset-0 flex items-center justify-around px-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i < current ? 'bg-white/80 scale-100' : 'bg-pink-200 scale-75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
