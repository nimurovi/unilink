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
- Existing Student Dashboard
- My Courses
- Course Details
- Routine
- Assignments
- Assignment Details
- Assignment Submission
- Exams & Deadlines
- Exam Details
- Exam Calendar
- Class Materials
- Material Preview
- Saved Materials
- Announcements
- Announcement Details
- Events
- Event Details
- Campus Calendar
- Saved Events
- Clubs & Communities
- Club Details
- My Clubs
- Club Membership
- Opportunities
- Opportunity Details
- Saved Opportunities
- My Applications
- Lost & Found
- Item Details
- Report Lost Item
- Report Found Item
- My Reports
- Saved Items
- Claim / Return Flow
- Notifications
- Notification Details
- Notification Settings
- Student Directory
- Student Profile
- My Profile
- Edit Profile
- Profile Privacy / Visibility
- CR Dashboard
- CR Routine Management

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

==================================================
MODULE — STUDENT SETTINGS
==================================================

Create a complete Student Settings experience for managing:

- Account
- Profile
- Appearance
- Notifications
- Privacy
- Security
- Academic preferences
- Language
- Accessibility
- Connected accounts
- Data / account management

The Settings experience should feel like a modern SaaS application.

It must be simple, organized, and professional.

Do NOT make it feel like a generic university portal.

Create NEW Student Portal screens/frames:

1. SETTINGS OVERVIEW
2. ACCOUNT SETTINGS
3. APPEARANCE SETTINGS
4. NOTIFICATION SETTINGS
5. PRIVACY SETTINGS
6. SECURITY SETTINGS
7. ACADEMIC PREFERENCES
8. ACCESSIBILITY SETTINGS
9. DATA & ACCOUNT MANAGEMENT

==================================================
NAVIGATION
==================================================

Use the existing Student Portal sidebar.

Settings should be located at the bottom of the sidebar.

Example:

Settings

Do NOT create a new sidebar.

When Settings is active, use the existing active navigation style.

==================================================
SCREEN 1 — SETTINGS OVERVIEW
==================================================

Create:

Settings

Subtitle:

"Manage your account, preferences, privacy, and UniLink experience."

Create a clean settings layout.

Use a left-side settings navigation on desktop.

Sections:

Account
Appearance
Notifications
Privacy
Security
Academic Preferences
Accessibility
Data & Account

On mobile:

Convert the settings navigation into a stacked list or compact menu.

==================================================
SETTINGS OVERVIEW
==================================================

Create settings cards/list items:

Account

"Manage your personal account information."

Appearance

"Customize Light Mode, Dark Mode, and interface preferences."

Notifications

"Control the updates and alerts you receive."

Privacy

"Manage your profile visibility and personal information."

Security

"Manage password, sessions, and account security."

Academic Preferences

"Customize academic and campus preferences."

Accessibility

"Customize accessibility options."

Data & Account

"Manage your UniLink data and account."

Use existing UniLink settings/list components.

Avoid excessive cards.

==================================================
SCREEN 2 — ACCOUNT SETTINGS
==================================================

Create:

Account Settings

==================================================
PROFILE INFORMATION
==================================================

Show:

Profile Photo

Display Name

Bio

Department

Program

Batch

Section

Student Email

Some fields should be marked:

Managed by University

IMPORTANT:

Students should NOT freely edit verified academic information.

For example:

Department
Program
Batch
Section

Show:

Managed by University

For editable fields:

[Edit Profile]

Connect to the existing Student Profile / Edit Profile system.

Do NOT redesign it.

==================================================
EMAIL
==================================================

Show:

University Email

student@university.edu

Status:

✓ Verified

Personal Email

Optional

[Add Email]

Do not expose email publicly through Student Directory.

==================================================
PHONE
==================================================

Show:

Phone Number

+880 XXX XXX XXXX

Status:

Private

[Edit]

Keep phone number private by default.

==================================================
ACCOUNT ID
==================================================

Show:

UniLink Account ID

UL-XXXXXX

Provide:

[Copy]

This is for account reference only.

Do NOT expose unnecessary personal identifiers publicly.

==================================================
ACCOUNT DEACTIVATION
==================================================

