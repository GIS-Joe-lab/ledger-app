import React from 'react';

const stopClick = (e) => e.stopPropagation();

export default function EntryModal({
  modalTitle, onClose, onSubmit,
  formAmount, onAmountChange,
  formDate, onDateChange,
  formCategory, onCategoryChange, isModalIncome, isModalExpense,
  categoryOptions, rentalCategoryOptions, personalCategoryOptions, otherExpenseCategoryOptions,
  hasBanks, noBanks, bankAccounts, formBankAccount, onBankAccountChange, onAddBank,
  earnerLabel, formEarner, onEarnerChange,
  formDescription, onDescriptionChange,
  formOngoing, onOngoingChange, formNotOngoing, formEndDate, onEndDateChange,
  formFrequency, frequencyOptions, onFrequencyChange,
  formAutoPay, onAutoPayChange, formAutoPayDate, onAutoPayDateChange,
}) {
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <form className="dialog" onSubmit={onSubmit} onClick={stopClick}>
        <div className="dialog-title">{modalTitle}</div>

        <div className="field">
          <label>Amount</label>
          <input className="input" type="number" min="0.01" step="0.01" required value={formAmount} onChange={onAmountChange} placeholder="0.00" />
        </div>

        <div className="field">
          <label>Date</label>
          <input className="input" type="date" required value={formDate} onChange={onDateChange} />
        </div>

        <div className="field">
          <label>Category</label>
          <select className="input" value={formCategory} onChange={onCategoryChange}>
            {isModalIncome && categoryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            {isModalExpense && (
              <>
                <optgroup label="Rental Property">
                  {rentalCategoryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </optgroup>
                <optgroup label="Personal Property">
                  {personalCategoryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </optgroup>
                {otherExpenseCategoryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </>
            )}
          </select>
        </div>

        <div className="field">
          <label>{isModalIncome ? 'Bank account' : 'Account'}</label>
          {hasBanks && (
            <select className="input" value={formBankAccount} onChange={onBankAccountChange}>
              {bankAccounts.map((acc) => <option key={acc} value={acc}>{acc}</option>)}
              <option value="__add_new__">+ Add new bank account…</option>
            </select>
          )}
          {noBanks && (
            <button type="button" className="btn btn-secondary btn-block" style={{ marginTop: 0 }} onClick={onAddBank}>+ Add a bank account</button>
          )}
        </div>

        {isModalExpense && (
          <div className="field">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--color-text)' }}>
              <input type="checkbox" checked={formAutoPay} onChange={onAutoPayChange} style={{ width: 16, height: 16, accentColor: 'var(--color-accent)', cursor: 'pointer' }} />
              Auto pay
            </label>
          </div>
        )}

        {isModalExpense && formAutoPay && (
          <div className="field">
            <label>Auto pay date</label>
            <input className="input" type="date" required value={formAutoPayDate} onChange={onAutoPayDateChange} />
          </div>
        )}

        <div className="field">
          <label>{earnerLabel}</label>
          <div className="seg">
            <label className="seg-opt">
              <input type="radio" name="earner" value="Me" checked={formEarner === 'Me'} onChange={onEarnerChange} />
              Me
            </label>
            <label className="seg-opt">
              <input type="radio" name="earner" value="Wife" checked={formEarner === 'Wife'} onChange={onEarnerChange} />
              Wife
            </label>
            <label className="seg-opt">
              <input type="radio" name="earner" value="Both" checked={formEarner === 'Both'} onChange={onEarnerChange} />
              Both
            </label>
          </div>
        </div>

        <div className="field">
          <label>Description</label>
          <input className="input" type="text" value={formDescription} onChange={onDescriptionChange} placeholder="Optional note" />
        </div>

        <div className="field">
          <label>Recurrence</label>
          <select className="input" value={formFrequency} onChange={onFrequencyChange}>
            {frequencyOptions.map((freq) => <option key={freq} value={freq}>{freq}</option>)}
          </select>
        </div>

        {formFrequency !== 'One-time' && (
          <div className="field">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--color-text)' }}>
              <input type="checkbox" checked={formOngoing} onChange={onOngoingChange} style={{ width: 16, height: 16, accentColor: 'var(--color-accent)', cursor: 'pointer' }} />
              Current (ongoing, no end date)
            </label>
          </div>
        )}

        {formFrequency !== 'One-time' && formNotOngoing && (
          <div className="field">
            <label>End date</label>
            <input className="input" type="date" required value={formEndDate} onChange={onEndDateChange} />
          </div>
        )}

        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}
