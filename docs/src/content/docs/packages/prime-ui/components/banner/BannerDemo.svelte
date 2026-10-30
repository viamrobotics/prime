<script lang="ts">
  import { Banner } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<!-- The parts are composed as children, so the generated snippet would omit them. -->
<Sandbox
  name="Banner"
  component={Banner}
  showCode={false}
  controls={{
    variant: {
      kind: "select",
      label: "Variant",
      default: "info",
      options: ["info", "success", "warning", "danger"],
    },
    placement: {
      kind: "select",
      label: "Placement",
      default: "inline",
      options: ["inline", "site"],
    },
  }}
>
  <Banner.Title>Module deprecated</Banner.Title>
  <Banner.Description>my-camera uses a module that is no longer maintained.</Banner.Description>
</Sandbox>
