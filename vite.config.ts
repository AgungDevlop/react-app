import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";
import fs from "fs";

const baseURL = "https://agungwandev.com";

const pages = [
  {
    path: "",
    title: "AgungDev - Fullstack Developer & Android Enthusiast",
    desc: "Portfolio Website AgungDev. Menjelajahi semesta kode untuk menciptakan solusi digital yang inovatif.",
  },
  {
    path: "contact",
    title: "Contact | AgungDev",
    desc: "Hubungi AgungDev melalui WhatsApp, Email, GitHub, atau Instagram untuk kolaborasi.",
  },
  {
    path: "skills",
    title: "Skills | AgungDev",
    desc: "Arsip kemampuan teknis AgungDev: React, Flutter, Kotlin, Python, dan lainnya.",
  },
  {
    path: "hobbies",
    title: "Hobbies | AgungDev",
    desc: "Minat dan hobi AgungDev diluar coding: Musik, Gaming, dan Olahraga.",
  },
  {
    path: "projects",
    title: "Projects | AgungDev",
    desc: "Kumpulan proyek terbaik: Sub For Unlock, Viplay, Neon Magisk, dan aplikasi Android.",
  },
  {
    path: "education",
    title: "Education | AgungDev",
    desc: "Perjalanan akademik AgungDev dari sekolah dasar hingga universitas.",
  },
  {
    path: "testimonials",
    title: "Testimonials | AgungDev",
    desc: "Apa kata klien tentang hasil kerja dan kolaborasi dengan AgungDev.",
  },
  {
    path: "privacy",
    title: "Privacy Policy | AgungDev",
    desc: "Kebijakan privasi dan transparansi data pengguna di AgungDev Portfolio.",
  }
];

export default defineConfig({
  base: "/", 
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,json}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          /^\/sitemap\.xml$/,
          /^\/robots\.txt$/,
          /^\/.*\/index\.html$/ 
        ]
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
      name: 'static-site-generator',
      closeBundle: async () => {
        const outDir = resolve(__dirname, 'dist');
        if (!fs.existsSync(outDir)) return;

        const template = fs.readFileSync(resolve(outDir, 'index.html'), 'utf-8');

        pages.forEach(page => {
          let html = template;
          const fullURL = page.path ? `${baseURL}/${page.path}` : baseURL;
          
          html = html.replace(/<!--__SEO_TITLE__-->/g, page.title)
                     .replace(/<!--__SEO_DESCRIPTION__-->/g, page.desc)
                     .replace(/<!--__SEO_URL__-->/g, fullURL);

          if (page.path === "") {
            fs.writeFileSync(resolve(outDir, 'index.html'), html);
          } else {
            const routeDir = resolve(outDir, page.path);
            if (!fs.existsSync(routeDir)) fs.mkdirSync(routeDir);
            fs.writeFileSync(resolve(routeDir, 'index.html'), html);
          }
        });

        fs.writeFileSync(resolve(outDir, '404.html'), template);

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${baseURL}${page.path ? '/' + page.path : ''}</loc>
    <changefreq>${page.path === "" ? "daily" : "weekly"}</changefreq>
    <priority>${page.path === "" ? "1.0" : "0.8"}</priority>
  </url>`).join('')}
</urlset>`;

        fs.writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap);
        fs.writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${baseURL}/sitemap.xml`);
        
        console.log('✅ Static Routes & SEO Tags Generated Successfully!');
      }
    }
  ],
  server: {
    host: true,
  },
});