<script lang="ts">
	import Panel from '../Panel.svelte';

	interface Props {
		title?: string;
		ariaLabel?: string;
	}

	const { title, ariaLabel }: Props = $props();
</script>

<Panel {title} aria-label={ariaLabel}>
	<span data-testid="child">Child</span>
</Panel>
