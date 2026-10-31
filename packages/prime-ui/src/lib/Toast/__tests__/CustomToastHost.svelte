<script lang="ts">
	import Toast from '../Toast.svelte';
	import { provideToast } from '../useToast.svelte.ts';

	const toasts = provideToast({ duration: 60_000 });
</script>

<button type="button" data-testid="danger" onclick={() => toasts.danger('Custom')}>danger</button>
<Toast>
	{#snippet item(toastState)}
		<p data-testid="custom" data-variant={toastState.variant} data-paused={toastState.paused}>
			{toastState.title}
		</p>
		<button type="button" data-testid="custom-dismiss" onclick={toastState.dismiss}>Close</button>
	{/snippet}
</Toast>
