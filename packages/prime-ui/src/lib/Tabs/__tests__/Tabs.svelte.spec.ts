import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { colorOf } from '../../__tests__/computed-style.ts';
import BoundTabs from './BoundTabs.svelte';
import ClosableTabs from './ClosableTabs.svelte';
import ControlledTabs from './ControlledTabs.svelte';
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
		expect(tabs(container).map((item) => item.hasAttribute('type'))).toEqual([false, false, false]);
		expect(panels(container)).toHaveLength(3);
		expect(visiblePanels(container)).toEqual(['Overview panel']);
	});

	it('wears the shared focus ring on each tab', () => {
		const { container } = render(BoundTabs);

		expect(tabs(container).map((item) => item.classList.contains('focus-ring'))).toEqual([
			true,
			true,
			true
		]);
	});

	it('underlines the selected tab in a dark border and sets its text semibold', () => {
		const { container } = render(BoundTabs);
		const selected = tab(container, 'Overview');
		const idle = tab(container, 'Usage');

		expect(borderBottomColor(selected)).toBe(colorOf('border-gray-9', 'borderTopColor'));
		expect(borderBottomColor(idle)).toBe(colorOf('border-transparent', 'borderTopColor'));
		expect(borderBottomColor(selected)).not.toBe(borderBottomColor(idle));
		expect(getComputedStyle(selected).fontWeight).toBe('600');
		expect(getComputedStyle(idle).fontWeight).not.toBe('600');
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

	it('two-way: selects the first tab from undefined state and writes the clicked tab', async () => {
		const { container } = render(UndefinedTabs);

		expect(selectedLabels(container)).toEqual(['Overview']);
		expect(visiblePanels(container)).toEqual(['Overview panel']);
		expect(owner(container)).toBe('undefined');

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
		expect(selectedLabels(container)).toEqual(['Usage']);

		await userEvent.click(button(container, 'Remove Usage'));

		expect(labels(container)).toEqual(['Overview', 'API']);
		expect(selectedLabels(container)).toEqual(['Overview']);
		expect(visiblePanels(container)).toEqual(['Overview panel']);
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

	it('does not select a disabled tab when it is clicked, and paints it disabled', () => {
		const { container } = render(BoundTabs, { props: { disabled: 'usage' } });
		const disabled = tab(container, 'Usage');

		disabled.click();

		expect(selectedLabels(container)).toEqual(['Overview']);
		expect(owner(container)).toBe('overview');
		expect(getComputedStyle(disabled).color).toBe(colorOf('text-disabled-dark', 'color'));
		expect(getComputedStyle(disabled).cursor).toBe('not-allowed');
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
});
