# Customer Re-Engagement Agent

Finds past customers who have gone quiet and prepares safe, approval-first win-back recommendations.

## What it does

- Scans customer/CRM data for dormant customers
- Scores reactivation opportunities by recency, value, purchase history, and contactability
- Segments customers into high-value win-back, warm reactivation, nurture, or low priority
- Drafts personalized outreach for review
- Reports opportunities, estimated recoverable pipeline, and next actions to the SquidBot dashboard

## Safety

This agent is review-only by default. It does **not** send emails, texts, or CRM messages. Any external outreach requires owner approval and connector wiring.

## Run locally

```bash
npm test
npm run dry-run
```

Optional customer data file:

```bash
CUSTOMER_REENGAGEMENT_CUSTOMERS_FILE=/path/to/customers.json npm run dry-run
```

Expected shape can be an array of customers or `{ "customers": [...] }`. Useful fields: `name`, `email`, `phone`, `service`, `lastPurchaseAt`, `lastContactAt`, `lifetimeValue`, `purchaseCount`, `tags`.

## Squid CRM wiring

The agent includes an approval-first Squid CRM adapter. It prepares outbound payloads for approved win-back messages but still sends nothing by default. See `docs/SQUID_CRM_WIRING.md`.

```bash
node src/agent.cjs --dry-run --send-approved
```
