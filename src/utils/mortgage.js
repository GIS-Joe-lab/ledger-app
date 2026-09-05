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

  // Escrow & fees only count toward the payment when the lender collects them
  // (escrowIncluded). Undefined means an entry made before this option existed,
  // which was always computed with escrow — so treat that as included.
  const escrowIncluded = mortgage.escrowIncluded !== false;
  const homeInsurance = escrowIncluded ? (Number(mortgage.homeInsurance) || 0) : 0;
  const floodInsurance = escrowIncluded ? (Number(mortgage.floodInsurance) || 0) : 0;
  const propertyTax = escrowIncluded ? (Number(mortgage.propertyTax) || 0) : 0;
  const condoFee = escrowIncluded ? (Number(mortgage.condoFee) || 0) : 0;
  const escrow = homeInsurance + floodInsurance + propertyTax + condoFee;
  const extraPayment = Number(mortgage.extraPayment) || 0;

  return {
    principalInterest: pi,
    interestPortion,
    principalPortion,
    escrowIncluded,
    homeInsurance,
    floodInsurance,
    propertyTax,
    condoFee,
    escrow,
    extraPayment,
    total: pi + escrow + extraPayment,
  };
}
