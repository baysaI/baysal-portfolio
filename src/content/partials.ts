/**
 * Pure string renderers for repeated markup. Used at build time by the
 * `html-content` Vite plugin so the shipped HTML is complete and crawlable.
 */
import { marquee, processSteps, projects, services, site, stats } from './site';

const pad = (n: number) => String(n).padStart(2, '0');
const t = (key: string, tag = 'span', attrs = '') =>
  `<${tag}${attrs ? ` ${attrs}` : ''} data-i18n="${key}"></${tag}>`;

const projectsMarkup = () =>
  projects
    .map(
      (p, i) => `
<li class="project${i === 0 ? ' is-active' : ''}" data-project="${i}">
  <div class="project__meta">
    <span class="label project__num">${pad(i + 1)}</span>
    ${t(`${p.key}.type`, 'span', 'class="label project__type"')}
    <span class="label project__year">${p.year}</span>
  </div>
  ${t(`${p.key}.title`, 'h3', 'class="project__title"')}
  ${t(`${p.key}.desc`, 'p', 'class="project__desc"')}
  <ul class="project__tags">${p.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>
  <a class="project__link" href="${p.href}" data-cursor="view">
    ${t('work.cta')}<span class="project__arrow" aria-hidden="true"></span>
  </a>
</li>`,
    )
    .join('');

const projectProgressMarkup = () =>
  projects.map(() => '<span class="work__bar"><span></span></span>').join('');

const marqueeMarkup = () => {
  const items = marquee
    .map((key) => `${t(key, 'span', 'class="marquee__item"')}<span class="marquee__sep"></span>`)
    .join('');
  // Two identical groups make the loop seamless.
  return `<div class="marquee__group">${items}</div><div class="marquee__group">${items}</div>`;
};

const servicesMarkup = () =>
  services
    .map(
      (s, i) => `
<li class="service" data-service>
  <span class="label service__num">${pad(i + 1)}</span>
  ${t(`${s.key}.title`, 'h3', 'class="service__title"')}
  ${t(`${s.key}.desc`, 'p', 'class="service__desc"')}
  <ul class="service__tags">${s.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>
</li>`,
    )
    .join('');

const processMarkup = () =>
  processSteps
    .map(
      (key, i) => `
<article class="step" data-step>
  <span class="step__num">${pad(i + 1)}</span>
  <div class="step__body">
    ${t(`${key}.title`, 'h3', 'class="step__title"')}
    ${t(`${key}.desc`, 'p', 'class="step__desc"')}
  </div>
</article>`,
    )
    .join('');

const statsMarkup = () =>
  stats
    .map(
      (s) => `
<li class="stat">
  <p class="stat__value"><span data-count="${s.value}">${s.value}</span><span class="stat__suffix">${s.suffix}</span></p>
  ${t(s.key, 'p', 'class="label stat__label"')}
</li>`,
    )
    .join('');

const socialsMarkup = () =>
  site.socials
    .map(
      (s) =>
        `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" data-underline>${s.label}</a></li>`,
    )
    .join('');

export const partials: Record<string, () => string> = {
  projects: projectsMarkup,
  projectProgress: projectProgressMarkup,
  marquee: marqueeMarkup,
  services: servicesMarkup,
  process: processMarkup,
  stats: statsMarkup,
  socials: socialsMarkup,
};

/** Values available to `{{token}}` placeholders in index.html. */
export const tokens: Record<string, string> = {
  'site.name': site.name,
  'site.email': site.email,
  'site.location': site.location,
  'site.url': site.url,
  'site.role': site.role,
  'projects.count': pad(projects.length),
  year: String(new Date().getFullYear()),
};
