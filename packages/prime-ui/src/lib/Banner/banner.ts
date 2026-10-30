import Root from './Banner.svelte';
import Actions from './BannerActions.svelte';
import Close from './BannerClose.svelte';
import Description from './BannerDescription.svelte';
import Details from './BannerDetails.svelte';
import Icon from './BannerIcon.svelte';
import Progress from './BannerProgress.svelte';
import Title from './BannerTitle.svelte';

export type { BannerVariant } from './useBanner.svelte.ts';

export const Banner: typeof Root & {
	Icon: typeof Icon;
	Title: typeof Title;
	Description: typeof Description;
	Actions: typeof Actions;
	Details: typeof Details;
	Close: typeof Close;
	Progress: typeof Progress;
} = Object.assign(Root, { Icon, Title, Description, Actions, Details, Close, Progress });
