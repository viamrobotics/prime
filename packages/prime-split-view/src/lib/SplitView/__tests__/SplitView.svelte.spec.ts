import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { ids, layoutRoot } from '../../__tests__/layout-fixture.ts';
import { setSplitRatio } from '../../tree.ts';
import BoundSplitView from './BoundSplitView.svelte';
import ControlledSplitView from './ControlledSplitView.svelte';
import StaticSplitView from './StaticSplitView.svelte';

import type { LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../__tests__/layout-fixture.ts';
import type { UpdateProbe } from './update-probe.ts';

const FRAME_HEIGHT = 600;
const TRIGGER_HIT_AREA_PX = 8;
const TRIGGER_CENTER_PX = TRIGGER_HIT_AREA_PX / 2;
const DRAG_DISTANCE_PX = 100;
const RESIZE_HANDLE_LABEL = 'Resize panes';

const separators = (container: Element) => [
	...container.querySelectorAll<HTMLElement>('[role="separator"]')
];
const rootSeparator = (container: Element) => separators(container)[0]!;
const panelsOf = (separator: HTMLElement) =>
	separator
		.getAttribute('aria-controls')!
		.split(' ')
		.map((id) => document.getElementById(id)!);
const rootFirstPanel = (container: Element) => panelsOf(rootSeparator(container))[0]!;
const rootFirstPanelShare = (container: Element) =>
	rootFirstPanel(container).getBoundingClientRect().height / FRAME_HEIGHT;
const paneIds = (container: Element) =>
	[...container.querySelectorAll<HTMLElement>('[data-testid="pane"]')].map(
		(pane) => pane.dataset.paneId
	);
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const paneLabels = (container: Element) =>
	[...container.querySelectorAll('[data-testid="pane"]')].map((pane) => pane.textContent);
const ratioOf = (node: LayoutNode<PaneData> | undefined) =>
	node?.type === 'split' ? node.ratio : undefined;
const nextFrames = () =>
	new Promise<void>((resolve) =>
		requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
	);
const backgroundOf = (utility: string) => {
	const probe = document.createElement('div');
	probe.className = utility;
	document.body.append(probe);
	const { backgroundColor } = getComputedStyle(probe);
	probe.remove();
	return backgroundColor;
};

describe('SplitView rendering', () => {
	it('renders one pane per leaf, each given its node', () => {
		const { container } = render(BoundSplitView);

		expect(paneIds(container)).toEqual(['mycam', 'mytimeseries', 'mysensor', 'mycam2']);
		expect(paneLabels(container)).toEqual(['Camera', 'Time series', 'Sensor stat', 'Camera 2']);
	});

	it('renders one separator per split', () => {
		const { container } = render(BoundSplitView);

		expect(separators(container)).toHaveLength(3);
	});

	it('names every separator', () => {
		const { getByRole } = render(BoundSplitView);

		expect(getByRole('separator', { name: RESIZE_HANDLE_LABEL }).elements()).toHaveLength(3);
	});

	it.each([
		{ split: 'root column', index: 0, orientation: 'horizontal' },
		{ split: 'inner row', index: 1, orientation: 'vertical' },
		{ split: 'lower column', index: 2, orientation: 'horizontal' }
	])('orients the $split separator $orientation', ({ index, orientation }) => {
		const { container } = render(BoundSplitView);

		expect(separators(container)[index]!.getAttribute('aria-orientation')).toBe(orientation);
	});

	it("sizes the root split's first panel from ratio", async () => {
		const { container } = render(BoundSplitView);

		await expect.poll(() => rootFirstPanelShare(container)).toBeCloseTo(0.3, 2);
	});

	it('gives the root split second panel the remaining height', async () => {
		const { container } = render(BoundSplitView);
		const [first, second] = panelsOf(rootSeparator(container));

		await expect.poll(() => rootFirstPanelShare(container)).toBeCloseTo(0.3, 2);
		expect(
			first!.getBoundingClientRect().height + second!.getBoundingClientRect().height,
			'panels meet edge to edge'
		).toBeCloseTo(FRAME_HEIGHT, 0);
	});

	it('gives every pane a distinct id across two views of the same data', () => {
		render(BoundSplitView);
		render(BoundSplitView);

		const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('renders the empty snippet when the layout is undefined', () => {
		const { container } = render(StaticSplitView, { props: { layout: undefined } });

		expect(container.querySelector('[data-testid="empty"]')?.textContent).toBe('No panes');
		expect(paneIds(container)).toEqual([]);
	});
});

describe('SplitView resize trigger', () => {
	it('is an 8px hit area centered on the boundary that takes no layout space', () => {
		const { container } = render(BoundSplitView);
		const trigger = rootSeparator(container);
		const [first, second] = panelsOf(trigger);

		const boundary = first!.getBoundingClientRect().bottom;
		expect(second!.getBoundingClientRect().top, 'panels meet').toBeCloseTo(boundary, 0);
		expect(trigger.getBoundingClientRect().height).toBe(TRIGGER_HIT_AREA_PX);
		expect(trigger.getBoundingClientRect().top + TRIGGER_CENTER_PX).toBeCloseTo(boundary, 0);
	});

	it('sits above both panels', () => {
		const { container } = render(BoundSplitView);
		const trigger = rootSeparator(container);
		const boundary = panelsOf(trigger)[0]!.getBoundingClientRect().bottom;
		const x = trigger.getBoundingClientRect().left + 100;

		expect(document.elementFromPoint(x, boundary - 2)).toBe(trigger);
		expect(document.elementFromPoint(x, boundary + 2)).toBe(trigger);
	});

	it.each([
		{
			split: 'root column',
			index: 0,
			position: { x: 100, y: TRIGGER_CENTER_PX },
			thickness: 'height'
		},
		{ split: 'inner row', index: 1, position: { x: TRIGGER_CENTER_PX, y: 50 }, thickness: 'width' }
	] as const)(
		'shows nothing at rest and a 2px gray-6 line on hover across the $split separator',
		async ({ index, position, thickness }) => {
			const { container } = render(BoundSplitView);
			const trigger = separators(container)[index]!;

			expect(getComputedStyle(trigger, '::after').opacity).toBe('0');
			await userEvent.hover(trigger, { position });

			const line = getComputedStyle(trigger, '::after');
			expect(line.opacity).toBe('1');
			expect(line[thickness]).toBe('2px');
			expect(line.backgroundColor).toBe(backgroundOf('bg-gray-6'));
		}
	);

	it('shows the line while the separator is marked as dragging', () => {
		const { container } = render(BoundSplitView);
		const trigger = rootSeparator(container);

		expect(getComputedStyle(trigger, '::after').opacity).toBe('0');
		trigger.setAttribute('data-dragging', '');

		expect(getComputedStyle(trigger, '::after').opacity).toBe('1');
	});

	it('shows a 2px info-dark outline on keyboard focus', async () => {
		const { container, getByRole } = render(BoundSplitView);
		await userEvent.click(getByRole('button'));
		await userEvent.tab();

		const trigger = rootSeparator(container);
		expect(document.activeElement).toBe(trigger);
		const outline = getComputedStyle(trigger);
		expect(outline.outlineStyle).toBe('solid');
		expect(outline.outlineWidth).toBe('2px');
		expect(outline.outlineColor).toBe(backgroundOf('bg-info-dark'));
	});
});

describe('SplitView resize writeback', () => {
	it('hands a keyboard resize to the setter as a new root and leaves the fixture alone', async () => {
		const pristine = structuredClone(layoutRoot);
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { container } = render(ControlledSplitView, { props: { accept: true, received } });

		rootSeparator(container).focus();
		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => received.length).toBe(1);
		expect(ratioOf(received[0])).not.toBe(0.3);
		expect(received[0]).not.toBe(layoutRoot);
		expect(layoutRoot).toEqual(pristine);
	});

	it('moves the panel with an accepted resize', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true } });

		rootSeparator(container).focus();
		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => owner(container)).not.toBe('0.3');
		await expect.poll(() => rootFirstPanelShare(container)).toBeCloseTo(0.31, 2);
	});

	it('two-way: keeps a deep $state owner in sync and does not snap back', async () => {
		const { container } = render(BoundSplitView);

		rootSeparator(container).focus();
		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => Number(owner(container))).toBeCloseTo(0.31, 2);
		await expect.poll(() => rootFirstPanelShare(container)).toBeCloseTo(0.31, 2);
	});

	it('snaps the panel back when the setter rejects the resize', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { container } = render(ControlledSplitView, { props: { accept: false, received } });
		await nextFrames();

		rootSeparator(container).focus();
		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => received.length).toBe(1);
		expect(ratioOf(received[0])).not.toBe(0.3);
		expect(owner(container)).toBe('0.3');
		await expect.poll(() => rootFirstPanelShare(container)).toBeCloseTo(0.3, 2);
	});

	it('moves the panel with the pointer during a drag and writes back on release', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { container } = render(ControlledSplitView, { props: { accept: true, received } });
		const trigger = rootSeparator(container);
		const secondPanel = panelsOf(trigger)[1]!;
		const startHeight = rootFirstPanel(container).getBoundingClientRect().height;
		const expectedShare = (startHeight + DRAG_DISTANCE_PX) / FRAME_HEIGHT;
		let heightBeforeRelease = 0;
		let draggingBeforeRelease = false;
		const measureBeforeRelease = () => {
			heightBeforeRelease = rootFirstPanel(container).getBoundingClientRect().height;
			draggingBeforeRelease = trigger.hasAttribute('data-dragging');
		};
		document.addEventListener('pointerup', measureBeforeRelease, true);

		try {
			await userEvent.dragAndDrop(trigger, secondPanel, {
				sourcePosition: { x: 100, y: TRIGGER_CENTER_PX },
				targetPosition: { x: 100, y: DRAG_DISTANCE_PX }
			});
		} finally {
			document.removeEventListener('pointerup', measureBeforeRelease, true);
		}

		expect(heightBeforeRelease / FRAME_HEIGHT, 'live during the drag').toBeCloseTo(
			expectedShare,
			2
		);
		expect(draggingBeforeRelease, 'separator marked as dragging').toBe(true);
		await expect.poll(() => received.length).toBe(1);
		expect(ratioOf(received[0])).toBeCloseTo(expectedShare, 2);
	});

	it('does not write when the separator is clicked without moving', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, initialRatio: 0.104 }
		});

		await userEvent.click(rootSeparator(container));

		expect(received).toEqual([]);
		expect(owner(container)).toBe('0.104');
	});

	it('does not write a size from before an external change when clicked without moving', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { container, getByRole } = render(ControlledSplitView, {
			props: { accept: true, received }
		});
		rootSeparator(container).focus();
		await userEvent.keyboard('{ArrowDown}');
		await expect.poll(() => received.length).toBe(1);

		await userEvent.click(getByRole('button'));
		await expect.poll(() => rootFirstPanelShare(container)).toBeCloseTo(0.7, 2);
		await userEvent.click(rootSeparator(container));

		expect(received).toHaveLength(1);
		expect(owner(container)).toBe('0.7');
	});
});

