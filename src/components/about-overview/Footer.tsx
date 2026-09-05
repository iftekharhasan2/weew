import React from 'react';
import { Mail, MapPin, Globe, Phone, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer id="colophon" className="bg-[#0E1A22] text-[#AEB0AE] border-t border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EF715A] to-[#E05E47] flex items-center justify-center text-[#F3F0E8] font-bold text-xl font-serif shadow-md">
                IP³
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#F3F0E8] font-cardo leading-none">
                  IP3 Consulting Limited
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#AEB0AE] font-medium mt-0.5">
                  Institute for Public Policy &amp; Practice
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#AEB0AE] leading-relaxed max-w-md">
              A next-generation translational think tank &amp; strategic policy studio empowering governments, multilaterals, and organizations across the Global South.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#EF715A] font-mono">
              <Globe className="w-4 h-4" />
              <span>www.ip3-bd.org</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-[#F3F0E8] uppercase tracking-wider font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#whoweare" className="hover:text-[#EF715A] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#ourpurpose" className="hover:text-[#EF715A] transition-colors">
                  Our Vision &amp; Purpose
                </a>
              </li>
              <li>
                <a href="#wearedifferent" className="hover:text-[#EF715A] transition-colors">
                  What Sets Us Apart
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Headquarters */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-semibold text-[#F3F0E8] uppercase tracking-wider font-sans">
              Contact &amp; Inquiries
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#AEB0AE]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#EF715A] shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh — Serving Global South Partners</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#EF715A] shrink-0" />
                <span>info@ip3-bd.org</span>
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="px-4 py-2 bg-[#12202B] hover:bg-[#EF715A] text-[#F3F0E8] border border-[#3C3F45] hover:border-[#EF715A] text-xs font-medium rounded-md transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Initiate Engagement</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
