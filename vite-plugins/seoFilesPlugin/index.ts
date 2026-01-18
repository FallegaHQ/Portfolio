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

            const siteUrl = process.env.SITE_URL || "https://softwyx.com";
            const lastmod = new Date().toISOString().split("T")[0];
            const routes = [
                "/",
                "/home",
                "/experience",
                "/education",
                "/skills",
                "/projects",
                "/github"
            ];

            // === Generate sitemap.xml ===
            const changefreqByRoute: Record<string, string> = {
                "/"          : "monthly",
                "/home"      : "monthly",
                "/experience": "monthly",
                "/education" : "yearly",
                "/skills"    : "weekly",
                "/projects"  : "weekly",
                "/github"    : "daily"
            };

            const priorityByRoute: Record<string, string> = {
                "/"          : "1.0",
                "/home"      : "1.0",
                "/experience": "1.0",
                "/education" : "0.6",
                "/skills"    : "0.8",
                "/projects"  : "0.9",
                "/github"    : "1.0"
            };

            const sitemapUrls = routes
                .map((route) => {
                    const loc = route === "/" ? siteUrl : `${siteUrl}${route}`;
                    const changefreq = changefreqByRoute[route] || "monthly";
                    const priority = priorityByRoute[route] || "0.5";

                    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
                })
                .join("\n");

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>`;

            writeFileSync(join(outDir, "sitemap.xml"), sitemap, "utf-8");

            // === Generate robots.txt ===
            const robots = `User-agent: *
Allow: /
Disallow: /*.json$

Sitemap: ${siteUrl}/sitemap.xml

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
