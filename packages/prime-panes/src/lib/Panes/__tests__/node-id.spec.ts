import { afterEach, describe, expect, it, vi } from 'vitest';

import { createNodeId } from '../node-id.ts';

describe('createNodeId', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('returns a UUID where crypto.randomUUID exists', () => {
		expect(createNodeId()).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
		);
	});

	it('returns 32 hex characters where crypto.randomUUID does not exist', () => {
		vi.stubGlobal('crypto', { getRandomValues: crypto.getRandomValues.bind(crypto) });

		expect(createNodeId()).toMatch(/^[0-9a-f]{32}$/);
	});

	it('returns a different id on every call where crypto.randomUUID does not exist', () => {
		vi.stubGlobal('crypto', { getRandomValues: crypto.getRandomValues.bind(crypto) });

		const generated = new Set(Array.from({ length: 50 }, createNodeId));

		expect(generated.size).toBe(50);
	});
});
