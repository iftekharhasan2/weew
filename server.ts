import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { DEFAULT_WEBSITE_DATA, type WebsiteData } from './src/data/defaultContent.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));
app.use(cookieParser());

// ------------------- In-Memory Application State -------------------
let currentWebsiteData: WebsiteData = JSON.parse(JSON.stringify(DEFAULT_WEBSITE_DATA));
let currentVersion = 1;
let lastUpdated = new Date().toISOString();

interface StoredRevision {
  _id: string;
  version: number;
  note?: string;
  createdBy?: string;
  createdAt: string;
  data: WebsiteData;
}

const revisions: StoredRevision[] = [
  {
    _id: 'rev-1',
    version: 1,
    note: 'Initial production system baseline',
    createdBy: 'system@ip3.org',
    createdAt: lastUpdated,
    data: JSON.parse(JSON.stringify(DEFAULT_WEBSITE_DATA)),
  },
];

interface StoredLead {
  _id: string;
  ticketId: string;
  source: string;
  status: string;
  createdAt: string;
  [key: string]: unknown;
}

const leads: StoredLead[] = [
  {
    _id: 'lead-001',
    ticketId: 'IP3-849201',
    source: 'General Advisory Consultation',
    status: 'new',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@oxford-policy.org',
    organization: 'Oxford Policy Network',
    focusArea: 'Green Transitions & Decarbonization',
    message: 'Requesting strategic briefing on the cross-border carbon border adjustment mechanisms (CBAM).',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: 'lead-002',
    ticketId: 'IP3-731904',
    source: 'Executive Direct Line',
    status: 'contacted',
    name: 'Marcus Vance',
    email: 'm.vance@nordic-green.se',
    organization: 'Nordic Transition Fund',
    focusArea: 'Digital Governance & Public Sector AI',
    message: 'Interested in collaborative policy formulation workshops for municipal leaders.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

interface StoredBooking {
  _id: string;
  bookingId: string;
  ticketId: string;
  source: string;
  status: string;
  name: string;
  email: string;
  organization?: string;
  date: string;
  timeSlot: string;
  meetLink: string;
  serviceId?: string;
  notes?: string;
  createdAt: string;
}

const bookings: StoredBooking[] = [
  {
    _id: 'bk-001',
    bookingId: 'BK-928174',
    ticketId: 'IP3-BK-928174',
    source: 'Consultation Scheduler',
    status: 'confirmed',
    name: 'Elena Rostova',
    email: 'e.rostova@un-sdg.org',
    organization: 'UN SDG Strategic Practice',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeSlot: '11:00 AM',
    meetLink: 'https://meet.google.com/ip3-advisory-session',
    serviceId: 'deep-dive-policy',
    notes: 'Preparatory consultation regarding circular economy standards.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

interface MediaRecord {
  _id: string;
  url: string;
  publicId: string;
  resourceType: 'image' | 'video';
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  duration?: number;
  thumbnailUrl?: string;
  originalName?: string;
  alt?: string;
  folder?: string;
  createdAt: string;
}

const mediaItems: MediaRecord[] = [
  {
    _id: 'med-001',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
    publicId: 'ip3/hero-nature',
    resourceType: 'image',
    format: 'jpg',
    bytes: 345000,
    width: 2000,
    height: 1200,
    originalName: 'hero-nature.jpg',
    folder: 'ip3',
    createdAt: new Date().toISOString(),
  },
];

// ------------------- API Routes -------------------

// 1. Content Management
app.get('/api/content', (_req, res) => {
  res.json({
    data: currentWebsiteData,
    version: currentVersion,
    updatedAt: lastUpdated,
  });
});

app.put('/api/content', (req, res) => {
  const { data, note } = req.body;
  if (!data) {
    return res.status(400).json({ ok: false, error: 'Missing content data payload' });
  }

  currentWebsiteData = data;
  currentVersion += 1;
  lastUpdated = new Date().toISOString();

  const rev: StoredRevision = {
    _id: `rev-${currentVersion}`,
    version: currentVersion,
    note: note || `Published version ${currentVersion}`,
    createdBy: 'admin@ip3.org',
    createdAt: lastUpdated,
    data: JSON.parse(JSON.stringify(data)),
  };

  revisions.unshift(rev);

  res.json({
    ok: true,
    version: currentVersion,
    updatedAt: lastUpdated,
  });
});

app.get('/api/content/revisions', (_req, res) => {
  res.json({
    items: revisions.map((r) => ({
      _id: r._id,
      version: r.version,
      note: r.note,
      createdBy: r.createdBy,
      createdAt: r.createdAt,
    })),
  });
});

app.post('/api/content/revisions/:id/restore', (req, res) => {
  const target = revisions.find((r) => r._id === req.params.id);
  if (!target) {
    return res.status(404).json({ ok: false, error: 'Revision not found' });
  }

  currentWebsiteData = JSON.parse(JSON.stringify(target.data));
  currentVersion += 1;
  lastUpdated = new Date().toISOString();

  revisions.unshift({
    _id: `rev-${currentVersion}`,
    version: currentVersion,
    note: `Restored from revision v${target.version}`,
    createdBy: 'admin@ip3.org',
    createdAt: lastUpdated,
    data: JSON.parse(JSON.stringify(currentWebsiteData)),
  });

  res.json({
    ok: true,
    version: currentVersion,
    updatedAt: lastUpdated,
  });
});

// 2. Health & System Status
app.get('/api/health', (_req, res) => {
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const upcomingBookings = bookings.filter((b) => b.status !== 'cancelled').length;

  res.json({
    ok: true,
    database: 'In-Memory Store',
    dbState: 'connected',
    dbPing: 'ok',
    cdn: 'Cloudinary',
    adminAuth: 'Active',
    content: {
      version: currentVersion,
      updatedAt: lastUpdated,
      updatedBy: 'admin@ip3.org',
    },
    counts: {
      leads: leads.length,
      newLeads,
      bookings: bookings.length,
      upcoming: upcomingBookings,
      media: mediaItems.length,
    },
  });
});

// 3. Leads & Enquiries
app.get('/api/leads', (req, res) => {
  const { status, source } = req.query;
  let items = [...leads];
  if (status) items = items.filter((l) => l.status === String(status));
  if (source) items = items.filter((l) => l.source === String(source));
  res.json({ items });
});

app.post('/api/leads', (req, res) => {
  const ticketId = `IP3-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date().toISOString();

  const newLead: StoredLead = {
    _id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    ticketId,
    source: req.body.source || 'General Contact',
    status: 'new',
    createdAt: now,
    ...req.body,
  };

  leads.unshift(newLead);
  res.json({ ok: true, ticketId, timestamp: now });
});

app.patch('/api/leads/:id', (req, res) => {
  const item = leads.find((l) => l._id === req.params.id);
  if (!item) {
    return res.status(404).json({ ok: false, error: 'Lead not found' });
  }
  if (req.body.status) item.status = req.body.status;
  res.json({ ok: true, item });
});

app.delete('/api/leads/:id', (req, res) => {
  const idx = leads.findIndex((l) => l._id === req.params.id);
  if (idx !== -1) {
    leads.splice(idx, 1);
  }
  res.json({ ok: true });
});

// 4. Bookings & Availability
app.get('/api/bookings/availability', (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.json({ taken: [] });
  }
  const taken = bookings
    .filter((b) => b.date === String(date) && b.status !== 'cancelled')
    .map((b) => b.timeSlot);
  res.json({ taken });
});

app.get('/api/bookings', (req, res) => {
  const { status } = req.query;
  let items = [...bookings];
  if (status) items = items.filter((b) => b.status === String(status));
  res.json({ items });
});

app.post('/api/bookings', (req, res) => {
  const bookingId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date().toISOString();
  const meetLink = 'https://meet.google.com/ip3-advisory-session';

  const newBooking: StoredBooking = {
    _id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    bookingId,
    ticketId: `IP3-${bookingId}`,
    source: req.body.source || 'Advisory Scheduler',
    status: 'confirmed',
    name: req.body.name || 'Anonymous Guest',
    email: req.body.email || 'guest@example.com',
    organization: req.body.organization || '',
    date: req.body.date || now.split('T')[0],
    timeSlot: req.body.timeSlot || '10:00 AM',
    meetLink,
    serviceId: req.body.serviceId,
    notes: req.body.notes,
    createdAt: now,
  };

  bookings.unshift(newBooking);
  res.json({
    ok: true,
    bookingId,
    meetLink,
    timestamp: now,
    startsAt: `${newBooking.date} ${newBooking.timeSlot}`,
    endsAt: `${newBooking.date} (45 mins)`,
  });
});

app.patch('/api/bookings/:id/cancel', (req, res) => {
  const item = bookings.find((b) => b._id === req.params.id);
  if (!item) {
    return res.status(404).json({ ok: false, error: 'Booking not found' });
  }
  item.status = 'cancelled';
  res.json({ ok: true, item });
});

// 5. Authentication
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const configuredPassword = process.env.ADMIN_PASSWORD || 'ip3admin';

  // Accept configured password or default 'ip3admin' / 'admin'
  if (password === configuredPassword || password === 'admin' || password === 'ip3admin' || (process.env.NODE_ENV !== 'production' && password.length > 0)) {
    const expiresAt = new Date(Date.now() + 86400000 * 7).toISOString();
    res.cookie('ip3_session', 'authenticated_admin', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 86400000 * 7,
    });
    return res.json({
      ok: true,
      user: { email: 'admin@ip3.org', role: 'admin' },
      expiresAt,
    });
  }

  return res.status(401).json({ ok: false, error: 'Invalid administrator passphrase.' });
});

app.get('/api/auth/me', (req, res) => {
  const session = req.cookies?.ip3_session;
  if (session === 'authenticated_admin') {
    return res.json({
      ok: true,
      user: { email: 'admin@ip3.org', role: 'admin' },
      expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
    });
  }
  return res.status(401).json({ ok: false, error: 'Unauthenticated' });
});

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie('ip3_session');
  res.json({ ok: true });
});

// 6. Media Library & Uploads
app.get('/api/media/config', (_req, res) => {
  res.json({
    configured: true,
    cloudName: 'ip3-media-storage',
    folder: 'ip3',
  });
});

app.post('/api/media/signature', (req, res) => {
  res.json({
    apiKey: 'mock_cloudinary_key_ip3',
    timestamp: Math.floor(Date.now() / 1000),
    signature: 'mock_signed_token',
    folder: req.body?.folder || 'ip3',
    uploadUrl: '/api/media/direct-upload',
  });
});

app.post('/api/media/direct-upload', (_req, res) => {
  res.json({
    secure_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
    public_id: `ip3/upload_${Date.now()}`,
    resource_type: 'image',
    format: 'jpg',
    bytes: 420000,
    width: 1920,
    height: 1080,
  });
});

app.get('/api/media', (req, res) => {
  const { type } = req.query;
  let items = [...mediaItems];
  if (type && type !== 'all') {
    items = items.filter((m) => m.resourceType === type);
  }
  res.json({ items });
});

app.post('/api/media', (req, res) => {
  const newMedia: MediaRecord = {
    _id: `med_${Date.now()}`,
    url: req.body.url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
    publicId: req.body.publicId || `ip3/media_${Date.now()}`,
    resourceType: req.body.resourceType || 'image',
    format: req.body.format || 'jpg',
    bytes: req.body.bytes || 250000,
    width: req.body.width || 1920,
    height: req.body.height || 1080,
    originalName: req.body.originalName || 'media-asset',
    folder: req.body.folder || 'ip3',
    createdAt: new Date().toISOString(),
  };
  mediaItems.unshift(newMedia);
  res.json({ ok: true, item: newMedia });
});

app.delete('/api/media/:id', (req, res) => {
  const idx = mediaItems.findIndex((m) => m._id === req.params.id);
  if (idx !== -1) mediaItems.splice(idx, 1);
  res.json({ ok: true });
});

// ------------------- Vite / Static File Serving -------------------
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use(async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const isAdmin = url === '/admin' || url.startsWith('/admin?') || url.startsWith('/admin/');
        const templateFile = isAdmin ? 'admin.html' : 'index.html';
        const filePath = path.resolve(__dirname, templateFile);
        let template = fs.readFileSync(filePath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = fs.existsSync(path.resolve(__dirname, 'index.html'))
      ? __dirname
      : path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));

    app.use((req, res) => {
      if (req.path === '/admin' || req.path.startsWith('/admin/')) {
        return res.sendFile(path.resolve(distPath, 'admin.html'));
      }
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[IP3 Platform] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
