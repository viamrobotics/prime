<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import Panel from '../../Panel/Panel.svelte';
	import ControlledSlider from './ControlledSlider.svelte';

	const props: ComponentProps<typeof ControlledSlider> = $props();
</script>

<Panel title="Scene">
	<ControlledSlider {...props} />
	<p data-testid="sibling">Sibling</p>
</Panel>
