import React from 'react';
import { GridIcon, IncomeIcon, ExpenseIcon, PlusIcon } from './icons.jsx';

const navBg = (active) => active ? 'color-mix(in srgb, var(--color-accent) 14%, transparent)' : 'transparent';
const navColor = (active) => active ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-text) 75%, transparent)';

function NavButton({ active, onClick, icon, children }) {
  return (
    <button
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', border: 'none',
        borderRadius: 'var(--radius-md)', background: navBg(active), color: navColor(active),
        font: 'inherit', fontSize: 15, cursor: 'pointer', textAlign: 'left',
      }}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}

export default function Sidebar({ view, onSetView, onAddBank, userEmail, onSignOut }) {
  return (
    <aside className="ledger-sidebar" style={{ width: 264, flex: 'none', padding: 'var(--space-6) var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', borderRight: '1px solid var(--color-divider)', overflowX: 'auto' }}>
      <div className="ledger-brand">
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', fontSize: 21 }}>Ledger</div>
        <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 50%, transparent)', marginTop: 3 }}>Monthly tracker</div>
      </div>
      <nav className="ledger-nav" style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 'none' }}>
        <NavButton active={view === 'overview'} onClick={() => onSetView('overview')} icon={<GridIcon />}>Overview</NavButton>
        <NavButton active={view === 'income'} onClick={() => onSetView('income')} icon={<IncomeIcon />}>Income</NavButton>
        <NavButton active={view === 'expense'} onClick={() => onSetView('expense')} icon={<ExpenseIcon />}>Expenses</NavButton>
        <div className="hr" style={{ margin: 'var(--space-2) 0' }}></div>
        <button
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', border: 'none', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-accent)', font: 'inherit', fontSize: 15, cursor: 'pointer', textAlign: 'left' }}
          onClick={onAddBank}
        >
          <PlusIcon size={19} strokeWidth={2} />
          Add bank
        </button>
      </nav>
      {userEmail && (
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', wordBreak: 'break-all' }}>{userEmail}</div>
          <button className="btn btn-secondary" style={{ fontSize: 13 }} onClick={onSignOut}>Sign out</button>
        </div>
      )}
    </aside>
  );
}
