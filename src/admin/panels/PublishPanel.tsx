import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  CloudUpload,
  Download,
  FileJson,
  History,
  Inbox,
  Loader2,
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import {
  downloadContentJson,
  exportSubmissions,
  listRevisions,
  restoreRevision,
  type ContentRevision,
} from '../../lib/contentStore';

const formatWhen = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

/**
 * Publishing is a database write, not a file export.
 *
 * Every edit is already saved to MongoDB a moment after you make it; this
 * panel is where you force a save, confirm what is live, take an offline
 * backup, and roll back if an edit went wrong.
 */
export const PublishPanel: React.FC = () => {
  const { data, syncStatus, syncError, lastSyncedAt, contentVersion, saveToServer, reloadFromServer } =
    useCMS();

  const [revisions, setRevisions] = useState<ContentRevision[]>([]);
  const [loadingRevisions, setLoadingRevisions] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadRevisions = useCallback(async () => {
    setLoadingRevisions(true);
    try {
      setRevisions(await listRevisions());
    } catch {
      setRevisions([]);
    } finally {
      setLoadingRevisions(false);
    }
  }, []);

  useEffect(() => {
    void loadRevisions();
  }, [loadRevisions]);

  const handlePublish = async () => {
    setBusy('publish');
    setNotice(null);
    const ok = await saveToServer();
    setNotice(ok ? 'Published. Every visitor sees this now.' : null);
    if (ok) await loadRevisions();
    setBusy(null);
  };

  const handleBackup = () => {
    downloadContentJson(data, `ip3-content-v${contentVersion ?? 0}.json`);
    setNotice('Backup downloaded.');
  };

  const handleExportSubmissions = async () => {
    setBusy('submissions');
    try {
      const payload = await exportSubmissions();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ip3-submissions.json';
      a.click();
      URL.revokeObjectURL(url);
      setNotice('Enquiries and bookings exported.');
    } catch {
      setNotice('Could not export submissions.');
    } finally {
      setBusy(null);
    }
  };

  const handleRestore = async (revision: ContentRevision) => {
    if (
      !window.confirm(
        `Roll the live site back to version ${revision.version}? The current version is kept as a new revision.`
      )
    ) {
      return;
    }
    setBusy(revision._id);
    try {
      await restoreRevision(revision._id);
      await reloadFromServer();
      await loadRevisions();
      setNotice(`Restored version ${revision.version}.`);
    } catch (err: any) {
      setNotice(err?.message || 'Restore failed.');
    } finally {
      setBusy(null);
    }
  };

  const saving = syncStatus === 'saving' || busy === 'publish';
  const failed = syncStatus === 'error' || syncStatus === 'offline';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-serif text-[#F3F0E8] flex items-center gap-2.5">
          <FileJson className="w-5 h-5 text-[#EF715A]" />
          Publish
        </h2>
        <p className="text-xs text-[#AEB0AE] mt-1">
          Content lives in MongoDB. Saving here makes it live everywhere at once.
        </p>
      </div>

      <div
        className={`rounded-2xl border p-4 flex gap-3 ${
          failed ? 'bg-[#EF715A]/8 border-[#EF715A]/30' : 'bg-[#12202B] border-[#3C3F45]'
        }`}
      >
        {failed ? (
          <AlertTriangle className="w-4 h-4 text-[#EF715A] shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-[#AEB0AE] shrink-0 mt-0.5" />
        )}
        <div className="text-xs text-[#AEB0AE] leading-relaxed">
          {failed ? (
            <>
              <span className="text-[#F3F0E8] font-semibold">Not saved.</span>{' '}
              {syncError || 'The database could not be reached.'}
            </>
          ) : (
            <>
              <span className="text-[#F3F0E8] font-semibold">
                Live — version {contentVersion ?? '—'}.
              </span>{' '}
              Last write {formatWhen(lastSyncedAt)}. Edits autosave a second after you stop typing.
            </>
          )}
        </div>
      </div>

      <div className="bg-[#12202B] border border-[#3C3F45] rounded-2xl p-5">
        <h3 className="text-sm font-bold text-[#F3F0E8] mb-3">Actions</h3>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handlePublish}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EF715A] hover:bg-[#e05e47] disabled:opacity-60 text-[#F3F0E8] text-xs font-bold transition-colors cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CloudUpload className="w-4 h-4" />}
            {saving ? 'Publishing…' : 'Publish now'}
          </button>

          <button
            onClick={() => void reloadFromServer()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1A22] hover:bg-[#3C3F45] text-[#AEB0AE] hover:text-[#F3F0E8] border border-[#3C3F45] text-xs font-bold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Reload from database
          </button>

          <button
            onClick={handleBackup}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1A22] hover:bg-[#3C3F45] text-[#AEB0AE] hover:text-[#F3F0E8] border border-[#3C3F45] text-xs font-bold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download backup
          </button>
        </div>

        {notice && (
          <p className="mt-3.5 text-[11px] text-[#EF715A] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {notice}
          </p>
        )}
      </div>

      <div className="bg-[#12202B] border border-[#3C3F45] rounded-2xl p-5">
        <h3 className="text-sm font-bold text-[#F3F0E8] mb-2 flex items-center gap-2">
          <History className="w-4 h-4 text-[#EF715A]" />
          Revision history
        </h3>
        <p className="text-xs text-[#AEB0AE] leading-relaxed mb-4">
          The last 20 published versions, kept automatically. Restoring one does not
          discard the current version — it is stored as a new revision first.
        </p>

        {loadingRevisions ? (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Loading revisions…
          </div>
        ) : revisions.length === 0 ? (
          <p className="text-xs text-slate-500">No earlier versions yet.</p>
        ) : (
          <ul className="divide-y divide-slate-800/60">
            {revisions.map((rev) => (
              <li key={rev._id} className="flex items-center gap-3 py-2.5">
                <span className="text-xs font-mono text-slate-100 w-14 shrink-0">
                  v{rev.version}
                </span>
                <span className="text-[11px] text-slate-400 flex-1 truncate">
                  {formatWhen(rev.createdAt)}
                  {rev.note ? ` — ${rev.note}` : ''}
                </span>
                <button
                  onClick={() => void handleRestore(rev)}
                  disabled={busy === rev._id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#050a12] hover:bg-slate-800 text-slate-400 hover:text-[#ff7e67] border border-slate-800 text-[11px] font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {busy === rev._id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <RotateCcw className="w-3 h-3" />
                  )}
                  Restore
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-[#081220] border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
          <Inbox className="w-4 h-4 text-[#ff7e67]" />
          Form submissions
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Every enquiry and consultation booking is written to MongoDB as it arrives and
          is readable in the Leads and Bookings tabs. Export a JSON copy for your records.
        </p>

        <button
          onClick={() => void handleExportSubmissions()}
          disabled={busy === 'submissions'}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold border border-slate-700 transition-colors cursor-pointer disabled:opacity-60"
        >
          {busy === 'submissions' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Export submissions.json
        </button>
      </div>
    </div>
  );
};

export default PublishPanel;
