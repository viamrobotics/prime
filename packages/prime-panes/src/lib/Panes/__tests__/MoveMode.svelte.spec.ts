import { describe, expect, it, onTestFinished, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { cdp, commands, page, userEvent } from 'vitest/browser';
import type { Locator } from 'vitest/browser';

import { ids, layoutRoot, pane } from '../../../../test/layouts.ts';
import BoundPanes from '../../../../test/fixtures/BoundPanes.svelte';
import ControlledPanes from '../../../../test/fixtures/ControlledPanes.svelte';
import ExternalChangePanes from '../../../../test/fixtures/ExternalChangePanes.svelte';
import PanePartsPanes from '../../../../test/fixtures/PanePartsPanes.svelte';
import SinglePanePanes from '../../../../test/fixtures/SinglePanePanes.svelte';
import type { LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../../../test/layouts.ts';
import type { Point } from '../../../../test/input-commands.ts';

type Received = (LayoutNode<PaneData> | undefined)[];

const DESTINATION_COUNT = 3;
const TIME_SERIES = 'Move Camera to Time series';
const SENSOR_STAT = 'Move Camera to Sensor stat';
const CAMERA_2 = 'Move Camera to Camera 2';
const STARTED_CAMERA =
	'Moving Camera. Choose a destination with the pointer or arrow keys, or press Escape. The arrow keys move between sides and panes, Tab moves between destinations, Enter places the pane, and Escape cancels.';
const RIGHT = { x: '90%', y: '50%' } as const;

const CAMERA = pane(ids.mycam, 'Camera');
const TIME_SERIES_PANE = pane(ids.mytimeseries, 'Time series');
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
		first: TIME_SERIES_PANE,
		second: CAMERA
	},
	second: LOWER_SPLIT
};

const CAMERA_SWAPPED_WITH_TIME_SERIES = {
	type: 'split',
	id: ids.rootSplit,
	direction: 'column',
	ratio: 0.3,
	first: TIME_SERIES_PANE,
	second: {
		type: 'split',
		id: ids.innerSplit,
		direction: 'row',
		ratio: 0.6,
		first: CAMERA,
		second: LOWER_SPLIT
	}
};

const trigger = (label: string) => page.getByRole('button', { name: `Move ${label}`, exact: true });
const menuItem = () => page.getByRole('menuitem', { name: 'Move Camera', exact: true });
const mark = (name: string) => page.getByRole('button', { name, exact: true });
const destination = (name: string) => page.getByRole('group', { name, exact: true });
const allDestinations = () => page.getByRole('group', { name: /^Move Camera to / });
const status = () => page.getByRole('status');
const announcement = () => status().element().textContent;
const boxOf = (locator: Locator) => locator.element().getBoundingClientRect().toJSON();
const pressedStates = () =>
	page
		.getByRole('button', { name: /^Move / })
		.elements()
		.map((button) => button.getAttribute('aria-pressed'));

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

const clickAt = async (target: Locator, at: Point) => {
	await commands.mouseMove(target.selector, at);
	await commands.mouseDown();
	await commands.mouseUp();
};

const recordDefaultPrevented = () => {
	const results: boolean[] = [];
	const controller = new AbortController();
	onTestFinished(() => controller.abort());
	window.addEventListener('keydown', (event) => results.push(event.defaultPrevented), {
		signal: controller.signal
	});
	return results;
};

