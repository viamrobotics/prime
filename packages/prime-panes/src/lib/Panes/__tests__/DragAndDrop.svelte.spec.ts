import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';
import type { Locator } from 'vitest/browser';

import { expectSplit, ids, layoutRoot, pane } from '../../../../test/layouts.ts';
import ControlledPanes from '../../../../test/fixtures/ControlledPanes.svelte';
import PanePartsPanes from '../../../../test/fixtures/PanePartsPanes.svelte';

import type { Point } from '../../../../test/input-commands.ts';
import type { LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../../../test/layouts.ts';

type Received = (LayoutNode<PaneData> | undefined)[];

const HELD_PRESS_MS = 300;
const HOLD_TO_DRAG_MS = 250;
const TEXT_FIELD_HOLD_MS = 1000;
const SEPARATOR_REACH_PX = 2;
const DRAG_PX = 40;
const GRIP_SIZE_PX = 24;

const CENTER = { x: '50%', y: '50%' } as const;
const LEFT = { x: '10%', y: '50%' } as const;
const RIGHT = { x: '90%', y: '50%' } as const;
const TOP = { x: '50%', y: '10%' } as const;
const BOTTOM = { x: '50%', y: '90%' } as const;

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

const grip = (label: string) => page.getByRole('button', { name: `Move ${label}`, exact: true });
const cameraHeader = () => page.getByPaneHeader('Camera');
const cameraControl = (role: 'button' | 'textbox', name: string) =>
	cameraHeader().getByRole(role, { name, exact: true });
const holdableButton = () => cameraControl('button', 'Remove');
const noteField = () => cameraControl('textbox', 'Note for Camera');
const timeSeries = () => page.getByPane(ids.mytimeseries);
const paneLabels = () =>
	page
		.getByRole('region')
		.elements()
		.map((element) => element.getAttribute('aria-label'));

const hover = (target: Locator, at: Point = CENTER) => commands.mouseMove(target.selector, at);

const press = async (source: Locator) => {
	await hover(source);
	await commands.mouseDown();
};

const dragOnto = async (source: Locator, target: Locator, at: Point) => {
	await press(source);
	await commands.mouseMove(target.selector, at);
};

const dropOnto = async (source: Locator, target: Locator, at: Point) => {
	await dragOnto(source, target, at);
	await commands.mouseUp();
};

afterEach(() => {
	vi.useRealTimers();
});

describe('Panes drag and drop: dropping on a pane edge', () => {
	it('moves the dragged pane beside the target in a new row split, and its old sibling takes the old split place', async () => {
		const { component } = render(PanePartsPanes, { props: { variant: 'header' } });

		await dropOnto(grip('Camera'), timeSeries(), RIGHT);

		await expect.poll(() => component.getLayout()).toEqual(CAMERA_RIGHT_OF_TIME_SERIES);
	});

	it('gives the new split an id no other node has', async () => {
		const received: Received = [];
		render(ControlledPanes, { props: { accept: true, received, handles: true } });

		await dropOnto(grip('Camera'), timeSeries(), RIGHT);

		await expect.poll(() => received.length).toBe(1);
		const created = expectSplit(expectSplit(received[0]).first).id;
		expect(created).toMatch(/^[0-9a-f-]{32,36}$/);
		expect(Object.values(ids)).not.toContain(created);
	});
});

describe('Panes drag and drop: dropping on a pane center', () => {
	it('swaps the dragged pane with the target', async () => {
		const received: Received = [];
		render(ControlledPanes, { props: { accept: true, received, handles: true } });

		await dropOnto(grip('Camera'), timeSeries(), CENTER);

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
});

describe('Panes drag and drop: a binding that rejects the change', () => {
	it('keeps the rendered pane order when a drop is rejected', async () => {
		const received: Received = [];
		render(ControlledPanes, { props: { accept: false, received, handles: true } });

		await dropOnto(grip('Camera'), timeSeries(), CENTER);

		await expect.poll(() => received.length).toBe(1);
		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		expect(paneLabels()).toEqual(['Camera', 'Time series', 'Sensor stat', 'Camera 2']);
	});

	it('clears the drag state when a drop is rejected', async () => {
		const received: Received = [];
		render(ControlledPanes, { props: { accept: false, received, handles: true } });

		await dropOnto(grip('Camera'), timeSeries(), RIGHT);

		await expect.poll(() => received.length).toBe(1);
		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(timeSeries().getByDropOverlay()).toHaveStyle({ pointerEvents: 'none' });
	});
});

describe('Panes drag and drop: reorderable is false', () => {
	it('starts no drag from a handle', async () => {
		const received: Received = [];
		render(ControlledPanes, {
			props: { accept: true, received, handles: true, reorderable: false }
		});

		await dragOnto(grip('Camera'), timeSeries(), CENTER);

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(page.getByDropIndicator()).not.toBeInTheDocument();
		await commands.mouseUp();
		expect(received).toEqual([]);
	});

	it('arms no pane when a pointer press reaches a handle', async () => {
		render(ControlledPanes, { props: { accept: true, handles: true, reorderable: false } });

		await press(grip('Camera'));

		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
		await commands.mouseUp();
	});

	it('writes a keyboard resize back', async () => {
		const received: Received = [];
		render(ControlledPanes, {
			props: { accept: true, received, handles: true, reorderable: false }
		});
		page.getByRole('separator').first().element().focus();

		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => expectSplit(received.at(-1)).ratio).toBe(0.31);
	});
});

describe('Panes drag and drop: the indicator', () => {
	it.each([
		{ region: 'left', at: LEFT, left: 0, top: 0, width: 0.5, height: 1 },
		{ region: 'right', at: RIGHT, left: 0.5, top: 0, width: 0.5, height: 1 },
		{ region: 'top', at: TOP, left: 0, top: 0, width: 1, height: 0.5 },
		{ region: 'bottom', at: BOTTOM, left: 0, top: 0.5, width: 1, height: 0.5 },
		{ region: 'center', at: CENTER, left: 0, top: 0, width: 1, height: 1 }
	])(
		'covers the $region part of the target pane while the pointer is over it',
		async ({ region, at, left, top, width, height }) => {
			render(ControlledPanes, { props: { accept: true, handles: true } });

			await dragOnto(grip('Camera'), timeSeries(), at);

			const indicator = timeSeries().getByDropIndicator();
			await expect.element(indicator).toHaveAttribute('data-drop-indicator', region);
			const rect = indicator.element().getBoundingClientRect();
			const paneRect = timeSeries().element().getBoundingClientRect();
			expect((rect.left - paneRect.left) / paneRect.width).toBeCloseTo(left, 2);
			expect((rect.top - paneRect.top) / paneRect.height).toBeCloseTo(top, 2);
			expect(rect.width / paneRect.width).toBeCloseTo(width, 2);
			expect(rect.height / paneRect.height).toBeCloseTo(height, 2);
			await commands.mouseUp();
		}
	);

	it('does not take pointer events itself', async () => {
		render(ControlledPanes, { props: { accept: true, handles: true } });

		await dragOnto(grip('Camera'), timeSeries(), RIGHT);

		await expect.element(page.getByDropIndicator()).toHaveStyle({ pointerEvents: 'none' });
		await commands.mouseUp();
	});
});

describe('Panes drag and drop: a drag that never reaches a pane', () => {
	it('stops every overlay taking pointer events after a drag ends outside every pane', async () => {
		render(ControlledPanes, { props: { accept: true, handles: true } });
		await dragOnto(grip('Camera'), timeSeries(), CENTER);
		await expect.element(timeSeries().getByDropOverlay()).toHaveStyle({ pointerEvents: 'auto' });

		await userEvent.hover(page.getByTestId('owner'));
		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(timeSeries().getByDropOverlay()).toHaveStyle({ pointerEvents: 'none' });
	});

	it('stops every overlay taking pointer events when the drag is canceled with Escape', async () => {
		render(ControlledPanes, { props: { accept: true, handles: true } });
		await dragOnto(grip('Camera'), timeSeries(), RIGHT);
		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();

		await userEvent.keyboard('{Escape}');

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(timeSeries().getByDropOverlay()).toHaveStyle({ pointerEvents: 'none' });
		await commands.mouseUp();
	});

	it('hides the indicator when the drag is canceled with Escape', async () => {
		render(ControlledPanes, { props: { accept: true, handles: true } });
		await dragOnto(grip('Camera'), timeSeries(), RIGHT);
		await expect.element(page.getByDropIndicator()).toHaveAttribute('data-drop-indicator', 'right');

		await userEvent.keyboard('{Escape}');

		await expect.element(page.getByDropIndicator()).not.toBeInTheDocument();
		await commands.mouseUp();
	});

	it('changes nothing when the drag is canceled with Escape', async () => {
		const received: Received = [];
		const { component } = render(ControlledPanes, {
			props: { accept: true, received, handles: true }
		});
		await dragOnto(grip('Camera'), timeSeries(), RIGHT);
		await expect.element(page.getByDropIndicator()).toBeInTheDocument();

		await userEvent.keyboard('{Escape}');
		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
	});
});

describe('Panes drag and drop: the view stops being reorderable mid-drag', () => {
	it('ignores a drop that lands after the view stopped being reorderable', async () => {
		const received: Received = [];
		const { rerender } = render(ControlledPanes, {
			props: { accept: true, received, handles: true }
		});
		await dragOnto(grip('Camera'), timeSeries(), RIGHT);
		await expect.element(page.getByDropIndicator()).toBeInTheDocument();
		await rerender({ reorderable: false });

		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		expect(received).toEqual([]);
	});

	it('starts no drag once the view stopped being reorderable with a handle pressed', async () => {
		const { rerender } = render(ControlledPanes, {
			props: { accept: true, handles: true }
		});
		await press(grip('Camera'));
		await rerender({ reorderable: false });

		await commands.mouseMove(grip('Camera').selector, { x: GRIP_SIZE_PX / 2, y: DRAG_PX });

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(timeSeries().getByDropOverlay()).toHaveStyle({ pointerEvents: 'none' });
		await commands.mouseUp();
	});
});

describe('Panes drag and drop: a drag this view did not start', () => {
	it('shows no indicator and changes nothing for a drag that started in another Panes', async () => {
		const received: Received = [];
		const other: Received = [];
		render(ControlledPanes, { props: { accept: true, received, handles: true } });
		render(ControlledPanes, { props: { accept: true, received: other, handles: true } });

		await dragOnto(grip('Camera').first(), page.getByPane(ids.mytimeseries).nth(1), RIGHT);

		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();
		await expect.element(page.getByDropIndicator()).not.toBeInTheDocument();
		await commands.mouseUp();
		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		expect(other).toEqual([]);
		expect(received).toEqual([]);
	});
});

describe('Panes drag and drop: dropping next to a separator', () => {
	it('splits above the pane below the separator for a drop just below the separator', async () => {
		const received: Received = [];
		render(ControlledPanes, { props: { accept: true, received, handles: true } });

		await dropOnto(grip('Camera'), timeSeries(), { x: '50%', y: SEPARATOR_REACH_PX });

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
		render(ControlledPanes, { props: { accept: true, received, handles: true } });

		await dropOnto(grip('Time series'), page.getByPane(ids.mycam), { x: '50%', y: '99%' });

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

describe('Panes.DragTrigger: a pressed handle', () => {
	it('arms only the pane of the pressed handle', async () => {
		render(ControlledPanes, { props: { accept: true, handles: true } });

		await press(grip('Time series'));

		await expect.element(page.getByDragArmedPane()).toBeInTheDocument();
		await expect.element(timeSeries()).toHaveAttribute('data-drag-armed');
		await commands.mouseUp();
	});

	it('arms no pane again once the pressed handle is released', async () => {
		render(ControlledPanes, { props: { accept: true, handles: true } });
		await press(grip('Time series'));
		await expect.element(page.getByDragArmedPane()).toBeInTheDocument();

		await commands.mouseUp();

		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
	});

	it('arms no pane once the pointer is released just off the pressed handle without a drag', async () => {
		render(ControlledPanes, { props: { accept: true, handles: true } });
		await commands.mouseMove(grip('Camera').selector, { x: 1, y: GRIP_SIZE_PX / 2 });
		await commands.mouseDown();
		await expect.element(page.getByDragArmedPane()).toBeInTheDocument();

		await commands.mouseMove(grip('Camera').selector, { x: -2, y: GRIP_SIZE_PX / 2 });
		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
	});

	it('still runs the consumer pointerdown and pointerup handlers', async () => {
		const onpointerdown = vi.fn();
		const onpointerup = vi.fn();
		render(ControlledPanes, {
			props: { accept: true, handles: true, handleProps: { onpointerdown, onpointerup } }
		});

		await userEvent.click(grip('Camera'));

		expect(onpointerdown).toHaveBeenCalledTimes(1);
		expect(onpointerup).toHaveBeenCalledTimes(1);
	});

	it('still arms the pane when the consumer passes a pointerdown handler', async () => {
		render(ControlledPanes, {
			props: { accept: true, handles: true, handleProps: { onpointerdown: vi.fn() } }
		});

		await press(grip('Camera'));

		await expect.element(page.getByDragArmedPane()).toBeInTheDocument();
		await commands.mouseUp();
	});
});

describe('Panes drag source', () => {
	it('starts no pane drag for a press on pane content outside every drag trigger', async () => {
		render(ControlledPanes, { props: { accept: true, handles: true } });
		const content = page.getByRole('region', { name: 'Camera', exact: true });

		await commands.mouseMove(content.selector, { x: '30%', y: '50%' });
		await commands.mouseDown();
		await commands.mouseMove(content.selector, { x: '60%', y: '50%' });

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(page.getByDropOverlay().first()).toHaveStyle({ pointerEvents: 'none' });
		await commands.mouseUp();
	});
});

describe('Panes.DragTrigger: a press that starts on a control', () => {
	it('arms no pane at 249ms into a press on a button', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'header' } });
		await press(holdableButton());

		vi.advanceTimersByTime(HOLD_TO_DRAG_MS - 1);

		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
		await commands.mouseUp();
	});

	it('arms the pane once a press on a button has lasted 250ms', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'header' } });
		await press(holdableButton());

		vi.advanceTimersByTime(HOLD_TO_DRAG_MS);

		await expect.element(page.getByDragArmedPane()).toBeInTheDocument();
		await commands.mouseUp();
	});

	it('starts no drag when the pointer moves 249ms into a press on a button', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'header' } });
		await press(holdableButton());

		vi.advanceTimersByTime(HOLD_TO_DRAG_MS - 1);
		await commands.mouseMove(holdableButton().selector, { x: DRAG_PX, y: '50%' });

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await commands.mouseUp();
	});

	it('starts a drag when the pointer moves 250ms into a press on a button', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'header' } });
		await press(holdableButton());

		vi.advanceTimersByTime(HOLD_TO_DRAG_MS);
		await commands.mouseMove(holdableButton().selector, { x: DRAG_PX, y: '50%' });

		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();
		await commands.mouseUp();
	});

	it('arms no pane when the press is released before the hold ends', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'header' } });
		await press(holdableButton());
		vi.advanceTimersByTime(100);

		await commands.mouseUp();
		vi.advanceTimersByTime(TEXT_FIELD_HOLD_MS);

		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
	});

	it('arms no pane when the press is canceled before the hold ends', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'header' } });
		await commands.touchStart(holdableButton().selector);
		vi.advanceTimersByTime(100);

		await commands.touchCancel();
		vi.advanceTimersByTime(TEXT_FIELD_HOLD_MS);

		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
	});

	it('disarms the pane when the press is canceled after the hold ends', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'header' } });
		await commands.touchStart(holdableButton().selector);
		vi.advanceTimersByTime(HOLD_TO_DRAG_MS);
		await expect.element(page.getByDragArmedPane()).toBeInTheDocument();

		await commands.touchCancel();

		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
	});

	it('arms no pane when the drag trigger unmounts during the hold', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'removable' } });
		await press(cameraHeader().getByRole('button', { name: 'Hold' }));
		page.getByRole('button', { name: 'Remove header of Camera', exact: true }).element().focus();
		await userEvent.keyboard('{Enter}');
		await expect.element(cameraHeader()).not.toBeInTheDocument();

		vi.advanceTimersByTime(TEXT_FIELD_HOLD_MS);

		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
		await commands.mouseUp();
	});

	it('still delivers a quick click on a control to its handler', async () => {
		const onControlClick = vi.fn();
		render(PanePartsPanes, { props: { variant: 'header', onControlClick } });

		await userEvent.click(holdableButton());

		expect(onControlClick).toHaveBeenCalledExactlyOnceWith('button');
	});
});

