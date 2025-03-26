import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Changé depuis plugin-react-swc

export default defineConfig({
  plugins: [react()],
})
