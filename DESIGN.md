# FeeEstimate Design System

## Aesthetic Direction
Premium Modern Finance Tool. Professional, transparent, clarity-focused. Precision-driven with clean surface hierarchy. Visual anchor: dark indigo-900 quote card (right), control interface: white input card (left).

## Color Palette (Light Mode)
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary (Indigo-600) | 0.55 0.22 260 | CTA, accents, sliders |
| Background (Off-white) | 0.98 0 0 | Page bg, base surface |
| Card (White) | 1.0 0 0 | Input cards, sections |
| Foreground (Dark Grey) | 0.2 0 0 | Body text, primary copy |
| Muted (Light Grey) | 0.93 0 0 | Secondary text, disabled |
| Border (Almost White) | 0.92 0 0 | Input borders, dividers |

## Color Palette (Dark Mode)
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary (Indigo-400) | 0.68 0.22 260 | CTA, accents |
| Background (Almost Black) | 0.12 0 0 | Page bg |
| Card (Dark Slate) | 0.15 0 0 | Sections |
| Foreground (White) | 0.96 0 0 | Body text |
| Card Special (Indigo-900) | 0.15 0 0 | Quote display card |

## Typography
| Layer | Font | Use |
|-------|------|-----|
| Display | Plus Jakarta Sans 700 | Headings, large numbers (quote total) |
| Body | Plus Jakarta Sans 400/500 | Form labels, body copy |
| Mono | System monospace | Code blocks, currency values |

## Structural Zones
| Zone | Surface | Treatment |
|------|---------|-----------|
| Navbar | White | border-b, sticky top, indigo-600 icon |
| Hero/Ads | Off-white bg | 960px ads (200px height), centered |
| Main (2-col) | Off-white bg | lg:grid-cols-2 gap-10, px-6 max-w-6xl |
| Left Panel | White card | rounded-3xl, shadow-card, p-8 |
| Right Panel | Indigo-900 card | rounded-3xl, shadow-elevated, p-8, white text |
| Footer Ads | Off-white bg | 960px ads (200px height), centered |
| Footer | Muted bg | border-t, py-6, navigation + copyright |

## Component Patterns
- **Inputs**: white bg, border-border, focus:ring-primary, rounded-xl, p-3
- **Sliders**: accent-primary (indigo-600), h-2, rounded-lg
- **Cards**: white (light) / dark-slate (dark), rounded-3xl, shadow-card
- **Quote Card**: indigo-900, white text, rounded-3xl, shadow-elevated
- **Buttons**: bg-primary text-white, hover:opacity-90, active:scale-95, transition-smooth
- **Badges**: Color-coded: red (low profit), yellow (fair), green (premium)
- **Status**: Net % badge dynamically colored red/yellow/green

## Spacing & Rhythm
- Section gaps: gap-10 (40px)
- Card padding: p-8 (32px)
- Input gaps: gap-4 (16px)
- Dividers: border-t, py-3
- Responsive: px-6 desktop, px-4 mobile

## Motion & Interaction
- Smooth transitions: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Sliders: live update on input
- Button active: scale-95
- No excessive animations, focus on clarity

## Semantic Colors
- **Success/Premium**: chart-3 (emerald/green)
- **Warning/Fair**: chart-4 (amber/yellow)
- **Destructive/Low**: destructive (red)
- **Tax Highlight**: muted-foreground italic
- **Charts**: chart-1 (primary), chart-2 (secondary), chart-3 (accent), chart-4 (warning), chart-5 (tertiary)

## Differentiation
"Financial clarity through composition" — the dark indigo-900 quote card (right) is visual anchor showing immediately what the client pays. White input card (left) allows control. Color-coded profit % badges + vibe-check badges reinforce financial decision-making in a single glance.

## Constraints
- No generic tech blue, no purple gradients
- Indigo-600 (primary) used sparingly for CTA and slider accents
- Indigo-900 (quote card) distinctive and paired only with white text
- Plus Jakarta Sans: single font family, weight variation (400/500/700)
- Max 5 colors in palette: primary, background, card, foreground, muted
