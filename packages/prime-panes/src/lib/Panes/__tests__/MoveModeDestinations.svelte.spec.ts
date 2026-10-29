import { afterEach, describe, expect, it, onTestFinished } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { cdp, commands, page, userEvent } from 'vitest/browser';
import type { Locator } from 'vitest/browser';

import { ids, layoutRoot } from '../../../../test/layouts.ts';
import { getDropRegion } from '../../drop-region.ts';
import BoundPanes from '../../../../test/fixtures/BoundPanes.svelte';
import ControlledPanes from '../../../../test/fixtures/ControlledPanes.svelte';
import StackPanes from '../../../../test/fixtures/StackPanes.svelte';
import type { LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../../../test/layouts.ts';
import type { Point } from '../../../../test/input-commands.ts';

const DESTINATION_COUNT = 3;
const MIN_HIT_AREA_PX = 24;
const INFO_DARK = 'rgb(46, 103, 211)';
const GRAY_8 = 'rgb(78, 79, 82)';
const UNSELECTED_BAR = { backgroundColor: GRAY_8, opacity: '0.7' } as const;
const SELECTED_BAR = { backgroundColor: INFO_DARK, opacity: '1' } as const;
const SHOWN_MARKS = ['1', '1', '1', '1'];
const HIDDEN_MARKS = ['0', '0', '0', '0'];
const QUIET_MARKS = [...HIDDEN_MARKS, ...HIDDEN_MARKS, ...HIDDEN_MARKS];
const TIME_SERIES_MARKS = [...SHOWN_MARKS, ...HIDDEN_MARKS, ...HIDDEN_MARKS];
const SENSOR_STAT_MARKS = [...HIDDEN_MARKS, ...SHOWN_MARKS, ...HIDDEN_MARKS];
const CAMERA_2_MARKS = [...HIDDEN_MARKS, ...HIDDEN_MARKS, ...SHOWN_MARKS];
const TIME_SERIES = 'Move Camera to Time series';
const SENSOR_STAT = 'Move Camera to Sensor stat';
const CAMERA_2 = 'Move Camera to Camera 2';
const STARTED_CAMERA =
	'Moving Camera. Choose a destination with the pointer or arrow keys, or press Escape. The arrow keys move between sides and panes, Tab moves between destinations, Enter places the pane, and Escape cancels.';
const LEFT = { x: '10%', y: '50%' } as const;
const RIGHT = { x: '90%', y: '50%' } as const;
const TOP = { x: '50%', y: '10%' } as const;
const CENTER = { x: '50%', y: '50%' } as const;
const EDGE_MARKS = [
	{ region: 'left', name: 'Place Camera left of Time series' },
	{ region: 'right', name: 'Place Camera right of Time series' },
	{ region: 'top', name: 'Place Camera above Time series' },
	{ region: 'bottom', name: 'Place Camera below Time series' }
] as const;

type Box = Pick<DOMRect, 'left' | 'top' | 'right' | 'bottom' | 'width' | 'height'>;

const trigger = (label: string) => page.getByRole('button', { name: `Move ${label}`, exact: true });
const mark = (name: string) => page.getByRole('button', { name, exact: true });
const destination = (name: string) => page.getByRole('group', { name, exact: true });
const allDestinations = () => page.getByRole('group', { name: /^Move Camera to / });
const timeSeries = () => destination(TIME_SERIES);
const sensorStat = () => destination(SENSOR_STAT);
const timeSeriesPreview = () => timeSeries().getByMovePreview();
const outsideButton = () => page.getByRole('button', { name: 'Set root to 70%' });
const announcement = () => page.getByRole('status').element().textContent;
const boxOf = (locator: Locator): Box => locator.element().getBoundingClientRect().toJSON();
const labelsOf = (locator: Locator) =>
	locator.elements().map((element) => element.getAttribute('aria-label'));
const engagedNames = () => labelsOf(allDestinations().filter({ has: page.getByMovePreview() }));
const markOpacities = () =>
	page
		.getByRole('button', { name: /^Place / })
		.elements()
		.map((button) => getComputedStyle(button).opacity);
const pressedStates = () =>
	page
		.getByRole('button', { name: /^Move / })
		.elements()
		.map((button) => button.getAttribute('aria-pressed'));
const inertPanes = () =>
	[ids.mycam, ids.mytimeseries, ids.mysensor, ids.mycam2].map((id) =>
		page.getByPane(id).element().hasAttribute('inert')
	);
const setReducedMotion = (value: 'reduce' | 'no-preference') =>
	cdp().send('Emulation.setEmulatedMedia', {
		features: [{ name: 'prefers-reduced-motion', value }]
	});

const startMoveWithClick = () => userEvent.click(trigger('Camera'));

const startMoveWithKeyboard = async (label: string) => {
	trigger(label).element().focus();
	await userEvent.keyboard('{Enter}');
	await expect.element(page.getByMovingPane()).toHaveFocus();
};

const startMoveOnFirstDestination = async () => {
	await startMoveWithKeyboard('Camera');
	await userEvent.keyboard('{Tab}{Tab}');
	await expect.element(mark('Swap Camera with Time series')).toHaveFocus();
};

describe('Panes move mode: marking the moving pane', () => {
	it('sets data-move-mode on the root only while a pane is moving', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await expect
			.element(page.getByPanesInMoveMode(), { message: 'before move mode' })
			.not.toBeInTheDocument();

		await startMoveWithClick();
		await expect
			.element(page.getByPanesInMoveMode(), { message: 'in move mode' })
			.toBeInTheDocument();

		await userEvent.keyboard('{Escape}');
		await expect
			.element(page.getByPanesInMoveMode(), { message: 'after cancel' })
			.not.toBeInTheDocument();
	});

	it('sets data-moving on the moving pane wrapper alone', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		expect(page.getByMovingPane().elements(), 'before move mode').toHaveLength(0);

		await startMoveWithClick();
		await expect
			.poll(() => page.getByMovingPane().elements(), { message: 'in move mode' })
			.toHaveLength(1);
		await expect.element(page.getByPane(ids.mycam)).toHaveAttribute('data-moving');

		await userEvent.keyboard('{Escape}');
		await expect
			.poll(() => page.getByMovingPane().elements(), { message: 'after cancel' })
			.toHaveLength(0);
	});

	it('tells the moving pane what to do', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		expect(page.getByMovingNotice().elements(), 'before move mode').toHaveLength(0);

		await startMoveWithClick();

		await expect
			.element(page.getByMovingNotice())
			.toHaveTextContent(
				/^Moving Camera\. Choose a destination with the pointer or arrow keys, or press Escape\.$/
			);
	});

	it('removes the notice when move mode ends', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();
		await expect.element(page.getByMovingNotice()).toBeInTheDocument();

		await userEvent.keyboard('{Escape}');

		await expect.element(page.getByMovingNotice()).not.toBeInTheDocument();
	});

	it('outlines the moving pane wrapper inside its edge in info-dark after a mouse click starts the move', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithClick();

		await expect.element(page.getByPane(ids.mycam)).toHaveStyle({
			outlineStyle: 'solid',
			outlineWidth: '2px',
			outlineOffset: '-2px',
			outlineColor: INFO_DARK
		});
	});

	it('leaves the moving pane without an outline once focus leaves it', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();
		await expect
			.element(page.getByPane(ids.mycam), { message: 'while focused' })
			.toHaveStyle({ outlineStyle: 'solid' });

		mark('Swap Camera with Time series').element().focus();

		await expect.element(page.getByPane(ids.mycam)).toHaveStyle({ outlineStyle: 'none' });
	});

	it('paints the wash beneath the notice', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithClick();

		await expect.element(page.getByMovingWash()).toHaveStyle({ zIndex: '30' });
		await expect.element(page.getByMovingNotice()).toHaveStyle({ zIndex: '30' });
		expect(
			page.getByMovingWash().element().compareDocumentPosition(page.getByMovingNotice().element())
		).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
	});

	it('insets the wash by the outline width while the moving pane has focus', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithClick();

		const pane = boxOf(page.getByPane(ids.mycam));
		await expect
			.poll(() => boxOf(page.getByMovingWash()))
			.toMatchObject({
				left: pane.left + 2,
				top: pane.top + 2,
				width: pane.width - 4,
				height: pane.height - 4
			});
	});

	it('covers the whole moving pane with the wash once focus leaves it', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();
		await expect.element(page.getByPane(ids.mycam)).toHaveFocus();

		mark('Swap Camera with Time series').element().focus();

		const pane = boxOf(page.getByPane(ids.mycam));
		await expect
			.poll(() => boxOf(page.getByMovingWash()))
			.toMatchObject({
				left: pane.left,
				top: pane.top,
				width: pane.width,
				height: pane.height
			});
	});
});

