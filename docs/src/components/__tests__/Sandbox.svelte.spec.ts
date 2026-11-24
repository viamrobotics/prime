import { Input, Label, NumberInput } from "@viamrobotics/prime-ui";
import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { page, userEvent } from "vitest/browser";

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

  it("names the snippet Component when no name is given", () => {
    const { container } = render(Sandbox, {
      props: { component: Input, controls },
    });

    expect(container.querySelector("pre")?.textContent).toContain("<Component");
  });

  it("renders a bare tag in the snippet when there are no controls", () => {
    const { container } = render(Sandbox, {
      props: { component: Input, controls: {}, name: "Input" },
    });

    expect(container.querySelector("pre")?.textContent).toBe("<Input />");
  });

  it("omits the code snippet when showCode is false", () => {
    const { container } = render(Sandbox, {
      props: { component: Input, controls, showCode: false },
    });

    expect(container.querySelector("pre")).toBeNull();
  });

  it("toggles a boolean prop on the preview and in the snippet", async () => {
    const { container } = render(Sandbox, {
      props: { component: Input, controls },
    });
    const preview = container.querySelector("input");

    await page.getByRole("checkbox", { name: "Disabled" }).click();

    expect(preview?.disabled).toBe(true);
    expect(container.querySelector("pre")?.textContent).toContain(
      "disabled={true}",
    );
  });

  it("seeds and updates a number prop", async () => {
    const { container } = render(Sandbox, {
      props: {
        component: NumberInput,
        controls: {
          value: { kind: "number", label: "Value", default: 3 } as const,
        },
      },
    });
    const [previewInput, valueControl] = [
      ...container.querySelectorAll("input"),
    ];
    expect(previewInput.value).toBe("3");

    await userEvent.click(valueControl);
    await userEvent.clear(valueControl);
    await userEvent.keyboard("7");

    expect(previewInput.value).toBe("7");
    expect(container.querySelector("pre")?.textContent).toContain("value={7}");
  });

  it("applies a chosen select option to the preview", async () => {
    const { container } = render(Sandbox, {
      props: {
        component: Input,
        controls: {
          type: {
            kind: "select",
            label: "Type",
            default: "text",
            options: ["text", "password"],
          } as const,
        },
      },
    });
    const preview = container.querySelector("input");
    expect(preview?.type).toBe("text");

    await page.getByRole("combobox").click();
    await page.getByRole("option", { name: "password" }).click();

    expect(preview?.type).toBe("password");
    expect(container.querySelector("pre")?.textContent).toContain(
      'type="password"',
    );
  });

  it("forwards children into the previewed component", () => {
    const children = createRawSnippet(() => ({
      render: () => "<span>inner</span>",
    }));
    const { container } = render(Sandbox, {
      props: { component: Label, controls: {}, children },
    });

    expect(container.querySelector("label")?.textContent).toContain("inner");
  });
});
