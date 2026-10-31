Continue building the existing UniLink project from the current Figma design.

IMPORTANT:

This is a new CR Portal module:

CR Portal
→ Academic
→ Assignments

Do NOT redesign or replace:

- UniLink brand
- Existing CR Portal sidebar
- Navigation structure
- Design system
- Colors
- Typography
- Components
- Light Mode
- Dark Mode
- Responsive design
- Animation language

Reuse the existing UniLink visual system and CR Portal components.

==================================================
PAGE PURPOSE
==================================================

Create a modern SaaS-style:

ASSIGNMENTS

page for the Class Representative.

The CR Assignments page should focus on:

- Viewing assignments for their assigned class
- Monitoring upcoming assignment deadlines
- Sharing assignment reminders
- Sharing verified assignment updates
- Highlighting deadline changes
- Helping students stay informed

IMPORTANT:

The CR is NOT the academic authority.

The CR should NOT normally create official assignments.

Official assignments should come from:

Teacher
Department
Authorized academic staff

The CR can coordinate, remind, and share verified information.

==================================================
PAGE HEADER
==================================================

Title:

Assignments

Subtitle:

"Stay updated with assignment deadlines and help your class stay informed."

Show assigned CR context:

CSE
Batch 52
Section B

Use the existing compact UniLink context component.

On the right:

[ Share Reminder ]

Primary action.

Do NOT use:

[ + Create Assignment ]

==================================================
ASSIGNMENT SUMMARY
==================================================

Create compact summary cards using existing UniLink statistics components.

Example:

Upcoming
4

Due This Week
2

Due Tomorrow
1

Completed
8

Keep the cards useful and compact.

Do NOT create unnecessary analytics.

==================================================
UPCOMING ASSIGNMENTS
==================================================

Create:

Upcoming Assignments

Show verified assignments relevant to the CR's assigned class.

Example:

Database Assignment 02

Database Management

CSE 305

Due:

Tomorrow
11:59 PM

Status:

Upcoming

Actions:

[ View Details ]

[ Share Reminder ]


--------------------------------


Algorithm Problem Set 03

Algorithms

CSE 301

Due:

September 5
11:59 PM

Status:

Upcoming

Actions:

[ View Details ]

[ Share Reminder ]


--------------------------------


Software Engineering Report

CSE 310

Due:

September 8

Actions:

[ View Details ]

[ Share Reminder ]

==================================================
ASSIGNMENT SOURCE
==================================================

Clearly show where the assignment information comes from.

Example:

Official Assignment

Created by:

Dr. Rahman

The CR should never appear as the official creator unless explicitly authorized.

==================================================
FILTERS
==================================================

Add filters:

All

Upcoming

Due Soon

Completed

Past Due

Optional:

Course filter

Semester filter

Add a search field:

Search assignments...

Reuse existing UniLink search and filter components.

==================================================
ASSIGNMENT DETAILS
==================================================

Clicking:

[ View Details ]

opens Assignment Details.

Show:

Assignment Title

Course

Course Code

Teacher

Description

Published Date

Deadline

Submission Method

Attachments

Status

Example:

Database Assignment 02

CSE 305

Created by:

Dr. Rahman

Deadline:

Tomorrow
11:59 PM

==================================================
CR ACTION:
SHARE REMINDER
==================================================

The main CR action should be:

[ Share Reminder ]

This should NOT modify the official assignment.

Instead, the CR can share a reminder with their assigned students.

Example:

Assignment Reminder

Database Assignment 02

Due:

Tomorrow
11:59 PM

Optional Message:

"Please remember to submit before the deadline."

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

The CR should not accidentally send reminders to unrelated students.

==================================================
REMINDER PREVIEW
==================================================

Before publishing, show:

Preview

📋 Assignment Reminder

Database Assignment 02

Due Tomorrow at 11:59 PM

Optional CR Message:

"Please remember to submit before the deadline."

Shared by CR

Audience:

CSE
Batch 52
Section B

Actions:

[ Back ]

[ Publish Reminder ]

==================================================
REMINDER SUCCESS
==================================================

After publishing:

✓ Reminder Shared Successfully

Database Assignment 02

Your class has been notified.

[ View Assignment ]

