import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import {
	CAM_A,
	CAM_B,
	CAM_C,
	CAMERA_ROW,
	STACK_A,
	STACK_B,
	TWO_STACKS
} from '../../../../test/layouts.ts';
import type { PaneData } from '../../../../test/layouts.ts';
import type { LayoutNode } from '../../layout.ts';
import StackPanes from '../../../../test/fixtures/StackPanes.svelte';

type Received = (LayoutNode<PaneData> | undefined)[];

const MOVE_RIGHT = '{Alt>}{Shift>}{ArrowRight}{/Shift}{/Alt}';
const MOVE_LEFT = '{Alt>}{Shift>}{ArrowLeft}{/Shift}{/Alt}';
const TO_OWN_REORDER = '{Tab}{Tab}{Tab}{Tab}{ArrowUp}{ArrowUp}';
const TO_STACK_WITH = '{ArrowRight}{ArrowUp}{ArrowUp}';
const AFTER_FIRST_TAB = { x: '90%', y: '50%' } as const;
const BEFORE_TAB = { x: '10%', y: '50%' } as const;
const PAST_CENTER = { x: '60%', y: '50%' } as const;
const STRIP_END = { x: '95%', y: '50%' } as const;

const [A1] = STACK_A.panes;
const [B1, B2, B3] = STACK_B.panes;

const tab = (name: string) => page.getByRole('tab', { name, exact: true });
const firstStrip = () => page.getByRole('tablist').first();
const lastStrip = () => page.getByRole('tablist').last();
const moveButton = (name: string) => page.getByRole('button', { name, exact: true });
const announcer = () => page.getByRole('status');

const orderIn = (strip: ReturnType<typeof firstStrip>) =>
	strip
		.getByTabSlot()
		.elements()
		.map((element) =>
			element.hasAttribute('data-tab-preview')
				? `preview ${element.textContent?.trim()}`
				: element.textContent?.trim()
		);

describe('Panes.TabList: Alt+Shift+Arrow on a focused tab', () => {
	it('moves the tab one place right', async () => {
		const { component } = render(StackPanes);
		tab('Camera A').element().focus();

		await userEvent.keyboard(MOVE_RIGHT);

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ first: { panes: [CAM_B, CAM_A, CAM_C], activeId: 'cam-a' } });
	});

	it('moves the tab one place left and makes it the active one', async () => {
		const { component } = render(StackPanes);
		tab('Camera C').element().focus();

		await userEvent.keyboard(MOVE_LEFT);

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ first: { panes: [CAM_A, CAM_C, CAM_B], activeId: 'cam-c' } });
	});

	it('keeps focus on the moved tab when it was not the active one', async () => {
		render(StackPanes);
		tab('Camera B').element().focus();

		await userEvent.keyboard(MOVE_RIGHT);

		await expect.element(tab('Camera B')).toHaveFocus();
	});

	it('keeps focus on the moved tab across repeated presses', async () => {
		render(StackPanes);
		tab('Camera A').element().focus();

		await userEvent.keyboard(MOVE_RIGHT + MOVE_RIGHT);

		await expect.poll(() => orderIn(firstStrip())).toEqual(['Camera B', 'Camera C', 'Camera A']);
		await expect.element(tab('Camera A')).toHaveFocus();
	});

	it('announces the new position of the moved pane', async () => {
		render(StackPanes);
		tab('Camera C').element().focus();

		await userEvent.keyboard(MOVE_LEFT);

		await expect.element(announcer()).toHaveTextContent('Camera C moved to position 2 of 3.');
	});

	it('does nothing when the view is not reorderable', async () => {
		const received: Received = [];
		const { component } = render(StackPanes, { received, reorderable: false });
		tab('Camera A').element().focus();

		await userEvent.keyboard(MOVE_RIGHT);

		expect(received).toEqual([]);
		expect(component.getLayout()).toEqual(CAMERA_ROW);
		expect(announcer().element().textContent).toBe('');
	});

	it('names the shortcut on each tab while reorderable', async () => {
		render(StackPanes);

		await expect
			.element(tab('Camera A'))
			.toHaveAttribute('aria-keyshortcuts', 'Alt+Shift+ArrowLeft Alt+Shift+ArrowRight');
	});

	it('names no shortcut when the view is not reorderable', async () => {
		render(StackPanes, { reorderable: false });

		await expect.element(tab('Camera A')).toBeInTheDocument();
		await expect.element(tab('Camera A')).not.toHaveAttribute('aria-keyshortcuts');
	});

	it('leaves the order when the function binding vetoes the move', async () => {
		const received: Received = [];
		const { component } = render(StackPanes, { received, isAccepting: false });
		tab('Camera A').element().focus();

		await userEvent.keyboard(MOVE_RIGHT);

		await expect.poll(() => received.length).toBe(1);
		expect(component.getLayout()).toEqual(CAMERA_ROW);
		expect(orderIn(firstStrip())).toEqual(['Camera A', 'Camera B', 'Camera C']);
		expect(announcer().element().textContent).toBe('');
	});
});

