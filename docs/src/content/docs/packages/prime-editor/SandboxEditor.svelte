<script lang="ts">
  import { CodeEditor, type CodeEditorLanguage } from "@viamrobotics/prime-editor";

  import { snippets } from "./snippets.ts";

  const {
    language = "typescript",
    readonly = false,
    disabled = false,
    lineNumbers = true,
    wrapLines = false,
    diff = "off",
    collapseUnchanged = false,
    invalid = false,
  }: {
    language?: CodeEditorLanguage;
    readonly?: boolean;
    disabled?: boolean;
    lineNumbers?: boolean;
    wrapLines?: boolean;
    diff?: "off" | "unified" | "split";
    collapseUnchanged?: boolean;
    invalid?: boolean;
  } = $props();

  let edits = $state<Partial<Record<CodeEditorLanguage, string>>>({});
</script>

<div class="not-content w-full">
  <CodeEditor
    aria-label="Sandbox editor"
    class="max-h-80 w-full overflow-auto"
    bind:value={() => edits[language] ?? snippets[language].after, (next) => (edits[language] = next)}
    {language}
    {readonly}
    {disabled}
    {lineNumbers}
    {wrapLines}
    original={diff === "off" ? undefined : snippets[language].before}
    diff={diff === "split" ? "split" : "unified"}
    {collapseUnchanged}
    aria-invalid={invalid}
  />
</div>
