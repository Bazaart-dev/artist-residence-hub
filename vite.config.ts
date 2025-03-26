import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Alternative plus rapide

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
