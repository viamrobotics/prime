import Root from './Menu.svelte';
import CheckboxItem from './MenuCheckboxItem.svelte';
import Content from './MenuContent.svelte';
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
import Trigger from './MenuTrigger.svelte';

export const Menu: typeof Root & {
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
	Trigger,
	Content,
	Item,
	CheckboxItem,
	RadioGroup,
	RadioItem,
	Sub,
	SubTrigger,
	SubContent,
	Separator,
	Group,
	GroupHeading,
	Shortcut
});
