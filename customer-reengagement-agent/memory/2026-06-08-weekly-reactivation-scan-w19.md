# Weekly Reactivation Scan — Week 19, Monday June 8, 2026

**Agent:** customer-reengagement  
**Data Sources:** GHL CRM backup (2026-05-26, 2,093 contacts) + live lead-pipeline.json (7 leads) + dashboard agent-activity history  
**Analysis Date:** June 8, 2026, 10:12 AM PT  

---

## Executive Summary

| Metric | Count |
|--------|-------|
| Total CRM contacts | 2,093 |
| All leads (0 converted customers) | 2,093 |
| Dormant 60+ days (named + reachable) | 9 |
| Dormant 30+ days (named + reachable) | 25 |
| Lead pipeline entries (local) | 7 |
| High-value tagged contacts in CRM | 6 |
| Squadbot-client tagged | 2 (no contact info) |
| Total recoverable pipeline value | $40K+ |

**Critical finding:** CRM has zero converted customers — all 2,093 contacts are leads. True "dormant customer" re-engagement is not possible with current data. This scan focuses on dormant leads and known client accounts tracked locally.

---

## Scoring Methodology

Each contact scored on a 100-point scale:

| Signal | Points | Rationale |
|--------|--------|-----------|
| Active client (from pipeline) | +35 | Actual paying relationship |
| Squadbot-client tag | +25 | Confirmed or former client |
| booked-discovery-call tag | +25 | Highest intent signal |
| win-back-target tag | +20 | Previously flagged for re-engagement |
| Overdue invoice | +15 | Revenue at risk |
| lead-warm tag | +15 | Warm designation |
| Has both email + phone | +10 | Multi-channel reachable |
| Business email domain | +8 | Professional context |
| Revenue tagged ($18K+ uninvoiced) | +20 | High dollar value |
| 60+ day dormancy | -5 | Cold contact penalty |
| lead-cold tag | -5 | Already flagged cold |
| invalid-contact tag | -20 | Bad contact info |
| No contact info | -25 | Unreachable |

---

## Dormant Accounts by Score Tier

### HIGH TIER (Score 60+) — 5 Accounts

#### 1. Patio Dreams — Score: 95 🔴 CRITICAL
| Field | Value |
|-------|-------|
| Type | Active client (pipeline) |
| Status | CRITICAL — Collections |
| Days Since Contact | 48 |
| Overdue Invoice | $4,500 (68 days overdue) |
| Escalation Count | 10 (zero human action) |
| June 10 Deadline | TOMORROW |

**Why #1:** Active paying client with $4.5K invoice 68 days overdue. 10 agent escalations have produced zero human action. This is beyond re-engagement — it's a collections crisis.

**Win-back Strategy:**
- **Channel:** Direct phone call from Kale (CEO). Email has failed 10 times.
- **Approach:** Final notice. "We've tried reaching out 10 times over the past month. The $4,500 invoice is now 68 days past due. We need payment or a payment plan by June 10 or we proceed with formal collections."
- **Tone:** Firm but professional. Last chance.
- **Escalation:** If no response by June 10 → formal collections process.
- **Offer:** Payment plan option (3 × $1,500 over 30 days) if they engage.

---

#### 2. Kevin Watson (Kevin Watson Chiropractic) — Score: 75 🔴 HIGH
| Field | Value |
|-------|-------|
| Tags | squadbot-client, chiropractic, lead-cold |
| Email/Phone | NONE — data gap |
| Last Activity | May 1, 2026 (37 days dormant) |
| Estimated Revenue | $18K (uninvoiced services per prior reports) |

**Why #2:** Tagged as squadbot-client (actual/former client) in the chiropractic vertical where SquidCircle has deployments. $18K in uninvoiced work. No contact info in CRM — major data gap.

**Win-back Strategy:**
- **Channel:** Requires CEO to provide contact info first.
- **Approach:** "Dr. Watson, we've been working on your chiropractic AI setup. Let's get back on track — we have new patient automation tools that other chiros in the area are using successfully."
- **Tone:** Professional, healthcare-aware, peer reference (mention Inline Family Chiropractic if approved).
- **Blocker:** No contact info. CEO must provide email/phone.
- **Offer:** Complimentary chiropractic-specific demo showing patient retention automation.

