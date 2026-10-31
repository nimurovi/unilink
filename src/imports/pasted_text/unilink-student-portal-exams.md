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
- Routine
- Assignments
- Assignment Details
- Assignment Submission
- CR Portal
- CR Routine Management

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

Create NEW authenticated Student Portal screens for:

1. EXAMS & DEADLINES
2. EXAM DETAILS
3. EXAM CALENDAR

Create them as NEW pages/frames inside the existing UniLink Figma project.

==================================================
SCREEN 1 — EXAMS & DEADLINES
==================================================

Create a modern SaaS-style academic exam and deadline management page.

Purpose:

Students should be able to see all upcoming examinations, quizzes, presentations, lab exams, and important academic deadlines in one place.

Use the existing Student Dashboard sidebar.

Active navigation:

ACADEMIC
→ Exams & Deadlines

==================================================
HEADER
==================================================

Title:

Exams & Deadlines

Subtitle:

"Keep track of your upcoming exams, quizzes, presentations, and important academic dates."

Right side:

[ Calendar View ]

Search field:

"Search exams..."

==================================================
SUMMARY
==================================================

Create four compact statistics cards using the EXISTING UniLink statistics-card component.

Upcoming Exams
4

This Week
2

Next Exam
5 Days

Academic Deadlines
7

Keep the cards clean and professional.

Do NOT introduce a new statistics-card design.

==================================================
FILTERS
==================================================

Create filters:

All
Exams
Quizzes
Presentations
Lab Exams
Deadlines

Add:

Course
[ All Courses ]

Semester
[ Spring 2026 ]

Time:

This Week
This Month
All Upcoming

Sort:

Date
Newest Added

Use the existing UniLink filter/dropdown components.

==================================================
UPCOMING EXAMS
==================================================

Create a clean academic exam list.

Example:

Midterm Examination

Database Management
CSE 305

September 10, 2026
10:00 AM

Room 502

Dr. Rahman

Status:
Upcoming

[View Exam →]


Final Examination

Algorithms
CSE 301

November 20, 2026
10:00 AM

Room 405

Dr. Karim

Status:
Upcoming

[View Exam →]


Quiz 03

Software Engineering
CSE 310

September 2, 2026
2:00 PM

Room 301

Ms. Sarah

Status:
Upcoming

[View Exam →]

==================================================
NEXT EXAM HIGHLIGHT
==================================================

Create a prominent but minimal section:

NEXT EXAM

Database Management

Midterm Examination

September 10, 2026

10:00 AM – 12:00 PM

Room 502

Dr. Rahman

Countdown:

5 Days Remaining

Primary action:

[View Exam Details]

Do NOT make the countdown look like a gaming interface.

==================================================
EXAM TYPES
==================================================

Support these types:

Midterm
Final
Quiz
Class Test
Lab Exam
Presentation
Viva

Use subtle labels/status indicators.

Do not use a different color for every exam type.

==================================================
EXAM STATUS
==================================================

Use the existing UniLink status system.

Statuses:

Upcoming
Today
Completed
Rescheduled
Cancelled

For example:

Today

Database Quiz
10:00 AM

For completed:

Completed
Quiz 02
Aug 20

For rescheduled:

Rescheduled
Original:
Sep 5

New:
Sep 7

For cancelled:

Cancelled

Keep cancelled exams visible but visually muted.

==================================================
DEADLINES SECTION
==================================================

Create a separate section:

Academic Deadlines

Show:

Database Assignment 02
Due Sep 1

Software Engineering Presentation
Sep 5

Computer Networks Lab Report
Sep 8

Research Proposal
Sep 15

Each item should show:

Title
Course
Date
Type
Status

Clicking a deadline should open the appropriate assignment/course/event details.

==================================================
UPCOMING TIMELINE
==================================================

Create:

Upcoming Academic Timeline

Example:

AUG 30
Assignment Submission
Database Management

SEP 2
Quiz 03
Software Engineering

SEP 5
Presentation
Software Engineering

SEP 10
Midterm Examination
Database Management

SEP 15
Research Proposal
Research Methodology

Use a clean vertical timeline.

==================================================
SCREEN 2 — EXAM DETAILS
==================================================

