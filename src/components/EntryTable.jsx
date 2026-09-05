import React from 'react';
import { EditIcon, TrashIcon } from './icons.jsx';

const stop = (fn) => (e) => { e.stopPropagation(); fn(); };

/**
 * The month's entries as register lines — one ruled row each, the whole row
 * a target that opens the entry for detail/editing. `variant` controls the
 * one field that differs: income shows the earner, expense shows who paid
 * and any auto-pay date. All secondary facts are set as plain text, not
 * chips or badges.
 */
export default function EntryTable({ entries, variant, newId }) {
  return (
    <div className="reg">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className={'reg-row' + (entry.id === newId ? ' is-new' : '')}
          role="button"
          tabIndex={0}
          onClick={entry.onEdit}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); entry.onEdit(); } }}
          aria-label={'Edit ' + entry.displayTitle}
        >
          <span className="reg-title">{entry.displayTitle}</span>
          <span className={'reg-amount' + (variant === 'expense' ? ' is-out' : '')}>{entry.displayAmount}</span>

          <div className="reg-meta">
            <span className="reg-cat"><i style={{ background: entry.categoryBg }} />{entry.category}</span>
            <span className="reg-sep" aria-hidden="true" />
            <span>{entry.displayBankAccount}</span>
            <span className="reg-sep" aria-hidden="true" />
            <span>{variant === 'income' ? entry.displayEarner : ('Paid by ' + entry.displayEarner)}</span>
            {variant === 'expense' && entry.autoPay && (
              <>
                <span className="reg-sep" aria-hidden="true" />
                <span>Auto pay {entry.displayAutoPayDate}</span>
              </>
            )}
            <span className="reg-sep" aria-hidden="true" />
            <span>{entry.frequencyLabel}</span>
            <span className="reg-sep" aria-hidden="true" />
            <span>{entry.displayDate}</span>
          </div>

          <div className="reg-actions">
            <button aria-label="Edit entry" onClick={stop(entry.onEdit)}><EditIcon /></button>
            <button aria-label="Delete entry" onClick={stop(entry.onDelete)}><TrashIcon /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
