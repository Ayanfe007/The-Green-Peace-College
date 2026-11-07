import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  ClipboardCheck,
  Eye,
  Handshake,
  Heart,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";

import { CTABanner } from "@/components/ui/CTABanner";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story, vision, values and people behind The Green Peace School, from our founding in 2010 to today.",
  alternates: { canonical: canonicalUrl("/about") },
};

/* The Founder's name, message and portrait are the real ones.
   TODO: replace the principal's name, message and portrait.
   Portraits live in /public/images (proprietor.jpg, principal.jpg,
   4:5 or square). Team names below are placeholders (TODO markers). */

const VALUES: Array<{ icon: LucideIcon; name: string; text: string }> = [
  {
    icon: ShieldCheck,
    name: "Integrity",
    text: "We do what is right, even when no one is watching.",
  },
  {
    icon: Award,
    name: "Excellence",
    text: "We set high standards and celebrate real effort every day.",
  },
  {
    icon: Heart,
    name: "Respect",
    text: "We treat every child, parent and colleague with dignity.",
  },
  {
    icon: ClipboardCheck,
    name: "Responsibility",
    text: "We own our choices, our words and our community.",
  },
  {
    icon: Handshake,
    name: "Service",
    text: "We serve each other and our society with a generous spirit.",
  },
];

const TEAM: Array<{ initials: string; name: string; role: string; line: string }> = [
  {
    initials: "BA",
    name: "Mrs. Bisi Adeyemi", // TODO: replace
    role: "Nursery Head",
    line: "Twelve years shaping little minds through play.",
  },
  {
    initials: "TB",
    name: "Mr. Tunde Bakare", // TODO: replace
    role: "Primary Head",
    line: "Believes a strong reading habit changes a life.",
  },
  {
    initials: "NO",
    name: "Mrs. Ngozi Obi", // TODO: replace
    role: "Secondary Head",
    line: "Former chemistry teacher and WAEC-results whisperer.",
  },
  {
    initials: "EO",
    name: "Mr. Emmanuel Osei", // TODO: replace
    role: "Bursar",
    line: "Keeps the school running smoothly, fee statements included.",
  },
  {
    initials: "DA",
    name: "Mr. Dayo Adeleke", // TODO: replace
    role: "Technical Director",
    line: "Keeps the school's technology and learning systems ahead of the classroom.",
  },
  {
    initials: "KP",
    name: "Mrs. Kemi Peters", // TODO: replace
    role: "Public Relations Officer",
    line: "The friendly voice that keeps the school and its families connected.",
  },
];

