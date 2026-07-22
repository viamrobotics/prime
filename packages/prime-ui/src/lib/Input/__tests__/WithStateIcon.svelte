<script lang="ts">
	import type { InputState } from '../state.ts';

	import Root from '../Input.svelte';
	import StateIcon from '../StateIcon.svelte';

	const { state }: { state?: InputState } = $props();
</script>

<Root {state}>
	<StateIcon />
</Root>
