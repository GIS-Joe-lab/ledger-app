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
  const taxYearly = summary.propertyTaxPeriod === 'year';

  return (
    <div className="card tnum" style={{ gap: 6 }}>
      {line('Principal & interest', fmtMoney(summary.principalInterest) + '/mo')}
      {line('— interest (first payment)', fmtMoney(summary.interestPortion), { size: 12, indent: true })}
      {line('— principal (first payment)', fmtMoney(summary.principalPortion), { size: 12, indent: true })}
      {summary.homeInsurance > 0 && line('Home insurance', fmtMoney(summary.homeInsurance))}
      {summary.floodInsurance > 0 && line('Flood insurance', fmtMoney(summary.floodInsurance))}
      {summary.propertyTax > 0 && line(
        taxYearly ? 'Property tax (yearly ÷ 12)' : 'Property tax (monthly)',
        fmtMoney(summary.propertyTax) + '/mo',
      )}
      {summary.propertyTax > 0 && taxYearly &&
        line('— entered as ' + fmtMoney(summary.propertyTaxAnnual) + '/yr', '', { size: 12, indent: true })}
      {summary.condoFee > 0 && line('Condo / HOA fee', fmtMoney(summary.condoFee))}
      {summary.extraPayment > 0 && line('Extra payment', fmtMoney(summary.extraPayment))}
      {line('Total monthly payment', fmtMoney(summary.total), { size: 16, strong: true, gap: 4, rule: true })}
    </div>
  );
}
