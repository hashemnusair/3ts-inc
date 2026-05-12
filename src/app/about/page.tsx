import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream text-charcoal">
      <Navbar />
      <section className="w-full py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              About
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-charcoal mb-6">
            Building Together
          </h1>
          <h2 className="text-xl md:text-2xl font-serif text-charcoal/80 mb-12 italic">
            Hello, I&apos;m Shareef.
          </h2>

          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/70 prose-strong:text-charcoal max-w-none">
            <p className="lead text-xl mb-8">
              I support positive change by helping individuals, teams, and organizations do the work on the inside, to make the desired impact on the outside.
            </p>
            <p className="mb-8">
              Methods are grounded in an academic background in Neuroscience and Governance, and practical experience leading teams in some of the world&apos;s most challenging environments. With 20 years&apos; experience, my commitment is to fairness and inclusion; bringing purpose, appreciation, and enjoyment to work and clients.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Professional Profiles</h3>

            <div className="space-y-8 mt-6">
              <div className="border-l-2 border-gold/40 pl-6">
                <h4 className="text-xl font-serif text-charcoal mb-2">Leader</h4>
                <p>Facilitator, trainer &amp; coach who engages, brings together, motivates, and supports diverse teams, individuals, and stakeholders to meet their challenges.</p>
              </div>

              <div className="border-l-2 border-gold/40 pl-6">
                <h4 className="text-xl font-serif text-charcoal mb-2">Strategist</h4>
                <p>Implementer, problem solver &amp; change-maker who develops data-driven approaches to organizational and social change; utilizes systems &amp; complexity thinking, human-centered design, and a &ldquo;both/and&rdquo; mindset.</p>
              </div>

              <div className="border-l-2 border-gold/40 pl-6">
                <h4 className="text-xl font-serif text-charcoal mb-2">Manager</h4>
                <p>Program &amp; project manager, boundary spanner, cultural interlocutor; lived &amp; worked in 9 countries; worked in science, health, education, government, public and private sectors; led multi-million-dollar programs in complex and conflict environments.</p>
              </div>
            </div>

            <h3 className="text-2xl mt-12 mb-6">Facilitation Practice</h3>
            <p className="mb-4">
              Disciplined, calm, and highly engaged with content. I listen for underlying narratives, draw out connections across disparate viewpoints, and play back synthesis to help senior teams make informed choices. I provide a unique combination of respect, authority and humility: encouraging candid and provocative exchange, while maintaining cohesion and dignity.
            </p>
            <p className="mb-8">
              Convening scale includes strategy reviews, cross-sector planning, and reflection workshops with up to 150+ participants including senior government counterparts, World Bank task teams, donors, and program leadership.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Education &amp; Credentials</h3>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Certificate in Leadership Coaching &mdash; Georgetown University</li>
              <li>Certificate in Organizational Development &amp; Change Leadership &mdash; Georgetown University</li>
              <li>PgDip in Local Government Management &mdash; University of Warwick</li>
              <li>M.Sc. International Development: Governance &amp; Development &mdash; University of Birmingham</li>
              <li>M.S. Biomedical Science: Neuroscience &mdash; Emory University</li>
              <li>B.S. Biochemistry &mdash; University of Tampa</li>
              <li>Project Management Professional (PMP) &mdash; PMI</li>
            </ul>

            <p className="mb-8 text-charcoal/70 italic">
              If you don&apos;t see the specific skills you need, please visit my <Link href="/contact" className="text-gold hover:underline">contact page</Link> as I have a network of amazing individuals to whom I&apos;m happy to refer.
            </p>

            <div className="mt-12 flex items-center gap-4">
              <Link
                href="/contact"
                className="bg-[#2A372C] text-white px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-[#1E2520] transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg"
              >
                Book Now
              </Link>
            </div>

            <blockquote className="mt-16 border-l-4 border-gold pl-6 italic text-xl text-charcoal/80 font-serif">
              &ldquo;I hope that together we can contribute to a world where collaboration, cooperation, and kindness thrive.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