Create a detailed exam information screen.

Example:

Database Management

Midterm Examination

CSE 305

==================================================
EXAM HEADER
==================================================

Show:

Midterm Examination

Database Management
CSE 305

Date:

September 10, 2026

Time:

10:00 AM – 12:00 PM

Status:

Upcoming

Primary action:

[ Add Reminder ]

==================================================
EXAM INFORMATION
==================================================

Create a clean information section:

Course
Database Management

Course Code
CSE 305

Exam Type
Midterm

Date
September 10, 2026

Time
10:00 AM – 12:00 PM

Room
502

Instructor
Dr. Rahman

Section
B

Batch
52

Semester
Spring 2026

==================================================
COUNTDOWN
==================================================

Create:

5 Days Remaining

September 10, 2026

10:00 AM

Use a subtle progress/countdown visual.

Do NOT make it flashy.

==================================================
EXAM SYLLABUS
==================================================

Create:

Exam Syllabus

Topics:

1. Relational Database Model
2. ER Diagrams
3. SQL
4. Normalization
5. Transactions

Action:

[View Course Materials →]

This should connect to:

Course Details
→ Materials

==================================================
EXAM INSTRUCTIONS
==================================================

Create:

Exam Instructions

Example:

- Arrive 15 minutes before the exam.
- Bring your university ID.
- Bring necessary stationery.
- Electronic devices are not allowed unless permitted by the instructor.

Keep this section clean and readable.

==================================================
EXAM LOCATION
==================================================

Create:

Exam Location

Room 502

Building 3

Add a simple location/map-style visual.

Button:

[View Campus Location]

This is a UI concept only.

==================================================
REMINDER
==================================================

Create:

Exam Reminder

Allow the student to select:

1 day before
12 hours before
1 hour before
30 minutes before

Primary:

[Set Reminder]

After setting:

✓ Reminder Set

"You'll be notified 1 hour before the exam."

Use existing UniLink notification components.

==================================================
EXAM MATERIALS
==================================================

Create:

Related Materials

Lecture Notes
PDF

Revision Slides
PPTX

Practice Questions
PDF

Actions:

[View Materials]

Connect to the existing Course Materials interface.

==================================================
EXAM SCHEDULE CHANGES
==================================================

Create a schedule-change state.

Example:

⚠ Exam Schedule Updated

The exam has been moved from:

September 9
10:00 AM

to:

September 10
10:00 AM

Updated by:
Department of CSE

Updated:
Today • 9:30 AM

Action:

[View Updated Schedule]

==================================================
CANCELLED EXAM STATE
==================================================

Create a cancelled state.

Example:

Exam Cancelled

Database Management Midterm

September 10

Reason:

"Exam postponed due to university closure."

Show:

Cancelled

and:

"New exam date will be announced."

Use existing UniLink muted status styling.

==================================================
RESCHEDULED EXAM STATE
==================================================

Create:

Exam Rescheduled

Original:
September 10

New:
September 12

Room:
502

Show the change clearly.

==================================================
SCREEN 3 — EXAM CALENDAR
==================================================

Create a full calendar view for academic events.

Title:

Academic Calendar

Subtitle:

"View exams, quizzes, presentations, and academic deadlines."

Use the existing UniLink calendar visual language.

==================================================
CALENDAR HEADER
==================================================

Show:

September 2026

‹ Previous
Today
Next ›

View options:

Month
Week
List

Default:

Month

==================================================
CALENDAR EVENTS
==================================================

Example:

Sep 1
Database Assignment

Sep 2
Software Engineering Quiz

Sep 5
Presentation

Sep 8
Networks Lab Report

Sep 10
Database Midterm

Sep 15
Research Proposal

Use subtle event indicators.

Do NOT use excessive colors.

==================================================
CALENDAR EVENT DETAILS
==================================================

Clicking an event should show a popover/drawer.

Example:

Database Midterm

September 10
10:00 AM – 12:00 PM

Room 502

Database Management
CSE 305

[View Details]

==================================================
MONTH / WEEK / LIST
==================================================

Month View:

Traditional calendar grid with clean SaaS styling.

Week View:

