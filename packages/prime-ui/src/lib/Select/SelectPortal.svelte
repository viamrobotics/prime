<!--
@component
Portals a [`Select.Content`](./SelectContent.svelte) out to the body so it
escapes overflow/stacking contexts.
-->
<script lang="ts">
	import { Select } from 'bits-ui';

	const { children, ...restProps }: Select.PortalProps = $props();
</script>

<Select.Portal {...restProps}>
	{@render children?.()}
</Select.Portal>
