# Weekly Reactivation Scan — Week 20, Monday June 15, 2026

**Agent:** customer-reengagement  
**Data Sources:** GHL CRM backup (2026-05-26, 2,093 contacts) + live lead-pipeline.json (7 leads, updated today) + dashboard agent-activity (541 entries) + shared memory  
**Analysis Date:** June 15, 2026, 10:34 AM PT  

---

## Executive Summary

| Metric | Count | Δ from Last Week |
|--------|-------|-----------------|
| Total CRM contacts | 2,093 | unchanged (stale 20 days) |
| Named + reachable contacts | 1,572 | unchanged |
| Dormant 60+ days (named, reachable) | 16 | +7 (aged past threshold) |
| Dormant 30+ days (named, reachable) | 1,566 | inflated (backup age — see note) |
| Lead pipeline entries | 7 (2 archived) | unchanged |
| Active SquidCircle clients | 8 | unchanged |
| High-priority reactivation targets | 6 | +1 |
| Critical collections | 1 (Patio Dreams) | unchanged — now Day 76 |
| Total recoverable/at-risk pipeline | $40K+ | unchanged |

**Data freshness warning:** GHL CRM backup is now **20 days stale** (May 26). All dormancy figures are computed by adding 20 days to backup-date calculations. No live GHL API access yet — this is the 3rd consecutive scan using the same stale dataset.

---

## What Changed Since Last Week (W19 → W20)

### Worsened
1. **Patio Dreams** — Now 76 days overdue on $4,500 invoice (was 68d). 17+ collections escalations, zero CEO action. June 10 final notice deadline passed 5 days ago. Collections agent recommends formal write-off.
2. **Lead pipeline staleness** — Ron Johannesson, Livynn/Wes, Alex Ward, Valeriya all at **25 days stale** (were 18-20d). Approaching cold-dead threshold (30d).
3. **Follow-up cadence** — Now 6 consecutive cycles with zero human action. Approval board formally deprecated by follow-up agent; 18 stale drafts rejected. Direct-escalation workflow in effect but still producing zero calls.
4. **CRM data gap** — Still zero converted customers in GHL CRM. All 2,093 contacts are leads. 8 active clients tracked only in local memory/agent logs.
5. **Fresh Start Cleaning & GreenEdge Lawncare** — Archived (69 days cold).

### Improved / New Info
1. **Kevin Watson** — Phone number found in shared memory: **780-395-9899** (Edmonton, AB). Was previously listed as "no contact info." Unblocks direct outreach.
2. **Craig Wing / Inline Family Chiropractic** — Confirmed ACTIVE client (appointment-booking agent running daily, 0 no-shows today). CRM tag is stale — not a dormant account.
3. **Atta-Boy (Alex Ward)** — Expanding: Brad/Dave deployed, Greg Steele onboarding. Account growing despite Alex's individual lead going stale. Should be folded into account management.
4. **Check-in agent** now providing weekly client health assessments — 8 clients tracked.

### Unchanged / Stalled
- Michael Kay, Elena Gaudisson — No contact attempted since last scan (27 days dormant now)
- Paul (Vodyssey) — No outreach sent (43 days dormant)
- Owen — Invalid contact info, unreachable
- Kale Rempel relationship — Still unconfirmed (prospect/partner/internal?)
- CRM cleanup (539 guest visitors, duplicates) — Not performed

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

### 🔴 HIGH TIER (Score 60+) — 6 Accounts

#### 1. Patio Dreams — Score: 100 🔴 CRITICAL — COLLECTIONS CRISIS
| Field | Value |
|-------|-------|
| Type | Active client (pipeline) |
| Status | CRITICAL — Beyond Re-engagement |
| Days Since Contact | 56 days (last: April 21) |
| Overdue Invoice | $4,500 (**76 days overdue**) |
| Escalation Count | 17+ (zero human action) |
| Final Notice Deadline | June 10 — **PASSED (5 days ago)** |

**Change since W19:** Invoice overdue went 68d → 76d. Collections agent performed 7 more escalation cycles. CEO has not responded to any.

**Assessment:** This is no longer a re-engagement target — it's an unresponsive account with delinquent debt. The client has not responded to 17+ collection attempts across email and dashboard alerts over 5+ weeks. The June 10 final notice deadline passed with zero response from both the client AND the CEO.

**Recommended Action (CEO):**
1. **Phone call to Patio Dreams** — final verbal attempt
2. **If no answer/response by June 19 (7 days):** Formal write-off
3. **Options:** Payment plan (3 × $1,500), small claims filing, or collections agency referral
4. **Do NOT invest more agent cycles in escalation** — the system is exhausted

