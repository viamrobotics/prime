import { describe, expect, it } from 'vitest';

import type { StackNode } from '../../layout.ts';
import { shownPaneId } from '../shown-pane.ts';

const stackWithActiveId = (activeId: string): StackNode<null> => ({
	type: 'stack',
	id: 'cameras',
	activeId,
	panes: [
		{ type: 'pane', id: 'cam-a', data: null },
		{ type: 'pane', id: 'cam-b', data: null }
	]
});

describe('shownPaneId', () => {
	it('returns the activeId when it names one of the stack panes', () => {
		expect(shownPaneId(stackWithActiveId('cam-b'))).toBe('cam-b');
	});

	it('returns the first pane when the activeId names none of the stack panes', () => {
		expect(shownPaneId(stackWithActiveId('gone'))).toBe('cam-a');
	});
});
