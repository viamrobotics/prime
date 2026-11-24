<script lang="ts">
	import { untrack, type ComponentProps } from 'svelte';

	import { provideKeybindings, type KeybindingsContext } from '../../index.ts';
	import HotkeyChild from './HotkeyChild.svelte';

	interface Props extends ComponentProps<typeof HotkeyChild> {
		showChild?: boolean;
		onProvide?: (keybindings: KeybindingsContext) => void;
	}

	const { showChild = true, onProvide, ...hotkey }: Props = $props();

	const keybindings = provideKeybindings();
	untrack(() => onProvide?.(keybindings));
</script>

<input aria-label="field" />
<output>{keybindings.bindings.map((binding) => binding.id).join(',')}</output>
{#if showChild}
	<HotkeyChild {...hotkey} />
{/if}
