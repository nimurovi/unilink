Continue building the existing UniLink project from the current Figma design.

IMPORTANT — PRESERVE EXISTING DESIGN

Do NOT redesign, delete, replace, or modify any existing UniLink screens or components.

Do NOT change:

- UniLink brand
- Logo
- Existing design system
- Existing colors
- Existing typography
- Existing sidebar
- Existing navigation
- Existing components
- Light Mode
- Dark Mode
- Animation language

Reuse the existing UniLink design system exactly.

Previously completed modules include:

- Student Dashboard
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
- CR Portal
- CR Routine Management

Create NEW authenticated Student Portal screens for:

1. EVENTS
2. EVENT DETAILS
3. CAMPUS CALENDAR
4. SAVED EVENTS

Create them as NEW frames/pages inside the existing UniLink Figma project.

==================================================
SCREEN 1 — EVENTS
==================================================

Create a modern SaaS-style campus event discovery page.

Purpose:

Students should be able to discover university, department, club, academic, competition, sports, cultural, and other campus events in one place.

The page should communicate:

"Discover what's happening around campus."

Use the existing Student Dashboard sidebar.

Active navigation:

CAMPUS
→ Events

If the existing navigation already places Events somewhere else, reuse the existing navigation structure instead of creating a new sidebar section.

==================================================
HEADER
==================================================

Title:

Events

Subtitle:

"Discover seminars, workshops, competitions, clubs, sports, and activities happening around campus."

Right side:

[ Calendar View ]

Search field:

"Search events..."

==================================================
EVENT SUMMARY
==================================================

Use the EXISTING UniLink statistics-card component.

Upcoming Events

18

This Week

7

Today

2

Saved Events

6

Keep the statistics compact and professional.

==================================================
EVENT CATEGORIES
==================================================

Create filter tabs:

All
Academic
Seminar
Workshop
Competition
Hackathon
Club
Sports
Cultural
Career

Use the existing UniLink tab component.

Do not introduce excessive colors.

==================================================
EVENT FILTERS
==================================================

Create:

Search events...

Filters:

Category
[ All ]

Date
[ Any Date ]

Organizer
[ All Organizers ]

Location
[ All Locations ]

Availability
[ All ]

Sort:

Soonest
Newest
Popular

Use the existing UniLink filter/dropdown components.

==================================================
FEATURED EVENT
==================================================

Create a prominent but clean featured-event section.

Example:

FEATURED

UniLink Tech Summit 2026

A campus technology summit featuring talks, workshops, networking, and student projects.

September 18, 2026

10:00 AM – 5:00 PM

Main Auditorium

Organized by:
CSE Department

Actions:

[ View Event ]

[ Save ]

Do NOT make this look like an advertising banner.

Keep it academic and professional.

==================================================
UPCOMING EVENTS
==================================================

Create a modern event discovery grid/list.

Example:

Database Workshop

Academic • Workshop

September 5, 2026

2:00 PM – 4:00 PM

Lab 3

CSE Department

[View Event →]


Programming Club Recruitment

Club

September 7, 2026

11:00 AM – 3:00 PM

Student Center

Programming Club

[View Event →]


Inter-University Hackathon

Competition • Hackathon

September 15–16, 2026

Innovation Lab

CSE Department

[View Event →]


Career Seminar 2026

Career

September 20, 2026

3:00 PM – 5:00 PM

Auditorium

Career Development Center

[View Event →]

==================================================
EVENT CARD
==================================================

Each event should contain:

- Event visual/icon
- Event title
- Category
- Organizer
- Date
- Time
- Location
- Optional registration status
- Save button
- View Event action

Example:

Database Workshop

Workshop

Sep 5
2:00 PM

Lab 3

CSE Department

[Save]

[View Event →]

Use existing UniLink card components.

==================================================
EVENT CARD HOVER
==================================================

On desktop hover:

