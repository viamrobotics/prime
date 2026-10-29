export interface SampleNode {
	id: string;
	label: string;
	children?: SampleNode[];
	disabled?: boolean;
}

export const sampleNodes: SampleNode[] = [
	{
		id: 'docs',
		label: 'Docs',
		children: [
			{ id: 'readme', label: 'Readme' },
			{
				id: 'guides',
				label: 'Guides',
				children: [
					{ id: 'intro', label: 'Intro' },
					{ id: 'advanced', label: 'Advanced' }
				]
			}
		]
	},
	{ id: 'empty', label: 'Empty', children: [] },
	{ id: 'locked', label: 'Locked', disabled: true },
	{ id: 'notes', label: 'Notes' }
];

export const sampleAccessors = {
	nodeToValue: (node: SampleNode) => node.id,
	nodeToString: (node: SampleNode) => node.label,
	nodeToChildren: (node: SampleNode) => node.children,
	nodeToChildrenCount: (node: SampleNode) =>
		node.id === 'empty' ? 0 : (node.children?.length ?? undefined),
	isNodeDisabled: (node: SampleNode) => node.disabled ?? false
};
