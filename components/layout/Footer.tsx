import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { DataNodeDivider } from "../shared/DataNodeDivider";

const footerLinks = {
  Company: [
    { label: "About CALDIM", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Contact Us", href: "/contact" },
  ],
  Products: [
    { label: "CALTIMS", href: "/products/caltims" },
    { label: "CALRIMS", href: "/products/calrims" },
    { label: "CALBUY", href: "/products/calbuy" },
    { label: "CALTRACK", href: "/products/caltrack" },
    { label: "View All", href: "/products" },
  ],
  Services: [
    { label: "Enterprise Software", href: "/services#enterprise" },
    { label: "AI & ML Solutions", href: "/services#ai" },
    // { label: "Cloud Platforms", href: "/services#cloud" },
    { label: "ERP & Automation", href: "/services#erp" },
    { label: "Consulting", href: "/services#consulting" },
  ],
  Resources: [
    { label: "Book Consultation", href: "/contact" },
    { label: "Industries", href: "/industries" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--navy)] text-white" aria-label="Site footer">
      <DataNodeDivider />
      {/* Main footer */}
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-3 mb-6 font-display font-900 text-xl tracking-tight text-white group"
              aria-label="CALDIM home"
            >
              <div className="relative h-9 w-14 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-md group-hover:bg-blue-500/40 transition-all duration-500" />
                <img
                  src="/logo/image.png"
                  alt="CALDIM CD Logo"
                  className="relative h-8 w-auto max-w-none object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-white group-hover:text-blue-100 transition-colors">
                CALDIM{" "}
                <span className="font-400 text-white">
                  - DAS
                </span>
              </span>
            </Link>
            <p className="text-white/65 text-sm leading-relaxed max-w-xs mb-6">
              Engineering-grade digital solutions for modern enterprises. Digitalization and automation solutions built for the industrial age.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-2.5">
              <a href="mailto:support@caldimengg.in" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail size={14} className="text-[var(--accent-light)] shrink-0" />
                support@caldimengg.in
              </a>
              <a href="tel:+919952968294" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Phone size={14} className="text-[var(--accent-light)] shrink-0" />
                +91 9952968294
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin size={14} className="text-[var(--accent-light)] shrink-0 mt-0.5" />
                Chennai & Hosur, India
              </div>
            </div>
          </div>

          {/* Link columns */} 
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h3 className="text-white font-600 text-sm mb-4 uppercase tracking-wider">{category}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/55 text-sm hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} CALDIM Software Division. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/caldim-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CALDIM on LinkedIn"
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/caldim_engineering?igsh=a3NpaDZ0aGZlcnQ0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CALDIM on Instagram"
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
