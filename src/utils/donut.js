export function buildDonutSegments(items, radius) {
  const circumference = 2 * Math.PI * radius;
  const total = items.reduce((s, i) => s + i.value, 0);
  let cumulative = 0;
  return items.filter(i => i.value > 0.004).map(i => {
    const frac = total > 0 ? i.value / total : 0;
    const len = frac * circumference;
    const seg = {
      label: i.label,
      color: i.color,
      dasharray: len.toFixed(2) + ' ' + Math.max(circumference - len, 0).toFixed(2),
      dashoffset: (-cumulative).toFixed(2),
      pct: Math.round(frac * 100),
      displayValue: i.displayValue,
    };
    cumulative += len;
    return seg;
  });
}
