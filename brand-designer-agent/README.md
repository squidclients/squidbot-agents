# Brand Designer Agent

A clean, unseasoned Brand Designer for SquidBot customers. This package contains no vendor branding, customer data, credentials, or private assets. Each installation learns one customer's brand through onboarding before producing approval-ready work.

## Install

```bash
git clone --filter=blob:none --sparse https://github.com/squidclients/squidbot-agents.git
cd squidbot-agents
git sparse-checkout set brand-designer-agent
cd brand-designer-agent
npm install
npm run doctor
```

Then follow [SEASONING.md](docs/SEASONING.md). Do not use the agent for production work until `npm run doctor` reports that onboarding is complete.

Use `config/environment.example.json` as the variable checklist and set secret values in your local shell, secrets manager, or SquidBot runtime configuration. Never commit them.

## What you need

- image API key (`OPENAI_API_KEY` by default)
- website URL
- approved logos, brand guide, fonts, colours, and design documents
- 5–15 examples you like and 3–5 examples you dislike
- examples of current ads, social posts, decks, thumbnails, or web graphics
- a human owner who approves the generated brand profile

## Commands

```bash
npm run doctor
node src/agent.cjs onboard --website=https://example.com
node src/agent.cjs --dry-run
```

Generated work is always a draft. Logos are composited from approved files and are never invented by an image model.

The sibling `brand-designer-code-edition/` provides the Codex/Claude Code workflow using the same provider contract and brand-profile format.
