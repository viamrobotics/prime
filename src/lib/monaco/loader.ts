import type { Monaco } from './types';
import { monacoURL } from './index';

interface Window extends globalThis.Window {
  require: ((dependencies: string[], callback: () => void) => void) & { config: (options: object) => void }
  MonacoEnvironment: {
    getWorkerUrl(): string
  }
  monaco: typeof Monaco
}

declare const window: Window;

type Callback = (monaco: typeof Monaco) => void

let state = 'uninitialized';

const loadedCallbacks = new Set<Callback>();

export const loadMonaco = (onload: Callback) => {
  if (state === 'loaded') {
    return onload(window.monaco);
  }

  loadedCallbacks.add(onload);

  if (state === 'loading') {
    return;
  }

  state = 'loading';

  const proxy = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
      baseUrl: '${monacoURL}/min/'
    };
    importScripts('${monacoURL}/min/vs/base/worker/workerMain.js');
    importScripts('${monacoURL}/min/vs/language/json/jsonWorker.js');
  `], { type: 'text/javascript' }));

  const handleLoad = () => {
    window.require.config({ paths: { 'vs': `${monacoURL}/min/vs` } });
    window.MonacoEnvironment = { getWorkerUrl: () => proxy };

    window.require(['vs/editor/editor.main'], () => {
      for (const callback of loadedCallbacks) {
        callback(window.monaco);
      }

      state = 'loaded';
    });
  };

  {
    const script = document.createElement('script');
    script.addEventListener('load', handleLoad);
    script.async = true;
    script.src = `${monacoURL}/min/vs/loader.js`;
    document.head.append(script);
  }
};
