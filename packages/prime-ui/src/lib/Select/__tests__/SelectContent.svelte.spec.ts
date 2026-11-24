import type { ComponentProps } from 'svelte';

import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { boxShadow, shapeOf } from '../../../../test/computed-style.ts';
import { Select } from '../select.ts';
import PlacedSelect from './fixtures/PlacedSelect.svelte';

const listbox = () => document.querySelector<HTMLElement>('[role="listbox"]');

const openPanel = async (props: ComponentProps<typeof Select.Content> = {}) => {
	const { container } = render(PlacedSelect, { placement: props });
	await userEvent.click(container.querySelector('button')!);
	const panel = await vi.waitFor(() => {
		const content = document.querySelector<HTMLElement>('[data-side]');
		expect(content, 'panel rendered').not.toBeNull();
		return content!;
	});
	return { container, panel };
};

afterEach(async () => {
	if (listbox()) await userEvent.keyboard('{Escape}');
});

describe('Select.Content', () => {
	it('defaults to the bottom side and start alignment', async () => {
		const { panel } = await openPanel();

		expect(panel.dataset.side).toBe('bottom');
		expect(panel.dataset.align).toBe('start');
	});

	it('passes side and align through', async () => {
		const { panel } = await openPanel({ side: 'top', align: 'end' });

		await vi.waitFor(() => {
			expect(panel.dataset.side).toBe('top');
			expect(panel.dataset.align).toBe('end');
		});
	});

	it('portals the panel out of the select by default', async () => {
		const { container, panel } = await openPanel();

		expect(container.contains(panel), 'panel outside the render container').toBe(false);
	});

	it('renders the panel in place when portal is false', async () => {
		const { container, panel } = await openPanel({ portal: false });

		expect(container.contains(panel), 'panel inside the render container').toBe(true);
	});

	it('stacks the panel on the popover layer', async () => {
		await openPanel();

		expect(getComputedStyle(listbox()!).zIndex).toBe('1200');
	});

	it('wears the popover shadow token', async () => {
		await openPanel();

		const expected = shapeOf('shadow-popover', 'boxShadow');
		expect(expected).not.toBe('none');
		expect(boxShadow(listbox()!)).toBe(expected);
	});
});
