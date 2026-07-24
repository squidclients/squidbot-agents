# Customer Reengagement Agent — Seasoning Guide

**Internal use only.** Used by Kale during Brain Melt calls to season the re-engagement agent for each new client.

> **Print this.** It's a worksheet. Write on it. Check boxes. Fill blanks.

---

**Client:** _______________________________  
**Date:** _______________________________  
**GHL Location ID:** _______________________________  
**Sub-account active?** ☐ Yes ☐ No  

---

## Section 1: Pre-Call Prep

*(5 minutes before the call)*

### Checklist

- [ ] GHL sub-account confirmed active (check in agency dashboard)
- [ ] Client's GHL location ID recorded above
- [ ] CRM has contacts loaded (at least 50+ for meaningful re-engagement)
- [ ] Agency API key accessible (`squidbot-ghl-provisioner-agent/.env`)
- [ ] Email sending domain verified in GHL (SPF/DKIM)
- [ ] SquidCRM dashboard running and accessible
- [ ] This guide printed or open on a second monitor
- [ ] Test email account ready (your own address for the test send)

### Pull Up on Screen

- [ ] GHL sub-account contact list (count + last activity dates)
- [ ] GHL email templates section
- [ ] GHL workflows page
- [ ] This seasoning guide

### Quick Notes

```
Contact count: __________
Last contact activity date: __________
Email domain verified: ☐ Yes ☐ No ☐ Unsure
Any existing workflows?: _______________________________
```

---

## Section 2: The Seasoning Interview

*(15–20 minutes. Ask these questions. Write the answers. These directly drive the agent configuration in Section 3.)*

### 2.1 Business Profile

| # | Question | Answer |
|---|----------|--------|
| 1 | What's your business type / industry? | _______________________________ |
| 2 | What's your average customer worth (lifetime value)? | $___________ |
| 3 | Average transaction value? | $___________ |
| 4 | How do customers typically interact with you? (in-person, online, booking, phone, repeat service…) | _______________________________ |
| 5 | How long has the business been operating? | _______________________________ |

### 2.2 Customer Lifecycle

| # | Question | Answer |
|---|----------|--------|
| 1 | At what point do you consider a customer "dormant"? (how many weeks/months with no contact/purchase?) | _______________________________ |
| 2 | Walk me through a normal customer journey — first visit to repeat to dormant | _______________________________ |
| 3 | Are there seasonal patterns? (busy months, slow months) | _______________________________ |
| 4 | What's the average time between purchases/visits for an active customer? | _______________________________ |
| 5 | What's the main reason customers stop coming back? | _______________________________ |

**Dormancy window (your read):** ☐ 30 days ☐ 60 days ☐ 90 days ☐ Other: _______

### 2.3 Re-engagement History

| # | Question | Answer |
|---|----------|--------|
| 1 | Have you tried re-engaging past customers before? | ☐ Yes ☐ No |
| 2 | If yes — what happened? (results, response rate, what went wrong/right) | _______________________________ |
| 3 | What's worked in the past? | _______________________________ |
| 4 | What hasn't worked? | _______________________________ |
| 5 | Any messages or offers that historically resonated with your customers? | _______________________________ |

### 2.4 Brand Voice & Messaging

| # | Question | Answer |
|---|----------|--------|
| 1 | How do you normally talk to customers? | ☐ Casual ☐ Professional ☐ Friendly ☐ Urgent ☐ Other: _______ |
| 2 | What's your business's personality in 3 words? | _____  _____  _____ |
| 3 | Do you have a tagline or brand phrase you use? | _______________________________ |
| 4 | Can you share 2-3 recent emails or messages you've sent? (paste links or forward) | _______________________________ |
| 5 | Who signs your emails? (owner name, business name, team?) | _______________________________ |
| 6 | Any words/phrases you would NEVER use? | _______________________________ |

**Voice summary (your read):**
```
Tone: _______________________________
Style: _______________________________
Sign-off: _______________________________
```

### 2.5 Offers & Constraints

⚠️ **DEFAULT IS NO OFFERS.** Do not offer discounts unless the client explicitly says yes below.

