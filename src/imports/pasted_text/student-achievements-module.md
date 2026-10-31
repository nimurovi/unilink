Continue building the existing UniLink project from the current Figma design.

IMPORTANT — PRESERVE THE EXISTING UNILINK DESIGN

Do NOT redesign, replace, delete, or modify any existing UniLink screens, components, navigation, or design system.

Preserve:

- UniLink brand and logo
- Existing white + blue visual direction
- Existing typography
- Existing components
- Existing sidebar
- Existing navigation
- Existing Light Mode
- Existing Dark Mode
- Existing animation language
- Existing responsive behavior

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

==================================================
MODULE — ACHIEVEMENTS
==================================================

Create a complete Student Achievements module.

The purpose is to allow students to showcase meaningful academic, technical, extracurricular, competition, leadership, research, certification, and community achievements.

This should feel like a professional academic achievement portfolio.

IMPORTANT:

Do NOT make this a gaming achievement system.

Avoid:

- XP
- Levels
- Leaderboards
- Badges everywhere
- Points
- Gaming-style progress bars
- Trophy-heavy layouts
- Public popularity scores

The experience should feel like:

"My achievements and accomplishments, organized in one professional place."

Create NEW Student Portal screens:

1. ACHIEVEMENTS OVERVIEW
2. ACHIEVEMENT DETAILS
3. ADD ACHIEVEMENT
4. EDIT ACHIEVEMENT
5. ACHIEVEMENT VERIFICATION STATES
6. EMPTY / LOADING / ERROR STATES

==================================================
NAVIGATION
==================================================

Use the existing Student Portal sidebar.

If Achievements already exists in the Student Dashboard/profile navigation, connect to that existing item.

Do NOT create a new sidebar.

Active navigation:

Profile
→ Achievements

If the existing navigation structure places Achievements somewhere else, preserve the existing structure.

==================================================
SCREEN 1 — ACHIEVEMENTS OVERVIEW
==================================================

Create:

Achievements

Subtitle:

"Showcase your academic, technical, extracurricular, and professional accomplishments."

Top right:

[ + Add Achievement ]

==================================================
ACHIEVEMENT SUMMARY
==================================================

Create compact summary information:

Total Achievements
12

Verified
8

Certifications
3

Competitions
4

Use the existing UniLink statistics components.

Keep the summary subtle.

Do NOT create a dashboard full of cards.

==================================================
FILTERS
==================================================

Create:

All
Academic
Competition
Certification
Research
Leadership
Club & Community
Other

Optional:

Verified
Unverified

Use existing UniLink filter/tab components.

==================================================
SEARCH
==================================================

Create:

Search achievements...

Search by:

- Title
- Organization
- Category
- Year

==================================================
ACHIEVEMENT CARDS
==================================================

Create a clean responsive grid/list.

Example:

Hackathon Finalist

National University Hackathon 2026

Competition

Finalist

March 2026

✓ Verified

[View Achievement]

Another:

Machine Learning Research Poster

University Research Symposium

Research

February 2026

✓ Verified

[View Achievement]

Another:

Python Programming Certificate

Coursera

Certification

January 2026

Verified

[View Achievement]

Another:

CSE Programming Club Executive

CSE Programming Club

Leadership

2025–2026

✓ Verified

[View Achievement]

==================================================
ACHIEVEMENT CARD CONTENT
==================================================

Each card may contain:

- Achievement icon or small visual
- Achievement title
- Organization
- Category
- Date / year
- Short description
- Verification status
- Optional credential/evidence indicator
- View action

Keep cards visually consistent with the existing UniLink design.

Do NOT use large decorative trophy illustrations.

==================================================
VERIFICATION STATUS
==================================================

Support:

✓ Verified

Pending Verification

Unverified

Example:

✓ Verified by University

For unverified:

Not Verified

Do NOT make unverified achievements look suspicious or negative.

==================================================
ACHIEVEMENT CATEGORIES
==================================================

Support:

Academic

Competition

Certification

Research

Leadership

Club & Community

Volunteer

Sports

Creative

Other

==================================================
SORTING
==================================================

Create:

Sort by:

Newest
Oldest
Title

Default:

Newest

==================================================
SCREEN 2 — ACHIEVEMENT DETAILS
==================================================

Create a detailed achievement page.

Example:

Hackathon Finalist

National University Hackathon 2026

Competition

✓ Verified

March 2026

==================================================
HEADER
==================================================

Show:

Achievement title

Organization

Category

Date

Verification status

Primary:

[Edit Achievement]

Secondary:

[Share Achievement]

Optional:

[Delete Achievement]

Do not make delete visually dominant.