describe('Panes move mode: quiet until engaged', () => {
	it('shows no edge bars and no preview on any destination after a mouse click starts the move', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithClick();

		expect(page.getByMovePreview().elements()).toHaveLength(0);
		expect(markOpacities()).toEqual(QUIET_MARKS);
	});

	it('exposes the four edge buttons by role and name on a destination that is not engaged', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithClick();

		expect(EDGE_MARKS.map(({ name }) => mark(name).elements().length)).toEqual([1, 1, 1, 1]);
	});

	it('shows the preview when any key is pressed on a destination that took focus after a mouse start', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();
		mark('Swap Camera with Time series').element().focus();
		expect(engagedNames(), 'before the key').toEqual([]);

		await userEvent.keyboard('{Shift}');

		await expect.poll(engagedNames).toEqual([TIME_SERIES]);
		expect(markOpacities()).toEqual(TIME_SERIES_MARKS);
		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'center');
	});

	it('moves focus to the moving pane wrapper when a mouse click started the move', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithClick();

		await expect.element(page.getByPane(ids.mycam)).toHaveFocus();
	});

	it('selects no destination when Enter on the trigger starts the move', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithKeyboard('Camera');

		expect(engagedNames()).toEqual([]);
		expect(markOpacities()).toEqual(QUIET_MARKS);
	});

	it('previews the swap on the first destination when Tab reaches it after the trigger started the move', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveOnFirstDestination();

		await expect.poll(engagedNames).toEqual([TIME_SERIES]);
		expect(markOpacities()).toEqual(TIME_SERIES_MARKS);
		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'center');
	});

	it('engages only the destination under the pointer', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();

		await userEvent.hover(sensorStat());

		await expect.poll(engagedNames).toEqual([SENSOR_STAT]);
		expect(markOpacities()).toEqual(SENSOR_STAT_MARKS);
	});

	it('goes quiet again when the pointer leaves an unfocused destination', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();
		await userEvent.hover(sensorStat());
		await expect.poll(engagedNames).toEqual([SENSOR_STAT]);

		await userEvent.hover(trigger('Camera'));

		await expect.poll(engagedNames).toEqual([]);
		expect(markOpacities()).toEqual(QUIET_MARKS);
	});

	it('engages only the destination that Tab reaches', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();

		await userEvent.keyboard('{Tab}{Tab}{Tab}{Tab}');

		await expect.element(mark('Swap Camera with Camera 2')).toHaveFocus();
		await expect.poll(engagedNames).toEqual([CAMERA_2]);
		expect(markOpacities()).toEqual(CAMERA_2_MARKS);
	});

	it('hides the preview from assistive technology', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveOnFirstDestination();
		await expect.element(timeSeriesPreview()).toBeInTheDocument();

		const preview = timeSeriesPreview().element();

		expect(preview.closest('[aria-hidden="true"]')).not.toBeNull();
	});
});

