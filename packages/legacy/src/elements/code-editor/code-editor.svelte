<svelte:options immutable />

<script lang="ts">
import { onMount, onDestroy } from 'svelte';

import { removeNewlineWhitespace } from '../../lib/index';

import { dispatcher } from '../../lib/dispatch';

import type {
  MonacoSupportedLanguages,
  MonacoSupportedThemes,
  Monaco,
  Schema,
} from '../../lib/monaco/types';

import { loadMonaco } from '../../lib/monaco/loader';
import { monacoUtils } from '../../lib/monaco';
import { htmlToBoolean } from '../../lib/boolean';
import { hashCode } from '../../lib/math';

export let value = '';
export let previous = '';
export let language: MonacoSupportedLanguages;
export let theme: MonacoSupportedThemes = 'vs';
export let readonly = 'false';
export let minimap = 'false';
export let schema = '';
export let variant: 'default' | 'diff' = 'default';

const dispatch = dispatcher();

let isReadonly: boolean;
let hasMinimap: boolean;
let parsedSchema: Schema | undefined;

$: parsedSchema = schema ? (JSON.parse(schema) as Schema) : undefined;
$: isReadonly = htmlToBoolean(readonly, 'readonly');
$: hasMinimap = htmlToBoolean(minimap, 'minimap');

let container: HTMLDivElement;
let diffEditor: Monaco.editor.IStandaloneDiffEditor;
let editor: Monaco.editor.IStandaloneCodeEditor;
let resizeObserver: ResizeObserver;

const setModel = () => {
  if (!editor) {
    return;
  }

  const lastModel = editor.getModel();
  lastModel?.dispose();

  let model: Monaco.editor.ITextModel;

  if (parsedSchema) {
    const id = String(hashCode(schema));
    const uri = `http://${id}.json/`;
    const modelUri = window.monaco.Uri.parse(uri);
    monacoUtils.removeSchemas(id, parsedSchema);
    monacoUtils.addSchemas(id, parsedSchema, [modelUri.toString()]);
    model = window.monaco.editor.createModel(value, language, modelUri);
  } else {
    model = window.monaco.editor.createModel(value, language);
  }

  dispatch({ target: container }, 'update-model', { model });
  editor.setModel(model);
};

const setDiffModel = () => {
  const lastModel = diffEditor?.getModel();
  lastModel?.modified.dispose();
  lastModel?.original.dispose();

  diffEditor.setModel({
    original: window.monaco.editor.createModel(previous, 'json'),
    modified: window.monaco.editor.createModel(value, 'json'),
  });
};

const handleInput = (event: Event) => {
  if (event instanceof InputEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
};

const opts = () => {
  return {
    value,
    language,
    theme,
    readOnly: isReadonly,
    minimap: {
      enabled: hasMinimap,
    },
    scrollbar: {
      verticalScrollbarSize: 3,
      horizontalScrollbarSize: 3,
      vertical: 'auto',
      horizontal: 'auto',
      alwaysConsumeMouseWheel: false,
    },
    scrollBeyondLastLine: false,
  } as const;
};

const initDiff = () => {
  // @TODO Why are these types incompatible?
  diffEditor = window.monaco.editor.createDiffEditor(container, {
    ...opts(),
    readOnly: true,
  }) as unknown as Monaco.editor.IStandaloneDiffEditor;
  diffEditor.setModel({
    original: window.monaco.editor.createModel(previous, language),
    modified: window.monaco.editor.createModel(value, language),
  });
};

const init = (monaco: typeof Monaco) => {
  if (variant === 'diff') {
    return initDiff();
  }

  editor = monaco.editor.create(container, opts());

  editor.onDidChangeModelContent(() => {
    dispatch({ target: container }, 'input', { value: editor?.getValue() });
  });

  editor.onDidBlurEditorWidget(() => {
    dispatch({ target: container }, 'blur', { value: editor?.getValue() });
    emitMarkers();
  });

  editor.layout();
  setModel();
  emitMarkers();
};

const emitMarkers = () => {
  const markers = window.monaco.editor.getModelMarkers({});
  const id = hashCode(schema);
  const ownedMarkers = markers.filter((marker) => {
    return marker.resource.authority === `${id}.json`;
  });

  dispatch({ target: container }, 'markers', { markers: ownedMarkers });
};

const handleResize = () => {
  if (!resizeObserver && editor) {
    resizeObserver = new ResizeObserver(() => {
      editor?.layout();
    });
  }

  if (resizeObserver) {
    const element: Element = editor?.getDomNode() ?? container;
    resizeObserver.observe(element);
  }
};

onMount(() => {
  loadMonaco(init);
});

onDestroy(() => {
  const model = editor?.getModel();
  model?.dispose();

  diffEditor?.dispose();
  editor?.dispose();

  resizeObserver.disconnect();

  dispatch({ target: container }, 'destroy');
});

$: {
  if (diffEditor) {
    setDiffModel();
    handleResize();
  } else if (editor) {
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

    handleResize();
  }
}
</script>

<div
  class="w-full h-full relative isolate"
  bind:this={container}
  on:input={handleInput}
/>

<style>
:host {
  display: contents !important;
}
</style>
