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
		<span>{label}</span>
		<button
			type="button"
			aria-label="Menu for {label}"
			aria-expanded={isOpen}
			onclick={() => (isOpen = !isOpen)}
		>
			...
		</button>
		{#if isOpen}
			<div role="menu" aria-label="Actions for {label}">
				<Panes.MoveTrigger aria-label="Move {label}" onclick={() => (isOpen = false)}>
					{#snippet child({ props })}
						<div role="menuitem" tabindex="-1" aria-label="Move {label}" {...props}>Move</div>
					{/snippet}
				</Panes.MoveTrigger>
			</div>
		{/if}
	</header>
</Panes.DragTrigger>
