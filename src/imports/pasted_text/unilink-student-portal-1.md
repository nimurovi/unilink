Continue building the existing UniLink project from the current Figma design.

IMPORTANT — PRESERVE EXISTING DESIGN

Do NOT redesign, delete, replace, or modify the existing:

* UniLink brand
* Logo
* Design system
* Color palette
* Typography
* Components
* Sidebar
* Navigation
* Light Mode
* Dark Mode
* Animation language
* Student Dashboard
* My Courses
* Course Details
* Routine
* Assignments
* Assignment Details
* Assignment Submission
* Exams & Deadlines
* Exam Details
* Exam Calendar
* CR Portal
* CR Routine Management

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

Create NEW authenticated Student Portal screens for:

1. CLASS MATERIALS
2. MATERIAL DETAILS / PREVIEW
3. SAVED MATERIALS

Also create the UI states required for searching, filtering, downloading, saving, previewing, and empty/error states.

Create them as NEW frames/pages inside the existing UniLink Figma project.

==================================================
SCREEN 1 — CLASS MATERIALS
==========================

Create a modern SaaS-style academic materials library.

Purpose:

Students should be able to find all lecture notes, slides, PDFs, lab files, study materials, question papers, and other course resources in one place.

Use the existing Student Dashboard sidebar.

Active navigation:

ACADEMIC
→ Class Materials

==================================================
HEADER
======

Title:

Class Materials

Subtitle:

"Find lecture notes, slides, lab files, and other course resources in one place."

Right side:

[ Upload Material ]

IMPORTANT:

For the Student Portal, "Upload Material" should only appear for users who have permission to upload materials.

Normal students should not see this action unless the system grants them upload permission.

CRs and authorized users can upload materials through their management portal.

Search field:

"Search materials..."

==================================================
SUMMARY
=======

Create four compact statistics cards using the EXISTING UniLink statistics-card component.

Total Materials

128

Recent Uploads

12

Saved Materials

24

My Courses

6

Keep the statistics clean and minimal.

==================================================
COURSE FILTER
=============

Create a course selector:

All Courses

Example:

Database Management
Algorithms
Software Engineering
Computer Networks
Artificial Intelligence
Operating Systems

==================================================
MATERIAL CATEGORIES
===================

Create filter tabs:

All
Lectures
Slides
Notes
Lab
Question Papers
Other

Use the existing UniLink segmented/tab component.

Do not introduce unnecessary colors.

==================================================
SEARCH AND FILTER
=================

Create:

Search materials...

Filters:

Course
Material Type
Uploader
Date

Sort:

Newest
Oldest
A–Z

Optional:

Semester

Spring 2026

==================================================
RECENT MATERIALS
================

Create a clean materials list/grid.

Do NOT make every item a large card.

Use a compact SaaS-style resource list.

Each material should contain:

* File icon
* Material title
* Course
* Course code
* Material type
* Uploader
* Upload date
* File size
* Actions

Example:

Lecture 05 — SQL Joins

Database Management
CSE 305

PDF
2.4 MB

Uploaded:
2 hours ago

Uploaded by:
Dr. Rahman

Actions:

Preview
Download
Save

---

Lecture 04 — Normalization

Database Management
CSE 305

PDF
1.8 MB

Uploaded:
Yesterday

Uploaded by:
Dr. Rahman

Actions:

Preview
Download
Save

---

Database Design Notes

Database Management
CSE 305

PDF
4.1 MB

Uploaded:
3 days ago

Uploaded by:
Ovi — CR

Actions:

Preview
Download
Save

==================================================
MATERIAL TYPES
==============

Support:

PDF
PPT
PPTX
DOC
DOCX
XLSX
ZIP
Image

Show file type using the existing UniLink file/icon system.

==================================================
MATERIAL ACTIONS
================

Each material should support:

Preview
Download
Save

Save should use a bookmark icon.

When saved:

Saved

The bookmark becomes active using the existing UniLink active-state styling.

Do NOT introduce a new visual style.

==================================================
MATERIAL HOVER
==============

On desktop hover:

* Slight elevation
* Subtle blue highlight
* Action buttons become more visible
* No heavy shadow
* No large animation

Clicking the material title or Preview:

→ Material Details / Preview

==================================================
SCREEN 2 — MATERIAL DETAILS / PREVIEW
=====================================

Create a professional document/material preview page.

Example:

Lecture 05 — SQL Joins

Database Management
CSE 305

