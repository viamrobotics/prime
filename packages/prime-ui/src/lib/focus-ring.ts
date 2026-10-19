/**
 * The one focus indicator every control shares: a 2px ring outside the element, shown for
 * keyboard focus only. The design system documents no focus treatment, so this is prime's.
 */
export const FOCUS_RING =
	'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-power-button-dark';

/**
 * The same ring on a frame whose focus lives on a child, such as `Input.Group`. It keys on the
 * child's `:focus-visible`, not `:focus-within`, so a mouse click shows no ring there either.
 */
export const FOCUS_RING_WITHIN =
	'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-power-button-dark';
