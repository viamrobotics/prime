<script lang="ts">
  import { CodeEditor, type CodeEditorLanguage } from "@viamrobotics/prime-editor";

  import { snippets } from "./snippets.ts";

  const languages = Object.keys(snippets) as CodeEditorLanguage[];
</script>

<div class="not-content grid w-full gap-4 sm:grid-cols-2">
  {#each languages as language (language)}
    <CodeEditor
      aria-label={`${language} example`}
      class="max-h-48 overflow-auto"
      {language}
      value={snippets[language].after}
      readonly
    />
  {/each}
</div>
