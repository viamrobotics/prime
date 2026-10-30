import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import KeybindingsHost from './KeybindingsHost.svelte';

describe('provideKeybindings', () => {
	it('runs the handler of a registered key and ignores an unregistered one', async () => {
		const run = vi.fn();
		render(KeybindingsHost, { run });

		await userEvent.keyboard('k');
		expect(run).toHaveBeenCalledTimes(1);

		await userEvent.keyboard('j');
		expect(run).toHaveBeenCalledTimes(1);
	});

	it('leaves an unmodified press typed into a field to the field', async () => {
		const run = vi.fn();
		const screen = render(KeybindingsHost, { run });

		await screen.getByRole('textbox', { name: 'field' }).click();
		await userEvent.keyboard('k');

		expect(run).not.toHaveBeenCalled();
	});

	it('lists the hotkey while the child is mounted', async () => {
		const screen = render(KeybindingsHost, { run: vi.fn() });
		await expect.element(screen.getByRole('status')).toHaveTextContent('test-k');

		await screen.rerender({ showChild: false });
		await expect.element(screen.getByRole('status')).toHaveTextContent('');
	});
});
