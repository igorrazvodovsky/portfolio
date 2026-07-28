/* =============================================================================
   <connected-dots>

   A lattice of dots with a random subset of pairs joined.

   The grid adapts to the width it's given. Fixing the *number* of cells and
   letting the pixel width float — which is what a plain viewBox does — makes
   the dots swing from 32px in a square thumbnail to 7px in a narrow feed slot.
   So the element measures itself instead and picks a column count against a
   target cell size, which holds the dots at a constant size everywhere and
   leaves `rows` as the author's control over the shape:

     <connected-dots></connected-dots>                 3 rows, columns to fit
     <connected-dots rows="2"></connected-dots>        wide and short
     <connected-dots columns="4" rows="6"></…>         columns pinned, no fitting
     <connected-dots cell="90" density="0.6"></…>      denser, smaller lattice

   Because the column count tracks the width, `aspect-ratio: columns / rows` on
   the host keeps the cells square, so a container never has to declare
   proportions on the element's behalf.
   ========================================================================== */

const NS = "http://www.w3.org/2000/svg";

/* viewBox units. The cell is what the `cell` attribute is expressed against:
   a dot is RADIUS/CELL of a cell wide, whatever the cell measures in pixels. */
const CELL = 100;
const RADIUS = 10;

/* Target cell size in CSS pixels — the dot spacing the layout aims for. 160
   is the spacing the original fixed 3×3 square happened to produce. */
const DEFAULT_CELL = 160;

const DEFAULT_COLUMNS = 3;
const DEFAULT_ROWS = 3;
const DEFAULT_DENSITY = 0.4;

const MIN_COUNT = 2;
const MAX_COUNT = 12;

/* The grid the density is calibrated against. See connectionChance(). */
const REFERENCE_DOTS = DEFAULT_COLUMNS * DEFAULT_ROWS;

export class ConnectedDots extends HTMLElement {
  static observedAttributes = ["columns", "rows", "cell", "density"];

  #observer = null;
  #measuredWidth = 0;
  #renderedColumns = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    /* Measure before the first paint, so the element doesn't render a default
       grid and then visibly re-flow to the fitted one. */
    this.#measuredWidth = this.getBoundingClientRect().width;
    this.render();

    this.#observer ??= new ResizeObserver(([entry]) =>
      this.#handleResize(entry)
    );
    this.#observer.observe(this);
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
    this.#renderedColumns = null;
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this.#renderedColumns = null; // the guard must not swallow an explicit change
    this.render();
  }

  /* Only the width can change the grid. Setting aspect-ratio changes the host's
     *height*, which re-fires this observer — reading width alone is what stops
     that becoming a loop. */
  #handleResize(entry) {
    const width = entry.contentRect.width;
    if (width === this.#measuredWidth) return;
    this.#measuredWidth = width;

    if (this.resolveColumns() === this.#renderedColumns) return;
    this.render();
  }

  /* Rows are the author's shape control, but a fitted lattice that keeps three
     rows while the width squeezes it to two columns turns portrait and becomes
     the tallest thing on a phone screen — for a decoration. So when the columns
     are being fitted, the lattice is not allowed to grow taller than it is
     wide. Pinning `columns` opts out: two explicit numbers mean what they say. */
  rowsFor(columns) {
    const rows = this.gridCount("rows", DEFAULT_ROWS);
    if (this.gridCount("columns", null) !== null) return rows;
    return Math.max(Math.min(rows, columns), MIN_COUNT);
  }

  /* Target dot spacing, in CSS pixels. */
  get cell() {
    const value = this.attributeNumber("cell");
    return Number.isFinite(value) && value > 0 ? value : DEFAULT_CELL;
  }

  /* Chance that any given *pair* of dots is joined, at the reference grid. */
  get density() {
    const value = this.attributeNumber("density");
    return Number.isFinite(value) && value >= 0 && value <= 1
      ? value
      : DEFAULT_DENSITY;
  }

  /* An explicit `columns` pins the count; otherwise it's however many cells of
     the target size fit the measured width. */
  resolveColumns() {
    const pinned = this.gridCount("columns", null);
    if (pinned !== null) return pinned;
    if (!this.#measuredWidth) return DEFAULT_COLUMNS;
    return this.clampCount(Math.round(this.#measuredWidth / this.cell));
  }

  /* An absent attribute has to come back NaN, not 0 — Number(null) is 0, which
     would silently read as a real value and defeat every default above. */
  attributeNumber(attribute) {
    const raw = this.getAttribute(attribute);
    return raw === null || raw.trim() === "" ? NaN : Number(raw);
  }

  gridCount(attribute, fallback) {
    const value = this.attributeNumber(attribute);
    return Number.isFinite(value) ? this.clampCount(value) : fallback;
  }

  clampCount(value) {
    return Math.min(Math.max(Math.round(value), MIN_COUNT), MAX_COUNT);
  }

  /* Pairs grow quadratically with the dot count, so holding the pairwise
     chance fixed would turn a large grid into a scribble. Scaling it by the
     reference grid's pair-per-dot ratio keeps the average number of lines
     leaving each dot constant, which is what reads as the same density. At the
     3×3 reference this returns `density` unchanged. */
  connectionChance(total) {
    if (total < 2) return 0;
    return Math.min(1, (this.density * (REFERENCE_DOTS - 1)) / (total - 1));
  }

  render() {
    const columns = this.resolveColumns();
    const rows = this.rowsFor(columns);
    this.#renderedColumns = columns;

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${columns * CELL} ${rows * CELL}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    const total = columns * rows;
    this.renderConnections(svg, this.generateConnections(total), columns);
    this.renderDots(svg, total, columns);

    this.shadowRoot.replaceChildren(this.styleSheet(columns, rows), svg);
  }

  /* The element declares its own proportions, so no container has to guess
     them. An outer rule that sets a height still wins, as it should. */
  styleSheet(columns, rows) {
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        aspect-ratio: ${columns} / ${rows};
      }

      svg {
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
    return style;
  }

  getDotPosition(index, columns) {
    return {
      x: CELL * (index % columns) + CELL / 2,
      y: CELL * Math.floor(index / columns) + CELL / 2,
    };
  }

  generateConnections(total) {
    const chance = this.connectionChance(total);
    const connections = [];
    for (let i = 0; i < total; i++) {
      for (let j = i + 1; j < total; j++) {
        if (Math.random() < chance) connections.push([i, j]);
      }
    }
    return connections;
  }

  renderDots(svg, total, columns) {
    for (let index = 0; index < total; index++) {
      const { x, y } = this.getDotPosition(index, columns);
      const dot = document.createElementNS(NS, "circle");
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      dot.setAttribute("r", RADIUS);
      dot.setAttribute("fill", "white");
      dot.setAttribute("stroke", "currentColor");
      dot.setAttribute("stroke-width", "2");
      svg.appendChild(dot);
    }
  }

  renderConnections(svg, connections, columns) {
    connections.forEach(([start, end]) => {
      const from = this.getDotPosition(start, columns);
      const to = this.getDotPosition(end, columns);

      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", from.x);
      line.setAttribute("y1", from.y);
      line.setAttribute("x2", to.x);
      line.setAttribute("y2", to.y);
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("stroke-width", "1");
      line.setAttribute("stroke-opacity", "0.3");
      svg.appendChild(line);
    });
  }
}
