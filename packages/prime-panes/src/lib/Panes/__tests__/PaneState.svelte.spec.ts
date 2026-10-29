import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import StackPanes from '../../../../test/fixtures/StackPanes.svelte';

const moveButtonOf = (label: string) =>
	page.getByRole('button', { name: `Move ${label}`, exact: true });

afterEach(() => vi.useRealTimers());

describe('Panes pane state', () => {
	it('passes isStacked as true to a stacked pane', async () => {
		render(StackPanes, { props: { hasStateProbe: true } });

		await expect.element(page.getByPaneState('cam-a')).toHaveAttribute('data-is-stacked', 'true');
	});

	it('passes isStacked as false to an unstacked pane', async () => {
		render(StackPanes, { props: { hasStateProbe: true } });

		await expect.element(page.getByPaneState('solo')).toHaveAttribute('data-is-stacked', 'false');
	});

	it('marks the wrapper of a stacked pane with data-stacked', async () => {
		render(StackPanes, { props: { hasStateProbe: true } });

		await expect.element(page.getByPane('cam-a')).toHaveAttribute('data-stacked');
	});

	it('leaves the wrapper of an unstacked pane without data-stacked', async () => {
		render(StackPanes, { props: { hasStateProbe: true } });

		await expect.element(page.getByPane('solo')).toBeInTheDocument();
		await expect.element(page.getByPane('solo')).not.toHaveAttribute('data-stacked');
	});

	it('updates isMoving when move mode starts on the pane', async () => {
		render(StackPanes, { props: { hasStateProbe: true, hasTriggers: true } });

		await moveButtonOf('Solo').click();

		await expect.element(page.getByPaneState('solo')).toHaveAttribute('data-is-moving', 'true');
	});

	it('updates isDragArmed when a held control arms the drag', async () => {
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		render(StackPanes, { props: { hasStateProbe: true, hasTriggers: true } });
		await userEvent.hover(moveButtonOf('Solo'));

		await commands.mouseDown();
		vi.advanceTimersByTime(300);

		await expect.element(page.getByPaneState('solo')).toHaveAttribute('data-is-drag-armed', 'true');
		await commands.mouseUp();
	});
});