describe('Panes move mode: keyboard', () => {
	const tabStopsIn = (group: Locator) =>
		group
			.getByRole('button')
			.elements()
			.filter((button) => button.tabIndex === 0)
			.map((button) => button.getAttribute('aria-label'));

	it('places the pane beside the destination, giving the layout an edge drop makes', async () => {
		const { component } = render(BoundPanes, { handles: true });
		await startMoveOnFirstDestination();
		await userEvent.keyboard('{ArrowRight}');
		await expect.element(mark('Place Camera right of Time series')).toHaveFocus();

		await userEvent.keyboard('{Enter}');

		await expect.poll(() => component.getLayout()).toEqual(CAMERA_RIGHT_OF_TIME_SERIES);
	});

	it('swaps the pane with the destination that Tab focuses first', async () => {
		const received: Received = [];
		render(ControlledPanes, { accept: true, received, handles: true });
		await startMoveOnFirstDestination();

		await userEvent.keyboard('{Enter}');

		await expect.poll(() => received.at(-1)).toEqual(CAMERA_SWAPPED_WITH_TIME_SERIES);
	});

	it('enters move mode with Space', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		trigger('Camera').element().focus();

		await userEvent.keyboard(' ');

		await expect.element(trigger('Camera')).toHaveAttribute('aria-pressed', 'true');
	});

	it('gives each destination one tab stop, visited in layout order after the moving pane handle', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');

		await userEvent.keyboard('{Tab}');
		await expect.element(trigger('Camera'), { message: 'first stop' }).toHaveFocus();
		await userEvent.keyboard('{Tab}');
		await expect
			.element(mark('Swap Camera with Time series'), { message: 'second stop' })
			.toHaveFocus();
		await userEvent.keyboard('{Tab}');
		await expect
			.element(mark('Swap Camera with Sensor stat'), { message: 'third stop' })
			.toHaveFocus();
		await userEvent.keyboard('{Tab}');
		await expect
			.element(mark('Swap Camera with Camera 2'), { message: 'fourth stop' })
			.toHaveFocus();

		expect(
			[TIME_SERIES, SENSOR_STAT, CAMERA_2].map((name) => tabStopsIn(destination(name)))
		).toEqual([
			['Swap Camera with Time series'],
			['Swap Camera with Sensor stat'],
			['Swap Camera with Camera 2']
		]);
	});

	it('moves back from the first destination to the moving pane handle with Shift+Tab', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveOnFirstDestination();

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

		await expect.element(trigger('Camera')).toHaveFocus();
	});

	it('returns focus to the moved pane handle after placing', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveOnFirstDestination();

		await userEvent.keyboard('{ArrowRight}{Enter}');

		await expect.element(trigger('Camera')).toHaveFocus();
	});
});

describe('Panes move mode: pointer only', () => {
	it('places the pane beside the destination with a click on its right side', async () => {
		const { component } = render(BoundPanes, { handles: true });
		await startMoveWithClick();

		await clickAt(destination(TIME_SERIES), RIGHT);

		await expect.poll(() => component.getLayout()).toEqual(CAMERA_RIGHT_OF_TIME_SERIES);
	});

	it('covers each destination pane', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithClick();

		await expect
			.poll(() => [TIME_SERIES, SENSOR_STAT, CAMERA_2].map((name) => boxOf(destination(name))))
			.toEqual([ids.mytimeseries, ids.mysensor, ids.mycam2].map((id) => boxOf(page.getByPane(id))));
	});
});

describe('Panes move mode: canceling', () => {
	const startAndSelectRightEdge = async (received: Received) => {
		const { component } = render(ControlledPanes, { accept: true, received, handles: true });
		await startMoveWithKeyboard('Camera');
		await userEvent.keyboard('{ArrowDown}{ArrowRight}');
		await expect.element(mark('Place Camera right of Time series')).toHaveFocus();
		return component;
	};

	it('cancels the move and focuses the trigger when Escape follows an arrow selection', async () => {
		await startAndSelectRightEdge([]);

		await userEvent.keyboard('{Escape}');

		await expect.element(trigger('Camera')).toHaveFocus();
		await expect.poll(() => allDestinations().elements()).toHaveLength(0);
		expect(pressedStates()).toEqual(['false', 'false', 'false', 'false']);
		expect(announcement()).toBe('Move canceled.');
	});

	it('leaves the layout unchanged and writes nothing when Escape follows an arrow selection', async () => {
		const received: Received = [];
		const component = await startAndSelectRightEdge(received);

		await userEvent.keyboard('{Escape}');

		await expect.poll(() => allDestinations().elements()).toHaveLength(0);
		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
	});

	it('does nothing when Escape is pressed outside move mode', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		trigger('Time series').element().focus();

		await userEvent.keyboard('{Escape}');

		await expect.element(trigger('Time series')).toHaveFocus();
		expect(announcement()).toBe('');
	});

	it('cancels when the pressed handle is clicked again', async () => {
		const received: Received = [];
		const { component } = render(ControlledPanes, {
			accept: true,
			received,
			handles: true
		});
		await startMoveWithClick();

		await userEvent.click(trigger('Camera'));

		await expect.poll(() => allDestinations().elements()).toHaveLength(0);
		expect(pressedStates()).toEqual(['false', 'false', 'false', 'false']);
		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
	});
});

