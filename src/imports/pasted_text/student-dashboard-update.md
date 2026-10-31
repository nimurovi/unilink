Continue building the existing UniLink project from the current Figma design.

IMPORTANT:
Do NOT redesign or replace the existing UniLink Student Dashboard.

Do NOT change:
- UniLink branding
- Existing colors
- Typography
- Sidebar
- Navigation
- Light Mode
- Dark Mode
- Existing components
- Existing spacing system
- Existing animation language
- Existing responsive behavior

Reuse the existing UniLink components and visual language.

This task is ONLY an enhancement of the existing Student Dashboard to properly connect it with the new CR Class Coordination system and collaborative campus information flow.

==================================================
STUDENT DASHBOARD — INFORMATION FLOW UPDATE
==================================================

Update the existing Student Dashboard so students can clearly see:

1. Class Updates from CRs
2. Official academic updates from Teachers/Admins
3. Events shared by CRs
4. Source/uploader information for materials
5. Relevant personalized notifications

Do not create a completely new dashboard.

Modify the existing dashboard components where appropriate.

==================================================
1. CLASS UPDATES
==================================================

Add or enhance a compact section called:

Class Updates

Subtitle:

"Recent updates from your class."

Use the existing UniLink card/list components.

Example:

CSE 305
⚠️ Class Delayed

Today's Database Management class has been delayed.

Original:
10:00 AM

Updated:
11:00 AM

Posted by:
CR

10 minutes ago

[View Update →]

Another:

CSE 307
📍 Room Changed

Today's class has moved from Room 402 to Room 405.

Posted by:
CR

1 hour ago

[View Update →]

Another:

CSE 301
📅 Extra Class

Additional class scheduled for Thursday at 2:00 PM.

Posted by:
CR

Yesterday

[View Update →]

==================================================
CLASS UPDATE SOURCE
==================================================

Every class update must clearly identify its source.

For example:

Posted by CR

Do NOT make the CR look like a teacher.

Use a subtle role/source badge:

CR

The badge should use existing UniLink styling.

==================================================
2. IMPORTANT UPDATES
==================================================

Enhance the existing Important Updates / Announcements component.

It should support different information sources.

Example:

📚 Academic Update

Midterm syllabus updated

Dr. Rahman

2 hours ago

Source:
Teacher


Another:

⚠️ Class Update

CSE 305 class delayed to 11:00 AM

CR

10 minutes ago


Another:

📢 University Announcement

University seminar registration is now open.

University Administration

Yesterday

==================================================
SOURCE TYPES
==================================================

Support these source labels:

Teacher

CR

University

Department

Club

System

Use the existing UniLink badge/status system.

Do not introduce new colors.

Use the established UniLink color hierarchy.

==================================================
3. UPCOMING EVENTS
==================================================

Enhance the existing Events section on the Student Dashboard.

Show relevant events.

Example:

Upcoming Events

Hackathon 2026

September 15

9:00 AM – 6:00 PM

University Auditorium

Organized by:
CSE Club

Shared by:
CR

Registration closes:
September 10

[View Event →]

Another:

AI Workshop

September 18

Seminar Hall

Organized by:
CSE Department

[View Event →]

==================================================
EVENT SHARING
==================================================

If an event was shared by a CR, clearly show:

Shared by CR

This means:

Official Event
↓
CR shares with assigned section
↓
Student receives event
↓
Event appears on Student Dashboard

Do NOT imply that the CR is the event organizer unless they actually are.

==================================================
4. EVENT REGISTRATION
==================================================

When an event contains an external registration link, show:

Registration Required

[Register Now ↗]

If the registration deadline exists:

Registration closes:
September 10

Do not display raw URLs.

The button should open the external registration destination through the existing prototype interaction.

==================================================
5. RECENT MATERIALS
==================================================

Enhance the existing Recent Materials component.

Every material should clearly identify its source.

Example:

Lecture 05 — SQL Joins

PDF

Official Material

Uploaded by:
Dr. Rahman

2 hours ago

Another:

Normalization Notes

PDF

Class Note

Uploaded by:
CR

Yesterday

Another:

SQL Cheat Sheet

PDF

Student Note

Uploaded by:
Student

Yesterday

==================================================
MATERIAL TYPES
==================================================

Support these source/category labels:

Official Material
Class Note
Student Note

Official Material:
Uploaded by authorized teachers.

Class Note:
Uploaded by CR or authorized class coordinators.

Student Note:
Uploaded by students.

Use existing UniLink badges.

Do not create a new visual system.

==================================================
6. PERSONALIZED DASHBOARD LOGIC
==================================================

The Student Dashboard should prioritize information relevant to the student's:

