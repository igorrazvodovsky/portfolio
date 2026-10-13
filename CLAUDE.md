# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with hot reload
- `npm run build` — build for production
- `npm run preview` — serve the production build locally
- `npm run diagrams` — re-render `src/diagrams/**/*.mmd` to SVG

There are no tests, linters or CI in this repository.

### Adding a new page

Notes are the default genre for new writing; case studies are the long-form exception.

1. Copy `cases/template.html` to `cases/<slug>.html` and edit content. There is no note template — start a note from an existing one, `notes/pattern-playground.html` being the shorter of the two.
2. Add a page-specific stylesheet in `src/styles/notes/<slug>.css` or `src/styles/cases/<slug>.css` only if the page needs one, and `@import` it from `src/styles/main.css`; shared layout lives in `note.css` / `case.css`.
3. Put images in `src/images/<slug>/`.
4. Add an entry to the feed in `index.html` — newest first.

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

*Multi-page setup.* The index page is a chronological feed; each note and case is its own HTML file, and `vite.config.js` globs `index.html`, `cases/*.html` and `notes/*.html` into entry points, so a new page needs no registration. The flip side is that any HTML file in those folders ships, drafts included. Only `template.html` is excluded.

*One JS entry.* Every page loads `/src/main.js` and nothing else. It imports `src/styles/main.css` and calls `initReveals()`. A page that needs behaviour gets it from there.

*One CSS bundle.* `src/styles/main.css` `@import`s every stylesheet in the project, page-specific ones included, so all CSS ships to all pages. Page rules must therefore be scoped — by `body#<slug>` on the home page and notes, by `.case` / `.note` for genre-wide rules. An unscoped selector in `cases/lighting.css` will hit the feed too. Feed entry ids reuse case slugs — `#lighting` names both an entry in the feed and `<body id="lighting">` on the case page — so home rules keyed off an entry id belong under `#work` or `body#home`.

*Behaviour.* A custom element is the house convention. `src/reveal.js` is the deliberate exception, and says why in its header comment — a trigger and the text it reveals are separated by prose that has no business being wrapped in anything, so `aria-controls` links them instead. It ships working without JS: the reveal markup is expanded until the script collapses it.

### Diagrams

Mermaid sources live in `src/diagrams/<slug>/<name>.mmd` and render to `src/images/<slug>/<name>.svg` with `npm run diagrams`. The renderer is [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) — a library, not a CLI, so `scripts/render-diagrams.mjs` is the entry point and the single place the look is set. It walks the tree, so a new `.mmd` needs no registration.

The `.svg` is committed alongside the `.mmd`; pages reference the image, never the source, and nothing Mermaid-related ships to the browser. Re-render after editing a `.mmd` and check the `width`/`height` attributes on the `<img>` against the sizes the script prints, because the layout engine decides them.

A `.mmd` here is plain Mermaid with no `%%{init}%%` block — theme and spacing come from the script, which is why diagrams across the site look alike. What the source still controls is a diagram's own colour: `classDef`, `class`, `style` on a node and `linkStyle` all override the shared theme. Three things beautiful-mermaid does not draw, worth knowing before spending a diagram's meaning on them: `style` on a subgraph, `stroke-dasharray` on a node, and the `%%{init}%%` font and spacing settings. Layout is elkjs rather than dagre, so dagre's ranking quirks do not apply and a Mermaid recipe found online may lay out differently.

The same script exports a `src/diagrams/<slug>/<name>.tldr` (a tldraw snapshot) to `src/images/<slug>/<name>.svg` with [tldraw-cli](https://github.com/kitschpatrol/tldraw-cli), which drives a headless browser. Nothing of the shared theme applies to it, and the drawing keeps its own layout. The one change the script makes is the font: tldraw's embedded IBM Plex is stripped and the text set in the site's `system-ui` stack, with wrapping switched off so a label never breaks inside the box tldraw sized for Plex. The concept diagram's source is an Obsidian `.tldraw.md` outside the repository; the `.tldr` is the object under its `raw` key, re-extracted by hand when the drawing changes.

### Layout system

`src/styles/layout.css` holds two grid primitives that must not be mixed up.

- `.layout-grid` — an *intrinsic* row: `repeat(auto-fit, minmax(…, 1fr))` decides the column count from the available width. Its lines are therefore *not addressable*; never write `grid-column: 2 / -1` on a child, because line 2 and line -1 land somewhere different at every viewport width. The only meaningful placement is spanning everything, via `.layout-grid__col-all`.
- `.layout-canvas` — a *fixed* twelve-column editorial canvas with named lines, for compositions that need real placement (case headers, the home feed, formbuilder's design highlights). Names: `full` (edge to edge), `inset` (the middle six columns — a comfortable measure), `aside` (the right-hand margin, for footnotes). `.layout-canvas--subgrid` adopts the parent canvas's columns, which is how a feed entry's figures line up with the entry above it.
- `.flex-layout-grid` — like `.layout-grid`, except a short last row stretches to fill instead of leaving a hole.

The canvas is a single column below `48em`, with every line name collapsed onto it, so `inset` and `aside` degrade to full width by themselves. Compositions are therefore always written *mobile-first*, inside a min-width query — nothing is ever undone with `!important`. Placement belongs in the page's stylesheet, not in an inline `style` attribute.

Vertical rhythm is `.flow`, which reads `--flow-space` off each child; an element asks for its own spacing by declaring `--flow-space` on itself. A canvas that also carries flow children sets `row-gap: 0`, because a row gap would add to every `--flow-space` rather than replace it. The `--space-*` tokens live in `layout.css`; the reading measure is held by `p { max-width }`, not by the canvas.

### Type scale

`h1`, `h2` and `h3` are fluid — a `clamp()` each, so a section heading never outgrows the page title on a phone. The sizes they reach at the top of the clamp are the sizes they have always had on a wide screen.

`h3` and `h4` are sized in `em`, `h1`, `h2` and `h5` in `rem`. The rule behind the split: a heading that can appear *inside* something that has already reduced its own text — a `figcaption`, a `.record` — is sized relative to that context and comes down with it. A heading that only ever sits at page level, and `h5`, which is a label already living inside the small meta grids, stays absolute.

`text-wrap: balance` is for headings only; `.lead` takes `pretty`. Balance counts line widths and nothing else, so on a multi-line paragraph it shortens every line to match the last and will happily break a compound at its hyphen. Where a heading or lead still splits a compound — balance prefers the shorter line that a hyphen break offers — write that hyphen as a non-breaking hyphen, U+2011 (`end‑user`). `word-break: keep-all` does not help; it is a no-op for Latin text.

Headings are trimmed to cap height and baseline with `text-box`, so the flow gap is the entire visual gap and nothing is contributed by leading. Prose carries enough of it at `--flow-space: 1em`; a `figcaption`, which sets the tight 0.5em rhythm, has the element after a heading ask for more.

## Writing style

- Banned phrases: "load-bearing", "worth stating plainly", "full stop",
  "carry the argument", "the trap", "isn't just X — it's Y".
- No punchy fragments for drama. Write complete sentences.
- Do not build to a turn of phrase. State the claim directly.
