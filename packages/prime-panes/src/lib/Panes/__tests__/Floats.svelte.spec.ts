import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page } from 'vitest/browser';
import type { Locator } from 'vitest/browser';

import FloatingPanes from '../../../../test/fixtures/FloatingPanes.svelte';
import {
	createFloatLayout,
	createNestedFloatLayout,
	expectFloat,
	floatIds,
	nestedFloatIds
} from '../../../../test/layouts.ts';
import '../../../../test/panes-queries.ts';
import type { Point } from '../../../../test/input-commands.ts';
import { movePane } from '../../tree.ts';

const entryIdsOf = (layout: Parameters<typeof expectFloat>[0]) =>
	expectFloat(layout).floats.map((entry) => entry.id);

function floatWithRect(rect: { x: number; y: number; width: number; height: number }) {
	const layout = expectFloat(createFloatLayout());
	return { ...layout, floats: [{ ...layout.floats[0]!, rect }, layout.floats[1]!] };
}

describe('Floats', () => {
	it('draws a window inside the float node at its rect', async () => {
		render(FloatingPanes);

		const entry = page.getByFloatEntry(floatIds.entryB);
		await expect.element(entry).toHaveStyle({
			left: '50px',
			top: '50px',
			width: '120px',
			height: '90px'
		});
		expect(page.getByFloat(floatIds.float).element().contains(entry.element())).toBe(true);
		await expect.element(page.getByRole('region', { name: floatIds.baseLeft })).toBeVisible();
	});

	it('draws a rect past the box clamped and keeps the stored rect', async () => {
		const stored = { x: 700, y: 500, width: 300, height: 200 };
		const screen = render(FloatingPanes, { props: { initial: floatWithRect(stored) } });

		await expect.element(page.getByFloatEntry(floatIds.entryA)).toHaveStyle({
			left: '500px',
			top: '400px',
			width: '300px',
			height: '200px'
		});
		const component = screen.component as unknown as { getLayout: () => never };
		expect(expectFloat(component.getLayout()).floats[0]!.rect).toEqual(stored);
	});

	it('draws a window larger than the box at the box size', async () => {
		render(FloatingPanes, {
			props: { initial: floatWithRect({ x: 100, y: 100, width: 1000, height: 700 }) }
		});

		await expect.element(page.getByFloatEntry(floatIds.entryA)).toHaveStyle({
			left: '0px',
			top: '0px',
			width: '800px',
			height: '600px'
		});
	});

	it('raises a lower window on press with exactly one write', async () => {
		const screen = render(FloatingPanes);
		const component = screen.component as unknown as {
			getLayout: () => never;
			getWrites: () => number;
		};

		await page.getByRole('region', { name: floatIds.paneA }).click();

		await expect
			.poll(() => entryIdsOf(component.getLayout()))
			.toEqual([floatIds.entryB, floatIds.entryA]);
		expect(component.getWrites()).toBe(1);
	});

	it('writes nothing when the top window is pressed', async () => {
		const screen = render(FloatingPanes);
		const component = screen.component as unknown as {
			getLayout: () => never;
			getWrites: () => number;
		};

		await page.getByRole('region', { name: floatIds.paneB }).click();

		expect(component.getWrites()).toBe(0);
		expect(entryIdsOf(component.getLayout())).toEqual([floatIds.entryA, floatIds.entryB]);
	});

	it('keeps the DOM order of the windows across a raise', async () => {
		render(FloatingPanes);
		const order = () =>
			[...page.getByFloat(floatIds.float).element().querySelectorAll('[data-float-entry]')].map(
				(element) => element.getAttribute('data-float-entry')
			);
		const before = order();

		await page.getByRole('region', { name: floatIds.paneA }).click();

		await expect.element(page.getByFloatEntry(floatIds.entryA)).toHaveStyle({ zIndex: '2' });
		expect(order()).toEqual(before);
	});

	it('raises a lower window when focus moves into it', async () => {
		const screen = render(FloatingPanes);
		const component = screen.component as unknown as { getLayout: () => never };

		page
			.getByRole('button', { name: `Close ${floatIds.paneA}` })
			.element()
			.focus();

		await expect
			.poll(() => entryIdsOf(component.getLayout()))
			.toEqual([floatIds.entryB, floatIds.entryA]);
	});

	it('removes a window with its close button', async () => {
		const screen = render(FloatingPanes);
		const component = screen.component as unknown as { getLayout: () => never };

		await page.getByRole('button', { name: `Close ${floatIds.paneB}` }).click();

		await expect.poll(() => entryIdsOf(component.getLayout())).toEqual([floatIds.entryA]);
		await expect.element(page.getByFloatEntry(floatIds.entryB)).not.toBeInTheDocument();
	});

	it('reports isFloating for window panes and not for base panes', async () => {
		render(FloatingPanes);

		await expect
			.element(page.getByRole('region', { name: floatIds.paneA }))
			.toHaveAttribute('data-is-floating', 'true');
		await expect.element(page.getByPane(floatIds.paneA)).toHaveAttribute('data-floating');
		await expect
			.element(page.getByRole('region', { name: floatIds.baseLeft }))
			.toHaveAttribute('data-is-floating', 'false');
		await expect.element(page.getByPane(floatIds.baseLeft)).not.toHaveAttribute('data-floating');
	});

	it('reports isFloating for panes in a split and a stack inside a window', async () => {
		render(FloatingPanes, { props: { initial: createNestedFloatLayout() } });

		for (const id of [nestedFloatIds.splitFirst, nestedFloatIds.splitSecond]) {
			await expect
				.element(page.getByRole('region', { name: id }))
				.toHaveAttribute('data-is-floating', 'true');
			await expect.element(page.getByPane(id)).toHaveAttribute('data-floating');
		}
		await expect
			.element(page.getByRole('region', { name: nestedFloatIds.stackFirst }))
			.toHaveAttribute('data-is-floating', 'true');
		await expect
			.element(page.getByPane(nestedFloatIds.stackFirst))
			.toHaveAttribute('data-floating');
	});

	it('renders the empty snippet behind the windows when there is no base', async () => {
		const withoutBase = { ...expectFloat(createFloatLayout()), base: undefined };
		render(FloatingPanes, { props: { initial: withoutBase, withEmpty: true } });

		await expect.element(page.getByTestId('empty')).toBeVisible();
		await expect.element(page.getByRole('region', { name: floatIds.paneA })).toBeVisible();
	});

	it('renders a newly added window last in DOM order and keeps an older one in place after a raise', async () => {
		const screen = render(FloatingPanes);
		const component = screen.component as unknown as { addWindow: () => void };
		const order = () =>
			[...page.getByFloat(floatIds.float).element().querySelectorAll('[data-float-entry]')].map(
				(element) => element.getAttribute('data-float-entry')
			);

		await page.getByRole('region', { name: floatIds.paneA }).click();
		component.addWindow();

		await expect.element(page.getByFloatEntry('entry-c')).toBeInTheDocument();
		expect(order()).toEqual([floatIds.entryA, floatIds.entryB, 'entry-c']);
	});

	it('gives a press over a base divider to the window above it', async () => {
		const layout = expectFloat(createFloatLayout());
		const over = { x: 350, y: 100, width: 100, height: 100 };
		const screen = render(FloatingPanes, {
			props: {
				initial: { ...layout, floats: [{ ...layout.floats[0]!, rect: over }, layout.floats[1]!] }
			}
		});
		const component = screen.component as unknown as { getLayout: () => never };

		await page.getByRole('region', { name: floatIds.paneA }).click();

		await expect
			.poll(() => entryIdsOf(component.getLayout()))
			.toEqual([floatIds.entryB, floatIds.entryA]);
	});
});

