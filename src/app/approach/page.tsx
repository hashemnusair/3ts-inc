import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseVariants from "@/components/WhyChooseVariants";

export default function ApproachPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream text-charcoal">
      <Navbar />
      <section className="w-full pt-32 pb-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              My Approach
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-charcoal mb-12">
            Discover a unique approach to building better partnerships, teams and organizations.
          </h1>
          <p className="text-xl leading-relaxed text-charcoal/70">
            My methods are grounded in an academic background spanning Neuroscience and Governance, and shaped by 20 years of leading teams in some of the world&apos;s most complex and consequential environments.
          </p>
        </div>
      </section>

      <WhyChooseVariants variant="mosaic" />

      <section className="w-full py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/70 prose-strong:text-charcoal max-w-none">
            <h2 className="text-3xl md:text-4xl mt-0 mb-8">My Methodology</h2>
            <p>
              I draw on systems &amp; complexity thinking, human-centered design, and a &ldquo;both/and&rdquo; mindset to develop data-driven approaches to individual, organizational and social change. I provide a unique combination of respect, authority and humility: encouraging candid and provocative exchange while maintaining cohesion and dignity and focus on goals.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Facilitation: The room is only as good as what it produces</h3>
            <p>
              Most gatherings generate energy without producing decisions. I design and hold the rooms where that changes: politically sensitive multi-stakeholder processes, leadership off-sites, cross-functional strategy sessions, and decision convenings where alignment is earned and owned, rather than assumed. My methods do not manage the conversation, but listen for what is underneath it: the underlying narrative, the unspoken resistance, the connection no one has yet vocalized. I play that back with precision, so senior teams can make informed choices and leave with decisions that hold under the stress of real implementation.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Coaching: Clarity about yourself is the precondition for everything</h3>
            <p>
              I work with senior leaders who are navigating complexity, carrying transformation mandates, or standing at a genuine inflection point in their careers. My approach is disciplined, warm, and direct: I hold the structure of our work firmly while creating the space and safety for real exploration. I listen for the person beneath the presenting problem and reflect it with precision: who you are in this situation, what grounds you, what gets in your way, and what a considered next step looks like from where you actually stand, not where the system expects you to be.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Program Design &amp; Management: A plan that cannot survive contact with reality is not a plan.</h3>
            <p>
              I design programs to produce real change in real conditions: for communities, institutions, and the people carrying the work inside them. Every design begins with honest diagnosis: what the data shows, what those closest to the issue actually experience, and where those two accounts diverge. That gap is my brief. I then build architecture around a shared, clearly articulated goal while keeping the path to it deliberately flexible — with governance, accountability, equity checkpoints, and guardrail agreements designed in from the start, not retrofitted when things go wrong. Those most affected by a problem are its most credible designers. Those carrying the work understand its friction best. Both principles shape everything I build.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Organizational Development &amp; Change Management: Announced change is not adopted change.</h3>
            <p>
              Organizational change fails most often not because the strategy was wrong but because the conditions for adoption were never built. I work with leaders and teams to close that gap: diagnosing where the real friction sits, designing interventions that address it, and building the governance, communication, and capability structures that make new ways of working stick. Whether the change is a structural redesign, a cultural shift, a new operating model, or the alignment of a leadership team that is no longer honest with itself, my work is to help organizations move from intention to embedded practice.
            </p>
          </div>

          <section className="mt-20 border border-gold/30 bg-[#151a16] p-8 md:p-12 text-cream">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Guiding Ethos
            </span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mt-6 mb-8">
              A Commitment to Fairness and Equity
            </h2>
            <div className="space-y-6 text-cream/78 text-base md:text-lg leading-relaxed">
              <p className="font-serif text-2xl text-cream">
                Inclusion is a global condition, not a Western export.
              </p>
              <p>
                The progress that DEI efforts have produced is real and worth defending. So is the recognition that models developed in US and European contexts don&apos;t travel well. Imposing them uncritically in international, intercultural, or non-Western settings can undermine the very fairness they intend to advance. I approach every engagement with the understanding that equity looks different depending on where power sits, whose voice has historically been excluded, and what local realities actually demand. This is not a separate service, it is the lens through which I design facilitation processes, coaching relationships, programs, and organizational change. Fairness is not a module: it is a precondition.
              </p>
              <p>
                I work with teams and organizations to understand the unique challenges of the current global context and help them consider their position and approaches to better support fairness and inclusion. This includes identifying the unique dynamics and cultural baselines of the places international actors work, articulating cross-cultural approaches to management challenges, staff and organizational development, strengthening non-Western organizational norms, and translating the value-proposition of these to Western donors.
              </p>
              <p>
                The international development and humanitarian sectors operate across vastly different cultural contexts. Yet many of the frameworks, tools, and approaches used to manage people, design programs, and measure success were developed in Western institutions and carry assumptions that may not translate effectively.
              </p>
              <p>
                This is not about rejecting those frameworks — it&apos;s about adapting them with cultural humility and contextual awareness. It&apos;s about recognizing that local leadership, indigenous knowledge, and non-Western organizational norms have immense value that is often overlooked. It&apos;s about ensuring that our approaches to fairness and inclusion are truly inclusive of the global contexts in which we work.
              </p>
              <p>
                This work requires honesty, humility, and a willingness to examine our own positions. It asks us to consider who sets the standards, whose knowledge counts, and what it truly means to be fair in a global context.
              </p>
            </div>
          </section>

          <section className="mt-20 border-t border-charcoal/10 pt-12">
            <h2 className="font-serif text-3xl text-charcoal mb-6">Stakeholder Breadth</h2>
            <p className="text-charcoal/70 text-lg leading-relaxed">
              I work with government ministries, parliaments, militaries, civil society, faith leaders, communities, multilateral donors, and private-sector counterparts. In-person, hybrid, and virtual; multi-day design sprints, retreats, strategic dialogues, and learning cohorts.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
