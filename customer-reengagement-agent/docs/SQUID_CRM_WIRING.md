# Squid CRM Wiring

The Customer Re-Engagement Agent is wired to Squid CRM through `src/squid-crm-client.cjs`.

## Flow

1. Agent scans dormant customers.
2. Agent scores and segments reactivation opportunities.
3. Agent drafts outreach messages.
4. Dashboard/owner reviews and approves messages.
5. Only approved opportunities are submitted to Squid CRM.
6. Squid CRM handles outbound delivery and reply tracking.

## Safety Defaults

- No message is sent unless `approved: true` is present on the opportunity.
- `--dry-run` is the default behavior for local validation.
- If Squid CRM API base URL is missing, submissions return a dry-run payload instead of failing.
- The agent never sends directly through email/SMS providers. It only submits approved payloads to CRM.

## Environment

```bash
SQUID_CRM_API_BASE=https://crm.example.com
export SQUID_CRM_TOKEN
```

Optional:

```bash
SQUID_CRM_TIMEOUT_MS=15000
```

## Command

```bash
node src/agent.cjs --dry-run --send-approved
```

Production send path, after approval wiring exists:

```bash
node src/agent.cjs --send-approved --crm-base-url="$SQUID_CRM_API_BASE"
```

## Expected CRM Endpoint

Default endpoint:

```txt
POST /api/outbound/messages
```

Payload shape:

```json
{
  "source": "squidbot.customer-reengagement",
  "campaignId": "customer-reengagement-winback",
  "customerId": "cust_001",
  "recipient": {
    "name": "Maya Chen",
    "email": "maya@example.com",
    "phone": null
  },
  "channel": "email",
  "subject": "Quick check-in about monthly chiropractic care plan",
  "message": "Hi Maya...",
  "metadata": {
    "service": "monthly chiropractic care plan",
    "segment": "high-value win-back",
    "score": 100,
    "dormantDays": 251,
    "lifetimeValue": 4200,
    "recommendedOffer": "Personal check-in plus priority booking..."
  },
  "approval": {
    "required": true,
    "approved": true,
    "approvedBy": "owner",
    "approvedAt": "2026-05-11T20:00:00.000Z"
  }
}
```

If the real Squid CRM endpoint differs, only `src/squid-crm-client.cjs` needs to change.