describe('Panes move mode: announcements', () => {
	it('renders an empty status region before any move', () => {
		render(ControlledPanes, { accept: true, handles: true });

		expect(announcement()).toBe('');
	});

	it('announces entering move mode, naming the keys', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithClick();

		await expect.poll(announcement).toBe(STARTED_CAMERA);
	});

	it('announces a cancel', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();

		await userEvent.keyboard('{Escape}');

		await expect.poll(announcement).toBe('Move canceled.');
	});

	it('announces that a rejected placement did not move the pane', async () => {
		render(ControlledPanes, { accept: false, handles: true });
		await startMoveWithClick();

		await clickAt(destination(TIME_SERIES), RIGHT);

		await expect.poll(announcement).toBe('Camera was not moved.');
	});

	it('names panes by id when paneLabel is not given', async () => {
		render(ControlledPanes, { accept: true, handles: true, labelPanes: false });

		await startMoveWithClick();

		await expect
			.poll(announcement)
			.toBe(
				'Moving mycam. Choose a destination with the pointer or arrow keys, or press Escape. The arrow keys move between sides and panes, Tab moves between destinations, Enter places the pane, and Escape cancels.'
			);
		await expect.element(mark('Swap mycam with mytimeseries')).toBeInTheDocument();
	});
});

describe('Panes move mode: state', () => {
	it('reflects move mode on the moving handle with aria-pressed', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		expect(pressedStates(), 'before move mode').toEqual(['false', 'false', 'false', 'false']);
		expect(allDestinations().elements(), 'destinations before move mode').toHaveLength(0);

		await startMoveWithClick();
		await expect
			.element(trigger('Camera'), { message: 'in move mode' })
			.toHaveAttribute('aria-pressed', 'true');

		await userEvent.keyboard('{Escape}');
		await expect
			.poll(pressedStates, { message: 'after cancel' })
			.toEqual(['false', 'false', 'false', 'false']);
	});

	it('leaves move mode when the view stops being reorderable', async () => {
		const { rerender } = render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();
		await expect
			.poll(() => allDestinations().elements(), { message: 'move mode is on' })
			.toHaveLength(DESTINATION_COUNT);

		await rerender({ reorderable: false });

		await expect.poll(() => allDestinations().elements()).toHaveLength(0);
		await expect.poll(pressedStates).toEqual(['false', 'false', 'false', 'false']);
	});

	it('does not focus a handle that mounts after a move whose pane had no handle', async () => {
		const { rerender } = render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();
		await rerender({ handles: false });
		await clickAt(destination(TIME_SERIES), RIGHT);
		await expect.poll(announcement).toBe('Camera placed right of Time series.');

		await rerender({ handles: true });

		await expect.element(trigger('Camera')).toBeInTheDocument();
		expect(document.activeElement).toBe(document.body);
	});

	it('enters no move mode when no other pane exists', async () => {
		render(SinglePanePanes);

		await userEvent.click(trigger('Only'));

		await expect.element(trigger('Only')).toHaveAttribute('aria-pressed', 'false');
		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
		expect(announcement()).toBe('');
	});

	it('leaves move mode when a drag starts from a handle', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();
		await expect
			.poll(() => allDestinations().elements(), { message: 'move mode is on' })
			.toHaveLength(DESTINATION_COUNT);
		onTestFinished(() => commands.mouseUp());
		await commands.mouseMove(trigger('Camera').selector);
		await commands.mouseDown();

		await commands.mouseMove(page.getByPane(ids.mytimeseries).selector);

		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();
		await expect.poll(() => allDestinations().elements()).toHaveLength(0);
		await expect.poll(pressedStates).toEqual(['false', 'false', 'false', 'false']);
	});

	it('still runs the consumer click handler and enters move mode', async () => {
		const onclick = vi.fn();
		render(ControlledPanes, { accept: true, handles: true, handleProps: { onclick } });

		await startMoveWithClick();

		expect(onclick).toHaveBeenCalledTimes(1);
		await expect.element(trigger('Camera')).toHaveAttribute('aria-pressed', 'true');
	});
});

