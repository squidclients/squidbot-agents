# Default Gauntlet Quality Mode

Gauntlet mode is the default for every original creative/design generation, including routine assets. Only purely mechanical transformations of already-approved art may bypass critics: resize, format conversion, compression, exact crop, and exact export.

## Workflow

1. Establish a brief with title, audience, platform, dimensions, offer/message, required copy, brand profile, and approval target.
2. Attach zero to three owner-approved reference artifacts when useful. Each reference needs provenance and is used as a quality bar, not a source to clone.
3. Build the initial candidate through the normal Brand Designer production pipeline and inspect the actual rendered artifact.
4. Run three fresh-context internal critic calls:
   - Brief Fit Critic: does the candidate satisfy the brief?
   - Design Quality Critic: is the craft professional?
   - Visual Impact Critic: does it land quickly at real platform size?
5. Aggregate the 0-5 scores with the configured weights and category floors.
6. Run the deterministic brand/compliance gate.
7. Revise only when the score/gate justifies it and budgets allow.
8. Keep the best deterministic-passing candidate, stop on the first configured stop condition, and submit `awaiting-approval` only if the final deterministic gate passes.

## Safety Bounds

- Default max rounds: 2.
- Configurable absolute max rounds: 3.
- Per-run and per-round token budgets are required in `config/gauntlet.json`.
- Stop on pass, budget exhaustion, non-improvement, oscillation, repeated criticism, or max rounds.
- Critics never message each other or external agents. They are isolated model calls orchestrated inside Brand Designer.
- Gauntlet mode never auto-publishes; final assets remain approval-gated.
- Missing artifact files, hashes, dimensions, palette/type extraction, approved-logo evidence, contrast measurements, safe-zone evidence, spelling evidence, crop evidence, or platform-spec evidence fail closed.

## Deterministic Transform Exception

Mechanical transformations of already-approved art may use `deterministic-transform` instead of critics. The exception is limited to resize, format conversion, compression, exact crop, and exact export. If the task changes concept, layout, copy, art direction, generated imagery, or brand interpretation, it is original design work and must run the gauntlet.

## Deterministic Gate

The deterministic gate must pass before a gauntlet result is considered ready for approval:

- Approved logos and source assets only.
- Exact palette and typography tokens.
- Contrast threshold for text.
- Logo safe zones and minimum sizes.
- Canvas dimensions, ratio, format, and platform safe zones.
- Spelling, cropping, and required text checks.
- Forbidden treatment and contaminated asset checks.
- Reference overfit/copyright/likeness risk checks.

If critic scores and deterministic checks disagree, the deterministic gate wins.
