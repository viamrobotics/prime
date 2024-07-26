<!--
@component

For user notifications.

This is the "container" element that all notifications pushed using the
`useNotify` API will be added to. Add this component near the root of
your application, like in the root layout component.

It needs access to context from `provideNotify`, which should also
be added to the root layout component.
-->
<script lang="ts">
import { fade, fly } from 'svelte/transition';
import { flip } from 'svelte/animate';

import { useNotifyState } from './context';
import NotificationItem from './notification-item.svelte';

const { notifications, pageIsVisible } = useNotifyState();
let visibilityState: DocumentVisibilityState;

$: pageIsVisible.set(visibilityState === 'visible');
</script>

<svelte:document bind:visibilityState />

<div
  role="alert"
  aria-label="Notifications"
  class="pointer-events-none fixed bottom-auto left-auto right-0 top-6 z-[9999] m-0 p-0 sm:right-6"
>
  <ul>
    {#each $notifications as { id, pause, resume, ...notification } (id)}
      <li
        in:fly={{ x: 256 }}
        out:fade
        animate:flip={{ duration: 200 }}
        on:mouseenter={pause}
        on:mouseleave={resume}
      >
        <NotificationItem {...notification} />
      </li>
    {/each}
  </ul>
</div>
