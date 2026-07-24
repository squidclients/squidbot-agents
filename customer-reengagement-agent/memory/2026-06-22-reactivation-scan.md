# Weekly Reactivation Scan — Week 21, Monday June 22, 2026

**Agent:** customer-reengagement  
**Data Sources:** GHL CRM backup (2026-05-26, 2,093 contacts) + live lead-pipeline.json (7 leads, updated today) + dashboard agent-activity history + shared memory  
**Analysis Date:** June 22, 2026, 10:15 AM PT  

---

## Executive Summary

| Metric | Count | Δ from Last Week |
|--------|-------|-----------------|
| Total CRM contacts | 2,093 | unchanged (stale 27 days) |
| Named + reachable contacts | 1,571 | -1 (refined filter count) |
| Dormant 60+ days (named, reachable) | 19 | +3 (aged past threshold) |
| Dormant 30+ days (named, reachable) | 1,569 | +3 (aged past threshold) |
| Lead pipeline entries | 7 | unchanged |
| Active SquidCircle clients | 8 | unchanged |
| High-priority reactivation targets | 5 | -1 (Patio Dreams moved to Churned) |
| Critical collections | 1 (Patio Dreams) | unchanged — now Day 83 overdue |
| Total recoverable/at-risk pipeline | $40K+ | unchanged |

**Data freshness warning:** GHL CRM backup is now **27 days stale** (May 26). All dormancy figures are computed by adding 27 days to backup-date calculations. No live GHL API access yet — this is the 4th consecutive scan using the same stale dataset.

---

## What Changed Since Last Week (W20 → W21)

### Worsened
1. **Patio Dreams Churned** — Now 83 days overdue on $4,500 invoice (was 76d). 12+ collections escalations, zero CEO action. June 10 final notice deadline passed 12 days ago. This is no longer a win-back opportunity — the client has officially churned, and automated follow-up sequences have been suspended (`cronSuspended=true`).
2. **Lead pipeline staleness** — Ron Johannesson (TechWorks), Livynn/Wes, Alex Ward, Valeriya (Elfsight) are now **32-34 days stale** (were 25d). They have all crossed the cold-dead threshold (30 days) with zero response. Deals are effectively cold/dead.
3. **Michael Kay & Elena Gaudisson** — Crossed the 30-day cold-dead threshold (now 34 days dormant, was 27d). Still zero outreach. Reactivation probability has plummeted.
4. **CRM data gap** — Still zero converted customers in GHL CRM. All 2,093 contacts are leads. No live GHL API access yet — this is the 4th consecutive scan using the exact same stale dataset (May 26).
5. **Follow-up execution gap** — 7 consecutive cycles with zero human action.

### Improved / New Info
1. **Kevin Watson** — Phone number available: **780-395-9899** (Edmonton, AB). Check-in call scheduled for **today at 1:00 PM PDT**. Great forcing function to address the $18,000 unbilled.
2. **Atta-Boy Edmonton (Dave)** — Check-in call scheduled for **today at 10:00 AM PDT** to confirm if the Cloudflare 502 tunnel is fully resolved and restore confidence.
3. **Active Client Health** — Clayton Park (Dr. Doug), Autohub (Colin), and In-Line Family (Craig) are all green/healthy and running stable. Greg Steele real estate agent build is underway and hardware is shipping.

### Unchanged / Stalled
- Paul (Vodyssey) — No outreach sent (50 days dormant now, was 43d).
- Owen — Invalid contact info, unreachable.
- Kale Rempel relationship — Still unconfirmed (prospect/partner/internal?) - 15+ duplicate entries in CRM backup.
- CRM cleanup (434 guest visitors, duplicates) — Not performed.

---

## Scoring Methodology (carried forward)

Each contact scored on a 100-point scale:

| Signal | Points | Rationale |
|--------|--------|-----------|
| Active client (from pipeline/agents) | +35 | Actual paying relationship |
| Squadbot-client tag | +25 | Confirmed or former client |
| Booked discovery call | +25 | Highest intent signal |
| Win-back-target tag | +20 | Previously flagged |
| Revenue at risk ($18K+ uninvoiced) | +20 | High dollar value |
| Overdue invoice | +15 | Revenue at risk |
| Lead-warm tag | +15 | Warm designation |
| Has both email + phone | +10 | Multi-channel reachable |
| Business email domain | +8 | Professional context |
| Chiropractic tag | +10 | Known vertical |
| Follow-up-overdue tag | +10 | Prior engagement |
| 60+ day dormancy | -5 | Cold contact penalty |
| Lead-cold tag | -5 | Already flagged cold |
| Invalid-contact tag | -20 | Bad contact info |
| No contact info | -25 | Unreachable |

