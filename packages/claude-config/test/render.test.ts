import { describe, expect, it } from "vitest";
import { render } from "../src/core/render.js";

describe("render", () => {
  it("substitutes a variable", () => {
    expect(render("hi {{name}}", { name: "world" })).toBe("hi world");
  });

  it("throws on an unknown variable", () => {
    expect(() => render("{{missing}}", {})).toThrow(/unknown variable/);
  });

  it("throws when a boolean is used as a value", () => {
    expect(() => render("{{flag}}", { flag: true })).toThrow(/boolean/);
  });

  it("includes an #if block when the flag is truthy", () => {
    expect(render("a{{#if f}}B{{/if}}c", { f: true })).toBe("aBc");
  });

  it("drops an #if block when the flag is falsy", () => {
    expect(render("a{{#if f}}B{{/if}}c", { f: false })).toBe("ac");
  });

  it("inverts with the ^ block", () => {
    expect(render("a{{^f}}B{{/if}}c", { f: false })).toBe("aBc");
    expect(render("a{{^f}}B{{/if}}c", { f: true })).toBe("ac");
  });

  it("resolves nested conditionals inside-out", () => {
    expect(
      render("{{#if a}}[{{#if b}}x{{/if}}]{{/if}}", { a: true, b: true }),
    ).toBe("[x]");
    expect(
      render("{{#if a}}[{{#if b}}x{{/if}}]{{/if}}", { a: true, b: false }),
    ).toBe("[]");
    expect(
      render("{{#if a}}[{{#if b}}x{{/if}}]{{/if}}", { a: false, b: true }),
    ).toBe("");
  });

  it("leaves GitHub Actions ${{ }} expressions untouched", () => {
    const yaml = "issue_number: ${{ github.event.issue.number }}";
    expect(render(yaml, {})).toBe(yaml);
  });
});
