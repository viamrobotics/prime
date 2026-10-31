<!--
@component
The region that shows the toasts a [`provideToast`](./useToast.svelte.ts) stack creates. Render one
near the app root, below the `provideToast` call. It is a labelled `region` fixed to the viewport
at the provider's `placement`, and each toast inside it announces itself as a `status`, or as an
`alert` for `warning` and `danger`. Hovering the region or focusing a toast holds every timer.

```svelte
<script lang="ts">
	import { Toast, provideToast } from '@viamrobotics/prime-ui';

	provideToast({ placement: 'bottom-end' });
</script>

<Toast />
```

The `item` snippet receives each toast's state:

```svelte
<Toast>
	{#snippet item(toast)}
		<p>{toast.title}</p>
		<button type="button" onclick={toast.dismiss}>Close</button>
	{/snippet}
</Toast>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	import { normalizeProps, useMachine } from '@zag-js/svelte';
	import * as toast from '@zag-js/toast';

	import ToastItem from './ToastItem.svelte';
	import { useToastStore, type ToastItemState } from './useToast.svelte.ts';

	interface Props {
		/** The region's accessible label. @default 'Notifications' */
		label?: string;
		/** Classes for the region element. */
		class?: ClassValue;
		/**
		 * Renders the inside of each toast. The toast keeps its live-region role and its stacking
		 * motion, and the default glyph, text, action, and close button give way to the snippet.
		 */
		item?: Snippet<[ToastItemState]>;
	}

	const { label = 'Notifications', class: extraClasses, item: layout }: Props = $props();

	const { store } = useToastStore();

	const id = $props.id();
	const service = useMachine(toast.group.machine, { id, store });
	const api = $derived(toast.group.connect(service, normalizeProps));
</script>

<div {...api.getGroupProps({ label })} class={['z-toast', extraClasses]}>
	{#each api.getToasts() as item, index (item.id)}
		<ToastItem {item} {index} parent={service} {layout} />
	{/each}
</div>
