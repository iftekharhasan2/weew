import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  CalendarCheck,
  Database,
  Video,
  CircleCheck,
  CircleAlert,
  ExternalLink,
} from 'lucide-react';
import { getHealth, type HealthInfo } from '../../lib/contentStore';

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  hint?: string;
}> = ({ icon, label, value, hint }) => (
  <div className="bg-[#081220] border border-slate-800 rounded-2xl p-5">
    <div className="flex items-center gap-2.5 text-slate-400 mb-3">
      {icon}
      <span className="text-[11px] font-semibold uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-3xl font-extrabold font-serif text-slate-100 leading-none">{value}</p>
    {hint && <p className="text-[11px] text-slate-500 mt-2">{hint}</p>}
  </div>
);

export const OverviewPanel: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [leadCount, setLeadCount] = useState<number | null>(null);
  const [newLeads, setNewLeads] = useState<number | null>(null);
  const [bookingCount, setBookingCount] = useState<number | null>(null);
  const [upcoming, setUpcoming] = useState<number | null>(null);
  const [health, setHealth] = useState<HealthInfo | null>(null);
  const [mediaCount, setMediaCount] = useState<number | null>(null);

  // Counts come straight from MongoDB, so they are the same on every device.
  useEffect(() => {
    let alive = true;
    void (async () => {
      const info = await getHealth();
      if (!alive) return;
      setHealth(info);
      setLeadCount(info?.counts?.leads ?? null);
      setNewLeads(info?.counts?.newLeads ?? null);
      setBookingCount(info?.counts?.bookings ?? null);
      setUpcoming(info?.counts?.upcoming ?? null);
      setMediaCount(info?.counts?.media ?? null);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const dbOk = health?.dbPing === 'ok';
  const cdnOk = health?.cdn === 'Cloudinary';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-serif text-slate-100 flex items-center gap-2.5">
          <LayoutDashboard className="w-5 h-5 text-[#ff7e67]" />
          Overview
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Live figures from MongoDB.
        </p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Inbox className="w-4 h-4 text-[#ff7e67]" />}
          label="Total enquiries"
          value={leadCount ?? '—'}
          hint={newLeads !== null ? `${newLeads} awaiting triage` : undefined}
        />
        <StatCard
          icon={<CalendarCheck className="w-4 h-4 text-[#ff7e67]" />}
          label="Consultations"
          value={bookingCount ?? '—'}
          hint={upcoming !== null ? `${upcoming} upcoming` : undefined}
        />
        <StatCard
          icon={<Database className="w-4 h-4 text-[#ff7e67]" />}
          label="Content"
          value={health?.content ? `v${health.content.version}` : '—'}
          hint={
            health?.content
              ? `Published ${new Date(health.content.updatedAt).toLocaleDateString()}`
              : 'Nothing published yet'
          }
        />
        <StatCard
          icon={<Video className="w-4 h-4 text-[#ff7e67]" />}
          label="CDN assets"
          value={mediaCount ?? '—'}
          hint={cdnOk ? 'Images and video on Cloudinary' : 'CDN not configured'}
        />
      </div>

      <div className="grid gap-3.5 lg:grid-cols-2">
        <button
          onClick={() => onNavigate('leads')}
          className="text-left bg-[#081220] border border-slate-800 hover:border-[#ff7e67]/50 rounded-2xl p-5 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100">Review the enquiry inbox</h3>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#ff7e67] transition-colors" />
          </div>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Every contact form, Let's Talk, Let's Collaborate and Get Started submission,
            stored in MongoDB with triage statuses.
          </p>
        </button>

        <button
          onClick={() => onNavigate('bookings')}
          className="text-left bg-[#081220] border border-slate-800 hover:border-[#ff7e67]/50 rounded-2xl p-5 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100">Manage consultations</h3>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#ff7e67] transition-colors" />
          </div>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Join or cancel scheduled sessions. Cancelling also removes the Google Calendar event.
          </p>
        </button>
      </div>

      <div className="bg-[#081220] border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-slate-100 mb-3.5">System status</h3>
        <ul className="space-y-2.5 text-xs">
          {[
            ['Database', dbOk, health?.database || 'unreachable'],
            ['Media CDN', cdnOk, health?.cdn || 'unknown'],
            ['Admin auth', health?.adminAuth === 'configured', health?.adminAuth || 'unknown'],
          ].map(([label, ok, detail]) => (
            <li key={label as string} className="flex items-center gap-2.5">
              {ok ? (
                <CircleCheck className="w-4 h-4 text-[#ff7e67] shrink-0" />
              ) : (
                <CircleAlert className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span className="text-slate-100 font-medium">{label as string}</span>
              <span className="text-slate-500 ml-auto font-mono text-[11px]">{detail as string}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewPanel;