Uploaded by:

Dr. Rahman

Uploaded:

2 hours ago

File:

PDF
2.4 MB

==================================================
MATERIAL HEADER
===============

Show:

Lecture 05 — SQL Joins

Database Management
CSE 305

PDF • 2.4 MB

Actions:

[ Download ]

[ Save ]

[ Share ]

Use existing UniLink button components.

==================================================
DOCUMENT PREVIEW
================

Create a large document preview area.

Show a realistic academic PDF preview.

Example content:

Database Management

Lecture 05

SQL Joins

Introduction

INNER JOIN

LEFT JOIN

RIGHT JOIN

FULL OUTER JOIN

Use a clean document viewer style.

Do NOT attempt to reproduce an actual copyrighted textbook or document.

Use fictional placeholder academic content.

==================================================
DOCUMENT VIEWER CONTROLS
========================

Create:

Previous Page
Page 5 of 18
Next Page

Zoom Out
Zoom In
Fit to Width

Full Screen

Download

Use subtle controls.

Do not overcrowd the viewer.

==================================================
MATERIAL INFORMATION
====================

Create:

Material Information

Course:
Database Management

Course Code:
CSE 305

Type:
Lecture

Uploaded By:
Dr. Rahman

Uploaded:
August 28, 2026

File Size:
2.4 MB

Semester:
Spring 2026

==================================================
DESCRIPTION
===========

Create:

Description

"Lecture slides covering SQL joins, join conditions, and common database query patterns."

==================================================
RELATED MATERIALS
=================

Create:

Related Materials

Lecture 04 — Normalization

Lecture 06 — Transactions

Database Design Notes

Use compact resource rows.

Clicking:

Related Material
→
Material Details / Preview

==================================================
COURSE CONNECTION
=================

Show:

Database Management
CSE 305

Action:

[ View Course → ]

Connect to:

Course Details

==================================================
SCREEN 3 — SAVED MATERIALS
==========================

Create:

Saved Materials

Subtitle:

"Quickly access the resources you've bookmarked."

Use the existing Student Portal sidebar.

Show:

Saved Materials
24

Search:

"Search saved materials..."

Filters:

All
PDF
Slides
Notes
Lab
Question Papers

==================================================
SAVED MATERIAL LIST
===================

Example:

Database Design Notes

Database Management
PDF
Saved 2 days ago

[Open]

SQL Practice Questions

Database Management
PDF
Saved 5 days ago

[Open]

Operating Systems Lecture 03

Operating Systems
PPTX
Saved Yesterday

[Open]

Each item should support:

Open
Download
Remove from Saved

==================================================
REMOVE FROM SAVED
=================

When the user clicks:

Remove from Saved

Show a lightweight confirmation/toast:

"Removed from Saved"

Allow:

[Undo]

Do not create an unnecessary confirmation modal for a simple save/unsave action.

==================================================
UPLOAD PERMISSIONS
==================

IMPORTANT:

Normal students should not automatically be able to upload course materials.

The UI should support role-based access.

Student:

Can:

* View
* Preview
* Download
* Save

CR / Authorized User:

Can:

* Upload
* Edit metadata
* Replace file
* Archive/delete according to permissions

Do NOT create a separate login.

Reuse the existing UniLink role-based portal concept.

==================================================
MATERIAL UPLOAD CONNECTION
==========================

Connect conceptually with the existing CR Portal.

Flow:

CR Portal
→ Class Materials Management
→ Upload Material
→ Select Course
→ Select Material Type
→ Add Title
→ Upload File
→ Preview
→ Publish

Then:

Published Material
→ Student Class Materials

Do NOT redesign the CR Portal in this task.

==================================================
COURSE DETAILS CONNECTION
=========================

Connect:

My Courses
→ Course Details
→ Materials Tab
→ Class Materials

Example:

Database Management
→ Materials
→ Lecture 05 — SQL Joins
→ Material Preview

Do NOT redesign the existing Course Details page.

==================================================
MATERIAL METADATA
=================

Every uploaded material should visually support:

Title
Description
Course
Course Code
Material Type
Uploader
Upload Date
File Size
Semester
Visibility

Do not show unnecessary technical fields to students.

==================================================
VISIBILITY
==========

Support material visibility:

Section Only
Batch
Department
University

For the Student Portal, students should only see materials they are authorized to access.

Represent this as a system behavior.

Do not add a complicated permission-management interface to the student screen.

==================================================
MATERIAL VERSION
================

