<script lang="ts">
  import { CodeSnippet } from "@viamrobotics/prime-ui";

  const code =
    'curl --request POST --header "Content-Type: application/json" --data \'{"name": "rover", "speed": 3}\' https://example.com/api/robots';
</script>

<div class="not-content max-w-md">
  <CodeSnippet {code} language="bash" wrapLines />
</div>
