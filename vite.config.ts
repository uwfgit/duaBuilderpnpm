import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Use environment variables for base path and API endpoint
const ENDPOINT = 'https://workshop.cfg.deloitte.com/cfg-ai-demo';
// const BASE_PATH =  '/assistant/';
const isDev =  process.env.NODE_ENV  === 'dev';
// const API_ENDPOINT = process.env.VITE_API_ENDPOINT || 'http://localhost:4200';
export default defineConfig({
  base: './',
  define: {
    'process.env': {
      VITE_API_ENDPOINT: process.env.VITE_API_ENDPOINT || 'http://localhost:4200',
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    minify: !isDev, // Disable minification in development mode
    sourcemap: isDev, // Enable source maps
},

  server: {
    port: 4200,
    proxy: {
      '/Monolith': {
        target: ENDPOINT,
        changeOrigin: true,
        secure: false,
        preserveHeaderKeyCase: true,
      },
    },    
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
