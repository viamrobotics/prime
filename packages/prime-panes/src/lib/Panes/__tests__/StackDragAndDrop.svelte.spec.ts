import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';
import type { Locator } from 'vitest/browser';

import {
	CAM_A,
	CAM_B,
	CAM_C,
	CAMERA_ROW,
	CAMERAS,
	SOLO,
	STACK_A,
	STACK_B,
	TWO_STACKS
} from '../../../../test/layouts.ts';
import StackPanes from '../../../../test/fixtures/StackPanes.svelte';
import type { Point } from '../../../../test/input-commands.ts';
import type { PaneData } from '../../../../test/layouts.ts';
import type { LayoutNode } from '../../layout.ts';

const TOP_ZONE = { x: '50%', y: 10 } as const;
const RIGHT_EDGE = { x: '90%', y: '50%' } as const;
const EMPTY_STRIP_AREA = { x: '95%', y: '50%' } as const;
const INSIDE_LEFT_REGION = { x: 24, y: '50%' } as const;
const HEADER_ABOVE_BODY = { x: 20, y: 100 } as const;
const BODY_BELOW_HEADER = 'absolute inset-x-0 top-40 h-96';
const SOLO_STACKED_WITH_CAMERAS = {
	...CAMERAS,
	panes: [CAM_A, CAM_B, CAM_C, SOLO],
	activeId: 'solo'
};
const STACK_DRAG_WARNING =
	'Panes: a stack drag started in pane "Camera A", which has no Panes.MoveTrigger with target="stack". Dragging alone fails WCAG 2.5.7 (Dragging Movements), so render a Panes.MoveTrigger with target="stack" in the pane to move its stack without dragging. A Panes.MoveTrigger that mounts only on demand, such as inside a menu, still triggers this warning until it first mounts.';

const tab = (name: string) => page.getByRole('tab', { name, exact: true });
const strip = (paneId: string) => page.getByPane(paneId).getByRole('tablist');
const grip = (label: string) => page.getByRole('button', { name: `Move ${label}`, exact: true });

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Panes stacks: dropping a pane', () => {
	it.each([
		{
			region: 'the center of a stack, swapping with its whole slot',
			target: () => page.getByPane('cam-a'),
			expected: { ...CAMERA_ROW, first: SOLO, second: CAMERAS }
		},
		{
			region: 'the tab strip of a stack',
			target: () => page.getByPane('cam-a').getByTabListDropRegion(),
			expected: { ...CAMERAS, panes: [CAM_A, CAM_B, CAM_C, SOLO], activeId: 'solo' }
		}
	])('places a pane dropped on $region', async ({ target, expected }) => {
		const { component } = render(StackPanes, { hasTriggers: true });

		await commands.mouseMove(grip('Solo').selector);
		await commands.mouseDown();
		await commands.mouseMove(target().selector);
		await commands.mouseUp();

		await expect.poll(() => component.getLayout()).toEqual(expected);
	});

	it('stacks a pane dropped on a region at the top of a pane with no tab strip', async () => {
		const { component } = render(StackPanes, { hasTriggers: true });

		await commands.mouseMove(grip('Camera A').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector, TOP_ZONE);
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({
				type: 'split',
				id: 'row',
				direction: 'row',
				ratio: 0.7,
				first: { ...CAMERAS, panes: [CAM_B, CAM_C], activeId: 'cam-b' },
				second: {
					type: 'stack',
					id: expect.any(String),
					panes: [SOLO, CAM_A],
					activeId: 'cam-a'
				}
			});
	});
});

describe('Panes stacks: dropping a stack', () => {
	it('merges a stack dropped on the tab strip of another stack, showing the dropped stack active pane', async () => {
		const { component } = render(StackPanes, { initialLayout: TWO_STACKS });

		await commands.mouseMove(strip('a1').selector, EMPTY_STRIP_AREA);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('b2').getByTabListDropRegion().selector);
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({
				...STACK_B,
				panes: [...STACK_B.panes, ...STACK_A.panes],
				activeId: 'a1'
			});
	});

	it('swaps the two stacks when a pane of one is dropped on the center of the other', async () => {
		const { component } = render(StackPanes, { initialLayout: TWO_STACKS });

		await commands.mouseMove(tab('A2').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('b2').selector);
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({ ...TWO_STACKS, first: STACK_B, second: STACK_A });
	});
});

