import { useState } from "react";
import AdBanner from "../components/AdBanner";
import Footer from "../components/Footer";
import InputPanel from "../components/InputPanel";
import Navbar from "../components/Navbar";
import QuoteCard from "../components/QuoteCard";
import { useCalculator } from "../hooks/useCalculator";
import type { IndustryPreset } from "../types/calculator";

export default function CalculatorPage() {
  const { inputs, updateInput, result, resetToPreset } = useCalculator();
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const handleResetToPreset = (preset: IndustryPreset) => {
    resetToPreset(preset);
    setActivePresetId(preset.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Top Ad Banner */}
      <AdBanner slot="top" />

      {/* Main content */}
      <main
        className="flex-1 w-full max-w-6xl mx-auto px-6 py-8"
        data-ocid="calculator.page"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Inputs */}
          <InputPanel
            inputs={inputs}
            updateInput={updateInput}
            resetToPreset={handleResetToPreset}
            activePresetId={activePresetId}
          />

          {/* Right: Quote Card */}
          <div className="lg:sticky lg:top-24">
            <QuoteCard inputs={inputs} result={result} />
          </div>
        </div>
      </main>

      {/* Bottom Ad Banner */}
      <AdBanner slot="bottom" />

      {/* Footer */}
      <Footer />
    </div>
  );
}
