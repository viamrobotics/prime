<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxBreadcrumbs from "./SandboxBreadcrumbs.svelte";
</script>

<!-- The trail is built from parts in SandboxBreadcrumbs, so the generated snippet would mislead. -->
<Sandbox
  name="Breadcrumbs"
  component={SandboxBreadcrumbs}
  showCode={false}
  controls={{
    "aria-label": { kind: "text", label: "Landmark name", default: "Breadcrumb" },
  }}
/>
