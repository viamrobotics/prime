import { describe, expect, it } from 'vitest';

import { readLngLatUserData } from '../lng-lat-user-data.ts';

describe('readLngLatUserData', () => {
	it('reads one point', () => {
		expect(readLngLatUserData({ lng: 1, lat: 2 })).toEqual({ lng: 1, lat: 2 });
	});

	it('reads a list of points', () => {
		const points = [
			{ lng: 1, lat: 2 },
			{ lng: 3, lat: 4 }
		];

		expect(readLngLatUserData(points)).toEqual(points);
	});

	it.each([
		['undefined', undefined],
		['a number', 4],
		['a point without lat', { lng: 1 }],
		['a point with a string lng', { lng: '1', lat: 2 }],
		['a list holding a bad point', [{ lng: 1, lat: 2 }, { lng: 3 }]]
	])('ignores %s', (_, value) => {
		expect(readLngLatUserData(value)).toBeUndefined();
	});
});
