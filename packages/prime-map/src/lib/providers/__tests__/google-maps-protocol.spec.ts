import { addProtocol } from 'maplibre-gl';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('maplibre-gl', () => ({ addProtocol: vi.fn() }));

const loadModule = async () => {
	vi.resetModules();
	return import('../google-maps-protocol.ts');
};

const sessionResponse = () =>
	Promise.resolve(new Response(JSON.stringify({ session: 'abc' }), { status: 200 }));

describe('registerGoogleMapsProtocol', () => {
	beforeEach(() => {
		vi.mocked(addProtocol).mockReset();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('registers the google protocol after a test session succeeds', async () => {
		const fetch = vi.fn(sessionResponse);
		vi.stubGlobal('fetch', fetch);
		const { registerGoogleMapsProtocol } = await loadModule();

		await expect(registerGoogleMapsProtocol('key')).resolves.toBe(true);

		expect(fetch).toHaveBeenCalledWith(
			'https://tile.googleapis.com/v1/createSession?key=key',
			expect.objectContaining({ method: 'POST' })
		);
		expect(addProtocol).toHaveBeenCalledWith('google', expect.any(Function));
	});

	it('resolves true on a later call without a new session', async () => {
		const fetch = vi.fn(sessionResponse);
		vi.stubGlobal('fetch', fetch);
		const { registerGoogleMapsProtocol } = await loadModule();

		await registerGoogleMapsProtocol('key');
		await expect(registerGoogleMapsProtocol('key')).resolves.toBe(true);

		expect(fetch).toHaveBeenCalledOnce();
		expect(addProtocol).toHaveBeenCalledOnce();
	});

	it('resolves false and registers nothing when the session request fails', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(() => Promise.resolve(new Response(null, { status: 403 })))
		);
		const { registerGoogleMapsProtocol } = await loadModule();

		await expect(registerGoogleMapsProtocol('bad')).resolves.toBe(false);

		expect(addProtocol).not.toHaveBeenCalled();
	});

	it('resolves false when the session response has no session', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(() => Promise.resolve(new Response(JSON.stringify({}), { status: 200 })))
		);
		const { registerGoogleMapsProtocol } = await loadModule();

		await expect(registerGoogleMapsProtocol('key')).resolves.toBe(false);
	});
});
