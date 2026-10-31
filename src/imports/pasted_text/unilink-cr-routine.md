Continue building the existing UniLink project from the current Figma design.

IMPORTANT — PRESERVE EXISTING DESIGN

Do NOT redesign, delete, replace, or modify the existing:

- UniLink brand
- Logo
- Design system
- Color palette
- Typography
- Components
- Sidebar
- Navigation
- Light Mode
- Dark Mode
- Animation language
- Student Dashboard
- My Courses
- Course Details
- Student Routine
- CR Portal
- CR Portal navigation

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

Create NEW CR management screens for:

# ROUTINE MANAGEMENT

The CR should be able to create, edit, update, cancel, reschedule, and publish the routine for their assigned section.

Create these as NEW frames/pages inside the existing UniLink Figma project.

==================================================
SCREEN 1 — CR ROUTINE MANAGEMENT
==================================================

Page title:

Routine Management

Subtitle:

"Create and manage the class routine for your section."

Section context:

CSE
Batch 52
Section B
Spring 2026

Clearly show:

Managed by:
Ovi
Class Representative

==================================================
HEADER ACTIONS
==================================================

On the right:

[ + Add Class ]

[ Import Routine ]

[ Publish Changes ]

Primary action:

+ Add Class

==================================================
ROUTINE STATUS
==================================================

Create a compact status area:

Current Routine

Spring 2026

Status:
Published

Last Updated:
Today • 9:42 AM

Last Updated By:
Ovi — CR

Also show:

Pending Changes
2

==================================================
WEEKLY ROUTINE EDITOR
==================================================

Create a professional weekly timetable editor.

Days:

Sunday
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday

Time:

8:00 AM
9:00 AM
10:00 AM
11:00 AM
12:00 PM
1:00 PM
2:00 PM
3:00 PM
4:00 PM
5:00 PM

Reuse the existing UniLink Routine calendar visual language.

==================================================
CLASS BLOCKS
==================================================

Example classes:

Database Management
CSE 305
Sunday
10:00 AM – 11:30 AM
Room 502
Dr. Rahman

Algorithms
CSE 301
Sunday
12:00 PM – 1:30 PM
Room 405
Dr. Karim

Software Engineering
CSE 310
Monday
2:00 PM – 3:30 PM
Room 301
Ms. Sarah

Computer Networks
CSE 307
Tuesday
10:00 AM – 11:30 AM
Room 307
Dr. Ahmed

Artificial Intelligence
CSE 401
Wednesday
11:00 AM – 12:30 PM
Room 401
Dr. Hasan

Operating Systems
CSE 303
Thursday
3:00 PM – 4:30 PM
Room 502
Dr. Rahman

==================================================
CLASS CARD ACTIONS
==================================================

When hovering over a class:

Show subtle actions:

Edit
Duplicate
Cancel

Use existing UniLink icon buttons.

Do not make the interface visually cluttered.

==================================================
ADD CLASS
==================================================

Create an "Add Class" modal/drawer.

Title:

Add Class

Fields:

Course
[ Select Course ]

Course Code
Automatically populated

Instructor
[ Select Instructor ]

Day
[ Select Day ]

Start Time
[ Select Time ]

End Time
[ Select Time ]

Room
[ Select Room ]

Section
B

Buttons:

[ Cancel ]

[ Save Class ]

==================================================
EDIT CLASS
==================================================

Create an Edit Class modal/drawer.

Example:

Edit Class

Database Management

Course:
Database Management

Instructor:
Dr. Rahman

Day:
Sunday

Start:
10:00 AM

End:
11:30 AM

Room:
502

Buttons:

[ Cancel ]

[ Save Changes ]

==================================================
SCHEDULE CONFLICT DETECTION
==================================================

This is a VERY IMPORTANT feature.

The system must visually detect overlapping classes before saving.

Example:

Database Management

10:00 AM – 11:30 AM

and

Algorithms

11:00 AM – 12:30 PM

Conflict:

⚠ Schedule Conflict

These classes overlap from:

11:00 AM – 11:30 AM

Show the conflicting classes clearly.

Do NOT allow the CR to publish a conflicting routine.

