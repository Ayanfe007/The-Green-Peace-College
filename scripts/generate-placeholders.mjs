/**
 * Generates the neutral placeholder JPGs in /public/images.
 *
 * Each placeholder is a soft cream/green block with a leaf mark, the
 * target file name, its intended use and recommended size — so it is
 * obvious at a glance what belongs in each slot.
 *
 * Usage:   node scripts/generate-placeholders.mjs
 * (Requires `sharp`, which is already a dev dependency.)
 *
 * To regenerate after any tweak: just run the command again.
 * Replace the generated files with real photos (same file names) when
 * you have them — the site will pick them up automatically.
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

const CREAM = "#FAF6EE";
const LINE = "#C9D8CC";
const GREEN = "#1E4D2B";
const MUTED = "#5B6B60";
const SOFT = "#E3EDE5";
const FAINT = "#9AA79E";
const GOLD = "#D4AF37";

/** Leaf + soft circle, centred at (cx, cy), scaled by s. */
function leaf(cx, cy, s) {
  return `<g transform="translate(${cx - 32 * s} ${cy - 32 * s}) scale(${s})">
    <circle cx="32" cy="32" r="30" fill="${SOFT}"/>
    <path d="M32 11 C17.5 19 10.5 31 13 46 C28.5 44 39 34 41 17.5 C41.3 13.5 38.5 11.5 32 11 Z" fill="${GREEN}"/>
    <path d="M15 45 C23.5 34 31.5 24.5 39.5 14" stroke="${CREAM}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  </g>`;
}

async function placeholder({ file, w, h, label, caption }) {
  const f = Math.min(w, h) / 1000; // size factor
  const leafCy = h * 0.36;
  const labelY = h * 0.56;
  const captionY = labelY + 36 * f;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${CREAM}"/>
  <rect x="28" y="28" width="${w - 56}" height="${h - 56}" rx="24" fill="none" stroke="${LINE}" stroke-width="2" stroke-dasharray="12 10"/>
  ${leaf(w / 2, leafCy, 1.5 * f)}
  <text x="50%" y="${labelY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(58 * f)}" font-weight="bold" fill="${GREEN}">${label}</text>
  <text x="50%" y="${captionY}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(26 * f)}" fill="${MUTED}">${caption}</text>
  <text x="50%" y="${h - 52}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(22 * f)}" fill="${FAINT}">Placeholder — replace with the real photo (same file name)</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(path.join(outDir, file));
  console.log(`  ✓ ${file} (${w}×${h})`);
}

/** Branded Open Graph image (1200×630) — green, school name + tagline. */
async function ogImage() {
  const w = 1200;
  const h = 630;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#1E4D2B"/>
  <circle cx="1030" cy="315" r="250" fill="#FAF6EE" opacity="0.05"/>
  <circle cx="930" cy="120" r="90" fill="#FAF6EE" opacity="0.04"/>
  <g transform="translate(140 96) scale(1.35)">
    <circle cx="32" cy="32" r="30" fill="#FAF6EE" opacity="0.14"/>
    <path d="M32 11 C17.5 19 10.5 31 13 46 C28.5 44 39 34 41 17.5 C41.3 13.5 38.5 11.5 32 11 Z" fill="#D4AF37"/>
    <path d="M15 45 C23.5 34 31.5 24.5 39.5 14" stroke="#1E4D2B" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  </g>
  <text x="140" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="62" font-weight="bold" fill="#FAF6EE">The Green Peace School</text>
  <rect x="142" y="368" width="130" height="7" fill="#D4AF37"/>
  <text x="140" y="430" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#C3D9CB">Nurturing Minds · Growing Character · Shaping Futures</text>
  <text x="140" y="550" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#9BBFA5">www.thegreenpeaceschool.ng</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(path.join(outDir, "og-image.jpg"));
  console.log("  ✓ og-image.jpg (1200×630)");
}

const jobs = [
  { file: "hero.jpg", w: 1920, h: 1080, label: "hero.jpg", caption: "Home hero background · 1920 × 1080" },
  { file: "welcome.jpg", w: 1200, h: 900, label: "welcome.jpg", caption: "Home welcome section · 1200 × 900" },
  { file: "about-story.jpg", w: 1200, h: 800, label: "about-story.jpg", caption: "About — Our Story · 1200 × 800" },
  { file: "proprietor.jpg", w: 900, h: 1125, label: "proprietor.jpg", caption: "Proprietor portrait · 900 × 1125 (4:5)" },
  { file: "principal.jpg", w: 900, h: 1125, label: "principal.jpg", caption: "Principal portrait · 900 × 1125 (4:5)" },
  { file: "nursery.jpg", w: 1000, h: 750, label: "nursery.jpg", caption: "Academics — Nursery · 1000 × 750" },
  { file: "primary.jpg", w: 1000, h: 750, label: "primary.jpg", caption: "Academics — Primary · 1000 × 750" },
  { file: "secondary.jpg", w: 1000, h: 750, label: "secondary.jpg", caption: "Academics — Secondary · 1000 × 750" },
  { file: "facility-library.jpg", w: 1000, h: 750, label: "facility-library.jpg", caption: "Facilities — Library · 1000 × 750" },
  { file: "facility-lab.jpg", w: 1000, h: 750, label: "facility-lab.jpg", caption: "Facilities — Science Lab · 1000 × 750" },
  { file: "facility-ict.jpg", w: 1000, h: 750, label: "facility-ict.jpg", caption: "Facilities — ICT Room · 1000 × 750" },
  { file: "facility-playground.jpg", w: 1000, h: 750, label: "facility-playground.jpg", caption: "Facilities — Playground · 1000 × 750" },
  { file: "gallery-1.jpg", w: 900, h: 900, label: "gallery-1.jpg", caption: "Gallery / co-curricular · 900 × 900" },
  { file: "gallery-2.jpg", w: 900, h: 900, label: "gallery-2.jpg", caption: "Gallery / co-curricular · 900 × 900" },
  { file: "gallery-3.jpg", w: 900, h: 900, label: "gallery-3.jpg", caption: "Gallery / co-curricular · 900 × 900" },
  { file: "gallery-4.jpg", w: 900, h: 900, label: "gallery-4.jpg", caption: "Gallery / co-curricular · 900 × 900" },
  { file: "gallery-5.jpg", w: 900, h: 900, label: "gallery-5.jpg", caption: "Gallery / co-curricular · 900 × 900" },
  { file: "gallery-6.jpg", w: 900, h: 900, label: "gallery-6.jpg", caption: "Gallery / co-curricular · 900 × 900" },
];

console.log("Generating placeholder images in public/images …");
for (const job of jobs) await placeholder(job);
await ogImage();
console.log("Done. Replace these files with real photos (same names).");