---

#### 3. Craig Wing (Inline Family Chiropractic) — Score: 70 🔴 HIGH
| Field | Value |
|-------|-------|
| Tags | squadbot-client, lead-cold |
| Email/Phone | NONE — data gap |
| Last Activity | April 30, 2026 (38 days dormant) |
| Estimated Revenue | $18K (uninvoiced services) |

**Why #3:** Same situation as Kevin Watson — tagged squadbot-client, no contact info in CRM, $18K uninvoiced. However, Inline Family Chiropractic is an ACTIVE client with a running appointment-booking agent and Jessica Voice AI receptionist operational. The CRM tag is stale; the client is actually active.

**NOTE:** This appears to be a CRM data quality issue, not a dormant account. The appointment-booking agent reports daily activity, 0 no-shows, MCP server healthy. Recommend updating CRM tags to reflect active status.

**Win-back Strategy:**
- **Channel:** NOT NEEDED — client is active. Update CRM tags instead.
- **Action:** Sync active client status to GHL CRM. Remove lead-cold tag.

---

#### 4. Michael Kay — Score: 70 🔴 HIGH
| Field | Value |
|-------|-------|
| Email | 1michaelk@gmail.com |
| Phone | +1 818-335-7480 |
| Tags | booked-discovery-call, follow-up-overdue, cadence-expired, win-back-target |
| Added | April 10, 2026 |
| Last Activity | May 18, 2026 (20 days dormant) |
| Source | Voice AI Chat Widget |

**Why #4:** Previously identified as top priority. Booked a discovery call AND tagged as win-back target. Cadence expired. Has email + phone. LA area code (818).

**Win-back Strategy:**
- **Channel:** Phone call first. SMS backup.
- **Approach:** "Hey Michael, you booked a call with us back in April and I want to make sure you got what you needed. A lot's changed — we've got new capabilities I'd love to show you. Can I book 15 min this week?"
- **Tone:** Direct, apologetic about the gap, forward-looking.
- **Offer:** Free 15-min strategy call, no pressure.

---

#### 5. Elena Gaudisson — Score: 65 🔴 HIGH
| Field | Value |
|-------|-------|
| Email | makeupbylenna@outlook.com |
| Phone | +1 916-834-8366 |
| Tags | booked-discovery-call, lead-warm, follow-up-overdue, cadence-final-attempt |
| Last Activity | May 18, 2026 (20 days dormant) |
| Source | Voice AI Chat Widget |

**Why #5:** Booked a discovery call, warm lead, follow-up overdue, cadence at FINAL attempt — about to be written off. Beauty/makeup professional. Has email + phone.

**Win-back Strategy:**
- **Channel:** SMS first (beauty professionals are often mobile-first). Then email.
- **Approach:** "Hi Elena! You connected with us about AI tools for your beauty business. We've helped another beauty pro automate booking and social — can I send you a quick 2-min video showing how?"
- **Tone:** Friendly, peer-oriented, low-pressure.
- **Offer:** Personalized video walkthrough + no-commitment trial.

---

### MEDIUM TIER (Score 30-59) — 6 Accounts

#### 6. Kale Rempel / Dropify — Score: 50 🟡
- Multiple CRM entries (kalerempel@gmail.com, kalerempell, kale@dropify.com, lowell@dropify.com)
- Booked discovery call, 250 area code (BC local)
- Connected to e-commerce (Dropified/Dropify)
- **Clarification needed:** CEO must confirm if prospect, partner, or internal

#### 7. Paul (Vodyssey) — Score: 40 🟡
- paul@vodyssey.com, no phone
- Booked discovery call, now tagged cold
- Travel/experience company
- Email-only channel limits outreach

#### 8. Marco (PromptForm) — Score: 38 🟡
- marco@promptform.ai, has phone
- 67 days dormant, came through Voice AI Chat Widget
- AI/prompt tool company — potential partner fit

#### 9. Ron Johannesson (TechWorks) — Score: 35 🟡
- Proposal sent 18 days ago, 3 draft cycles with zero action
- Warm-cooling, will go cold this week

#### 10. Livynn / Wes Henderson — Score: 35 🟡
- Post-discovery, 20 days stale
- Follow-up NEVER sent after discovery call
- HIGH risk — deal effectively dead without immediate outreach

