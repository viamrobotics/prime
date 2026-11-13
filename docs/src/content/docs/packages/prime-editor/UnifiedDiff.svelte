<script lang="ts">
  import { CodeEditor } from "@viamrobotics/prime-editor";

  const original = `const greeting = "hello there";\nconst unused = true;\nconsole.log(greeting);\n`;
  let value = $state(`const greeting = "hello, world";\nconsole.log(greeting.toUpperCase());\n`);
</script>

<div class="not-content w-full">
  <CodeEditor
    aria-label="Unified diff"
    class="max-h-64 w-full overflow-auto"
    language="javascript"
    {original}
    diff="unified"
    bind:value
  />
</div>
