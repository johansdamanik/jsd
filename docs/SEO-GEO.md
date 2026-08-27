# SEO/GEO Runbook

SEO covers search engines; GEO covers discovery and citation by generative search systems. The production build keeps the Pip-Boy React interface on `/` and `/projects/`, while About and project case-study routes remain crawlable static pages.

## Source of truth

- `src/data/siteConfig.ts`: domain, identity, location, contact, employment, resume, social links, homepage metadata, OG image, and homepage `lastModified`.
- `src/data/portfolioData.ts`: visible profile content plus project/case-study data.
- `scripts/generate-seo.ts`: validates source data and generates static HTML, JSON-LD, sitemap, robots, `llms.txt`, and manifest output.

Each `QUESTS_DATA` project requires `slug`, `seoTitle`, `seoDescription`, `caseStudySummary`, `imagePath`, and ISO `dateModified`, in addition to its visible portfolio fields. Slugs must be unique. Demo URLs must use HTTPS; repository URLs must use HTTPS on `github.com`; referenced images must exist in `public/`.

Update `SITE_CONFIG.seo.lastModified` after a significant homepage/profile change. Update only the affected project's `dateModified` after a significant case-study, structured-data, or link change. Use the real `YYYY-MM-DD` date; do not bump dates for cosmetic-only edits.

## Local workflow

```bash
npm run seo:check
npm run lint
npm run build
npm run preview
```

- `seo:check` validates source data and checks tracked public SEO files for drift.
- `build` runs Vite, generates the static SEO/GEO pages in ignored `dist/`, and verifies the generated output.
- `preview` serves `dist/`; inspect this server when checking production routes and metadata.
- The Vite development fallback and production `/projects/` route open at `DATA / QUESTS`; `/projects/{known-slug}/` opens that quest in development and remains a static case study in production. All navigation remains normal crawlable links.

Generated indexable routes:

- `/`
- `/about/`
- `/projects/`
- `/projects/kartel-daun/`
- `/projects/plantex/`
- `/projects/kasira/`
- `/projects/levelup/`
- `/projects/sisikita/`
- `/projects/yt-tools/`

The build also emits `404.html`, `sitemap.xml`, `robots.txt`, `llms.txt`, and `manifest.webmanifest`.

## Post-deploy checks

1. Confirm all generated routes return HTTP 200, the unknown-route response is a real 404, and `https://simeon.id/sitemap.xml`, `/robots.txt`, `/llms.txt`, the resume PDF, favicon, and OG image are reachable.
2. View source on the homepage, About, project index, and one project page. Confirm one H1, unique title/description/canonical, visible content without JavaScript, and parseable JSON-LD.
3. Run representative URLs through [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org/). Fix errors; review warnings for relevance.
4. Validate `https://simeon.id/og-image.png` and page previews with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). Confirm the 1200×630 image, title, description, and canonical URL.
5. Check mobile/desktop layout, internal links, resume, live demos, repositories, and Core Web Vitals after deployment.

## Search and AI submission

- In Google Search Console, verify the `simeon.id` property, submit `https://simeon.id/sitemap.xml` in the Sitemaps report, inspect the homepage and key routes, then request indexing after major releases. Monitor indexing, crawl errors, queries, impressions, CTR, and Core Web Vitals.
- In Bing Webmaster Tools, verify the site or import it from Search Console, submit the same sitemap, and monitor sitemap processing, URL inspection, and search performance.
- Keep `OAI-SearchBot` allowed in `robots.txt`. In analytics, monitor referrals whose source/referrer is `chatgpt.com`; optionally group ChatGPT and other AI referrers in a dedicated acquisition report. Crawler access improves discoverability but does not guarantee citation or ranking.

Search Console, Bing Webmaster Tools, analytics configuration, ownership verification, URL-indexing requests, and social-preview cache refreshes require external accounts and must be completed by the site owner after deployment. Repository code cannot perform those account actions.
