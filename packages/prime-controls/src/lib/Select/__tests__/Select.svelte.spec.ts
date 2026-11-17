import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import BoundSelect from './BoundSelect.svelte';
import ChildlessSelect from './ChildlessSelect.svelte';
import HintedSelect from './HintedSelect.svelte';

const MIN_ROW_HEIGHT_PX = 24;
const MAX_ROW_HEIGHT_PX = 28;

const trigger = () => page.getByRole('combobox', { name: 'Mode' });
const option = (name: string) => page.getByRole('option', { name, exact: true });
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')!.textContent;
const listbox = () => document.querySelector('[role="listbox"]');
const rootProperty = (name: string) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const resolvedFontSize = (size: string) => {
	const node = document.createElement('span');
	node.style.fontSize = size;
	document.body.append(node);
	const resolved = getComputedStyle(node).fontSize;
	node.remove();
	return resolved;
};

afterEach(async () => {
	if (listbox()) await userEvent.keyboard('{Escape}');
});

describe('Select', () => {
	it('opens on click and lists the items', async () => {
		render(BoundSelect);

		await trigger().click();

		for (const name of ['Move', 'Rotate', 'Scale']) {
			await expect.element(option(name)).toBeInTheDocument();
		}
	});

	it('opens with the keyboard and Enter picks the highlighted item', async () => {
		const { container } = render(BoundSelect);

		(trigger().element() as HTMLElement).focus();
		await userEvent.keyboard('{ArrowDown}');
		await expect.element(option('Move')).toBeInTheDocument();
		await userEvent.keyboard('{ArrowDown}{Enter}');

		await vi.waitFor(() => expect(owner(container)).toBe('rotate'));
		await vi.waitFor(() => expect(listbox()).toBeNull());
	});

	it('writes the picked item to the bound value and shows its label when closed', async () => {
		const { container } = render(BoundSelect);

		await trigger().click();
		await option('Scale').click();

		await vi.waitFor(() => expect(owner(container)).toBe('scale'));
		await expect.element(trigger()).toHaveTextContent('Scale');
	});

	it('does not open when disabled', async () => {
		render(BoundSelect, { props: { disabled: true } });

		await trigger().click({ force: true });

		expect(listbox()).toBeNull();
	});

	describe('without children', () => {
		it('names the trigger and shows the placeholder', async () => {
			render(ChildlessSelect);

			await expect.element(trigger()).toBeInTheDocument();
			await expect.element(trigger()).toHaveTextContent('Pick a mode');
		});

		it('lists one option per item, in order', async () => {
			render(ChildlessSelect);

			await trigger().click();
			await expect.element(option('Move')).toBeInTheDocument();

			const names = [...listbox()!.querySelectorAll('[role="option"]')].map((node) =>
				node.textContent?.trim()
			);
			expect(names).toEqual(['Move', 'Rotate', 'Scale']);
		});

		it('writes the picked item to the bound value and shows its label when closed', async () => {
			const { container } = render(ChildlessSelect);

			await trigger().click();
			await option('Rotate').click();

			await vi.waitFor(() => expect(owner(container)).toBe('rotate'));
			await vi.waitFor(() => expect(listbox()).toBeNull());
			await expect.element(trigger()).toHaveTextContent('Rotate');
		});
	});

	describe('density', () => {
		it('renders the trigger between 24px and 28px tall in text-xs', () => {
			render(BoundSelect);

			const element = trigger().element();
			const { height } = element.getBoundingClientRect();

			expect(height).toBeGreaterThanOrEqual(MIN_ROW_HEIGHT_PX);
			expect(height).toBeLessThanOrEqual(MAX_ROW_HEIGHT_PX);
			expect(getComputedStyle(element).fontSize).toBe(resolvedFontSize(rootProperty('--text-xs')));
		});

		it('renders an open item between 24px and 28px tall in text-xs', async () => {
			render(BoundSelect);

			await trigger().click();
			const element = option('Rotate').element();
			const { height } = element.getBoundingClientRect();

			expect(height).toBeGreaterThanOrEqual(MIN_ROW_HEIGHT_PX);
			expect(height).toBeLessThanOrEqual(MAX_ROW_HEIGHT_PX);
			expect(getComputedStyle(element).fontSize).toBe(resolvedFontSize(rootProperty('--text-xs')));
		});
	});
});

describe('Select hint', () => {
	const HINT = 'How the gizmo moves the part';

	it('names an info button after the label', async () => {
		render(HintedSelect);

		await expect.element(page.getByRole('button', { name: 'About Mode' })).toBeInTheDocument();
	});

	it('describes the control by the hint while the tooltip is closed', async () => {
		render(HintedSelect);

		expect(page.getByRole('tooltip').query()).toBeNull();
		await expect
			.element(page.getByRole('combobox', { name: 'Mode' }))
			.toHaveAccessibleDescription(HINT);
	});

	it('shows the hint in a tooltip when the button takes focus', async () => {
		render(HintedSelect);

		await userEvent.tab();
		await userEvent.tab();
		await expect.element(page.getByRole('button', { name: 'About Mode' })).toHaveFocus();
		await expect.element(page.getByRole('tooltip')).toHaveTextContent(HINT);
	});

	it('renders no button and no description without a hint', async () => {
		render(ChildlessSelect);

		expect(page.getByRole('button', { name: 'About Mode' }).query()).toBeNull();
		await expect
			.element(page.getByRole('combobox', { name: 'Mode' }))
			.not.toHaveAttribute('aria-describedby');
	});
});
