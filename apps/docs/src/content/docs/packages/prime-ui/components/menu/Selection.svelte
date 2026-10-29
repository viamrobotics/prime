<script lang="ts">
  import { Menu } from "@viamrobotics/prime-ui";

  let isGridShown = $state(true);
  let sort = $state("name");
</script>

<div class="not-content">
  <Menu>
    <Menu.Trigger class="button">View</Menu.Trigger>
    <Menu.Content>
      <Menu.CheckboxItem bind:checked={isGridShown}>Show grid</Menu.CheckboxItem>
      <Menu.Separator />
      <Menu.RadioGroup bind:value={sort}>
        <Menu.GroupHeading>Sort by</Menu.GroupHeading>
        <Menu.RadioItem value="name">Name</Menu.RadioItem>
        <Menu.RadioItem value="date">Date</Menu.RadioItem>
        <Menu.RadioItem value="size">Size</Menu.RadioItem>
      </Menu.RadioGroup>
    </Menu.Content>
  </Menu>

  <p class="mt-3 text-sm text-subtle-2">
    grid: <code>{isGridShown}</code>, sort: <code>{sort}</code>
  </p>
</div>
