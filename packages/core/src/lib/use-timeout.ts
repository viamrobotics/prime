import { onMount } from 'svelte';
import { browser } from './browser';

export interface UseTimeout {
  set: (handler: () => void, timeout: number) => void;
  clear: () => void;
}

const NO_OP: UseTimeout = {
  set: () => ({}),
  clear: () => ({}),
};

export const useTimeout = (): UseTimeout => {
  if (!browser) {
    return NO_OP;
  }

  let timeoutId: number;

  const clear = () => {
    window.clearTimeout(timeoutId);
  };

  const set = (handler: () => void, timeout: number) => {
    clear();
    timeoutId = window.setTimeout(handler, timeout);
  };

  onMount(() => {
    return () => clear();
  });

  return { set, clear };
};