University
Department
Program
Batch
Section
Courses

Example:

Student:

CSE
Batch 52
Section B

The dashboard should prioritize:

- Section-specific class updates
- Enrolled course information
- Relevant events
- Relevant announcements
- Relevant opportunities
- Relevant notifications

Do not show unrelated section updates.

==================================================
7. NOTIFICATION PREVIEW
==================================================

Enhance the existing notification area to support CR updates.

Example:

🔔

CSE 305 Class Update

Today's class will start at 11:00 AM instead of 10:00 AM.

Posted by:
CR

10 minutes ago

[View]

Another:

🎓

New Event

Hackathon 2026 was shared with your section.

Shared by:
CR

[View Event]

Another:

📚

New Class Note

Normalization Notes were uploaded.

Uploaded by:
CR

[View Material]

==================================================
8. INFORMATION PRIORITY
==================================================

Use the following priority hierarchy:

URGENT / TIME-SENSITIVE

Class cancellation
Class delay
Room change
Exam change
Important university announcement

↓

IMPORTANT

Academic announcements
Assignment deadlines
Exam reminders

↓

UPCOMING

Events
Seminars
Workshops
Competitions
Opportunities

↓

REFERENCE

Course materials
Class notes
Student notes

Use existing UniLink visual hierarchy.

Do NOT use excessive colors or warning effects.

==================================================
9. DASHBOARD FLOW
==================================================

The final Student Dashboard information flow should communicate:

CR
↓
Class Update
↓
Target Section
↓
Student Notification
↓
Student Dashboard
↓
Course / Routine / Calendar


And:

University / Department / Club
↓
Official Event
↓
CR shares with section
↓
Student Dashboard
↓
Event Details
↓
Register


And:

Teacher / CR / Student
↓
Material Upload
↓
Course Materials
↓
Student Dashboard / Course Details

==================================================
10. INTERACTIONS
==================================================

Add prototype interactions using the existing UniLink animation system.

Class Update:

Class Update Card
→ Class Update Details

Event:

Event Card
→ Event Details

Material:

Material Card
→ Material Preview

Notification:

Notification
→ Relevant content

Register:

Register Now
→ External registration destination placeholder

Use subtle transitions.

Do NOT introduce new animation styles.

==================================================
11. EMPTY STATES
==================================================

Create appropriate empty states.

If there are no class updates:

"No new class updates"

"You're all caught up."

If there are no upcoming events:

"No upcoming events"

"Check back later for new campus activities."

If there are no recent materials:

"No recent materials"

"Course materials will appear here when available."

Use existing UniLink empty-state components.

==================================================
12. LIGHT MODE
==================================================

Keep the existing UniLink Light Mode.

Do NOT introduce new colors.

Maintain the existing:

White
Light Blue
Primary Blue
Deep Navy
Neutral Gray

==================================================
13. DARK MODE
==================================================

Update the same components for the existing UniLink Dark Mode.

Do not redesign the layout.

Only adapt:

Background
Surface
Text
Borders
Shadows
Badges
Active states

==================================================
14. RESPONSIVE DESIGN
==================================================

Update the existing mobile Student Dashboard around 390px width.

Mobile layout:

Dashboard header

↓

Important Updates

↓

Class Updates

↓

Today's Classes

↓

Upcoming Events

↓

Upcoming Academic Activities

↓

Recent Materials

Keep cards compact.

Do not overcrowd the mobile screen.

Use horizontal scrolling only where already established in the UniLink design system.

==================================================
15. DO NOT DUPLICATE INFORMATION
==================================================

Avoid showing the same update repeatedly.

For example:

If a CR class update appears in:

Class Updates

it may also appear in Notifications,

but do not create multiple large copies of the same content.

Use compact notification references.

==================================================
16. DESIGN GOAL
==================================================

The Student Dashboard should communicate:

"I don't need to search through multiple WhatsApp groups to know what matters to me."

The dashboard should feel like a personalized digital campus feed.

It should combine:

Academic
Class Coordination
Events
Materials
Notifications

without feeling like a social media feed.

==================================================
FINAL INSTRUCTION
==================================================

Modify the EXISTING Student Dashboard.

Do NOT create a replacement dashboard.

Preserve all existing Student Portal screens and components.

Only enhance the dashboard to support:

- CR Class Updates
- Source/Role labels
- CR-shared Events
- Event Registration
- Collaborative Notes
- Teacher/CR/Student material sources
- Personalized information targeting
- Connected notifications

Maintain the existing UniLink SaaS design system, Light Mode, Dark Mode, responsive design, and animation language.

After completing these dashboard enhancements, STOP.