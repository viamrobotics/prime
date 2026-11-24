import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import PartOutsideNodeTree from '../../../../test/fixtures/PartOutsideNodeTree.svelte';
import PartsTree from '../../../../test/fixtures/PartsTree.svelte';
import { Tree } from '../tree.ts';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });

const depthOf = (testId: string) =>
	(page.getByTestId(testId).element() as HTMLElement).style.getPropertyValue('--depth');

describe('Tree parts', () => {
	it.each([
		{ part: 'tree', testId: 'tree' },
		{ part: 'Tree.Branch', testId: 'branch-docs' },
		{ part: 'Tree.BranchControl', testId: 'branch-control-docs' },
		{ part: 'Tree.BranchTrigger', testId: 'branch-trigger-docs' },
		{ part: 'Tree.BranchContent', testId: 'branch-content-docs' },
		{ part: 'Tree.Item', testId: 'item-readme' }
	])('lets the consumer dir override the dir $part sets', async ({ testId }) => {
		render(PartsTree, { initialExpanded: ['docs'] });

		await expect.element(page.getByTestId(testId)).toHaveAttribute('dir', 'rtl');
	});

	it.each([
		{ part: 'Tree.Branch', testId: 'branch-guides', depth: '2' },
		{ part: 'Tree.Item', testId: 'item-intro', depth: '3' }
	])('sets --depth to $depth on a $part at that depth', async ({ testId, depth }) => {
		render(PartsTree, { initialExpanded: ['docs', 'guides'] });

		await expect.poll(() => depthOf(testId)).toBe(depth);
	});

	it('groups the rows of an expanded branch in its role="group" element', async () => {
		render(PartsTree, { initialExpanded: ['docs'] });

		await expect.element(itemOf('Docs').getByRole('group').getByRole('treeitem')).toHaveLength(2);
	});

	it.each([
		{ kind: 'branch', testId: 'indicator-docs' },
		{ kind: 'leaf', testId: 'indicator-notes' }
	])('hides the $kind indicator from assistive technology', async ({ testId }) => {
		render(PartsTree);

		await expect.element(page.getByTestId(testId)).toHaveAttribute('aria-hidden', 'true');
	});

	it('hides the indicator of an unselected leaf', async () => {
		render(PartsTree);

		await expect.element(page.getByTestId('indicator-notes')).not.toBeVisible();
	});

	it('shows the indicator of a selected leaf', async () => {
		render(PartsTree, { initialSelected: ['notes'] });

		await expect.element(page.getByTestId('indicator-notes')).toBeVisible();
	});

	it('shows the indicator of an unselected branch', async () => {
		render(PartsTree);

		await expect.element(page.getByTestId('indicator-docs')).toBeVisible();
	});
});

describe('Tree.Item', () => {
	it('leaves aria-current off a selected leaf, whose aria-selected carries the selection', async () => {
		render(PartsTree, { initialSelected: ['notes'] });

		await expect.element(itemOf('Notes')).toHaveAttribute('aria-selected', 'true');
		await expect.element(itemOf('Notes')).not.toHaveAttribute('aria-current');
	});

	it('passes the consumer aria-current to the item', async () => {
		render(PartsTree, { initialSelected: ['notes'], currentValue: 'notes' });

		await expect.element(itemOf('Notes')).toHaveAttribute('aria-current', 'page');
	});
});

describe('Tree parts outside their context', () => {
	it('throws when a part renders outside a Tree', () => {
		expect(() => render(Tree.Item)).toThrow('Tree parts must be rendered inside a Tree.');
	});

	it('throws when a part renders inside a Tree but outside the node snippet', () => {
		expect(() => render(PartOutsideNodeTree)).toThrow(
			'Tree parts must be rendered inside the node snippet.'
		);
	});
});
