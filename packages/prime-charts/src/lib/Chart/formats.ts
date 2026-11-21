const TIME_FORMAT = new Intl.DateTimeFormat(undefined, {
	dateStyle: 'medium',
	timeStyle: 'medium'
});
const VALUE_FORMAT = new Intl.NumberFormat();

// The fallbacks when neither a part's own format nor an axis's is given.
export const defaultTimeFormat = (value: Date): string => TIME_FORMAT.format(value);
export const defaultValueFormat = (value: number): string => VALUE_FORMAT.format(value);

interface LabeledSeries {
	readonly name: string;
	readonly unit: string | undefined;
}

// A series as the legend names it, `cell-01 (°)`.
export const seriesLabel = (series: LabeledSeries): string =>
	series.unit ? `${series.name} (${series.unit})` : series.name;
