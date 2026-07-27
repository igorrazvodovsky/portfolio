import './styles/main.css'
import { ConnectedDots } from './dots.js'

customElements.define("connected-dots", ConnectedDots);

if (import.meta.env.DEV) {
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) favicon.href = '/favicon-dev.svg';
}
