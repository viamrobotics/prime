import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { userEvent } from "vitest/browser";
import { Input } from "@viamrobotics/prime-ui";
import Sandbox from "../Sandbox.svelte";

describe("Sandbox", () => {
  const controls = {
    placeholder: {
      kind: "text",
      label: "Placeholder",
      default: "seed",
    } as const,
    disabled: { kind: "boolean", label: "Disabled", default: false } as const,
  };

  it("renders the target component seeded from control defaults", () => {
    const { container } = render(Sandbox, {
      props: { component: Input, controls },
    });
    const preview = container.querySelector("input");
    expect(preview?.getAttribute("placeholder")).toBe("seed");
  });

  it("reflects a control change into the live preview", async () => {
    const { container } = render(Sandbox, {
      props: { component: Input, controls },
    });
    const [previewInput, placeholderControl] = [
      ...container.querySelectorAll("input"),
    ];
    await userEvent.click(placeholderControl);
    await userEvent.clear(placeholderControl);
    await userEvent.keyboard("changed");
    expect(previewInput.getAttribute("placeholder")).toBe("changed");
  });

  it("renders the generated code snippet with the given name", () => {
    const { container } = render(Sandbox, {
      props: { component: Input, controls, name: "Input" },
    });
    const code = container.querySelector("pre")?.textContent ?? "";
    expect(code).toContain("<Input");
    expect(code).toContain('placeholder="seed"');
  });
});
