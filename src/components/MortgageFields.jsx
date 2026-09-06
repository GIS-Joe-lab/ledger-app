import React from 'react';
import { fmtMoney } from '../utils/format.js';

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

  const taxPeriod = v.propertyTaxPeriod === 'month' ? 'month' : 'year';
  const taxInput = Number(v.propertyTax) || 0;

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

          <div className="field">
            <label>Property tax</label>
            <div className="field-inline">
              <div className="seg" role="group" aria-label="Property tax period">
                <label className="seg-opt">
                  <input
                    type="radio" checked={taxPeriod === 'year'}
                    onChange={() => set('propertyTaxPeriod', 'year')}
                  />
                  Yearly
                </label>
                <label className="seg-opt">
                  <input
                    type="radio" checked={taxPeriod === 'month'}
                    onChange={() => set('propertyTaxPeriod', 'month')}
                  />
                  Monthly
                </label>
              </div>
              {num('propertyTax', { ph: taxPeriod === 'year' ? 'amount per year' : 'amount per month' })}
            </div>
            {taxPeriod === 'year' && taxInput > 0 && (
              <div className="field-hint">
                {fmtMoney(taxInput)} / yr &divide; 12 &asymp; <strong>{fmtMoney(taxInput / 12)} / mo</strong> goes into the payment
              </div>
            )}
          </div>

          <div className="field"><label>Condo / HOA fee</label>{num('condoFee')}</div>
        </>
      )}

      <div className="field"><label>Extra payment (monthly)</label>{num('extraPayment')}</div>
    </>
  );
}
