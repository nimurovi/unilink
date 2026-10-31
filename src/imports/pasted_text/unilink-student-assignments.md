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
- CR Routine Management

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

Create NEW authenticated Student Portal screens for:

1. ASSIGNMENTS
2. ASSIGNMENT DETAILS
3. ASSIGNMENT SUBMISSION

Create them as NEW pages/frames inside the existing UniLink Figma project.

==================================================
SCREEN 1 — ASSIGNMENTS
==================================================

Create a modern SaaS-style academic assignment management page.

Purpose:

Students should be able to see, organize, track, and submit all assignments from one place.

Use the existing Student Dashboard sidebar.

Active navigation:

ACADEMIC
→ Assignments

==================================================
HEADER
==================================================

Title:

Assignments

Subtitle:

"Track your assignments, deadlines, submissions, and academic progress."

Right side:

[ Calendar View ]

Search field:

"Search assignments..."

==================================================
SUMMARY
==================================================

Create four compact statistics cards using the EXISTING UniLink statistics-card component.

Total Assignments
12

Due Soon
4

Submitted
6

Overdue
2

Keep these cards clean and professional.

==================================================
FILTERS
==================================================

Create filters:

All
Upcoming
Due Soon
Submitted
Completed
Overdue

Add:

Course

[ All Courses ]

Semester

[ Spring 2026 ]

Sort:

Due Date
Newest
Oldest

Use the existing UniLink filter/dropdown components.

==================================================
ASSIGNMENT LIST
==================================================

Create a clean responsive assignment list.

Do NOT make every assignment look like a large card.

Use a professional SaaS list/table hybrid.

Each assignment should show:

- Assignment title
- Course
- Course code
- Due date
- Due time
- Status
- Submission status
- Progress/indicator
- Action

Example:

Database Assignment 02

Database Management
CSE 305

Due:
Tomorrow • 11:59 PM

Status:
Not Submitted

[View Assignment →]


Algorithms Problem Set 03

Algorithms
CSE 301

Due:
Friday • 11:59 PM

Status:
Submitted

[View]


Software Engineering Report

Software Engineering
CSE 310

Due:
Sep 5 • 11:59 PM

Status:
In Progress

[Continue]


Computer Networks Lab Report

Computer Networks
CSE 307

Due:
Sep 2 • 11:59 PM

Status:
Overdue

[View]

==================================================
ASSIGNMENT STATUS
==================================================

Use the existing UniLink status system.

Statuses:

Upcoming
Due Soon
In Progress
Submitted
Completed
Overdue

Do not introduce excessive colors.

Status indicators should be subtle and accessible.

==================================================
DUE DATE VISUALIZATION
==================================================

Make approaching deadlines easy to notice.

Example:

Due Tomorrow

Use a subtle visual emphasis.

For overdue:

Overdue by 2 days

Do not use aggressive red styling.

==================================================
ASSIGNMENT SEARCH
==================================================

Search should support:

Assignment title
Course name
Course code

Example:

Searching:

"Database"

should show:

Database Assignment 01
Database Assignment 02
Database Project

==================================================
EMPTY STATE
==================================================

Create an empty state:

"No assignments found"

Depending on the situation:

"No assignments due soon."

or:

"You've completed all your assignments."

Use a simple UniLink-style illustration/icon.

==================================================
CALENDAR VIEW
==================================================

Create an optional Calendar View.

Show assignment deadlines on a monthly calendar.

Example:

September 2026

Sep 2
Computer Networks Lab

Sep 5
Software Engineering Report

Sep 10
Database Assignment 03

Use subtle deadline indicators.

Clicking an assignment:

Calendar item
→ Assignment Details

==================================================
SCREEN 2 — ASSIGNMENT DETAILS
==================================================

Create a detailed assignment page.

Example:

Database Assignment 02

Course:

Database Management
CSE 305

Instructor:

Dr. Rahman

==================================================
ASSIGNMENT HEADER
==================================================

Show:

Database Assignment 02

Database Management
CSE 305

Due:

Tomorrow
11:59 PM

Status:

Not Submitted

Add a prominent but clean action:

[ Submit Assignment ]

==================================================
ASSIGNMENT INFORMATION
==================================================

Create:

Assignment Description

"Design a normalized relational database for a university management system. Identify entities, relationships, primary keys, and foreign keys."

Then:

Instructions

1. Create an ER diagram.
2. Convert the ER model into relational tables.
3. Apply normalization up to 3NF.
4. Submit the final PDF.

==================================================
ATTACHMENTS
==================================================

Create:

Assignment Files

Database_Assignment_02.pdf

PDF
2.4 MB

Actions:

[ Preview ]

[ Download ]

==================================================
DEADLINE
==================================================

Create a clean deadline section:

Due Date

September 1, 2026

11:59 PM

Time Remaining:

1 Day 4 Hours

Do not make the countdown look like a gaming interface.

==================================================
SUBMISSION STATUS
==================================================

Create:

Your Submission

Status:

Not Submitted

Message:

"You haven't submitted this assignment yet."

Primary button:

[ Submit Assignment ]

==================================================
GRADING INFORMATION
==================================================

Create:

Assessment

Total Marks
20

Submission Attempts
1 of 3

Feedback
Not available yet

==================================================
COURSE CONNECTION
==================================================

Show:

Course:

Database Management

CSE 305

Instructor:
Dr. Rahman

Action:

[ View Course → ]

==================================================
RECENT ACTIVITY
==================================================

Show:

Assignment posted
Aug 27

Updated by Dr. Rahman
Aug 27

Deadline changed
Aug 28

Use the existing UniLink activity/timeline component.

==================================================
SCREEN 3 — ASSIGNMENT SUBMISSION
==================================================

Create a dedicated submission interface.

Title:

