/** Standard amortization formula for the monthly principal & interest payment. */
export function monthlyPrincipalInterest(loanAmount, annualInterestRatePercent, termYears) {
  const principal = Number(loanAmount) || 0;
  const n = (Number(termYears) || 0) * 12;
  if (principal <= 0 || n <= 0) return 0;
  const r = (Number(annualInterestRatePercent) || 0) / 100 / 12;
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return principal * (r * factor) / (factor - 1);
}

export function monthlyMortgageTotal(mortgage) {
  const pi = monthlyPrincipalInterest(mortgage.loanAmount, mortgage.interestRate, mortgage.termYears);
  const monthlyRate = (Number(mortgage.interestRate) || 0) / 100 / 12;
  // First-payment split: interest = remaining balance × monthly rate (balance = full loan amount before any payment); principal = M - interest.
  const interestPortion = (Number(mortgage.loanAmount) || 0) * monthlyRate;
  const principalPortion = pi > 0 ? pi - interestPortion : 0;
  const escrow = (Number(mortgage.homeInsurance) || 0) + (Number(mortgage.floodInsurance) || 0) + (Number(mortgage.propertyTax) || 0) + (Number(mortgage.condoFee) || 0);
  const extra = Number(mortgage.extraPayment) || 0;
  return { principalInterest: pi, interestPortion, principalPortion, total: pi + escrow + extra };
}
