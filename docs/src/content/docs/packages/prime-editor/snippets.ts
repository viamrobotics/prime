import type { CodeEditorLanguage } from "@viamrobotics/prime-editor";

export interface Snippet {
  before: string;
  after: string;
}

export const snippets: Record<CodeEditorLanguage, Snippet> = {
  typescript: {
    before: `function greet(name: string) {\n  return "Hello " + name;\n}\n`,
    after: `function greet(name: string, punctuation = "!") {\n  return \`Hello \${name}\${punctuation}\`;\n}\n`,
  },
  javascript: {
    before: `const total = items.reduce((sum, item) => sum + item.price, 0);\n`,
    after: `const total = items\n  .filter((item) => item.inStock)\n  .reduce((sum, item) => sum + item.price, 0);\n`,
  },
  json: {
    before: `{\n  "name": "arm",\n  "model": "fake"\n}\n`,
    after: `{\n  "name": "arm",\n  "model": "fake",\n  "attributes": { "speed": 5 }\n}\n`,
  },
  python: {
    before: `def scale(values, factor):\n    return [v * factor for v in values]\n`,
    after: `def scale(values, factor=2):\n    """Multiply every value by factor."""\n    return [v * factor for v in values]\n`,
  },
  go: {
    before: `func Add(a, b int) int {\n\treturn a + b\n}\n`,
    after: `func Add(a, b int) (int, error) {\n\tif a < 0 || b < 0 {\n\t\treturn 0, errors.New("negative input")\n\t}\n\treturn a + b, nil\n}\n`,
  },
  sql: {
    before: `SELECT id, name FROM robots;\n`,
    after: `SELECT id, name\nFROM robots\nWHERE status = 'online'\nORDER BY name;\n`,
  },
};
