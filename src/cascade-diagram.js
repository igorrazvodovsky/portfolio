/* =============================================================================
   <cascade-diagram>

   The CPQ needs set drawn as a dependency flow: eleven roles in three bands,
   every `enabled by` edge crossing the line of visibility downward.

   It is an illustration, not a chart. The numbers are real — they came out of
   the published needs set once — but nothing regenerates them and nothing
   should: the case is a frozen retrospective, and what the drawing carries is
   the shape, not the values. Role names are deliberately absent. A reader who
   wants to know which node is which reads the case; a hero that tried to label
   eleven nodes would be illegible on a phone and fussy everywhere else.

   The element measures itself and draws in real CSS pixels, rather than fixing
   a viewBox and letting a plain scale swing type from 15px in the case header
   to 4px in a narrow feed slot. So the viewBox *is* the measured box, strokes
   and text are stated in pixels, and a single `scale` factor thins the drawing
   down as the box narrows.

     <cascade-diagram></cascade-diagram>

   The host declares its own aspect-ratio, so no container has to guess — but
   that ratio only exists once JS has run, and the case header is above the
   fold, so `cascade-diagram.css` states a matching fallback.
   ========================================================================== */

const NS = "http://www.w3.org/2000/svg";

/* Needs written per role, and the cascade counts between them. A snapshot of
   the published example set: 145 needs, 42 edges, 11 roles. Node area reads as
   evidence held, edge weight as dependency carried. */
const BANDS = [
  {
    label: "Buy side",
    roles: [
      ["buyer", 7],
      ["procurement specialist", 11],
      ["specifying engineer", 4],
    ],
  },
  {
    label: "Sell side",
    roles: [
      ["sales rep", 48],
      ["account manager", 10],
      ["sales engineer", 5],
      ["reseller rep", 5],
      ["partner manager", 4],
    ],
  },
  /* Ordered so the heaviest sweeps stay short: pricing sits under sales rep,
     and product administrator — where both upper bands converge — sits
     centre. Reordering did more for legibility here than any sizing did. */
  {
    label: "Configuration side",
    roles: [
      ["pricing administrator", 11],
      ["product administrator", 26],
      ["system administrator", 14],
    ],
  },
];

/* [dependent role, the role it stands on, how many needs]. A handful run
   upward — a seller depending on a buyer, an administrator on a sales
   engineer. They are kept because they are true, and because a drawing where
   every line obeys is a diagram of an argument rather than of a set. */
const EDGES = [
  ["sales rep", "pricing administrator", 10],
  ["sales rep", "product administrator", 8],
  ["sales rep", "system administrator", 4],
  ["sales engineer", "product administrator", 3],
  ["procurement specialist", "sales rep", 2],
  ["buyer", "product administrator", 2],
  ["procurement specialist", "system administrator", 2],
  ["specifying engineer", "product administrator", 2],
  ["reseller rep", "product administrator", 2],
  ["reseller rep", "partner manager", 1],
  ["sales engineer", "system administrator", 1],
  ["sales rep", "buyer", 1],
  ["sales rep", "account manager", 1],
  ["product administrator", "sales engineer", 1],
  ["buyer", "sales rep", 1],
  ["procurement specialist", "product administrator", 1],
];

const LABEL = "A dependency map of eleven roles in three bands — buyers and \
sellers above the line of visibility, the administrators everything rests on \
below it.";

/* The width the drawing is designed at; `scale` is measured against it. */
const REFERENCE_WIDTH = 1325;
const MIN_SCALE = 0.42;

const PAD_X = 28;
/* Deep enough that the top band's label has room above it without clipping. */
const PAD_Y = 60;

/* Vertical distance between band rows. Held between these bounds so a wide box
   doesn't stretch into a sparse ladder and a narrow one still has room for the
   curves to read as curves. */
const BAND_GAP_RATIO = 0.14;
const BAND_GAP_MIN = 92;
const BAND_GAP_MAX = 190;

