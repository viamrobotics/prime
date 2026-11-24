import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import SelectItems from '../SelectItems.svelte';
import CustomItemsSelect from './fixtures/CustomItemsSelect.svelte';
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

describe('Select.Items', () => {
	it('renders one option per item in order', async () => {
		const { container } = render(ItemsSelect);

		const options = await open(container);

		expect(options.map((o) => o.textContent?.trim())).toEqual(['Small', 'Medium', 'Large']);
	});

	it('writes the picked value back', async () => {
		const { container } = render(ItemsSelect);
		const options = await open(container);

		await userEvent.click(options[2]!);

		await vi.waitFor(() =>
			expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('lg')
		);
	});

	it('renders a custom snippet for each item', async () => {
		const { container } = render(CustomItemsSelect);

		const options = await open(container);

		expect(options.map((o) => o.textContent?.trim())).toEqual(['SMALL', 'LARGE']);
	});

	it('throws when rendered outside a Select', () => {
		expect(() => render(SelectItems)).toThrow('Select.Items must be rendered inside a Select.');
	});
});
