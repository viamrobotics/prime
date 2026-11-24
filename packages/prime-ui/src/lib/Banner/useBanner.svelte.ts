import { getContext, setContext } from 'svelte';

const BANNER_KEY = Symbol('Banner');

/** What a `Banner` shares with the parts inside it. */
export interface BannerContext {
	/** Whether a `Banner.Icon` has taken over the chip, so the root leaves its default glyph out. */
	readonly hasIcon: boolean;
	/** Called by `Banner.Icon` when it mounts. Returns the release to call when it unmounts. */
	claimIcon: () => () => void;
}

export const provideBanner = (): BannerContext => {
	let hasIcon = $state(false);
	return setContext<BannerContext>(BANNER_KEY, {
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
	getContext<BannerContext | undefined>(BANNER_KEY);
