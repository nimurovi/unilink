Continue building the existing UniLink project from the current Figma design.

IMPORTANT:

This is a targeted refinement of the existing CR Portal → Routine page.

Do NOT redesign:

- UniLink brand
- Existing CR Portal
- Sidebar
- Navigation structure
- Colors
- Typography
- Components
- Light Mode
- Dark Mode
- Responsive system
- Animation language

Reuse the existing UniLink design system.

==================================================
REMOVE DUPLICATE FUNCTIONALITY
==================================================

The CR Portal already has a dedicated:

Class Updates

module.

Therefore, the Routine page should NOT duplicate Class Updates functionality.

Remove the following from the Routine page:

- + Post Class Update button
- Class Update creation form
- Duplicate update publishing flow
- Duplicate edit/update management
- Duplicate delete/cancel management

Class Updates should remain the primary place where CRs create and manage class updates.

==================================================
ROUTINE PAGE PURPOSE
==================================================

The Routine page should focus only on:

- Viewing today's classes
- Viewing the official weekly routine
- Viewing active temporary routine-related changes
- Viewing upcoming schedule changes

The Routine page should be primarily a schedule and information view.

==================================================
ROUTINE PAGE STRUCTURE
==================================================

PAGE HEADER

Title:

Routine

Subtitle:

"View your class schedule and current routine changes."

Show CR context:

CSE
Batch 52
Section B

==================================================
REMOVE PRIMARY POST BUTTON
==================================================

Remove:

[ + Post Class Update ]

from the Routine page.

Do not replace it with another duplicate publishing button.

==================================================
TODAY'S CLASSES
==================================================

Keep:

Today's Classes

Show classes chronologically.

Example:

10:00 AM – 11:30 AM

Database Management

CSE 305

Room 502

Status:

Upcoming


12:00 PM – 1:30 PM

Algorithms

CSE 301

Room 405

==================================================
OFFICIAL WEEKLY ROUTINE
==================================================

Keep:

Official Weekly Routine

Clearly label:

Official Routine

Verified university schedule

The CR should not be able to freely edit the official routine.

Maintain a clean weekly timetable.

IMPORTANT:

Do not allow overlapping class cards.

Each class must remain correctly positioned according to:

- Day
- Start time
- End time

==================================================
TEMPORARY CHANGES
==================================================

Create or keep:

Temporary Changes

This section should DISPLAY relevant class updates.

Example:

CSE 305

Class Delayed

Today

10:00 AM → 11:00 AM

Posted by CR

Status:

Active

Action:

[ View Update → ]


Another example:

CSE 307

Room Changed

Room 402 → Room 405

Status:

Active

Action:

[ View Update → ]

==================================================
IMPORTANT NAVIGATION
==================================================

When the CR clicks:

[ View Update → ]

navigate to:

CR Portal
→ Class Updates
→ Selected Update Details

Do NOT open a duplicate update editing interface inside Routine.

==================================================
UPCOMING CHANGES
==================================================

Create:

Upcoming Changes

Example:

CSE 301

Extra Class

Thursday

2:00 PM – 3:30 PM

Room 302

Status:

Scheduled

Action:

[ View Update → ]

==================================================
CLASS UPDATES CONNECTION
==================================================

Add a subtle informational connection where appropriate.

Example:

Routine changes are managed through Class Updates.

[ Go to Class Updates → ]

This should be a secondary link, not a large primary action.

==================================================
FINAL RESPONSIBILITY SEPARATION
==================================================

The CR Portal should follow this structure:

ROUTINE

Purpose:

View schedule information

Includes:

- Today's Classes
- Official Weekly Routine
- Temporary Changes
- Upcoming Changes


CLASS UPDATES

Purpose:

Create and manage class-related updates

Includes:

- Post Class Update
- Update Types
- Drafts
- Scheduled Updates
- Active Updates
- Published Updates
- Edit Updates
- Cancel Updates
- Update History

==================================================
DASHBOARD QUICK ACTION
==================================================

Keep:

[ Post Class Update ]

as a Quick Action on the CR Dashboard.

This Quick Action should navigate directly to:

Class Updates
→ Create Update

Do NOT create another update system.

==================================================
LIGHT MODE
==================================================

Preserve the existing UniLink Light Mode.

Do NOT introduce new colors.

==================================================
DARK MODE
==================================================

Update the same refinement in the existing Dark Mode.

Do not redesign the layout.

==================================================
MOBILE
==================================================

Update mobile Routine page around 390px width.

Show:

- Today's Classes vertically
- Weekly Routine with horizontal scrolling if necessary
- Temporary Changes as stacked cards
- View Update actions

Do NOT include:

Post Class Update

on the Routine mobile page.

==================================================
INTERACTIONS
==================================================

Routine
→ View Temporary Change
→ Class Updates
→ Selected Update Details

Routine
→ Go to Class Updates
→ Class Updates Management

Use existing UniLink transitions.

==================================================
FINAL REQUIREMENT
==================================================

The Routine page should answer:

"What is my class schedule and what changes currently affect it?"

The Class Updates page should answer:

"What class information do I need to publish or manage?"

Remove all duplicate update creation and management functionality from Routine.

Preserve the existing UniLink design system and existing CR Portal.