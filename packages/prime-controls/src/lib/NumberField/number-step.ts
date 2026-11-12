const MAX_DECIMALS = 15;
const DECIMAL_TOLERANCE = 1e-9;
const SHIFT_MULTIPLIER = 10;
const ALT_MULTIPLIER = 0.1;

export interface Bounds {
	min: number | undefined;
	max: number | undefined;
}

export function stepMultiplier({ shiftKey, altKey }: { shiftKey: boolean; altKey: boolean }) {
	if (shiftKey) return SHIFT_MULTIPLIER;
	if (altKey) return ALT_MULTIPLIER;
	return 1;
}

// Tolerant of binary float residue, so 0.1 * 0.1 counts as two places, not seventeen.
function decimalsOf(amount: number) {
	for (let decimals = 0; decimals < MAX_DECIMALS; decimals++) {
		const scaled = amount * 10 ** decimals;
		if (Math.abs(scaled - Math.round(scaled)) < DECIMAL_TOLERANCE) return decimals;
	}
	return MAX_DECIMALS;
}

export function clamp(amount: number, { min, max }: Bounds) {
	return Math.min(max ?? Infinity, Math.max(min ?? -Infinity, amount));
}

// A Shift step on a fractional step keeps the base step's places, so 0.3 plus 1 stays 1.3.
export function settle(amount: number, step: number, multiplier: number, bounds: Bounds) {
	const decimals = Math.max(decimalsOf(step), decimalsOf(step * multiplier));
	const factor = 10 ** decimals;
	return clamp(Math.round(amount * factor) / factor, bounds);
}

export function startingValue(value: number | undefined, bounds: Bounds) {
	return value ?? clamp(bounds.min ?? 0, bounds);
}
