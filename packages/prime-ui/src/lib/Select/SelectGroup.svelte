<!--
@component
Groups related [`Select.Item`](./SelectItem.svelte)s, optionally labelled by a
[`Select.GroupHeading`](./SelectGroupHeading.svelte).
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Select } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Id of the element. bits-ui requires a string, so `null` is not accepted. */
		id?: string;
	}

	const { children, ...restProps }: Props = $props();
</script>

<Select.Group {...restProps}>
	{@render children?.()}
</Select.Group>
