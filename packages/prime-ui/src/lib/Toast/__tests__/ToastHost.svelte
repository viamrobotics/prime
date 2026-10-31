<script lang="ts">
	import { untrack } from 'svelte';

	import Toast from '../Toast.svelte';
	import { provideToast, type ToastVariant } from '../useToast.svelte.ts';

	interface Props {
		duration?: number;
		max?: number;
		onaction?: () => void;
	}

	const { duration = 200, max, onaction }: Props = $props();

	const toasts = untrack(() => provideToast({ duration, max }));
	const variants: ToastVariant[] = ['info', 'success', 'warning', 'danger'];
</script>

{#each variants as variant (variant)}
	<button type="button" data-testid={variant} onclick={() => toasts[variant](`Title ${variant}`)}>
		{variant}
	</button>
{/each}
<button
	type="button"
	data-testid="action"
	onclick={() =>
		toasts.create({
			title: 'Deleted',
			variant: 'info',
			description: 'report.csv',
			action: { label: 'Undo', onclick: () => onaction?.() }
		})}
>
	action
</button>
<button
	type="button"
	data-testid="pair"
	onclick={() => {
		toasts.info('First');
		toasts.info('Second');
	}}
>
	pair
</button>
<Toast />
