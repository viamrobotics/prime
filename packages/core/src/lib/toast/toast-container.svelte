<!--
@component

For displaying toast messages.

This is the "container" element that all toasts pushed using the
`useToast` API will be added to. Add this component near the root of
your application, like in the root layout component.

It needs access to context from `provideToast`, which should also
be added to the root layout component.
-->
<script lang="ts">
import { fade, fly } from 'svelte/transition';
import { flip } from 'svelte/animate';

import { useToastState } from './context';
import ToastBanner from './toast-banner.svelte';

const { toasts, pageIsVisible } = useToastState();
let visibilityState: DocumentVisibilityState;

$: pageIsVisible.set(visibilityState === 'visible');
</script>

<svelte:document bind:visibilityState />

<div
  role="status"
  aria-label="Toasts"
  class="pointer-events-auto fixed bottom-0 left-1/2 top-auto z-max -translate-x-1/2 transform overflow-hidden p-1.5"
>
  <ul class="flex flex-col items-center gap-2">
    {#each $toasts as { id, pause, resume, ...toast } (id)}
      <li
        in:fly={{ y: 256 }}
        out:fade
        animate:flip={{ duration: 200 }}
        on:mouseenter={pause}
        on:mouseleave={resume}
      >
        <ToastBanner {...toast} />
      </li>
    {/each}
  </ul>
</div>
