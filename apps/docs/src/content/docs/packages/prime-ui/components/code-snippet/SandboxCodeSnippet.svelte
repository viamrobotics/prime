<script lang="ts">
  import {
    CodeSnippet,
    type CodeSnippetLanguage,
  } from "@viamrobotics/prime-ui";

  import { samples } from "./samples";

  interface Props {
    language: CodeSnippetLanguage;
    wrapLines?: boolean;
  }

  const { language, wrapLines }: Props = $props();
</script>

<CodeSnippet code={samples[language]} {language} {wrapLines} />
