<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { on } from 'svelte/events';

	import { classifyPress, HOLD_TO_DRAG_MS } from './classify-press.ts';
	import { usePane } from './useSplitView.svelte.ts';

	interface Props {
		/**
		 * The elements that start a drag of the pane. A press on a plain area drags at once. A press on
		 * a control drags only after a hold, and a press on a text field never drags.
		 */
		children: Snippet;
	}

	const { children }: Props = $props();

	const pane = usePane();

	const watchPresses: Attachment<HTMLElement> = (trigger) => {
		let holdTimer: ReturnType<typeof setTimeout> | undefined;
		let stopWatchingRelease: (() => void) | undefined;
		let stopSwallowingClick: (() => void) | undefined;
		let isPressing = false;
		let hasHoldArmedDrag = false;

		function armAfterHold() {
			pane.armDrag();
			hasHoldArmedDrag = pane.isDragArmed;
		}

		function swallowNextClick() {
			stopSwallowingClick?.();
			const stopClick = on(
				trigger,
				'click',
				(event) => {
					event.preventDefault();
					event.stopPropagation();
				},
				{ capture: true, once: true }
			);
			// The click follows the release in the same task. A release that makes no click must not swallow a later keyboard click.
			const expiry = setTimeout(stopClick);
			stopSwallowingClick = () => {
				clearTimeout(expiry);
				stopClick();
			};
		}

		function releasePress() {
			isPressing = false;
			clearTimeout(holdTimer);
			pane.disarmDrag();
			if (hasHoldArmedDrag) swallowNextClick();
			hasHoldArmedDrag = false;
		}

		function cancelPress() {
			if (!isPressing) return;

			isPressing = false;
			clearTimeout(holdTimer);
			hasHoldArmedDrag = false;
			// A native drag that started takes the pointer over and cancels the press, so it stays armed until dragend.
			if (!pane.isDragArmed) pane.disarmDrag();
		}

		// A press released off the trigger never reaches it, which would leave the pane draggable.
		// Capture sees the release even when a handler in between stops propagation.
		function watchRelease() {
			const stopPointerup = on(window, 'pointerup', releasePress, { once: true, capture: true });
			const stopPointercancel = on(window, 'pointercancel', cancelPress, {
				once: true,
				capture: true
			});

			return () => {
				stopPointerup();
				stopPointercancel();
			};
		}

		const stopListening = on(trigger, 'pointerdown', (event) => {
			const press = classifyPress(event, trigger);
			if (press === 'ignored') return;

			clearTimeout(holdTimer);
			stopWatchingRelease?.();
			stopWatchingRelease = watchRelease();
			isPressing = true;
			hasHoldArmedDrag = false;

			if (press === 'immediate') {
				pane.armDrag();
			} else {
				// Chromium picks the drag source on the first mouse move and gives up on the press if none is draggable, so the pane is draggable now and dragstart is vetoed until the hold ends.
				pane.holdDrag();
				holdTimer = setTimeout(armAfterHold, HOLD_TO_DRAG_MS);
			}
		});

		return () => {
			stopListening();
			stopWatchingRelease?.();
			stopSwallowingClick?.();
			clearTimeout(holdTimer);
			if (isPressing) pane.disarmDrag();
		};
	};
</script>

<div style:display="contents" {@attach watchPresses}>
	{@render children()}
</div>
