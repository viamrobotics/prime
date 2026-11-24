import { describe, expect, it } from 'vitest';

import {
	type Bounds,
	clamp,
	longestValueLength,
	settle,
	startingValue,
	stepMultiplier
} from '../number-step.ts';

const UNBOUNDED: Bounds = { min: undefined, max: undefined };
const ZERO_TO_TEN: Bounds = { min: 0, max: 10 };

describe('stepMultiplier', () => {
	it.each([
		{ keys: 'no modifier', shiftKey: false, altKey: false, expected: 1 },
		{ keys: 'Shift', shiftKey: true, altKey: false, expected: 10 },
		{ keys: 'Alt', shiftKey: false, altKey: true, expected: 0.1 },
		{ keys: 'Shift and Alt together', shiftKey: true, altKey: true, expected: 10 }
	])('multiplies the step by $expected for $keys', ({ shiftKey, altKey, expected }) => {
		const multiplier = stepMultiplier({ shiftKey, altKey });

		expect(multiplier).toBe(expected);
	});
});

describe('clamp', () => {
	it.each([
		{ amount: 12, bounds: ZERO_TO_TEN, expected: 10, rule: 'lowers a value above max to max' },
		{ amount: -3, bounds: ZERO_TO_TEN, expected: 0, rule: 'raises a value below min to min' },
		{ amount: 7, bounds: ZERO_TO_TEN, expected: 7, rule: 'keeps a value inside the bounds' },
		{
			amount: -500,
			bounds: { min: undefined, max: 10 },
			expected: -500,
			rule: 'leaves a missing min open'
		},
		{
			amount: 500,
			bounds: { min: 0, max: undefined },
			expected: 500,
			rule: 'leaves a missing max open'
		}
	])('$rule', ({ amount, bounds, expected }) => {
		const clamped = clamp(amount, bounds);

		expect(clamped).toBe(expected);
	});
});

describe('settle', () => {
	it.each([
		{
			amount: 0.2 + 0.1,
			step: 0.1,
			multiplier: 1,
			expected: 0.3,
			rule: 'drops float residue at the step decimals'
		},
		{
			amount: 0.3 + 1,
			step: 0.1,
			multiplier: 10,
			expected: 1.3,
			rule: "keeps a fractional step's decimals under Shift"
		},
		{
			amount: 5 + 0.1,
			step: 1,
			multiplier: 0.1,
			expected: 5.1,
			rule: 'adds a decimal for an Alt step on a whole step'
		},
		{
			amount: 0.2 + 0.01,
			step: 0.1,
			multiplier: 0.1,
			expected: 0.21,
			rule: 'adds a decimal for an Alt step on a fractional step'
		},
		{
			amount: 1.26,
			step: 0.5,
			multiplier: 1,
			expected: 1.3,
			rule: 'rounds to decimal places, not to a multiple of the step'
		},
		{
			amount: 2 / 3,
			step: 1 / 3,
			multiplier: 1,
			expected: 0.666666666666667,
			rule: 'caps a step with endless decimals at 15 places'
		}
	])('$rule', ({ amount, step, multiplier, expected }) => {
		const settled = settle(amount, step, multiplier, UNBOUNDED);

		expect(settled).toBe(expected);
	});

	it('clamps the settled value to the bounds', () => {
		const settled = settle(12.34, 0.1, 1, ZERO_TO_TEN);

		expect(settled).toBe(10);
	});
});

describe('startingValue', () => {
	it.each([
		{ value: 4, bounds: ZERO_TO_TEN, expected: 4, rule: 'starts from the current value' },
		{
			value: 20,
			bounds: ZERO_TO_TEN,
			expected: 20,
			rule: 'leaves a typed value past max unclamped'
		},
		{
			value: undefined,
			bounds: UNBOUNDED,
			expected: 0,
			rule: 'starts an empty unbounded field at 0'
		},
		{
			value: undefined,
			bounds: { min: 3, max: undefined },
			expected: 3,
			rule: 'starts an empty field at min'
		},
		{
			value: undefined,
			bounds: { min: undefined, max: -5 },
			expected: -5,
			rule: 'starts an empty field below 0 at max'
		}
	])('$rule', ({ value, bounds, expected }) => {
		const start = startingValue(value, bounds);

		expect(start).toBe(expected);
	});
});

describe('longestValueLength', () => {
	it.each([
		{ min: 0, max: 100, step: 0.1, expected: 5, rule: 'counts max at the step decimals, as 100.0' },
		{
			min: -10,
			max: 5,
			step: 1,
			expected: 3,
			rule: 'counts the minus sign of a longer min, as -10'
		},
		{
			min: 0,
			max: 1,
			step: 0.25,
			expected: 4,
			rule: 'counts two decimals for a quarter step, as 1.00'
		},
		{
			min: 0,
			max: 1,
			step: 0.07,
			expected: 4,
			rule: 'reads a step with float residue, such as 0.07, at its two decimals'
		}
	])('$rule', ({ min, max, step, expected }) => {
		const length = longestValueLength(min, max, step);

		expect(length).toBe(expected);
	});
});
