import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';

import BasicTree from '../../../../test/fixtures/BasicTree.svelte';
import CustomRowsTree from '../../../../test/fixtures/CustomRowsTree.svelte';
import PartsTree from '../../../../test/fixtures/PartsTree.svelte';

const countOf = (html: string, fragment: string) => html.split(fragment).length - 1;

describe('Tree on the server', () => {
	it('renders the tree, its branches, and its items', () => {
		const { body } = render(BasicTree, { props: { initialExpanded: ['docs', 'guides'] } });

		expect(body).toContain('role="tree"');
		expect(body).toContain('role="treeitem"');
		expect(body).toContain('aria-label="Docs"');
		expect(body).toContain('aria-label="Readme"');
	});

	it('renders each branch control, trigger, and expanded content', () => {
		const { body } = render(PartsTree, { props: { initialExpanded: ['docs'] } });

		expect(body).toContain('data-testid="branch-docs"');
		expect(body).toContain('data-testid="branch-control-docs"');
		expect(body).toContain('data-testid="branch-trigger-docs"');
		expect(body).toContain('data-testid="branch-content-docs"');
		expect(body).toContain('role="group"');
		expect(body).toContain('data-testid="item-readme"');
	});

	it('renders the indicators as hidden from assistive technology', () => {
		const { body } = render(PartsTree, { props: { initialExpanded: ['docs'] } });

		expect(body).toContain('data-testid="indicator-docs"');
		expect(body).toContain('data-testid="indicator-readme"');
		expect(countOf(body, 'aria-hidden="true"')).toBeGreaterThanOrEqual(2);
	});

	it('renders the rows, the indent guide, and the group of a custom arrangement', () => {
		const { body } = render(CustomRowsTree);

		expect(body).toContain('data-testid="root-rows"');
		expect(body).toContain('data-testid="rows-docs"');
		expect(body).toContain('data-testid="guide-docs"');
		expect(body).toContain('role="group"');
		expect(body).toContain('aria-label="Readme"');
	});

	it('does not render the children of a collapsed branch', () => {
		const { body } = render(BasicTree);

		expect(body).toContain('aria-label="Docs"');
		expect(body).not.toContain('aria-label="Readme"');
	});
});
