<svelte:options immutable tag='v-code-editor' />

<script lang='ts'>

import { onMount, onDestroy, tick } from 'svelte';
import { get_current_component } from 'svelte/internal';

import {
  addStyles,
  dispatch,
  removeNewlineWhitespace,
  monacoURL,
} from '../lib/index';

import type {
  MonacoSupportedLanguages,  
  MonacoSupportedThemes,
  Monaco,
} from '../lib/monaco/types'

import { loadMonaco } from '../lib/monaco/loader';
import { monacoUtils } from '../lib/monaco';
import { htmlToBoolean } from '../lib/boolean';
import { hashCode } from '../lib/math';

export let value = '';
export let previous = '';
export let language: MonacoSupportedLanguages;
export let theme: MonacoSupportedThemes = 'vs';
export let readonly = 'false';
export let minimap = 'false';
export let schema = '';
export let variant: 'default' | 'diff' = 'default';

let isReadonly: boolean;
let hasMinimap: boolean;

$: parsedSchema = schema ? JSON.parse(schema) : undefined
$: isReadonly = htmlToBoolean(readonly, 'readonly');
$: hasMinimap = htmlToBoolean(minimap, 'minimap');

let container: HTMLDivElement;
let diffEditor: monaco.editor.IStandaloneDiffEditor;
let editor: Monaco.editor.IStandaloneCodeEditor;
let resizeObserver: ResizeObserver;

addStyles();

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = `${monacoURL}/min/vs/editor/editor.main.min.css`;

const component = get_current_component() as HTMLElement & { shadowRoot: ShadowRoot };
component.shadowRoot.append(link);

const setModel = () => {
  if (!editor) {
    return;
  }

  const lastModel = editor.getModel();
  lastModel?.dispose();

  let model: monaco.editor.ITextModel

  if (parsedSchema) {
    const id = String(hashCode(schema))
    const uri = `http://${id}.json/`;
    const modelUri = monaco.Uri.parse(uri);

    monacoUtils.removeSchemas(id, parsedSchema);
    monacoUtils.addSchemas(id, parsedSchema, [modelUri.toString()]);
    model = monaco.editor.createModel(value, language, modelUri);
  } else {
    model = window.monaco.editor.createModel(value, language);
  }

  dispatch(container, 'update-model', { model });
  editor.setModel(model);
};

const setDiffModel = () => {
  const lastModel = diffEditor?.getModel();
  lastModel?.modified.dispose()
  lastModel?.original.dispose()

  diffEditor.setModel({
    original: monaco.editor.createModel(previous, 'json'),
    modified: monaco.editor.createModel(value, 'json'),
  });
}

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
  } as const
}

const initDiff = () => {
  diffEditor = monaco.editor.createDiffEditor(container, {
    ...opts(),
    readOnly: true,
  })
  diffEditor.setModel({
    original: monaco.editor.createModel(previous, language),
    modified: monaco.editor.createModel(value, language),
  });
}

const init = async (monaco: typeof Monaco) => {
  if (variant === 'diff') {
    return initDiff()
  }

  editor = monaco.editor.create(container, opts());

  editor.onDidChangeModelContent(() => {
    dispatch(container, 'input', {
      value: editor?.getValue(),
    });
  });

  editor.onDidBlurEditorWidget(() => {
    dispatch(container, 'blur', { value: editor?.getValue() });
    emitMarkers();
  });

  editor.layout();
  setModel();

  await tick()

  emitMarkers();
};

const emitMarkers = () => {
  const markers = monaco.editor.getModelMarkers({});
  const id = hashCode(schema)
  const ownedMarkers = markers.filter((marker) => {
    return marker.resource.authority === `${id}.json`;
  });

  dispatch(container, 'markers', { markers: ownedMarkers });
}

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
}

onMount(() => {
  loadMonaco(init);
});

onDestroy(() => {
  const model = editor?.getModel();
  model?.dispose();

  diffEditor?.dispose();
  editor?.dispose();

  resizeObserver.disconnect();

  const element = editor?.getDomNode() ?? container;
  dispatch(element, 'destroy');
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
  class='w-full h-full relative isolate'
  bind:this={container}
  on:input={handleInput}
/>
