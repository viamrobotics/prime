<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { codeSnippetLanguages } from "@viamrobotics/prime-ui";

  import SandboxCodeSnippet from "./SandboxCodeSnippet.svelte";
</script>

<Sandbox
  name="CodeSnippet"
  component={SandboxCodeSnippet}
  showCode={false}
  controls={{
    language: {
      kind: "select",
      label: "Language",
      default: "json",
      options: [...codeSnippetLanguages],
    },
    wrapLines: { kind: "boolean", label: "Wrap lines", default: false },
  }}
/>
