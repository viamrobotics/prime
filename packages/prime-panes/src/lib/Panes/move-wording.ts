import type { DropRegion, EdgeRegion } from '../drop-region.ts';

const EDGE_PHRASE_BY_REGION = {
	left: 'left of',
	right: 'right of',
	top: 'above',
	bottom: 'below'
} as const satisfies Record<EdgeRegion, string>;

// `position` counts from one.
export interface TabPosition {
	position: number;
	total: number;
}

const DOCK_PHRASE_BY_REGION = {
	...EDGE_PHRASE_BY_REGION,
	center: 'swapped with',
	stack: 'stacked with'
} as const satisfies Record<DropRegion, string>;

const LABEL_LIST_FORMAT = new Intl.ListFormat('en', { type: 'conjunction' });

export const CANCELED_MESSAGE = 'Move canceled.';

export const joinLabels = (labels: readonly string[]) => LABEL_LIST_FORMAT.format(labels);

export const movingNotice = (moving: string) =>
	`Moving ${moving}. Choose a destination with the pointer or arrow keys, or press Escape.`;

export const startedMessage = (moving: string) =>
	`${movingNotice(moving)} The arrow keys move between sides and panes, Tab moves between destinations, Enter places the pane, and Escape cancels.`;

export const MISSING_MOVE_TRIGGER_WARNING = {
	pane: (label) =>
		`Panes: a drag started in pane "${label}", which has no Panes.MoveTrigger. Dragging alone fails WCAG 2.5.7 (Dragging Movements), so render a Panes.MoveTrigger in the pane to move it without dragging. A Panes.MoveTrigger that mounts only on demand, such as inside a menu, still triggers this warning until it first mounts.`,
	stack: (label) =>
		`Panes: a stack drag started in pane "${label}", which has no Panes.MoveTrigger with target="stack". Dragging alone fails WCAG 2.5.7 (Dragging Movements), so render a Panes.MoveTrigger with target="stack" in the pane to move its stack without dragging. A Panes.MoveTrigger that mounts only on demand, such as inside a menu, still triggers this warning until it first mounts.`,
	float: (label) =>
		`Panes: a window drag started in pane "${label}", which has no Panes.MoveTrigger with target="float". Dragging alone fails WCAG 2.5.7 (Dragging Movements), so render a Panes.MoveTrigger with target="float" in the pane to dock its window without dragging, and controls that call setFloatRect to move or resize it. A Panes.MoveTrigger that mounts only on demand, such as inside a menu, still triggers this warning until it first mounts.`
} as const satisfies Record<'pane' | 'stack' | 'float', (label: string) => string>;

export const rejectedMessage = (moving: string) => `${moving} was not moved.`;

export const floatName = (moving: string) => `Float ${moving}`;

export const floatedMessage = (moving: string) => `Floated ${moving}.`;

export const destinationName = (moving: string, target: string) => `Move ${moving} to ${target}`;

const positionPhrase = ({ position, total }: TabPosition) => `position ${position} of ${total}`;

export const reorderName = (moving: string, tabPosition: TabPosition) =>
	`Move ${moving} to ${positionPhrase(tabPosition)}`;

export const reorderedMessage = (moving: string, tabPosition: TabPosition) =>
	`${moving} moved to ${positionPhrase(tabPosition)}.`;

export function targetName(
	region: DropRegion,
	moving: string,
	target: string,
	tabPosition?: TabPosition
): string {
	if (region === 'center') {
		return `Swap ${moving} with ${target}`;
	}
	if (region === 'stack') {
		const stackName = `Stack ${moving} with ${target}`;
		return tabPosition ? `${stackName} at ${positionPhrase(tabPosition)}` : stackName;
	}
	return `Place ${moving} ${EDGE_PHRASE_BY_REGION[region]} ${target}`;
}

export function placedMessage(region: DropRegion, moving: string, target: string): string {
	if (region === 'center') {
		return `${moving} swapped with ${target}.`;
	}
	if (region === 'stack') {
		return `${moving} stacked with ${target}.`;
	}
	return `${moving} placed ${EDGE_PHRASE_BY_REGION[region]} ${target}.`;
}

export const dockedMessage = (region: DropRegion, moving: string, target: string) =>
	`Docked ${moving} ${DOCK_PHRASE_BY_REGION[region]} ${target}.`;
