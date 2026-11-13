<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import CodeEditor from '../CodeEditor.svelte';

	interface Props extends Omit<ComponentProps<typeof CodeEditor>, 'value'> {
		initial?: string;
		replacement?: string;
	}

	const { initial = '', replacement = '', ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<CodeEditor {...rest} bind:value />
<span data-testid="owner">{value}</span>
<button type="button" onclick={() => (value = replacement)}>Replace</button>
