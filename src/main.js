import './styles/main.css'
import { CascadeDiagram } from './cascade-diagram.js'
import { initReveals } from './reveal.js'

customElements.define("cascade-diagram", CascadeDiagram);

initReveals();

if (import.meta.env.DEV) {
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) favicon.href = '/favicon-dev.svg';
}