describe('Panes.DragTrigger: the click after a held press', () => {
	it('does not enter move mode when a held move button is released', async () => {
		render(PanePartsPanes, { props: { variant: 'header' } });

		await userEvent.click(grip('Camera'), { delay: HELD_PRESS_MS });

		await expect.element(grip('Camera')).toHaveAttribute('aria-pressed', 'false');
	});

	it('does not run a consumer click handler when a held control is released', async () => {
		const onControlClick = vi.fn();
		render(PanePartsPanes, { props: { variant: 'header', onControlClick } });

		await userEvent.click(holdableButton(), { delay: HELD_PRESS_MS });

		expect(onControlClick).not.toHaveBeenCalled();
	});

	it('still enters move mode with Enter after a held move button is released', async () => {
		render(PanePartsPanes, { props: { variant: 'header' } });
		await userEvent.click(grip('Camera'), { delay: HELD_PRESS_MS });
		await expect.element(grip('Camera')).toHaveAttribute('aria-pressed', 'false');

		await userEvent.keyboard('{Enter}');

		await expect.element(grip('Camera')).toHaveAttribute('aria-pressed', 'true');
	});

	it('lets a click through once the task that released the drag has ended', async () => {
		render(PanePartsPanes, { props: { variant: 'header' } });
		await press(grip('Camera'));
		await commands.mouseMove(page.getByPane(ids.mycam).selector, CENTER);
		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();
		await commands.mouseUp();
		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(grip('Camera')).toHaveFocus();

		await userEvent.keyboard('{Enter}');

		await expect.element(grip('Camera')).toHaveAttribute('aria-pressed', 'true');
	});

	it('delivers a click on a text field that was held', async () => {
		const onControlClick = vi.fn();
		render(PanePartsPanes, { props: { variant: 'header', onControlClick } });

		await userEvent.click(noteField(), { delay: HELD_PRESS_MS });

		expect(onControlClick).toHaveBeenCalledExactlyOnceWith('input');
	});
});

