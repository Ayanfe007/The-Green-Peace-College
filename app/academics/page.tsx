import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  Laptop,
  Mic,
  Music,
  Palette,
  Sprout,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { images } from "@/lib/images";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Nursery, Primary and Secondary education at The Green Peace School — curriculum focus, subjects, co-curricular activities, facilities and a typical school day.",
  alternates: { canonical: canonicalUrl("/academics") },
};

/* TODO: review the program details below against the real curriculum. */

interface Program {
  image: string;
  alt: string;
  icon: LucideIcon;
  name: string;
  range: string;
  intro: string;
  focusTitle: string;
  focus: string[];
  subjectsTitle?: string;
  subjects?: string[];
  pointsTitle: string;
  points: string[];
}

const PROGRAMS: Program[] = [
  {
    image: images.nursery,
    alt: "The colourful colonnade beside the play yard, where the youngest learners start the day",
    icon: Sprout,
    name: "Nursery",
    range: "Ages 2–4 · Nursery 1, 2 & 3",
    intro:
      "Our earliest learners come to school for joy. Through play-based learning, every child builds the confidence, language and fine-motor skills that everything later rests on.",
    focusTitle: "Curriculum focus",
    focus: [
      "Play-based learning & discovery",
      "Early phonics and pre-reading",
      "Numeracy through songs, games and blocks",
      "Creative arts, music and movement",
    ],
    pointsTitle: "Class & daily rhythm",
    points: [
      "Maximum 15 pupils per class with one teacher and one assistant",
      "Morning session, 8:30am – 12:30pm (Nursery 3 may extend to 2:00pm)",
      "Daily highlights: arrival & circle time · structured play · fruit break · story time · free play",
      "Gentle, step-by-step preparation for Primary 1",
    ],
  },
  {
    image: images.primary,
    alt: "The classroom wing and open yard of the school compound",
    icon: BookOpen,
    name: "Primary",
    range: "Primary 1–6 · Ages 5–11",
    intro:
      "Primary is where foundations are built. We pair a strong, joyful academic core with continuous assessment and a wide net of co-curriculars, so each child finds at least one thing they are wonderful at.",
    focusTitle: "How we assess",
    focus: [
      "Continuous, low-pressure assessment — no child is ever surprised",
      "Written end-of-term examinations with a full report every term",
      "Reading & writing progress tracked from Primary 1",
      "Primary 6: dedicated BECE preparation in the final year",
    ],
    subjectsTitle: "Core subjects",
    subjects: [
      "English Language",
      "Mathematics",
      "Basic Science",
      "Social Studies",
      "Civic Education",
      "Christian & Moral Studies",
      "Yoruba",
      "Computer Studies",
      "Creative Arts",
      "Physical & Health Education",
    ],
    pointsTitle: "Beyond the textbook",
    points: [
      "Daily reading hour and a well-stocked school library",
      "Quiz and debate clubs, inter-class competitions",
      "Annual sports day, music and drama festival",
      "Computer club and basic coding from Primary 4",
    ],
  },
  {
    image: images.secondary,
    alt: "The main building of the school in Agbado, Ifo",
    icon: GraduationCap,
    name: "Secondary",
    range: "JSS 1–3 & SS 1–3 · Ages 11–17",
    intro:
      "Secondary students learn to think for themselves. A demanding but well-supported core, meaningful electives, serious exam preparation and real career guidance prepare them for WAEC, NECO, JAMB and life beyond.",
    focusTitle: "Exam preparation & guidance",
    focus: [
      "BECE (JSS 3), WAEC & NECO (SS 2–3) with monthly mock exams",
      "Past-question clinics and individual coaching for weaker areas",
      "JAMB/UTME counselling and university application support",
      "Trade and career exposure days for SS 2 and SS 3",
    ],
    subjectsTitle: "Core subjects",
    subjects: [
      "English Language",
      "Mathematics",
      "Biology",
      "Chemistry",
      "Physics",
      "Basic Technology",
      "Business Studies",
      "Economics",
      "Social Studies",
      "Civic Education",
    ],
    pointsTitle: "Elective tracks",
    points: [
      "Agriculture & Food Science / Nutrition",
      "Fine & Industrial Arts",
      "Computer Studies (including introductory programming)",
      "French as a living language",
    ],
  },
];

const CO_CURRICULARS: Array<{ icon: LucideIcon; name: string; text: string }> = [
  {
    icon: Trophy,
    name: "Football & Athletics",
    text: "Inter-class leagues, house colours and a termly sports day the whole school lives for.",
  },
  {
    icon: Music,
    name: "Music & Choir",
    text: "A school choir, percussion circle and an annual music and drama festival.",
  },
  {
    icon: Mic,
    name: "Debate & Public Speaking",
    text: "Weekly speaking circles that turn shy readers into confident voices.",
  },
  {
    icon: Palette,
    name: "Art & Craft",
    text: "Painting, beadwork, sculpture and the ever-popular school mural project.",
  },
  {
    icon: Laptop,
    name: "Computer Club",
    text: "Typing, safe internet use and introductory coding for Primary 4 and above.",
  },
  {
    icon: BookOpen,
    name: "Reading & Writing Club",
    text: "Book reviews, story writing and our own little school zine, published each term.",
  },
];