[ View Shared Reminder ]

==================================================
DEADLINE UPDATE
==================================================

Support verified assignment deadline updates.

IMPORTANT:

The CR should NOT independently change an official deadline.

If the deadline is officially updated, the CR may share the verified update.

Example:

Assignment Deadline Updated

Database Assignment 02

Previous Deadline:

September 2
11:59 PM

New Deadline:

September 4
11:59 PM

Source:

Verified Teacher Update

Action:

[ Share Update ]

==================================================
IMPORTANT RULE
==================================================

Clearly distinguish:

OFFICIAL ASSIGNMENT

from:

CR REMINDER

and:

CR-SHARED UPDATE

Example labels:

Official Assignment

Created by Teacher


Reminder Shared by CR


Verified Update Shared by CR

Reuse the existing UniLink badge system.

Do NOT introduce unnecessary new colors.

==================================================
ASSIGNMENT DEADLINE TIMELINE
==================================================

Create a compact:

Upcoming Deadlines

timeline or chronological list.

Example:

Tomorrow

Database Assignment 02
11:59 PM


September 5

Algorithm Problem Set 03
11:59 PM


September 8

Software Engineering Report
11:59 PM

Keep it clean and academic.

==================================================
RECENT CR ACTIVITY
==================================================

Create a compact section:

Recent Assignment Activity

Example:

You shared a reminder:

Database Assignment 02

2 hours ago


You shared an update:

Algorithm Assignment Deadline

Yesterday


You viewed:

Software Engineering Report

2 days ago

Button:

[ View Activity History → ]

==================================================
STUDENT CONNECTION
==================================================

Show the logical flow:

Teacher

↓

Official Assignment

↓

CR views assignment

↓

CR shares reminder

↓

Assigned Section

↓

Student Dashboard

↓

Upcoming Deadlines

↓

Notification

Example student notification:

📋 Assignment Reminder

Database Assignment 02 is due tomorrow at 11:59 PM.

Shared by CR

[ View Assignment ]

==================================================
DO NOT DUPLICATE STUDENT ASSIGNMENT SYSTEM
==================================================

The CR Assignments page should not become a student submission portal.

Do NOT add:

- Assignment file submission
- Student grading
- Grade management
- Teacher evaluation
- Creating official assignments

The CR role is coordination and communication.

==================================================
QUICK ACTIONS
==================================================

Useful actions:

[ View Assignment ]

[ Share Reminder ]

[ Share Verified Update ]

The main action should remain:

Share Reminder

==================================================
LIGHT MODE
==================================================

Use the existing UniLink Light Mode.

Maintain existing:

White
Light Blue
Primary Blue
Deep Navy
Neutral Gray

Do NOT introduce new colors.

==================================================
DARK MODE
==================================================

Create the same page using the existing UniLink Dark Mode.

Do NOT redesign the layout.

Only adapt:

- Background
- Surface
- Text
- Borders
- Shadows
- Active states

==================================================
MOBILE RESPONSIVE DESIGN
==================================================

Create a responsive mobile version around 390px width.

Mobile layout:

- Compact page header
- Summary cards stacked or horizontally scrollable
- Assignment cards vertically stacked
- Search and filters easy to use
- Touch-friendly Share Reminder buttons
- Assignment details in single-column layout

==================================================
INTERACTIONS
==================================================

Assignments

→ View Assignment Details

Share Reminder

→ Reminder Form

Reminder Form

→ Preview

Preview

→ Publish Reminder

Publish

→ Success State

Assignment

→ Share Verified Update

Use subtle transitions consistent with the existing UniLink animation system.

==================================================
FINAL REQUIREMENT
==================================================

The CR Assignments page should feel like:

"A reliable coordination workspace that helps the CR keep their class informed about assignment deadlines."

The CR should immediately understand:

1. Which assignments are upcoming
2. Which deadlines are close
3. Which information is official
4. What reminders they have shared
5. How to inform their assigned class

IMPORTANT:

Do NOT redesign the entire UniLink project.

Do NOT change the CR sidebar.

Do NOT allow the CR to create or modify official assignments without permission.

The CR should coordinate and communicate verified assignment information.

Create this page as a connected part of the existing UniLink CR Portal.