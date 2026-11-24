import { describe, expect, it } from 'vitest';

import { joinDescribedBy } from '../described-by.ts';

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
