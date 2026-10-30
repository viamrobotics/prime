<script lang="ts">
  import {
    keybindingParts,
    useHotkey,
    useKeybinding,
    useKeybindings,
  } from "@viamrobotics/prime-ui";

  const keybindings = useKeybindings();

  useHotkey({ id: "go.home", description: "Go home", group: "Navigation", key: "h", run: () => {} });
  useHotkey({ id: "go.back", description: "Go back", group: "Navigation", key: "arrowleft", run: () => {} });
  useHotkey({ id: "edit.undo", description: "Undo", group: "Editing", key: "z", mod: true, run: () => {} });
  useHotkey({ id: "edit.redo", description: "Redo", group: "Editing", key: "z", mod: true, shift: true, run: () => {} });
  useKeybinding({ id: "list.select", description: "Select an item", group: "Editing", key: "enter" });

  const groups = $derived(
    Object.entries(Object.groupBy(keybindings.bindings, (binding) => binding.group)),
  );
</script>

<div class="flex flex-col gap-4">
  {#each groups as [group, bindings] (group)}
    <section>
      <h4 class="text-sm font-semibold">{group}</h4>
      <ul class="flex flex-col gap-1">
        {#each bindings ?? [] as binding (binding.id)}
          <li class="flex items-center justify-between gap-4 text-sm">
            <span>{binding.description}</span>
            <span class="flex gap-1">
              {#each keybindingParts(binding) as part (part)}
                <kbd>{part}</kbd>
              {/each}
            </span>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</div>
