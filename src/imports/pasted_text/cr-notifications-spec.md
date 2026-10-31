Continue building the existing UniLink CR Portal from the current Figma design.

IMPORTANT:
Do NOT redesign or replace the existing UniLink brand, design system, colors, typography, sidebar, navigation, components, Light Mode, Dark Mode, responsive system, or animation language.

Reuse the existing UniLink components and visual language.

The following CR Portal modules are already designed and MUST NOT be redesigned:

- Dashboard
- Routine
- Class Materials
- Assignments
- Exams
- Class Updates
- Events
- External Event Submission

This task is ONLY for:

CR Portal → Notifications

==================================================
CR NOTIFICATIONS — PURPOSE
==================================================

Create a notification center specifically for the Class Representative.

The purpose is to help the CR quickly understand:

- What happened to their class
- What happened to their published updates
- What happened to their event submissions
- What happened to shared events
- What requires CR attention
- Important university/department information

This is NOT a management dashboard.

Do not add statistics-heavy sections.

Do not duplicate the full functionality of Routine, Assignments, Exams, Events, or Class Updates.

Notifications should act as an organized inbox.

==================================================
PAGE HEADER
==================================================

Title:

Notifications

Subtitle:

"Stay updated on your class coordination and important activities."

On the right:

[ Mark all as read ]

==================================================
NOTIFICATION SUMMARY
==================================================

At the top create a compact summary area:

All
12

Unread
5

Action Required
2

Use existing UniLink compact statistics/badge components.

Keep this section subtle.

Do NOT make it look like a large analytics dashboard.

==================================================
FILTERS
==================================================

Create notification filters:

All
Unread
Action Required

Optional category filters:

Class
Routine
Events
Assignments
Exams
System

Use the existing UniLink segmented/filter components.

==================================================
NOTIFICATION LIST
==================================================

Create a clean chronological notification feed.

Group notifications by:

Today

Yesterday

Earlier

Use existing UniLink list/card components.

Each notification should contain:

- Icon
- Title
- Short description
- Source
- Timestamp
- Read/unread state
- Optional action
- Optional priority/status badge

==================================================
NOTIFICATION TYPES
==================================================

Support the following notification types.

----------------------------------------
1. CLASS UPDATE
----------------------------------------

Example:

⚠️

CSE 305 Class Update

Today's Database Management class has been delayed to 11:00 AM.

Source:
Class Update

10 minutes ago

[View Update]

If unread:

Use the existing UniLink unread indicator.

Do not use excessive warning colors.

----------------------------------------
2. ROUTINE UPDATE
----------------------------------------

Example:

📅

Routine Updated

Your CSE 305 class schedule has been updated.

Sunday
10:00 AM → 11:00 AM

1 hour ago

[View Routine]

----------------------------------------
3. EVENT SUBMISSION — PENDING
----------------------------------------

Example:

🎓

Event Submitted

AI & Machine Learning Workshop has been submitted for review.

Status:
Pending Review

2 hours ago

[View Submission]

----------------------------------------
4. EVENT SUBMISSION — APPROVED
----------------------------------------

Example:

✓

Event Approved

AI & Machine Learning Workshop has been approved and added to Global Events.

Yesterday

[View Event]

Use the existing UniLink success/status component.

----------------------------------------
5. EVENT SUBMISSION — REJECTED
----------------------------------------

Example:

!

Event Submission Needs Attention

AI & Machine Learning Workshop was not approved.

Reason:
Event information could not be verified.

[View Reason]

[Edit Submission]

Mark this as:

Action Required

Use existing UniLink status styling.

----------------------------------------
6. EVENT SHARED
----------------------------------------

Example:

📢

Event Shared Successfully

Hackathon 2026 was shared with:

CSE
Batch 52
Section B

42 students were notified.

Yesterday

[View Event]

----------------------------------------
7. MATERIAL STATUS
----------------------------------------

If the CR uploads a class note and moderation is enabled:

Example:

📚

Class Note Approved

Database Design Notes are now available to your class.

Status:
Approved

Yesterday

[View Material]

If rejected:

Class Note Rejected

Please review the reason.

[View Reason]

----------------------------------------
8. ASSIGNMENT REMINDER
----------------------------------------

Example:

📝

Assignment Reminder Sent

Database Assignment 02 reminder was sent to your section.

42 students notified.

Yesterday

[View Assignment]

This is a confirmation notification, not an assignment-management interface.

----------------------------------------
9. EXAM REMINDER
----------------------------------------

Example:

🎓

Exam Reminder Sent

Midterm Examination reminder was sent to your section.

42 students notified.

Yesterday

[View Exam]

----------------------------------------
10. UNIVERSITY / DEPARTMENT NOTICE
----------------------------------------

Example:

📢

Department Notice

The CSE department has published an updated examination schedule.

2 hours ago

[View Notice]

The CR should be able to distinguish official information from CR activity.

Source:

Department

==================================================
SOURCE LABELS
==================================================

Use clear source labels where appropriate:

