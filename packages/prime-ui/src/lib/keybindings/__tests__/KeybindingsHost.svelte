<script lang="ts">
	import { provideKeybindings } from '../index.ts';
	import HotkeyChild from './HotkeyChild.svelte';

	let { run, showChild = true }: { run: () => void; showChild?: boolean } = $props();

	const keybindings = provideKeybindings();
</script>

<input aria-label="field" />
<output>{keybindings.bindings.map((binding) => binding.id).join(',')}</output>
{#if showChild}
	<HotkeyChild {run} />
{/if}
