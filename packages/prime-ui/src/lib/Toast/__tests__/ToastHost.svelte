<script lang="ts">
	import { untrack } from 'svelte';

	import Toast from '../Toast.svelte';
	import { provideToast, type ToastPlacement, type ToastVariant } from '../useToast.svelte.ts';

	interface Props {
		duration?: number;
		max?: number;
		placement?: ToastPlacement;
		onaction?: () => void;
	}

	const { duration = 200, max, placement, onaction }: Props = $props();

	const toasts = untrack(() => provideToast({ duration, max, placement }));
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
