import type { Keybinding } from './keybinding.ts';

const ARROW_SYMBOLS: Record<string, string> = {
	arrowup: '↑',
	arrowdown: '↓',
	arrowleft: '←',
	arrowright: '→'
};

const isAppleDevice = () => /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

/** A single key as it should be printed. `w` reads as `W`, `arrowup` as `↑`. */
export const formatKey = (key: string): string => {
	return ARROW_SYMBOLS[key] ?? (key.length === 1 ? key.toUpperCase() : key);
};

const toTokens = (binding: Keybinding): string[] => {
	const tokens: string[] = [];

	if (binding.mod) tokens.push('Mod');
	if (binding.shift) tokens.push('Shift');
	tokens.push(binding.key);

	return tokens;
};

/**
 * The printed keys of a binding, one entry per key, for rendering a chip each. Apple keyboards
 * label the modifiers with symbols, so Mod reads `⌘` there and `Ctrl` elsewhere.
 *
 * `formatKeybinding` prints the same keys as one string. Use that where markup will not fit,
 * such as an attribute.
 */
export const keybindingParts = (binding: Keybinding): string[] => {
	const apple = isAppleDevice();

	return toTokens(binding).map((token) => {
		if (token === 'Mod') return apple ? '⌘' : 'Ctrl';
		if (token === 'Shift') return apple ? '⇧' : 'Shift';
		return formatKey(token);
	});
};

/** A binding as one run of text: `⌘⇧Z` on Apple devices, `Ctrl+Shift+Z` elsewhere. */
export const formatKeybinding = (binding: Keybinding): string => {
	return keybindingParts(binding).join(isAppleDevice() ? '' : '+');
};