==================================================
DESCRIPTION
==================================================

Create:

Description

Example:

"Reached the final round of the National University Hackathon 2026 by developing a campus-focused collaboration platform."

==================================================
ACHIEVEMENT INFORMATION
==================================================

Show:

Category
Competition

Organization
National University Hackathon

Date
March 2026

Position / Result
Finalist

Associated Skill
Software Development

==================================================
SKILLS
==================================================

Show related skills:

React
Node.js
Database Design
Problem Solving

Use existing UniLink tag components.

==================================================
EVIDENCE
==================================================

Create:

Evidence

Examples:

Certificate.pdf

Credential Link

Project Link

Images

Buttons:

[View Evidence]

[Open Credential]

Do not expose private files publicly.

==================================================
VERIFICATION
==================================================

Create:

Verification

✓ Verified

Verified by:

University / Authorized Organization

Verified:
March 2026

If not verified:

Pending Verification

"Your achievement has been submitted for verification."

==================================================
SHARING
==================================================

Create:

Share Achievement

Options:

Copy Profile Link

Share to UniLink Profile

Optional external share:

LinkedIn

Only design the interface.

Do not assume the integration already exists.

==================================================
SCREEN 3 — ADD ACHIEVEMENT
==================================================

Create:

Add Achievement

Subtitle:

"Add an accomplishment to your UniLink profile."

==================================================
BASIC INFORMATION
==================================================

Fields:

Achievement Title

Example:

Hackathon Finalist

Category

Dropdown:

Academic
Competition
Certification
Research
Leadership
Club & Community
Volunteer
Sports
Creative
Other

Organization

Example:

National University Hackathon

Date

Month / Year

==================================================
RESULT / POSITION
==================================================

Optional field:

Result / Position

Examples:

Winner
Runner-up
Finalist
Participant
Certificate of Completion

Do not require this field for every achievement.

==================================================
DESCRIPTION
==================================================

Create:

Description

Placeholder:

"Briefly describe what you achieved..."

Character guidance:

Maximum 500 characters

==================================================
SKILLS
==================================================

Create:

Related Skills

Search and add skills.

Example:

React
Python
Research
Leadership

Reuse existing UniLink skill components.

==================================================
EVIDENCE
==================================================

Create:

Add Evidence

Options:

Upload Certificate
Add Credential Link
Add Project Link
Upload Image

Show:

Supported files:
PDF, JPG, PNG

Do not expose uploaded evidence automatically.

==================================================
PRIVACY
==================================================

Create:

Who can see this achievement?

Options:

University Students

My Department

My Batch

My Section

Only Me

Default:

University Students

Connect with existing Student Profile privacy settings.

==================================================
VERIFICATION
==================================================

Create:

Request Verification

Checkbox/toggle:

Request university verification

ON

Description:

"Verification helps other students understand that this achievement has been reviewed by an authorized source."

Do not imply that all achievements can automatically be verified.

==================================================
ADD BUTTON
==================================================

Primary:

[Add Achievement]

Secondary:

[Cancel]

After successful submission:

✓ Achievement Added

If verification was requested:

✓ Achievement Added
Verification request submitted.

==================================================
SCREEN 4 — EDIT ACHIEVEMENT
==================================================

Create:

Edit Achievement

Reuse the Add Achievement form.

Allow editing:

Title
Category
Organization
Date
Result
Description
Skills
Evidence
Visibility

Show:

[Save Changes]

[Cancel]

==================================================
DELETE ACHIEVEMENT
==================================================

Create confirmation modal:

Delete Achievement?

"This achievement will be removed from your UniLink profile."

Buttons:

[Delete Achievement]

[Cancel]

If the achievement is verified, show:

"Deleting this achievement will also remove its verification status."

Do not make accidental deletion easy.

==================================================
SCREEN 5 — VERIFICATION STATES
==================================================

Create visual states for:

VERIFIED

✓ Verified

Verified by:
University

Verified:
March 2026


PENDING

Pending Verification

"Your achievement is awaiting verification."


UNVERIFIED

Not Verified

"You can optionally request verification."


VERIFICATION FAILED

Verification Unavailable

"Verification could not be completed. You may update the evidence and try again."

Button:

[Update Evidence]

==================================================
VERIFICATION REQUEST
==================================================

Create:

Request Verification

Achievement:

Hackathon Finalist

Verification source:

University

Evidence:

Certificate.pdf

Button:

[Submit for Verification]

After submission:

✓ Verification Request Submitted

==================================================
ACHIEVEMENT PROFILE CONNECTION
==================================================

Achievements should appear inside the existing Student Profile.

Example:

Achievements

Hackathon Finalist
✓ Verified