CR Activity
Teacher
Department
University
Club
System

Examples:

Source: Department

Source: CR Activity

Source: System

Do not make the CR appear to be the official source of teacher/department information.

==================================================
ACTION REQUIRED
==================================================

Some notifications require CR attention.

Create an "Action Required" visual state.

Example:

Action Required

Event Submission Needs Attention

Your external event submission requires changes.

[Review Now]

Use a subtle existing UniLink attention indicator.

Do NOT use large red warning panels.

==================================================
UNREAD STATE
==================================================

Unread notifications should have:

- Subtle background emphasis
- Small unread indicator
- Stronger title text

Read notifications should be visually quieter.

Use the existing UniLink visual hierarchy.

==================================================
NOTIFICATION INTERACTION
==================================================

Clicking a notification should open the relevant content.

Examples:

Class Update
→ Class Update Details

Routine Update
→ Routine

Assignment Reminder
→ Assignment

Exam Reminder
→ Exam

Event Approved
→ Event Details

Event Submission
→ My Submitted Events / Submission Details

Material Status
→ Class Materials

Department Notice
→ Notice Details

Use the existing UniLink page transition/animation language.

==================================================
MARK AS READ
==================================================

Support:

Click notification
→ Mark as read

Also provide:

[Mark all as read]

After marking all as read:

Show a subtle confirmation:

"All notifications marked as read."

Do not use a large modal.

==================================================
NOTIFICATION DETAIL
==================================================

Create a notification detail state/page where appropriate.

Example:

Event Approved

AI & Machine Learning Workshop

Your event submission has been approved and is now available in Global Events.

Status:
Approved

Approved:
Today, 10:24 AM

[View Event]

[Share with Class]

Use existing UniLink detail components.

==================================================
EMPTY STATE
==================================================

Create an empty state for:

No notifications

Example:

🔔

You're all caught up.

You don't have any new notifications right now.

Use the existing UniLink empty-state design.

==================================================
NO ACTION REQUIRED
==================================================

Create a state where notifications exist but none require attention.

Example:

You're all caught up.

No actions are currently required.

==================================================
MOBILE VERSION
==================================================

Create a responsive mobile version around 390px width.

Mobile layout:

Header

↓

Filter controls

↓

Notification list

Each notification should contain:

Icon
Title
Short description
Timestamp
Status

Actions should remain touch-friendly.

Filters may horizontally scroll if necessary.

Do not overcrowd the mobile screen.

==================================================
LIGHT MODE
==================================================

Use the existing UniLink Light Mode.

Do NOT introduce new colors.

Maintain the established:

White
Light Blue
Primary Blue
Deep Navy
Neutral Gray

==================================================
DARK MODE
==================================================

Create the same Notifications page in the existing UniLink Dark Mode.

Do not redesign the layout.

Only adapt:

Background
Surface
Text
Borders
Shadows
Unread states
Status states

==================================================
SIDEBAR
==================================================

Keep the existing CR Portal sidebar exactly as it is.

Notifications should remain in the top-level navigation.

Show the unread count badge beside:

Notifications

Example:

Notifications
5

The badge should update based on unread notifications.

==================================================
RECENT ACTIVITY
==================================================

Do NOT create a separate large "Recent Activity" dashboard.

Instead, notification activity should naturally appear in the chronological notification list.

Examples:

Event shared
Reminder sent
Routine updated
Submission approved

All belong in the notification timeline.

==================================================
DESIGN PRINCIPLES
==================================================

The Notifications page should feel:

- Clean
- Professional
- Fast to scan
- SaaS-style
- Academic
- Useful for coordination

Avoid:

- Excessive cards
- Excessive colors
- Large dashboards
- Heavy shadows
- Neon effects
- Social-media-style feeds
- Unnecessary animations

The CR should be able to open Notifications and understand within seconds:

"What happened?"

"What needs my attention?"

"What did UniLink confirm?"

==================================================
FINAL CR NOTIFICATION FLOW
==================================================

The overall system should communicate:

CR publishes class update
↓
Students are notified
↓
CR receives confirmation

CR submits external event
↓
Pending Review
↓
Admin/Moderator reviews
↓
Approved / Rejected
↓
CR receives notification

CR shares global event
↓
Students are notified
↓
CR receives confirmation

CR sends assignment/exam reminder
↓
Students are notified
↓
CR receives confirmation

Teacher / Department / University
↓
Official information
↓
CR receives notification

==================================================
FINAL INSTRUCTION
==================================================

Create the complete CR Portal Notifications experience inside the existing UniLink Figma project.

Do NOT redesign any existing CR Portal module.

Do NOT create new navigation items.

Do NOT turn Notifications into a management dashboard.

Make it a focused notification inbox for:

- Class coordination
- Routine updates
- Event submission status
- Event sharing confirmation
- Assignment reminders
- Exam reminders
- Material status
- Official university/department notices
- System notifications

Maintain the existing UniLink design system, Light Mode, Dark Mode, responsive design, components, and animation language.

After completing the Notifications page, STOP.