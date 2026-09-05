import React from 'react';
import SpendBar from './SpendBar.jsx';
import EntryTable from './EntryTable.jsx';
import { PlusIcon, CloseIcon } from './icons.jsx';

export default function ExpenseView({ totalExpenseDisplay, expenseBreakdown, expenseEntries, expenseEmpty, expenseHasRows, onAddExpense, focusCategory, onClearFocus, newId }) {
  const rows = focusCategory ? expenseEntries.filter((e) => e.category === focusCategory) : expenseEntries;
  const showBreakdown = !focusCategory && expenseHasRows && expenseBreakdown.length > 1;

  return (
    <div className="view">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <div className="view-total">Spending recorded this month — <b>{totalExpenseDisplay}</b></div>
        {focusCategory && (
          <span className="view-focus">
            {focusCategory}
            <button aria-label="Clear category filter" onClick={onClearFocus}><CloseIcon size={12} /></button>
          </span>
        )}
      </div>

      {showBreakdown && (
        <div className="view-breakdown">
          <SpendBar items={expenseBreakdown} />
          <ul className="ov-cats">
            {expenseBreakdown.map((c) => (
              <li key={c.label}>
                <div className="ov-cat ov-cat--static">
                  <i style={{ background: c.color }} />
                  <span>{c.label}</span>
                  <span className="ov-cat-val">{c.displayValue}</span>
                  <span className="ov-cat-pct">{c.pct}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {expenseEmpty && <div className="view-empty">No spending recorded for this month yet.</div>}
      {!expenseEmpty && focusCategory && rows.length === 0 && (
        <div className="view-empty">Nothing in {focusCategory} this month.</div>
      )}

      {rows.length > 0 && <EntryTable entries={rows} variant="expense" newId={newId} />}

      <button className="btn btn-primary view-add" onClick={onAddExpense}>
        <PlusIcon size={14} strokeWidth={2.4} />
        Add expense
      </button>
    </div>
  );
}
