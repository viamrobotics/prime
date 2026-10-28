import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';
import type { Locator } from 'vitest/browser';

import { CAM_A, CAM_B, CAM_C, CAMERA_ROW, CAMERAS, SOLO } from '../../../../test/layouts.ts';
import StackPanes from '../../../../test/fixtures/StackPanes.svelte';
import type { PaneData } from '../../../../test/layouts.ts';
import type { LayoutNode } from '../../layout.ts';

const LEFT_EDGE = { x: '10%', y: '50%' } as const;
const RIGHT_EDGE = { x: '90%', y: '50%' } as const;
const TOP_ZONE = { x: '80%', y: 10 } as const;
const INSIDE_LEFT_REGION = { x: 24, y: '50%' } as const;
const HEADER_ABOVE_BODY = { x: 20, y: 100 } as const;
const BODY_BELOW_HEADER = 'absolute inset-x-0 top-40 h-96';
const STACK_ZONE_HEIGHT_PX = 32;
const NARROW_PANE_MAX_WIDTH_PX = 160;
const HIT_AREA_MIN_PX = 24;
const TABS_TO_OWN_SLOT = 4;
const CHOOSE_DESTINATION = 'Choose a destination with the pointer or arrow keys, or press Escape.';
const MOVING_CAMERA_A = `Moving Camera A. ${CHOOSE_DESTINATION}`;
const MOVING_CAMERAS = `Moving Camera A, Camera B, and Camera C. ${CHOOSE_DESTINATION}`;

const REST_OF_CAMERAS = { ...CAMERAS, panes: [CAM_B, CAM_C], activeId: 'cam-b' };
const NARROW_SOLO_ROW = { ...CAMERA_ROW, ratio: 0.85 };
const NARROW_CAMERAS_ROW = { ...CAMERA_ROW, ratio: 0.85, first: SOLO, second: CAMERAS };
const CAMERA_B_SHOWN = { ...CAMERA_ROW, first: { ...CAMERAS, activeId: 'cam-b' } };

const grip = (label: string) => page.getByRole('button', { name: `Move ${label}`, exact: true });
const tab = (name: string) => page.getByRole('tab', { name, exact: true });
const strip = (paneId: string) => page.getByPane(paneId).getByRole('tablist');
const mark = (name: string) => page.getByRole('button', { name, exact: true });
const destination = (moving: string, target: string) =>
	page.getByRole('group', { name: `Move ${moving} to ${target}`, exact: true });
const labelsOf = (locator: Locator) =>
	locator.elements().map((element) => element.getAttribute('aria-label'));

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Panes stacks: stacking in move mode beside a region on the left side', () => {
	it('reaches "Stack with" when ArrowLeft follows the left edge', async () => {
		render(StackPanes, { hasTriggers: true, dropRegion: 'left' });
		grip('Solo').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}');
		await expect.element(mark('Place Solo left of Camera A')).toHaveFocus();

		await userEvent.keyboard('{ArrowLeft}');

		await expect.element(mark('Stack Solo with Camera A at position 4 of 4')).toHaveFocus();
		await expect.element(strip('cam-a').getByTabPreview()).toHaveTextContent('Solo');
	});
});

