<script lang="ts">
	import type { InputState } from '../input-state.ts';

	import Input from '../Input.svelte';
	import InputIcon from '../InputIcon.svelte';

	const { state }: { state?: InputState } = $props();
</script>

<Input {state} aria-label="name">
	<InputIcon />
</Input>
