/**
 * Removes em dashes ("—") from user-visible sentences, replacing each with
 * appropriate punctuation (comma / period / colon) so the sentences still
 * read naturally. Code comments, aria-labels and console logs are untouched.
 *
 * Usage: node scripts/remove-em-dashes.mjs
 * Each entry is [file, exact old text, replacement] — the script fails
 * loudly if an exact string is not found (so nothing is missed silently).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const REPLACEMENTS = [
  // ---------------- app/page.tsx ----------------
  ["app/page.tsx", "A little school with a big heart — and a big standard.", "A little school with a big heart, and a big standard."],
  ["app/page.tsx", "classrooms, making sure learning is joyful — and never", "classrooms, making sure learning is joyful, and never"],

  // ---------------- app/admissions/page.tsx ----------------
  ["app/admissions/page.tsx", "A short, friendly assessment — play-based for Nursery, written for Primary and Secondary — plus a chat with the child and parents.", "A short, friendly assessment: play-based for Nursery, written for Primary and Secondary. Plus a chat with the child and parents."],
  ["app/admissions/page.tsx", "ask us — we will advise you honestly.", "ask us. We will advise you honestly."],
  ["app/admissions/page.tsx", "Yes — 10% off for the second child", "Yes. 10% off for the second child"],
  ["app/admissions/page.tsx", "We handle everything else — just come relaxed.", "We handle everything else. Just come relaxed."],
  ["app/admissions/page.tsx", "Start with the form — we will walk through every step with you.", "Start with the form. We will walk through every step with you."],

  // ---------------- app/contact/page.tsx ----------------
  ["app/contact/page.tsx", "Visit, call, email or WhatsApp The Green Peace School — address, phone numbers, opening hours, map and a quick contact form.", "Visit, call, email or WhatsApp The Green Peace School. Address, phone numbers, opening hours, map and a quick contact form."],
  ["app/contact/page.tsx", "Questions, visits or a simple hello — however you reach us, a real person will answer.", "Questions, visits or a simple hello. However you reach us, a real person will answer."],

  // ---------------- app/academics/page.tsx ----------------
  ["app/academics/page.tsx", "Nursery, Primary and Secondary education at The Green Peace School — curriculum focus, subjects, co-curricular activities, facilities and a typical school day.", "Nursery, Primary and Secondary education at The Green Peace School: curriculum focus, subjects, co-curricular activities, facilities and a typical school day."],
  ["app/academics/page.tsx", "Continuous, low-pressure assessment — no child is ever surprised", "Continuous, low-pressure assessment: no child is ever surprised"],
  ["app/academics/page.tsx", "How we teach at The Green Peace School — from the first phonics lesson to the final WAEC hall.", "How we teach at The Green Peace School, from the first phonics lesson to the final WAEC hall."],
  ["app/academics/page.tsx", "mistakes are part of learning — not the end of it.", "mistakes are part of learning, not the end of it."],
  ["app/academics/page.tsx", "each term — because character is built in practice, not just in lessons.", "each term, because character is built in practice, not just in lessons."],
  ["app/academics/page.tsx", "Spaces designed for how children actually learn — by looking, touching, building and playing.", "Spaces designed for how children actually learn: by looking, touching, building and playing."],
  ["app/academics/page.tsx", "Calm, structured and predictable — the kind of day children can settle into and parents can plan around.", "Calm, structured and predictable, the kind of day children can settle into and parents can plan around."],
  ["app/academics/page.tsx", "walk you through the whole process — visit, assessment and enrolment.", "walk you through the whole process: visit, assessment and enrolment."],

  // ---------------- app/privacy/page.tsx ----------------
  ["app/privacy/page.tsx", "cookies when it loads — see our{\" \"}", "cookies when it loads. See our{\" \"}"],
  ["app/privacy/page.tsx", "</a>{\" \"}\n          — there is no fee, and we respond within 30 days.", "</a>.{\" \"}\n          There is no fee, and we respond within 30 days."],

  // ---------------- app/error.tsx ----------------
  ["app/error.tsx", "again — if it keeps happening, give us a call", "again. If it keeps happening, give us a call"],

  // ---------------- app/layout.tsx (page titles) ----------------
  ["app/layout.tsx", "default: `${siteConfig.name} — ${siteConfig.tagline}`,", "default: `${siteConfig.name} | ${siteConfig.tagline}`,"],
  ["app/layout.tsx", "title: `${siteConfig.name} — ${siteConfig.tagline}`,", "title: `${siteConfig.name} | ${siteConfig.tagline}`,"],
  ["app/layout.tsx", "title: `${siteConfig.name} — ${siteConfig.tagline}`,", "title: `${siteConfig.name} | ${siteConfig.tagline}`,"],

  // ---------------- components/forms/ContactForm.tsx ----------------
  ["components/forms/ContactForm.tsx", "Message sent — thank you!", "Message sent. Thank you!"],
  ["components/forms/ContactForm.tsx", "Your message was not sent —\n            please try again, or call us directly.", "Your message was not sent.\n            Please try again, or call us directly."],

  // ---------------- components/layout/Footer.tsx ----------------
  ["components/layout/Footer.tsx", "Prosperity” — our motto.", "Prosperity” is our motto."],

  // ---------------- components/sections/FeatureGrid.tsx ----------------
  ["components/sections/FeatureGrid.tsx", "champion their growth — in the classroom and beyond it.", "champion their growth, in the classroom and beyond it."],
  ["components/sections/FeatureGrid.tsx", "A maximum of 20 pupils per class (15 in Nursery) — so no child is ever lost in the crowd, and every voice is heard.", "A maximum of 20 pupils per class (15 in Nursery), so no child is ever lost in the crowd and every voice is heard."],
  ["components/sections/FeatureGrid.tsx", "Six promises we make to every family in the Green Peace family — and keep, every single term.", "Six promises we make to every family in the Green Peace family, and keep every single term."],

  // ---------------- components/sections/ProgramsPreview.tsx ----------------
  ["components/sections/ProgramsPreview.tsx", "One continuous journey from Nursery to Secondary — same values, same community, steadily bigger challenges.", "One continuous journey from Nursery to Secondary: same values, same community, steadily bigger challenges."],

  // ---------------- components/sections/Testimonials.tsx ----------------
  ["components/sections/Testimonials.tsx", "every term — not just at exam time.", "every term, not just at exam time."],
  ["components/sections/Testimonials.tsx", "What surprised me most was his character — he is respectful, honest and hardworking, and that started here.", "What surprised me most was his character. He is respectful, honest and hardworking, and that started here."],
  ["components/sections/Testimonials.tsx", "feels like family — small classes, caring teachers and a genuinely safe campus.", "feels like family: small classes, caring teachers and a genuinely safe campus."],

  // ---------------- lib/siteConfig.ts ----------------
  ["lib/siteConfig.ts", "A warm, values-driven Nursery, Primary and Secondary school in Ifo, Ogun State — raising confident, curious and kind children since 1998.", "A warm, values-driven Nursery, Primary and Secondary school in Ifo, Ogun State. Raising confident, curious and kind children since 1998."],

  // ---------------- lib/email.ts (visible in received emails) ----------------
  ["lib/email.ts", "This is an automated message — please don't reply to this email.", "This is an automated message. Please don't reply to this email."],
  ["lib/email.ts", "We will arrange a short visit or assessment — relaxed and friendly, especially for our nursery and primary pupils.", "We will arrange a short visit or assessment. It will be relaxed and friendly, especially for our nursery and primary pupils."],
  ["lib/email.ts", "`[Inquiry] ${data.childName} — ${data.grade} (from ${data.parentName})`,", "`[Inquiry] ${data.childName}, ${data.grade} (from ${data.parentName})`,"],
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
