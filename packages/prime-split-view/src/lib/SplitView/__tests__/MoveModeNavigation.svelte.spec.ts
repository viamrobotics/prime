import { tick } from 'svelte';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { ids, layoutRoot } from '../../__tests__/layout-fixture.ts';
import BoundSplitView from './BoundSplitView.svelte';
import ControlledSplitView from './ControlledSplitView.svelte';
import ExternalChangeSplitView from './ExternalChangeSplitView.svelte';
import PaneControlsSplitView from './PaneControlsSplitView.svelte';

import type { LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../__tests__/layout-fixture.ts';

const WIDE_VIEWPORT = { width: 1000, height: 1400 };
const DEFAULT_VIEWPORT = { width: 414, height: 896 };
const DESTINATION_COUNT = 3;
const KNOWN_IDS = Object.values(ids);

const handleOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[aria-label="Move ${label}"]`)!;
const paneElement = (container: Element, id: string) =>
	container.querySelector<HTMLElement>(`[data-pane-id="${id}"]`)!;
const wrapperOf = (container: Element, id: string) => paneElement(container, id).parentElement!;
const outerOf = (container: Element, id: string) => wrapperOf(container, id).parentElement!;
const destinationsIn = (container: Element) => [
	...container.querySelectorAll<HTMLElement>('[data-move-target]')
];
const swapButtonOf = (container: Element, id: string) =>
	outerOf(container, id).querySelector<HTMLElement>('[data-move-button="center"]')!;
const previewedRegionIn = (container: Element, id: string) =>
	outerOf(container, id).querySelector<HTMLElement>('[data-move-preview]')?.dataset.movePreview;
const engagedDestinationsIn = (container: Element) =>
	destinationsIn(container)
		.filter((destination) => destination.querySelector('[data-move-preview]') !== null)
		.map((destination) => destination.getAttribute('aria-label'));
const focusedName = () => document.activeElement?.getAttribute('aria-label');
const announcementIn = (container: Element) =>
	container.querySelector('[role="status"]')?.textContent;
const pressedStates = (container: Element) =>
	[...container.querySelectorAll<HTMLButtonElement>('button[aria-label^="Move "]')].map((handle) =>
		handle.getAttribute('aria-pressed')
	);
const withoutGeneratedIds = (layout: LayoutNode<PaneData> | undefined) =>
	JSON.parse(JSON.stringify(layout), (key, value) =>
		key === 'id' && !KNOWN_IDS.includes(value) ? 'generated' : value
	);

const startMoveWithKeyboard = async (container: Element, label: string) => {
	handleOf(container, label).focus();
	await userEvent.keyboard('{Enter}');
};

const startMoveWithPointer = (container: Element, label: string) =>
	userEvent.click(handleOf(container, label));

const dragOntoLeftSideOf = (container: Element, label: string, targetId: string) => {
	const target = paneElement(container, targetId);
	const { width, height } = target.getBoundingClientRect();
	return userEvent.dragAndDrop(handleOf(container, label), target, {
		targetPosition: { x: width * 0.1, y: height * 0.5 }
	});
};

const dispatchKeydown = (target: HTMLElement, init: KeyboardEventInit) => {
	const keydown = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
	target.dispatchEvent(keydown);
	return keydown;
};

beforeAll(() => page.viewport(WIDE_VIEWPORT.width, WIDE_VIEWPORT.height));

afterAll(() => page.viewport(DEFAULT_VIEWPORT.width, DEFAULT_VIEWPORT.height));

describe('SplitView move mode: arrow navigation from the moving pane', () => {
	it('focuses and previews the bottom edge of the pane above when ArrowUp leaves the moving pane', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Time series');

		await userEvent.keyboard('{ArrowUp}');

		expect(focusedName()).toBe('Place Time series below Camera');
		await expect.poll(() => previewedRegionIn(container, ids.mycam)).toBe('bottom');
		expect(engagedDestinationsIn(container)).toEqual(['Move Time series to Camera']);
	});

	it('focuses the right edge of that pane when ArrowRight follows', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Time series');
		await userEvent.keyboard('{ArrowUp}');

		await userEvent.keyboard('{ArrowRight}');

		expect(focusedName()).toBe('Place Time series right of Camera');
		await expect.poll(() => previewedRegionIn(container, ids.mycam)).toBe('right');
	});

	it('crosses to the left edge of the next pane when ArrowRight follows the right edge', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');
		await userEvent.keyboard('{ArrowDown}');
		expect(focusedName(), 'after ArrowDown').toBe('Place Camera above Time series');
		await userEvent.keyboard('{ArrowRight}');
		expect(focusedName(), 'after the first ArrowRight').toBe('Place Camera right of Time series');

		await userEvent.keyboard('{ArrowRight}');

		expect(focusedName(), 'after the second ArrowRight').toBe('Place Camera left of Sensor stat');
		await expect.poll(() => previewedRegionIn(container, ids.mysensor)).toBe('left');
		await expect
			.poll(() => engagedDestinationsIn(container), { message: 'the pane left behind stays quiet' })
			.toEqual(['Move Camera to Sensor stat']);
	});

	it('reaches a pane that does not touch the moving pane by repeated arrows', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		const camera = wrapperOf(container, ids.mycam).getBoundingClientRect();
		const farthest = wrapperOf(container, ids.mycam2).getBoundingClientRect();
		expect(farthest.top, 'the panes touch').toBeGreaterThan(camera.bottom);
		await startMoveWithKeyboard(container, 'Camera');

		await userEvent.keyboard('{ArrowDown}{ArrowRight}{ArrowRight}{ArrowDown}{ArrowDown}');

		expect(focusedName()).toBe('Place Camera above Camera 2');
		await expect.poll(() => previewedRegionIn(container, ids.mycam2)).toBe('top');
	});

	it('steps over the moving pane to the pane beyond it', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Sensor stat');
		await userEvent.keyboard('{ArrowDown}');
		expect(focusedName(), 'after ArrowDown').toBe('Place Sensor stat above Camera 2');

		await userEvent.keyboard('{ArrowUp}');

		expect(focusedName(), 'after ArrowUp').toBe('Place Sensor stat below Camera');
		await expect.poll(() => previewedRegionIn(container, ids.mycam)).toBe('bottom');
	});

	it('does nothing when an arrow leaves the moving pane at the outer edge', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');

		await userEvent.keyboard('{ArrowUp}{ArrowLeft}{ArrowRight}');

		expect(document.activeElement).toBe(wrapperOf(container, ids.mycam));
		expect(engagedDestinationsIn(container)).toEqual([]);
		expect(destinationsIn(container)).toHaveLength(DESTINATION_COUNT);
	});

	it('does nothing when an arrow leaves a destination at the outer edge', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');
		await userEvent.keyboard('{ArrowDown}{ArrowLeft}');
		expect(focusedName(), 'before the arrow that has nowhere to go').toBe(
			'Place Camera left of Time series'
		);

		await userEvent.keyboard('{ArrowLeft}');

		expect(focusedName()).toBe('Place Camera left of Time series');
		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('left');
	});

	it('selects the near edge on entering a pane, whatever the pane remembered', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');
		await userEvent.keyboard('{ArrowDown}{Tab}');
		expect(document.activeElement, 'Tab did not reach the second destination').toBe(
			swapButtonOf(container, ids.mysensor)
		);

		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');

		expect(focusedName()).toBe('Place Camera right of Time series');
		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('right');
	});

	it('does not move on an arrow typed in a text field inside the moving pane', async () => {
		const { container } = render(PaneControlsSplitView, { props: { variant: 'header' } });
		await startMoveWithKeyboard(container, 'Camera');
		const field = container.querySelector<HTMLInputElement>('[aria-label="Note for Camera"]')!;
		field.focus();

		await userEvent.keyboard('{ArrowDown}');

		expect(document.activeElement).toBe(field);
		expect(engagedDestinationsIn(container)).toEqual([]);
	});

	it('does not move on an arrow that the focused control already handled', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');
		handleOf(container, 'Camera').focus();
		handleOf(container, 'Camera').addEventListener('keydown', (event) => event.preventDefault());

		await userEvent.keyboard('{ArrowDown}');

		expect(document.activeElement).toBe(handleOf(container, 'Camera'));
		expect(engagedDestinationsIn(container)).toEqual([]);
	});

	it('cancels the arrow keydown that moves focus off the moving pane, so the page does not scroll', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');

		const keydown = dispatchKeydown(handleOf(container, 'Camera'), { key: 'ArrowDown' });

		expect(keydown.defaultPrevented, 'the keydown was not canceled').toBe(true);
	});

	it('leaves an arrow keydown to the browser when no pane lies that way from the moving pane', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');

		const keydown = dispatchKeydown(handleOf(container, 'Camera'), { key: 'ArrowUp' });

		expect(keydown.defaultPrevented, 'the keydown was canceled').toBe(false);
	});

	it('cancels the arrow keydown that crosses into another pane', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');
		await userEvent.keyboard('{ArrowDown}{ArrowRight}');
		expect(focusedName(), 'before the arrow that crosses').toBe(
			'Place Camera right of Time series'
		);

		const keydown = dispatchKeydown(document.activeElement as HTMLElement, { key: 'ArrowRight' });

		expect(keydown.defaultPrevented, 'the keydown was not canceled').toBe(true);
		expect(focusedName()).toBe('Place Camera left of Sensor stat');
	});

	it('cancels the arrow keydown that steps within a pane', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');
		await userEvent.keyboard('{ArrowDown}');

		const keydown = dispatchKeydown(document.activeElement as HTMLElement, { key: 'ArrowRight' });

		expect(keydown.defaultPrevented, 'the keydown was not canceled').toBe(true);
		expect(focusedName()).toBe('Place Camera right of Time series');
	});

	it('leaves an arrow keydown to the browser when no pane lies that way from a destination', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');
		await userEvent.keyboard('{ArrowDown}{ArrowLeft}');
		expect(focusedName(), 'before the arrow with nowhere to go').toBe(
			'Place Camera left of Time series'
		);

		const keydown = dispatchKeydown(document.activeElement as HTMLElement, { key: 'ArrowLeft' });

		expect(keydown.defaultPrevented, 'the keydown was canceled').toBe(false);
	});

	it('leaves a modified arrow to the browser', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');

		const keydown = dispatchKeydown(handleOf(container, 'Camera'), {
			key: 'ArrowDown',
			altKey: true
		});

		await tick();
		expect(keydown.defaultPrevented, 'the keydown was canceled').toBe(false);
		expect(engagedDestinationsIn(container)).toEqual([]);
	});

	it('leaves an arrow to the browser outside move mode', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		const keydown = dispatchKeydown(handleOf(container, 'Camera'), { key: 'ArrowDown' });

		await tick();
		expect(keydown.defaultPrevented, 'the keydown was canceled').toBe(false);
		expect(destinationsIn(container)).toEqual([]);
	});

	it('moves the same way from the focused moving pane wrapper when a mouse click started the move', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Time series');
		expect(document.activeElement, 'the moving pane wrapper is not focused').toBe(
			wrapperOf(container, ids.mytimeseries)
		);

		await userEvent.keyboard('{ArrowUp}');

		expect(focusedName()).toBe('Place Time series below Camera');
	});
});

describe('SplitView move mode: finishing after arrow navigation', () => {
	it('places the pane where the arrows ended, the way a drag onto that side does', async () => {
		const moved = render(BoundSplitView, { props: { handles: true } });
		await startMoveWithKeyboard(moved.container, 'Camera');
		await userEvent.keyboard('{ArrowDown}{ArrowRight}{ArrowRight}');
		expect(focusedName(), 'the arrows did not reach the left side of Sensor stat').toBe(
			'Place Camera left of Sensor stat'
		);
		await userEvent.keyboard('{Enter}');
		await expect.poll(() => destinationsIn(moved.container)).toEqual([]);

		const dragged = render(BoundSplitView, { props: { handles: true } });
		await dragOntoLeftSideOf(dragged.container, 'Camera', ids.mysensor);
		await expect.poll(() => dragged.component.getLayout()).not.toEqual(layoutRoot);

		expect(withoutGeneratedIds(moved.component.getLayout())).toEqual(
			withoutGeneratedIds(dragged.component.getLayout())
		);
	});

	it('announces the placement the arrows chose', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');
		await userEvent.keyboard('{ArrowDown}{ArrowRight}{ArrowRight}{Enter}');

		await expect.poll(() => announcementIn(container)).toBe('Camera placed left of Sensor stat.');
	});

	it('cancels with the layout unchanged when Escape follows the arrows', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { container, component } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		await startMoveWithKeyboard(container, 'Camera');
		await userEvent.keyboard('{ArrowDown}{ArrowRight}');
		expect(focusedName(), 'the arrows did not select a placement').toBe(
			'Place Camera right of Time series'
		);

		await userEvent.keyboard('{Escape}');

		await expect.poll(() => destinationsIn(container)).toEqual([]);
		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
		expect(announcementIn(container)).toBe('Move canceled.');
		expect(pressedStates(container)).toEqual(['false', 'false', 'false', 'false']);
		await expect.poll(() => document.activeElement).toBe(handleOf(container, 'Camera'));
	});

	it('still moves between destinations with Tab after the arrows entered one', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');
		await userEvent.keyboard('{ArrowDown}');

		await userEvent.keyboard('{Tab}');
		expect(document.activeElement, 'Tab did not reach the next destination').toBe(
			swapButtonOf(container, ids.mysensor)
		);

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
		expect(focusedName(), 'Shift+Tab did not return to the remembered edge').toBe(
			'Place Camera above Time series'
		);
	});
});

describe('SplitView move mode: the moving pane changes underneath the move', () => {
	it('focuses the new trigger when the moving pane remounts under the focused one', async () => {
		const { container, component } = render(ExternalChangeSplitView);
		await startMoveWithKeyboard(container, 'Camera');
		const original = handleOf(container, 'Camera');

		component.relocateCamera();

		await expect.poll(() => original.isConnected).toBe(false);
		await expect.poll(() => document.activeElement).toBe(handleOf(container, 'Camera'));
		expect(destinationsIn(container)).toHaveLength(DESTINATION_COUNT);
	});

	it('keeps the move and focuses the new trigger when the pane mounts again in a later update than the one that removed it', async () => {
		const { container, component } = render(ExternalChangeSplitView);
		await startMoveWithKeyboard(container, 'Camera');
		const original = handleOf(container, 'Camera');

		void component.removeAndRestoreCamera();

		await expect.poll(() => original.isConnected).toBe(false);
		await expect.poll(() => document.activeElement).toBe(handleOf(container, 'Camera'));
		expect(destinationsIn(container)).toHaveLength(DESTINATION_COUNT);
	});

	it('abandons the move when the moving pane leaves the layout under the focused trigger', async () => {
		const { container, component } = render(ExternalChangeSplitView);
		await startMoveWithKeyboard(container, 'Camera');

		component.removeCamera();

		await expect.poll(() => announcementIn(container)).toBe('Move canceled.');
		expect(destinationsIn(container)).toEqual([]);
		expect(container.querySelector('[data-move-mode]')).toBeNull();
	});
});
