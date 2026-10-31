Continue building the existing UniLink project from the current Figma design.

IMPORTANT — PRESERVE EXISTING DESIGN

Do NOT redesign, delete, replace, or modify any existing UniLink screens or components.

Do NOT change:

- UniLink brand
- Logo
- Existing design system
- Existing colors
- Existing typography
- Existing sidebar
- Existing navigation
- Existing components
- Light Mode
- Dark Mode
- Animation language

Reuse the existing UniLink design system exactly.

Previously completed modules include:

- Student Dashboard
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
- CR Portal
- CR Routine Management

Create NEW authenticated Student Portal screens for:

1. ANNOUNCEMENTS
2. ANNOUNCEMENT DETAILS
3. ANNOUNCEMENT FILTERS / CATEGORIES

Create them as NEW frames/pages inside the existing UniLink Figma project.

==================================================
SCREEN 1 — ANNOUNCEMENTS
==================================================

Create a modern SaaS-style centralized announcement system.

Purpose:

Students should be able to see important academic, university, department, course, CR, and club announcements in one place.

The page should communicate:

"Important campus information, organized for me."

Use the existing Student Dashboard sidebar.

Active navigation:

CAMPUS
→ Announcements

If the existing navigation already places Announcements somewhere else, reuse the existing navigation structure instead of creating a new sidebar section.

==================================================
HEADER
==================================================

Title:

Announcements

Subtitle:

"Stay updated with important university, academic, course, and campus announcements."

Right side:

[ Mark All as Read ]

Search field:

"Search announcements..."

==================================================
ANNOUNCEMENT SUMMARY
==================================================

Create compact statistics using the EXISTING UniLink statistics-card component.

Unread

8

Today

4

Important

2

This Week

12

Keep the statistics minimal.

Do NOT introduce a new card style.

==================================================
ANNOUNCEMENT FILTER TABS
==================================================

Create:

All
Unread
Important
Academic
Campus
Course
CR
Clubs

Use the existing UniLink tab/segmented-control component.

The active state should use the existing UniLink primary blue style.

==================================================
SOURCE FILTER
==================================================

Create a filter:

All Sources

Options:

University
Department
Teacher
Course
CR
Club

Additional:

Course
[ All Courses ]

Department
[ CSE ]

Batch
[ 52 ]

Section
[ B ]

Use existing UniLink dropdown components.

==================================================
ANNOUNCEMENT LIST
==================================================

Create a clean announcement feed.

Do NOT make every announcement a huge card.

Use a modern SaaS feed/list structure.

Each announcement should contain:

- Source icon/avatar
- Announcement title
- Short description
- Source
- Timestamp
- Category
- Priority
- Read/unread state
- Optional attachment indicator

Example:

IMPORTANT

Midterm Examination Schedule Published

The CSE department has published the Spring 2026 midterm examination schedule.

CSE Department

2 hours ago

Academic

[Read More →]

--------------------------------------------------

Classroom Changed for Tomorrow

Database Management class will be held in Room 605 instead of Room 502 tomorrow.

Dr. Rahman

Yesterday

Course

[Read More →]

--------------------------------------------------

New Class Material Available

Lecture 05 — SQL Joins has been uploaded to the course materials.

Dr. Rahman

Yesterday

Course

[View Material →]

--------------------------------------------------

Section Meeting

A section meeting will be held tomorrow at 2:00 PM.

Ovi — CR

2 days ago

CR

[Read More →]

--------------------------------------------------

Programming Club Recruitment

Applications for new club members are now open.

Programming Club

3 days ago

Club

[View Announcement →]

==================================================
UNREAD STATE
==================================================

Unread announcements should have a subtle visual indicator.

Example:

Small blue dot

and slightly stronger title weight.

Do NOT use a large colored background.

When an announcement is opened:

Mark it as read.

==================================================
IMPORTANT ANNOUNCEMENTS
==================================================

Important announcements should be visually distinguishable.

Example:

IMPORTANT

Midterm Examination Schedule Published

Use the existing UniLink priority/warning component.

Do NOT use excessive red.

==================================================
PINNED ANNOUNCEMENTS
==================================================

Support pinned announcements.

Example:

PINNED

University Holiday Notice

Pinned by:
University Administration

Show a subtle pin icon.

Pinned announcements should appear near the top.

==================================================
ANNOUNCEMENT PRIORITY
==================================================

Support:

Normal
Important
Urgent

Example:

URGENT

Class Cancelled Today

The 10:00 AM Database Management class has been cancelled.

Do not make the UI visually alarming.

