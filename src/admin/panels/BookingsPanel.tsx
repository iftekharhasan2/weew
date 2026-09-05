import React, { useCallback, useEffect, useState } from 'react';
import {
  CalendarCheck,
  RefreshCw,
  Loader2,
  AlertCircle,
  Video,
  MapPin,
  Mail,
  Phone,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { listBookings, cancelBooking } from '../../lib/contentStore';

interface Booking {
  _id: string;
  bookingId: string;
  clientName: string;
  clientEmail: string;
  phone: string;
  companyName?: string;
  serviceTitle?: string;
  date: string;
  timeSlot: string;
  meetingMode: 'virtual' | 'in_person';
  notes?: string;
  meetLink?: string;
  meetProvider?: string;
  status: string;
  createdAt: string;
}

export const BookingsPanel: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await listBookings();
      setBookings(items as unknown as Booking[]);
      setTotal(items.length);
    } catch (err: any) {
      setError(err?.message || 'Could not load bookings from the database.');
      setBookings([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const cancel = async (booking: Booking) => {
    if (!window.confirm(`Cancel ${booking.bookingId}?`)) return;
    setCancelling(booking.bookingId);
    try {
      await cancelBooking(booking.bookingId);
      setBookings((prev) =>
        prev.map((b) => (b.bookingId === booking.bookingId ? { ...b, status: 'cancelled' } : b))
      );
    } catch (err: any) {
      setError(err?.message || 'Could not cancel that booking.');
    } finally {
      setCancelling(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-100 flex items-center gap-2.5">
            <CalendarCheck className="w-5 h-5 text-[#ff7e67]" />
            Consultation Schedule
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {total} booking{total === 1 ? '' : 's'}, each with its Google Meet room.
          </p>
        </div>

        <button
          onClick={load}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-[#ff7e67]/10 border border-[#ff7e67]/40 text-[#ff7e67] text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && bookings.length === 0 && (
        <div className="py-16 flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin text-[#ff7e67]" />
          <span className="text-xs">Loading consultations…</span>
        </div>
      )}

      {!loading && bookings.length === 0 && !error && (
        <div className="py-16 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-2xl">
          No consultations booked yet.
        </div>
      )}

      <div className="grid gap-3 lg:grid-cols-2">
        {bookings.map((b) => (
          <div
            key={b._id}
            className={`bg-[#081220] border rounded-2xl p-4 transition-colors ${
              b.status === 'cancelled'
                ? 'border-slate-800 opacity-55'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <span className="font-mono text-xs font-bold text-[#ff7e67]">{b.bookingId}</span>
                <p className="text-sm font-semibold text-slate-100 mt-1 truncate">
                  {b.clientName}
                  {b.companyName ? (
                    <span className="font-normal text-slate-400"> · {b.companyName}</span>
                  ) : null}
                </p>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${
                  b.status === 'confirmed'
                    ? 'bg-[#ff7e67]/12 text-[#ff7e67] border-[#ff7e67]/30'
                    : 'bg-slate-800/50 text-slate-400 border-slate-800'
                }`}
              >
                {b.status}
              </span>
            </div>

            <div className="space-y-2 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
              <div className="flex justify-between gap-3">
                <span>Date &amp; time</span>
                <span className="font-semibold text-slate-100">
                  {b.date} @ {b.timeSlot}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Practice focus</span>
                <span className="font-semibold text-slate-100 truncate">{b.serviceTitle || '—'}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Mode</span>
                <span className="font-semibold text-[#ff7e67] flex items-center gap-1">
                  {b.meetingMode === 'virtual' ? (
                    <Video className="w-3 h-3" />
                  ) : (
                    <MapPin className="w-3 h-3" />
                  )}
                  {b.meetingMode === 'virtual' ? 'Virtual' : 'In-person'}
                </span>
              </div>
              <div className="flex items-center gap-3 pt-1 text-slate-500">
                <span className="flex items-center gap-1 truncate">
                  <Mail className="w-3 h-3 shrink-0" />
                  {b.clientEmail}
                </span>
                <span className="flex items-center gap-1 shrink-0">
                  <Phone className="w-3 h-3" />
                  {b.phone}
                </span>
              </div>
            </div>

            {b.notes && (
              <p className="mt-3 text-[11px] text-slate-400 leading-relaxed bg-[#050a12] p-3 rounded-xl border border-slate-800">
                {b.notes}
              </p>
            )}

            <div className="flex items-center gap-2 mt-3.5">
              {b.meetLink && (
                <a
                  href={b.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ff7e67] hover:bg-[#e06a54] text-slate-900 text-[11px] font-bold transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {b.meetProvider === 'google' ? 'Join Meet' : 'Calendar link'}
                </a>
              )}

              {b.status !== 'cancelled' && (
                <button
                  onClick={() => cancel(b)}
                  disabled={cancelling === b.bookingId}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#050a12] hover:bg-slate-800 text-slate-400 hover:text-[#ff7e67] text-[11px] font-bold border border-slate-800 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {cancelling === b.bookingId ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Trash2 className="w-3 h-3" />
                  )}
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPanel;