| # | Question | Answer |
|---|----------|--------|
| 1 | Are we allowed to use any promotional offers? | ☐ Yes ☐ No |
| 2 | If yes — what offers? (discount %, freebie, free consultation, etc.) | _______________________________ |
| 3 | Any restrictions on offers? (min spend, expiry, first-time only, etc.) | _______________________________ |
| 4 | Any industries, competitors, or topics to avoid mentioning? | _______________________________ |
| 5 | Any regulatory constraints? (healthcare HIPAA, finance, legal advertising rules, etc.) | _______________________________ |
| 6 | Any specific claims we can't make? | _______________________________ |

**Red lines to add to agent config:**
```
1. _______________________________
2. _______________________________
3. _______________________________
```

### 2.6 CRM Data Review

*(Pull this up live during the call — share screen)*

| Metric | Value |
|--------|-------|
| Total contacts in CRM | __________ |
| Contacts with email address | __________ |
| Contacts with phone number | __________ |
| Last time list was cleaned/purged | __________ |
| Contacts who've opted out / unsubscribed | __________ |
| Contacts with no activity in 60+ days | __________ |
| Bounce rate on last email send (if known) | __________ |

**Data quality:** ☐ Good ☐ Needs cleaning ☐ Needs major work

### 2.7 Success Metrics

| # | Question | Answer |
|---|----------|--------|
| 1 | What would a "win" look like in the first 30 days? | _______________________________ |
| 2 | What re-engagement rate would make you happy? | ________% |
| 3 | How will you measure revenue from re-engaged customers? | _______________________________ |
| 4 | What's your current repeat customer rate? (estimate) | ________% |
| 5 | Is there a specific number of re-engaged customers/month that would justify this? | __________ customers/month |

---

## Section 3: Agent Configuration

*(10 minutes. Configure based on interview answers above.)*

### 3.1 Dormancy Threshold

Based on industry + client answer (Section 2.2, Q1):

| Industry | Default Dormancy | Configured Value |
|----------|-----------------|------------------|
| Medical/Dental | 180 days | ______ days |
| Home Services | 180 days | ______ days |
| Retail/E-commerce | 90 days | ______ days |
| Hospitality/Tourism | 180 days | ______ days |
| Fitness/Wellness | 90 days | ______ days |
| Professional Services | 120 days | ______ days |
| Other: __________ | ______ days | ______ days |

### 3.2 Engagement Tiers

Configure the three-tier window:

| Tier | Default Window | This Client's Window |
|------|---------------|---------------------|
| **Warm** (monitor only) | 0–30 days | 0–_____ days |
| **Cooling** (nurture) | 30–60 days | _____–_____ days |
| **Dormant** (reactivation) | 60+ days | _____+ days |

### 3.3 Email Template Selection

Pick starting templates based on brand voice (Section 2.4):

**Template 1: "We Miss You" (Warm re-engagement)**
- Best for: Casual/friendly brands, consumer-facing
- Subject line style: "We haven't seen you in a while, [Name]"
- ☐ Use this

**Template 2: "Checking In" (Value-first re-engagement)**
- Best for: Professional services, B2B
- Subject line style: "Quick check-in from [Business Name]"
- ☐ Use this

**Template 3: "Update / What's New" (Informational)**
- Best for: Businesses with new offerings, seasonal relevance
- Subject line style: "Here's what's new at [Business Name]"
- ☐ Use this

**Template 4: "Last Touch" (Final attempt)**
- Best for: Long-dormant contacts, permission-based
- Subject line style: "Should we update your contact info?"
- ☐ Use this

**Custom adjustments:**
```
Sign-off name: _______________________________
Business tagline to include: _______________________________
Tone adjustments: _______________________________
```

### 3.4 Rate Limit Configuration

- ☐ Standard SMTP (Google) → **500/week** — START HERE unless otherwise confirmed
- ☐ Dedicated email service → **_______/week** (confirm with client)
- ☐ Client has their own SMTP → **_______/week**

**Configured rate limit:** _______ contacts/week

### 3.5 Custom Red Lines

Add to agent config as hard constraints (from Section 2.5):

- [ ] No promotional offers → ☐ Confirmed
- [ ] Do not mention: _______________________________
- [ ] Regulatory constraint: _______________________________
- [ ] Other: _______________________________

