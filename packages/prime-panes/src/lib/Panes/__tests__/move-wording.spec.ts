import { describe, expect, it } from 'vitest';

import {
	dockedMessage,
	floatedMessage,
	floatName,
	joinLabels,
	MISSING_MOVE_TRIGGER_WARNING,
	placedMessage,
	reorderedMessage,
	reorderName,
	targetName
} from '../move-wording.ts';

import type { DropRegion } from '../../drop-region.ts';

describe('joinLabels', () => {
	it('returns a single label as is', () => {
		expect(joinLabels(['Camera A'])).toBe('Camera A');
	});

	it('joins two labels with and', () => {
		expect(joinLabels(['Camera A', 'Camera B'])).toBe('Camera A and Camera B');
	});

	it('joins three labels with commas and a final and', () => {
		expect(joinLabels(['Camera A', 'Camera B', 'Camera C'])).toBe(
			'Camera A, Camera B, and Camera C'
		);
	});
});

describe('targetName', () => {
	it.each<[DropRegion, string]>([
		['left', 'Place Cam A left of Cam B'],
		['right', 'Place Cam A right of Cam B'],
		['top', 'Place Cam A above Cam B'],
		['bottom', 'Place Cam A below Cam B'],
		['center', 'Swap Cam A with Cam B'],
		['stack', 'Stack Cam A with Cam B']
	])('names the %s region', (region, expected) => {
		expect(targetName(region, 'Cam A', 'Cam B')).toBe(expected);
	});

	it('adds the tab position to a stack target', () => {
		expect(targetName('stack', 'Cam A', 'Cam B', { position: 2, total: 4 })).toBe(
			'Stack Cam A with Cam B at position 2 of 4'
		);
	});

	it('ignores the tab position for a non-stack region', () => {
		expect(targetName('left', 'Cam A', 'Cam B', { position: 2, total: 4 })).toBe(
			'Place Cam A left of Cam B'
		);
	});
});

describe('placedMessage', () => {
	it.each<[DropRegion, string]>([
		['left', 'Cam A placed left of Cam B.'],
		['right', 'Cam A placed right of Cam B.'],
		['top', 'Cam A placed above Cam B.'],
		['bottom', 'Cam A placed below Cam B.'],
		['center', 'Cam A swapped with Cam B.'],
		['stack', 'Cam A stacked with Cam B.']
	])('reports the %s region', (region, expected) => {
		expect(placedMessage(region, 'Cam A', 'Cam B')).toBe(expected);
	});
});

describe('reorderName and reorderedMessage', () => {
	it.each([
		[{ position: 1, total: 3 }, 'position 1 of 3'],
		[{ position: 2, total: 3 }, 'position 2 of 3'],
		[{ position: 3, total: 3 }, 'position 3 of 3']
	])('counts the tab position from one for %j', (tabPosition, phrase) => {
		expect(reorderName('Cam A', tabPosition)).toBe(`Move Cam A to ${phrase}`);
		expect(reorderedMessage('Cam A', tabPosition)).toBe(`Cam A moved to ${phrase}.`);
	});
});

describe('floatName and floatedMessage', () => {
	it('names the choice and reports the result', () => {
		expect(floatName('Cam A')).toBe('Float Cam A');
		expect(floatedMessage('Cam A')).toBe('Floated Cam A.');
	});
});

describe('dockedMessage', () => {
	it.each<[DropRegion, string]>([
		['left', 'Docked Cam A left of Cam B.'],
		['right', 'Docked Cam A right of Cam B.'],
		['top', 'Docked Cam A above Cam B.'],
		['bottom', 'Docked Cam A below Cam B.'],
		['center', 'Docked Cam A swapped with Cam B.'],
		['stack', 'Docked Cam A stacked with Cam B.']
	])('reports the %s region', (region, expected) => {
		expect(dockedMessage(region, 'Cam A', 'Cam B')).toBe(expected);
	});

	it('uses the placement phrase of placedMessage', () => {
		const placement = placedMessage('left', 'Cam A', 'Cam B').replace('Cam A placed ', '');
		expect(dockedMessage('left', 'Cam A', 'Cam B')).toBe(`Docked Cam A ${placement}`);
	});
});

describe('MISSING_MOVE_TRIGGER_WARNING', () => {
	it('names the pane and the float target in the window warning', () => {
		const warning = MISSING_MOVE_TRIGGER_WARNING.float('Cam A');

		expect(warning).toContain('a window drag started in pane "Cam A"');
		expect(warning).toContain('Panes.MoveTrigger with target="float"');
	});
});