describe('Panes.DragTrigger: a press that starts on a text field', () => {
	it('arms no pane and starts no drag when the pointer moves after a 1000ms press on a text field', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(PanePartsPanes, { props: { variant: 'header' } });
		await press(noteField());

		vi.advanceTimersByTime(TEXT_FIELD_HOLD_MS);
		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
		await commands.mouseMove(noteField().selector, { x: DRAG_PX, y: '50%' });

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await commands.mouseUp();
	});
});

describe('Panes dragIgnore: an element inside a Panes.DragTrigger', () => {
	it('arms no pane and moves no pane when it is dragged onto another pane', async () => {
		const { component } = render(PanePartsPanes, { props: { variant: 'header' } });

		await press(page.getByLabelText('Plot of Camera', { exact: true }));
		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
		await commands.mouseMove(timeSeries().selector, RIGHT);

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await commands.mouseUp();
		expect(component.getLayout()).toEqual(layoutRoot);
	});
});

describe('Panes: the armed indicator', () => {
	it('stays through the drag start', async () => {
		render(PanePartsPanes, { props: { variant: 'header' } });

		await dragOnto(grip('Camera'), timeSeries(), CENTER);

		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();
		await expect.element(page.getByDragArmedPane()).toBeInTheDocument();
		await commands.mouseUp();
	});

	it('clears on the drop that ends the drag', async () => {
		render(PanePartsPanes, { props: { variant: 'header' } });

		await dropOnto(grip('Camera'), timeSeries(), CENTER);

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(page.getByDragArmedPane()).not.toBeInTheDocument();
	});
});
