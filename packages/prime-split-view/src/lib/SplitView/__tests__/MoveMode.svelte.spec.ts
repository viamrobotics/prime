import { tick } from 'svelte';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { ids, layoutRoot } from '../../__tests__/layout-fixture.ts';
import BoundSplitView from './BoundSplitView.svelte';
import ControlledSplitView from './ControlledSplitView.svelte';
import EmptyingSplitView from './EmptyingSplitView.svelte';
import PaneControlsSplitView from './PaneControlsSplitView.svelte';
import SinglePaneSplitView from './SinglePaneSplitView.svelte';

import type { DropRegion } from '../../drop-region.ts';
import type { LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../__tests__/layout-fixture.ts';

type Received = (LayoutNode<PaneData> | undefined)[];

const WIDE_VIEWPORT = { width: 1000, height: 1400 };
const DEFAULT_VIEWPORT = { width: 414, height: 896 };
const MIN_DESTINATION_SIZE_PX = 24;
const DESTINATION_COUNT = 3;

const STARTED_CAMERA =
	'Moving Camera. Choose a destination with the pointer or arrow keys, or press Escape. The arrow keys move between sides and panes, Tab moves between destinations, Enter places the pane, and Escape cancels.';

const REGION_POINTS = {
	left: { x: 0.1, y: 0.5 },
	right: { x: 0.9, y: 0.5 },
	top: { x: 0.5, y: 0.1 },
	bottom: { x: 0.5, y: 0.9 },
	center: { x: 0.5, y: 0.5 }
} as const satisfies Record<DropRegion, { x: number; y: number }>;

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

const CAMERA_SWAPPED_WITH_TIME_SERIES = {
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
};

const handleOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[aria-label="Move ${label}"]`)!;
const menuButtonOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[aria-label="Menu for ${label}"]`)!;
const moveDivOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[data-move-div="${label}"]`)!;
const buttonNamed = (container: Element, name: string) =>
	container.querySelector<HTMLElement>(`[data-move-button][aria-label="${name}"]`)!;
const destinationsIn = (element: Element) => [
	...element.querySelectorAll<HTMLElement>('[data-move-target]')
];
const paneElement = (container: Element, id: string) =>
	container.querySelector<HTMLElement>(`[data-pane-id="${id}"]`)!;
const wrapperOf = (container: Element, id: string) => paneElement(container, id).parentElement!;
const destinationOf = (container: Element, id: string) =>
	wrapperOf(container, id).parentElement!.querySelector<HTMLElement>('[data-move-target]')!;
const swapButtonOf = (container: Element, id: string) =>
	destinationOf(container, id).querySelector<HTMLElement>('[data-move-button="center"]')!;
const boxOf = (element: Element) => {
	const { left, top, width, height } = element.getBoundingClientRect();
	return { left, top, width, height };
};
const pressedStates = (container: Element) =>
	[...container.querySelectorAll<HTMLButtonElement>('button[aria-label^="Move "]')].map((handle) =>
		handle.getAttribute('aria-pressed')
	);
const announcementIn = (container: Element) =>
	container.querySelector('[role="status"]')?.textContent;
const nextFrames = () =>
	new Promise<void>((resolve) =>
		requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
	);
const outlineColorOf = (utility: string) => {
	const probe = document.createElement('div');
	probe.className = utility;
	document.body.append(probe);
	const { outlineColor } = getComputedStyle(probe);
	probe.remove();
	return outlineColor;
};
const pointWithin = (element: HTMLElement) => {
	const rect = element.getBoundingClientRect();
	return { x: rect.width * 0.5, y: rect.height * 0.5 };
};

const clickRegion = (destination: HTMLElement, region: DropRegion) => {
	const { width, height } = destination.getBoundingClientRect();
	const point = REGION_POINTS[region];
	return userEvent.click(destination, { position: { x: width * point.x, y: height * point.y } });
};

const tabThrough = async (count: number) => {
	const visited: (Element | null)[] = [];
	for (let step = 0; step < count; step += 1) {
		await userEvent.keyboard('{Tab}');
		visited.push(document.activeElement);
	}
	return visited;
};

const startMoveWithKeyboard = async (container: Element, label: string) => {
	handleOf(container, label).focus();
	await userEvent.keyboard('{Enter}');
};

const startMoveOnFirstDestination = async (container: Element, label: string) => {
	await startMoveWithKeyboard(container, label);
	await userEvent.keyboard('{Tab}{Tab}');
};

const startMoveWithPointer = (container: Element, label: string) =>
	userEvent.click(handleOf(container, label));

const startMoveFromMenu = async (container: Element, label: string) => {
	await userEvent.click(menuButtonOf(container, label));
	await userEvent.click(handleOf(container, label));
};

beforeAll(() => page.viewport(WIDE_VIEWPORT.width, WIDE_VIEWPORT.height));

afterAll(() => page.viewport(DEFAULT_VIEWPORT.width, DEFAULT_VIEWPORT.height));

describe('SplitView move mode: keyboard', () => {
	it('places the pane beside the destination, giving the layout an edge drop makes', async () => {
		const { container, component } = render(BoundSplitView, { props: { handles: true } });

		await startMoveOnFirstDestination(container, 'Camera');
		await userEvent.keyboard('{ArrowRight}');
		expect(document.activeElement, 'ArrowRight did not select the right-of placement').toBe(
			buttonNamed(container, 'Place Camera right of Time series')
		);
		await userEvent.keyboard('{Enter}');

		await expect.poll(() => component.getLayout()).toEqual(CAMERA_RIGHT_OF_TIME_SERIES);
	});

	it('swaps the pane with the destination that Tab focuses first', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});

		await startMoveOnFirstDestination(container, 'Camera');
		await userEvent.keyboard('{Enter}');

		await expect.poll(() => received.at(-1)).toEqual(CAMERA_SWAPPED_WITH_TIME_SERIES);
	});

	it('places the pane when Space is released on a destination', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		await startMoveOnFirstDestination(container, 'Camera');

		await userEvent.keyboard('{Space>}');
		expect(received, 'while Space is held').toEqual([]);
		await userEvent.keyboard('{/Space}');

		await expect.poll(() => received.at(-1)).toEqual(CAMERA_SWAPPED_WITH_TIME_SERIES);
	});

	it('enters move mode with Space', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		handleOf(container, 'Camera').focus();

		await userEvent.keyboard(' ');

		expect(pressedStates(container)).toEqual(['true', 'false', 'false', 'false']);
	});

	it('moves focus to the moving pane wrapper on entering move mode', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithKeyboard(container, 'Camera');
		await nextFrames();

		expect(document.activeElement).toBe(wrapperOf(container, ids.mycam));
	});

	it('gives each destination one tab stop, visited in layout order after the moving pane handle', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');

		const visited = await tabThrough(4);

		expect(visited).toEqual([
			handleOf(container, 'Camera'),
			swapButtonOf(container, ids.mytimeseries),
			swapButtonOf(container, ids.mysensor),
			swapButtonOf(container, ids.mycam2)
		]);
		expect(
			destinationsIn(container).map(
				(destination) =>
					[...destination.querySelectorAll<HTMLElement>('button')].filter(
						(button) => button.tabIndex === 0
					).length
			)
		).toEqual([1, 1, 1]);
	});

	it('moves back from the first destination to the moving pane handle with Shift+Tab', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(container, 'Camera');

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

		expect(document.activeElement).toBe(handleOf(container, 'Camera'));
	});

	it('returns focus to the moved pane handle after placing', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveOnFirstDestination(container, 'Camera');
		await userEvent.keyboard('{ArrowRight}{Enter}');

		await expect.poll(() => document.activeElement).toBe(handleOf(container, 'Camera'));
	});

	it('returns focus to the moved pane handle after a swap', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveOnFirstDestination(container, 'Camera');
		await userEvent.keyboard('{Enter}');

		await expect.poll(() => document.activeElement).toBe(handleOf(container, 'Camera'));
	});

	it('shows a focus outline on a focused destination', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveOnFirstDestination(container, 'Camera');

		const outline = getComputedStyle(document.activeElement!);
		expect(outline.outlineStyle).toBe('solid');
		expect(outline.outlineWidth).toBe('2px');
		expect(outline.outlineColor).toBe(outlineColorOf('outline-info-dark'));
	});
});

describe('SplitView move mode: pointer only', () => {
	it('places the pane beside the destination with a click on its right side', async () => {
		const { container, component } = render(BoundSplitView, { props: { handles: true } });

		await startMoveWithPointer(container, 'Camera');
		await clickRegion(destinationOf(container, ids.mytimeseries), 'right');

		await expect.poll(() => component.getLayout()).toEqual(CAMERA_RIGHT_OF_TIME_SERIES);
	});

	it('swaps the pane with the destination with a click on its center', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});

		await startMoveWithPointer(container, 'Camera');
		await clickRegion(destinationOf(container, ids.mytimeseries), 'center');

		await expect.poll(() => received.at(-1)).toEqual(CAMERA_SWAPPED_WITH_TIME_SERIES);
	});

	it('gives the moved pane a new split id no other node has', async () => {
		const received: Received = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});

		await startMoveWithPointer(container, 'Camera');
		await clickRegion(destinationOf(container, ids.mytimeseries), 'right');

		await expect.poll(() => received.length).toBe(1);
		const created = (received[0] as { first: { id: string } }).first.id;
		expect(created).toMatch(/^[0-9a-f-]{32,36}$/);
		expect(Object.values(ids)).not.toContain(created);
	});

	it('covers each destination pane', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		const paneIds = [ids.mytimeseries, ids.mysensor, ids.mycam2];
		expect(paneIds.map((id) => boxOf(destinationOf(container, id)))).toEqual(
			paneIds.map((id) => boxOf(wrapperOf(container, id)))
		);
	});

	it('makes every destination at least 24 by 24 pixels', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		const sizes = destinationsIn(container).map((destination) =>
			destination.getBoundingClientRect()
		);
		expect(sizes).toHaveLength(DESTINATION_COUNT);
		expect(Math.min(...sizes.map((size) => size.width))).toBeGreaterThanOrEqual(
			MIN_DESTINATION_SIZE_PX
		);
		expect(Math.min(...sizes.map((size) => size.height))).toBeGreaterThanOrEqual(
			MIN_DESTINATION_SIZE_PX
		);
	});

	it('stacks the destinations above the drop overlay', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		const destination = destinationOf(container, ids.mytimeseries);
		const overlay = wrapperOf(container, ids.mytimeseries).querySelector('[data-drop-overlay]')!;
		expect(Number(getComputedStyle(destination).zIndex)).toBeGreaterThan(
			Number(getComputedStyle(overlay).zIndex)
		);
	});
});

describe('SplitView move mode: canceling', () => {
	it('leaves the layout unchanged and focuses the handle when Escape is pressed', async () => {
		const received: Received = [];
		const { container, component } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		await startMoveWithKeyboard(container, 'Camera');
		await userEvent.keyboard('{Tab}');

		await userEvent.keyboard('{Escape}');

		await expect.poll(() => document.activeElement).toBe(handleOf(container, 'Camera'));
		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
		expect(destinationsIn(container)).toEqual([]);
		expect(pressedStates(container)).toEqual(['false', 'false', 'false', 'false']);
	});

	it('cancels when Escape is pressed with focus on the moving pane handle', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');
		handleOf(container, 'Camera').focus();

		await userEvent.keyboard('{Escape}');

		await expect.poll(() => destinationsIn(container)).toEqual([]);
		expect(document.activeElement).toBe(handleOf(container, 'Camera'));
	});

	it('does nothing when Escape is pressed outside move mode', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		const handle = handleOf(container, 'Time series');
		handle.focus();

		await userEvent.keyboard('{Escape}');
		await nextFrames();

		expect(document.activeElement).toBe(handle);
		expect(announcementIn(container)).toBe('');
	});

	it('cancels when the pressed handle is clicked again', async () => {
		const received: Received = [];
		const { container, component } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		await startMoveWithPointer(container, 'Camera');

		await userEvent.click(handleOf(container, 'Camera'));

		expect(pressedStates(container)).toEqual(['false', 'false', 'false', 'false']);
		expect(destinationsIn(container)).toEqual([]);
		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
	});

	it('cancels when the pressed handle is activated again with Enter', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');
		handleOf(container, 'Camera').focus();

		await userEvent.keyboard('{Enter}');

		expect(pressedStates(container)).toEqual(['false', 'false', 'false', 'false']);
		await expect.poll(() => document.activeElement).toBe(handleOf(container, 'Camera'));
	});
});

describe('SplitView move mode: announcements', () => {
	it('renders an empty status region before any move', () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		expect(announcementIn(container)).toBe('');
	});

	it('announces entering move mode, naming the keys', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		expect(announcementIn(container)).toBe(STARTED_CAMERA);
	});

	it('announces an edge placement', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await clickRegion(destinationOf(container, ids.mytimeseries), 'right');

		expect(announcementIn(container)).toBe('Camera placed right of Time series.');
	});

	it('announces a swap', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await clickRegion(destinationOf(container, ids.mytimeseries), 'center');

		expect(announcementIn(container)).toBe('Camera swapped with Time series.');
	});

	it('announces a cancel', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await userEvent.keyboard('{Escape}');

		expect(announcementIn(container)).toBe('Move canceled.');
	});

	it('announces that a rejected placement did not move the pane', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: false, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await clickRegion(destinationOf(container, ids.mytimeseries), 'right');

		expect(announcementIn(container)).toBe('Camera was not moved.');
	});

	it('leaves the status text alone when an arrow key selects a placement, since the focused button names it', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(container, 'Camera');

		await userEvent.keyboard('{ArrowRight}');

		expect(announcementIn(container)).toBe(STARTED_CAMERA);
		expect(document.activeElement).toBe(
			page.getByRole('button', { name: 'Place Camera right of Time series', exact: true }).element()
		);
	});

	it('keeps the status region when the layout is empty', async () => {
		const { container } = render(EmptyingSplitView);

		await page.getByRole('button', { name: 'Clear layout' }).click();

		await expect.poll(() => container.querySelectorAll('[data-testid="pane"]').length).toBe(0);
		expect(container.querySelector('[role="status"]')).not.toBeNull();
	});

	it('names panes by id when paneLabel is not given', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true, labelPanes: false }
		});

		await startMoveWithPointer(container, 'Camera');

		expect(announcementIn(container)).toBe(
			'Moving mycam. Choose a destination with the pointer or arrow keys, or press Escape. The arrow keys move between sides and panes, Tab moves between destinations, Enter places the pane, and Escape cancels.'
		);
		expect(buttonNamed(container, 'Swap mycam with mytimeseries')).not.toBeNull();
	});
});

describe('SplitView move mode: a binding that rejects the change', () => {
	it('keeps the layout, ends move mode, and focuses the handle', async () => {
		const received: Received = [];
		const { container, component } = render(ControlledSplitView, {
			props: { accept: false, received, handles: true }
		});

		await startMoveOnFirstDestination(container, 'Camera');
		await userEvent.keyboard('{ArrowRight}{Enter}');

		await expect.poll(() => received.length).toBe(1);
		expect(received[0], 'the setter was offered a different layout').not.toBe(layoutRoot);
		await nextFrames();
		expect(component.getLayout()).toBe(layoutRoot);
		expect(pressedStates(container)).toEqual(['false', 'false', 'false', 'false']);
		expect(destinationsIn(container)).toEqual([]);
		expect(document.activeElement).toBe(handleOf(container, 'Camera'));
	});
});

describe('SplitView move mode: state', () => {
	it('reflects move mode on the moving handle with aria-pressed', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		expect(pressedStates(container), 'before move mode').toEqual([
			'false',
			'false',
			'false',
			'false'
		]);

		await startMoveWithPointer(container, 'Camera');
		expect(pressedStates(container), 'in move mode').toEqual(['true', 'false', 'false', 'false']);

		await userEvent.keyboard('{Escape}');
		expect(pressedStates(container), 'after cancel').toEqual(['false', 'false', 'false', 'false']);
	});

	it('renders one destination on every pane but the moving one', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		expect(
			[ids.mycam, ids.mytimeseries, ids.mysensor, ids.mycam2].map(
				(id) => destinationsIn(wrapperOf(container, id).parentElement!).length
			)
		).toEqual([0, 1, 1, 1]);
	});

	it('shows no destination before move mode', () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		expect(destinationsIn(container)).toEqual([]);
	});

	it('enters no move mode in a view that is not reorderable', async () => {
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true, reorderable: false }
		});

		handleOf(container, 'Camera').dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await tick();

		expect(destinationsIn(container)).toEqual([]);
		expect(announcementIn(container)).toBe('');
	});

	it('leaves move mode when the view stops being reorderable', async () => {
		const { container, rerender } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		await startMoveWithPointer(container, 'Camera');
		expect(destinationsIn(container), 'move mode is on').toHaveLength(DESTINATION_COUNT);

		await rerender({ reorderable: false });

		expect(destinationsIn(container)).toEqual([]);
		expect(pressedStates(container)).toEqual(['false', 'false', 'false', 'false']);
	});

	it('does not focus a handle that mounts after a move whose pane had no handle', async () => {
		const { container, rerender } = render(ControlledSplitView, {
			props: { accept: true, handles: true }
		});
		await startMoveWithPointer(container, 'Camera');
		await rerender({ handles: false });
		await clickRegion(destinationOf(container, ids.mytimeseries), 'right');
		await tick();

		await rerender({ handles: true });
		await nextFrames();

		expect(document.activeElement).toBe(document.body);
	});

	it('enters no move mode when no other pane exists', async () => {
		const { container } = render(SinglePaneSplitView);

		await userEvent.click(handleOf(container, 'Only'));

		expect(pressedStates(container)).toEqual(['false']);
		expect(destinationsIn(container)).toEqual([]);
		expect(announcementIn(container)).toBe('');
	});

	it('leaves move mode when a drag starts from a handle', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');
		expect(destinationsIn(container), 'move mode is on').toHaveLength(DESTINATION_COUNT);

		handleOf(container, 'Time series').dispatchEvent(
			new PointerEvent('pointerdown', { bubbles: true, button: 0 })
		);
		await tick();
		wrapperOf(container, ids.mytimeseries).dispatchEvent(
			new DragEvent('dragstart', {
				bubbles: true,
				cancelable: true,
				dataTransfer: new DataTransfer()
			})
		);
		await tick();

		expect(destinationsIn(container)).toEqual([]);
		expect(pressedStates(container)).toEqual(['false', 'false', 'false', 'false']);
	});

	it('enters no move mode when a handle is dragged', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		const target = paneElement(container, ids.mytimeseries);

		await userEvent.dragAndDrop(handleOf(container, 'Camera'), target, {
			targetPosition: pointWithin(target)
		});
		await nextFrames();

		expect(pressedStates(container)).toEqual(['false', 'false', 'false', 'false']);
		expect(destinationsIn(container)).toEqual([]);
	});

	it('still runs the consumer click handler and enters move mode', async () => {
		const onclick = vi.fn();
		const { container } = render(ControlledSplitView, {
			props: { accept: true, handles: true, handleProps: { onclick } }
		});

		await startMoveWithPointer(container, 'Camera');

		expect(onclick).toHaveBeenCalledTimes(1);
		expect(pressedStates(container)).toEqual(['true', 'false', 'false', 'false']);
	});
});

describe('SplitView move mode: a moveTrigger that is not a button', () => {
	it('has no aria-pressed before move mode', () => {
		const { container } = render(PaneControlsSplitView, { props: { variant: 'div-move' } });

		expect(
			moveDivOf(container, 'Camera').hasAttribute('aria-pressed'),
			'aria-pressed is set before move mode'
		).toBe(false);
	});

	it('has no aria-pressed in move mode, and still enters it when clicked', async () => {
		const { container } = render(PaneControlsSplitView, { props: { variant: 'div-move' } });

		await userEvent.click(moveDivOf(container, 'Camera'));

		expect(destinationsIn(container), 'move mode is on').toHaveLength(DESTINATION_COUNT);
		expect(
			moveDivOf(container, 'Camera').hasAttribute('aria-pressed'),
			'aria-pressed is set in move mode'
		).toBe(false);
	});
});

describe('SplitView move mode: a moveTrigger that is a native button', () => {
	it('toggles move mode once when pressed with Enter', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithKeyboard(container, 'Camera');

		expect(destinationsIn(container)).toHaveLength(DESTINATION_COUNT);
		expect(pressedStates(container)).toEqual(['true', 'false', 'false', 'false']);
	});

	it.each([
		{ name: 'Enter', key: 'Enter' },
		{ name: 'Space', key: ' ' }
	])('leaves the $name keydown to the browser by not canceling it', ({ key }) => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		const keydown = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });

		handleOf(container, 'Camera').dispatchEvent(keydown);

		expect(keydown.defaultPrevented, 'the keydown was canceled').toBe(false);
	});
});

describe('SplitView move mode: a moveTrigger with role="button" that is not a native button', () => {
	const renderRoleButton = () =>
		render(PaneControlsSplitView, { props: { variant: 'div-move', moveRole: 'button' } });
	const pressedStateOf = (container: Element) =>
		moveDivOf(container, 'Camera').getAttribute('aria-pressed');

	it('enters move mode on Enter', async () => {
		const { container } = renderRoleButton();
		moveDivOf(container, 'Camera').focus();

		await userEvent.keyboard('{Enter}');

		expect(destinationsIn(container)).toHaveLength(DESTINATION_COUNT);
	});

	it('ignores Enter repeating from the key that entered move mode', async () => {
		const { container } = renderRoleButton();
		moveDivOf(container, 'Camera').focus();
		await userEvent.keyboard('{Enter}');
		expect(destinationsIn(container), 'before the repeat').toHaveLength(DESTINATION_COUNT);

		moveDivOf(container, 'Camera').dispatchEvent(
			new KeyboardEvent('keydown', { key: 'Enter', repeat: true, bubbles: true, cancelable: true })
		);
		await tick();

		expect(destinationsIn(container)).toHaveLength(DESTINATION_COUNT);
	});

	it('enters move mode on Space', async () => {
		const { container } = renderRoleButton();
		moveDivOf(container, 'Camera').focus();

		await userEvent.keyboard(' ');

		expect(destinationsIn(container)).toHaveLength(DESTINATION_COUNT);
	});

	it('enters move mode on Space only when the key is released', async () => {
		const { container } = renderRoleButton();
		moveDivOf(container, 'Camera').focus();

		await userEvent.keyboard('{Space>}');
		expect(destinationsIn(container), 'while Space is held').toEqual([]);

		await userEvent.keyboard('{/Space}');
		expect(destinationsIn(container), 'after Space is released').toHaveLength(DESTINATION_COUNT);
	});

	it('cancels the Space keydown so the page does not scroll', () => {
		const { container } = renderRoleButton();
		const keydown = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });

		moveDivOf(container, 'Camera').dispatchEvent(keydown);

		expect(keydown.defaultPrevented, 'the keydown was not canceled').toBe(true);
	});

	it('enters move mode when clicked', async () => {
		const { container } = renderRoleButton();

		await userEvent.click(moveDivOf(container, 'Camera'));

		expect(destinationsIn(container)).toHaveLength(DESTINATION_COUNT);
	});

	it('reports move mode with aria-pressed', async () => {
		const { container } = renderRoleButton();
		expect(pressedStateOf(container), 'before move mode').toBe('false');

		moveDivOf(container, 'Camera').focus();
		await userEvent.keyboard('{Enter}');
		expect(pressedStateOf(container), 'in move mode').toBe('true');

		await userEvent.keyboard('{Escape}');
		expect(pressedStateOf(container), 'after cancel').toBe('false');
	});

	it('toggles move mode once when it is a link and Enter is pressed', async () => {
		const { container } = render(PaneControlsSplitView, {
			props: { variant: 'div-move', moveTag: 'a', moveRole: 'button' }
		});
		moveDivOf(container, 'Camera').focus();

		await userEvent.keyboard('{Enter}');

		expect(destinationsIn(container)).toHaveLength(DESTINATION_COUNT);
	});
});

describe('SplitView move mode: a moveTrigger with role="menuitem"', () => {
	const renderMenuItem = () =>
		render(PaneControlsSplitView, { props: { variant: 'div-move', moveRole: 'menuitem' } });

	it('enters move mode when clicked', async () => {
		const { container } = renderMenuItem();

		await userEvent.click(moveDivOf(container, 'Camera'));

		expect(destinationsIn(container)).toHaveLength(DESTINATION_COUNT);
	});

	it('leaves move mode when clicked again', async () => {
		const { container } = renderMenuItem();
		await userEvent.click(moveDivOf(container, 'Camera'));

		await userEvent.click(moveDivOf(container, 'Camera'));

		expect(destinationsIn(container)).toEqual([]);
	});

	it('has no aria-pressed in move mode', async () => {
		const { container } = renderMenuItem();

		await userEvent.click(moveDivOf(container, 'Camera'));

		expect(
			moveDivOf(container, 'Camera').hasAttribute('aria-pressed'),
			'aria-pressed is set in move mode'
		).toBe(false);
	});

	it('leaves keyboard activation to the menu that dispatches its click', async () => {
		const { container } = renderMenuItem();
		moveDivOf(container, 'Camera').focus();

		await userEvent.keyboard('{Enter}');

		expect(destinationsIn(container)).toEqual([]);
	});
});

describe('SplitView move mode: a moveTrigger that unmounted before move mode ended', () => {
	it('focuses the moved pane wrapper after a placement', async () => {
		const { container } = render(PaneControlsSplitView, { props: { variant: 'menu' } });
		await startMoveFromMenu(container, 'Camera');
		expect(handleOf(container, 'Camera'), 'the menu item unmounted').toBeNull();

		await clickRegion(destinationOf(container, ids.mytimeseries), 'right');

		await expect.poll(() => document.activeElement).toBe(wrapperOf(container, ids.mycam));
	});

	it('focuses the moved pane wrapper after Escape', async () => {
		const { container } = render(PaneControlsSplitView, { props: { variant: 'menu' } });
		await startMoveFromMenu(container, 'Camera');

		await userEvent.keyboard('{Escape}');

		await expect.poll(() => document.activeElement).toBe(wrapperOf(container, ids.mycam));
	});

	it('shows a focus outline on the wrapper that takes the fallback focus', async () => {
		const { container } = render(PaneControlsSplitView, { props: { variant: 'menu' } });
		await startMoveFromMenu(container, 'Camera');
		await userEvent.keyboard('{Escape}');
		await expect.poll(() => document.activeElement).toBe(wrapperOf(container, ids.mycam));

		const outline = getComputedStyle(wrapperOf(container, ids.mycam));

		expect(outline.outlineStyle).toBe('solid');
		expect(outline.outlineWidth).toBe('2px');
		expect(outline.outlineColor).toBe(outlineColorOf('outline-info-dark'));
	});

	it('gives the pane wrapper tabindex -1 so script can focus it', () => {
		const { container } = render(PaneControlsSplitView, { props: { variant: 'menu' } });

		expect(wrapperOf(container, ids.mycam).getAttribute('tabindex')).toBe('-1');
	});
});
