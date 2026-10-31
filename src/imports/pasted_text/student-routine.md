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
- Landing Page
- Student Dashboard
- My Courses
- Course Details

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

Create a NEW authenticated Student Portal screen:

# ROUTINE / CLASS SCHEDULE

Create it as a NEW page/frame inside the existing UniLink Figma project.

==================================================
PURPOSE
==================================================

The Routine screen allows students to view:

- Today's classes
- Weekly class schedule
- Course
- Instructor
- Room
- Class time
- Section
- Schedule changes
- Cancelled classes
- Upcoming classes

The screen should feel like a premium modern SaaS calendar/productivity interface while remaining academic and simple.

==================================================
NAVIGATION
==================================================

Use the existing Student Dashboard sidebar.

Active navigation:

ACADEMIC
→ Routine

Do not create a new sidebar.

==================================================
HEADER
==================================================

Page title:

Routine

Subtitle:

"View your weekly class schedule and stay updated with schedule changes."

On the right:

[ Today ]

[ Calendar / Week ]

Search or filter icon if appropriate.

==================================================
DATE / WEEK NAVIGATION
==================================================

Create a clean week navigation component.

Example:

‹

Aug 24 — Aug 30, 2026

›

Add:

[ Today ]

Allow the user to move between weeks.

Show the current week clearly.

==================================================
TODAY SUMMARY
==================================================

At the top create a compact summary section:

Today's Classes
3

Next Class
Database Management
10:00 AM

Free Time
2 Hours

Schedule Changes
1

Use the existing UniLink statistics-card style.

Do not introduce a new visual style.

==================================================
WEEKLY ROUTINE
==================================================

Create the main weekly timetable.

Days:

Sunday
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday

Time slots:

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

Create a clean calendar/grid layout.

Course blocks should show:

Course name
Course code
Time
Room
Instructor

Example:

Database Management
CSE 305

10:00 AM – 11:30 AM

Room 502

Dr. Rahman

Use the existing UniLink blue visual system.

==================================================
CURRENT DAY
==================================================

Highlight today's column using a very subtle light-blue background in Light Mode.

In Dark Mode use the existing dark theme active surface.

Do NOT use excessive colors.

==================================================
CURRENT / NEXT CLASS
==================================================

Highlight the upcoming/current class.

Example:

NEXT CLASS

Database Management

10:00 AM – 11:30 AM

Room 502

Dr. Rahman

Add:

[View Course →]

The current class should have a subtle blue accent.

==================================================
CLASS DETAILS
==================================================

When a student clicks a class block, show a class-detail popover or modal.

Display:

Database Management

CSE 305

Instructor:
Dr. Rahman

Date:
Tuesday, August 26

Time:
10:00 AM – 11:30 AM

Room:
502

Section:
B

Actions:

[View Course]

[View Materials]

[View Assignments]

==================================================
SCHEDULE CHANGES
==================================================

Create a dedicated notification area:

Schedule Changes

Example:

Database Management

Today's class moved from:

Room 502

to:

Room 605

Updated 30 minutes ago.

Use a subtle warning/information indicator.

Another example:

Algorithms

Class cancelled today.

Use the existing UniLink status system.

Do not use overly bright warning colors.

==================================================
CANCELLED CLASS
==================================================

Create a visual state for a cancelled class.

Example:

Algorithms

12:00 PM – 1:30 PM

CANCELLED

Use a subtle strike-through or muted appearance.

Do not completely remove the class from the timetable.

The student should understand that the class was scheduled but cancelled.

==================================================
RESCHEDULED CLASS
==================================================

Create a visual state:

Software Engineering

Originally:
2:00 PM

Rescheduled:
4:00 PM

Show a small:

RESCHEDULED

badge.

==================================================
DAY VIEW
==================================================

Add an option to switch between:

Week

Day

The default view should be:

Week

When Day is selected, show a detailed timeline for the selected day.

