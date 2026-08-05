import { PALETTE, CATEGORY_COLORS } from '../constants.js';

export function categoryStyle(category, type) {
  if (category === 'Other' && type === 'income') return PALETTE.plainOrange;
  return CATEGORY_COLORS[category] || { bg: 'var(--color-neutral-700)', text: 'var(--color-neutral-100)' };
}
