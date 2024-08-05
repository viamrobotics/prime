<script lang="ts">
import TabsBar from '$lib/tabs-bar.svelte';
import Tab from '$lib/tab.svelte';
</script>

<TabsBar variant="secondary">
  <Tab
    title="The first tab"
    href="#first"
    selected
  ></Tab>
  <Tab
    title="The second tab"
    href="#second"
  ></Tab>
  <Tab
    title="The third tab"
    href="#third"
  ></Tab>
</TabsBar>