- Slight elevation
- Subtle blue border/highlight
- Save button becomes more visible
- Arrow moves slightly

Keep animation subtle.

Do NOT use large animations.

==================================================
EVENT STATUS
==================================================

Support:

Upcoming
Today
Ongoing
Completed
Cancelled
Postponed

Example:

TODAY

Career Seminar

3:00 PM

Status:

Starting Soon

Use the existing UniLink status system.

Do not assign a different color to every event.

==================================================
REGISTRATION STATUS
==================================================

Events may support registration.

Show:

Registration Open

Registration Closed

Registered

Waitlist

Registration Not Required

Example:

Registration Open

[Register]

After registration:

✓ Registered

[Cancel Registration]

Use existing UniLink button components.

==================================================
SCREEN 2 — EVENT DETAILS
==================================================

Create a detailed event information page.

Example:

UniLink Tech Summit 2026

==================================================
EVENT HEADER
==================================================

Show:

UniLink Tech Summit 2026

Academic / Technology

September 18, 2026

10:00 AM – 5:00 PM

Main Auditorium

Organizer:

CSE Department

Actions:

[ Register ]

[ Save ]

[ Share ]

Use existing UniLink buttons.

==================================================
EVENT DESCRIPTION
==================================================

Create:

About This Event

Example:

"UniLink Tech Summit 2026 brings together students, faculty, developers, and technology enthusiasts for talks, workshops, project demonstrations, and networking."

Use realistic fictional placeholder content.

==================================================
EVENT INFORMATION
==================================================

Create a clean information section:

Date

September 18, 2026

Time

10:00 AM – 5:00 PM

Location

Main Auditorium

Organizer

CSE Department

Category

Academic

Capacity

300 Students

Registration

Open

==================================================
EVENT SCHEDULE
==================================================

Create:

Event Schedule

10:00 AM
Opening Ceremony

10:30 AM
Keynote Session

12:00 PM
Student Project Showcase

2:00 PM
Technology Workshop

4:00 PM
Closing Session

Use a clean vertical timeline.

==================================================
LOCATION
==================================================

Create:

Event Location

Main Auditorium

Building 1

Campus

Add a simple map/location visual.

Button:

[View Campus Location]

This is a UI concept only.

==================================================
REGISTRATION
==================================================

Create a registration section.

Show:

Registration Open

120 / 300 Seats Filled

Progress indicator.

Button:

[Register for Event]

After registration:

✓ You're Registered

September 18, 2026

10:00 AM

Do not make the registration section look like a shopping checkout.

==================================================
REGISTRATION CONFIRMATION
==================================================

Create a lightweight success state:

You're Registered

"Your registration for UniLink Tech Summit 2026 is confirmed."

Actions:

[Add to Calendar]

[View Event]

Do not create a complicated modal.

==================================================
EVENT REMINDER
==================================================

Allow:

Set Reminder

Options:

1 day before
12 hours before
1 hour before
30 minutes before

After setting:

✓ Reminder Set

Use existing UniLink notification components.

==================================================
EVENT ORGANIZER
==================================================

Create:

Organized By

CSE Department

Department of Computer Science and Engineering

If the organizer is a club:

Programming Club

Show:

Club

Do not create a social-media profile system here.

==================================================
RELATED EVENTS
==================================================

Create:

You May Also Like

Database Workshop

Career Seminar 2026

Programming Club Recruitment

Inter-University Hackathon

Use compact event cards.

==================================================
SCREEN 3 — CAMPUS CALENDAR
==================================================

Create a unified academic and campus calendar.

Title:

Campus Calendar

Subtitle:

"See classes, exams, deadlines, events, and important campus activities in one timeline."

IMPORTANT:

Reuse the existing calendar design language from the Exams & Deadlines module.

Do NOT create a completely different calendar design.

==================================================
CALENDAR HEADER
==================================================

Show:

September 2026

‹ Previous
Today
Next ›

View:

