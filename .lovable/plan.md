

# AI Opportunity Tracker

## Architecture
- **Frontend**: Single-page mobile-first React app with step-by-step wizard
- **Backend (Google Sheets)**: Google Apps Script deployed as a web app (user deploys it — I'll provide the code)
- **AI Extraction**: Lovable Cloud edge function using Lovable AI to extract Link, Description, and Deadline from raw text

## Google Apps Script (User deploys)
I'll provide a complete Apps Script that:
- **GET**: Returns all data from a selected sheet tab (for duplicate checking on Column B/Link)
- **POST**: Appends a new row with Title, Link, Description, Category, Deadline, Status ("Not Yet")
- Deployed as a web app with "Anyone" access

## App Flow (4-Step Wizard, mobile-optimized)

### Step 1: Select Target
- 6 sheet tab buttons: 📅 Events, 🎓 Formations, 📜 Certifs, ✈️ Study Abroad, 💻 Competition Online, 🏆 Competition Offline
- Category dropdown (dynamic based on selected tab)
- Optional Title text input

### Step 2: Paste Raw Text
- Large textarea for pasting opportunity content
- "Extract with AI" button

### Step 3: AI Extraction
- Edge function calls Lovable AI to extract: Link, Description, Deadline
- Shows extracted fields in editable form

### Step 4: Review & Submit
- Review card with all fields
- Duplicate check against Column B (Link) of selected sheet
- Warning banner if duplicate found with "Add Anyway" option
- Submit → appends to sheet → success toast with "View in Sheet" link

## UI Design
- Clean, minimal, mobile-first single page
- Light gray background, white cards
- Inter font, high contrast
- Bottom navigation or floating action button for "View in Google Sheet"
- Step indicator at top

## Column Mapping (Normalized)
| Column | Field |
|--------|-------|
| A | Title |
| B | Link |
| C | Description |
| D | Category |
| E | Deadline |
| F | Status |

## Technical Stack
- React + Tailwind (mobile-first)
- Lovable Cloud edge function for AI extraction
- Google Apps Script as sheet API (code provided to user)

