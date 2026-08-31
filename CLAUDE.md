# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with hot reload
- `npm run build` — build for production
- `npm run preview` — serve the production build locally

There are no tests, linters or CI in this repository.

### Adding a new page

Notes are the default genre for new writing; case studies are the long-form exception.

1. Copy `cases/template.html` to `cases/<slug>.html` and edit content. There is no note template — start a note from an existing one, `notes/pattern-playground.html` being the shorter of the two.
2. Register the page in `vite.config.js` under `build.rollupOptions.input` — pages not listed there are excluded from the production build. `cases/template.html` stays unregistered.
3. Add a page-specific stylesheet in `src/styles/notes/<slug>.css` or `src/styles/cases/<slug>.css` only if the page needs one, and `@import` it from `src/styles/main.css`; shared layout lives in `note.css` / `case.css`.
4. Put images in `src/images/<slug>/`.
5. Add an entry to the feed in `index.html` — newest first.

### Genres

Two page genres, one feed. `/notes/` holds shorter, dated progress reports and slice-of-life pieces about work in flight; `/cases/` holds the longer retrospective case studies. The site is *not* a blog: there is no second index, no Work/Notes split, no tags or pagination. Genre widening happens in what entries are, not in navigation. The spine each genre takes is documented in `cases/CLAUDE.md` and `notes/CLAUDE.md`.

### Home feed format

`section#work` in `index.html` is one chronological column, newest first, genres mixed. An entry is:

```html
<article id="<slug>" class="flow layout-canvas layout-canvas--subgrid">
  <small>June 2026</small>
  <p><a href="…">Title</a> — one or two sentences.</p>
  <div class="entry__media layout-canvas layout-canvas--subgrid">…figures…</div>
</article>
```

The title is a link *inside* the sentence, not a heading above it. Entries are not cards: no box, no whole-entry hit area. The media row is optional — an imageless entry is a normal entry, not a gap.

The entry's `id` is what its composition is keyed off in `home.css` (`#configurator`, `#aloud`, `#formbuilder` each place their own figures), so give every entry one even when it has no images yet.

A media row is dealt out one of two ways, and the choice is the whole decision:

- `.layout-grid` — intrinsic, equal columns, as many as fit. Right whenever the figures carry equal weight.
- `.layout-canvas .layout-canvas--subgrid` — the page's twelve columns again, for a row whose figures are not equal. Place them mobile-first: `1 / -1` in the base rule, spans inside a `@media (width > 48em)` query, because the canvas is a single column below that and a `span 4` there spills into implicit columns.

`entry__media--triptych` and `--quadriptych` are the canonical repeats — three or four figures that are one picture, a sequence rather than a gallery. Each is the whole row or a stack, never two-and-an-orphan. `entry__media--narrow` (cap the width) and `--crop` (keep the width, crop to a band via `--entry-media-ratio` / `--entry-media-position`) exist in `home.css` for square or portrait sources that would otherwise tower over the feed; nothing uses them at the moment. Width is spent in columns and shape in aspect ratios, so `--crop` composes with either row type.

The em dash after the title is structural, so a description must not contain one of its own — a second dash makes it impossible to tell which one separates title from summary. Use a colon or a comma instead.

Get the `width`/`height` attributes right — for uncropped images they drive the reserved aspect ratio. (Where the figure reserves a box of its own, the attributes only matter for the decode.) Check with `sips -g pixelWidth -g pixelHeight <file>`.

## Architecture

A UX portfolio site: vanilla JavaScript, Vite, one HTML file per page. No framework — don't reach for React, Vue or a component library. Modern CSS (custom properties, `clamp()`, grid, subgrid, `oklch()`) does the work that JavaScript would do elsewhere.

*Multi-page setup.* The index page is a chronological feed; each note and case is its own HTML file, and each is a separate entry point in `vite.config.js`. Forgetting step 2 above is the usual way a page ends up missing from a build.

*One JS entry.* Every page loads `/src/main.js` and nothing else. It imports `src/styles/main.css`, registers the `<cascade-diagram>` custom element and calls `initReveals()`. A page that needs behaviour gets it from there.

*One CSS bundle.* `src/styles/main.css` `@import`s every stylesheet in the project, page-specific ones included, so all CSS ships to all pages. Page rules must therefore be scoped — by `body#<slug>` on the home page and notes, by `.case` / `.note` for genre-wide rules. An unscoped selector in `cases/lighting.css` will hit the feed too. Feed entry ids reuse case slugs — `#lighting` names both an entry in the feed and `<body id="lighting">` on the case page — so home rules keyed off an entry id belong under `#work` or `body#home`.

*Behaviour.* A custom element is the house convention: `src/cascade-diagram.js` is a shadow-DOM element that measures itself with a `ResizeObserver` and draws in real CSS pixels rather than scaling a fixed viewBox. `src/reveal.js` is the deliberate exception, and says why in its header comment — a trigger and the text it reveals are separated by prose that has no business being wrapped in anything, so `aria-controls` links them instead. Both ship working without JS: the reveal markup is expanded until the script collapses it, and `cascade-diagram.css` states a fallback aspect ratio for the element the JS has yet to size.

### Layout system

`src/styles/layout.css` holds two grid primitives that must not be mixed up.

- `.layout-grid` — an *intrinsic* row: `repeat(auto-fit, minmax(…, 1fr))` decides the column count from the available width. Its lines are therefore *not addressable*; never write `grid-column: 2 / -1` on a child, because line 2 and line -1 land somewhere different at every viewport width. The only meaningful placement is spanning everything, via `.layout-grid__col-all`.
- `.layout-canvas` — a *fixed* twelve-column editorial canvas with named lines, for compositions that need real placement (case headers, the home feed, formbuilder's design highlights). Names: `full` (edge to edge), `inset` (the middle six columns — a comfortable measure), `aside` (the right-hand margin, for footnotes). `.layout-canvas--subgrid` adopts the parent canvas's columns, which is how a feed entry's figures line up with the entry above it.
- `.flex-layout-grid` — like `.layout-grid`, except a short last row stretches to fill instead of leaving a hole.

The canvas is a single column below `48em`, with every line name collapsed onto it, so `inset` and `aside` degrade to full width by themselves. Compositions are therefore always written *mobile-first*, inside a min-width query — nothing is ever undone with `!important`. Placement belongs in the page's stylesheet, not in an inline `style` attribute.

Vertical rhythm is `.flow`, which reads `--flow-space` off each child; an element asks for its own spacing by declaring `--flow-space` on itself. A canvas that also carries flow children sets `row-gap: 0`, because a row gap would add to every `--flow-space` rather than replace it. The `--space-*` tokens live in `layout.css`; the reading measure is held by `p { max-width }`, not by the canvas.

## Writing style

- Banned phrases: "load-bearing", "worth stating plainly", "full stop",
  "carry the argument", "the trap", "isn't just X — it's Y".
- No punchy fragments for drama. Write complete sentences.
- Do not build to a turn of phrase. State the claim directly.
