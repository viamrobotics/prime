<script lang="ts">
import { onDestroy } from 'svelte';
import { EditorView } from '@codemirror/view';
import classnames from 'classnames';
import { debounce } from 'lodash-es';

import * as CodeMirror from './codemirror';
import EditorWrapper from './editor-wrapper.svelte';

const DEFAULT_DEBOUNCE_PERIOD_MS = 250;

/** Accessible label of the editor element. */
export let label: string;

/** Initial content of the editor. Will re-render if the value changes and does not match the current document. */
export let initialValue: string;

/** Set editor to read-only mode. */
export let readonly = false;

/**
 * Enable diff mode, comparing the current contents to `diffOriginal`.
 *
 * If `undefined` or omitted, the editor will not use diff mode.
 */
export let diffOriginal: string | undefined = undefined;

/** Debounce change events. */
export let debouncePeriodMS = DEFAULT_DEBOUNCE_PERIOD_MS;

/** Error message element ID. */
export let errorMessageID: string | undefined = undefined;

/** Whether the value is invalid. */
export let isInvalid: boolean | undefined = undefined;

/** Class names to attach to the wrapper element. */
export let cx: classnames.Argument = '';

/** Notify of changes. */
export let onChange: ((contents: string) => unknown) | undefined = undefined;

let isEditing = false;
let currentValue = initialValue;
let editorParent: HTMLElement | undefined;
let editorView: EditorView | undefined;

$: debouncedOnChange = onChange
  ? debounce(onChange, debouncePeriodMS)
  : undefined;

const handleChange = (nextValue: string) => {
  debouncedOnChange?.(nextValue);
  currentValue = nextValue;
};

const handleFocus = () => {
  isEditing = true;
};

const handleBlur = () => {
  isEditing = false;
  debouncedOnChange?.flush();
};

const extensions = CodeMirror.createJsonExtensions({
  label,
  readonly,
  errorMessageID,
  isInvalid,
  diffOriginal,
  onFocus: handleFocus,
  onBlur: handleBlur,
});

/**
 * Initialize the editor when the parent mounts or initial value changes.
 *
 * Implemented as a function to avoid running whenever `currentValue`
 * changes.
 */
const initializeEditor = (
  nextParent: HTMLElement | undefined,
  nextInitialValue: string
): EditorView | undefined => {
  // Skip if DOM element not on the page
  if (!nextParent) {
    return editorView;
  }

  const isMounted = nextParent === editorView?.dom.parentElement;
  const preferCurrentState = isEditing || nextInitialValue === currentValue;

  if (isMounted && preferCurrentState) {
    return editorView;
  }

  currentValue = nextInitialValue;
  editorView?.destroy();

  return new EditorView({
    extensions,
    parent: nextParent,
    doc: nextInitialValue,
    dispatchTransactions: CodeMirror.createDispatchTransactions(handleChange),
  });
};

$: editorView = initializeEditor(editorParent, initialValue);
$: CodeMirror.setReadOnly(editorView, readonly);
$: CodeMirror.setLabel(editorView, label);
$: CodeMirror.setErrorMessageID(editorView, errorMessageID);
$: CodeMirror.setIsInvalid(editorView, isInvalid);
$: CodeMirror.setDiffOriginal(editorView, diffOriginal);

onDestroy(() => {
  handleBlur();
  editorView?.destroy();
});
</script>

<EditorWrapper
  {cx}
  bind:element={editorParent}
/>
