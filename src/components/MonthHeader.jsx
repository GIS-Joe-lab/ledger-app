import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon, CloseIcon } from './icons.jsx';

const stepBtn = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38,
  border: '1px solid var(--color-divider-strong)', borderRadius: 'var(--radius-md)',
  background: 'transparent', color: 'var(--color-ink-soft)', cursor: 'pointer',
};

export default function MonthHeader({ pageTitle, monthLabel, onPrevMonth, onNextMonth, viewFilter, onFilterChange, mobileNavOpen, onToggleMobileNav }) {
  return (
    <div className="ledger-header">
      <div className="ledger-header-title">
        <button
          className="ledger-mobile-nav-toggle"
          aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
          onClick={onToggleMobileNav}
          style={{
            alignItems: 'center', justifyContent: 'center', width: 34, height: 34, flex: 'none',
            border: '1px solid var(--color-divider-strong)', borderRadius: 'var(--radius-md)',
            background: 'transparent', color: 'var(--color-text)', cursor: 'pointer',
          }}
        >
          {mobileNavOpen ? <CloseIcon size={14} /> : <MenuIcon size={16} />}
        </button>
        <h2 className="ledger-page-title" style={{ margin: 0 }}>{pageTitle}</h2>
      </div>

      <div className="ledger-month-nav">
        <button aria-label="Previous month" style={stepBtn} onClick={onPrevMonth}><ChevronLeftIcon /></button>
        <div className="ledger-month-label tnum">{monthLabel}</div>
        <button aria-label="Next month" style={stepBtn} onClick={onNextMonth}><ChevronRightIcon /></button>
      </div>

      <div className="seg ledger-seg-center" role="group" aria-label="Filter by earner">
        <label className="seg-opt">
          <input type="radio" name="viewFilter" value="Me" checked={viewFilter === 'Me'} onChange={onFilterChange} />
          Me
        </label>
        <label className="seg-opt">
          <input type="radio" name="viewFilter" value="Wife" checked={viewFilter === 'Wife'} onChange={onFilterChange} />
          Wife
        </label>
        <label className="seg-opt">
          <input type="radio" name="viewFilter" value="Both" checked={viewFilter === 'Both'} onChange={onFilterChange} />
          Both
        </label>
      </div>
    </div>
  );
}
