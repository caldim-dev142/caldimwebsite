import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { CTASection } from "@/components/sections/CTA";
import { Target, Eye, Cog, Users, Award, Shield, TrendingUp, Lightbulb } from "lucide-react";
import { AnimatedWatermark } from "@/components/about/AnimatedWatermark";
import { AnimatedTimelineItem } from "@/components/about/AnimatedTimelineItem";
import { CoreValuesNodeMap } from "@/components/about/CoreValuesNodeMap";

export const metadata: Metadata = {
  title: "About CALDIM Software Division",
  description: "Learn about CALDIM's engineering heritage and how we expanded into enterprise software development, AI solutions, and digital transformation services.",
  alternates: { canonical: "/about" },
};

const timeline = [
  { year: "2016", title: "Engineering Foundation", description: "CALDIM established its core engineering practice, delivering precision solutions to automotive and manufacturing clients." },
  { year: "2020", title: "Internal Digitalization", description: "Recognized the need for integrated digital tools to complement physical engineering and began developing internal software solutions." },
  { year: "2025", title: "CALDIM-DAS Founded", description: "CALDIM Digital & Automation Solutions (Software Division) officially launched to bring our enterprise software to the global market." },
  { year: "2025+", title: "Enterprise Product Suite", description: "Scaling out our comprehensive suite of 10+ enterprise products, including CALTIMS, CALRIMS, and AI integration platforms." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative antialiased">
        
        {/* Scroll-Driven Animated Navy Blue CD Watermark */}
        <AnimatedWatermark />

        {/* Page Hero */}
        <section className="hero-bg py-32 pt-40 relative z-10">
          <div className="container-wide text-center">
            <FadeUp>
              <div className="badge badge-navy font-600 mb-4 inline-flex items-center gap-2">
                About CALDIM &amp; CALDIM-DAS
              </div>
              <h1 className="text-4xl md:text-6xl font-900 text-[var(--navy)] tracking-tight mb-6 leading-tight">
                The CALDIM Group &amp;<br />
                <span className="gradient-text">CALDIM-DAS Software Division</span>
              </h1>
              <p className="text-slate-900 font-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-slate-200 inline-block">
                <strong>CALDIM</strong> is a rapidly expanding industrial enterprise. <strong>CALDIM-DAS (Digitalization &amp; Automation Solutions)</strong> is our independent, high-growth Software Division focused on architecting enterprise SaaS, AI engines, and cloud automation suites.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Company Story & High Contrast Stat/Mission Cards */}
        <section className="section-padding relative z-10 border-t border-slate-200/50">
          <div className="container-wide">
            <div className="grid lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Column: Solid White Card to protect text from watermark */}
              <FadeUp className="lg:col-span-7 flex flex-col justify-between bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-300 relative z-20">
                <div>
                  <div className="badge badge-accent mb-4 font-700 inline-block">Our Story &amp; Evolution</div>
                  <h2 className="text-3xl md:text-4xl font-900 text-[var(--navy)] mb-6 tracking-tight">
                    From Industrial Growth to Software Excellence: The Birth of CALDIM-DAS
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
                  <p className="text-slate-900 font-600 text-base md:text-lg leading-relaxed mb-5">
                    <strong>The Growth of CALDIM:</strong> CALDIM originated as a high-precision engineering firm serving top-tier automotive and manufacturing sectors. Through uncompromising quality standards and technical mastery, the CALDIM parent group has continually expanded its global footprint across industrial sectors.
                  </p>
                  <p className="text-slate-900 font-600 text-base md:text-lg leading-relaxed mb-5">
                    <strong>The Digitalization Challenge:</strong> As CALDIM and our enterprise partners grew, we recognized a critical operational gap — advanced physical machinery and high-speed facilities were still managed via siloed spreadsheets, manual approvals, and disconnected legacy software.
                  </p>
                  <p className="text-slate-900 font-600 text-base md:text-lg leading-relaxed">
                    <strong>The Launch of CALDIM-DAS:</strong> To solve this bottleneck, CALDIM established <strong>CALDIM-DAS (Digitalization &amp; Automation Solutions)</strong> as our dedicated, premier <strong>Software &amp; AI Division</strong>. CALDIM-DAS combines our parent group&apos;s rigorous engineering discipline with modern software architecture to deliver state-of-the-art enterprise platforms, neural AI analytics, and cloud automation workflows.
                  </p>
                </div>
              </FadeUp>

              {/* Right Column: High-Contrast Dark Navy Stat Cards & Mission/Vision Cards */}
              <FadeUp delay={0.2} className="lg:col-span-5 flex flex-col justify-between gap-6 relative z-20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Founded", value: "2016s" },
                    { label: "Software Division", value: "2025" },
                    { label: "Products", value: "10+" },
                    { label: "Industries", value: "5+" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[var(--navy)] text-white rounded-2xl p-6 shadow-xl border border-blue-400/30 text-center flex flex-col items-center justify-center min-h-[110px]">
                      <div className="text-3xl md:text-4xl font-900 text-white mb-1 tracking-tight">{value}</div>
                      <div className="text-xs md:text-sm font-700 text-blue-200 uppercase tracking-widest">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-[var(--navy)] text-white rounded-3xl p-7 shadow-xl border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                  <h3 className="font-900 text-white text-xl mb-3">Our Mission</h3>
                  <p className="text-slate-100 font-600 text-sm md:text-base leading-relaxed">
                    To enable industrial enterprises to achieve operational excellence through purpose-built software solutions that reflect real-world engineering complexity.
                  </p>
                </div>

                <div className="bg-[var(--navy)] text-white rounded-3xl p-7 shadow-xl border border-white/10 relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                 <h3 className="font-900 text-white text-xl mb-3">Our Vision</h3>
                  <p className="text-slate-100 font-600 text-sm md:text-base leading-relaxed">
                    To be the trusted digital transformation partner for engineering-led organizations across Construction & Fabrication, Manufacturing, Automotive, and Industrial sectors globally.
                  </p>
                </div>
              </FadeUp>

            </div>
          </div>
        </section>

        {/* Interactive Radial Hub-and-Spoke Core Values Section */}
        <section className="relative z-10 border-t border-slate-200/50">
          <div className="container-wide">
            <CoreValuesNodeMap />
          </div>
        </section>

        {/* Timeline - Removed background color */}
        <section className="section-padding relative z-10 border-t border-slate-200/50">
          <div className="container-narrow">
            <FadeUp className="text-center mb-12">
              <div className="badge badge-accent font-600 mx-auto mb-4">Our Journey</div>
              <h2 className="text-section-title text-[var(--navy)] mb-4">CALDIM Timeline</h2>
            </FadeUp>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)]" />
              {timeline.map(({ year, title, description }, i) => (
                <AnimatedTimelineItem
                  key={year}
                  year={year}
                  title={title}
                  description={description}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="relative z-10 bg-white">
          <CTASection />
        </div>
      </main>
      <Footer />
    </>
  );
}
