Continue building the existing UniLink project from the current Figma design.

IMPORTANT:
Do NOT redesign the existing UniLink design system, colors, typography, navigation, sidebar, components, Light Mode, Dark Mode, responsive system, or animation language.

This is a targeted enhancement.

==================================================
STUDENT NOTE UPLOAD
==================================================

The existing Student Portal currently allows students to view course materials, but there is no clear way for students to upload their own class notes.

Add a student note upload capability.

The feature must be accessible from:

Student
→ My Courses
→ Course Details
→ Materials

==================================================
COURSE MATERIALS PAGE
==================================================

Enhance the existing Course Details → Materials tab.

At the top right add:

[ + Upload Note ]

Use the existing UniLink primary button component.

Do NOT add a large upload section to the main Student Dashboard.

The upload action belongs inside the relevant course Materials page.

==================================================
UPLOAD NOTE MODAL / PAGE
==================================================

When the student clicks:

[ + Upload Note ]

open a clean UniLink modal or dedicated upload screen.

Title:

Upload Note

Subtitle:

"Share your class notes and study materials with your classmates."

Fields:

Note Title

Placeholder:

"e.g. Normalization Cheat Sheet"

==================================================
CATEGORY
==================================================

Category dropdown:

Student Note

Optional categories:

Lecture Notes
Study Notes
Exam Preparation
Cheat Sheet
Lab Notes
Other

The default source should remain:

Student Note

==================================================
COURSE
==================================================

Show the current course automatically.

Example:

Course:

Database Management

CSE 305

Do not require the student to manually select another course when uploading from Course Details.

Allow changing the course only if appropriate.

==================================================
DESCRIPTION
==================================================

Optional field:

Description

Placeholder:

"Briefly describe this note..."

==================================================
FILE UPLOAD
==================================================

Create a clear drag-and-drop / file selection area.

Example:

Upload your file

Drag and drop your file here

or

[ Choose File ]

Supported:

PDF
PPT
PPTX
DOC
DOCX
JPG
PNG

Maximum file size:

10 MB

Show selected file information after upload selection:

Normalization_Cheat_Sheet.pdf

2.4 MB

[Remove]

==================================================
VISIBILITY
==================================================

Show:

Visible to:

My Section

Example:

CSE
Batch 52
Section B

The student should not be able to broadcast a course note to unrelated university students from this screen.

Use the existing UniLink audience/targeting component.

==================================================
MODERATION
==================================================

Important:

Student-uploaded notes should NOT automatically become official course materials.

After upload, show:

Status:

Pending Review

Description:

"Your note will be reviewed before being shared with other students."

Use the existing UniLink status component.

==================================================
ACTIONS
==================================================

[Cancel]

[Upload Note]

Use existing UniLink buttons.

The primary action should be:

Upload Note

==================================================
UPLOAD SUCCESS
==================================================

After successful upload, show:

✓ Note uploaded successfully

Normalization Cheat Sheet

Your note has been submitted for review.

Status:

Pending Review

[View Note]

[Back to Materials]

==================================================
MATERIALS LIST
==================================================

After upload, the student's note should appear in the materials list.

Example:

Normalization Cheat Sheet

PDF
Student Note

Uploaded by:
You

Just now

Status:
Pending Review

Do not display it as an Official Material.

==================================================
APPROVED NOTE
==================================================

Create the approved state as well.

Example:

Normalization Cheat Sheet

PDF
Student Note

Uploaded by:
Naimur

Approved

2 days ago

Actions:

[Preview]

[Save]

==================================================
MATERIAL SOURCE LABELS
==================================================

Ensure the Materials page clearly distinguishes:

Official Material
Teacher-uploaded

Class Note
CR-uploaded

Student Note
Student-uploaded

Use existing UniLink badges/components.

Do NOT introduce new colors.

==================================================
MY NOTES
==================================================

Add a small filter or section inside Materials:

All
Official
Class Notes
Student Notes
My Notes

"My Notes" should show notes uploaded by the current student.

Example:

My Notes

3 uploads

Pending Review
1

Approved
2

==================================================
STUDENT NOTE MANAGEMENT
==================================================

Inside My Notes, allow the student to:

View

Preview

Edit metadata while pending review

Delete own note

Do not allow the student to modify an approved note in a way that bypasses moderation.

If an approved note is edited, show:

"Changes will require review again."

==================================================
REVIEW STATUS
==================================================

Support:

Pending Review

Approved

Rejected

If rejected, show:

Rejected

Reason:

"File could not be verified as a useful course note."

Action:

[View Reason]

[Upload New Version]

==================================================
STUDENT DASHBOARD CONNECTION
==================================================

Do NOT add a large upload component to the Student Dashboard.

Instead, after a successful upload, the dashboard may show a compact notification:

📚 Note uploaded

"Normalization Cheat Sheet has been submitted for review."

[View Note]

==================================================
LIGHT MODE
==================================================

Use the existing UniLink Light Mode.

Do NOT introduce new colors.

==================================================
DARK MODE
==================================================

Create the same upload flow in the existing UniLink Dark Mode.

Do not redesign the layout.

==================================================
MOBILE
==================================================

Create a responsive version around 390px width.

Upload Note:

- Single-column form
- Large file upload area
- Touch-friendly controls
- Clear selected file
- Sticky or clearly visible Upload button

==================================================
INTERACTIONS
==================================================

Prototype:

Materials
→ Upload Note

Upload Note
→ File Selected

Upload Note
→ Upload Success

Upload Success
→ My Note

My Note
→ Preview

Use the existing UniLink transition language.

==================================================
FINAL REQUIREMENT
==================================================

The final Student Portal must clearly support this workflow:

Student
↓
My Courses
↓
Course
↓
Materials
↓
+ Upload Note
↓
Select file
↓
Student Note
↓
My Section
↓
Upload
↓
Pending Review
↓
Approved
↓
Visible to relevant students

Do NOT treat student notes as official teacher materials.

Do NOT add a large upload button to the main dashboard.

Preserve all existing UniLink screens and design.

Only add the missing Student Note Upload functionality.