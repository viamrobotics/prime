import { tick } from 'svelte';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { expectSplit, ids, layoutRoot } from '../../__tests__/layout-fixture.ts';
import BoundSplitView from './BoundSplitView.svelte';
import ControlledSplitView from './ControlledSplitView.svelte';
import PaneControlsSplitView from './PaneControlsSplitView.svelte';

import type { LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../__tests__/layout-fixture.ts';

type Received = (LayoutNode<PaneData> | undefined)[];

interface Fractions {
	x: number;
	y: number;
}

const WIDE_VIEWPORT = { width: 1000, height: 1400 };
const DEFAULT_VIEWPORT = { width: 414, height: 896 };
const SEPARATOR_REACH_PX = 2;
const NATIVE_CONTROLS = [
	{ name: 'button', selector: 'button' },
	{ name: 'a', selector: 'a' },
	{ name: 'input', selector: 'input' },
	{ name: 'select', selector: 'select' },
	{ name: 'textarea', selector: 'textarea' },
	{ name: 'contenteditable', selector: '[contenteditable]' }
];
// A link, a select, and a contenteditable start their own native gesture, so a drag from one shows nothing about the guard.
const CONTROLS_THAT_DRAG_THE_PANE_WHEN_ARMED = NATIVE_CONTROLS.filter(({ name }) =>
	['button', 'input', 'textarea'].includes(name)
);
const NO_POINTER_EVENTS = ['none', 'none', 'none', 'none'];
const ALL_POINTER_EVENTS = ['auto', 'auto', 'auto', 'auto'];

const CENTER: Fractions = { x: 0.5, y: 0.5 };
const LEFT: Fractions = { x: 0.1, y: 0.5 };
const RIGHT: Fractions = { x: 0.9, y: 0.5 };
const TOP: Fractions = { x: 0.5, y: 0.1 };
const BOTTOM: Fractions = { x: 0.5, y: 0.9 };

const pane = (id: string, label: string) => ({ type: 'pane', id, data: { label } });
const CAMERA = pane(ids.mycam, 'Camera');
const TIME_SERIES = pane(ids.mytimeseries, 'Time series');
const LOWER_SPLIT = {
	type: 'split',
	id: ids.lowerSplit,
	direction: 'column',
	ratio: 0.5,
	first: pane(ids.mysensor, 'Sensor stat'),
	second: pane(ids.mycam2, 'Camera 2')
};

const CAMERA_RIGHT_OF_TIME_SERIES = {
	type: 'split',
	id: ids.innerSplit,
	direction: 'row',
	ratio: 0.6,
	first: {
		type: 'split',
		id: expect.any(String),
		direction: 'row',
		ratio: 0.5,
		first: TIME_SERIES,
		second: CAMERA
	},
	second: LOWER_SPLIT
};

let listeners = new AbortController();

const paneElement = (container: Element, id: string) =>
	container.querySelector<HTMLElement>(`[data-pane-id="${id}"]`)!;
const handleOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[aria-label="Move ${label}"]`)!;
const headerTextOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[data-header-text="${label}"]`)!;
const controlOf = (container: Element, label: string, name: string) =>
	container
		.querySelector(`[data-header="${label}"]`)!
		.querySelector<HTMLElement>(`[data-control="${name}"]`)!;
const ignoredElementOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[data-ignored="${label}"]`)!;
const overlayOf = (container: Element, id: string) =>
	paneElement(container, id).parentElement!.querySelector<HTMLElement>('[data-drop-overlay]')!;
const wrapperOf = (container: Element, id: string) => paneElement(container, id).parentElement!;
const overlays = (container: Element) => [
	...container.querySelectorAll<HTMLElement>('[data-drop-overlay]')
];
const overlayPointerEvents = (container: Element) =>
	overlays(container).map((overlay) => getComputedStyle(overlay).pointerEvents);
const indicatorIn = (container: Element) =>
	container.querySelector<HTMLElement>('[data-drop-indicator]');
const draggableWrappers = (container: Element) => [
	...container.querySelectorAll<HTMLElement>('[draggable="true"]')
];
const paneIds = (container: Element) =>
	[...container.querySelectorAll<HTMLElement>('[data-testid="pane"]')].map(
		(element) => element.dataset.paneId
	);
const rootSeparator = (container: Element) =>
	container.querySelector<HTMLElement>('[role="separator"]')!;
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

const sizeOf = (element: HTMLElement) => element.getBoundingClientRect();
const pointWithin = (element: HTMLElement, at: Fractions) => {
	const rect = sizeOf(element);
	return { x: rect.width * at.x, y: rect.height * at.y };
};
const clientPointWithin = (element: HTMLElement, at: Fractions) => {
	const rect = sizeOf(element);
	return { clientX: rect.left + rect.width * at.x, clientY: rect.top + rect.height * at.y };
};

const dragPaneOnto = (
	container: Element,
	fromLabel: string,
	targetId: string,
	at: Fractions,
	options: { force?: boolean } = {}
) => {
	const target = paneElement(container, targetId);
	return userEvent.dragAndDrop(handleOf(container, fromLabel), target, {
		targetPosition: pointWithin(target, at),
		...options
	});
};

const sampleDuring = <TValue>(eventType: string, sample: (event: Event) => TValue) => {
	const sampled: { value?: TValue; count: number } = { count: 0 };
	document.addEventListener(
		eventType,
		(event) => {
			sampled.value = sample(event);
			sampled.count += 1;
		},
		{ capture: true, signal: listeners.signal }
	);
	return sampled;
};

const countEvents = (eventType: string) => sampleDuring(eventType, () => undefined);

const dispatchDrag = (
	type: string,
	element: Element,
	init: { clientX?: number; clientY?: number; dataTransfer?: DataTransfer } = {}
) => {
	const event = new DragEvent(type, { bubbles: true, cancelable: true, ...init });
	element.dispatchEvent(event);
	return event;
};

const pressElement = async (element: Element) => {
	element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
	await tick();
};

const pressHandle = (container: Element, label: string) => pressElement(handleOf(container, label));

const releaseHandle = async (container: Element, label: string) => {
	handleOf(container, label).dispatchEvent(
		new PointerEvent('pointerup', { bubbles: true, button: 0 })
	);
	await tick();
};

const startDragFrom = async (container: Element, label: string, paneId: string) => {
	await pressHandle(container, label);
	const dataTransfer = new DataTransfer();
	const source = wrapperOf(container, paneId);
	dispatchDrag('dragstart', source, { dataTransfer });
	await tick();
	return { source, dataTransfer };
};

const dragCameraOverTimeSeries = async (container: Element) => {
	const { source } = await startDragFrom(container, 'Camera', ids.mycam);
	const overlay = overlayOf(container, ids.mytimeseries);
	const over = clientPointWithin(overlay, RIGHT);
	dispatchDrag('dragenter', overlay, over);
	dispatchDrag('dragover', overlay, over);
	await tick();
	return { source, overlay, over };
};

const cancelDrag = async ({
	source,
	overlay,
	over
}: Awaited<ReturnType<typeof dragCameraOverTimeSeries>>) => {
	dispatchDrag('dragleave', overlay, over);
	dispatchDrag('dragend', source);
	await tick();
};

const fileTransfer = () => {
	const dataTransfer = new DataTransfer();
	dataTransfer.items.add(new File(['x'], 'photo.png', { type: 'image/png' }));
	return dataTransfer;
};

beforeAll(() => page.viewport(WIDE_VIEWPORT.width, WIDE_VIEWPORT.height));

afterAll(() => page.viewport(DEFAULT_VIEWPORT.width, DEFAULT_VIEWPORT.height));

afterEach(() => {
	listeners.abort();
	listeners = new AbortController();
});

describe('SplitView drag and drop: dropping on a pane edge', () => {
	it('moves the dragged pane beside the target in a new row split, and its old sibling takes the old split place', async () => {
		const { container, component } = render(BoundSplitView, { props: { handles: true } });

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, RIGHT);

		await expect.poll(() => component.getLayout()).toEqual(CAMERA_RIGHT_OF_TIME_SERIES);
	});

	it('gives the new split an id no other node has', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, RIGHT);

		await expect.poll(() => received.length).toBe(1);
		const created = expectSplit(expectSplit(received[0]).first).id;
		expect(created).toMatch(/^[0-9a-f-]{32,36}$/);
		expect(Object.values(ids)).not.toContain(created);
	});

	it('renders the panes in their new arrangement', async () => {
		const { container } = render(BoundSplitView, { props: { handles: true } });

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, RIGHT);

		await expect
			.poll(() => paneIds(container))
			.toEqual([ids.mytimeseries, ids.mycam, ids.mysensor, ids.mycam2]);
	});
});

describe('SplitView drag and drop: dropping on a pane center', () => {
	it('swaps the dragged pane with the target', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, CENTER);

		await expect
			.poll(() => received.at(-1))
			.toEqual({
				type: 'split',
				id: ids.rootSplit,
				direction: 'column',
				ratio: 0.3,
				first: TIME_SERIES,
				second: {
					type: 'split',
					id: ids.innerSplit,
					direction: 'row',
					ratio: 0.6,
					first: CAMERA,
					second: LOWER_SPLIT
				}
			});
	});

	it('renders the swapped panes in their new places', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, CENTER);

		await expect
			.poll(() => paneIds(container))
			.toEqual([ids.mytimeseries, ids.mycam, ids.mysensor, ids.mycam2]);
	});
});

describe('SplitView drag and drop: a binding that rejects the change', () => {
	it('keeps the bound value when a drop is rejected', async () => {
		const received: Received = [];
		const { container, component } = render(ControlledSplitView, {
			props: { accept: false, received, handles: true }
		});

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, RIGHT);

		await expect.poll(() => received.length).toBe(1);
		expect(received[0], 'the setter was offered a different layout').not.toBe(layoutRoot);
		await nextFrames();
		expect(component.getLayout()).toBe(layoutRoot);
	});

	it('keeps the rendered pane order when a drop is rejected', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: false, received, handles: true }
		});

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, CENTER);

		await expect.poll(() => received.length).toBe(1);
		await nextFrames();
		expect(paneIds(container)).toEqual([ids.mycam, ids.mytimeseries, ids.mysensor, ids.mycam2]);
	});

	it('clears the drag state when a drop is rejected', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: false, received, handles: true }
		});

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, RIGHT);

		await expect.poll(() => received.length).toBe(1);
		expect(overlayPointerEvents(container)).toEqual(NO_POINTER_EVENTS);
	});
});

describe('SplitView drag and drop: reorderable is false', () => {
	it('starts no drag from a handle', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true, reorderable: false }
		});
		const dragStarts = countEvents('dragstart');

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, CENTER, { force: true });
		await nextFrames();

		expect(dragStarts.count).toBe(0);
		expect(indicatorIn(container)).toBeNull();
		expect(received).toEqual([]);
	});

	it('arms no pane when a pointer press reaches a handle', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true, reorderable: false }
		});

		await pressHandle(container, 'Camera');

		expect(draggableWrappers(container)).toEqual([]);
	});

	it('writes a keyboard resize back', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true, reorderable: false }
		});

		rootSeparator(container).focus();
		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => received.length).toBe(1);
	});
});

describe('SplitView drag and drop: dropping on the dragged pane', () => {
	it('shows the center indicator over the whole dragged pane', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		const camera = paneElement(container, ids.mycam);
		const indicator = sampleDuring('drop', () => {
			const element = indicatorIn(container);
			return element && { region: element.dataset.dropIndicator, rect: sizeOf(element) };
		});

		await dragPaneOnto(container, 'Camera', ids.mycam, CENTER);

		expect(indicator.value?.region).toBe('center');
		expect(indicator.value?.rect.width).toBeCloseTo(sizeOf(camera).width, 0);
		expect(indicator.value?.rect.height).toBeCloseTo(sizeOf(camera).height, 0);
	});

	it('leaves the layout reference unchanged and never calls the setter', async () => {
		const received: Received = [];
		const { container, component } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		const drops = countEvents('drop');

		await dragPaneOnto(container, 'Camera', ids.mycam, CENTER);
		await nextFrames();

		expect(drops.count, 'a drop reached the page').toBe(1);
		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
	});
});

describe('SplitView drag and drop: the indicator', () => {
	it.each([
		{ region: 'left', at: LEFT, left: 0, top: 0, width: 0.5, height: 1 },
		{ region: 'right', at: RIGHT, left: 0.5, top: 0, width: 0.5, height: 1 },
		{ region: 'top', at: TOP, left: 0, top: 0, width: 1, height: 0.5 },
		{ region: 'bottom', at: BOTTOM, left: 0, top: 0.5, width: 1, height: 0.5 },
		{ region: 'center', at: CENTER, left: 0, top: 0, width: 1, height: 1 }
	])(
		'covers the $region part of the target pane while the pointer is over it',
		async ({ region, at, left, top, width, height }) => {
			const { container } = render(ControlledSplitView, {
				props: { accept: true, handles: true }
			});
			const paneRect = sizeOf(paneElement(container, ids.mytimeseries));
			const indicator = sampleDuring('drop', () => {
				const element = indicatorIn(container);
				return element && { region: element.dataset.dropIndicator, rect: sizeOf(element) };
			});

			await dragPaneOnto(container, 'Camera', ids.mytimeseries, at);

			const rect = indicator.value!.rect;
			expect(indicator.value?.region).toBe(region);
			expect((rect.left - paneRect.left) / paneRect.width).toBeCloseTo(left, 2);
			expect((rect.top - paneRect.top) / paneRect.height).toBeCloseTo(top, 2);
			expect(rect.width / paneRect.width).toBeCloseTo(width, 2);
			expect(rect.height / paneRect.height).toBeCloseTo(height, 2);
		}
	);

	it('is painted with info-medium at half opacity', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		const indicator = sampleDuring('drop', () => {
			const element = indicatorIn(container);
			return element && getComputedStyle(element).backgroundColor;
		});

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, RIGHT);

		expect(indicator.value).toBe(backgroundOf('bg-info-medium/50'));
	});

	it('does not take pointer events itself', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		const indicator = sampleDuring('drop', () => {
			const element = indicatorIn(container);
			return element && getComputedStyle(element).pointerEvents;
		});

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, RIGHT);

		expect(indicator.value).toBe('none');
	});
});

describe('SplitView drag and drop: a drag that never reaches a pane', () => {
	it('stops every overlay taking pointer events after a drag ends outside every pane', async () => {
		const { container, getByTestId } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		const duringDrag = sampleDuring('dragend', () => overlayPointerEvents(container));

		await userEvent.dragAndDrop(handleOf(container, 'Camera'), getByTestId('owner'));
		await nextFrames();

		expect(duringDrag.value, 'overlays took pointer events while the drag lasted').toEqual(
			ALL_POINTER_EVENTS
		);
		expect(overlayPointerEvents(container)).toEqual(NO_POINTER_EVENTS);
	});

	it('stops every overlay taking pointer events when the drag is canceled with Escape', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		const drag = await dragCameraOverTimeSeries(container);
		expect(overlayPointerEvents(container), 'overlays are live mid-drag').toEqual(
			ALL_POINTER_EVENTS
		);

		await cancelDrag(drag);

		expect(overlayPointerEvents(container)).toEqual(NO_POINTER_EVENTS);
	});

	it('hides the indicator when the drag is canceled with Escape', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		const drag = await dragCameraOverTimeSeries(container);
		expect(indicatorIn(container)?.dataset.dropIndicator, 'indicator shows mid-drag').toBe('right');

		await cancelDrag(drag);

		expect(indicatorIn(container)).toBeNull();
	});

	it('changes nothing when the drag is canceled with Escape', async () => {
		const received: Received = [];
		const { container, component } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		const drag = await dragCameraOverTimeSeries(container);

		await cancelDrag(drag);

		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
	});
});

describe('SplitView drag and drop: the view stops being reorderable mid-drag', () => {
	it('ignores a drop that lands after the view stopped being reorderable', async () => {
		const received: Received = [];
		const { container, rerender } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		await startDragFrom(container, 'Camera', ids.mycam);
		await rerender({ reorderable: false });
		const overlay = overlayOf(container, ids.mytimeseries);

		dispatchDrag('drop', overlay, clientPointWithin(overlay, RIGHT));
		await nextFrames();

		expect(received).toEqual([]);
	});

	it('starts no drag once the view stopped being reorderable with a handle pressed', async () => {
		const { container, rerender } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		await pressHandle(container, 'Camera');
		await rerender({ reorderable: false });

		dispatchDrag('dragstart', wrapperOf(container, ids.mycam), {
			dataTransfer: new DataTransfer()
		});
		await tick();

		expect(overlayPointerEvents(container)).toEqual(NO_POINTER_EVENTS);
	});
});

describe('SplitView drag and drop: a drag this view did not start', () => {
	it('shows no indicator for a file dragged over a pane', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		const overlay = overlayOf(container, ids.mytimeseries);
		const over = { ...clientPointWithin(overlay, RIGHT), dataTransfer: fileTransfer() };

		dispatchDrag('dragenter', overlay, over);
		dispatchDrag('dragover', overlay, over);
		await tick();

		expect(indicatorIn(container)).toBeNull();
	});

	it('leaves the browser to handle a file dragged over a pane', () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		const overlay = overlayOf(container, ids.mytimeseries);

		const dragOver = dispatchDrag('dragover', overlay, {
			...clientPointWithin(overlay, RIGHT),
			dataTransfer: fileTransfer()
		});

		expect(dragOver.defaultPrevented).toBe(false);
	});

	it('changes nothing when a file is dropped on a pane', async () => {
		const received: Received = [];
		const { container, component } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		const overlay = overlayOf(container, ids.mytimeseries);

		const drop = dispatchDrag('drop', overlay, {
			...clientPointWithin(overlay, RIGHT),
			dataTransfer: fileTransfer()
		});
		await nextFrames();

		expect(drop.defaultPrevented).toBe(false);
		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
	});

	it('shows no indicator and changes nothing for a drag that started in another SplitView', async () => {
		const received: Received = [];
		const other: Received = [];
		const { container: source } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		const { container: bystander } = render(ControlledSplitView, {
			props: { accept: true, received: other, handles: true }
		});
		const dragStarts = countEvents('dragstart');
		const bystanderIndicators = sampleDuring('dragover', () => indicatorIn(bystander));
		const target = paneElement(bystander, ids.mytimeseries);

		await userEvent.dragAndDrop(handleOf(source, 'Camera'), target, {
			targetPosition: pointWithin(target, RIGHT)
		});
		await nextFrames();

		expect(dragStarts.count, 'the drag started').toBe(1);
		expect(bystanderIndicators.count, 'the drag reached the bystander').toBeGreaterThan(0);
		expect(bystanderIndicators.value).toBeNull();
		expect(other).toEqual([]);
		expect(received).toEqual([]);
	});
});

describe('SplitView drag and drop: dropping next to a separator', () => {
	it('lands a drop just below the separator on the pane below it', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		const target = paneElement(container, ids.mytimeseries);

		await userEvent.dragAndDrop(handleOf(container, 'Camera'), target, {
			targetPosition: { x: sizeOf(target).width / 2, y: SEPARATOR_REACH_PX },
			force: true
		});

		await expect
			.poll(() => received.at(-1))
			.toEqual({
				type: 'split',
				id: ids.innerSplit,
				direction: 'row',
				ratio: 0.6,
				first: {
					type: 'split',
					id: expect.any(String),
					direction: 'column',
					ratio: 0.5,
					first: CAMERA,
					second: TIME_SERIES
				},
				second: LOWER_SPLIT
			});
	});

	it('lands a drop just above the separator on the pane above it', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		const target = paneElement(container, ids.mycam);

		await userEvent.dragAndDrop(handleOf(container, 'Time series'), target, {
			targetPosition: {
				x: sizeOf(target).width / 2,
				y: sizeOf(target).height - SEPARATOR_REACH_PX
			},
			force: true
		});

		await expect
			.poll(() => received.at(-1))
			.toEqual({
				type: 'split',
				id: ids.rootSplit,
				direction: 'column',
				ratio: 0.3,
				first: {
					type: 'split',
					id: expect.any(String),
					direction: 'column',
					ratio: 0.5,
					first: CAMERA,
					second: TIME_SERIES
				},
				second: LOWER_SPLIT
			});
	});
});

describe('SplitView drag and drop: the dragTrigger', () => {
	it('makes only the pressed handle pane draggable', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});

		await pressHandle(container, 'Time series');

		expect(draggableWrappers(container)).toEqual([wrapperOf(container, ids.mytimeseries)]);
	});

	it('makes no pane draggable again once the handle is released', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		await pressHandle(container, 'Time series');

		await releaseHandle(container, 'Time series');

		expect(draggableWrappers(container)).toEqual([]);
	});

	it('makes no pane draggable once the pointer is released off the handle without a drag', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		await pressHandle(container, 'Camera');
		expect(draggableWrappers(container), 'the press armed the pane').toEqual([
			wrapperOf(container, ids.mycam)
		]);

		paneElement(container, ids.mytimeseries).dispatchEvent(
			new PointerEvent('pointerup', { bubbles: true, button: 0 })
		);
		await tick();

		expect(draggableWrappers(container)).toEqual([]);
	});

	it('still runs the consumer pointerdown and pointerup handlers', async () => {
		const onpointerdown = vi.fn();
		const onpointerup = vi.fn();
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true, handleProps: { onpointerdown, onpointerup } }
		});

		await pressHandle(container, 'Camera');
		await releaseHandle(container, 'Camera');

		expect(onpointerdown).toHaveBeenCalledTimes(1);
		expect(onpointerup).toHaveBeenCalledTimes(1);
	});

	it('still arms the pane when the consumer passes a pointerdown handler', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true, handleProps: { onpointerdown: vi.fn() } }
		});

		await pressHandle(container, 'Camera');

		expect(draggableWrappers(container)).toEqual([wrapperOf(container, ids.mycam)]);
	});
});

describe('SplitView drag payload', () => {
	it('carries the dragged pane id as text', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		const dropped = sampleDuring('drop', (event) =>
			(event as DragEvent).dataTransfer?.getData('text/plain')
		);

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, CENTER);

		expect(dropped.value).toBe(ids.mycam);
	});

	it('allows only a move', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		const dropped = sampleDuring(
			'drop',
			(event) => (event as DragEvent).dataTransfer?.effectAllowed
		);

		await dragPaneOnto(container, 'Camera', ids.mytimeseries, CENTER);

		expect(dropped.value).toBe('move');
	});

	it('starts no pane drag for a drag that begins on an element inside the pane', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		await pressHandle(container, 'Camera');
		const dataTransfer = new DataTransfer();

		dispatchDrag('dragstart', paneElement(container, ids.mycam), { dataTransfer });
		await tick();

		expect(dataTransfer.getData('text/plain')).toBe('');
		expect(overlayPointerEvents(container)).toEqual(NO_POINTER_EVENTS);
	});
});

describe('SplitView drag and drop: a dragTrigger on a whole header', () => {
	it('moves the pane beside the target when dragged from the header text', async () => {
		const { container, component } = render(PaneControlsSplitView, {
			props: { variant: 'header' }
		});
		const target = paneElement(container, ids.mytimeseries);

		await userEvent.dragAndDrop(headerTextOf(container, 'Camera'), target, {
			targetPosition: pointWithin(target, RIGHT)
		});

		await expect.poll(() => component.getLayout()).toEqual(CAMERA_RIGHT_OF_TIME_SERIES);
	});

	it('makes only the pressed header pane draggable', async () => {
		const { container } = render(PaneControlsSplitView, { props: { variant: 'header' } });

		await pressElement(headerTextOf(container, 'Time series'));

		expect(draggableWrappers(container)).toEqual([wrapperOf(container, ids.mytimeseries)]);
	});
});

describe('SplitView drag and drop: native controls inside a dragTrigger', () => {
	it.each(NATIVE_CONTROLS)('arms no pane when a press starts on $selector', async ({ name }) => {
		const { container } = render(PaneControlsSplitView, { props: { variant: 'header' } });

		await pressElement(controlOf(container, 'Camera', name));

		expect(draggableWrappers(container)).toEqual([]);
	});

	it.each(CONTROLS_THAT_DRAG_THE_PANE_WHEN_ARMED)(
		'moves no pane when $selector is dragged onto another pane',
		async ({ name }) => {
			const { container, component } = render(PaneControlsSplitView, {
				props: { variant: 'header' }
			});
			const target = paneElement(container, ids.mytimeseries);

			await userEvent.dragAndDrop(controlOf(container, 'Camera', name), target, {
				targetPosition: pointWithin(target, RIGHT)
			});
			await nextFrames();

			expect(component.getLayout()).toEqual(layoutRoot);
		}
	);

	it.each(NATIVE_CONTROLS)(
		'still delivers a click on $selector to its handler',
		async ({ name }) => {
			const onControlClick = vi.fn();
			const { container } = render(PaneControlsSplitView, {
				props: { variant: 'header', onControlClick }
			});

			await userEvent.click(controlOf(container, 'Camera', name));

			expect(onControlClick).toHaveBeenCalledExactlyOnceWith(name);
		}
	);
});

describe('SplitView drag and drop: a dragIgnore element inside a dragTrigger', () => {
	it('arms no pane when a press starts on it', async () => {
		const { container } = render(PaneControlsSplitView, { props: { variant: 'header' } });

		await pressElement(ignoredElementOf(container, 'Camera'));

		expect(draggableWrappers(container)).toEqual([]);
	});

	it('moves no pane when it is dragged onto another pane', async () => {
		const { container, component } = render(PaneControlsSplitView, {
			props: { variant: 'header' }
		});
		const target = paneElement(container, ids.mytimeseries);

		await userEvent.dragAndDrop(ignoredElementOf(container, 'Camera'), target, {
			targetPosition: pointWithin(target, RIGHT)
		});
		await nextFrames();

		expect(component.getLayout()).toEqual(layoutRoot);
	});
});