describe('Panes stacks: stacking by pointer in move mode', () => {
	it('previews a stack over the tab strip of a stacked pane as a preview tab, with no box over the tabs', async () => {
		render(StackPanes, { hasTriggers: true });
		await userEvent.click(grip('Solo'));

		await commands.mouseMove(strip('cam-a').selector, { x: '80%', y: '50%' });

		await expect.element(strip('cam-a').getByTabPreview()).toHaveTextContent('Solo');
		await expect
			.element(destination('Solo', 'Camera A').getByMovePreview())
			.not.toBeInTheDocument();
	});

	it('previews the top 32px of a pane that has no tab strip as the stack zone', async () => {
		render(StackPanes, { hasTriggers: true });
		await userEvent.click(grip('Camera A'));
		const solo = destination('Camera A', 'Solo');

		await commands.mouseMove(solo.selector, TOP_ZONE);

		await expect.element(solo.getByMovePreview()).toHaveAttribute('data-move-preview', 'stack');
		await expect
			.poll(() => solo.getByMovePreview().element().getBoundingClientRect().height)
			.toBe(STACK_ZONE_HEIGHT_PX);
	});

	it('previews the region on the left side as a preview tab', async () => {
		render(StackPanes, { hasTriggers: true, dropRegion: 'left' });
		await userEvent.click(grip('Solo'));

		await commands.mouseMove(destination('Solo', 'Camera A').selector, INSIDE_LEFT_REGION);

		await expect.element(strip('cam-a').getByTabPreview()).toHaveTextContent('Solo');
		await expect
			.element(destination('Solo', 'Camera A').getByMovePreview())
			.not.toBeInTheDocument();
	});

	it('previews the top edge for a point in the header above a pane body', async () => {
		render(StackPanes, {
			hasTriggers: true,
			hasPaneBody: true,
			bodyClass: BODY_BELOW_HEADER,
			dropRegion: 'none'
		});
		await userEvent.click(grip('Solo'));

		await commands.mouseMove(destination('Solo', 'Camera A').selector, HEADER_ABOVE_BODY);

		await expect
			.element(destination('Solo', 'Camera A').getByMovePreview())
			.toHaveAttribute('data-move-preview', 'top');
	});

	it('previews the stack zone over the stack mark', async () => {
		render(StackPanes, { hasTriggers: true, dropRegion: 'drag-only' });
		await userEvent.click(grip('Camera A'));
		const solo = destination('Camera A', 'Solo');
		await commands.mouseMove(solo.selector, { x: '50%', y: '50%' });

		await commands.mouseMove(mark('Stack Camera A with Solo').selector);

		await expect.element(solo.getByMovePreview()).toHaveAttribute('data-move-preview', 'stack');
	});

	it('previews the top edge over the top mark', async () => {
		render(StackPanes, {
			hasTriggers: true,
			dropRegion: 'left',
			initialLayout: NARROW_SOLO_ROW
		});
		await userEvent.click(grip('Camera A'));
		const solo = destination('Camera A', 'Solo');
		await commands.mouseMove(solo.selector, RIGHT_EDGE);

		await commands.mouseMove(mark('Place Camera A above Solo').selector, LEFT_EDGE);

		await expect.element(solo.getByMovePreview()).toHaveAttribute('data-move-preview', 'top');
	});
});

describe('Panes stacks: the stack mark and the top mark', () => {
	const MARK_CASES = [
		{
			pane: 'with no tab strip',
			layout: NARROW_SOLO_ROW,
			movingLabel: 'Camera A',
			paneId: 'solo',
			paneLabel: 'Solo',
			stackName: 'Stack Camera A with Solo',
			topName: 'Place Camera A above Solo'
		},
		{
			pane: 'with a tab strip',
			layout: NARROW_CAMERAS_ROW,
			movingLabel: 'Solo',
			paneId: 'cam-a',
			paneLabel: 'Camera A',
			stackName: 'Stack Solo with Camera A at position 4 of 4',
			topName: 'Place Solo above Camera A'
		}
	];

	const startEngaged = async ({ layout, movingLabel, paneLabel }: (typeof MARK_CASES)[number]) => {
		render(StackPanes, { hasTriggers: true, initialLayout: layout });
		await userEvent.click(grip(movingLabel));
		await commands.mouseMove(destination(movingLabel, paneLabel).selector);
	};

	const zoneOf = (paneId: string) =>
		page.getByPane(paneId).getByTabListDropRegion().element().getBoundingClientRect();

	it.each(MARK_CASES)(
		'keeps the two marks apart on a pane narrower than 160px $pane',
		async (markCase) => {
			const { movingLabel, paneLabel, stackName, topName } = markCase;
			await startEngaged(markCase);

			const paneWidth = destination(movingLabel, paneLabel).element().getBoundingClientRect().width;
			expect(paneWidth, 'the pane width').toBeLessThan(NARROW_PANE_MAX_WIDTH_PX);
			await expect
				.poll(
					() => {
						const stack = mark(stackName).element().getBoundingClientRect();
						const top = mark(topName).element().getBoundingClientRect();
						return (
							stack.left < top.right &&
							top.left < stack.right &&
							stack.top < top.bottom &&
							top.top < stack.bottom
						);
					},
					{ message: 'the marks overlap' }
				)
				.toBe(false);
		}
	);

	it.each(MARK_CASES)('centers the stack mark across the pane $pane', async (markCase) => {
		const { movingLabel, paneLabel, stackName } = markCase;
		await startEngaged(markCase);

		const paneRect = destination(movingLabel, paneLabel).element().getBoundingClientRect();
		const markRect = mark(stackName).element().getBoundingClientRect();

		expect(markRect.left + markRect.width / 2).toBeCloseTo(paneRect.left + paneRect.width / 2, 0);
	});

	it.each(MARK_CASES)(
		'keeps the stack mark inside the stack zone of a pane $pane',
		async (markCase) => {
			await startEngaged(markCase);
			const zone = zoneOf(markCase.paneId);

			await expect
				.poll(() => {
					const { top, bottom } = mark(markCase.stackName).element().getBoundingClientRect();
					return { isBelowTop: top >= zone.top - 1, isAboveBottom: bottom <= zone.bottom + 1 };
				})
				.toEqual({ isBelowTop: true, isAboveBottom: true });
		}
	);

	it.each(MARK_CASES)(
		'starts the top mark at or below the stack zone of a pane $pane',
		async (markCase) => {
			await startEngaged(markCase);
			const zone = zoneOf(markCase.paneId);

			await expect
				.poll(() => Math.round(mark(markCase.topName).element().getBoundingClientRect().top))
				.toBeGreaterThanOrEqual(Math.round(zone.bottom));
		}
	);

	it.each(MARK_CASES)(
		'gives the stack mark a hit area of at least 24 by 24 pixels on a pane $pane',
		async (markCase) => {
			await startEngaged(markCase);

			const { width, height } = mark(markCase.stackName).element().getBoundingClientRect();

			expect(Math.min(width, height)).toBeGreaterThanOrEqual(HIT_AREA_MIN_PX);
		}
	);
});

