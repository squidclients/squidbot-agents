# SquidBot Agents

Specialist agent definitions for SquidBot deployments. Each agent has:
- `SOUL.md` — personality and behavior
- `SKILL.md` — task routing card (read by CEO)
- `AGENTS.md` — operational rules
- `TOOLS.md` — tool-specific notes
- `MEMORY.md` — long-term memory (template)

## Agent Categories
- **Base** — Builder, Memory (ship with every install)
- **Growth** — Blog, SEO, Newsletter, Social Media
- **Operations** — PM, Research, Expense, Invoice
- **Client Success** — Onboarding, Support, Follow-up
- **Finance** — CFO, Weekly Report

## Structure
```
squidbot-agents/
├── base/
│   ├── builder/
│   └── memory/
├── growth/
│   ├── blog/
│   ├── seo-strategist/
│   └── ...
├── operations/
│   ├── pm/
│   └── ...
└── client-success/
    ├── onboarding/
    └── ...
```
