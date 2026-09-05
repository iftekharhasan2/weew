import React, { useCallback, useEffect, useState } from 'react';
import {
  Inbox,
  RefreshCw,
  Loader2,
  AlertCircle,
  Mail,
  Building2,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { listLeads, updateLeadStatus } from '../../lib/contentStore';

const SOURCE_LABELS: Record<string, string> = {
  'contact-form': 'Contact Form',
  'lets-talk': "Let's Talk",
  'lets-collaborate': "Let's Collaborate",
  'get-started': 'Get Started',
};

const STATUSES = ['new', 'in_review', 'contacted', 'closed'] as const;

interface Lead {
  _id: string;
  id?: string;
  ticketId: string;
  source: string;
  inquiryType?: string;
  name?: string;
  email: string;
  organisation?: string;
  orgType?: string;
  focusArea?: string;
  topic?: string;
  outline?: string;
  timeline?: string;
  preferredDate?: string;
  status: string;
  createdAt: string;
}

export const LeadsPanel: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await listLeads(sourceFilter ? { source: sourceFilter } : undefined);
      setLeads(items as unknown as Lead[]);
      setTotal(items.length);
    } catch (err: any) {
      setError(err?.message || 'Could not load enquiries from the database.');
      setLeads([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [sourceFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  const updateStatus = async (lead: Lead, status: string) => {
    const previous = lead.status;
    // Optimistic: the row updates immediately, and reverts if the write fails.
    setLeads((prev) => prev.map((l) => (l._id === lead._id ? { ...l, status } : l)));
    try {
      await updateLeadStatus(lead._id, status);
    } catch (err: any) {
      setLeads((prev) => prev.map((l) => (l._id === lead._id ? { ...l, status: previous } : l)));
      setError(err?.message || 'Could not update that enquiry.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-100 flex items-center gap-2.5">
            <Inbox className="w-5 h-5 text-[#ff7e67]" />
            Enquiry Inbox
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {total} submission{total === 1 ? '' : 's'} captured from every public form.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 bg-[#050a12] border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-[#ff7e67] cursor-pointer"
          >
            <option value="">All sources</option>
            {Object.entries(SOURCE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <button
            onClick={load}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-[#ff7e67]/10 border border-[#ff7e67]/40 text-[#ff7e67] text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && leads.length === 0 && (
        <div className="py-16 flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin text-[#ff7e67]" />
          <span className="text-xs">Loading enquiries…</span>
        </div>
      )}

      {!loading && leads.length === 0 && !error && (
        <div className="py-16 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-2xl">
          No enquiries yet.
        </div>
      )}

      <div className="space-y-2.5">
        {leads.map((lead) => {
          const open = expanded === lead._id;
          return (
            <div
              key={lead._id || lead.id}
              className="bg-[#081220] border border-slate-800 rounded-2xl overflow-hidden transition-colors hover:border-slate-700"
            >
              <button
                onClick={() => setExpanded(open ? null : lead._id)}
                className="w-full flex items-start gap-4 p-4 text-left cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#ff7e67]">{lead.ticketId}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#050a12] border border-slate-800 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {SOURCE_LABELS[lead.source] || lead.source}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        lead.status === 'new'
                          ? 'bg-[#ff7e67]/12 text-[#ff7e67] border-[#ff7e67]/30'
                          : 'bg-slate-800/50 text-slate-400 border-slate-800'
                      }`}
                    >
                      {lead.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-100 truncate">
                    {lead.name || 'Unnamed contact'}
                    {lead.organisation ? (
                      <span className="font-normal text-slate-400"> · {lead.organisation}</span>
                    ) : null}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {lead.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(lead.createdAt).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 mt-1 transition-transform ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {open && (
                <div className="px-4 pb-4 border-t border-slate-800 pt-4 space-y-3">
                  {lead.outline && (
                    <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap bg-[#050a12] p-3.5 rounded-xl border border-slate-800">
                      {lead.outline}
                    </p>
                  )}

                  <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
                    {[
                      ['Organisation type', lead.orgType],
                      ['Focus area', lead.focusArea],
                      ['Topic', lead.topic],
                      ['Timeline', lead.timeline],
                      ['Preferred date', lead.preferredDate],
                      ['Inquiry type', lead.inquiryType],
                    ]
                      .filter(([, v]) => v)
                      .map(([label, value]) => (
                        <div key={label as string}>
                          <dt className="text-slate-500 uppercase tracking-wider font-semibold mb-0.5">
                            {label}
                          </dt>
                          <dd className="text-slate-100 font-medium">{value as string}</dd>
                        </div>
                      ))}
                  </dl>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mr-1">
                      Set status
                    </span>
                    {STATUSES.map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(lead, status)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                          lead.status === status
                            ? 'bg-[#ff7e67] text-slate-900 border-[#ff7e67]'
                            : 'bg-[#050a12] text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}

                    <a
                      href={`mailto:${lead.email}?subject=Re:%20${lead.ticketId}`}
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-[11px] font-bold border border-slate-700 transition-colors"
                    >
                      <Building2 className="w-3 h-3 text-[#ff7e67]" />
                      Reply by email
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadsPanel;