describe('Panes stacks: a pane without a drop region in move mode', () => {
	it('offers the swap and the four edges and no "Stack with"', async () => {
		render(StackPanes, { hasTriggers: true, dropRegion: 'none' });

		await userEvent.click(grip('Solo'));

		await expect
			.poll(() => labelsOf(destination('Solo', 'Camera A').getByRole('button')))
			.toEqual([
				'Swap Solo with Camera A',
				'Place Solo left of Camera A',
				'Place Solo right of Camera A',
				'Place Solo above Camera A',
				'Place Solo below Camera A'
			]);
	});
});

describe('Panes stacks: a drop region that renders only during a drag in move mode', () => {
	it('keeps "Stack with" reachable by ArrowUp past the top edge', async () => {
		render(StackPanes, { hasTriggers: true, dropRegion: 'drag-only' });
		grip('Solo').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard('{ArrowLeft}{ArrowUp}');
		await expect.element(mark('Place Solo above Camera A')).toHaveFocus();

		await userEvent.keyboard('{ArrowUp}');

		await expect.element(mark('Stack Solo with Camera A at position 4 of 4')).toHaveFocus();
	});

	it('places the stack mark at the top center of the pane', async () => {
		render(StackPanes, { hasTriggers: true, dropRegion: 'drag-only' });
		grip('Solo').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard('{ArrowLeft}{ArrowUp}{ArrowUp}');
		const paneRect = destination('Solo', 'Camera A').element().getBoundingClientRect();

		await expect
			.poll(() => {
				const markRect = mark('Stack Solo with Camera A at position 4 of 4')
					.element()
					.getBoundingClientRect();
				return {
					centerX: Math.round(markRect.left + markRect.width / 2),
					isInTopStrip:
						markRect.top >= paneRect.top && markRect.bottom <= paneRect.top + STACK_ZONE_HEIGHT_PX
				};
			})
			.toEqual({ centerX: Math.round(paneRect.left + paneRect.width / 2), isInTopStrip: true });
	});
});