### 3.6 KPI Targets

Based on industry benchmarks (Section 6) + client expectations (Section 2.7):

| Metric | Industry Benchmark | Target for This Client |
|--------|-------------------|----------------------|
| Open rate | ______% | ______% |
| Click rate | ______% | ______% |
| Reply/Response rate | ______% | ______% |
| Reactivation rate | ______% | ______% |
| Revenue recovered/mo | $______ | $______ |

### 3.7 Tags to Create in GHL

Create these tags in the client's sub-account:

- [ ] `reengage-warm` — recently engaged (monitor)
- [ ] `reengage-cooling` — 30-60 days dormant
- [ ] `reengage-dormant` — fully dormant, ready for reactivation
- [ ] `reengage-active` — successfully re-engaged
- [ ] `reengage-opted-out` — unsubscribed during campaign

### 3.8 Workflow to Build (GHL UI)

**SC-RE1: Dormant Customer Reactivation**
- **Trigger:** Contact tagged `reengage-dormant`
- **Step 1:** Wait 1 day
- **Step 2:** Send email (Template 1 or 2 selected above)
- **Step 3:** Wait 5 days
- **Step 4:** If no open → send email (Template 3)
- **Step 5:** Wait 7 days
- **Step 6:** If still no response → send email (Template 4)
- **Step 7:** If opened/clicked → remove `reengage-dormant` tag, add `reengage-active`

⚠️ **Workflows must be built in GHL UI** — API is read-only for workflows. Use GHL AI Workflow Builder or manual setup.

---

## Section 4: Test Send

*(5 minutes. Prove it works right now.)*

### Steps

1. [ ] Create a test email template in GHL using selected template + client's brand voice
2. [ ] Send test email to **client's own email address** (ask them for it on the call)
3. [ ] Send a second test to **your own email address** (so you can review it too)

### Client's test email address: _______________________________

### On-Call Review Checklist

- [ ] Subject line looks right
- [ ] Business name is spelled correctly
- [ ] Tone matches what they described
- [ ] No broken links or missing images
- [ ] Mobile-friendly (check on phone)
- [ ] Client approves or requests changes

### Quick adjustments noted on call:
```
1. _______________________________
2. _______________________________
3. _______________________________
```

---

## Section 5: Go-Live Checklist

*(What needs to happen between the brain melt call and the agent going live in Week 2)*

### CRM & Data

- [ ] All contacts imported into GHL sub-account
- [ ] List cleaned — removed bounced, invalid, and opted-out contacts
- [ ] Contacts tagged with engagement tier tags (`reengage-warm`, `reengage-cooling`, `reengage-dormant`)
- [ ] Contact custom fields configured (last purchase date, last appointment, LTV)

### Pipelines (SquidCRM)

- [ ] "Customer Reengagement" pipeline created
- [ ] Stages configured: `Identified` → `Contacted` → `Responded` → `Re-engaged` → `Lost`
- [ ] Opportunities created for dormant contacts

### GHL Workflow

- [ ] Workflow SC-RE1 built (or via AI Workflow Builder)
- [ ] Tag triggers set up (`reengage-dormant` triggers the workflow)
- [ ] Email templates loaded into workflow steps
- [ ] Workflow tested with a single contact
- [ ] Workflow **published** (must be published to work — draft mode does nothing)

### Email Configuration

- [ ] All email templates finalized and saved in GHL
- [ ] From-name and reply-to configured
- [ ] Sending domain verified (SPF/DKIM/DMARC)
- [ ] Unsubscribe link present in every template

### Rate & Compliance

- [ ] Rate limit configured (default: 500/week)
- [ ] First campaign scheduled (date: __________)
- [ ] Suppression list imported (opted-out contacts)
- [ ] Red lines configured in agent

### KPIs & Reporting

- [ ] KPI targets locked in (from Section 3.6)
- [ ] Weekly PDF report scheduled (Mondays, 9 AM)
- [ ] Dashboard agent activity configured (`agentId: customer-reengagement`)

### Sign-Off

**Ready to go live:** ☐ Yes ☐ No  
**Go-live date:** _______________________________  
**Configured by:** _______________________________  

---

## Section 6: Industry Reference Guide

### Re-engagement Benchmarks by Industry

