import React from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, MORTGAGE_CATEGORIES, STORAGE_KEY, BANK_STORAGE_KEY, FREQUENCIES } from './constants.js';
import { categoryStyle } from './utils/category.js';
import { buildDonutSegments } from './utils/donut.js';
import { occurrencesInMonth } from './utils/recurrence.js';
import { fmtMoney, fmtDate } from './utils/format.js';
import { monthlyMortgageTotal } from './utils/mortgage.js';
import Sidebar from './components/Sidebar.jsx';
import MonthHeader from './components/MonthHeader.jsx';
import OverviewView from './components/OverviewView.jsx';
import IncomeView from './components/IncomeView.jsx';
import ExpenseView from './components/ExpenseView.jsx';
import EntryModal from './components/EntryModal.jsx';
import BankModal from './components/BankModal.jsx';
import MortgageModal from './components/MortgageModal.jsx';

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
      formTitle: '',
      formAmount: '',
      formDate: '',
      formCategory: '',
      formDescription: '',
      formFrequency: 'One-time',
      formOngoing: true,
      formEndDate: '',
      formBankAccount: '',
      formEarner: 'Me',
      formAutoPay: false,
      formAutoPayDate: '',
      mortgageModalOpen: false,
      formMortgageLoanAmount: '',
      formMortgageInterestRate: '',
      formMortgageTermYears: '',
      formMortgageHomeInsurance: '',
      formMortgageFloodInsurance: '',
      formMortgagePropertyTax: '',
      formMortgageExtraPayment: '',
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

  openAddBank = () => this.setState({ bankModalOpen: true, newBankName: '' });
  closeBankModal = () => this.setState({ bankModalOpen: false });

  saveBank = (e) => {
    e.preventDefault();
    const name = this.state.newBankName.trim();
    if (!name) return;
    const exists = this.state.bankAccounts.some(b => b.toLowerCase() === name.toLowerCase());
    const banks = exists ? this.state.bankAccounts : [...this.state.bankAccounts, name];
    this.persistBanks(banks);
    const patch = { bankModalOpen: false, newBankName: '' };
    if (this.state.modalOpen) patch.formBankAccount = name;
    this.setState(patch);
  };

  removeBank(name) {
    this.persistBanks(this.state.bankAccounts.filter(b => b !== name));
    if (this.state.formBankAccount === name) this.setState({ formBankAccount: '' });
  }

  persist(entries) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); } catch (e) {}
    if (this.props.cloud) this.props.cloud.saveEntries(entries);
    this.setState({ entries });
  }

  setView = (v) => this.setState({ view: v });

  changeMonth = (delta) => {
    this.setState(s => {
      let m = s.viewMonth + delta, y = s.viewYear;
      if (m < 0) { m = 11; y -= 1; } else if (m > 11) { m = 0; y += 1; }
      return { viewMonth: m, viewYear: y };
    });
  };

  openAdd(type) {
    const { viewYear, viewMonth } = this.state;
    const now = new Date();
    const isCurrent = now.getFullYear() === viewYear && now.getMonth() === viewMonth;
    const day = isCurrent ? now.getDate() : 1;
    const dateStr = viewYear + '-' + String(viewMonth + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
    this.setState({
      modalOpen: true, modalType: type, editingId: null,
      formTitle: '', formAmount: '', formDate: dateStr, formCategory: '',
      formDescription: '', formFrequency: 'One-time', formOngoing: true, formEndDate: '',
      formBankAccount: this.state.bankAccounts[0] || '',
      formEarner: 'Me',
      formAutoPay: false, formAutoPayDate: '',
      formMortgageLoanAmount: '', formMortgageInterestRate: '', formMortgageTermYears: '',
      formMortgageHomeInsurance: '', formMortgageFloodInsurance: '', formMortgagePropertyTax: '', formMortgageExtraPayment: '',
    });
  }

  openEdit(entry) {
    const m = entry.mortgage || {};
    this.setState({
      modalOpen: true, modalType: entry.type, editingId: entry.id,
      formTitle: entry.title || '',
      formAmount: String(entry.amount), formDate: entry.date, formCategory: entry.category,
      formDescription: entry.description || '', formFrequency: entry.frequency || 'One-time',
      formOngoing: entry.ongoing !== false, formEndDate: entry.endDate || '',
      formBankAccount: entry.bankAccount || '',
      formEarner: entry.earner || 'Me',
      formAutoPay: entry.autoPay || false, formAutoPayDate: entry.autoPayDate || '',
      formMortgageLoanAmount: entry.mortgage ? String(m.loanAmount) : '',
      formMortgageInterestRate: entry.mortgage ? String(m.interestRate) : '',
      formMortgageTermYears: entry.mortgage ? String(m.termYears) : '',
      formMortgageHomeInsurance: entry.mortgage ? String(m.homeInsurance) : '',
      formMortgageFloodInsurance: entry.mortgage ? String(m.floodInsurance) : '',
      formMortgagePropertyTax: entry.mortgage ? String(m.propertyTax) : '',
      formMortgageExtraPayment: entry.mortgage ? String(m.extraPayment) : '',
    });
  }

  closeModal = () => this.setState({ modalOpen: false });

  isMortgageCategory(category) {
    return MORTGAGE_CATEGORIES.includes(category);
  }

  openMortgageModal = () => this.setState({ mortgageModalOpen: true });
  closeMortgageModal = () => this.setState({ mortgageModalOpen: false });

  getMortgageDraft() {
    const { formMortgageLoanAmount, formMortgageInterestRate, formMortgageTermYears, formMortgageHomeInsurance, formMortgageFloodInsurance, formMortgagePropertyTax, formMortgageExtraPayment } = this.state;
    return {
      loanAmount: parseFloat(formMortgageLoanAmount) || 0,
      interestRate: parseFloat(formMortgageInterestRate) || 0,
      termYears: parseFloat(formMortgageTermYears) || 0,
      homeInsurance: parseFloat(formMortgageHomeInsurance) || 0,
      floodInsurance: parseFloat(formMortgageFloodInsurance) || 0,
      propertyTax: parseFloat(formMortgagePropertyTax) || 0,
      extraPayment: parseFloat(formMortgageExtraPayment) || 0,
    };
  }

  applyMortgage = () => {
    const { total } = monthlyMortgageTotal(this.getMortgageDraft());
    this.setState({ formAmount: total > 0 ? (Math.round(total * 100) / 100).toFixed(2) : '', mortgageModalOpen: false });
  };

  onCategoryChange = (e) => {
    const value = e.target.value;
    const patch = { formCategory: value };
    if (this.isMortgageCategory(value)) patch.formFrequency = 'Monthly';
    this.setState(patch, () => {
      if (this.isMortgageCategory(value)) this.openMortgageModal();
    });
  };

  saveEntry = (e) => {
    e.preventDefault();
    const { entries, modalType, editingId, formTitle, formAmount, formDate, formCategory, formDescription, formFrequency, formOngoing, formEndDate, formBankAccount, formEarner, formAutoPay, formAutoPayDate } = this.state;
    const isMortgage = modalType === 'expense' && this.isMortgageCategory(formCategory);
    const amount = parseFloat(formAmount);
    const title = formTitle.trim();
    if (!title || !amount || amount <= 0 || !formDate || !formCategory) return;
    if (!formOngoing && !formEndDate) return;
    const autoPay = modalType === 'expense' ? formAutoPay : false;
    if (autoPay && !formAutoPayDate) return;
    const bankAccount = formBankAccount;
    const earner = formEarner;
    const frequency = isMortgage ? 'Monthly' : formFrequency;
    const endDate = formOngoing ? null : formEndDate;
    const autoPayDate = autoPay ? formAutoPayDate : null;
    const mortgage = isMortgage ? this.getMortgageDraft() : undefined;
    if (editingId) {
      const updated = entries.map(en => en.id === editingId
        ? { ...en, title, amount, date: formDate, category: formCategory, description: formDescription, frequency, ongoing: formOngoing, endDate, bankAccount, earner, autoPay, autoPayDate, mortgage }
        : en);
      this.persist(updated);
    } else {
      const newEntry = {
        id: 'e' + Date.now() + Math.random().toString(36).slice(2, 7),
        type: modalType, title, amount, date: formDate, category: formCategory,
        description: formDescription, frequency, ongoing: formOngoing, endDate, bankAccount, earner, autoPay, autoPayDate, mortgage,
      };
      this.persist([...entries, newEntry]);
    }
    this.setState({ modalOpen: false });
  };

  deleteEntry(id) {
    if (!window.confirm('Delete this entry?')) return;
    this.persist(this.state.entries.filter(en => en.id !== id));
  }

  setForm(field, value) { this.setState({ [field]: value }); }

  onFilterChange = (e) => this.setState({ viewFilter: e.target.value });
  onEarnerChange = (e) => this.setForm('formEarner', e.target.value);
  onOngoingChange = (e) => this.setForm('formOngoing', e.target.checked);
  onEndDateChange = (e) => this.setForm('formEndDate', e.target.value);
  onFrequencyChange = (e) => {
    const value = e.target.value;
    if (value === 'One-time') {
      this.setState({ formFrequency: value, formOngoing: true, formEndDate: '' });
    } else {
      this.setForm('formFrequency', value);
    }
  };
  onAutoPayChange = (e) => this.setForm('formAutoPay', e.target.checked);
  onAutoPayDateChange = (e) => this.setForm('formAutoPayDate', e.target.value);
  onAmountChange = (e) => this.setForm('formAmount', e.target.value);
  onDateChange = (e) => this.setForm('formDate', e.target.value);
  onDescriptionChange = (e) => this.setForm('formDescription', e.target.value);
  onTitleChange = (e) => this.setForm('formTitle', e.target.value);
  onMortgageLoanAmountChange = (e) => this.setForm('formMortgageLoanAmount', e.target.value);
  onMortgageInterestRateChange = (e) => this.setForm('formMortgageInterestRate', e.target.value);
  onMortgageTermYearsChange = (e) => this.setForm('formMortgageTermYears', e.target.value);
  onMortgageHomeInsuranceChange = (e) => this.setForm('formMortgageHomeInsurance', e.target.value);
  onMortgageFloodInsuranceChange = (e) => this.setForm('formMortgageFloodInsurance', e.target.value);
  onMortgagePropertyTaxChange = (e) => this.setForm('formMortgagePropertyTax', e.target.value);
  onMortgageExtraPaymentChange = (e) => this.setForm('formMortgageExtraPayment', e.target.value);
  onNewBankNameChange = (e) => this.setState({ newBankName: e.target.value });
  onBankAccountChange = (e) => {
    const v = e.target.value;
    if (v === '__add_new__') this.openAddBank(); else this.setForm('formBankAccount', v);
  };

  /** Derives every display-ready value the views need from raw state. */
  computeViewModel() {
    const { entries, viewFilter, viewYear, viewMonth, modalType } = this.state;

    const mapRow = (e, count, factor) => ({
      ...e,
      displayTitle: e.title && e.title.trim() ? e.title : '—',
      displayDate: fmtDate(e.date),
      displayAmount: fmtMoney(e.amount * factor * count) + (factor < 1 ? ' (½ split)' : ''),
      displayDescription: e.description && e.description.trim() ? e.description : '—',
      displayBankAccount: e.bankAccount || '—',
      displayEarner: e.earner || '—',
      displayAutoPayDate: e.autoPayDate ? fmtDate(e.autoPayDate) : '—',
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

    const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const categoryOptions = [...(modalType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES)].sort((a, b) => a.localeCompare(b));

    return {
      incomeEntries, expenseEntries, incomeDonut, expenseDonut, overallDonut,
      overallHasData: (totalIncome + totalExpense) > 0,
      totalIncome, totalExpense, net,
      totalIncomeDisplay: fmtMoney(totalIncome),
      totalExpenseDisplay: fmtMoney(totalExpense),
      netDisplay: (net >= 0 ? '' : '−') + fmtMoney(Math.abs(net)),
      netColor: net >= 0 ? 'var(--color-accent-300)' : 'var(--color-text)',
      incomeEmpty: incomeEntries.length === 0,
      incomeHasRows: incomeEntries.length > 0,
      expenseEmpty: expenseEntries.length === 0,
      expenseHasRows: expenseEntries.length > 0,
      monthLabel,
      categoryOptions,
    };
  }

  render() {
    const { entries, bankAccounts, bankModalOpen, newBankName, view, viewFilter, modalOpen, modalType, editingId,
      formTitle, formAmount, formDate, formCategory, formDescription, formFrequency, formOngoing, formEndDate, formBankAccount, formEarner,
      formAutoPay, formAutoPayDate, mortgageModalOpen,
      formMortgageLoanAmount, formMortgageInterestRate, formMortgageTermYears,
      formMortgageHomeInsurance, formMortgageFloodInsurance, formMortgagePropertyTax, formMortgageExtraPayment } = this.state;
    const vm = this.computeViewModel();
    const { onSignOut } = this.props;

    const bankTagList = bankAccounts.map(b => ({ name: b, onRemove: () => this.removeBank(b) }));
    const isMortgageCategory = modalType === 'expense' && this.isMortgageCategory(formCategory);
    const { principalInterest: mortgagePI, interestPortion: mortgageInterestPortion, principalPortion: mortgagePrincipalPortion, total: mortgageTotal } = monthlyMortgageTotal(this.getMortgageDraft());
    const mortgageCanApply = parseFloat(formMortgageLoanAmount) > 0 && parseFloat(formMortgageInterestRate) >= 0 && parseFloat(formMortgageTermYears) > 0;

    return (
      <div className="ledger-shell" style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>
        <Sidebar view={view} onSetView={this.setView} onAddBank={this.openAddBank} onSignOut={onSignOut} />

        <main className="ledger-main" style={{ flex: 1, padding: 'var(--space-8) var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minWidth: 0 }}>
          <MonthHeader
            pageTitle={view === 'overview' ? 'Overview' : view === 'income' ? 'Income' : 'Expenses'}
            monthLabel={vm.monthLabel}
            onPrevMonth={() => this.changeMonth(-1)}
            onNextMonth={() => this.changeMonth(1)}
            viewFilter={viewFilter}
            onFilterChange={this.onFilterChange}
          />

          {view === 'overview' && (
            <OverviewView monthLabel={vm.monthLabel} netDisplay={vm.netDisplay} netColor={vm.netColor} overallHasData={vm.overallHasData} overallDonut={vm.overallDonut} />
          )}

          {view === 'income' && (
            <IncomeView
              totalIncomeDisplay={vm.totalIncomeDisplay}
              incomeDonut={vm.incomeDonut}
              incomeEntries={vm.incomeEntries}
              incomeEmpty={vm.incomeEmpty}
              incomeHasRows={vm.incomeHasRows}
              onAddIncome={() => this.openAdd('income')}
            />
          )}

          {view === 'expense' && (
            <ExpenseView
              totalExpenseDisplay={vm.totalExpenseDisplay}
              expenseDonut={vm.expenseDonut}
              expenseEntries={vm.expenseEntries}
              expenseEmpty={vm.expenseEmpty}
              expenseHasRows={vm.expenseHasRows}
              onAddExpense={() => this.openAdd('expense')}
            />
          )}
        </main>

        {modalOpen && (
          <EntryModal
            modalTitle={(editingId ? 'Edit ' : 'Add ') + (modalType === 'income' ? 'Income' : 'Expense')}
            onClose={this.closeModal}
            onSubmit={this.saveEntry}
            formTitle={formTitle} onTitleChange={this.onTitleChange}
            formAmount={formAmount} onAmountChange={this.onAmountChange}
            formDate={formDate} onDateChange={this.onDateChange}
            formCategory={formCategory} onCategoryChange={this.onCategoryChange}
            isModalIncome={modalType === 'income'} isModalExpense={modalType === 'expense'}
            categoryOptions={vm.categoryOptions}
            hasBanks={bankAccounts.length > 0} noBanks={bankAccounts.length === 0}
            bankAccounts={bankAccounts} formBankAccount={formBankAccount} onBankAccountChange={this.onBankAccountChange}
            onAddBank={this.openAddBank}
            earnerLabel={modalType === 'income' ? 'Earner' : 'Paid by'}
            formEarner={formEarner} onEarnerChange={this.onEarnerChange}
            formDescription={formDescription} onDescriptionChange={this.onDescriptionChange}
            formOngoing={formOngoing} onOngoingChange={this.onOngoingChange}
            formNotOngoing={!formOngoing}
            formEndDate={formEndDate} onEndDateChange={this.onEndDateChange}
            formFrequency={formFrequency} frequencyOptions={FREQUENCIES} onFrequencyChange={this.onFrequencyChange}
            formAutoPay={formAutoPay} onAutoPayChange={this.onAutoPayChange}
            formAutoPayDate={formAutoPayDate} onAutoPayDateChange={this.onAutoPayDateChange}
            isMortgageCategory={isMortgageCategory} onOpenMortgageModal={this.openMortgageModal}
          />
        )}

        {modalOpen && mortgageModalOpen && (
          <MortgageModal
            loanAmount={formMortgageLoanAmount} onLoanAmountChange={this.onMortgageLoanAmountChange}
            interestRate={formMortgageInterestRate} onInterestRateChange={this.onMortgageInterestRateChange}
            termYears={formMortgageTermYears} onTermYearsChange={this.onMortgageTermYearsChange}
            homeInsurance={formMortgageHomeInsurance} onHomeInsuranceChange={this.onMortgageHomeInsuranceChange}
            floodInsurance={formMortgageFloodInsurance} onFloodInsuranceChange={this.onMortgageFloodInsuranceChange}
            propertyTax={formMortgagePropertyTax} onPropertyTaxChange={this.onMortgagePropertyTaxChange}
            extraPayment={formMortgageExtraPayment} onExtraPaymentChange={this.onMortgageExtraPaymentChange}
            principalInterest={mortgagePI} interestPortion={mortgageInterestPortion} principalPortion={mortgagePrincipalPortion} total={mortgageTotal} canApply={mortgageCanApply}
            onCancel={this.closeMortgageModal} onApply={this.applyMortgage}
          />
        )}

        {bankModalOpen && (
          <BankModal
            newBankName={newBankName}
            onNewBankNameChange={this.onNewBankNameChange}
            onSubmit={this.saveBank}
            onClose={this.closeBankModal}
            hasBanks={bankAccounts.length > 0}
            bankTagList={bankTagList}
          />
        )}
      </div>
    );
  }
}
