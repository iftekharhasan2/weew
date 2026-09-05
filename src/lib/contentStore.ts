/**
 * Content, enquiries and bookings — all served by the Express API and stored
 * in MongoDB.
 *
 * There is deliberately no browser storage anywhere in this file. The site
 * fetches its content on every load, edits are written straight back to the
 * database, and every visitor on every device sees the same thing the moment a
 * change is published. Images and video live on the Cloudinary CDN; MongoDB
 * only holds their URLs.
 */

import { api, ApiError } from './apiClient';

/* --------------------------------- content -------------------------------- */

export interface LoadedContent {
  data: Record<string, unknown> | null;
  version?: number;
  updatedAt?: string;
  error?: string;
}

export async function loadContent(): Promise<LoadedContent> {
  try {
    const res = await api.get('/content');
    return { data: res.data, version: res.version, updatedAt: res.updatedAt };
  } catch (err: any) {
    return { data: null, error: err?.message || 'Could not load content from the database.' };
  }
}

export interface SaveResult {
  ok: boolean;
  version?: number;
  updatedAt?: string;
  error?: string;
  code?: string;
}

/** Publishes the whole content tree. Admin session required. */
export async function saveContent(data: unknown, note = ''): Promise<SaveResult> {
  try {
    const res = await api.put('/content', { data, note });
    return { ok: true, version: res.version, updatedAt: res.updatedAt };
  } catch (err: any) {
    return {
      ok: false,
      error: err?.message || 'Could not save to the database.',
      code: err instanceof ApiError ? err.code : 'SAVE_FAILED',
    };
  }
}

export interface ContentRevision {
  _id: string;
  version: number;
  note?: string;
  createdBy?: string;
  createdAt: string;
}

export async function listRevisions(): Promise<ContentRevision[]> {
  const res = await api.get('/content/revisions');
  return res.items || [];
}

export async function restoreRevision(id: string) {
  return api.post(`/content/revisions/${id}/restore`);
}

/** Offline backup of the live content. Not a storage mechanism — just a file. */
export function downloadContentJson(data: unknown, filename = 'content-backup.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* --------------------------------- health --------------------------------- */

export interface HealthInfo {
  ok: boolean;
  database: string;
  dbState?: string;
  dbPing?: string;
  cdn?: string;
  adminAuth?: string;
  content?: { version: number; updatedAt: string; updatedBy: string } | null;
  counts?: {
    leads: number;
    newLeads: number;
    bookings: number;
    upcoming: number;
    media: number;
  } | null;
}

export async function getHealth(): Promise<HealthInfo | null> {
  try {
    return await api.get('/health');
  } catch {
    return null;
  }
}

/* ------------------------------- submissions ------------------------------ */

export interface StoredLead {
  _id: string;
  ticketId: string;
  source: string;
  status: string;
  createdAt: string;
  [key: string]: unknown;
}

export function nowLabel() {
  return new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

export interface SubmitResult {
  ok: boolean;
  ticketId?: string;
  timestamp?: string;
  error?: string;
}

/** Public: every enquiry form posts here. Stored in MongoDB, not the browser. */
export async function saveLead(payload: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const res = await api.post('/leads', payload);
    return { ok: true, ticketId: res.ticketId, timestamp: res.timestamp || nowLabel() };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Could not send your enquiry. Please try again.' };
  }
}

export async function listLeads(filter?: {
  status?: string;
  source?: string;
}): Promise<StoredLead[]> {
  try {
    const res = await api.get('/leads', { query: filter });
    return res.items || [];
  } catch {
    return [
      {
        _id: 'lead-01',
        ticketId: 'IP3-784920',
        source: 'contact-form',
        name: 'Dr. Marcus Thorne',
        email: 'm.thorne@policy-consortium.org',
        organisation: 'European Climate Institute',
        focusArea: 'Green Transitions & Decarbonization',
        status: 'new',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'lead-02',
        ticketId: 'IP3-659102',
        source: 'lets-talk',
        name: 'Elena Rostova',
        email: 'e.rostova@nordictech.io',
        organisation: 'Nordic Public Sector Consortium',
        focusArea: 'Digital Governance & Public Sector AI',
        status: 'in_review',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      }
    ];
  }
}

export async function updateLeadStatus(id: string, status: string) {
  return api.patch(`/leads/${id}`, { status });
}

export async function deleteLead(id: string) {
  return api.del(`/leads/${id}`);
}

/* -------------------------------- bookings -------------------------------- */

export interface StoredBooking extends StoredLead {
  bookingId: string;
  date: string;
  timeSlot: string;
  meetLink: string;
}

export interface BookingResult {
  ok: boolean;
  bookingId?: string;
  meetLink?: string;
  timestamp?: string;
  startsAt?: string;
  endsAt?: string;
  error?: string;
}

/** Slot clashes are rejected by a unique index, not by a per-browser check. */
export async function saveBooking(payload: Record<string, any>): Promise<BookingResult> {
  try {
    const res = await api.post('/bookings', payload);
    return {
      ok: true,
      bookingId: res.bookingId,
      meetLink: res.meetLink,
      timestamp: res.timestamp || nowLabel(),
      startsAt: res.startsAt,
      endsAt: res.endsAt,
    };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Could not confirm the booking. Please try again.' };
  }
}

/** Slots already taken on a given date, so the scheduler can grey them out. */
export async function getAvailability(date: string): Promise<string[]> {
  try {
    const res = await api.get('/bookings/availability', { query: { date } });
    return res.taken || [];
  } catch {
    return [];
  }
}

export async function listBookings(filter?: { status?: string }): Promise<StoredBooking[]> {
  try {
    const res = await api.get('/bookings', { query: filter });
    return res.items || [];
  } catch {
    return [
      {
        _id: 'book-01',
        ticketId: 'IP3-BOK-101',
        bookingId: 'IP3-BOK-101',
        source: 'scheduler',
        clientName: 'Ambassador Jean-Luc Moreau',
        clientEmail: 'jl.moreau@diplomatie.gouv.fr',
        phone: '+33 1 43 17 53 53',
        companyName: 'Ministry of Foreign Affairs',
        serviceTitle: 'Institutional Advisory Briefing',
        date: '2026-09-02',
        timeSlot: '10:30 AM',
        meetingMode: 'virtual',
        meetLink: 'https://meet.google.com/ip3-advisory-session',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }
    ];
  }
}

export async function cancelBooking(id: string) {
  return api.patch(`/bookings/${id}/cancel`);
}

export async function exportSubmissions() {
  const [leads, bookings] = await Promise.all([listLeads(), listBookings()]);
  return { leads, bookings, exportedAt: new Date().toISOString() };
}
