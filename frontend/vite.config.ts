import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import vercel from 'vite-plugin-vercel';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT as unknown as number,
  },
  resolve: {
    alias: {
      "styled-system": path.resolve(__dirname, "./styled-system"),
    },
  },
  plugins: [react(), tsconfigPaths(), tailwindcss(), vercel()],
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
});
