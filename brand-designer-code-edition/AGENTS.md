# Brand Designer Code Workflow

1. Run `node scripts/doctor.mjs`; stop if provider, approved profile, or assets are missing.
2. Read `brand/profile.json`, the brief, and approved reference files.
3. Write a production prompt that describes composition, hierarchy, typography, imagery, dimensions, and exclusions.
4. Generate through `node scripts/image-provider.mjs --prompt-file=<file> --out=<file>`.
5. Inspect the real artifact. Check dimensions, text accuracy, contrast, crop, safe zones, logo integrity, and brand fit.
6. Revise no more than three rounds. Keep the best passing artifact.
7. Save the asset and a JSON QA report. Mark it draft/awaiting approval; never publish.

Never invent a logo, expose keys, embed customer data in prompts unnecessarily, or claim a design passed without inspecting the artifact.
