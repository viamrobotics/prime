<script lang="ts">
import { onDestroy } from 'svelte';
import { MergeView } from '@codemirror/merge';

import { createJsonExtensions, setLabel } from './codemirror';
import EditorWrapper from './editor-wrapper.svelte';
import classnames from 'classnames';

/** Accessible label of the editor element. */
export let labelPrefix: string;

/** JSON Values before / after change */
export let beforeValue: string;
export let afterValue: string;

/** Class names to attach to the wrapper element. */
export let cx: classnames.Argument = '';

let editorParent: HTMLElement | undefined;

const beforeExtensions = createJsonExtensions({
  readonly: true,
  label: `${labelPrefix}-before`,
});

const afterExtensions = createJsonExtensions({
  readonly: true,
  label: `${labelPrefix}-after`,
});

$: view = new MergeView({
  a: { doc: beforeValue, extensions: beforeExtensions },
  b: { doc: afterValue, extensions: afterExtensions },
  collapseUnchanged: { margin: 3, minSize: 4 },
  ...(editorParent ? { parent: editorParent } : {}),
});

$: setLabel(view.a, `${labelPrefix}-before`);
$: setLabel(view.b, `${labelPrefix}-after`);

onDestroy(() => view.destroy());
</script>

<EditorWrapper
  {cx}
  bind:element={editorParent}
/>
