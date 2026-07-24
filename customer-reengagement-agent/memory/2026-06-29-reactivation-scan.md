# Weekly Reactivation Scan — Week 22, Monday June 29, 2026

**Agent:** customer-reengagement  
**Data Sources:** GHL CRM backup (2026-05-26, 2,093 contacts) + live lead-pipeline.json (8 leads, updated today) + dashboard agent-activity history + shared memory  
**Analysis Date:** June 29, 2026, 10:05 AM PT  

---

## Executive Summary

| Metric | Count | Δ from Last Week |
|--------|-------|-----------------|
| Total CRM contacts | 2,093 | unchanged (stale 34 days) |
| Named + reachable contacts | 1,571 | unchanged |
| Dormant 60+ days (named, reachable) | 19 | unchanged |
| Dormant 30+ days (named, reachable) | 1,569 | unchanged |
| Lead pipeline entries | 8 | +1 (Tri-West Security added) |
| Active SquidCircle clients | 8 | unchanged |
| High-priority reactivation targets | 6 | +1 (Tri-West Security added) |
| Critical collections | 1 (Patio Dreams) | unchanged — now Day 90 overdue |
| Total recoverable/at-risk pipeline | $58K+ | +$18K (fully verifying Watson unbilled contract) |

**Data freshness warning:** GHL CRM backup is now **34 days stale** (May 26). All dormancy figures are computed by adding 34 days to backup-date calculations. No live GHL API access yet — this is the 5th consecutive scan using the same stale dataset.

---

## What Changed Since Last Week (W21 → W22)

