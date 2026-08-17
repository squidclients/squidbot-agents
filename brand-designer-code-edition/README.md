# Brand Designer for Codex and Claude Code

This edition turns a coding agent into the director and QA layer while a connected image service renders raster designs. It is unseasoned and contains no customer or vendor data.

## Why an external provider is required

Codex or Claude Code can inspect the repo, read brand evidence, write briefs, build HTML/SVG layouts, and run QA. High-quality raster generation still requires an image API such as Higgsfield, OpenAI Images, or another provider. The included adapter isolates that dependency.

## Setup

```bash
cp ../brand-designer-agent/brand/intake.example.json brand/intake.json
node scripts/doctor.mjs
```

Use `environment.example.json` as the variable checklist and keep values in your local environment/secrets manager. Use `AGENTS.md` with Codex or `CLAUDE.md` with Claude Code. Complete the sibling agent's `docs/SEASONING.md` before production work.

## Provider contract

`scripts/image-provider.mjs` supports:

- `IMAGE_PROVIDER=openai` using `OPENAI_API_KEY` and `OPENAI_IMAGE_MODEL`
- `IMAGE_PROVIDER=custom` using `CUSTOM_IMAGE_API_URL` and `CUSTOM_IMAGE_API_KEY`

The custom endpoint receives `{prompt, width, height, format}` and must return either `{imageBase64}` or `{imageUrl}`. Higgsfield can be connected through this adapter once its account-specific endpoint and authentication contract are confirmed.
