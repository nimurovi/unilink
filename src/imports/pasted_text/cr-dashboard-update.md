Continue building the existing UniLink project from the current Figma design.

IMPORTANT:
This is an UPDATE to the existing CR Dashboard.

Do NOT redesign or replace:

- UniLink brand
- Existing CR Dashboard layout
- Existing design system
- Colors
- Typography
- Sidebar
- Navigation structure
- Components
- Light Mode
- Dark Mode
- Responsive system
- Animation language

Do NOT create a completely new CR Dashboard.

Instead, improve the EXISTING CR Dashboard so it better reflects the real responsibilities and daily workflow of a Class Representative.

Reuse all existing UniLink components and visual language.

==================================================
CR DASHBOARD PURPOSE
==================================================

The CR Dashboard should answer:

"What does the Class Representative need to manage for their class today?"

The CR is responsible for helping coordinate academic and class-related information for their assigned students.

Typical CR activities include:

- Sharing class updates
- Managing routine updates
- Sharing class schedule changes
- Informing students about room changes
- Informing students about class cancellations
- Informing students about extra classes
- Sharing class notes/materials
- Sharing relevant events
- Sharing event registration links
- Coordinating information for their assigned batch and section

The CR is NOT a university administrator.

The CR Dashboard should feel like a practical class coordination workspace.

==================================================
CR IDENTITY / CONTEXT
==================================================

At the top of the existing dashboard, clearly show the CR's assigned context.

Example:

Class Representative

CSE
Batch 52
Section B

Optional subtitle:

"Manage updates and information for your class."

This context should remain visible but compact.

Do NOT make it look like a large profile page.

==================================================
QUICK OVERVIEW
==================================================

Update or enhance the existing summary cards.

Use the existing UniLink statistics-card component.

Example:

Today's Classes
4

Active Updates
2

Upcoming Events
3

Materials Shared
12

Optional:

Pending Notes
5

Keep the cards compact.

Do NOT create too many statistics cards.

Prioritize the most useful CR information.

==================================================
QUICK ACTIONS
==================================================

Add a prominent Quick Actions section.

Use the existing UniLink button/component style.

Primary actions:

[ Post Class Update ]

[ Update Routine ]

[ Upload Class Note ]

[ Share Event ]

Optional secondary action:

[ Create Announcement ]

These actions should be easy to access without scrolling far down the page.

==================================================
POST CLASS UPDATE
==================================================

The most important CR action should be:

[ Post Class Update ]

Example update types:

Class Delayed

Class Cancelled

Room Changed

Extra Class

Schedule Changed

General Class Information

Example:

CSE 305

Class Delayed

Previous Time:
10:00 AM

New Time:
11:00 AM

Posted by:
CR

Audience:

CSE
Batch 52
Section B

==================================================
TARGET AUDIENCE
==================================================

Do NOT create a large separate Audience Management page.

Instead, use a simple Target Audience component inside publishing forms.

The default audience should automatically be:

CSE
Batch 52
Section B

Show:

🔒 Assigned Class Audience

The CR should normally publish updates only to their assigned class/group.

Example:

Target Audience

✓ CSE
✓ Batch 52
✓ Section B

Automatically assigned

This prevents the CR from accidentally sending information to unrelated students.

==================================================
TODAY'S CLASSES
==================================================

Create or improve the existing Today's Classes section.

Show the CR's assigned section schedule.

Example:

TODAY'S CLASSES

10:00 AM

Database Management

CSE 305

Room 502

--------------------

12:00 PM

Algorithms

CSE 301

Room 405

--------------------

2:00 PM

Software Engineering

CSE 310

Room 302

Actions:

[ View Routine ]

Keep this section compact and easy to scan.

==================================================
RECENT CLASS UPDATES
==================================================

Create or improve:

Recent Class Updates

Example:

CSE 305

⚠ Class Delayed

10:00 AM → 11:00 AM

Published 10 minutes ago


CSE 307

📍 Room Changed

402 → 405

Published Yesterday


CSE 301

📅 Extra Class

Thursday • 2:00 PM

Published Aug 30

Button:

[ View All Updates → ]

Use the existing UniLink status and activity components.

==================================================
EVENTS TO SHARE
==================================================

Create:

Events to Share

This reflects the real CR workflow.

CRs often receive information about university, department, or club events and share relevant events with their class.

Example:

Hackathon 2026

September 15

Auditorium

Registration Open

[ Share with Section ]

Another example:

AI Workshop

September 18

Innovation Lab

Registration Link Available

[ Share with Section ]

When shared, students should see:

Shared by CR

The CR should be sharing an existing event rather than creating an official university event unless they have permission.

==================================================
SHARE EVENT FLOW
==================================================

Prototype:

Events to Share

↓

Select Event

↓

Share with Assigned Section

↓

Optional Message

Example:

"Registration is now open. Interested students can register before Sep 10."

↓

Publish

