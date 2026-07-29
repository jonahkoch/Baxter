# My History Studio — Higgsfield Visual Prompts

## Global Style Tag
Append to any prompt:

> *editorial lifestyle photography, warm golden natural light, soft shallow depth of field, film-like color, cozy upscale home interior, authentic candid emotion, muted earth tones, 35mm, high detail, no text, no watermark.*

---

## Reference Images

| # | Asset | File | Notes |
|---|-------|------|-------|
| 1 | Album / Product | `album-reference.jpg` | Physical photo books: Furever Reno, Guarascio, Sandy Hills 2017 — shows real product style and binding |
| 2 | Interiors (warm traditional) | `interiors-reference.webp` | Elegant traditional living room: chinoiserie wallpaper (cool blue-green), cream upholstery, brass accents, soft window light, fireplace. Color temp leans cooler than the warm golden global tag — use for *mood/layout* reference, not exact color matching |
| 3 | Interiors (bright modern) | `ref-3.webp` | Bright luxury living room: coffered ceiling, stone fireplace, neutral palette, open-concept to kitchen. Airy, transitional-contemporary. "bright MLS" watermark |
| 4 | Interiors (bright formal) | `ref-4.webp` | Bright formal living room: coffered ceiling, stone fireplace, French doors with greenery views, wainscoting. Neutral palette, serene upscale. "bright MLS" watermark |
| 5 | Product flat-lay | `ref-5.jpg` | Top-down product shot: 9+ custom wedding albums on dark walnut surface. Variety of cover materials (leather, linen, wood, suede), foil stamping, photo insets, embossed names. Warm editorial product photography |
| 6 | Interiors (green sofa) | `ref-6-green-sofa.webp` | Modern luxury living room with chartreuse/yellow-green velvet sofa, olive bouclé chairs, arched doorways, floor-to-ceiling glass. Bold earthy accents on neutral base. Great for matching "green sofa" in prompts |

---

## STILLS

### 1. HERO — Family with the Legacy Book
**Aspect:** 16:9 (email header ~600×360)

**Prompt:**
> A multigenerational family — parents, grandmother, two children and a toddler — sitting close together on a green sofa in a warmly lit living room, looking down at an open, beautifully bound photo-story book on their laps, smiling and pointing at a page. Framed family photos on the mantel behind them, soft afternoon light through a window. Genuine warmth and connection.

**Tips:**
- Generate 3–4 variations per prompt and pick the one with the most natural faces/hands.
- Keep people slightly turned or looking at the book — avoids the "AI stare."

**References:** Album product style (ref 1, 5) + interiors mood (ref 2, 3, or 4)

---

## Generation Log

### Test 1 — Soul 2.0 + Interiors Reference (ref 2)
**Result:** https://d8j0ntlcm91z4.cloudfront.net/user_39dCC1ME1sTiCRRlYrz1Q9MH3yW/hf_20260722_000540_0489e20a-feed-4dd4-a2cc-df7f3676f9c1.png
- **Issue:** Soul 2.0 cloned the reference too literally — beautiful room, **no people**. Reference had no people; model reproduced that.
- **Lesson:** Don't use people-free interiors as reference for people scenes with Soul 2.0.

### Test 2 — Soul 2.0, Prompt Only (no reference)
**Result:** https://d8j0ntlcm91z4.cloudfront.net/user_39dCC1ME1sTiCRRlYrz1Q9MH3yW/hf_20260722_000943_774d4e35-f37b-4f63-bf70-53297d2047fc.png
- **Outcome:** 4 people on green velvet sofa, warm candid feel, natural faces/hands. More "real photo" than luxury catalog.
- **Good for:** Authentic emotion, documentary-style warmth.

### Test 3 — GPT Image 2 + Green Sofa Reference (ref 6)
**Result:** https://d8j0ntlcm91z4.cloudfront.net/user_39dCC1ME1sTiCRRlYrz1Q9MH3yW/hf_20260722_000936_137a0034-f3de-4c40-943c-8c4b16bc6b22.png
- **Outcome:** 6 people, olive-green sofa, bright modern living room. Polished/catalog-quality. Hyper-perfect skin, art-directed feel.
- **Good for:** Luxury lifestyle, upscale client aspiration.
- **Reference worked because:** GPT Image 2 absorbs style without cloning composition. Green sofa in prompt + reference = color consistency.

---

## Working Notes
- **Color temp hierarchy:** Global tag = warm golden/earth tones. Ref 2 (interiors) is cooler (blue-green). Refs 3–4 are bright neutral. If compositing, let the global tag drive final color grading.
- **Album references (1, 5)** show real product — use to ground the "legacy book" prop style, binding, and materials in generated images.
- **Interior references (2–4)** are mood/layout guides. Ref 2 = cozy/traditional. Refs 3–4 = bright/modern luxury. Pick based on desired vibe.
- **Ref 5 flat-lay** is great for product-focused prompts (e.g., "album collection on a table") rather than lifestyle scenes with people.
- **Ref 6** (green sofa) works best with GPT Image 2 for upscale modern lifestyle — it transfers the bold-accent-on-neutral luxury feel without cloning the architecture.

## Style Calibration Guide

**Goal:** Capture the *taste level* of these interiors, not clone the rooms.

| Desired Feel | Model | Reference | Approach |
|-------------|-------|-----------|----------|
| Warm, authentic, documentary | Soul 2.0 | None (prompt only) | Let global tag drive; no reference to avoid cloning |
| Polished luxury, catalog-quality | GPT Image 2 | Ref 6 (green sofa) or Ref 3/4 (bright modern) | Reference for color palette + upscale vibe; prompt for scene |
| Product-focused (albums on table) | GPT Image 2 or Soul 2.0 | Ref 5 (flat-lay) | Reference for material variety and styling |
| Cozy traditional | Soul 2.0 | Ref 2 (interiors) | Use as single reference; expect room-dominant output |

**Key insight:** GPT Image 2 *blends* references with prompts. Soul 2.0 *obeys* references literally. For lifestyle with people + luxury taste, **GPT Image 2 + a bold-reference (like ref 6)** is the sweet spot.
