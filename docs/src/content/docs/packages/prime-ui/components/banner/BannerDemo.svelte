<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { Banner } from "@viamrobotics/prime-ui";
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
      options: ["info", "success", "warning", "danger", "pending"],
    },
    placement: {
      kind: "select",
      label: "Placement",
      default: "inline",
      options: ["inline", "block"],
    },
  }}
>
  <Banner.Title>Module deprecated</Banner.Title>
  <Banner.Description>my-camera uses a module that is no longer maintained.</Banner.Description>
</Sandbox>
