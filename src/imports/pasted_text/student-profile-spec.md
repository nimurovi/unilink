Continue building the existing UniLink project from the current Figma design.

IMPORTANT — DO NOT REDESIGN EXISTING UNILINK

Do NOT redesign, replace, delete, or modify the existing:

- UniLink brand
- Logo
- Design system
- Typography
- Colors
- Components
- Sidebar
- Navigation
- Light Mode
- Dark Mode
- Animation language
- Responsive system

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

The existing UniLink product already contains completed Student Portal modules including:

- Dashboard
- My Courses
- Course Details
- Routine
- Assignments
- Exams
- Materials
- Announcements
- Events
- Clubs & Communities
- Opportunities
- Lost & Found
- Notifications
- Student Directory
- Achievements
- Settings

Create the missing COMPLETE STUDENT PROFILE EXPERIENCE.

==================================================
MODULE — STUDENT PROFILE
==================================================

The Student Profile should act as the student's professional digital campus identity.

It should combine:

- Personal information
- Academic identity
- About
- Skills
- Interests
- Achievements
- Certifications
- Clubs & Communities
- Campus activities
- Profile visibility
- Profile completion

The profile should feel like a modern professional academic profile.

It should NOT feel like:

- Facebook
- Instagram
- Gaming profile
- Traditional university portal
- Resume builder

The design should communicate:

"This is my identity and presence inside UniLink."

==================================================
CREATE THESE NEW SCREENS
==================================================

1. MY PROFILE / PROFILE OVERVIEW
2. EDIT PROFILE
3. PROFILE PREVIEW / PUBLIC PROFILE
4. PROFILE VISIBILITY
5. PROFILE COMPLETION
6. PROFILE EMPTY STATES
7. PROFILE LOADING STATES
8. PROFILE ERROR STATES

Connect the profile with the existing:

- Achievements
- Student Directory
- Clubs & Communities
- Events
- Settings
- Skills
- Interests

Do NOT duplicate these systems.

==================================================
SCREEN 1 — MY PROFILE
==================================================

Create:

My Profile

Use the existing Student Portal sidebar.

If the existing navigation contains:

Profile

make it active.

Do NOT create a new sidebar.

==================================================
PROFILE HEADER
==================================================

Create a polished profile header.

Show:

Profile photo

Display name:

Arif Hasan

Student ID:

2026-12345

Department:

Computer Science & Engineering

Program:

BSc in Computer Science & Engineering

Batch:

52

Section:

B

University:

Your University

Location:

Dhaka, Bangladesh

Primary actions:

[Edit Profile]

[Preview Profile]

Optional:

[Share Profile]

Keep the header clean.

Do not make it look like a social media cover page.

==================================================
PROFILE PHOTO
==================================================

Create a professional circular profile image.

On hover:

[Change Photo]

When editing:

Upload Photo

Supported:

JPG
PNG
WEBP

Maximum size:

5 MB

Provide:

[Upload Photo]

[Remove Photo]

Use existing UniLink upload components.

==================================================
PROFILE VERIFICATION
==================================================

Show:

✓ Verified Student

This indicates that the academic identity has been verified by the university.

Use the existing UniLink verification/status component.

Do NOT imply that every piece of profile information is verified.

Only academic identity should be marked as university verified.

==================================================
PROFILE COMPLETION
==================================================

Near the profile header show:

Profile Completion

78%

Create a subtle progress indicator.

Example checklist:

✓ Profile photo
✓ Basic information
✓ Academic information
✓ About
✓ Skills

Incomplete:

○ Interests
○ Achievements

Button:

[Complete Profile]

Do NOT make this look like a gaming progress system.

==================================================
PROFILE NAVIGATION / INTERNAL SECTIONS
==================================================

Create profile sections:

Overview
About
Academic
Skills & Interests
Achievements
Activities

Use clean tabs or section navigation consistent with existing UniLink components.

Default:

Overview

On mobile:

Allow horizontal scrolling if needed.

==================================================
OVERVIEW
==================================================

Create a clean overview layout.

Sections:

About Me

Skills

Interests

Recent Achievements

Clubs & Communities

Recent Activities

==================================================
ABOUT ME
==================================================

Create:

About Me

Example:

"Computer Science student interested in software development, artificial intelligence, and building useful technology for students."

Show:

[Edit]

If empty:

"Tell other students a little about yourself."

[Add About]

Do not display placeholder text as actual user information.

==================================================
ACADEMIC INFORMATION
==================================================

Create:

Academic Information

Show:

University
Your University

