# Image slots

This folder now holds the school's **real, edited photos** for most slots
(brightened, contrast/saturation-lifted and sharpened, then cropped per
slot). A few slots — the two staff portraits and the three interior
facilities — still hold **labelled placeholders**; replace those files
with real photos, keeping the exact same file name, and the site updates
itself (no code changes needed).

> The real photos were processed from the original uploads with:
> `node scripts/use-real-photos.mjs`
> Regenerate the remaining placeholders at any time with:
> `node scripts/generate-placeholders.mjs`

**Legend:** 📷 = real photo · 🖼️ = placeholder (replace with a real photo)

## Slots

| File | Where it appears | Recommended size | Notes |
| --- | --- | --- | --- |
| `hero.jpg` 📷 | Home — hero background | 1920×1080 (landscape) | The classroom wing + open yard; a green overlay sits on top |
| `welcome.jpg` 📷 | Home — welcome section | 1200×900 (4:3) | The main building with the mission & vision boards |
| `about-story.jpg` 📷 | About — “Our Story” | 1200×800 (3:2) | The colourful classroom courtyard |
| `proprietor.jpg` 📷 | About — Founder's message | 900×1125 (4:5) or square | Real portrait: Mr. Abatti Olalekan Ahmed, Founder |
| `principal.jpg` 📷 | About — Principal's message | 900×1125 (4:5) or square | Real portrait: Adebayo Fateemah Adeshola, Principal |
| `headmistress.jpg` 📷 | About — Headmistress's message | 900×1125 (4:5) or square | Real portrait: Princess Oluwasijibomi Gbadebo, Headmistress |
| `team-technical-director.jpg` 📷 | About — team card | 800×800 (square) | Real portrait: Mr. Oyewole John Oyewunmi, Technical Director |
| `team-pro.jpg` 📷 | About — team card | 800×800 (square) | Real portrait: Johnson Adesewa Motunrayo, PRO (small source; a full-size original would sharpen it) |
| `nursery.jpg` 📷 | Academics — Nursery card | 1000×750 (4:3) | The colourful colonnade beside the play yard |
| `primary.jpg` 📷 | Academics — Primary card | 1000×750 (4:3) | The classroom wing and open yard |
| `secondary.jpg` 📷 | Academics — Secondary card | 1000×750 (4:3) | The main building |
| `facility-library.jpg` 🖼️ | Academics — Facilities | 1000×750 (4:3) | **Placeholder** — the library |
| `facility-lab.jpg` 🖼️ | Academics — Facilities | 1000×750 (4:3) | **Placeholder** — the science lab |
| `facility-ict.jpg` 🖼️ | Academics — Facilities | 1000×750 (4:3) | **Placeholder** — the ICT room |
| `facility-playground.jpg` 📷 | Academics — Facilities | 1000×750 (4:3) | The open play yard |
| `gallery-1.jpg` … `gallery-6.jpg` 📷 | Gallery / co-curricular | 900×900 (square) | Real campus shots (mixed crops of the four photos) |
| `og-image.jpg` 📷 | Social sharing preview (Open Graph / Twitter) | 1200×630 | Real campus photo + brand overlay (name, motto, location) |

## Logo (lives in `/public`, not this folder)

| File | Where it appears | Status |
| --- | --- | --- |
| `logo.svg` or `logo.png` | Navbar + footer + JSON-LD | ✅ **`logo.png` is bundled** — the school's real crest (sourced from the school's official portal, 512×512). Replace with a higher-res or transparent version when available. |
| `logo-light.svg` or `logo-light.png` | Footer (on the dark-green background) — optional | Falls back to `logo.*` |

The crest is shown as a compact badge on a near-black rounded chip so its
dark corners blend into the green navbar/footer. Until a logo file
exists the site shows the text wordmark “**The Green Peace School**”
instead.

The favicon is `app/icon.svg` (leaf mark) — swap it for the school mark
when ready (a 32–64px square crop of the crest works well).

## Tips

- JPG, 72–150 dpi, ~150–400 KB each keeps the site fast.
- Square-ish or 4:3 crops work best; every slot uses `object-cover`,
  so subjects in the centre of the frame survive cropping.
- Add meaningful file names for anything extra you add, and register the
  path in `lib/images.ts`.
