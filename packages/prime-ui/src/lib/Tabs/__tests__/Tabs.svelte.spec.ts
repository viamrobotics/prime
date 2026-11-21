import { tick } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { colorOf } from '../../__tests__/computed-style.ts';
import BoundTabs from './BoundTabs.svelte';
import ClosableTabs from './ClosableTabs.svelte';
import ControlledTabs from './ControlledTabs.svelte';
import LabelledActionTab from './LabelledActionTab.svelte';
import SingleTab from './SingleTab.svelte';
import UndefinedTabs from './UndefinedTabs.svelte';

const tablist = (container: Element) => container.querySelector<HTMLElement>('[role="tablist"]');
const tabs = (container: Element) => [...container.querySelectorAll<HTMLElement>('[role="tab"]')];
const tab = (container: Element, label: string) =>
	tabs(container).find((item) => item.textContent?.includes(label))!;
const tabLabel = (container: Element, label: string) =>
	tab(container, label).querySelector('span')!;
const labels = (container: Element) => tabs(container).map((item) => item.textContent?.trim());
const panels = (container: Element) => [
	...container.querySelectorAll<HTMLElement>('[role="tabpanel"]')
];
const visiblePanels = (container: Element) =>
	panels(container)
		.filter((panel) => panel.checkVisibility())
		.map((panel) => panel.textContent?.trim());
const selectedLabels = (container: Element) =>
	tabs(container)
		.filter((item) => item.getAttribute('aria-selected') === 'true')
		.map((item) => item.textContent?.trim());
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const button = (container: Element, name: string) =>
	[...container.querySelectorAll('button')].find((item) => item.textContent?.trim() === name)!;
const closeButton = (container: Element, label: string) =>
	container.querySelector<HTMLButtonElement>(`button[aria-label="Close ${label}"]`)!;
const borderBottomColor = (element: Element) => getComputedStyle(element).borderBottomColor;

