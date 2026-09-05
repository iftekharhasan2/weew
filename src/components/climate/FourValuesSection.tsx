import { Star } from 'lucide-react';
import { FOUR_VALUES } from '../../data/climateData';

export default function FourValuesSection() {
  return (
    <section className="py-14 bg-[#0E1A22] border-b border-[#3C3F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {FOUR_VALUES.map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#12202B] border border-[#3C3F45] shadow-md flex flex-col justify-between group hover:border-[#EF715A]/60 transition-colors"
            >
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#F3F0E8] leading-snug group-hover:text-[#EF715A] transition-colors">
                  {val.title}
                </h4>

                <p className="text-xs text-[#AEB0AE] font-light leading-relaxed">
                  {val.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#3C3F45] flex items-center justify-between text-[11px] text-[#F59E0B] font-semibold">
                <span>Value Prop 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF715A]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
