import { gsap, ScrollTrigger, scrollState } from '../core/scroll';

export function initMarquee({ reduced }: { reduced: boolean }) {
  const section = document.querySelector<HTMLElement>('[data-marquee]');
  const track = section?.querySelector<HTMLElement>('[data-marquee-track]');
  const group = track?.firstElementChild as HTMLElement | null;
  if (!section || !track || !group || reduced) return;

  let width = group.offsetWidth;
  let x = 0;
  let visible = false;
  let direction = 1;

  new ResizeObserver(() => (width = group.offsetWidth)).observe(group);
  ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: ({ isActive }) => (visible = isActive),
  });

  gsap.ticker.add((_t, deltaMs) => {
    if (!visible || width === 0) return;
    if (Math.abs(scrollState.velocity) > 0.5) direction = scrollState.direction;
    const speed = 70 * (1 + Math.abs(scrollState.energy) * 9);
    x = gsap.utils.wrap(-width, 0, x - speed * direction * (deltaMs / 1000));
    track.style.transform = `translate3d(${x}px, 0, 0) skewX(${scrollState.energy * -8}deg)`;
  });
}
