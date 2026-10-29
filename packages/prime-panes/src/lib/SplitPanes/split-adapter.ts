import type { LayoutNode, SplitNode } from '../layout.ts';
import type { ContainerAdapter } from '../node-kind.ts';

export const splitAdapter: ContainerAdapter<'split'> = {
	children: (split) => [split.first, split.second],
	withChildren<TData>(split: SplitNode<TData>, [first, second]: readonly LayoutNode<TData>[]) {
		if (first === split.first && second === split.second) return split;
		return { ...split, first: first!, second: second! };
	},
	removeChild: (split, index) => (index === 0 ? split.second : split.first)
};
