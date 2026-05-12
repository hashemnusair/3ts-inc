import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LeadershipPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream text-charcoal">
      <Navbar />
      <section className="w-full py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Leadership
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-charcoal mb-12">
            Senior Facilitator | Organizational Development Practitioner | Executive Coach
          </h1>
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/70 prose-strong:text-charcoal max-w-none">
            <p className="lead text-xl mb-8">
              Senior facilitator, OD practitioner, and executive coach with 18+ years of international experience convening diverse actors around complex, high-stakes challenges in politically sensitive environments.
            </p>
            <p className="mb-8">
              Authority gained in having led multi-country portfolios ($27M&ndash;$161M) across the Middle East, North Africa, Sub-Saharan Africa, and South/Southeast Asia, holding responsibility for outcomes and the stakeholders affected by them. British and Jordanian national; Arabic and French speaker; experienced working across the Arab world and other Muslim-majority and fragile contexts. On the World Bank&rsquo;s facilitator and trainer roster, with current engagement supporting the World Bank team assessing KSA&rsquo;s Vision 2030 progress and next steps. PMP-certified; Georgetown-trained in Organizational Development &amp; Change Leadership and Leadership Coaching.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Selected Impact</h3>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li><strong>World Bank facilitator &amp; trainer roster.</strong> Delivered leadership training to 18 cohorts of World Bank Team Leaders and Supervisors; cohorts recorded a 16% improvement in leadership scores. Currently supporting the World Bank GCC Prosperity team leading the Vision 2030 assessment and next steps.</li>
              <li><strong>Senior convening in politically sensitive contexts.</strong> As Chief of Party in Malaysia, led multi-stakeholder engagements at national government with Parliament, ministries, anti-corruption bodies, and civil society to identify leverage points for reform; as Chief of Party in Nigeria, convened state government, military, civil society, and community stakeholders around shared priorities for countering violent extremism.</li>
              <li><strong>Participatory strategic reviews.</strong> Designed and facilitated multi-day design sprints for USAID and IOM programs in Mozambique, Malaysia, and Nigeria, adapting strategy to evolving political and operational realities and improving staff ownership.</li>
              <li><strong>Inclusive leadership &amp; psychological safety.</strong> Facilitated psychological safety/inclusive leadership workshops for American Chemical Society; coached USAID Tajikistan staff leading organizational change for climate action; led environmental justice consultations between leadership and communities for EPA.</li>
              <li><strong>Executive coaching.</strong> ICF/Co-Active aligned; coached senior leaders on communication, influence, and strategic decision-making; prepared clients for public-speaking engagements to audiences of 2,000+.</li>
              <li><strong>Crisis &amp; continuity leadership.</strong> Led Afghanistan evacuation, post-attack operational continuity, and risk preparedness in Sudan and Haiti, maintaining decision discipline under pressure.</li>
            </ul>

            <h3 className="text-2xl mt-12 mb-6">Core Competencies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-8">
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitation &amp; Convening Design</li>
                <li>Multi-Stakeholder Dialogue in Politically Sensitive Contexts</li>
                <li>Strategic Reviews &amp; Planning Sprints</li>
                <li>Executive Coaching (ICF/Co-Active)</li>
                <li>Organizational Development &amp; Change Leadership</li>
                <li>Operating Model &amp; Process Redesign</li>
                <li>Governance, Decision Rights &amp; RACI</li>
                <li>Inclusive Leadership &amp; Psychological Safety</li>
              </ul>
              <ul className="list-disc pl-6 space-y-2">
                <li>Culture &amp; Engagement</li>
                <li>Adaptive &amp; Agile Programming</li>
                <li>Stakeholder &amp; Community Engagement</li>
                <li>Strategic Communications</li>
                <li>Risk &amp; Crisis Management</li>
                <li>M&amp;E and Learning Systems</li>
                <li>Cross-Cultural &amp; Functional Integration</li>
              </ul>
            </div>

            <h3 className="text-2xl mt-12 mb-6">Countries of Professional Experience</h3>
            <p className="mb-8">
              Afghanistan, Burkina Faso, Chad, Ghana, Iraq, Jordan, Kyrgyzstan, Libya, Malaysia, Mozambique, Niger, Nigeria, Pakistan, South Sudan, Syria, Tajikistan, Turkey, UK, USA, West Bank.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Languages</h3>
            <p className="mb-8">
              English (native); French (B1 proficiency); Arabic (B1 proficiency).
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
