<!-- 
  @component
  This component allows us to render a Collapse with its slotted
  children, due to limitations with rendering slots using
  `@testing-library`.
  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48
 -->

<script lang="ts">
import Collapse from './collapse.svelte';
import Badge from './badge.svelte'
import Breadcrumbs from './breadcrumbs.svelte';
</script>

<div class="flex gap-4">
  <!-- Collapse -->
  <Collapse
    title='Number 1'
  >
    <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>One is the loneliest number.</div>
  </Collapse>

  <Collapse
    title='Number 2'
  >
    <Badge slot='header' label='Inactive'></Badge>
    <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>Two can be as bad as one, its the loneliest number since the number one.</div>
  </Collapse>

    <Collapse
      title='Number 3'
    >
      <Breadcrumbs slot='title' crumbs={['Hi', 'Hello']}></Breadcrumbs>
      <Badge slot='header' label='Active'></Badge>
      <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>Three is company.</div>
    </Collapse>

    <Collapse
      title='Nummber 4'
    >
      <Breadcrumbs slot='title' crumbs={['Howdy', 'Hey']}></Breadcrumbs>
      <Badge slot='header' label='Busy'></Badge>
      <div style='font-size: 12px; padding: 1rem'>I am number 4.</div>
    </Collapse>
</div>