import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'styled-system': path.resolve(__dirname, './styled-system'),
    },
  },
  plugins: [react(), tsconfigPaths(), tailwindcss()],
})
