/**
 * Where a floating panel renders. `true` moves it to the end of `<body>`, `false` leaves it where
 * it is written, and an element or a CSS selector moves it into that element.
 */
export type PortalTarget = boolean | string | Element;

interface HeadlessPortalProps {
	disabled: boolean;
	to?: string | Element;
}

/** Translates the `portal` prop into the headless portal's own props, which stay off the public surface. */
export const portalProps = (portal: PortalTarget = true): HeadlessPortalProps =>
	typeof portal === 'boolean' ? { disabled: !portal } : { disabled: false, to: portal };
