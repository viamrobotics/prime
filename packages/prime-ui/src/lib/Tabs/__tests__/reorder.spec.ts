import { describe, expect, it } from 'vitest';

import { moveTo, reorderStepOf, sameOrder } from '../reorder.ts';

const chord = { key: 'ArrowRight', altKey: true, shiftKey: true, ctrlKey: false, metaKey: false };

describe('reorderStepOf', () => {
	it.each([
		{ name: 'Alt+Shift+ArrowLeft', event: { ...chord, key: 'ArrowLeft' }, step: -1 },
		{ name: 'Alt+Shift+ArrowRight', event: chord, step: 1 },
		{ name: 'Alt+ArrowRight', event: { ...chord, shiftKey: false }, step: undefined },
		{ name: 'Shift+ArrowRight', event: { ...chord, altKey: false }, step: undefined },
		{ name: 'Ctrl+Alt+Shift+ArrowRight', event: { ...chord, ctrlKey: true }, step: undefined },
		{ name: 'Meta+Alt+Shift+ArrowRight', event: { ...chord, metaKey: true }, step: undefined },
		{ name: 'Alt+Shift+ArrowUp', event: { ...chord, key: 'ArrowUp' }, step: undefined }
	])('reads $name as a step of $step', ({ event, step }) => {
		expect(reorderStepOf(event)).toBe(step);
	});
});

describe('moveTo', () => {
	it.each([
		{ value: 'a', index: 2, next: ['b', 'c', 'a'] },
		{ value: 'c', index: 0, next: ['c', 'a', 'b'] },
		{ value: 'b', index: 2, next: ['a', 'c', 'b'] }
	])('moves $value to index $index', ({ value, index, next }) => {
		expect(moveTo(['a', 'b', 'c'], value, index)).toEqual(next);
	});

	it('leaves the given order untouched', () => {
		const order = ['a', 'b', 'c'];

		moveTo(order, 'a', 2);

		expect(order).toEqual(['a', 'b', 'c']);
	});

	it.each([
		{ reason: 'a value not in the order', value: 'z', index: 0 },
		{ reason: 'an index before the start', value: 'a', index: -1 },
		{ reason: 'an index past the end', value: 'a', index: 3 },
		{ reason: 'the index the value already holds', value: 'b', index: 1 }
	])('refuses $reason', ({ value, index }) => {
		expect(moveTo(['a', 'b', 'c'], value, index)).toBeUndefined();
	});
});

describe('sameOrder', () => {
	it.each([
		{ previous: ['a', 'b'], next: ['a', 'b'], same: true },
		{ previous: ['a', 'b'], next: ['b', 'a'], same: false },
		{ previous: ['a', 'b'], next: ['a', 'b', 'c'], same: false }
	])('compares $previous with $next as $same', ({ previous, next, same }) => {
		expect(sameOrder(previous, next), `${previous.join()} against ${next.join()}`).toBe(same);
	});
});