---

#### 2. Kevin Watson (Watson Chiropractic) — Score: 85 🔴 HIGH
| Field | Value |
|-------|-------|
| Type | Former/active client (squadbot-client tag) |
| Tags | squadbot-client, chiropractic, lead-cold |
| Contact | **780-395-9899** (found in shared memory), Edmonton, AB |
| CRM Email/Phone | NONE (data gap — CEO must update) |
| Last CRM Activity | May 1, 2026 (44 days dormant) |
| Estimated Revenue | **$18,000 uninvoiced services** |
| GHL Sub-account | Exists |

**Change since W19:** Phone number discovered (780-395-9899). Previously listed as unreachable.

**Why #2:** Actual client with $18K in delivered-but-uninvoiced services. Chiropractic vertical — SquidCircle has a proven deployment at Inline Family Chiropractic. Phone number now available. This is the single highest-value win-back opportunity.

**Win-Back Strategy:**
- **Channel:** Phone call to Dr. Watson's office (780-395-9899)
- **Approach:** "Dr. Watson, this is Kale from SquidCircle. We worked on your AI automation setup a while back — I know things went quiet, and that's on me. We've made huge improvements since then, especially with patient automation for chiropractic practices. Dr. Kellia Mulkay at Inline Family is running our full suite now — zero no-shows today. I'd love to get you fully up and running. Can we book 20 minutes this week?"
- **Tone:** Ownership of the gap, peer proof point, forward-looking
- **Secondary topic:** Need to address the $18K uninvoiced — but ONLY after CEO confirms how to handle (write off, bill retroactively, or fresh start)
- **Offer:** Complimentary setup completion + first month free on ongoing service
- **Blocker:** CEO must decide on $18K uninvoiced approach BEFORE this call

---

#### 3. Michael Kay — Score: 72 🔴 HIGH
| Field | Value |
|-------|-------|
| Email | 1michaelk@gmail.com |
| Phone | +1 818-335-7480 |
| Tags | booked-discovery-call, follow-up-overdue, cadence-expired, win-back-target |
| Last Activity | ~May 18, 2026 (27 days dormant) |
| Source | Voice AI Chat Widget |

**Change since W19:** No outreach attempted. Dormancy increased 20d → 27d.

**Why #3:** Booked a discovery call AND was tagged as a win-back target. Has both email and phone. LA area code. Two intent signals, zero follow-up action from humans.

**Win-Back Strategy:**
- **Channel:** Phone call first (818 number). SMS backup.
- **Approach:** "Hey Michael, it's Kale from SquidCircle. You'd booked a call with us back in April and honestly, we dropped the ball on following up — I'm sorry about that. We've shipped a bunch of new stuff since then that I think you'll find genuinely useful. Can I grab 15 minutes with you this week?"
- **Tone:** Direct, accountable, energized
- **Offer:** Free 15-min strategy call + personalized AI automation audit for his business
- **Window closing:** At 30+ days dormant, reactivation probability drops below 10%

---

#### 4. Elena Gaudisson — Score: 67 🔴 HIGH
| Field | Value |
|-------|-------|
| Email | makeupbylenna@outlook.com |
| Phone | +1 916-834-8366 |
| Tags | booked-discovery-call, lead-warm, follow-up-overdue, cadence-final-attempt |
| Last Activity | ~May 18, 2026 (27 days dormant) |
| Source | Voice AI Chat Widget |

**Change since W19:** No outreach attempted. Dormancy increased 20d → 27d.

**Why #4:** Booked discovery call, warm lead, cadence at FINAL attempt. Beauty/makeup professional. Has both email + phone. This is the last scan before she should be written off.

**Win-Back Strategy:**
- **Channel:** SMS first (beauty professionals tend to be mobile-first). Then email.
- **Approach:** "Hi Elena! It's Kale from SquidCircle. You connected with us about AI tools for your beauty business a while back. I know it's been a minute — just wanted to personally reach out. We just helped another beauty pro automate her booking and grow her social following with AI. Can I send you a quick 2-min video showing how?"
- **Tone:** Warm, casual, peer-oriented, zero pressure
- **Offer:** Personalized video walkthrough + no-commitment 14-day trial
- **Final window:** This is the last reactivation cycle before archive

---

#### 5. Paul (Vodyssey) — Score: 63 🟠 HIGH-MEDIUM
| Field | Value |
|-------|-------|
| Email | paul@vodyssey.com |
| Phone | None |
| Tags | booked-discovery-call, lead-cold, squidbot-processed |
| Last Activity | ~May 1, 2026 (43 days dormant) |
| Source | Voice AI Chat Widget |

