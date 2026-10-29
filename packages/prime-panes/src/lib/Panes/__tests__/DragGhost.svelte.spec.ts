import '../../../../test/tailwind.css';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page } from 'vitest/browser';

import type { DragPreview } from '../drag-preview.ts';

import PanePartsPanes from '../../../../test/fixtures/PanePartsPanes.svelte';
import DragGhost from '../DragGhost.svelte';

const POINT = { clientX: 100, clientY: 80 };
const MOVED_POINT = { clientX: 300, clientY: 200 };

const preview: DragPreview<unknown> = {
	type: 'stack',
	form: 'tab',
	panes: [
		{ type: 'pane', id: 'a', data: 1 },
		{ type: 'pane', id: 'b', data: 2 }
	] as unknown as DragPreview<unknown>['panes'],
	label: 'Alpha, Beta'
};

const paneFormPreview: DragPreview<unknown> = { ...preview, form: 'pane' };

const ghost = () => page.getByDragGhost();

describe('DragGhost', () => {
	it('is open in the top layer', async () => {
		render(DragGhost, { point: POINT, preview });

		await expect.element(ghost()).toBeVisible();
		expect(ghost().element().matches(':popover-open')).toBe(true);
	});

	it('places its top-left corner 12px right of and below the pointer', async () => {
		render(DragGhost, { point: POINT, preview });

		await expect.element(ghost()).toBeVisible();
		const rect = ghost().element().getBoundingClientRect();

		expect([rect.left, rect.top]).toEqual([112, 92]);
	});

	it('is absent from elementsFromPoint inside it', async () => {
		render(DragGhost, { point: POINT, preview });
		await expect.element(ghost()).toBeVisible();

		const hits = document.elementsFromPoint(117, 97);

		expect(hits).not.toContain(ghost().element());
	});

	it('is hidden from assistive tech', async () => {
		render(DragGhost, { point: POINT, preview });

		await expect.element(ghost()).toHaveAttribute('aria-hidden', 'true');
	});

	it('shows the label in the default chip of the tab form', async () => {
		render(DragGhost, { point: POINT, preview });

		await expect.element(ghost()).toHaveTextContent(/^\s*Alpha, Beta\s*$/);
	});

	it('shows the label in the header of the default card of the pane form', async () => {
		render(DragGhost, { point: POINT, preview: paneFormPreview });

		await expect.element(ghost()).toHaveTextContent(/^\s*Alpha, Beta\s*$/);
	});

	it('sizes the default card of the pane form to 12rem by 7rem', async () => {
		render(DragGhost, { point: POINT, preview: paneFormPreview });

		await expect.element(ghost()).toBeVisible();
		const rect = ghost().element().getBoundingClientRect();

		expect([rect.width, rect.height]).toEqual([192, 112]);
	});

	it.each([
		{ form: 'tab', expected: 'stack|tab|2|Alpha, Beta' },
		{ form: 'pane', expected: 'stack|pane|2|Alpha, Beta' }
	] as const)(
		'renders the dragPreview snippet with form $form instead of the defaults',
		async ({ form, expected }) => {
			const dragPreview = createRawSnippet<[DragPreview<unknown>]>((current) => ({
				render: () =>
					`<span>${current().type}|${current().form}|${current().panes.length}|${current().label}</span>`
			}));
			render(DragGhost, { point: POINT, preview: { ...preview, form }, dragPreview });

			await expect.element(ghost()).toHaveTextContent(expected);
			expect(ghost().element().children).toHaveLength(1);
		}
	);

	it('moves when the point changes', async () => {
		const { rerender } = render(DragGhost, { point: POINT, preview });

		await rerender({ point: MOVED_POINT, preview });

		await expect
			.poll(() => {
				const rect = ghost().element().getBoundingClientRect();
				return [rect.left, rect.top];
			})
			.toEqual([312, 212]);
	});
});

describe('Panes dragPreview', () => {
	it('reaches the ghost of a live pointer drag', async () => {
		const dragPreview = createRawSnippet<[DragPreview<unknown>]>((current) => ({
			render: () => `<span>Dragging ${current().label}</span>`
		}));
		render(PanePartsPanes, { variant: 'drag-only', dragPreview });
		const header = page.getByPaneHeader('Camera');

		await commands.mouseMove(header.selector, { x: 10, y: 10 });
		await commands.mouseDown();
		await commands.mouseMove(header.selector, { x: 50, y: 10 });

		await expect.element(ghost()).toHaveTextContent('Dragging Camera');
		await commands.mouseUp();
	});
});
