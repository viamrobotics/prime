import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import BoundTabs from './BoundTabs.svelte';
import TabsHarness from './TabsHarness.svelte';

const tab = (name: string) => page.getByRole('tab', { name, exact: true });
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')!.textContent;
const rootProperty = (name: string) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim();

describe('Tabs', () => {
	it('names the tablist from its aria-label', async () => {
		render(TabsHarness);

		await expect.element(page.getByRole('tablist', { name: 'Mode' })).toBeInTheDocument();
	});

	it('names each tab from its text', async () => {
		render(TabsHarness);

		for (const name of ['Move', 'Rotate', 'Scale']) {
			await expect.element(tab(name)).toBeInTheDocument();
		}
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

	it('moves to the next tab with ArrowRight and selects it', async () => {
		render(TabsHarness);

		(tab('Move').element() as HTMLElement).focus();
		await userEvent.keyboard('{ArrowRight}');
		await expect.element(tab('Rotate')).toHaveFocus();

		await userEvent.keyboard('{Enter}');
		await expect.element(tab('Rotate')).toHaveAttribute('aria-selected', 'true');
		await expect.element(page.getByText('Rotate controls')).toBeVisible();
	});

	it('reads the selection through bind:value', async () => {
		const { container } = render(BoundTabs, { props: { initial: 'move' } });

		await tab('Rotate').click();

		expect(owner(container)).toBe('rotate');
	});

	it('drives the strip when the parent sets the value', async () => {
		const { container } = render(BoundTabs, { props: { initial: 'move' } });

		await page.getByRole('button', { name: 'Pick scale' }).click();

		await expect.element(tab('Scale')).toHaveAttribute('aria-selected', 'true');
		await expect.element(page.getByText('Scale controls')).toBeVisible();
		expect(owner(container)).toBe('scale');
	});

	it('sizes triggers to the panel scale', () => {
		render(TabsHarness);

		const trigger = getComputedStyle(tab('Move').element());
		const extraSmall = rootProperty('--text-xs');
		const small = rootProperty('--text-sm');
		const probe = (size: string) => {
			const node = document.createElement('span');
			node.style.fontSize = size;
			document.body.append(node);
			const resolved = getComputedStyle(node).fontSize;
			node.remove();
			return resolved;
		};

		expect(trigger.fontSize).toBe(probe(extraSmall));
		expect(trigger.fontSize).not.toBe(probe(small));
	});

	it('keeps a hit target of at least min-h-6', () => {
		render(TabsHarness);

		const probe = document.createElement('div');
		probe.style.height = 'calc(var(--spacing) * 6)';
		document.body.append(probe);
		const minimum = probe.getBoundingClientRect().height;
		probe.remove();

		expect(tab('Move').element().getBoundingClientRect().height).toBeGreaterThanOrEqual(minimum);
	});

	it('tightens trigger padding below prime-ui', () => {
		render(TabsHarness);

		const spacing = parseFloat(rootProperty('--spacing'));
		const unit = parseFloat(getComputedStyle(document.documentElement).fontSize);
		const pixelsPerStep = rootProperty('--spacing').endsWith('rem') ? spacing * unit : spacing;
		const trigger = getComputedStyle(tab('Move').element());

		expect(parseFloat(trigger.paddingTop)).toBe(pixelsPerStep * 1);
		expect(parseFloat(trigger.paddingBottom)).toBe(pixelsPerStep * 0.5);
	});

	it('tightens the gap between triggers below prime-ui', () => {
		render(TabsHarness);

		const probe = document.createElement('div');
		probe.style.width = 'calc(var(--spacing) * 2)';
		document.body.append(probe);
		const expected = getComputedStyle(probe).width;
		probe.remove();

		const list = getComputedStyle(page.getByRole('tablist').element());
		expect(list.columnGap).toBe(expected);
	});
});
