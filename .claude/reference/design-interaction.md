# Design Interaction

How a pointer gesture on an interactive element should behave: when a press starts a drag,
when it waits, and what a hold or a distance threshold is for. `design-visual-principles.md`
covers the hit-target sizes those elements need. This doc covers the gesture once the pointer
is on the target.

## A hold is a disambiguation cost

A delay before a drag starts exists for one reason: the same press could mean something else,
and the element needs time to tell the two apart. A list row that both selects on tap and
reorders on drag has that problem on touch, where a finger resting for a scroll looks like the
start of a drag. The hold is what buys the disambiguation. It is a cost paid by every drag on
that element, so it is only worth paying where two gestures genuinely compete.

Where nothing competes, the hold buys nothing and reads as a defect. Two engineers testing a
split-view grip with a 250ms hold both reported it as broken, because the press focused the
element and then nothing moved.

## Dedicated handles drag on movement, never on a timer

A grip, splitter, resize bar, scrubber thumb, or reorder handle has dragging as its only job.
Its press has no other meaning to protect, so it starts the drag on pointer-down plus movement
and never waits. A distance threshold of a few pixels is fine, since it filters a twitch and
costs nothing the user can feel. A time threshold is not, since the user is already moving and
the element is not.

"So a quick press still selects" is never a reason to delay a handle. A drag needs movement to
start, so a press that releases without moving was never going to drag, hold or no hold.

## Where a hold belongs

Reserve a hold delay for an element whose press already has a primary action and whose drag
competes with scrolling on touch: a sortable list item that also opens on tap, a card that
both selects and reorders, a tab that both activates and moves. Even there, keep the primary
action instant. The hold gates the drag, not the tap.

Choose the constraint by input, not globally. A pointer with a mouse has no scroll conflict,
so a distance threshold alone serves it. Touch is where the hold earns its place. A library
that lets you set an activation constraint per sensor exists so you can make that split, and a
single delay applied to every sensor is the pattern that produced the grip above.

## Keyboard operation

A handle that only responds to a pointer excludes keyboard users. If `accessibility.md` is
installed, it owns that obligation, and this doc covers only the pointer gesture.
