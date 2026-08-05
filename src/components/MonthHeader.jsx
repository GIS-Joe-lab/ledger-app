import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon, CloseIcon } from './icons.jsx';

export default function MonthHeader({ pageTitle, monthLabel, onPrevMonth, onNextMonth, viewFilter, onFilterChange, mobileNavOpen, onToggleMobileNav }) {
  return (
    <div className="ledger-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          className="ledger-mobile-nav-toggle"
          aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
          onClick={onToggleMobileNav}
          style={{
            alignItems: 'center', justifyContent: 'center', width: 30, height: 30, flex: 'none',
            border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)',
            background: 'transparent', color: 'var(--color-text)', cursor: 'pointer',
          }}
        >
          {mobileNavOpen ? <CloseIcon size={14} /> : <MenuIcon size={16} />}
        </button>
        <h2 className="ledger-page-title" style={{ margin: 0 }}>{pageTitle}</h2>
      </div>
      <div className="ledger-header-controls" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <div className="ledger-month-nav" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <button
            aria-label="Previous month"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-text)', cursor: 'pointer' }}
            onClick={onPrevMonth}
          >
            <ChevronLeftIcon />
          </button>
          <div style={{ fontSize: 15, minWidth: 140, textAlign: 'center', color: 'color-mix(in srgb, var(--color-text) 85%, transparent)' }}>{monthLabel}</div>
          <button
            aria-label="Next month"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-text)', cursor: 'pointer' }}
            onClick={onNextMonth}
          >
            <ChevronRightIcon />
          </button>
        </div>
        <div className="seg ledger-seg-center">
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
    </div>
  );
}
