<script lang="ts">
	import type { InputState } from '../state.ts';

	import Root from '../Input.svelte';
	import StateIcon from '../StateIcon.svelte';

	const { state, iconClass }: { state?: InputState; iconClass?: string } = $props();
</script>

<Root {state}>
	<StateIcon class={iconClass} />
</Root>
