import React from 'react';
import DonutChart from './DonutChart.jsx';
import EntryTable from './EntryTable.jsx';
import { PlusIcon } from './icons.jsx';

export default function IncomeView({ totalIncomeDisplay, incomeDonut, incomeEntries, incomeEmpty, incomeHasRows, onAddIncome }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>
        Total income this month: <span style={{ color: 'var(--color-accent-300)', fontWeight: 600 }}>{totalIncomeDisplay}</span>
      </div>
      {incomeHasRows && (
        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
          <DonutChart segments={incomeDonut} size={140} />
        </div>
      )}
      {incomeEmpty && (
        <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', border: '1px dashed var(--color-divider)', borderRadius: 'var(--radius-md)' }}>
          No income entries this month yet.
        </div>
      )}
      {incomeHasRows && <EntryTable entries={incomeEntries} variant="income" />}
      <button className="btn btn-primary btn-block" style={{ marginTop: 0 }} onClick={onAddIncome}>
        <PlusIcon size={14} strokeWidth={2.4} />
        Add income
      </button>
    </div>
  );
}