Actions:

[ Edit Time ]

[ Cancel ]

==================================================
ROOM CONFLICT
==================================================

Also detect room conflicts.

Example:

Database Management
Room 502
10:00 AM – 11:30 AM

Another class:

Operating Systems
Room 502
10:30 AM – 12:00 PM

Show:

⚠ Room Conflict

Room 502 is already occupied during this time.

Action:

[ Change Room ]

==================================================
INSTRUCTOR CONFLICT
==================================================

Detect instructor conflicts.

Example:

Dr. Rahman

Database Management
10:00 AM – 11:30 AM

Another class:

Operating Systems
11:00 AM – 12:30 PM

Show:

⚠ Instructor Conflict

Dr. Rahman is already scheduled during this time.

Action:

[ Edit Schedule ]

==================================================
CANCEL CLASS
==================================================

When CR chooses Cancel Class, show confirmation modal:

Cancel Class?

Database Management

Sunday
10:00 AM – 11:30 AM
Room 502

Reason:

[ Optional reason ]

Example:

"Class cancelled due to instructor unavailability."

Actions:

[ Keep Class ]

[ Cancel Class ]

After cancellation, show the class in the timetable as:

CANCELLED

Use the existing UniLink status style.

==================================================
RESCHEDULE CLASS
==================================================

Create a reschedule workflow.

Example:

Reschedule Class

Database Management

Current:

Sunday
10:00 AM – 11:30 AM
Room 502

New Schedule:

Day
Tuesday

Start:
2:00 PM

End:
3:30 PM

Room:
605

Reason:
Optional

Before saving, automatically check for conflicts.

Buttons:

[ Cancel ]

[ Save Reschedule ]

==================================================
PENDING CHANGES
==================================================

Create a section:

Pending Changes

Example:

Room Changed

Database Management

502 → 605

Today • 9:30 AM

Status:
Pending Approval

Another:

Class Rescheduled

Algorithms

Sunday → Tuesday

Status:
Pending Approval

Actions:

[ Review ]

[ Edit ]

==================================================
CHANGE PREVIEW
==================================================

Create a review screen before publishing.

Title:

Review Routine Changes

Show:

2 changes will be published.

CHANGE 01

Database Management

Room:
502 → 605

CHANGE 02

Algorithms

Sunday 12:00 PM
→
Tuesday 2:00 PM

Show:

✓ No schedule conflicts

✓ No room conflicts

✓ No instructor conflicts

Buttons:

[ Back to Edit ]

[ Publish Changes ]

==================================================
PUBLISH CONFIRMATION
==================================================

After clicking Publish Changes:

Show confirmation modal:

Publish Routine Changes?

"These changes will become visible to all students in CSE Batch 52 Section B."

Buttons:

[ Cancel ]

[ Publish ]

==================================================
PUBLISHED STATE
==================================================

After publishing:

Show success state:

✓ Routine Updated

"Students in CSE Batch 52 Section B can now see the updated routine."

Show:

Published
Just now

Buttons:

[ View Student Routine ]

[ Done ]

Clicking:

View Student Routine
→
Existing Student Routine screen

==================================================
CHANGE HISTORY
==================================================

Create:

Routine Change History

Show:

Database Management
Room 502 → 605
Updated by Ovi
Today • 9:42 AM

Algorithms
Rescheduled
Sunday → Tuesday
Updated by Ovi
Yesterday

Computer Networks
Class cancelled
Updated by Ovi
Aug 24

Add filters:

All
Room Changes
Rescheduled
Cancelled
Added
Edited

==================================================
IMPORT ROUTINE
==================================================

Create an Import Routine modal.

Title:

Import Routine

Allow:

Upload PDF
Upload Image
Upload Excel

Drag & Drop area:

"Drop your routine file here"

Supported:

PDF
PNG
JPG
XLSX

Show:

[ Upload ]

IMPORTANT:

The imported routine should NOT automatically replace the existing routine.

After upload, show:

Import Preview

Allow the CR to review the extracted schedule before publishing.

Actions:

[ Review ]

[ Cancel ]

