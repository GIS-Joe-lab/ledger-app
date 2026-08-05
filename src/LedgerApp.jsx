import React from 'react';

const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Rental', 'Gift', 'Other'];
const RENTAL_CATEGORIES = ['Rental Mortgage', 'Rental Condo Fee', 'Rental Property Insurance', 'Rental Property Tax', 'Rental Extra Payment'];
const PERSONAL_CATEGORIES = ['Personal Mortgage', 'Personal Condo Fee', 'Personal Property Insurance', 'Personal Property Tax', 'Personal Extra Payment'];
const OTHER_EXPENSE_CATEGORIES = ['Utilities', 'Groceries', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Car Insurance', 'Mobile Plan', 'Landscaping', 'Other'];
const EXPENSE_CATEGORIES = [...RENTAL_CATEGORIES, ...PERSONAL_CATEGORIES, ...OTHER_EXPENSE_CATEGORIES];
const STORAGE_KEY = 'nocturne-ledger-entries-v1';
const BANK_STORAGE_KEY = 'nocturne-ledger-banks-v1';
const FREQUENCIES = ['One-time', 'Weekly', 'Bi-weekly', 'Monthly', 'Bi-monthly', 'Quarterly', 'Yearly'];

/* 10 hues, 36° apart; each in a deep + light variant so any two colors
   differ by hue (>=36°) or by lightness band (~28%+), never both close. */
const PALETTE = {
  maroonRed: { bg: 'oklch(48% 0.18 0)', text: 'oklch(97% 0.02 0)' },
  coralPink: { bg: 'oklch(72% 0.19 8)', text: 'oklch(18% 0.03 8)' },
  burntOrange: { bg: 'oklch(58% 0.19 36)', text: 'oklch(97% 0.02 36)' },
  peach: { bg: 'oklch(76% 0.18 46)', text: 'oklch(18% 0.03 46)' },
  gold: { bg: 'oklch(62% 0.16 72)', text: 'oklch(97% 0.02 72)' },
  lemon: { bg: 'oklch(90% 0.18 95)', text: 'oklch(15% 0.03 95)' },
  olive: { bg: 'oklch(55% 0.13 108)', text: 'oklch(97% 0.02 108)' },
  lime: { bg: 'oklch(82% 0.19 118)', text: 'oklch(18% 0.03 118)' },
  forest: { bg: 'oklch(52% 0.16 144)', text: 'oklch(97% 0.02 144)' },
  mint: { bg: 'oklch(80% 0.16 155)', text: 'oklch(18% 0.03 155)' },
  deepTeal: { bg: 'oklch(48% 0.13 185)', text: 'oklch(97% 0.02 185)' },
  turquoise: { bg: 'oklch(76% 0.13 190)', text: 'oklch(18% 0.03 190)' },
  navy: { bg: 'oklch(42% 0.14 222)', text: 'oklch(97% 0.02 222)' },
  skyBlue: { bg: 'oklch(76% 0.12 222)', text: 'oklch(18% 0.03 222)' },
  royalBlue: { bg: 'oklch(50% 0.19 258)', text: 'oklch(97% 0.02 258)' },
  periwinkle: { bg: 'oklch(74% 0.13 258)', text: 'oklch(18% 0.03 258)' },
  indigo: { bg: 'oklch(46% 0.19 288)', text: 'oklch(97% 0.02 288)' },
  lavender: { bg: 'oklch(74% 0.14 288)', text: 'oklch(18% 0.03 288)' },
  plum: { bg: 'oklch(46% 0.20 324)', text: 'oklch(97% 0.02 324)' },
  hotPink: { bg: 'oklch(72% 0.19 324)', text: 'oklch(18% 0.03 324)' },
  plainBlue: { bg: 'oklch(55% 0.19 258)', text: 'oklch(97% 0.02 258)' },
  plainGreen: { bg: 'oklch(60% 0.19 145)', text: 'oklch(97% 0.02 145)' },
  plainYellow: { bg: 'oklch(80% 0.17 90)', text: 'oklch(18% 0.03 90)' },
  plainPurple: { bg: 'oklch(55% 0.20 300)', text: 'oklch(97% 0.02 300)' },
  plainPink: { bg: 'oklch(65% 0.21 340)', text: 'oklch(97% 0.02 340)' },
  plainOrange: { bg: 'oklch(68% 0.19 50)', text: 'oklch(18% 0.03 50)' },
};
const CATEGORY_COLORS = {
  Salary: PALETTE.plainBlue, Freelance: PALETTE.plainGreen, Investment: PALETTE.plainYellow,
  Rental: PALETTE.plainPurple, Gift: PALETTE.plainPink, Other: PALETTE.lavender,
  'Rental Mortgage': PALETTE.lemon, 'Rental Condo Fee': PALETTE.royalBlue, 'Rental Property Insurance': PALETTE.maroonRed,
  'Rental Property Tax': PALETTE.forest, 'Rental Extra Payment': PALETTE.plum,
  'Personal Mortgage': PALETTE.peach, 'Personal Condo Fee': PALETTE.skyBlue, 'Personal Property Insurance': PALETTE.hotPink,
  'Personal Property Tax': PALETTE.lime, 'Personal Extra Payment': PALETTE.indigo,
  Utilities: PALETTE.turquoise, Groceries: PALETTE.gold, Transport: PALETTE.navy, Entertainment: PALETTE.coralPink,
  Health: PALETTE.deepTeal, Shopping: PALETTE.burntOrange, 'Car Insurance': PALETTE.periwinkle, 'Mobile Plan': PALETTE.olive,
  Landscaping: PALETTE.mint,
};
function categoryStyle(category, type) {
  if (category === 'Other' && type === 'income') return PALETTE.plainOrange;
  return CATEGORY_COLORS[category] || { bg: 'var(--color-neutral-700)', text: 'var(--color-neutral-100)' };
}
function buildDonutSegments(items, radius) {
  const circumference = 2 * Math.PI * radius;
  const total = items.reduce((s, i) => s + i.value, 0);
  let cumulative = 0;
  return items.filter(i => i.value > 0.004).map(i => {
    const frac = total > 0 ? i.value / total : 0;
    const len = frac * circumference;
    const seg = {
      label: i.label,
      color: i.color,
      dasharray: len.toFixed(2) + ' ' + Math.max(circumference - len, 0).toFixed(2),
      dashoffset: (-cumulative).toFixed(2),
      pct: Math.round(frac * 100),
      displayValue: i.displayValue,
    };
    cumulative += len;
    return seg;
  });
}

function parseISODate(d) {
  const [y, m, day] = d.split('-').map(Number);
  return new Date(y, m - 1, day);
}

function occurrencesInMonth(entry, viewYear, viewMonth) {
  if (!entry.date) return 0;
  const start = parseISODate(entry.date);
  const monthStart = new Date(viewYear, viewMonth, 1);
  const monthEnd = new Date(viewYear, viewMonth + 1, 0);
  const ongoing = entry.ongoing !== false;
  const end = (!ongoing && entry.endDate) ? parseISODate(entry.endDate) : null;
  if (end && monthStart > end) return 0;
  if (start > monthEnd) return 0;
  const freq = entry.frequency || 'One-time';

  if (freq === 'One-time') {
    return (start.getFullYear() === viewYear && start.getMonth() === viewMonth) ? 1 : 0;
  }
  if (freq === 'Weekly' || freq === 'Bi-weekly') {
    const step = freq === 'Weekly' ? 7 : 14;
    const dayMs = 86400000;
    let cursor = new Date(start);
    if (cursor < monthStart) {
      const diffDays = Math.round((monthStart - cursor) / dayMs);
      const steps = Math.ceil(diffDays / step);
      cursor = new Date(cursor.getTime() + steps * step * dayMs);
    }
    let count = 0;
    while (cursor <= monthEnd) {
      if (end && cursor > end) break;
      if (cursor >= monthStart) count++;
      cursor = new Date(cursor.getTime() + step * dayMs);
    }
    return count;
  }
  if (freq === 'Bi-monthly') {
    const daysInMonth = monthEnd.getDate();
    const anchorDay = start.getDate();
    const clamp = (d) => Math.min(d, daysInMonth);
    const dateA = new Date(viewYear, viewMonth, clamp(anchorDay));
    const dateB = new Date(viewYear, viewMonth, clamp(anchorDay + 15));
    const candidates = dateA.getTime() === dateB.getTime() ? [dateA] : [dateA, dateB];
    let count = 0;
    candidates.forEach(d => {
      if (d < start) return;
      if (end && d > end) return;
      count++;
    });
    return count;
  }
  const monthsStep = freq === 'Monthly' ? 1 : freq === 'Quarterly' ? 3 : freq === 'Yearly' ? 12 : null;
  if (monthsStep == null) return 0;
  const startIdx = start.getFullYear() * 12 + start.getMonth();
  const targetIdx = viewYear * 12 + viewMonth;
  const diff = targetIdx - startIdx;
  if (diff < 0 || diff % monthsStep !== 0) return 0;
  if (end) {
    const endIdx = end.getFullYear() * 12 + end.getMonth();
    if (targetIdx > endIdx) return 0;
  }
  return 1;
}

export default class LedgerApp extends React.Component {
  state = (() => {
    const now = new Date();
    return {
      entries: [],
      bankAccounts: [],
      bankModalOpen: false,
      newBankName: '',
      view: 'overview',
      viewFilter: 'Both',
      viewYear: now.getFullYear(),
      viewMonth: now.getMonth(),
      modalOpen: false,
      modalType: 'income',
      editingId: null,
      formAmount: '',
      formDate: '',
      formCategory: '',
      formDescription: '',
      formFrequency: 'One-time',
      formOngoing: true,
      formEndDate: '',
      formBankAccount: '',
      formEarner: 'Me',
    };
  })();

  componentDidMount() {
    let entries = [];
    let bankAccounts = [];
    try { entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (e) {}
    try { bankAccounts = JSON.parse(localStorage.getItem(BANK_STORAGE_KEY) || '[]'); } catch (e) {}
    this.setState({ entries, bankAccounts });

    // Cloud sync (Firebase, via AuthGate) — instant local read above, then
    // the subscription below reconciles with whatever's in Firestore.
    if (this.props.cloud) {
      this.props.cloud.onChange((data) => {
        this.setState({
          entries: data.entries || [],
          bankAccounts: data.bankAccounts || [],
        });
      });
    }
  }

  persistBanks(bankAccounts) {
    try { localStorage.setItem(BANK_STORAGE_KEY, JSON.stringify(bankAccounts)); } catch (e) {}
    if (this.props.cloud) this.props.cloud.saveBanks(bankAccounts);
    this.setState({ bankAccounts });
  }

  openAddBank() { this.setState({ bankModalOpen: true, newBankName: '' }); }
  closeBankModal() { this.setState({ bankModalOpen: false }); }

  saveBank(e) {
    e.preventDefault();
    const name = this.state.newBankName.trim();
    if (!name) return;
    const exists = this.state.bankAccounts.some(b => b.toLowerCase() === name.toLowerCase());
    const banks = exists ? this.state.bankAccounts : [...this.state.bankAccounts, name];
    this.persistBanks(banks);
    const patch = { bankModalOpen: false, newBankName: '' };
    if (this.state.modalOpen && this.state.modalType === 'income') patch.formBankAccount = name;
    this.setState(patch);
  }

  removeBank(name) {
    this.persistBanks(this.state.bankAccounts.filter(b => b !== name));
    if (this.state.formBankAccount === name) this.setState({ formBankAccount: '' });
  }

  persist(entries) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); } catch (e) {}
    if (this.props.cloud) this.props.cloud.saveEntries(entries);
    this.setState({ entries });
  }

  setView(v) { this.setState({ view: v }); }

  changeMonth(delta) {
    this.setState(s => {
      let m = s.viewMonth + delta, y = s.viewYear;
      if (m < 0) { m = 11; y -= 1; } else if (m > 11) { m = 0; y += 1; }
      return { viewMonth: m, viewYear: y };
    });
  }

  openAdd(type) {
    const { viewYear, viewMonth } = this.state;
    const now = new Date();
    const isCurrent = now.getFullYear() === viewYear && now.getMonth() === viewMonth;
    const day = isCurrent ? now.getDate() : 1;
    const dateStr = viewYear + '-' + String(viewMonth + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
    const cats = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    this.setState({
      modalOpen: true, modalType: type, editingId: null,
      formAmount: '', formDate: dateStr, formCategory: cats[0],
      formDescription: '', formFrequency: 'One-time', formOngoing: true, formEndDate: '',
      formBankAccount: type === 'income' ? (this.state.bankAccounts[0] || '') : '',
      formEarner: 'Me',
    });
  }

  openEdit(entry) {
    this.setState({
      modalOpen: true, modalType: entry.type, editingId: entry.id,
      formAmount: String(entry.amount), formDate: entry.date, formCategory: entry.category,
      formDescription: entry.description || '', formFrequency: entry.frequency || 'One-time',
      formOngoing: entry.ongoing !== false, formEndDate: entry.endDate || '',
      formBankAccount: entry.type === 'income' ? (entry.bankAccount || '') : '',
      formEarner: entry.earner || 'Me',
    });
  }

  closeModal() { this.setState({ modalOpen: false }); }

  saveEntry(e) {
    e.preventDefault();
    const { entries, modalType, editingId, formAmount, formDate, formCategory, formDescription, formFrequency, formOngoing, formEndDate, formBankAccount, formEarner } = this.state;
    const amount = parseFloat(formAmount);
    if (!amount || amount <= 0 || !formDate) return;
    if (!formOngoing && !formEndDate) return;
    const bankAccount = modalType === 'income' ? formBankAccount : undefined;
    const earner = formEarner;
    const frequency = formFrequency;
    const endDate = formOngoing ? null : formEndDate;
    if (editingId) {
      const updated = entries.map(en => en.id === editingId
        ? { ...en, amount, date: formDate, category: formCategory, description: formDescription, frequency, ongoing: formOngoing, endDate, bankAccount, earner }
        : en);
      this.persist(updated);
    } else {
      const newEntry = {
        id: 'e' + Date.now() + Math.random().toString(36).slice(2, 7),
        type: modalType, amount, date: formDate, category: formCategory,
        description: formDescription, frequency, ongoing: formOngoing, endDate, bankAccount, earner,
      };
      this.persist([...entries, newEntry]);
    }
    this.setState({ modalOpen: false });
  }

  deleteEntry(id) {
    if (!window.confirm('Delete this entry?')) return;
    this.persist(this.state.entries.filter(en => en.id !== id));
  }

  setForm(field, value) { this.setState({ [field]: value }); }

  renderVals() {
    const { entries, view, viewFilter, viewYear, viewMonth, modalOpen, modalType, editingId,
      formAmount, formDate, formCategory, formDescription, formFrequency, formOngoing, formEndDate, formBankAccount, formEarner } = this.state;

    const fmtMoney = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
    const fmtDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const mapRow = (e, count, factor) => ({
      ...e,
      displayDate: fmtDate(e.date),
      displayAmount: fmtMoney(e.amount * factor * count) + (factor < 1 ? ' (½ split)' : ''),
      displayDescription: e.description && e.description.trim() ? e.description : '—',
      displayBankAccount: e.bankAccount || '—',
      displayEarner: e.earner || '—',
      categoryBg: categoryStyle(e.category, e.type).bg,
      categoryText: categoryStyle(e.category, e.type).text,
      frequencyLabel: (e.frequency || 'One-time')
        + (e.ongoing === false && e.endDate ? (' · Until ' + fmtDate(e.endDate)) : '')
        + (count > 1 ? ' ×' + count : ''),
      onEdit: () => this.openEdit(e),
      onDelete: () => this.deleteEntry(e.id),
    });

    const matchesFilter = (e) => {
      if (viewFilter === 'Both') return true;
      const earner = e.earner || 'Both';
      return earner === viewFilter || earner === 'Both';
    };
    const splitFactor = (e) => {
      const earner = e.earner || 'Both';
      return (viewFilter !== 'Both' && earner === 'Both') ? 0.5 : 1;
    };

    const activeIncome = entries.filter(e => e.type === 'income' && matchesFilter(e))
      .map(e => ({ entry: e, count: occurrencesInMonth(e, viewYear, viewMonth), factor: splitFactor(e) }))
      .filter(x => x.count > 0)
      .sort((a, b) => b.entry.date.localeCompare(a.entry.date));
    const activeExpense = entries.filter(e => e.type === 'expense' && matchesFilter(e))
      .map(e => ({ entry: e, count: occurrencesInMonth(e, viewYear, viewMonth), factor: splitFactor(e) }))
      .filter(x => x.count > 0)
      .sort((a, b) => b.entry.date.localeCompare(a.entry.date));

    const incomeEntries = activeIncome.map(x => mapRow(x.entry, x.count, x.factor));
    const expenseEntries = activeExpense.map(x => mapRow(x.entry, x.count, x.factor));

    const totalIncome = activeIncome.reduce((s, x) => s + x.entry.amount * x.count * x.factor, 0);
    const totalExpense = activeExpense.reduce((s, x) => s + x.entry.amount * x.count * x.factor, 0);
    const net = totalIncome - totalExpense;

    const groupByCategory = (activeList, type) => {
      const map = {};
      activeList.forEach(x => {
        const val = x.entry.amount * x.count * x.factor;
        map[x.entry.category] = (map[x.entry.category] || 0) + val;
      });
      return Object.keys(map).map(k => ({ label: k, value: map[k], color: categoryStyle(k, type).bg, displayValue: fmtMoney(map[k]) }))
        .sort((a, b) => b.value - a.value);
    };
    const incomeDonut = buildDonutSegments(groupByCategory(activeIncome, 'income'), 70);
    const expenseDonut = buildDonutSegments(groupByCategory(activeExpense, 'expense'), 70);
    const overallDonut = buildDonutSegments([
      { label: 'Income', value: totalIncome, color: 'oklch(60% 0.19 145)', displayValue: fmtMoney(totalIncome) },
      { label: 'Expenses', value: totalExpense, color: 'oklch(58% 0.22 25)', displayValue: fmtMoney(totalExpense) },
    ], 70);
    const overallHasData = (totalIncome + totalExpense) > 0;

    const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const categoryOptions = modalType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    const navBg = (active) => active ? 'color-mix(in srgb, var(--color-accent) 14%, transparent)' : 'transparent';
    const navColor = (active) => active ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-text) 75%, transparent)';

    return {
      filterIsMe: viewFilter === 'Me',
      filterIsWife: viewFilter === 'Wife',
      filterIsBoth: viewFilter === 'Both',
      onFilterChange: (e) => this.setState({ viewFilter: e.target.value }),
      isModalIncome: modalType === 'income',
      isModalExpense: modalType === 'expense',
      rentalCategoryOptions: RENTAL_CATEGORIES,
      personalCategoryOptions: PERSONAL_CATEGORIES,
      otherExpenseCategoryOptions: OTHER_EXPENSE_CATEGORIES,
      bankAccounts: this.state.bankAccounts,
      hasBanks: this.state.bankAccounts.length > 0,
      noBanks: this.state.bankAccounts.length === 0,
      bankTagList: this.state.bankAccounts.map(b => ({ name: b, onRemove: () => this.removeBank(b) })),
      formBankAccount,
      onBankAccountChange: (e) => {
        const v = e.target.value;
        if (v === '__add_new__') this.openAddBank(); else this.setForm('formBankAccount', v);
      },
      bankModalOpen: this.state.bankModalOpen,
      newBankName: this.state.newBankName,
      onNewBankNameChange: (e) => this.setState({ newBankName: e.target.value }),
      openAddBank: () => this.openAddBank(),
      closeBankModal: () => this.closeBankModal(),
      saveBank: (e) => this.saveBank(e),
      formFrequency,
      frequencyOptions: FREQUENCIES,
      onFrequencyChange: (e) => this.setForm('formFrequency', e.target.value),
      formOngoing,
      formNotOngoing: !formOngoing,
      onOngoingChange: (e) => this.setForm('formOngoing', e.target.checked),
      formEndDate,
      onEndDateChange: (e) => this.setForm('formEndDate', e.target.value),
      earnerLabel: modalType === 'income' ? 'Earner' : 'Paid by',
      earnerIsMe: formEarner === 'Me',
      earnerIsWife: formEarner === 'Wife',
      earnerIsBoth: formEarner === 'Both',
      onEarnerChange: (e) => this.setForm('formEarner', e.target.value),
      isOverview: view === 'overview',
      isIncome: view === 'income',
      isExpense: view === 'expense',
      pageTitle: view === 'overview' ? 'Overview' : view === 'income' ? 'Income' : 'Expenses',
      monthLabel,
      prevMonth: () => this.changeMonth(-1),
      nextMonth: () => this.changeMonth(1),
      setViewOverview: () => this.setView('overview'),
      setViewIncome: () => this.setView('income'),
      setViewExpense: () => this.setView('expense'),
      overviewNavBg: navBg(view === 'overview'), overviewNavColor: navColor(view === 'overview'),
      incomeNavBg: navBg(view === 'income'), incomeNavColor: navColor(view === 'income'),
      expenseNavBg: navBg(view === 'expense'), expenseNavColor: navColor(view === 'expense'),
      netDisplay: (net >= 0 ? '' : '−') + fmtMoney(Math.abs(net)),
      netColor: net >= 0 ? 'var(--color-accent-300)' : 'var(--color-text)',
      addIncome: () => this.openAdd('income'),
      addExpense: () => this.openAdd('expense'),
      totalIncomeDisplay: fmtMoney(totalIncome),
      totalExpenseDisplay: fmtMoney(totalExpense),
      incomeEntries, expenseEntries,
      incomeDonut, expenseDonut, overallDonut, overallHasData,
      incomeEmpty: incomeEntries.length === 0,
      incomeHasRows: incomeEntries.length > 0,
      expenseEmpty: expenseEntries.length === 0,
      expenseHasRows: expenseEntries.length > 0,
      modalOpen,
      modalTitle: (editingId ? 'Edit ' : 'Add ') + (modalType === 'income' ? 'Income' : 'Expense'),
      closeModal: () => this.closeModal(),
      stopClick: (e) => e.stopPropagation(),
      saveEntry: (e) => this.saveEntry(e),
      formAmount, formDate, formCategory, formDescription,
      categoryOptions,
      onAmountChange: (e) => this.setForm('formAmount', e.target.value),
      onDateChange: (e) => this.setForm('formDate', e.target.value),
      onCategoryChange: (e) => this.setForm('formCategory', e.target.value),
      onDescriptionChange: (e) => this.setForm('formDescription', e.target.value),
    };
  }

  render() {
    const vm = this.renderVals();
    return (
      <div className="ledger-shell" style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>

        <aside className="ledger-sidebar" style={{ width: 230, flex: 'none', padding: 'var(--space-6) var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', borderRight: '1px solid var(--color-divider)', overflowX: 'auto' }}>
          <div className="ledger-brand">
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', fontSize: 19 }}>Ledger</div>
            <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 50%, transparent)', marginTop: 2 }}>Monthly tracker</div>
          </div>
          <nav className="ledger-nav" style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 'none' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', border: 'none', borderRadius: 'var(--radius-md)', background: vm.overviewNavBg, color: vm.overviewNavColor, font: 'inherit', fontSize: 14, cursor: 'pointer', textAlign: 'left' }} onClick={vm.setViewOverview}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="8" height="8" rx="1.5"></rect><rect x="13" y="3" width="8" height="8" rx="1.5"></rect><rect x="3" y="13" width="8" height="8" rx="1.5"></rect><rect x="13" y="13" width="8" height="8" rx="1.5"></rect></svg>
              Overview
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', border: 'none', borderRadius: 'var(--radius-md)', background: vm.incomeNavBg, color: vm.incomeNavColor, font: 'inherit', fontSize: 14, cursor: 'pointer', textAlign: 'left' }} onClick={vm.setViewIncome}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 16V8M8 12l4-4 4 4"></path></svg>
              Income
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', border: 'none', borderRadius: 'var(--radius-md)', background: vm.expenseNavBg, color: vm.expenseNavColor, font: 'inherit', fontSize: 14, cursor: 'pointer', textAlign: 'left' }} onClick={vm.setViewExpense}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12l4 4 4-4"></path></svg>
              Expenses
            </button>
            <div className="hr" style={{ margin: 'var(--space-2) 0' }}></div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', border: 'none', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-accent)', font: 'inherit', fontSize: 14, cursor: 'pointer', textAlign: 'left' }} onClick={vm.openAddBank}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"></path></svg>
              Add bank
            </button>
          </nav>
          {this.props.userEmail && (
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', wordBreak: 'break-all' }}>{this.props.userEmail}</div>
              <button className="btn btn-secondary" style={{ fontSize: 12 }} onClick={this.props.onSignOut}>Sign out</button>
            </div>
          )}
        </aside>

        <main className="ledger-main" style={{ flex: 1, padding: 'var(--space-8) var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minWidth: 0 }}>
          <div className="ledger-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <h2 className="ledger-page-title" style={{ margin: 0 }}>{vm.pageTitle}</h2>
            <div className="ledger-header-controls" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <div className="ledger-month-nav" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <button aria-label="Previous month" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-text)', cursor: 'pointer' }} onClick={vm.prevMonth}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"></path></svg>
                </button>
                <div style={{ fontSize: 14, minWidth: 130, textAlign: 'center', color: 'color-mix(in srgb, var(--color-text) 85%, transparent)' }}>{vm.monthLabel}</div>
                <button aria-label="Next month" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-text)', cursor: 'pointer' }} onClick={vm.nextMonth}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"></path></svg>
                </button>
              </div>
              <div className="seg ledger-seg-center">
                <label className="seg-opt">
                  <input type="radio" name="viewFilter" value="Me" checked={vm.filterIsMe} onChange={vm.onFilterChange} />
                  Me
                </label>
                <label className="seg-opt">
                  <input type="radio" name="viewFilter" value="Wife" checked={vm.filterIsWife} onChange={vm.onFilterChange} />
                  Wife
                </label>
                <label className="seg-opt">
                  <input type="radio" name="viewFilter" value="Both" checked={vm.filterIsBoth} onChange={vm.onFilterChange} />
                  Both
                </label>
              </div>
            </div>
          </div>

          {vm.isOverview && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-6)' }}>
              <div className="ledger-net-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-8) calc(var(--space-8) * 2)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', maxWidth: '100%' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)', textAlign: 'center' }}>Net balance · {vm.monthLabel}</div>
                <div className="ledger-net-value" style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', fontSize: 56, letterSpacing: '-0.02em', color: vm.netColor }}>{vm.netDisplay}</div>
                <div style={{ fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>Income minus expenses this month</div>
              </div>
              {vm.overallHasData && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>Income vs expenses</div>
                  <svg width="150" height="150" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="var(--color-divider)" strokeWidth="22"></circle>
                    {vm.overallDonut.map((seg, i) => (
                      <circle key={i} cx="80" cy="80" r="70" fill="none" stroke={seg.color} strokeWidth="22" strokeDasharray={seg.dasharray} strokeDashoffset={seg.dashoffset} transform="rotate(-90 80 80)"></circle>
                    ))}
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
                    {vm.overallDonut.map((seg, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: seg.color, flex: 'none' }}></span>
                        <span style={{ flex: 1 }}>{seg.label}</span>
                        <span style={{ color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>{seg.displayValue} · {seg.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {vm.isIncome && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>Total income this month: <span style={{ color: 'var(--color-accent-300)', fontWeight: 600 }}>{vm.totalIncomeDisplay}</span></div>
              {vm.incomeHasRows && (
                <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                  <svg width="140" height="140" viewBox="0 0 160 160" style={{ flex: 'none' }}>
                    <circle cx="80" cy="80" r="70" fill="none" stroke="var(--color-divider)" strokeWidth="22"></circle>
                    {vm.incomeDonut.map((seg, i) => (
                      <circle key={i} cx="80" cy="80" r="70" fill="none" stroke={seg.color} strokeWidth="22" strokeDasharray={seg.dasharray} strokeDashoffset={seg.dashoffset} transform="rotate(-90 80 80)"></circle>
                    ))}
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 160 }}>
                    {vm.incomeDonut.map((seg, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: seg.color, flex: 'none' }}></span>
                        <span style={{ flex: 1 }}>{seg.label}</span>
                        <span style={{ color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>{seg.displayValue} · {seg.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {vm.incomeEmpty && (
                <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', border: '1px dashed var(--color-divider)', borderRadius: 'var(--radius-md)' }}>No income entries this month yet.</div>
              )}
              {vm.incomeHasRows && (
                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table className="table">
                    <thead><tr><th>Date</th><th>Category</th><th>Account</th><th>Earner</th><th>Description</th><th>Frequency</th><th>Amount</th><th></th></tr></thead>
                    <tbody>
                      {vm.incomeEntries.map((entry) => (
                        <tr key={entry.id}>
                          <td>{entry.displayDate}</td>
                          <td><span className="tag" style={{ background: entry.categoryBg, color: entry.categoryText }}>{entry.category}</span></td>
                          <td style={{ color: 'color-mix(in srgb, var(--color-text) 75%, transparent)' }}>{entry.displayBankAccount}</td>
                          <td style={{ color: 'color-mix(in srgb, var(--color-text) 75%, transparent)' }}>{entry.displayEarner}</td>
                          <td style={{ color: 'color-mix(in srgb, var(--color-text) 75%, transparent)' }}>{entry.displayDescription}</td>
                          <td>{entry.frequencyLabel}</td>
                          <td style={{ fontWeight: 600 }}>{entry.displayAmount}</td>
                          <td>
                            <div style={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                              <button aria-label="Edit" style={{ display: 'flex', padding: 6, border: 'none', background: 'transparent', borderRadius: 'var(--radius-sm)', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', cursor: 'pointer' }} onClick={entry.onEdit}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"></path></svg>
                              </button>
                              <button aria-label="Delete" style={{ display: 'flex', padding: 6, border: 'none', background: 'transparent', borderRadius: 'var(--radius-sm)', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', cursor: 'pointer' }} onClick={entry.onDelete}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13"></path></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <button className="btn btn-primary btn-block" style={{ marginTop: 0 }} onClick={vm.addIncome}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"></path></svg>
                Add income
              </button>
            </div>
          )}

          {vm.isExpense && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>Total expenses this month: <span style={{ color: 'var(--color-accent-300)', fontWeight: 600 }}>{vm.totalExpenseDisplay}</span></div>
              {vm.expenseHasRows && (
                <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
                  <svg width="140" height="140" viewBox="0 0 160 160" style={{ flex: 'none' }}>
                    <circle cx="80" cy="80" r="70" fill="none" stroke="var(--color-divider)" strokeWidth="22"></circle>
                    {vm.expenseDonut.map((seg, i) => (
                      <circle key={i} cx="80" cy="80" r="70" fill="none" stroke={seg.color} strokeWidth="22" strokeDasharray={seg.dasharray} strokeDashoffset={seg.dashoffset} transform="rotate(-90 80 80)"></circle>
                    ))}
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 160 }}>
                    {vm.expenseDonut.map((seg, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: seg.color, flex: 'none' }}></span>
                        <span style={{ flex: 1 }}>{seg.label}</span>
                        <span style={{ color: 'color-mix(in srgb, var(--color-text) 60%, transparent)' }}>{seg.displayValue} · {seg.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {vm.expenseEmpty && (
                <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', border: '1px dashed var(--color-divider)', borderRadius: 'var(--radius-md)' }}>No expense entries this month yet.</div>
              )}
              {vm.expenseHasRows && (
                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table className="table">
                    <thead><tr><th>Date</th><th>Category</th><th>Paid by</th><th>Description</th><th>Frequency</th><th>Amount</th><th></th></tr></thead>
                    <tbody>
                      {vm.expenseEntries.map((entry) => (
                        <tr key={entry.id}>
                          <td>{entry.displayDate}</td>
                          <td><span className="tag" style={{ background: entry.categoryBg, color: entry.categoryText }}>{entry.category}</span></td>
                          <td style={{ color: 'color-mix(in srgb, var(--color-text) 75%, transparent)' }}>{entry.displayEarner}</td>
                          <td style={{ color: 'color-mix(in srgb, var(--color-text) 75%, transparent)' }}>{entry.displayDescription}</td>
                          <td>{entry.frequencyLabel}</td>
                          <td style={{ fontWeight: 600 }}>{entry.displayAmount}</td>
                          <td>
                            <div style={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                              <button aria-label="Edit" style={{ display: 'flex', padding: 6, border: 'none', background: 'transparent', borderRadius: 'var(--radius-sm)', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', cursor: 'pointer' }} onClick={entry.onEdit}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"></path></svg>
                              </button>
                              <button aria-label="Delete" style={{ display: 'flex', padding: 6, border: 'none', background: 'transparent', borderRadius: 'var(--radius-sm)', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', cursor: 'pointer' }} onClick={entry.onDelete}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13"></path></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <button className="btn btn-primary btn-block" style={{ marginTop: 0 }} onClick={vm.addExpense}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"></path></svg>
                Add expense
              </button>
            </div>
          )}
        </main>

        {vm.modalOpen && (
          <div className="dialog-backdrop" onClick={vm.closeModal}>
            <form className="dialog" onSubmit={vm.saveEntry} onClick={vm.stopClick}>
              <div className="dialog-title">{vm.modalTitle}</div>
              <div className="field">
                <label>Amount</label>
                <input className="input" type="number" min="0.01" step="0.01" required value={vm.formAmount} onChange={vm.onAmountChange} placeholder="0.00" />
              </div>
              <div className="field">
                <label>Date</label>
                <input className="input" type="date" required value={vm.formDate} onChange={vm.onDateChange} />
              </div>
              <div className="field">
                <label>Category</label>
                <select className="input" value={vm.formCategory} onChange={vm.onCategoryChange}>
                  {vm.isModalIncome && vm.categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                  {vm.isModalExpense && (
                    <>
                      <optgroup label="Rental Property">
                        {vm.rentalCategoryOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Personal Property">
                        {vm.personalCategoryOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </optgroup>
                      {vm.otherExpenseCategoryOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              {vm.isModalIncome && (
                <div className="field">
                  <label>Bank account</label>
                  {vm.hasBanks && (
                    <select className="input" value={vm.formBankAccount} onChange={vm.onBankAccountChange}>
                      {vm.bankAccounts.map((acc) => (
                        <option key={acc} value={acc}>{acc}</option>
                      ))}
                      <option value="__add_new__">+ Add new bank account…</option>
                    </select>
                  )}
                  {vm.noBanks && (
                    <button type="button" className="btn btn-secondary btn-block" style={{ marginTop: 0 }} onClick={vm.openAddBank}>+ Add a bank account</button>
                  )}
                </div>
              )}
              <div className="field">
                <label>{vm.earnerLabel}</label>
                <div className="seg">
                  <label className="seg-opt">
                    <input type="radio" name="earner" value="Me" checked={vm.earnerIsMe} onChange={vm.onEarnerChange} />
                    Me
                  </label>
                  <label className="seg-opt">
                    <input type="radio" name="earner" value="Wife" checked={vm.earnerIsWife} onChange={vm.onEarnerChange} />
                    Wife
                  </label>
                  <label className="seg-opt">
                    <input type="radio" name="earner" value="Both" checked={vm.earnerIsBoth} onChange={vm.onEarnerChange} />
                    Both
                  </label>
                </div>
              </div>
              <div className="field">
                <label>Description</label>
                <input className="input" type="text" value={vm.formDescription} onChange={vm.onDescriptionChange} placeholder="Optional note" />
              </div>
              <div className="field">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--color-text)' }}>
                  <input type="checkbox" checked={vm.formOngoing} onChange={vm.onOngoingChange} style={{ width: 16, height: 16, accentColor: 'var(--color-accent)', cursor: 'pointer' }} />
                  Current (ongoing, no end date)
                </label>
              </div>
              <div className="field">
                <label>Recurrence</label>
                <select className="input" value={vm.formFrequency} onChange={vm.onFrequencyChange}>
                  {vm.frequencyOptions.map((freq) => (
                    <option key={freq} value={freq}>{freq}</option>
                  ))}
                </select>
              </div>
              {vm.formNotOngoing && (
                <div className="field">
                  <label>End date</label>
                  <input className="input" type="date" required value={vm.formEndDate} onChange={vm.onEndDateChange} />
                </div>
              )}
              <div className="dialog-actions">
                <button type="button" className="btn btn-secondary" onClick={vm.closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        )}

        {vm.bankModalOpen && (
          <div className="dialog-backdrop" onClick={vm.closeBankModal}>
            <form className="dialog" style={{ width: 'min(380px,100%)' }} onSubmit={vm.saveBank} onClick={vm.stopClick}>
              <div className="dialog-title">Add bank account</div>
              <div className="field">
                <label>Bank name</label>
                <input className="input" type="text" required value={vm.newBankName} onChange={vm.onNewBankNameChange} placeholder="e.g. Chase Checking" />
              </div>
              {vm.hasBanks && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>Saved banks</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {vm.bankTagList.map((bank) => (
                      <span key={bank.name} className="tag tag-neutral" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        {bank.name}
                        <button type="button" aria-label="Remove bank" onClick={bank.onRemove} style={{ display: 'flex', padding: 0, border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer', opacity: 0.7 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="dialog-actions">
                <button type="button" className="btn btn-secondary" onClick={vm.closeBankModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}
