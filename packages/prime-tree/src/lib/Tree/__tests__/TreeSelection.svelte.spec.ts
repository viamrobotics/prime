import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import SelectionTree from '../../../../test/fixtures/SelectionTree.svelte';
import { lockedFolderNodes } from '../../../../test/nodes.ts';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });

const focusControlOf = (value: string) =>
	document
		.querySelector<HTMLElement>(`[data-part="branch-control"][data-value="${value}"]`)!
		.focus();

describe('Tree selection', () => {
	it('selects a leaf on click', async () => {
		const screen = render(SelectionTree);

		await itemOf('Notes').click();

		await expect.element(itemOf('Notes')).toHaveAttribute('aria-selected', 'true');
		await expect.poll(() => screen.component.getSelected()).toEqual(['notes']);
	});

	it('replaces the selection with a second click in single mode', async () => {
		const screen = render(SelectionTree, { initialExpanded: ['docs'] });
		await itemOf('Notes').click();

		await itemOf('Readme').click();

		await expect.poll(() => screen.component.getSelected()).toEqual(['readme']);
		await expect.element(itemOf('Notes')).toHaveAttribute('aria-selected', 'false');
	});

	it('adds to the selection with a Meta click in multiple mode', async () => {
		const screen = render(SelectionTree, {
			selectionMode: 'multiple',
			initialExpanded: ['docs']
		});
		await itemOf('Notes').click();

		await itemOf('Readme').click({ modifiers: ['Meta'] });

		await expect.poll(() => screen.component.getSelected().toSorted()).toEqual(['notes', 'readme']);
		await expect.element(itemOf('Notes')).toHaveAttribute('aria-selected', 'true');
		await expect.element(itemOf('Readme')).toHaveAttribute('aria-selected', 'true');
	});

	it('selects the range between the anchor and a Shift-clicked row in multiple mode', async () => {
		const screen = render(SelectionTree, {
			selectionMode: 'multiple',
			branchClick: 'select',
			initialExpanded: ['docs', 'guides']
		});
		await itemOf('Readme').click();

		await itemOf('Advanced').click({ modifiers: ['Shift'] });

		await expect
			.poll(() => screen.component.getSelected().toSorted())
			.toEqual(['advanced', 'guides', 'intro', 'readme']);
	});

	it('leaves a disabled row out of a Shift-clicked range in multiple mode', async () => {
		const screen = render(SelectionTree, { selectionMode: 'multiple', branchClick: 'select' });
		await itemOf('Docs').getByText('Docs').click();

		await itemOf('Notes').click({ modifiers: ['Shift'] });

		await expect
			.poll(() => screen.component.getSelected().toSorted())
			.toEqual(['docs', 'empty', 'notes']);
	});

	it('marks the tree aria-multiselectable in multiple mode', async () => {
		render(SelectionTree, { selectionMode: 'multiple' });

		await expect
			.element(page.getByRole('tree', { name: 'Sample' }))
			.toHaveAttribute('aria-multiselectable', 'true');
	});

	it('omits aria-multiselectable in single mode', async () => {
		render(SelectionTree, { selectionMode: 'single' });

		await expect
			.element(page.getByRole('tree', { name: 'Sample' }))
			.not.toHaveAttribute('aria-multiselectable', 'true');
	});

	it('marks a disabled leaf aria-disabled', async () => {
		render(SelectionTree);

		await expect.element(itemOf('Locked')).toHaveAttribute('aria-disabled', 'true');
	});

	it('does not select a disabled leaf on click', async () => {
		const screen = render(SelectionTree);

		await itemOf('Locked').click({ force: true });

		expect(screen.component.getSelected()).toEqual([]);
	});

	it.each([
		{ branchClick: undefined, expanded: ['docs'], selected: ['docs'] },
		{ branchClick: 'toggle-and-select', expanded: ['docs'], selected: ['docs'] },
		{ branchClick: 'select', expanded: [], selected: ['docs'] },
		{ branchClick: 'toggle', expanded: ['docs'], selected: [] }
	] as const)(
		'on a control click with branchClick $branchClick, expands $expanded and selects $selected',
		async ({ branchClick, expanded, selected }) => {
			const screen = render(SelectionTree, { branchClick });

			await itemOf('Docs').getByText('Docs').click();

			await expect
				.poll(() => ({
					expanded: screen.component.getExpanded(),
					selected: screen.component.getSelected()
				}))
				.toEqual({ expanded, selected });
		}
	);

	it.each([
		{
			branchClick: 'toggle-and-select',
			key: 'Enter',
			keys: '{Enter}',
			expanded: ['docs'],
			selected: ['docs']
		},
		{
			branchClick: 'toggle-and-select',
			key: 'Space',
			keys: ' ',
			expanded: ['docs'],
			selected: ['docs']
		},
		{ branchClick: 'select', key: 'Enter', keys: '{Enter}', expanded: [], selected: ['docs'] },
		{ branchClick: 'select', key: 'Space', keys: ' ', expanded: [], selected: ['docs'] },
		{ branchClick: 'toggle', key: 'Enter', keys: '{Enter}', expanded: ['docs'], selected: [] },
		{ branchClick: 'toggle', key: 'Space', keys: ' ', expanded: ['docs'], selected: [] }
	] as const)(
		'on $key over a branch with branchClick $branchClick, expands $expanded and selects $selected',
		async ({ branchClick, keys, expanded, selected }) => {
			const screen = render(SelectionTree, { branchClick });
			focusControlOf('docs');

			await userEvent.keyboard(keys);

			await expect
				.poll(() => ({
					expanded: screen.component.getExpanded(),
					selected: screen.component.getSelected()
				}))
				.toEqual({ expanded, selected });
		}
	);

	it.each(['toggle', 'toggle-and-select'] as const)(
		'leaves a disabled branch collapsed on a control click with branchClick %s',
		async (branchClick) => {
			const screen = render(SelectionTree, { nodes: lockedFolderNodes, branchClick });

			await itemOf('Archive').getByText('Archive').click({ force: true });

			expect(screen.component.getExpanded()).toEqual([]);
		}
	);

	it('leaves a disabled branch collapsed on Enter with branchClick toggle', async () => {
		const screen = render(SelectionTree, { nodes: lockedFolderNodes, branchClick: 'toggle' });
		focusControlOf('archive');

		await userEvent.keyboard('{Enter}');

		expect(screen.component.getExpanded()).toEqual([]);
	});

	it('expands a branch from its trigger when branchClick is select', async () => {
		render(SelectionTree, { branchClick: 'select' });

		await itemOf('Docs').getByText('>').first().click();

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
	});

	it('collapses an open branch on a second control click when branchClick is toggle', async () => {
		render(SelectionTree, { branchClick: 'toggle', initialExpanded: ['docs'] });

		await itemOf('Docs').getByText('Docs').click();

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'false');
	});

	it('still selects a leaf on click when branchClick is toggle', async () => {
		const screen = render(SelectionTree, { branchClick: 'toggle' });

		await itemOf('Notes').click();

		await expect.poll(() => screen.component.getSelected()).toEqual(['notes']);
	});
});