describe('Floats: dropping a dragged pane', () => {
	const grip = (id: string) => page.getByRole('button', { name: `Move ${id}`, exact: true });

	const dropOnto = async (source: Locator, target: Locator, at: Point) => {
		await commands.mouseMove(source.selector);
		await commands.mouseDown();
		await commands.mouseMove(target.selector, at);
		await commands.mouseUp();
	};

	const entryOf = (layout: Parameters<typeof expectFloat>[0], id: string) =>
		expectFloat(layout).floats.find((entry) => entry.id === id);

	it('docks a window pane beside a base pane and drops the emptied entry', async () => {
		const screen = render(FloatingPanes, { props: { handles: true } });
		const component = screen.component as unknown as { getLayout: () => never };
		const before = expectFloat(createFloatLayout());

		await dropOnto(grip(floatIds.paneB), page.getByPane(floatIds.baseRight), {
			x: '90%',
			y: '50%'
		});

		await expect.poll(() => entryIdsOf(component.getLayout())).toEqual([floatIds.entryA]);
		const docked = expectFloat(component.getLayout());
		const split = docked.base as { second: { id: string } };
		expect(docked.base).toEqual(
			expectFloat(
				movePane(before, floatIds.paneB, floatIds.baseRight, 'row', 'second', split.second.id)
			).base
		);
	});

	it('targets the window pane where a window overlaps a base pane', async () => {
		const screen = render(FloatingPanes, { props: { handles: true } });
		const component = screen.component as unknown as { getLayout: () => never };

		await dropOnto(grip(floatIds.baseRight), page.getByPane(floatIds.paneA), {
			x: '90%',
			y: '25%'
		});

		await expect
			.poll(() => entryOf(component.getLayout(), floatIds.entryA)?.content.type)
			.toBe('split');
		const base = expectFloat(component.getLayout()).base;
		expect(base).toEqual(expect.objectContaining({ type: 'pane', id: floatIds.baseLeft }));
	});

	it('targets the pane in the upper window where two windows overlap', async () => {
		const screen = render(FloatingPanes, { props: { handles: true } });
		const component = screen.component as unknown as { getLayout: () => never };

		await dropOnto(grip(floatIds.baseRight), page.getByPane(floatIds.paneB), { x: 10, y: 10 });

		await expect
			.poll(() => entryOf(component.getLayout(), floatIds.entryB)?.content.type)
			.toBe('split');
		expect(entryOf(component.getLayout(), floatIds.entryA)?.content.type).toBe('pane');
	});
});