describe('Panes stacks: a tab drag', () => {
	it('moves an inactive pane beside another pane, leaving the stack with its shown pane', async () => {
		const { component } = render(StackPanes);

		await commands.mouseMove(tab('Camera B').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector, RIGHT_EDGE);
		await expect.element(page.getByDragGhost()).toHaveTextContent(/^\s*Camera B\s*$/);
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({
				...CAMERA_ROW,
				first: { ...CAMERAS, panes: [CAM_A, CAM_C] },
				second: {
					type: 'split',
					id: expect.any(String),
					direction: 'row',
					ratio: 0.5,
					first: SOLO,
					second: CAM_B
				}
			});
	});

	it('arms the pane at once on a press on a tab', async () => {
		render(StackPanes);

		await commands.mouseMove(tab('Camera B').selector);
		await commands.mouseDown();

		await expect.element(page.getByPane('cam-a')).toHaveAttribute('data-drag-armed');
		await commands.mouseUp();
	});
});

describe('Panes stacks: dragging from the tab strip', () => {
	it('drags the whole stack from the empty area of the strip', async () => {
		const { component } = render(StackPanes);

		await commands.mouseMove(strip('cam-a').selector, EMPTY_STRIP_AREA);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector);
		await expect
			.element(page.getByDragGhost())
			.toHaveTextContent('Camera A, Camera B, and Camera C');
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({ ...CAMERA_ROW, first: SOLO, second: CAMERAS });
	});

	it('drags the stack from the empty area of a strip inside a Panes.DragTrigger', async () => {
		const { component } = render(StackPanes, { isTabListInTrigger: true });

		await commands.mouseMove(strip('cam-a').selector, EMPTY_STRIP_AREA);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector);
		await expect
			.element(page.getByDragGhost())
			.toHaveTextContent('Camera A, Camera B, and Camera C');
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({ ...CAMERA_ROW, first: SOLO, second: CAMERAS });
	});

	it('drags the pane of a tab pressed inside a Panes.DragTrigger', async () => {
		render(StackPanes, { isTabListInTrigger: true });

		await commands.mouseMove(tab('Camera B').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector, RIGHT_EDGE);

		await expect.element(page.getByDragGhost()).toHaveTextContent(/^\s*Camera B\s*$/);
		await commands.mouseUp();
	});
});

describe('Panes.DragTrigger target', () => {
	it('drags only the pane with target="stack" on a pane that is not stacked', async () => {
		const { component } = render(StackPanes, { hasTriggers: true, dragTarget: 'stack' });

		await commands.mouseMove(grip('Solo').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('cam-a').selector, RIGHT_EDGE);
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
	});
});

describe('Panes stacks: leaving a stack beside it', () => {
	it('places the shown pane beside the rest of its own stack, which then shows the next pane', async () => {
		const { component } = render(StackPanes, { hasTriggers: true });

		await commands.mouseMove(grip('Camera A').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('cam-a').selector, { x: '10%', y: '50%' });
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({
				...CAMERA_ROW,
				first: {
					type: 'split',
					id: expect.any(String),
					direction: 'row',
					ratio: 0.5,
					first: CAM_A,
					second: { ...CAMERAS, panes: [CAM_B, CAM_C], activeId: 'cam-b' }
				}
			});
	});
});

describe('Panes stacks: dropping on the own slot of the drag', () => {
	it('shows no indicator and changes nothing for a tab dropped on the center of its own stack', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { component } = render(StackPanes, { hasTriggers: true, received });

		await commands.mouseMove(tab('Camera B').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('cam-a').selector);
		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();
		await expect.element(page.getByDropIndicator()).not.toBeInTheDocument();
		await commands.mouseUp();

		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		expect(received).toEqual([]);
		expect(component.getLayout()).toEqual(CAMERA_ROW);
	});

	it('shows the center indicator over a pane dragged onto itself when it is not stacked', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		render(StackPanes, { hasTriggers: true, received });

		await commands.mouseMove(grip('Solo').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector, RIGHT_EDGE);

		await expect
			.element(page.getByDropIndicator())
			.toHaveAttribute('data-drop-indicator', 'center');
		await commands.mouseUp();
		await expect.element(page.getByDraggingPanes()).not.toBeInTheDocument();
		expect(received).toEqual([]);
	});
});

describe('Panes stacks: reorderable is false', () => {
	it('still selects a tab', async () => {
		const { component } = render(StackPanes, { reorderable: false });

		await userEvent.click(tab('Camera C'));

		await expect
			.poll(() => component.getLayout())
			.toEqual({ ...CAMERA_ROW, first: { ...CAMERAS, activeId: 'cam-c' } });
	});
});

