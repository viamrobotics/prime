<!--
@component
A notification banner: an icon chip, content, and an optional dismiss button. The variant picks the
chip color and glyph, and the live-region role: `status` for `info` and `success`, `alert` for
`warning` and `danger`. Without a `Banner.Title` it is a compact one-liner, with one it stacks. The
banner owns no open state, so render it inside an `{#if}` to show and hide it.

```svelte
<Banner variant="warning">
	<Banner.Title>Module deprecated</Banner.Title>
	<Banner.Description>my-camera uses a module that is no longer maintained.</Banner.Description>
	<Banner.Actions>
		<button class="button">Update module</button>
	</Banner.Actions>
	<Banner.Close onclick={dismiss} />
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

	import Icon from '../Icon/Icon.svelte';
	import { provideBanner, type BannerVariant } from './useBanner.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** The tone: chip color, default glyph, and live-region role. @default 'info' */
		variant?: BannerVariant;
		/** `site` spans the full width with only a bottom border. @default 'inline' */
		placement?: 'inline' | 'site';
	}

	const {
		variant = 'info',
		placement = 'inline',
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	const glyphs: Record<BannerVariant, string> = {
		info: mdiInformationOutline,
		success: mdiCheckCircleOutline,
		warning: mdiAlertOutline,
		danger: mdiAlertCircleOutline
	};

	const tones: Record<BannerVariant, string> = {
		info: 'banner-info',
		success: 'banner-success',
		warning: 'banner-warning',
		danger: 'banner-danger'
	};

	const roles: Record<BannerVariant, 'status' | 'alert'> = {
		info: 'status',
		success: 'status',
		warning: 'alert',
		danger: 'alert'
	};

	const context = provideBanner({ variant: () => variant });
</script>

<div
	{...restProps}
	role={roles[variant]}
	class={['banner', tones[variant], placement === 'site' && 'banner-site', extraClasses]}
>
	{#if !context.hasIcon}
		<span class="banner-chip" aria-hidden="true"><Icon icon={glyphs[variant]} /></span>
	{/if}
	{@render children?.()}
</div>
