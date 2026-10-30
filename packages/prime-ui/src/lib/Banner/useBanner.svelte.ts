import { getContext, setContext } from 'svelte';

const key = Symbol('Banner');

/** The tone of a `Banner`: which chip color and glyph it wears, and which live-region role it takes. */
export type BannerVariant = 'info' | 'success' | 'warning' | 'danger';

interface BannerOptions {
	variant: () => BannerVariant;
}

/** What a `Banner` shares with the parts inside it. */
export interface BannerContext {
	/** The root's variant. */
	readonly variant: BannerVariant;
	/** Whether a `Banner.Icon` has taken over the chip, so the root leaves its default glyph out. */
	readonly hasIcon: boolean;
	/** Called by `Banner.Icon` when it mounts. Returns the release to call when it unmounts. */
	claimIcon: () => () => void;
}

export const provideBanner = (options: BannerOptions): BannerContext => {
	let hasIcon = $state(false);
	return setContext<BannerContext>(key, {
		get variant() {
			return options.variant();
		},
		get hasIcon() {
			return hasIcon;
		},
		claimIcon: () => {
			hasIcon = true;
			return () => {
				hasIcon = false;
			};
		}
	});
};

/** The enclosing `Banner`, or `undefined` when a part is rendered on its own. */
export const useBanner = (): BannerContext | undefined =>
	getContext<BannerContext | undefined>(key);
