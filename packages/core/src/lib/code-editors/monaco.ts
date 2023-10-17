import type monaco from 'monaco-editor';
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
  const initialized = writable(false);

  const initialize = async () => {
    try {
      const lib = await import('monaco-editor');
      instance.set(lib);
      initialized.set(true);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error('Error importing monaco', error);
    }
  };

  return {
    initialize,
    instance,
    initialized,
  };
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
  instance: typeof monaco,
  schemas: monaco.languages.json.DiagnosticsOptions['schemas'] = []
) => {
  instance.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas,
  });
};
