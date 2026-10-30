<script lang="ts">
  import { CodeSnippet } from "@viamrobotics/prime-ui";

  const code = '{\n  "name": "rover",\n  "speed": 3,\n  "ready": true\n}';
</script>

<div class="not-content">
  <CodeSnippet {code} language="json">
    {#snippet caption()}
      rover.json
    {/snippet}
  </CodeSnippet>
</div>
