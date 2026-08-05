export function parseISODate(d) {
  const [y, m, day] = d.split('-').map(Number);
  return new Date(y, m - 1, day);
}

export function occurrencesInMonth(entry, viewYear, viewMonth) {
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
