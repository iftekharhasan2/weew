import { useCMS } from '../context/CMSContext';
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Video, MapPin, User, Mail, Building2, Phone, CheckCircle2, RefreshCw, AlertCircle, Sparkles, Download, CalendarCheck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { ConsultationBookingData, MeetingMode } from '../types';
import { getAvailability, saveBooking } from '../lib/contentStore';

interface ConsultationSchedulerProps {
  onSuccessReturn?: () => void;
}

export const ConsultationScheduler: React.FC<ConsultationSchedulerProps> = ({ onSuccessReturn }) => {
  const { data } = useCMS();
  const consultingServices = data.services;
  const availableTimeSlots = data.timeSlots;
  const ip3OfficeInfo = data.officeInfo;
  // Default date to tomorrow
  const getTomorrowDateStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [booking, setBooking] = useState<ConsultationBookingData>({
    clientName: '',
    clientEmail: '',
    phone: '',
    companyName: '',
    serviceCategory: 'strategic-advisory',
    date: getTomorrowDateStr(),
    timeSlot: availableTimeSlots[1], // 11:00 AM
    meetingMode: 'virtual',
    notes: ''
  });

  // Slots already reserved by other clients, read live from the database.
  const [takenSlots, setTakenSlots] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    timestamp: string;
    meetLink?: string;
    calendarHtmlLink?: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedService = consultingServices.find(s => s.id === booking.serviceCategory) || consultingServices[0];

  // Whenever the date changes, ask the database which slots are already booked
  // so two clients cannot be shown the same free slot.
  useEffect(() => {
    let alive = true;
    if (!booking.date) return;

    void getAvailability(booking.date).then((taken) => {
      if (!alive) return;
      setTakenSlots(taken);
      // If the currently selected slot has just gone, move to the first free one.
      setBooking((prev) =>
        taken.includes(prev.timeSlot)
          ? { ...prev, timeSlot: availableTimeSlots.find((s) => !taken.includes(s)) || prev.timeSlot }
          : prev
      );
    });

    return () => {
      alive = false;
    };
  }, [booking.date, availableTimeSlots]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleModeChange = (mode: MeetingMode) => {
    setBooking(prev => ({ ...prev, meetingMode: mode }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!booking.clientName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!booking.clientEmail.trim() || !booking.clientEmail.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    if (!booking.phone.trim()) {
      setErrorMsg('Please provide a direct phone number for session confirmation.');
      return;
    }
    if (!booking.date) {
      setErrorMsg('Please select a preferred consultation date.');
      return;
    }

    setIsSubmitting(true);

    const res = await saveBooking({
      clientName: booking.clientName.trim(),
      clientEmail: booking.clientEmail.trim(),
      phone: booking.phone.trim(),
      companyName: booking.companyName.trim(),
      serviceCategory: booking.serviceCategory,
      serviceTitle: selectedService.title,
      date: booking.date,
      timeSlot: booking.timeSlot,
      meetingMode: booking.meetingMode,
      notes: booking.notes || ''
    });

    setIsSubmitting(false);

    if (!res.ok) {
      setErrorMsg(res.error || 'We could not reserve that session. Please try again.');
      // Someone may have taken the slot mid-form; refresh what is still free.
      setTakenSlots(await getAvailability(booking.date));
      return;
    }

    setConfirmedBooking({
      id: res.bookingId,
      timestamp: res.timestamp,
      meetLink: res.meetLink || '',
      calendarHtmlLink: res.meetLink || ''
    });
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//IP3 Consulting//Executive Advisory Session//EN
BEGIN:VEVENT
SUMMARY:IP3 Consultation - ${selectedService.title}
DESCRIPTION:1-on-1 Strategy Session with IP3 Consulting Partner.\\nClient: ${booking.clientName} (${booking.companyName})\\nMode: ${booking.meetingMode === 'virtual' ? 'Virtual Video Link' : 'In-Person @ Zenith Prime Gulshan-2'}\\nNotes: ${booking.notes || 'None'}\\nBooking Ref: ${confirmedBooking.id}${confirmedBooking.meetLink ? `\\nGoogle Meet: ${confirmedBooking.meetLink}` : ''}
LOCATION:${booking.meetingMode === 'in_person' ? ip3OfficeInfo.address.fullAddress : (confirmedBooking.meetLink || 'Google Meet Video Link')}
URL:${confirmedBooking.meetLink || ''}
UID:${confirmedBooking.id}@ip3-consulting
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `IP3_Consultation_${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setBooking({
      clientName: '',
      clientEmail: '',
      phone: '',
      companyName: '',
      serviceCategory: 'strategic-advisory',
      date: getTomorrowDateStr(),
      timeSlot: availableTimeSlots[1],
      meetingMode: 'virtual',
      notes: ''
    });
    setErrorMsg(null);
  };

  return (
    <div className="bg-[#081220] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-full font-sans">
      <div className="bg-[#081220]/95 text-slate-100 p-6 sm:p-8 relative overflow-hidden border-b border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff7e67]/10 text-[#ff7e67] text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-[#ff7e67]/30">
            <CalendarCheck className="w-3.5 h-3.5 text-[#ff7e67]" />
            Executive Advisory Desk
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 mb-2">
            Schedule a Consultation
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
            Reserve a 1-on-1 strategy session with our senior partners and domain specialists to discuss your enterprise requirements.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        {confirmedBooking ? (
          <div className="my-auto py-6 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#ff7e67]/15 text-[#ff7e67] flex items-center justify-center mx-auto mb-4 shadow-sm border border-[#ff7e67]/30">
              <CheckCircle2 className="w-10 h-10 text-[#ff7e67]" />
            </div>

            <span className="px-3 py-1 rounded-full bg-[#ff7e67]/10 text-[#ff7e67] text-xs font-mono font-bold uppercase tracking-wider mb-2 inline-block border border-[#ff7e67]/30">
              Consultation Confirmed
            </span>

            <h3 className="text-2xl font-bold text-slate-100 mb-2">
              Appointment Booked, {booking.clientName}!
            </h3>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              A calendar invite and confirmation slip have been reserved for your session on <span className="font-bold text-slate-100">{booking.date} at {booking.timeSlot}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-[#050a12] border border-slate-800 text-left text-xs space-y-2.5 mb-6">
              <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2">
                <span>Booking Reference:</span>
                <span className="font-mono font-bold text-[#ff7e67] text-sm">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Practice Focus:</span>
                <span className="font-bold text-slate-100">{selectedService.title}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Meeting Mode:</span>
                <span className="font-bold text-[#ff7e67] flex items-center gap-1">
                  {booking.meetingMode === 'virtual' ? <Video className="w-3.5 h-3.5 text-[#ff7e67]" /> : <MapPin className="w-3.5 h-3.5 text-[#ff7e67]" />}
                  {booking.meetingMode === 'virtual' ? 'Virtual (Google Meet)' : 'In-Person (Zenith Prime)'}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Date & Time:</span>
                <span className="font-medium text-slate-200">{booking.date} @ {booking.timeSlot}</span>
              </div>
              {booking.meetingMode === 'virtual' && confirmedBooking.meetLink && (
                <div className="flex justify-between items-center gap-3 text-slate-400 border-t border-slate-800 pt-2.5">
                  <span>Google Meet:</span>
                  <a
                    href={confirmedBooking.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#ff7e67] hover:text-[#ff694f] underline underline-offset-2 truncate max-w-[60%] text-right"
                  >
                    Join video session
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#ff7e67] hover:bg-[#ff694f] text-slate-950 font-mono text-xs font-bold shadow-lg shadow-[#ff7e67]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={() => {
                  handleReset();
                  if (onSuccessReturn) onSuccessReturn();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700 font-mono"
              >
                <ArrowLeft className="w-4 h-4 text-[#ff7e67]" />
                <span>Return to Contact Form</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Meeting Mode Toggle */}
            <div>
              <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-2">
                Select Meeting Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleModeChange('virtual')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    booking.meetingMode === 'virtual'
                      ? 'border-[#ff7e67] bg-[#ff7e67]/10 ring-2 ring-[#ff7e67]/20'
                      : 'border-slate-800 hover:border-slate-700 bg-[#050a12]'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${booking.meetingMode === 'virtual' ? 'bg-[#ff7e67] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-100 block">Virtual Session</span>
                    <span className="text-[10px] text-slate-400">Google Meet / Teams</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeChange('in_person')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    booking.meetingMode === 'in_person'
                      ? 'border-[#ff7e67] bg-[#ff7e67]/10 ring-2 ring-[#ff7e67]/20'
                      : 'border-slate-800 hover:border-slate-700 bg-[#050a12]'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${booking.meetingMode === 'in_person' ? 'bg-[#ff7e67] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-100 block">In-Person Suite</span>
                    <span className="text-[10px] text-slate-400">Zenith Prime, Gulshan-2</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Advisory Practice Area */}
            <div>
              <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff7e67]" />
                Select Advisory Practice Area
              </label>
              <select
                name="serviceCategory"
                value={booking.serviceCategory}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] font-medium cursor-pointer"
              >
                {consultingServices.map(service => (
                  <option key={service.id} value={service.id} className="bg-[#081220] text-slate-100">
                    {service.title} ({service.estimatedDuration})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                {selectedService.description}
              </p>
            </div>

            {/* Date & Time Slot Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#ff7e67]" />
                  Preferred Date <span className="text-[#ff7e67]">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={booking.date}
                  onChange={handleChange}
                  min={getTomorrowDateStr()}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#ff7e67]" />
                  Time Slot (GMT+6)
                </label>
                <select
                  name="timeSlot"
                  value={booking.timeSlot}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] cursor-pointer font-medium"
                >
                  {availableTimeSlots.map(slot => (
                    <option
                      key={slot}
                      value={slot}
                      disabled={takenSlots.includes(slot)}
                      className="bg-[#081220] text-slate-100"
                    >
                      {slot}{takenSlots.includes(slot) ? ' — reserved' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Client Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#ff7e67]" />
                  Full Name <span className="text-[#ff7e67]">*</span>
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={booking.clientName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Sharmin Chowdhury"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] placeholder:text-slate-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#ff7e67]" />
                  Business Email <span className="text-[#ff7e67]">*</span>
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={booking.clientEmail}
                  onChange={handleChange}
                  placeholder="e.g. s.chowdhury@org.gov"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#ff7e67]" />
                  Phone Number <span className="text-[#ff7e67]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={booking.phone}
                  onChange={handleChange}
                  placeholder="+880 1914-011329"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] placeholder:text-slate-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#ff7e67]" />
                  Company / Organization
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={booking.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Ministry / Institutional Entity"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Session Objectives & Agenda Notes <span className="text-slate-600 font-normal">(Optional)</span>
              </label>
              <textarea
                name="notes"
                rows={3}
                value={booking.notes}
                onChange={handleChange}
                placeholder="Key topics, project scope, or specific strategic questions for the consultation..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050a12] border border-slate-700/80 text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff7e67]/30 focus:border-[#ff7e67] placeholder:text-slate-600 resize-none"
              ></textarea>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#ff7e67] hover:bg-[#ff694f] text-slate-950 font-mono font-bold text-sm shadow-lg shadow-[#ff7e67]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Confirming Booking...</span>
                  </>
                ) : (
                  <>
                    <CalendarCheck className="w-4 h-4" />
                    <span>Confirm Consultation Booking</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
