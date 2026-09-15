import { useEffect, useState } from 'react';

export default function MatchScoreRing({ score = 0, size = 120, strokeWidth = 10, color = '#ff8000', trackColor = 'rgba(255,255,255,0.08)', sub, labelClassName }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 60);
    return () => clearTimeout(t);
  }, []);

  const clamped = Math.max(0, Math.min(100, score));
  const r = size / 2 - strokeWidth / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - (animated ? clamped : 0) / 100);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1200ms ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={labelClassName || 'font-body text-3xl font-bold text-white'}>{clamped}</span>
        {sub && <span className="font-body text-[11px] text-white/50 mt-0.5">{sub}</span>}
      </div>
    </div>
  );
}
