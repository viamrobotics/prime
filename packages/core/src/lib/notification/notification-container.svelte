<!--
@component
  
For user notifications.

This is the "container" element that all notifications pushed using the 
`notify` API will be added to. 

```svelte
<NotificationCenter />
```
-->
<script lang="ts">
import { fade, fly } from 'svelte/transition';
import { flip } from 'svelte/animate';
import { type NotificationOptions, notification } from './stores';
import NotificationItem from './notification-item.svelte';

/** Optional configuration for notification behavior. */
export let options: Partial<NotificationOptions> = {};

/** Optional name to allow targeting different containers. */
export let target = 'default';

let items: NotificationOptions[] = [];

$: notification.init(target, options);
$: items = $notification.filter((item) => item.target === target);
</script>

<ul
  class="pointer-events-none fixed bottom-auto left-auto right-6 top-6 z-[9999] m-0 p-0"
>
  {#each items as item (item.id)}
    <li
      in:fly={item.intro}
      out:fade
      animate:flip={{ duration: 200 }}
    >
      <NotificationItem {item} />
    </li>
  {/each}
</ul>