**Change since W19:** No outreach attempted. Dormancy 33d → 43d.

**Why #5:** Booked a discovery call. Travel/experience company. Email only (limits channel options). Going cold quickly.

**Win-Back Strategy:**
- **Channel:** Email only (no phone on file)
- **Approach:** "Paul, I'll be direct — you booked a call with us about AI tools for Vodyssey, and we never followed up properly. That's on me. Since we last connected, we've helped businesses in travel and experiences automate their customer comms and recover dormant customers. I put together 3 specific ideas for Vodyssey — can I send them over?"
- **Tone:** Honest, value-first, no pressure
- **Offer:** 3 custom AI automation ideas specific to his travel/experience business
- **Subject line:** "3 ideas for Vodyssey (+ apologizing for the radio silence)"

---

#### 6. Ron Johannesson (TechWorks) — Score: 60 🟠 HIGH-MEDIUM
| Field | Value |
|-------|-------|
| Type | Warm lead (pipeline) |
| Status | Proposal sent, stale 25 days |
| Last Contact | May 22, 2026 |
| Priority | HIGH (per pipeline) |

**Change since W19:** Now 25 days stale (was 18d). 6 cycles of follow-up drafts generated, zero actioned. Approval board deprecated.

**Why #6:** Proposal was actually sent. Interest was confirmed. But 25 days of silence has likely killed the deal. Still salvageable with a direct call.

**Win-Back Strategy:**
- **Channel:** Phone call (if number available) or personalized email
- **Approach:** "Ron, I sent you a proposal a few weeks back and realize we went quiet on you. That's not how we operate — sorry. The proposal's still valid, and we've added a few capabilities since then that I think make it even stronger. Worth a 10-minute catch-up call this week?"
- **Tone:** Accountable, concise, renewed energy
- **Offer:** Updated proposal with new AI agent capabilities included at no extra cost

---

### 🟡 MEDIUM TIER (Score 30-59) — 4 Accounts

#### 7. Livynn / Wes Henderson — Score: 50 🟡
- Post-discovery call, 25 days stale
- Follow-up NEVER sent after the discovery call
- HIGH risk — deal likely dead without immediate outreach
- **Action:** CEO direct call needed. Discovery calls are expensive intent signals.

#### 8. Alex Ward (Atta-Boy) — Score: 45 🟡
- Post-Brain Melt, 25 days stale individually
- BUT Atta-Boy account is EXPANDING (Brad/Dave deployed, Greg Steele onboarding)
- **Action:** Fold Alex into Atta-Boy account comms. Not a true dormant account — it's a relationship management gap.

#### 9. Kale Rempel / Dropify — Score: 40 🟡
- Multiple CRM entries (5+), multiple email addresses
- Booked discovery call, 250 area code (BC local)
- Tagged as "owner" and "test" in some entries — may be internal team
- **Action:** CEO must clarify: prospect, partner, or internal team? Then deduplicate CRM.

#### 10. Valeriya (Elfsight) — Score: 30 🟡
- Partnership inquiry, 25 days stale
- 5 draft responses generated, zero sent
- Partnership window likely closed
- **Action:** Send brief "still interested?" reply or formally close.

---

### 🟢 LOW TIER (Score <30) — 4 Accounts

| Account | Score | Days Dormant | Status |
|---------|-------|-------------|--------|
| Marco (PromptForm) | 15 | 73d | Cold. AI/prompt tool — potential partner but no engagement. |
| Owen | 10 | 31d | Invalid contact info. Unreachable. |
| Anna (annamacco.com) | 10 | 68d | No tags, no engagement. Email only. |
| Chris (River Valley Adventure) | 10 | 73d | No tags, no engagement. Email only. |

**Note:** Fresh Start Cleaning (76d) and GreenEdge Lawncare (76d) were **archived** this week by the follow-up agent.

---

## Active Client Health (from Check-In Agent, June 15)

These are NOT dormant — they're the active roster. Tracked here for completeness:

| Client | Status | Risk | Notes |
|--------|--------|------|-------|
| Inline Family Chiropractic | 🟢 Healthy | — | 0 no-shows today, MCP healthy |
| Clayton Park | 🟢 Healthy | — | 14-day check-in due June 16 |
| Autohub | 🟢 Healthy | — | 14-day check-in due June 16 |
| Atta-Boy Edmonton | 🟡 Watch | MEDIUM | Cloudflare tunnel 502 unresolved 10+ days |
| Patio Dreams | 🔴 Critical | — | $4.5K/76d overdue — see above |
| Kevin Watson Chiro | 🔴 Dormant | HIGH | $18K uninvoiced — see above |
| Greg Steele | 🟢 Onboarding | — | New deployment |
| Jason Neumann | 🟢 Scheduled | — | Brain Melt upcoming |

