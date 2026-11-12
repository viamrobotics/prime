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
-->
<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import { normalizeProps, useMachine } from '@zag-js/svelte';
	import * as toast from '@zag-js/toast';

	import ToastItem from './ToastItem.svelte';
	import { useToastStore } from './useToast.svelte.ts';

	interface Props {
		/** The region's accessible label. @default 'Notifications' */
		label?: string;
		/** Classes for the region element. */
		class?: ClassValue;
	}

	const { label = 'Notifications', class: extraClasses }: Props = $props();

	const { store } = useToastStore();

	const id = $props.id();
	const service = useMachine(toast.group.machine, { id, store });
	const api = $derived(toast.group.connect(service, normalizeProps));
</script>

<div {...api.getGroupProps({ label })} class={['z-toast', extraClasses]}>
	{#each api.getToasts() as item, index (item.id)}
		<ToastItem {item} {index} parent={service} />
	{/each}
</div>
