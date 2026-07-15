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
  title: "About CALDIM-DAS | Digitalization & Automation Solutions",
  description: "Learn about CALDIM-DAS (Digitalization & Automation Solutions), our precision engineering heritage, and how we deliver enterprise software development, AI solutions, and cloud platforms.",
  alternates: { canonical: "/about" },
};

const timeline = [
  { year: "2016", title: "Engineering Foundation", description: "CALDIM established its core engineering practice, delivering precision solutions to automotive and manufacturing clients." },
  { year: "2020", title: "Internal Digitalization", description: "Recognized the need for integrated digital tools to complement physical engineering and began developing internal software solutions." },
  { year: "2025", title: "CALDIM-DAS Founded", description: "CALDIM Digital & Automation Solutions (CALDIM-DAS) officially launched to bring our enterprise software suites to the global market." },
  { year: "2025+", title: "Enterprise Product Suite", description: "Scaling out our comprehensive suite of 10+ enterprise products under the DAS umbrella, including CALTIMS, CALRIMS, and AI integration platforms." },
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
                About CALDIM-DAS • Digitalization & Automation Solutions
              </div>
              <h1 className="text-4xl md:text-6xl font-900 text-[var(--navy)] tracking-tight mb-6 leading-tight">
                From Industrial Roots to<br />
                <span className="gradient-text">Digital Powerhouse</span>
              </h1>
              <p className="text-slate-900 font-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-slate-200 inline-block">
                <strong>CALDIM-DAS (Digitalization & Automation Solutions)</strong> is our dedicated Software, AI, and Cloud Platform division. Built on the strict discipline of our industrial engineering heritage, we architect enterprise-grade software that transforms complex operations.
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
                  <div className="badge badge-accent mb-4 font-700 inline-block">Our Story & The Birth of DAS</div>
                  <h2 className="text-3xl md:text-4xl font-900 text-[var(--navy)] mb-6 tracking-tight">
                    Built by Industrial Experts, Powered by CALDIM-DAS
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
                  <p className="text-slate-900 font-600 text-base md:text-lg leading-relaxed mb-5">
                    CALDIM began as a precision engineering firm serving the automotive, construction, and manufacturing industries. Our work demanded rigorous quality standards, deep technical expertise, and a commitment to getting things right — not just fast.
                  </p>
                  <p className="text-slate-900 font-600 text-base md:text-lg leading-relaxed mb-5">
                    As our industrial clients grew, we recognized a consistent pattern: advanced machinery and modern operations were still managed through disconnected spreadsheets, manual approvals, and siloed data. The gap between physical engineering excellence and digital operational capability was costing organizations time, money, and opportunities.
                  </p>
                  <p className="text-slate-900 font-600 text-base md:text-lg leading-relaxed bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                    To close that gap, we launched <strong className="text-[var(--navy)] font-800">CALDIM-DAS (Digitalization & Automation Solutions)</strong> — our dedicated enterprise software platform that applies the exact same engineering discipline to custom SaaS applications, AI workflows, and end-to-end operational automation.
                  </p>
                </div>
              </FadeUp>

              {/* Right Column: High-Contrast Dark Navy Stat Cards & Mission/Vision Cards */}
              <FadeUp delay={0.2} className="lg:col-span-5 flex flex-col justify-between gap-6 relative z-20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Founded", value: "2016" },
                    { label: "DAS Platform Launch", value: "2025" },
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
                  <h3 className="font-900 text-white text-xl mb-3">The CALDIM-DAS Mission</h3>
                  <p className="text-slate-100 font-600 text-sm md:text-base leading-relaxed">
                    To enable industrial and commercial enterprises to achieve operational excellence through purpose-built CALDIM-DAS software suites and AI automation that reflect real-world operational complexity.
                  </p>
                </div>

                <div className="bg-[var(--navy)] text-white rounded-3xl p-7 shadow-xl border border-white/10 relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                 <h3 className="font-900 text-white text-xl mb-3">The CALDIM-DAS Vision</h3>
                  <p className="text-slate-100 font-600 text-sm md:text-base leading-relaxed">
                    To be the globally trusted digital transformation and enterprise software partner (CALDIM-DAS) for engineering-led organizations across Construction & Fabrication, Manufacturing, Automotive, and Industrial sectors.
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
              <h2 className="text-section-title text-[var(--navy)] mb-4">CALDIM-DAS Evolution & Timeline</h2>
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
