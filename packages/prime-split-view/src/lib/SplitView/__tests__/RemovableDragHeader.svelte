<script lang="ts">
	import { SplitView } from '../split-view.ts';

	interface Props {
		label: string;
	}

	const { label }: Props = $props();

	let hasHeader = $state(true);
</script>

<button
	type="button"
	aria-label="Remove header of {label}"
	class="absolute top-0 left-0 z-10"
	onclick={() => (hasHeader = false)}
>
	Remove header
</button>
{#if hasHeader}
	<SplitView.DragTrigger>
		<header data-header={label} class="absolute top-8 left-0 z-10 bg-light p-1">
			<span data-header-text={label}>{label}</span>
			<button type="button" data-control="button">Hold</button>
		</header>
	</SplitView.DragTrigger>
{/if}