Use the existing UniLink status/priority system.

==================================================
SOURCE TYPES
==================================================

Announcements may come from:

University
Department
Teacher
Course
CR
Club

Show the source clearly.

Example:

Ovi
Class Representative
CSE • Batch 52 • Section B

or:

CSE Department

or:

Dr. Rahman
CSE 305

==================================================
PERSONALIZATION
==================================================

The announcement feed should prioritize announcements relevant to the logged-in student.

Relevant announcements may come from:

- University
- Student's faculty
- Student's department
- Student's program
- Student's batch
- Student's section
- Enrolled courses
- Joined clubs

The interface should communicate personalization without showing technical targeting rules.

==================================================
SCREEN 2 — ANNOUNCEMENT DETAILS
==================================================

Create a detailed announcement page.

Example:

Midterm Examination Schedule Published

IMPORTANT

CSE Department

2 hours ago

==================================================
ANNOUNCEMENT HEADER
==================================================

Show:

Midterm Examination Schedule Published

CSE Department

Academic

Important

Published:
August 28, 2026
10:30 AM

Actions:

[ Mark as Unread ]

[ Save ]

[ Share ]

Reuse existing UniLink button styles.

==================================================
ANNOUNCEMENT CONTENT
==================================================

Create a clean content area.

Example:

"The Spring 2026 midterm examination schedule has been published for CSE students.

Students are requested to review the examination dates, times, and room assignments carefully."

Then show:

[View Exam Schedule →]

Connect to:

Exams & Deadlines
→ Exam Calendar

==================================================
ATTACHMENTS
==================================================

Create:

Attachments

Spring_2026_Midterm_Schedule.pdf

PDF
1.8 MB

Actions:

[Preview]

[Download]

Connect to the existing Class Materials/document preview system where appropriate.

==================================================
TARGET AUDIENCE
==================================================

Show a subtle information section:

Audience:

CSE
Batch 52
Section B

Do not expose internal database terminology.

==================================================
SOURCE INFORMATION
==================================================

Create:

Published By

CSE Department

Department of Computer Science and Engineering

Do not require a full administrator profile.

==================================================
RELATED CONTENT
==================================================

Create:

Related

Midterm Examination
September 10

Database Management
CSE 305

Use compact related-content items.

==================================================
COMMENTS / DISCUSSION
==================================================

For the initial UniLink version, do NOT create a full social-media-style comment system.

Instead, if needed, show:

"Questions about this announcement?"

[Contact Source]

This keeps announcements informative rather than turning them into social media.

==================================================
SCREEN 3 — ANNOUNCEMENT FILTERS
==================================================

Create a filter drawer/modal for advanced filtering.

Title:

Filter Announcements

Filters:

Source

University
Department
Teacher
Course
CR
Club

Category

Academic
Campus
Course
Event
General

Priority

Normal
Important
Urgent

Status

Read
Unread

Date

Today
This Week
This Month
Custom

Course

All Courses

Department

CSE

Batch

52

Section

B

Buttons:

[Clear All]

[Apply Filters]

==================================================
SAVED ANNOUNCEMENTS
==================================================

Allow students to save important announcements.

Create a saved state:

Saved

Use the existing bookmark/save icon.

Create a small Saved section/filter:

Saved Announcements

Example:

Midterm Examination Schedule

University Holiday Notice

Important Department Notice

Do NOT create a separate complicated page unless it fits the existing UniLink navigation.

==================================================
MARK AS READ
==================================================

Support:

Mark as Read

Mark as Unread

Mark All as Read

When the student clicks:

Mark All as Read

Show a lightweight toast:

"All announcements marked as read."

==================================================
NOTIFICATION CONNECTION
==================================================

Announcements should connect with the existing UniLink notification system.

Examples:

"New important announcement from CSE Department."

"Your CR posted a new section announcement."

"Database Management class announcement posted."

Do NOT create a new notification system.

Use the existing notification architecture.

==================================================
CR CONNECTION
==================================================

CRs should be able to publish section-specific announcements.

Flow:

CR Portal
→ Announcements Management
→ Create Announcement
→ Select Audience
→ Publish
→ Student Announcements

Example:

CR creates:

"Section meeting tomorrow at 2 PM."

Audience:

CSE
Batch 52
Section B

Only the relevant students should receive it.

Do NOT redesign the CR Portal in this task.

==================================================
TEACHER CONNECTION
==================================================

Teachers can publish course-specific announcements.

Example:

Dr. Rahman
→ Database Management
→ Announcement

"Classroom changed for tomorrow."

