import { vi } from 'vitest';

/** Answers every request with a 404, so a map test never fetches tiles from the network. */
export const blockMapNetwork = () =>
	vi
		.spyOn(globalThis, 'fetch')
		.mockImplementation(() => Promise.resolve(new Response(null, { status: 404 })));
