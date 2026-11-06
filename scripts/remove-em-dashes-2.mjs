/**
 * Second pass: removes the remaining em dashes from user-visible sentences
 * (About, Terms, Cookies, Admissions process/requirements, email header).
 * See remove-em-dashes.mjs for the first pass. Code comments, aria-labels
 * and console logs are intentionally left alone.
 *
 * Usage: node scripts/remove-em-dashes-2.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const REPLACEMENTS = [
  // ---------------- app/admissions/page.tsx (process + requirements) ----------------
  ["app/admissions/page.tsx", "No mystery, no queues — just four clear steps.", "No mystery, no queues, just four clear steps."],
  ["app/admissions/page.tsx", "Keep these ready when you apply — having them on hand is the", "Keep these ready when you apply. Having them on hand is the"],
  ["app/admissions/page.tsx", "Bring originals and photocopies — we copy on site and return", "Bring originals and photocopies. We copy on site and return"],
  ["app/admissions/page.tsx", "The questions every parent asks — answered honestly.", "The questions every parent asks, answered honestly."],

  // ---------------- app/about/page.tsx ----------------
  ["app/about/page.tsx", "The story, vision, values and people behind The Green Peace School — from our founding in 1998 to today.", "The story, vision, values and people behind The Green Peace School, from our founding in 1998 to today."],
  ["app/about/page.tsx", "Keeps the school running smoothly — fee statements included.", "Keeps the school running smoothly, fee statements included."],
  ["app/about/page.tsx", "and we still tell parents the honest truth — kindly, and on", "and we still tell parents the honest truth, kindly and on"],
  ["app/about/page.tsx", "school in {siteConfig.address.region} — known not only for", "school in {siteConfig.address.region}, known not only for"],
  ["app/about/page.tsx", "every child can learn, grow and thrive — academically,", "every child can learn, grow and thrive, academically,"],
  ["app/about/page.tsx", "morally and socially — in partnership with caring", "morally and socially, in partnership with caring"],
  ["app/about/page.tsx", "one unshakeable belief — that every child, in every family, deserves", "one unshakeable belief: that every child, in every family, deserves"],
  ["app/about/page.tsx", "how their child is doing — not just at exam time, but every term.", "how their child is doing, not just at exam time, but every term."],
  ["app/about/page.tsx", "Come and visit — walk the campus, meet the teachers", "Come and visit. Walk the campus, meet the teachers"],
  ["app/about/page.tsx", "our classrooms are alive — children reading aloud", "our classrooms are alive: children reading aloud"],
  ["app/about/page.tsx", "continuous, low-pressure assessment — so no child is ever surprised", "continuous, low-pressure assessment, so no child is ever surprised"],
  ["app/about/page.tsx", "Come and see us — you will meet a team of educators", "Come and see us. You will meet a team of educators"],

  // ---------------- app/terms/page.tsx ----------------
  ["app/terms/page.tsx", "The content of this Website — including text, graphics, logos,", "The content of this Website (including text, graphics, logos,"],
  ["app/terms/page.tsx", "icons, images and the overall design — is the property of", "icons, images and the overall design) is the property of"],
  ["app/terms/page.tsx", "The rules for using this website — admissions, fees, content and liability, in plain language.", "The rules for using this website: admissions, fees, content and liability, in plain language."],

  // ---------------- app/cookies/page.tsx ----------------
  ["app/cookies/page.tsx", "How The Green Peace School's website uses cookies — in short: no tracking or advertising cookies, and one third-party map on the Contact page.", "How The Green Peace School's website uses cookies. In short: no tracking or advertising cookies, and one third-party map on the Contact page."],
  ["app/cookies/page.tsx", "device so it can remember things between visits — like your", "device so it can remember things between visits, like your"],
  ["app/cookies/page.tsx", "<strong>Google Maps</strong> — the embedded map on the", "<strong>Google Maps</strong>: the embedded map on the"],
  ["app/cookies/page.tsx", "of the Website — including the admission forms — works normally", "of the Website (including the admission forms) works normally"],
  ["app/cookies/page.tsx", "In short: no tracking or advertising cookies — just a third-party map on the Contact page.", "In short: no tracking or advertising cookies, just a third-party map on the Contact page."],

  // ---------------- lib/email.ts (visible in the inbox header) ----------------
  ["lib/email.ts", "\"We received your admission inquiry — The Green Peace School\",", "\"We received your admission inquiry: The Green Peace School\","],
];

let applied = 0;
for (const [relFile, oldText, newText] of REPLACEMENTS) {
  const file = path.join(root, relFile);
  const src = readFileSync(file, "utf8");
  if (!src.includes(oldText)) {
    console.error(`✗ NOT FOUND in ${relFile}:\n  ${JSON.stringify(oldText.slice(0, 90))}`);
    process.exitCode = 1;
    continue;
  }
  writeFileSync(file, src.replace(oldText, newText), "utf8");
  applied++;
  console.log(`  ✓ ${relFile}`);
}
console.log(`\n${applied}/${REPLACEMENTS.length} replacements applied.`);
