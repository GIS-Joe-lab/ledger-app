import React from 'react';
import DonutChart from './DonutChart.jsx';
import EntryTable from './EntryTable.jsx';
import { PlusIcon } from './icons.jsx';

export default function ExpenseView({ totalExpenseDisplay, expenseDonut, expenseEntries, expenseEmpty, expenseHasRows, onAddExpense }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>
        Total expenses this month: <span style={{ color: 'var(--color-accent-300)', fontWeight: 600 }}>{totalExpenseDisplay}</span>
      </div>
      {expenseHasRows && (
        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
          <DonutChart segments={expenseDonut} size={140} />
        </div>
      )}
      {expenseEmpty && (
        <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', border: '1px dashed var(--color-divider)', borderRadius: 'var(--radius-md)' }}>
          No expense entries this month yet.
        </div>
      )}
      {expenseHasRows && <EntryTable entries={expenseEntries} variant="expense" />}
      <button className="btn btn-primary btn-block" style={{ marginTop: 0 }} onClick={onAddExpense}>
        <PlusIcon size={14} strokeWidth={2.4} />
        Add expense
      </button>
    </div>
  );
}
