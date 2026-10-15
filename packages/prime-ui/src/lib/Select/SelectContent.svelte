<!--
@component
The floating panel of a [`Select`](./Select.svelte).

Should be a child of a [`Select.Portal`](./SelectPortal.svelte) and have a
child [`Select.Viewport`](./SelectViewport.svelte).
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Select } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Id of the element. bits-ui requires a string, so `null` is not accepted. */
		id?: string;

		/** Text direction of the panel. bits-ui positions by it, so `auto` is not accepted. */
		dir?: 'ltr' | 'rtl';
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Select.Content
	sideOffset={4}
	class={[
		'z-50 max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width) overflow-hidden rounded border border-light bg-white shadow-md',
		extraClasses
	]}
	{...restProps}
>
	{@render children?.()}
</Select.Content>
