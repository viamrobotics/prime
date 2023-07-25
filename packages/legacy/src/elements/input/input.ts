import { addStyles } from '../../lib';
import InputInternal from './input.svelte';

/*
 * `element` is only present if compiled with the `customElement` option, which it is. Type it such that it exists.
 * https://github.com/sveltejs/svelte/blob/master/packages/svelte/src/runtime/internal/public.d.ts#L72-L73
 */
type InputWithElement = InputInternal & {
  element: typeof HTMLElement;
};

// https://github.com/sveltejs/svelte/issues/7596
export default class Input extends (
  InputInternal as unknown as InputWithElement
).element {
  static formAssociated = true;

  constructor() {
    super();
    // `internals` is defined as a prop on the component
    (this as unknown as { internals: ElementInternals }).internals =
      this.attachInternals();

    addStyles(this);
  }

  override focus() {
    this.shadowRoot?.querySelector('input')?.focus();
  }
}
