<script lang="ts">
  import { Breadcrumbs, Menu } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Breadcrumbs>
    <Breadcrumbs.Item><Breadcrumbs.Link href="#home">Home</Breadcrumbs.Link></Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item>
      <Menu>
        <Menu.Trigger class="focus-ring rounded-sm">
          <Breadcrumbs.Ellipsis />
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Organizations</Menu.Item>
          <Menu.Item>Locations</Menu.Item>
        </Menu.Content>
      </Menu>
    </Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item><Breadcrumbs.Link href="#machines">Machines</Breadcrumbs.Link></Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item><Breadcrumbs.Page>my-robot</Breadcrumbs.Page></Breadcrumbs.Item>
  </Breadcrumbs>
</div>