Quick reference for setting realistic KPI targets. Use these to sanity-check client expectations and set defaults.

| Industry | Avg Open Rate (Re-engagement) | Avg Click Rate | Typical Dormancy Window | Best Send Day | Best Send Time |
|----------|------------------------------|----------------|------------------------|---------------|----------------|
| **Medical / Dental** | 22–28% | 2–4% | 180 days (6 months) | Tuesday, Wednesday | 10:00–11:00 AM |
| **Home Services** (HVAC, plumbing, electrical) | 18–24% | 3–5% | 180–365 days | Tuesday, Thursday | 9:00–11:00 AM |
| **Retail / E-commerce** | 15–22% | 2–5% | 90 days | Tuesday, Wednesday | 10:00 AM, 7:00 PM |
| **Hospitality / Tourism** | 20–26% | 3–6% | 180 days (seasonal) | Wednesday, Thursday | 2:00–4:00 PM |
| **Fitness / Wellness** | 24–30% | 3–5% | 60–90 days | Monday, Tuesday | 6:00–8:00 AM |
| **Professional Services** (legal, accounting, consulting) | 22–28% | 2–4% | 120 days | Tuesday, Wednesday | 8:00–10:00 AM |
| **Real Estate** | 18–24% | 2–4% | 180 days | Tuesday, Thursday | 10:00 AM |
| **Automotive** | 20–26% | 3–5% | 180 days | Tuesday, Wednesday | 10:00–11:00 AM |

### General Benchmarks (All Industries)

| Metric | Benchmark | Good | Great |
|--------|-----------|------|-------|
| Re-engagement open rate | 15–25% | 25–30% | 30%+ |
| Re-engagement click rate | 2–4% | 4–6% | 6%+ |
| Reply/Response rate | 1–3% | 3–5% | 5%+ |
| Reactivation rate (dormant → active) | 5–10% | 10–15% | 15%+ |
| Unsubscribe rate (per campaign) | < 1% | < 0.5% | < 0.2% |
| Bounce rate | < 5% | < 2% | < 1% |

### Notes on Benchmarks

- Re-engagement emails always perform lower than regular marketing emails — that's normal
- A 15% open rate on a list that's been dormant for a year is actually decent
- The goal is **trend improvement**, not hitting a specific number on day one
- First campaign is baseline. Campaigns 2-4 should show improvement as the agent optimizes templates
- Industries with longer purchase cycles (home services, automotive) naturally have lower engagement but higher value per re-engaged customer

### Dormancy Window Logic

| Industry Type | Why This Window |
|---------------|----------------|
| Medical/Dental | Annual checkups — 6 months without booking = dormant |
| Home Services | Seasonal needs — most customers need service 1-2x/year |
| Retail | Purchase frequency is higher — 3 months without purchase is notable |
| Fitness | Monthly memberships — 2-3 months absence = likely churned |
| Professional Services | Project-based — quarterly check-ins are normal |
| Hospitality | Seasonal — compare year-over-year rather than continuous |

---

## Appendix: GHL Configuration Commands

### Create Tags via API
```bash
# Set up
LOC="<location_id>"
KEY="<agency_api_key>"

# Tag contacts (run after segmentation)
curl -s -X PUT "https://services.leadconnectorhq.com/contacts/{contactId}?locationId=${LOC}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{"tags":["reengage-dormant"]}'
```

### Create Email Template via V2 API
```bash
curl -s -X POST "https://services.leadconnectorhq.com/emails/public/v2/locations/${LOC}/templates" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reengage-we-miss-you",
    "subjectLine": "We haven'"'"'t seen you in a while, {{contact.firstName}}",
    "editorType": "html",
    "editorContent": "<html><body>...</body></html>"
  }'
```

### Get Campaign Stats
```bash
curl -s "https://services.leadconnectorhq.com/emails/public/v2/locations/${LOC}/campaigns/stats/email-campaigns/{campaignId}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Version: 2021-07-28"
```

### Check Workflow Status (read-only)
```bash
curl -s "https://services.leadconnectorhq.com/workflows/?locationId=${LOC}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Version: 2021-07-28"
```

---

*End of Seasoning Guide. Version 1.0 — 2026-07-02*