describe('Panes move mode: edge bars', () => {
	const renderEngaged = async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveOnFirstDestination();
		await expect.element(timeSeriesPreview()).toBeInTheDocument();
	};

	it('puts each bar inside the region it hints at', async () => {
		await renderEngaged();
		const pane = boxOf(timeSeries());

		const regionsOfBars = EDGE_MARKS.map(({ region }) => {
			const bar = boxOf(timeSeries().getByMoveBar(region));
			return getDropRegion(bar.left + bar.width / 2, bar.top + bar.height / 2, pane);
		});

		expect(regionsOfBars).toEqual(['left', 'right', 'top', 'bottom']);
	});

	it.each([
		{ region: 'left', start: 'top', size: 'height' },
		{ region: 'right', start: 'top', size: 'height' },
		{ region: 'top', start: 'left', size: 'width' },
		{ region: 'bottom', start: 'left', size: 'width' }
	] as const)('centers the $region bar along its edge', async ({ region, start, size }) => {
		await renderEngaged();

		const bar = boxOf(timeSeries().getByMoveBar(region));
		const pane = boxOf(timeSeries());

		expect(bar[start] + bar[size] / 2).toBeCloseTo(pane[start] + pane[size] / 2, 0);
	});

	it.each([
		{ region: 'left', longSide: 'height', shortSide: 'width' },
		{ region: 'right', longSide: 'height', shortSide: 'width' },
		{ region: 'top', longSide: 'width', shortSide: 'height' },
		{ region: 'bottom', longSide: 'width', shortSide: 'height' }
	] as const)(
		'runs the $region bar parallel to its edge',
		async ({ region, longSide, shortSide }) => {
			await renderEngaged();

			const bar = boxOf(timeSeries().getByMoveBar(region));

			expect(bar[longSide]).toBeGreaterThan(bar[shortSide]);
		}
	);

	it('draws the unselected bars in gray-8 at 70% opacity', async () => {
		await renderEngaged();

		await Promise.all(
			EDGE_MARKS.map(({ region }) =>
				expect.element(timeSeries().getByMoveBar(region)).toHaveStyle(UNSELECTED_BAR)
			)
		);
	});

	it('draws no focus outline on a focused edge button', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');

		await userEvent.keyboard('{ArrowDown}');

		const focused = mark('Place Camera above Time series');
		await expect.element(focused).toHaveFocus();
		await expect.element(focused).toHaveStyle({ outlineStyle: 'none' });
	});

	it('draws the selected bar in solid info-dark and no other bar', async () => {
		await renderEngaged();

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(timeSeries().getByMoveBar('right')).toHaveStyle(SELECTED_BAR);
		await Promise.all(
			EDGE_MARKS.filter(({ region }) => region !== 'right').map(({ region }) =>
				expect.element(timeSeries().getByMoveBar(region)).toHaveStyle(UNSELECTED_BAR)
			)
		);
	});

	it.each(EDGE_MARKS)(
		'gives the $region edge button a hit area of at least 24 by 24 pixels',
		async ({ name }) => {
			await renderEngaged();

			const { width, height } = boxOf(mark(name));

			expect(Math.min(width, height)).toBeGreaterThanOrEqual(MIN_HIT_AREA_PX);
		}
	);

	it('keeps each hit area around its visible bar', async () => {
		await renderEngaged();

		const outside = EDGE_MARKS.filter(({ region, name }) => {
			const area = boxOf(mark(name));
			const bar = boxOf(timeSeries().getByMoveBar(region));
			return (
				bar.left < area.left ||
				bar.right > area.right ||
				bar.top < area.top ||
				bar.bottom > area.bottom
			);
		}).map(({ region }) => region);

		expect(outside).toEqual([]);
	});
});

