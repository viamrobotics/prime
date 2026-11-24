import { Input } from "@viamrobotics/prime-ui";
import { render } from "svelte/server";
import { describe, expect, it } from "vitest";

import Sandbox from "../Sandbox.svelte";

describe("Sandbox on the server", () => {
  const controls = {
    placeholder: { kind: "text" as const, label: "Placeholder", default: "seed" },
    disabled: { kind: "boolean" as const, label: "Disabled", default: false },
    maxlength: { kind: "number" as const, label: "Max length", default: 20 },
    type: { kind: "select" as const, label: "Type", default: "text", options: ["text", "search"] },
  };

  it("renders the preview, a control of every kind, and the code with no window", () => {
    expect(typeof window).toBe("undefined");

    const { body } = render(Sandbox, {
      props: { component: Input, controls, name: "Input" },
    });

    expect(body).toContain('placeholder="seed"');
    for (const label of ["Placeholder", "Disabled", "Max length", "Type"]) {
      expect(body).toContain(`>${label}<`);
    }
    expect(body).toContain("&lt;Input");
  });
});
