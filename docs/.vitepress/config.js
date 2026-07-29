import { existsSync, readFileSync, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import removeMarkdown from "remove-markdown";
import { sidebar } from "./sidebar.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const bnfGrammar = JSON.parse(
    readFileSync(join(__dirname, "grammars/bnf.tmLanguage.json"), "utf-8"),
);

/** Public site origin for absolute Open Graph URLs (no trailing slash). */
const SITE_ORIGIN = (
    process.env.VITEPRESS_SITE_ORIGIN ?? "https://docs.vala.dev"
).replace(/\/+$/, "");

/** @param siteData Resolved VitePress site data (see SiteData in vitepress types). */
function siteBasePrefix(siteData) {
    let base = siteData.base || "/";
    if (!base.endsWith("/")) {
        base = `${base}/`;
    }
    if (base === "/") {
        return "";
    }
    return base.slice(0, -1);
}

/**
 * Turn VitePress page file path into site URL pathname (aligned with sitemap).
 * @param {string} page e.g. "tutorials/index.md"
 * @param siteConfig Resolved VitePress site config (rewrites, cleanUrls, etc.).
 */
function pageMdToUrlPath(page, siteConfig) {
    const resolved = siteConfig.rewrites.map[page] || page;
    let pathname = resolved.replace(/(^|\/)index\.md$/, "$1");
    pathname = pathname.replace(/\.md$/, siteConfig.cleanUrls ? "" : ".html");
    if (pathname === "" || pathname === "/") {
        return siteConfig.cleanUrls ? "/" : "/index.html";
    }
    return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

/**
 * Canonical absolute URL for the page (for og:url).
 * @param {string} page
 * @param siteData Resolved VitePress site data.
 * @param siteConfig Resolved VitePress site config.
 */
function canonicalPageUrl(page, siteData, siteConfig) {
    const pathname = pageMdToUrlPath(page, siteConfig);
    const pathForUrl = pathname === "/index.html" ? "/" : pathname;
    return `${SITE_ORIGIN}${siteBasePrefix(siteData)}${pathForUrl}`;
}

/**
 * Absolute URL for a static asset under docs/public.
 * @param siteData Resolved VitePress site data.
 * @param {string} assetPath e.g. "/logo.png"
 */
function absoluteAssetUrl(siteData, assetPath) {
    const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
    return `${SITE_ORIGIN}${siteBasePrefix(siteData)}${path}`;
}

const MAX_DESCRIPTION_SNIPPET_LENGTH = 200;

/**
 * @param {string} markdown
 */
function stripYamlFrontmatter(markdown) {
    return markdown.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---\s*\r?\n?/, "");
}

/**
 * Plain-text excerpt from Markdown for meta / Open Graph when no `description` is set.
 * Strips YAML front matter, runs remove-markdown, then truncates for meta tags.
 * @param {string} markdown
 * @param {number} [maxLen]
 */
function markdownToDescriptionSnippet(
    markdown,
    maxLen = MAX_DESCRIPTION_SNIPPET_LENGTH,
) {
    if (!markdown || typeof markdown !== "string") {
        return "";
    }
    const withoutFrontmatter = stripYamlFrontmatter(markdown);
    let plain = removeMarkdown(withoutFrontmatter, { gfm: true });
    plain = plain.replace(/\s+/g, " ").trim();
    if (!plain.length) {
        return "";
    }
    if (plain.length <= maxLen) {
        return plain;
    }
    const slice = plain.slice(0, maxLen);
    const lastSpace = slice.lastIndexOf(" ");
    const cut = lastSpace > maxLen * 0.55 ? lastSpace : maxLen;
    return `${plain.slice(0, cut).trim()}...`;
}

export default {
    // site-level options
    lang: "en-US",
    license: "CC-BY-SA-4.0",
    title: "Vala Documentation",
    description: "Official documentation for the Vala programming language",
    head: [
        [
            "link",
            {
                rel: "icon",
                href: "/favicon.png",
            },
        ],
    ],
    transformPageData(pageData, { siteConfig }) {
        if (
            typeof pageData.description === "string" &&
            pageData.description.trim() !== ""
        ) {
            return;
        }
        if (!pageData.relativePath) {
            return;
        }
        const filePath = join(siteConfig.srcDir, pageData.relativePath);
        if (!existsSync(filePath)) {
            return;
        }
        const raw = readFileSync(filePath, "utf-8");
        const snippet = markdownToDescriptionSnippet(raw);
        if (!snippet.trim()) {
            return;
        }
        return { description: snippet };
    },
    transformHead({ page, siteData, siteConfig, title, description }) {
        const url = canonicalPageUrl(page, siteData, siteConfig);
        const image = absoluteAssetUrl(siteData, "/logo.png");
        const desc = description.replace(/\s+/g, " ").trim();
        const ogLocale = (siteData.lang || "en-US").replace(/-/g, "_");
        return [
            ["meta", { property: "og:title", content: title }],
            ["meta", { property: "og:description", content: desc }],
            ["meta", { property: "og:url", content: url }],
            ["meta", { property: "og:type", content: "website" }],
            ["meta", { property: "og:site_name", content: siteData.title }],
            ["meta", { property: "og:locale", content: ogLocale }],
            ["meta", { property: "og:image", content: image }],
            ["meta", { property: "og:image:alt", content: siteData.title }],
            ["meta", { name: "twitter:card", content: "summary" }],
            ["meta", { name: "twitter:title", content: title }],
            ["meta", { name: "twitter:description", content: desc }],
            ["meta", { name: "twitter:image", content: image }],
        ];
    },
    locales: {
        root: {
            label: "English",
            lang: "en",
        },
    },
    markdown: {
        languages: [bnfGrammar],
    },
    themeConfig: {
        // theme-level options
        logo: "/logo.png",
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/vala-lang/vala-docs",
            },
        ],
        lastUpdated: true,
        editLink: {
            pattern: "https://github.com/vala-lang/vala-docs/edit/main/docs/:path",
        },
        search: {
            provider: "local",
        },
        nav: [
            { text: "Get Started", link: "/installation-guide" },
            { text: "Tutorials", link: "/tutorials/" },
            { text: "Guides", link: "/guides/" },
            {
                text: "Resources",
                items: [
                    { text: "About", link: "/about" },
                    { text: "Sample Code", link: "/sample-code/" },
                    { text: "Tooling", link: "/tooling/" },
                    { text: "Genie", link: "/genie/" },
                    { text: "FAQ", link: "/faq" },
                ],
            },
        ],
        sidebar,
    },
    async buildEnd(siteConfig) {
        const outDir = siteConfig.outDir;
        const guidesDir = join(outDir, "guides");
        const devGuidesDir = join(outDir, "developer-guides");

        function createRedirects(dir) {
            if (!existsSync(dir)) return;
            const entries = readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                const srcPath = join(dir, entry.name);
                const relPath = relative(guidesDir, srcPath);
                const destPath = join(devGuidesDir, relPath);

                if (entry.isDirectory()) {
                    mkdirSync(destPath, { recursive: true });
                    createRedirects(srcPath);
                } else if (entry.isFile() && entry.name.endsWith(".html")) {
                    const targetUrl = "/guides/" + relPath.replace(/\\/g, "/");
                    const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <link rel="canonical" href="${targetUrl}">
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <script>location.replace("${targetUrl}" + location.search + location.hash);</script>
</head>
<body>
  <p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p>
</body>
</html>`;
                    mkdirSync(dirname(destPath), { recursive: true });
                    writeFileSync(destPath, redirectHtml);
                }
            }
        }
        createRedirects(guidesDir);
    },
};
