import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // 127.0.0.1, not localhost. On Node 18+ "localhost" resolves to both ::1 and
  // 127.0.0.1, and the proxy attempts them together — that is the
  // "AggregateError [ECONNREFUSED] at internalConnectMultiple" in the log.
  // Pinning to IPv4 removes the ambiguity entirely.
  // Deliberately NOT prefixed VITE_. Anything starting with VITE_ is inlined
  // into the client bundle, so VITE_DEV_API_TARGET shipped "http://127.0.0.1:5000"
  // to production browsers. loadEnv() with an empty prefix reads every variable,
  // so the plain name works here and stays server-side.
  const apiTarget = env.DEV_API_TARGET || 'http://127.0.0.1:5000';

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        // Dev-server parity with the Vercel rewrite: /admin serves admin.html.
        name: 'ip3-admin-route',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url === '/admin' || req.url?.startsWith('/admin?')) {
              req.url = '/admin.html';
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true,
      watch: { ignored: ['**/.env', '**/.env.*'] },
      // Dev only: forward /api/* to the backend running locally, so
      // development stays same-origin and never exercises CORS.
      // In production the frontend calls the backend's own URL directly via
      // VITE_API_BASE_URL, and CORS_ORIGIN on the backend authorises it.
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            // The API takes a moment longer to boot than Vite, so the first few
            // requests can arrive before it is listening. Answer them with a
            // clean 503 the client can retry, instead of dumping a Node stack
            // trace into the terminal for every one.
            let lastLog = 0;

            proxy.on('error', (err, _req, res) => {
              const now = Date.now();
              if (now - lastLog > 4000) {
                lastLog = now;
                console.log(`  [proxy] API not reachable at ${apiTarget} — retrying`);
              }

              if (res && 'writeHead' in res && !res.headersSent) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(
                  JSON.stringify({ ok: false, error: 'API starting up.', code: 'API_UNAVAILABLE' })
                );
              }
            });
          },
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1600,
      // Two independent bundles: the public site and the gated admin console.
      // None of the CMS editor code ships to public visitors.
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          admin: path.resolve(__dirname, 'admin.html'),
        },
      },
    },
  };
});
