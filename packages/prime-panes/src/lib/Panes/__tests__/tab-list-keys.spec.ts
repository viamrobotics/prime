import { describe, expect, it } from 'vitest';

import { reorderStepOf, targetIndexFor } from '../tab-list-keys.ts';

describe('targetIndexFor', () => {
	it.each([
		['ArrowRight', 0, 3, 1],
		['ArrowRight', 2, 3, 0],
		['ArrowLeft', 2, 3, 1],
		['ArrowLeft', 0, 3, 2],
		['Home', 2, 3, 0],
		['End', 0, 3, 2],
		['ArrowRight', 0, 1, 0],
		['ArrowLeft', 0, 1, 0],
		['ArrowUp', 1, 3, undefined],
		['a', 1, 3, undefined]
	])('%s from %i of %i goes to %s', (key, index, count, expected) => {
		expect(targetIndexFor(key, index, count)).toBe(expected);
	});
});

describe('reorderStepOf', () => {
	const press = (key: string, modifiers: Partial<Record<string, boolean>> = {}) => ({
		key,
		altKey: false,
		shiftKey: false,
		ctrlKey: false,
		metaKey: false,
		...modifiers
	});
	const altShift = { altKey: true, shiftKey: true };

	it.each([
		['Alt+Shift+ArrowLeft', press('ArrowLeft', altShift), -1],
		['Alt+Shift+ArrowRight', press('ArrowRight', altShift), 1],
		['ArrowRight alone', press('ArrowRight'), undefined],
		['Alt+ArrowRight', press('ArrowRight', { altKey: true }), undefined],
		['Shift+ArrowRight', press('ArrowRight', { shiftKey: true }), undefined],
		['Ctrl+Alt+Shift+ArrowRight', press('ArrowRight', { ...altShift, ctrlKey: true }), undefined],
		['Meta+Alt+Shift+ArrowLeft', press('ArrowLeft', { ...altShift, metaKey: true }), undefined],
		['Alt+Shift+Home', press('Home', altShift), undefined]
	])('%s gives %s', (_name, event, expected) => {
		expect(reorderStepOf(event)).toBe(expected);
	});
});