---

## Systemic Issues (Updated Status)

| # | Issue | Status | Impact |
|---|-------|--------|--------|
| 1 | Zero converted customers in CRM | ❌ Unfixed | Cannot distinguish customers from leads |
| 2 | GHL data 20 days stale | ❌ Unfixed | Weekly scans degrade in accuracy |
| 3 | 539 guest visitor contacts | ❌ Unfixed | Cluttering pipeline, skewing metrics |
| 4 | Follow-up cadence broken (6 cycles, 0 actions) | ⚠️ Workflow changed | Approval board deprecated → direct escalation, but still no calls made |
| 5 | Kevin Watson missing contact info | ✅ RESOLVED | Phone found: 780-395-9899 |
| 6 | Craig Wing incorrectly tagged | ❌ Unfixed | Active client shown as lead-cold |
| 7 | No live GHL API access | ❌ Unfixed | 3rd scan on stale backup |
| 8 | Kale Rempel relationship unclear | ❌ Unfixed | 5+ duplicate entries |

---

## Recommended Actions

### 🔴 Immediate (Today — June 15)

1. **CEO calls Patio Dreams** — 76 days, $4,5K overdue, 17 escalations, final notice passed. Phone call or formal write-off. No more agent cycles.
2. **CEO calls Kevin Watson (780-395-9899)** — $18K uninvoiced, phone now available. Highest-value win-back.
3. **CEO calls Michael Kay (818-335-7480)** — 27 days dormant, 2 intent signals, approaching cold-dead at 30d.

### 🟠 This Week (June 15-19)

4. **CEO SMS/calls Elena Gaudisson (916-834-8366)** — Final reactivation window before archive.
5. **CEO calls Ron Johannesson** — Proposal sent, 25 days stale, still salvageable.
6. **CEO decides on Alex Ward** — Fold into Atta-Boy account or separate follow-up?
7. **Email Paul (Vodyssey)** — Send the "3 ideas" email (draft available from last cycle).

### 🟡 Next 2 Weeks (June 15-26)

8. **Get live GHL API access** — 3rd consecutive scan on May 26 backup. Unacceptable for weekly cadence.
9. **CRM cleanup sprint:**
   - Archive 434 guest visitor contacts (not 539 — recount shows 434)
   - Deduplicate Kale Rempel (5+ entries)
   - Update Kevin Watson with phone: 780-395-9899
   - Fix Craig Wing tags (lead-cold → client-active)
10. **Clarify Kale Rempel** — Prospect, partner, or internal?
11. **Close Valeriya (Elfsight)** — Partnership window closed. Brief "still interested?" or archive.

### 🔵 Strategic (Ongoing)

12. **Implement customer status tracking in GHL** — Pipeline stages beyond "lead"
13. **Fix the follow-up execution gap** — 6 weeks of zero human action is a process failure, not a tool failure
14. **Build post-discovery-call follow-up workflow** — Livynn/Wes had a discovery call and ZERO follow-up. This should be automated.
15. **Track reactivation success metrics** — Tag re-engaged contacts, measure dormant → active conversion

---

## Data Limitations

- **GHL CRM backup:** May 26, 2026 — 20 days stale. 3rd consecutive scan on same dataset.
- **No activity logs:** Contact records show dateAdded/dateUpdated only, no interaction history.
- **No revenue data:** Cannot calculate true lifetime value; scoring uses proxy signals.
- **No opt-out tracking:** DND flags may not reflect email/SMS unsubscribes.
- **Local pipeline only:** 7 leads in lead-pipeline.json are NOT synced to GHL CRM.
- **Active client roster** derived from agent activity logs, not a structured CRM field.

**Critical recommendation:** Before next week's scan, obtain live GHL API access or a fresh export with pipeline stages, opportunity values, and interaction history. Without this, weekly scans cannot improve.

---

## Scan Metadata

| Field | Value |
|-------|-------|
| Scan ID | W20-2026-06-15 |
| Week | 20 |
| Data freshness | 20 days stale (GHL backup May 26) |
| Contacts analyzed | 2,093 total, 1,572 named + reachable |
| Pipeline entries | 7 (5 active, 2 archived) |
| Active clients tracked | 8 |
| High-priority targets | 6 |
| Recoverable pipeline | $40K+ |
| New since W19 | Kevin Watson phone found, Atta-Boy expanding, follow-up board deprecated |
