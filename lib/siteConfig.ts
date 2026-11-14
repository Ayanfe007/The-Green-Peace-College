/**
 * Central configuration for The Green Peace School website.
 * ------------------------------------------------------------------
 * Edit this ONE file to update the school's details everywhere on the
 * site (navbar, footer, contact page, email messages, SEO, sitemap,
 * JSON-LD structured data…).
 *
 * Every placeholder value is marked with `// TODO: replace` so you can
 * find them quickly with a search for "TODO".
 */

const whatsappNumber = "+234 805 652 7803";

export const siteConfig = {
  name: "The Green Peace School",
  shortName: "Green Peace School",
  tagline: "Nurturing Minds. Growing Character. Shaping Futures.",
  description:
    "A warm, values-driven Nursery, Primary and Secondary school in Ifo, Ogun State. Raising confident, curious and kind children since 2010.",
  url: "https://www.thegreenpeaceschool.ng", // TODO: replace with the live domain
  foundedYear: 2010,

  address: {
    street:
      "31A Ijaola Street, Off Agbado-Ijoko Road (by Lemode Bus Stop), Agbado",
    city: "Ifo",
    region: "Ogun State",
    country: "Nigeria",
  },

  // TODO: add a second number here when the school has one.
  phones: [{ label: "Call or WhatsApp", number: "+234 805 652 7803" }],

  // One school inbox for now (both forms deliver here). Add a second
  // admissions address in siteConfig if the school gets one later.
  email: "thegreenpeaceschool@gmail.com",
  admissionsEmail: "thegreenpeaceschool@gmail.com",

  // WhatsApp number (international format, digits). Used for the
  // floating chat button and the contact cards.
  whatsapp: whatsappNumber,
  whatsappUrl: `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`,

  hours: [
    { days: "Monday – Friday", time: "7:30am – 4:00pm" },
    { days: "Saturday", time: "9:00am – 12:00pm (administrations only)" },
    { days: "Sunday & Public Holidays", time: "Closed" },
  ],

  social: {
    facebook: "https://www.facebook.com/thegreenpeaceschool", // TODO: replace
    instagram: "https://www.instagram.com/thegreenpeaceschool", // TODO: replace
    x: "https://x.com/thegreenpeaceschool", // TODO: replace
    youtube: "https://www.youtube.com/@thegreenpeaceschool", // TODO: replace
  },

  maps: {
    // Google Maps embed for "The Green Peace School" (Share → Embed a map).
    // Re-embed if the pin on your listing ever moves.
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.3873174145942!2d3.28741821009195!3d6.722503720791689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b974c054a44ef%3A0x321b8d3db7ef221f!2sThe%20green%20peace%20school!5e0!3m2!1sen!2sng!4v1793058567646!5m2!1sen!2sng",
    // Directions to the school's pin (lat, lng from the listing).
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=6.722503720791689,3.28741821009195",
  },

  // Placeholder statistics shown on the home page. TODO: replace with
  // real figures.
  stats: {
    years: "28",
    students: "480",
    teachers: "38",
    passRate: "98%",
  },
} as const;

export type SiteConfig = typeof siteConfig;