describe('SplitView context update', () => {
	const setRootTo =
		(ratio: number) =>
		<TData>(root: LayoutNode<TData>) =>
			setSplitRatio(root, ids.rootSplit, ratio);

	it('reports acceptance by a deep $state owner, which stores a proxy rather than the result', async () => {
		const probe: UpdateProbe = {};
		const { container } = render(BoundSplitView, { props: { probe } });

		expect(probe.update!(setRootTo(0.5))).toBe(true);

		await expect.poll(() => owner(container)).toBe('0.5');
	});

	it('reports a setter that leaves the owner unchanged as a rejection', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const probe: UpdateProbe = {};
		const { container } = render(ControlledSplitView, {
			props: { accept: false, received, probe }
		});

		expect(probe.update!(setRootTo(0.5))).toBe(false);

		expect(ratioOf(received[0])).toBe(0.5);
		expect(owner(container)).toBe('0.3');
	});

	it('reports a transform that changes nothing as accepted without calling the setter', () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const probe: UpdateProbe = {};
		render(ControlledSplitView, { props: { accept: false, received, probe } });

		expect(probe.update!(setRootTo(0.3))).toBe(true);

		expect(received).toEqual([]);
	});
});

describe('SplitView external sync', () => {
	it('follows a layout the owner assigns from outside', async () => {
		const { container, getByRole } = render(BoundSplitView);

		await userEvent.click(getByRole('button'));

		await expect.poll(() => owner(container)).toBe('0.7');
		await expect.poll(() => rootFirstPanelShare(container)).toBeCloseTo(0.7, 2);
	});
});
