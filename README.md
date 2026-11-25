# IPL 2027 Ticket Booking Website

A responsive web application for browsing IPL 2027 match schedules, calculating ticket prices live, submitting bookings, and viewing booking history.

## Features

- **Navigation & Hero Banner:** Fixed navigation bar with smooth section links, mobile hamburger menu toggle, and hero call-to-action buttons.
- **Tournament Overview:** Highlights popular teams and major match venues.
- **Interactive Match Schedule:** CSS Grid match cards with team filtering (`ALL`, `RCB`, `CSK`, `MI`, `KKR`, `SRH`), a Grid/List view toggle, and direct booking selection.
- **Live Booking Summary & Form:** Interactive form for selecting a match, stand category (`General`, `Premium`, `VIP`), ticket quantity, and attendee details with real-time price and total calculation plus toast notifications.
- **My Ticket Bookings Table:** Dynamically appends confirmed bookings with generated booking IDs, ticket counts, and total amounts.
- **Stadium Guidelines & Responsive Layout:** 3-column guidelines grid that adapts cleanly across desktop, tablet, and mobile viewports using Flexbox, CSS Grid, and media queries.

## Project Structure

```text
├── index.html
├── styles.css
├── app.js
└── README.md