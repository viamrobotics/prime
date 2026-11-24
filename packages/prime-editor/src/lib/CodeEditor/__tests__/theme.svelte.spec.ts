import '../../../../test/tailwind.css';
import '@viamrobotics/tailwind-config/dark';

import { javascript } from '@codemirror/lang-javascript';
import { codeFolding, foldEffect } from '@codemirror/language';
import { MergeView, unifiedMergeView } from '@codemirror/merge';
import { openSearchPanel, search, SearchQuery, setSearchQuery } from '@codemirror/search';
import { EditorState, type Extension } from '@codemirror/state';
import {
	drawSelection,
	EditorView,
	highlightActiveLine,
	highlightActiveLineGutter,
	lineNumbers,
	placeholder
} from '@codemirror/view';
import { afterEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { userEvent } from 'vitest/browser';

import { codeEditorTheme } from '../theme.ts';

const SOURCE = 'const answer = "forty-two"; // note\n';
const TRANSPARENT = 'rgba(0, 0, 0, 0)';
const COMPOSITE_TOLERANCE = 2;
const WORD_FILL_MIN_DIFFERENCE = 20;
const OPAQUE_RGB = {
	gray2: { light: [237, 238, 240], dark: [36, 36, 38] },
	successLine: { light: [224, 250, 227], dark: [28, 51, 32] },
	dangerLine: { light: [252, 236, 234], dark: [58, 33, 32] },
	searchMatch: { light: [254, 243, 224], dark: [58, 47, 26] },
	successWord: { light: [192.64, 243.14, 196.2], dark: [32.76, 76.06, 38.86] },
	dangerWord: { light: [251.86, 209.12, 208.8], dark: [85.58, 41.26, 41.38] }
} as const;
const UNCHANGED_LINES = 'one\ntwo\nthree\nfour\nfive\n';
const readonlyExtensions = [
	EditorState.readOnly.of(true),
	EditorView.contentAttributes.of({ tabindex: '0' })
];

let host: HTMLElement | undefined;
let mergeView: MergeView | undefined;
let editorView: EditorView | undefined;

afterEach(() => {
	mergeView?.destroy();
	editorView?.destroy();
	mergeView = undefined;
	editorView = undefined;
	host?.remove();
});

const mountHost = (scopeClass?: string) => {
	host?.remove();
	host = document.createElement('div');
	if (scopeClass) host.className = scopeClass;
	document.body.append(host);
	return host;
};

const mountEditor = (extensions: Extension[], doc = SOURCE, scopeClass?: string) => {
	editorView = new EditorView({
		doc,
		extensions: [codeEditorTheme, ...extensions],
		parent: mountHost(scopeClass)
	});
	return editorView.dom;
};

const mount = (scopeClass?: string) =>
	mountEditor([javascript(), lineNumbers()], SOURCE, scopeClass);

const mountWithActiveLine = (doc: string) =>
	mountEditor(
		[lineNumbers(), highlightActiveLine(), highlightActiveLineGutter(), placeholder('Empty')],
		doc
	);

const mountDisabledEmpty = () =>
	mountEditor(
		[placeholder('Empty'), EditorView.contentAttributes.of({ 'aria-disabled': 'true' })],
		''
	);

const mountSplitDiff = (scopeClass?: string) => {
	const extensions = [javascript(), drawSelection(), codeEditorTheme];
	mergeView = new MergeView({
		a: { doc: 'let value = 1;\nkeep\n', extensions },
		b: { doc: 'let value = 2;\nkeep\n', extensions },
		parent: mountHost(scopeClass)
	});
	return mergeView;
};

const mountUnifiedDiff = (scopeClass?: string) =>
	mountEditor(
		[
			javascript(),
			drawSelection(),
			unifiedMergeView({ original: 'head\nlet value = 1;\nkeep\n', mergeControls: false })
		],
		'head\nlet value = 2;\nkeep\n',
		scopeClass
	);

const mountInlineDiff = (scopeClass?: string) =>
	mountEditor(
		[
			drawSelection(),
			unifiedMergeView({
				original: 'let value = 1;\nkeep\n',
				mergeControls: false,
				allowInlineDiffs: true
			})
		],
		'let value = 2;\nkeep\n',
		scopeClass
	);

const mountSearchMatch = (scopeClass: string) => {
	const root = mountEditor([search()], SOURCE, scopeClass);
	const view = viewOf(root);
	openSearchPanel(view);
	view.dispatch({ effects: setSearchQuery.of(new SearchQuery({ search: 'answer' })) });
	return root;
};

const mountFolded = (scopeClass: string) => {
	const root = mountEditor([codeFolding()], SOURCE, scopeClass);
	editorView?.dispatch({ effects: foldEffect.of({ from: 6, to: 12 }) });
	return root;
};

const mountCollapsedDiff = (scopeClass: string) =>
	mountEditor(
		[
			unifiedMergeView({
				original: `${UNCHANGED_LINES}let value = 1;\n`,
				mergeControls: false,
				collapseUnchanged: { margin: 0, minSize: 2 }
			})
		],
		`${UNCHANGED_LINES}let value = 2;\n`,
		scopeClass
	);

const viewOf = (root: HTMLElement) => {
	const view = EditorView.findFromDOM(root);
	if (!view) throw new Error('no editor view on this root');
	return view;
};

const query = (root: Element, selector: string) => {
	const node = root.querySelector(selector);
	if (!node) throw new Error(`no node matches ${selector}`);
	return node;
};

const backgroundOf = (root: Element, selector: string) =>
	getComputedStyle(query(root, selector)).backgroundColor;

const resolveColor = (container: Element, variable: string) => {
	const probe = document.createElement('span');
	probe.style.color = `var(${variable})`;
	container.append(probe);
	const resolved = getComputedStyle(probe).color;
	probe.remove();
	return resolved;
};

const colorOfText = (root: Element, text: string) => {
	const span = [...root.querySelectorAll('.cm-line span')].find(
		(node) => node.textContent === text
	);
	if (!span) throw new Error(`no span with text ${text}`);
	return getComputedStyle(span).color;
};

const signOf = (line: Element) => getComputedStyle(line, '::before').content;

const parseColor = (value: string) => {
	const channels = (value.match(/[\d.]+/g) ?? []).map(Number);
	const scale = value.startsWith('color(srgb') ? 255 : 1;
	const [red = 0, green = 0, blue = 0, alpha = 1] = channels;
	return { rgb: [red * scale, green * scale, blue * scale], alpha };
};

const compositeOverSurface = (root: Element, selectors: readonly string[]) =>
	selectors.reduce(
		(below, selector) => {
			const fill = parseColor(backgroundOf(root, selector));
			return fill.rgb.map(
				(channel, index) => channel * fill.alpha + below[index] * (1 - fill.alpha)
			);
		},
		parseColor(getComputedStyle(root).backgroundColor).rgb
	);

const maxChannelDifference = (actual: number[], expected: readonly number[]) =>
	Math.max(...actual.map((channel, index) => Math.abs(channel - expected[index])));

const expectCompositeNear = (composite: number[], expected: readonly number[]) =>
	expect(
		maxChannelDifference(composite, expected),
		`composite ${composite.join(', ')} strays from ${expected.join(', ')}`
	).toBeLessThanOrEqual(COMPOSITE_TOLERANCE);

const selectionBoxesAfterSelecting = async (root: HTMLElement, anchor: number, head: number) => {
	viewOf(root).dispatch({ selection: { anchor, head } });
	await vi.waitFor(() => query(root, '.cm-selectionBackground'));
	return [...root.querySelectorAll('.cm-selectionBackground')];
};

const overlaps = (first: DOMRect, second: DOMRect) =>
	first.left < second.right &&
	second.left < first.right &&
	first.top < second.bottom &&
	second.top < first.bottom;

describe('codeEditorTheme', () => {
	describe('syntax colors', () => {
		it.each([
			['const', '--color-code-keyword'],
			['"forty-two"', '--color-code-string'],
			['// note', '--color-code-comment']
		])('paints %s with %s', (text, variable) => {
			const root = mount();
			const expected = resolveColor(root, variable);

			expect(colorOfText(root, text)).toBe(expected);
			expect(expected).not.toBe(getComputedStyle(root).color);
		});

		it('flips the keyword color under a dark ancestor', () => {
			const light = colorOfText(mount(), 'const');
			const root = mount('dark');

			const dark = colorOfText(root, 'const');

			expect(dark).toBe(resolveColor(root, '--dark-color-code-keyword'));
			expect(dark).not.toBe(light);
		});
	});

	describe('gutter', () => {
		it('paints the line numbers with the line number token', () => {
			const root = mount();

			const gutterNumber = query(
				root,
				'.cm-lineNumbers .cm-gutterElement:not([style*="visibility"])'
			);

			expect(getComputedStyle(gutterNumber).color).toBe(
				resolveColor(root, '--color-code-line-number')
			);
		});

		it('paints the gutter band on the cursor line of a document with text', () => {
			const root = mountWithActiveLine(SOURCE);

			expect(backgroundOf(root, '.cm-activeLineGutter')).toBe(resolveColor(root, '--color-gray-2'));
		});

		it.each(['.cm-activeLine', '.cm-activeLineGutter'])(
			'paints no %s band behind the placeholder of an empty document',
			(selector) => {
				const root = mountWithActiveLine('');

				expect(backgroundOf(root, selector)).toBe(TRANSPARENT);
			}
		);
	});

	describe('line bands', () => {
		it.each([
			['.cm-activeLine', 'light', () => mountEditor([highlightActiveLine()], SOURCE, 'light')],
			['.cm-activeLine', 'dark', () => mountEditor([highlightActiveLine()], SOURCE, 'dark')],
			['.cm-foldPlaceholder', 'light', () => mountFolded('light')],
			['.cm-foldPlaceholder', 'dark', () => mountFolded('dark')],
			['.cm-collapsedLines', 'light', () => mountCollapsedDiff('light')],
			['.cm-collapsedLines', 'dark', () => mountCollapsedDiff('dark')]
		] as const)('composites %s over the %s surface to gray-2', (selector, theme, mountBand) => {
			const root = mountBand();

			const composite = compositeOverSurface(root, [selector]);

			expectCompositeNear(composite, OPAQUE_RGB.gray2[theme]);
		});

		it('lets a selection inside the cursor line show through its band', async () => {
			const root = mountEditor([highlightActiveLine(), drawSelection()]);
			editorView?.dispatch({ selection: { anchor: 0, head: 5 } });
			const selection = await vi.waitFor(() => query(root, '.cm-selectionBackground'));

			const activeLine = query(root, '.cm-activeLine');

			expect(parseColor(getComputedStyle(activeLine).backgroundColor).alpha).toBeLessThan(1);
			expect(
				overlaps(selection.getBoundingClientRect(), activeLine.getBoundingClientRect()),
				'the selection box sits outside the cursor line'
			).toBe(true);
		});
	});

	describe('search', () => {
		it.each(['light', 'dark'] as const)(
			'composites a search match over the %s surface to the warning surface',
			(theme) => {
				const root = mountSearchMatch(theme);

				const composite = compositeOverSurface(root, ['.cm-searchMatch']);

				expectCompositeNear(composite, OPAQUE_RGB.searchMatch[theme]);
			}
		);
	});

	describe('selection on a diff fill', () => {
		it.each([
			['the deleted side of a split diff', () => mountSplitDiff().a.dom, '.cm-changedLine', 0, 5],
			['the inserted side of a split diff', () => mountSplitDiff().b.dom, '.cm-changedLine', 0, 5],
			['a unified deleted chunk', () => mountUnifiedDiff(), '.cm-deletedChunk', 2, 8],
			['a unified inserted line', () => mountUnifiedDiff(), '.cm-changedLine', 5, 10],
			['an inline changed line', () => mountInlineDiff(), '.cm-inlineChangedLine', 0, 5]
		] as const)('shows through %s', async (_label, mountDiff, selector, anchor, head) => {
			const root = mountDiff();
			const boxes = await selectionBoxesAfterSelecting(root, anchor, head);

			const fill = query(root, selector);

			expect(parseColor(getComputedStyle(fill).backgroundColor).alpha).toBeLessThan(1);
			expect(
				boxes.some((box) => overlaps(box.getBoundingClientRect(), fill.getBoundingClientRect())),
				`no selection box overlaps ${selector}`
			).toBe(true);
		});
	});

	describe('frame', () => {
		it('rounds the corners with the small radius and clips the square gutter and scroller to them', () => {
			const style = getComputedStyle(mount());

			expect(style.borderTopLeftRadius).toBe('4px');
			expect(style.overflow).toBe('hidden');
		});

		it('indents each line by two spacing units', () => {
			const root = mount();

			expect(getComputedStyle(query(root, '.cm-line')).paddingLeft).toBe('8px');
		});

		it('draws no outline after a pointer click into a readonly editor', async () => {
			const root = mountEditor(readonlyExtensions);

			await userEvent.click(query(root, '.cm-content'));

			await vi.waitFor(() => expect(root.classList).toContain('cm-focused'));
			expect(getComputedStyle(root).outlineStyle).toBe('none');
		});

		it('draws a 2px link-colored outline after keyboard focus', async () => {
			const root = mount();
			const before = document.createElement('button');
			document.body.prepend(before);
			onTestFinished(() => before.remove());
			before.focus();

			await userEvent.keyboard('{Tab}');

			await vi.waitFor(() => expect(root.classList).toContain('cm-focused'));
			const style = getComputedStyle(root);
			expect(style.outlineColor).toBe('rgb(0, 102, 204)');
			expect(style.outlineWidth).toBe('2px');
		});
	});

	describe('invalid state', () => {
		it('keeps the neutral border without aria-invalid', () => {
			const root = mountEditor([]);

			expect(getComputedStyle(root).borderTopColor).toBe(resolveColor(root, '--color-gray-3'));
		});

		it('paints the danger border while the content is aria-invalid', () => {
			const root = mountEditor([EditorView.contentAttributes.of({ 'aria-invalid': 'true' })]);

			expect(getComputedStyle(root).borderTopColor).toBe(resolveColor(root, '--color-danger-dark'));
		});
	});

	describe('readonly state', () => {
		it('drops the border of a readonly editor', () => {
			const root = mountEditor(readonlyExtensions);

			expect(getComputedStyle(root).borderTopWidth).toBe('0px');
		});

		it('keeps the transparent 1px border when a readonly editor is also disabled', () => {
			const root = mountEditor([
				...readonlyExtensions,
				EditorView.contentAttributes.of({ 'aria-disabled': 'true' })
			]);
			const style = getComputedStyle(root);

			expect(style.borderTopWidth).toBe('1px');
			expect(style.borderTopColor).toBe(TRANSPARENT);
		});
	});

	describe('disabled state', () => {
		it('dims the text and surface of a disabled editor', () => {
			const root = mountDisabledEmpty();
			const style = getComputedStyle(root);

			expect(style.color).toBe(resolveColor(root, '--color-disabled-dark'));
			expect(style.backgroundColor).toBe(resolveColor(root, '--color-disabled-light'));
		});

		it('drops the border and shows the not-allowed cursor on a disabled editor', () => {
			const style = getComputedStyle(mountDisabledEmpty());

			expect(style.borderTopColor).toBe(TRANSPARENT);
			expect(style.cursor).toBe('not-allowed');
		});

		it('blocks text selection in a disabled editor', () => {
			const root = mountDisabledEmpty();

			expect(getComputedStyle(query(root, '.cm-content')).userSelect).toBe('none');
		});

		it('leaves the surface and cursor alone without aria-disabled', () => {
			const root = mountEditor([]);
			const style = getComputedStyle(root);

			expect(style.backgroundColor).toBe(resolveColor(root, '--color-gray-1'));
			expect(style.cursor).not.toBe('not-allowed');
		});
	});

	describe('placeholder', () => {
		it('paints the placeholder with the subtle token', () => {
			const root = mountEditor([placeholder('Empty')], '');

			expect(getComputedStyle(query(root, '.cm-placeholder')).color).toBe(
				resolveColor(root, '--color-subtle-2')
			);
		});
	});

	describe('split diff', () => {
		it.each([
			['a', 'light', OPAQUE_RGB.dangerLine.light],
			['a', 'dark', OPAQUE_RGB.dangerLine.dark],
			['b', 'light', OPAQUE_RGB.successLine.light],
			['b', 'dark', OPAQUE_RGB.successLine.dark]
		] as const)(
			'composites the changed line on side %s over the %s surface to its tint',
			(side, theme, expected) => {
				const view = mountSplitDiff(theme);

				const composite = compositeOverSurface(view[side].dom, ['.cm-changedLine']);

				expectCompositeNear(composite, expected);
			}
		);

		it.each([
			['a', 'light', OPAQUE_RGB.dangerWord.light],
			['a', 'dark', OPAQUE_RGB.dangerWord.dark],
			['b', 'light', OPAQUE_RGB.successWord.light],
			['b', 'dark', OPAQUE_RGB.successWord.dark]
		] as const)(
			'composites the changed word on side %s over its %s line to a stronger tint',
			(side, theme, expected) => {
				const view = mountSplitDiff(theme);

				const composite = compositeOverSurface(view[side].dom, [
					'.cm-changedLine',
					'.cm-changedText'
				]);

				expectCompositeNear(composite, expected);
			}
		);

		it.each([
			['a', 'light'],
			['a', 'dark'],
			['b', 'light'],
			['b', 'dark']
		] as const)('keeps the changed word on side %s visible on its %s line', (side, theme) => {
			const root = mountSplitDiff(theme)[side].dom;
			const line = compositeOverSurface(root, ['.cm-changedLine']);

			const word = compositeOverSurface(root, ['.cm-changedLine', '.cm-changedText']);

			expect(maxChannelDifference(word, line)).toBeGreaterThanOrEqual(WORD_FILL_MIN_DIFFERENCE);
		});

		it.each([
			['a', '"-"'],
			['b', '"+"']
		] as const)('marks the changed line on side %s with the sign %s', (side, sign) => {
			const view = mountSplitDiff();

			expect(signOf(query(view[side].dom, '.cm-changedLine'))).toBe(sign);
		});

		it('draws no sign before an unchanged line', () => {
			const view = mountSplitDiff();

			expect(signOf(query(view.b.dom, '.cm-line:not(.cm-changedLine)'))).toBe('none');
		});

		it('indents changed and unchanged lines equally so the code stays aligned', () => {
			const view = mountSplitDiff();
			const changed = getComputedStyle(query(view.b.dom, '.cm-changedLine')).paddingLeft;

			const unchanged = getComputedStyle(
				query(view.b.dom, '.cm-line:not(.cm-changedLine)')
			).paddingLeft;

			expect(unchanged).toBe(changed);
			expect(Number.parseFloat(changed)).toBeGreaterThan(8);
		});
	});

	describe('unified diff', () => {
		it.each([
			[
				'an inserted line',
				'light',
				() => mountUnifiedDiff('light'),
				'.cm-changedLine',
				OPAQUE_RGB.successLine.light
			],
			[
				'an inserted line',
				'dark',
				() => mountUnifiedDiff('dark'),
				'.cm-changedLine',
				OPAQUE_RGB.successLine.dark
			],
			[
				'a deleted chunk',
				'light',
				() => mountUnifiedDiff('light'),
				'.cm-deletedChunk',
				OPAQUE_RGB.dangerLine.light
			],
			[
				'a deleted chunk',
				'dark',
				() => mountUnifiedDiff('dark'),
				'.cm-deletedChunk',
				OPAQUE_RGB.dangerLine.dark
			],
			[
				'an inline changed line',
				'light',
				() => mountInlineDiff('light'),
				'.cm-inlineChangedLine',
				OPAQUE_RGB.successLine.light
			],
			[
				'an inline changed line',
				'dark',
				() => mountInlineDiff('dark'),
				'.cm-inlineChangedLine',
				OPAQUE_RGB.successLine.dark
			]
		] as const)(
			'composites %s over the %s surface to its tint',
			(_label, _theme, mountDiff, selector, expected) => {
				const root = mountDiff();

				const composite = compositeOverSurface(root, [selector]);

				expectCompositeNear(composite, expected);
			}
		);

		it.each([
			[
				'light',
				['.cm-deletedChunk', '.cm-deletedChunk .cm-deletedText'],
				OPAQUE_RGB.dangerWord.light
			],
			[
				'dark',
				['.cm-deletedChunk', '.cm-deletedChunk .cm-deletedText'],
				OPAQUE_RGB.dangerWord.dark
			],
			['light', ['.cm-changedLine', '.cm-changedText'], OPAQUE_RGB.successWord.light],
			['dark', ['.cm-changedLine', '.cm-changedText'], OPAQUE_RGB.successWord.dark]
		] as const)(
			'composites the %s word fill stack %j to a stronger tint',
			(theme, selectors, expected) => {
				const root = mountUnifiedDiff(theme);

				const composite = compositeOverSurface(root, selectors);

				expectCompositeNear(composite, expected);
			}
		);

		it.each(['.cm-deletedChunk .cm-deletedText', '.cm-changedText'])(
			'draws no strike or underline on %s',
			(selector) => {
				const root = mountUnifiedDiff();

				expect(getComputedStyle(query(root, selector)).textDecorationLine).toBe('none');
			}
		);

		it('marks an inserted line with + and a deleted line with -', () => {
			const root = mountUnifiedDiff();

			expect(signOf(query(root, '.cm-changedLine'))).toBe('"+"');
			expect(signOf(query(root, '.cm-deletedChunk .cm-deletedLine'))).toBe('"-"');
		});
	});
});
