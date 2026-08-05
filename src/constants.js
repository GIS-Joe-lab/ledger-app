export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Rental', 'Gift', 'Other'];
export const EXPENSE_CATEGORIES = ['Utilities', 'Groceries', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Car Insurance', 'Mobile Plan', 'Landscaping', 'Mortgage', 'Other'];
export const MORTGAGE_CATEGORIES = ['Mortgage'];
export const STORAGE_KEY = 'nocturne-ledger-entries-v1';
export const BANK_STORAGE_KEY = 'nocturne-ledger-banks-v1';
export const FREQUENCIES = ['One-time', 'Weekly', 'Bi-weekly', 'Monthly', 'Bi-monthly', 'Quarterly', 'Yearly'];

/* 10 hues, 36° apart; each in a deep + light variant so any two colors
   differ by hue (>=36°) or by lightness band (~28%+), never both close. */
export const PALETTE = {
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

export const CATEGORY_COLORS = {
  Salary: PALETTE.plainBlue, Freelance: PALETTE.plainGreen, Investment: PALETTE.plainYellow,
  Rental: PALETTE.plainPurple, Gift: PALETTE.plainPink, Other: PALETTE.lavender,
  Mortgage: PALETTE.lemon,
  Utilities: PALETTE.turquoise, Groceries: PALETTE.gold, Transport: PALETTE.navy, Entertainment: PALETTE.coralPink,
  Health: PALETTE.deepTeal, Shopping: PALETTE.burntOrange, 'Car Insurance': PALETTE.periwinkle, 'Mobile Plan': PALETTE.olive,
  Landscaping: PALETTE.mint,
};