describe('Panes stacks: a stacked pane placed on a center in move mode', () => {
	it('names the whole stack on the swap button and the one pane on the other buttons', async () => {
		render(StackPanes, { hasTriggers: true });

		await userEvent.click(grip('Camera A'));

		await expect
			.poll(() => labelsOf(destination('Camera A', 'Solo').getByRole('button')))
			.toEqual([
				'Swap Camera A, Camera B, and Camera C with Solo',
				'Stack Camera A with Solo',
				'Place Camera A left of Solo',
				'Place Camera A right of Solo',
				'Place Camera A above Solo',
				'Place Camera A below Solo'
			]);
	});

	it('swaps the whole stack with the pane and announces the stack', async () => {
		const { component } = render(StackPanes, { hasTriggers: true });
		grip('Camera A').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard('{ArrowRight}{ArrowRight}');

		await userEvent.keyboard('{Enter}');

		await expect
			.poll(() => component.getLayout())
			.toEqual({ ...CAMERA_ROW, first: SOLO, second: CAMERAS });
		await expect
			.element(page.getByRole('status'))
			.toHaveTextContent('Camera A, Camera B, and Camera C swapped with Solo.');
	});

	it('names the destination after the moving pane, since only the swap moves the whole stack', async () => {
		render(StackPanes, { hasTriggers: true });

		await userEvent.click(grip('Camera A'));

		await expect
			.poll(() => labelsOf(page.getByRole('group')))
			.toEqual(['Move Camera A to Camera B and Camera C', 'Move Camera A to Solo']);
	});
});

describe('Panes.MoveTrigger target', () => {
	it('offers only the other slots when the whole stack moves', async () => {
		render(StackPanes, { hasTriggers: true, moveTarget: 'stack' });

		await userEvent.click(grip('Camera A'));

		await expect
			.poll(() => labelsOf(page.getByRole('group')))
			.toEqual(['Move Camera A, Camera B, and Camera C to Solo']);
	});

	it('names the stack by its panes in the notice', async () => {
		render(StackPanes, { hasTriggers: true, moveTarget: 'stack' });

		await userEvent.click(grip('Camera A'));

		await expect.element(page.getByMovingNotice()).toHaveTextContent(MOVING_CAMERAS);
	});

	it('moves the whole stack to the left of a pane', async () => {
		const { component } = render(StackPanes, { hasTriggers: true, moveTarget: 'stack' });
		await userEvent.click(grip('Camera A'));

		await commands.mouseMove(
			destination('Camera A, Camera B, and Camera C', 'Solo').selector,
			LEFT_EDGE
		);
		await commands.mouseDown();
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({
				type: 'split',
				id: expect.any(String),
				direction: 'row',
				ratio: 0.5,
				first: CAMERAS,
				second: SOLO
			});
		await expect
			.element(page.getByRole('status'))
			.toHaveTextContent('Camera A, Camera B, and Camera C placed left of Solo.');
	});

	it('moves only the pane when a pane that is not stacked has target="stack"', async () => {
		const { component } = render(StackPanes, { hasTriggers: true, moveTarget: 'stack' });
		await userEvent.click(grip('Solo'));
		await expect
			.element(page.getByMovingNotice())
			.toHaveTextContent(`Moving Solo. ${CHOOSE_DESTINATION}`);

		await commands.mouseMove(destination('Solo', 'Camera A').selector, LEFT_EDGE);
		await commands.mouseDown();
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({
				type: 'split',
				id: expect.any(String),
				direction: 'row',
				ratio: 0.5,
				first: SOLO,
				second: CAMERAS
			});
	});

	it('presses only the trigger whose target is moving', async () => {
		render(StackPanes, { hasTriggers: true, moveTarget: 'pane', hasStackTrigger: true });

		await userEvent.click(grip('stack of Camera A'));

		await expect.element(grip('stack of Camera A')).toHaveAttribute('aria-pressed', 'true');
		await expect.element(grip('Camera A')).toHaveAttribute('aria-pressed', 'false');
	});

	it('moves the whole stack instead when its trigger is clicked during a move of the pane', async () => {
		render(StackPanes, { hasTriggers: true, moveTarget: 'pane', hasStackTrigger: true });
		await userEvent.click(grip('Camera A'));
		await expect.element(page.getByMovingNotice()).toHaveTextContent(MOVING_CAMERA_A);

		await userEvent.click(grip('stack of Camera A'), { force: true });

		await expect.element(page.getByMovingNotice()).toHaveTextContent(MOVING_CAMERAS);
		await expect.element(grip('Camera A')).toHaveAttribute('aria-pressed', 'false');
	});

	it('starts no move when the stack fills the view, since it has nowhere to go', async () => {
		render(StackPanes, { hasTriggers: true, moveTarget: 'stack', initialLayout: CAMERAS });

		await userEvent.click(grip('Camera A'));

		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
	});
});

