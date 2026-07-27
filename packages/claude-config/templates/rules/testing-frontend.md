---
paths:
  - "**/*.spec.ts"
---

# Frontend Testing (Vitest)

Real implementations by default. Mock only I/O boundaries: network, file system, time.

Static analysis runs on every commit. TypeScript uses ESLint (`@typescript-eslint`) and Prettier via `pnpm lint`. Svelte adds `svelte-check` and `eslint-plugin-svelte` via `pnpm check` and `pnpm lint`.

## Unit Tests

Pure functions, business logic, and utilities in isolation. Use `it.each` for case tables.

```typescript
import { describe, expect, it } from "vitest";
import * as Subject from "../calculate";

describe("calculateTotal", () => {
  it("returns 0 for empty input", () => {
    expect(Subject.calculateTotal([])).toBe(0);
  });

  it.each([
    { input: [1, 2], expected: 3 },
    { input: [-1, 1], expected: 0 },
  ])("returns $expected for $input", ({ input, expected }) => {
    expect(Subject.calculateTotal(input)).toBe(expected);
  });
});
```

## Integration Tests

Multiple modules working together, with the I/O boundary mocked. Cover the failure path as well as the happy one.

```typescript
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApiClient } from "../api-client";
import { userStore } from "../user-store";

describe("login flow", () => {
  beforeEach(() => {
    userStore.reset();
    vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("populates the user store after a successful login", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ id: "123", name: "Alice" }), {
        status: 200,
      }),
    );

    await createApiClient().login("alice@example.com", "password");

    expect(userStore.get()).toEqual({ id: "123", name: "Alice" });
  });

  it("leaves the user store empty on auth failure", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 401 }));

    await expect(
      createApiClient().login("alice@example.com", "wrong"),
    ).rejects.toThrow();
    expect(userStore.get()).toBeNull();
  });
});
```

### Mocking

```typescript
vi.mock("../api-client", () => ({ fetchUser: vi.fn() }));
vi.spyOn(object, "method").mockReturnValue("result");
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();
```

Reset with `vi.clearAllMocks()` in `beforeEach`, or `clearMocks: true` in `vitest.config.ts`.

## Component Tests (`*.svelte.spec.ts`)

Use [@testing-library/svelte](https://testing-library.com/docs/svelte-testing-library/intro).

```typescript
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import Counter from "../Counter.svelte";
import MyForm from "../MyForm.svelte";

it("increments count on click", async () => {
  const user = userEvent.setup();
  render(Counter);

  await user.click(screen.getByRole("button", { name: /increment/i }));
  expect(screen.getByText("1")).toBeInTheDocument();
});

it("calls onSubmit when the form is submitted", async () => {
  const onSubmit = vi.fn();
  const user = userEvent.setup();
  render(MyForm, { props: { onSubmit } });

  await user.click(screen.getByRole("button", { name: /submit/i }));
  expect(onSubmit).toHaveBeenCalledOnce();
});
```

Query priority, highest first:

1. `getByRole`, **preferred**, mirrors how users and assistive technology see the page
2. `getByLabelText` for form inputs
3. `getByPlaceholderText` for inputs without a label, avoid if possible
4. `getByText` for non-interactive elements
5. `getByTestId`, **last resort**, add `data-testid` only when no semantic selector exists

### Injecting Context

```typescript
render(UserProfile, {
  context: new Map([[USER_CONTEXT_KEY, { name: "Alice", role: "admin" }]]),
});
```

For complex context trees, add a `__fixtures__/` wrapper component that provides every required context and takes the component under test as a snippet.

### Hook Tests (`.svelte.spec.ts`)

Runes in `.svelte.ts` only work inside a component boundary. Add a minimal `__fixtures__/` component that instantiates the hook and exposes its state for assertions.

### Browser Mode

Not adopted. If a test needs real browser APIs that jsdom lacks (`ResizeObserver`, `IntersectionObserver`, `canvas`), use [Vitest Browser Mode](https://vitest.dev/guide/browser/) and name the file `*.browser.spec.ts`.

## Verify Your Work

```
pnpm check    # svelte-check
pnpm test     # vitest unit tests
```