Faculty
Engineering

Department
Computer Science & Engineering

Program
BSc in Computer Science & Engineering

Batch
52

Section
B

Student ID
2026-12345

Current Semester
Spring 2026

Academic Status
Active

IMPORTANT:

Academic information is university-managed.

Display:

Managed by University

Do NOT provide an Edit button for verified academic information.

==================================================
ACADEMIC INFORMATION PRIVACY
==================================================

Show a subtle privacy indicator:

Visibility:

University Students

Allow this to connect with Profile Visibility settings.

Do NOT expose sensitive academic information outside the allowed audience.

==================================================
SKILLS
==================================================

Create:

Skills

Example:

JavaScript
React
Python
Node.js
SQL
UI/UX Design
Database Design

Allow:

[Edit Skills]

Use existing UniLink tags/chips.

Do NOT create oversized skill cards.

==================================================
INTERESTS
==================================================

Create:

Interests

Example:

Artificial Intelligence
Web Development
Hackathons
Research
Open Source
Entrepreneurship

Allow:

[Edit Interests]

Use existing UniLink tag components.

==================================================
ACHIEVEMENTS
==================================================

Connect directly with the existing Achievements module.

Create:

Recent Achievements

Example:

Hackathon Finalist
National University Hackathon 2026
✓ Verified

Research Poster Presenter
University Research Symposium
✓ Verified

Python Programming Certificate
Coursera
✓ Verified

Button:

[View All Achievements]

Clicking:

View All Achievements

→ Existing Achievements Overview

Do NOT redesign Achievements.

==================================================
CLUBS & COMMUNITIES
==================================================

Connect with the existing Clubs & Communities module.

Create:

My Clubs

Example:

CSE Programming Club
Member

Robotics Society
Member

AI Research Community
Member

Button:

[View All Clubs]

Do NOT redesign Clubs & Communities.

==================================================
CAMPUS ACTIVITIES
==================================================

Create:

Recent Activities

Examples:

Registered for:
AI Workshop

Joined:
CSE Programming Club

Attended:
University Hackathon

Saved:
Research Seminar

Keep activity history concise.

Do not make it look like a social media feed.

==================================================
PROFILE LINKS
==================================================

Create:

Links

Optional:

GitHub
LinkedIn
Portfolio
Personal Website

Example:

github.com/username

linkedin.com/in/username

portfolio.example.com

Use existing UniLink link/icon components.

These fields should be optional.

==================================================
SCREEN 2 — EDIT PROFILE
==================================================

Create:

Edit Profile

Subtitle:

"Update the information you choose to share with the UniLink community."

==================================================
PERSONAL INFORMATION
==================================================

Editable:

Profile Photo

Display Name

Bio

Location

IMPORTANT:

Do NOT allow students to change verified university identity information.

==================================================
ACADEMIC INFORMATION
==================================================

Show:

University
Department
Program
Batch
Section
Student ID

Each should display:

Managed by University

No edit action.

Add subtle explanation:

"Academic information is maintained by your university."

==================================================
ABOUT
==================================================

Create:

Bio

Character limit:

500 characters

Placeholder:

"Tell other students about yourself, your interests, or what you enjoy working on."

Show character counter.

==================================================
SKILLS
==================================================

Create:

Skills

Input:

"Search or add a skill"

Suggestions:

Python
JavaScript
React
SQL
Machine Learning
UI/UX

Allow adding/removing skills.

==================================================
INTERESTS
==================================================

Create:

Interests

Input:

"Search or add an interest"

Examples:

AI
Programming
Research
Sports
Photography
Entrepreneurship

==================================================
LINKS
==================================================

Create optional:

GitHub

LinkedIn

Portfolio

Personal Website

Validate URL formatting.

==================================================
SAVE PROFILE
==================================================

Primary:

[Save Changes]

Secondary:

[Cancel]

After save:

✓ Profile updated successfully

Use existing UniLink toast component.

==================================================
UNSAVED CHANGES
==================================================

If the student tries to leave:

You have unsaved changes.

[Stay]

[Discard Changes]

==================================================
SCREEN 3 — PROFILE PREVIEW / PUBLIC PROFILE
==================================================

Create:

Profile Preview

Subtitle:

"This is how other students see your profile."

Show a preview of the student's profile based on current privacy settings.

Header:

Profile photo

Arif Hasan

✓ Verified Student

Computer Science & Engineering

Batch 52 • Section B

Dhaka, Bangladesh

==================================================
PUBLIC PROFILE SECTIONS
==================================================

