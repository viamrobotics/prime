<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createAttachmentKey } from 'svelte/attachments';
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { on } from 'svelte/events';

	import { markAsGrip } from './classify-press.ts';
	import { usePane } from './usePanes.svelte.ts';
	import type { DragSource } from './usePanes.svelte.ts';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		/** The default button's content. */
		children?: Snippet;

		/**
		 * Replaces the default button with your own element, such as a menu item. Spread `props` on it.
		 * Use a `button`, an element with `role="button"`, or a menu item whose menu dispatches `click`.
		 */
		child?: Snippet<[{ props: Record<string, unknown> }]>;

		/**
		 * What the move relocates. `'pane'` moves this pane alone, leaving its stack. `'stack'` moves the
		 * pane's whole stack, and acts as `'pane'` on a pane that is not stacked. `'float'` moves what
		 * the floating window holds, which is its pane or stack, or this pane alone when the window
		 * holds a split. It acts as `'pane'` on a pane outside a float.
		 */
		target?: DragSource['type'];
	}

	const { children, child, target = 'pane', ...rest }: Props = $props();

	const pane = usePane();

	function toggleMove() {
		pane.toggleMove(pane.sourceFor(target));
	}

	function toggleMoveWithKeyboard(trigger: HTMLElement) {
		// preventDefault stops Space scrolling the page. On Enter it keeps a link from also clicking.
		const stopKeydown = on(trigger, 'keydown', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				if (!event.repeat) toggleMove();
			} else if (event.key === ' ') {
				event.preventDefault();
			}
		});
		const stopKeyup = on(trigger, 'keyup', (event) => {
			if (event.key === ' ') {
				toggleMove();
			}
		});

		return () => {
			stopKeydown();
			stopKeyup();
		};
	}

	const moveTrigger: Attachment<HTMLElement> = (trigger) => {
		const detach = pane.registerMoveTrigger(trigger, target);
		const unmarkGrip = markAsGrip(trigger);
		const stopListening = on(trigger, 'click', toggleMove);
		// Focus returns to the trigger when a move ends, so an Enter still held from placing or canceling would otherwise click it again.
		const stopRepeating = on(trigger, 'keydown', (event) => {
			if (event.key === 'Enter' && event.repeat) event.preventDefault();
		});
		const isNativeButton = trigger.localName === 'button';
		const isButton = isNativeButton || trigger.getAttribute('role') === 'button';
		const stopKeyboard = isNativeButton || !isButton ? undefined : toggleMoveWithKeyboard(trigger);

		if (isButton) {
			$effect(() => {
				trigger.setAttribute('aria-pressed', String(pane.isMoving(pane.sourceFor(target))));
			});
		}

		return () => {
			stopListening();
			stopRepeating();
			stopKeyboard?.();
			if (isButton) {
				trigger.removeAttribute('aria-pressed');
			}
			unmarkGrip();
			detach();
		};
	};

	const attachmentKey = createAttachmentKey();
</script>

{#if child}
	{@render child({ props: { ...rest, [attachmentKey]: moveTrigger } })}
{:else}
	<button type="button" {...rest} {@attach moveTrigger}>
		{@render children?.()}
	</button>
{/if}
