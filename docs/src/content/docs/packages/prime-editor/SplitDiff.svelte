<script lang="ts">
  import { CodeEditor } from "@viamrobotics/prime-editor";

  const original = `const greeting = "hello";\nconsole.log(greeting);\n`;
  let value = $state(`const greeting = "hello, world";\nconsole.log(greeting.toUpperCase());\n`);
</script>

<div class="not-content w-full">
  <CodeEditor
    aria-label="Split diff"
    class="max-h-64 w-full overflow-auto"
    language="javascript"
    {original}
    diff="split"
    bind:value
  />
</div>
