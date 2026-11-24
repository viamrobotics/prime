import { describe, expect, it } from 'vitest';

import { hintIdFor, joinDescribedBy } from '../described-by.ts';

describe('hintIdFor', () => {
	it('derives the hint id from the control id', () => {
		expect(hintIdFor('speed')).toBe('speed-hint');
	});
});

describe('joinDescribedBy', () => {
	it('joins the present ids with single spaces in their given order', () => {
		const joined = joinDescribedBy(['consumer-id', undefined, 'field-hint', false, 'field-suffix']);

		expect(joined).toBe('consumer-id field-hint field-suffix');
	});

	it.each<{ ids: (string | false | null | undefined)[] }>([
		{ ids: [] },
		{ ids: [undefined, false, null] },
		{ ids: ['', undefined] }
	])('returns undefined when no id is present in $ids', ({ ids }) => {
		const joined = joinDescribedBy(ids);

		expect(joined).toBeUndefined();
	});
});