describe('Panes stacks: leaving a stack in move mode', () => {
	it('offers the own slot of a pane with no tab list the four edges and no reorder', async () => {
		render(StackPanes, { hasTriggers: true, hasTabList: false });

		await userEvent.click(grip('Camera A'));

		await expect
			.poll(() => labelsOf(destination('Camera A', 'Camera B and Camera C').getByRole('button')))
			.toEqual([
				'Place Camera A left of Camera B and Camera C',
				'Place Camera A right of Camera B and Camera C',
				'Place Camera A above Camera B and Camera C',
				'Place Camera A below Camera B and Camera C'
			]);
	});

	it('leaves the moving pane content interactive, since its slot is not another pane', async () => {
		render(StackPanes, { hasTriggers: true });

		await userEvent.click(grip('Camera A'));

		await expect.element(page.getByPane('solo')).toHaveAttribute('inert');
		await expect.element(page.getByPane('cam-a')).not.toHaveAttribute('inert');
	});

	it('names the reorder and the placements beside the rest of the stack', async () => {
		render(StackPanes, { hasTriggers: true });

		await userEvent.click(grip('Camera A'));

		await expect
			.poll(() => labelsOf(destination('Camera A', 'Camera B and Camera C').getByRole('button')))
			.toEqual([
				'Move Camera A to position 1 of 3',
				'Place Camera A left of Camera B and Camera C',
				'Place Camera A right of Camera B and Camera C',
				'Place Camera A above Camera B and Camera C',
				'Place Camera A below Camera B and Camera C'
			]);
	});

	it('is a tab stop that selects the left edge first', async () => {
		render(StackPanes, { hasTriggers: true });
		grip('Camera A').element().focus();
		await userEvent.keyboard('{Enter}');

		await userEvent.keyboard('{Tab}'.repeat(TABS_TO_OWN_SLOT));

		await expect.element(mark('Place Camera A left of Camera B and Camera C')).toHaveFocus();
		await expect
			.element(destination('Camera A', 'Camera B and Camera C').getByMovePreview())
			.toHaveAttribute('data-move-preview', 'left');
	});

	it('places the moving pane beside the rest of its stack with Enter', async () => {
		const { component } = render(StackPanes, { hasTriggers: true });
		grip('Camera A').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard('{Tab}'.repeat(TABS_TO_OWN_SLOT));
		await userEvent.keyboard('{ArrowRight}');

		await userEvent.keyboard('{Enter}');

		await expect
			.poll(() => component.getLayout())
			.toEqual({
				...CAMERA_ROW,
				first: {
					type: 'split',
					id: expect.any(String),
					direction: 'row',
					ratio: 0.5,
					first: REST_OF_CAMERAS,
					second: CAM_A
				}
			});
		await expect
			.element(page.getByRole('status'))
			.toHaveTextContent('Camera A placed right of Camera B and Camera C.');
	});

	it('crosses from the own slot to the next pane and back', async () => {
		render(StackPanes, { hasTriggers: true });
		grip('Camera A').element().focus();
		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard('{Tab}'.repeat(TABS_TO_OWN_SLOT));
		await userEvent.keyboard('{ArrowRight}{ArrowRight}');
		await expect.element(mark('Place Camera A left of Solo')).toHaveFocus();

		await userEvent.keyboard('{ArrowLeft}');

		await expect.element(mark('Place Camera A right of Camera B and Camera C')).toHaveFocus();
	});

	it('previews the nearest edge, left, where the center of the own slot would be', async () => {
		render(StackPanes, { hasTriggers: true });
		await userEvent.click(grip('Camera A'));
		const ownSlot = destination('Camera A', 'Camera B and Camera C');

		await commands.mouseMove(ownSlot.selector, { x: '45%', y: '50%' });

		await expect.element(ownSlot.getByMovePreview()).toHaveAttribute('data-move-preview', 'left');
	});

	it('cancels the move when the trigger of the moving pane is clicked, though its own slot covers it', async () => {
		const { component } = render(StackPanes, { hasTriggers: true });
		await userEvent.click(grip('Camera A'));
		await expect.element(page.getByPanesInMoveMode()).toBeInTheDocument();

		await userEvent.click(grip('Camera A'), { force: true });

		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
		await expect.element(page.getByRole('status')).toHaveTextContent('Move canceled.');
		expect(component.getLayout()).toEqual(CAMERA_ROW);
	});

	it('places a stacked pane in a view that holds only its stack', async () => {
		const { component } = render(StackPanes, { hasTriggers: true, initialLayout: CAMERAS });
		await userEvent.click(grip('Camera A'));
		await expect
			.poll(() => labelsOf(page.getByRole('group')))
			.toEqual(['Move Camera A to Camera B and Camera C']);

		await commands.mouseMove(destination('Camera A', 'Camera B and Camera C').selector, {
			x: '55%',
			y: '50%'
		});
		await commands.mouseDown();
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({
				type: 'split',
				id: expect.any(String),
				direction: 'row',
				ratio: 0.5,
				first: REST_OF_CAMERAS,
				second: CAM_A
			});
	});
});

