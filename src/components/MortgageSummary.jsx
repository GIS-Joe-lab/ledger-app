import React from 'react';
import { fmtMoney } from '../utils/format.js';

const line = (label, value, opts = {}) => (
  <div
    key={label}
    style={{
      display: 'flex', justifyContent: 'space-between',
      fontSize: opts.size || 13,
      color: opts.strong ? 'var(--color-text)' : 'var(--color-ink-soft)',
      fontWeight: opts.strong ? 600 : 400,
      paddingLeft: opts.indent ? 12 : 0,
      marginTop: opts.gap || 0,
      paddingTop: opts.rule ? 8 : 0,
      borderTop: opts.rule ? '1px solid var(--color-divider)' : 'none',
    }}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

/** The itemised monthly-payment breakdown, from monthlyMortgageTotal(). */
export default function MortgageSummary({ summary }) {
  const feeRows = [
    ['Home insurance', summary.homeInsurance],
    ['Flood insurance', summary.floodInsurance],
    ['Property tax', summary.propertyTax],
    ['Condo / HOA fee', summary.condoFee],
    ['Extra payment', summary.extraPayment],
  ].filter(([, v]) => v > 0);

  return (
    <div className="card tnum" style={{ gap: 6 }}>
      {line('Principal & interest', fmtMoney(summary.principalInterest) + '/mo')}
      {line('— interest (first payment)', fmtMoney(summary.interestPortion), { size: 12, indent: true })}
      {line('— principal (first payment)', fmtMoney(summary.principalPortion), { size: 12, indent: true })}
      {feeRows.map(([label, v]) => line(label, fmtMoney(v)))}
      {line('Total monthly payment', fmtMoney(summary.total), { size: 16, strong: true, gap: 4, rule: true })}
    </div>
  );
}
