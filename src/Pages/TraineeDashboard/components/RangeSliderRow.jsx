export default function RangeSliderRow({ label, value, onChange, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 gap-3">
        <span className="font-body text-sm font-semibold text-white flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span className="truncate">{label}</span>
        </span>
        <span className="font-body text-sm font-bold flex-shrink-0" style={{ color }}>{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="range-slider w-full h-2 appearance-none rounded-full outline-none cursor-pointer"
        style={{ background: `linear-gradient(to right, ${color} ${value}%, rgba(255,255,255,0.15) ${value}%)` }}
      />
    </div>
  );
}