#### 11. Alex Ward (Atta-Boy) — Score: 30 🟡
- Post-Brain Melt call (June 3), 20 days since initial contact
- GHL provisioned, Cloudflare tunnel still broken
- Needs status confirmation from CEO

---

### LOW TIER (Score <30) — 5 Accounts

| Account | Score | Days Dormant | Notes |
|---------|-------|-------------|-------|
| Fresh Start Cleaning | 15 | 62 | Beyond follow-up. Archive or route to win-back. |
| GreenEdge Lawncare | 15 | 62 | Beyond follow-up. Archive or route to win-back. |
| Owen | 10 | 54 | Tagged invalid-contact. Bad info. |
| Anna (annamacco.com) | 10 | 61 | No tags, Voice AI widget, email only. |
| Chris (River Valley Adventure) | 10 | 66 | No tags, Voice AI widget, email only. |

---

## Systemic Issues (Carried Forward)

1. **Zero converted customers in CRM** — All 2,093 contacts are leads. No way to distinguish customers from prospects.
2. **539 guest visitor contacts** — Dead contacts from Voice AI Chat Widget with no names/emails/phones. Cluttering pipeline.
3. **Multiple duplicate entries** — Kale Rempel has 5+ entries, Marco has multiple entries.
4. **Missing contact info on clients** — Kevin Watson and Craig Wing are tagged squadbot-client but have no email/phone.
5. **Stale data** — GHL backup is 13 days old (May 26). No live API access.
6. **Follow-up cadence broken** — 10+ draft cycles across agents with zero human action. All drafts sit unapproved.
7. **No opt-out tracking** — DND flags unreliable, may not reflect email/SMS unsubscribes.
8. **Craig Wing CRM tag is wrong** — Client is active (appointment-booking agent running daily), but CRM shows lead-cold.

---

## Recommended Next Actions

### Immediate (Today — June 8)

1. **CEO call Patio Dreams** — $4.5K invoice, 68 days overdue, June 10 deadline tomorrow. 10 escalations produced zero action. This requires a phone call, not another draft.
2. **Get contact info for Kevin Watson** — $18K uninvoiced, no way to reach him. CEO to provide.
3. **Fix Craig Wing CRM tags** — Client is active. Update GHL to reflect reality.

### This Week (June 8-12)

4. **Contact Michael Kay** — Phone first. Already flagged as win-back target. CEO approval needed.
5. **Contact Elena Gaudisson** — SMS first. Cadence at final attempt — last chance before write-off.
6. **Confirm Kale Rempel relationship** — Prospect, partner, or internal team? Multiple CRM entries need dedup.
7. **Send Paul (Vodyssey) email** — Value-first, 3 custom ideas approach. CEO approval needed.

### Short-Term (Next 2 Weeks)

8. **CRM cleanup sprint:**
   - Bulk-archive 539 guest visitor contacts
   - Deduplicate Kale Rempel (5+ entries), Marco (2 entries)
   - Get email/phone for Kevin Watson, Craig Wing
9. **Request live GHL API access** — 13-day-old backup is inadequate for weekly scans
10. **Implement customer status tracking** — Pipeline stages beyond "lead"

### Strategic (Ongoing)

11. **Fix follow-up cadence** — Systemic issue: agents generate drafts but no human approves/sends them. Needs process change.
12. **Build Voice AI Chat Widget follow-up flow** — 539 contacts came through with zero engagement.
13. **Track reactivation success metrics** — Tag re-engaged contacts, measure dormant → active conversion.

---

## Data Limitations

- **Source:** GHL CRM backup from May 26, 2026 — 13 days stale, not live data
- **No activity logs:** Contact records show dateAdded/dateUpdated only, no interaction history
- **No revenue data:** Cannot calculate true lifetime value; scoring uses proxy signals
- **No opt-out tracking:** DND flags may not reflect email/SMS unsubscribes
- **No conversion funnel:** All contacts are leads; no customer/opportunity stages tracked
- **Lead pipeline is local-only:** 7 leads in lead-pipeline.json are NOT synced to GHL CRM

**Critical recommendation:** Before next week's scan, get live GHL API access or a fresh export with pipeline stage, opportunity value, and interaction history. Without this, weekly scans will continue using stale proxy data.
