import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        id: "/",
        name: "Floreciendo Juntas",
        short_name: "Floreciendo",
        description: "Comunidad de emprendimiento y aprendizaje",
        start_url: "/",
        scope: "/", // 👈 OBLIGATORIO: Define que toda la web vive dentro de la PWA
        display: "standalone",
        display_override: ["standalone", "fullscreen"], // 👈 OBLIGATORIO PARA iOS: Refuerza el modo App
        orientation: "portrait",
        background_color: "#FAF8F9",
        theme_color: "#D72E79",
        icons: [
          {
            src: "/192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/750x1334.png",
            sizes: "750x1334",
            type: "image/png",
            form_factor: "narrow",
            label: "Pantalla principal en celular",
          },
          {
            src: "/1280x800.png",
            sizes: "1280x800",
            type: "image/png",
            form_factor: "wide",
            label: "Pantalla principal en computadora",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],

        // 👈 OBLIGATORIO PARA SPA EN iOS: Redirige las navegaciones de ruta a index.html
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api/], // Evita interceptar peticiones a tu API backend

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*(jpg|jpeg|png|webp|svg|gif).*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 5000,
  },
  server: {
    allowedHosts: ["twiki-complex-linear-sticky.trycloudflare.com"],
    port: 5173,
  },
});