Month
Week
List

Default:

Month

==================================================
CALENDAR CONTENT
==================================================

The calendar can show:

Classes
Exams
Assignments
Events
Deadlines
Announcements with dates

Example:

Sep 2
Software Engineering Quiz

Sep 5
Database Workshop

Sep 7
Programming Club Recruitment

Sep 10
Database Midterm

Sep 15
Inter-University Hackathon

Sep 18
UniLink Tech Summit

Use subtle indicators and labels.

Do NOT use too many colors.

==================================================
CALENDAR EVENT POPOVER
==================================================

Clicking an event should show a compact popover/drawer.

Example:

Database Workshop

September 5

2:00 PM – 4:00 PM

Lab 3

CSE Department

[View Event]

==================================================
LIST VIEW
==================================================

Create a clean list view.

Show:

Date
Event
Category
Organizer
Time
Location
Status

Example:

SEP 5

Database Workshop

Workshop
CSE Department

2:00 PM
Lab 3

Upcoming

==================================================
WEEK VIEW
==================================================

Create a weekly calendar view.

Position events according to their actual time.

Avoid overlapping event blocks.

IMPORTANT:

Events with overlapping times must NEVER visually overlap incorrectly.

If two events happen at the same time, place them side-by-side with enough width.

If more events exist than available width, use:

+2 more

Clicking should reveal the additional events.

Maintain clear spacing.

==================================================
SCREEN 4 — SAVED EVENTS
==================================================

Create:

Saved Events

Subtitle:

"Keep track of events you don't want to miss."

Search:

"Search saved events..."

Filters:

All
Academic
Club
Competition
Workshop
Sports

Example:

UniLink Tech Summit 2026

Sep 18

Main Auditorium

Saved 2 days ago

[View Event]


Inter-University Hackathon

Sep 15–16

Innovation Lab

Saved Yesterday

[View Event]

==================================================
SAVE / UNSAVE
==================================================

Click Save:

✓ Event Saved

Click again:

Remove from Saved

Show lightweight toast:

"Event removed from Saved"

[Undo]

Do not use an unnecessary confirmation dialog.

==================================================
PERSONALIZED EVENT DISCOVERY
==================================================

Prioritize events relevant to the student based on:

- University
- Faculty
- Department
- Program
- Batch
- Section
- Enrolled courses
- Joined clubs
- Interests

Example:

Because a student is enrolled in CSE:

Recommended:

CSE Hackathon

Database Workshop

Programming Club Event

AI Seminar

Do not expose complex recommendation logic in the UI.

==================================================
EVENT SOURCES
==================================================

Events may be created by:

University
Department
Teacher
CR
Club
Authorized Organizer

Show the organizer clearly.

==================================================
CR CONNECTION
==================================================

CRs should be able to publish relevant section/batch events.

Flow:

CR Portal
→ Event Management
→ Create Event
→ Select Audience
→ Add Event Details
→ Publish

Example:

Section Programming Contest

Audience:

CSE
Batch 52
Section B

After publishing:

CR Portal
→ Student Events

Do NOT redesign the CR Portal in this task.

==================================================
CLUB CONNECTION
==================================================

Clubs should be able to publish events.

Flow:

Club
→ Create Event
→ Publish
→ Students discover event

Examples:

Programming Club
→ Hackathon

Robotics Club
→ Workshop

Cultural Club
→ Cultural Night

Connect these events with the existing/planned Clubs & Communities module.

==================================================
ANNOUNCEMENT CONNECTION
==================================================

An announcement may reference an event.

Example:

Programming Club

"Registration for the Inter-University Hackathon is now open."

Related Event:

Inter-University Hackathon

[View Event →]

Connect to the existing Announcements module.

==================================================
NOTIFICATION CONNECTION
==================================================

Examples:

"Database Workshop starts tomorrow."

"Registration for UniLink Tech Summit closes tomorrow."

