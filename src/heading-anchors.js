/* Heading anchors — every heading inside <heading-anchors> becomes a link to
 * itself, with a "#" after the text, so a section can be linked to directly.
 *
 * Markup ships as plain headings: without this script nothing is lost but the
 * shortcut. `levels` picks the headings (default "h2, h3"), `icon` the glyph.
 *
 * Where the link points, in order of preference:
 *   1. the heading's own id;
 *   2. the id of the section or article it heads, when it is that element's
 *      first heading — case sections already carry ids (#problem, #approach),
 *      and those URLs are the ones worth keeping stable;
 *   3. an id made from the heading text, de-duplicated against the page.
 *
 * A heading that already holds a link (a footnote marker, a product name in
 * the tech stack) can't be wrapped in another, so it gets the "#" as a link of
 * its own instead, named for the heading it points to.
 */

const slugify = (text) =>
  text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";

// The heading's words without its footnote markers, which would otherwise end
// up in the id ("support1") and in the icon link's name.
function headingText(heading) {
  const clone = heading.cloneNode(true);
  for (const marker of clone.querySelectorAll(".footnote, sup")) marker.remove();
  return clone.textContent.replace(/\s+/g, " ").trim();
}

function uniqueId(base) {
  let id = base;
  for (let n = 2; document.getElementById(id); n++) id = `${base}-${n}`;
  return id;
}

function targetId(heading, levels) {
  if (heading.id) return heading.id;

  const container = heading.parentElement.closest("section[id], article[id]");
  if (container && container.querySelector(levels) === heading) {
    return container.id;
  }

  heading.id = uniqueId(slugify(headingText(heading)));
  return heading.id;
}

// Trailing whitespace from source formatting is a line-break opportunity, which
// would let `text-wrap: balance` strand the icon on a line of its own.
function trimEnd(node) {
  const last = node.lastChild;
  if (last?.nodeType === Node.TEXT_NODE) last.textContent = last.textContent.trimEnd();
}

function iconSpan(icon) {
  const span = document.createElement("span");
  span.className = "anchor-icon";
  span.setAttribute("aria-hidden", "true");
  span.textContent = icon;
  return span;
}

class HeadingAnchors extends HTMLElement {
  connectedCallback() {
    const levels = this.getAttribute("levels") || "h2, h3";
    const icon = this.getAttribute("icon") || "#";

    for (const heading of this.querySelectorAll(levels)) {
      if (heading.classList.contains("anchor-h")) continue;

      const link = document.createElement("a");
      link.className = "anchor-link";
      link.href = `#${targetId(heading, levels)}`;
      trimEnd(heading);

      if (heading.querySelector("a, button")) {
        link.classList.add("anchor-link--icon");
        link.setAttribute("aria-label", `Link to ${headingText(heading)}`);
        link.append(iconSpan(icon));
        heading.append(link);
      } else {
        // No wrapper around the text: `h1 span, h2 span` already means "muted
        // part of a heading", and a span here would grey out the whole of it.
        link.append(...heading.childNodes, iconSpan(icon));
        heading.append(link);
      }

      heading.classList.add("anchor-h");
    }
  }
}

customElements.define("heading-anchors", HeadingAnchors);
