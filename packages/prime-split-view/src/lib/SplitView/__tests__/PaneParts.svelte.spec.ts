import { tick } from 'svelte';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { ids, layoutRoot } from '../../__tests__/layout-fixture.ts';
import BoundSplitView from './BoundSplitView.svelte';
import { dragAfterHold } from './hold-to-drag.ts';
import PanePartsSplitView from './PanePartsSplitView.svelte';

const WIDE_VIEWPORT = { width: 1000, height: 1400 };
const DEFAULT_VIEWPORT = { width: 414, height: 896 };
const DESTINATION_COUNT = 3;
const RIGHT = { x: 0.9, y: 0.5 };

const warningFor = (label: string) =>
	`SplitView: pane "${label}" was dragged but has no SplitView.MoveTrigger. Dragging alone fails WCAG 2.5.7 (Dragging Movements), so render a SplitView.MoveTrigger in the pane to move it without dragging. A SplitView.MoveTrigger that mounts only on demand, such as inside a menu, still triggers this warning until it first mounts.`;

const handleOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[aria-label="Move ${label}"]`)!;
const menuButtonOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[aria-label="Menu for ${label}"]`)!;
const headerTextOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[data-header-text="${label}"]`)!;
const paneElement = (container: Element, id: string) =>
	container.querySelector<HTMLElement>(`[data-pane-id="${id}"]`)!;
const paneIds = (container: Element) =>
	[...container.querySelectorAll<HTMLElement>('[data-testid="pane"]')].map(
		(element) => element.dataset.paneId
	);
const draggableWrappers = (container: Element) => [
	...container.querySelectorAll<HTMLElement>('[draggable="true"]')
];
const moveTargetsIn = (container: Element) => [
	...container.querySelectorAll<HTMLElement>('[data-move-target]')
];
const nextFrames = () =>
	new Promise<void>((resolve) =>
		requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
	);

const warnSpy = () => vi.spyOn(console, 'warn').mockImplementation(() => undefined);
const warningsMentioning = (spy: ReturnType<typeof warnSpy>, label: string) =>
	spy.mock.calls
		.map(([message]) => String(message))
		.filter((message) => message.includes(`"${label}"`));

const dragOnto = (source: HTMLElement, container: Element, targetId: string) => {
	const target = paneElement(container, targetId);
	const rect = target.getBoundingClientRect();
	return userEvent.dragAndDrop(source, target, {
		targetPosition: { x: rect.width * RIGHT.x, y: rect.height * RIGHT.y }
	});
};

const dragOntoTimeSeries = (source: HTMLElement, container: Element) =>
	dragOnto(source, container, ids.mytimeseries);

const dragHeldHandleOntoTimeSeries = (source: HTMLElement, container: Element) => {
	const target = paneElement(container, ids.mytimeseries);
	const rect = target.getBoundingClientRect();
	return dragAfterHold(source, target, {
		targetPosition: { x: rect.width * RIGHT.x, y: rect.height * RIGHT.y }
	});
};

beforeAll(() => page.viewport(WIDE_VIEWPORT.width, WIDE_VIEWPORT.height));

afterAll(() => page.viewport(DEFAULT_VIEWPORT.width, DEFAULT_VIEWPORT.height));

afterEach(() => vi.restoreAllMocks());

describe('SplitView.DragTrigger around a SplitView.MoveTrigger: one handle', () => {
	it('moves the pane beside the target when held and dragged', async () => {
		const { container } = render(BoundSplitView, { props: { handles: true } });

		await dragHeldHandleOntoTimeSeries(handleOf(container, 'Camera'), container);

		await expect
			.poll(() => paneIds(container))
			.toEqual([ids.mytimeseries, ids.mycam, ids.mysensor, ids.mycam2]);
	});

	it('enters move mode when clicked', async () => {
		const { container } = render(BoundSplitView, { props: { handles: true } });

		await userEvent.click(handleOf(container, 'Camera'));

		expect(moveTargetsIn(container)).toHaveLength(DESTINATION_COUNT);
		expect(handleOf(container, 'Camera').getAttribute('aria-pressed')).toBe('true');
	});
});

describe('SplitView.MoveTrigger: dragging a pane that has none', () => {
	it('logs no warning before any drag', () => {
		const warn = warnSpy();

		render(PanePartsSplitView, { props: { variant: 'drag-only' } });

		expect(warn).not.toHaveBeenCalled();
	});

	it('warns on the first drag, naming the pane label', async () => {
		const warn = warnSpy();
		const { container } = render(PanePartsSplitView, { props: { variant: 'drag-only' } });

		await dragOntoTimeSeries(headerTextOf(container, 'Camera'), container);

		expect(warningsMentioning(warn, 'Camera')).toEqual([warningFor('Camera')]);
	});

	it('warns for the dragged pane and no other', async () => {
		const warn = warnSpy();
		const { container } = render(PanePartsSplitView, { props: { variant: 'drag-only' } });

		await dragOntoTimeSeries(headerTextOf(container, 'Camera'), container);

		expect(warningsMentioning(warn, 'Time series')).toEqual([]);
	});

	it('does not warn again on a second drag from the same pane, even after it remounted', async () => {
		const warn = warnSpy();
		const { container } = render(PanePartsSplitView, { props: { variant: 'drag-only' } });
		await dragOntoTimeSeries(headerTextOf(container, 'Camera'), container);
		expect(warningsMentioning(warn, 'Camera'), 'the first drag').toHaveLength(1);

		await dragOnto(headerTextOf(container, 'Camera'), container, ids.mysensor);
		await nextFrames();

		expect(warningsMentioning(warn, 'Camera'), 'the second drag').toHaveLength(1);
	});

	it('does not warn when the pane has a SplitView.MoveTrigger', async () => {
		const warn = warnSpy();
		const { container } = render(PanePartsSplitView, { props: { variant: 'header' } });

		await dragOntoTimeSeries(headerTextOf(container, 'Camera'), container);

		expect(warn).not.toHaveBeenCalled();
	});

	it('does not warn when the SplitView.MoveTrigger mounted and unmounted before the drag', async () => {
		const warn = warnSpy();
		const { container } = render(PanePartsSplitView, { props: { variant: 'menu' } });
		await userEvent.click(menuButtonOf(container, 'Camera'));
		expect(handleOf(container, 'Camera'), 'the menu opened').not.toBeNull();
		await userEvent.click(menuButtonOf(container, 'Camera'));
		expect(handleOf(container, 'Camera'), 'the menu closed').toBeNull();

		await dragOntoTimeSeries(headerTextOf(container, 'Camera'), container);

		expect(warn).not.toHaveBeenCalled();
	});

	it('warns on a drag when the menu holding the SplitView.MoveTrigger was never opened', async () => {
		const warn = warnSpy();
		const { container } = render(PanePartsSplitView, { props: { variant: 'menu' } });

		await dragOntoTimeSeries(headerTextOf(container, 'Camera'), container);

		expect(warningsMentioning(warn, 'Camera')).toEqual([warningFor('Camera')]);
	});
});

describe('SplitView parts: a view that is not reorderable', () => {
	it('arms no pane when a press starts inside a SplitView.DragTrigger', async () => {
		const { container } = render(PanePartsSplitView, {
			props: { variant: 'header', reorderable: false }
		});

		headerTextOf(container, 'Camera').dispatchEvent(
			new PointerEvent('pointerdown', { bubbles: true, button: 0 })
		);
		await tick();

		expect(draggableWrappers(container)).toEqual([]);
	});

	it('moves no pane when dragged from a SplitView.DragTrigger', async () => {
		const { container, component } = render(PanePartsSplitView, {
			props: { variant: 'header', reorderable: false }
		});

		await dragOntoTimeSeries(headerTextOf(container, 'Camera'), container);
		await nextFrames();

		expect(component.getLayout()).toEqual(layoutRoot);
	});

	it('enters no move mode when a SplitView.MoveTrigger is clicked', async () => {
		const { container } = render(PanePartsSplitView, {
			props: { variant: 'header', reorderable: false }
		});

		await userEvent.click(handleOf(container, 'Camera'));

		expect(moveTargetsIn(container)).toEqual([]);
	});

	it('reports no SplitView.MoveTrigger as pressed after one is clicked', async () => {
		const { container } = render(PanePartsSplitView, {
			props: { variant: 'header', reorderable: false }
		});

		await userEvent.click(handleOf(container, 'Camera'));

		expect(handleOf(container, 'Camera').getAttribute('aria-pressed')).toBe('false');
	});
});