"Your saved event starts in 1 hour."

"An event you saved has changed location."

Use the existing UniLink notification system.

Do NOT create a separate notification system.

==================================================
EVENT CHANGES
==================================================

Support:

Location Changed

Time Changed

Date Changed

Cancelled

Postponed

Example:

EVENT UPDATED

Location changed

Previous:
Auditorium 1

New:
Auditorium 2

Updated:
Today • 10:30 AM

Use existing UniLink alert/status components.

==================================================
CANCELLED EVENT
==================================================

Create:

Event Cancelled

UniLink Tech Summit 2026

September 18

Reason:

"Event postponed due to unforeseen circumstances."

Show:

Cancelled

and:

"New date will be announced."

Keep the visual treatment muted.

==================================================
POSTPONED EVENT
==================================================

Create:

Event Postponed

Original:

September 18

New:

September 22

Show the change clearly.

==================================================
EMPTY STATES
==================================================

Create:

No Upcoming Events

"There are no upcoming events matching your filters."

[Clear Filters]

No Saved Events

"You haven't saved any events yet."

[Browse Events]

No Events Today

"Nothing is scheduled for today."

Use existing UniLink empty-state components.

==================================================
LOADING STATES
==================================================

Create skeleton/loading states for:

- Event list
- Featured event
- Event details
- Calendar
- Saved events

Reuse existing UniLink loading components.

==================================================
ERROR STATES
==================================================

Create:

Unable to load events.

[Try Again]

Event unavailable:

"This event is no longer available."

[Back to Events]

Calendar error:

"Unable to load campus calendar."

[Try Again]

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

Maintain readability.

==================================================
RESPONSIVE DESIGN
==================================================

Create mobile versions around 390px width.

EVENTS MOBILE:

- Compact header
- Search
- Horizontally scrollable category filters
- Filter button
- Featured event
- Stacked event list
- Touch-friendly save buttons

EVENT DETAILS MOBILE:

- Compact event header
- Date/time
- Location
- Organizer
- Description
- Schedule
- Registration
- Reminder
- Related events

Keep the primary Register button easily accessible.

CAMPUS CALENDAR MOBILE:

Do NOT squeeze the desktop calendar.

Use:

Date selector
Day view
Week view
Vertical timeline
Event list

Allow easy navigation between dates.

SAVED EVENTS MOBILE:

- Search
- Filters
- Stacked saved event list
- Open/remove actions

==================================================
INTERACTIONS
==================================================

Create prototype interactions for:

Event Card
→ Event Details

Save Event
→ Saved State

Saved Event
→ Remove Saved

Register
→ Registration Confirmation

Add to Calendar
→ Calendar Added State

Set Reminder
→ Reminder Set

Search
→ Filtered Results

Category Filter
→ Filtered Events

Calendar Event
→ Event Details

Month
→ Week

Week
→ List

Announcement
→ Related Event

Use subtle transitions consistent with the existing UniLink animation language.

==================================================
ACCESSIBILITY
==================================================

Maintain:

- Strong contrast
- Clear typography
- Visible focus states
- Touch-friendly controls
- Accessible buttons
- Meaningful icon labels
- Clear event status

Do not rely only on color to communicate event status.

==================================================
DESIGN QUALITY
==================================================

The final experience should feel like a production-ready SaaS campus platform.

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
- Social-media-style event feeds
- Excessive cards
- Excessive colors
- Heavy shadows
- Neon effects
- Unnecessary gradients
- Overly decorative event posters
- Cluttered calendars

The experience should communicate:

"Everything happening around my campus is easy to discover."

IMPORTANT:

Create these as NEW Student Portal screens.

Do NOT redesign previously completed UniLink screens.

Do NOT create a new sidebar.

Do NOT create a new design system.

Connect Events with:

Student Dashboard
Announcements
Exams & Deadlines
Class Materials
My Courses
Clubs & Communities
Notifications
CR Portal