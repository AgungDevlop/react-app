import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";
import fs from "fs";

const routes = [
  "contact",
  "skills",
  "hobbies",
  "projects",
  "education",
  "testimonials",
  "privacy"
];

const baseURL = "https://agungwandev.com";

export default defineConfig({
  base: "/", 
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}"],
      },
      manifest: {
        name: "AgungDev Portfolio",
        short_name: "AgungDev",
        description: "Portfolio Website AgungDev",
        theme_color: "#0f172a",
        background_color: "#000000",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          }
        ],
      },
    }),
    {
      name: 'post-build-route-generation',
      closeBundle: async () => {
        const outDir = resolve(__dirname, 'dist');
        
        if (fs.existsSync(outDir)) {
          const template = fs.readFileSync(resolve(outDir, 'index.html'), 'utf-8');

          fs.writeFileSync(resolve(outDir, '404.html'), template);

          routes.forEach(route => {
            const routeDir = resolve(outDir, route);
            if (!fs.existsSync(routeDir)) {
              fs.mkdirSync(routeDir);
            }
            fs.writeFileSync(resolve(routeDir, 'index.html'), template);
          });

          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseURL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${routes.map(route => `
  <url>
    <loc>${baseURL}/${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

          fs.writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap);
          fs.writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${baseURL}/sitemap.xml`);
          
          console.log('✅ SEO Static Routes & Sitemap Generated Successfully!');
        }
      }
    }
  ],
  server: {
    host: true,
  },
});