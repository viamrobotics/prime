import type { SplitViewContext } from '../useSplitView.svelte.ts';

/** Filled by `UpdateProbePane` with the `update` from the enclosing `SplitView`'s context. */
export interface UpdateProbe {
	update?: SplitViewContext<unknown>['update'];
}
