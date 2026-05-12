import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PerspectivesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream text-charcoal">
      <Navbar />
      <section className="w-full py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Perspectives
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-charcoal mb-12">
            Anti-Imperial / Anti-Colonial Thought &amp; Practice
          </h1>
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/70 prose-strong:text-charcoal max-w-none">
            <p className="lead text-xl mb-8">
              Think of this as DEI revamped for an international context. While lauding the intent and progress that DEI efforts have brought, we must recognize that US/Euro-centric developed models can fall short in non-western or intercultural circumstances.
            </p>

            <p className="mb-8">
              I work with teams and organizations to understand the unique challenges of the current global context and help them consider their position and approaches to better support fairness and inclusion. This includes identifying the unique dynamics and cultural baselines of the places international actors work, articulating cross-cultural approaches to management challenges, staff and organizational development, strengthening non-Western organizational norms, and translating the value-proposition of these to Western donors.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Why This Matters</h3>
            <p className="mb-4">
              The international development and humanitarian sectors operate across vastly different cultural contexts. Yet many of the frameworks, tools, and approaches used to manage people, design programs, and measure success were developed in Western institutions and carry assumptions that may not translate effectively.
            </p>
            <p className="mb-8">
              This is not about rejecting those frameworks &mdash; it&rsquo;s about adapting them with cultural humility and contextual awareness. It&rsquo;s about recognizing that local leadership, indigenous knowledge, and non-Western organizational norms have immense value that is often overlooked. It&rsquo;s about ensuring that our approaches to fairness and inclusion are truly inclusive of the global contexts in which we work.
            </p>

            <h3 className="text-2xl mt-12 mb-6">How It Works in Practice</h3>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li><strong>Identifying unique dynamics and cultural baselines</strong> of the places international actors work, so that strategies are grounded in reality rather than assumption.</li>
              <li><strong>Articulating cross-cultural approaches</strong> to management challenges, staff development, and organizational growth that honor local context.</li>
              <li><strong>Strengthening non-Western organizational norms</strong> and elevating the practices and perspectives that local actors bring.</li>
              <li><strong>Translating the value-proposition</strong> of these approaches to Western donors and stakeholders, building bridges rather than barriers.</li>
            </ul>

            <h3 className="text-2xl mt-12 mb-6">The Invitation</h3>
            <p className="mb-8">
              This work requires honesty, humility, and a willingness to examine our own positions. It asks us to consider who sets the standards, whose knowledge counts, and what it truly means to be fair in a global context. I invite teams and organizations ready to engage with these questions to reach out.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
