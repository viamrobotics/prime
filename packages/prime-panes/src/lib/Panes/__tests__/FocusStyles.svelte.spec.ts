import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { floatIds, ids } from '../../../../test/layouts.ts';
import BoundPanes from '../../../../test/fixtures/BoundPanes.svelte';
import ControlledPanes from '../../../../test/fixtures/ControlledPanes.svelte';
import FloatingPanes from '../../../../test/fixtures/FloatingPanes.svelte';
import PanePartsPanes from '../../../../test/fixtures/PanePartsPanes.svelte';
import StackPanes from '../../../../test/fixtures/StackPanes.svelte';

const LINK = 'rgb(0, 102, 204)';
const RING = { outlineStyle: 'solid', outlineWidth: '2px', outlineColor: LINK } as const;
const OUTSET_RING = { ...RING, outlineOffset: '2px' } as const;
const INSET_RING = { ...RING, outlineOffset: '-2px' } as const;
const RADIUS_SM = '4px';

const button = (name: string) => page.getByRole('button', { name, exact: true });
const tab = (name: string) => page.getByRole('tab', { name, exact: true });
const separator = () => page.getByRole('separator').first();
const timeSeriesPreview = () =>
	page.getByRole('group', { name: 'Move Camera to Time series', exact: true }).getByMovePreview();
const computed = (element: Element | null | undefined) => getComputedStyle(element!);

const startMoveWithKeyboard = async () => {
	button('Move Camera').element().focus();
	await userEvent.keyboard('{Enter}');
	await expect.element(page.getByMovingPane()).toHaveFocus();
};

describe('Panes.TabList styling', () => {
	it('lays the tabs out in a scrolling strip', async () => {
		render(StackPanes);

		await expect.element(page.getByRole('tablist').first()).toHaveStyle({ overflowX: 'auto' });
	});

	it('draws a 2px link-colored ring on a tab the arrow keys reach', async () => {
		render(StackPanes);
		tab('Camera A').element().focus();

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(tab('Camera B')).toHaveFocus();
		await expect.element(tab('Camera B')).toHaveStyle(RING);
	});
});

describe('focus rings inside a pane edge', () => {
	it('draws the ring inside the pane wrapper that takes focus after Escape', async () => {
		render(PanePartsPanes, { variant: 'menu' });
		await userEvent.click(button('Menu for Camera'));
		await userEvent.click(page.getByRole('menuitem', { name: 'Move Camera', exact: true }));

		await userEvent.keyboard('{Escape}');

		await expect.element(page.getByPane(ids.mycam)).toHaveFocus();
		await expect.element(page.getByPane(ids.mycam)).toHaveStyle(INSET_RING);
	});

	it('draws the ring inside a float window that Shift+Tab reaches', async () => {
		render(FloatingPanes);
		await userEvent.click(page.getByPaneContent(floatIds.paneA));

		await userEvent.tab({ shift: true });

		await expect.element(page.getByFloatEntry(floatIds.entryA)).toHaveFocus();
		await expect.element(page.getByFloatEntry(floatIds.entryA)).toHaveStyle(INSET_RING);
	});

	it('draws the ring inside a swap button that Tab reaches', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard();

		await userEvent.keyboard('{Tab}{Tab}');

		const swap = button('Swap Camera with Time series');
		await expect.element(swap).toHaveFocus();
		await expect.element(swap).toHaveStyle(INSET_RING);
	});
});

describe('focus rings outside a control', () => {
	it('draws the ring 2px outside the Float button that Shift+Tab reaches', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard();

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

		await expect.element(button('Float Camera')).toHaveFocus();
		await expect.element(button('Float Camera')).toHaveStyle(OUTSET_RING);
	});

	it('draws the ring 2px outside a split trigger that Tab reaches', async () => {
		render(BoundPanes);
		await userEvent.click(button('Set root to 70%'));

		await userEvent.tab();

		await expect.element(separator()).toHaveFocus();
		await expect.element(separator()).toHaveStyle(OUTSET_RING);
	});
});

describe('move-mode labels', () => {
	it('rounds the moving notice', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard();

		await expect.element(page.getByMovingNotice()).toBeInTheDocument();
		const notice = page.getByMovingNotice().element().firstElementChild;
		expect(computed(notice).borderRadius).toBe(RADIUS_SM);
	});

	it('rounds the label of the move preview', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard();
		await userEvent.keyboard('{Tab}{Tab}');

		await expect.element(timeSeriesPreview()).toBeInTheDocument();
		const label = timeSeriesPreview().element().firstElementChild;
		expect(computed(label).borderRadius).toBe(RADIUS_SM);
	});
});

describe('stacking contexts', () => {
	it('isolates the pane frame', async () => {
		render(BoundPanes);
		await expect.element(page.getByPane(ids.mycam)).toBeInTheDocument();

		const frame = page.getByPane(ids.mycam).element().parentElement;
		expect(computed(frame).isolation).toBe('isolate');
	});

	it('isolates the split root', async () => {
		render(BoundPanes);
		await expect.element(separator()).toBeInTheDocument();

		const root = separator().element().parentElement;
		expect(computed(root).isolation).toBe('isolate');
	});
});
