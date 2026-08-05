import React from 'react';

/**
 * Ring chart + legend, shared by the Overview, Income, and Expense views.
 * `segments` come from utils/donut.js's buildDonutSegments().
 */
export default function DonutChart({ segments, size = 150 }) {
  return (
    <>
      <svg width={size} height={size} viewBox="0 0 160 160" style={{ flex: 'none' }}>
        <circle cx="80" cy="80" r="70" fill="none" stroke="var(--color-divider)" strokeWidth="22"></circle>
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx="80" cy="80" r="70" fill="none"
            stroke={seg.color}
            strokeWidth="22"
            strokeDasharray={seg.dasharray}
            strokeDashoffset={seg.dashoffset}
            transform="rotate(-90 80 80)"
          ></circle>
        ))}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: seg.color, flex: 'none' }}></span>
            <span style={{ flex: 1 }}>{seg.label}</span>
            <span style={{ color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>{seg.displayValue} · {seg.pct}%</span>
          </div>
        ))}
      </div>
    </>
  );
}
