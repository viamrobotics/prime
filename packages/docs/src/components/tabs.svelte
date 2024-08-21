<script lang="ts">
  import { TabsBar, Tab } from '@viamrobotics/prime-core';

  export let variant: 'primary' | 'secondary' = 'primary';

  $: currentTab = 'first';

  const setTab = (tabName: string) => {
    console.log(tabName);
    currentTab = tabName;
  };
</script>

<TabsBar
  {variant}
  aria-label="Tab example -- {variant} variant"
  class="overflow-x-auto"
>
  <Tab
    title="The first tab"
    href="#first"
    class="whitespace-nowrap"
    selected={currentTab === 'first' ? true : false}
    on:click={() => setTab('first')}
  ></Tab>
  <Tab
    title="The second tab"
    href="#second"
    class="whitespace-nowrap"
    selected={currentTab === 'second' ? true : false}
    on:click={() => setTab('second')}
  ></Tab>
  <Tab
    title="The third tab"
    href="#third"
    class="whitespace-nowrap"
    selected={currentTab === 'third' ? true : false}
    on:click={() => setTab('third')}
  ></Tab>
</TabsBar>
