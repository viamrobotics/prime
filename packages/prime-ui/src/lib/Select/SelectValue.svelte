<!--
@component
Renders the selected option's label inside a
[`Select.Trigger`](./SelectTrigger.svelte), falling back to `placeholder`.
-->
<script lang="ts">
	import { Select } from 'bits-ui';

	const { class: extraClasses, ...restProps }: Select.ValueProps = $props();
</script>

<Select.Value {...restProps} class={['truncate', extraClasses]} />
