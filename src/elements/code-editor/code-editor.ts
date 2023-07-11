import { addStyles, monacoURL } from '../../lib/index';
import CodeEditorInternal from './code-editor.svelte';

/*
 * `element` is only present if compiled with the `customElement` option, which it is. Type it such that it exists.
 * https://github.com/sveltejs/svelte/blob/master/packages/svelte/src/runtime/internal/public.d.ts#L72-L73
 */
type CodeEditorWithElement = CodeEditorInternal & {
  element: typeof HTMLElement;
};

// https://github.com/sveltejs/svelte/issues/7596
export default class CodeEditor extends (
  CodeEditorInternal as unknown as CodeEditorWithElement
).element {
  static formAssociated = true;

  constructor() {
    super();

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${monacoURL}/min/vs/editor/editor.main.min.css`;

    this.shadowRoot?.append(link);

    addStyles(this);
  }
}
