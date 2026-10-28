import { afterEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';
import type { Locator } from 'vitest/browser';

import { ids, layoutRoot } from '../../../../test/layouts.ts';
import PanePartsPanes from '../../../../test/fixtures/PanePartsPanes.svelte';
import StackPanes from '../../../../test/fixtures/StackPanes.svelte';

const DRAG_PX = 40;
const THRESHOLD_PX = 4.1;
const HOLD_TO_DRAG_MS = 250;
const MOUSE_POINTER_ID = 1;
const PRESS_X_PX = 10;
const PRESS_Y_PX = 10;
const JITTER_PX = 1;
const TIME_SERIES_LEFT = { x: '10%', y: '50%' } as const;

const pane = (id: string, label: string) => ({ type: 'pane', id, data: { label } });
const CAMERA_SWAPPED_WITH_TIME_SERIES = {
	type: 'split',
	id: ids.rootSplit,
	direction: 'column',
	ratio: 0.3,
	first: pane(ids.mytimeseries, 'Time series'),
	second: {
		type: 'split',
		id: ids.innerSplit,
		direction: 'row',
		ratio: 0.6,
		first: pane(ids.mycam, 'Camera'),
		second: {
			type: 'split',
			id: ids.lowerSplit,
			direction: 'column',
			ratio: 0.5,
			first: pane(ids.mysensor, 'Sensor stat'),
			second: pane(ids.mycam2, 'Camera 2')
		}
	}
};

const cameraHeader = () => page.getByPaneHeader('Camera');
const cameraGrip = () => page.getByRole('button', { name: 'Move Camera', exact: true });
const holdableButton = () => cameraHeader().getByRole('button', { name: 'Remove' });
const docsLink = () => cameraHeader().getByRole('link', { name: 'Docs' });
const timeSeries = () => page.getByPane(ids.mytimeseries);

const pressAt = async (locator: Locator, xPx: number) => {
	await commands.mouseMove(locator.selector, { x: xPx, y: PRESS_Y_PX });
	await commands.mouseDown();
};

const startDragOntoTimeSeries = async () => {
	await pressAt(cameraHeader(), PRESS_X_PX);
	await commands.mouseMove(timeSeries().selector, TIME_SERIES_LEFT);
	await expect.element(page.getByDropIndicator()).toBeInTheDocument();
};

afterEach(() => {
	vi.useRealTimers();
});

describe('pointer drag start threshold', () => {
	it('starts no drag when the pointer moves 3px', async () => {
		render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await pressAt(cameraHeader(), PRESS_X_PX);
		await commands.mouseMove(cameraHeader().selector, { x: PRESS_X_PX + 3, y: PRESS_Y_PX });
		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
	});

	it('starts a drag when the pointer moves 4px', async () => {
		render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await pressAt(cameraHeader(), PRESS_X_PX);
		await commands.mouseMove(cameraHeader().selector, {
			x: PRESS_X_PX + THRESHOLD_PX,
			y: PRESS_Y_PX
		});

		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();
		await commands.mouseUp();
	});
});

describe('pointer drag ghost', () => {
	it('shows the label of the dragged pane', async () => {
		render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await pressAt(cameraHeader(), PRESS_X_PX);
		await commands.mouseMove(cameraHeader().selector, { x: PRESS_X_PX + DRAG_PX, y: PRESS_Y_PX });

		await expect.element(page.getByDragGhost()).toHaveTextContent(/^\s*Camera\s*$/);
		await commands.mouseUp();
	});

	it('shows the joined labels of a dragged stack', async () => {
		render(StackPanes, { hasTriggers: true, dragTarget: 'stack' });
		const grip = page.getByRole('button', { name: 'Move Camera A', exact: true });

		await pressAt(grip, PRESS_X_PX);
		await commands.mouseMove(grip.selector, { x: PRESS_X_PX + DRAG_PX, y: PRESS_Y_PX });

		await expect
			.element(page.getByDragGhost())
			.toHaveTextContent('Camera A, Camera B, and Camera C');
		await commands.mouseUp();
	});
});

describe('pointer drag cancellation', () => {
	it('keeps Escape from reaching an enclosing handler while a drag is live', async () => {
		render(PanePartsPanes, { props: { variant: 'drag-only' } });
		const keysReceived: string[] = [];
		const controller = new AbortController();
		onTestFinished(() => controller.abort());
		document.addEventListener('keydown', (event) => keysReceived.push(event.key), {
			signal: controller.signal
		});
		await startDragOntoTimeSeries();

		await userEvent.keyboard('{Escape}');
		await commands.mouseUp();

		expect(keysReceived).toEqual([]);
	});

	it('leaves the layout unchanged when the browser cancels the pointer', async () => {
		const { component } = render(PanePartsPanes, { props: { variant: 'drag-only' } });
		await commands.touchStart(cameraHeader().selector);
		await commands.touchMove(cameraHeader().selector, { x: '50%', y: PRESS_Y_PX + DRAG_PX });
		await commands.touchMove(timeSeries().selector, TIME_SERIES_LEFT);
		await expect.element(page.getByDropIndicator()).toBeInTheDocument();

		await commands.touchCancel();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		expect(component.getLayout()).toEqual(layoutRoot);
	});

	it('leaves the layout unchanged when the window loses focus', async () => {
		const { component } = render(PanePartsPanes, { props: { variant: 'drag-only' } });
		await startDragOntoTimeSeries();

		window.dispatchEvent(new Event('blur'));
		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		expect(component.getLayout()).toEqual(layoutRoot);
	});

	it('leaves the layout unchanged when the pointer is released outside every pane', async () => {
		const { component } = render(PanePartsPanes, { props: { variant: 'drag-only' } });
		await startDragOntoTimeSeries();

		window.dispatchEvent(
			new PointerEvent('pointerup', {
				pointerId: MOUSE_POINTER_ID,
				clientX: window.innerWidth - 1,
				clientY: window.innerHeight - 1
			})
		);
		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		expect(component.getLayout()).toEqual(layoutRoot);
	});
});

describe('pointer drag press rules', () => {
	it('starts no drag from a right-button press', async () => {
		render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await commands.mouseMove(cameraHeader().selector, { x: PRESS_X_PX, y: PRESS_Y_PX });
		await commands.mouseDown('right');
		await commands.mouseMove(cameraHeader().selector, { x: PRESS_X_PX + DRAG_PX, y: PRESS_Y_PX });
		await commands.mouseUp('right');

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
	});

	it('starts a drag from a control that moved 1px before the hold ended', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'header' } });
		const button = holdableButton();

		await pressAt(button, PRESS_X_PX);
		await commands.mouseMove(button.selector, { x: PRESS_X_PX + JITTER_PX, y: PRESS_Y_PX });
		vi.advanceTimersByTime(HOLD_TO_DRAG_MS);
		await commands.mouseMove(button.selector, { x: PRESS_X_PX + DRAG_PX, y: PRESS_Y_PX });

		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();
		await commands.mouseUp();
	});

	it('starts no drag from a control that moved 4px before the hold ended', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'header' } });
		const button = holdableButton();

		await pressAt(button, PRESS_X_PX);
		await commands.mouseMove(button.selector, { x: PRESS_X_PX + THRESHOLD_PX, y: PRESS_Y_PX });
		vi.advanceTimersByTime(HOLD_TO_DRAG_MS);
		await commands.mouseMove(button.selector, { x: PRESS_X_PX + DRAG_PX, y: PRESS_Y_PX });
		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
	});

	it('prevents the browser drag of a link inside a trigger during a press', async () => {
		render(PanePartsPanes, { props: { variant: 'header' } });
		const dragstart = new DragEvent('dragstart', { bubbles: true, cancelable: true });

		await commands.mouseMove(docsLink().selector);
		await commands.mouseDown();
		docsLink().element().dispatchEvent(dragstart);
		await commands.mouseUp();

		expect(dragstart.defaultPrevented).toBe(true);
	});

	it('leaves the browser drag of a link alone once the press ends', async () => {
		render(PanePartsPanes, { props: { variant: 'header' } });
		const dragstart = new DragEvent('dragstart', { bubbles: true, cancelable: true });

		await commands.mouseMove(docsLink().selector);
		await commands.mouseDown();
		await commands.mouseUp();
		docsLink().element().dispatchEvent(dragstart);

		expect(dragstart.defaultPrevented).toBe(false);
	});
});

