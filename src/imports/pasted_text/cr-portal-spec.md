Continue building the existing UniLink project from the current Figma design.

IMPORTANT — PRESERVE EXISTING DESIGN

Do NOT redesign, delete, replace, or modify the existing:

- UniLink brand
- Logo
- Design system
- Color palette
- Typography
- Components
- Sidebar style
- Navigation style
- Light Mode
- Dark Mode
- Animation language
- Landing Page
- Student Dashboard
- My Courses
- Course Details
- Routine

Reuse the existing UniLink design system and components.

Do NOT create a new visual language.

Create a NEW authenticated portal for:

# CR PORTAL
Class Representative Dashboard

Create it as NEW pages/frames inside the existing UniLink Figma project.

==================================================
ROLE
==================================================

The CR (Class Representative) is responsible for helping manage academic and campus information for their assigned section.

Example CR:

Ovi

Role:
Class Representative

Department:
Computer Science & Engineering

Batch:
52

Section:
B

Semester:
Spring 2026

The CR should only manage information related to their assigned section unless they have additional permissions.

==================================================
CR DASHBOARD
==================================================

Create a modern SaaS-style dashboard.

The dashboard should allow the CR to quickly:

- Manage routine
- Publish schedule changes
- Upload class materials
- Create assignments
- Add exam information
- Publish announcements
- Share events
- Manage Lost & Found reports
- View section students
- See recent activity

==================================================
SIDEBAR
==================================================

Create a CR-specific sidebar using the EXISTING UniLink sidebar component.

Group navigation:

OVERVIEW

• Dashboard
• Notifications

ACADEMIC

• Routine
• Class Materials
• Assignments
• Exams
• Announcements

CAMPUS

• Events
• Lost & Found

SECTION

• My Section
• Section Students

ACCOUNT

• Profile
• Settings
• Help & Support

Dashboard should be active.

At the bottom show:

Ovi
CR • CSE 52-B

==================================================
TOP HEADER
==================================================

Title:

Good morning, Ovi 👋

Subtitle:

"Manage academic information and updates for your section."

Right side:

• Search
• Notifications
• Light/Dark Mode toggle
• Profile avatar

==================================================
SECTION CONTEXT
==================================================

Create a clearly visible section context indicator:

Your Managed Section

CSE
Batch 52
Section B

Spring 2026

Use a compact existing UniLink information component.

This should make it clear that the CR is managing ONLY this section.

==================================================
QUICK ACTIONS
==================================================

Create a prominent Quick Actions section.

Actions:

+ Update Routine

+ Upload Class Material

+ Create Assignment

+ Add Exam

+ Post Announcement

+ Create Event

Use existing UniLink buttons/components.

The primary action should be:

Update Routine

==================================================
SUMMARY CARDS
==================================================

Create four statistics cards using the existing UniLink statistics-card component.

Students
42

Upcoming Classes
18

Pending Updates
3

Announcements
12

Keep the cards clean and professional.

==================================================
ROUTINE MANAGEMENT
==================================================

Create a large section:

Routine Management

Show a compact preview of the current section routine.

Example:

Sunday
10:00 AM
Database Management
Room 502

12:00 PM
Algorithms
Room 405

Monday
9:00 AM
Computer Networks
Room 307

3:00 PM
Software Engineering
Room 301

Buttons:

[Edit Routine]

[Update Schedule]

[View Full Routine]

==================================================
UPDATE ROUTINE WORKFLOW
==================================================

Create the UI for:

Update Routine

The CR should be able to add/edit a class.

Form fields:

Course
Database Management

Course Code
CSE 305

Instructor
Dr. Rahman

Day
Sunday

Start Time
10:00 AM

End Time
11:30 AM

Room
502

Section
B

Buttons:

[Save Draft]

[Publish Update]

==================================================
ROUTINE VALIDATION
==================================================

Before publishing a routine update, show validation.

Examples:

✓ No scheduling conflict

✓ Course exists

✓ Instructor selected

✓ Room selected

✓ Time is valid

If a conflict exists:

⚠ Schedule Conflict

Database Management
10:00 AM – 11:30 AM

conflicts with:

Algorithms
11:00 AM – 12:30 PM

Do NOT allow accidental overlapping schedules.

Show:

[Resolve Conflict]

==================================================
ROUTINE CHANGE HISTORY
==================================================

Create:

Recent Routine Changes

Example:

Room changed

Database Management
502 → 605

Updated by:
Ovi

10 minutes ago

Another:

Class cancelled

Algorithms
Today • 12:00 PM

Updated by:
Ovi

1 hour ago

Button:

View Change History →

==================================================
CLASS MATERIAL MANAGEMENT
==================================================

Create:

Class Materials

Show:

Lecture 05 — SQL Joins
Database Management
PDF
Uploaded 2 hours ago

Graph Traversal
Algorithms
PDF
Uploaded Yesterday

Buttons:

[Upload Material]

[View All Materials]

==================================================
UPLOAD MATERIAL MODAL
==================================================

Create a modal:

Upload Class Material

Course
Database Management

Title
Lecture 05 — SQL Joins

Description
Optional

Upload File
Drag & Drop

Supported:

PDF
PPT
PPTX
DOC
DOCX
Images

Visibility:

CSE 52-B

Buttons:

[Cancel]

[Upload & Publish]

