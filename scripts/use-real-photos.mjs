/**
 * Processes the school's real photos (uploads) into the site's image slots.
 *
 * What it does to every photo:
 *  - applies EXIF rotation
 *  - brightens slightly, lifts contrast, boosts saturation (phone photos
 *    taken in overcast light), and sharpens
 *  - crops a DIFFERENT region per slot (so repeated photos don't look
 *    identical) and resizes to the slot's target dimensions
 *
 * Usage:  node scripts/use-real-photos.mjs
 * Source: /home/user/uploads/green1..green4.jpg  (this sandbox only)
 *         → on the client machine, point SRC at the copied photos.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = "/home/user/uploads";
const OUT = path.join(__dirname, "..", "public", "images");

/**
 * Crop a region (fractions of the source) to the exact target aspect,
 * then resize to w×h.
 * The light edit (EXIF rotation, brightness, contrast, saturation,
 * sharpening) is applied to every output.
 */
async function cropTo(srcFile, outFile, w, h, region) {
  const raw = path.join(SRC, srcFile);
  const base = await sharp(raw).rotate().jpeg({ quality: 100 }).toBuffer();
  const { width: W, height: H } = await sharp(base).metadata();

  let rw = Math.round(W * region.width);
  let rh = Math.round(H * region.height);
  let fx = Math.round(W * region.left);
  let fy = Math.round(H * region.top);

  const targetAR = w / h;
  if (rw / rh > targetAR) {
    const nw = Math.round(rh * targetAR);
    fx += Math.round((rw - nw) / 2);
    rw = nw;
  } else {
    const nh = Math.round(rw / targetAR);
    fy += Math.round((rh - nh) / 2);
    rh = nh;
  }
  fx = Math.max(0, Math.min(fx, W - rw));
  fy = Math.max(0, Math.min(fy, H - rh));

  await sharp(base)
    .modulate({ brightness: 1.06, saturation: 1.32 })
    .linear(1.1, -10)
    .sharpen({ sigma: 0.8 })
    .extract({ left: fx, top: fy, width: rw, height: rh })
    .resize(w, h, { fit: "fill" })
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT, outFile));
  console.log(`  ✓ ${outFile}  ${w}×${h}  ← ${srcFile}`);
}

/** Branded 1200×630 Open Graph image built on a real campus photo. */
async function ogImage() {
  const raw = path.join(SRC, "green3.jpg");
  const base = await sharp(raw).rotate().toBuffer();
  const photo = await sharp(base)
    .resize(1200, 630, { fit: "cover" })
    .modulate({ brightness: 0.62, saturation: 1.15 })
    .toBuffer();
  const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#0B1F12" opacity="0.42"/>
    <text x="80" y="230" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="bold" fill="#FAF6EE">The Green Peace Schools</text>
    <rect x="82" y="262" width="130" height="6" fill="#D4AF37"/>
    <text x="80" y="330" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#FAF6EE">Knowledge, Development &amp; Prosperity</text>
    <text x="80" y="550" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#C3D9CB">Agbado, Ifo · Ogun State · Nigeria</text>
  </svg>`);
  await sharp(photo)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 85 })
    .toFile(path.join(OUT, "og-image.jpg"));
  console.log("  ✓ og-image.jpg  1200×630  ← green3 + brand overlay");
}

console.log("Processing real photos into public/images …");

await cropTo("green3.jpg", "hero.jpg", 1920, 1080, { left: 0.05, top: 0.12, width: 0.92, height: 0.76 });
await cropTo("green4.jpg", "welcome.jpg", 1200, 900, { left: 0.08, top: 0.06, width: 0.86, height: 0.86 });
await cropTo("green1.jpg", "about-story.jpg", 1200, 800, { left: 0.06, top: 0.1, width: 0.88, height: 0.78 });

// The colourful colonnade + play yard reads warmer for the youngest stage
// (the gate-only crop from green2 turned out too flat).
await cropTo("green1.jpg", "nursery.jpg", 1000, 750, { left: 0.0, top: 0.26, width: 0.66, height: 0.5 });
await cropTo("green3.jpg", "primary.jpg", 1000, 750, { left: 0.0, top: 0.18, width: 0.62, height: 0.78 });
await cropTo("green4.jpg", "secondary.jpg", 1000, 750, { left: 0.28, top: 0.05, width: 0.72, height: 0.88 });

await cropTo("green3.jpg", "facility-playground.jpg", 1000, 750, { left: 0.18, top: 0.32, width: 0.78, height: 0.66 });

await cropTo("green4.jpg", "gallery-1.jpg", 900, 900, { left: 0.1, top: 0.04, width: 0.8, height: 0.92 });
await cropTo("green3.jpg", "gallery-2.jpg", 900, 900, { left: 0.0, top: 0.12, width: 0.82, height: 0.88 });
await cropTo("green1.jpg", "gallery-3.jpg", 900, 900, { left: 0.42, top: 0.04, width: 0.92, height: 0.92 });
await cropTo("green2.jpg", "gallery-4.jpg", 900, 900, { left: 0.34, top: 0.04, width: 0.92, height: 0.92 });
await cropTo("green3.jpg", "gallery-5.jpg", 900, 900, { left: 0.24, top: 0.16, width: 0.9, height: 0.88 });
await cropTo("green1.jpg", "gallery-6.jpg", 900, 900, { left: 0.0, top: 0.08, width: 0.86, height: 0.88 });

await ogImage();
console.log("Done. (proprietor/principal and the 3 facility interiors keep their labelled placeholders.)");