describe('pointer drag with real input', () => {
	it('does not toggle move mode with the click after a real drag from a grip is canceled over it', async () => {
		render(PanePartsPanes, { props: { variant: 'header' } });
		const grip = cameraGrip();

		await commands.mouseMove(grip.selector);
		await commands.mouseDown();
		await commands.mouseMove(grip.selector, { x: '50%', y: PRESS_Y_PX + DRAG_PX });
		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();
		await userEvent.keyboard('{Escape}');
		await commands.mouseMove(grip.selector);
		await commands.mouseUp();

		await expect.element(grip).toHaveAttribute('aria-pressed', 'false');
		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
	});

	it('moves a pane with a real touch drag', async () => {
		const { component } = render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await commands.touchStart(cameraHeader().selector);
		await commands.touchMove(cameraHeader().selector, { x: '50%', y: PRESS_Y_PX + DRAG_PX });
		await commands.touchMove(timeSeries().selector);
		await commands.touchEnd();

		await expect.poll(() => component.getLayout()).toEqual(CAMERA_SWAPPED_WITH_TIME_SERIES);
	});
});

describe('pointer drag touch-action', () => {
	it('is none on the child of a drag trigger while reorderable', async () => {
		render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await expect.element(cameraHeader()).toHaveStyle({ touchAction: 'none' });
	});

	it('is auto on the child of a drag trigger when not reorderable', async () => {
		render(PanePartsPanes, { props: { variant: 'drag-only', reorderable: false } });

		await expect.element(cameraHeader()).toHaveStyle({ touchAction: 'auto' });
	});

	it('is none on the tab list while reorderable', async () => {
		render(StackPanes, {});

		await expect.element(page.getByRole('tablist').first()).toHaveStyle({ touchAction: 'none' });
	});

	it('is auto on the tab list when not reorderable', async () => {
		render(StackPanes, { reorderable: false });

		await expect.element(page.getByRole('tablist').first()).toHaveStyle({ touchAction: 'auto' });
	});
});
