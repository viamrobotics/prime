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
