<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import CodeEditor from '../../CodeEditor.svelte';

	interface Props extends Omit<ComponentProps<typeof CodeEditor>, 'value'> {
		initial?: string;
		replacement?: string;
		isAccepting?: boolean;
		record: (next: string) => void;
	}

	const { initial = '', replacement = '', isAccepting = false, record, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<CodeEditor
	aria-label="Robot config"
	{...rest}
	bind:value={
		() => value,
		(next) => {
			record(next);
			if (isAccepting) value = next;
		}
	}
/>
<span data-testid="owner">{value}</span>
<button type="button" onclick={() => (value = replacement)}>Replace</button>
