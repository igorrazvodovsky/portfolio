/* Inline progressive disclosure — a keyword that grows the sentence it sits in.
 *
 * A plain module rather than a custom element (the house convention), because a
 * trigger and the text it reveals are usually separated by prose that has no
 * business being wrapped in anything. `aria-controls` links the two instead.
 *
 * Markup ships expanded: without this script every sentence reads in full, and
 * the trigger is just an emphasised word. Collapsing is the enhancement.
 */

const TRIGGER = "button.reveal[aria-controls]";

const targetOf = (trigger) =>
  document.getElementById(trigger.getAttribute("aria-controls"));

function setExpanded(trigger, expanded) {
  const target = targetOf(trigger);
  if (!target) return;
  trigger.setAttribute("aria-expanded", String(expanded));
  target.hidden = !expanded;
}

export function initReveals() {
  for (const trigger of document.querySelectorAll(TRIGGER)) {
    // A trigger only gains its affordance once it carries aria-expanded, so the
    // no-JS page never advertises a control that can't do anything.
    setExpanded(trigger, false);
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(TRIGGER);
    if (!trigger) return;
    setExpanded(trigger, trigger.getAttribute("aria-expanded") !== "true");
  });
}