↓

Students receive:

Event shared by CR

[ View Event ]

==================================================
CLASS MATERIALS
==================================================

Add or improve a compact Class Materials overview.

Show:

Official Materials
12

Class Notes
8

Student Notes
24

Pending Review
5

Use the existing UniLink statistics or summary components.

Clearly distinguish:

Official Material
Uploaded by Teacher

Class Note
Uploaded by CR

Student Note
Uploaded by Student

==================================================
RECENT ACTIVITY
==================================================

Create a compact Recent Activity section.

Example:

You shared:

Hackathon 2026

20 minutes ago


You updated:

CSE 305 Class Time

Yesterday


You uploaded:

Database Normalization Notes

2 days ago

Button:

[ View Activity History → ]

==================================================
CR ACTIVITY HISTORY
==================================================

The dashboard should support a future Activity History page.

Activities include:

- Class Update Published
- Routine Updated
- Material Uploaded
- Event Shared
- Announcement Published

Example:

Class Update Published

CSE 305

Today • 10:30 AM

Status:

Published

Do not build a complicated analytics dashboard.

Keep it as a simple activity log.

==================================================
IMPORTANT INFORMATION SOURCE LABELS
==================================================

CR-created information should clearly display:

Posted by CR

Example:

Class Update

CSE 305 delayed to 11:00 AM

Posted by CR

This is important because students must understand the source of information.

Source types across UniLink include:

Teacher
CR
University/Admin
Club
System

Reuse the existing UniLink badge/label system.

Do NOT introduce unnecessary new colors.

==================================================
STUDENT CONNECTION
==================================================

The CR Dashboard must connect logically with the Student Portal.

Flow:

CR
↓

Post Class Update

↓

Assigned Section

↓

Student Dashboard

↓

Class Updates

↓

Notification

Example student notification:

CSE 305 — Class Update

Today's class delayed to 11:00 AM

Posted by CR

==================================================
EVENT CONNECTION
==================================================

Flow:

University / Department / Club

↓

Event Created

↓

CR discovers relevant event

↓

Share with Section

↓

Student Dashboard

↓

Upcoming Events

↓

Student views event

↓

Register

The CR may add an optional message when sharing an event.

Example:

"Good opportunity for CSE students. Registration closes Friday."

==================================================
MATERIAL CONNECTION
==================================================

Flow:

Teacher

↓

Official Material


CR

↓

Class Note


Student

↓

Student Note

↓

Pending Review

↓

Approved

The CR Dashboard may show summary information but should not duplicate the full Materials page.

==================================================
DASHBOARD INFORMATION PRIORITY
==================================================

Arrange information based on CR daily importance.

Recommended order:

1. CR Identity / Assigned Class
2. Quick Overview
3. Quick Actions
4. Today's Classes
5. Recent Class Updates
6. Events to Share
7. Class Materials Summary
8. Recent Activity

Do NOT overcrowd the dashboard.

Use whitespace and existing UniLink spacing rules.

==================================================
WHAT NOT TO CHANGE
==================================================

Do NOT:

- Redesign the UniLink system
- Create a new sidebar
- Change existing navigation
- Change brand colors
- Add neon colors
- Add heavy gradients
- Add excessive shadows
- Turn the dashboard into an admin analytics panel
- Add unnecessary charts
- Make the CR look like a university administrator
- Create a social media feed

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

Update the same CR Dashboard using the existing UniLink Dark Mode.

Do NOT redesign the layout.

Only adapt:

- Background
- Surface colors
- Text
- Borders
- Shadows
- Active states

==================================================
RESPONSIVE DESIGN
==================================================

Create/update the mobile CR Dashboard around 390px width.

Mobile layout:

- Compact CR identity
- Summary cards in a usable layout
- Quick Actions horizontally scrollable or stacked
- Today's Classes as vertical list
- Recent Class Updates stacked
- Events to Share stacked
- Touch-friendly action buttons

Do NOT squeeze desktop components into mobile.

==================================================
INTERACTIONS
==================================================

Add prototype interactions for:

Post Class Update
→ Create Update

Update Routine
→ Routine Management

Upload Class Note
→ Upload Material

Share Event
→ Select Event
→ Share with Section

View All Updates
→ Class Updates

View Routine
→ Routine Management

View Activity History
→ Activity History

Use subtle transitions consistent with the existing UniLink animation system.

==================================================
FINAL DESIGN REQUIREMENT
==================================================

The updated CR Dashboard should feel like:

"A simple workspace that helps a Class Representative coordinate class information quickly and reliably."

The CR should immediately understand:

What classes are happening today

What updates have been published

What information needs attention

What events can be shared

What materials are available

Who their updates will reach

IMPORTANT:

This is an enhancement of the existing CR Dashboard.

Do NOT redesign the whole UniLink project.

Do NOT replace existing UniLink components.

Reuse the current design system and improve the dashboard based on real CR activities.