Create a subtle danger section:

Deactivate Account

"Temporarily disable your UniLink account."

Button:

[Deactivate Account]

Use the existing UniLink destructive action style.

==================================================
SCREEN 3 — APPEARANCE SETTINGS
==================================================

Create:

Appearance

Subtitle:

"Customize how UniLink looks and behaves."

==================================================
THEME
==================================================

Create a theme selector:

Light
Dark
System

Use the existing UniLink Light Mode and Dark Mode.

Default:

System

IMPORTANT:

Do NOT redesign either theme.

Only allow switching between the existing themes.

==================================================
ACCENT / VISUAL SETTINGS
==================================================

Do NOT introduce a new color system.

If UniLink already has an accent color setting, reuse it.

Otherwise do not add one.

==================================================
ANIMATION
==================================================

Create:

Motion

Full Motion
Reduced Motion

Default:

Full Motion

Description:

"Reduce interface animations and transitions."

This must connect to the existing UniLink animation language.

==================================================
DENSITY
==================================================

Create optional interface density:

Comfortable
Compact

Default:

Comfortable

Use only if it fits naturally with the existing design.

==================================================
SCREEN 4 — NOTIFICATION SETTINGS
==================================================

Create:

Notification Settings

This screen should connect to the existing Notifications module.

Do NOT create a duplicate notification system.

Use the notification settings structure already established.

Categories:

Academic
Events
Clubs
Opportunities
Lost & Found
System

For each category allow:

In-App
Email
Push

Use existing toggle components.

==================================================
ACADEMIC
==================================================

Assignment reminders
ON

Exam reminders
ON

Routine changes
ON

Course announcements
ON

New materials
ON

==================================================
EVENTS
==================================================

New events
ON

Event reminders
ON

Event changes
ON

Event cancellations
ON

==================================================
CLUBS
==================================================

Club announcements
ON

Club events
ON

Membership updates
ON

Recruitment
ON

==================================================
OPPORTUNITIES
==================================================

Recommended opportunities
ON

Deadline reminders
ON

Application status
ON

==================================================
LOST & FOUND
==================================================

Possible matches
ON

Claim updates
ON

Return updates
ON

==================================================
SYSTEM
==================================================

System announcements
ON

Account updates
ON

Security alerts
ON

IMPORTANT:

Security alerts cannot be completely disabled.

==================================================
QUIET HOURS
==================================================

Create:

Quiet Hours

OFF

Start:
11:00 PM

End:
7:00 AM

Description:

"Non-critical notifications will be delivered outside your quiet hours."

==================================================
SCREEN 5 — PRIVACY SETTINGS
==================================================

Create:

Privacy

Subtitle:

"Control how your information is shared across UniLink."

==================================================
PROFILE VISIBILITY
==================================================

Reuse the existing Student Profile privacy system.

Options:

University Students
My Department
My Batch
My Section
Private

Default:

University Students

Do NOT create conflicting privacy settings.

==================================================
DIRECTORY DISCOVERY
==================================================

Create:

Appear in Student Directory

ON

Description:

"Allow other students within your visibility range to find your profile."

==================================================
FIELD VISIBILITY
==================================================

Create:

Bio
Visible

Skills
Visible

Interests
Visible

Clubs
Visible

Achievements
Visible

Professional Links
Hidden

Academic Information
Visible

Allow individual controls.

==================================================
CONTACT PRIVACY
==================================================

Create:

Phone Number

Private

Personal Email

Private

University Email

Private

IMPORTANT:

Contact information must NOT become publicly visible in Student Directory by default.

==================================================
CONNECTION REQUESTS
==================================================

Allow connection requests from:

Everyone within visibility range

My Department

My Batch

Nobody

==================================================
ACTIVITY VISIBILITY
==================================================

Create:

Show my club memberships
ON

Show my achievements
ON

Show my campus activity
ON

Keep these separate from academic records.

==================================================
BLOCKED STUDENTS
==================================================

Create:

Blocked Students

Show blocked accounts.

[Unblock]

Connect with existing Student Directory blocking functionality.

==================================================
SCREEN 6 — SECURITY SETTINGS
==================================================

Create:

