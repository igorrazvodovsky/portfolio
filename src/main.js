import './styles/main.css'
import { initReveals } from './reveal.js'

initReveals();

if (import.meta.env.DEV) {
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) favicon.href = '/favicon-dev.svg';
}