describe('Panes stacks: selecting a tab during a move', () => {
	it('ends the move even when the binding rejects the selection', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { component } = render(StackPanes, {
			hasTriggers: true,
			isAccepting: false,
			received
		});
		await userEvent.click(grip('Camera A'));
		await expect.element(page.getByPanesInMoveMode()).toBeInTheDocument();
		tab('Camera B').element().focus();

		await userEvent.keyboard('{Enter}');

		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
		expect(received).toHaveLength(1);
		await expect.element(page.getByRole('status')).toHaveTextContent('Move canceled.');
		expect(component.getLayout()).toEqual(CAMERA_ROW);
	});

	it('ends a whole-stack move when a tab is activated and the panes stay mounted hidden', async () => {
		const { component } = render(StackPanes, {
			hasTriggers: true,
			keepInactiveMounted: true,
			moveTarget: 'stack'
		});
		await userEvent.click(grip('Camera A'));
		await expect.element(page.getByPanesInMoveMode()).toBeInTheDocument();

		await userEvent.click(tab('Camera B'));

		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
		await expect.element(page.getByRole('status')).toHaveTextContent('Move canceled.');
		expect(component.getLayout()).toEqual(CAMERA_B_SHOWN);
		await expect.element(tab('Camera B')).toHaveFocus();
	});
});

describe('Panes stacks: move mode with keepInactiveMounted', () => {
	it('offers no destination on the hidden panes of a stack', async () => {
		render(StackPanes, { hasTriggers: true, keepInactiveMounted: true });

		await userEvent.click(grip('Solo'));

		await expect.poll(() => labelsOf(page.getByRole('group'))).toEqual(['Move Solo to Camera A']);
	});

	it('offers the own slot once when the moving pane has hidden stack-mates', async () => {
		render(StackPanes, { hasTriggers: true, keepInactiveMounted: true });

		await userEvent.click(grip('Camera A'));

		await expect
			.poll(() => labelsOf(page.getByRole('group')))
			.toEqual(['Move Camera A to Camera B and Camera C', 'Move Camera A to Solo']);
	});

	it('marks the shown pane of a moving stack alone', async () => {
		render(StackPanes, {
			hasTriggers: true,
			keepInactiveMounted: true,
			moveTarget: 'stack'
		});

		await userEvent.click(grip('Camera A'));

		await expect.element(page.getByPane('cam-a')).toHaveAttribute('data-moving');
		await expect.poll(() => page.getByMovingPane().elements()).toHaveLength(1);
		await expect.poll(() => page.getByMovingNotice().elements()).toHaveLength(1);
	});

	it('steps from the pane beside a stack to its shown pane, not to a hidden one', async () => {
		render(StackPanes, {
			hasTriggers: true,
			keepInactiveMounted: true,
			initialLayout: CAMERA_B_SHOWN
		});
		grip('Solo').element().focus();
		await userEvent.keyboard('{Enter}');

		await userEvent.keyboard('{ArrowLeft}');

		await expect.element(mark('Place Solo right of Camera B')).toHaveFocus();
	});
});
