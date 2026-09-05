import React from 'react';

/**
 * The mortgage-calculator inputs, shared by the entry dialog and the
 * Property plan page. `v` holds the raw string/boolean field values;
 * `set(field, value)` writes one back.
 */
export default function MortgageFields({ v, set }) {
  const num = (field, opts = {}) => (
    <input
      className="input" type="number" min="0" step={opts.step || '0.01'}
      value={v[field]} onChange={(e) => set(field, e.target.value)} placeholder={opts.ph || '0.00'}
    />
  );

  return (
    <>
      <div className="field"><label>Loan amount</label>{num('loanAmount')}</div>
      <div className="field"><label>Annual interest rate (%)</label>{num('interestRate', { step: '0.001' })}</div>
      <div className="field"><label>Loan term (years)</label>{num('termYears', { step: '1', ph: '30' })}</div>

      <div style={{ marginTop: 8, paddingTop: 14, borderTop: '1px solid var(--color-divider)' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', fontSize: 16, color: 'var(--color-text)' }}>Escrow &amp; fees</div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 14, color: 'var(--color-text)', cursor: 'pointer' }}>
          <input
            type="checkbox" checked={v.escrowIncluded} onChange={(e) => set('escrowIncluded', e.target.checked)}
            style={{ width: 16, height: 16, accentColor: 'var(--color-accent)', cursor: 'pointer', flex: 'none' }}
          />
          Collected as part of the monthly mortgage payment
        </label>
      </div>

      {v.escrowIncluded && (
        <>
          <div className="field"><label>Home insurance</label>{num('homeInsurance')}</div>
          <div className="field"><label>Flood insurance</label>{num('floodInsurance')}</div>
          <div className="field"><label>Property tax</label>{num('propertyTax')}</div>
          <div className="field"><label>Condo / HOA fee</label>{num('condoFee')}</div>
        </>
      )}

      <div className="field"><label>Extra payment (monthly)</label>{num('extraPayment')}</div>
    </>
  );
}
