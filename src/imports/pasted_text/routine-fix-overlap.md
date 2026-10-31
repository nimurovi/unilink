Continue from the existing UniLink Routine design and FIX the overlapping class cards shown in the current design.

IMPORTANT:
Do NOT redesign the Routine page.

Do NOT change:
- UniLink colors
- Typography
- Sidebar
- Header
- Navigation
- Existing components
- Light Mode
- Dark Mode
- Overall visual style
- Existing animations

Only fix the CLASS POSITIONING / LAYOUT so that class cards NEVER overlap each other visually.

==================================================
MAIN PROBLEM
==================================================

The current Routine timetable has overlapping class cards.

For example, some class cards are visually placed on top of other class cards when their times are close or when multiple classes occur at the same time.

This makes the timetable difficult to read.

FIX THIS LAYOUT ISSUE.

==================================================
RULE 1 — CLASS HEIGHT MUST MATCH DURATION
==================================================

The height of every class card must be calculated from its actual start and end time.

Examples:

30 minutes → 1 time slot height

1 hour → 2 time slot heights

1.5 hours → 3 time slot heights

2 hours → 4 time slot heights

Do NOT use arbitrary fixed heights for different classes.

The class card must start exactly at its start time and end exactly at its end time.

==================================================
RULE 2 — CLASSES ON THE SAME DAY MUST NOT OVERLAP
==================================================

If two classes occur on the same day but at different times:

Place them vertically according to their actual time.

Example:

10:00–11:30
Database Management

12:00–1:30
Algorithms

These cards must have separate vertical positions.

There must be a small visual gap between them.

==================================================
RULE 3 — CLASSES AT THE SAME TIME
==================================================

If multiple classes occur at the SAME TIME on the SAME DAY, they must NOT be placed on top of each other.

Instead, display them SIDE-BY-SIDE.

Example:

10:00–11:30

Database Management     Algorithms
     50%                   50%

If 3 classes occur at the same time:

Class A | Class B | Class C
 33%    |   33%   |   33%

If 4 classes occur at the same time:

Class A | Class B | Class C | Class D
  25%   |   25%   |   25%   |   25%

Maintain a small 4–8px gap between simultaneous class cards.

==================================================
RULE 4 — PARTIAL OVERLAPS
==================================================

Handle partial time overlaps correctly.

Example:

Class A:
10:00–12:00

Class B:
11:00–1:00

These classes overlap from 11:00–12:00.

Do NOT place one card directly over the other.

Use side-by-side columns for the overlapping period while maintaining correct start/end positions.

The layout must remain readable and collision-free.

==================================================
RULE 5 — CANCELLED CLASSES
==================================================

Cancelled classes must remain in their correct time position.

Example:

Algorithms
12:00–1:30

CANCELLED

The cancelled class should appear as a faded/muted card with the existing UniLink cancelled styling.

It must NOT overlap another class.

==================================================
RULE 6 — RESCHEDULED CLASSES
==================================================

For rescheduled classes:

Show the class at its NEW time.

Example:

Software Engineering

Originally:
2:00 PM

Rescheduled:
3:00 PM

The card should appear at 3:00 PM, not at 2:00 PM.

Show the existing "Rescheduled" badge and original time as secondary information.

Do NOT create overlapping cards because of the original time.

==================================================
RULE 7 — CURRENT / NEXT CLASS
==================================================

The current or next class can have the existing UniLink blue highlight.

However, the highlight must not change the card's size or position.

Do NOT allow the highlighted card to overlap another class.

==================================================
RULE 8 — TIME GRID
==================================================

Keep the existing time grid.

Use consistent time intervals.

Example:

8 AM
9 AM
10 AM
11 AM
12 PM
1 PM
2 PM
3 PM
4 PM
5 PM

All cards must align precisely with the time grid.

A class beginning at 10:00 AM must start at the 10:00 AM line.

A class beginning at 11:30 AM must begin halfway between the 11 AM and 12 PM positions if the grid supports 30-minute intervals.

==================================================
RULE 9 — DO NOT HIDE CLASSES
==================================================

Never hide a class because another class is occupying the same time.

Never place a class behind another class.

Never allow text from one class to appear inside another class.

Every scheduled class must remain visible.

==================================================
RULE 10 — DESKTOP WEEK VIEW
==================================================

For the desktop Week View:

Keep the existing 7-day timetable.

Use horizontal columns for:

Sunday
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday

Within each day's column:

- Position classes according to their actual time.
- Calculate height from duration.
- Detect simultaneous/overlapping classes.
- Place simultaneous classes side-by-side.
- Keep a small gap between cards.
- Never allow visual collisions.

==================================================
RULE 11 — DESKTOP DAY VIEW
==================================================

In Day View:

Show one day's complete schedule.

If classes have different times:

Stack them vertically.

If classes occur at the same time:

Place them side-by-side.

Example:

12:00–1:30

Algorithms          Theory of Computation
   50%                       50%

Both cards must remain fully readable.

==================================================
RULE 12 — MOBILE VIEW
==================================================

For mobile screens, do NOT use the desktop calendar grid.

Use a vertical timeline.

If two or more classes occur at the same time, stack them vertically under the same time period.

Example:

12:00–1:30

Algorithms
CSE 301
Room 405

Theory of Computation
CSE 302
Room 406

Add a small label:

"Same time"

This prevents horizontal cards from becoming too narrow on mobile.

==================================================
RULE 13 — RESPONSIVE BEHAVIOR
==================================================

Desktop:

Use side-by-side columns for simultaneous classes.

Mobile:

Stack simultaneous classes vertically.

Do NOT squeeze multiple cards into tiny widths on mobile.

==================================================
RULE 14 — SPACING
==================================================

Maintain:

4–8px gap between simultaneous cards.

8–12px minimum visual separation between vertically adjacent cards when possible.

Cards must never touch or overlap.

Keep the existing UniLink border radius, border, shadow, and padding.

==================================================
RULE 15 — TEXT
==================================================

When a card becomes narrow because of simultaneous classes:

Prioritize:

1. Course name
2. Course code
3. Time
4. Room
5. Instructor

Use truncation/ellipsis only when necessary.

Never allow text to spill outside the card.

==================================================
RULE 16 — INTERACTION
==================================================

Keep the existing interactions.

Clicking a class should still open the class details.

Hover should still use the existing UniLink hover animation.

Do NOT change the interaction design.

==================================================
FINAL REQUIREMENT
==================================================

The most important requirement is:

NO CLASS CARD MAY VISUALLY OVERLAP ANOTHER CLASS CARD.

Every class must:

✓ Start at the correct time
✓ End at the correct time
✓ Have height proportional to duration
✓ Remain fully visible
✓ Remain readable
✓ Handle simultaneous classes side-by-side on desktop
✓ Stack simultaneous classes on mobile
✓ Preserve cancelled/rescheduled states
✓ Preserve the existing UniLink design system

Fix the existing Routine screen rather than creating a completely new design.

Do not modify any previously completed UniLink screens.