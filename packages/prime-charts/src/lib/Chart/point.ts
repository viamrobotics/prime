/**
 * A value a point's `x` may hold. The time scale places a `Date` or epoch milliseconds, and an x
 * it cannot place, such as a string, drops like a gap.
 */
export type ChartXValue = Date | number | string;

/** One sample in a series. */
export interface ChartPoint<TXValue extends ChartXValue = Date> {
	/** Placed by the chart's x scale. */
	x: TXValue;
	/** Placed by the chart's y scale. `null` is a gap, and the line breaks there. */
	y: number | null;
}
