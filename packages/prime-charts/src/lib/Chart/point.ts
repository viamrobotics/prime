/** A value a chart can place on its x axis: a moment, a number, or a category. */
export type ChartXValue = Date | number | string;

/** One sample in a series. `x` is placed by the chart's x scale, and `y` by its y scale. */
export interface ChartPoint<TXValue extends ChartXValue = Date> {
	x: TXValue;
	y: number;
}
