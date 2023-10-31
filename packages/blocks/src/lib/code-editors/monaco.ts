import type monaco from 'monaco-editor';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export type Monaco = typeof monaco;
export type MonacoSupportedThemes = 'vs' | 'vs-dark';
export type MonacoMarker = monaco.editor.IMarker;

export interface MonacoOptionsParameters {
  value: string;
  language: string;
  theme: MonacoSupportedThemes;
  minimap: boolean;
}

export const useMonaco = () => {
  const instance = writable<Monaco>();

  onMount(async () => {
    try {
      const api = await import('monaco-editor');
      const { default: JsonWorker } = await import(
        'monaco-editor/esm/vs/language/json/json.worker?worker'
      );

      self.MonacoEnvironment = {
        // eslint-disable-next-line func-names
        getWorker: function () {
          return new JsonWorker();
        },
      };

      instance.set(api);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error('Error importing monaco', error);
    }
  });

  return instance;
};

export const getMonacoOptions = ({
  value,
  language,
  theme,
  minimap,
}: MonacoOptionsParameters) => {
  return {
    value,
    language,
    theme,
    minimap: {
      enabled: minimap,
    },
    readOnly: false,
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

export const setMonacoDiagnostics = (
  instance: Monaco,
  schemas: monaco.languages.json.DiagnosticsOptions['schemas'] = []
) => {
  instance.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas,
  });
};
