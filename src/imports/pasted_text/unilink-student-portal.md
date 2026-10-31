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
- Landing page
- Student Dashboard

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

Create ONLY the following new authenticated Student Portal screens:

1. MY COURSES
2. COURSE DETAILS

Create them as NEW pages/frames inside the existing UniLink Figma project.

==================================================
SCREEN 1 — MY COURSES
==================================================

Create a modern, premium SaaS-style "My Courses" page.

Purpose:

Allow students to see and manage all courses they are currently enrolled in.

Use the existing Student Dashboard sidebar.

Active navigation:

ACADEMIC
→ My Courses

==================================================
HEADER
==================================================

Page title:

My Courses

Subtitle:

"Manage your current courses, materials, assignments, and academic activities."

On the right side:

[ + Add / Join Course ]

Below or beside the header:

Search field:

"Search courses..."

==================================================
COURSE SUMMARY
==================================================

Create four summary cards using the EXISTING UniLink statistics-card component.

Total Courses
6

Active Courses
6

Assignments Due
4

Upcoming Exams
2

Keep the cards clean and compact.

Do not introduce a new card style.

==================================================
SEARCH & FILTER
==================================================

Create:

Search courses...

Filters:

All
Active
Completed

Semester / Term dropdown:

Spring 2026

Make the filters interactive.

Use the existing UniLink button and input components.

==================================================
COURSE GRID
==================================================

Create a responsive course-card grid.

Show these example courses:

1. Database Management
CSE 305
Dr. Rahman
Section B

2. Algorithms
CSE 301
Dr. Karim
Section B

3. Software Engineering
CSE 310
Ms. Sarah
Section B

4. Computer Networks
CSE 307
Dr. Ahmed
Section B

5. Artificial Intelligence
CSE 401
Dr. Hasan
Section B

6. Operating Systems
CSE 303
Dr. Rahman
Section B

Each course card should contain:

- Course icon or simple visual
- Course name
- Course code
- Instructor
- Section
- Semester
- Next class
- Assignment status
- Small progress indicator
- View Course action

Example:

Database Management

CSE 305

Dr. Rahman

Section B

Spring 2026

Next Class
Today • 10:00 AM

Assignment
Due Tomorrow

Progress
68%

[View Course →]

==================================================
COURSE CARD INTERACTION
==================================================

Hover state:

- Slight elevation
- Subtle blue border/highlight
- Small arrow movement
- Smooth transition

Clicking:

Course Card
→
Course Details

Use the existing UniLink transition style.

==================================================
SCREEN 2 — COURSE DETAILS
==================================================

Create a detailed course page.

Use:

Database Management

as the example course.

Course information:

Database Management
CSE 305

Dr. Rahman

CSE • Batch 52 • Section B

==================================================
COURSE HEADER
==================================================

Create a polished course header using existing UniLink components.

Show:

Database Management

CSE 305

Instructor:
Dr. Rahman

Section:
B

Semester:
Spring 2026

Room:
502

Next Class:
Today • 10:00 AM

Add a clean course icon/visual.

Primary action:

[View Routine]

==================================================
COURSE TABS
==================================================

Create course-level navigation tabs:

Overview
Materials
Assignments
Exams
Announcements

Default active tab:

Overview

Use a subtle animated active-tab indicator.

Do not create a new tab component if an existing UniLink tab component is available.

==================================================
OVERVIEW TAB
==================================================

Create:

Course Description

"Introduction to database concepts, relational models, SQL, database design, normalization, transactions, and database management systems."

Then:

Course Information

Instructor
Dr. Rahman

Class Schedule
Sun / Tue
10:00 AM – 11:30 AM

Room
502

Credits
3

==================================================
UPCOMING ACTIVITIES
==================================================

Create:

Upcoming

Show:

Assignment 02
Due Tomorrow

Quiz 03
Sep 2

Midterm Examination
Sep 10

Use a clean academic timeline/deadline style.

Do not make it look like a gaming interface.

==================================================
RECENT MATERIALS
==================================================

Create:

Recent Materials

Show:

Lecture 05 — SQL Joins
PDF
Uploaded 2 hours ago

Lecture 04 — Normalization
PDF
Uploaded Yesterday

Database Design Notes
PDF
Uploaded 3 days ago

Each material item should show:

- File icon
- Title
- File type
- Uploaded time
- Uploader

