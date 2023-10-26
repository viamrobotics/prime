<script lang="ts">
import { useTimeout } from '$lib/use-timeout';
import { onMount } from 'svelte';

export let handler: () => void;
export let shouldClear = false;

const { set, clear } = useTimeout();

onMount(() => {
  set(handler, 100);
  if (shouldClear) {
    clear();
  }
});
</script>
