import React from 'react';
import { CloseIcon } from './icons.jsx';

const stopClick = (e) => e.stopPropagation();

export default function BankModal({ newBankName, onNewBankNameChange, onSubmit, onClose, hasBanks, bankTagList }) {
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <form className="dialog" style={{ width: 'min(380px,100%)' }} onSubmit={onSubmit} onClick={stopClick}>
        <div className="dialog-title">Add bank account</div>
        <div className="field">
          <label>Bank name</label>
          <input className="input" type="text" required value={newBankName} onChange={onNewBankNameChange} placeholder="e.g. Chase Checking" />
        </div>
        {hasBanks && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>Saved banks</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {bankTagList.map((bank) => (
                <span key={bank.name} className="tag tag-neutral" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {bank.name}
                  <button type="button" aria-label="Remove bank" onClick={bank.onRemove} style={{ display: 'flex', padding: 0, border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer', opacity: 0.7 }}>
                    <CloseIcon />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}
