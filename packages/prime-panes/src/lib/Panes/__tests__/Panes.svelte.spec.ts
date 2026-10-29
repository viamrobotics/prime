import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import BoundPanes from '../../../../test/fixtures/BoundPanes.svelte';
import ControlledPanes from '../../../../test/fixtures/ControlledPanes.svelte';

import type { LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../../../test/layouts.ts';

type Received = (LayoutNode<PaneData> | undefined)[];

const FRAME_HEIGHT = 600;
const TRIGGER_HIT_AREA_PX = 8;
const TRIGGER_CENTER_PX = TRIGGER_HIT_AREA_PX / 2;
const DRAG_DISTANCE_PX = 100;
const RIGHT = { x: '90%', y: '50%' } as const;

const separator = (index = 0) => page.getByRole('separator').nth(index);
const setRootTo70 = () => page.getByRole('button', { name: 'Set root to 70%' });
const owner = () => page.getByTestId('owner').element().textContent;
const panelsOf = (index = 0) =>
	separator(index)
		.element()
		.getAttribute('aria-controls')!
		.split(' ')
		.map((id) => document.getElementById(id)!);
const rootFirstPanelShare = () => panelsOf()[0]!.getBoundingClientRect().height / FRAME_HEIGHT;
const ratioOf = (node: LayoutNode<PaneData> | undefined) =>
	node?.type === 'split' ? node.ratio : undefined;
const nextFrames = () =>
	new Promise<void>((resolve) =>
		requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
	);

const dragRootSeparatorDown = async () => {
	await commands.mouseMove(separator().selector);
	await commands.mouseDown();
	await commands.mouseMove(separator().selector, {
		x: 100,
		y: TRIGGER_CENTER_PX + DRAG_DISTANCE_PX
	});
};

describe('Panes rendering', () => {
	it('renders one pane per leaf, each given its node', async () => {
		render(BoundPanes);

		await expect.element(page.getByRole('region').first()).toBeVisible();
		const panes = page.getByRole('region').elements();
		expect(panes.map((pane) => pane.getAttribute('data-pane-id'))).toEqual([
			'mycam',
			'mytimeseries',
			'mysensor',
			'mycam2'
		]);
		expect(panes.map((pane) => pane.textContent?.trim())).toEqual([
			'Camera',
			'Time series',
			'Sensor stat',
			'Camera 2'
		]);
	});

	it('names every separator', async () => {
		render(BoundPanes);

		await expect
			.poll(() => page.getByRole('separator', { name: 'Resize panes' }).elements())
			.toHaveLength(3);
	});

	it.each([
		{ split: 'root column', index: 0, orientation: 'horizontal' },
		{ split: 'inner row', index: 1, orientation: 'vertical' }
	])('orients the $split separator $orientation', async ({ index, orientation }) => {
		render(BoundPanes);

		await expect.element(separator(index)).toHaveAttribute('aria-orientation', orientation);
	});

	it("sizes the root split's first panel from ratio", async () => {
		render(BoundPanes);

		await expect.poll(rootFirstPanelShare).toBeCloseTo(0.3, 2);
	});

	it('gives the root split second panel the remaining height', async () => {
		render(BoundPanes);
		const [first, second] = panelsOf();

		await expect.poll(rootFirstPanelShare).toBeCloseTo(0.3, 2);
		expect(
			first!.getBoundingClientRect().height + second!.getBoundingClientRect().height,
			'panels meet edge to edge'
		).toBeCloseTo(FRAME_HEIGHT, 0);
	});

	it('gives every pane a distinct id across two views of the same data', async () => {
		render(BoundPanes);
		render(BoundPanes);

		await expect.element(separator(5)).toBeVisible();
		const claimed = page
			.getByRole('separator')
			.elements()
			.flatMap((element) => [element.id, ...element.getAttribute('aria-controls')!.split(' ')]);
		expect(claimed).toHaveLength(18);
		expect(new Set(claimed).size).toBe(claimed.length);
	});
});

describe('Panes resize trigger', () => {
	it('is an 8px hit area centered on the boundary that takes no layout space', async () => {
		render(BoundPanes);
		await expect.element(separator()).toBeVisible();
		const trigger = separator().element();
		const [first, second] = panelsOf();

		const boundary = first!.getBoundingClientRect().bottom;
		expect(second!.getBoundingClientRect().top, 'panels meet').toBeCloseTo(boundary, 0);
		expect(trigger.getBoundingClientRect().height).toBe(TRIGGER_HIT_AREA_PX);
		expect(trigger.getBoundingClientRect().top + TRIGGER_CENTER_PX).toBeCloseTo(boundary, 0);
	});

	it('sits above both panels', async () => {
		render(BoundPanes);
		await expect.element(separator()).toBeVisible();
		const trigger = separator().element();
		const boundary = panelsOf()[0]!.getBoundingClientRect().bottom;
		const x = trigger.getBoundingClientRect().left + 100;

		expect(document.elementFromPoint(x, boundary - 2)).toBe(trigger);
		expect(document.elementFromPoint(x, boundary + 2)).toBe(trigger);
	});

	it('shows a 2px info-dark outline on keyboard focus', async () => {
		render(BoundPanes);
		await userEvent.click(setRootTo70());
		await userEvent.tab();

		await expect.element(separator()).toHaveFocus();
		await expect.element(separator()).toHaveStyle({ outlineStyle: 'solid', outlineWidth: '2px' });
	});
});

describe('Panes resize writeback', () => {
	it('writes an accepted keyboard resize back to the owner', async () => {
		render(ControlledPanes, { accept: true });

		separator().element().focus();
		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => Number(owner())).toBeCloseTo(0.31, 2);
		await expect.poll(rootFirstPanelShare).toBeCloseTo(0.31, 2);
	});

	it('keeps a deep $state owner in sync with a keyboard resize and does not snap back', async () => {
		render(BoundPanes);

		separator().element().focus();
		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => Number(owner())).toBeCloseTo(0.31, 2);
		await expect.poll(rootFirstPanelShare).toBeCloseTo(0.31, 2);
	});

	it('snaps the panel back when the setter rejects the resize', async () => {
		const received: Received = [];
		render(ControlledPanes, { accept: false, received });
		await nextFrames();

		separator().element().focus();
		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => received.length).toBe(1);
		expect(ratioOf(received[0])).not.toBe(0.3);
		expect(owner()).toBe('0.3');
		await expect.poll(rootFirstPanelShare).toBeCloseTo(0.3, 2);
	});

	it('moves the panel with the pointer during a drag', async () => {
		render(ControlledPanes, { accept: true });

		await dragRootSeparatorDown();

		await expect.element(separator()).toHaveAttribute('data-dragging');
		await expect.poll(rootFirstPanelShare).toBeCloseTo(0.4667, 2);
		await commands.mouseUp();
	});

	it('writes the dragged size back on release', async () => {
		const received: Received = [];
		render(ControlledPanes, { accept: true, received });

		await dragRootSeparatorDown();
		await commands.mouseUp();

		await expect.poll(() => received.length).toBe(1);
		expect(ratioOf(received[0])).toBeCloseTo(0.4667, 2);
	});

	it('does not write when the separator is clicked without moving', async () => {
		const received: Received = [];
		render(ControlledPanes, { accept: true, received, initialRatio: 0.104 });

		await userEvent.click(separator());

		expect(received).toEqual([]);
		expect(owner()).toBe('0.104');
	});

	it('does not write a size from before an external change when clicked without moving', async () => {
		const received: Received = [];
		render(ControlledPanes, { accept: true, received });
		separator().element().focus();
		await userEvent.keyboard('{ArrowDown}');
		await expect.poll(() => received.length).toBe(1);

		await userEvent.click(setRootTo70());
		await expect.poll(rootFirstPanelShare).toBeCloseTo(0.7, 2);
		await userEvent.click(separator());

		expect(received).toHaveLength(1);
		expect(owner()).toBe('0.7');
	});

	it('places a pane through a deep $state owner, which stores a proxy rather than the result', async () => {
		render(BoundPanes, { handles: true });
		await userEvent.click(page.getByRole('button', { name: 'Move Camera', exact: true }));

		const destination = page.getByRole('group', {
			name: 'Move Camera to Time series',
			exact: true
		});
		await commands.mouseMove(destination.selector, RIGHT);
		await commands.mouseDown();
		await commands.mouseUp();

		await expect
			.element(page.getByRole('status'))
			.toHaveTextContent('Camera placed right of Time series.');
	});
});

describe('Panes external sync', () => {
	it('follows a layout the owner assigns from outside', async () => {
		render(BoundPanes);

		await userEvent.click(setRootTo70());

		await expect.poll(owner).toBe('0.7');
		await expect.poll(rootFirstPanelShare).toBeCloseTo(0.7, 2);
	});
});
