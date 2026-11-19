import type { DateValue } from '@internationalized/date';

/**
 * The value of a `DateRangePicker`: a start and an end date. A range is finished when both are
 * set. With only one end chosen, the other is `undefined`.
 */
export interface DateRange {
	/** The first day of the range, inclusive. */
	start: DateValue | undefined;
	/** The last day of the range, inclusive. */
	end: DateValue | undefined;
}
