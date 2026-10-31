Continue building the existing UniLink project from the current Figma design.

IMPORTANT — PRESERVE THE EXISTING UNILINK DESIGN

Do NOT redesign, replace, delete, or modify any existing UniLink screens, components, navigation, or design system.

Preserve:

- UniLink brand and logo
- Existing white + blue visual direction
- Existing typography
- Existing components
- Existing sidebar
- Existing navigation
- Existing Light Mode
- Existing Dark Mode
- Existing animation language
- Existing responsive behavior
- Existing Student Dashboard
- My Courses
- Course Details
- Routine
- Assignments
- Assignment Details
- Assignment Submission
- Exams & Deadlines
- Exam Details
- Exam Calendar
- Class Materials
- Material Preview
- Saved Materials
- Announcements
- Announcement Details
- Events
- Event Details
- Campus Calendar
- Saved Events
- Clubs & Communities
- Club Details
- My Clubs
- Club Membership
- Opportunities
- Opportunity Details
- Saved Opportunities
- My Applications
- Lost & Found
- Item Details
- Report Lost Item
- Report Found Item
- My Reports
- Saved Items
- Claim / Return Flow
- CR Dashboard
- CR Routine Management

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

==================================================
MODULE — NOTIFICATIONS
==================================================

Create a centralized UniLink notification system.

Notifications should bring together important updates from:

- Announcements
- Courses
- Assignments
- Exams
- Routine
- Materials
- Events
- Clubs & Communities
- Opportunities
- Lost & Found
- System updates

The notification experience should help students quickly understand:

WHAT happened
WHY it matters
WHEN it happened
WHAT action is available

Do NOT make it look like a social-media notification feed.

Create NEW Student Portal screens:

1. NOTIFICATIONS
2. NOTIFICATION DETAILS
3. NOTIFICATION SETTINGS
4. NOTIFICATION CENTER STATES

==================================================
NAVIGATION
==================================================

Use the existing Student Portal sidebar.

Do NOT create a new sidebar.

Notifications should also be accessible through the existing header notification/bell icon.

Show an unread badge on the bell icon.

Example:

🔔 5

Use the existing UniLink icon and badge components.

==================================================
SCREEN 1 — NOTIFICATIONS
==================================================

Create:

Notifications

Subtitle:

"Stay up to date with important academic and campus activity."

Top right:

[ Mark all as read ]

Optional:

[ Notification Settings ]

==================================================
NOTIFICATION SUMMARY
==================================================

Create compact summary cards or counters:

All
12

Unread
5

Academic
6

Campus
4

Use existing UniLink statistics/filter components.

Do not create unnecessary cards.

==================================================
FILTER TABS
==================================================

Create:

All
Unread
Academic
Campus
Opportunities
Clubs
Lost & Found
System

Use horizontally scrollable tabs on mobile.

==================================================
NOTIFICATION LIST
==================================================

Create a clean chronological notification list.

Example:

IMPORTANT

Midterm Examination Updated

Your CSE 305 midterm examination schedule has been updated.

Today • 10:24 AM

[View Exam]


ASSIGNMENT

Database Assignment 02 is due tomorrow.

Due:
Tomorrow • 11:59 PM

Today • 9:15 AM

[View Assignment]


EVENT

AI Workshop starts tomorrow.

September 2 • 3:00 PM

Yesterday • 6:42 PM

[View Event]


CLUB

CSE Programming Club posted a new announcement.

Yesterday • 4:20 PM

[View Announcement]


OPPORTUNITY

New opportunity matching your interests.

AI Research Internship

Yesterday • 11:05 AM

[View Opportunity]


LOST & FOUND

A possible match was found for your lost item.

Black Backpack

Aug 28 • 9:40 AM

[View Item]

==================================================
NOTIFICATION ITEM
==================================================

Each notification should contain:

- Category icon
- Notification title
- Short description
- Timestamp
- Read/unread state
- Priority if applicable
- Related action

Unread notification:

- Subtle light-blue background
- Small unread indicator
- Stronger title typography

Read notification:

- Normal surface
- Reduced visual emphasis

Do NOT use excessive colors.

==================================================
PRIORITY
==================================================

Support:

Normal
Important
Urgent

Important notifications should have a subtle visual distinction.

Urgent notifications should be reserved for things such as:

- Exam cancellation
- Major routine change
- Emergency university announcement

Do NOT make every notification urgent.

==================================================
GROUPED NOTIFICATIONS
==================================================

Support grouped notifications.

Example:

3 new updates from CSE Programming Club

- New event announced
- Recruitment opened
- New announcement posted

[View Club]

Another example:

2 updates from CSE 305

- Assignment deadline changed
- New lecture material uploaded

[View Course]

This keeps the notification center clean.

