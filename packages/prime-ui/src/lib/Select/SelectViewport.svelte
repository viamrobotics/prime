<!--
@component
The scrollable region inside a [`Select.Content`](./SelectContent.svelte) that
holds the items.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Select } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Select.Viewport {...restProps} class={['p-1', extraClasses]}>
	{@render children?.()}
</Select.Viewport>
