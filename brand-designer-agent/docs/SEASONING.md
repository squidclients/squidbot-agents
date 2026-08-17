# Seasoning Guide

The agent starts with design capability but no knowledge of your brand.

1. Use `config/environment.example.json` as the checklist. Configure OpenAI or a compatible custom image provider in your local secrets manager/runtime. Never commit secret values.
2. Copy `brand/intake.example.json` to `brand/intake.json` and add approved assets under `brand/assets/`.
3. Supply your website, key landing pages, logos, brand guide, fonts/licences, colours, current work, inspiration, and disliked examples.
4. Run `node src/agent.cjs onboard --website=https://your-site.example` to create a draft profile.
5. Have the brand owner correct and approve every inferred rule before saving `brand/profile.json`.
6. Calibrate both editions on the same social graphic, website hero, and presentation cover. Score brief fit, brand fit, visual impact, legibility, and technical correctness.

Every output remains `awaiting-approval`. Never generate a logo or trademark with AI; composite an approved source file after generation.
