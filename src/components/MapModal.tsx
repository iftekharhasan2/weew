import { useCMS } from '../context/CMSContext';
import React from 'react';
import { X, MapPin, ExternalLink, Navigation, Phone, Mail } from 'lucide-react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  const { data } = useCMS();
  const ip3OfficeInfo = data.officeInfo;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050a12]/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div 
        className="bg-[#081220] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#081220]/95 text-slate-100 p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ff7e67] text-slate-950 flex items-center justify-center shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-base leading-tight text-slate-100">
                IP3 Consulting Headquarters
              </h3>
              <p className="text-xs text-slate-400 font-light">
                {ip3OfficeInfo.address.building}, {ip3OfficeInfo.address.area}, {ip3OfficeInfo.address.city}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
          <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 relative bg-[#050a12] shadow-inner">
            <iframe
              title="IP3 Consulting Gulshan-2 Location"
              src={ip3OfficeInfo.googleMapsEmbedUrl}
              className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800 text-xs space-y-2">
              <span className="font-bold font-mono uppercase tracking-wider text-[#ff7e67] block text-[11px]">
                Full Street Address
              </span>
              <p className="text-slate-300 font-medium leading-relaxed">
                {ip3OfficeInfo.address.fullAddress}
              </p>
              <p className="text-slate-500 pt-1">
                Landmark: Near Gulshan-2 Circle & Diplomatic Zone
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800 text-xs space-y-2">
              <span className="font-bold font-mono uppercase tracking-wider text-[#ff7e67] block text-[11px]">
                Client Service Assistance
              </span>
              <p className="text-slate-300 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#ff7e67]" />
                <span className="font-mono">{ip3OfficeInfo.phone}</span>
              </p>
              <p className="text-slate-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#2dd4bf]" />
                <span className="font-mono">{ip3OfficeInfo.email}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#081220] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700 font-mono"
          >
            Close Map
          </button>

          <a
            href={ip3OfficeInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#ff7e67] hover:bg-[#ff694f] text-slate-950 text-xs font-mono font-bold shadow-lg shadow-[#ff7e67]/20 transition-all flex items-center gap-2"
          >
            <Navigation className="w-4 h-4 text-slate-950" />
            <span>Open Directions in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
};