Students enrolled in CSE 305 receive it.

==================================================
DEPARTMENT CONNECTION
==================================================

Department announcements may target:

Department
Program
Batch
Section

Example:

CSE Department
→ Batch 52
→ Midterm Schedule

==================================================
UNIVERSITY CONNECTION
==================================================

University-wide announcements can target all students.

Example:

University Administration

"University closed tomorrow due to emergency maintenance."

Show:

University

as the source.

==================================================
ANNOUNCEMENT TARGETING
==================================================

Support the following conceptual targeting hierarchy:

University
↓
Faculty
↓
Department
↓
Program
↓
Batch
↓
Section
↓
Course

CR announcements may target:

Batch
Section

Course announcements may target:

Enrolled Students

Club announcements may target:

Club Members

The student UI should only show announcements relevant to the logged-in student.

Do NOT expose complex targeting controls in the student interface.

==================================================
EVENT CONNECTION
==================================================

If an announcement relates to an event:

Show:

Related Event

Example:

Programming Club Hackathon

September 15

[View Event →]

Connect to the existing/planned Events module.

==================================================
ANNOUNCEMENT TYPES
==================================================

Support:

Academic
Course
Campus
University
Department
CR
Club
Event
General

Use icons/labels where helpful.

Do not assign a different color to every type.

==================================================
EMPTY STATES
==================================================

Create:

No New Announcements

"You're all caught up."

and:

No Announcements Found

"No announcements match your filters."

[Clear Filters]

Also:

No Saved Announcements

"Save important announcements to find them quickly later."

Use existing UniLink empty-state components.

==================================================
LOADING STATES
==================================================

Create skeleton/loading states for:

- Announcement feed
- Announcement details
- Filter results

Reuse existing UniLink loading components.

==================================================
ERROR STATES
==================================================

Create:

Unable to load announcements.

[Try Again]

Announcement unavailable:

"This announcement is no longer available."

[Back to Announcements]

Use existing UniLink error components.

==================================================
RESPONSIVE DESIGN
==================================================

Create mobile versions around 390px width.

ANNOUNCEMENTS MOBILE:

- Compact header
- Search
- Horizontally scrollable category filters
- Filter button
- Stacked announcement feed
- Source and timestamp remain visible
- Unread indicator remains clear

ANNOUNCEMENT DETAILS MOBILE:

- Compact header
- Priority indicator
- Announcement title
- Source
- Timestamp
- Content
- Attachments
- Related content
- Action buttons

FILTER MOBILE:

Use a bottom sheet or full-screen filter panel.

Keep:

[Apply Filters]

easy to access.

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

Adapt:

Background
Surface
Text
Borders
Shadows
Active states

Maintain readability and accessibility.

==================================================
INTERACTIONS
==================================================

Create prototype interactions for:

Announcement
→ Announcement Details

Unread Announcement
→ Read State

Mark as Read
→ Read State

Mark as Unread
→ Unread State

Save
→ Saved State

Search
→ Filtered Results

Filter
→ Filter Drawer

Apply Filters
→ Filtered Announcements

Clear Filters
→ All Announcements

View Exam Schedule
→ Existing Exams & Deadlines

View Material
→ Existing Class Materials

View Event
→ Events Module

Contact Source
→ Appropriate contact/action state

Use subtle transitions consistent with the existing UniLink animation language.

==================================================
ACCESSIBILITY
==================================================

Maintain:

- Clear text hierarchy
- Strong contrast
- Visible focus states
- Readable timestamps
- Accessible status indicators
- Touch-friendly controls
- Icons with meaningful labels

Do not rely only on color to communicate unread or priority states.

==================================================
DESIGN QUALITY
==================================================

The final experience should feel like a production-ready SaaS communication platform.

Maintain:

- Existing UniLink design system
- Existing components
- Existing sidebar
- Existing navigation
- Existing typography
- Existing colors
- Existing Light/Dark themes
- Existing animation language

Avoid:

- Social-media-style feeds
- Excessive cards
- Excessive colors
- Heavy shadows
- Neon effects
- Unnecessary gradients
- Huge announcement banners
- Cluttered filters
- Traditional university notice-board aesthetics

The experience should communicate:

"Important information comes to me, organized and relevant."

IMPORTANT:

Create these as NEW Student Portal screens.

Do NOT redesign previously completed UniLink screens.

Do NOT create a new sidebar.

Do NOT create a new design system.

Connect Announcements with:

Student Dashboard
Courses
Exams & Deadlines
Class Materials
Events
Notifications
CR Portal
Teacher/Department announcements