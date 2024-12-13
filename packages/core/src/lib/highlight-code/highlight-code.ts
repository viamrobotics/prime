import type { Action } from 'svelte/action';
import { getPrismModule } from './prism';

/**
 * Highlight code in any child `<code>` blocks.
 */
export const highlightCode: Action<HTMLElement | undefined> = (
  node: HTMLElement | undefined
) => {
  if (node) {
    highlightContainerElement(node);
  }
};

const highlightContainerElement = async (element: Element) => {
  const prism = await getPrismModule();
  prism.highlightAllUnder(element);
};
