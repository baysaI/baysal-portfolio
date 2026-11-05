import { gsap, ScrollTrigger } from '../core/scroll';

export function initProcess() {
  const section = document.querySelector<HTMLElement>('.process');
  const track = section?.querySelector<HTMLElement>('[data-process-track]');
  if (!section || !track) return null;
  const steps = Array.from(track.querySelectorAll<HTMLElement>('[data-step]'));

  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  const tween = gsap.to(track, { x: () => -distance(), ease: 'none' });
  const trigger = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${distance() + window.innerHeight * 0.35}`,
    pin: true,
    refreshPriority: 1,
    scrub: true,
    animation: tween,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const active = Math.round(self.progress * (steps.length - 1));
      steps.forEach((step, i) => step.classList.toggle('is-active', i === active));
    },
  });

  return { trigger };
}
