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
import Badge from './badge.svelte';
import Breadcrumbs from './breadcrumbs.svelte';
</script>

<div class="flex gap-4">
  <!-- Collapse -->
  <Collapse title="Number 1">
    <div
      slot="content"
      class="border border-t-0 border-light p-4 text-sm"
    >
      One is the loneliest number.
    </div>
  </Collapse>

  <Collapse title="Number 2">
    <Badge
      slot="header"
      label="Inactive"
    />
    <div
      slot="content"
      class="border border-t-0 border-light p-4 text-sm"
    >
      Two can be as bad as one, its the loneliest number since the number one.
    </div>
  </Collapse>

  <Collapse title="Number 3">
    <Breadcrumbs
      slot="title"
      crumbs={['Hi', 'Hello']}
    />
    <Badge
      slot="header"
      label="Active"
    />
    <div
      slot="content"
      class="border border-t-0 border-light p-4 text-sm"
    >
      Three is company.
    </div>
  </Collapse>

  <Collapse title="Number 4">
    <Breadcrumbs
      slot="title"
      crumbs={['Howdy', 'Hey']}
    />
    <Badge
      slot="header"
      label="Busy"
    />
    <div
      slot="content"
      class="border border-t-0 border-light p-4 text-sm"
    >
      I am number 4.
    </div>
  </Collapse>
</div>
