import { dict, languages, type DictKey, type Lang } from '../content/i18n';
import { resetSource, split } from './split';

const STORAGE_KEY = 'baysal:lang';

const listeners = new Set<(lang: Lang) => void>();
let current: Lang = 'en';

const isLang = (v: unknown): v is Lang => languages.includes(v as Lang);

const stored = (): Lang | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return isLang(v) ? v : null;
  } catch {
    return null;
  }
};

/** Preference order: ?lang= → saved choice → browser language → English. */
export function detectLang(): Lang {
  const param = new URLSearchParams(location.search).get('lang');
  if (isLang(param)) return param;
  return stored() ?? (navigator.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en');
}

export const t = (key: DictKey, lang: Lang = current) => dict[lang][key];
export const getLang = () => current;

export function onLangChange(fn: (lang: Lang) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Swap every translatable node in place. Split elements are re-split. */
export function applyLang(lang: Lang) {
  current = lang;
  const strings = dict[lang] as Record<string, string>;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const value = strings[el.dataset.i18n ?? ''];
    if (value === undefined) return;
    if (el.matches('[data-split], [data-words]')) {
      resetSource(el, value);
      split(el);
    } else {
      el.innerHTML = value;
    }
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    for (const pair of (el.dataset.i18nAttr ?? '').split(',')) {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (strings[key] !== undefined) el.setAttribute(attr, strings[key]);
    }
  });

  document.documentElement.lang = lang;
  document.title = strings['meta.title'];
  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* private mode — preference simply isn't remembered */
  }
  listeners.forEach((fn) => fn(lang));
}

/** Wire the EN / TR toggle. Content cross-fades while copy is swapped. */
export function initLangSwitch() {
  const root = document.documentElement;
  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.lang;
      if (!isLang(next) || next === current) return;
      root.classList.add('is-switching');
      window.setTimeout(() => {
        applyLang(next);
        requestAnimationFrame(() => root.classList.remove('is-switching'));
      }, 380);
    });
  });
}