Example:

8:00 AM
Free

10:00 AM
Database Management
Room 502

12:00 PM
Algorithms
Room 405

2:00 PM
Free

4:00 PM
Software Engineering
Room 301

Use a clean vertical timeline.

==================================================
FILTERS
==================================================

Add optional filters:

All Courses

Course

Instructor

Room

Example:

Filter by Course

Database Management

Algorithms

Software Engineering

Computer Networks

Use existing UniLink dropdown/filter components.

==================================================
CALENDAR INTEGRATION
==================================================

Add an action:

[Add to Calendar]

When selected, show options:

Google Calendar
Apple Calendar
Download .ics

Keep this visually simple.

This is a UI concept only; do not design an external calendar service.

==================================================
TODAY'S CLASS LIST
==================================================

On mobile and Day View, create a clean list:

10:00 AM

Database Management
CSE 305

Room 502
Dr. Rahman

12:00 PM

Algorithms
CSE 301

Room 405
Dr. Karim

3:00 PM

Software Engineering
CSE 310

Room 301
Ms. Sarah

==================================================
EMPTY STATE
==================================================

Create an empty state:

"No classes scheduled."

Example:

"You have a free day! Enjoy your time."

Use a simple friendly illustration/icon.

Do not use excessive decorative graphics.

==================================================
LOADING STATE
==================================================

Create a skeleton loading state for:

- Calendar
- Class cards
- Summary cards

Use the existing UniLink loading style.

==================================================
ERROR STATE
==================================================

Create:

"Unable to load your routine."

Button:

[Try Again]

Use the existing UniLink error-state component.

==================================================
LIGHT MODE
==================================================

Use the existing UniLink Light Mode.

Do NOT introduce new colors.

Reuse the existing:

White
Light Blue
Primary Blue
Deep Navy
Neutral Gray

Calendar grid should remain clean and readable.

==================================================
DARK MODE
==================================================

Create a Dark Mode version.

Do NOT redesign the layout.

Adapt only:

Background
Surface
Elevated Surface
Text
Borders
Shadows
Active states

Maintain strong contrast.

==================================================
RESPONSIVE DESIGN
==================================================

Create a mobile version around 390px width.

Do NOT simply shrink the desktop calendar.

For mobile:

- Use Day View as the default
- Allow horizontal swipe between days
- Show compact date selector
- Show vertical class timeline
- Keep class information readable
- Use sticky date/header if appropriate
- Use touch-friendly controls

Mobile layout:

Header

Date selector

Today's summary

Class timeline

Schedule changes

Bottom navigation

==================================================
INTERACTIONS
==================================================

Create prototype interactions for:

Week navigation

Previous week

Next week

Today button

Week / Day toggle

Click class

View Course

View Materials

View Assignments

Schedule Change details

Add to Calendar

Course filter

Instructor filter

Room filter

Use subtle transitions consistent with the existing UniLink animation system.

==================================================
ANIMATION
==================================================

Use restrained SaaS-style motion.

Calendar transitions:

Smooth horizontal transition when changing weeks.

Class hover:

Subtle elevation and blue highlight.

Selected day:

Smooth active indicator.

Class details:

Smooth popover/modal transition.

Do not use excessive animations.

==================================================
DESIGN QUALITY
==================================================

The final screen must look production-ready.

Maintain:

- Existing UniLink design system
- Existing sidebar
- Existing navigation
- Existing typography
- Existing colors
- Existing components
- Existing Light/Dark themes
- Existing animation language

Avoid:

- Traditional university timetable aesthetics
- Overly colorful calendar blocks
- Excessive shadows
- Neon colors
- Heavy gradients
- Excessive rounded elements
- Cluttered information

The final experience should communicate:

"My entire academic schedule is clear at a glance."

Create the Routine screen as a NEW page/frame inside the existing UniLink Figma project.

Do not modify previously created screens.