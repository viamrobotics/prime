import { beforeEach, describe, expect, it, onTestFinished } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import { ids } from '../../../../test/layouts.ts';
import ControlledPanes from '../../../../test/fixtures/ControlledPanes.svelte';
import PanePartsPanes from '../../../../test/fixtures/PanePartsPanes.svelte';

const DESTINATION_COUNT = 3;
const OUTSIDE_EVERY_FIXTURE = { x: '99%', y: '99%' } as const;

beforeEach(() => commands.mouseMove('html', OUTSIDE_EVERY_FIXTURE));

const trigger = (label: string) => page.getByRole('button', { name: `Move ${label}`, exact: true });
const mark = (name: string) => page.getByRole('button', { name, exact: true });
const destination = (name: string) => page.getByRole('group', { name, exact: true });
const allDestinations = () => page.getByRole('group', { name: /^Move Camera to / });

const startMoveWithKeyboard = async (label: string) => {
	trigger(label).element().focus();
	await userEvent.keyboard('{Enter}');
	await expect.element(page.getByPanesInMoveMode()).toBeInTheDocument();
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

describe('Panes move mode: arrow navigation from the moving pane', () => {
	it('focuses and previews the bottom edge of the pane above when ArrowUp leaves the moving pane', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Time series');

		await userEvent.keyboard('{ArrowUp}');

		await expect.element(mark('Place Time series below Camera')).toHaveFocus();
		await expect
			.element(destination('Move Time series to Camera').getByMovePreview())
			.toHaveAttribute('data-move-preview', 'bottom');
		await expect.element(page.getByMovePreview()).toHaveAttribute('data-move-preview', 'bottom');
	});

	it('crosses to the left edge of the next pane when ArrowRight follows the right edge', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');
		await userEvent.keyboard('{ArrowDown}');
		await expect.element(mark('Place Camera above Time series')).toHaveFocus();
		await userEvent.keyboard('{ArrowRight}');
		await expect.element(mark('Place Camera right of Time series')).toHaveFocus();

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(mark('Place Camera left of Sensor stat')).toHaveFocus();
		await expect
			.element(destination('Move Camera to Sensor stat').getByMovePreview())
			.toHaveAttribute('data-move-preview', 'left');
		await expect.element(page.getByMovePreview()).toHaveAttribute('data-move-preview', 'left');
	});

	it('steps over the moving pane to the pane beyond it', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Sensor stat');
		await userEvent.keyboard('{ArrowDown}');
		await expect.element(mark('Place Sensor stat above Camera 2')).toHaveFocus();

		await userEvent.keyboard('{ArrowUp}');

		await expect.element(mark('Place Sensor stat below Camera')).toHaveFocus();
		await expect
			.element(destination('Move Sensor stat to Camera').getByMovePreview())
			.toHaveAttribute('data-move-preview', 'bottom');
	});

	it('does nothing when an arrow leaves a destination at the outer edge', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');
		await userEvent.keyboard('{ArrowDown}{ArrowLeft}');
		await expect.element(mark('Place Camera left of Time series')).toHaveFocus();

		await userEvent.keyboard('{ArrowLeft}');

		await expect.element(mark('Place Camera left of Time series')).toHaveFocus();
		await expect
			.element(destination('Move Camera to Time series').getByMovePreview())
			.toHaveAttribute('data-move-preview', 'left');
	});

	it('selects the near edge on entering a pane, whatever the pane remembered', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');
		await userEvent.keyboard('{ArrowDown}{Tab}');
		await expect.element(mark('Swap Camera with Sensor stat')).toHaveFocus();

		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');

		await expect.element(mark('Place Camera right of Time series')).toHaveFocus();
		await expect
			.element(destination('Move Camera to Time series').getByMovePreview())
			.toHaveAttribute('data-move-preview', 'right');
	});

	it('does not move on an arrow typed in a text field inside the moving pane', async () => {
		render(PanePartsPanes, { variant: 'header' });
		await startMoveWithKeyboard('Camera');
		const field = page.getByRole('textbox', { name: 'Note for Camera', exact: true });
		field.element().focus();

		await userEvent.keyboard('{ArrowDown}');

		await expect.element(field).toHaveFocus();
		await expect.element(page.getByMovePreview()).not.toBeInTheDocument();
	});

	it('does not move on an arrow that the focused control already handled', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');
		trigger('Camera').element().focus();
		trigger('Camera')
			.element()
			.addEventListener('keydown', (event) => event.preventDefault());

		await userEvent.keyboard('{ArrowDown}');

		await expect.element(trigger('Camera')).toHaveFocus();
		await expect.element(page.getByMovePreview()).not.toBeInTheDocument();
	});

	it('cancels the arrow keydown that moves focus off the moving pane, so the page does not scroll', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');
		const defaultPrevented = recordDefaultPrevented();

		await userEvent.keyboard('{ArrowDown}');

		await expect.element(mark('Place Camera above Time series')).toHaveFocus();
		expect(defaultPrevented, 'the keydown was not canceled').toEqual([true]);
	});

	it('leaves an arrow keydown to the browser when no pane lies that way from the moving pane', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');
		const defaultPrevented = recordDefaultPrevented();

		await userEvent.keyboard('{ArrowUp}');

		expect(defaultPrevented, 'the keydown was canceled').toEqual([false]);
		await expect.element(page.getByPane(ids.mycam)).toHaveFocus();
		await expect.element(page.getByMovePreview()).not.toBeInTheDocument();
		await expect.poll(() => allDestinations().elements()).toHaveLength(DESTINATION_COUNT);
	});

	it('cancels the arrow keydown that crosses into another pane', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');
		await userEvent.keyboard('{ArrowDown}{ArrowRight}');
		await expect.element(mark('Place Camera right of Time series')).toHaveFocus();
		const defaultPrevented = recordDefaultPrevented();

		await userEvent.keyboard('{ArrowRight}');

		expect(defaultPrevented, 'the keydown was not canceled').toEqual([true]);
	});

	it('cancels the arrow keydown that steps within a pane', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');
		await userEvent.keyboard('{ArrowDown}');
		const defaultPrevented = recordDefaultPrevented();

		await userEvent.keyboard('{ArrowRight}');

		expect(defaultPrevented, 'the keydown was not canceled').toEqual([true]);
		await expect.element(mark('Place Camera right of Time series')).toHaveFocus();
	});

	it('leaves an arrow keydown to the browser when no pane lies that way from a destination', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');
		await userEvent.keyboard('{ArrowDown}{ArrowLeft}');
		await expect.element(mark('Place Camera left of Time series')).toHaveFocus();
		const defaultPrevented = recordDefaultPrevented();

		await userEvent.keyboard('{ArrowLeft}');

		expect(defaultPrevented, 'the keydown was canceled').toEqual([false]);
	});

	it('moves the same way from the focused moving pane wrapper when a mouse click started the move', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await userEvent.click(trigger('Camera'));
		await expect.element(page.getByPane(ids.mycam)).toHaveFocus();

		await userEvent.keyboard('{ArrowDown}');

		await expect.element(mark('Place Camera above Time series')).toHaveFocus();
		await expect
			.element(destination('Move Camera to Time series').getByMovePreview())
			.toHaveAttribute('data-move-preview', 'top');
		await expect.element(page.getByMovePreview()).toHaveAttribute('data-move-preview', 'top');
	});
});

describe('Panes move mode: finishing after arrow navigation', () => {
	it('announces the placement the arrows chose', async () => {
		render(ControlledPanes, { accept: true, handles: true });
		await startMoveWithKeyboard('Camera');

		await userEvent.keyboard('{ArrowDown}{ArrowRight}{ArrowRight}{Enter}');

		await expect
			.element(page.getByRole('status'))
			.toHaveTextContent('Camera placed left of Sensor stat.');
	});
});
