import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import WhatWeDo from "@/components/WhatWeDo";
import WhyAndImpact from "@/components/WhyAndImpact";
import SelectedEngagements from "@/components/SelectedEngagements";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import type { WhyVariant } from "@/components/WhyChooseVariants";
import type { HeroVisualVariant } from "@/components/Hero";

export default function HomePage({
  whyVariant = "mosaic",
  heroVisualVariant = "constellation-image",
}: {
  whyVariant?: WhyVariant;
  heroVisualVariant?: HeroVisualVariant;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-cream text-charcoal">
      <Navbar transparentOnTop />
      <Hero visualVariant={heroVisualVariant} />
      <WhoWeWorkWith />
      <WhatWeDo />
      <WhyAndImpact whyVariant={whyVariant} />
      <SelectedEngagements />
      <AboutUs />
      <Testimonials />
      <Footer />
    </main>
  );
}
