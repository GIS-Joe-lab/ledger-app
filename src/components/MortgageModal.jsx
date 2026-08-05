import React from 'react';
import { fmtMoney } from '../utils/format.js';

const stopClick = (e) => e.stopPropagation();

export default function MortgageModal({
  loanAmount, onLoanAmountChange,
  interestRate, onInterestRateChange,
  termYears, onTermYearsChange,
  homeInsurance, onHomeInsuranceChange,
  floodInsurance, onFloodInsuranceChange,
  propertyTax, onPropertyTaxChange,
  extraPayment, onExtraPaymentChange,
  principalInterest, interestPortion, principalPortion, total, canApply,
  onCancel, onApply,
}) {
  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div className="dialog" onClick={stopClick}>
        <div className="dialog-title">Mortgage calculator</div>

        <div className="field">
          <label>Loan amount</label>
          <input className="input" type="number" min="0" step="0.01" value={loanAmount} onChange={onLoanAmountChange} placeholder="0.00" />
        </div>

        <div className="field">
          <label>Annual interest rate (%)</label>
          <input className="input" type="number" min="0" step="0.001" value={interestRate} onChange={onInterestRateChange} placeholder="0.00" />
        </div>

        <div className="field">
          <label>Loan term (years)</label>
          <input className="input" type="number" min="0" step="1" value={termYears} onChange={onTermYearsChange} placeholder="30" />
        </div>

        <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', marginTop: 4 }}>Escrow (monthly)</div>

        <div className="field">
          <label>Home insurance</label>
          <input className="input" type="number" min="0" step="0.01" value={homeInsurance} onChange={onHomeInsuranceChange} placeholder="0.00" />
        </div>

        <div className="field">
          <label>Flood insurance</label>
          <input className="input" type="number" min="0" step="0.01" value={floodInsurance} onChange={onFloodInsuranceChange} placeholder="0.00" />
        </div>

        <div className="field">
          <label>Property tax</label>
          <input className="input" type="number" min="0" step="0.01" value={propertyTax} onChange={onPropertyTaxChange} placeholder="0.00" />
        </div>

        <div className="field">
          <label>Extra payment (monthly)</label>
          <input className="input" type="number" min="0" step="0.01" value={extraPayment} onChange={onExtraPaymentChange} placeholder="0.00" />
        </div>

        <div className="card" style={{ background: 'color-mix(in srgb, var(--color-accent) 8%, transparent)', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, opacity: 0.8 }}>
            <span>Principal &amp; interest</span>
            <span>{fmtMoney(principalInterest)}/mo</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.65, paddingLeft: 12 }}>
            <span>— interest (first payment)</span>
            <span>{fmtMoney(interestPortion)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.65, paddingLeft: 12 }}>
            <span>— principal (first payment)</span>
            <span>{fmtMoney(principalPortion)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 600, marginTop: 4 }}>
            <span>Total monthly payment</span>
            <span>{fmtMoney(total)}</span>
          </div>
        </div>

        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-primary" disabled={!canApply} onClick={onApply}>Use this amount</button>
        </div>
      </div>
    </div>
  );
}
