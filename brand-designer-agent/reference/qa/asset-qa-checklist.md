# Asset QA Checklist

- Correct brand profile loaded.
- Exact colors used where required.
- Approved logo asset composited, never generated.
- Logo safe zone and minimum size respected.
- Fonts match the brand profile or approved fallback.
- Text is spelled correctly and readable at real display size.
- Contrast passes for intended use.
- Canvas dimensions, ratio, file format, and platform safe zones match the request.
- No contaminated source material, watermarks, stray artifacts, or client-private data.
- Crop does not cut off required text, faces, products, legal copy, or logo.
- File names are clear and include platform/size/version when useful.
- Dashboard content payload includes `title`.
- For original creative/design generation, three critic scores are present, category floors pass, the deterministic gate passes, references have provenance, and the stop reason is recorded.
- If critics were bypassed, the job is a purely mechanical transformation of already-approved art and deterministic QA passed.
- Gauntlet output remains `awaiting-approval`; it is never auto-published.

If any item fails, revise before handoff.

## Owner Hard Rules — critics MUST check these (enforced since 2026-08-18)
- No right-edge (or any-edge) accent lines/bars on slides.
- Titles not overlaid on busy imagery — solid ground only, fully legible.
- Zero placeholder boxes/frames in deliverables: every example slot ships with a real finished asset.
- Graphics match slide topic literally.
- Raster examples in decks must be crisp at 1920x1080: no visible blur/ridges from compression or upscaling; source higher-resolution originals or render at 2x before handoff.
- Important decks: the owner verifies contact sheet visually before owner sees it; rubric pass does NOT substitute for owner acceptance.
