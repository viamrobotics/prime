import { createRawSnippet } from 'svelte';
import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';

import { layoutRoot } from '../../__tests__/layout-fixture.ts';
import SplitView from '../SplitView.svelte';

import type { PaneData } from '../../__tests__/layout-fixture.ts';
import type { PaneNode } from '../../layout.ts';

const pane = createRawSnippet<[PaneNode<PaneData>]>((node) => ({
	render: () => `<p data-pane="${node().id}"></p>`
}));

describe('SplitView server rendering', () => {
	it('renders every pane and a separator per split without a DOM', () => {
		const { body } = render(SplitView<PaneData>, { props: { layout: layoutRoot, pane } });

		expect(body.match(/data-pane="/g)).toHaveLength(4);
		expect(body.match(/role="separator"/g)).toHaveLength(3);
	});
});
