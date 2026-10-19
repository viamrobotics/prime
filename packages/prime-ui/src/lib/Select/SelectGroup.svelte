<!--
@component
Groups related [`Select.Item`](./SelectItem.svelte)s, optionally labeled by a
[`Select.GroupHeading`](./SelectGroupHeading.svelte).
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Select } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { children, ...restProps }: Props = $props();
</script>

<Select.Group {...restProps}>
	{@render children?.()}
</Select.Group>
