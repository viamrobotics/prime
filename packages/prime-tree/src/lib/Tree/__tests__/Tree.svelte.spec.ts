import type { ComponentProps } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import { bareTreeProps } from '../../../../test/tree-props.ts';
import type TreeRoot from '../Tree.svelte';
import BasicTree from '../../../../test/fixtures/BasicTree.svelte';
import LazyTree from '../../../../test/fixtures/LazyTree.svelte';
import PartsTree from '../../../../test/fixtures/PartsTree.svelte';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });

describe('Tree', () => {
	it('names the tree by the consumer aria-label', async () => {
		render(BasicTree);

		await expect.element(page.getByRole('tree')).toHaveAccessibleName('Sample');
	});

	it('names the tree by the consumer aria-labelledby', async () => {
		render(PartsTree);

		await expect.element(page.getByRole('tree')).toHaveAccessibleName('Files');
	});

	it('requires an aria-label or an aria-labelledby in its type', async () => {
		// @ts-expect-error a tree with neither name does not type check
		const unnamed: ComponentProps<typeof TreeRoot> = bareTreeProps;
		render(BasicTree);

		expect(unnamed.nodes).toEqual([]);
		await expect.element(page.getByRole('tree')).toHaveAccessibleName('Sample');
	});

	it('carries no aria-labelledby when the consumer names the tree by aria-label', async () => {
		render(BasicTree);

		await expect.element(page.getByRole('tree')).not.toHaveAttribute('aria-labelledby');
	});

	it('carries no aria-label when the consumer names the tree by aria-labelledby', async () => {
		render(PartsTree);

		await expect.element(page.getByRole('tree')).not.toHaveAttribute('aria-label');
	});

	it('passes the consumer aria-label to the tree element', async () => {
		render(BasicTree);

		await expect.element(page.getByRole('tree')).toHaveAttribute('aria-label', 'Sample');
	});

	it('passes the consumer aria-labelledby to the tree element', async () => {
		render(PartsTree);

		await expect
			.element(page.getByRole('tree'))
			.toHaveAttribute('aria-labelledby', 'parts-heading');
	});

	it('resolves a class array and object onto the tree element', async () => {
		render(PartsTree);

		await expect
			.element(page.getByRole('tree'))
			.toHaveAttribute('class', 'tree-root tree-root-active');
	});

	it('renders one treeitem per root node', async () => {
		render(BasicTree);

		await expect.element(page.getByRole('treeitem')).toHaveLength(4);
	});

	it('hides the children of a collapsed branch', async () => {
		render(BasicTree);

		await expect.element(itemOf('Readme')).not.toBeInTheDocument();
	});

	it('expands a branch when its control is clicked', async () => {
		render(BasicTree);

		await itemOf('Docs').getByText('Docs').click();

		await expect.element(itemOf('Readme')).toBeVisible();
	});

	it.each([
		{ name: 'Empty', attribute: 'aria-level', value: '1' },
		{ name: 'Empty', attribute: 'aria-posinset', value: '2' },
		{ name: 'Empty', attribute: 'aria-setsize', value: '4' },
		{ name: 'Locked', attribute: 'aria-level', value: '1' },
		{ name: 'Locked', attribute: 'aria-posinset', value: '3' },
		{ name: 'Locked', attribute: 'aria-setsize', value: '4' },
		{ name: 'Intro', attribute: 'aria-level', value: '3' },
		{ name: 'Intro', attribute: 'aria-posinset', value: '1' },
		{ name: 'Intro', attribute: 'aria-setsize', value: '2' }
	])('gives $name $attribute="$value"', async ({ name, attribute, value }) => {
		render(BasicTree, { initialExpanded: ['docs', 'guides'] });

		await expect.element(itemOf(name)).toHaveAttribute(attribute, value);
	});

	it('marks a branch with no children aria-expanded="false" when getChildCount returns 0', async () => {
		render(BasicTree);

		await expect.element(itemOf('Empty')).toHaveAttribute('aria-expanded', 'false');
	});

	it('leaves aria-expanded off a leaf', async () => {
		render(BasicTree);

		await expect.element(itemOf('Notes')).not.toHaveAttribute('aria-expanded');
	});

	it.each([
		{ name: 'Docs', attribute: 'data-state-depth', value: '1' },
		{ name: 'Docs', attribute: 'data-state-branch', value: 'true' },
		{ name: 'Readme', attribute: 'data-state-depth', value: '2' },
		{ name: 'Readme', attribute: 'data-state-branch', value: 'false' }
	])(
		'passes the node snippet a state that renders $attribute="$value" on $name',
		async ({ name, attribute, value }) => {
			render(BasicTree, { initialExpanded: ['docs'] });

			await expect.element(itemOf(name)).toHaveAttribute(attribute, value);
		}
	);

	it('renders a node appended to an expanded branch', async () => {
		render(BasicTree, { initialExpanded: ['docs'] });

		await page.getByRole('button', { name: 'Append to Docs' }).click();

		await expect.element(itemOf('Added')).toBeVisible();
	});

	it('keeps a branch expanded when a node is appended to it', async () => {
		render(BasicTree, { initialExpanded: ['docs'] });

		await page.getByRole('button', { name: 'Append to Docs' }).click();

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
	});
});

describe('Tree with getChildCount', () => {
	it('renders a node whose children have not loaded as a collapsed branch', async () => {
		render(LazyTree);

		await expect.element(itemOf('Remote')).toHaveAttribute('aria-expanded', 'false');
	});

	it('renders children that load after their branch expanded', async () => {
		render(LazyTree, { initialExpanded: ['remote'] });

		await page.getByRole('button', { name: 'Load Remote' }).click();

		await expect.element(itemOf('Remote').getByRole('treeitem')).toHaveLength(2);
	});
});
