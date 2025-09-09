// vite.plugins/seoFilesPlugin.ts
import type { Plugin } from "vite";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

export function seoFilesPlugin(): Plugin {
    return {
        name: "seo-files-plugin",
        apply: "build",

        closeBundle() {
            const outDir = "dist";
            if (!existsSync(outDir)) {
                mkdirSync(outDir, { recursive: true });
            }

            // === Generate sitemap.xml ===
            const sitemap = `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://softwyx.com/experience</loc>
    <lastmod>2025-09-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://softwyx.com/education</loc>
    <lastmod>2025-09-09</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://softwyx.com/skills</loc>
    <lastmod>2025-09-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://softwyx.com/projects</loc>
    <lastmod>2025-09-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://softwyx.com/github</loc>
    <lastmod>2025-09-09</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

            writeFileSync(join(outDir, "sitemap.xml"), sitemap, "utf-8");

            // === Generate robots.txt ===
            const robots = `User-agent: *
Allow: /
Disallow: /*.json$

Sitemap: https://softwyx.com/sitemap.xml

# Performance
Crawl-delay: 1`;

            writeFileSync(join(outDir, "robots.txt"), robots, "utf-8");

            // === Generate manifest.json ===
            const manifest = {
                name: "FallegaHQ resume",
                short_name: "resume",
                description: "FallegaHQ resume App",
                start_url: "/",
                display: "standalone",
                background_color: "#fff",
                theme_color: "#000",
                icons: [

                    {
                        "src": "/android-icon-36x36.png",
                        "sizes": "36x36",
                        "type": "image/png",
                        "density": "0.75"
                    },
                    {
                        "src": "/android-icon-48x48.png",
                        "sizes": "48x48",
                        "type": "image/png",
                        "density": "1.0"
                    },
                    {
                        "src": "/android-icon-72x72.png",
                        "sizes": "72x72",
                        "type": "image/png",
                        "density": "1.5"
                    },
                    {
                        "src": "/android-icon-96x96.png",
                        "sizes": "96x96",
                        "type": "image/png",
                        "density": "2.0"
                    },
                    {
                        "src": "/android-icon-144x144.png",
                        "sizes": "144x144",
                        "type": "image/png",
                        "density": "3.0"
                    },
                    {
                        "src": "/android-icon-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "density": "4.0"
                    }
                ],
            };

            writeFileSync(
                join(outDir, "manifest.json"),
                JSON.stringify(manifest, null, 2),
                "utf-8"
            );
        },
    };
}
