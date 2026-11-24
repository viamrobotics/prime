import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import BoundTabs from './fixtures/BoundTabs.svelte';
import ClassedTabs from './fixtures/ClassedTabs.svelte';
import TabsHarness from './fixtures/TabsHarness.svelte';

const tab = (name: string) => page.getByRole('tab', { name, exact: true });
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')!.textContent;
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

describe('Tabs', () => {
	it('names the tablist from its aria-label', async () => {
		render(TabsHarness);

		await expect.element(page.getByRole('tablist', { name: 'Mode' })).toBeInTheDocument();
	});

	it.each(['Move', 'Rotate', 'Scale'])('names the %s tab from its text', async (name) => {
		render(TabsHarness);

		await expect.element(tab(name)).toBeInTheDocument();
	});

	it('selects the first tab and shows its content', async () => {
		render(TabsHarness);

		await expect.element(tab('Move')).toHaveAttribute('aria-selected', 'true');
		await expect.element(tab('Rotate')).toHaveAttribute('aria-selected', 'false');
		await expect.element(page.getByText('Move controls')).toBeVisible();
		await expect.element(page.getByText('Rotate controls')).not.toBeVisible();
	});

	it('selects a clicked tab and swaps the content', async () => {
		render(TabsHarness);

		await tab('Rotate').click();

		await expect.element(tab('Rotate')).toHaveAttribute('aria-selected', 'true');
		await expect.element(tab('Move')).toHaveAttribute('aria-selected', 'false');
		await expect.element(page.getByText('Rotate controls')).toBeVisible();
		await expect.element(page.getByText('Move controls')).not.toBeVisible();
	});

	it('moves focus to the next tab with ArrowRight', async () => {
		render(TabsHarness);
		(tab('Move').element() as HTMLElement).focus();

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(tab('Rotate')).toHaveFocus();
	});

	it('selects the focused tab with Enter', async () => {
		render(TabsHarness);
		(tab('Move').element() as HTMLElement).focus();
		await userEvent.keyboard('{ArrowRight}');

		await userEvent.keyboard('{Enter}');

		await expect.element(tab('Rotate')).toHaveAttribute('aria-selected', 'true');
		await expect.element(page.getByText('Rotate controls')).toBeVisible();
	});

	it('writes the clicked tab to bind:value', async () => {
		const { container } = render(BoundTabs, { props: { initial: 'move' } });

		await tab('Rotate').click();

		expect(owner(container)).toBe('rotate');
	});

	it('selects the tab the parent sets through the value', async () => {
		const { container } = render(BoundTabs, { props: { initial: 'move' } });

		await page.getByRole('button', { name: 'Pick scale' }).click();

		await expect.element(tab('Scale')).toHaveAttribute('aria-selected', 'true');
		await expect.element(page.getByText('Scale controls')).toBeVisible();
		expect(owner(container)).toBe('scale');
	});

	it.each([
		{ part: 'root', selector: ':has(> [role="tablist"])', marker: 'root-extra' },
		{ part: 'list', selector: '[role="tablist"]', marker: 'list-extra' },
		{ part: 'trigger', selector: '[role="tab"]', marker: 'trigger-extra' },
		{ part: 'content', selector: '[role="tabpanel"]', marker: 'content-extra' }
	])('puts the class prop on the $part element', ({ selector, marker }) => {
		const { container } = render(ClassedTabs);

		const element = container.querySelector(selector)!;

		expect(element.classList.contains(marker), `${selector} carries ${marker}`).toBe(true);
	});
});

describe('Tabs panel scale', () => {
	it('sets trigger text to text-xs', () => {
		render(TabsHarness);

		const trigger = getComputedStyle(tab('Move').element());

		expect(trigger.fontSize).toBe(resolvedFontSize(rootProperty('--text-xs')));
		expect(trigger.fontSize).not.toBe(resolvedFontSize(rootProperty('--text-sm')));
	});

	it('sets a trigger minimum height of 24px', () => {
		render(TabsHarness);

		const trigger = getComputedStyle(tab('Move').element());

		expect(trigger.minHeight).toBe('24px');
	});

	it('sets trigger padding to 4px above and 2px below, tighter than prime-ui', () => {
		render(TabsHarness);

		const trigger = getComputedStyle(tab('Move').element());

		expect(trigger.paddingTop).toBe('4px');
		expect(trigger.paddingBottom).toBe('2px');
	});

	it('sets the gap between triggers to 8px, tighter than prime-ui', () => {
		render(TabsHarness);

		const list = getComputedStyle(page.getByRole('tablist').element());

		expect(list.columnGap).toBe('8px');
	});

	it('stacks the root as a column with a 4px gap', () => {
		const { container } = render(TabsHarness);

		const root = getComputedStyle(container.querySelector(':has(> [role="tablist"])')!);

		expect(root.flexDirection).toBe('column');
		expect(root.rowGap).toBe('4px');
	});

	it('stacks the content as a column with a 4px gap', () => {
		render(TabsHarness);

		const content = getComputedStyle(page.getByRole('tabpanel').element());

		expect(content.flexDirection).toBe('column');
		expect(content.rowGap).toBe('4px');
	});
});
