/**
 * Uploads images and video to the Cloudinary CDN.
 *
 * The flow is deliberately three steps:
 *   1. ask the API for a short-lived signature (the API secret never leaves
 *      the server),
 *   2. send the file from the browser straight to Cloudinary, so a 200 MB
 *      video never passes through the API host,
 *   3. record the returned URL in MongoDB so the media library is queryable.
 *
 * Nothing is stored as a base64 data URL or a blob: URL — both die with the
 * browser session and bloat the database.
 */

import { api } from './apiClient';

export type MediaKind = 'image' | 'video';

export interface UploadedMedia {
  url: string;
  publicId: string;
  resourceType: MediaKind;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  duration?: number;
  thumbnailUrl?: string;
  originalName?: string;
}

export interface CdnConfig {
  configured: boolean;
  cloudName: string | null;
  folder: string;
}

export const MAX_SIZE: Record<MediaKind, number> = {
  image: 10 * 1024 * 1024, // 10 MB
  video: 100 * 1024 * 1024, // 100 MB — Cloudinary's free-tier ceiling
};

export async function getCdnConfig(): Promise<CdnConfig> {
  try {
    const res = await api.get('/media/config');
    return { configured: !!res.configured, cloudName: res.cloudName, folder: res.folder };
  } catch {
    return { configured: false, cloudName: null, folder: '' };
  }
}

export function detectKind(file: File): MediaKind {
  return file.type.startsWith('video/') ? 'video' : 'image';
}

export function formatBytes(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

interface UploadOptions {
  folder?: string;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
}

/** Uploads one file and returns its permanent CDN URL. */
export async function uploadMedia(file: File, options: UploadOptions = {}): Promise<UploadedMedia> {
  const kind = detectKind(file);

  if (file.size > MAX_SIZE[kind]) {
    throw new Error(
      `That ${kind} is ${formatBytes(file.size)}. The limit is ${formatBytes(MAX_SIZE[kind])}.`
    );
  }

  const sig = await api.post('/media/signature', {
    resourceType: kind,
    folder: options.folder,
  });

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', sig.apiKey);
  form.append('timestamp', String(sig.timestamp));
  form.append('signature', sig.signature);
  form.append('folder', sig.folder);

  const uploaded = await xhrUpload(sig.uploadUrl, form, options.onProgress, options.signal);

  const media: UploadedMedia = {
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
    resourceType: uploaded.resource_type === 'video' ? 'video' : 'image',
    format: uploaded.format,
    bytes: uploaded.bytes,
    width: uploaded.width,
    height: uploaded.height,
    duration: uploaded.duration,
    originalName: file.name,
  };

  // Record it in MongoDB. A failure here does not invalidate the upload, so the
  // caller still gets a usable URL.
  try {
    const saved = await api.post('/media', { ...media, folder: sig.folder });
    if (saved?.item?.thumbnailUrl) media.thumbnailUrl = saved.item.thumbnailUrl;
  } catch (err) {
    console.warn('[media] Uploaded to the CDN but not recorded in the library.', err);
  }

  return media;
}

/** fetch() cannot report upload progress, and large videos need a progress bar. */
function xhrUpload(
  url: string,
  form: FormData,
  onProgress?: (percent: number) => void,
  signal?: AbortSignal
): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      try {
        const body = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(body);
        else reject(new Error(body?.error?.message || `Upload failed (${xhr.status}).`));
      } catch {
        reject(new Error('The CDN returned an unreadable response.'));
      }
    };

    xhr.onerror = () => reject(new Error('Network error while uploading to the CDN.'));
    xhr.onabort = () => reject(new Error('Upload cancelled.'));

    signal?.addEventListener('abort', () => xhr.abort());
    xhr.send(form);
  });
}

/* ----------------------------- media library ------------------------------ */

export interface MediaItem extends UploadedMedia {
  _id: string;
  alt?: string;
  createdAt: string;
}

export async function listMedia(type: 'all' | MediaKind = 'all'): Promise<MediaItem[]> {
  const res = await api.get('/media', { query: { type } });
  return res.items || [];
}

export async function deleteMedia(id: string) {
  return api.del(`/media/${id}`);
}
