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
- CR Dashboard
- CR Routine Management

Reuse the existing UniLink components and visual language.

Do NOT create a new design system.

==================================================
MODULE — LOST & FOUND
==================================================

Create a modern campus Lost & Found system where students can report, search, and recover lost or found belongings inside the university campus.

The module should support:

- Report Lost Item
- Report Found Item
- Browse Lost Items
- Browse Found Items
- Search
- Filters
- Item Details
- Contact / Request
- Claim Verification
- Saved Items
- My Reports
- Resolved Items

The experience should feel trustworthy, clean, professional, and safe.

Do NOT make it look like an e-commerce marketplace or social media feed.

Create NEW Student Portal screens:

1. LOST & FOUND
2. ITEM DETAILS
3. REPORT LOST ITEM
4. REPORT FOUND ITEM
5. MY REPORTS
6. SAVED ITEMS
7. CLAIM / RETURN FLOW

==================================================
NAVIGATION
==================================================

Use the existing Student Portal sidebar.

Active navigation:

CAMPUS
→ Lost & Found

Do NOT create a new sidebar.

==================================================
SCREEN 1 — LOST & FOUND
==================================================

Create:

Lost & Found

Subtitle:

"Report lost belongings, find missing items, and help return items to their owners."

Primary actions:

[ Report Lost Item ]

[ Report Found Item ]

Search:

"Search lost or found items..."

==================================================
TOP SUMMARY
==================================================

Create compact statistics using existing UniLink statistics-card components.

Example:

Active Reports
24

Lost Items
14

Found Items
10

Recently Resolved
8

Keep the design clean.

Do NOT introduce a new statistics-card style.

==================================================
QUICK ACTIONS
==================================================

Create two prominent but simple action areas:

LOST SOMETHING?

"Report an item you lost on campus."

[Report Lost Item]


FOUND SOMETHING?

"Help return an item to its owner."

[Report Found Item]

Use existing UniLink primary/secondary button styles.

==================================================
SEARCH AND FILTER
==================================================

Create:

Search:

"Search item name, location, or description..."

Filters:

All
Lost
Found
Recently Added
Resolved

Category:

Electronics
ID / Cards
Books
Clothing
Accessories
Keys
Bags
Stationery
Other

Location:

All Campus
Academic Building
Library
Cafeteria
Lab
Auditorium
Sports Area
Parking
Other

Date:

Today
This Week
This Month
Custom

Sort:

Recently Added
Recently Updated
Nearest Match

Use existing UniLink filter components.

==================================================
ITEM LIST
==================================================

Create:

Recent Lost & Found

Example:

Lost:

Black Backpack

Category:
Bags

Last Seen:
Central Library

Date:
Aug 27, 2026

Status:
Lost

[View Details]


Found:

Student ID Card

Category:
ID / Cards

Found At:
Building 3

Date:
Aug 28, 2026

Status:
Found

[View Details]


Lost:

Wireless Earbuds

Category:
Electronics

Last Seen:
CSE Lab 2

Date:
Aug 26, 2026

Status:
Lost

[View Details]

==================================================
ITEM CARD
==================================================

Each item should contain:

- Item image
- Lost / Found status
- Item name
- Category
- Location
- Date
- Short description
- Report status
- Save/bookmark action

Example:

BLACK BACKPACK

Lost

Bags

Central Library

Aug 27

"Black laptop backpack with a small university keychain."

[View Details]

[Save]

On hover:

- Slight elevation
- Subtle blue border
- Minimal arrow movement

Reuse existing UniLink interactions.

==================================================
IMPORTANT PRIVACY RULE
==================================================

Do NOT display sensitive personal information publicly.

Do NOT show:

- Phone numbers
- Personal email addresses
- Student ID numbers
- Exact private addresses

Use safe contact/request mechanisms.

==================================================
SCREEN 2 — ITEM DETAILS
==================================================

Create a detailed Lost & Found item page.

Example:

Black Backpack

LOST ITEM

==================================================
ITEM HEADER
==================================================

Show:

Black Backpack

Lost

Category:
Bags

Reported:
Aug 27, 2026

Last Seen:
Central Library

Primary action:

[ I Found This Item ]

Secondary:

[ Save Item ]

Optional:

[ Share ]

==================================================
ITEM IMAGE
==================================================

