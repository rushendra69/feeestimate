export type Currency = "USD" | "EUR" | "GBP";

export type VibeStatus = "too-low" | "fair" | "premium";

export interface CalculatorInputs {
  hourlyRate: number;
  estimatedHours: number;
  complexityMultiplier: number; // 1.0 – 2.0
  taxBufferPct: number;
  operatingExpenses: number;
  includeSafetyMargin: boolean;
  revisionRounds: number;
  currency: Currency;
  nonBillableTimePct: number;
}

export interface QuoteResult {
  totalFee: number;
  baseLabor: number;
  bufferAmount: number;
  taxSetAside: number;
  takeHomePay: number;
  businessFund: number;
  netProfitPct: number;
  vibeStatus: VibeStatus;
}

export interface IndustryPreset {
  id: string;
  name: string;
  complexityMultiplier: number;
  taxBufferPct: number;
  defaultHourlyRate: number;
}
