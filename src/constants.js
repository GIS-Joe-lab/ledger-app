export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Rental', 'Gift', 'Other'];
export const EXPENSE_CATEGORIES = ['Utilities', 'Groceries', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Car Insurance', 'Mobile Plan', 'Landscaping', 'Mortgage', 'Other'];
export const MORTGAGE_CATEGORIES = ['Mortgage'];
export const STORAGE_KEY = 'nocturne-ledger-entries-v1';
export const BANK_STORAGE_KEY = 'nocturne-ledger-banks-v1';
export const FREQUENCIES = ['One-time', 'Weekly', 'Bi-weekly', 'Monthly', 'Bi-monthly', 'Quarterly', 'Yearly'];

/* Muted printer's inks that sit on the paper ground — used only as a small
   swatch or ring segment, never as a fill behind text. Each is mid-value
   (L ~40–55%) and low-chroma so no two fight on the page; `text` is the
   paper tone for the rare case a swatch carries a label. */
export const PALETTE = {
  indigo:     { bg: '#3f4d70', text: '#f4f1e8' },
  pine:       { bg: '#3f5c4a', text: '#f4f1e8' },
  ochre:      { bg: '#8a6d3c', text: '#f4f1e8' },
  plum:       { bg: '#6b4b63', text: '#f4f1e8' },
  rose:       { bg: '#8a5750', text: '#f4f1e8' },
  warmgray:   { bg: '#726a58', text: '#f4f1e8' },
  walnut:     { bg: '#6f4a37', text: '#f4f1e8' },
  teal:       { bg: '#3d6066', text: '#f4f1e8' },
  olive:      { bg: '#6b6a3c', text: '#f4f1e8' },
  steel:      { bg: '#4a5a72', text: '#f4f1e8' },
  terracotta: { bg: '#9a5a44', text: '#f4f1e8' },
  sea:        { bg: '#3f6b63', text: '#f4f1e8' },
  rust:       { bg: '#8a5636', text: '#f4f1e8' },
  bluegray:   { bg: '#556884', text: '#f4f1e8' },
  moss:       { bg: '#5c6b47', text: '#f4f1e8' },
  fern:       { bg: '#4f6b4e', text: '#f4f1e8' },
  plainOrange:{ bg: '#8a5636', text: '#f4f1e8' },
};

export const CATEGORY_COLORS = {
  Salary: PALETTE.indigo, Freelance: PALETTE.pine, Investment: PALETTE.ochre,
  Rental: PALETTE.plum, Gift: PALETTE.rose, Other: PALETTE.warmgray,
  Mortgage: PALETTE.walnut,
  Utilities: PALETTE.teal, Groceries: PALETTE.olive, Transport: PALETTE.steel, Entertainment: PALETTE.terracotta,
  Health: PALETTE.sea, Shopping: PALETTE.rust, 'Car Insurance': PALETTE.bluegray, 'Mobile Plan': PALETTE.moss,
  Landscaping: PALETTE.fern,
};