describe('Tabs', () => {
	it('renders a labeled tablist with a tab and a panel per trigger, the first selected', () => {
		const { container } = render(BoundTabs, { props: { label: 'Package details' } });

		expect(tablist(container)?.getAttribute('aria-label')).toBe('Package details');
		expect(labels(container)).toEqual(['Overview', 'Usage', 'API']);
		expect(tabs(container).map((item) => item.getAttribute('aria-selected'))).toEqual([
			'true',
			'false',
			'false'
		]);
		expect(panels(container)).toHaveLength(3);
		expect(visiblePanels(container)).toEqual(['Overview panel']);
	});

	it('renders each tab without the button-only type attribute', () => {
		const { container } = render(BoundTabs);

		expect(
			tabs(container).map((item) => item.getAttribute('type')),
			'a role="tab" div carries no type'
		).toEqual([null, null, null]);
	});

	it('wears the shared focus ring on each tab', async () => {
		const { container } = render(BoundTabs);
		const first = tabs(container)[0]!;
		first.focus();
		await userEvent.keyboard('{ArrowRight}');
		const focused = tabs(container).find((item) => item === document.activeElement)!;

		expect(getComputedStyle(focused).outlineStyle, 'the focused tab draws an outline').toBe(
			'solid'
		);
		expect(getComputedStyle(focused).outlineWidth).toBe('2px');
	});

	it('draws the shared focus ring on the panel reached by keyboard', async () => {
		const { container } = render(BoundTabs);
		tab(container, 'Overview').focus();

		await userEvent.keyboard('{Tab}');

		const focused = panels(container).find((panel) => panel === document.activeElement);
		expect(focused, 'Tab from the selected tab focuses the visible panel').toBeDefined();
		expect(getComputedStyle(focused!).outlineStyle, 'the focused panel draws an outline').toBe(
			'solid'
		);
		expect(getComputedStyle(focused!).outlineWidth).toBe('2px');
	});

	it('underlines the selected tab in a dark border and sets its text semibold', () => {
		const { container } = render(BoundTabs);
		const selected = tab(container, 'Overview');
		const idle = tab(container, 'Usage');

		expect(borderBottomColor(selected)).toBe(colorOf('border-gray-9', 'borderTopColor'));
		expect(borderBottomColor(idle)).toBe(colorOf('border-transparent', 'borderTopColor'));
		expect(getComputedStyle(selected).fontWeight).toBe('600');
		expect(getComputedStyle(idle).fontWeight).toBe('400');
	});

	it('two-way: clicking a tab selects it, shows its panel, and writes it to the owner', async () => {
		const { container } = render(BoundTabs);

		await userEvent.click(tab(container, 'Usage'));

		expect(selectedLabels(container)).toEqual(['Usage']);
		expect(visiblePanels(container)).toEqual(['Usage panel']);
		expect(owner(container)).toBe('usage');
	});

	it('two-way: setting the owner selects that tab', async () => {
		const { container } = render(BoundTabs);

		await userEvent.click(button(container, 'Select Usage'));

		expect(selectedLabels(container)).toEqual(['Usage']);
		expect(visiblePanels(container)).toEqual(['Usage panel']);
	});

	it('two-way: selects the first tab while the owner state stays undefined', () => {
		const { container } = render(UndefinedTabs);

		expect(selectedLabels(container)).toEqual(['Overview']);
		expect(visiblePanels(container)).toEqual(['Overview panel']);
		expect(owner(container)).toBe('undefined');
	});

	it('two-way: writes a clicked tab to owner state that started undefined', async () => {
		const { container } = render(UndefinedTabs);

		await userEvent.click(tab(container, 'Usage'));

		expect(owner(container)).toBe('usage');
	});

	it.each([
		{ accept: true, selected: 'Usage', panel: 'Usage panel', written: 'usage' },
		{ accept: false, selected: 'Overview', panel: 'Overview panel', written: 'overview' }
	])(
		'controlled: a function-binding setter that accepts is $accept selects $selected',
		async ({ accept, selected, panel, written }) => {
			const { container } = render(ControlledTabs, { props: { accept } });

			await userEvent.click(tab(container, 'Usage'));

			expect(selectedLabels(container)).toEqual([selected]);
			expect(visiblePanels(container)).toEqual([panel]);
			expect(owner(container)).toBe(written);
		}
	);

	it('falls back to the first tab when the selected tab is removed', async () => {
		const { container } = render(BoundTabs);
		await userEvent.click(tab(container, 'Usage'));
		expect(selectedLabels(container), 'Usage is selected before its removal').toEqual(['Usage']);

		await userEvent.click(button(container, 'Remove Usage'));

		expect(labels(container)).toEqual(['Overview', 'API']);
		expect(selectedLabels(container)).toEqual(['Overview']);
		expect(visiblePanels(container)).toEqual(['Overview panel']);
	});

	it('leaves the owner value as it was when the selected tab is removed', async () => {
		const { container } = render(BoundTabs);
		await userEvent.click(tab(container, 'Usage'));

		await userEvent.click(button(container, 'Remove Usage'));

		expect(owner(container)).toBe('usage');
	});

	it('keeps the selection when an unselected tab is removed', async () => {
		const { container } = render(BoundTabs);
		await userEvent.click(tab(container, 'Usage'));

		await userEvent.click(button(container, 'Remove API'));

		expect(labels(container)).toEqual(['Overview', 'Usage']);
		expect(selectedLabels(container)).toEqual(['Usage']);
		expect(visiblePanels(container)).toEqual(['Usage panel']);
	});

	it('renders the panel of a single tab whose list is hidden', () => {
		const { container } = render(SingleTab);

		expect(tablist(container)).toBeNull();
		expect(visiblePanels(container)).toEqual(['Overview panel']);
	});

	it.each([
		{ from: 'Overview', key: '{ArrowRight}', to: 'Usage' },
		{ from: 'Usage', key: '{ArrowLeft}', to: 'Overview' },
		{ from: 'Usage', key: '{Home}', to: 'Overview' },
		{ from: 'Usage', key: '{End}', to: 'API' }
	])('$key from $from moves focus to $to and selects it', async ({ from, key, to }) => {
		const { container } = render(BoundTabs);
		await userEvent.click(tab(container, from));

		await userEvent.keyboard(key);

		expect(document.activeElement).toBe(tab(container, to));
		expect(selectedLabels(container)).toEqual([to]);
		expect(visiblePanels(container)).toEqual([`${to} panel`]);
	});

	it('skips a disabled tab with the arrow keys', async () => {
		const { container } = render(BoundTabs, { props: { disabled: 'usage' } });
		await userEvent.click(tab(container, 'Overview'));

		await userEvent.keyboard('{ArrowRight}');

		expect(document.activeElement).toBe(tab(container, 'API'));
		expect(selectedLabels(container)).toEqual(['API']);
	});

	it('does not select a disabled tab when it is clicked', async () => {
		const { container } = render(BoundTabs, { props: { disabled: 'usage' } });

		tab(container, 'Usage').click();
		await tick();

		expect(selectedLabels(container)).toEqual(['Overview']);
		expect(owner(container)).toBe('overview');
	});

	it('paints a disabled tab in the disabled text color with a not-allowed cursor', () => {
		const { container } = render(BoundTabs, { props: { disabled: 'usage' } });

		const style = getComputedStyle(tab(container, 'Usage'));

		expect(style.color).toBe(colorOf('text-disabled-dark', 'color'));
		expect(style.cursor).toBe('not-allowed');
	});

	it('closable: closing an unselected tab removes it and keeps the selection', async () => {
		const { container } = render(ClosableTabs);
		await userEvent.click(tabLabel(container, 'API'));

		await userEvent.click(closeButton(container, 'Usage'));

		expect(labels(container)).toEqual(['Overview', 'API']);
		expect(selectedLabels(container)).toEqual(['API']);
		expect(owner(container)).toBe('api');
	});

	it('closable: Enter on a close button removes its tab and keeps the selection', async () => {
		const { container } = render(ClosableTabs);
		closeButton(container, 'Usage').focus();

		await userEvent.keyboard('{Enter}');

		expect(labels(container)).toEqual(['Overview', 'API']);
		expect(selectedLabels(container)).toEqual(['Overview']);
		expect(owner(container)).toBe('undefined');
	});

	it('closable: the tab is named by its label alone', async () => {
		render(ClosableTabs);

		await expect.element(page.getByRole('tab', { name: 'Overview', exact: true })).toBeVisible();
		await expect.element(page.getByRole('button', { name: 'Close Overview' })).toBeVisible();
	});

	it('closable: an aria-label on the tab keeps its name', async () => {
		render(LabelledActionTab);

		await expect.element(page.getByRole('tab', { name: 'Custom name', exact: true })).toBeVisible();
	});

	it('closable: a consumer aria-labelledby names the tab', async () => {
		render(LabelledActionTab, { props: { isLabelledByOutside: true } });

		await expect
			.element(page.getByRole('tab', { name: 'Outside name', exact: true }))
			.toBeVisible();
	});

	describe('file variant', () => {
		const transparent = colorOf('border-transparent', 'borderTopColor');
		const overflowingStrip = { variant: 'file' as const, extraTabCount: 12, width: '240px' };
		const subpixelTolerance = 1;
		const widthOfW40 = '160px';

		it.each([
			{ variant: 'file' as const, selectedBorder: transparent },
			{ variant: 'underline' as const, selectedBorder: colorOf('border-gray-9', 'borderTopColor') }
		])(
			'$variant: the selected tab paints its bottom border $selectedBorder',
			({ variant, selectedBorder }) => {
				const { container } = render(ClosableTabs, { props: { variant } });

				expect(borderBottomColor(tab(container, 'Overview'))).toBe(selectedBorder);
				expect(borderBottomColor(tab(container, 'Usage'))).not.toBe(selectedBorder);
			}
		);

		it('closing a tab from its close button does not select it', async () => {
			const { container } = render(ClosableTabs, { props: { variant: 'file' } });

			await userEvent.click(closeButton(container, 'Usage'));

			expect(labels(container)).toEqual(['Overview', 'API']);
			expect(selectedLabels(container)).toEqual(['Overview']);
		});

		it('keeps more tabs than fit on one scrolling row', () => {
			const { container } = render(ClosableTabs, {
				props: overflowingStrip
			});
			const list = tablist(container)!;

			expect(new Set(tabs(container).map((item) => item.offsetTop)).size).toBe(1);
			expect(list.scrollWidth).toBeGreaterThan(list.clientWidth);
		});

		it('scrolls an off-screen tab into the list when it is selected by binding', async () => {
			const { container } = render(ClosableTabs, {
				props: overflowingStrip
			});
			const list = tablist(container)!;
			expect(list.scrollLeft, 'the strip starts unscrolled').toBe(0);

			await userEvent.click(button(container, 'Select last'));

			const selected = tabs(container).find(
				(item) => item.getAttribute('aria-selected') === 'true'
			)!;
			expect(list.scrollLeft).toBeGreaterThan(0);
			expect(selected.getBoundingClientRect().right).toBeLessThanOrEqual(
				list.getBoundingClientRect().right + subpixelTolerance
			);
			expect(selected.getBoundingClientRect().left).toBeGreaterThanOrEqual(
				list.getBoundingClientRect().left - subpixelTolerance
			);
		});

		it('lets a consumer class set the trigger width', () => {
			const { container } = render(ClosableTabs, {
				props: { variant: 'file', triggerClass: 'w-40' }
			});

			expect(tabs(container).map((item) => getComputedStyle(item).width)).toEqual([
				widthOfW40,
				widthOfW40,
				widthOfW40
			]);
		});

		it('draws an inset outline on a tab focused by keyboard', async () => {
			const { container } = render(ClosableTabs, { props: { variant: 'file' } });
			await userEvent.click(tab(container, 'Overview'));

			await userEvent.keyboard('{ArrowRight}');

			const style = getComputedStyle(tab(container, 'Usage'));
			expect(document.activeElement).toBe(tab(container, 'Usage'));
			expect(style.outlineWidth).toBe('2px');
			expect(style.outlineOffset).toBe('-2px');
		});
	});
});