describe('Panes move mode: reordering a tab by keyboard', () => {
	it('names the reorder placement with the current position of the moving pane', async () => {
		render(StackPanes, { hasTriggers: true });
		moveButton('Move Camera A').element().focus();
		await userEvent.keyboard('{Enter}');

		await userEvent.keyboard(TO_OWN_REORDER);

		await expect.element(moveButton('Move Camera A to position 1 of 3')).toHaveFocus();
	});

	it('moves the position one place and renames the button', async () => {
		render(StackPanes, { hasTriggers: true });
		moveButton('Move Camera A').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_OWN_REORDER);

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(moveButton('Move Camera A to position 2 of 3')).toHaveFocus();
	});

	it('shows the label of the moving pane in its preview tab, since no ghost follows a keyboard move', async () => {
		render(StackPanes, { hasTriggers: true });
		moveButton('Move Camera A').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_OWN_REORDER);

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(page.getByTabPreview().getByText('Camera A')).toBeVisible();
	});

	it('announces each position it moves to', async () => {
		render(StackPanes, { hasTriggers: true });
		moveButton('Move Camera A').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_OWN_REORDER);

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(announcer()).toHaveTextContent('Move Camera A to position 2 of 3');
	});

	it('shows the preview tab at the chosen position and takes the moving tab out of the strip', async () => {
		render(StackPanes, { hasTriggers: true });
		moveButton('Move Camera A').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_OWN_REORDER);

		await userEvent.keyboard('{ArrowRight}');

		await expect
			.poll(() => orderIn(firstStrip()))
			.toEqual(['Camera B', 'preview Camera A', 'Camera C']);
	});

	it('shows no preview tab once the selection returns to an edge', async () => {
		render(StackPanes, { hasTriggers: true });
		moveButton('Move Camera A').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_OWN_REORDER + '{ArrowRight}');
		await expect.poll(() => orderIn(firstStrip())).toContain('preview Camera A');

		await userEvent.keyboard('{ArrowDown}');

		await expect.element(moveButton('Place Camera A above Camera B and Camera C')).toHaveFocus();
		await expect.poll(() => orderIn(firstStrip())).toEqual(['Camera A', 'Camera B', 'Camera C']);
	});

	it('places the pane at the chosen position on Enter and keeps it active', async () => {
		const { component } = render(StackPanes, { hasTriggers: true });
		moveButton('Move Camera A').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_OWN_REORDER + '{ArrowRight}{ArrowRight}');

		await userEvent.keyboard('{Enter}');

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ first: { panes: [CAM_B, CAM_C, CAM_A], activeId: 'cam-a' } });
		await expect.element(announcer()).toHaveTextContent('Camera A moved to position 3 of 3.');
		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
	});

	it('leaves the layout as it was when Enter follows the default position', async () => {
		const received: Received = [];
		const { component } = render(StackPanes, { hasTriggers: true, received });
		moveButton('Move Camera A').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_OWN_REORDER);

		await userEvent.keyboard('{Enter}');

		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
		expect(received).toEqual([]);
		expect(component.getLayout()).toEqual(CAMERA_ROW);
		await expect.element(announcer()).toHaveTextContent('Camera A moved to position 1 of 3.');
	});
});

