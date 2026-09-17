# Design — Portfólio André Ximenes

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
playful (professional portfolio constraint)

## Macrostructure family
- Marketing pages: Catalogue + H2 Split hero
- App pages: n/a
- Content pages: Catalogue tiles (project index / project page)

## Theme
studied-DNA from https://www.softcomtecnologia.com.br/ (public reference).
Not a clone of the Softcom brand. Cream / charcoal bands with a single
accent; optional same-hue gradients for depth only.

- `--color-paper`   oklch(97% 0.018 80)
- `--color-paper-2` oklch(94% 0.022 78)
- `--color-ink`     oklch(22% 0.03 250)
- `--color-ink-2`   oklch(32% 0.025 250)
- `--color-rule`    oklch(86% 0.02 80)
- `--color-accent`  #FF7518
- `--color-highlight` washed accent marker (marca texto)
- `--color-focus`   oklch(58% 0.16 250)
- `--color-hero`    oklch(22% 0.025 250)

## Typography
- Display: Bricolage Grotesque, weight 800, style normal
- Body:    Geist Sans, weight 400 / 600
- Mono:    ui-monospace only in code
- Display tracking: tight
- Type scale anchor: `--text-display` = clamp(2.5rem, 6vw, 4.5rem)

## Spacing
4-point named scale. The values are in `tokens.css`. Pages must use named
tokens (`var(--space-md)`), never raw values.

## Motion
- Easings: `--ease-out` cubic-bezier(0.16, 1, 0.3, 1)
- Reveal pattern: fade + 12px translateY, one-shot
- Reduced-motion fallback: opacity-only, ≤ 150 ms
- Primitives: stagger reveal · CTA color shift · card lift 2px

## Microinteractions stance
- silent success
- hover delay 800 ms · focus delay 0 ms
- card hover: translateY(-2px), never scale

## CTA voice
- Primary CTA: solid accent pill, Geist 600
- Secondary CTA: outline pill, fills on hover

## Per-page allowances
- Marketing pages MAY use enrichment (Tier-A CSS art, photo on solid mat).
- Gradients allowed only as same-hue atmosphere or photo overlay, never as the
  main colour language.
- App pages MUST NOT use enrichment — function carries the page.

## What pages MUST share
- The wordmark / logotype.
- Bricolage Grotesque + Geist Sans.
- Pill CTAs and `--radius-card` surfaces.
- Alternating cream / charcoal bands.
- Single accent (`#FF7518`) for CTAs and emphasis.

## What pages MAY differ on
- Hero archetype within Catalogue + split.
- Project image wells may use dominant colour from the screenshot.

## Provenance
Extracted from https://www.softcomtecnologia.com.br/ as a public reference
for the user's brand on 2026-09-16. The DNA is structural; tokens were
retuned so the site does not copy the Softcom yellow folder identity.
