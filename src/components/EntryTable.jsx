import React from 'react';
import { EditIcon, TrashIcon } from './icons.jsx';

const dimCell = { color: 'color-mix(in srgb, var(--color-text) 75%, transparent)' };

/**
 * Shared entries table for both the Income and Expense views. `variant`
 * controls the one column that differs between them: income shows
 * "Earner", expense shows "Paid by" + "Auto pay".
 */
export default function EntryTable({ entries, variant }) {
  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Account</th>
            <th>{variant === 'income' ? 'Earner' : 'Paid by'}</th>
            {variant === 'expense' ? <th>Auto pay</th> : null}
            <th>Description</th>
            <th>Frequency</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.displayDate}</td>
              <td><span className="tag" style={{ background: entry.categoryBg, color: entry.categoryText }}>{entry.category}</span></td>
              <td style={dimCell}>{entry.displayBankAccount}</td>
              <td style={dimCell}>{entry.displayEarner}</td>
              {variant === 'expense' ? <td style={dimCell}>{entry.autoPay ? ('Yes · ' + entry.displayAutoPayDate) : 'No'}</td> : null}
              <td style={dimCell}>{entry.displayDescription}</td>
              <td>{entry.frequencyLabel}</td>
              <td style={{ fontWeight: 600 }}>{entry.displayAmount}</td>
              <td>
                <div style={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <button
                    aria-label="Edit"
                    style={{ display: 'flex', padding: 6, border: 'none', background: 'transparent', borderRadius: 'var(--radius-sm)', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', cursor: 'pointer' }}
                    onClick={entry.onEdit}
                  >
                    <EditIcon />
                  </button>
                  <button
                    aria-label="Delete"
                    style={{ display: 'flex', padding: 6, border: 'none', background: 'transparent', borderRadius: 'var(--radius-sm)', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', cursor: 'pointer' }}
                    onClick={entry.onDelete}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
