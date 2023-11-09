<script
  lang="ts"
  context="module"
>
import type monaco from 'monaco-editor';
</script>

<script lang="ts">
import { createEventDispatcher, onDestroy, onMount } from 'svelte';
import cx from 'classnames';

import {
  getMonacoOptions,
  useMonaco,
  type MonacoSupportedThemes,
} from './monaco';
import { removeNewlineWhitespace } from './remove-newline-whitespace';
import { addSchemas, removeSchemas, type Schema } from './schema';

export let value = '';
export let theme: MonacoSupportedThemes = 'vs';
export let schema: Schema | undefined = undefined;
export let minimap: boolean = false;

/** Additional CSS classes to pass to the code-editor container. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

let container: HTMLDivElement | undefined = undefined;
let codeEditor: monaco.editor.IStandaloneCodeEditor;
let resizeObserver: ResizeObserver;

const monaco = useMonaco();

const dispatch = createEventDispatcher<{
  input: string;
  blur: string;
  markers: monaco.editor.IMarker[];
  modelupdated: monaco.editor.ITextModel;
}>();

const emitMarkers = () => {
  if (!schema) {
    return;
  }

  const id = schema.$id;
  const markers = $monaco.editor.getModelMarkers({});
  const ownedMarkers = markers.filter((marker) => {
    return marker.resource.authority === `${id}.json`;
  });

  dispatch('markers', ownedMarkers);
};

const setModel = () => {
  if (!codeEditor) {
    return;
  }

  const lastModel = codeEditor.getModel();
  lastModel?.dispose();

  let model: monaco.editor.ITextModel;

  if (schema) {
    const id = schema.$id;
    const uri = `${id}.json/`;
    const modelUri = $monaco.Uri.parse(uri);

    // Model already exists
    if ($monaco.editor.getModel(modelUri) !== null) {
      return;
    }

    removeSchemas($monaco, id, schema);
    addSchemas($monaco, id, schema, [modelUri.toString()]);
    model = $monaco.editor.createModel(value, 'json', modelUri);
  } else {
    model = $monaco.editor.createModel(value, 'json');
  }

  dispatch('modelupdated', model);
  codeEditor.setModel(model);
};

const updateHeight = () => {
  const contentHeight = Math.min(1000, codeEditor.getContentHeight());
  if (container) {
    container.style.height = `${contentHeight}px`;
  }

  codeEditor.layout();
};

$: if (
  container !== undefined &&
  codeEditor === undefined &&
  $monaco !== undefined
) {
  codeEditor = $monaco.editor.create(
    container,
    getMonacoOptions({ value, language: 'json', theme, minimap })
  );

  resizeObserver = new ResizeObserver(() => codeEditor.layout());
  resizeObserver.observe(container);

  codeEditor.onDidChangeModelContent(() => {
    dispatch('input', codeEditor.getValue());
  });

  codeEditor.onDidBlurEditorWidget(() => {
    dispatch('blur', codeEditor.getValue());
    emitMarkers();
  });

  codeEditor.onDidContentSizeChange(updateHeight);
  updateHeight();
}

$: if (codeEditor !== undefined && value) {
  setModel();

  const currentValue: string = codeEditor?.getValue() ?? '';
  const originalFormatted = removeNewlineWhitespace(value);
  const updatedFormatted = removeNewlineWhitespace(currentValue);

  if (updatedFormatted !== originalFormatted) {
    codeEditor?.setValue(value);
    codeEditor?.layout();
  }
}

onMount(async () => {
  await import('monaco-editor/min/vs/editor/editor.main.css');
});

onDestroy(() => {
  if (container) {
    resizeObserver?.unobserve(container);
  }

  codeEditor?.dispose();
});
</script>

<div
  class={cx('relative isolate h-full w-full', extraClasses)}
  bind:this={container}
/>

<style>
:host {
  display: contents !important;
}
</style>
