import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import KeyboardTable from "../KeyboardTable.astro";

const ROW_HEADER = /<th\b[^>]*\bscope="row"[^>]*>((?:(?!<\/th>)[\s\S])*)<\/th>/g;

const bindings = [
  { keys: "Enter / Space", action: "Opens the list." },
  { text: "Typed characters", action: "Filters the list." },
];

describe("KeyboardTable", () => {
  it("names the table Keyboard bindings and heads each row with its keys", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(KeyboardTable, { props: { bindings } });

    expect(html).toMatch(/<table\b[^>]*\baria-label="Keyboard bindings"/);
    const rowHeaders = [...html.matchAll(ROW_HEADER)].map(([, cell]) => cell);
    expect(rowHeaders).toHaveLength(2);
    expect(rowHeaders[0]).toMatch(/<kbd\b[^>]*>Enter<\/kbd>[\s\S]*<kbd\b[^>]*>Space<\/kbd>/);
    expect(rowHeaders[1]).toContain("Typed characters");
  });

  it("takes a label that tells two tables on one page apart", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(KeyboardTable, {
      props: { bindings, label: "Keyboard bindings with the list open" },
    });

    expect(html).toMatch(/<table\b[^>]*\baria-label="Keyboard bindings with the list open"/);
  });
});
