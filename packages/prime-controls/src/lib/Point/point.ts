import type { FieldState } from '@viamrobotics/prime-ui';

/** One axis of a {@link PointValue}. */
export type PointAxis = 'x' | 'y' | 'z' | 'w';

/**
 * A 2D, 3D, or 4D vector. `Point` renders one field for `x` and `y`, plus one for each of `z` and
 * `w` that is defined.
 */
export interface PointValue {
	x: number;
	y: number;
	z?: number;
	w?: number;
}

/**
 * What one axis of a `Point` sets for itself. Each key takes the place of the control's prop of
 * the same name for that axis only, so a vector whose last axis has its own unit and range is
 * still one `Point`.
 */
export interface PointAxisOptions {
	/** The lowest value of this axis, in place of `min`. */
	min?: number;

	/** The highest value of this axis, in place of `max`. */
	max?: number;

	/** The step of this axis, in place of `step`. */
	step?: number;

	/** Text such as a unit for this axis, in place of `suffix`. An empty string draws none. */
	suffix?: string;

	/** Contextual state of this axis, in place of `state`. */
	state?: FieldState;

	/**
	 * Id of an element that describes this axis field, such as a message in `details`. Pair it with
	 * a warn or error `state`, because a color is never the only signal.
	 */
	describedBy?: string;

	/** Text this axis field shows while its value is `undefined`, such as `-` for a mixed value. */
	placeholder?: string;
}
