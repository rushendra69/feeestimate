import { useCallback, useEffect, useState } from "react";
import { calculateQuote } from "../lib/calculator";
import type {
  CalculatorInputs,
  IndustryPreset,
  QuoteResult,
} from "../types/calculator";

const STORAGE_KEY = "feeestimate_hourly_rate";

const DEFAULT_INPUTS: CalculatorInputs = {
  hourlyRate: 50,
  estimatedHours: 20,
  complexityMultiplier: 1.0,
  taxBufferPct: 25,
  operatingExpenses: 50,
  includeSafetyMargin: true,
  revisionRounds: 2,
  currency: "USD",
  nonBillableTimePct: 10,
};

export function useCalculator(): {
  inputs: CalculatorInputs;
  updateInput: <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K],
  ) => void;
  result: QuoteResult;
  resetToPreset: (preset: IndustryPreset) => void;
} {
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedRate = saved ? Number.parseFloat(saved) : null;
    return {
      ...DEFAULT_INPUTS,
      hourlyRate:
        savedRate && !Number.isNaN(savedRate)
          ? savedRate
          : DEFAULT_INPUTS.hourlyRate,
    };
  });

  // Persist hourlyRate to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(inputs.hourlyRate));
  }, [inputs.hourlyRate]);

  const updateInput = useCallback(
    <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetToPreset = useCallback((preset: IndustryPreset) => {
    setInputs((prev) => ({
      ...prev,
      complexityMultiplier: preset.complexityMultiplier,
      taxBufferPct: preset.taxBufferPct,
      hourlyRate: preset.defaultHourlyRate,
    }));
  }, []);

  const result = calculateQuote(inputs);

  return { inputs, updateInput, result, resetToPreset };
}