Machine Learning Research Poster
✓ Verified

Python Programming Certificate
✓ Verified

[View All Achievements]

Click:

[View All Achievements]

→ Achievements Overview

Do NOT redesign the existing Student Profile.

==================================================
STUDENT DIRECTORY CONNECTION
==================================================

If the student allows achievements to be visible, show selected achievements in the Student Directory / Student Profile.

Example:

Achievements

Hackathon Finalist
✓ Verified

Research Poster Presenter
✓ Verified

Do NOT show every achievement in the directory card.

Keep the directory compact.

==================================================
DASHBOARD CONNECTION
==================================================

If the existing Student Dashboard contains an Achievements section, connect it to this module.

Example:

Recent Achievements

Hackathon Finalist
March 2026

Research Poster Presenter
February 2026

[View All]

Do NOT redesign the Student Dashboard.

==================================================
EMPTY STATE
==================================================

Create:

No Achievements Yet

"Showcase your accomplishments by adding your first achievement."

Primary:

[ + Add Achievement ]

Secondary:

[Learn More]

Keep the illustration simple and professional.

==================================================
FILTER EMPTY STATE
==================================================

Create:

No achievements found

"No achievements match your current filters."

[Clear Filters]

==================================================
LOADING STATE
==================================================

Create skeleton states for:

- Achievement cards
- Achievement details
- Profile achievements

Reuse existing UniLink skeleton components.

==================================================
ERROR STATES
==================================================

Create:

Unable to load achievements.

[Try Again]

Unable to save achievement.

[Try Again]

Unable to upload evidence.

[Try Again]

Unable to submit verification request.

[Try Again]

Use existing UniLink error components.

==================================================
UNSAVED CHANGES
==================================================

If the user edits an achievement and tries to leave:

You have unsaved changes.

[Stay]

[Discard Changes]

==================================================
SUCCESS STATES
==================================================

Create subtle toast feedback:

✓ Achievement added

✓ Achievement updated

✓ Achievement deleted

✓ Verification request submitted

Use existing UniLink toast components.

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

Verification states should use the existing UniLink status colors/components.

==================================================
DARK MODE
==================================================

Create the same Achievements screens in the existing UniLink Dark Mode.

Do NOT redesign the layout.

Adapt only:

Background
Surface
Text
Borders
Shadows
Active states
Form controls

==================================================
RESPONSIVE DESIGN
==================================================

Create mobile versions around 390px width.

ACHIEVEMENTS MOBILE:

- Compact header
- Search at top
- Horizontally scrollable filters
- One-column achievement cards
- Touch-friendly buttons

ACHIEVEMENT DETAILS MOBILE:

- Compact header
- Clear verification status
- Stacked information
- Full-width actions

ADD / EDIT MOBILE:

- Single-column form
- Touch-friendly inputs
- Easy category selection
- Easy skill selection
- Evidence upload area
- Clear Save button

==================================================
ANIMATIONS
==================================================

Use the existing UniLink animation language.

Add subtle animations for:

- Achievement card hover
- Opening achievement details
- Filter changes
- Add achievement success
- Verification state changes
- Toast messages

Avoid:

- Trophy animations
- Confetti
- Bouncy animations
- Gaming effects
- Excessive motion

==================================================
ACCESSIBILITY
==================================================

Ensure:

- Clear labels
- Good contrast
- Keyboard-friendly forms
- Touch-friendly controls
- Clear verification states
- Status not communicated by color alone
- Accessible file upload controls

==================================================
PRIVACY
==================================================

Respect existing Student Profile privacy settings.

Achievements may contain:

- Certificates
- Credential links
- Project links
- Personal information

Do not expose evidence files or private information to users who do not have permission.

==================================================
DESIGN QUALITY
==================================================

The final experience should feel like a professional academic portfolio inside UniLink.

It should communicate:

"My accomplishments are organized, credible, and easy to showcase."

Prioritize:

- Professional presentation
- Verification
- Privacy
- Academic identity
- Easy management
- Clean information hierarchy

Avoid:

- Gaming aesthetics
- Trophy walls
- Leaderboards
- XP systems
- Excessive badges
- Social media aesthetics
- Excessive colors
- Heavy shadows
- Neon effects
- Excessive gradients

==================================================
IMPORTANT
==================================================

Create these as NEW Student Portal Achievements screens/states.

Do NOT redesign previously completed screens.

Do NOT create a new sidebar.

Do NOT create a new design system.

Connect Achievements with:

Student Dashboard
Student Profile
Student Directory
Skills
Clubs & Communities
Notifications
Settings / Privacy

After completing these screens, stop.

Do NOT start Help & Support yet.