describe('Panes move mode: stack mark', () => {
	const STACK_MARK = 'Stack Solo with Camera A at position 4 of 4';
	const TOP_MARK = 'Place Solo above Camera A';
	const LEFT_MARK = 'Place Solo left of Camera A';
	const MARK_NAMES = [
		STACK_MARK,
		LEFT_MARK,
		'Place Solo right of Camera A',
		TOP_MARK,
		'Place Solo below Camera A'
	];

	const dropRegion = () => page.getByPane('cam-a').getByTabListDropRegion();
	const partsOf = (name: string) => [...mark(name).element().children] as HTMLElement[];
	const centerOf = (locator: Locator) => {
		const { left, top, width, height } = boxOf(locator);
		return { x: Math.round(left + width / 2), y: Math.round(top + height / 2) };
	};
	const overlaps = (first: Locator, second: Locator) => {
		const one = boxOf(first);
		const other = boxOf(second);
		return (
			one.left < other.right &&
			other.left < one.right &&
			one.top < other.bottom &&
			other.top < one.bottom
		);
	};
	const touchingMarks = () =>
		MARK_NAMES.flatMap((name, index) =>
			MARK_NAMES.slice(index + 1)
				.filter((other) => overlaps(mark(name), mark(other)))
				.map((other) => [name, other])
		);
	const renderEngaged = async (props: { dropRegion?: 'strip' | 'left' } = {}) => {
		render(StackPanes, { hasTriggers: true, ...props });
		await startMoveWithKeyboard('Solo');
		await userEvent.keyboard('{ArrowLeft}');
		await expect.element(mark('Place Solo right of Camera A')).toHaveFocus();
	};

	it('draws the stack mark in two parts, where the top mark is a single bar', async () => {
		await renderEngaged();

		expect(partsOf(STACK_MARK), 'the stack mark parts').toHaveLength(2);
		expect(partsOf(TOP_MARK), 'the top mark parts').toHaveLength(1);
	});

	it('draws both parts of the stack mark in gray-8 at 70% opacity until the stack is selected', async () => {
		await renderEngaged();

		await Promise.all(
			partsOf(STACK_MARK).map((part) => expect.element(part).toHaveStyle(UNSELECTED_BAR))
		);
	});

	it('draws both parts of the stack mark in solid info-dark when the stack is selected', async () => {
		await renderEngaged();

		await userEvent.keyboard('{ArrowUp}{ArrowUp}');

		await expect.element(mark(STACK_MARK)).toHaveFocus();
		await Promise.all(
			partsOf(STACK_MARK).map((part) => expect.element(part).toHaveStyle(SELECTED_BAR))
		);
	});

	it('centers the stack mark over a region on the left side', async () => {
		await renderEngaged({ dropRegion: 'left' });

		await expect.poll(() => centerOf(mark(STACK_MARK))).toEqual(centerOf(dropRegion()));
	});

	it('starts the left mark beside the inner edge of a region on the left side', async () => {
		await renderEngaged({ dropRegion: 'left' });
		const region = boxOf(dropRegion());

		await expect
			.poll(() => Math.round(boxOf(mark(LEFT_MARK)).left))
			.toBeGreaterThanOrEqual(Math.round(region.right));
	});

	it('keeps every mark apart from the others beside a region on the left side', async () => {
		await renderEngaged({ dropRegion: 'left' });

		await expect.poll(touchingMarks).toEqual([]);
	});
});

