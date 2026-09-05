import React from 'react';
import { GridIcon, IncomeIcon, ExpenseIcon, PlusIcon, PowerIcon, ChevronLeftIcon, ChevronRightIcon } from './icons.jsx';

const navColor = (active) => active ? 'var(--color-text)' : 'var(--color-ink-soft)';
const navBg = (active) => active ? 'color-mix(in srgb, var(--color-text) 9%, transparent)' : 'transparent';

function NavButton({ active, onClick, icon, children, collapsed }) {
  return (
    <button
      title={collapsed ? children : undefined}
      aria-current={active ? 'page' : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12,
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: collapsed ? '11px' : '10px 12px', border: 'none',
        borderRadius: 'var(--radius-md)', background: navBg(active), color: navColor(active),
        font: 'inherit', fontSize: 15, fontWeight: active ? 600 : 400,
        cursor: 'pointer', textAlign: 'left', width: '100%',
      }}
      onClick={onClick}
    >
      {icon}
      {!collapsed && children}
    </button>
  );
}

export default function Sidebar({ view, onSetView, onAddBank, onSignOut, userEmail, collapsed, onToggleCollapsed, mobileOpen }) {
  return (
    <aside
      className={'ledger-sidebar' + (collapsed ? ' is-collapsed' : '') + (mobileOpen ? ' is-mobile-open' : '')}
      style={{
        width: collapsed ? 72 : 268, flex: 'none',
        padding: collapsed ? 'var(--space-6) var(--space-2)' : 'var(--space-6) var(--space-4)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-8)',
        borderRight: '1px solid var(--color-divider)', overflowX: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: collapsed ? 'center' : 'space-between', gap: 8 }}>
        {!collapsed && (
          <div className="ledger-brand">
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', fontSize: 22, letterSpacing: '-0.01em' }}>Ledger</div>
            <div style={{ fontSize: 12.5, color: 'var(--color-ink-soft)', marginTop: 2 }}>Household account book</div>
          </div>
        )}
        <button
          className="ledger-sidebar-toggle"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={onToggleCollapsed}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, flex: 'none',
            border: '1px solid var(--color-divider-strong)', borderRadius: 'var(--radius-md)',
            background: 'transparent', color: 'var(--color-ink-soft)', cursor: 'pointer',
          }}
        >
          {collapsed ? <ChevronRightIcon size={14} /> : <ChevronLeftIcon size={14} />}
        </button>
      </div>

      <nav className="ledger-nav" style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 'none' }}>
        <NavButton collapsed={collapsed} active={view === 'overview'} onClick={() => onSetView('overview')} icon={<GridIcon />}>Overview</NavButton>
        <NavButton collapsed={collapsed} active={view === 'income'} onClick={() => onSetView('income')} icon={<IncomeIcon />}>Income</NavButton>
        <NavButton collapsed={collapsed} active={view === 'expense'} onClick={() => onSetView('expense')} icon={<ExpenseIcon />}>Expenses</NavButton>
        <div className="hr" style={{ margin: 'var(--space-3) 0' }}></div>
        <button
          title={collapsed ? 'Add bank' : undefined}
          style={{
            display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12,
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '11px' : '10px 12px', border: 'none',
            borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-accent)',
            font: 'inherit', fontSize: 15, cursor: 'pointer', textAlign: 'left', width: '100%',
          }}
          onClick={onAddBank}
        >
          <PlusIcon size={18} strokeWidth={2} />
          {!collapsed && 'Add bank'}
        </button>
      </nav>

      <div className="ledger-sidebar-footer" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {!collapsed && userEmail && (
          <div style={{ fontSize: 12, color: 'var(--color-ink-soft)', wordBreak: 'break-all' }}>{userEmail}</div>
        )}
        <button
          className="btn btn-secondary"
          style={{ fontSize: 13, width: '100%', minHeight: 38, padding: collapsed ? 0 : undefined }}
          onClick={onSignOut}
          title={collapsed ? 'Sign out' : undefined}
          aria-label="Sign out"
        >
          {collapsed ? <PowerIcon size={16} /> : 'Sign out'}
        </button>
      </div>
    </aside>
  );
}
