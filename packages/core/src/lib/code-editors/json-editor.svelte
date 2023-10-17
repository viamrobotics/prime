<script
  lang="ts"
  context="module"
>
import type monaco from 'monaco-editor';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import 'monaco-editor/min/vs/editor/editor.main.css';
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
let editor: monaco.editor.IStandaloneCodeEditor;
let resizeObserver: ResizeObserver;

const { initialize, instance, initialized } = useMonaco();

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
  const markers = $instance.editor.getModelMarkers({});
  const ownedMarkers = markers.filter((marker) => {
    return marker.resource.authority === `${id}.json`;
  });

  dispatch('markers', ownedMarkers);
};

const setModel = () => {
  if (!editor) {
    return;
  }

  const lastModel = editor.getModel();
  lastModel?.dispose();

  let model: monaco.editor.ITextModel;

  if (schema) {
    const id = schema.$id;
    const uri = `${id}.json/`;
    const modelUri = $instance.Uri.parse(uri);

    // Model already exists
    if ($instance.editor.getModel(modelUri) !== null) {
      return;
    }

    removeSchemas($instance, id, schema);
    addSchemas($instance, id, schema, [modelUri.toString()]);
    model = $instance.editor.createModel(value, 'json', modelUri);
  } else {
    model = $instance.editor.createModel(value, 'json');
  }

  dispatch('modelupdated', model);
  editor.setModel(model);
};

const updateHeight = () => {
  const contentHeight = Math.min(1000, editor.getContentHeight());
  if (container) {
    container.style.height = `${contentHeight}px`;
  }

  editor.layout();
};

$: if (container !== undefined && editor === undefined && $initialized) {
  editor = $instance.editor.create(
    container,
    getMonacoOptions({ value, language: 'json', theme, minimap })
  );

  resizeObserver = new ResizeObserver(() => editor.layout());
  resizeObserver.observe(container);

  editor.onDidChangeModelContent(() => {
    dispatch('input', editor.getValue());
  });

  editor.onDidBlurEditorWidget(() => {
    dispatch('blur', editor.getValue());
    emitMarkers();
  });

  editor.onDidContentSizeChange(updateHeight);
  updateHeight();
}

$: if (editor !== undefined && value) {
  setModel();

  const currentValue: string = editor?.getValue() ?? '';

  if (value !== undefined) {
    const originalFormatted = removeNewlineWhitespace(value);
    const updatedFormatted = removeNewlineWhitespace(currentValue);

    if (updatedFormatted !== originalFormatted) {
      editor?.setValue(value);
      editor?.layout();
    }
  }
}

onMount(async () => {
  self.MonacoEnvironment = {
    getWorker: function () {
      return new jsonWorker();
    },
  };

  await initialize();
});

onDestroy(() => {
  if (container) {
    resizeObserver?.unobserve(container);
  }

  editor?.dispose();
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
