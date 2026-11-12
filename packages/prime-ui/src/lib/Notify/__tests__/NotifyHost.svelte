<script lang="ts">
	import { untrack } from 'svelte';

	import Notify from '../Notify.svelte';
	import { provideNotify } from '../useNotify.svelte.ts';

	interface Props {
		duration?: number;
		onDismiss?: () => void;
	}

	const { duration = 600, onDismiss }: Props = $props();

	const notify = untrack(() => provideNotify({ duration }));
</script>

{#snippet view()}
	<a data-testid="view" href="#deployed">View</a>
{/snippet}

<Notify />

<div class="fixed bottom-0 left-0 flex flex-wrap gap-2">
	<button data-testid="info" onclick={() => notify.info('Deployed')}>Info</button>
	<button
		data-testid="danger"
		onclick={() => notify.danger('Failed to publish', 'The module is unreachable.')}
	>
		Danger
	</button>
	<button data-testid="pending" onclick={() => notify.pending('Publishing')}>Pending</button>
	<button
		data-testid="actions"
		onclick={() => notify.info('Deployed', undefined, { actions: view })}
	>
		Actions
	</button>
	<button
		data-testid="resolve-pending"
		onclick={() => notify.update(notify.pending('Publishing').id, { variant: 'success' })}
	>
		Resolve pending
	</button>
	<button
		data-testid="progress"
		onclick={() =>
			notify.update(notify.pending('Uploading', undefined, { progress: 20 }).id, { progress: 60 })}
	>
		Progress
	</button>
	<button
		data-testid="resolve-persisted"
		onclick={() =>
			notify.update(notify.info('Saved', undefined, { persist: true }).id, { variant: 'success' })}
	>
		Resolve persisted
	</button>
	<button
		data-testid="dismissable"
		onclick={() => notify.info('Saved', undefined, { persist: true, onDismiss })}
	>
		Dismissable
	</button>
</div>
