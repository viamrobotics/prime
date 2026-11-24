<script lang="ts">
  import { CodeEditor } from "@viamrobotics/prime-editor";

  const value = `{ "speed": 5 }\n`;
</script>

<div class="not-content grid w-full gap-4 sm:grid-cols-2">
  <figure class="m-0 flex flex-col gap-1">
    <figcaption class="text-sm font-medium">Editable</figcaption>
    <CodeEditor aria-label="Editable config" language="json" {value} />
  </figure>
  <figure class="m-0 flex flex-col gap-1">
    <figcaption class="text-sm font-medium">Readonly</figcaption>
    <CodeEditor aria-label="Readonly config" language="json" readonly {value} />
  </figure>
  <figure class="m-0 flex flex-col gap-1">
    <figcaption class="text-sm font-medium">Disabled</figcaption>
    <CodeEditor aria-label="Disabled config" language="json" disabled {value} />
  </figure>
  <figure class="m-0 flex flex-col gap-1">
    <figcaption class="text-sm font-medium">Invalid</figcaption>
    <CodeEditor aria-label="Invalid config" aria-invalid="true" language="json" {value} />
  </figure>
</div>
