import type { IndustryPreset } from "../types/calculator";

export const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: "graphic-design",
    name: "Graphic Design",
    complexityMultiplier: 1.3,
    taxBufferPct: 28,
    defaultHourlyRate: 60,
  },
  {
    id: "software-dev",
    name: "Software Dev",
    complexityMultiplier: 1.5,
    taxBufferPct: 25,
    defaultHourlyRate: 100,
  },
  {
    id: "consulting",
    name: "Consulting",
    complexityMultiplier: 1.4,
    taxBufferPct: 30,
    defaultHourlyRate: 150,
  },
  {
    id: "copywriting",
    name: "Copywriting",
    complexityMultiplier: 1.2,
    taxBufferPct: 25,
    defaultHourlyRate: 75,
  },
];
