# Install Customer Re-Engagement Agent

This repo is safe to test locally before wiring it into a client deployment.

## Local validation

```bash
npm test
npm run dry-run
node src/agent.cjs --job=weekly-reactivation-scan --dry-run
```

## Data connection

Set one of these later when installing into a real client environment:

```bash
CUSTOMER_REENGAGEMENT_CUSTOMERS_FILE=/path/to/customers.json
SQUIDBOT_DASHBOARD_API_BASE=http://127.0.0.1:3001
```

The first production connector can be GHL, Jane, Shopify, Stripe, Square, CSV, or any dashboard customer export that includes last purchase/booking data.

## Dashboard/OpenClaw install

Use Agent Builder from the agent-builder repo:

```bash
node src/agent.cjs install-agent \
  --agent-repo ../squidbot-customer-reengagement-agent \
  --dashboard-root ../squidbot-dashboard
```

Review the dry-run plan. Add `--apply` only after confirming the target dashboard.
