import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import { VitePWA } from 'vite-plugin-pwa'; // <--- ایمپورت پلاگین PWA

const routes = [
  '/', '/fa', '/en', '/ku',
  '/fa/services', '/en/services', '/ku/services',
  '/fa/about', '/en/about', '/ku/about',
  '/fa/contact', '/en/contact', '/ku/contact',
  '/fa/blog', '/en/blog', '/ku/blog',
  '/fa/blog/instc-corridor-logistics-2026',
  '/fa/blog/etir-blockchain-revolution',
  '/fa/blog/gold-standards-cross-stuffing-kri',
  '/fa/blog/integrated-cold-chain-management',
  '/fa/blog/incoterms-2020-fca-vs-exw',
  '/fa/blog/multimodal-logistics-cis',
  '/fa/blog/iran-customs-update-2026',
];

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://rojdagroup.com', 
      dynamicRoutes: routes,
      changefreq: 'daily',
      priority: 0.8,
    }),
    // 🚀 پیکربندی PWA برای حالت کاملاً آفلاین و دکمه نصب
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'robots.txt'], 
      manifest: {
        name: 'روژدا لجستیک | Rojda Logistic',
        short_name: 'Rojda',
        description: 'سیستم جامع مدیریت زنجیره تامین و لجستیک بین‌المللی',
        theme_color: '#05060A',
        background_color: '#05060A',
        display: 'standalone', // حذف نوار مرورگر
        start_url: '/', // 🌟 بسیار مهم: نقطه شروع اپلیکیشن برای فعال شدن دکمه نصب
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // 🌟 جادوی آفلاین: کش کردن تمام فایل‌های حیاتی، عکس‌ها و فونت‌ها
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // اگر کاربر در حالت آفلاین رفرش کرد، او را به هسته React برگردان:
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor'; 
            }
            if (id.includes('leaflet')) {
              return 'map-engine'; 
            }
            if (id.includes('lucide-react')) {
              return 'icons'; 
            }
            return 'core-libs'; 
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
});