Show only information permitted by privacy settings:

About

Skills

Interests

Achievements

Clubs

Activities

Links

IMPORTANT:

Do NOT expose private contact information.

Never show:

Password
Private email
Private phone number
Private academic records

==================================================
PROFILE PREVIEW CONTROLS
==================================================

Create:

Viewing as:

University Student

Dropdown:

University Student
Department Student
Batch Student
Section Student

This allows the student to understand what different audiences can see.

==================================================
SCREEN 4 — PROFILE VISIBILITY
==================================================

Create:

Profile Visibility

Subtitle:

"Control who can discover and view your profile."

==================================================
PROFILE DISCOVERY
==================================================

Create:

Appear in Student Directory

ON

Description:

"Allow students to discover your profile through the UniLink Student Directory."

==================================================
WHO CAN VIEW MY PROFILE
==================================================

Options:

Everyone in University

My Department

My Batch

My Section

Only Me

Default:

Everyone in University

Reuse the existing privacy system from Settings.

Do NOT create conflicting privacy logic.

==================================================
FIELD VISIBILITY
==================================================

Create controls for:

Profile Photo
Visible

Bio
Visible

Department
Visible

Program
Visible

Batch
Visible

Section
Visible

Skills
Visible

Interests
Visible

Achievements
Visible

Clubs
Visible

Activities
Visible

External Links
Hidden

Allow individual visibility where appropriate.

==================================================
CONTACT INFORMATION
==================================================

Show:

University Email
Private

Personal Email
Private

Phone
Private

IMPORTANT:

Contact information must remain private by default.

==================================================
PROFILE SEARCH
==================================================

Create:

Allow students to find me by:

Name
ON

Student ID
OFF

Department
ON

Batch
ON

Section
ON

Do not expose Student ID publicly unless explicitly allowed.

==================================================
BLOCKED STUDENTS
==================================================

Create:

Blocked Students

Connect to existing Student Directory functionality.

Example:

Blocked account

[Unblock]

Do NOT create a duplicate blocking system.

==================================================
SCREEN 5 — PROFILE COMPLETION
==================================================

Create a dedicated:

Complete Your Profile

screen/state.

Show:

Profile Completion

78%

Then:

Completed

✓ Profile photo
✓ Academic information
✓ Bio
✓ Skills

Recommended

○ Add interests
○ Add achievements
○ Add portfolio link
○ Add clubs

Use a professional progress visualization.

Do NOT use XP, levels, points, or gamification.

==================================================
PROFILE COMPLETION ACTIONS
==================================================

Each incomplete item should have:

[Add]

Clicking should navigate to the appropriate existing screen:

Add Interests
→ Edit Profile

Add Achievement
→ Existing Achievements module

Add Club
→ Existing Clubs module

Add Portfolio
→ Edit Profile

==================================================
SCREEN 6 — EMPTY STATES
==================================================

Create empty states for:

No About information

"Tell other students about yourself."

[Add About]

No Skills

"Add skills to help other students understand what you work with."

[Add Skills]

No Interests

"Add interests to discover relevant communities and opportunities."

[Add Interests]

No Achievements

"Your achievements will appear here."

[Add Achievement]

No Clubs

"Join clubs and communities to build your campus network."

[Discover Clubs]

No Activities

"Your campus activity will appear here."

Keep all empty states consistent with existing UniLink components.

==================================================
SCREEN 7 — PROFILE LOADING STATES
==================================================

Create skeleton loading states for:

- Profile header
- Profile information
- About
- Skills
- Achievements
- Clubs
- Activities

Reuse existing UniLink skeleton components.

==================================================
SCREEN 8 — PROFILE ERROR STATES
==================================================

Create:

Unable to load profile.

[Try Again]

Unable to update profile.

[Try Again]

Unable to upload profile photo.

[Try Again]

Unable to load achievements.

[Try Again]

Unable to load clubs.

[Try Again]

Use existing UniLink error components.

==================================================
PROFILE PHOTO ERROR
==================================================

Create:

Unable to upload image.

"Please use a JPG, PNG, or WEBP image under 5 MB."

[Try Again]

==================================================
PROFILE CONNECTIONS
==================================================

Connect Student Profile with:

Student Directory

Achievements

Clubs & Communities

Events

Settings

Notifications

Opportunities

Do NOT create duplicate pages where an existing module already handles the information.

==================================================
STUDENT DIRECTORY CONNECTION
==================================================

When another student opens a profile from Student Directory:

Student Directory

→ Student Profile

The profile should show only information allowed by the student's privacy settings.

