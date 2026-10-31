Continue building the existing UniLink project from the current Figma design.

IMPORTANT:

This is a new CR Portal page/module.

Create:

CR Portal → Academic → Routine

Do NOT redesign or replace:

- UniLink brand
- Existing design system
- Colors
- Typography
- Sidebar
- Navigation structure
- Existing components
- Light Mode
- Dark Mode
- Responsive system
- Animation language

Reuse the existing UniLink CR Portal sidebar and visual language.

==================================================
PAGE PURPOSE
==================================================

Create a modern SaaS-style:

ROUTINE MANAGEMENT

page for the Class Representative.

The purpose is to help the CR:

- View the official class routine
- See today's classes
- Identify upcoming classes
- Share temporary class schedule updates
- Share room changes
- Share extra classes
- Share verified temporary schedule information

IMPORTANT:

The CR must NOT freely overwrite the official permanent university routine.

The official routine remains separate from temporary class updates.

==================================================
PAGE HEADER
==================================================

Title:

Routine

Subtitle:

"View your class schedule and manage verified temporary class updates."

Show the CR context clearly:

CSE
Batch 52
Section B

Use the existing compact context component.

On the right:

[ View Student Routine ]

Primary action:

[ + Post Class Update ]

Do NOT use wording such as:

Edit Official Routine

unless the CR has explicit permission.

==================================================
ROUTINE SUMMARY
==================================================

At the top, create compact summary cards using the existing UniLink statistics components.

Example:

Today's Classes
4

Next Class
10:00 AM

This Week
18 Classes

Active Updates
2

Keep the cards compact.

Do not create unnecessary analytics.

==================================================
TODAY'S CLASSES
==================================================

Create:

Today's Classes

Show the class schedule in chronological order.

Example:

10:00 AM – 11:30 AM

Database Management

CSE 305

Room 502

Status:

Upcoming

--------------------------------

12:00 PM – 1:30 PM

Algorithms

CSE 301

Room 405

Status:

Upcoming

--------------------------------

2:00 PM – 3:30 PM

Software Engineering

CSE 310

Room 302

Status:

Scheduled

Each class should clearly show:

- Course name
- Course code
- Start time
- End time
- Room
- Status

Use a clean academic schedule layout.

Avoid overlapping class cards.

==================================================
OFFICIAL WEEKLY ROUTINE
==================================================

Create:

Official Weekly Routine

Display a weekly timetable.

Days:

Sunday
Monday
Tuesday
Wednesday
Thursday

Show time slots clearly.

Example:

Sunday

10:00 AM
Database Management
CSE 305
Room 502

12:00 PM
Algorithms
CSE 301
Room 405

Tuesday

10:00 AM
Database Management
CSE 305
Room 502

2:00 PM
Software Engineering
CSE 310
Room 302

IMPORTANT:

The timetable must NOT have overlapping class cards.

Each class must remain inside its correct:

- Day column
- Time range

If two classes happen at different times, position them correctly on the vertical time scale.

Maintain enough spacing between classes.

The visual design must remain readable.

==================================================
OFFICIAL ROUTINE LABEL
==================================================

Clearly show that this is:

Official Routine

Example badge:

Official

Verified university schedule

The CR should understand that this routine cannot normally be permanently modified.

==================================================
TEMPORARY CLASS UPDATES
==================================================

Create a section:

Temporary Class Updates

This shows changes that temporarily affect the routine.

Examples:

CSE 305

Class Delayed

Today

10:00 AM → 11:00 AM

Posted by CR

Status:

Active


--------------------------------


CSE 307

Room Changed

Today

Room 402 → Room 405

Posted by CR

Status:

Active


--------------------------------


CSE 301

Extra Class

Thursday

2:00 PM – 3:30 PM

Room 302

Posted by CR

Status:

Scheduled

==================================================
UPDATE TYPES
==================================================

The CR can create the following temporary updates:

Class Delayed

Class Cancelled

Room Changed

Extra Class

Schedule Changed

General Class Information

These updates should connect with the existing:

CR Portal → Class Updates

module.

Do not duplicate unrelated functionality.

==================================================
POST CLASS UPDATE
==================================================

When the CR clicks:

[ + Post Class Update ]

Open the existing Class Update creation flow.

Allow:

Update Type

Course

Date

Original Time

New Time

Original Room

New Room

Description

==================================================
TARGET AUDIENCE
==================================================

Automatically assign:

