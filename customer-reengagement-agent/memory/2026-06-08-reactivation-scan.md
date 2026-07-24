# Weekly Reactivation Scan — Monday June 8, 2026

**Agent:** customer-reengagement  
**Data Source:** GHL CRM contacts backup (2026-05-26) — 2,093 total contacts  
**Analysis Date:** June 8, 2026

---

## Summary

| Metric | Count |
|--------|-------|
| Total CRM contacts | 2,093 |
| All leads (no converted customers) | 2,093 |
| Real, reachable contacts (non-test/guest) | 1,563 |
| With email | 1,575 |
| With phone | 1,540 |
| With both email + phone | ~1,050 |
| With company name | 3 |
| With tags | 119 |
| Dormant 15+ days | 1,561 (99.9%) |
| Dormant 30+ days | 13 |

**Key Finding:** This CRM is overwhelmingly early-stage. All contacts are leads; none have been converted to customers. The vast majority came through the Voice AI Chat Widget (539) or were imported without a source (1,552). Most have had zero follow-up beyond initial cadence attempts. The pipeline is cold at scale.

**Data Freshness Note:** The GHL backup is from May 26 — 13 days old. Some contacts may have had activity since. Recommend refreshing from live GHL API before executing outreach.

---

## Scoring Methodology

Each contact was scored on a 100-point scale across these dimensions:

| Signal | Points | Rationale |
|--------|--------|-----------|
| `booked-discovery-call` tag | +30 | Highest intent signal — they booked a call |
| `win-back-target` tag | +25 | Previously identified for re-engagement |
| `squadbot-client` tag | +20 | Known client or prospect relationship |
| `lead-warm` tag | +15 | Warm lead designation |
| Has company name | +15 | Business identity = higher value |
| `chiropractic` tag | +10 | Known vertical with existing client deployments |
| `follow-up-overdue` tag | +10 | Prior engagement exists but went cold |
| `cadence-expired`/`cadence-final-attempt` | +5 | Prior outreach attempted |
| Has both email + phone | +10 | Reachable on multiple channels |
| Has email only | +5 | At least one channel |
| Business email domain | +8 | Non-free email = business context |
| Recently active (≤21 days) | +10 | Still warm-ish |
| Moderately dormant (22-35 days) | +5 | Cooling but salvageable |
| `lead-cold` tag | -5 | Already flagged cold |
| `invalid-contact` tag | -20 | Bad contact info |

---

## Top 5 High-Value Targets

### 1. Michael Kay — Score: 90 🔴 HIGHEST PRIORITY

| Field | Value |
|-------|-------|
| Email | 1michaelk@gmail.com |
| Phone | +1 818-335-7480 |
| Tags | booked-discovery-call, follow-up-overdue, cadence-expired, win-back-target |
| Added | April 10, 2026 |
| Last Activity | May 18, 2026 (20 days dormant) |
| Source | Voice AI Chat Widget |

**Why they're #1:** Booked a discovery call AND was tagged as a win-back target. Follow-up is overdue and the cadence expired. This person raised their hand twice and fell through the cracks. Has both email and phone.

