/** The meaning a `StatusDot` shows, as a color. Leave it out for the gray dot. */
export type StatusDotState = 'info' | 'warning' | 'success' | 'danger' | 'disabled';

/** `solid` fills the dot. `hollow` draws a ring in the state's color with no fill. */
export type StatusDotVariant = 'solid' | 'hollow';
