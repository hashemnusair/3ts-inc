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
              I help individuals, teams, and organizations do the work on the inside to make the impact they want on the outside. I believe a better world is built decision by decision, room by room — when the right people are aligned around difficult truths and leave with the will to act on them. That belief is what connects everything I do, whether I&apos;m holding a politically sensitive room in the Gulf, coaching a senior leader through a career inflection point, or designing a program for a community that has been failed by previous attempts at change.
            </p>
            <p className="mb-8">
              My methods are grounded in an academic background spanning Neuroscience and Governance, and shaped by 20 years of leading teams in some of the world&apos;s most complex and consequential environments. I bring rigor, warmth, and a genuine commitment to fairness — not as a stated value but as a design principle embedded in how I work.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Professional Profile</h3>

            <div className="space-y-8 mt-6">
              <div className="border-l-2 border-gold/40 pl-6">
                <h4 className="text-xl font-serif text-charcoal mb-2">
                  Leader, Facilitator, Trainer &amp; Coach
                </h4>
                <p>
                  I engage, convene, and support diverse individuals, teams, and stakeholders to meet their challenges: creating the conditions for candid exchange, genuine alignment, and decisions that hold.
                </p>
              </div>

              <div className="border-l-2 border-gold/40 pl-6">
                <h4 className="text-xl font-serif text-charcoal mb-2">
                  Strategist, Implementer &amp; Change-maker
                </h4>
                <p>
                  I develop data-driven approaches to organizational and social change, drawing on systems and complexity thinking, human-centered design, and a both/and mindset that resists false choices.
                </p>
              </div>

              <div className="border-l-2 border-gold/40 pl-6">
                <h4 className="text-xl font-serif text-charcoal mb-2">
                  Program Leader &amp; Cultural Interlocutor
                </h4>
                <p>
                  I have lived and worked across 9 countries, establishing and leading multi-million-dollar programs in fragile and conflict-affected environments, and have worked across science, health, education, government, and the public and private sectors.
                </p>
              </div>
            </div>

            <h3 className="text-2xl mt-12 mb-6">Education &amp; Credentials</h3>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Certificate in Leadership Coaching — Georgetown University</li>
              <li>Certificate in Organizational Development &amp; Change Leadership — Georgetown University</li>
              <li>Project Management Professional (PMP) — PMI</li>
              <li>PgDip in Local Government Management — University of Warwick</li>
              <li>M.Sc. International Development: Governance &amp; Development — University of Birmingham</li>
              <li>M.S. Neuroscience — Emory University</li>
            </ul>

            <div className="mt-12 flex items-center gap-4">
              <Link
                href="/contact"
                className="bg-[#2A372C] text-white px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-[#1E2520] transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg"
              >
                Book Now
              </Link>
            </div>

            <blockquote className="mt-16 border-l-4 border-gold pl-6 italic text-xl text-charcoal/80 font-serif">
              &ldquo;I hope that together, our work contributes to a world where collaboration yields outcomes worthy of the people who need them most.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
