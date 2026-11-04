/**
 * Site-wide, language-independent configuration.
 * Edit this file to make the portfolio yours — name, contact, socials and project meta.
 * Translatable copy lives in `./i18n.ts`.
 */

export const site = {
  name: 'Baysai',
  role: 'Creative Developer & 3D Designer',
  email: 'hello@baysai.dev',
  location: 'Istanbul, TR',
  timeZone: 'Europe/Istanbul',
  url: 'https://baysai.github.io/baysaI/',
  socials: [
    { label: 'GitHub', href: 'https://github.com/baysaI' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Behance', href: 'https://www.behance.net/' },
  ],
} as const;

export interface ProjectMeta {
  /** i18n key prefix, e.g. `work.p1` */
  key: string;
  year: string;
  tags: string[];
  href: string;
}

export const projects: ProjectMeta[] = [
  { key: 'work.p1', year: '2026', tags: ['WebGL', 'GLSL', 'GSAP'], href: '#contact' },
  { key: 'work.p2', year: '2025', tags: ['Three.js', 'Data viz', 'WebGPU'], href: '#contact' },
  { key: 'work.p3', year: '2025', tags: ['R3F', 'Configurator', 'E-commerce'], href: '#contact' },
  { key: 'work.p4', year: '2024', tags: ['Generative', 'Audio', 'Identity'], href: '#contact' },
];
