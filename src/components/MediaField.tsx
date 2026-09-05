import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CloudUpload, Film, Image as ImageIcon, Loader2, X } from 'lucide-react';
import {
  MAX_SIZE,
  formatBytes,
  getCdnConfig,
  uploadMedia,
  type CdnConfig,
  type MediaKind,
} from '../lib/mediaUploader';

interface MediaFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  /** 'image' shows a thumbnail, 'video' shows a preview player. */
  kind?: MediaKind;
  placeholder?: string;
  className?: string;
  helpText?: string;
  /** Sub-folder inside the configured CDN folder, e.g. "team" or "slides". */
  folder?: string;
}

const ACCEPT: Record<MediaKind, string> = {
  image: 'image/png,image/jpeg,image/webp,image/avif,image/gif,image/svg+xml',
  video: 'video/mp4,video/webm,video/ogg,video/quicktime',
};

/**
 * One field for every piece of media on the site.
 *
 * Paste a URL, or pick a file and it goes straight to the CDN — the value
 * stored in MongoDB is always a plain https:// URL, never a data: or blob:
 * URL, so it survives a page reload and works for every visitor.
 */
export const MediaField: React.FC<MediaFieldProps> = ({
  label,
  value,
  onChange,
  kind = 'image',
  placeholder,
  className = '',
  helpText,
  folder,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [cdn, setCdn] = useState<CdnConfig | null>(null);

  useEffect(() => {
    let alive = true;
    void getCdnConfig().then((c) => alive && setCdn(c));
    return () => {
      alive = false;
    };
  }, []);

  const handleFile = async (file?: File | null) => {
    if (!file) return;

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      const media = await uploadMedia(file, { folder, onProgress: setProgress });
      onChange(media.url);
    } catch (err: any) {
      setError(err?.message || 'Upload failed.');
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const cdnReady = cdn?.configured !== false;
  const isVideo = kind === 'video';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-xs font-medium text-slate-400">{label}</label>}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void handleFile(e.dataTransfer.files?.[0]);
        }}
        className="flex items-center gap-2"
      >
        {/* Preview */}
        {value ? (
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0 group">
            {isVideo ? (
              <video src={value} muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            )}
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
              title={`Clear ${kind}`}
              aria-label={`Clear ${kind}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg border border-dashed border-slate-700 bg-slate-900/50 flex items-center justify-center text-slate-500 shrink-0">
            {isVideo ? <Film className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
          </div>
        )}

        {/* URL + upload */}
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              placeholder || (isVideo ? 'https://cdn…/clip.mp4 or upload' : 'https://cdn…/photo.jpg or upload')
            }
            className="w-full px-3 py-2 pr-28 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading || !cdnReady}
            title={
              cdnReady
                ? `Upload ${kind} to the CDN`
                : 'Add CLOUDINARY_* keys to server/.env to enable uploads'
            }
            className="absolute right-1 top-1 bottom-1 px-2.5 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {uploading ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>{progress ? `${progress}%` : 'Sending'}</span>
              </>
            ) : (
              <>
                <CloudUpload className="w-3 h-3" />
                <span>Upload</span>
              </>
            )}
          </button>

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT[kind]}
            onChange={(e) => void handleFile(e.target.files?.[0])}
            className="hidden"
          />
        </div>
      </div>

      {uploading && (
        <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {helpText && <p className="text-[11px] text-slate-500">{helpText}</p>}

      {!cdnReady && (
        <p className="text-[11px] text-amber-400/90 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>CDN uploads are off. Paste a hosted URL, or set CLOUDINARY_* in server/.env.</span>
        </p>
      )}

      {cdnReady && !helpText && (
        <p className="text-[11px] text-slate-500">
          Stored on the CDN, up to {formatBytes(MAX_SIZE[kind])}. Only the URL is saved to MongoDB.
        </p>
      )}

      {error && (
        <p className="text-[11px] text-rose-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default MediaField;
