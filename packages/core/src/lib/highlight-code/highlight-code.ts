import type { Action } from 'svelte/action';
import { getPrismModule } from './prism';

/**
 * Highlight code in any child `<pre><code /></pre>` blocks.
 * Elements should be styled according to Prism's expected HTML structure
 *
 * @param node - The node to highlight.
 */
export const highlightCode: Action<HTMLElement | undefined> = (
  node: HTMLElement | undefined
) => {
  if (node) {
    highlightContainerElement(node);
  }
};

const highlightContainerElement = (element: Element) => {
  const prism = getPrismModule();
  prism.highlightAllUnder(element);
};
