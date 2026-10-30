<script lang="ts">
  import { mdiContentCopy, mdiPencil } from "@mdi/js";
  import { Icon, Menu } from "@viamrobotics/prime-ui";

  let isGridShown = $state(true);
  let sort = $state("name");
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Iconed item</p>
    <Menu>
      <Menu.Trigger class="button">Open</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>
          <Icon icon={mdiPencil} size="sm" />
          Rename
        </Menu.Item>
        <Menu.Item>
          <Icon icon={mdiContentCopy} size="sm" />
          Duplicate
        </Menu.Item>
      </Menu.Content>
    </Menu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Item with shortcut</p>
    <p class="text-sm text-subtle-2">
      The shortcut is hidden from assistive technology, so the item is announced as "Save" alone.
    </p>
    <Menu>
      <Menu.Trigger class="button">Open</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>
          Save
          <Menu.Shortcut>⌘S</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item>
          Save as
          <Menu.Shortcut>⇧⌘S</Menu.Shortcut>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Checkbox item</p>
    <Menu>
      <Menu.Trigger class="button">Open</Menu.Trigger>
      <Menu.Content>
        <Menu.CheckboxItem bind:checked={isGridShown}>Show grid</Menu.CheckboxItem>
        <Menu.CheckboxItem checked>Show rulers</Menu.CheckboxItem>
      </Menu.Content>
    </Menu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Radio group</p>
    <Menu>
      <Menu.Trigger class="button">Open</Menu.Trigger>
      <Menu.Content>
        <Menu.RadioGroup bind:value={sort}>
          <Menu.RadioItem value="name">Name</Menu.RadioItem>
          <Menu.RadioItem value="date">Date</Menu.RadioItem>
          <Menu.RadioItem value="size">Size</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Submenu</p>
    <Menu>
      <Menu.Trigger class="button">Open</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Open</Menu.Item>
        <Menu.Sub>
          <Menu.SubTrigger>Export as</Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Item>PNG</Menu.Item>
            <Menu.Item>SVG</Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
      </Menu.Content>
    </Menu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Separator and group heading</p>
    <Menu>
      <Menu.Trigger class="button">Open</Menu.Trigger>
      <Menu.Content>
        <Menu.Group>
          <Menu.GroupHeading>Edit</Menu.GroupHeading>
          <Menu.Item>Rename</Menu.Item>
          <Menu.Item>Duplicate</Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupHeading>Share</Menu.GroupHeading>
          <Menu.Item>Copy link</Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Danger item</p>
    <Menu>
      <Menu.Trigger class="button">Open</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Rename</Menu.Item>
        <Menu.Separator />
        <Menu.Item variant="danger">Delete</Menu.Item>
      </Menu.Content>
    </Menu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled item</p>
    <Menu>
      <Menu.Trigger class="button">Open</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Rename</Menu.Item>
        <Menu.Item disabled>Delete</Menu.Item>
      </Menu.Content>
    </Menu>
  </div>
</div>
