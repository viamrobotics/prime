<!--
@component
The notification stack: a live region that shows each notification made through `useNotify` as a
[`Banner`](../Banner/Banner.svelte) with a countdown bar. Render one near the app root, below a
`provideNotify`. It positions itself, so it needs no wrapper. The `item` snippet replaces the
`Banner` with your own layout.

```svelte
<script>
	provideNotify({ placement: 'top-end' });
</script>

<Notify />
```

```svelte
<Notify>
	{#snippet item(notification)}
		<p>{notification.title}</p>
		<button onclick={notification.dismiss}>Close</button>
	{/snippet}
</Notify>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	import { normalizeProps, useMachine } from '@zag-js/svelte';
	import * as toast from '@zag-js/toast';

	import NotifyItem from './NotifyItem.svelte';
	import { useNotifyStore, type NotifyItemState } from './useNotify.svelte.ts';

	interface Props {
		/** The region's accessible name, read before its placement. @default 'Notifications' */
		label?: string;
		class?: ClassValue;
		/** Renders each notification's content in place of the default `Banner`. It receives the notification's state. */
		item?: Snippet<[NotifyItemState]>;
	}

	const { label = 'Notifications', class: extraClasses, item }: Props = $props();

	const id = $props.id();
	const { store } = useNotifyStore();

	const service = useMachine(toast.group.machine, { id, store });
	const api = $derived(toast.group.connect(service, normalizeProps));
</script>

<div {...api.getGroupProps({ label })} class={['z-toast', extraClasses]}>
	{#each api.getToasts() as notification, index (notification.id)}
		<NotifyItem item={notification} {index} parent={service} layout={item} />
	{/each}
</div>
