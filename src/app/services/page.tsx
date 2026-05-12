import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const services = [
  {
    title: "Coaching",
    description:
      "We\u2019ll come together in partnership to help you navigate challenge, change or opportunity. Using thought-provoking, self-analytic and creative processes, we\u2019ll help you build on strengths, identify blind spots, and fulfill your potential. I use similar methods to prepare for public speaking and presentations to ensure that the best version of you shows up when you need them to.",
    cta: "Fulfill your potential",
    link: "/testimonials",
  },
  {
    title: "Facilitation, Teambuilding & Training",
    description:
      "I support diverse teams to come together to address their needs: fostering inclusion & \u201Cliberation\u201D from entrenched structures & thinking. I use tailored stakeholder engagement and an intercultural lens, sensitive to power dynamics, to help teams identify drivers and solutions, and I offer training on tools that empower leaders, contributors & teams to sustain positive change.",
    cta: "Make a better team",
    link: "/testimonials",
  },
  {
    title: "Organizational Development & Change Management",
    description:
      "I support organizations, teams, and the people in them to understand and strengthen leadership & management practices, team dynamics, and processes to be more effective. I use these same processes to help teams and organizations navigate and implement change. I use current organizational development concepts grounded in neuroscience and human behavior, and a consistent focus on practical implementable solutions.",
    cta: "Build a Stronger Org",
    link: "/testimonials",
  },
  {
    title: "Program & Project Management",
    description:
      "I support public and private organizations to design and implement programs that facilitate community-level social change. I draw on adaptive and agile project management techniques, human-centered approaches, and powerful engagement methods to define challenges in the narrative of those living them. I then work in partnership with those stakeholders to pragmatically implement towards shared outcomes.",
    cta: "Build a better world",
    link: "/testimonials",
  },
  {
    title: "Anti-Imperial / Anti-Colonial Thought & Practice",
    description:
      "Think of this as DEI revamped for an international context. While lauding the intent and progress that DEI efforts have brought, we must recognize that US/Euro-centric developed models can fall short in non-western or intercultural circumstances. I work with teams and organizations to understand the unique challenges of the current global context and help them consider their position and approaches to better support fairness and inclusion.",
    cta: "Let\u2019s be fair",
    link: "/testimonials",
  },
];

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream text-charcoal">
      <Navbar />
      <section className="w-full py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Services
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-charcoal mb-6">
            Tailored consulting services to build stronger teams and organizations
          </h1>
          <p className="text-charcoal/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-20">
            Explore a range of coaching and consulting services designed to meet your unique organizational needs, build resilience, and drive sustainable improvements in how you make an impact in the world.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-[#edebe4] pt-12 first:border-t-0 first:pt-0"
            >
              <div className="md:w-1/3 shrink-0">
                <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
                  0{index + 1}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-4 leading-tight">
                  {service.title}
                </h2>
              </div>
              <div className="md:w-2/3 flex flex-col">
                <p className="text-charcoal/70 text-base md:text-lg leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="group inline-flex flex-col self-start"
                >
                  <span className="text-gold text-sm font-semibold tracking-[0.15em] uppercase pb-2">
                    {service.cta} <span className="group-hover:ml-2 transition-all inline-block">&rarr;</span>
                  </span>
                  <div className="w-full h-px bg-gold/30 group-hover:bg-gold transition-colors"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