==================================================
ASSIGNMENT MANAGEMENT
==================================================

Create:

Assignments

Show:

Database Assignment 02
Due Tomorrow
Not Submitted: 18 students

Algorithms Problem Set
Due Friday
Not Submitted: 11 students

Actions:

[Create Assignment]

[View Assignment]

==================================================
CREATE ASSIGNMENT
==================================================

Form:

Course

Assignment Title

Description

Attachment

Issue Date

Due Date

Due Time

Target:

CSE 52-B

Buttons:

[Save Draft]

[Publish Assignment]

==================================================
EXAM MANAGEMENT
==================================================

Create:

Upcoming Exams

Example:

Midterm Examination

Database Management

September 10
10:00 AM

Room 502

Actions:

[Add Exam]

[Edit]

==================================================
ANNOUNCEMENT MANAGEMENT
==================================================

Create:

Recent Announcements

Example:

"Database class moved to Room 605"

Published
30 minutes ago

"Midterm syllabus updated"

Published
Yesterday

Actions:

[Create Announcement]

[View All]

==================================================
CREATE ANNOUNCEMENT
==================================================

Form:

Announcement Title

Message

Category:

Academic
Schedule
Exam
Important
General

Attachment

Target Audience:

CSE
Batch 52
Section B

Publishing:

Save Draft
Publish Now

==================================================
EVENT MANAGEMENT
==================================================

Create:

Section / Campus Events

Show:

AI Workshop
Tomorrow
CSE Auditorium

Programming Contest
Saturday
Lab 3

Actions:

[Create Event]

[View Events]

==================================================
LOST & FOUND MANAGEMENT
==================================================

Create:

Lost & Found

Show recent reports:

Lost:
AirPods
Central Library
Today

Found:
Student ID Card
Building 3
Yesterday

Actions:

[Report Lost Item]

[Report Found Item]

[View All Reports]

==================================================
SECTION STUDENTS
==================================================

Create:

My Section

CSE • Batch 52 • Section B

42 Students

Show a compact student list:

Name
Student ID
Status

Example:

Student A
Active

Student B
Active

Student C
Active

Add:

Search students...

Filters:

All
Active
Inactive

The CR should be able to VIEW students.

Do NOT give the CR permission to edit sensitive student information.

==================================================
RECENT ACTIVITY
==================================================

Create:

Recent Activity

Examples:

Routine updated
10 minutes ago

Class material uploaded
1 hour ago

Announcement published
2 hours ago

Exam schedule added
Yesterday

Use a clean activity timeline.

==================================================
NOTIFICATION / APPROVAL STATUS
==================================================

If the system uses department approval, show:

Pending Approval

Routine Update
Database Management

Status:
Pending Department Approval

and:

Published

Announcement
Classroom changed

Status:
Published

Use subtle status indicators.

==================================================
PERMISSION MODEL
==================================================

Visually communicate that the CR manages only their assigned section.

CR CAN:

✓ Manage section routine
✓ Upload class materials
✓ Create assignments
✓ Add exam information
✓ Publish section announcements
✓ Share events
✓ Manage Lost & Found reports
✓ View section students

CR CANNOT:

✕ Manage university-wide settings
✕ Manage other departments
✕ Manage other sections
✕ Delete student accounts
✕ Change sensitive student information
✕ Manage system administrators

Do not make this permission list visually dominant; it is primarily a product-behavior requirement.

==================================================
PUBLISH / DRAFT SYSTEM
==================================================

Content should support:

Draft
Pending Approval
Published
Archived

Use existing UniLink status components.

Example:

Routine Update

Draft

[Edit]
[Submit for Approval]

Another:

Announcement

Published

[View]
[Edit]

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

Create the same CR Portal in the existing UniLink Dark Mode.

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

Mobile should include:

- Compact header
- Quick Actions
- Summary cards
- Routine preview
- Recent announcements
- Recent materials
- Recent activity
- Bottom navigation

Do NOT simply shrink the desktop layout.

Use a clean mobile SaaS dashboard.

==================================================
INTERACTIONS
==================================================

Create prototype interactions for:

Dashboard → Routine

Update Routine → Routine editor

Save Draft → Draft state

Publish → Published/Pending Approval state

Upload Material → Upload modal

Create Assignment → Assignment form

Add Exam → Exam form

Create Announcement → Announcement form

Create Event → Event form

Lost & Found → Reports

My Section → Student list

Routine Change → Change details

Use subtle UniLink transitions.

==================================================
DESIGN QUALITY
==================================================

The CR Portal should look like a professional SaaS administration interface.

It should feel related to the Student Portal but clearly communicate that this is a management interface.

Maintain:

- Existing UniLink design system
- Existing sidebar
- Existing components
- Existing typography
- Existing colors
- Existing Light/Dark themes
- Existing animation language

Avoid:

- Traditional university admin-panel design
- Excessive tables
- Excessive cards
- Neon colors
- Heavy gradients
- Excessive shadows
- Cluttered forms
- Overly complex dashboards

The final experience should communicate:

"CRs can easily manage and share information with their section."

IMPORTANT:

Create these as NEW CR Portal screens.

Do NOT modify previously completed Student Portal screens.

Do NOT redesign the existing Routine screen.

The CR Routine editor should be connected conceptually to the existing Student Routine screen.