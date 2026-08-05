import React, { useState } from 'react';
import { GridIcon, IncomeIcon, ExpenseIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from './icons.jsx';

const navBg = (active) => active ? 'color-mix(in srgb, var(--color-accent) 14%, transparent)' : 'transparent';
const navColor = (active) => active ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-text) 75%, transparent)';

function NavButton({ active, onClick, icon, children, collapsed }) {
  return (
    <button
      title={collapsed ? children : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12,
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: collapsed ? '11px' : '11px 12px', border: 'none',
        borderRadius: 'var(--radius-md)', background: navBg(active), color: navColor(active),
        font: 'inherit', fontSize: 15, cursor: 'pointer', textAlign: 'left',
      }}
      onClick={onClick}
    >
      {icon}
      {!collapsed && children}
    </button>
  );
}

export default function Sidebar({ view, onSetView, onAddBank, onSignOut }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="ledger-sidebar"
      style={{
        width: collapsed ? 72 : 264, flex: 'none',
        padding: collapsed ? 'var(--space-6) var(--space-2)' : 'var(--space-6) var(--space-4)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-8)',
        borderRight: '1px solid var(--color-divider)', overflowX: 'auto',
        transition: 'width 0.15s ease, padding 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', gap: 8 }}>
        {!collapsed && (
          <div className="ledger-brand">
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', fontSize: 21 }}>Ledger</div>
            <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 50%, transparent)', marginTop: 3 }}>Monthly tracker</div>
          </div>
        )}
        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCollapsed((c) => !c)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, flex: 'none',
            border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)',
            background: 'transparent', color: 'var(--color-text)', cursor: 'pointer',
          }}
        >
          {collapsed ? <ChevronRightIcon size={14} /> : <ChevronLeftIcon size={14} />}
        </button>
      </div>

      <nav className="ledger-nav" style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 'none' }}>
        <NavButton collapsed={collapsed} active={view === 'overview'} onClick={() => onSetView('overview')} icon={<GridIcon />}>Overview</NavButton>
        <NavButton collapsed={collapsed} active={view === 'income'} onClick={() => onSetView('income')} icon={<IncomeIcon />}>Income</NavButton>
        <NavButton collapsed={collapsed} active={view === 'expense'} onClick={() => onSetView('expense')} icon={<ExpenseIcon />}>Expenses</NavButton>
        <div className="hr" style={{ margin: 'var(--space-2) 0' }}></div>
        <button
          title={collapsed ? 'Add bank' : undefined}
          style={{
            display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12,
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '11px' : '11px 12px', border: 'none',
            borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-accent)',
            font: 'inherit', fontSize: 15, cursor: 'pointer', textAlign: 'left',
          }}
          onClick={onAddBank}
        >
          <PlusIcon size={19} strokeWidth={2} />
          {!collapsed && 'Add bank'}
        </button>
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button
          className="btn btn-secondary"
          style={{ fontSize: 13, width: '100%' }}
          onClick={onSignOut}
          title={collapsed ? 'Sign out' : undefined}
        >
          {collapsed ? '⏻' : 'Sign out'}
        </button>
      </div>
    </aside>
  );
}
