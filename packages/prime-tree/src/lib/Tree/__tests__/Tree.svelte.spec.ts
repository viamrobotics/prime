import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import BasicTree from '../../../../test/fixtures/BasicTree.svelte';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });

describe('Tree', () => {
	it('renders one treeitem per root node and none for a collapsed branch', async () => {
		render(BasicTree);

		await expect.element(page.getByRole('tree', { name: 'Sample' })).toBeInTheDocument();
		await expect.element(page.getByRole('treeitem')).toHaveLength(4);
		await expect.element(itemOf('Readme')).not.toBeInTheDocument();
	});

	it('expands a branch when its control is clicked', async () => {
		render(BasicTree);

		await itemOf('Docs').getByText('Docs').click();

		await expect.element(itemOf('Readme')).toBeVisible();
		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
	});

	it('carries the position in aria-level, aria-setsize and aria-posinset', async () => {
		render(BasicTree);
		await itemOf('Docs').getByText('Docs').click();

		await expect.element(itemOf('Guides')).toHaveAttribute('aria-level', '2');
		await expect.element(itemOf('Guides')).toHaveAttribute('aria-setsize', '2');
		await expect.element(itemOf('Guides')).toHaveAttribute('aria-posinset', '2');
	});

	it('marks an empty folder with aria-expanded and a leaf without it', async () => {
		render(BasicTree);

		await expect.element(itemOf('Empty')).toHaveAttribute('aria-expanded', 'false');
		await expect.element(itemOf('Notes')).not.toHaveAttribute('aria-expanded');
	});

	it('reflects an expansion in bind:expanded as the branch value', async () => {
		const screen = render(BasicTree);

		await itemOf('Docs').getByText('Docs').click();

		await expect.poll(() => screen.component.getExpanded()).toEqual(['docs']);
	});

	it('passes depth and isBranch to the node snippet', async () => {
		render(BasicTree);
		await itemOf('Docs').getByText('Docs').click();

		await expect.element(itemOf('Docs')).toHaveAttribute('data-depth', '1');
		await expect.element(itemOf('Docs')).toHaveAttribute('data-is-branch', 'true');
		await expect.element(itemOf('Readme')).toHaveAttribute('data-depth', '2');
		await expect.element(itemOf('Readme')).toHaveAttribute('data-is-branch', 'false');
	});

	it('renders a node appended to an expanded branch and keeps the branch expanded', async () => {
		render(BasicTree);
		await itemOf('Docs').getByText('Docs').click();

		await page.getByRole('button', { name: 'Append to Docs' }).click();

		await expect.element(itemOf('Added')).toBeVisible();
		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
	});
});