describe('Panes move mode: the moving pane changes underneath the move', () => {
	it('focuses the new trigger when the moving pane remounts under the focused one', async () => {
		const { component } = render(ExternalChangePanes);
		await startMoveWithKeyboard('Camera');
		const original = trigger('Camera').element();

		component.relocateCamera();

		await expect.poll(() => original.isConnected).toBe(false);
		await expect.element(trigger('Camera')).toHaveFocus();
		await expect.poll(() => allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});

	it('keeps the move and focuses the new trigger when the pane mounts again in a later update than the one that removed it', async () => {
		const { component } = render(ExternalChangePanes);
		await startMoveWithKeyboard('Camera');
		const original = trigger('Camera').element();

		void component.removeAndRestoreCamera();

		await expect.poll(() => original.isConnected).toBe(false);
		await expect.element(trigger('Camera')).toHaveFocus();
		await expect.poll(() => allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});

	it('abandons the move when the moving pane leaves the layout under the focused trigger', async () => {
		const { component } = render(ExternalChangePanes);
		await startMoveWithKeyboard('Camera');

		component.removeCamera();

		await expect.element(page.getByRole('status')).toHaveTextContent('Move canceled.');
		await expect.poll(() => allDestinations().elements()).toHaveLength(0);
		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
	});
});

describe('Panes.MoveTrigger: the default native button', () => {
	it('toggles move mode once when pressed with Enter', async () => {
		render(ControlledPanes, { accept: true, handles: true });

		await startMoveWithKeyboard('Camera');

		await expect.poll(() => allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
		await expect.element(trigger('Camera')).toHaveAttribute('aria-pressed', 'true');
	});

	it('ignores Enter repeating from the key that entered move mode', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		trigger('Camera').element().focus();
		await userEvent.keyboard('{Enter>}');
		await expect.poll(() => allDestinations().elements()).toHaveLength(DESTINATION_COUNT);

		await cdp().send('Input.dispatchKeyEvent', {
			type: 'keyDown',
			key: 'Enter',
			code: 'Enter',
			windowsVirtualKeyCode: 13,
			text: '\r',
			autoRepeat: true
		});
		await userEvent.keyboard('{/Enter}');

		expect(allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
		expect(announcement()).toBe(STARTED_CAMERA);
		await expect.element(page.getByPane(ids.mycam)).toHaveFocus();
	});

	it('ignores Enter repeating from the key that canceled move mode', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithClick();
		trigger('Camera').element().focus();
		await userEvent.keyboard('{Enter>}');
		await expect.poll(() => allDestinations().elements()).toHaveLength(0);

		await cdp().send('Input.dispatchKeyEvent', {
			type: 'keyDown',
			key: 'Enter',
			code: 'Enter',
			windowsVirtualKeyCode: 13,
			text: '\r',
			autoRepeat: true
		});
		await userEvent.keyboard('{/Enter}');

		expect(allDestinations().elements()).toHaveLength(0);
		expect(announcement()).toBe('Move canceled.');
	});
});

describe('Panes.MoveTrigger: a child with role="button" that is not a native button', () => {
	const renderRoleButton = () =>
		render(PanePartsPanes, { variant: 'div-move', moveRole: 'button' });

	it('enters move mode on Enter', async () => {
		renderRoleButton();
		trigger('Camera').element().focus();

		await userEvent.keyboard('{Enter}');

		await expect.poll(() => allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});

	it('ignores Enter repeating from the key that entered move mode', async () => {
		renderRoleButton();
		trigger('Camera').element().focus();
		await userEvent.keyboard('{Enter>}');
		await expect.poll(() => allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
		trigger('Camera').element().focus();

		await cdp().send('Input.dispatchKeyEvent', {
			type: 'keyDown',
			key: 'Enter',
			code: 'Enter',
			windowsVirtualKeyCode: 13,
			text: '\r',
			autoRepeat: true
		});
		await userEvent.keyboard('{/Enter}');

		expect(allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});

	it('enters move mode on Space only when the key is released', async () => {
		renderRoleButton();
		trigger('Camera').element().focus();

		await userEvent.keyboard('{Space>}');
		expect(allDestinations().elements(), 'while Space is held').toHaveLength(0);

		await userEvent.keyboard('{/Space}');
		await expect
			.poll(() => allDestinations().elements(), { message: 'after Space is released' })
			.toHaveLength(DESTINATION_COUNT);
	});

	it('cancels the Space keydown so the page does not scroll', async () => {
		renderRoleButton();
		trigger('Camera').element().focus();
		const defaultPrevented = recordDefaultPrevented();

		await userEvent.keyboard(' ');

		expect(defaultPrevented, 'the keydown was not canceled').toEqual([true]);
	});

	it('reports move mode with aria-pressed', async () => {
		renderRoleButton();
		await expect
			.element(trigger('Camera'), { message: 'before move mode' })
			.toHaveAttribute('aria-pressed', 'false');

		trigger('Camera').element().focus();
		await userEvent.keyboard('{Enter}');
		await expect
			.element(trigger('Camera'), { message: 'in move mode' })
			.toHaveAttribute('aria-pressed', 'true');

		await userEvent.keyboard('{Escape}');
		await expect
			.element(trigger('Camera'), { message: 'after cancel' })
			.toHaveAttribute('aria-pressed', 'false');
	});

	it('toggles move mode once when it is a link and Enter is pressed', async () => {
		render(PanePartsPanes, {
			variant: 'div-move',
			moveTag: 'a',
			moveRole: 'button'
		});
		trigger('Camera').element().focus();

		await userEvent.keyboard('{Enter}');

		await expect.poll(() => allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});
});

describe('Panes.MoveTrigger: a child with role="menuitem"', () => {
	const renderMenuItem = () =>
		render(PanePartsPanes, { variant: 'div-move', moveRole: 'menuitem' });

	it('enters move mode when clicked', async () => {
		renderMenuItem();

		await userEvent.click(menuItem());

		await expect.poll(() => allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});

	it('has no aria-pressed in move mode', async () => {
		renderMenuItem();
		await userEvent.click(menuItem());
		await expect
			.poll(() => allDestinations().elements(), { message: 'move mode is on' })
			.toHaveLength(DESTINATION_COUNT);

		await expect.element(menuItem()).not.toHaveAttribute('aria-pressed');
	});

	it('leaves keyboard activation to the menu that dispatches its click', async () => {
		renderMenuItem();
		menuItem().element().focus();

		await userEvent.keyboard('{Enter}');

		expect(allDestinations().elements()).toHaveLength(0);
	});
});

describe('Panes.MoveTrigger: unmounted before move mode ended', () => {
	const startMoveFromMenu = async () => {
		await userEvent.click(page.getByRole('button', { name: 'Menu for Camera', exact: true }));
		await userEvent.click(menuItem());
	};

	it('focuses the moved pane wrapper after a placement', async () => {
		render(PanePartsPanes, { variant: 'menu' });
		await startMoveFromMenu();
		await expect
			.element(menuItem(), { message: 'the menu item unmounted' })
			.not.toBeInTheDocument();

		await clickAt(destination(TIME_SERIES), RIGHT);

		await expect.element(page.getByPane(ids.mycam)).toHaveFocus();
	});

	it('focuses the moved pane wrapper after Escape', async () => {
		render(PanePartsPanes, { variant: 'menu' });
		await startMoveFromMenu();

		await userEvent.keyboard('{Escape}');

		await expect.element(page.getByPane(ids.mycam)).toHaveFocus();
	});

	it('shows a focus outline on the wrapper that takes the fallback focus', async () => {
		render(PanePartsPanes, { variant: 'menu' });
		await startMoveFromMenu();
		await userEvent.keyboard('{Escape}');
		await expect.element(page.getByPane(ids.mycam)).toHaveFocus();

		await expect
			.element(page.getByPane(ids.mycam))
			.toHaveStyle({ outlineStyle: 'solid', outlineWidth: '2px' });
	});

	it('gives the pane wrapper tabindex -1 so script can focus it', async () => {
		render(PanePartsPanes, { variant: 'menu' });

		await expect.element(page.getByPane(ids.mycam)).toHaveAttribute('tabindex', '-1');
	});
});
