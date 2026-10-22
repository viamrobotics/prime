<script lang="ts">
	import type { PaneControls } from '../pane-controls.ts';

	interface Props {
		label: string;
		controls: PaneControls;
	}

	const { label, controls }: Props = $props();

	let isOpen = $state(false);
</script>

<header
	data-header={label}
	class="absolute top-0 left-0 z-10 flex items-center gap-1 bg-light p-1"
	{@attach controls.dragTrigger}
>
	<span data-header-text={label}>{label}</span>
	<button
		type="button"
		aria-label="Menu for {label}"
		aria-expanded={isOpen}
		onclick={() => (isOpen = !isOpen)}
	>
		...
	</button>
	{#if isOpen}
		<button
			type="button"
			aria-label="Move {label}"
			onclick={() => (isOpen = false)}
			{@attach controls.moveTrigger}
		>
			Move
		</button>
	{/if}
</header>
