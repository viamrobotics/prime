import { addStyles } from '../../lib';
import ButtonInternal from './button.svelte';

/*
 * `element` is only present if compiled with the `customElement` option, which it is. Type it such that it exists.
 * https://github.com/sveltejs/svelte/blob/master/packages/svelte/src/runtime/internal/public.d.ts#L72-L73
 */
type ButtonWithElement = ButtonInternal & {
  element: typeof HTMLElement;
};

// https://github.com/sveltejs/svelte/issues/7596
export default class Button extends (
  ButtonInternal as unknown as ButtonWithElement
).element {
  static formAssociated = true;

  constructor() {
    super();
    // `internals` is defined as a prop on the component
    (this as unknown as { internals: ElementInternals }).internals =
      this.attachInternals();

    addStyles(this);
  }
}