describe('Panes move mode: destination group', () => {
	const renderEngaged = async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveOnFirstDestination();
		await expect.element(timeSeriesPreview()).toBeInTheDocument();
	};
	const tabStopsIn = (group: Locator) =>
		group
			.getByRole('button')
			.elements()
			.filter((button) => button.tabIndex === 0)
			.map((button) => button.getAttribute('aria-label'));

	it('makes each destination a group named for the move it offers', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithClick();

		await expect
			.poll(() => labelsOf(allDestinations()))
			.toEqual([TIME_SERIES, SENSOR_STAT, CAMERA_2]);
	});

	it('names the swap, the stack, and the four edge buttons the same whatever the selection', async () => {
		render(StackPanes, { hasTriggers: true });
		await startMoveWithKeyboard('Solo');
		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
		await expect.element(mark('Swap Solo with Camera A')).toHaveFocus();
		const names = [
			'Swap Solo with Camera A',
			'Stack Solo with Camera A at position 4 of 4',
			'Place Solo left of Camera A',
			'Place Solo right of Camera A',
			'Place Solo above Camera A',
			'Place Solo below Camera A'
		];
		const buttons = () => destination('Move Solo to Camera A').getByRole('button');
		expect(labelsOf(buttons()), 'on the swap').toEqual(names);

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(mark('Place Solo right of Camera A')).toHaveFocus();
		expect(labelsOf(buttons()), 'on the right edge').toEqual(names);
	});

	it('shows the edge buttons when a hidden one takes focus on a quiet destination', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();

		mark('Place Camera above Sensor stat').element().focus();

		await expect.poll(engagedNames).toEqual([SENSOR_STAT]);
		expect(markOpacities()).toEqual(SENSOR_STAT_MARKS);
		await expect
			.element(sensorStat().getByMovePreview())
			.toHaveAttribute('data-move-preview', 'top');
	});

	it('shows the full-pane preview and an inset outline on a focused swap', async () => {
		await renderEngaged();

		const swap = mark('Swap Camera with Time series');
		await expect.element(swap).toHaveFocus();
		await expect
			.element(swap)
			.toHaveStyle({ outlineStyle: 'solid', outlineWidth: '2px', outlineOffset: '-2px' });
		await expect.poll(() => boxOf(timeSeriesPreview())).toEqual(boxOf(timeSeries()));
		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'center');
	});

	it('moves the one tab stop to the selected edge button', async () => {
		await renderEngaged();

		await userEvent.keyboard('{ArrowUp}');

		await expect.poll(() => tabStopsIn(timeSeries())).toEqual(['Place Camera above Time series']);
	});

	it('keeps the tab stop on the focused button when the pointer selects another edge', async () => {
		await renderEngaged();
		await commands.mouseMove(timeSeries().selector, RIGHT);
		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'right');

		await userEvent.keyboard('{Tab}');

		await expect.element(mark('Swap Camera with Sensor stat')).toHaveFocus();
	});

	it('keeps the remembered edge as the one tab stop of a destination that is no longer engaged', async () => {
		await renderEngaged();
		await userEvent.hover(trigger('Camera'));

		await userEvent.keyboard('{ArrowRight}{Tab}');

		await expect.poll(engagedNames).toEqual([SENSOR_STAT]);
		expect(markOpacities()).toEqual(SENSOR_STAT_MARKS);
		expect(tabStopsIn(timeSeries())).toEqual(['Place Camera right of Time series']);
	});

	it('keeps Tab on the remembered region of a destination the pointer rests over', async () => {
		await renderEngaged();
		await commands.mouseMove(sensorStat().selector, RIGHT);
		await expect
			.element(sensorStat().getByMovePreview())
			.toHaveAttribute('data-move-preview', 'right');

		await userEvent.keyboard('{Tab}');

		await expect.element(mark('Swap Camera with Sensor stat')).toHaveFocus();
	});

	it.each([
		{
			entry: 'Tab and then ArrowRight inside the destination',
			keys: '{Tab}{Tab}{ArrowRight}',
			remembered: 'Place Camera right of Time series'
		},
		{
			entry: 'ArrowDown from the moving pane',
			keys: '{ArrowDown}',
			remembered: 'Place Camera above Time series'
		}
	])(
		'lands Tab on a remembered edge without focusing the swap first, after $entry',
		async ({ keys, remembered }) => {
			render(ControlledPanes, { accept: true, handles: true });
			await startMoveWithKeyboard('Camera');
			await userEvent.keyboard(keys);
			await expect.element(mark(remembered)).toHaveFocus();
			await userEvent.keyboard('{Tab}');
			await expect.element(mark('Swap Camera with Sensor stat')).toHaveFocus();
			const focused: (string | null)[] = [];
			const controller = new AbortController();
			onTestFinished(() => controller.abort());
			document.addEventListener(
				'focusin',
				(event) => focused.push((event.target as Element).getAttribute('aria-label')),
				{ signal: controller.signal }
			);

			await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

			expect(focused).toEqual([remembered]);
		}
	);

	it('previews the edge of a button that takes focus without announcing it', async () => {
		await renderEngaged();

		mark('Place Camera below Time series').element().focus();

		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'bottom');
		expect(announcement()).toBe(STARTED_CAMERA);
	});

	it('leaves the status text alone when Tab returns focus to a remembered edge', async () => {
		await renderEngaged();
		await userEvent.keyboard('{ArrowRight}{Tab}');

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

		await expect.element(mark('Place Camera right of Time series')).toHaveFocus();
		expect(announcement()).toBe(STARTED_CAMERA);
	});

	it('places the pane on the right side when that bar is clicked', async () => {
		await renderEngaged();

		await userEvent.click(mark('Place Camera right of Time series'));

		await expect.poll(announcement).toBe('Camera placed right of Time series.');
	});

	it('places the side of a button clicked without a pointer, as assistive technology does', async () => {
		await renderEngaged();

		(mark('Place Camera left of Time series').element() as HTMLElement).click();

		await expect.poll(announcement).toBe('Camera placed left of Time series.');
	});
});

