import type { FloatNode, LayoutNode } from '../layout.ts';
import type { ContainerAdapter } from '../node-kind.ts';

// A float node's children list its base first, when it has one, and then its entries' contents.
export function floatChildIndex<TData>(float: FloatNode<TData>, entryIndex: number): number {
	return (float.base ? 1 : 0) + entryIndex;
}

export const floatAdapter: ContainerAdapter<'float'> = {
	children: (float) => [
		...(float.base ? [float.base] : []),
		...float.floats.map((entry) => entry.content)
	],
	withChildren<TData>(float: FloatNode<TData>, children: readonly LayoutNode<TData>[]) {
		const base = float.base ? children[0] : undefined;
		const contents = children.slice(floatChildIndex(float, 0));
		const isUnchanged =
			base === float.base &&
			contents.every((content, index) => content === float.floats[index]?.content);
		if (isUnchanged) return float;

		const floats = float.floats.map((entry, index) => {
			const content = contents[index]!;
			return content === entry.content ? entry : { ...entry, content };
		});
		return { ...float, base, floats };
	},
	// A leaving base leaves the windows over an empty box. An emptied entry is dropped, and a float
	// node with no entries left collapses to its base.
	removeChild(float, index) {
		if (float.base && index === 0) {
			if (float.floats.length === 0) return undefined;
			return { ...float, base: undefined };
		}

		const entryIndex = index - floatChildIndex(float, 0);
		const floats = float.floats.toSpliced(entryIndex, 1);
		if (floats.length === 0) return float.base;
		return { ...float, floats };
	}
};
