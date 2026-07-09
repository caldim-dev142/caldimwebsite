import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero";
import { TransformationCanvas } from "@/components/sections/TransformationCanvas";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { AboutSection } from "@/components/sections/About";
import { ServicesSection } from "@/components/sections/Services";
import { IndustriesSection } from "@/components/sections/Industries";
import { WhyCALDIM } from "@/components/sections/WhyCALDIM";
import { DevelopmentProcess } from "@/components/sections/DevelopmentProcess";
import { AiAgentsSection } from "@/components/sections/AiAgents";
import { ProductsSection } from "@/components/sections/Products";
import { TechnologiesSection } from "@/components/sections/Technologies";
import { CTASection } from "@/components/sections/CTA";
import { WolfNavButton } from "@/components/shared/WolfNavButton";

export const metadata: Metadata = {
  title: "CALDIM Software Division — Enterprise Digital Solutions",
  description:
    "CALDIM Software Division delivers enterprise software, AI solutions, cloud platforms, and digital transformation services for manufacturing, automotive, and industrial enterprises.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <TransformationCanvas />
        <TrustedBy />
        <AboutSection />
        <ServicesSection />
        <IndustriesSection />
        <WhyCALDIM />
        <DevelopmentProcess />
        <ProductsSection />
        <AiAgentsSection />
        <TechnologiesSection />
        <CTASection />
      </main>
      <Footer />
      <WolfNavButton />
    </>
  );
}

