import React from 'react';
import MortgageFields from './MortgageFields.jsx';
import MortgageSummary from './MortgageSummary.jsx';

const stopClick = (e) => e.stopPropagation();

export default function MortgageModal({ v, set, summary, canApply, onCancel, onApply }) {
  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div className="dialog" onClick={stopClick}>
        <div className="dialog-title">Mortgage calculator</div>
        <MortgageFields v={v} set={set} />
        <MortgageSummary summary={summary} />
        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-primary" disabled={!canApply} onClick={onApply}>Use this amount</button>
        </div>
      </div>
    </div>
  );
}
