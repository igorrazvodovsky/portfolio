# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

### Adding a new case study
1. Copy `cases/template.html` to `cases/<slug>.html` and edit content.
2. Register the new page in `vite.config.js` under `build.rollupOptions.input` — pages not listed there are excluded from the production build.
3. Add a case-specific stylesheet in `src/styles/cases/<slug>.css`; shared case layout lives in `src/styles/cases/case.css`.
4. Put case images in `src/images/<slug>/`.

### Case study format
Case pages follow an invariant h2 spine — **Problem → Approach → Impact** — plus optional h2 sections used only when there's real content for them: Who we designed for, Constraints, Key decisions, Tech stack, Learnings. Flavourful names ("Modelling the domain", "Research") live at h3 level inside Approach, never as h2s. Impact has three registers — measured numbers, structural results (a decision or commitment the work caused), or intent ("what the design targets", for engagements too short or old to validate); pick one deliberately and never force a metric onto direction work. See `cases/template.html` for section order and guidance comments.

## Architecture

This is a UX portfolio website built with vanilla JavaScript and Vite as the build tool. The project follows a multi-page architecture with separate HTML pages for case studies.

### Key Components

**Multi-page Setup**: The site consists of a main index page and individual case study pages under `/cases/`. Each page is configured as a separate entry point in `vite.config.js`.

**Entry points**: `src/main.js` is the single JS entry, loaded by every page. It also imports `src/styles/main.css`.

**Styling Architecture**: CSS is organized modularly:
- Global styles in `src/styles/` (reset, layout, typography)
- Page-specific styles (home.css, case-specific CSS files)
- CSS custom properties for theming (colors, radii)

**Layout system** (`src/styles/layout.css`): two grid primitives that must not be mixed up.

- `.layout-grid` — an *intrinsic* row: `repeat(auto-fit, minmax(…, 1fr))` decides the column count from the available width. Its lines are therefore **not addressable**; never write `grid-column: 2 / -1` on a child, because line 2 and line -1 land somewhere different at every viewport width. The only meaningful placement is spanning everything, via `.layout-grid__col-all`. This is the default for card-like section content.
- `.layout-canvas` — a *fixed* twelve-column editorial canvas with named lines, for compositions that need real placement (case headers, formbuilder's Design highlights). Names: `full` (edge to edge), `inset` (the middle six columns — a comfortable measure), `aside` (the right-hand margin, for footnotes). `.layout-canvas--subgrid` adopts the parent canvas's columns.
- `.flex-layout-grid` — like `.layout-grid`, except a short last row stretches to fill instead of leaving a hole.

The canvas is a single column below `48em`, with every line name collapsed onto it, so `inset` and `aside` degrade to full width by themselves. Compositions are therefore always written **mobile-first**, inside a min-width query — nothing is ever undone with `!important`. Placement belongs in the case's stylesheet, not in an inline `style` attribute.

Vertical rhythm is `.flow`, which reads `--flow-space` off each child; an element asks for its own spacing by declaring `--flow-space` on itself. Spacing tokens (`--space-gutter`, `--space-gap`, `--space-block`, `--space-prose`) live in `layout.css`.

**Asset Organization**: Images are organized by feature/case in `src/images/`, with subdirectories for each case study (convertiq, formbuilder, lighting).

### Development Patterns

**No Framework Dependencies**: This is a vanilla JavaScript project - avoid suggesting React, Vue, or other framework-specific solutions.

**CSS-First Approach**: The project uses modern CSS features extensively (custom properties, clamp(), grid, etc.) rather than JavaScript for layout and styling.

**Web Standards**: The project uses native web APIs (Web Components, Shadow DOM) rather than external libraries.
