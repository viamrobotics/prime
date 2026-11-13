import Root from './Tabs.svelte';
import Content from './TabsContent.svelte';
import List from './TabsList.svelte';
import Trigger from './TabsTrigger.svelte';

export const Tabs: typeof Root & {
	List: typeof List;
	Trigger: typeof Trigger;
	Content: typeof Content;
} = Object.assign(Root, { List, Trigger, Content });
