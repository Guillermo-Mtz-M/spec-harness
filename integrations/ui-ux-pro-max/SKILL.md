---
name: ui-ux-pro-max
description: Professional UI/UX design system generator — 67 UI styles, 161 design rules, 17 tech stacks. Use when the spec requires visual design, UI components, or design system generation. Original skill by @nextlevelbuilder (github.com/nextlevelbuilder/ui-ux-pro-max-skill).
---

# ui-ux-pro-max Integration

> **Credit**: Original skill by [@nextlevelbuilder](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) · MIT License · https://uupm.cc

Wraps the ui-ux-pro-max design intelligence skill for use within Spec-Harness design workflow.

## When to Use

- SPEC.md includes visual/UI requirements
- Need a design system (colors, typography, styles)
- Working with any of the 17 supported tech stacks
- Before implementation of visual components

## Setup

The ui-ux-pro-max skill is bundled as an integration. Source lives at:

```
integrations/ui-ux-pro-max/
```

If the source repo is installed separately, it takes precedence. Otherwise, Spec-Harness provides a reduced design ruleset covering the 67 core styles and 99 UX guidelines.

## Capabilities

- **Design System Generator**: analyze project requirements → complete design system (pattern, style, colors, typography, effects)
- **67 UI Styles**: glassmorphism, claymorphism, bento grid, AI-native UI, dark mode, +62 more
- **161 Industry Rules**: per-category design reasoning (SaaS, Finance, Healthcare, E-commerce, etc.)
- **161 Color Palettes**: industry-specific, pre-aligned
- **57 Font Pairings**: with Google Fonts imports
- **17 Tech Stacks**: React, Next.js, Astro, Vue, SwiftUI, Flutter, shadcn/ui, +10 more
- **99 UX Guidelines**: best practices, anti-patterns, accessibility

## Workflow Integration

```
/spec-author → SPEC.md with visual requirements
  → /implement reads DESIGN.md for design tokens
    → ui-ux-pro-max generates component-level design
      → /reviewer validates against design spec
```

## Pre-Delivery QA Checklist

Before marking design work complete, verify:
- [ ] Design system matches spec requirements
- [ ] Colors accessible (WCAG AA minimum)
- [ ] Typography hierarchy clear
- [ ] UI style consistent across components
- [ ] Responsive behavior defined
- [ ] No common UI anti-patterns present
