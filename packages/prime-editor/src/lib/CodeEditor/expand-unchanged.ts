import { type Chunk, getChunks, mergeViewSiblings, uncollapseUnchanged } from '@codemirror/merge';
import { type Command, EditorView } from '@codemirror/view';

// The `type` getter `@codemirror/merge` gives its collapsed-lines widget, the only public mark on it.
const COLLAPSED_WIDGET_TYPE = 'collapsed-unchanged-code';

function isCollapsedWidget(widget: unknown): boolean {
	return (
		typeof widget === 'object' &&
		widget !== null &&
		'type' in widget &&
		widget.type === COLLAPSED_WIDGET_TYPE
	);
}

// A collapsed block holds no cursor, so the region at the cursor is the one touching its line.
function collapsedRegionStartAtCursor(view: EditorView): number | undefined {
	const { doc, selection } = view.state;
	const line = doc.lineAt(selection.main.head);
	const from = Math.max(0, line.from - 1);
	const to = Math.min(doc.length, line.to + 1);
	for (const source of view.state.facet(EditorView.decorations)) {
		const decorations = typeof source === 'function' ? source(view) : source;
		for (const range = decorations.iter(from); range.value && range.from <= to; range.next()) {
			if (isCollapsedWidget(range.value.spec.widget)) return range.from;
		}
	}
	return undefined;
}

// Mirrors the merge view's own mapping from a position on one side to the other.
function mapToSibling(position: number, chunks: readonly Chunk[], isSideA: boolean): number {
	let startOurs = 0;
	let startOther = 0;
	for (const chunk of chunks) {
		if ((isSideA ? chunk.fromA : chunk.fromB) >= position) break;
		[startOurs, startOther] = isSideA ? [chunk.toA, chunk.toB] : [chunk.toB, chunk.toA];
	}
	return startOther + (position - startOurs);
}

/**
 * Expands the collapsed run of unchanged lines next to the cursor, on both sides of a split
 * diff. Returns `false` when no collapsed run touches the cursor's line, so a later binding on
 * the same key runs.
 */
export const expandUnchanged: Command = (view) => {
	const start = collapsedRegionStartAtCursor(view);
	if (start === undefined) return false;
	view.dispatch({ effects: uncollapseUnchanged.of(start) });
	const siblings = mergeViewSiblings(view);
	const chunks = getChunks(view.state)?.chunks;
	if (!siblings || !chunks) return true;
	const isSideA = siblings.a === view;
	const sibling = isSideA ? siblings.b : siblings.a;
	sibling.dispatch({ effects: uncollapseUnchanged.of(mapToSibling(start, chunks, isSideA)) });
	return true;
};
