<!--
@component
The scrollable region inside a [`Combobox.Content`](./ComboboxContent.svelte) that holds the
items.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Combobox } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Combobox.Viewport {...restProps} class={['p-1', extraClasses]}>
	{@render children?.()}
</Combobox.Viewport>
