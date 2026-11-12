<script lang="ts">
  import { Breadcrumbs } from "@viamrobotics/prime-ui";

  interface Props {
    "aria-label"?: string;
  }

  const { "aria-label": ariaLabel = "Breadcrumb" }: Props = $props();
</script>

<Breadcrumbs aria-label={ariaLabel}>
  <Breadcrumbs.Item><Breadcrumbs.Link href="#home">Home</Breadcrumbs.Link></Breadcrumbs.Item>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Item><Breadcrumbs.Link href="#machines">Machines</Breadcrumbs.Link></Breadcrumbs.Item>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Item><Breadcrumbs.Page>my-robot</Breadcrumbs.Page></Breadcrumbs.Item>
</Breadcrumbs>