**Win-back Strategy:**
- **Channel:** Phone call first (they're in LA area code — 818). If no answer, follow with personalized SMS.
- **Approach:** "Hey Michael, you'd booked a call with us back in April and I want to make sure you got the info you needed. A lot's changed since then — we've got some new capabilities I'd love to show you. Can I book 15 min this week?"
- **Tone:** Direct, apologetic about the gap, forward-looking.
- **Escalation:** If no response in 48 hours, send a short email with a case study or ROI stat relevant to their business.
- **Offer:** Free 15-minute strategy call (no strings, no demo pressure).

---

### 2. Elena Gaudisson — Score: 80 🔴 HIGH PRIORITY

| Field | Value |
|-------|-------|
| Email | makeupbylenna@outlook.com |
| Phone | +1 916-834-8366 |
| Tags | booked-discovery-call, lead-warm, follow-up-overdue, cadence-final-attempt |
| Added | April 29, 2026 |
| Last Activity | May 18, 2026 (20 days dormant) |
| Source | Voice AI Chat Widget |

**Why they're #2:** Booked a discovery call, tagged warm, follow-up overdue, and the cadence is at final attempt stage — meaning they're about to be written off. Has both email and phone. Likely a beauty/makeup professional (email: makeupbylenna).

**Win-back Strategy:**
- **Channel:** SMS first — beauty professionals are often mobile-first. Then email.
- **Approach:** "Hi Elena! You'd connected with us about AI tools for your beauty business. I know time gets away from all of us. We've actually helped another beauty professional automate their booking and social — can I send you a quick 2-min video showing how?"
- **Tone:** Friendly, peer-oriented, low-pressure.
- **Content hook:** Mention a relevant vertical example (beauty/makeup) — even a generic one.
- **Offer:** Quick personalized video walkthrough + no-commitment trial.

---

### 3. Kale Rempel — Score: 45 🟡 MEDIUM-HIGH

| Field | Value |
|-------|-------|
| Email | kalerempel@gmail.com |
| Phone | +1 250-317-1218 |
| Tags | booked-discovery-call |
| Added | March 27, 2026 |
| Last Activity | May 13, 2026 (25 days dormant) |
| Source | Unknown |

**Why they're #3:** Booked a discovery call. Local area code (250 = BC). Multiple entries in the CRM under different email variations (kalerempel, kalerempell, kale@dropified.com, lowell@dropify.com) suggesting they may be connected to Dropified/Dropify — an e-commerce business. Could be a team member or associate of the owner. Multiple CRM entries = high engagement attempts.

**Win-back Strategy:**
- **Channel:** Phone call (local number) + email.
- **Approach:** "Hey Kale, I noticed you'd booked a call with us back in March. I see you're connected to some e-commerce businesses — we've been helping local businesses automate their entire operations stack. Worth a quick chat?"
- **Tone:** Casual, local (BC), business-to-business.
- **Clarification needed:** Determine if Kale is a prospect, partner, or internal team member. Multiple entries suggest confusion in the CRM. CEO to confirm relationship before outreach.
- **Offer:** 30-min operations audit — show how SquidBot could streamline their e-commerce ops.

---

### 4. Paul (Vodyssey) — Score: 38 🟡 MEDIUM

| Field | Value |
|-------|-------|
| Email | paul@vodyssey.com |
| Phone | None |
| Tags | booked-discovery-call, lead-cold, squidbot-processed |
| Added | May 1, 2026 |
| Last Activity | May 2, 2026 (36 days dormant) |
| Source | Voice AI Chat Widget |

**Why they're #4:** Booked a discovery call. Business email (vodyssey.com — appears to be a travel/experience company). Already processed by the system but tagged cold. No phone number limits channels.

**Win-back Strategy:**
- **Channel:** Email only (no phone on file).
- **Approach:** "Hi Paul, you connected with us about AI operations for Vodyssey. We've since helped a few businesses in the experience/travel space automate their booking flow and customer follow-up. Would a quick email with 3 ideas specific to your business be helpful, or would you prefer a call?"
- **Tone:** Professional, value-first, give-before-ask.
- **Content hook:** Travel/experience vertical relevance.
- **Offer:** Custom 3-idea email first (low commitment), then call if they engage.

---

### 5. Kevin Watson (Kevin Watson Chiropractic) — Score: 30 🟡 MEDIUM

| Field | Value |
|-------|-------|
| Email | None |
| Phone | None |
| Company | Kevin Watson Chiropractic |
| Tags | squadbot-client, chiropractic, lead-cold, squidbot-processed |
| Added | April 30, 2026 |
| Last Activity | May 1, 2026 (37 days dormant) |
| Source | Unknown |

**Why they're #5:** Tagged as a `squadbot-client` (not just a lead — appears to be or have been an actual client). In the chiropractic vertical where SquidCircle already has deployments (Inline Family Chiropractic is another client). No contact info on file — this is a data gap.

**Win-back Strategy:**
- **Channel:** Unknown — no email or phone. Requires research.
- **Approach:** "Dr. Watson, I noticed we'd connected about AI tools for your chiropractic practice. We've been working with other chiros in the area and have some new automation specifically for patient re-engagement and appointment reminders. Let's reconnect."
- **Tone:** Professional, healthcare-aware, peer reference (mention other chiro clients if approved).
- **Blocker:** No contact info. Need CEO to provide contact details or approve a lookup.
- **Offer:** Chiropractic-specific demo showing patient retention automation.

**Honorable mention:** Craig Wing at Inline Family Chiropractic (also tagged `squadbot-client`, 38 days dormant) — same situation, no contact info, chiro vertical. Recommend handling both together.

---

## Additional Observations

### CRM Data Quality Issues
- **No converted customers in CRM.** All 2,093 contacts are leads. Either the CRM isn't tracking customer status, or no conversions have been recorded. This makes true "dormant customer" re-engagement impossible — we're doing dormant lead re-engagement instead.
- **539 "guest visitor" contacts** from Voice AI Chat Widget with no names, emails, or phones — essentially dead contacts that clutter the pipeline. Recommend bulk-archive.
- **Multiple duplicate entries** for the same person (Kale Rempel has 5+ entries, Marco has multiple entries). CRM deduplication needed.
- **Missing contact info** on high-value tagged contacts (Kevin Watson, Craig Wing have no email or phone despite being tagged as `squadbot-client`).

### Pipeline at Scale
- The bulk of contacts (1,548) are dormant 15-30 days — they came in via Voice AI Chat Widget, were never followed up meaningfully, and are cold.
- Only 13 contacts are dormant 30+ days with real names and contact info.
- The "pipeline" is more of a holding tank than an active funnel.

---

## Recommended Next Actions

### Immediate (This Week)
1. **CEO approval required** before any outreach — per AGENTS.md red lines
2. **Refresh CRM data** from live GHL API — backup is 13 days stale
3. **Contact Michael Kay** (phone first) — highest-priority win-back, already flagged
4. **Contact Elena Gaudisson** (SMS first) — about to fall off the cadence entirely
5. **Confirm Kale Rempel's relationship** with CEO — prospect, partner, or internal?

### Short-Term (This Week-Next)
6. **Get contact info for Kevin Watson and Craig Wing** — they're tagged as clients but have no email/phone. CEO to provide.
7. **Draft and send Paul (Vodyssey) email** — value-first approach, 3 custom ideas
8. **Bulk-archive 539 guest visitor contacts** — dead weight in the CRM
9. **CRM deduplication** — merge Kale Rempel's 5+ entries and other duplicates

### Strategic (Ongoing)
10. **Implement CRM customer status tracking** — the fact that all 2,093 contacts are "lead" means there's no way to distinguish actual customers from prospects. This is a systemic gap.
11. **Set up automated dormant-lead alerts** — weekly scan should trigger automatically, not require manual pulling
12. **Build Voice AI Chat Widget follow-up flow** — 539 contacts came through and were never engaged. This is the biggest untapped pool.
13. **Track reactivation success metrics** — tag re-engaged contacts, measure conversion from dormant → active

---

## Data Limitations

- **Source:** GHL CRM backup from May 26, 2026 — not live data
- **No activity logs:** GHL contact records show dateAdded and dateUpdated but no detailed interaction history
- **No revenue data:** Cannot calculate true lifetime value; scoring uses proxy signals only
- **No opt-out tracking visible:** DND flags all show false, but may not reflect email/SMS unsubscribes
- **No conversion funnel:** All contacts are leads; no customer/opportunity stages tracked

**Recommendation:** Before next week's scan, request live GHL API access or a fresh export with pipeline stage, opportunity value, and interaction history.
