import { gsap, ScrollTrigger, scrollState } from '../core/scroll';

/**
 * Header behaviour:
 *  - hides while scrolling down, returns on scroll up
 *  - flips to ink over light (`data-opaque`) sections — the cursor follows
 *  - marks the nav link of the section in view
 *  - drives the mobile menu overlay
 */
export function initHeader(cursor?: HTMLElement | null) {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      header.classList.toggle('is-hidden', self.direction === 1 && y > window.innerHeight * 0.5);
    },
  });

  const half = () => header.offsetHeight / 2;
  document.querySelectorAll<HTMLElement>('[data-opaque]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: () => `top top+=${half()}`,
      end: () => `bottom top+=${half()}`,
      onToggle: ({ isActive }) => {
        header.classList.toggle('is-light', isActive);
        cursor?.classList.toggle('is-light', isActive);
      },
    });
  });

  const links = Array.from(header.querySelectorAll<HTMLAnchorElement>('.header__nav a'));
  links.forEach((link) => {
    const section = document.querySelector<HTMLElement>(link.getAttribute('href') ?? '');
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onToggle: ({ isActive }) => link.classList.toggle('is-current', isActive),
    });
  });

  initMenu(header);
}

function initMenu(header: HTMLElement) {
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const label = toggle?.querySelector<HTMLElement>('[data-i18n]');
  if (!toggle || !menu || !label) return;

  let open = false;
  const set = (next: boolean) => {
    open = next;
    toggle.setAttribute('aria-expanded', String(open));
    label.dataset.i18n = open ? 'nav.close' : 'nav.menu';
    label.textContent = open
      ? document.documentElement.lang === 'tr' ? 'Kapat' : 'Close'
      : document.documentElement.lang === 'tr' ? 'Menü' : 'Menu';

    if (open) {
      menu.hidden = false;
      scrollState.lenis?.stop();
      requestAnimationFrame(() => menu.classList.add('is-open'));
      gsap.fromTo(
        menu.querySelectorAll('.menu__list a'),
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.25 },
      );
    } else {
      menu.classList.remove('is-open');
      scrollState.lenis?.start();
      window.setTimeout(() => {
        if (!open) menu.hidden = true;
      }, 800);
    }
  };

  toggle.addEventListener('click', () => set(!open));
  menu.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) set(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) set(false);
  });
}
