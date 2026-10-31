Continue from the existing UniLink Figma project.

IMPORTANT:

Do NOT redesign any existing screen.

Do NOT change:

- UniLink branding
- Colors
- Typography
- Components
- Sidebar
- Student Dashboard
- CR Dashboard
- Routine
- My Courses
- Course Details
- Light Mode
- Dark Mode
- Existing animations

The CR Dashboard already exists in the project.

The problem is that users currently have NO visible navigation path to access the existing CR Dashboard.

Fix ONLY the navigation and prototype flow.

==================================================
CR PORTAL ACCESS
==================================================

A CR is also a normal student.

Therefore, a CR should be able to use the Student Portal normally and also access the CR Portal.

Create a clear navigation path:

Student Dashboard
→ CR Portal

==================================================
OPTION 1 — PROFILE MENU
==================================================

Add a profile dropdown/menu to the existing Student Dashboard.

When the user clicks their profile/avatar, show:

Ovi
CSE • Batch 52 • Section B

──────────────

Profile

Settings

Notifications

──────────────

CR Portal
"Manage your section"

──────────────

Log Out

The "CR Portal" option should be visually noticeable but should NOT dominate the menu.

Clicking:

CR Portal
→
Existing CR Dashboard

Use a smooth transition.

==================================================
OPTION 2 — SIDEBAR
==================================================

Because the current user is a CR, add a role-based navigation item to the existing Student Dashboard sidebar.

Create a section near the bottom:

CR MANAGEMENT

• CR Portal

Use an appropriate existing UniLink icon.

When clicked:

CR Portal
→
Existing CR Dashboard

Do NOT create a second sidebar.

Reuse the existing sidebar component.

==================================================
ROLE-BASED VISIBILITY
==================================================

IMPORTANT:

The CR Portal navigation item should ONLY appear for users who have the CR role.

Normal students should NOT see:

CR Portal
CR Management
CR Dashboard

Example:

Normal Student:

Student Dashboard
My Courses
Routine
Assignments
...
Profile
Settings

CR:

Student Dashboard
My Courses
Routine
Assignments
...
Profile
Settings

CR Management
→ CR Portal

==================================================
CR DASHBOARD NAVIGATION
==================================================

Inside the existing CR Dashboard, create a clear way for the CR to return to the Student Portal.

Add either:

"Student Portal"

or:

"Back to Student Portal"

near the profile area or sidebar.

Clicking:

Student Portal
→
Student Dashboard

The CR should NOT be logged out.

The user remains authenticated.

==================================================
PORTAL SWITCHING
==================================================

Create a clean role-switching experience.

When the user is a CR:

Current Portal:

Student Portal

Available Portal:

CR Portal

Allow:

Student Portal ↔ CR Portal

Do NOT create another login page.

Do NOT ask the CR to log in again.

==================================================
PROFILE MENU STATE
==================================================

Create two profile menu states.

STATE 1 — NORMAL STUDENT

Profile

Ovi
CSE • Batch 52 • Section B

Profile
Settings
Notifications
Log Out

STATE 2 — CR

Profile

Ovi
CR • CSE 52-B

Profile
Settings
Notifications

CR Portal
Manage your section

Log Out

==================================================
PROTOTYPE CONNECTIONS
==================================================

Create these prototype interactions:

Student Dashboard
→ Profile Avatar
→ Profile Menu

Profile Menu
→ CR Portal
→ Existing CR Dashboard

CR Dashboard
→ Student Portal
→ Existing Student Dashboard

Sidebar CR Portal
→ Existing CR Dashboard

Use the existing UniLink transition/animation language.

==================================================
CR PORTAL INDICATOR
==================================================

When inside the CR Dashboard, clearly indicate:

CR Portal

Ovi
CSE • Batch 52 • Section B

This helps the user understand that they are currently managing their section.

==================================================
PERMISSION CONCEPT
==================================================

Do not show the CR Portal to ordinary students.

The prototype should represent this concept:

Role = Student
→ Student Portal only

Role = CR
→ Student Portal + CR Portal

Do NOT create a new authentication system.

This is only a UI/prototype navigation concept.

==================================================
IMPORTANT
==================================================

The existing CR Dashboard has already been designed.

DO NOT CREATE ANOTHER CR DASHBOARD.

DO NOT REDESIGN THE CR DASHBOARD.

DO NOT DUPLICATE THE CR DASHBOARD.

Only connect the existing:

Student Dashboard
↔
CR Dashboard

through role-based navigation.

Make sure the prototype is actually clickable and the CR Dashboard can be reached from the Student Portal.