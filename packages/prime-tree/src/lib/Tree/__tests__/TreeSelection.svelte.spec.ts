import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import SelectionTree from '../../../../test/fixtures/SelectionTree.svelte';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });

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

	it('does not select a disabled leaf on click', async () => {
		const screen = render(SelectionTree);

		await itemOf('Locked').click({ force: true });

		await expect.element(itemOf('Locked')).toHaveAttribute('aria-disabled', 'true');
		expect(screen.component.getSelected()).toEqual([]);
	});

	it('toggles and selects a branch on control click by default', async () => {
		const screen = render(SelectionTree);

		await itemOf('Docs').getByText('Docs').click();

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
		await expect.poll(() => screen.component.getSelected()).toEqual(['docs']);
	});

	it('selects a branch and leaves it collapsed on control click when branchClick is select', async () => {
		const screen = render(SelectionTree, { branchClick: 'select' });

		await itemOf('Docs').getByText('Docs').click();

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'false');
		await expect.poll(() => screen.component.getSelected()).toEqual(['docs']);
	});

	it('expands a branch from its trigger when branchClick is select', async () => {
		render(SelectionTree, { branchClick: 'select' });

		await itemOf('Docs').getByText('>').first().click();

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
	});

	it('toggles a branch without selecting it on control click when branchClick is toggle', async () => {
		const screen = render(SelectionTree, { branchClick: 'toggle' });

		await itemOf('Docs').getByText('Docs').click();

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
		await expect.element(itemOf('Docs')).not.toHaveAttribute('aria-selected', 'true');
		await expect.poll(() => screen.component.getSelected()).toEqual([]);
	});

	it('collapses an open branch on a second control click when branchClick is toggle', async () => {
		render(SelectionTree, { branchClick: 'toggle', initialExpanded: ['docs'] });

		await itemOf('Docs').getByText('Docs').click();

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'false');
	});

	it('toggles a branch without selecting it on Enter when branchClick is toggle', async () => {
		const screen = render(SelectionTree, { branchClick: 'toggle' });
		(
			document.querySelector('[data-part="branch-control"][data-value="docs"]') as HTMLElement
		).focus();

		await userEvent.keyboard('{Enter}');

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
		await expect.poll(() => screen.component.getSelected()).toEqual([]);
	});

	it('still selects a leaf on click when branchClick is toggle', async () => {
		const screen = render(SelectionTree, { branchClick: 'toggle' });

		await itemOf('Notes').click();

		await expect.poll(() => screen.component.getSelected()).toEqual(['notes']);
	});
});
