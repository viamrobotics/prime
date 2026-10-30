export type {
	HotkeyDefinition,
	HotkeyHandler,
	Keybinding,
	KeybindingsContext,
	MatchedHotkey,
	Press
} from './keybinding.ts';

export {
	createKeybindings,
	provideKeybindings,
	useHotkey,
	useKeybinding,
	useKeybindings
} from './registry.svelte.ts';

export { formatKey, formatKeybinding, keybindingParts } from './format-keybinding.ts';
