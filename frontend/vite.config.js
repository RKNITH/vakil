import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['balance.png', 'robots.txt'],
      manifest: {
        name: 'Personal Lawyer',
        short_name: 'Vakil',
        description: 'Your Personal Lawyer',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'balance.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'balance.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})