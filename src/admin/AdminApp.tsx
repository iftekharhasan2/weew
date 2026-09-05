import React, { useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  CalendarCheck,
  Sliders,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Loader2,
  FileJson,
  Cloud,
  CloudOff,
  Check,
} from 'lucide-react';
import { CMSProvider, useCMS } from '../context/CMSContext';
import { AdminPanelModal } from '../components/AdminPanelModal';
import { useAdminAuth } from './useAdminAuth';
import { LoginScreen } from './LoginScreen';
import { OverviewPanel } from './panels/OverviewPanel';
import { LeadsPanel } from './panels/LeadsPanel';
import { BookingsPanel } from './panels/BookingsPanel';
import { PublishPanel } from './panels/PublishPanel';

type TabId = 'overview' | 'leads' | 'bookings' | 'content' | 'publish';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'leads', label: 'Enquiries', icon: <Inbox className="w-4 h-4" /> },
  { id: 'bookings', label: 'Consultations', icon: <CalendarCheck className="w-4 h-4" /> },
  { id: 'content', label: 'Content Studio', icon: <Sliders className="w-4 h-4" /> },
  { id: 'publish', label: 'Publish', icon: <FileJson className="w-4 h-4" /> },
];

/** Small live indicator for the CMS write-through status. */
const SyncBadge: React.FC = () => {
  const { syncStatus } = useCMS();

  const map: Record<string, { icon: React.ReactNode; text: string; tone: string }> = {
    loading: { icon: <Loader2 className="w-3 h-3 animate-spin" />, text: 'Loading', tone: 'text-slate-400' },
    saving: { icon: <Loader2 className="w-3 h-3 animate-spin" />, text: 'Saving', tone: 'text-slate-400' },
    saved: { icon: <Check className="w-3 h-3" />, text: 'Saved locally', tone: 'text-[#ff7e67]' },
    idle: { icon: <Cloud className="w-3 h-3" />, text: 'Ready', tone: 'text-slate-500' },
    error: { icon: <CloudOff className="w-3 h-3" />, text: 'Save failed', tone: 'text-[#ff7e67]' },
    offline: { icon: <CloudOff className="w-3 h-3" />, text: 'Offline', tone: 'text-[#ff7e67]' },
  };

  const s = map[syncStatus] || map.idle;

  return (
    <span
      className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050a12] border border-slate-800 text-[10px] font-bold uppercase tracking-wider ${s.tone}`}
    >
      {s.icon}
      {s.text}
    </span>
  );
};

const AdminShell: React.FC<{ onSignOut: () => void }> = ({ onSignOut }) => {
  const [tab, setTab] = useState<TabId>('overview');

  return (
    <div className="min-h-screen bg-[#050a12] text-slate-100 font-sans antialiased selection:bg-[#ff7e67] selection:text-slate-900">
      <header className="sticky top-0 z-30 bg-[#050a12]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-[#ff7e67]/12 border border-[#ff7e67]/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#ff7e67]" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-extrabold font-serif tracking-tight">IP3 Admin</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Console</p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2.5">
              <SyncBadge />

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                title="Open the public website"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#081220] hover:bg-slate-800 text-slate-400 hover:text-slate-100 border border-slate-800 text-xs font-bold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">View site</span>
              </a>

              <button
                onClick={onSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#081220] hover:bg-slate-800 text-slate-400 hover:text-[#ff7e67] border border-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>

          <nav className="flex items-center gap-1 -mb-px overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-3.5 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  tab === t.id
                    ? 'border-[#ff7e67] text-[#ff7e67]'
                    : 'border-transparent text-slate-400 hover:text-slate-100'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        {tab === 'overview' && <OverviewPanel onNavigate={(id) => setTab(id as TabId)} />}
        {tab === 'leads' && <LeadsPanel />}
        {tab === 'bookings' && <BookingsPanel />}
        {tab === 'publish' && <PublishPanel />}
        {tab === 'content' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold font-serif text-slate-100 flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-[#ff7e67]" />
                Content Studio
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Edits apply instantly in this browser. Use the Publish tab to make them live for everyone.
              </p>
            </div>

            {/* The existing CMS panel, now only reachable behind authentication. */}
            <AdminPanelModal isOpen onClose={() => setTab('overview')} />
          </div>
        )}
      </main>
    </div>
  );
};

export default function AdminApp() {
  const { state, error, submitting, signIn, signOut, setError } = useAdminAuth();

  if (state === 'checking') {
    return (
      <div className="min-h-screen bg-[#050a12] flex flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="w-6 h-6 animate-spin text-[#ff7e67]" />
        <span className="text-xs font-sans">Verifying session…</span>
      </div>
    );
  }

  if (state === 'unauthenticated') {
    return (
      <LoginScreen
        onSubmit={signIn}
        error={error}
        submitting={submitting}
        clearError={setError}
      />
    );
  }

  // Writable CMS provider — only mounted for an authenticated administrator.
  return (
    <CMSProvider>
      <AdminShell onSignOut={signOut} />
    </CMSProvider>
  );
}
