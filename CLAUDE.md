# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

### Adding a new page
Notes are the default genre for new writing; case studies are the long-form exception.

1. Copy `notes/template.html` to `notes/<slug>.html` (or `cases/template.html` to `cases/<slug>.html`) and edit content.
2. Register the new page in `vite.config.js` under `build.rollupOptions.input` — pages not listed there are excluded from the production build. Templates stay unregistered.
3. Add a page-specific stylesheet in `src/styles/notes/<slug>.css` or `src/styles/cases/<slug>.css` only if the page needs one; shared layout lives in `note.css` / `case.css`.
4. Put images in `src/images/<slug>/`.
5. Add an entry to the feed in `index.html` — newest first.

### Genres
Two page genres, one feed. `/notes/` holds shorter, dated progress reports and slice-of-life pieces about work in flight; `/cases/` holds the longer retrospective case studies. The site is *not* a blog: there is no second index, no Work/Notes split, no tags or pagination. Genre widening happens in what entries are, not in navigation.

### Note format
Notes are progress reports and do *not* take the case spine. Two invariants: the page opens with a `.lead` saying what the work is and why it's live, and closes with an h2 `Where it stands` giving the honest current state. In between, two or three h2s named after the actual work ("What I'm after", "What I tried", "What surprised me"). Register is present and provisional — unresolved endings are fine, manufactured conclusions are not. If a note outgrows a few screens it either wants to become a case study or wants splitting into two dated notes. See `notes/template.html`.

### Case study format
Case pages follow an invariant h2 spine — **Problem → Approach → Impact** — plus optional h2 sections used only when there's real content for them: Who we designed for, Constraints, Key decisions, Tech stack, Learnings. Flavourful names ("Modelling the domain", "Research") live at h3 level inside Approach, never as h2s. Impact has three registers — measured numbers, structural results (a decision or commitment the work caused), or intent ("what the design targets", for engagements too short or old to validate); pick one deliberately and never force a metric onto direction work. See `cases/template.html` for section order and guidance comments.

### Home feed format
`section#work` in `index.html` is one chronological column, newest first, genres mixed. An entry is:

```html
<article class="flow">
  <small>June 2026</small>
  <p><a href="…">Title</a> — one or two sentences.</p>
  <div class="entry__media layout-grid">…figures…</div>
</article>
```

The title is a link *inside* the sentence, not a heading above it. The media row is optional — an imageless entry is a normal entry, not a gap. Because the row is a `.layout-grid`, one figure fills the width and two sit side by side, stacking when there isn't room. By default images keep their intrinsic proportions, so tall, short and square all work. Entries are not cards: no box, no whole-entry hit area.

A square or portrait source run out to the full page measure will tower over the feed. Two modifiers on `.entry__media` decide how to spend it — pick per entry:

- `entry__media--narrow` — keep the proportions, cap the width at `24rem`.
- `entry__media--crop` — keep the width, crop to a band. The figure takes the aspect ratio and the image covers it, so nothing is baked into the file. Tune with `--entry-media-ratio` (default `16 / 9`) and `--entry-media-position` (default `center`, an `object-position`) in `home.css`.

`entry__media--triptych` is for three images that are one picture — a sequence, not a gallery. It is the whole row or a stack, never two-and-an-orphan: three across above `48em`, stacked below, and stacked they crop to bands so the entry costs ~570px instead of ~2800px. The lighting entry uses it for the case's own city → district → street zoom.

The em dash after the title is structural, so a description must not contain one of its own — a second dash makes it impossible to tell which one separates title from summary. Use a colon or a comma instead.

Get the `width`/`height` attributes right — for uncropped images they drive the reserved aspect ratio, where the old square thumbnails made them cosmetic. (Under `--crop` the figure reserves the box instead, so the attributes only matter for the decode.) Check with `sips -g pixelWidth -g pixelHeight <file>`.

## Architecture

This is a UX portfolio website built with vanilla JavaScript and Vite as the build tool. The project follows a multi-page architecture with separate HTML pages for case studies.

### Key Components

**Multi-page Setup**: The site consists of a main index page — a chronological feed — plus individual pages under `/notes/` and `/cases/`. Each page is configured as a separate entry point in `vite.config.js`.

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