CSE
Batch 52
Section B

Show:

Target Audience

✓ CSE
✓ Batch 52
✓ Section B

🔒 Assigned Class Audience

The CR should not accidentally publish to unrelated students.

==================================================
VERIFICATION / TRUST
==================================================

Add a subtle reminder before publishing a temporary routine-related update.

Example:

Please confirm this update has been verified.

☐ I confirm this class information is accurate.

Do not make the interface overly restrictive.

Keep the experience simple and professional.

==================================================
ACTIVE ROUTINE CHANGES
==================================================

Create a clear section or filter:

Active Changes

Show temporary changes currently affecting students.

Example:

Today

CSE 305

Class delayed

10:00 AM → 11:00 AM

Active until class ends

Actions:

[ View ]

[ Edit ]

[ Cancel Update ]

==================================================
UPCOMING CHANGES
==================================================

Create:

Upcoming Changes

Example:

Extra Class

CSE 301

Thursday • 2:00 PM

Room 302

Status:

Scheduled

==================================================
ROUTINE UPDATE HISTORY
==================================================

Create access to:

Routine Update History

Example activity:

Class delayed

CSE 305

Aug 31 • 9:30 AM

Published


Room changed

CSE 307

Aug 29 • 4:15 PM

Published


Extra class added

CSE 301

Aug 27 • 2:00 PM

Published

Button:

[ View Full History → ]

Do not turn this into an analytics page.

Keep it as a clean activity history.

==================================================
STUDENT CONNECTION
==================================================

Show the logical connection between CR routine updates and students.

Flow:

Official Routine

↓

CR posts verified temporary update

↓

Affected class/section

↓

Student Dashboard

↓

Today's Classes / Class Updates

↓

Notification

Example student notification:

CSE 305 — Class Update

Today's class starts at 11:00 AM instead of 10:00 AM.

Posted by CR

==================================================
ROUTINE VISUAL STATES
==================================================

Support clear routine states:

Official

Temporary Update Active

Updated

Cancelled

Upcoming Change

Use the existing UniLink badge and status system.

Do NOT introduce unnecessary colors.

==================================================
QUICK ACTIONS
==================================================

Provide compact actions where appropriate:

[ View Full Routine ]

[ Post Class Update ]

[ View Active Changes ]

[ View Update History ]

Reuse existing UniLink buttons.

==================================================
IMPORTANT DESIGN RULES
==================================================

The Routine page must clearly distinguish:

OFFICIAL ROUTINE

from:

TEMPORARY CLASS UPDATES

The CR should feel:

"I can coordinate verified class changes without accidentally changing the official university routine."

==================================================
LIGHT MODE
==================================================

Use the existing UniLink Light Mode.

Maintain:

White
Light Blue
Primary Blue
Deep Navy
Neutral Gray

Do NOT introduce new colors.

==================================================
DARK MODE
==================================================

Create the same Routine Management page in the existing UniLink Dark Mode.

Do NOT redesign the layout.

Only adapt:

- Background
- Surfaces
- Text
- Borders
- Shadows
- Active states

==================================================
MOBILE RESPONSIVE DESIGN
==================================================

Create a mobile version around 390px width.

Mobile Routine page:

- Compact header
- Summary cards scroll or stack cleanly
- Today's Classes displayed vertically
- Weekly timetable must remain readable
- Use horizontal scrolling for the weekly timetable if needed
- Temporary updates displayed as stacked cards
- Touch-friendly buttons
- No overlapping schedule elements

==================================================
INTERACTIONS
==================================================

Add prototype interactions:

Routine
→ Today's Classes

Routine
→ Weekly Routine

Post Class Update
→ Class Update Form

Class Update Form
→ Preview

Preview
→ Publish

Publish
→ Student Notification / Success State

Temporary Update
→ Edit

Temporary Update
→ Cancel

View Update History
→ Activity History

Use subtle transitions consistent with the existing UniLink animation system.

==================================================
FINAL REQUIREMENT
==================================================

The final page should feel like a professional academic coordination workspace.

The CR should immediately understand:

1. What the official routine is
2. What classes are happening today
3. What temporary changes are active
4. What upcoming changes have been scheduled
5. How their updates affect students

IMPORTANT:

Do NOT redesign the entire UniLink project.

Do NOT change the existing CR sidebar.

Do NOT allow the CR to freely overwrite the official permanent routine.

Create the Routine Management page as a connected part of the existing UniLink CR Portal.