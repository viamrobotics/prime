const X_TICK_SPACING = 80;
const Y_TICK_SPACING = 40;
const MIN_TICK_COUNT = 2;

export const TICK_SIZE = 6;

export const xTickCount = (width: number) =>
	Math.max(MIN_TICK_COUNT, Math.floor(width / X_TICK_SPACING));

export const yTickCount = (height: number) =>
	Math.max(MIN_TICK_COUNT, Math.floor(height / Y_TICK_SPACING));

interface EdgeLabel {
	// The tick's place along the drawing width, from 0 at its left end to 1 at its right end.
	readonly fraction: number;
	readonly width: number;
}

interface EdgeOverhangInput {
	readonly containerWidth: number;
	// The padding the plot's other parts reserve on each side.
	readonly left: number;
	readonly right: number;
	readonly first: EdgeLabel;
	readonly last: EdgeLabel;
}

// Edge labels wider than the box can only overflow, so the overhang takes at most this share of
// the room the other parts leave, and the drawing keeps the rest.
const MAX_OVERHANG_SHARE = 0.5;

const NO_OVERHANG = { left: 0, right: 0 };

type OtherPadding = Pick<EdgeOverhangInput, 'containerWidth' | 'left' | 'right'>;

// Scales the overhang past the other parts' padding down to the share of the room it may take.
const capOverhang = (
	{ containerWidth, left: otherLeft, right: otherRight }: OtherPadding,
	left: number,
	right: number
) => {
	const extraLeft = left - otherLeft;
	const extraRight = right - otherRight;
	const room = Math.max(0, containerWidth - otherLeft - otherRight);
	const extra = extraLeft + extraRight;
	const scale = extra > 0 ? Math.min(1, (MAX_OVERHANG_SHARE * room) / extra) : 0;

	return {
		left: extraLeft > 0 ? otherLeft + extraLeft * scale : 0,
		right: extraRight > 0 ? otherRight + extraRight * scale : 0
	};
};

// The least padding that keeps the first label's left edge and the last label's right edge in the
// box, where the plot reserves the larger of this and the other parts' padding on each side.
export const edgeOverhang = ({
	containerWidth,
	left: otherLeft,
	right: otherRight,
	first,
	last
}: EdgeOverhangInput) => {
	const firstFraction = first.fraction;
	const lastFractionFromRight = 1 - last.fraction;
	const firstHalf = first.width / 2;
	const lastHalf = last.width / 2;
	if (![firstFraction, lastFractionFromRight, firstHalf, lastHalf].every(Number.isFinite)) {
		return NO_OVERHANG;
	}

	// The left padding that puts the first label's left edge on the box's, for a right padding.
	const leftFor = (right: number) =>
		firstFraction < 1
			? (firstHalf - firstFraction * (containerWidth - right)) / (1 - firstFraction)
			: -Infinity;
	const rightFor = (left: number) =>
		lastFractionFromRight < 1
			? (lastHalf - lastFractionFromRight * (containerWidth - left)) / (1 - lastFractionFromRight)
			: -Infinity;

	// Both edges binding at once. Two distinct ticks have a positive spread, and one tick has none.
	const spread = last.fraction - first.fraction;
	const bothBinding =
		spread > 0
			? ((firstHalf - firstFraction * containerWidth) * (1 - lastFractionFromRight) +
					firstFraction * (lastHalf - lastFractionFromRight * containerWidth)) /
				spread
			: -Infinity;

	const left = Math.max(otherLeft, leftFor(otherRight), bothBinding);
	const right = Math.max(otherRight, rightFor(left));
	return capOverhang({ containerWidth, left: otherLeft, right: otherRight }, left, right);
};
