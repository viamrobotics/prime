import { describe, expect, it } from 'vitest';
import { seriesLabel } from '../formats.ts';

describe('seriesLabel', () => {
	it.each([
		{ kind: 'a unit', unit: '°', label: 'cell-01 (°)' },
		{ kind: 'no unit', unit: undefined, label: 'cell-01' },
		{ kind: 'an empty unit', unit: '', label: 'cell-01' }
	])('labels a series with $kind as "$label"', ({ unit, label }) => {
		const text = seriesLabel({ name: 'cell-01', unit });

		expect(text).toBe(label);
	});
});
