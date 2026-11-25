import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const LIB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SPECIFIER = /(?:from|import)\s+'([^']+)'/g;

/** Every bare package an entry reaches through its relative imports. */
const packagesReachedFrom = (entry: string): Set<string> => {
	const packages = new Set<string>();
	const visited = new Set<string>();
	const pending = [resolve(LIB, entry)];

	while (pending.length > 0) {
		const file = pending.pop();
		if (file === undefined || visited.has(file)) continue;
		visited.add(file);

		for (const [, specifier] of readFileSync(file, 'utf8').matchAll(SPECIFIER)) {
			if (specifier.startsWith('.')) {
				if (/\.(ts|svelte)$/.test(specifier)) pending.push(resolve(dirname(file), specifier));
			} else {
				packages.add(specifier);
			}
		}
	}

	return packages;
};

describe('package entries', () => {
	it('keeps three out of everything `.` imports', () => {
		const packages = packagesReachedFrom('index.ts');

		expect(packages).toContain('maplibre-gl');
		expect(packages).not.toContain('three');
	});

	it('finds three behind `./three`, so the check above can fail', () => {
		expect(packagesReachedFrom('three.ts')).toContain('three');
	});
});
