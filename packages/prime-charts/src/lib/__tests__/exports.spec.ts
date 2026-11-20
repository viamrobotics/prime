import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import Line from '../Chart/Line.svelte';
import * as library from '../index.ts';

const PACKAGE_ROOT = fileURLToPath(new URL('../../../', import.meta.url));

const PACKAGE_BUILD_TIMEOUT_MS = 60_000;
const COMPONENT_KEYS = new Set(Object.keys(Line));

const declarations = (directory: string): string[] =>
	readdirSync(directory, { withFileTypes: true, recursive: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith('.d.ts'))
		.map((entry) => join(entry.parentPath, entry.name));

describe('public API', () => {
	it('exports only the Chart compound and its parts', () => {
		expect(Object.keys(library)).toEqual(['Chart']);
		expect(Object.keys(library.Chart).filter((key) => !COMPONENT_KEYS.has(key))).toEqual([
			'Line',
			'XAxis',
			'YAxis',
			'Grid',
			'Tooltip',
			'Legend'
		]);
	});

	it(
		'names no LayerCake type in the published declarations',
		{ timeout: PACKAGE_BUILD_TIMEOUT_MS },
		() => {
			const output = mkdtempSync(join(tmpdir(), 'prime-charts-declarations-'));
			try {
				execFileSync(
					join(PACKAGE_ROOT, 'node_modules/.bin/svelte-package'),
					['--input', 'src/lib', '--output', output, '--tsconfig', 'tsconfig.package.json'],
					{ cwd: PACKAGE_ROOT, stdio: 'pipe' }
				);
				const files = declarations(output);
				expect(files.map((file) => file.slice(output.length + 1)).sort()).toContain(
					'Chart/Chart.svelte.d.ts'
				);
				const leaks = files.filter((file) => /layercake/i.test(readFileSync(file, 'utf8')));
				expect(leaks).toEqual([]);
			} finally {
				rmSync(output, { recursive: true, force: true });
			}
		}
	);
});