const NODE_BASE = 5;
const NODE_GROWTH = 2.6; // radius per √need, so area tracks the count
const EDGE_WEIGHT = 1.6; // px of stroke per cascade

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export class CascadeDiagram extends HTMLElement {
  #observer = null;
  #width = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    /* The drawing is decorative but not meaningless, so it announces itself as
       one image rather than leaving a screen reader to walk the shapes. */
    if (!this.hasAttribute("role")) this.setAttribute("role", "img");
    if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", LABEL);

    /* Measure before the first paint, so nothing renders at a default width
       and then visibly re-lays-out. */
    this.#width = Math.round(this.getBoundingClientRect().width);
    this.render();

    /* Rounded, and only the width is read. Rendering writes an aspect-ratio,
       which changes this element's height, which changes the page's height,
       which can toggle a scrollbar and hand the element back a width a
       fraction of a pixel different from the one it just drew at — an
       exchange that never settles. Comparing whole pixels ends it. */
    this.#observer ??= new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      if (width === this.#width) return;
      this.#width = width;
      this.render();
    });
    this.#observer.observe(this);
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
  }

  get metrics() {
    const width = this.#width || REFERENCE_WIDTH;
    const scale = clamp(width / REFERENCE_WIDTH, MIN_SCALE, 1);
    const bandGap = clamp(
      width * BAND_GAP_RATIO,
      BAND_GAP_MIN,
      BAND_GAP_MAX
    );
    return {
      width,
      scale,
      bandGap,
      height: PAD_Y * 2 + bandGap * (BANDS.length - 1),
      /* Type is the one thing that must not thin away with the drawing, so it
         grows far more slowly and never drops below readable. */
      fontSize: clamp(width * 0.011, 10, 15),
    };
  }

  /* Role name → {x, y, r}, in the same pixel space as the viewBox. */
  layout({ width, scale, bandGap }) {
    const positions = new Map();
    BANDS.forEach((band, index) => {
      const y = PAD_Y + bandGap * index;
      const span = width - PAD_X * 2;
      const step = band.roles.length > 1 ? span / (band.roles.length - 1) : 0;
      band.roles.forEach(([name, needs], column) => {
        positions.set(name, {
          x: PAD_X + step * column,
          y,
          r: (NODE_BASE + Math.sqrt(needs) * NODE_GROWTH) * scale,
        });
      });
    });
    return positions;
  }

  render() {
    const metrics = this.metrics;
    const { width, height, scale, bandGap, fontSize } = metrics;
    const positions = this.layout(metrics);

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("fill", "none");

    const visibility = PAD_Y + bandGap * 1.5;
    this.drawVisibilityLine(svg, visibility, width, fontSize);
    this.drawEdges(svg, positions, scale);
    this.drawNodes(svg, positions);
    this.drawBandLabels(svg, positions, bandGap, fontSize);

    /* Inline rather than on `:host`: a document-level rule outranks `:host`,
       and `cascade-diagram.css` has to state a pre-JS fallback ratio — which
       would otherwise pin the box at the fallback forever and letterbox the
       drawing inside it. An inline style outranks both. Only the width is
       observed, so writing a height here can't feed back into a loop. */
    this.style.aspectRatio = `${width} / ${height}`;

    this.shadowRoot.replaceChildren(this.styleSheet(), svg);
  }

  styleSheet() {
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
      }

      svg {
        display: block;
        width: 100%;
        height: 100%;
      }

      text {
        fill: currentColor;
        fill-opacity: 0.45;
        font-family: inherit;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
    `;
    return style;
  }

  drawVisibilityLine(svg, y, width, fontSize) {
    const line = document.createElementNS(NS, "line");
    line.setAttribute("x1", PAD_X);
    line.setAttribute("x2", width - PAD_X);
    line.setAttribute("y1", y);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "currentColor");
    line.setAttribute("stroke-opacity", "0.25");
    line.setAttribute("stroke-dasharray", "5 5");
    svg.appendChild(line);

    const label = document.createElementNS(NS, "text");
    label.setAttribute("x", width - PAD_X);
    label.setAttribute("y", y - fontSize * 0.6);
    label.setAttribute("text-anchor", "end");
    label.setAttribute("font-size", fontSize * 0.82);
    label.textContent = "Line of visibility";
    svg.appendChild(label);
  }

  /* Vertical S-curves, so a dependency reads as a descent rather than as a
     line between two points. Heaviest first, so the thin edges stay visible
     on top of the wide bands instead of under them. */
  drawEdges(svg, positions, scale) {
    [...EDGES]
      .sort((a, b) => b[2] - a[2])
      .forEach(([from, to, count]) => {
        const a = positions.get(from);
        const b = positions.get(to);
        if (!a || !b) return;

        const direction = b.y > a.y ? 1 : -1;
        const start = a.y + a.r * direction;
        const end = b.y - b.r * direction;
        const mid = (start + end) / 2;

        const path = document.createElementNS(NS, "path");
        path.setAttribute(
          "d",
          `M${a.x},${start} C${a.x},${mid} ${b.x},${mid} ${b.x},${end}`
        );
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-opacity", "0.28");
        path.setAttribute("stroke-width", count * EDGE_WEIGHT * scale);
        path.setAttribute("stroke-linecap", "round");
        svg.appendChild(path);
      });
  }

  drawNodes(svg, positions) {
    positions.forEach(({ x, y, r }) => {
      const node = document.createElementNS(NS, "circle");
      node.setAttribute("cx", x);
      node.setAttribute("cy", y);
      node.setAttribute("r", r);
      /* Filled, not hollow: the edges pass behind rather than through. */
      node.setAttribute("fill", "white");
      node.setAttribute("stroke", "currentColor");
      node.setAttribute("stroke-opacity", "0.75");
      node.setAttribute("stroke-width", "1.25");
      svg.appendChild(node);
    });
  }

  /* Above each row rather than beside it: it costs no horizontal space, which
     is what a phone is short of. Clearance is measured off the widest node in
     the band, because the label shares its x with the first one — the sell
     band's node is four times the buy band's, so a fixed offset collides on
     one row while floating free on another. */
  drawBandLabels(svg, positions, bandGap, fontSize) {
    BANDS.forEach((band, index) => {
      const tallest = Math.max(
        ...band.roles.map(([name]) => positions.get(name).r)
      );
      const label = document.createElementNS(NS, "text");
      label.setAttribute("x", PAD_X);
      label.setAttribute(
        "y",
        PAD_Y + bandGap * index - tallest - fontSize * 1.5
      );
      label.setAttribute("font-size", fontSize);
      label.textContent = band.label;
      svg.appendChild(label);
    });
  }
}
