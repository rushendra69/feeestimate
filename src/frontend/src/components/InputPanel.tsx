import { INDUSTRY_PRESETS } from "../lib/presets";
import type { CalculatorInputs, IndustryPreset } from "../types/calculator";

interface InputPanelProps {
  inputs: CalculatorInputs;
  updateInput: <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K],
  ) => void;
  resetToPreset: (preset: IndustryPreset) => void;
  activePresetId: string | null;
}

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
];

export default function InputPanel({
  inputs,
  updateInput,
  resetToPreset,
  activePresetId,
}: InputPanelProps) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      {/* A. Industry Presets */}
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wide">
          Quick Presets
        </p>
        <div className="flex flex-wrap gap-2">
          {INDUSTRY_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => resetToPreset(preset)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors duration-200 ${
                activePresetId === preset.id
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
              }`}
              data-ocid={`preset.${preset.id}.button`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* B. Currency Selector */}
      <div className="mb-6">
        <label
          htmlFor="currency-select"
          className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wide"
        >
          Currency
        </label>
        <select
          id="currency-select"
          value={inputs.currency}
          onChange={(e) =>
            updateInput(
              "currency",
              e.target.value as CalculatorInputs["currency"],
            )
          }
          className="border border-slate-200 rounded-xl p-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          data-ocid="currency.select"
        >
          {CURRENCY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* C. Project Parameters */}
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Project Parameters
      </h2>

      {/* Hourly Rate + Hours */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label
            htmlFor="hourly-rate"
            className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wide"
          >
            Hourly Rate
          </label>
          <input
            id="hourly-rate"
            type="number"
            value={inputs.hourlyRate}
            onChange={(e) =>
              updateInput("hourlyRate", Number.parseFloat(e.target.value) || 0)
            }
            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-semibold"
            data-ocid="hourly_rate.input"
          />
        </div>
        <div>
          <label
            htmlFor="estimated-hours"
            className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wide"
          >
            Est. Hours
          </label>
          <input
            id="estimated-hours"
            type="number"
            value={inputs.estimatedHours}
            onChange={(e) =>
              updateInput(
                "estimatedHours",
                Number.parseFloat(e.target.value) || 0,
              )
            }
            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-semibold"
            data-ocid="estimated_hours.input"
          />
        </div>
      </div>

      {/* Complexity Multiplier */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label
            htmlFor="complexity-slider"
            className="text-xs font-bold text-slate-400 uppercase tracking-wide"
          >
            Complexity Multiplier
          </label>
          <span className="text-xs font-bold text-indigo-600">
            {inputs.complexityMultiplier.toFixed(1)}x
          </span>
        </div>
        <input
          id="complexity-slider"
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={inputs.complexityMultiplier}
          onChange={(e) =>
            updateInput(
              "complexityMultiplier",
              Number.parseFloat(e.target.value),
            )
          }
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          style={{ accentColor: "#6366f1" }}
          data-ocid="complexity.slider"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Standard</span>
          <span>High Complexity</span>
        </div>
      </div>

      {/* Revision Rounds */}
      <div className="mb-6">
        <label
          htmlFor="revision-rounds"
          className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wide"
        >
          Revision Rounds
        </label>
        <input
          id="revision-rounds"
          type="number"
          value={inputs.revisionRounds}
          min="0"
          onChange={(e) =>
            updateInput(
              "revisionRounds",
              Number.parseInt(e.target.value, 10) || 0,
            )
          }
          className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-semibold"
          data-ocid="revision_rounds.input"
        />
      </div>

      {/* D. Hidden Costs */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        {/* Tax Buffer */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="tax-buffer"
            className="text-sm font-medium text-slate-600"
          >
            Tax Buffer (Self-Employment)
          </label>
          <div className="flex items-center gap-2">
            <input
              id="tax-buffer"
              type="number"
              value={inputs.taxBufferPct}
              onChange={(e) =>
                updateInput(
                  "taxBufferPct",
                  Number.parseFloat(e.target.value) || 0,
                )
              }
              className="w-16 p-1 border border-slate-200 rounded text-center text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
              data-ocid="tax_buffer.input"
            />
            <span className="text-sm font-bold text-slate-400">%</span>
          </div>
        </div>

        {/* Operating Expenses */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="operating-expenses"
            className="text-sm font-medium text-slate-600"
          >
            Operating Expenses (per project)
          </label>
          <input
            id="operating-expenses"
            type="number"
            value={inputs.operatingExpenses}
            onChange={(e) =>
              updateInput(
                "operatingExpenses",
                Number.parseFloat(e.target.value) || 0,
              )
            }
            className="w-24 p-1 border border-slate-200 rounded text-center text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            data-ocid="operating_expenses.input"
          />
        </div>

        {/* Non-Billable Time */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="non-billable-time"
            className="text-sm font-medium text-slate-600"
          >
            Non-Billable Time Overhead
          </label>
          <div className="flex items-center gap-2">
            <input
              id="non-billable-time"
              type="number"
              value={inputs.nonBillableTimePct}
              onChange={(e) =>
                updateInput(
                  "nonBillableTimePct",
                  Number.parseFloat(e.target.value) || 0,
                )
              }
              className="w-16 p-1 border border-slate-200 rounded text-center text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
              data-ocid="non_billable_time.input"
            />
            <span className="text-sm font-bold text-slate-400">%</span>
          </div>
        </div>

        {/* Safety Margin Toggle */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="safety-margin"
            className="text-sm font-medium text-slate-600 italic"
          >
            Include 15% Safety Margin?
          </label>
          <input
            id="safety-margin"
            type="checkbox"
            checked={inputs.includeSafetyMargin}
            onChange={(e) =>
              updateInput("includeSafetyMargin", e.target.checked)
            }
            className="w-5 h-5 rounded cursor-pointer"
            style={{ accentColor: "#6366f1" }}
            data-ocid="safety_margin.checkbox"
          />
        </div>
      </div>
    </div>
  );
}
