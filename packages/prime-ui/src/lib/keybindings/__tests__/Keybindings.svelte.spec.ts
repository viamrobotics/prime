import { describe, expect, it, onTestFinished, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import HotkeyChild from './HotkeyChild.svelte';
import KeybindingsHost from './KeybindingsHost.svelte';

const recordDefaultPrevented = () => {
	const seen: boolean[] = [];
	const record = (event: KeyboardEvent) => seen.push(event.defaultPrevented);
	window.addEventListener('keydown', record);
	onTestFinished(() => window.removeEventListener('keydown', record));
	return seen;
};

describe('provideKeybindings', () => {
	it.each([
		{ outcome: 'runs', label: 'a registered key', init: { key: 'k' }, calls: 1 },
		{ outcome: 'ignores', label: 'an unregistered key', init: { key: 'j' }, calls: 0 },
		{ outcome: 'ignores', label: 'a repeat', init: { key: 'k', repeat: true }, calls: 0 },
		{
			outcome: 'ignores',
			label: 'a press with Option held',
			init: { key: 'k', altKey: true },
			calls: 0
		}
	])('$outcome $label', ({ init, calls }) => {
		const run = vi.fn();
		render(KeybindingsHost, { run });

		window.dispatchEvent(new KeyboardEvent('keydown', init));

		expect(run).toHaveBeenCalledTimes(calls);
	});

	it('leaves an unmodified press typed into a field to the field', async () => {
		const run = vi.fn();
		const screen = render(KeybindingsHost, { run });
		await screen.getByRole('textbox', { name: 'field' }).click();

		await userEvent.keyboard('k');

		expect(run).not.toHaveBeenCalled();
	});

	it('runs a press with the command key held even when typed into a field', async () => {
		const run = vi.fn();
		const screen = render(KeybindingsHost, { run, mod: true });
		await screen.getByRole('textbox', { name: 'field' }).click();

		await userEvent.keyboard('{Control>}k{/Control}');

		expect(run).toHaveBeenCalledTimes(1);
	});

	it('skips a hotkey whose when returns false', async () => {
		const run = vi.fn();
		render(KeybindingsHost, { run, when: () => false });

		await userEvent.keyboard('k');

		expect(run).not.toHaveBeenCalled();
	});

	it.each([
		{ preventDefault: true, expected: true },
		{ preventDefault: false, expected: false }
	])(
		'sets defaultPrevented to $expected when preventDefault is $preventDefault',
		async ({ preventDefault, expected }) => {
			render(KeybindingsHost, { run: vi.fn(), preventDefault });
			const seen = recordDefaultPrevented();

			await userEvent.keyboard('k');

			expect(seen).toEqual([expected]);
		}
	);

	it('stops running shortcuts once the provider unmounts', () => {
		const run = vi.fn();
		const screen = render(KeybindingsHost, {
			run: vi.fn(),
			showChild: false,
			onProvide: (keybindings) =>
				keybindings.register({ id: 'j', description: 'J', group: 'View', key: 'j' }, { run })
		});

		screen.unmount();
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j' }));

		expect(run).not.toHaveBeenCalled();
	});

	it('lists the hotkey of a mounted child', async () => {
		const screen = render(KeybindingsHost, { run: vi.fn() });

		await expect.element(screen.getByRole('status')).toHaveTextContent('test-k');
	});

	it('drops the hotkey from the listing when the child unmounts', async () => {
		const screen = render(KeybindingsHost, { run: vi.fn() });
		await expect.element(screen.getByRole('status')).toHaveTextContent('test-k');

		await screen.rerender({ showChild: false });

		await expect.element(screen.getByRole('status')).toHaveTextContent('');
	});
});

describe('useHotkey', () => {
	it('throws outside a provideKeybindings', () => {
		expect(() => render(HotkeyChild, { run: vi.fn() })).toThrow(
			'useKeybindings() needs a provideKeybindings() above it'
		);
	});
});