describe('Panes move mode: pointer preview', () => {
	it('moves the preview with the pointer', async () => {
		render(BoundPanes, { handles: true });
		await startMoveWithClick();

		await commands.mouseMove(timeSeries().selector, RIGHT);
		await expect
			.element(timeSeriesPreview(), { message: 'at right' })
			.toHaveAttribute('data-move-preview', 'right');

		await commands.mouseMove(timeSeries().selector, TOP);
		await expect
			.element(timeSeriesPreview(), { message: 'at top' })
			.toHaveAttribute('data-move-preview', 'top');

		await commands.mouseMove(timeSeries().selector, CENTER);
		await expect
			.element(timeSeriesPreview(), { message: 'at center' })
			.toHaveAttribute('data-move-preview', 'center');
	});

	it('leaves the status text alone while the mouse sweeps across the regions', async () => {
		render(BoundPanes, { handles: true });
		await startMoveWithClick();
		await expect.poll(announcement, { message: 'before the sweep' }).toBe(STARTED_CAMERA);

		await commands.mouseMove(timeSeries().selector, RIGHT);
		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'right');
		await commands.mouseMove(timeSeries().selector, LEFT);
		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'left');
		await commands.mouseMove(timeSeries().selector, TOP);
		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'top');

		expect(announcement()).toBe(STARTED_CAMERA);
	});

	it('covers the right half of the pane the way the drag indicator does', async () => {
		render(BoundPanes, { handles: true });
		await startMoveWithClick();

		await commands.mouseMove(timeSeries().selector, RIGHT);

		await expect
			.poll(() => {
				const pane = boxOf(timeSeries());
				const preview = boxOf(timeSeriesPreview());
				return [
					(preview.left - pane.left) / pane.width,
					(preview.top - pane.top) / pane.height,
					preview.width / pane.width,
					preview.height / pane.height
				].map((fraction) => Math.round(fraction * 100) / 100);
			})
			.toEqual([0.5, 0, 0.5, 1]);
	});

	it('labels the preview with the moving pane', async () => {
		render(BoundPanes, { handles: true });
		await startMoveWithClick();

		await commands.mouseMove(timeSeries().selector, RIGHT);

		await expect.element(timeSeriesPreview()).toHaveTextContent(/^\s*Camera\s*$/);
	});
});

