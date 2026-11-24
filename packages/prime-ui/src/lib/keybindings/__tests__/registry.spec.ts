import { afterEach, describe, expect, it, vi } from 'vitest';

import type { Keybinding } from '../index.ts';

import { createKeybindings } from '../index.ts';

const hotkey = (
	id: string,
	key: string,
	modifiers: { shift?: boolean; mod?: boolean } = {}
): Keybinding => ({
	id,
	key,
	...modifiers,
	description: id,
	group: 'View'
});

const press = (key: string, modifiers: { shift?: boolean; mod?: boolean } = {}) => ({
	key,
	shift: modifiers.shift ?? false,
	mod: modifiers.mod ?? false
});

describe('keybinding registry', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('lists a binding while it is registered', () => {
		const keybindings = createKeybindings();
		const binding = hotkey('a', 'a');

		keybindings.register(binding, { run: () => undefined });

		expect(keybindings.bindings).toEqual([binding]);
	});

	it('drops a binding once its remover runs', () => {
		const keybindings = createKeybindings();
		const release = keybindings.register(hotkey('a', 'a'), { run: () => undefined });

		release();

		expect(keybindings.bindings).toEqual([]);
	});

	it('lists bindings in registration order', () => {
		const keybindings = createKeybindings();
		const zoom = hotkey('zoom', 'z');
		const add = hotkey('add', 'a');

		keybindings.register(zoom);
		keybindings.register(add);

		expect(keybindings.bindings).toEqual([zoom, add]);
	});

	it('lists a binding registered without a handler but never runs it', () => {
		const keybindings = createKeybindings();
		const binding = hotkey('listed', 'l');

		keybindings.register(binding);

		expect(keybindings.bindings).toEqual([binding]);
		expect(keybindings.matching(press('l'))).toEqual([]);
	});

	it('matches a press to its handler regardless of case', () => {
		const keybindings = createKeybindings();
		const handler = { run: vi.fn() };
		const binding = hotkey('c', 'c');

		keybindings.register(binding, handler);

		expect(keybindings.matching(press('C'))).toEqual([{ binding, handler }]);
	});

	it.each([
		{ label: 'an unshifted press', key: 'h', modifiers: {}, expected: 'hide' },
		{ label: 'a shifted press', key: 'H', modifiers: { shift: true }, expected: 'show-all' },
		{ label: 'an unmodified press', key: 's', modifiers: {}, expected: 'select-mode' },
		{ label: 'a modified press', key: 's', modifiers: { mod: true }, expected: 'save' }
	])(
		'matches $label only to the binding with the same modifiers',
		({ key, modifiers, expected }) => {
			const keybindings = createKeybindings();
			keybindings.register(hotkey('hide', 'h'), { run: vi.fn() });
			keybindings.register(hotkey('show-all', 'h', { shift: true }), { run: vi.fn() });
			keybindings.register(hotkey('select-mode', 's'), { run: vi.fn() });
			keybindings.register(hotkey('save', 's', { mod: true }), { run: vi.fn() });

			const matched = keybindings.matching(press(key, modifiers));

			expect(matched.map(({ binding }) => binding.id)).toEqual([expected]);
		}
	);

	it('matches every binding that claims a press, in registration order', () => {
		const keybindings = createKeybindings();
		vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		keybindings.register(hotkey('first', 'x'), { run: vi.fn() });
		keybindings.register(hotkey('second', 'x'), { run: vi.fn() });

		const matched = keybindings.matching(press('x'));

		expect(matched.map(({ binding }) => binding.id)).toEqual(['first', 'second']);
	});

	it('matches nothing for an unbound press', () => {
		const keybindings = createKeybindings();

		keybindings.register(hotkey('c', 'c'), { run: () => undefined });

		expect(keybindings.matching(press('j'))).toEqual([]);
	});

	it('warns when two bindings claim the same press', () => {
		const keybindings = createKeybindings();
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		keybindings.register(hotkey('first', 'x'), { run: () => undefined });
		keybindings.register(hotkey('second', 'x'), { run: () => undefined });

		expect(warn).toHaveBeenCalledWith(expect.stringContaining('"second" and "first"'));
	});

	it('does not warn when the shift qualifier differs', () => {
		const keybindings = createKeybindings();
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		keybindings.register(hotkey('plain', 'h'), { run: () => undefined });
		keybindings.register(hotkey('shifted', 'h', { shift: true }), { run: () => undefined });

		expect(warn).not.toHaveBeenCalled();
	});
});
