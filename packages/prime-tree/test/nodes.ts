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
	getValue: (node: SampleNode) => node.id,
	getLabel: (node: SampleNode) => node.label,
	getChildren: (node: SampleNode) => node.children,
	getChildCount: (node: SampleNode) =>
		node.id === 'empty' ? 0 : (node.children?.length ?? undefined),
	isDisabled: (node: SampleNode) => node.disabled ?? false
};

export const lockedFolderNodes: SampleNode[] = [
	{
		id: 'archive',
		label: 'Archive',
		disabled: true,
		children: [{ id: 'old', label: 'Old' }]
	},
	{ id: 'notes', label: 'Notes' }
];
