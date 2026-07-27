import './styles/main.css'
import { ConnectedDots } from './dots.js'
import { initReveals } from './reveal.js'

customElements.define("connected-dots", ConnectedDots);

initReveals();

if (import.meta.env.DEV) {
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) favicon.href = '/favicon-dev.svg';
}