describe('Panes move mode: keyboard selection', () => {
	it('starts every move on the swap, whatever an earlier move selected', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveOnFirstDestination();
		await userEvent.keyboard('{ArrowRight}{Escape}');
		await expect.poll(() => allDestinations().elements()).toHaveLength(0);

		await startMoveOnFirstDestination();

		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'center');
	});
});

describe('Panes move mode: touch', () => {
	const tapAt = async (group: Locator, at: Point) => {
		await commands.touchStart(group.selector, at);
		await commands.touchEnd();
	};
	const renderMoving = async () => {
		const view = render(BoundPanes, { handles: true });
		await startMoveWithClick();
		return view;
	};

	it('previews the tapped region on the first tap without placing the pane', async () => {
		const { component } = await renderMoving();

		await tapAt(timeSeries(), RIGHT);

		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'right');
		expect(allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
		expect(component.getLayout()).toEqual(layoutRoot);
	});

	it('moves the preview when a different region is tapped', async () => {
		const { component } = await renderMoving();
		await tapAt(timeSeries(), RIGHT);

		await tapAt(timeSeries(), LEFT);

		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'left');
		expect(allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
		expect(component.getLayout()).toEqual(layoutRoot);
	});

	it('places the pane when the previewed region is tapped again', async () => {
		const { component } = await renderMoving();
		await tapAt(timeSeries(), RIGHT);

		await tapAt(timeSeries(), RIGHT);

		await expect.poll(announcement).toBe('Camera placed right of Time series.');
		expect(allDestinations().elements()).toHaveLength(0);
		expect(component.getLayout()).not.toEqual(layoutRoot);
	});

	it('does not place the pane when a tap returns to a region the preview left', async () => {
		await renderMoving();
		await tapAt(timeSeries(), RIGHT);
		await tapAt(timeSeries(), LEFT);

		await tapAt(timeSeries(), RIGHT);

		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'right');
		expect(
			allDestinations().elements(),
			'a tap on the earlier region placed the pane'
		).toHaveLength(DESTINATION_COUNT);
	});

	it('previews instead of placing when another destination is tapped', async () => {
		await renderMoving();
		await tapAt(timeSeries(), RIGHT);

		await tapAt(sensorStat(), RIGHT);

		await expect
			.element(sensorStat().getByMovePreview())
			.toHaveAttribute('data-move-preview', 'right');
		expect(allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});

	it('previews again when a destination is tapped after another took the preview', async () => {
		await renderMoving();
		await tapAt(timeSeries(), RIGHT);
		await tapAt(sensorStat(), RIGHT);

		await tapAt(timeSeries(), RIGHT);

		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'right');
		expect(allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});

	it('previews the tapped region over a selection the keyboard made on the same destination', async () => {
		render(BoundPanes, { handles: true });
		await startMoveOnFirstDestination();
		await userEvent.keyboard('{ArrowLeft}');
		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'left');

		await tapAt(timeSeries(), RIGHT);

		await expect.element(timeSeriesPreview()).toHaveAttribute('data-move-preview', 'right');
	});

	it('announces the tapped region', async () => {
		await renderMoving();

		await tapAt(timeSeries(), RIGHT);

		await expect.poll(announcement).toBe('Place Camera right of Time series');
	});
});

