import type { ComponentProps } from 'svelte';

import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { Select } from '../select.ts';
import CustomItemsSelect from './CustomItemsSelect.svelte';
import ItemsSelect from './ItemsSelect.svelte';
import PlacedSelect from './PlacedSelect.svelte';

const open = async (container: HTMLElement) => {
	await userEvent.click(container.querySelector('button')!);
	await vi.waitFor(() => expect(document.querySelector('[role="option"]')).toBeTruthy());
	return [...document.querySelectorAll('[role="option"]')];
};

const placed = async (placement: ComponentProps<typeof Select.Content>) => {
	const { container } = render(PlacedSelect, { placement });
	await open(container);
	let content: Element | null = null;
	await vi.waitFor(() => {
		content = document.querySelector('[data-side]');
		expect(content).toBeTruthy();
	});
	return content as unknown as HTMLElement;
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

	it('marks a disabled item for styling and assistive tech', async () => {
		const { container } = render(ItemsSelect);

		const options = await open(container);

		expect(options.map((o) => o.hasAttribute('data-disabled'))).toEqual([false, true, false]);
		expect(options.map((o) => o.getAttribute('aria-disabled'))).toEqual([null, 'true', null]);
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
});

describe('Select.Content placement', () => {
	it('defaults to the bottom side and start alignment', async () => {
		const content = await placed({});

		expect(content.dataset.side).toBe('bottom');
		expect(content.dataset.align).toBe('start');
	});

	it('passes side and align through', async () => {
		const content = await placed({ side: 'top', align: 'end' });

		await vi.waitFor(() => {
			expect(content.dataset.side).toBe('top');
			expect(content.dataset.align).toBe('end');
		});
	});
});