Create a large item image area.

Allow:

- Main image
- Thumbnail images
- Image gallery

If no image:

Show:

No image available

Do NOT use stock photos that make the item look like an actual verified item.

Use realistic placeholder UI imagery only.

==================================================
ITEM INFORMATION
==================================================

Show:

Category
Bags

Color
Black

Brand
Generic / Not Specified

Date Lost
August 27, 2026

Last Seen
Central Library

Approximate Time
4:00 PM – 5:00 PM

Status
Lost

==================================================
DESCRIPTION
==================================================

Create:

Description

Example:

"Black laptop backpack with two compartments. A small university keychain is attached to the side."

==================================================
IDENTIFYING DETAILS
==================================================

Create:

Additional Identifying Information

Example:

- Small blue keychain
- Laptop compartment
- Minor scratch near zipper

Do not expose overly specific verification information publicly.

Some identifying information should remain private for verification.

==================================================
LOCATION
==================================================

Create:

Last Seen Location

Central Library

Floor 2

Show a simple campus map/location visual.

Do NOT reveal exact sensitive locations if unnecessary.

==================================================
REPORTER
==================================================

Show limited information:

Reported by:

Student

CSE Department

Batch 52

Do NOT expose personal contact information.

==================================================
CONTACT / RETURN
==================================================

For a lost item:

[ I Found This Item ]

Clicking this should open a secure request flow.

For a found item:

[ This Might Be Mine ]

Clicking this should open a claim request.

==================================================
ITEM STATUS
==================================================

Support:

Lost
Found
Claim Pending
Return Pending
Resolved
Closed

Use existing UniLink status styles.

==================================================
RESOLVED ITEM
==================================================

Create an alternate state:

✓ Item Returned

"This item has been successfully returned to its owner."

Resolved:
August 28, 2026

Keep resolved items visually muted.

==================================================
SCREEN 3 — REPORT LOST ITEM
==================================================

Create a clean multi-step form.

Title:

Report Lost Item

Subtitle:

"Provide enough information to help others identify and return your item."

==================================================
STEP 1 — ITEM INFORMATION
==================================================

Fields:

Item Name

Category

Color

Brand

Date Lost

Approximate Time

Description

Use existing UniLink form components.

==================================================
STEP 2 — LOCATION
==================================================

Fields:

Where did you last see it?

Building

Area

Floor

Approximate location

Example:

Central Library
Floor 2

Do not require an exact location.

==================================================
STEP 3 — PHOTOS
==================================================

Create:

Add Photos

[ Upload Image ]

Allow multiple images.

Show image previews.

Maximum:

5 images

Use existing upload component if available.

==================================================
STEP 4 — IDENTIFYING INFORMATION
==================================================

Create:

Private Identifying Details

"These details will only be used to verify ownership."

Example:

Unique sticker
Scratch mark
Contents
Serial number

IMPORTANT:

Clearly label this information as private.

Do NOT display it publicly on the item listing.

==================================================
STEP 5 — CONTACT PREFERENCE
==================================================

Create:

How should someone contact you?

Use secure UniLink messaging.

Do NOT expose personal phone numbers or email addresses publicly.

==================================================
SUBMIT
==================================================

Primary:

[ Publish Lost Report ]

Secondary:

[ Save Draft ]

==================================================
REPORT SUCCESS
==================================================

Show:

✓ Lost Item Reported

"Your report has been published to the UniLink Lost & Found system."

Show:

Report ID:
LF-2026-00124

Buttons:

[ View Report ]

[ Browse Found Items ]

==================================================
SCREEN 4 — REPORT FOUND ITEM
==================================================

Create a similar form for found items.

Title:

Report Found Item

Subtitle:

"Help return a found item to its owner."

Fields:

Item Name

Category

Color

Brand

Date Found

Approximate Time

Found Location

Description

Photos

Private Identifying Details

Contact Preference

==================================================
FOUND ITEM SAFETY
==================================================

Add a subtle information box:

"Please do not publish sensitive information such as student IDs, passwords, financial information, or personal documents."

Keep this professional and concise.

==================================================
FOUND ITEM HANDOVER
==================================================

Ask:

Where is the item currently kept?

Options:

I have the item
Submitted to Security Office
Submitted to Lost & Found Desk
Submitted to Department Office
Other

If "I have the item":

