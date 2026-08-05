import React from 'react';

const base = { fill: 'none', stroke: 'currentColor' };

export function GridIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="1.8">
      <rect x="3" y="3" width="8" height="8" rx="1.5"></rect>
      <rect x="13" y="3" width="8" height="8" rx="1.5"></rect>
      <rect x="3" y="13" width="8" height="8" rx="1.5"></rect>
      <rect x="13" y="13" width="8" height="8" rx="1.5"></rect>
    </svg>
  );
}

export function IncomeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 16V8M8 12l4-4 4 4"></path>
    </svg>
  );
}

export function ExpenseIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 8v8M8 12l4 4 4-4"></path>
    </svg>
  );
}

export function PlusIcon({ size = 18, strokeWidth = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M12 5v14M5 12h14"></path>
    </svg>
  );
}

export function ChevronLeftIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6l-6 6 6 6"></path>
    </svg>
  );
}

export function ChevronRightIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6"></path>
    </svg>
  );
}

export function EditIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"></path>
    </svg>
  );
}

export function TrashIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13"></path>
    </svg>
  );
}

export function CloseIcon({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="2.4" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18"></path>
    </svg>
  );
}
