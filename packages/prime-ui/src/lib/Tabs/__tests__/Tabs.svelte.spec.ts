import { tick } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { colorOf } from '../../../../test/computed-style.ts';
import BoundTabs from './fixtures/BoundTabs.svelte';
import ClosableTabs from './fixtures/ClosableTabs.svelte';
import ControlledTabs from './fixtures/ControlledTabs.svelte';
import LabelledActionTab from './fixtures/LabelledActionTab.svelte';
import RebuiltTabs from './fixtures/RebuiltTabs.svelte';
import SingleTab from './fixtures/SingleTab.svelte';
import UndefinedTabs from './fixtures/UndefinedTabs.svelte';

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
const writes = (container: Element) =>
	container.querySelector('[data-testid="writes"]')?.textContent;
const sections = (...ids: string[]) =>
	ids.map((id) => ({ id, label: id[0]!.toUpperCase() + id.slice(1) }));
const button = (container: Element, name: string) =>
	[...container.querySelectorAll('button')].find((item) => item.textContent?.trim() === name)!;
const closeButton = (container: Element, label: string) =>
	tab(container, label).querySelector<HTMLButtonElement>('[data-tab-close]')!;
const closeByPointer = async (container: Element, label: string) => {
	await userEvent.hover(tab(container, label));
	await userEvent.click(closeButton(container, label));
};
const statusOf = (container: Element, label: string) =>
	document.getElementById(tab(container, label).getAttribute('aria-describedby') ?? '')!;