describe('Panes move mode: reordering a tab by pointer', () => {
	it('shows the preview tab at the gap under the pointer over its own strip', async () => {
		render(StackPanes, { hasTriggers: true });
		await userEvent.click(moveButton('Move Camera A'));

		await commands.mouseMove(tab('Camera C').selector, PAST_CENTER);

		await expect
			.poll(() => orderIn(firstStrip()))
			.toEqual(['Camera B', 'Camera C', 'preview Camera A']);
	});

	it('moves the pane to the gap under the pointer on a click and keeps it active', async () => {
		const { component } = render(StackPanes, { hasTriggers: true });
		await userEvent.click(moveButton('Move Camera A'));

		await commands.mouseMove(tab('Camera A').selector, PAST_CENTER);
		await expect
			.poll(() => orderIn(firstStrip()))
			.toEqual(['Camera B', 'preview Camera A', 'Camera C']);
		await commands.mouseDown();
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ first: { panes: [CAM_B, CAM_A, CAM_C], activeId: 'cam-a' } });
		await expect.element(announcer()).toHaveTextContent('Camera A moved to position 2 of 3.');
	});

	it('names the reorder button with the position under the pointer', async () => {
		render(StackPanes, { hasTriggers: true });
		await userEvent.click(moveButton('Move Camera A'));

		await commands.mouseMove(firstStrip().selector, STRIP_END);

		await expect.element(moveButton('Move Camera A to position 3 of 3')).toBeInTheDocument();
	});
});

describe('Panes move mode: choosing where "Stack with" inserts', () => {
	it('defaults to the end of the stack', async () => {
		render(StackPanes, { hasTriggers: true, initialLayout: TWO_STACKS });
		moveButton('Move A1').element().focus();
		await userEvent.keyboard('{Enter}');

		await userEvent.keyboard(TO_STACK_WITH);

		await expect.element(moveButton('Stack A1 with B2 at position 4 of 4')).toHaveFocus();
	});

	it('shows no preview tab for a destination that is not stacked', async () => {
		render(StackPanes, { hasTriggers: true });
		moveButton('Move Camera A').element().focus();
		await userEvent.keyboard('{Enter}');

		await userEvent.keyboard(TO_STACK_WITH);

		await expect.element(moveButton('Stack Camera A with Solo')).toHaveFocus();
		await expect.element(page.getByTabPreview()).not.toBeInTheDocument();
	});

	it('moves the position one gap per arrow and shows the preview tab there', async () => {
		render(StackPanes, { hasTriggers: true, initialLayout: TWO_STACKS });
		moveButton('Move A1').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_STACK_WITH);

		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');

		await expect.element(moveButton('Stack A1 with B2 at position 2 of 4')).toHaveFocus();
		await expect.poll(() => orderIn(lastStrip())).toEqual(['B1', 'preview A1', 'B2', 'B3']);
	});

	it('continues to the right edge when ArrowRight follows the end', async () => {
		render(StackPanes, { hasTriggers: true, initialLayout: TWO_STACKS });
		moveButton('Move A1').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_STACK_WITH);

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(moveButton('Place A1 right of B2')).toHaveFocus();
	});

	it('inserts at the chosen position on Enter and shows the inserted pane', async () => {
		const { component } = render(StackPanes, {
			hasTriggers: true,
			initialLayout: TWO_STACKS
		});
		moveButton('Move A1').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_STACK_WITH + '{ArrowLeft}{ArrowLeft}');

		await userEvent.keyboard('{Enter}');

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ second: { panes: [B1, A1, B2, B3], activeId: 'a1' } });
		await expect.element(announcer()).toHaveTextContent('A1 stacked with B2.');
	});

	it('appends the pane on Enter when no position was chosen', async () => {
		const { component } = render(StackPanes, {
			hasTriggers: true,
			initialLayout: TWO_STACKS
		});
		moveButton('Move A1').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard(TO_STACK_WITH);

		await userEvent.keyboard('{Enter}');

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ second: { panes: [B1, B2, B3, A1], activeId: 'a1' } });
	});

	it('counts every pane of a moving stack in the total', async () => {
		render(StackPanes, {
			hasTriggers: true,
			moveTarget: 'stack',
			initialLayout: TWO_STACKS
		});
		moveButton('Move A1').element().focus();
		await userEvent.keyboard('{Enter}');

		await userEvent.keyboard(TO_STACK_WITH);

		await expect.element(moveButton('Stack A1 and A2 with B2 at position 4 of 5')).toHaveFocus();
	});

	it('previews the gap under the pointer over the strip of another stack', async () => {
		render(StackPanes, { hasTriggers: true, initialLayout: TWO_STACKS });
		await userEvent.click(moveButton('Move A1'));

		await commands.mouseMove(tab('B2').selector, BEFORE_TAB);

		await expect.poll(() => orderIn(lastStrip())).toEqual(['B1', 'preview A1', 'B2', 'B3']);
	});

	it('inserts at the gap under the pointer on a click and shows the inserted pane', async () => {
		const { component } = render(StackPanes, {
			hasTriggers: true,
			initialLayout: TWO_STACKS
		});
		await userEvent.click(moveButton('Move A1'));

		await commands.mouseMove(tab('B2').selector, BEFORE_TAB);
		await commands.mouseDown();
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ second: { panes: [B1, A1, B2, B3], activeId: 'a1' } });
	});

	it('appends the pane on a click past the last tab', async () => {
		const { component } = render(StackPanes, {
			hasTriggers: true,
			initialLayout: TWO_STACKS
		});
		await userEvent.click(moveButton('Move A1'));

		await commands.mouseMove(lastStrip().selector, STRIP_END);
		await commands.mouseDown();
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ second: { panes: [B1, B2, B3, A1], activeId: 'a1' } });
	});
});

