# Clean Slate

Generated agent repos must not contain runtime deployment data.

Do not commit:
- client runtime data
- generated reports
- dashboard request logs, metrics, activity logs, or auth DBs
- secrets/API keys/.env files
- local machine paths

Run before commit:

```bash
npm test
node src/agent.cjs --dry-run
```
