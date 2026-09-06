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

  // Property tax may be entered as a yearly figure (what most bills quote) or a
  // monthly one. `propertyTax` in the return is always the monthly amount that
  // feeds the payment. A missing period means an entry made before this option
  // existed, whose stored figure was always monthly.
  const propertyTaxPeriod = mortgage.propertyTaxPeriod === 'year' ? 'year' : 'month';
  const propertyTaxInput = Number(mortgage.propertyTax) || 0;
  const propertyTaxAnnual = propertyTaxPeriod === 'year' ? propertyTaxInput : propertyTaxInput * 12;
  const propertyTaxMonthly = propertyTaxPeriod === 'year' ? propertyTaxInput / 12 : propertyTaxInput;

  const homeInsurance = escrowIncluded ? (Number(mortgage.homeInsurance) || 0) : 0;
  const floodInsurance = escrowIncluded ? (Number(mortgage.floodInsurance) || 0) : 0;
  const propertyTax = escrowIncluded ? propertyTaxMonthly : 0;
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
    propertyTaxPeriod,
    propertyTaxAnnual: escrowIncluded ? propertyTaxAnnual : 0,
    condoFee,
    escrow,
    extraPayment,
    total: pi + escrow + extraPayment,
  };
}
