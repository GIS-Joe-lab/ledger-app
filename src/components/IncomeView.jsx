import React from 'react';
import SpendBar from './SpendBar.jsx';
import EntryTable from './EntryTable.jsx';
import { PlusIcon } from './icons.jsx';

export default function IncomeView({ totalIncomeDisplay, incomeBreakdown, incomeEntries, incomeEmpty, incomeHasRows, onAddIncome, newId }) {
  return (
    <div className="view">
      <div className="view-total">Income recorded this month — <b>{totalIncomeDisplay}</b></div>

      {incomeHasRows && incomeBreakdown.length > 1 && (
        <div className="view-breakdown">
          <SpendBar items={incomeBreakdown} />
          <ul className="ov-cats">
            {incomeBreakdown.map((c) => (
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

      {incomeEmpty && <div className="view-empty">No income recorded for this month yet.</div>}

      {incomeHasRows && <EntryTable entries={incomeEntries} variant="income" newId={newId} />}

      <button className="btn btn-primary view-add" onClick={onAddIncome}>
        <PlusIcon size={14} strokeWidth={2.4} />
        Add income
      </button>
    </div>
  );
}
