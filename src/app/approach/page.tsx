import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ApproachPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream text-charcoal">
      <Navbar />
      <section className="w-full py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Our Approach
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-charcoal mb-12">
            Discover a unique approach to building better partnerships, teams and organizations.
          </h1>
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/70 prose-strong:text-charcoal max-w-none">
            <p className="lead text-xl mb-8">
              Methods are grounded in an academic background in Neuroscience and Governance, and practical experience leading teams in some of the world&apos;s most challenging environments. Every engagement is built on a commitment to fairness, inclusion, and bringing purpose, appreciation, and enjoyment to work and clients.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Why Choose 3Ts?</h3>

            <div className="space-y-6 mt-6">
              {[
                {
                  title: "Tailored Solutions",
                  text: "There is no \u201Cone size fits all.\u201D I\u2019ll appreciatively enquire to tailor my engagement to meet your specific needs, challenges and goals.",
                },
                {
                  title: "Walking the Talk",
                  text: "Together, we\u2019ll model effective teamwork by setting shared goals, clarifying roles, and communicating openly.",
                },
                {
                  title: "One Team Mindset",
                  text: "We\u2019ll share responsibility for outcomes \u2013 successes and setbacks alike \u2013 because we will rise or fall together.",
                },
                {
                  title: "Inclusive and Accountable",
                  text: "We\u2019ll honor diverse perspectives, foster mutual accountability, and create space for every voice to be heard.",
                },
                {
                  title: "Creativity with Purpose",
                  text: "We\u2019ll embrace fun and creativity as important tools for innovation, connection, and sustainable progress.",
                },
                {
                  title: "Serious About Work, Light on Ego",
                  text: "We\u2019ll take our mission, our stakeholders and each other \u2013 but not ourselves \u2013 VERY seriously.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-gold text-sm font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-serif text-charcoal mb-1">{item.title}</h4>
                    <p className="text-charcoal/70">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-2xl mt-12 mb-6">My Methodology</h3>
            <p className="mb-4">
              I draw on systems &amp; complexity thinking, human-centered design, and a &ldquo;both/and&rdquo; mindset to develop data-driven approaches to organizational and social change. My facilitation practice is disciplined, calm, and highly engaged with content &mdash; I listen for underlying narratives, draw out connections across disparate viewpoints, and play back synthesis to help senior teams make informed choices.
            </p>
            <p className="mb-8">
              I provide a unique combination of respect, authority and humility: encouraging candid and provocative exchange, while maintaining cohesion and dignity. I work pragmatically with planning committees to translate insights into meaningful design and results for participants.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Stakeholder Breadth</h3>
            <p className="mb-8">
              I work with government ministries, parliaments, militaries, civil society, faith leaders, communities, multilateral donors, and private-sector counterparts. In-person, hybrid, and virtual; multi-day design sprints, retreats, strategic dialogues, and learning cohorts. English (native); French (B1); Arabic (B1).
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