describe('Panes stacks: the missing MoveTrigger warning', () => {
	it('warns for the pane that hosts the tab strip when it renders no MoveTrigger', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		render(StackPanes);

		await commands.mouseMove(tab('Camera B').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector, RIGHT_EDGE);
		await commands.mouseUp();

		expect(warn.mock.calls.map(([message]) => message)).toEqual([
			expect.stringContaining('a drag started in pane "Camera A", which has no Panes.MoveTrigger')
		]);
	});

	it('warns for the pane that hosts the drag when it has no MoveTrigger with target="stack"', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		render(StackPanes, { hasTriggers: true, dragTarget: 'stack', moveTarget: 'pane' });

		await commands.mouseMove(grip('Camera A').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector, RIGHT_EDGE);
		await commands.mouseUp();

		expect(warn.mock.calls.map(([message]) => message)).toEqual([STACK_DRAG_WARNING]);
	});

	it('logs no warning when the hosting pane has a MoveTrigger with target="stack"', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const { component } = render(StackPanes, {
			hasTriggers: true,
			dragTarget: 'stack',
			moveTarget: 'stack'
		});

		await commands.mouseMove(grip('Camera A').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector, RIGHT_EDGE);
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
		expect(warn).not.toHaveBeenCalled();
	});

	it('logs no warning for a pane drag when the pane only has a MoveTrigger with target="stack"', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const { component } = render(StackPanes, {
			hasTriggers: true,
			dragTarget: 'pane',
			moveTarget: 'stack'
		});

		await commands.mouseMove(tab('Camera B').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector, RIGHT_EDGE);
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({
				...CAMERA_ROW,
				first: { ...CAMERAS, panes: [CAM_A, CAM_C] },
				second: {
					type: 'split',
					id: expect.any(String),
					direction: 'row',
					ratio: 0.5,
					first: SOLO,
					second: CAM_B
				}
			});
		expect(warn).not.toHaveBeenCalled();
	});
});

describe('Panes.TabListDropRegion drop regions', () => {
	const dragSoloTo = async (target: Locator, at?: Point) => {
		await commands.mouseMove(grip('Solo').selector);
		await commands.mouseDown();
		await commands.mouseMove(target.selector, at);
	};

	it('reads a foreign tab strip with no TabListDropRegion as the top edge', async () => {
		const { component } = render(StackPanes, { hasTriggers: true, dropRegion: 'none' });

		await dragSoloTo(strip('cam-a'), { x: '50%', y: 10 });
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toEqual({
				type: 'split',
				id: expect.any(String),
				direction: 'column',
				ratio: 0.5,
				first: SOLO,
				second: CAMERAS
			});
	});

	it('stacks a pane dropped over a region that renders only during a drag', async () => {
		const { component } = render(StackPanes, { hasTriggers: true, dropRegion: 'drag-only' });

		await dragSoloTo(page.getByPane('cam-a'), TOP_ZONE);
		await commands.mouseMove(page.getByPane('cam-a').selector, TOP_ZONE);
		await commands.mouseUp();

		await expect.poll(() => component.getLayout()).toEqual(SOLO_STACKED_WITH_CAMERAS);
	});

	it('stacks a pane dropped inside a region on the left side', async () => {
		const { component } = render(StackPanes, { hasTriggers: true, dropRegion: 'left' });

		await dragSoloTo(page.getByPane('cam-a'), INSIDE_LEFT_REGION);
		await commands.mouseUp();

		await expect.poll(() => component.getLayout()).toEqual(SOLO_STACKED_WITH_CAMERAS);
	});

	it('covers the region of an unstacked pane with the stack indicator and nothing more', async () => {
		render(StackPanes, { hasTriggers: true, dropRegion: 'left' });

		await commands.mouseMove(grip('Camera A').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector, INSIDE_LEFT_REGION);

		const indicator = page.getByDropIndicator();
		await expect.element(indicator).toHaveAttribute('data-drop-indicator', 'stack');
		const region = page
			.getByPane('solo')
			.getByTabListDropRegion()
			.element()
			.getBoundingClientRect();
		const covered = indicator.element().getBoundingClientRect();
		expect(covered).toMatchObject({
			left: region.left,
			top: region.top,
			width: region.width,
			height: region.height
		});
		await commands.mouseUp();
	});

	it('shows no stack indicator over the region of a stacked pane, which previews the dragged tab', async () => {
		render(StackPanes, { hasTriggers: true, dropRegion: 'left' });

		await dragSoloTo(page.getByPane('cam-a'), INSIDE_LEFT_REGION);

		await expect.element(page.getByTabPreview()).toHaveTextContent('Solo');
		await expect.element(page.getByDropIndicator()).not.toBeInTheDocument();
		await commands.mouseUp();
	});
});

describe('Panes.PaneBody drop geometry', () => {
	it('reads top for a point in the header above the body', async () => {
		render(StackPanes, {
			hasTriggers: true,
			hasPaneBody: true,
			bodyClass: BODY_BELOW_HEADER,
			dropRegion: 'none'
		});

		await commands.mouseMove(grip('Camera A').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane('solo').selector, HEADER_ABOVE_BODY);

		await expect.element(page.getByDropIndicator()).toHaveAttribute('data-drop-indicator', 'top');
		await commands.mouseUp();
	});
});
