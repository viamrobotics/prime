<!--
@component
Renders the selected option's label inside a
[`Select.Trigger`](./SelectTrigger.svelte), falling back to `placeholder`.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Select } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Shown while nothing is selected. */
		placeholder?: string;
	}

	const { class: extraClasses, ...restProps }: Props = $props();
</script>

<Select.Value {...restProps} class={['truncate', extraClasses]} />
