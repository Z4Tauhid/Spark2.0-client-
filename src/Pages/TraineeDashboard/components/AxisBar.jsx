export default function AxisBar({ label, value, color, target, rightLabel }) {
  const clamped = Math.max(0, Math.min(100, value ?? 0));
  const met = rightLabel?.startsWith('✓');

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 gap-3">
        <span className="font-body text-sm font-semibold text-white flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span className="truncate">{label}</span>
        </span>
        <span className="font-body text-sm font-bold flex-shrink-0 whitespace-nowrap" style={{ color }}>
          {target != null ? (
            <>
              {clamped} <span className="text-white/30">&rarr;</span> {target}
              {rightLabel && (
                <span className="ml-2 text-xs font-semibold" style={{ color: met ? '#10b981' : color }}>
                  {rightLabel}
                </span>
              )}
            </>
          ) : (
            clamped
          )}
        </span>
      </div>
      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${clamped}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