Example:

Arif Hasan

✓ Verified Student

Computer Science & Engineering

Batch 52 • Section B

About

Skills

Interests

Achievements

Clubs

Do NOT show Edit Profile to another student.

Instead show:

[Connect]

[Message]

only if those features exist in the existing UniLink system.

Do not invent functionality beyond the existing project.

==================================================
ACHIEVEMENT CONNECTION
==================================================

Clicking an achievement:

→ Existing Achievement Details

Do NOT create a second achievement details system.

==================================================
CLUB CONNECTION
==================================================

Clicking a club:

→ Existing Club Details

Do NOT redesign the club page.

==================================================
EVENT CONNECTION
==================================================

If activities contain an event:

Click:

AI Workshop

→ Existing Event Details

==================================================
SETTINGS CONNECTION
==================================================

Profile settings should connect with existing:

Settings
→ Account
→ Privacy

Do NOT redesign Settings.

==================================================
NOTIFICATION CONNECTION
==================================================

If profile changes successfully:

Show existing notification/toast:

"Your profile has been updated."

Do NOT create a new notification system.

==================================================
LIGHT MODE
==================================================

Use the existing UniLink Light Mode.

Do NOT introduce new colors.

Use the established:

White
Light Blue
Primary Blue
Deep Navy
Neutral Gray

==================================================
DARK MODE
==================================================

Create the same Profile screens in the existing UniLink Dark Mode.

Do NOT redesign the layout.

Only adapt:

Background
Surface
Text
Borders
Shadows
Active states
Inputs
Dropdowns

==================================================
RESPONSIVE DESIGN
==================================================

Create mobile versions around 390px width.

PROFILE MOBILE:

- Compact profile header
- Profile photo centered or aligned naturally
- Name and academic identity clearly visible
- Full-width Edit Profile button
- Stacked sections
- Horizontally scrollable profile tabs if needed
- Compact achievement list
- Compact club list
- Touch-friendly controls

EDIT PROFILE MOBILE:

- Single-column form
- Full-width inputs
- Easy skill selection
- Easy interest selection
- Mobile-friendly photo upload
- Sticky or clearly visible Save button

PROFILE VISIBILITY MOBILE:

- Stacked privacy controls
- Clear descriptions
- Large touch targets

PROFILE PREVIEW MOBILE:

- Show exactly what another student can see
- Keep private fields hidden

==================================================
ANIMATIONS
==================================================

Use the existing UniLink animation language.

Use subtle animations for:

- Profile section transitions
- Tab changes
- Profile photo update
- Save confirmation
- Achievement expansion
- Privacy setting changes
- Toast messages

Avoid:

- Bouncy profile animations
- Gaming effects
- Neon effects
- Excessive motion
- Large animated illustrations

==================================================
ACCESSIBILITY
==================================================

Ensure:

- Clear form labels
- Strong text contrast
- Keyboard-friendly controls
- Visible focus states
- Large touch targets
- Accessible image upload
- Accessible tabs
- Accessible toggles
- Status not communicated by color alone
- Clear error messages

==================================================
PRIVACY & SECURITY
==================================================

IMPORTANT:

The profile must protect student privacy.

Never expose publicly:

- Password
- Authentication information
- Private phone number
- Private email
- Sensitive personal information
- Private academic information

Respect the existing Privacy Settings.

Verified academic information must remain university-managed.

Students can control visibility of appropriate personal information.

==================================================
DESIGN QUALITY
==================================================

The final Student Profile should feel like a polished digital campus identity.

It should combine:

Academic identity
+
Personal interests
+
Skills
+
Achievements
+
Campus involvement

The visual experience should feel:

Professional
Modern
Clean
Trustworthy
Personalized
Academic

Avoid:

- Social media profile aesthetics
- Gaming profile aesthetics
- Excessive badges
- Trophy walls
- Leaderboards
- XP systems
- Excessive cards
- Heavy shadows
- Neon effects
- Excessive gradients
- Overly decorative layouts

==================================================
IMPORTANT FINAL INSTRUCTION
==================================================

Create all Student Profile screens as NEW frames/pages inside the existing UniLink Figma project.

Do NOT redesign previously completed modules.

Do NOT create a new sidebar.

Do NOT create a new design system.

Reuse all existing UniLink components.

Make sure Profile connects correctly with:

Dashboard
Student Directory
Achievements
Clubs & Communities
Events
Opportunities
Notifications
Settings

After completing the Student Profile module, STOP.

Do NOT start Help & Support or CR Portal yet.