### Worsened
1. **Patio Dreams Bad Debt** — Now **90 days overdue** on $4,500 invoice (was 83d). 13+ collections escalations with zero CEO action. June 10 final notice deadline passed 19 days ago. This is bad debt — automated follow-up sequences have been suspended (`cronSuspended=true`).
2. **Lead pipeline staleness** — Michael Kay & Elena Gaudisson are now **41 days stale** (were 34d) with zero outreach. Re-engagement probability has hit rock bottom. Ron Johannesson (TechWorks) is **39 days stale**, Livynn/Wes Henderson is **41 days stale**, and Alex Ward is **41 days stale**.
3. **Tri-West Security Stalled** — Kevin Kennedy (Tri-West Security) is now **11 days stale** (was 8d) since meeting on June 18. An email follow-up draft was created on June 19 in Gmail but remains unsent / pending approval. This represents our newest high-priority warm lead going cold due to zero human follow-up action.
4. **Active Client Endpoints Intermittent** — Today's 8:26 AM health checks showed that **Edmonton (502)** and **Clayton Park (502)** endpoints are returning 502/awaiting connection, while Sherwood, Autohub, Watson, Greg Steele, and Alpha Protects are active/online.
5. **Invoicing Backlog Stagnation** — Despite multiple warnings, the **$36,000+ unbilled signed contract backlog** (including Craig Wing's $18K build fee) and Dr. Kevin Watson's **$18,000 build fee** remain completely uninvoiced.

### Improved / New Info
1. **Dr. Kevin Watson (Watson Family Chiro)** — Webpage headshots were cropped and optimized by our Brand Designer on June 23 and are web-ready. Commercial/relationship health is strong, and a major integration mapping call ("Watson Family X Marco Connect") is scheduled for **today at 1:00 PM PT**.
2. **Vodyssey (Shawn Moore) DNS Self-Healed** — Discovered a 502 bad gateway error on Shawn's dashboard at 9:43 AM today. The DNS CNAME (vodyssey.squidbot.app) was immediately self-healed to point to their new local tunnel, and a draft response (r-7020161247388975594) was staged for review.

---

## Scoring Methodology

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

### 🔴 HIGH TIER (Score 60+) — 6 Accounts

#### 1. Patio Dreams — Score: 100 🔴 CRITICAL — COLLECTIONS CRISIS (CHURNED)
| Field | Value |
|-------|-------|
| Type | Active client (pipeline) |
| Status | CRITICAL — Beyond Re-engagement (Churned / Bad Debt) |
| Days Since Contact | 69 days (last: April 21) |
| Overdue Invoice | $4,500 (**90 days overdue**) |
| Escalation Count | 13+ (zero human action) |
| Final Notice Deadline | June 10 — **PASSED (19 days ago)** |

**Assessment:** Beyond re-engagement. This is delinquent debt. The client has not responded to 13+ collection attempts. Recommend formal write-off of the $4,500 loss or referral to a collections agency. Turn off all automated sequences.

---

#### 2. Kevin Watson (Watson Family Chiropractic) — Score: 85 🔴 HIGH (Reactivation / Billing Opportunity)
| Field | Value |
|-------|-------|
| Tags | squadbot-client, chiropractic, onboarding |
| Email / Phone | Phone: **780-395-9899** (Edmonton, AB) |
| Days Since Contact | 58 days (last core contact: May 1) |
| Estimated Revenue | $18,000 (uninvoiced build fee) |

**Assessment:** Relationship is highly active and onboarding is progressing, with web headshots optimized on June 23 and a mapping call today at 1:00 PM PT. However, from a financial re-engagement perspective, this is our largest unbilled contract backlog. The $18,000 build fee has been outstanding for 58+ days and must be billed today during the integration call.

**Recommended Action (CEO/Marco):**
- **Issue the $18,000 invoice immediately during the 1:00 PM PT call today.** Use the call to finalize the integration and secure payment.

---

#### 3. Kevin Kennedy (Tri-West Security) — Score: 80 🔴 HIGH (Warm Post-Meeting Lead)
| Field | Value |
|-------|-------|
| Stage | post-meeting-followup (lead-pipeline) |
| Status | draft-pending |
| Days Since Contact | 11 days (last: June 18) |
| Draft Location | Gmail drafts (created June 19) |

**Assessment:** Highly warm prospect following a meeting on June 18 regarding AI integration. An email draft has been sitting in Gmail for 10 days awaiting approval. If left untouched, this valuable opportunity will freeze.

**Recommended Action (CEO):**
- **Approve and send the June 19 Gmail draft today** or reach out directly to Kevin Kennedy to keep the deal warm.

---

#### 4. Michael Kay — Score: 72 🔴 HIGH (Cold Lead)
| Field | Value |
|-------|-------|
| Tags | booked-discovery-call, follow-up-overdue, cadence-expired, win-back-target |
| Email / Phone | 1michaelk@gmail.com / +18183357480 (Los Angeles, CA) |
| Days Since Contact | 41 days (last: May 19) |

**Assessment:** Deep in cold territory due to 41 days of total silence since their discovery call. Reachable by phone and email, but probability of reactivation is decaying rapidly.

**Recommended Action (CEO):**
- **Text +1 818-335-7480:** *"Hey Michael, Kale here from SquidCircle. Realized we went quiet after our call last month—that's on me. We've just deployed some new local business agents that would fit perfectly with what we discussed. Worth a quick 5-min catch-up?"*

---

#### 5. Elena Gaudisson — Score: 67 🔴 HIGH (Cold Lead)
| Field | Value |
|-------|-------|
| Tags | booked-discovery-call, lead-warm, follow-up-overdue, cadence-final-attempt |
| Email / Phone | makeupbylenna@outlook.com / +19168348366 (Sacramento, CA) |
| Days Since Contact | 41 days (last: May 19) |

**Assessment:** Warm lead that booked a discovery call but lapsed to cold. Today represents the absolute final chance to reach her before archiving.

**Recommended Action (CEO):**
- **Text +1 916-834-8366:** *"Hi Elena, Kale from SquidCircle. Realized we never looped back after your inquiry last month. If automating booking or follow-ups is still on your radar, I'd love to show you what we're doing for local service businesses now. No pressure!"*

---

#### 6. Paul (Vodyssey) — Score: 63 🟠 HIGH-MEDIUM
| Field | Value |
|-------|-------|
| Tags | booked-discovery-call, lead-cold |
| Email / Phone | paul@vodyssey.com / phone null |
| Days Since Contact | 57 days (last: May 3) |

**Assessment:** Cold email lead. Note that a 502 gateway error was resolved on their dashboard CNAME today, and a response draft has been staged.

**Recommended Action (CEO):**
- **Approve the staged Gmail draft (r-7020161247388975594) today** to explain the DNS fix and prompt a re-engagement conversation.

---

### 🟡 MEDIUM TIER (Score 30-59) — 4 Accounts

#### 7. Ron Johannesson (TechWorks) — Score: 55 🟡 (Proposal Stalled)
- **Stage:** proposal-sent, status: cold.
- **Dormancy:** 39 days stale (last contact May 22).
- **Assessment:** All automated drafts have been deprecated following the email approval board shutdown. Requires direct call or close-lost marking.
- **Action:** Call Ron today OR mark as lost.

#### 8. Livynn / Wes Henderson — Score: 50 🟡 (Post-Discovery Stalled)
- **Stage:** post-discovery, status: cold.
- **Dormancy:** 41 days stale (last contact May 19).
- **Assessment:** Discovery call completed, but zero follow-up sent. Deal is cold-dead but high value.
- **Action:** Call Wes today OR mark as close-lost.

#### 9. Alex Ward (Atta-Boy) — Score: 45 🟡 (Relationship Gap)
- **Stage:** post-brain-melt, status: cold.
- **Dormancy:** 41 days stale.
- **Assessment:** Likely folded into active Atta-Boy Edmonton/Sherwood Park account management or lost.
- **Action:** Confirm with Brad/Dave OR mark as close-lost.

#### 10. Valeriya (Elfsight) — Score: 30 🟡 (Partnership Inquiry Stale)
- **Stage:** collaboration-inquiry, status: closed.
- **Dormancy:** 39 days stale (last contact May 21).
- **Assessment:** Partnership window is closed.
- **Action:** Officially archive.

---

### 🟢 LOW TIER (Score <30) — 4 Accounts

| Account | Score | Days Dormant | Status |
|---------|-------|-------------|--------|
| Marco (PromptForm) | 15 | 87d | Cold. AI/prompt tool partner, no engagement. |
| Owen | 10 | 45d | Invalid contact info. Unreachable. |
| Anna (annamacco.com) | 10 | 82d | No tags, no engagement. Email only. |
| Chris (River Valley Adventure) | 10 | 87d | No tags, no engagement. Email only. |

---

## Active Client Health (June 29)

These are NOT dormant — they're the active/onboarding roster. Tracked here for completeness:

| Client | Status | Risk | Notes |
|--------|--------|------|-------|
| Inline Family Chiropractic | 🟢 Healthy | — | Booking sweeps running daily cleanly, 0 no-shows |
| Clayton Park Centre | 🟡 Watch | MEDIUM | **Edmonton & Clayton Park returned 502 connection errors today.** Jane MCP active. |
| Autohub OKGN | 🟢 Healthy | — | Client dashboard stable and performing. |
| Atta-Boy Edmonton (Dave) | 🟡 Watch | MEDIUM | **Uptime test returned 502 gateway error this morning.** |
| Watson Family Chiropractic | 🟢 Onboarding | HIGH | **Today's call at 1:00 PM PT** — $18,000 contract remains unbilled. Headshots optimized. |
| Greg Steele Real Estate | 🟢 Onboarding | — | Real estate agent build underway, hardware shipping. |
| Atta-Boy Sherwood Park (Brad)| 🟢 Healthy | — | Mac Minis active, online, and healthy. |
| Patio Dreams | 🔴 Critical | HIGH | Churned / bad debt risk ($4,500 overdue 90 days). |

---

## Systemic Issues (Updated Status)

| # | Issue | Status | Impact |
|---|-------|--------|--------|
| 1 | Zero converted customers in CRM | ❌ Unfixed | Cannot distinguish customers from leads in GHL |
| 2 | GHL data 34 days stale | ❌ Unfixed | 5th consecutive weekly scan on stale backup |
| 3 | 434 guest visitor contacts | ❌ Unfixed | Cluttering pipeline, skewing metrics |
| 4 | Follow-up execution gap | ❌ Unfixed | 8 consecutive weeks of zero human follow-up action |
| 5 | Craig Wing tags incorrect | ❌ Unfixed | Active client shown as lead-cold |
| 6 | No live GHL API access | ❌ Unfixed | Weekly scans degrading in accuracy |
| 7 | Kale Rempel duplicates | ❌ Unfixed | 15+ duplicate entries cluttering CRM |

---

## Recommended Actions for Kale & Marco

### 🔴 Immediate (Today — Monday June 29)

1. **Use 1:00 PM PT Call with Dr. Kevin Watson:** Confirm integration details, and **issue his $18,000 build invoice** during the call.
2. **Approve Kevin Kennedy (Tri-West) Draft:** Draft follow-up has sat in Gmail drafts for 10 days. Send it today to prevent the warm deal from dying.
3. **Decide on Patio Dreams:** Formally write off the $4,500 overdue invoice as bad debt, or refer it to a collections agency. Turn off all automated sequences.
4. **Call/Text Michael Kay (+1 818-335-7480) & Elena Gaudisson (+1 916-834-8366):** Both have been stale for 41 days. Send a short text message to re-engage them before archiving.
5. **Fix Clayton Park & Edmonton 502s:** Investigate the connection failures reported in today's 8:26 AM heartbeat test.

### 🟠 This Week (June 29 - July 3)

6. **Bill Outstanding Backlog ($36K+):** Invoice Craig Wing ($18,000), Clayton Park, Autohub, and In-Line to resolve the unbilled revenue freeze.
7. **Get live GHL API access:** We are on our 5th consecutive scan of the May 26 backup. Obtain fresh keys or a fresh export to resolve the stale data gap.

---

## Scan Metadata

| Field | Value |
|-------|-------|
| Scan ID | W22-2026-06-29 |
| Week | 22 |
| Data freshness | 34 days stale (GHL backup May 26) |
| Contacts analyzed | 2,093 total, 1,571 named + reachable |
| Pipeline entries | 8 |
| Active clients tracked | 8 |
| High-priority targets | 6 |
| Recoverable pipeline | $58K+ |
| New since W21 | Tri-West Security added, Vodyssey DNS healed, Kevin Watson webpage headshots ready |
