import {
  certificates,
  experience,
  marquee,
  processSteps,
  projects,
  services,
  site,
  spokenLanguages,
  stats,
} from './site';

const pad = (n: number) => String(n).padStart(2, '0');
const t = (key: string, tag = 'span', attrs = '') =>
  `<${tag}${attrs ? ` ${attrs}` : ''} data-i18n="${key}"></${tag}>`;
const external = (href: string) =>
  /^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : '';

const projectsMarkup = () =>
  projects
    .map(
      (p, i) => `
<li class="project${i === 0 ? ' is-active' : ''}" data-project="${i}">
  <div class="project__meta">
    <span class="label project__num">${pad(i + 1)}</span>
    ${t(`${p.key}.type`, 'span', 'class="label project__type"')}
  </div>
  ${t(`${p.key}.title`, 'h3', 'class="project__title" data-split data-split-manual')}
  ${t(`${p.key}.desc`, 'p', 'class="project__desc"')}
  <ul class="project__highlights">
    ${[1, 2, 3].map((n) => t(`${p.key}.h${n}`, 'li')).join('')}
  </ul>
  <dl class="project__facts">
    <div><dt data-i18n="work.commits"></dt><dd>${p.commits}</dd></div>
    <div><dt data-i18n="work.period"></dt>${t(`${p.key}.period`, 'dd')}</div>
    <div class="project__stack"><dt>Stack</dt><dd>${p.tags.join(' · ')}</dd></div>
  </dl>
  <div class="project__links">
    <a class="project__link" href="${p.href}"${external(p.href)} data-cursor="view">
      ${t(`${p.key}.cta`)}<span class="project__arrow" aria-hidden="true"></span>
    </a>
    ${p.repo ? `<a class="project__code" href="${p.repo}"${external(p.repo)} data-underline>${t('work.code')}</a>` : ''}
  </div>
  <img class="project__shot" src="${p.image}" alt="" data-i18n-attr="alt:${p.key}.alt" loading="lazy" width="640" height="400" />
</li>`,
    )
    .join('');

const projectProgressMarkup = () =>
  projects.map(() => '<span class="work__bar"><span></span></span>').join('');

const marqueeMarkup = () => {
  const items = marquee
    .map((key) => `${t(key, 'span', 'class="marquee__item"')}<span class="marquee__sep"></span>`)
    .join('');

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
      (key) => `
<article class="step" data-step>
  ${t(`${key}.date`, 'span', 'class="step__num"')}
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
  <p class="stat__value">${s.prefix ? `<span class="stat__prefix">${s.prefix}</span>` : ''}<span data-count="${s.value}">${s.value}</span><span class="stat__suffix">${s.suffix}</span></p>
  ${t(s.key, 'p', 'class="label stat__label"')}
</li>`,
    )
    .join('');

const experienceMarkup = () =>
  experience
    .map(
      (group) => `
<div class="xp-group">
  <div class="xp-group__head">
    ${t(group.group, 'h3', 'class="label xp-group__label"')}
    ${group.note ? t(group.note, 'p', 'class="xp-group__note"') : ''}
  </div>
  <ol class="xp-list">
    ${group.items
      .map(
        (item) => `
    <li class="xp" data-xp>
      ${t(`${item.key}.date`, 'span', 'class="label xp__date"')}
      <div class="xp__body">
        ${t(`${item.key}.role`, 'h4', 'class="xp__role"')}
        ${t(`${item.key}.place`, 'p', 'class="xp__place"')}
        ${item.desc ? t(`${item.key}.desc`, 'p', 'class="xp__desc"') : ''}
        ${item.href ? `<a class="xp__link" href="${item.href}"${external(item.href)} data-underline>${item.link}<span aria-hidden="true"> ↗</span></a>` : ''}
      </div>
    </li>`,
      )
      .join('')}
  </ol>
</div>`,
    )
    .join('');

const educationMarkup = () => `
<div class="xp-side__block" data-xp>
  ${t('experience.edu.label', 'h3', 'class="label"')}
  ${t('experience.edu.school', 'p', 'class="xp-side__title"')}
  ${t('experience.edu.program', 'p', 'class="xp-side__text"')}
  ${t('experience.edu.date', 'p', 'class="label xp-side__date"')}
</div>
<div class="xp-side__block" data-xp>
  ${t('experience.cert.label', 'h3', 'class="label"')}
  <dl class="xp-certs">
    ${certificates
      .map(
        (c) => `
    <div class="xp-certs__year">
      <dt class="label">${c.year}</dt>
      <dd><ul>${c.keys.map((key) => t(key, 'li')).join('')}</ul></dd>
    </div>`,
      )
      .join('')}
  </dl>
</div>
<div class="xp-side__block" data-xp>
  ${t('experience.lang.label', 'h3', 'class="label"')}
  <ul class="xp-side__langs">${spokenLanguages.map((key) => t(key, 'li')).join('')}</ul>
</div>`;

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
  experience: experienceMarkup,
  education: educationMarkup,
  socials: socialsMarkup,
};

export const tokens: Record<string, string> = {
  'site.name': site.name,
  'site.email': site.email,
  'site.location': site.location,
  'site.url': site.url,
  'site.role': site.role,
  'site.github': site.github,
  'site.linkedin': site.linkedin,
  'projects.count': pad(projects.length),
  'year': String(new Date().getFullYear()),
};
