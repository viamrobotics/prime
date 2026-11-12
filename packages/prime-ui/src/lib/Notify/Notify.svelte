<!--
@component
The notification stack: a live region that shows each notification made through `useNotify` as a
[`Banner`](../Banner/Banner.svelte) with a countdown bar. Render one near the app root, below a
`provideNotify`. It positions itself, so it needs no wrapper.

```svelte
<script>
	provideNotify({ placement: 'top-end' });
</script>

<Notify />
```
-->
<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import { normalizeProps, useMachine } from '@zag-js/svelte';
	import * as toast from '@zag-js/toast';

	import NotifyItem from './NotifyItem.svelte';
	import { useNotifyStore } from './useNotify.svelte.ts';

	interface Props {
		/** The region's accessible name, read before its placement. @default 'Notifications' */
		label?: string;
		class?: ClassValue;
	}

	const { label = 'Notifications', class: extraClasses }: Props = $props();

	const id = $props.id();
	const { store } = useNotifyStore();

	const service = useMachine(toast.group.machine, { id, store });
	const api = $derived(toast.group.connect(service, normalizeProps));
</script>

<div {...api.getGroupProps({ label })} class={['z-toast', extraClasses]}>
	{#each api.getToasts() as notification, index (notification.id)}
		<NotifyItem item={notification} {index} parent={service} />
	{/each}
</div>
