import { gsap } from '../core/scroll';

export function initMagnetic(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const inner = el.querySelector<HTMLElement>(
      '.btn__text, .contact__cta-label, .contact__cta-mail',
    );
    const strength = Number(el.dataset.magnetic) || 0.35;

    const moveX = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      moveX(dx * strength);
      moveY(dy * strength);
      if (inner)
        gsap.to(inner, {
          x: dx * strength * 0.4,
          y: dy * strength * 0.4,
          duration: 0.6,
          ease: 'power3.out',
        });
    });

    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
      if (inner) gsap.to(inner, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
    });
  });
}
