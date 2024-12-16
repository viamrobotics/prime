import type { Action } from 'svelte/action';
import { getPrismModule } from './prism';

/**
 * Highlight code in any child `<pre><code /></pre>` blocks.
 * Elements should be styled according to Prism's expected HTML structure.
 * highlighting only runs on mount of the element, so the element using the action should be a keyed element to force re-highlighting on updates.
 *
 * Usage example:
 * ```svelte
 * <script>
 *   import { highlightCode } from '@viamrobotics/prime-core';
 *   export let code: string;
 * </script>
 *
 * {#key code}
 *   <div use:highlightCode>
 *     <pre><code class="language-javascript">{code}</code></pre>
 *   </div>
 * {/key}
 * ```
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
