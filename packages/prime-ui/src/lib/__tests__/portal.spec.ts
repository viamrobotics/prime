import { describe, expect, it } from 'vitest';

import { portalProps } from '../portal.ts';

describe('portalProps', () => {
	it.each([
		{ portal: undefined, expected: { disabled: false } },
		{ portal: true, expected: { disabled: false } },
		{ portal: false, expected: { disabled: true } },
		{ portal: '#overlays', expected: { disabled: false, to: '#overlays' } }
	])('translates $portal to $expected', ({ portal, expected }) => {
		expect(portalProps(portal)).toEqual(expected);
	});

	it('passes an element through as the target', () => {
		const element = {} as Element;

		expect(portalProps(element).to).toBe(element);
	});
});
