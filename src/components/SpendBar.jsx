import React from 'react';

/**
 * A slim proportion ruler — one segment per category, width by share of the
 * total. Replaces the ring chart across the app: more legible at any size,
 * and it reads as a measure rather than a decoration.
 * `items`: [{ label, color, value }]
 */
export default function SpendBar({ items }) {
  const total = items.reduce((s, c) => s + (c.value || 0), 0) || 1;
  if (items.length < 2) return null;
  return (
    <div className="ov-bar" role="img" aria-label="Share of the total by category">
      {items.map((c) => (
        <span key={c.label} className="ov-bar-seg" style={{ flexGrow: (c.value || 0) / total, background: c.color }} />
      ))}
    </div>
  );
}
