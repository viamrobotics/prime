import { locators } from 'vitest/browser';
import type { Locator } from 'vitest/browser';

const panesQueries = {
	getByPane: (id: string) => `css=[tabindex="-1"]:has([data-pane-id="${id}"])`,
	getByPaneContent: (id: string) => `css=[data-pane-id="${id}"]`,
	getByRootStatus: (rootTestId: string) => `css=[data-testid="${rootTestId}"] > [role="status"]`,
	getByPaneHeader: (label: string) => `css=[data-header="${label}"]`,
	getByPaneState: (id: string) => `css=[data-state-of="${id}"]`,
	getByPaneBody: (id: string) => `css=[data-pane-body="${id}"]`,
	getByStackPane: (id: string) => `css=[data-stack-pane="${id}"]`,
	getByFloat: (id: string) => `css=[data-float="${id}"]`,
	getByFloatEntry: (id: string) => `css=[data-float-entry="${id}"]`,
	getByFloatResize: (entryId: string, axis: string) =>
		`css=[data-float-entry="${entryId}"] > [data-float-resize="${axis}"]`,
	getByDraggingPanes: () => 'css=[data-dragging]',
	getByPanesInMoveMode: () => 'css=[data-move-mode]',
	getByDragGhost: () => 'css=[data-drag-ghost]',
	getByDropIndicator: () => 'css=[data-drop-indicator]',
	getByDropOverlay: () => 'css=[data-drop-overlay]',
	getByDragArmedPane: () => 'css=[data-drag-armed]',
	getByTabPreview: () => 'css=[data-tab-preview]',
	getByTabListDropRegion: () => 'css=[data-tab-list-drop-region]',
	getByTabSlot: () => 'css=[role="tab"], [data-tab-preview]',
	getByMovePreview: () => 'css=[data-move-preview]',
	getByMovingPane: () => 'css=[data-moving]',
	getByMovingNotice: () => 'css=[data-moving-notice]',
	getByMovingWash: () => 'css=[data-moving-wash]',
	getByMoveBar: (region: string) => `css=[data-move-button="${region}"] > span:first-child`
};

locators.extend(panesQueries);

type PanesQueries = {
	[Name in keyof typeof panesQueries]: (
		...args: Parameters<(typeof panesQueries)[Name]>
	) => Locator;
};

declare module 'vitest/browser' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- augmentation merges into an interface, which a type alias cannot do
	interface LocatorSelectors extends PanesQueries {}
}