Action:

View All Materials →

==================================================
COURSE ANNOUNCEMENTS
==================================================

Create:

Course Announcements

Example:

Midterm syllabus updated

Dr. Rahman
2 hours ago

Classroom changed for tomorrow

Dr. Rahman
Yesterday

Action:

View All →

==================================================
COURSE PROGRESS
==================================================

Create a professional academic progress widget.

Course Progress

68%

Lectures
72%

Assignments
60%

Materials
80%

Attendance
75%

Use simple progress bars or circular indicators.

Keep this professional and minimal.

Do NOT make it look like a game.

==================================================
NEXT CLASS
==================================================

Create a highlighted section:

Next Class

Database Management

Today
10:00 AM – 11:30 AM

Room 502

Dr. Rahman

Action:

[View Routine →]

Use the existing UniLink primary blue component.

==================================================
MATERIALS TAB
==================================================

Create the complete visual state for:

Materials

Categories:

All
Lectures
Slides
Notes
Lab
Other

Add:

Search materials...

Create a clean list/grid.

Each material:

Title
Course
Uploader
Date
File Type
File Size

Actions:

Preview
Download
Save

==================================================
ASSIGNMENTS TAB
==================================================

Create:

Assignments

Status filters:

Upcoming
Submitted
Completed
Overdue

Example:

Database Assignment 02

Due:
Tomorrow • 11:59 PM

Status:
Not Submitted

[View Assignment]

==================================================
EXAMS TAB
==================================================

Create:

Exams

Example:

Midterm Examination

September 10
10:00 AM

Room 502

Final Examination

November 20
10:00 AM

Room 502

Use the existing UniLink timeline/calendar visual language.

==================================================
ANNOUNCEMENTS TAB
==================================================

Create course-specific announcements.

Each announcement should contain:

Title
Description
Teacher
Timestamp
Priority

Example:

Midterm syllabus updated

Important

==================================================
LIGHT MODE
==================================================

Use the EXISTING UniLink Light Mode.

Do NOT introduce any new colors.

Reuse the existing:

- White
- Light Blue
- Primary Blue
- Deep Navy
- Neutral Gray

==================================================
DARK MODE
==================================================

Create Dark Mode versions of both screens.

Do NOT redesign the layouts.

Only adapt the existing UniLink theme tokens:

- Background
- Surface
- Elevated surface
- Text
- Borders
- Shadows
- Active states

Maintain strong accessibility contrast.

==================================================
RESPONSIVE DESIGN
==================================================

Create mobile versions at approximately 390px width.

MY COURSES MOBILE:

- Compact header
- Search at top
- Horizontally scrollable filters
- One-column course cards
- Compact course information
- Touch-friendly buttons

COURSE DETAILS MOBILE:

- Compact course header
- Course information stacked
- Horizontally scrollable course tabs
- Stacked content sections
- Touch-friendly controls

Do NOT simply shrink the desktop layout.

==================================================
PROTOTYPE INTERACTIONS
==================================================

Create prototype interactions for:

Course Card
→ Course Details

Course tabs
→ Corresponding tab content

Search
→ Filter course list

Filters
→ Change visible courses

View Materials
→ Materials tab

View Assignment
→ Assignment details

View Exam
→ Exam information

View Announcement
→ Announcement details

View Routine
→ Routine screen

Use smooth transitions consistent with the existing UniLink animation system.

==================================================
STATES
==================================================

Create reusable UI states for:

- Loading
- Empty courses
- No search results
- No materials
- No assignments
- No announcements
- Error state

Keep these states consistent with the existing UniLink design system.

==================================================
DESIGN QUALITY
==================================================

The final screens must look like a real production-ready SaaS application.

Maintain:

- Existing UniLink design system
- Existing sidebar
- Existing navigation
- Existing typography
- Existing colors
- Existing components
- Existing Light Mode
- Existing Dark Mode
- Existing animation language

Avoid:

- Excessive cards
- Excessive colors
- Heavy shadows
- Neon effects
- Unnecessary gradients
- Overly rounded components
- Traditional university portal aesthetics
- Gaming-style progress systems

The final experience should communicate:

"Everything about my course is organized in one place."

IMPORTANT:

Create these as NEW screens inside the existing UniLink Figma project.

Do not modify or replace previously created UniLink screens.