Security

Subtitle:

"Protect your UniLink account."

==================================================
PASSWORD
==================================================

Create:

Password

Last changed:
30 days ago

[Change Password]

==================================================
CHANGE PASSWORD
==================================================

Create form:

Current Password

New Password

Confirm New Password

Password strength indicator

Primary:

[Update Password]

Success:

✓ Password Updated

==================================================
TWO-FACTOR AUTHENTICATION
==================================================

Create:

Two-Factor Authentication

OFF

Description:

"Add an extra layer of protection to your account."

Primary:

[Enable 2FA]

If enabled:

✓ Enabled

[Manage 2FA]

==================================================
ACTIVE SESSIONS
==================================================

Create:

Active Sessions

Example:

Chrome
Windows

Dhaka, Bangladesh

Active now

[Current Session]

Another:

Safari
iPhone

Last active:
2 hours ago

[Sign Out]

==================================================
SIGN OUT ALL DEVICES
==================================================

Create:

Sign Out of All Devices

"Sign out of UniLink on every device except this one."

[Sign Out All]

Confirmation modal:

Are you sure?

[Sign Out All Devices]

[Cancel]

==================================================
SECURITY ALERTS
==================================================

Show:

Recent Security Activity

Password changed
Today

New login detected
Yesterday

2FA enabled
Aug 20

Connect to existing Notifications.

==================================================
SCREEN 7 — ACADEMIC PREFERENCES
==================================================

Create:

Academic Preferences

Subtitle:

"Customize how UniLink organizes your academic experience."

==================================================
CURRENT ACADEMIC CONTEXT
==================================================

Show:

University
Your University

Faculty
Engineering

Department
CSE

Program
BSc in CSE

Batch
52

Section
B

Semester
Spring 2026

IMPORTANT:

Verified academic information should be marked:

Managed by University

Do NOT allow direct editing from this screen.

==================================================
ACADEMIC DASHBOARD PREFERENCES
==================================================

Create:

Show Upcoming Classes
ON

Show Assignment Deadlines
ON

Show Exam Deadlines
ON

Show Course Announcements
ON

Show Course Materials
ON

==================================================
CALENDAR PREFERENCES
==================================================

Create:

Default Calendar View

Month

Week

Agenda

Default:

Week

First Day of Week:

Sunday

Use existing calendar language.

==================================================
TIME PREFERENCES
==================================================

Create:

Time Format

12-hour
24-hour

Default:

12-hour

==================================================
REMINDER PREFERENCES
==================================================

Create:

Assignment Reminder

1 day before

Options:

1 hour before
1 day before
2 days before
1 week before

Exam Reminder

1 week before

Options:

1 day before
3 days before
1 week before
2 weeks before

Keep the controls simple.

==================================================
SCREEN 8 — ACCESSIBILITY SETTINGS
==================================================

Create:

Accessibility

Subtitle:

"Customize UniLink for a more comfortable and accessible experience."

==================================================
MOTION
==================================================

Reduce Motion

OFF

Connect with Appearance settings.

==================================================
TEXT SIZE
==================================================

Create:

Text Size

Default
Large
Extra Large

Use a clean segmented control.

==================================================
CONTRAST
==================================================

Create:

High Contrast

OFF

Do not introduce a completely new visual theme.

==================================================
FOCUS INDICATORS
==================================================

Create:

Enhanced Focus Indicators

ON

==================================================
SCREEN READER
==================================================

Create:

Screen Reader Optimization

ON / Automatically supported

This should be presented as an accessibility capability, not a fake toggle if the actual product will not support it.

==================================================
SCREEN 9 — DATA & ACCOUNT MANAGEMENT
==================================================

Create:

Data & Account

Subtitle:

"Manage your UniLink data and account."

==================================================
DOWNLOAD DATA
==================================================

Create:

Download My Data

"Request a copy of your UniLink account information."

Button:

[Request Data]

Status:

Request submitted

or:

Ready to download

==================================================
ACCOUNT ACTIVITY
==================================================

Create:

Account Activity

Show:

Login history

Profile changes

Security events

Notification preferences

Do not expose unnecessary sensitive information.

