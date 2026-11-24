import { describe, expect, it } from 'vitest';
import { edgeOverhang, xTickCount, yTickCount } from '../ticks.ts';

const NO_OTHER_PADDING = { left: 0, right: 0 };

describe('xTickCount', () => {
	it.each([
		[800, 10],
		[239, 2],
		[100, 2],
		[0, 2]
	])('gives a width of %i px %i ticks', (width, count) => {
		expect(xTickCount(width)).toBe(count);
	});
});

describe('yTickCount', () => {
	it.each([
		[400, 10],
		[119, 2],
		[50, 2],
		[0, 2]
	])('gives a height of %i px %i ticks', (height, count) => {
		expect(yTickCount(height)).toBe(count);
	});
});

describe('edgeOverhang', () => {
	it('reserves half of each edge label when its tick sits on the drawing edge', () => {
		const overhang = edgeOverhang({
			containerWidth: 1000,
			...NO_OTHER_PADDING,
			first: { fraction: 0, width: 40 },
			last: { fraction: 1, width: 60 }
		});

		expect(overhang).toEqual({ left: 20, right: 30 });
	});

	it('reserves nothing when the edge labels fit inside the drawing', () => {
		const overhang = edgeOverhang({
			containerWidth: 1000,
			...NO_OTHER_PADDING,
			first: { fraction: 0.1, width: 40 },
			last: { fraction: 0.9, width: 60 }
		});

		expect(overhang).toEqual({ left: 0, right: 0 });
	});

	it('reserves nothing when the other parts already leave room for the edge labels', () => {
		const overhang = edgeOverhang({
			containerWidth: 1000,
			left: 50,
			right: 50,
			first: { fraction: 0, width: 40 },
			last: { fraction: 1, width: 60 }
		});

		expect(overhang).toEqual({ left: 0, right: 0 });
	});

	it('solves both edges together when each side shifts the other label', () => {
		const overhang = edgeOverhang({
			containerWidth: 100,
			...NO_OTHER_PADDING,
			first: { fraction: 0.25, width: 60 },
			last: { fraction: 0.75, width: 60 }
		});

		expect(overhang).toEqual({ left: 10, right: 10 });
	});

	it('caps the overhang at half the room the other parts leave', () => {
		const overhang = edgeOverhang({
			containerWidth: 100,
			...NO_OTHER_PADDING,
			first: { fraction: 0, width: 200 },
			last: { fraction: 1, width: 200 }
		});

		expect(overhang).toEqual({ left: 25, right: 25 });
	});

	it('reserves only the left side for a single tick on the left edge', () => {
		const tick = { fraction: 0, width: 40 };

		const overhang = edgeOverhang({
			containerWidth: 1000,
			...NO_OTHER_PADDING,
			first: tick,
			last: tick
		});

		expect(overhang).toEqual({ left: 20, right: 0 });
	});

	it('reserves nothing on either side when a tick has no place', () => {
		const overhang = edgeOverhang({
			containerWidth: 1000,
			...NO_OTHER_PADDING,
			first: { fraction: Number.NaN, width: 40 },
			last: { fraction: 1, width: 60 }
		});

		expect(overhang).toEqual({ left: 0, right: 0 });
	});
});
