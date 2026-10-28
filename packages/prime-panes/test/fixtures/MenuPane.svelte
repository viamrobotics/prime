<script lang="ts">
	import { Panes } from '../../src/lib/Panes/panes.ts';

	interface Props {
		label: string;
	}

	const { label }: Props = $props();

	let isOpen = $state(false);
</script>

<Panes.DragTrigger>
	<header
		data-header={label}
		class="absolute top-0 left-0 z-10 flex items-center gap-1 bg-light p-1"
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
			<Panes.MoveTrigger onclick={() => (isOpen = false)}>
				{#snippet child({ props })}
					<div role="menuitem" tabindex="-1" aria-label="Move {label}" {...props}>Move</div>
				{/snippet}
			</Panes.MoveTrigger>
		{/if}
	</header>
</Panes.DragTrigger>
