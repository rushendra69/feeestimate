import { evaluate } from "mathjs";
import type {
  CalculatorInputs,
  QuoteResult,
  VibeStatus,
} from "../types/calculator";

export function calculateQuote(inputs: CalculatorInputs): QuoteResult {
  const {
    hourlyRate,
    estimatedHours,
    complexityMultiplier,
    taxBufferPct,
    operatingExpenses,
    includeSafetyMargin,
  } = inputs;

  // Base labor
  const baseLabor: number = evaluate(`${estimatedHours} * ${hourlyRate}`);

  // Apply complexity multiplier
  let subtotal: number = evaluate(`${baseLabor} * ${complexityMultiplier}`);

  // Apply 15% safety margin if enabled
  if (includeSafetyMargin) {
    subtotal = evaluate(`${subtotal} * 1.15`);
  }

  // Total fee = subtotal + expenses
  const totalFee: number = evaluate(`${subtotal} + ${operatingExpenses}`);

  // Buffer amount = everything above base labor and expenses
  const bufferAmount: number = evaluate(
    `${totalFee} - ${baseLabor} - ${operatingExpenses}`,
  );

  // Tax set-aside on fee minus expenses
  const taxRate = taxBufferPct / 100;
  const taxSetAside: number = evaluate(
    `(${totalFee} - ${operatingExpenses}) * ${taxRate}`,
  );

  // Take-home pay
  const takeHomePay: number = evaluate(
    `${totalFee} - ${taxSetAside} - ${operatingExpenses}`,
  );

  // Business fund = operating expenses
  const businessFund = operatingExpenses;

  // Net profit percentage
  const netProfitPct: number =
    totalFee > 0 ? evaluate(`(${takeHomePay} / ${totalFee}) * 100`) : 0;

  // Vibe status
  let vibeStatus: VibeStatus;
  if (netProfitPct < 50) {
    vibeStatus = "too-low";
  } else if (netProfitPct <= 70) {
    vibeStatus = "fair";
  } else {
    vibeStatus = "premium";
  }

  return {
    totalFee,
    baseLabor,
    bufferAmount,
    taxSetAside,
    takeHomePay,
    businessFund,
    netProfitPct,
    vibeStatus,
  };
}
