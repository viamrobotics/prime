import { describe, expect, it } from "vitest";

import { tokenizeKeys } from "../key-tokens";

const key = (text: string) => ({ kind: "key", text });
const separator = (text: string) => ({ kind: "separator", text });

describe("tokenizeKeys", () => {
  it.each([
    { keys: "Escape", expected: [key("Escape")] },
    {
      keys: "Enter / Space",
      expected: [key("Enter"), separator("/"), key("Space")],
    },
    {
      keys: "Shift + Tab",
      expected: [key("Shift"), separator("+"), key("Tab")],
    },
    {
      keys: "Alt + Shift + ArrowLeft / ArrowRight",
      expected: [
        key("Alt"),
        separator("+"),
        key("Shift"),
        separator("+"),
        key("ArrowLeft"),
        separator("/"),
        key("ArrowRight"),
      ],
    },
    { keys: "/", expected: [key("/")] },
    { keys: "Ctrl + +", expected: [key("Ctrl"), separator("+"), key("+")] },
  ])("splits $keys", ({ keys, expected }) => {
    expect(tokenizeKeys(keys)).toEqual(expected);
  });
});