---

## Dormant Accounts by Score Tier

### 🔴 HIGH TIER (Score 60+) — 5 Accounts

#### 1. Patio Dreams — Score: 100 🔴 CRITICAL — COLLECTIONS CRISIS
| Field | Value |
|-------|-------|
| Type | Active client (pipeline) |
| Status | CRITICAL — Beyond Re-engagement (Churned) |
| Days Since Contact | 62 days (last: April 21) |
| Overdue Invoice | $4,500 (**83 days overdue**) |
| Escalation Count | 12+ (zero human action) |
| Final Notice Deadline | June 10 — **PASSED (12 days ago)** |

**Change since W20:** Invoice overdue went 76d → 83d. Days stale went 58d → 62d. Automated sequences suspended.

**Assessment:** Beyond win-back or follow-up. This is an unresponsive account with delinquent debt. The client has not responded to 12+ collection attempts over 6+ weeks. The June 10 final notice deadline passed with zero response from both the client and the CEO.

**Recommended Action (CEO):**
- **Refer to collections agency or write-off.** The company must make a binary decision to either refer this to a collections agency/small claims or formally write off the $4,500. No more automated outreach.

---

#### 2. Kevin Watson (Kevin Watson Chiropractic) — Score: 85 🔴 HIGH (Reactivation / Billing Opportunity)
| Field | Value |
|-------|-------|
| Tags | squadbot-client, chiropractic, lead-cold |
| Email / Phone | Phone: **780-395-9899** (Edmonton, AB) — email null |
| Days Since Contact | 51 days (last: May 1) |
| Estimated Revenue | $18,000 (uninvoiced services) |

**Change since W20:** Days dormant went 44d → 51d. Check-in call scheduled for **today at 1:00 PM PDT**.

**Assessment:** Still our single highest-value win-back and billing opportunity. Tagged as squadbot-client (actual/former client) in our core chiropractic vertical. $18K contract remains unbilled due to unclear delivery verification. Today's check-in call is the perfect forcing function to verify delivery and bill this.

**Recommended Action (CEO):**
- **Call Kevin Watson at 1:00 PM PDT today.** Use the call to verify their setup, confirm success, and issue the $18,000 invoice.

---

#### 3. Michael Kay — Score: 72 🔴 HIGH
| Field | Value |
|-------|-------|
| Tags | booked-discovery-call, follow-up-overdue, cadence-expired, win-back-target |
| Email / Phone | 1michaelk@gmail.com / +18183357480 (Los Angeles area code) |
| Days Since Contact | 34 days (last: May 19) |
| Intent Signals | Booked discovery call + follow-up overdue |

**Change since W20:** Days dormant went 27d → 34d. Crossed the 30-day cold-dead threshold.

**Assessment:** Completely cold due to zero outreach since discovery call. High-intent lead that was never followed up on. Still reachable via email and phone.

**Recommended Action (CEO):**
- **Call or text +1 818-335-7480.** Send a short text: *"Hey Michael, Kale here from SquidCircle. Sorry we went quiet after our call last month—that's on me. We've just deployed some new local business agents that would fit perfectly with what we discussed. Worth a quick 5-min catch-up?"*

---

#### 4. Elena Gaudisson — Score: 67 🔴 HIGH
| Field | Value |
|-------|-------|
| Tags | booked-discovery-call, lead-warm, follow-up-overdue, cadence-final-attempt |
| Email / Phone | makeupbylenna@outlook.com / +19168348366 (Sacramento, CA) |
| Days Since Contact | 34 days (last: May 19) |

**Change since W20:** Days dormant went 27d → 34d. Crossed the 30-day cold-dead threshold.

**Assessment:** Warm lead that booked a discovery call but was left to cold-lapse due to zero outreach. Today represents the absolute final chance to reach her before archiving.

