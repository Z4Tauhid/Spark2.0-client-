export const AXES = [
  { key: 'hardSkills',   label: 'Hard Skills',   color: '#ff8000' },
  { key: 'softSkills',   label: 'Soft Skills',   color: '#8b5cf6' },
  { key: 'domain',       label: 'Domain',        color: '#10b981' },
  { key: 'languages',    label: 'Languages',     color: '#f59e0b' },
  { key: 'availability', label: 'Availability',  color: '#06b6d4' },
  { key: 'trajectory',   label: 'Trajectory',    color: '#ec4899' },
  { key: 'valuesFit',    label: 'Values Fit',    color: '#84cc16' },
];

export const AXIS_KEYS = AXES.map(a => a.key);

export function averageVector(vector) {
  if (!vector) return 0;
  const sum = AXIS_KEYS.reduce((s, k) => s + (vector[k] ?? 0), 0);
  return Math.round(sum / AXIS_KEYS.length);
}
