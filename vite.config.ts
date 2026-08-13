import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    strictPort: false, // Falls back to next free port only if 5173 is still in use
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
