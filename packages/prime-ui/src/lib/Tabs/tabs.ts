import Root from './Tabs.svelte';
import Content from './TabsContent.svelte';
import List from './TabsList.svelte';
import MoveNext from './TabsMoveNext.svelte';
import MovePrevious from './TabsMovePrevious.svelte';
import Trigger from './TabsTrigger.svelte';

export const Tabs: typeof Root & {
	List: typeof List;
	Trigger: typeof Trigger;
	Content: typeof Content;
	MovePrevious: typeof MovePrevious;
	MoveNext: typeof MoveNext;
} = Object.assign(Root, { List, Trigger, Content, MovePrevious, MoveNext });
