import React from 'react';
import MortgageFields from './MortgageFields.jsx';
import MortgageSummary from './MortgageSummary.jsx';
import { monthlyMortgageTotal } from '../utils/mortgage.js';
import { fmtMoney } from '../utils/format.js';

const STORE = 'nocturne-ledger-property-v1';
const BLANK = {
  loanAmount: '', interestRate: '', termYears: '30', escrowIncluded: true,
  homeInsurance: '', floodInsurance: '', propertyTax: '', condoFee: '',
  extraPayment: '', rentIncome: '',
};

const sectionStyle = { display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' };

export default class PropertyView extends React.Component {
  state = { ...BLANK };

  componentDidMount() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (saved && typeof saved === 'object') this.setState({ ...BLANK, ...saved });
    } catch (e) {}
  }

  persist = () => { try { localStorage.setItem(STORE, JSON.stringify(this.state)); } catch (e) {} };
  set = (field, value) => this.setState({ [field]: value }, this.persist);
  clearAll = () => this.setState({ ...BLANK }, this.persist);

  render() {
    const { monthLabel, viewFilter, nowIncome, nowExpense } = this.props;
    const s = this.state;

    const draft = {
      loanAmount: parseFloat(s.loanAmount) || 0,
      interestRate: parseFloat(s.interestRate) || 0,
      termYears: parseFloat(s.termYears) || 0,
      escrowIncluded: s.escrowIncluded,
      homeInsurance: parseFloat(s.homeInsurance) || 0,
      floodInsurance: parseFloat(s.floodInsurance) || 0,
      propertyTax: parseFloat(s.propertyTax) || 0,
      condoFee: parseFloat(s.condoFee) || 0,
      extraPayment: parseFloat(s.extraPayment) || 0,
    };
    const summary = monthlyMortgageTotal(draft);
    const cost = summary.total;
    const rent = parseFloat(s.rentIncome) || 0;
    const propNet = rent - cost;
    const modelled = cost > 0 || rent > 0;
    const nowNet = nowIncome - nowExpense;

    const money = (n) => fmtMoney(Math.abs(n));
    const signed = (n) => (n < 0 ? '−' : n > 0 ? '+' : '') + fmtMoney(Math.abs(n));
    const netColor = propNet >= 0 ? 'var(--color-text)' : 'var(--color-accent)';

    const row = (label, value, opts = {}) => (
      <div className="ov-line" style={opts.strong ? { fontWeight: 600 } : undefined}>
        <span>{label}</span>
        <span className="fig" style={opts.color ? { color: opts.color } : undefined}>{value}</span>
      </div>
    );

    return (
      <div className="view">
        <p className="prop-intro">
          Model a place you&rsquo;re thinking of buying — a house or a condo, with its mortgage, escrow and HOA fees — then add the income you expect from it and see what it does to your month.
        </p>

        <section style={sectionStyle}>
          <h3 className="ov-sec-title">The property</h3>
          <div className="prop-form">
            <MortgageFields v={s} set={this.set} />
            <div className="field">
              <label>Expected monthly income (rent)</label>
              <input
                className="input" type="number" min="0" step="0.01" value={s.rentIncome}
                onChange={(e) => this.set('rentIncome', e.target.value)} placeholder="0.00"
              />
            </div>
          </div>
        </section>

        {cost > 0 && (
          <section style={sectionStyle}>
            <h3 className="ov-sec-title">Monthly cost</h3>
            <MortgageSummary summary={summary} />
          </section>
        )}

        {modelled && (
          <section style={sectionStyle}>
            <h3 className="ov-sec-title">What it changes</h3>

            <div className="prop-block">
              {row('This property costs', money(cost) + ' / mo')}
              {row('Expected income (rent)', money(rent) + ' / mo')}
              {row('Property’s monthly balance', signed(propNet), { strong: true, color: netColor })}
            </div>

            <p className={'prop-verdict' + (propNet >= 0 ? '' : ' is-short')}>
              {propNet >= 0
                ? `This would add ${money(propNet)} a month to what’s left.`
                : `This would add a ${money(propNet)} a month shortfall.`}
            </p>

            <div className="prop-scenarios">
              <div className="prop-block">
                <h4 className="prop-sub">If you take it on together</h4>
                {row('Income  ·  now ' + fmtMoney(nowIncome), fmtMoney(nowIncome + rent))}
                {row('Expenses  ·  now ' + fmtMoney(nowExpense), fmtMoney(nowExpense + cost))}
                {row('What’s left', fmtMoney(nowNet + propNet), { strong: true, color: (nowNet + propNet) >= 0 ? 'var(--color-text)' : 'var(--color-accent)' })}
                <p className="prop-note">Split evenly, that&rsquo;s about {fmtMoney(cost / 2)}/mo more cost and {fmtMoney(rent / 2)}/mo more income each.</p>
              </div>

              <div className="prop-block">
                <h4 className="prop-sub">If one of you buys it alone</h4>
                {row('They take on', fmtMoney(cost) + ' / mo cost')}
                {row('They receive', fmtMoney(rent) + ' / mo income')}
                {row('Their monthly balance', signed(propNet), { strong: true, color: netColor })}
                <p className="prop-note">The household totals above don&rsquo;t change.</p>
              </div>
            </div>

            <p className="prop-note">
              &ldquo;Now&rdquo; figures are {monthLabel}{viewFilter && viewFilter !== 'Both' ? ' for ' + viewFilter : ''} — change the month or the Me / Wife / Both filter at the top to re-base them.
            </p>
          </section>
        )}

        <button type="button" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} onClick={this.clearAll}>Clear plan</button>
      </div>
    );
  }
}
