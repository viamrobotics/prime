<script lang="ts">
  import { Breadcrumbs } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Single page</p>
    <Breadcrumbs aria-label="Single page">
      <Breadcrumbs.Item><Breadcrumbs.Page>Dashboard</Breadcrumbs.Page></Breadcrumbs.Item>
    </Breadcrumbs>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Ellipsis</p>
    <Breadcrumbs aria-label="Ellipsis">
      <Breadcrumbs.Item><Breadcrumbs.Link href="#home">Home</Breadcrumbs.Link></Breadcrumbs.Item>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Item><Breadcrumbs.Ellipsis /></Breadcrumbs.Item>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Item><Breadcrumbs.Page>my-robot</Breadcrumbs.Page></Breadcrumbs.Item>
    </Breadcrumbs>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Custom separator</p>
    <Breadcrumbs aria-label="Custom separator">
      <Breadcrumbs.Item><Breadcrumbs.Link href="#home">Home</Breadcrumbs.Link></Breadcrumbs.Item>
      <Breadcrumbs.Separator>/</Breadcrumbs.Separator>
      <Breadcrumbs.Item><Breadcrumbs.Page>my-robot</Breadcrumbs.Page></Breadcrumbs.Item>
    </Breadcrumbs>
  </div>
</div>
