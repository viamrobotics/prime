<script lang="ts">
	import Icon from '../Icon/Icon.svelte';
	import { useInput } from './useInput.svelte.ts';

	const input = useInput();
</script>

{#if input.icon}
	<Icon
		class={[
			'absolute top-1.5 right-2',
			{
				'text-info-dark': input.isInfo,
				'text-warning-bright': input.isWarn,
				'text-danger-dark': input.isError
			}
		]}
		name={input.icon}
	/>
{/if}
