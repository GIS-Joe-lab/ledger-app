import React from 'react';
import DonutChart from './DonutChart.jsx';

export default function OverviewView({ monthLabel, netDisplay, netColor, overallHasData, overallDonut }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-6)' }}>
      <div className="ledger-net-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-8) calc(var(--space-8) * 2)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', maxWidth: '100%' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)', textAlign: 'center' }}>Net balance · {monthLabel}</div>
        <div className="ledger-net-value" style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', fontSize: 68, letterSpacing: '-0.02em', color: netColor }}>{netDisplay}</div>
        <div style={{ fontSize: 14, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>Income minus expenses this month</div>
      </div>
      {overallHasData && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>Income vs expenses</div>
          <DonutChart segments={overallDonut} />
        </div>
      )}
    </div>
  );
}
