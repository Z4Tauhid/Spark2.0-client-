import { AXIS_KEYS } from '../data/axes';

export function computeMatchPct(userVector, requirement) {
  if (!userVector || !requirement) return 0;
  const gaps = AXIS_KEYS.map(k => Math.abs((userVector[k] ?? 0) - (requirement[k] ?? 0)));
  const avgGap = gaps.reduce((s, g) => s + g, 0) / gaps.length;
  return Math.max(0, Math.min(100, Math.round(100 - avgGap)));
}

// Positive = still short of the target; 0 or negative = requirement met.
export function computeGap(userVector, requirement, key) {
  return (requirement[key] ?? 0) - (userVector[key] ?? 0);
}

export function biggestGapAxis(userVector, requirement, axes) {
  let worst = null;
  let worstGap = -Infinity;
  for (const axis of axes) {
    const gap = computeGap(userVector, requirement, axis.key);
    if (gap > worstGap) {
      worstGap = gap;
      worst = axis;
    }
  }
  return worst;
}
