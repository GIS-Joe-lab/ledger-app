export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Rental', 'Gift', 'Other'];
export const EXPENSE_CATEGORIES = ['Utilities', 'Groceries', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Car Insurance', 'Mobile Plan', 'Landscaping', 'Mortgage', 'Other'];
export const MORTGAGE_CATEGORIES = ['Mortgage'];
export const STORAGE_KEY = 'nocturne-ledger-entries-v1';
export const BANK_STORAGE_KEY = 'nocturne-ledger-banks-v1';
export const FREQUENCIES = ['One-time', 'Weekly', 'Bi-weekly', 'Monthly', 'Bi-monthly', 'Quarterly', 'Yearly'];

/* A distinct categorical set — hues spread around the wheel at mid value and
   moderate chroma, so any two read apart at a 9-10px swatch or a bar segment
   while still sitting on the paper ground. Only ever shown as a small mark,
   never as a fill behind text. `text` is the paper tone for the rare label. */
export const PALETTE = {
  blue:       { bg: '#3663b3', text: '#f4f1e8' },
  teal:       { bg: '#2f8f8c', text: '#f4f1e8' },
  green:      { bg: '#3f9b4e', text: '#f4f1e8' },
  olive:      { bg: '#94a033', text: '#20240c' },
  pink:       { bg: '#c5518f', text: '#f4f1e8' },
  warmgray:   { bg: '#8a8072', text: '#f4f1e8' },
  brown:      { bg: '#7a4a30', text: '#f4f1e8' },
  sky:        { bg: '#3a9ac9', text: '#12242e' },
  gold:       { bg: '#c39320', text: '#221c07' },
  indigoblue: { bg: '#6a5bbe', text: '#f4f1e8' },
  coral:      { bg: '#d85c47', text: '#f4f1e8' },
  emerald:    { bg: '#2c9d7a', text: '#f4f1e8' },
  purple:     { bg: '#9a4fae', text: '#f4f1e8' },
  navy:       { bg: '#2d4c84', text: '#f4f1e8' },
  moss:       { bg: '#6f9a3c', text: '#171e0c' },
  sage:       { bg: '#4a8f6b', text: '#f4f1e8' },
  plainOrange:{ bg: '#c17a2e', text: '#241708' },
};

export const CATEGORY_COLORS = {
  Salary: PALETTE.blue, Freelance: PALETTE.teal, Investment: PALETTE.green,
  Rental: PALETTE.olive, Gift: PALETTE.pink, Other: PALETTE.warmgray,
  Mortgage: PALETTE.brown,
  Utilities: PALETTE.sky, Groceries: PALETTE.gold, Transport: PALETTE.indigoblue, Entertainment: PALETTE.coral,
  Health: PALETTE.emerald, Shopping: PALETTE.purple, 'Car Insurance': PALETTE.navy, 'Mobile Plan': PALETTE.moss,
  Landscaping: PALETTE.sage,
};
