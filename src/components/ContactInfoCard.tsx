import React from 'react';
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ContactInfoCardProps {
  onOpenMapModal?: () => void;
  onBookConsultationClick?: () => void;
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ 
  onOpenMapModal 
}) => {
  const { data } = useCMS();
  const office = data.officeInfo || {
    email: 'info@ip3-bd.org',
    phone: '+880 1914011329',
    hours: 'Sunday – Thursday, 09:00–18:00 (GMT+6)',
    googleMapsUrl: 'https://maps.google.com/?q=Zenith+Prime+House-39+Road-35A+Gulshan-2+Dhaka'
  };

  return (
    <div className="flex flex-col gap-4 font-sans">
      {/* Main Info Card */}
      <div className="bg-[#081220] rounded-2xl border border-slate-800 p-6 shadow-lg flex flex-col justify-between">
        <div>
          {/* Header Title */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-0.5 w-4 bg-[#ff7e67]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff7e67] font-semibold">
              Principal Office
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-100 mb-5">
            IP3 Consulting Limited — Dhaka
          </h3>

          {/* Contact Details List */}
          <div className="space-y-3.5 text-xs text-slate-300 mb-5">
            {/* Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#ff7e67] shrink-0 mt-0.5" />
              <span className="leading-relaxed text-slate-300">
                Zenith Prime, House-39, Road-35/A, Gulshan-2, Dhaka 1212, Bangladesh
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#2dd4bf] shrink-0" />
              <a
                href={`mailto:${office.email}`}
                className="text-[#2dd4bf] hover:underline font-mono"
              >
                {office.email}
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#ff7e67] shrink-0" />
              <a
                href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`}
                className="text-slate-300 hover:text-[#ff7e67] font-mono transition-colors"
              >
                {office.phone}
              </a>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-400">
                {office.hours || 'Sunday – Thursday, 09:00–18:00 (GMT+6)'}
              </span>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Map Card */}
        <div className="rounded-xl overflow-hidden border border-slate-700/80 relative bg-[#050a12] h-52 sm:h-60 w-full group">
          <iframe
            title="IP3 Consulting Location Map"
            src="https://maps.google.com/maps?q=Gulshan+2+Dhaka+1212+Bangladesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            loading="lazy"
          />

          {/* Floating Map Label Badge */}
          <div className="absolute top-2.5 left-2.5 right-2.5 bg-[#081220]/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-700/80 shadow-md flex items-center justify-between text-xs pointer-events-none">
            <div>
              <div className="font-bold text-slate-100 font-mono">Gulshan 2 Secretariat</div>
              <div className="text-[11px] text-slate-400">Dhaka 1212, Bangladesh</div>
            </div>
            <a
              href="https://maps.google.com/?q=Gulshan+2+Dhaka+1212"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-md hover:bg-slate-800 text-slate-300 hover:text-[#ff7e67] pointer-events-auto transition-colors"
              title="Open larger map"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee Note Card */}
      <div className="bg-[#081220]/60 rounded-xl border border-slate-800 p-4 text-[11px] sm:text-xs text-slate-400 leading-relaxed font-mono">
        We collect only the details needed to respond to your enquiry, store them in encrypted institutional repositories, and never share with third parties.
      </div>
    </div>
  );
};
