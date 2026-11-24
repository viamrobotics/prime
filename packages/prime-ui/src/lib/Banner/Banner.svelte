<!--
@component
A notification banner: an icon chip, content, and an optional dismiss button. The variant picks the
chip color and glyph, and the live-region role: `status` for `info`, `success`, and `pending`,
`alert` for `warning` and `danger`. `pending` wears a spinner in the chip for work still running. The chip is
decorative and the banner adds no text of its own, so content that needs its tone announced says
so itself, such as a title that starts with "Error".
Without a `Banner.Title` it is a compact one-liner, with one it stacks. The banner owns no open
state, so render it inside an `{#if}` to show and hide it.

```svelte
<Banner variant="warning">
	<Banner.Title>Module deprecated</Banner.Title>
	<Banner.Description>my-camera uses a module that is no longer maintained.</Banner.Description>
	<Banner.Actions>
		<button class="button">Update module</button>
	</Banner.Actions>
	<Banner.Close aria-label="Dismiss" onclick={dismiss} />
</Banner>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import {
		mdiAlertCircleOutline,
		mdiAlertOutline,
		mdiCheckCircleOutline,
		mdiInformationOutline
	} from '@mdi/js';

	import type { BannerVariant } from './variant.ts';

	import Icon from '../Icon/Icon.svelte';
	import { provideBanner } from './useBanner.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** The tone: chip color, default glyph, and live-region role. @default 'info' */
		variant?: BannerVariant;
		/** `block` spans the full width with only a bottom border. @default 'inline' */
		placement?: 'inline' | 'block';
		/** The live-region role. Defaults by variant: `status` for info, success, and pending, `alert` for warning and danger. Pass `null` for none, when an ancestor already announces. */
		role?: HTMLAttributes<HTMLDivElement>['role'];
	}

	const {
		variant = 'info',
		placement = 'inline',
		role,
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	// `pending` has no glyph: its chip holds the spinner.
	const GLYPHS: Record<Exclude<BannerVariant, 'pending'>, string> = {
		info: mdiInformationOutline,
		success: mdiCheckCircleOutline,
		warning: mdiAlertOutline,
		danger: mdiAlertCircleOutline
	};

	const TONE_CLASSES: Record<BannerVariant, string> = {
		info: 'banner-info',
		success: 'banner-success',
		warning: 'banner-warning',
		danger: 'banner-danger',
		pending: 'banner-pending'
	};

	const ROLES: Record<BannerVariant, 'status' | 'alert'> = {
		info: 'status',
		success: 'status',
		warning: 'alert',
		danger: 'alert',
		pending: 'status'
	};

	const context = provideBanner();
</script>

<div
	{...restProps}
	role={role === undefined ? ROLES[variant] : role}
	class={['banner', TONE_CLASSES[variant], placement === 'block' && 'banner-block', extraClasses]}
>
	{#if !context.hasIcon}
		<span class="banner-chip" aria-hidden="true">
			{#if variant === 'pending'}
				<span class="progress-dots"></span>
			{:else}
				<Icon icon={GLYPHS[variant]} />
			{/if}
		</span>
	{/if}
	{@render children?.()}
</div>
