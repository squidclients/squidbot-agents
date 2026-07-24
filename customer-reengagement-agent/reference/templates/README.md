# Template Library Index
# Used by src/template-library.cjs to match contact tags to campaigns

## Campaign Index

| # | Name | Type | Match Tags | File |
|---|------|------|-----------|------|
| 01 | Past Customer Check-In | Relationship | past-customer, lapsed-client, returning, inactive | 01-past-customer.md |
| 02 | Inactive Patient/Client | Opportunity | overdue, inactive-patient, missed-appointment, recall | 02-inactive-patient.md |
| 03 | Previous Quote | Opportunity | previous-quote, estimates-sent, proposal, stale-quote | 03-previous-quote.md |
| 04 | Old Lead | Opportunity | old-lead, cold-lead, past-inquiry, former-prospect | 04-old-lead.md |
| 05 | Seasonal Reactivation | Relationship | seasonal, weather-dependent, seasonal-client, annual | 05-seasonal.md |
| 06 | Customer Appreciation | Relationship | loyalty, appreciation, milestone, lease-end, renewal | 06-customer-appreciation.md |
| 07 | Maintenance Reminder | Opportunity | maintenance, service-due, inspection, tune-up | 07-maintenance-reminder.md |
| 08 | New Service for Past Clients | Opportunity | cross-sell, new-service, existing-client, add-on | 08-new-service.md |
| 09 | Limited Availability | Opportunity | limited, waitlist, high-demand, first-dibs, vip | 09-limited-availability.md |

## 5-Stage Framework (All Campaigns)

| Stage | Goal | Channel |
|-------|------|---------|
| 1. Reconnect | Remind who you are, acknowledge the gap | SMS |
| 2. Reply | Follow up naturally, ask a question | Email |
| 3. Permission | Ask before presenting the offer | Email |
| 4. Offer | Present clear value after permission granted | Email |
| 5. Booking | One specific action — book the appointment | SMS |

## Dual Track Rule
- **Track A (Cold):** No reply → email sequence runs all stages → tag campaign-complete
- **Track B (Replied):** First reply triggers AI handler → stays in same channel → pushes toward booking

## How to Add a New Template
1. Create a new file `reference/templates/##-campaign-name.md`
2. Follow the structure: SMS Opening, Email Opening, Reply Follow-Up, Permission, Offer, Booking, No-Response
3. Add the match tags to `src/template-library.cjs` in CAMPAIGN_TYPES
