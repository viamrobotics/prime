<!--
@component
A non-selectable heading for a [`Combobox.Group`](./ComboboxGroup.svelte).
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

<Combobox.GroupHeading class={['listbox-heading', extraClasses]} {...restProps}>
	{@render children?.()}
</Combobox.GroupHeading>
