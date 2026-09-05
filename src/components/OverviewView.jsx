import React from 'react';
import SpendBar from './SpendBar.jsx';
import { PlusIcon } from './icons.jsx';

export default function OverviewView({
  monthLabel, totalIncomeDisplay, totalExpenseDisplay, netDisplay, netColor,
  overallHasData, expenseBreakdown, fixedCosts, readingSentence,
  onDrillCategory, onAddIncome, onAddExpense,
}) {
  const hasWhere = overallHasData && expenseBreakdown.length > 0;

  return (
    <div className="ov">
      <section className="ov-ledger">
        <div className="ov-line">
          <span>Money in</span>
          <span className="fig">{totalIncomeDisplay}</span>
        </div>
        <div className="ov-line is-out">
          <span>Money out</span>
          <span className="fig">−{totalExpenseDisplay}</span>
        </div>
        <div className="ov-net">
          <span className="ov-net-label">What&rsquo;s left in {monthLabel}</span>
          <span className="ov-net-fig tnum" style={{ color: netColor }}>{netDisplay}</span>
        </div>
        {readingSentence && <p className="ov-reading">{readingSentence}</p>}
        <div className="ov-add">
          <button className="btn btn-secondary" onClick={onAddIncome}><PlusIcon size={13} strokeWidth={2.4} />Income</button>
          <button className="btn btn-secondary" onClick={onAddExpense}><PlusIcon size={13} strokeWidth={2.4} />Expense</button>
        </div>
      </section>

      {hasWhere && (
        <section className="ov-where-sec">
          <h3 className="ov-sec-title">Where it went</h3>
          <SpendBar items={expenseBreakdown} />
          <ul className="ov-cats">
            {expenseBreakdown.map((c) => (
              <li key={c.label}>
                <button className="ov-cat" onClick={() => onDrillCategory(c.label)}>
                  <i style={{ background: c.color }} />
                  <span>{c.label}</span>
                  <span className="ov-cat-val">{c.displayValue}</span>
                  <span className="ov-cat-pct">{c.pct}%</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {fixedCosts.length > 0 && (
        <section className="ov-fixed-sec">
          <h3 className="ov-sec-title">Fixed costs this month</h3>
          <ul className="ov-fixed">
            {fixedCosts.map((f) => (
              <li key={f.id}>
                <i style={{ background: f.color }} />
                <span>{f.title}</span>
                <span className="fig">{f.displayAmount}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!overallHasData && (
        <p className="ov-empty">Nothing recorded for {monthLabel} yet. Start the month&rsquo;s page with an entry above.</p>
      )}
    </div>
  );
}
