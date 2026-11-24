import { cdp } from 'vitest/browser';

export const emulateReducedMotion = (value: 'reduce' | 'no-preference') =>
	cdp().send('Emulation.setEmulatedMedia', {
		features: [{ name: 'prefers-reduced-motion', value }]
	});
