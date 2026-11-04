import { site } from '../content/site';

/** Live local time in the studio's time zone (footer). */
export function initClock() {
  const el = document.querySelector<HTMLTimeElement>('[data-clock]');
  if (!el) return;

  const format = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const tick = () => {
    const now = new Date();
    el.textContent = format.format(now);
    el.dateTime = now.toISOString();
  };
  tick();
  window.setInterval(tick, 1000);
}
