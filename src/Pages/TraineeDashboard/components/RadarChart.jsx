import { useEffect, useState } from 'react';
import { AXES as DEFAULT_AXES } from '../data/axes';

function polarPoint(angleDeg, r, cx, cy) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const GRID_LEVELS = [0.25, 0.5, 0.75, 1];

export default function RadarChart({ size = 340, datasets, showLegend = false, axes = DEFAULT_AXES }) {
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGrown(true), 60);
    return () => clearTimeout(t);
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 50;
  const n = axes.length;
  const angleStep = 360 / n;
  const axisAngles = axes.map((_, i) => -90 + i * angleStep);

  const polygonPoints = (values) =>
    axes
      .map((a, i) => {
        const v = Math.max(0, Math.min(100, values?.[a.key] ?? 0));
        const p = polarPoint(axisAngles[i], (v / 100) * radius, cx, cy);
        return `${p.x},${p.y}`;
      })
      .join(' ');

  return (
    <div className="w-full max-w-[340px] mx-auto">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto overflow-visible">
        {/* grid heptagons */}
        {GRID_LEVELS.map(lvl => (
          <polygon
            key={lvl}
            points={axes.map((_, i) => {
              const p = polarPoint(axisAngles[i], radius * lvl, cx, cy);
              return `${p.x},${p.y}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        ))}

        {/* spokes */}
        {axes.map((a, i) => {
          const p = polarPoint(axisAngles[i], radius, cx, cy);
          return <line key={a.key} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />;
        })}

        {/* axis labels */}
        {axes.map((a, i) => {
          const p = polarPoint(axisAngles[i], radius + 22, cx, cy);
          return (
            <text
              key={a.key}
              x={p.x}
              y={p.y}
              fill="rgba(255,255,255,0.5)"
              fontSize="9.5"
              fontFamily="Montserrat, system-ui, sans-serif"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {a.label.toUpperCase()}
            </text>
          );
        })}

        {/* datasets — wrapped in a group that grows from the chart's center on mount */}
        {datasets.map(ds => (
          <g
            key={ds.key}
            style={{
              transform: `translate(${cx}px, ${cy}px) scale(${grown ? 1 : 0}) translate(${-cx}px, ${-cy}px)`,
              transition: 'transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <polygon
              points={polygonPoints(ds.values)}
              fill={ds.color}
              fillOpacity={ds.fillOpacity ?? 0.2}
              stroke={ds.color}
              strokeWidth={ds.strokeWidth ?? 2}
              strokeDasharray={ds.dashed ? '6 4' : undefined}
              strokeLinejoin="round"
            />
            {!ds.dashed && axes.map((a, i) => {
              const v = Math.max(0, Math.min(100, ds.values?.[a.key] ?? 0));
              const p = polarPoint(axisAngles[i], (v / 100) * radius, cx, cy);
              return <circle key={a.key} cx={p.x} cy={p.y} r={3.5} fill={ds.color} />;
            })}
          </g>
        ))}
      </svg>

      {showLegend && (
        <div className="flex items-center justify-center gap-6 mt-3">
          {datasets.map(ds => (
            <div key={ds.key} className="flex items-center gap-2">
              <span
                className="inline-block w-4"
                style={{ borderTop: `2px ${ds.dashed ? 'dashed' : 'solid'} ${ds.color}` }}
              />
              <span className="font-body text-xs text-white/60">{ds.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
