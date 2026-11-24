import { mdiCheck } from '@mdi/js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import BoundSelect from './fixtures/BoundSelect.svelte';
import ItemsSelect from './fixtures/ItemsSelect.svelte';

const open = async (container: HTMLElement) => {
	await userEvent.click(container.querySelector('button')!);
	await vi.waitFor(() =>
		expect(document.querySelector('[role="option"]'), 'options rendered').not.toBeNull()
	);
	return [...document.querySelectorAll('[role="option"]')];
};

afterEach(async () => {
	if (document.querySelector('[role="listbox"]')) await userEvent.keyboard('{Escape}');
});

describe('Select.Item', () => {
	it('draws a check on the selected option only', async () => {
		const { container } = render(BoundSelect);

		const options = await open(container);

		expect(
			options.map((option) => option.querySelector('svg path')?.getAttribute('d') ?? null)
		).toEqual([mdiCheck, null, null]);
	});

	it('marks a disabled item for styling and assistive tech', async () => {
		const { container } = render(ItemsSelect);

		const options = await open(container);

		expect(options.map((option) => option.hasAttribute('data-disabled'))).toEqual([
			false,
			true,
			false
		]);
		expect(options.map((option) => option.getAttribute('aria-disabled'))).toEqual([
			null,
			'true',
			null
		]);
	});
});