Submit Assignment

Assignment:

Database Assignment 02

Database Management
CSE 305

Deadline:

September 1, 2026
11:59 PM

==================================================
FILE UPLOAD
==================================================

Create a large but clean upload area.

Text:

"Drag & drop your files here"

or:

"Choose files from your device"

Supported formats:

PDF
DOC
DOCX
PPT
PPTX
ZIP
JPG
PNG

Maximum file size:

20 MB per file

Button:

[ Choose Files ]

==================================================
UPLOADED FILES
==================================================

After uploading, show:

Database_Assignment_02.pdf

2.4 MB

Uploaded just now

Actions:

Preview
Remove

Allow multiple files if needed.

==================================================
SUBMISSION NOTE
==================================================

Add:

Additional Note

Optional

Placeholder:

"Add a note for your instructor..."

==================================================
SUBMISSION CONFIRMATION
==================================================

Before final submission show:

Submission Summary

Assignment:
Database Assignment 02

Files:
1 file

Deadline:
Sep 1, 2026 • 11:59 PM

Attempts:
1 of 3

Checkbox:

☐ I confirm that this is my final submission.

Primary action:

[ Submit Assignment ]

==================================================
SUBMISSION SUCCESS
==================================================

After submitting:

✓ Assignment Submitted

Database Assignment 02

Submitted:
Aug 30, 2026 • 8:42 PM

Status:

Submitted

Show:

Submission ID:
UNILINK-DB-2026-00231

Actions:

[ View Submission ]

[ Back to Assignments ]

==================================================
LATE SUBMISSION
==================================================

Create a late-submission state.

Example:

Deadline Passed

This assignment was due:

September 1
11:59 PM

You are submitting late.

Show:

Late by:
2 hours

If late submissions are allowed:

[ Submit Late Assignment ]

If late submissions are not allowed:

"Late submissions are not accepted for this assignment."

Use the existing UniLink warning/error styles.

==================================================
SUBMISSION HISTORY
==================================================

Create:

Submission History

Attempt 1

Aug 30
8:42 PM

Submitted

Attempt 2

Sep 1
10:30 AM

Updated Submission

Show:

View Submission

Do not expose unnecessary technical information.

==================================================
EDIT / RESUBMIT
==================================================

If resubmission is allowed:

Show:

[ Resubmit ]

Message:

"You can submit again until the deadline."

Show:

Attempts remaining:
2

If no attempts remain:

"Maximum submission attempts reached."

==================================================
ASSIGNMENT COMMENTS / FEEDBACK
==================================================

Create a feedback section.

Before grading:

Feedback
"Your instructor hasn't provided feedback yet."

After grading:

Marks:
18 / 20

Instructor Feedback:

"Good database design. Review the normalization section."

Use the existing UniLink typography and components.

==================================================
NOTIFICATIONS
==================================================

Assignments should connect conceptually with UniLink notifications.

Examples:

"Database Assignment 02 is due tomorrow."

"Your Software Engineering assignment was graded."

"Assignment deadline changed."

Do not create a separate notification system.

==================================================
STUDENT → CR WORKFLOW
==================================================

This assignment system must connect with the existing CR Portal.

Conceptual flow:

CR Portal
→ Create Assignment
→ Publish
→ Student Assignments

Student:

Assignments
→ Assignment Details
→ Submit Assignment

Do NOT redesign the existing CR Portal.

==================================================
COURSE CONNECTION
==================================================

Assignments must also connect with:

My Courses
→ Course Details
→ Assignments Tab
→ Assignment Details

For example:

Database Management
→ Assignments
→ Database Assignment 02
→ Submit

==================================================
LIGHT MODE
==================================================

Use the existing UniLink Light Mode.

Do NOT introduce new colors.

Reuse the established:

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

ASSIGNMENTS MOBILE:

- Compact header
- Search at top
- Horizontally scrollable filters
- Assignment list becomes stacked cards/list items
- Due dates remain prominent
- Status remains visible
- Touch-friendly buttons

ASSIGNMENT DETAILS MOBILE:

- Compact header
- Deadline section near top
- Description
- Instructions
- Attachments
- Submission status
- Submit button

SUBMISSION MOBILE:

- Assignment summary
- Upload area
- Uploaded files
- Note field
- Confirmation
- Submit button

Keep the primary action easy to access.

==================================================
INTERACTIONS
==================================================

Create prototype interactions for:

Assignments
→ Assignment Details

Assignment Details
→ Submit Assignment

Submit Assignment
→ Submission Confirmation

Confirm Submission
→ Submission Success

View Submission
→ Submission Details

Resubmit
→ Submission Screen

Course
→ Course Details

Calendar View
→ Assignment Details

Search
→ Filtered Assignments

Filters
→ Filtered Assignment List

Use subtle transitions consistent with the existing UniLink animation language.

==================================================
LOADING STATES
==================================================

Create loading states for:

- Assignment list
- Assignment details
- File upload
- Submission

Use the existing UniLink skeleton/loading components.

==================================================
ERROR STATES
==================================================

Create:

Unable to load assignments.

[Try Again]

For upload failure:

"File upload failed."

[Try Again]

For submission failure:

"Your assignment could not be submitted."

[Try Again]

Use the existing UniLink error components.

==================================================
DESIGN QUALITY
==================================================

The final experience should look like a production-ready SaaS academic platform.

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
- Gaming-style progress indicators
- Cluttered forms
- Overly complicated tables

The experience should communicate:

"Every assignment, deadline, and submission is organized in one place."

IMPORTANT:

Create these as NEW Student Portal screens.

Do NOT redesign previously completed UniLink screens.

Connect the new Assignment screens conceptually and through prototype navigation with:

My Courses
Course Details
CR Portal
CR Assignment Management
Notifications