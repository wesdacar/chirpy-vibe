// import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
        optimizeDeps: {
                exclude: ['format', 'editor.all'],
                include: ['monaco-editor/esm/vs/editor/editor.api'],
                force: true, // Force re-optimization on every start
        },

        // build: {
        //     rollupOptions: {
        //       output: {
        //             advancedChunks: {
        //                 groups: [{name: 'vendor', test: /node_modules/}]
        //             }
        //         }
        //     }
        // },
        plugins: [
                react(),
                svgr(),
                // Conditionally load Cloudflare plugin only when not in Replit
                ...(process.env.REPL_ID ? [] : [
                        cloudflare({
                                configPath: 'wrangler.jsonc',
                                experimental: { remoteBindings: true },
                        })
                ]),
                tailwindcss(),
        ],

        resolve: {
                alias: {
                        // 'path': 'path-browserify',
                        // Add this line to fix the 'debug' package issue
                        debug: 'debug/src/browser',
                        // "@": path.resolve(__dirname, "./src"),
                        '@': path.resolve(__dirname, './src'),
            'shared': path.resolve(__dirname, './shared'),
            'worker': path.resolve(__dirname, './worker'),
                },
        },

        // Configure for Prisma + Cloudflare Workers compatibility
        define: {
                // Ensure proper module definitions for Cloudflare Workers context
                'process.env.NODE_ENV': JSON.stringify(
                        process.env.NODE_ENV || 'development',
                ),
                global: 'globalThis',
                // '__filename': '""',
                // '__dirname': '""',
        },

        worker: {
                // Handle Prisma in worker context for development
                format: 'es',
        },

        server: {
                host: '0.0.0.0',
                port: 5000,
                allowedHosts: true,
                watch: {
                        ignored: ['**/node_modules/**', '**/.cache/**', '**/dist/**']
                }
        },

        // Clear cache more aggressively
        cacheDir: 'node_modules/.vite',

        build: {
                sourcemap: true,
        },
});
