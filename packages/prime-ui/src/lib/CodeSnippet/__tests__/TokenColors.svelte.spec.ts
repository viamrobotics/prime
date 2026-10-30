import Prism from 'prismjs';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { colorOf, textColor } from '../../__tests__/computed-style.ts';
import CodeSnippet from '../CodeSnippet.svelte';
import '../highlight.ts';
import { codeSnippetLanguages } from '../language.ts';

const TOKEN_GROUPS = {
	'text-code-boolean': ['boolean'],
	'text-code-comment': ['comment', 'prolog', 'doctype', 'cdata', 'shebang', 'hashbang'],
	'text-code-function': [
		'function',
		'function-name',
		'function-definition',
		'macro',
		'decorator',
		'annotation'
	],
	'text-code-keyword': ['keyword', 'atrule', 'important'],
	'text-code-null': ['null'],
	'text-code-number': ['number', 'constant', 'symbol'],
	'text-code-property-keys': ['property', 'attr-name', 'tag', 'selector'],
	'text-code-string': [
		'string',
		'char',
		'template-string',
		'triple-quoted-string',
		'string-literal',
		'attr-value',
		'regex',
		'url'
	],
	'text-code-type': [
		'builtin',
		'class-name',
		'type-definition',
		'generic',
		'namespace',
		'lifetime-annotation'
	]
} as const;

const PLAIN_TOKEN_CLASSES = [
	'operator',
	'punctuation',
	'variable',
	'parameter',
	'interpolation',
	'interpolation-punctuation',
	'template-punctuation',
	'regex-delimiter',
	'regex-flags',
	'regex-source',
	'language-regex',
	'string-interpolation',
	'string-property',
	'literal-property',
	'function-variable',
	'generic-function',
	'generics',
	'expression',
	'metadata',
	'format-spec',
	'conversion-option',
	'entity',
	'environment',
	'file-descriptor',
	'for-or-select',
	'assign-left',
	'bash',
	'at',
	'attribute',
	'closure-params',
	'closure-punctuation',
	'fragment-specifier',
	'module-declaration'
];

const GRAMMAR_KEYS = new Set(['pattern', 'lookbehind', 'greedy', 'alias', 'inside', 'rest']);

const tokenClassesOf = (grammar: Prism.Grammar): Set<string> => {
	const names = new Set<string>();
	const seen = new Set<object>();
	const walk = (node: unknown) => {
		if (node === null || typeof node !== 'object' || seen.has(node)) return;
		seen.add(node);
		for (const [key, value] of Object.entries(node)) {
			if (key === 'rest') {
				walk(value);
				continue;
			}
			if (!GRAMMAR_KEYS.has(key)) names.add(key);
			for (const entry of Array.isArray(value) ? value : [value]) {
				if (entry instanceof RegExp || typeof entry !== 'object' || entry === null) continue;
				for (const alias of [entry.alias].flat()) if (typeof alias === 'string') names.add(alias);
				walk(entry.inside);
			}
		}
	};
	walk(grammar);
	return names;
};

const KNOWN_TOKEN_CLASSES = new Set([
	...Object.values(TOKEN_GROUPS).flat(),
	...PLAIN_TOKEN_CLASSES
]);

const colorOfTokenClass = (tokenClass: string): string => {
	const { container } = render(CodeSnippet, { props: { code: '', language: 'json' } });
	const code = container.querySelector('code')!;
	const span = document.createElement('span');
	span.className = `token ${tokenClass}`;
	span.textContent = 'x';
	code.append(span);
	return textColor(span);
};

describe('CodeSnippet token colors', () => {
	it.each(
		Object.entries(TOKEN_GROUPS).flatMap(([utility, classes]) =>
			classes.map((tokenClass) => ({ utility, tokenClass }))
		)
	)('paints .token.$tokenClass with the $utility token', ({ utility, tokenClass }) => {
		expect(colorOfTokenClass(tokenClass)).toBe(colorOf(utility, 'color'));
	});

	it.each(PLAIN_TOKEN_CLASSES.map((tokenClass) => ({ tokenClass })))(
		'leaves .token.$tokenClass in the text color',
		({ tokenClass }) => {
			const { container } = render(CodeSnippet, { props: { code: '', language: 'json' } });

			expect(colorOfTokenClass(tokenClass)).toBe(textColor(container.querySelector('pre')!));
		}
	);

	it.each(codeSnippetLanguages.map((language) => ({ language })))(
		'$language emits no token class the stylesheet has not decided on',
		({ language }) => {
			const undecided = [...tokenClassesOf(Prism.languages[language])].filter(
				(name) => !KNOWN_TOKEN_CLASSES.has(name)
			);

			expect(undecided, 'add each to a group or to the plain list').toEqual([]);
		}
	);
});
