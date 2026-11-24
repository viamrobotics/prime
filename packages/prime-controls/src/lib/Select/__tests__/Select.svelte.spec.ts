import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import { Select } from '../select.ts';
import BoundSelect from './fixtures/BoundSelect.svelte';
import ChildlessSelect from './fixtures/ChildlessSelect.svelte';
import CustomItemSelect from './fixtures/CustomItemSelect.svelte';
import GroupedSelect from './fixtures/GroupedSelect.svelte';
import HintedSelect from './fixtures/HintedSelect.svelte';
import OrphanItems from './fixtures/OrphanItems.svelte';

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
	it.each(['Move', 'Rotate', 'Scale'])('lists the %s item when it opens on click', async (name) => {
		render(BoundSelect);

		await trigger().click();

		await expect.element(option(name)).toBeInTheDocument();
	});

	it('opens with ArrowDown from the focused trigger', async () => {
		render(BoundSelect);
		(trigger().element() as HTMLElement).focus();

		await userEvent.keyboard('{ArrowDown}');

		await expect.element(option('Move')).toBeInTheDocument();
	});

	it('picks the highlighted item with Enter and closes the list', async () => {
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

		expect(listbox(), 'the list stays closed').toBeNull();
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

describe('Select parts', () => {
	const opened = async () => {
		const screen = render(GroupedSelect);
		await trigger().click();
		await expect.element(option('Alpha')).toBeInTheDocument();
		return screen;
	};

	it('sets item padding to 6px across and 2px down', async () => {
		await opened();

		const item = getComputedStyle(option('Alpha').element());

		expect(item.paddingLeft).toBe('6px');
		expect(item.paddingTop).toBe('2px');
	});

	it('sets group heading padding to 6px across and 2px down', async () => {
		await opened();

		const heading = getComputedStyle(page.getByText('Modes', { exact: true }).element());

		expect(heading.paddingLeft).toBe('6px');
		expect(heading.paddingTop).toBe('2px');
	});

	it('puts the class prop on the trigger', () => {
		render(GroupedSelect);

		expect(
			trigger().element().classList.contains('trigger-extra'),
			'trigger carries the class'
		).toBe(true);
	});

	it('puts the class prop on a hand-built item', async () => {
		await opened();

		expect(
			option('Alpha').element().classList.contains('item-extra'),
			'item carries the class'
		).toBe(true);
	});

	it('marks a disabled item aria-disabled', async () => {
		await opened();

		await expect.element(option('Beta')).toHaveAttribute('aria-disabled', 'true');
	});

	it('does not pick a disabled item', async () => {
		const { container } = await opened();

		await option('Beta').click({ force: true });

		expect(owner(container)).toBe('');
	});
});

describe('Select.Items', () => {
	it('renders the children snippet for each item with its selected state', async () => {
		render(CustomItemSelect);

		await trigger().click();

		await expect.element(option('Alpha:false')).toBeInTheDocument();
		await expect
			.element(page.getByRole('option', { name: /Beta/ }))
			.toHaveTextContent('Beta:false');
	});

	it('passes disabled through to the item', async () => {
		render(CustomItemSelect);

		await trigger().click();

		await expect
			.element(page.getByRole('option', { name: /Beta/ }))
			.toHaveAttribute('aria-disabled', 'true');
	});

	it('marks the picked item selected in the children snippet', async () => {
		render(CustomItemSelect);
		await trigger().click();
		await option('Alpha:false').click();

		await trigger().click();

		await expect.element(option('Alpha:true')).toBeInTheDocument();
	});

	it('throws outside a Select', () => {
		expect(() => render(OrphanItems)).toThrow('Select.Items must be rendered inside a Select.');
	});
});

describe('Select width', () => {
	const items = [
		{ value: 'move', label: 'Move' },
		{ value: 'rotate', label: 'Rotate' }
	];
	const CONTAINER_WIDTH = '256px';

	it("fills its container's width without children", () => {
		const { container } = render(ChildlessSelect);
		container.style.width = CONTAINER_WIDTH;

		expect(trigger().element().getBoundingClientRect().width).toBe(
			container.getBoundingClientRect().width
		);
	});

	it("fills its container's width with a hint", () => {
		const { container } = render(HintedSelect);
		container.style.width = CONTAINER_WIDTH;

		const row = trigger().element().parentElement!;
		expect(row.getBoundingClientRect().width).toBe(container.getBoundingClientRect().width);
	});

	it('puts class on the trigger', async () => {
		render(Select, { props: { items, 'aria-label': 'Mode', class: 'min-w-0 flex-1' } });

		await expect.element(trigger()).toHaveClass('min-w-0', 'flex-1');
	});
});
