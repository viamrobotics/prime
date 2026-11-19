<!--
@component
Groups related [`Combobox.Item`](./ComboboxItem.svelte)s, optionally labeled by a
[`Combobox.GroupHeading`](./ComboboxGroupHeading.svelte).
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Combobox } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { children, ...restProps }: Props = $props();
</script>

<Combobox.Group {...restProps}>
	{@render children?.()}
</Combobox.Group>