Support updated materials.

Example:

Lecture 05 — SQL Joins

Version 2

Updated:
Today • 10:30 AM

Show:

"Updated material available."

Action:

[View Updated Version]

Keep version information subtle.

==================================================
MATERIAL ARCHIVE
================

If a material is archived:

Show:

Material Archived

"This resource is no longer available."

Do not show Download.

Provide:

[Back to Materials]

==================================================
EMPTY STATES
============

Create:

No Materials Found

"No materials match your search or filters."

[Clear Filters]

Also create:

No Saved Materials

"You haven't saved any materials yet."

[Browse Materials]

Also:

No Materials Available

"No course materials have been uploaded yet."

Use existing UniLink empty-state components.

==================================================
LOADING STATES
==============

Create skeleton/loading states for:

* Materials list
* Material preview
* Related materials
* Saved materials

Reuse the existing UniLink loading/skeleton system.

==================================================
ERROR STATES
============

Create:

Unable to load materials.

[Try Again]

Preview error:

"Unable to preview this file."

Actions:

[Download File]

[Try Again]

Download error:

"Download failed."

[Try Again]

Use existing UniLink error components.

==================================================
FILE TYPE SUPPORT
=================

Design the UI to support:

PDF
PPT
PPTX
DOC
DOCX
XLSX
ZIP
JPG
PNG

For unsupported files:

"Preview unavailable for this file type."

Show:

[Download File]

==================================================
LIGHT MODE
==========

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
=========

Create the same screens in the existing UniLink Dark Mode.

Do NOT redesign the layout.

Adapt:

Background
Surface
Text
Borders
Shadows
Active states

Maintain strong readability.

==================================================
RESPONSIVE DESIGN
=================

Create mobile versions around 390px width.

CLASS MATERIALS MOBILE:

* Compact header
* Search at top
* Horizontally scrollable category filters
* Course filter
* Stacked material list
* File type and size remain visible
* Touch-friendly actions

MATERIAL PREVIEW MOBILE:

* Compact header
* Document preview
* Viewer controls
* Material information
* Related materials
* Sticky or easily accessible Download/Save actions

SAVED MATERIALS MOBILE:

* Search
* Filter
* Stacked saved-material list
* Open and remove actions

Do NOT simply shrink the desktop layout.

==================================================
INTERACTIONS
============

Create prototype interactions for:

Materials
→ Material Preview

Preview
→ Material Details

Download
→ Download State

Save
→ Saved State

Saved
→ Remove from Saved

Search
→ Filtered Materials

Course Filter
→ Filtered Materials

Material Type
→ Filtered Materials

Related Material
→ Material Preview

View Course
→ Existing Course Details

Saved Materials
→ Saved Material

Upload Material
→ Existing/Planned CR Material Management

Use subtle transitions consistent with the existing UniLink animation language.

==================================================
TOAST NOTIFICATIONS
===================

Create lightweight toast states:

"Material saved"

"Removed from Saved"

"Download started"

"Material updated"

"Material unavailable"

Use the existing UniLink notification/toast component.

==================================================
ACCESSIBILITY
=============

Maintain:

* Strong text contrast
* Clear focus states
* Readable file information
* Large enough touch targets
* Clear button labels
* Icons with meaningful labels/tooltips

Do not rely only on color to communicate status.

==================================================
DESIGN QUALITY
==============

The final experience should feel like a production-ready SaaS academic resource platform.

Maintain:

* Existing UniLink design system
* Existing components
* Existing sidebar
* Existing navigation
* Existing typography
* Existing colors
* Existing Light/Dark themes
* Existing animation language

Avoid:

* Traditional university portal aesthetics
* Excessive cards
* Excessive colors
* Heavy shadows
* Neon effects
* Unnecessary gradients
* Cluttered file managers
* Spreadsheet-style interfaces
* Gaming-style visuals

The experience should communicate:

"All my academic resources are organized and easy to access."

IMPORTANT:

Create these as NEW Student Portal screens.

Do NOT redesign previously completed UniLink screens.

Do NOT create a new sidebar.

Do NOT create a new design system.

Connect the Class Materials module with:

My Courses
Course Details
Assignments
Exams & Deadlines
Notifications
CR Portal
CR Material Management

```

After you finish this one, the next module should be **Announcements**. That will be especially important because UniLink's core idea is centralizing announcements from the university, department, teachers, clubs, and **CRs** in one personalized feed.
```
