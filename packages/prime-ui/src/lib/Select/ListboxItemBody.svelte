<script lang="ts">
	import type { Snippet } from 'svelte';

	import { mdiCheck } from '@mdi/js';

	import Icon from '../Icon/Icon.svelte';

	interface Props {
		value: string;
		label?: string;
		selected: boolean;
		highlighted: boolean;
		content?: Snippet<[{ selected: boolean; highlighted: boolean }]>;
	}

	const { value, label, selected, highlighted, content }: Props = $props();
</script>

{#if content}
	{@render content({ selected, highlighted })}
{:else}
	<span class="truncate">{label ?? value}</span>
	{#if selected}
		<Icon icon={mdiCheck} size="sm" class="shrink-0 text-default" />
	{/if}
{/if}
