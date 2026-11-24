<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import ControlledNumberField from './ControlledNumberField.svelte';

	const props: ComponentProps<typeof ControlledNumberField> = $props();
</script>

<fieldset disabled>
	<ControlledNumberField {...props} />
</fieldset>
