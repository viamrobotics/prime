# Viam Design System Context

prime implements the Viam design system as a Svelte component library. Before writing or reviewing a component, verify its visual treatment, behavior, and naming against the authoritative source rather than guessing.

The design system lives at **https://design.viam.com/guides/intro/** — start there. It documents tokens (color, spacing, typography), interaction patterns, and the canonical components that prime is expected to mirror.

## When to look things up

- Adding a new component or variant — confirm the design system documents an existing pattern before inventing one.
- Naming a prop, variant, or component — match the design system's vocabulary so consumers don't have to learn two names for the same thing.
- A review comment needs to describe expected visual or interaction behavior — quote the design system rather than approximating.

## How to look things up

Use `WebFetch` on `https://design.viam.com/guides/intro/` (or deeper pages under `https://design.viam.com/`) to retrieve the relevant guidance. Limit lookups to 2–3 per session to avoid wasting turns.