const FACILITIES: Array<{ image: string; alt: string; name: string; text: string }> = [
  {
    image: images.facilities.library,
    alt: "The school library with rows of bookshelves",
    name: "Library",
    text: "A cosy, well-stocked library with a dedicated reading hour for every class.",
  },
  {
    image: images.facilities.lab,
    alt: "The science laboratory with demonstration tables",
    name: "Science Laboratory",
    text: "Working physics, chemistry and biology labs where lessons become experiments.",
  },
  {
    image: images.facilities.ict,
    alt: "The ICT room with rows of modern computers",
    name: "ICT Room",
    text: "Modern computers with internet access and age-appropriate coding lessons.",
  },
  {
    image: images.facilities.playground,
    alt: "The open play yard in the middle of the school compound",
    name: "Playground",
    text: "A big, fenced, green playground for football, tag, dance and simply running.",
  },
];

const SCHOOL_DAY = [
  { time: "7:30am", text: "Arrival & morning assembly" },
  { time: "8:00am", text: "Morning lessons (4 periods)" },
  { time: "12:00pm", text: "Lunch & rest" },
  { time: "12:45pm", text: "Afternoon lessons (2 periods)" },
  { time: "3:30pm", text: "Clubs, sports & co-curricular activities" },
  { time: "4:00pm", text: "Dismissal" },
];

/** One alternating image/text program block. */
function ProgramBlock({ program, index }: { program: Program; index: number }) {
  const Icon = program.icon;
  const reversed = index % 2 === 1;
  return (
    <div
      id={program.name.toLowerCase()}
      className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <Reveal className={reversed ? "lg:order-2" : undefined}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lift">
          <Image
            src={program.image}
            alt={program.alt}
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
      <Reveal delay={100} className={reversed ? "lg:order-1" : undefined}>
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-serif text-3xl text-text">{program.name}</h2>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                {program.range}
              </p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-text-muted">{program.intro}</p>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-text">
            {program.focusTitle}
          </h3>
          <ul className="mt-3 space-y-2">
            {program.focus.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          {program.subjects && (
            <>
              <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-text">
                {program.subjectsTitle}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {program.subjects.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </>
          )}

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-text">
            {program.pointsTitle}
          </h3>
          <ul className="mt-3 space-y-2">
            {program.points.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="/admissions" variant={index === 2 ? "gold" : "green"}>
              Enquire / Apply
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function AcademicsPage() {
  return (
    <>
      <PageHeader
        crumb="Academics"
        title="Academics"
        description="How we teach at The Green Peace School — from the first phonics lesson to the final WAEC hall."
      />

      {/* Intro */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our teaching approach"
            title="Learn by doing, grow by being known"
            description="Across all three levels we keep three things constant: small classes where every voice is heard, teachers who assess to help (not to judge), and a calm, respectful environment where mistakes are part of learning — not the end of it."
          />
        </Container>
      </section>

      {/* Programs */}
      <section aria-label="Our programmes" className="pb-16 sm:pb-24">
        <Container className="space-y-16 sm:space-y-24">
          {PROGRAMS.map((program, i) => (
            <ProgramBlock key={program.name} program={program} index={i} />
          ))}
        </Container>
      </section>

      {/* Co-curricular activities */}
      <section
        aria-labelledby="coheading"
        className="bg-background-dark py-16 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="coheading"
            eyebrow="Beyond the classroom"
            title="Co-curricular activities"
            description="Every pupil takes part in at least one club or team each term — because character is built in practice, not just in lessons."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CO_CURRICULARS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.name} delay={(i % 3) * 80} className="h-full">
                  <Card className="h-full">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-text">{item.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.text}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Facilities */}
      <section aria-labelledby="facilities-heading" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            id="facilities-heading"
            eyebrow="Where it happens"
            title="Our facilities"
            description="Spaces designed for how children actually learn — by looking, touching, building and playing."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {FACILITIES.map((facility, i) => (
              <Reveal key={facility.name} delay={(i % 2) * 80} className="h-full">
                <Card hover={false} className="h-full p-0 overflow-hidden">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={facility.image}
                      alt={facility.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-text">{facility.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{facility.text}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Typical school day */}
      <section aria-labelledby="day-heading" className="bg-background-dark py-16 sm:py-24">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                id="day-heading"
                align="left"
                eyebrow="A day at our school"
                title="The rhythm of a school day"
                description="Calm, structured and predictable — the kind of day children can settle into and parents can plan around."
              />
              <p className="mt-6 rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed text-text-muted">
                <Clock className="mr-2 inline h-4 w-4 text-primary" aria-hidden="true" />
                Nursery pupils attend the morning session (8:30am – 12:30pm).
                Early pickup and late-care arrangements are available for
                working parents.
              </p>
            </div>
            <Reveal>
              <ol className="relative ml-3 space-y-8 border-l-2 border-primary-200 pl-8">
                {SCHOOL_DAY.map((item) => (
                  <li key={item.time} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white"
                    >
                      <Clock className="h-4 w-4 text-primary" />
                    </span>
                    <p className="pr-2 text-sm font-bold text-primary">{item.time}</p>
                    <p className="mt-0.5 leading-relaxed text-text-muted">{item.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Ready to join the Green Peace family?"
        text="Submit an inquiry and our admissions team will walk you through the whole process — visit, assessment and enrolment."
        ctaLabel="Start Your Application"
        ctaHref="/admissions"
      />
    </>
  );
}
