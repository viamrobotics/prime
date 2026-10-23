import type { DropRegion, EdgeRegion } from '../drop-region.ts';

const EDGE_PHRASE_BY_REGION = {
	left: 'left of',
	right: 'right of',
	top: 'above',
	bottom: 'below'
} as const satisfies Record<EdgeRegion, string>;

export const CANCELED_MESSAGE = 'Move canceled.';

export const movingNotice = (moving: string) =>
	`Moving ${moving}. Choose a destination with the pointer or arrow keys, or press Escape.`;

export const startedMessage = (moving: string) =>
	`${movingNotice(moving)} The arrow keys move between sides and panes, Tab moves between destinations, Enter places the pane, and Escape cancels.`;

export const rejectedMessage = (moving: string) => `${moving} was not moved.`;

export const destinationName = (moving: string, target: string) => `Move ${moving} to ${target}`;

export function targetName(region: DropRegion, moving: string, target: string): string {
	if (region === 'center') {
		return `Swap ${moving} with ${target}`;
	}
	return `Place ${moving} ${EDGE_PHRASE_BY_REGION[region]} ${target}`;
}

export function placedMessage(region: DropRegion, moving: string, target: string): string {
	if (region === 'center') {
		return `${moving} swapped with ${target}.`;
	}
	return `${moving} placed ${EDGE_PHRASE_BY_REGION[region]} ${target}.`;
}
