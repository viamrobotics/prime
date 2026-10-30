<script lang="ts">
  import { CodeSnippet, codeSnippetLanguages } from "@viamrobotics/prime-ui";

  import { samples } from "./samples";
</script>

<div class="not-content flex flex-col gap-6">
  {#each codeSnippetLanguages as language (language)}
    <div class="flex flex-col gap-2">
      <p class="text-xs font-medium text-subtle-2 uppercase">{language}</p>
      <CodeSnippet code={samples[language]} {language} />
    </div>
  {/each}
</div>
