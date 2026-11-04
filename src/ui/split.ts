/**
 * Lightweight word splitter that preserves inline markup (<em>, <strong>, <br>).
 *
 *  - `data-split`  → words wrapped in an overflow mask, for slide-up reveals
 *  - `data-words`  → bare word spans, for opacity scrubs
 *
 * Splitting is idempotent: it always restarts from the element's current
 * source HTML (stored before the first split, refreshed on language change).
 */

const SOURCE = new WeakMap<HTMLElement, string>();

const wrapWord = (text: string, masked: boolean) => {
  const word = document.createElement('span');
  word.className = 'w';
  word.textContent = text;
  if (!masked) return word;
  const mask = document.createElement('span');
  mask.className = 'w-mask';
  mask.appendChild(word);
  return mask;
};

const splitInto = (source: Node, target: Node, masked: boolean) => {
  source.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = (node.textContent ?? '').split(/(\s+)/);
      for (const part of parts) {
        if (!part) continue;
        target.appendChild(
          /^\s+$/.test(part) ? document.createTextNode(' ') : wrapWord(part, masked),
        );
      }
    } else if (node instanceof HTMLBRElement) {
      target.appendChild(document.createElement('br'));
    } else if (node instanceof HTMLElement) {
      const clone = node.cloneNode(false);
      splitInto(node, clone, masked);
      target.appendChild(clone);
    }
  });
};

export function split(el: HTMLElement, masked = el.hasAttribute('data-split')) {
  const html = SOURCE.get(el) ?? el.innerHTML;
  SOURCE.set(el, html);
  const template = document.createElement('template');
  template.innerHTML = html;
  el.replaceChildren();
  splitInto(template.content, el, masked);
  el.setAttribute('aria-label', template.content.textContent?.trim() ?? '');
  el.classList.add('is-split');
  return Array.from(el.querySelectorAll<HTMLElement>('.w'));
}

/** Forget the cached source (call after the element's content is replaced). */
export function resetSource(el: HTMLElement, html: string) {
  SOURCE.set(el, html);
}

export function splitAll(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-split], [data-words]').forEach((el) => split(el));
}

export const words = (el: Element) => Array.from(el.querySelectorAll<HTMLElement>('.w'));