**Recommended Action (CEO):**
- **Text/Call +1 916-834-8366.** Text: *"Hi Elena, Kale from SquidCircle. Realized we never looped back after your inquiry last month. If automating booking or follow-ups is still on your radar, I'd love to show you what we're doing for local service businesses now. No pressure either way!"*

---

#### 5. Paul (Vodyssey) — Score: 63 🟠 HIGH-MEDIUM
| Field | Value |
|-------|-------|
| Tags | booked-discovery-call, lead-cold |
| Email / Phone | paul@vodyssey.com / phone null |
| Days Since Contact | 50 days (last: May 3) |

**Change since W20:** Days dormant went 43d → 50d.

**Assessment:** Going cold quickly. Booked discovery call, email only.

**Recommended Action (CEO):**
- **Email paul@vodyssey.com.** Send a concise "three ideas" email based on travel/experience agency automation.

---

#### 6. Ron Johannesson (TechWorks) — Score: 60 🟠 HIGH-MEDIUM (Stalled Proposal)
| Field | Value |
|-------|-------|
| Stage | proposal-sent |
| Status | cold |
| Days Since Contact | 32 days (last: May 21) |
| Escalation Count | 4 cycles |

**Change since W20:** Days stale went 25d → 32d. Crossed the 30-day cold-dead threshold.

**Assessment:** Proposal was actually sent and interest confirmed, but 32 days of silence has killed the deal. Still salvageable with a direct call.

**Recommended Action (CEO):**
- **Direct call to Ron.** *"Ron, sent you a proposal a few weeks back and realized we went quiet. That's on me—the proposal is still valid, and we've added major new capabilities (review management, booking automation) since then. Worth a 10-minute catch-up call this week?"*

---

### 🟡 MEDIUM TIER (Score 30-59) — 4 Accounts

#### 7. Livynn / Wes Henderson — Score: 50 🟡 (Stalled Post-Discovery)
- **Stage:** post-discovery, status: cold.
- **Dormancy:** 34 days stale (last contact May 19).
- **Assessment:** Discovery call completed, but zero follow-up was ever sent. Deal is cold-dead but high value.
- **Action:** Direct call needed.

#### 8. Alex Ward (Atta-Boy) — Score: 45 🟡 (Relationship Gap)
- **Stage:** post-brain-melt.
- **Dormancy:** 34 days stale individually.
- **Assessment:** Atta-Boy Edmonton (Dave) is active and check-in call is today at 10:00 AM PDT. Brad's deployment is onboarding. Alex is not a true dormant client, but a relationship gap.
- **Action:** Fold Alex into Atta-Boy Edmonton account management.

#### 9. Kale Rempel / Dropify — Score: 40 🟡 (Internal / Duplicate)
- **Dormancy:** 34 days.
- **Assessment:** 15+ duplicate entries in CRM. This is Kale (CEO) himself and test/team entries.
- **Action:** CEO must clean up and deduplicate his own contacts in CRM.

#### 10. Valeriya (Elfsight) — Score: 30 🟡 (Stalled Collaboration)
- **Stage:** collaboration-inquiry, status: cold.
- **Dormancy:** 32 days stale (last contact May 21).
- **Assessment:** Partnership inquiry gone silent. 4 draft responses sat unsent. Window is likely closed.
- **Action:** Send brief "still interested?" or formally close-lost.

---

### 🟢 LOW TIER (Score <30) — 4 Accounts

| Account | Score | Days Dormant | Status |
|---------|-------|-------------|--------|
| Marco (PromptForm) | 15 | 80d | Cold. AI/prompt tool — potential partner but no engagement. |
| Owen | 10 | 38d | Invalid contact info. Unreachable. |
| Anna (annamacco.com) | 10 | 75d | No tags, no engagement. Email only. |
| Chris (River Valley Adventure) | 10 | 80d | No tags, no engagement. Email only. |

**Note:** Fresh Start Cleaning (76d) and GreenEdge Lawncare (76d) remain archived.

---

## Active Client Health (June 22)

These are NOT dormant — they're the active/onboarding roster. Tracked here for completeness:

