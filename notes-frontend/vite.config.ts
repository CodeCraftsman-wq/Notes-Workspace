// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa';
// import tailwindcss from '@tailwindcss/vite'
// import path from "path"



// export default defineConfig({
//   plugins: [react(),tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src")
//     }
//   }
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Keep your existing Tailwind import
import path from 'path'; // Required for your path.resolve alias
import { VitePWA } from 'vite-plugin-pwa';



export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the offline cache when you push new code
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'] // Tells the Service Worker to save all your UI files
      },
      manifest: {
        name: 'Notes Workspace',
        short_name: 'Notes',
        theme_color: '#1c1c1e',
        background_color: '#1c1c1e',
        display: 'standalone', // Makes it feel like a native desktop/mobile app
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});









