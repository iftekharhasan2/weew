import React, { useState } from 'react';
import { Lock, ShieldCheck, AlertCircle, Loader2, ArrowRight, ExternalLink } from 'lucide-react';

interface LoginScreenProps {
  onSubmit: (password: string) => Promise<boolean>;
  error: string | null;
  submitting: boolean;
  clearError: (msg: string | null) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSubmit,
  error,
  submitting,
  clearError,
}) => {
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(password);
    setPassword('');
  };

  return (
    <div className="min-h-screen w-full bg-[#050a12] text-slate-100 font-sans flex items-center justify-center p-5 selection:bg-[#ff7e67] selection:text-slate-900">
      {/* Ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[38rem] h-[38rem] rounded-full bg-[#ff7e67]/8 blur-[130px]" />
        <div className="absolute -bottom-52 -right-32 w-[34rem] h-[34rem] rounded-full bg-[#081220] blur-[110px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#ff7e67]/12 border border-[#ff7e67]/30 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="w-7 h-7 text-[#ff7e67]" />
          </div>
          <h1 className="text-3xl font-extrabold font-serif tracking-tight">IP3 Admin Console</h1>
          <p className="mt-2 text-sm text-slate-400 font-light">
            Enter the passphrase to edit site content and review enquiries.
          </p>
        </div>

        <div className="bg-[#081220] border border-slate-800 rounded-3xl shadow-2xl p-7 sm:p-8">
          <div className="mb-5 p-3.5 rounded-xl bg-[#050a12] border border-slate-800 text-slate-400 text-xs leading-relaxed flex gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#ff7e67]" />
            <span>
              The passphrase is verified on the server and the session is held in a
              secure, httpOnly cookie. Anything you publish here writes straight to
              MongoDB and is live for every visitor.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
              >
                Administrator Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  autoFocus
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) clearError(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#050a12] border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#ff7e67] text-sm transition-colors"
                />
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-[#ff7e67]/10 border border-[#ff7e67]/40 text-[#ff7e67] text-xs font-medium flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !password}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#ff7e67] hover:bg-[#e06a54] disabled:opacity-45 disabled:cursor-not-allowed text-slate-900 text-sm font-bold shadow-lg shadow-[#ff7e67]/20 transition-all cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying…</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <a
          href="/"
          className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-400 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Return to the public website</span>
        </a>
      </div>
    </div>
  );
};

export default LoginScreen;