| Client | Status | Risk | Notes |
|--------|--------|------|-------|
| Inline Family Chiropractic | 🟢 Healthy | — | Booking sweeps running daily cleanly, 0 no-shows |
| Clayton Park Centre | 🟢 Healthy | — | Jane MCP and chiro tracking active. |
| Autohub OKGN | 🟢 Healthy | — | Client dashboard stable and performing. |
| Atta-Boy Edmonton (Dave) | 🟡 Watch | MEDIUM | **Check-in call today at 10:00 AM PDT** to verify CF 502 tunnel resolution. |
| Watson Chiropractic (Dr. Kevin) | 🔴 Dormant | HIGH | **Check-in call today at 1:00 PM PDT** — $18K unbilled. |
| Greg Steele Real Estate | 🟢 Onboarding | — | Real estate agent build underway, hardware shipping. |
| Atta-Boy Sherwood Park (Brad)| 🟡 Watch | MEDIUM | Mac Minis delivered, captive portal issue. |
| Patio Dreams | 🔴 Critical | HIGH | Churned / bad debt risk ($4,500 overdue). |

---

## Systemic Issues (Updated Status)

| # | Issue | Status | Impact |
|---|-------|--------|--------|
| 1 | Zero converted customers in CRM | ❌ Unfixed | Cannot distinguish customers from leads in GHL |
| 2 | GHL data 27 days stale | ❌ Unfixed | 4th consecutive weekly scan on stale backup |
| 3 | 434 guest visitor contacts | ❌ Unfixed | Cluttering pipeline, skewing metrics |
| 4 | Follow-up execution gap | ❌ Unfixed | 7 consecutive weeks of zero human follow-up action |
| 5 | Kevin Watson phone number | ✅ RESOLVED | Phone found (780-395-9899) and check-in scheduled today |
| 6 | Craig Wing tags incorrect | ❌ Unfixed | Active client shown as lead-cold |
| 7 | No live GHL API access | ❌ Unfixed | Weekly scans degrading in accuracy |
| 8 | Kale Rempel duplicates | ❌ Unfixed | 15+ duplicate entries cluttering CRM |

---

## Recommended Actions for Kale

### 🔴 Immediate (Today — Monday June 22)

1. **Use 10:00 AM PDT Call with Atta-Boy (Dave):** Confirm that the Cloudflare 502 tunnel is fully resolved, and restore Dave's confidence.
2. **Use 1:00 PM PDT Call with Dr. Kevin Watson:** Confirm delivery success of his voice AI, verify billing details, and **issue his $18,000 invoice**.
3. **Decide on Patio Dreams:** Formally write off the $4,500 overdue invoice as bad debt, or refer it to a collections agency. Turn off all automated sequences.
4. **Call/Text Michael Kay (+1 818-335-7480) & Elena Gaudisson (+1 916-834-8366):** Both have crossed the 30-day stale mark. Send a short personalized text message to re-engage them before archiving.

### 🟠 This Week (June 22-26)

5. **Get live GHL API access:** We are on our 4th consecutive scan of the May 26 backup. Obtain fresh keys or a fresh export.
6. **Call Ron Johannesson:** Proposal sent May 21 (32 days stale). Re-engage with updated capabilities.
7. **Clean up CRM duplicates:** Deduplicate the 15+ Kale Rempel entries and update Craig Wing tags (lead-cold → active-client).

---

## Data Limitations

- **GHL CRM backup:** May 26, 2026 — 27 days stale. 4th consecutive scan on same dataset.
- **No activity logs:** Contact records show dateAdded/dateUpdated only, no interaction history.
- **No revenue data:** Cannot calculate true lifetime value; scoring uses proxy signals.
- **No opt-out tracking:** DND flags may not reflect email/SMS unsubscribes.
- **Local pipeline only:** 7 leads in lead-pipeline.json are NOT synced to GHL CRM.
- **Active client roster** derived from agent activity logs, not a structured CRM field.

---

## Scan Metadata

| Field | Value |
|-------|-------|
| Scan ID | W21-2026-06-22 |
| Week | 21 |
| Data freshness | 27 days stale (GHL backup May 26) |
| Contacts analyzed | 2,093 total, 1,571 named + reachable |
| Pipeline entries | 7 |
| Active clients tracked | 8 |
| High-priority targets | 5 |
| Recoverable pipeline | $40K+ |
| New since W20 | Kevin Watson check-in call today, Atta-Boy check-in call today, Patio Dreams officially churned |
