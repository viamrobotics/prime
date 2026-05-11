<script lang="ts">
	import Icon from '../Icon/Icon.svelte';
	import { useInput } from './useInput.svelte.ts';

	const input = useInput();

	const icon = $derived.by(() => {
		if (input.isInfo) {
			return 'information';
		} else if (input.isWarn) {
			return 'alert';
		} else if (input.isError) {
			return 'alert-circle';
		} else {
			return undefined;
		}
	});
</script>

{#if icon}
	<Icon
		class={[
			'absolute top-1.5 right-2',
			{
				'text-info-dark': input.isInfo,
				'text-warning-bright': input.isWarn,
				'text-danger-dark': input.isError
			}
		]}
		name={icon}
	/>
{/if}