describe('Panes move mode: choosing where "Stack with" inserts by touch', () => {
	it('previews the gap of the first tap and announces its position without placing', async () => {
		const { component } = render(StackPanes, {
			hasTriggers: true,
			initialLayout: TWO_STACKS
		});
		await userEvent.click(moveButton('Move A1'));

		await commands.touchStart(tab('B1').selector, AFTER_FIRST_TAB);
		await commands.touchEnd();

		await expect.element(announcer()).toHaveTextContent('Stack A1 with B2 at position 2 of 4');
		await expect.poll(() => orderIn(lastStrip())).toEqual(['B1', 'preview A1', 'B2', 'B3']);
		expect(component.getLayout()).toEqual(TWO_STACKS);
	});

	it('inserts at the gap on a second tap of the same gap', async () => {
		const { component } = render(StackPanes, {
			hasTriggers: true,
			initialLayout: TWO_STACKS
		});
		await userEvent.click(moveButton('Move A1'));
		await commands.touchStart(tab('B1').selector, AFTER_FIRST_TAB);
		await commands.touchEnd();

		await commands.touchStart(tab('B1').selector, AFTER_FIRST_TAB);
		await commands.touchEnd();

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ second: { panes: [B1, A1, B2, B3], activeId: 'a1' } });
	});

	it('previews the new gap instead of placing when the second tap lands on another gap', async () => {
		const { component } = render(StackPanes, {
			hasTriggers: true,
			initialLayout: TWO_STACKS
		});
		await userEvent.click(moveButton('Move A1'));
		await commands.touchStart(tab('B1').selector, AFTER_FIRST_TAB);
		await commands.touchEnd();

		await commands.touchStart(lastStrip().selector, STRIP_END);
		await commands.touchEnd();

		await expect.element(announcer()).toHaveTextContent('Stack A1 with B2 at position 4 of 4');
		await expect.poll(() => orderIn(lastStrip())).toEqual(['B1', 'B2', 'B3', 'preview A1']);
		expect(component.getLayout()).toEqual(TWO_STACKS);
	});
});
