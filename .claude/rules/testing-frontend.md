---
paths:
  - "**/*.spec.ts"
---

# Frontend Testing (Vitest)

## Static Analysis

Run on every commit:

| Language   | Tools                                                                                |
| ---------- | ------------------------------------------------------------------------------------ |
| TypeScript | ESLint (`@typescript-eslint`), Prettier — run via `pnpm lint`                        |
| Svelte     | `svelte-check`, ESLint (`eslint-plugin-svelte`) — run via `pnpm check` / `pnpm lint` |

## TypeScript Unit Tests

Test pure functions, business logic, and utilities in isolation. Use real implementations for pure functions — mock only I/O boundaries.

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
    { input: [10], expected: 10 },
  ])("returns $expected for $input", ({ input, expected }) => {
    expect(Subject.calculateTotal(input)).toBe(expected);
  });
});
```

## TypeScript Integration Tests

Integration tests verify multiple modules working together. Use real implementations; mock only external I/O boundaries (network, file system, time).

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

Reset mocks between tests with `vi.clearAllMocks()` in `beforeEach`, or configure `clearMocks: true` in `vitest.config.ts`.

## Svelte Component Tests (`*.svelte.spec.ts`)

Use [@testing-library/svelte](https://testing-library.com/docs/svelte-testing-library/intro) for component testing.

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

### Query Priority

1. `getByRole` — **preferred**; mirrors how users and assistive technology see the page
2. `getByLabelText` — form inputs
3. `getByPlaceholderText` — inputs without a label (avoid if possible)
4. `getByText` — non-interactive elements
5. `getByTestId` — **last resort only**; add `data-testid` when no semantic selector exists

### Injecting Context

Pass a `context` map when the component under test depends on Svelte context:

```typescript
import { render } from "@testing-library/svelte";
import UserProfile from "../UserProfile.svelte";
import { USER_CONTEXT_KEY } from "../user-context.svelte";

render(UserProfile, {
  context: new Map([[USER_CONTEXT_KEY, { name: "Alice", role: "admin" }]]),
});
```

For complex context trees, create a `__fixtures__/` wrapper component that provides all required contexts and accepts the component under test as a snippet.

### Hook Tests (`.svelte.spec.ts`)

Hooks using runes (`.svelte.ts`) must be tested inside a Svelte component boundary. Create a minimal fixture component in `__fixtures__/` that instantiates the hook and exposes its state for assertions.

### Browser Mode

Not currently adopted. If you need real browser APIs unavailable in jsdom (`ResizeObserver`, `IntersectionObserver`, `canvas`), use [Vitest Browser Mode](https://vitest.dev/guide/browser/) and name the file `*.browser.spec.ts`.

## Verify Your Work

```
pnpm check    # svelte-check
pnpm test     # vitest unit tests
```
