import { afterEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import FloatDragPanes from '../../../../test/fixtures/FloatDragPanes.svelte';
import {
	createFloatLayout,
	createNestedFloatLayout,
	expectFloat,
	expectStack,
	floatIds,
	nestedFloatIds,
	pane
} from '../../../../test/layouts.ts';
import type { PaneData } from '../../../../test/layouts.ts';
import '../../../../test/panes-queries.ts';
import type { Point } from '../../../../test/input-commands.ts';
import type { FloatRect, LayoutNode } from '../../layout.ts';
import { listPanes } from '../list-panes.ts';

const OTHER: FloatRect = { x: 40, y: 360, width: 200, height: 150 };
const WINDOW: FloatRect = { x: 300, y: 100, width: 240, height: 160 };
const PRESS_IN_BOX = { x: 420, y: 112 };
const HEADER_CENTER = { x: 120, y: 12 };
const DRAG_PX = 100;
const MOVED: FloatRect = { ...WINDOW, x: WINDOW.x + DRAG_PX, y: WINDOW.y + DRAG_PX };

interface FloatDragProps {
	vetoesWrites?: boolean;
	dragTarget?: 'float' | 'stack';
	layout?: LayoutNode<PaneData>;
}

function renderWindows({ layout: custom, ...props }: FloatDragProps = {}) {
	const layout = expectFloat(custom ?? createFloatLayout());
	const [entryA, entryB] = layout.floats;
	const initial = {
		...layout,
		floats: [
			{ ...entryA!, rect: OTHER },
			{ ...entryB!, rect: WINDOW }
		]
	};
	return render(FloatDragPanes, { props: { initial, ...props } }).component;
}

type FloatDragComponent = ReturnType<typeof renderWindows>;

const storedRect = (component: FloatDragComponent, entryId: string) =>
	expectFloat(component.getLayout()).floats.find((entry) => entry.id === entryId)?.rect;

const windowElement = () => page.getByFloatEntry(floatIds.entryB);
const header = (paneId: string) => page.getByPaneHeader(paneId);

const toStyle = (rect: FloatRect) => ({
	left: `${rect.x}px`,
	top: `${rect.y}px`,
	width: `${rect.width}px`,
	height: `${rect.height}px`
});

const moveInBox = (at: Point) => commands.mouseMove(page.getByFloat(floatIds.float).selector, at);

const moveBy = (dx: number, dy: number) =>
	moveInBox({ x: PRESS_IN_BOX.x + dx, y: PRESS_IN_BOX.y + dy });

const pressHeader = async (paneId: string, at: Point = HEADER_CENTER) => {
	await commands.mouseMove(header(paneId).selector, at);
	await commands.mouseDown();
};

const dragWindowBy = async (dx: number, dy: number) => {
	await pressHeader(floatIds.paneB);
	await moveBy(dx, dy);
};

describe('FloatPointer reposition', () => {
	it('moves the window under the pointer and writes its rect once on release', async () => {
		const component = renderWindows();

		await dragWindowBy(DRAG_PX, DRAG_PX);

		await expect.element(windowElement()).toHaveStyle(toStyle(MOVED));
		expect(component.getWrites(), 'the press raises nothing, since entry-b is on top').toBe(0);
		expect(storedRect(component, floatIds.entryB)).toEqual(WINDOW);

		await commands.mouseUp();

		await expect.poll(() => storedRect(component, floatIds.entryB)).toEqual(MOVED);
		expect(component.getWrites()).toBe(1);
		expect(storedRect(component, floatIds.entryA)).toEqual(OTHER);
		await expect.element(windowElement()).toHaveStyle(toStyle(MOVED));
	});

	it('follows the pointer through several moves', async () => {
		const component = renderWindows();

		await dragWindowBy(DRAG_PX, DRAG_PX);
		await moveBy(-DRAG_PX, 50);

		await expect
			.element(windowElement())
			.toHaveStyle(toStyle({ ...WINDOW, x: WINDOW.x - DRAG_PX, y: WINDOW.y + 50 }));
		expect(component.getWrites()).toBe(0);
		await commands.mouseUp();

		await expect
			.poll(() => storedRect(component, floatIds.entryB))
			.toEqual({ ...WINDOW, x: WINDOW.x - DRAG_PX, y: WINDOW.y + 50 });
		expect(component.getWrites()).toBe(1);
	});

	it('shows no ghost, no drop indicator, and no data-dragging while the window moves', async () => {
		renderWindows();

		await dragWindowBy(DRAG_PX, DRAG_PX);

		await expect.element(windowElement()).toHaveStyle(toStyle(MOVED));
		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(page.getByDragGhost()).not.toBeInTheDocument();
		await expect.element(page.getByDropIndicator()).not.toBeInTheDocument();
		await commands.mouseUp();
	});

	it('keeps the window inside the box and writes the rect it drew', async () => {
		const component = renderWindows();

		await pressHeader(floatIds.paneB);
		await moveInBox({ x: 790, y: 590 });

		const clamped = { ...WINDOW, x: 560, y: 440 };
		await expect.element(windowElement()).toHaveStyle(toStyle(clamped));
		await commands.mouseUp();

		await expect.poll(() => storedRect(component, floatIds.entryB)).toEqual(clamped);
		expect(component.getWrites()).toBe(1);
	});

	it('writes nothing when the pointer returns to where the press began', async () => {
		const component = renderWindows();

		await dragWindowBy(DRAG_PX, DRAG_PX);
		await expect.element(windowElement()).toHaveStyle(toStyle(MOVED));
		await moveBy(0, 0);
		await commands.mouseUp();

		await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
		expect(component.getWrites()).toBe(0);
	});

	it('snaps the window back when the binding vetoes the write', async () => {
		const component = renderWindows({ vetoesWrites: true });

		await dragWindowBy(DRAG_PX, DRAG_PX);
		await expect.element(windowElement()).toHaveStyle(toStyle(MOVED));
		await commands.mouseUp();

		await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
		expect(component.getWrites()).toBe(1);
		expect(storedRect(component, floatIds.entryB)).toEqual(WINDOW);
	});
});

describe('FloatPointer press rules', () => {
	it.each([0, 3])('writes no rect for a press that moves %ipx', async (distance) => {
		const component = renderWindows();

		await pressHeader(floatIds.paneB);
		await commands.mouseMove(header(floatIds.paneB).selector, {
			x: HEADER_CENTER.x + distance,
			y: HEADER_CENTER.y
		});
		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
		expect(component.getWrites()).toBe(0);
	});

	it('starts no drag from a control that moves before the hold ends', async () => {
		const component = renderWindows();
		const menu = header(floatIds.paneB).getByRole('button', {
			name: `Menu ${floatIds.paneB}`,
			exact: true
		});

		await commands.mouseMove(menu.selector);
		await commands.mouseDown();
		await moveBy(DRAG_PX, DRAG_PX);
		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
		expect(component.getWrites()).toBe(0);
	});
});

describe('FloatPointer cancellation', () => {
	it('restores the window and writes nothing on Escape', async () => {
		const component = renderWindows();
		await dragWindowBy(DRAG_PX, DRAG_PX);
		await expect.element(windowElement()).toHaveStyle(toStyle(MOVED));

		await userEvent.keyboard('{Escape}');

		await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
		await moveBy(DRAG_PX * 2, DRAG_PX);
		await commands.mouseUp();

		await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		expect(component.getWrites()).toBe(0);
	});

	it('restores the window and writes nothing when the window loses focus', async () => {
		const component = renderWindows();
		await dragWindowBy(DRAG_PX, DRAG_PX);
		await expect.element(windowElement()).toHaveStyle(toStyle(MOVED));

		window.dispatchEvent(new Event('blur'));
		await commands.mouseUp();

		await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
		expect(component.getWrites()).toBe(0);
	});

	it('restores the window and writes nothing when the browser cancels the pointer', async () => {
		const component = renderWindows();
		const box = page.getByFloat(floatIds.float).selector;
		await commands.touchStart(header(floatIds.paneB).selector);
		await commands.touchMove(box, { x: PRESS_IN_BOX.x, y: PRESS_IN_BOX.y + DRAG_PX / 2 });
		await commands.touchMove(box, { x: PRESS_IN_BOX.x + DRAG_PX, y: PRESS_IN_BOX.y + DRAG_PX });
		await expect.element(windowElement()).toHaveStyle(toStyle(MOVED));

		await commands.touchCancel();

		await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
		expect(component.getWrites()).toBe(0);
	});
});

describe('FloatPointer outside a float', () => {
	it('drags a base pane as a pane, with the ghost and drop regions', async () => {
		const component = renderWindows();

		await pressHeader(floatIds.baseLeft);
		await commands.mouseMove(page.getByPane(floatIds.baseRight).selector, {
			x: '90%',
			y: '50%'
		});

		await expect.element(page.getByDragGhost()).toHaveTextContent(floatIds.baseLeft);
		await expect.element(page.getByDropIndicator()).toBeInTheDocument();
		await commands.mouseUp();

		await expect
			.poll(() => listPanes(expectFloat(component.getLayout()).base).map((pane) => pane.id))
			.toEqual([floatIds.baseRight, floatIds.baseLeft]);
		expect(component.getWrites()).toBe(1);
		expect(storedRect(component, floatIds.entryA)).toEqual(OTHER);
		expect(storedRect(component, floatIds.entryB)).toEqual(WINDOW);
	});
});

const BASE_LEFT_TOP = 'base-left-top';
const BASE_LEFT_BOTTOM = 'base-left-bottom';
const SHIFT_DRAG = { x: 200, y: 150 };
const PRESS_AT_HEADER_IN_BOX = { x: 120, y: 12 };
const OVER_BASE_RIGHT = { x: 760, y: 300 };
const BASE_LEFT_TOP_SIZE = { width: 400, height: 300 };

const holdShift = () => userEvent.keyboard('{Shift>}');
const releaseShift = () => userEvent.keyboard('{/Shift}');

const pointerOverBaseRight = () =>
	commands.mouseMove(page.getByPane(floatIds.baseRight).selector, { x: '90%', y: '50%' });

function layoutWithBaseLeft(baseLeft: LayoutNode<PaneData>) {
	return {
		...expectFloat(createFloatLayout()),
		base: {
			type: 'split' as const,
			id: 'base-row',
			direction: 'row' as const,
			ratio: 0.5,
			first: {
				type: 'split' as const,
				id: 'base-column',
				direction: 'column' as const,
				ratio: 0.5,
				first: baseLeft,
				second: pane(BASE_LEFT_BOTTOM, BASE_LEFT_BOTTOM)
			},
			second: pane(floatIds.baseRight, floatIds.baseRight)
		}
	};
}

const floatsOf = (component: FloatDragComponent) => expectFloat(component.getLayout()).floats;
const baseIdsOf = (component: FloatDragComponent) =>
	listPanes(expectFloat(component.getLayout()).base).map((node) => node.id);

describe('FloatPointer Shift', () => {
	afterEach(releaseShift);

	describe('on a floating pane', () => {
		it('shows the ghost and docks the pane into the base, dropping its emptied window', async () => {
			const component = renderWindows();

			await holdShift();
			await pressHeader(floatIds.paneB);
			await pointerOverBaseRight();

			await expect.element(page.getByDragGhost()).toHaveTextContent(floatIds.paneB);
			await expect.element(page.getByDropIndicator()).toBeInTheDocument();
			await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
			await commands.mouseUp();

			await expect
				.poll(() => baseIdsOf(component))
				.toEqual([floatIds.baseLeft, floatIds.baseRight, floatIds.paneB]);
			expect(floatsOf(component).map((entry) => entry.id)).toEqual([floatIds.entryA]);
			expect(storedRect(component, floatIds.entryA)).toEqual(OTHER);
			expect(component.getWrites()).toBe(1);
			await expect.element(windowElement()).not.toBeInTheDocument();
		});

		it('docks only the pane holding the trigger when the window holds a split', async () => {
			const component = renderWindows({ layout: createNestedFloatLayout() });
			const splitHeader = header(nestedFloatIds.splitFirst);

			await holdShift();
			await commands.mouseMove(splitHeader.selector, { x: 50, y: 12 });
			await commands.mouseDown();
			await pointerOverBaseRight();
			await commands.mouseUp();

			await expect
				.poll(() => baseIdsOf(component))
				.toEqual([floatIds.baseLeft, floatIds.baseRight, nestedFloatIds.splitFirst]);
			const entryA = floatsOf(component).find((entry) => entry.id === floatIds.entryA);
			expect(entryA?.content).toEqual(pane(nestedFloatIds.splitSecond, nestedFloatIds.splitSecond));
			expect(
				component.getWrites(),
				'one write raises the lower window and one docks the pane'
			).toBe(2);
		});

		it('docks the whole stack when the window holds a stack', async () => {
			const component = renderWindows({ layout: createNestedFloatLayout() });

			await holdShift();
			await pressHeader(nestedFloatIds.stackFirst);
			await pointerOverBaseRight();
			await commands.mouseUp();

			await expect
				.poll(() => floatsOf(component).map((entry) => entry.id))
				.toEqual([floatIds.entryA]);
			const base = expectFloat(component.getLayout()).base;
			const stacked = listPanes(base).map((node) => node.id);
			expect(stacked).toEqual([
				floatIds.baseLeft,
				floatIds.baseRight,
				nestedFloatIds.stackFirst,
				nestedFloatIds.stackSecond
			]);
			expect(component.getWrites()).toBe(1);
		});
	});

	describe('on the base', () => {
		it('floats the pane at the pointer, keeping the grabbed point under it', async () => {
			const component = renderWindows({
				layout: layoutWithBaseLeft(pane(BASE_LEFT_TOP, BASE_LEFT_TOP))
			});

			await holdShift();
			await pressHeader(BASE_LEFT_TOP);
			await moveInBox({
				x: PRESS_AT_HEADER_IN_BOX.x + SHIFT_DRAG.x,
				y: PRESS_AT_HEADER_IN_BOX.y + SHIFT_DRAG.y
			});
			await commands.mouseUp();

			const floated = { ...SHIFT_DRAG, ...BASE_LEFT_TOP_SIZE };
			await expect.poll(() => floatsOf(component)).toHaveLength(3);
			const entry = floatsOf(component).at(-1)!;
			expect(entry.content).toEqual(pane(BASE_LEFT_TOP, BASE_LEFT_TOP));
			expect(entry.rect).toEqual(floated);
			expect(baseIdsOf(component)).toEqual([BASE_LEFT_BOTTOM, floatIds.baseRight]);
			expect(component.getWrites()).toBe(1);
			await expect.element(page.getByFloatEntry(entry.id)).toHaveStyle(toStyle(floated));
		});

		it('shows the ghost and no drop regions while it floats', async () => {
			renderWindows();

			await holdShift();
			await pressHeader(floatIds.baseLeft);
			await pointerOverBaseRight();

			await expect.element(page.getByDragGhost()).toHaveTextContent(floatIds.baseLeft);
			await expect.element(page.getByDropIndicator()).not.toBeInTheDocument();
			await commands.mouseUp();
		});

		it('floats the whole stack for a stack drag', async () => {
			const component = renderWindows({
				dragTarget: 'stack',
				layout: layoutWithBaseLeft({
					type: 'stack',
					id: 'base-stack',
					panes: [pane('tab-one', 'tab-one'), pane('tab-two', 'tab-two')],
					activeId: 'tab-one'
				})
			});

			await holdShift();
			await pressHeader('tab-one');
			await moveInBox({
				x: PRESS_AT_HEADER_IN_BOX.x + SHIFT_DRAG.x,
				y: PRESS_AT_HEADER_IN_BOX.y + SHIFT_DRAG.y
			});
			await commands.mouseUp();

			await expect.poll(() => floatsOf(component)).toHaveLength(3);
			const entry = floatsOf(component).at(-1)!;
			expect(expectStack(entry.content).panes.map((node) => node.id)).toEqual([
				'tab-one',
				'tab-two'
			]);
			expect(entry.rect).toEqual({ ...SHIFT_DRAG, ...BASE_LEFT_TOP_SIZE });
			expect(baseIdsOf(component)).toEqual([BASE_LEFT_BOTTOM, floatIds.baseRight]);
			expect(component.getWrites()).toBe(1);
		});
	});

	describe('pressed mid-drag', () => {
		it('returns the window to its stored rect and docks it on release', async () => {
			const component = renderWindows();
			await pressHeader(floatIds.paneB);
			await moveInBox(OVER_BASE_RIGHT);
			await expect.element(page.getByDragGhost()).not.toBeInTheDocument();

			await holdShift();

			await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
			await expect.element(page.getByDragGhost()).toHaveTextContent(floatIds.paneB);
			await expect.element(page.getByDropIndicator()).toBeInTheDocument();
			await commands.mouseUp();

			await expect.poll(() => baseIdsOf(component)).toContain(floatIds.paneB);
			expect(floatsOf(component).map((entry) => entry.id)).toEqual([floatIds.entryA]);
			expect(component.getWrites()).toBe(1);
		});

		it('resumes moving the window under the pointer when Shift is released', async () => {
			const component = renderWindows();
			await pressHeader(floatIds.paneB);
			await moveInBox(OVER_BASE_RIGHT);
			const underPointer = { ...WINDOW, x: 560, y: 288 };
			await holdShift();
			await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));

			await releaseShift();

			await expect.element(windowElement()).toHaveStyle(toStyle(underPointer));
			await expect.element(page.getByDragGhost()).not.toBeInTheDocument();
			await expect.element(page.getByDropIndicator()).not.toBeInTheDocument();
			await commands.mouseUp();

			await expect.poll(() => storedRect(component, floatIds.entryB)).toEqual(underPointer);
			expect(baseIdsOf(component)).toEqual([floatIds.baseLeft, floatIds.baseRight]);
			expect(component.getWrites()).toBe(1);
		});

		it('switches a base drag from docking to floating and back', async () => {
			renderWindows();
			await pressHeader(floatIds.baseLeft);
			await pointerOverBaseRight();
			await expect.element(page.getByDropIndicator()).toBeInTheDocument();

			await holdShift();

			await expect.element(page.getByDragGhost()).toHaveTextContent(floatIds.baseLeft);
			await expect.element(page.getByDropIndicator()).not.toBeInTheDocument();

			await releaseShift();

			await expect.element(page.getByDropIndicator()).toBeInTheDocument();
			await commands.mouseUp();
		});
	});

	describe('cancellation', () => {
		it('writes nothing when Escape ends a Shift drag that would dock a window', async () => {
			const component = renderWindows();
			await holdShift();
			await pressHeader(floatIds.paneB);
			await pointerOverBaseRight();
			await expect.element(page.getByDropIndicator()).toBeInTheDocument();

			await userEvent.keyboard('{Escape}');
			await commands.mouseUp();

			await expect.element(page.getByDragGhost()).not.toBeInTheDocument();
			await expect.element(windowElement()).toHaveStyle(toStyle(WINDOW));
			expect(baseIdsOf(component)).toEqual([floatIds.baseLeft, floatIds.baseRight]);
			expect(component.getWrites()).toBe(0);
		});

		it('writes nothing when Escape ends a Shift drag that would float a pane', async () => {
			const component = renderWindows();
			await holdShift();
			await pressHeader(floatIds.baseLeft);
			await pointerOverBaseRight();
			await expect.element(page.getByDragGhost()).toBeInTheDocument();

			await userEvent.keyboard('{Escape}');
			await commands.mouseUp();

			await expect.element(page.getByDragGhost()).not.toBeInTheDocument();
			expect(floatsOf(component)).toHaveLength(2);
			expect(component.getWrites()).toBe(0);
		});

		it('writes nothing when the window loses focus during a Shift drag that would float a pane', async () => {
			const component = renderWindows();
			await holdShift();
			await pressHeader(floatIds.baseLeft);
			await pointerOverBaseRight();
			await expect.element(page.getByDragGhost()).toBeInTheDocument();

			window.dispatchEvent(new Event('blur'));
			await commands.mouseUp();

			await expect.element(page.getByDragGhost()).not.toBeInTheDocument();
			expect(floatsOf(component)).toHaveLength(2);
			expect(component.getWrites()).toBe(0);
		});
	});
});
