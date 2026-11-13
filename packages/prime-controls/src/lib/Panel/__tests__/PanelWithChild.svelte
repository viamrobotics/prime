<script lang="ts">
	import Panel from '../Panel.svelte';

	type Props = { title: string } | { ariaLabel: string };

	const props: Props = $props();
</script>

<Panel {...'title' in props ? { title: props.title } : { 'aria-label': props.ariaLabel }}>
	<span data-testid="child">Child</span>
</Panel>
