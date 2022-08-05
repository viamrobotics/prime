<svelte:options immutable tag='v-code-editor' />

<script lang='ts' context='module'>
import { onMount, onDestroy } from 'svelte';
import { get_current_component } from 'svelte/internal';

import {
  addStyles,
  dispatch,
  removeNewlineWhitespace,
  MonacoVersion,
  type MonacoSupportedLanguages,  
  type MonacoSupportedThemes,
  type Monaco,
} from '../lib/index';

interface Window extends globalThis.Window {
  require: ((dependencies: string[], callback: () => void) => void) & { config: (options: object) => void }
  MonacoEnvironment: {
    getWorkerUrl(): string
  }
  monaco: typeof Monaco
}

declare const window: Window;

const loadedCallbacks = new Set<(monaco: typeof Monaco) => void>();
const monacoURL = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${MonacoVersion}`;

const proxy = URL.createObjectURL(new Blob([`
  self.MonacoEnvironment = {
    baseUrl: '${monacoURL}/min/'
  };
  importScripts('${monacoURL}/min/vs/base/worker/workerMain.js');
  importScripts('${monacoURL}/min/vs/language/json/jsonWorker.min.js');
`], { type: 'text/javascript' }));

const handleLoad = () => {
  window.require.config({ paths: { 'vs': `${monacoURL}/min/vs` } });
  window.MonacoEnvironment = { getWorkerUrl: () => proxy };

  window.require(['vs/editor/editor.main'], () => {
    for (const callback of loadedCallbacks) {
      callback(window.monaco);
    }
  });
};

const script = document.createElement('script');
script.addEventListener('load', handleLoad);
script.async = true;
script.src = `${monacoURL}/min/vs/loader.js`;

document.head.append(script);

</script>

<script lang='ts'>

<<<<<<< Updated upstream
export let value: string;
export let language: MonacoSupportedLanguages;
export let theme: MonacoSupportedThemes = 'vs';
export let readonly = false;
export let minimap = false;
export let uri: string | undefined;
=======
export let value: string
export let language: MonacoSupportedLanguages
export let theme: MonacoSupportedThemes = 'vs'
export let readonly: 'true' | 'false' = 'false'
export let minimap: 'true' | 'false' = 'false'
export let uri: string | undefined
>>>>>>> Stashed changes

let container: HTMLDivElement;
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

  const modelUri = uri !== undefined && uri !== '' ? window.monaco.Uri.parse(uri) : undefined;
  const model = window.monaco.editor.createModel(value, language, modelUri);

<<<<<<< Updated upstream
  const element = editor?.getDomNode() ?? container;
  dispatch(element, 'updateModel', { model });

  editor.setModel(model);
};
=======
  dispatch(container, 'update-model', { model })
  editor.setModel(model)
}
>>>>>>> Stashed changes

const init = (monaco: typeof Monaco) => {
  editor = monaco.editor.create(container, {
    value,
    language,
    theme,
    readOnly: readonly === 'true',
    minimap: {
      enabled: minimap === 'true',
    },
    scrollbar: {
      verticalScrollbarSize: 3,
      horizontalScrollbarSize: 3,
      vertical: 'auto',
      horizontal: 'auto',
      alwaysConsumeMouseWheel: false,
    },    
    scrollBeyondLastLine: false,
  });

<<<<<<< Updated upstream
  const element = editor?.getDomNode() ?? container;

  editor.onDidChangeModelContent(() =>
    dispatch(element, 'input', {
      value: editor?.getValue(),
    })
  );

  editor.onDidBlurEditorWidget(() => {
    const markers = monaco.editor.getModelMarkers({});
    dispatch(element, 'updateMarkers', { markers });
    dispatch(element, 'blur', { value: editor?.getValue() });
  });
=======
  editor.onDidChangeModelContent(() => {
    dispatch(container, 'input', {
      value: editor?.getValue(),
    })
    
    dispatch(container, 'update-content', {
      value: editor?.getValue(),
    })
  })

  editor.onDidBlurEditorWidget(() => {
    const markers = monaco.editor.getModelMarkers({})
    dispatch(container, 'update-markers', { markers })
    dispatch(container, 'blur', { value: editor?.getValue() })
  })
>>>>>>> Stashed changes

  editor.layout();
  setModel();

  window.setTimeout(() => {
<<<<<<< Updated upstream
    const markers = monaco.editor.getModelMarkers({});
    dispatch(element, 'updateMarkers', markers);
  });
};
=======
    const markers = monaco.editor.getModelMarkers({})
    dispatch(container, 'update-markers', markers)
  })
}
>>>>>>> Stashed changes

onMount(() => {
  if (window.monaco) {
    init(window.monaco);
    return;
  } 
  
  loadedCallbacks.add(init);
});

onDestroy(() => {
  const model = editor?.getModel();
  model?.dispose();

  editor?.dispose();

  resizeObserver.disconnect();

  const element = editor?.getDomNode() ?? container;
  dispatch(element, 'destroy');
});

$: {
  if (editor) {
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
}

</script>

<div
  class='w-full h-full relative isolate'
  bind:this={container}
/>
