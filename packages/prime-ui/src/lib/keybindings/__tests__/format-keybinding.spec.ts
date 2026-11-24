import { afterEach, describe, expect, it, vi } from 'vitest';

import type { Keybinding } from '../index.ts';

import { formatKey, formatKeybinding, keybindingParts } from '../index.ts';

const MAC_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)';
const WINDOWS_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

const redo: Keybinding = {
	id: 'redo',
	description: 'Redo',
	group: 'Editing',
	key: 'z',
	mod: true,
	shift: true
};

const stubUserAgent = (userAgent: string) => vi.stubGlobal('navigator', { userAgent });

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('formatKey', () => {
	it.each([
		{ key: 'w', printed: 'W' },
		{ key: 'arrowup', printed: '↑' },
		{ key: 'arrowdown', printed: '↓' },
		{ key: 'arrowleft', printed: '←' },
		{ key: 'arrowright', printed: '→' },
		{ key: 'enter', printed: 'enter' }
	])('prints $key as $printed', ({ key, printed }) => {
		expect(formatKey(key)).toBe(printed);
	});
});

describe('keybindingParts', () => {
	it('prints the modifiers as symbols on an Apple device', () => {
		stubUserAgent(MAC_USER_AGENT);

		expect(keybindingParts(redo)).toEqual(['⌘', '⇧', 'Z']);
	});

	it('prints the modifiers as words elsewhere', () => {
		stubUserAgent(WINDOWS_USER_AGENT);

		expect(keybindingParts(redo)).toEqual(['Ctrl', 'Shift', 'Z']);
	});

	it('prints only the key when no modifier is part of the press', () => {
		stubUserAgent(WINDOWS_USER_AGENT);

		expect(keybindingParts({ ...redo, mod: false, shift: false })).toEqual(['Z']);
	});
});

describe('formatKeybinding', () => {
	it('runs the keys together on an Apple device', () => {
		stubUserAgent(MAC_USER_AGENT);

		expect(formatKeybinding(redo)).toBe('⌘⇧Z');
	});

	it('joins the keys with plus signs elsewhere', () => {
		stubUserAgent(WINDOWS_USER_AGENT);

		expect(formatKeybinding(redo)).toBe('Ctrl+Shift+Z');
	});
});
