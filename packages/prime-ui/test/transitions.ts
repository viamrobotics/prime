/**
 * Lets transitions run on the shared page, which `tailwind.css` otherwise turns off so specs never
 * wait on one. Call `blockTransitions` in `afterEach` to restore the default.
 */
export const allowTransitions = () =>
	document.documentElement.toggleAttribute('data-allow-transitions', true);

/** Turns transitions back off on the shared page. */
export const blockTransitions = () =>
	document.documentElement.removeAttribute('data-allow-transitions');
