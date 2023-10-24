import { onDestroy, onMount } from 'svelte';

export const useTimeout = () => {
  let mounted = false;
  let timeoutId: number;

  const clear = () => {
    if (mounted) {
      window.clearTimeout(timeoutId);
    }
  };

  const set = (handler: () => void, timeout: number) => {
    if (mounted) {
      timeoutId = window.setTimeout(handler, timeout);
    }
  };

  onMount(() => {
    mounted = true;
  });

  onDestroy(() => {
    clear();
    mounted = false;
  });

  return { set, clear };
};