/** Alternating left/right person message block (stacks on mobile). */
function PersonMessage({
  image,
  alt,
  eyebrow,
  name,
  role,
  paragraphs,
  signature,
  reverse = false,
  headingId,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  name: string;
  role: string;
  paragraphs: string[];
  signature: string;
  reverse?: boolean;
  /** id for the name heading (wired to the section's aria-labelledby). */
  headingId: string;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={reverse ? "lg:order-2" : undefined}>
        <div className="relative mx-auto w-full max-w-md">
          <Image
            src={image}
            alt={alt}
            width={900}
            height={1125}
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 80vw, 100vw"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lift"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-3xl border-2 border-accent/60"
          />
        </div>
      </Reveal>
      <Reveal delay={100} className={reverse ? "lg:order-1" : undefined}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-deep">
            {eyebrow}
          </p>
          <h2 id={headingId} className="mt-2 font-serif text-3xl text-text">
            {name}
          </h2>
          <p className="mt-1 text-sm font-semibold text-primary">{role}</p>
          {paragraphs.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-text-muted">
              {p}
            </p>
          ))}
          <p className="mt-5 font-serif text-2xl italic text-primary">
            {signature}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="About Us"
        description="The story, values and people behind The Green Peace School."
      />

      {/* ------------------------------- Our story ------------------------------- */}
      <section aria-labelledby="story-heading" className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Image
              src={images.aboutStory}
              alt="The colourful classroom courtyard of The Green Peace Schools, Ifo"
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="aspect-[3/2] w-full rounded-3xl object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={100}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-deep">
                Our story
              </p>
              <h2
                id="story-heading"
                className="mt-2 font-serif text-3xl leading-tight text-text sm:text-4xl"
              >
                It began in 2010 with a vision, not just a building.
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                In {siteConfig.foundedYear}, {siteConfig.name} was born, not
                just as a building, but as a vision: a standard where every
                child gets the best of education.
              </p>
              <p className="mt-3 leading-relaxed text-text-muted">
                The name carries its promise. Green means life, growth and a
                brighter future. Peace is the belief that a child learns
                best in an environment of natural peace, love and calm. From
                the very beginning, the mission was clear: every child
                deserves quality, every child deserves to be seen, and every
                child deserves a chance to shine.
              </p>
              <p className="mt-3 leading-relaxed text-text-muted">
                The journey was not easy. The school went through difficult
                times, when the road was rough and the future looked
                uncertain, but it never gave up. It kept praying, kept
                working, and kept believing in the children God gave it.
              </p>
              <p className="mt-3 leading-relaxed text-text-muted">
                Today the school is fully approved by the Government and
                approved for WAEC and NECO examinations. Its students write
                their exams with confidence in a school that started with
                just a dream. It has grown, it has become stronger, and it
                is still growing.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* --------------------------- Vision & mission --------------------------- */}
      <section aria-labelledby="vm-heading" className="bg-background-dark py-16 sm:py-24">
        <Container>
          <SectionHeading
            id="vm-heading"
            eyebrow="Where we are going"
            title="Our vision & mission"
          />
          <p className="mt-6 text-center font-serif text-lg italic text-primary">
            “Knowledge, Development &amp; Prosperity”
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <Card className="h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-text">Our Vision</h3>
                <p className="mt-2 leading-relaxed text-text-muted">
                  To be the most trusted Nursery, Primary and Secondary
                  school in {siteConfig.address.region}, known not only for
                  excellent results, but for raising kind, confident and
                  responsible citizens.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <Card className="h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                  <Target className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-text">Our Mission</h3>
                <p className="mt-2 leading-relaxed text-text-muted">
                  To provide a safe, warm and stimulating environment where
                  every child can learn, grow and thrive, academically,
                  morally and socially, in partnership with caring
                  parents.
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------ Core values ------------------------------ */}
      <section aria-labelledby="values-heading" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            id="values-heading"
            eyebrow="What we stand for"
            title="Our core values"
            description="Five words we teach, model and measure ourselves against every single day."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.name} delay={i * 60} className="h-full">
                  <Card className="h-full text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-semibold text-text">{value.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {value.text}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---------------------- Message from the Proprietor ---------------------- */}
      <section aria-labelledby="proprietor-heading" className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            <PersonMessage
              image={images.proprietor}
              alt="Portrait of Mr. Abatti Olalekan Ahmed, Founder of The Green Peace School"
              eyebrow="A message from our Founder"
              name="Mr. Abatti Olalekan Ahmed"
              role="Founder & Proprietor"
              signature="Mr. Abatti Olalekan Ahmed"
              headingId="proprietor-heading"
              paragraphs={[
                "In 2010, The Green Peace School was born, not just as a building, but as a vision: a standard where every child gets the best of education. We chose the name GREEN because green means life, growth and a brighter future. We chose PEACE because we believe a child learns best in an environment of natural peace, love and calm.",
                "From the very beginning, our mission was clear. Every child deserves quality. Every child deserves to be seen. Every child deserves a chance to shine. The journey was not easy. We went through difficult times, when it was hard to keep going, when the road was rough and the future looked uncertain. But we did not give up. We kept praying, we kept working, and we kept believing in the children God gave us.",
                "And today, we can only lift our hands and say: thank God for His mercy. From that small beginning in 2010, the school is now fully approved by the Government and approved for WAEC and NECO examinations. Our students write their exams with confidence in a school that started with just a dream.",
                "To every parent who trusted us from the beginning, to every teacher who stood with us through the storms, and to every student who is part of this family, thank you. This testimony belongs to all of us.",
                "The Green Peace School is not just a school. It is a place where green stands for a brighter future, and peace stands for natural peace and growth. We started with faith. We survived by grace. And by God's mercy, the best is yet to come.",
              ]}
            />
          </div>
        </Container>
      </section>

      {/* ----------------------- Message from the Principal ----------------------- */}
      <section aria-labelledby="principal-heading" className="bg-background-dark py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            <PersonMessage
              reverse
              image={images.principal}
              alt="Portrait of the school's principal"
              eyebrow="A message from our Principal"
              name="Mr. Chinedu Eze" // TODO: replace
              role="Principal"
              signature="Chinedu Eze" // TODO: replace
              headingId="principal-heading"
              paragraphs={[
                "Good morning, and welcome. At The Green Peace School our classrooms are alive: children reading aloud, asking “why”, building, singing and solving problems together. That energy is not an accident. It comes from a teaching method that respects how children actually learn: by doing, by playing, and by being challenged kindly.",
                "In Nursery we follow each child's developmental milestones through purposeful play. In Primary we build unshakable foundations in literacy and numeracy, with continuous, low-pressure assessment, so no child is ever surprised by a report card. In Secondary we prepare our students thoroughly for BECE, WAEC and NECO, while our career guidance office helps them see what lies beyond the classroom.",
                "Our results are good, but I would rather be remembered for the kind of person our students become. Come and see us. You will meet a team of educators who love exactly what they do.",
              ]}
            />
          </div>
        </Container>
      </section>

      {/* ------------------------------ Meet our team ------------------------------ */}
      <section aria-labelledby="team-heading" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            id="team-heading"
            eyebrow="The people"
            title="Meet our team"
            description="A small slice of the people who make the school feel like family."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 60} className="h-full">
                <Card className="h-full text-center">
                  {/* Placeholder avatar — swap for photos when supplied. */}
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 font-serif text-2xl text-primary-700"
                  >
                    {member.initials}
                  </span>
                  <h3 className="mt-4 font-semibold text-text">{member.name}</h3>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {member.line}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Come and see it for yourself"
        text="The best introduction is a visit. Book a tour, meet the teachers and watch a real school day in full swing."
        ctaLabel="Plan Your Visit"
        ctaHref="/contact"
      />
    </>
  );
}
