# Design Layout

How to lay a screen out: fluid grids, container queries, grouping, whitespace, sticky
positioning, and target sizing. `design-visual-principles.md` covers the checkable thresholds
(contrast, hit targets, type scale, spacing rhythm) that apply everywhere. This doc covers
the layout decisions that produce a screen those thresholds get applied to.

## Fluid grids

A fixed pixel width defeats both CSS Grid and Flexbox. It replaces a browser calculation
that adapts to the available space with a number that is only ever correct at one viewport
width. Every other width either overflows the container or leaves dead space.

CSS Grid's `minmax()` gives a track a floor and a ceiling instead of a single value:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
```

`auto-fit` collapses empty tracks so the remaining cards stretch to fill the row.
`auto-fill` keeps the empty tracks in place, which matters when the cards must stay a fixed
size and the layout should leave gaps instead of stretching them. Pick `auto-fit` unless a
fixed card size is a real requirement.

Flexbox solves the same problem with intrinsic sizing:

```css
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.toolbar > * {
  flex: 1 1 12rem;
}
```

`flex: 1 1 12rem` gives each item a 12rem basis, lets it grow to fill remaining space, and
lets it shrink below that basis before wrapping. None of the three grid or flex properties
above name a viewport. That is the property that makes the layout fluid.

## Container queries

Container queries let a component's style respond to the size of the element containing
it, not the size of the viewport. That is the fix for a card that needs one layout in a wide
sidebar and another in a narrow one, regardless of how wide the browser window is.

Size queries reached Baseline Widely Available on 2025-08-14, with Chrome 105+, Firefox
110+, and Safari 16+, covering over 93% of global browser usage. That tier is safe to ship
without a fallback.

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 24rem) {
  .card {
    grid-template-columns: 8rem 1fr;
  }
}
```

`container-type: inline-size` is what makes the element queryable. The `@container` rule
then reads that element's inline size, not the viewport's.

Two other container query features are not the same tier and do not share that support
window. Style queries, which match a custom property value on the container rather than its
size, need Chrome 111+ and Safari 18+, and only reached Firefox at 128+. Scroll-state
queries, which match a container's scroll position or snap state, need Chrome 133+ and have
no Firefox or Safari support as of this writing. Shipping a style or scroll-state query on
the assumption that it has the same reach as a size query is the mistake to avoid. Check
which of the three a given `@container` rule uses before treating it as production-safe.

## Grouping and rhythm

A grid of same-sized cells with no grouping reads as a wall of numbers, because nothing in
the layout tells the eye where one dataset ends and another begins. Group related cells
together, and let the grouping itself, not a heavier border or a color change, carry the
signal of where a set of related data stops.

Vary cell size inside a grid so it does not read as a uniform grid of identical boxes. A
summary total or a single trend line earns a larger cell than a row of individual data
points, because its size on the page is itself a claim about its importance.

Put the item the user needs first, or the one that changes most often, where the eye lands
first. In left-to-right reading order that is the top left of the layout, not the center or
the bottom of a scrolling page.

## Whitespace

Space between groups reduces the work of finding a boundary, the same way a paragraph break
does in text. A reader scanning a screen uses the gap, not a rule or a background change, to
tell where one group of related content ends and the next begins.

Use the spacing scale for that gap, the same scale `design-visual-principles.md`'s spacing rhythm
section covers. A gap that is off the scale reads as an accident whether or not it happens
to look right, for the same reason any other off-scale value does.

## Sticky positioning

`position: sticky` keeps a header, a toolbar, or a set of actions on screen while the
content under it scrolls:

```css
.table-header {
  position: sticky;
  top: 0;
}
```

The tradeoff is permanent, not situational. A sticky header occupies its height on every
scroll position, not just at the top of the page, so the content area is always shorter by
that amount. That cost is worst on a short viewport, where the sticky header is a larger
fraction of the available height to begin with. On a phone with an on-screen keyboard open,
a sticky header stacked on top of the keyboard can leave very little of the actual content
visible. Reserve sticky positioning for the header or actions that earn their permanent
share of the viewport, and test the layout with the keyboard open on the shortest viewport
the design has to support.

## Target sizing

Two WCAG criteria cover interactive target size, and they are not two versions of the same
minimum.

**WCAG 2.5.8 Target Size (Minimum)**, Level AA, sets the conformance floor at **24 by 24 CSS
pixels**, with a spacing exception that can let a smaller target pass. `design-visual-principles.md`
documents this criterion and all four of its exceptions, and `design-checks.mts` enforces
the 24px floor. Read that doc for the exceptions rather than re-deriving them here.

**WCAG 2.5.5 Target Size (Enhanced)**, Level AAA, sets a higher bar at **44 by 44 CSS
pixels**, and it carries no spacing exception. Treat 24 as the gate every target must clear
and 44 as the size worth reaching on primary, frequently tapped controls, such as a submit
button or a primary navigation item. A target that clears 24 but not 44 is conformant, not
wrong. It is only a candidate for enlarging where it is the primary action on the screen.