==================================================
NOTIFICATION TYPES
==================================================

Create consistent notification categories:

ACADEMIC

- Assignment due
- Assignment submitted
- Exam scheduled
- Exam changed
- Routine changed
- New course material
- Course announcement

EVENTS

- New event
- Event reminder
- Event updated
- Event cancelled
- Event starting soon

CLUBS

- Club announcement
- Membership approved
- Recruitment opened
- Club event

OPPORTUNITIES

- New opportunity
- Deadline approaching
- Application status changed

LOST & FOUND

- Possible match
- Claim submitted
- Claim approved
- Claim rejected
- Item returned

SYSTEM

- Account update
- Security update
- System announcement

==================================================
NOTIFICATION ACTIONS
==================================================

Depending on notification type, support:

[View]

[View Assignment]

[View Exam]

[View Course]

[View Event]

[View Club]

[View Opportunity]

[View Item]

The action should deep-link to the existing corresponding screen.

Do NOT create duplicate screens.

==================================================
MARK AS READ
==================================================

Support:

- Click notification → automatically mark as read
- Mark individual notification as read
- Mark all as read

For unread notification:

[Mark as read]

For read notification:

[Mark as unread]

Do not make these actions visually dominant.

==================================================
NOTIFICATION DETAILS
==================================================

Create a Notification Details screen/state.

Example:

Midterm Examination Updated

IMPORTANT

CSE 305 — Database Management

Your midterm examination schedule has been updated.

Previous:

September 8
10:00 AM

Updated:

September 10
10:00 AM

Room:

502

Updated by:

Department Administration

Today • 10:24 AM

Primary:

[View Exam]

Secondary:

[Mark as Unread]

==================================================
NOTIFICATION DETAILS — ASSIGNMENT
==================================================

Example:

Database Assignment 02

Due Tomorrow

CSE 305

Due:
September 1, 2026
11:59 PM

Status:
Not Submitted

[View Assignment]

==================================================
NOTIFICATION DETAILS — EVENT
==================================================

Example:

AI Workshop

Starts Tomorrow

September 2
3:00 PM

Seminar Hall

[View Event]

==================================================
NOTIFICATION DETAILS — OPPORTUNITY
==================================================

Example:

AI Research Internship

New opportunity matching your interests.

Deadline:
September 15

[View Opportunity]

==================================================
NOTIFICATION DETAILS — LOST & FOUND
==================================================

Example:

Possible Match Found

A found item may match your lost report.

Your report:

Black Backpack

Possible match:

Black Backpack

Found at:
Building 3

[View Item]

==================================================
NOTIFICATION SETTINGS
==================================================

Create:

Notification Settings

Subtitle:

"Choose which updates you want to receive."

==================================================
ACADEMIC NOTIFICATIONS
==================================================

Create toggles:

Assignment reminders
ON

Exam reminders
ON

Routine changes
ON

New course materials
ON

Course announcements
ON

==================================================
EVENT NOTIFICATIONS
==================================================

New events
ON

Event reminders
ON

Event changes
ON

Event cancellations
ON

==================================================
CLUB NOTIFICATIONS
==================================================

Club announcements
ON

Club events
ON

Membership updates
ON

Recruitment
ON

==================================================
OPPORTUNITY NOTIFICATIONS
==================================================

Recommended opportunities
ON

Deadline reminders
ON

Application status
ON

==================================================
LOST & FOUND NOTIFICATIONS
==================================================

Possible matches
ON

Claim updates
ON

Return updates
ON

==================================================
SYSTEM NOTIFICATIONS
==================================================

System announcements
ON

Security alerts
ON

Account updates
ON

IMPORTANT:

Security alerts should always remain enabled.

Do not allow students to completely disable critical security notifications.

==================================================
DELIVERY OPTIONS
==================================================

Create:

Delivery Preferences

In-App
ON

Email
ON

Push
ON

Allow users to configure non-critical notification delivery.

Keep this section simple.

==================================================
QUIET HOURS
==================================================

Create optional:

Quiet Hours

Enable Quiet Hours
OFF

Start:
11:00 PM

End:
7:00 AM

Description:

"Non-critical notifications will be delivered after quiet hours."

Important and urgent notifications may still be delivered.

==================================================
NOTIFICATION CENTER — HEADER BELL
==================================================

Create a compact notification dropdown/popover connected to the existing header bell icon.

Example:

Notifications

5 unread

--------------------------------

Midterm exam updated
10 min ago

Assignment due tomorrow
1 hour ago

AI Workshop tomorrow
3 hours ago

--------------------------------

[Mark all as read]

[View All Notifications]

The dropdown should NOT replace the full Notifications page.

==================================================
UNREAD BADGE
==================================================

Show unread count on the notification bell.

Examples:

1
5
9+

