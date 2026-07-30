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
            { text: "Get Started", link: "/get-started/installation-guide" },
            { text: "Tutorials", link: "/tutorials/main" },
            { text: "Guides", link: "/guides/bindings" },
            {
                text: "Resources",
                items: [
                    { text: "About", link: "/about" },
                    {
                        text: "Sample Code",
                        link: "/sample-code/language-features-and-introductory-samples",
                    },
                    { text: "Tooling", link: "/tooling/build-systems" },
                    { text: "Genie", link: "/genie/" },
                    { text: "FAQ", link: "/faq" },
                ],
            },
        ],
        sidebar,
    },
    async buildEnd(siteConfig) {
        const outDir = siteConfig.outDir;

        /** @param {string} targetUrl */
        function redirectHtmlFor(targetUrl) {
            return `<!DOCTYPE html>
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
        }

        /**
         * Write a redirect stub at an old built HTML path pointing to a new URL.
         * @param {string} destPath
         * @param {string} targetUrl
         */
        function writeRedirect(destPath, targetUrl) {
            mkdirSync(dirname(destPath), { recursive: true });
            writeFileSync(destPath, redirectHtmlFor(targetUrl));
        }

        /**
         * Mirror every built HTML page under `newDir` into `oldDir`, at the same
         * relative path, as a stub redirecting to the page's new URL under
         * `newUrlPrefix`. Lets an old directory tree keep working after a rename.
         * @param {string} newDir
         * @param {string} oldDir
         * @param {string} newUrlPrefix
         * @param {string} [dir]
         */
        function mirrorRedirects(newDir, oldDir, newUrlPrefix, dir = newDir) {
            if (!existsSync(dir)) return;
            const entries = readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                const srcPath = join(dir, entry.name);
                const relPath = relative(newDir, srcPath);
                const destPath = join(oldDir, relPath);

                if (entry.isDirectory()) {
                    mirrorRedirects(newDir, oldDir, newUrlPrefix, srcPath);
                } else if (entry.isFile() && entry.name.endsWith(".html")) {
                    const targetUrl =
                        newUrlPrefix + "/" + relPath.replace(/\\/g, "/");
                    writeRedirect(destPath, targetUrl);
                }
            }
        }

        mirrorRedirects(
            join(outDir, "guides"),
            join(outDir, "developer-guides"),
            "/guides",
        );

        // Contributor Guide and Compiler Guide are no longer nested under
        // /contributor-guide/; they're now top-level pages under /guides/.
        mirrorRedirects(
            join(outDir, "guides", "compiler-guide"),
            join(outDir, "contributor-guide", "compiler-guide"),
            "/guides/compiler-guide",
        );
        writeRedirect(
            join(outDir, "contributor-guide", "compiler-guide.html"),
            "/guides/compiler-guide",
        );
        writeRedirect(
            join(outDir, "contributor-guide", "index.html"),
            "/guides/contributor-guide",
        );

        // "Vala for C# Programmers" and "Vala for Java Programmers" are no
        // longer nested under /guides/documentation/.
        mirrorRedirects(
            join(outDir, "guides", "vala-for-csharp-programmers"),
            join(outDir, "guides", "documentation", "vala-for-csharp-programmers"),
            "/guides/vala-for-csharp-programmers",
        );
        writeRedirect(
            join(outDir, "guides", "documentation", "vala-for-csharp-programmers.html"),
            "/guides/vala-for-csharp-programmers",
        );
        mirrorRedirects(
            join(outDir, "guides", "vala-for-java-programmers"),
            join(outDir, "guides", "documentation", "vala-for-java-programmers"),
            "/guides/vala-for-java-programmers",
        );
        writeRedirect(
            join(outDir, "guides", "documentation", "vala-for-java-programmers.html"),
            "/guides/vala-for-java-programmers",
        );

        // "Programming Language" and "GUI Programming" are now sidebar section
        // titles only; their old index pages are gone and Main Tutorial moved
        // up one level.
        mirrorRedirects(
            join(outDir, "tutorials", "main"),
            join(outDir, "tutorials", "programming-language", "main"),
            "/tutorials/main",
        );
        writeRedirect(
            join(outDir, "tutorials", "programming-language.html"),
            "/tutorials/main",
        );
        writeRedirect(
            join(outDir, "tutorials", "gui-programming.html"),
            "/tutorials/main",
        );
        // The Tutorials index page is gone; the nav link now goes straight to
        // the main tutorial.
        writeRedirect(join(outDir, "tutorials", "index.html"), "/tutorials/main");

        // The Installation Guide is no longer a top-level page; it now lives
        // under /get-started/ as that section's default page.
        writeRedirect(
            join(outDir, "installation-guide.html"),
            "/get-started/installation-guide",
        );

        // Guides, Sample Code, and Tooling index pages are gone the same way;
        // their nav links now go straight to a default page in each section.
        writeRedirect(join(outDir, "guides", "index.html"), "/guides/bindings");
        writeRedirect(
            join(outDir, "sample-code", "index.html"),
            "/sample-code/language-features-and-introductory-samples",
        );
        writeRedirect(
            join(outDir, "tooling", "index.html"),
            "/tooling/build-systems",
        );

        // The Documentation and Plugins sections' index pages are gone the
        // same way; their sidebar entries are now plain section headers with
        // no link.
        writeRedirect(
            join(outDir, "guides", "documentation.html"),
            "/guides/documentation/valadoc-guide",
        );
        writeRedirect(
            join(outDir, "guides", "plugins.html"),
            "/guides/plugins/01-type-modules",
        );
    },
};
