import { z } from "zod";

/**
 * Zod schemas shared by the browser forms (react-hook-form) and the
 * API routes (server-side validation). Keeping ONE schema guarantees
 * client and server always agree on what is valid.
 */

/** Grades offered — single source of truth for the grade dropdown. */
export const GRADES = [
  "Nursery 1",
  "Nursery 2",
  "Nursery 3",
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
  "JSS 1",
  "JSS 2",
  "JSS 3",
  "SS 1",
  "SS 2",
  "SS 3",
] as const;

export const RELATIONSHIPS = [
  "Mother",
  "Father",
  "Guardian",
  "Grandparent",
  "Aunty / Uncle",
  "Other",
] as const;

export const CONTACT_METHODS = [
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
] as const;

/** Loose but practical phone validation (Nigerian + international). */
const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20, "That phone number looks too long")
  .regex(
    /^\+?[\d\s()-]{7,20}$/,
    "Enter a valid phone number, e.g. 0803 123 4567"
  );

const email = z
  .string()
  .trim()
  .email("Enter a valid email address")
  .max(120, "That email address looks too long");

/** ISO date string for “today” (used to cap the child's date of birth). */
export const todayISO = new Date().toISOString().slice(0, 10);

/**
 * Admission inquiry & registration form.
 * The `website` field is a honeypot — invisible to humans; any bot that
 * fills it is silently discarded by the API route.
 */
export const inquirySchema = z.object({
  parentName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long (80 characters max)"),

  relationship: z.string().min(1, "Please tell us your relationship to the child"),

  phone,
  email,

  address: z
    .string()
    .trim()
    .max(200, "Address is too long (200 characters max)")
    .optional()
    .or(z.literal("")),

  childName: z
    .string()
    .trim()
    .min(2, "Please enter your child's full name")
    .max(80, "Name is too long (80 characters max)"),

  childDob: z
    .string()
    .min(1, "Please provide the child's date of birth")
    .refine((v) => v <= todayISO, "Date of birth cannot be in the future"),

  gender: z.enum(["female", "male", "prefer-not-to-say"], {
    errorMap: () => ({ message: "Please select an option" }),
  }),

  grade: z.string().min(1, "Please select the grade you are applying for"),

  previousSchool: z
    .string()
    .trim()
    .max(120, "School name is too long (120 characters max)")
    .optional()
    .or(z.literal("")),

  contactMethod: z.enum(["phone", "whatsapp", "email"], {
    errorMap: () => ({ message: "Please choose how we should reach you" }),
  }),

  message: z
    .string()
    .trim()
    .max(1000, "Message is too long (1,000 characters max)")
    .optional()
    .or(z.literal("")),

  consent: z.literal(true, {
    errorMap: () => ({ message: "Please give your consent so we can contact you" }),
  }),

  /** Honeypot — must stay empty for a real human. */
  website: z.string().optional(),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryData = z.output<typeof inquirySchema>;

/** Short contact form (Contact page). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  email,
  phone: phone.optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters)")
    .max(1000, "Message is too long (1,000 characters max)"),
  /** Honeypot — same trick as the inquiry form. */
  website: z.string().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