Academic events positioned according to date/time.

List View:

Show:

Date
Event
Course
Type
Time
Status

Use the existing UniLink components.

==================================================
DEADLINE RELATIONSHIP
==================================================

The calendar should combine:

Exams
Quizzes
Assignments
Presentations
Lab Exams
Academic Deadlines

Make it easy to distinguish them using labels/icons rather than excessive colors.

==================================================
COURSE CONNECTION
==================================================

Connect the exam system with:

My Courses
→ Course Details
→ Exams Tab
→ Exam Details

Example:

Database Management
→ Exams
→ Midterm Examination
→ Exam Details

==================================================
ROUTINE CONNECTION
==================================================

Allow:

Exam Details
→ View Routine

This helps students find their regular class schedule and exam schedule together.

==================================================
ASSIGNMENT CONNECTION
==================================================

Academic deadlines should connect with the existing Assignments module.

Example:

Database Assignment 02
→ Assignment Details

Do NOT redesign the existing Assignment screens.

==================================================
NOTIFICATIONS
==================================================

Create notification examples:

"Database Midterm is in 5 days."

"Your Software Engineering quiz is tomorrow."

"Database Midterm schedule has changed."

"Your exam room has been updated."

Connect these conceptually to the existing Notifications module.

Do NOT create a separate notification system.

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

Maintain accessibility and readability.

==================================================
RESPONSIVE DESIGN
==================================================

Create mobile versions around 390px width.

EXAMS MOBILE:

- Compact header
- Search
- Horizontally scrollable filters
- Next Exam section
- Stacked exam list
- Academic deadline list

EXAM DETAILS MOBILE:

- Exam title
- Countdown
- Date/time
- Room
- Instructor
- Syllabus
- Instructions
- Reminder
- Related materials

Keep:

[Add Reminder]

easy to access.

EXAM CALENDAR MOBILE:

Do NOT squeeze the desktop calendar.

Use:

Date selector
Day/Week view
Vertical academic timeline
Exam/deadline list

Allow horizontal navigation between dates.

==================================================
EMPTY STATES
==================================================

Create:

No Upcoming Exams

"You don't have any upcoming exams."

and:

No Academic Deadlines

"You're all caught up."

Use existing UniLink empty-state components.

==================================================
LOADING STATES
==================================================

Create skeleton states for:

- Exam list
- Exam details
- Calendar
- Timeline

Use the existing UniLink loading system.

==================================================
ERROR STATES
==================================================

Create:

"Unable to load exam schedule."

[Try Again]

Also:

"Unable to load calendar."

[Try Again]

Use existing UniLink error components.

==================================================
INTERACTIONS
==================================================

Create prototype interactions for:

Exam List
→ Exam Details

Exam Details
→ Add Reminder

Add Reminder
→ Reminder Set

Exam Details
→ Course Materials

Exam Details
→ View Routine

Calendar Event
→ Exam Details

Month
→ Week

Week
→ List

Search
→ Filtered Results

Filters
→ Filtered Exams

Use subtle transitions consistent with the existing UniLink animation language.

==================================================
CR CONNECTION
==================================================

The existing CR Portal should conceptually support:

CR Portal
→ Exam Management
→ Add Exam
→ Edit Exam
→ Reschedule Exam
→ Cancel Exam
→ Publish Exam

Student:

CR publishes exam
→ Student receives notification
→ Exam appears in Exams & Deadlines
→ Student can view Exam Details

Do NOT redesign the CR Portal in this task.

==================================================
DESIGN QUALITY
==================================================

The final experience should feel like a production-ready SaaS academic platform.

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

- Traditional university portal aesthetics
- Excessive cards
- Excessive colors
- Heavy shadows
- Neon effects
- Unnecessary gradients
- Gaming-style countdowns
- Cluttered calendars
- Overly complicated tables

The experience should communicate:

"Every important academic date is organized and easy to understand."

IMPORTANT:

Create these as NEW Student Portal screens.

Do NOT modify previously completed UniLink screens.

Connect the new Exams & Deadlines module with:

My Courses
Course Details
Routine
Assignments
Notifications
CR Portal

Do NOT create a new sidebar or new design system.