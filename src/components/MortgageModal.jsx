import React from 'react';
import { fmtMoney } from '../utils/format.js';

const stopClick = (e) => e.stopPropagation();

export default function MortgageModal({
  loanAmount, onLoanAmountChange,
  interestRate, onInterestRateChange,
  termYears, onTermYearsChange,
  escrowIncluded, onEscrowIncludedChange,
  homeInsurance, onHomeInsuranceChange,
  floodInsurance, onFloodInsuranceChange,
  propertyTax, onPropertyTaxChange,
  condoFee, onCondoFeeChange,
  extraPayment, onExtraPaymentChange,
  summary, canApply,
  onCancel, onApply,
}) {
  const feeRows = [
    ['Home insurance', summary.homeInsurance],
    ['Flood insurance', summary.floodInsurance],
    ['Property tax', summary.propertyTax],
    ['Condo / HOA fee', summary.condoFee],
    ['Extra payment', summary.extraPayment],
  ].filter(([, v]) => v > 0);

  const summaryRow = (label, value, opts = {}) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: opts.size || 13, color: opts.strong ? 'var(--color-text)' : 'var(--color-ink-soft)', fontWeight: opts.strong ? 600 : 400, paddingLeft: opts.indent ? 12 : 0, marginTop: opts.gap || 0, paddingTop: opts.rule ? 8 : 0, borderTop: opts.rule ? '1px solid var(--color-divider)' : 'none' }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );

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

        <div style={{ marginTop: 8, paddingTop: 14, borderTop: '1px solid var(--color-divider)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', fontSize: 16, color: 'var(--color-text)' }}>Escrow &amp; fees</div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 14, color: 'var(--color-text)', cursor: 'pointer' }}>
            <input type="checkbox" checked={escrowIncluded} onChange={onEscrowIncludedChange} style={{ width: 16, height: 16, accentColor: 'var(--color-accent)', cursor: 'pointer', flex: 'none' }} />
            Collected as part of the monthly mortgage payment
          </label>
        </div>

        {escrowIncluded && (
          <>
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
              <label>Condo / HOA fee</label>
              <input className="input" type="number" min="0" step="0.01" value={condoFee} onChange={onCondoFeeChange} placeholder="0.00" />
            </div>
          </>
        )}

        <div className="field">
          <label>Extra payment (monthly)</label>
          <input className="input" type="number" min="0" step="0.01" value={extraPayment} onChange={onExtraPaymentChange} placeholder="0.00" />
        </div>

        <div className="card tnum" style={{ gap: 6 }}>
          {summaryRow('Principal & interest', fmtMoney(summary.principalInterest) + '/mo')}
          {summaryRow('— interest (first payment)', fmtMoney(summary.interestPortion), { size: 12, indent: true })}
          {summaryRow('— principal (first payment)', fmtMoney(summary.principalPortion), { size: 12, indent: true })}
          {feeRows.map(([label, v]) => (
            <React.Fragment key={label}>{summaryRow(label, fmtMoney(v))}</React.Fragment>
          ))}
          {summaryRow('Total monthly payment', fmtMoney(summary.total), { size: 16, strong: true, gap: 4, rule: true })}
        </div>

        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-primary" disabled={!canApply} onClick={onApply}>Use this amount</button>
        </div>
      </div>
    </div>
  );
}
