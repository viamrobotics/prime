import Root from './Menubar.svelte';
import Content from './MenubarContent.svelte';
import Menu from './MenubarMenu.svelte';
import Trigger from './MenubarTrigger.svelte';
import CheckboxItem from './MenuCheckboxItem.svelte';
import Group from './MenuGroup.svelte';
import GroupHeading from './MenuGroupHeading.svelte';
import Item from './MenuItem.svelte';
import RadioGroup from './MenuRadioGroup.svelte';
import RadioItem from './MenuRadioItem.svelte';
import Separator from './MenuSeparator.svelte';
import Shortcut from './MenuShortcut.svelte';
import Sub from './MenuSub.svelte';
import SubContent from './MenuSubContent.svelte';
import SubTrigger from './MenuSubTrigger.svelte';

export const Menubar: typeof Root & {
	Menu: typeof Menu;
	Trigger: typeof Trigger;
	Content: typeof Content;
	Item: typeof Item;
	CheckboxItem: typeof CheckboxItem;
	RadioGroup: typeof RadioGroup;
	RadioItem: typeof RadioItem;
	Sub: typeof Sub;
	SubTrigger: typeof SubTrigger;
	SubContent: typeof SubContent;
	Separator: typeof Separator;
	Group: typeof Group;
	GroupHeading: typeof GroupHeading;
	Shortcut: typeof Shortcut;
} = Object.assign(Root, {
	Menu,
	Trigger,
	Content,
	Item,
	CheckboxItem,
	RadioGroup,
	RadioItem,
	Sub,
	SubContent,
	SubTrigger,
	Separator,
	Group,
	GroupHeading,
	Shortcut
});
