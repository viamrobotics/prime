<script lang="ts">
	import { untrack } from 'svelte';

	import Notify from '../Notify.svelte';
	import { provideNotify, type NotifyItemState } from '../useNotify.svelte.ts';

	interface Props {
		duration?: number;
		onDismiss?: () => void;
		custom?: boolean;
	}

	const { duration = 600, onDismiss, custom = false }: Props = $props();

	const notify = untrack(() => provideNotify({ duration }));
</script>

{#snippet customItem(notification: NotifyItemState)}
	<p data-testid="custom">{notification.title} {notification.remaining}</p>
	<button data-testid="custom-dismiss" onclick={notification.dismiss}>Dismiss</button>
{/snippet}

<Notify item={custom ? customItem : undefined} />

<div class="fixed bottom-0 left-0 flex gap-2">
	<button data-testid="info" onclick={() => notify.info('Deployed')}>Info</button>
	<button
		data-testid="danger"
		onclick={() => notify.danger('Failed to publish', 'The module is unreachable.')}
	>
		Danger
	</button>
	<button data-testid="pending" onclick={() => notify.pending('Publishing')}>Pending</button>
	<button
		data-testid="dismissable"
		onclick={() => notify.info('Saved', undefined, { persist: true, onDismiss })}
	>
		Dismissable
	</button>
</div>