==================================================
CONNECTED ACCOUNTS
==================================================

Create:

Connected Accounts

University Account
✓ Connected

Google
Not Connected

Microsoft
Not Connected

Use:

[Connect]

or:

[Disconnect]

Do not assume these integrations exist yet.

Design the UI so they can be implemented later.

==================================================
DEACTIVATE ACCOUNT
==================================================

Create:

Deactivate Account

"Temporarily disable your UniLink account."

[Deactivate Account]

==================================================
DELETE ACCOUNT
==================================================

Create a separate destructive section:

Delete Account

"Permanently delete your UniLink account and associated data."

[Delete Account]

Use strong confirmation.

==================================================
DELETE ACCOUNT CONFIRMATION
==================================================

Create:

Delete your UniLink account?

"This action may permanently remove your account and associated personal data."

Require confirmation.

Example:

Type DELETE to confirm.

[ DELETE ]

Primary destructive action:

[Delete Account Permanently]

Secondary:

[Cancel]

Do NOT make accidental deletion easy.

==================================================
GLOBAL SAVE BEHAVIOR
==================================================

For settings that require explicit saving:

[Save Changes]

[Cancel]

For immediate toggles:

Update immediately and show:

✓ Updated

Do not use unnecessary confirmation dialogs for every toggle.

==================================================
UNSAVED CHANGES
==================================================

If the user edits settings and attempts to leave:

Show:

You have unsaved changes.

[Stay]

[Discard Changes]

==================================================
SUCCESS STATES
==================================================

Create subtle success feedback:

✓ Settings updated

✓ Privacy preferences updated

✓ Password updated

✓ Notification preferences updated

Use existing UniLink toast/feedback components.

==================================================
ERROR STATES
==================================================

Create:

Unable to update settings.

[Try Again]

Unable to save changes.

[Try Again]

Unable to change password.

[Try Again]

Unable to update privacy settings.

[Try Again]

Use existing UniLink error components.

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

Create the same Settings screens in the existing UniLink Dark Mode.

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

SETTINGS MOBILE:

- Compact header
- Settings categories as stacked rows
- Clear section titles
- Full-width controls
- Touch-friendly toggles
- Bottom action area where needed

ACCOUNT MOBILE:

- Stacked profile information
- Editable fields
- Clear university-managed fields

PRIVACY MOBILE:

- Grouped visibility settings
- Large touch-friendly controls
- Clear explanations

SECURITY MOBILE:

- Password
- 2FA
- Active sessions
- Security activity

DATA & ACCOUNT MOBILE:

- Data download
- Connected accounts
- Deactivate
- Delete account

==================================================
ANIMATIONS
==================================================

Use the existing UniLink animation language.

Only use subtle animations for:

- Settings section transitions
- Toggle changes
- Save confirmation
- Toast messages
- Modal entrance/exit

Avoid:

- Bouncy animations
- Excessive motion
- Neon effects
- Large animated illustrations

==================================================
ACCESSIBILITY
==================================================

Settings must be highly accessible.

Ensure:

- Clear labels
- Good contrast
- Large touch targets
- Keyboard-friendly controls
- Visible focus states
- Clear toggle states
- Status not communicated by color alone
- Destructive actions clearly labeled

==================================================
PRIVACY & SECURITY
==================================================

Prioritize:

- Student privacy
- Verified academic identity
- Secure account management
- Private contact information
- Clear data controls

Never expose:

- Passwords
- Authentication secrets
- Private messages
- Sensitive academic records
- Personal contact information publicly

==================================================
DESIGN QUALITY
==================================================

The final Settings experience should feel like a polished modern SaaS product.

It should communicate:

"UniLink gives me control over my account, privacy, and campus experience."

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
- Excessive gradients
- Complicated settings interfaces
- Unnecessary confirmation dialogs

==================================================
IMPORTANT
==================================================

Create these as NEW Student Portal Settings screens/states.

Do NOT redesign previously completed screens.

Do NOT create a new sidebar.

Do NOT create a new design system.

Connect Settings with:

Student Profile
Notifications
Student Directory
Security
Academic Preferences
Appearance

After completing these screens, stop.

Do NOT start designing the CR Portal yet.