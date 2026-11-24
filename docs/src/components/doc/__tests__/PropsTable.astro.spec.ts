import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it, vi } from "vitest";

import PropsTable from "../PropsTable.astro";

vi.mock("astro:content", () => ({
  getEntry: async () => ({
    data: {
      props: [
        { name: "value", type: "string", default: "''", description: "The value.", bindable: true },
        { name: "disabled", type: "boolean", default: "false", description: "Disables it." },
      ],
    },
  }),
}));

const ROW_HEADER = /<th\b[^>]*\bscope="row"[^>]*>((?:(?!<\/th>)[\s\S])*)<\/th>/g;

describe("PropsTable", () => {
  it("names the table for its entry and heads each row with the prop name", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(PropsTable, {
      props: { name: "select/trigger" },
    });

    expect(html).toMatch(/<table\b[^>]*\baria-label="Props of select\/trigger"/);
    const rowHeaders = [...html.matchAll(ROW_HEADER)].map(([, cell]) => cell);
    expect(rowHeaders).toHaveLength(2);
    expect(rowHeaders[0]).toMatch(/<code\b[^>]*>value<\/code>/);
    expect(rowHeaders[1]).toMatch(/<code\b[^>]*>disabled<\/code>/);
  });
});
