import { describe, expect, it } from 'vitest';

import { portalProps } from '../portal.ts';

describe('portalProps', () => {
	it('portals to the default target when the prop is absent or true', () => {
		expect(portalProps()).toEqual({ disabled: false });
		expect(portalProps(true)).toEqual({ disabled: false });
	});

	it('disables the portal for false', () => {
		expect(portalProps(false)).toEqual({ disabled: true });
	});

	it('passes a selector or an element through as the target', () => {
		const element = {} as Element;

		expect(portalProps('#overlays')).toEqual({ disabled: false, to: '#overlays' });
		expect(portalProps(element).to).toBe(element);
	});
});
