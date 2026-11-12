import Root from './Breadcrumbs.svelte';
import Ellipsis from './BreadcrumbsEllipsis.svelte';
import Item from './BreadcrumbsItem.svelte';
import Link from './BreadcrumbsLink.svelte';
import Page from './BreadcrumbsPage.svelte';
import Separator from './BreadcrumbsSeparator.svelte';

export const Breadcrumbs: typeof Root & {
	Item: typeof Item;
	Link: typeof Link;
	Page: typeof Page;
	Separator: typeof Separator;
	Ellipsis: typeof Ellipsis;
} = Object.assign(Root, { Item, Link, Page, Separator, Ellipsis });