If there are no unread notifications:

Do not show a badge.

==================================================
EMPTY STATE
==================================================

Create:

You're all caught up

"You don't have any new notifications."

Use a simple professional illustration/icon.

Primary:

[Explore Campus]

Do NOT use excessive empty-state graphics.

==================================================
FILTER EMPTY STATE
==================================================

Example:

No Academic Notifications

"You don't have any academic notifications right now."

[View All]

==================================================
LOADING STATES
==================================================

Create skeleton states for:

- Notification list
- Notification details
- Notification dropdown

Reuse existing UniLink loading components.

==================================================
ERROR STATES
==================================================

Create:

Unable to load notifications.

[Try Again]

Unable to update notification settings.

[Try Again]

Unable to mark notifications as read.

[Try Again]

Use existing UniLink error components.

==================================================
PAGINATION / INFINITE SCROLL
==================================================

Design the notification list so it can support:

Load More

or

Infinite Scroll

Do not create unnecessary pagination controls if the existing UniLink system uses infinite scrolling.

==================================================
REAL-TIME UPDATE STATE
==================================================

Create a subtle state when new notifications arrive:

3 new notifications

[View New Notifications]

Do not automatically interrupt the student with a large modal.

==================================================
NOTIFICATION DEEP-LINKING
==================================================

Notifications must connect to existing modules.

Examples:

Assignment notification
→ Assignment Details

Exam notification
→ Exam Details

Routine notification
→ Routine

Material notification
→ Material Preview

Announcement notification
→ Announcement Details

Event notification
→ Event Details

Club notification
→ Club Details

Opportunity notification
→ Opportunity Details

Lost & Found notification
→ Item Details

Do NOT redesign those existing pages.

==================================================
STUDENT DASHBOARD CONNECTION
==================================================

The Student Dashboard should use the existing notification bell.

It may also show a small:

Recent Notifications

section if the current dashboard already has such a component.

Do NOT redesign the dashboard.

==================================================
NOTIFICATION PRIORITY LOGIC
==================================================

Use the following conceptual hierarchy:

URGENT
Exam cancellation
Emergency announcement
Critical university notice

IMPORTANT
Exam change
Routine change
Assignment deadline change

NORMAL
New material
New event
Club announcement
Recommended opportunity

Do not make all notifications equally visually strong.

==================================================
DARK MODE
==================================================

Create the same notification screens in the existing UniLink Dark Mode.

Do NOT redesign the layout.

Only adapt:

- Background
- Surface
- Text
- Borders
- Shadows
- Unread states
- Active states

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
RESPONSIVE DESIGN
==================================================

Create mobile versions around 390px width.

NOTIFICATIONS MOBILE:

- Compact header
- Filter tabs horizontally scrollable
- Full-width notification items
- Easy mark-as-read interaction
- Compact timestamps
- Touch-friendly action buttons

NOTIFICATION DETAILS MOBILE:

- Clear title
- Category
- Timestamp
- Description
- Related information
- Primary action

NOTIFICATION SETTINGS MOBILE:

- Grouped settings
- Large touch-friendly toggles
- Compact delivery preferences

NOTIFICATION DROPDOWN MOBILE:

On mobile, use a full-screen or bottom-sheet notification center instead of a tiny desktop-style dropdown.

==================================================
ANIMATIONS
==================================================

Use the existing UniLink animation language.

Add only subtle animations:

- Notification dropdown entrance
- Unread badge update
- Mark-as-read transition
- New notification indicator
- Filter transition

Avoid:

- Bouncy animations
- Excessive motion
- Neon effects
- Large animated illustrations

==================================================
ACCESSIBILITY
==================================================

Ensure:

- Clear unread/read distinction
- Good contrast
- Large enough touch targets
- Keyboard-friendly interactions
- Meaningful icon labels
- Status not communicated by color alone

==================================================
DESIGN QUALITY
==================================================

The final experience should feel like a production-ready SaaS notification system.

It should communicate:

"Important campus information reaches me without overwhelming me."

Prioritize:

- Clarity
- Relevance
- Hierarchy
- Privacy
- Actionability
- Minimal clutter

Avoid:

- Social media feed aesthetics
- Excessive notification cards
- Excessive colors
- Heavy shadows
- Neon effects
- Excessive gradients
- Gamification
- Unnecessary animations

==================================================
IMPORTANT
==================================================

Create these as NEW Student Portal screens/states.

Do NOT redesign previously completed screens.

Do NOT create a new sidebar.

Do NOT create a new design system.

Connect Notifications with:

Student Dashboard
Courses
Assignments
Exams
Routine
Materials
Announcements
Events
Clubs & Communities
Opportunities
Lost & Found

After completing these screens, stop.

Do NOT start designing Student Directory yet.