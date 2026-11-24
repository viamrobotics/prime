import { describe, expect, it } from "vitest";

import { inlineCode } from "../inline-code";

describe("inlineCode", () => {
  it.each([
    { text: "plain", expected: "plain" },
    { text: "a `b` c", expected: "a <code>b</code> c" },
    { text: "`a` and `b`", expected: "<code>a</code> and <code>b</code>" },
    { text: "unclosed `tick", expected: "unclosed `tick" },
    { text: "empty `` span", expected: "empty `` span" },
  ])("renders $text", ({ text, expected }) => {
    expect(inlineCode(text)).toBe(expected);
  });

  it("escapes markup outside and inside a code span", () => {
    expect(inlineCode("a < b & `Array<T>`")).toBe(
      "a &lt; b &amp; <code>Array&lt;T&gt;</code>",
    );
  });

  it("does not let raw HTML through", () => {
    expect(inlineCode("<script>x</script>")).toBe(
      "&lt;script&gt;x&lt;/script&gt;",
    );
  });
});