describe('Panes move mode: inert panes', () => {
	it('makes every destination pane inert and leaves the moving pane alone', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		expect(inertPanes(), 'before move mode').toEqual([false, false, false, false]);

		await startMoveWithClick();

		expect(inertPanes(), 'in move mode').toEqual([false, true, true, true]);
	});

	it('makes the panes interactive again after a placement', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();

		await userEvent.click(mark('Swap Camera with Time series'));

		await expect.poll(inertPanes).toEqual([false, false, false, false]);
	});

	it('puts the destination, not a control inside the pane, under a click', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();

		await commands.mouseMove(trigger('Time series').selector);
		await commands.mouseDown();
		await commands.mouseUp();

		await expect.poll(announcement).toMatch(/^Camera placed (left of|above) Time series\.$/);
	});

	it('makes the resize separators inert in move mode', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		const separators = () => page.getByRole('separator').elements();
		expect(
			separators().map((separator) => separator.hasAttribute('inert')),
			'before move mode'
		).toEqual([false, false, false]);

		await startMoveWithClick();

		expect(
			separators().map((separator) => separator.hasAttribute('inert')),
			'in move mode'
		).toEqual([true, true, true]);
	});
});

describe('Panes move mode: leaving the view', () => {
	it('cancels move mode with the layout unchanged when Tab leaves the last destination', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { component } = render(ControlledPanes, {
			accept: true,
			received,
			handles: true
		});
		await startMoveWithKeyboard('Camera');
		await userEvent.keyboard('{Tab}{Tab}{Tab}{Tab}');
		await expect.element(mark('Swap Camera with Camera 2')).toHaveFocus();

		await userEvent.keyboard('{Tab}');

		await expect.poll(() => allDestinations().elements()).toHaveLength(0);
		expect(announcement()).toBe('Move canceled.');
		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
	});

	it('cancels move mode when focus moves to a control outside the view', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');

		outsideButton().element().focus();

		await expect.poll(() => allDestinations().elements()).toHaveLength(0);
		expect(pressedStates()).toEqual(['false', 'false', 'false', 'false']);
	});

	it('leaves focus where it went when it left the view', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');

		outsideButton().element().focus();
		await expect.poll(() => allDestinations().elements()).toHaveLength(0);

		await expect.element(outsideButton()).toHaveFocus();
	});

	it('keeps move mode when focus moves to the moving pane handle', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveOnFirstDestination();

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

		await expect.element(trigger('Camera')).toHaveFocus();
		expect(allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});

	it('places the pane when a destination other than the focused one is clicked', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		render(ControlledPanes, { accept: true, received, handles: true });
		await startMoveOnFirstDestination();

		await userEvent.click(mark('Swap Camera with Sensor stat'));

		await expect.poll(() => received).toHaveLength(1);
		expect(announcement()).toBe('Camera swapped with Sensor stat.');
	});

	it('keeps move mode when a press inside the view leaves focus on nothing', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveOnFirstDestination();
		onTestFinished(() => commands.mouseUp());
		await userEvent.hover(trigger('Camera'));

		await commands.mouseDown();
		(document.activeElement as HTMLElement).blur();

		await expect.poll(() => allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});

	it('cancels move mode when focus is lost after the press ended', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveOnFirstDestination();
		await commands.mouseMove(page.getByRole('region', { name: 'Camera', exact: true }).selector);
		await commands.mouseDown();
		await commands.mouseUp();

		(document.activeElement as HTMLElement).blur();

		await expect.poll(() => allDestinations().elements()).toHaveLength(0);
	});

	it('cancels instead of restarting when the pressed handle is clicked and focus lands on nothing', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();
		await expect.element(page.getByPane(ids.mycam)).toHaveFocus();
		await userEvent.hover(trigger('Camera'));
		await commands.mouseDown();
		(document.activeElement as HTMLElement).blur();

		await commands.mouseUp();

		await expect.poll(() => allDestinations().elements()).toHaveLength(0);
		expect(pressedStates()).toEqual(['false', 'false', 'false', 'false']);
	});

	it('announces nothing when focus leaves the view outside move mode', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		trigger('Camera').element().focus();

		outsideButton().element().focus();

		await expect.element(outsideButton()).toHaveFocus();
		expect(announcement()).toBe('');
	});
});

describe('Panes move mode: motion', () => {
	afterEach(() => setReducedMotion('no-preference'));

	const renderPreview = async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveOnFirstDestination();
		await expect.element(timeSeriesPreview()).toBeInTheDocument();
	};

	it('animates the preview when motion is not reduced', async () => {
		await setReducedMotion('no-preference');

		await renderPreview();

		await expect.element(timeSeriesPreview()).not.toHaveStyle({ transitionDuration: '0s' });
	});

	it('does not animate the preview under prefers-reduced-motion', async () => {
		await setReducedMotion('reduce');

		await renderPreview();

		await expect.element(timeSeriesPreview()).toHaveStyle({ transitionDuration: '0s' });
	});
});
