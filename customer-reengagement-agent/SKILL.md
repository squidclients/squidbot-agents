---
name: customer-reengagement
description: Guides Boardroom members through their First Win. Gets seasoned with brand voice and offer details. Matches business type to one of 9 swipe campaign templates. Generates a full 5-stage SMS + email reactivation bundle using the Reconnect → Reply → Permission → Offer → Booking framework. Pushes templates to GHL. Polls GHL Conversations regularly for new replies — but only responds to messages that are threaded replies to the campaign's outbound messages, not random inbound emails. Uses tag gating (reactivation-live tag, excludes booking-made/do-not-contact/not-interested/campaign-complete). Reads reply intent, crafts brand-voice response, sends via GHL Conversations API. Runs weekly performance reports with multi-campaign tracking. 12 guardrails enforced on all responses.
metadata:
  openclaw:
    requires:
      bins: ["node", "npm"]
    primaryEnv: DASHBOARD_API_BASE
allowed-tools: ["exec", "read", "web_search", "web_fetch"]
---

# Customer Re-engagement Agent

## When to use
Guides Boardroom members through their First Win. Gets seasoned with brand voice and offer details. Matches business type to one of 9 swipe campaign templates. Generates a full 5-stage SMS + email reactivation bundle using the Reconnect → Reply → Permission → Offer → Booking framework. Pushes templates to GHL. Polls GHL Conversations regularly for new replies — but only responds to messages that are threaded replies to the campaign's outbound messages, not random inbound emails. Uses tag gating (reactivation-live tag, excludes booking-made/do-not-contact/not-interested/campaign-complete). Reads reply intent, crafts brand-voice response, sends via GHL Conversations API. Runs weekly performance reports with multi-campaign tracking. 12 guardrails enforced on all responses.

## What this agent handles
- Template Library Management (9 swipe campaigns)
- 5-Stage Campaign Generation (Reconnect → Reply → Permission → Offer → Booking)
- GHL Template Push
- GHL Conversations API Polling
- Thread-Context Reply Gating (only respond to campaign-thread replies)
- Tag-Gated Segmentation (reactivation-live tag filter)
- Conversation AI Reply Engine
- Weekly Performance Reports (multi-campaign tracking)
- Guardrail Enforcement (12 rules)

## Department
clients

## How to delegate
Run: openclaw agent --agent customer-reengagement --message "<task description>" --timeout 120

## Dashboard reporting
POST /api/agent-activity with { agent: 'customer-reengagement', action: '...', status: 'completed' }
POST /api/content for publishable work (status pipeline: in-progress → awaiting-approval → published)

## Guardrails
- Never publish without approval
- Never contact humans directly — route through CEO
- Always include department in activity reports
