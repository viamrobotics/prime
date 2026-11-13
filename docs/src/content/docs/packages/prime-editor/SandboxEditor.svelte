<script lang="ts">
  import { CodeEditor, type CodeEditorLanguage } from "@viamrobotics/prime-editor";

  import { snippets } from "./snippets.ts";

  const {
    language = "typescript",
    readonly = false,
    lineNumbers = true,
    wrapLines = false,
    diff = "off",
  }: {
    language?: CodeEditorLanguage;
    readonly?: boolean;
    lineNumbers?: boolean;
    wrapLines?: boolean;
    diff?: "off" | "unified" | "split";
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
    {lineNumbers}
    {wrapLines}
    original={diff === "off" ? undefined : snippets[language].before}
    diff={diff === "split" ? "split" : "unified"}
  />
</div>