Show:

Preferred handover location

==================================================
REPORT SUCCESS
==================================================

Show:

✓ Found Item Reported

"Thank you for helping return this item."

Buttons:

[ View Report ]

[ Browse Lost Items ]

==================================================
SCREEN 5 — MY REPORTS
==================================================

Create:

My Reports

Subtitle:

"Manage your lost and found reports."

Summary:

Active Reports
3

Claim Requests
1

Resolved
5

==================================================
REPORT TABS
==================================================

Tabs:

All
Lost
Found
Claim Requests
Resolved

==================================================
REPORT LIST
==================================================

Example:

Black Backpack

Lost

Reported:
Aug 27

Status:
Active

[View]


Student ID Card

Found

Reported:
Aug 28

Status:
Claim Pending

[View]


Wireless Earbuds

Lost

Reported:
Aug 20

Status:
Resolved

[View]

==================================================
REPORT ACTIONS
==================================================

For active reports:

[Edit]

[Mark as Found]

[Close Report]

For found items:

[View Claims]

[Mark as Returned]

For resolved:

[View Details]

==================================================
MARK AS RESOLVED
==================================================

Create confirmation:

Mark this item as returned?

"This will close the report and remove it from active Lost & Found results."

Buttons:

[Mark as Resolved]

[Cancel]

==================================================
SCREEN 6 — SAVED ITEMS
==================================================

Create:

Saved Items

Subtitle:

"Keep track of lost or found items you want to monitor."

Search:

"Search saved items..."

Filters:

All
Lost
Found
Recently Updated

==================================================
SAVED ITEM LIST
==================================================

Example:

Black Backpack

Lost

Central Library

Aug 27

[View]

[Remove]


Wireless Earbuds

Lost

CSE Lab 2

Aug 26

[View]

[Remove]

==================================================
EMPTY STATE
==================================================

Create:

No Saved Items

"Save a Lost & Found item to easily check for updates."

[Explore Lost & Found]

==================================================
SCREEN 7 — CLAIM / RETURN FLOW
==================================================

Create a secure claim flow.

When a student clicks:

This Might Be Mine

show:

Claim This Item

Black Backpack

==================================================
CLAIM VERIFICATION
==================================================

Ask verification questions.

Example:

What color is the keychain attached to the backpack?

[ Answer ]

What identifying mark does the backpack have?

[ Answer ]

Additional information:

[ Text Area ]

IMPORTANT:

Do not reveal the private identifying details to the claimant.

The claimant must provide the information independently.

==================================================
CLAIM SUBMISSION
==================================================

Primary:

[ Submit Claim ]

After submission:

✓ Claim Submitted

"Your claim has been sent to the person who reported this item."

Status:

Claim Pending

==================================================
CLAIM REVIEW
==================================================

Create a state for the reporter:

New Claim Request

Black Backpack

Claimant has provided identifying information.

Actions:

[ Review Claim ]

[ Contact Through UniLink ]

==================================================
CLAIM APPROVED
==================================================

Show:

Claim Approved

"You can now arrange a safe handover."

Create:

Handover Location

University Security Office

Suggested Meeting Point

Buttons:

[ Mark as Returned ]

[ Keep Report Open ]

==================================================
CLAIM REJECTED
==================================================

Show:

Claim Not Verified

"The provided information was not sufficient to verify ownership."

Actions:

[ Submit Another Claim ]

[ Close ]

==================================================
SAFE HANDOVER
==================================================

Create a safety information box:

"For your safety, arrange item handovers in a public campus location such as the security office, department office, or designated Lost & Found desk."

Do NOT encourage private or unsafe meetings.

==================================================
SECURITY / OFFICIAL HANDOVER
==================================================

Support official locations:

University Security Office

Department Office

Lost & Found Desk

Campus Administration

This should be represented as a trusted handover option.

==================================================
REPORT MODERATION
==================================================

Create a subtle:

Report Listing

action for inappropriate or suspicious reports.

Options:

Incorrect Information
Duplicate
Suspicious
Inappropriate
Other

Do NOT create a complex moderation dashboard in this task.

==================================================
DUPLICATE REPORT
==================================================

If a similar report exists, show:

Possible Matching Item

"We found an item that may match your report."

Show:

Item
Location
Date
Status

[View Item]

This should be subtle and helpful.

