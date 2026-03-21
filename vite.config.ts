import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/rollercoaster-vibecoon/' : '/',
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  assetsInclude: ['**/*.wasm'],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/pixi.js')) return 'vendor-pixi';
          if (id.includes('node_modules')) return 'vendor';

          if (/[\\/]src[\\/]/.test(id)) return 'feature-app';

          return undefined;
        },
      },
    },
  },
});
