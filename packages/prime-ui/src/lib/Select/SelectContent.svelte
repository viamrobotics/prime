<!--
@component
The floating panel of a [`Select`](./Select.svelte).

Should be a child of a [`Select.Portal`](./SelectPortal.svelte) and have a 
child [`Select.Viewport`](./SelectViewport.svelte).
-->
<script lang="ts">
	import { Select } from 'bits-ui';

	const { class: extraClasses, children, ...restProps }: Select.ContentProps = $props();
</script>

<Select.Content
	sideOffset={4}
	{...restProps}
	class={[
		'z-50 max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width) overflow-hidden rounded border border-light bg-white shadow-md',
		extraClasses
	]}
>
	{@render children?.()}
</Select.Content>
