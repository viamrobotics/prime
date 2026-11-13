<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxEditor from "./SandboxEditor.svelte";
</script>

<!-- The wrapper maps a single diff choice onto original and diff, so the generated snippet would mislead. -->
<Sandbox
  name="CodeEditor"
  component={SandboxEditor}
  showCode={false}
  controls={{
    language: {
      kind: "select",
      label: "Language",
      default: "typescript",
      options: ["typescript", "javascript", "json", "python", "go", "sql"],
    },
    readonly: { kind: "boolean", label: "Readonly", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
    lineNumbers: { kind: "boolean", label: "Line numbers", default: true },
    wrapLines: { kind: "boolean", label: "Wrap lines", default: false },
    diff: {
      kind: "select",
      label: "Diff",
      default: "off",
      options: ["off", "unified", "split"],
    },
    collapseUnchanged: { kind: "boolean", label: "Collapse unchanged", default: false },
    invalid: { kind: "boolean", label: "Invalid", default: false },
  }}
/>