const visibility = (element: Element) => getComputedStyle(element).visibility;
const moveOffStrip = (container: Element) => userEvent.hover(button(container, 'Select last'));
const order = (container: Element) => container.querySelector('[data-testid="order"]')?.textContent;
const announcement = (container: Element) =>
	container.querySelector('[role="status"]')?.textContent;
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

	it('falls back to the leftmost tab, not the first mounted, when the selected tab is removed', async () => {
		const { container } = render(BoundTabs);
		await userEvent.click(tab(container, 'API'));
		await userEvent.click(button(container, 'Add Intro'));
		expect(labels(container), 'Intro mounts last but sits first').toEqual([
			'Intro',
			'Overview',
			'Usage',
			'API'
		]);

		await userEvent.click(button(container, 'Remove API'));

		expect(selectedLabels(container)).toEqual(['Intro']);
		expect(visiblePanels(container)).toEqual(['Intro panel']);
	});

	it('selects the first tab when the bound value never named a tab, and leaves the owner value', () => {
		const { container } = render(BoundTabs, { props: { initial: 'missing' } });

		expect(selectedLabels(container)).toEqual(['Overview']);
		expect(visiblePanels(container)).toEqual(['Overview panel']);
		expect(owner(container)).toBe('missing');
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

	it('keeps the selection when the tab list is rebuilt from fresh objects with the same ids', async () => {
		const ids = ['details', 'appearance', 'pov'];
		const { container, rerender } = render(RebuiltTabs, {
			props: { tabs: sections(...ids), initial: 'appearance' }
		});

		await rerender({ tabs: sections(...ids) });
		expect(selectedLabels(container)).toEqual(['Appearance']);
		await rerender({ tabs: sections(...ids) });
		await tick();

		expect(selectedLabels(container)).toEqual(['Appearance']);
		expect(visiblePanels(container)).toEqual(['Appearance panel']);
		expect(owner(container)).toBe('appearance');
		expect(writes(container), 'the bound value is never written').toBe('0');
	});

	it('keeps the selection when a rebuilt list adds and removes other tabs', async () => {
		const { container, rerender } = render(RebuiltTabs, {
			props: { tabs: sections('details', 'appearance', 'pov'), initial: 'appearance' }
		});

		await rerender({ tabs: sections('intro', 'details', 'appearance', 'pov') });
		expect(selectedLabels(container)).toEqual(['Appearance']);
		await rerender({ tabs: sections('intro', 'appearance', 'pov') });
		await tick();

		expect(labels(container)).toEqual(['Intro', 'Appearance', 'Pov']);
		expect(selectedLabels(container)).toEqual(['Appearance']);
		expect(visiblePanels(container)).toEqual(['Appearance panel']);
		expect(writes(container)).toBe('0');
	});

	it('keeps the selection when every tab remounts with the same ids', async () => {
		const ids = ['details', 'appearance', 'pov'];
		const { container, rerender } = render(RebuiltTabs, {
			props: { tabs: sections(...ids), initial: 'appearance', remount: true }
		});

		await rerender({ tabs: sections(...ids) });
		expect(selectedLabels(container)).toEqual(['Appearance']);
		await tick();

		expect(selectedLabels(container)).toEqual(['Appearance']);
		expect(visiblePanels(container)).toEqual(['Appearance panel']);
		expect(writes(container)).toBe('0');
	});

	it('falls back to the leftmost tab when a rebuilt list drops the selected tab', async () => {
		const { container, rerender } = render(RebuiltTabs, {
			props: { tabs: sections('details', 'appearance', 'pov'), initial: 'appearance' }
		});

		await rerender({ tabs: sections('details', 'pov') });
		await tick();

		expect(selectedLabels(container)).toEqual(['Details']);
		expect(visiblePanels(container)).toEqual(['Details panel']);
		expect(owner(container), 'the fallback is computed, not written').toBe('appearance');
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

		await closeByPointer(container, 'Usage');

		expect(labels(container)).toEqual(['Overview', 'API']);
		expect(selectedLabels(container)).toEqual(['API']);
		expect(owner(container)).toBe('api');
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

	describe('closable', () => {
		const KEYSHORTCUTS = 'Delete Alt+Shift+ArrowLeft Alt+Shift+ArrowRight';

		it('shows the selected tab close button and hides the others in a space they keep', async () => {
			const { container } = render(ClosableTabs);
			await moveOffStrip(container);
			const selected = closeButton(container, 'Overview');
			const idle = closeButton(container, 'Usage');

			expect([visibility(selected), visibility(idle)]).toEqual(['visible', 'hidden']);
			expect(idle.getBoundingClientRect().width).toBe(selected.getBoundingClientRect().width);
			expect(idle.getBoundingClientRect().width).toBeGreaterThan(0);
		});

		it('shows an unselected tab close button while the tab is hovered', async () => {
			const { container } = render(ClosableTabs);

			await userEvent.hover(tab(container, 'Usage'));

			expect(visibility(closeButton(container, 'Usage'))).toBe('visible');
		});

		it('keeps every close button out of the Tab order', async () => {
			const { container } = render(ClosableTabs);
			await userEvent.click(tabLabel(container, 'Overview'));

			await userEvent.keyboard('{Tab}');

			expect(
				[...container.querySelectorAll<HTMLButtonElement>('[data-tab-close]')].map(
					(close) => close.tabIndex
				)
			).toEqual([-1, -1, -1]);
			expect(panels(container).find((panel) => panel === document.activeElement)).toBeDefined();
		});

		it('keeps a consumer action in the Tab order', async () => {
			const { container } = render(ClosableTabs, { props: { hasMenu: true } });
			await userEvent.click(tabLabel(container, 'Overview'));

			await userEvent.keyboard('{Tab}');

			expect(document.activeElement?.getAttribute('aria-label')).toBe('Options for Overview');
		});

		it('fills an unselected tab close space with its status until the tab is hovered', async () => {
			const { container } = render(ClosableTabs, { props: { statusTab: 'usage' } });
			await moveOffStrip(container);
			expect(
				[visibility(statusOf(container, 'Usage')), visibility(closeButton(container, 'Usage'))],
				'[status, close] before the hover'
			).toEqual(['visible', 'hidden']);

			await userEvent.hover(tab(container, 'Usage'));

			expect(
				[visibility(statusOf(container, 'Usage')), visibility(closeButton(container, 'Usage'))],
				'[status, close] on hover'
			).toEqual(['hidden', 'visible']);
		});

		it('hides the selected tab status behind its close button', () => {
			const { container } = render(ClosableTabs, { props: { statusTab: 'overview' } });

			expect(visibility(statusOf(container, 'Overview'))).toBe('hidden');
			expect(visibility(closeButton(container, 'Overview'))).toBe('visible');
		});

		it('describes a tab by its status', async () => {
			render(ClosableTabs, { props: { statusTab: 'usage' } });

			await expect
				.element(page.getByRole('tab', { name: 'Usage', exact: true }))
				.toHaveAccessibleDescription('Unsaved');
		});

		it('Delete closes the focused tab, focuses the tab selected in its place, and announces', async () => {
			const { container } = render(ClosableTabs);
			await userEvent.click(tabLabel(container, 'Usage'));

			await userEvent.keyboard('{Delete}');

			expect(order(container)).toBe('overview,api');
			expect(labels(container)).toEqual(['Overview', 'API']);
			expect(selectedLabels(container)).toEqual(['Overview']);
			await expect.poll(() => document.activeElement).toBe(tab(container, 'Overview'));
			await expect.poll(() => announcement(container)).toBe('Usage closed.');
		});

		it('Delete closes nothing on a list that is not closable', async () => {
			const { container } = render(BoundTabs);
			await userEvent.click(tab(container, 'Usage'));

			await userEvent.keyboard('{Delete}');

			expect(labels(container)).toEqual(['Overview', 'Usage', 'API']);
		});

		it('keeps the tab when a function binding refuses the close', async () => {
			const { container } = render(ClosableTabs, { props: { isRefusing: true } });
			await userEvent.click(tabLabel(container, 'Usage'));

			await userEvent.keyboard('{Delete}');
			await tick();

			expect(labels(container)).toEqual(['Overview', 'Usage', 'API']);
			expect(document.activeElement).toBe(tab(container, 'Usage'));
			expect(announcement(container)).toBe('');
		});

		it('gives a disabled tab no close button and ignores Delete on it', async () => {
			const { container } = render(ClosableTabs, { props: { disabledTab: 'usage' } });
			tab(container, 'Usage').focus();

			await userEvent.keyboard('{Delete}');

			expect(closeButton(container, 'Usage')).toBeNull();
			expect(labels(container)).toEqual(['Overview', 'Usage', 'API']);
		});

		it.each([
			{ reorderable: false, shortcuts: ['Delete', null, 'Delete'] },
			{ reorderable: true, shortcuts: [KEYSHORTCUTS, null, KEYSHORTCUTS] }
		])(
			'lists Delete in aria-keyshortcuts with reorderable $reorderable',
			({ reorderable, shortcuts }) => {
				const { container } = render(ClosableTabs, {
					props: { reorderable, disabledTab: 'usage' }
				});

				expect(tabs(container).map((item) => item.getAttribute('aria-keyshortcuts'))).toEqual(
					shortcuts
				);
			}
		);
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

			await closeByPointer(container, 'Usage');

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