==================================================
SEARCH RESULTS
==================================================

Search should match:

Item name
Category
Location
Description
Keyword

Example:

Search:
"black bag"

Results:

Black Backpack
Lost
Central Library

Black Laptop Bag
Found
Building 4

==================================================
FILTER RELATIONSHIP
==================================================

Allow combined filtering:

Lost + Bags + Library

Found + Electronics + This Week

Lost + CSE Building

The interface should remain simple.

==================================================
NOTIFICATIONS
==================================================

Connect Lost & Found with the existing Notifications module.

Examples:

"Someone reported a found item matching your saved report."

"Your claim request has been submitted."

"Your claim has been approved."

"Your lost item report has been updated."

"Your item has been marked as returned."

Do NOT create a separate notification system.

==================================================
STUDENT DASHBOARD CONNECTION
==================================================

The Student Dashboard may show:

Lost & Found

Example:

"1 possible match found for your lost item."

[View]

Do NOT redesign the Student Dashboard.

==================================================
PRIVACY & SECURITY
==================================================

This module must prioritize privacy.

Never publicly display:

- Student ID numbers
- Phone numbers
- Personal email
- Exact personal addresses
- Private identifying information
- Sensitive document information

Use secure UniLink communication for contact.

Private identifying details should only be used during claim verification.

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

==================================================
RESPONSIVE DESIGN
==================================================

Create mobile versions around 390px width.

LOST & FOUND MOBILE:

- Search at top
- Horizontal filters
- Quick action buttons
- Stacked item cards
- Compact item information

ITEM DETAILS MOBILE:

- Image gallery
- Item information
- Location
- Description
- Secure claim/contact action

REPORT FORM MOBILE:

- Single-column form
- Step-by-step layout
- Touch-friendly inputs
- Photo upload
- Clear submit button

MY REPORTS MOBILE:

- Tabs
- Stacked reports
- Status indicators

CLAIM FLOW MOBILE:

- Step-by-step verification
- Clear status
- Safe handover instructions

==================================================
LOADING STATES
==================================================

Create skeleton states for:

- Lost & Found list
- Item details
- My Reports
- Saved Items
- Claim status

Reuse existing UniLink loading components.

==================================================
ERROR STATES
==================================================

Create:

Unable to load Lost & Found.

[Try Again]

Unable to submit report.

[Try Again]

Unable to submit claim.

[Try Again]

Unable to upload image.

[Try Again]

Use existing UniLink error components.

==================================================
EMPTY STATES
==================================================

Create:

No Lost Items Found

"No active lost item reports match your search."

[Clear Filters]


No Found Items

"No found item reports match your search."

[Clear Filters]


No Reports Yet

"You haven't created any Lost & Found reports."

[Report an Item]

==================================================
INTERACTIONS
==================================================

Create prototype interactions for:

Lost & Found
→ Item Details

Report Lost
→ Lost Report Form

Report Found
→ Found Report Form

Submit Report
→ Report Success

Item Details
→ Save

Save
→ Saved State

Item Details
→ Claim

Claim
→ Verification

Submit Claim
→ Claim Pending

Claim Pending
→ Claim Approved / Rejected

My Reports
→ Report Details

Report
→ Edit

Report
→ Mark as Resolved

Saved Items
→ Item Details

Search
→ Search Results

Filters
→ Filtered Results

Use subtle transitions consistent with the existing UniLink animation language.

==================================================
DESIGN QUALITY
==================================================

The final experience should feel like a production-ready campus service.

It should communicate:

"Lost something? Find it. Found something? Help return it."

Prioritize:

- Trust
- Privacy
- Simplicity
- Clear status
- Easy search
- Safe communication
- Professional SaaS UI

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

- E-commerce marketplace aesthetics
- Social media feed design
- Excessive cards
- Excessive colors
- Heavy shadows
- Neon effects
- Excessive gradients
- Public personal information
- Complex messaging interfaces
- Gamification

==================================================
IMPORTANT
==================================================

Create these as NEW Student Portal screens.

Do NOT redesign previously completed screens.

Do NOT create a new sidebar.

Do NOT create a new design system.

Connect Lost & Found with:

Student Dashboard
Notifications
Student Profile
Campus Locations
University Security / Official Handover

After completing these screens, stop.

Do NOT start designing Notifications yet.