==================================================
ROUTINE DRAFT
==================================================

Allow the CR to save changes without publishing.

Status:

Draft

Example:

3 unpublished changes

Buttons:

[ Save Draft ]

[ Continue Editing ]

[ Publish Changes ]

==================================================
SECTION RESTRICTION
==================================================

Clearly communicate:

You are managing:

CSE
Batch 52
Section B

The CR must NOT accidentally edit another section's routine.

Do not provide controls for changing the managed section.

==================================================
PERMISSIONS
==================================================

CR can:

✓ Add classes
✓ Edit classes
✓ Cancel classes
✓ Reschedule classes
✓ Change rooms
✓ Import routine
✓ Save drafts
✓ Submit/publish changes according to approval rules
✓ View change history

CR cannot:

✕ Manage other sections
✕ Manage other departments
✕ Change university-wide routine
✕ Modify student accounts

Keep permissions as a system behavior, not a large visual section.

==================================================
APPROVAL SYSTEM
==================================================

Design the UI to support two possible states:

If department approval is required:

Draft
→ Pending Approval
→ Published

If CR has direct publishing permission:

Draft
→ Published

Make the UI flexible enough to support both workflows.

==================================================
LIGHT MODE
==================================================

Use the existing UniLink Light Mode.

Do NOT introduce new colors.

Reuse:

White
Light Blue
Primary Blue
Deep Navy
Neutral Gray

==================================================
DARK MODE
==================================================

Create the same screens in the existing UniLink Dark Mode.

Do NOT redesign the layout.

Adapt only:

Background
Surface
Text
Borders
Shadows
Active states

==================================================
RESPONSIVE DESIGN
==================================================

Create a mobile version around 390px width.

Do NOT simply shrink the desktop timetable.

Mobile should use:

- Day-based timeline
- Date selector
- Class cards
- Add Class button
- Edit class drawer/modal
- Conflict warnings
- Pending changes list
- Publish action

For overlapping classes on mobile:

Stack them vertically.

Never make multiple class cards so narrow that their content becomes unreadable.

==================================================
INTERACTIONS
==================================================

Create prototype interactions for:

+ Add Class
→ Add Class modal

Class Card
→ Edit Class

Edit
→ Edit Class modal

Delete/Cancel
→ Confirmation modal

Reschedule
→ Reschedule workflow

Save Draft
→ Draft state

Publish Changes
→ Review Changes

Review Changes
→ Publish Confirmation

Publish
→ Published state

View Student Routine
→ Existing Student Routine

Import Routine
→ Import modal

Change History
→ History details

Use subtle UniLink transitions.

==================================================
IMPORTANT — ROUTINE OVERLAP FIX
==================================================

The existing Student Routine had an overlapping class-card problem.

The CR Routine Management interface MUST prevent this problem.

Rules:

1. Classes must be positioned according to their actual start/end times.

2. Class height must represent duration.

3. Different-time classes must be vertically separated.

4. Simultaneous classes must appear side-by-side on desktop.

5. Simultaneous classes must stack vertically on mobile.

6. Partial overlaps must be detected.

7. Room conflicts must be detected.

8. Instructor conflicts must be detected.

9. Conflicting routines must not be publishable.

10. Never hide one class behind another.

==================================================
DESIGN QUALITY
==================================================

The final experience should feel like a professional SaaS management interface.

Maintain:

- Existing UniLink design system
- Existing components
- Existing typography
- Existing colors
- Existing sidebar
- Existing navigation
- Existing Light/Dark themes
- Existing animation language

Avoid:

- Traditional university admin interfaces
- Spreadsheet-like appearance
- Excessive tables
- Excessive cards
- Heavy shadows
- Neon colors
- Excessive gradients
- Cluttered forms
- Gaming-style visuals

The experience should communicate:

"Managing our section routine is simple, safe, and organized."

IMPORTANT:

Create these as NEW CR Routine Management screens.

Do NOT redesign the existing Student Routine.

Do NOT redesign the existing CR Dashboard.

Do NOT duplicate existing screens.

Connect the CR Routine Management interface conceptually and through prototype navigation to the existing Student Routine screen.