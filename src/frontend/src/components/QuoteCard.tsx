import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../lib/formatCurrency";
import type { CalculatorInputs, QuoteResult } from "../types/calculator";

interface QuoteCardProps {
  inputs: CalculatorInputs;
  result: QuoteResult;
}

const VIBE_CONFIG = {
  "too-low": {
    label: "🔴 Too Low — Price Higher!",
    className: "bg-red-500/20 text-red-400 border border-red-500/30",
  },
  fair: {
    label: "🟡 Fair Price",
    className: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  },
  premium: {
    label: "🟢 Premium Rate",
    className:
      "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  },
};

function netPctBadgeClass(pct: number): string {
  if (pct >= 70) return "bg-emerald-500/20 text-emerald-400";
  if (pct >= 50) return "bg-yellow-500/20 text-yellow-400";
  return "bg-red-500/20 text-red-400";
}

export default function QuoteCard({ inputs, result }: QuoteCardProps) {
  const [copied, setCopied] = useState(false);
  const { currency } = inputs;
  const fmt = (n: number) => formatCurrency(n, currency);
  const vibe = VIBE_CONFIG[result.vibeStatus];

  const pieData = [
    {
      name: "Take-Home",
      value: Math.max(0, result.takeHomePay),
      fill: "#22c55e",
    },
    {
      name: "Tax Set-Aside",
      value: Math.max(0, result.taxSetAside),
      fill: "#ef4444",
    },
    {
      name: "Expenses",
      value: Math.max(0, result.businessFund),
      fill: "#818cf8",
    },
  ];

  const handleCopy = () => {
    const text = [
      "=== PROJECT QUOTE ===",
      `Hourly Rate: ${fmt(inputs.hourlyRate)}`,
      `Estimated Hours: ${inputs.estimatedHours}`,
      `Complexity: ${inputs.complexityMultiplier.toFixed(1)}x`,
      `Tax Buffer: ${inputs.taxBufferPct}%`,
      `Base Labor: ${fmt(result.baseLabor)}`,
      `Tax Set-Aside: ${fmt(result.taxSetAside)}`,
      `Take-Home Profit: ${fmt(result.takeHomePay)}`,
      "========================",
      `TOTAL PROJECT FEE: ${fmt(result.totalFee)}`,
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="bg-indigo-900 p-8 rounded-[2rem] text-white shadow-2xl shadow-indigo-200"
      data-ocid="quote_card.panel"
    >
      {/* Header */}
      <p className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-2">
        Recommended Project Quote
      </p>
      <div
        className="text-6xl font-extrabold mb-3"
        data-ocid="quote_card.total_fee"
      >
        {fmt(result.totalFee)}
      </div>

      {/* Vibe badge */}
      <div className="mb-6">
        <span
          className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${vibe.className}`}
          data-ocid="quote_card.vibe_badge"
        >
          {vibe.label}
        </span>
      </div>

      {/* Line items */}
      <div className="space-y-0">
        <div className="flex justify-between items-center py-3 border-t border-indigo-800">
          <span className="text-indigo-300 text-sm">Base Labor</span>
          <span className="font-bold" data-ocid="quote_card.base_labor">
            {fmt(result.baseLabor)}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-t border-indigo-800">
          <span className="text-indigo-300 text-sm italic">
            Complexity + Safety Buffers
          </span>
          <span
            className="font-bold text-emerald-400"
            data-ocid="quote_card.buffer_amount"
          >
            +{fmt(result.bufferAmount)}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-t border-indigo-800">
          <span className="text-indigo-300 text-sm">
            Estimated Tax Set-Aside
          </span>
          <span
            className="font-bold text-red-400"
            data-ocid="quote_card.tax_set_aside"
          >
            -{fmt(result.taxSetAside)}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-t border-indigo-800">
          <span className="text-indigo-300 text-sm">
            Business Fund (Expenses)
          </span>
          <span className="font-bold" data-ocid="quote_card.business_fund">
            {fmt(result.businessFund)}
          </span>
        </div>
      </div>

      {/* Take-Home box */}
      <div className="flex justify-between items-center py-4 border-t border-indigo-700 mt-4 bg-indigo-950/50 rounded-xl px-4">
        <div>
          <span className="block text-xs font-bold text-indigo-400 uppercase tracking-wide mb-1">
            Actual Take-Home Profit
          </span>
          <span
            className="text-2xl font-black text-white"
            data-ocid="quote_card.take_home_pay"
          >
            {fmt(result.takeHomePay)}
          </span>
        </div>
        <div className="text-right">
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${netPctBadgeClass(result.netProfitPct)}`}
            data-ocid="quote_card.net_pct_badge"
          >
            {Math.round(result.netProfitPct)}% Net
          </span>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-6" data-ocid="quote_card.pie_chart">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              dataKey="value"
            >
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => fmt(value)}
              contentStyle={{
                background: "#1e1b4b",
                border: "none",
                borderRadius: 8,
                color: "#fff",
              }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#c7d2fe", fontSize: 12 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Copy button */}
      <button
        type="button"
        onClick={handleCopy}
        className="w-full mt-8 bg-white text-indigo-900 font-bold py-4 rounded-2xl hover:bg-indigo-50 transition-colors duration-200 active:scale-95"
        data-ocid="quote_card.copy_button"
      >
        {copied ? "✓ Copied!" : "Copy Quote Summary"}
      </button>
    </div>
  );
}
