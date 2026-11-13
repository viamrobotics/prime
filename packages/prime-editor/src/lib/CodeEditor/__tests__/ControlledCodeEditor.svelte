<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import CodeEditor from '../CodeEditor.svelte';

	interface Props extends Omit<ComponentProps<typeof CodeEditor>, 'value'> {
		initial?: string;
		isAccepting?: boolean;
		record: (next: string) => void;
	}

	const { initial = '', isAccepting = false, record, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<CodeEditor
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
