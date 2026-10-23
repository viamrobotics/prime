import { afterEach, describe, expect, it, vi } from 'vitest';

import { createSplitId } from '../split-id.ts';

describe('createSplitId', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('returns a UUID where crypto.randomUUID exists', () => {
		expect(createSplitId()).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
		);
	});

	it('returns 32 hex characters where crypto.randomUUID does not exist', () => {
		vi.stubGlobal('crypto', { getRandomValues: crypto.getRandomValues.bind(crypto) });

		expect(createSplitId()).toMatch(/^[0-9a-f]{32}$/);
	});

	it('returns a different id on every call where crypto.randomUUID does not exist', () => {
		vi.stubGlobal('crypto', { getRandomValues: crypto.getRandomValues.bind(crypto) });

		const generated = new Set(Array.from({ length: 50 }, createSplitId));

		expect(generated.size).toBe(50);
	});
});
