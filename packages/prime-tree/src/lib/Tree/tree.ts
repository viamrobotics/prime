import Branch from './Branch.svelte';
import BranchContent from './BranchContent.svelte';
import BranchControl from './BranchControl.svelte';
import BranchTrigger from './BranchTrigger.svelte';
import IndentGuide from './IndentGuide.svelte';
import Indicator from './Indicator.svelte';
import Item from './Item.svelte';
import Row from './Row.svelte';
import Root from './Tree.svelte';

export const Tree: typeof Root & {
	Branch: typeof Branch;
	BranchControl: typeof BranchControl;
	BranchTrigger: typeof BranchTrigger;
	BranchContent: typeof BranchContent;
	Item: typeof Item;
	Indicator: typeof Indicator;
	IndentGuide: typeof IndentGuide;
	Row: typeof Row;
} = Object.assign(Root, {
	Branch,
	BranchControl,
	BranchTrigger,
	BranchContent,
	Item,
	Indicator,
	IndentGuide,
	Row
});
