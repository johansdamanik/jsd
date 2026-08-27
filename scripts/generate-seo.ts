import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { EDUCATION_DATA, PROFILE, QUESTS_DATA, SPECIAL_STATS } from '../src/data/portfolioData.ts';
import { SITE_CONFIG } from '../src/data/siteConfig.ts';
import type { Quest } from '../src/types.ts';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const CHECK_ONLY = process.argv.includes('--check');
const HOME_URL = `${SITE_CONFIG.domain}/`;
const OG_IMAGE_URL = `${SITE_CONFIG.domain}${SITE_CONFIG.seo.ogImagePath}`;
const RESUME_URL = absoluteUrl(SITE_CONFIG.resume.path);
const ROBOTS_CONTENT = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

type JsonLd = Record<string, unknown>;

const FAQ_ITEMS = [
  {
    question: `Who is ${SITE_CONFIG.identity.name}?`,
    answer: `${SITE_CONFIG.identity.name} is a ${SITE_CONFIG.role} based in ${SITE_CONFIG.location.label}. ${SITE_CONFIG.description}`,
  },
  {
    question: `What systems does ${SITE_CONFIG.identity.givenName} build?`,
    answer: 'He builds ERP, point-of-sale, commerce, payment, logistics, productivity, community, and media automation systems.',
  },
  {
    question: `What technologies does ${SITE_CONFIG.identity.givenName} use?`,
    answer: `His project stack includes ${unique(QUESTS_DATA.flatMap((quest) => quest.techStack)).slice(0, 14).join(', ')}.`,
  },
  {
    question: `How can I contact ${SITE_CONFIG.identity.name}?`,
    answer: `Email ${SITE_CONFIG.contact.email}, call ${SITE_CONFIG.contact.phone}, or use the contact links on ${HOME_URL}.`,
  },
] as const;

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeXml(value: string): string {
  return escapeHtml(value);
}

function jsonLd(value: JsonLd): string {
  return JSON.stringify(value, null, 2).replaceAll('<', '\\u003c');
}

function absoluteUrl(route: string): string {
  return new URL(route, `${SITE_CONFIG.domain}/`).toString();
}

function projectRoute(quest: Quest): string {
  return `/projects/${quest.slug}/`;
}

function assertNonEmpty(label: string, value: unknown): asserts value is string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function assertIsoDate(label: string, value: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${label} must use YYYY-MM-DD format; received "${value}".`);
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} is not a valid calendar date: "${value}".`);
  }
}

function assertWebUrl(label: string, value: string): void {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${label} must be a valid web URL: "${value}".`);
  }
  if (parsed.protocol !== 'https:' || !parsed.hostname) {
    throw new Error(`${label} must use HTTPS with a hostname: "${value}".`);
  }
}

function assertGithubUrl(label: string, value: string): void {
  assertWebUrl(label, value);
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'github.com' || parsed.pathname === '/') {
    throw new Error(`${label} must be an HTTPS github.com URL: "${value}".`);
  }
}

async function assertPublicFile(label: string, publicPath: string): Promise<void> {
  if (!publicPath.startsWith('/') || publicPath.includes('..')) {
    throw new Error(`${label} must be an absolute public path without traversal: "${publicPath}".`);
  }

  const resolved = path.resolve(PUBLIC_DIR, publicPath.slice(1));
  if (!resolved.startsWith(`${PUBLIC_DIR}${path.sep}`)) {
    throw new Error(`${label} resolves outside public/: "${publicPath}".`);
  }

  try {
    await access(resolved);
  } catch {
    throw new Error(`${label} references a missing public file: "${publicPath}".`);
  }
}

async function validateInputs(): Promise<void> {
  const requiredSiteFields: Array<[string, unknown]> = [
    ['SITE_CONFIG.domain', SITE_CONFIG.domain],
    ['SITE_CONFIG.language', SITE_CONFIG.language],
    ['SITE_CONFIG.identity.name', SITE_CONFIG.identity.name],
    ['SITE_CONFIG.role', SITE_CONFIG.role],
    ['SITE_CONFIG.location.label', SITE_CONFIG.location.label],
    ['SITE_CONFIG.contact.email', SITE_CONFIG.contact.email],
    ['SITE_CONFIG.employment.organization', SITE_CONFIG.employment.organization],
    ['SITE_CONFIG.employment.role', SITE_CONFIG.employment.role],
    ['SITE_CONFIG.resume.path', SITE_CONFIG.resume.path],
    ['SITE_CONFIG.seo.homeTitle', SITE_CONFIG.seo.homeTitle],
    ['SITE_CONFIG.seo.homeDescription', SITE_CONFIG.seo.homeDescription],
    ['SITE_CONFIG.seo.ogImagePath', SITE_CONFIG.seo.ogImagePath],
  ];
  requiredSiteFields.forEach(([label, value]) => assertNonEmpty(label, value));

  const domain = new URL(SITE_CONFIG.domain);
  if (domain.protocol !== 'https:' || domain.pathname !== '/') {
    throw new Error('SITE_CONFIG.domain must be an HTTPS origin without a path.');
  }

  assertGithubUrl('SITE_CONFIG.social.github', SITE_CONFIG.social.github);

  assertIsoDate('SITE_CONFIG.seo.lastModified', SITE_CONFIG.seo.lastModified);
  await assertPublicFile('SITE_CONFIG.seo.ogImagePath', SITE_CONFIG.seo.ogImagePath);
  await assertPublicFile('SITE_CONFIG.resume.path', SITE_CONFIG.resume.path);
  if (RESUME_URL !== new URL(SITE_CONFIG.resume.path, `${SITE_CONFIG.domain}/`).toString()) {
    throw new Error('Resume URL must be derived from SITE_CONFIG.domain and SITE_CONFIG.resume.path.');
  }

  if (QUESTS_DATA.length === 0) {
    throw new Error('QUESTS_DATA must contain at least one project.');
  }

  const seenSlugs = new Set<string>();
  for (const [index, quest] of QUESTS_DATA.entries()) {
    const prefix = `QUESTS_DATA[${index}]`;
    const requiredQuestFields: Array<[string, unknown]> = [
      ['id', quest.id],
      ['slug', quest.slug],
      ['title', quest.title],
      ['seoTitle', quest.seoTitle],
      ['seoDescription', quest.seoDescription],
      ['caseStudySummary', quest.caseStudySummary],
      ['imagePath', quest.imagePath],
      ['dateModified', quest.dateModified],
      ['organization', quest.organization],
      ['role', quest.role],
      ['summary', quest.summary],
    ];
    requiredQuestFields.forEach(([field, value]) => assertNonEmpty(`${prefix}.${field}`, value));

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(quest.slug)) {
      throw new Error(`${prefix}.slug is unsafe: "${quest.slug}".`);
    }
    if (seenSlugs.has(quest.slug)) {
      throw new Error(`Duplicate project slug: "${quest.slug}".`);
    }
    seenSlugs.add(quest.slug);

    assertIsoDate(`${prefix}.dateModified`, quest.dateModified);
    await assertPublicFile(`${prefix}.imagePath`, quest.imagePath);
    if (quest.demoUrl) assertWebUrl(`${prefix}.demoUrl`, quest.demoUrl);
    if (quest.githubUrl) assertGithubUrl(`${prefix}.githubUrl`, quest.githubUrl);
  }
}

function personSchema(): JsonLd {
  return {
    '@type': 'Person',
    '@id': `${SITE_CONFIG.domain}/#person`,
    name: SITE_CONFIG.identity.name,
    givenName: SITE_CONFIG.identity.givenName,
    familyName: SITE_CONFIG.identity.familyName,
    jobTitle: SITE_CONFIG.role,
    url: HOME_URL,
    image: OG_IMAGE_URL,
    email: `mailto:${SITE_CONFIG.contact.email}`,
    telephone: SITE_CONFIG.contact.phone.replaceAll(' ', ''),
    sameAs: [SITE_CONFIG.social.github],
    nationality: { '@type': 'Country', name: SITE_CONFIG.location.country },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.region,
      addressCountry: SITE_CONFIG.location.countryCode,
    },
    alumniOf: EDUCATION_DATA.map((education) => ({
      '@type': 'EducationalOrganization',
      name: education.institution,
      description: `${education.program}; ${education.score}`,
    })),
    worksFor: {
      '@type': 'Organization',
      name: SITE_CONFIG.employment.organization,
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: SITE_CONFIG.employment.role,
    },
    description: SITE_CONFIG.seo.homeDescription,
    knowsAbout: unique(QUESTS_DATA.flatMap((quest) => quest.techStack)),
  };
}

function homeSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.domain}/#website`,
        url: HOME_URL,
        name: SITE_CONFIG.identity.name,
        description: SITE_CONFIG.seo.homeDescription,
        publisher: { '@id': `${SITE_CONFIG.domain}/#person` },
        inLanguage: SITE_CONFIG.language,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_CONFIG.domain}/#webpage`,
        url: HOME_URL,
        name: SITE_CONFIG.seo.homeTitle,
        description: SITE_CONFIG.seo.homeDescription,
        dateModified: SITE_CONFIG.seo.lastModified,
        isPartOf: { '@id': `${SITE_CONFIG.domain}/#website` },
        about: { '@id': `${SITE_CONFIG.domain}/#person` },
        mainEntity: { '@id': `${SITE_CONFIG.domain}/#person` },
        inLanguage: SITE_CONFIG.language,
      },
    ],
  };
}

function pageHead(options: {
  title: string;
  description: string;
  canonicalPath: string;
  type?: 'website' | 'profile' | 'article';
  robots?: string;
  schema?: JsonLd;
}): string {
  const canonical = absoluteUrl(options.canonicalPath);
  const type = options.type ?? 'website';
  return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(options.title)}</title>
    <meta name="description" content="${escapeHtml(options.description)}">
    <meta name="author" content="${escapeHtml(SITE_CONFIG.identity.name)}">
    <meta name="robots" content="${escapeHtml(options.robots ?? ROBOTS_CONTENT)}">
    <meta name="theme-color" content="#030804">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="stylesheet" href="/seo.css">
    <meta property="og:type" content="${type}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:site_name" content="${escapeHtml(`${SITE_CONFIG.identity.name} // ${SITE_CONFIG.role}`)}">
    <meta property="og:title" content="${escapeHtml(options.title)}">
    <meta property="og:description" content="${escapeHtml(options.description)}">
    <meta property="og:image" content="${escapeHtml(OG_IMAGE_URL)}">
    <meta property="og:image:width" content="${SITE_CONFIG.seo.ogImageWidth}">
    <meta property="og:image:height" content="${SITE_CONFIG.seo.ogImageHeight}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:alt" content="${escapeHtml(`${SITE_CONFIG.identity.name} — ${SITE_CONFIG.role}`)}">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(options.title)}">
    <meta name="twitter:description" content="${escapeHtml(options.description)}">
    <meta name="twitter:image" content="${escapeHtml(OG_IMAGE_URL)}">
    <meta name="twitter:image:alt" content="${escapeHtml(`${SITE_CONFIG.identity.name} — ${SITE_CONFIG.role}`)}">
    ${options.schema ? `<script type="application/ld+json">${jsonLd(options.schema)}</script>` : ''}`;
}

function siteNav(): string {
  return `<nav class="site-nav" aria-label="Primary navigation">
    <a href="/">INTERACTIVE PROFILE</a>
    <a href="/about/">ABOUT</a>
    <a href="/projects/">PROJECTS</a>
    <a href="${escapeHtml(SITE_CONFIG.resume.path)}">RESUME</a>
  </nav>`;
}

function siteFooter(): string {
  return `<footer class="site-footer">
    <span>STATUS: NOMINAL</span>
    <a href="mailto:${escapeHtml(SITE_CONFIG.contact.email)}">${escapeHtml(SITE_CONFIG.contact.email)}</a>
    <a href="${escapeHtml(SITE_CONFIG.social.github)}" rel="me">GITHUB</a>
  </footer>`;
}

function staticPage(options: {
  title: string;
  description: string;
  canonicalPath: string;
  eyebrow: string;
  body: string;
  type?: 'website' | 'profile' | 'article';
  robots?: string;
  schema?: JsonLd;
}): string {
  return `<!doctype html>
<html lang="${escapeHtml(SITE_CONFIG.language)}">
  <head>${pageHead(options)}</head>
  <body>
    <div class="shell">
      <span class="rivet rivet-left" aria-hidden="true"></span>
      <span class="rivet rivet-right" aria-hidden="true"></span>
      <header class="terminal-header">
        <a class="brand" href="/">● ROBCO MODEL 3000 Mk IV // PERSONAL INFORMATION PROCESSOR</a>
        ${siteNav()}
      </header>
      <main class="screen">
        <p class="eyebrow">${escapeHtml(options.eyebrow)}</p>
        ${options.body}
      </main>
      ${siteFooter()}
    </div>
  </body>
</html>
`;
}

function aboutPage(): string {
  const aboutUrl = absoluteUrl('/about/');
  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `${aboutUrl}#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      {
        '@type': 'AboutPage',
        '@id': `${aboutUrl}#webpage`,
        url: aboutUrl,
        name: `About ${SITE_CONFIG.identity.name}`,
        description: SITE_CONFIG.seo.homeDescription,
        about: { '@id': `${SITE_CONFIG.domain}/#person` },
        mainEntity: { '@id': `${SITE_CONFIG.domain}/#person` },
        inLanguage: SITE_CONFIG.language,
      },
      faqSchema,
    ],
  };

  const skillGroups = SPECIAL_STATS.map((stat) => `
    <article class="data-card">
      <h3>${escapeHtml(stat.name)}</h3>
      <p>${escapeHtml(stat.description)}</p>
      <p class="tags">${stat.keySkills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join('')}</p>
    </article>`).join('');
  const education = EDUCATION_DATA.map((item) => `
    <article class="data-card">
      <h3>${escapeHtml(item.institution)}</h3>
      <p>${escapeHtml(item.program)} — ${escapeHtml(item.score)}</p>
      <p>${escapeHtml(item.highlight)}</p>
    </article>`).join('');
  const faq = FAQ_ITEMS.map((item) => `
    <details class="faq-item">
      <summary>${escapeHtml(item.question)}</summary>
      <p>${escapeHtml(item.answer)}</p>
    </details>`).join('');

  return staticPage({
    title: `About ${SITE_CONFIG.identity.name} | ${SITE_CONFIG.role}`,
    description: `Professional profile, technical skills, education, and contact details for ${SITE_CONFIG.identity.name}, a ${SITE_CONFIG.role} in ${SITE_CONFIG.location.label}.`,
    canonicalPath: '/about/',
    eyebrow: 'PERSONNEL DOSSIER // PROFESSIONAL PROFILE',
    type: 'profile',
    schema,
    body: `
      <header class="hero">
        <p class="status">● AVAILABLE PROFILE DATA</p>
        <h1>${escapeHtml(SITE_CONFIG.identity.name)}</h1>
        <p class="lead">${escapeHtml(SITE_CONFIG.role)} — ${escapeHtml(SITE_CONFIG.location.label)}</p>
        <p>${escapeHtml(SITE_CONFIG.description)}</p>
        <div class="actions">
          <a class="button" href="mailto:${escapeHtml(SITE_CONFIG.contact.email)}">CONTACT</a>
          <a class="button secondary" href="${escapeHtml(SITE_CONFIG.resume.path)}">VIEW RESUME</a>
        </div>
      </header>
      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading">CORE TECHNICAL COMPETENCIES</h2>
        <div class="grid">${skillGroups}</div>
      </section>
      <section aria-labelledby="employment-heading">
        <h2 id="employment-heading">CURRENT ASSIGNMENT</h2>
        <article class="data-card">
          <h3>${escapeHtml(SITE_CONFIG.employment.role)}</h3>
          <p>${escapeHtml(SITE_CONFIG.employment.organization)}</p>
        </article>
      </section>
      <section aria-labelledby="education-heading">
        <h2 id="education-heading">EDUCATION & CREDENTIALS</h2>
        <div class="grid compact">${education}</div>
      </section>
      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading">FREQUENTLY REQUESTED INTEL</h2>
        <div class="faq-list">${faq}</div>
      </section>`,
  });
}

function projectsPage(): string {
  const projectsUrl = absoluteUrl('/projects/');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${projectsUrl}#webpage`,
    url: projectsUrl,
    name: `Projects by ${SITE_CONFIG.identity.name}`,
    description: 'Case studies covering ERP, commerce, POS, logistics, productivity, community, and broadcast automation systems.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: QUESTS_DATA.map((quest, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(projectRoute(quest)),
        name: quest.title,
      })),
    },
    inLanguage: SITE_CONFIG.language,
  };
  const cards = QUESTS_DATA.map((quest) => `
    <article class="quest-card">
      <div class="quest-meta"><span>${escapeHtml(quest.type)}</span><span>${escapeHtml(quest.status)}</span></div>
      <h2><a href="${projectRoute(quest)}">${escapeHtml(quest.title)}</a></h2>
      <p>${escapeHtml(quest.caseStudySummary)}</p>
      <p class="tags">${quest.techStack.slice(0, 7).map((tech) => `<span>${escapeHtml(tech)}</span>`).join('')}</p>
      <a class="text-link" href="${projectRoute(quest)}">OPEN CASE STUDY →</a>
    </article>`).join('');

  return staticPage({
    title: `Projects | ${SITE_CONFIG.identity.name}, Full-Stack Developer`,
    description: 'Full-stack project case studies covering ERP, commerce, POS, logistics, productivity, community platforms, and broadcast automation.',
    canonicalPath: '/projects/',
    eyebrow: 'QUEST LOG // DEPLOYED SYSTEMS',
    schema,
    body: `
      <header class="hero">
        <p class="status">${QUESTS_DATA.length} MISSION FILES FOUND</p>
        <h1>PROJECT CASE STUDIES</h1>
        <p class="lead">Selected systems engineered by ${escapeHtml(SITE_CONFIG.identity.name)}.</p>
      </header>
      <section class="project-list" aria-label="Project case studies">${cards}</section>`,
  });
}

function projectSchema(quest: Quest): JsonLd {
  const url = absoluteUrl(projectRoute(quest));
  const work: JsonLd = {
    '@type': quest.githubUrl ? 'SoftwareSourceCode' : 'CreativeWork',
    '@id': `${url}#project`,
    url,
    name: quest.title,
    headline: quest.seoTitle,
    description: quest.seoDescription,
    abstract: quest.caseStudySummary,
    image: absoluteUrl(quest.imagePath),
    dateModified: quest.dateModified,
    author: { '@id': `${SITE_CONFIG.domain}/#person` },
    creator: { '@id': `${SITE_CONFIG.domain}/#person` },
    about: quest.techStack,
    inLanguage: SITE_CONFIG.language,
  };
  if (quest.githubUrl) {
    work.codeRepository = quest.githubUrl;
    work.programmingLanguage = quest.techStack;
  }
  if (quest.demoUrl) {
    work.sameAs = quest.demoUrl;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      work,
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: HOME_URL },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: absoluteUrl('/projects/') },
          { '@type': 'ListItem', position: 3, name: quest.title, item: url },
        ],
      },
    ],
  };
}

function projectPage(quest: Quest): string {
  const objectives = quest.objectives.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  const achievements = quest.achievements.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  const externalLinks = [
    quest.demoUrl ? `<a class="button" href="${escapeHtml(quest.demoUrl)}" rel="noopener noreferrer" target="_blank">LAUNCH LIVE SYSTEM ↗</a>` : '',
    quest.githubUrl ? `<a class="button secondary" href="${escapeHtml(quest.githubUrl)}" rel="noopener noreferrer" target="_blank">VIEW SOURCE ↗</a>` : '',
  ].filter(Boolean).join('');

  return staticPage({
    title: quest.seoTitle,
    description: quest.seoDescription,
    canonicalPath: projectRoute(quest),
    eyebrow: 'MISSION DEPLOYMENT DOSSIER',
    type: 'article',
    schema: projectSchema(quest),
    body: `
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">HOME</a> / <a href="/projects/">PROJECTS</a> / <span>${escapeHtml(quest.title)}</span>
      </nav>
      <article>
        <header class="hero">
          <p class="status">${escapeHtml(quest.status)} // ${escapeHtml(quest.type)}</p>
          <h1>${escapeHtml(quest.title)}</h1>
          <p class="lead">${escapeHtml(quest.caseStudySummary)}</p>
          <dl class="facts">
            <div><dt>ROLE</dt><dd>${escapeHtml(quest.role)}</dd></div>
            <div><dt>ORGANIZATION</dt><dd>${escapeHtml(quest.organization)}</dd></div>
            <div><dt>LOCATION</dt><dd>${escapeHtml(quest.location)}</dd></div>
            <div><dt>STATUS</dt><dd>${escapeHtml(quest.status)}</dd></div>
          </dl>
        </header>
        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading">MISSION SUMMARY</h2>
          <p>${escapeHtml(quest.summary)}</p>
        </section>
        <div class="two-column">
          <section aria-labelledby="objectives-heading">
            <h2 id="objectives-heading">OBJECTIVES</h2>
            <ul class="check-list">${objectives}</ul>
          </section>
          <section aria-labelledby="impact-heading">
            <h2 id="impact-heading">IMPACT & ACHIEVEMENTS</h2>
            <ul class="star-list">${achievements}</ul>
          </section>
        </div>
        <section aria-labelledby="stack-heading">
          <h2 id="stack-heading">TECH STACK & LOOT</h2>
          <p class="tags">${quest.techStack.map((tech) => `<span>${escapeHtml(tech)}</span>`).join('')}</p>
        </section>
        ${externalLinks ? `<div class="actions">${externalLinks}</div>` : ''}
      </article>`,
  });
}

function notFoundPage(): string {
  return staticPage({
    title: `404 — Signal Lost | ${SITE_CONFIG.identity.name}`,
    description: 'The requested portfolio transmission could not be located.',
    canonicalPath: '/404.html',
    eyebrow: 'ROBCO NETWORK ERROR // 404',
    robots: 'noindex, follow',
    body: `
      <section class="hero error-page">
        <p class="status">SIGNAL LOST</p>
        <h1>TRANSMISSION NOT FOUND</h1>
        <p class="lead">The requested Vault-Tec record does not exist or has moved.</p>
        <div class="actions"><a class="button" href="/">RETURN TO PROFILE</a><a class="button secondary" href="/projects/">OPEN QUEST LOG</a></div>
      </section>`,
  });
}

function replaceExactlyOnce(source: string, pattern: RegExp, replacement: string, label: string): string {
  const matches = source.match(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`));
  if (matches?.length !== 1) {
    throw new Error(`Expected exactly one ${label} in dist/index.html; found ${matches?.length ?? 0}.`);
  }
  return source.replace(pattern, replacement);
}

function replaceMeta(source: string, attribute: 'name' | 'property', key: string, value: string): string {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(<meta\\s+${attribute}="${escapedKey}"\\s+content=")[^"]*("\\s*/?>)`, 'i');
  return replaceExactlyOnce(source, pattern, `$1${escapeHtml(value)}$2`, `${attribute}="${key}" metadata`);
}

function homeNoscript(): string {
  const technologies = unique(QUESTS_DATA.flatMap((quest) => quest.techStack)).slice(0, 16);
  return `<noscript>
      <main style="padding: 32px; font-family: sans-serif; max-width: 900px; margin: 0 auto; line-height: 1.6; background-color: #030804; color: #1aff80;">
        <header>
          <h1>${escapeHtml(SITE_CONFIG.identity.name)} — ${escapeHtml(SITE_CONFIG.role)}</h1>
          <p><strong>Location:</strong> ${escapeHtml(SITE_CONFIG.location.label)} | <strong>Contact:</strong> <a href="mailto:${escapeHtml(SITE_CONFIG.contact.email)}" style="color: #50ff9c;">${escapeHtml(SITE_CONFIG.contact.email)}</a> | ${escapeHtml(SITE_CONFIG.contact.phone)}</p>
          <p>${escapeHtml(SITE_CONFIG.description)}</p>
        </header>
        <section>
          <h2>Current Assignment</h2>
          <p>${escapeHtml(SITE_CONFIG.employment.role)} — ${escapeHtml(SITE_CONFIG.employment.organization)}</p>
        </section>
        <section>
          <h2>Core Technologies</h2>
          <p>${technologies.map(escapeHtml).join(', ')}.</p>
        </section>
        <nav aria-label="Portfolio pages">
          <a href="/about/" style="color: #50ff9c;">About</a> |
          <a href="/projects/" style="color: #50ff9c;">Project case studies</a> |
          <a href="${escapeHtml(SITE_CONFIG.resume.path)}" style="color: #50ff9c;">Resume</a> |
          <a href="${escapeHtml(SITE_CONFIG.social.github)}" style="color: #50ff9c;">GitHub</a>
        </nav>
      </main>
    </noscript>`;
}

async function postProcessHomepage(): Promise<void> {
  const indexPath = path.join(DIST_DIR, 'index.html');
  let html = await readFile(indexPath, 'utf8');
  html = replaceExactlyOnce(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(SITE_CONFIG.seo.homeTitle)}</title>`, 'title');
  html = replaceMeta(html, 'name', 'title', SITE_CONFIG.seo.homeTitle);
  html = replaceMeta(html, 'name', 'description', SITE_CONFIG.seo.homeDescription);
  html = replaceMeta(html, 'property', 'og:url', HOME_URL);
  html = replaceMeta(html, 'property', 'og:title', SITE_CONFIG.seo.homeTitle);
  html = replaceMeta(html, 'property', 'og:description', SITE_CONFIG.seo.homeDescription);
  html = replaceMeta(html, 'property', 'og:image', OG_IMAGE_URL);
  html = replaceMeta(html, 'property', 'og:image:width', String(SITE_CONFIG.seo.ogImageWidth));
  html = replaceMeta(html, 'property', 'og:image:height', String(SITE_CONFIG.seo.ogImageHeight));
  html = replaceMeta(html, 'property', 'og:image:type', 'image/png');
  html = replaceMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = replaceMeta(html, 'name', 'twitter:url', HOME_URL);
  html = replaceMeta(html, 'name', 'twitter:title', SITE_CONFIG.seo.homeTitle);
  html = replaceMeta(html, 'name', 'twitter:description', SITE_CONFIG.seo.homeDescription);
  html = replaceMeta(html, 'name', 'twitter:image', OG_IMAGE_URL);
  html = replaceExactlyOnce(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${HOME_URL}" />`,
    'canonical link',
  );
  html = replaceExactlyOnce(
    html,
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${jsonLd(homeSchema())}\n    </script>`,
    'JSON-LD script',
  );
  html = replaceExactlyOnce(html, /<noscript>[\s\S]*?<\/noscript>/i, homeNoscript(), 'noscript fallback');
  await writeFile(indexPath, html);
}

function sitemapXml(): string {
  const routes = [
    { path: '/', lastModified: SITE_CONFIG.seo.lastModified },
    { path: '/about/', lastModified: SITE_CONFIG.seo.lastModified },
    { path: '/projects/', lastModified: QUESTS_DATA.map((quest) => quest.dateModified).sort().at(-1)! },
    ...QUESTS_DATA.map((quest) => ({ path: projectRoute(quest), lastModified: quest.dateModified })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${escapeXml(absoluteUrl(route.path))}</loc><lastmod>${route.lastModified}</lastmod></url>`).join('\n')}
</urlset>
`;
}

function robotsTxt(): string {
  const crawlers = [
    '*',
    'OAI-SearchBot',
    'ChatGPT-User',
    'GPTBot',
    'PerplexityBot',
    'ClaudeBot',
    'Google-Extended',
    'Applebot-Extended',
    'Amazonbot',
    'Meta-ExternalAgent',
    'Bytespider',
  ];
  return `${crawlers.map((crawler) => `User-agent: ${crawler}\nAllow: /`).join('\n\n')}\n\nSitemap: ${SITE_CONFIG.domain}/sitemap.xml\n`;
}

function llmsTxt(): string {
  const projects = QUESTS_DATA.map((quest) => `- [${quest.title}](${absoluteUrl(projectRoute(quest))}): ${quest.caseStudySummary}`).join('\n');
  const technologies = unique(QUESTS_DATA.flatMap((quest) => quest.techStack)).join(', ');
  return `# ${SITE_CONFIG.identity.name} — ${SITE_CONFIG.role}

> Official machine-readable overview of ${SITE_CONFIG.identity.name}'s portfolio.

## Profile

- Canonical profile: ${HOME_URL}
- About: ${absoluteUrl('/about/')}
- Projects: ${absoluteUrl('/projects/')}
- Location: ${SITE_CONFIG.location.label}
- Email: ${SITE_CONFIG.contact.email}
- Phone: ${SITE_CONFIG.contact.phone}
- GitHub: ${SITE_CONFIG.social.github}
- Resume: ${RESUME_URL}

${SITE_CONFIG.description}

## Project case studies

${projects}

## Technologies represented in the project data

${technologies}

## Citation guidance

Use the canonical profile or relevant project case-study URL when citing this portfolio. Do not infer employment dates or claims that are not present on those pages.
`;
}

function manifest(): string {
  return `${JSON.stringify({
    name: `${SITE_CONFIG.identity.name} - ${SITE_CONFIG.role}`,
    short_name: SITE_CONFIG.identity.name,
    description: SITE_CONFIG.seo.homeDescription,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#030804',
    theme_color: '#1aff80',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
  }, null, 2)}\n`;
}

const generatedPublicFiles = (): Record<string, string> => ({
  'robots.txt': robotsTxt(),
  'sitemap.xml': sitemapXml(),
  'llms.txt': llmsTxt(),
  'manifest.webmanifest': manifest(),
});

function extractExactlyOnce(source: string, pattern: RegExp, label: string): string {
  const matches = [...source.matchAll(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`))];
  if (matches.length !== 1 || matches[0][1] === undefined) {
    throw new Error(`Expected exactly one ${label}; found ${matches.length}.`);
  }
  return matches[0][1];
}

function parseJsonLdScripts(html: string, label: string): JsonLd[] {
  const scripts = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (scripts.length === 0) throw new Error(`${label} must contain JSON-LD.`);
  return scripts.map((match, index) => {
    try {
      return JSON.parse(match[1]) as JsonLd;
    } catch {
      throw new Error(`${label} contains invalid JSON-LD script ${index + 1}.`);
    }
  });
}

function schemaNodes(schema: JsonLd): JsonLd[] {
  const graph = schema['@graph'];
  return Array.isArray(graph) ? graph as JsonLd[] : [schema];
}

async function validateSourceIndex(): Promise<void> {
  const html = await readFile(path.join(ROOT_DIR, 'index.html'), 'utf8');
  const expected: Array<[string, string, RegExp]> = [
    ['html lang', SITE_CONFIG.language, /<html\s+lang="([^"]+)"/i],
    ['title', SITE_CONFIG.seo.homeTitle, /<title>([\s\S]*?)<\/title>/i],
    ['description', SITE_CONFIG.seo.homeDescription, /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i],
    ['canonical', HOME_URL, /<link\s+rel="canonical"\s+href="([^"]*)"\s*\/?>/i],
    ['Open Graph URL', HOME_URL, /<meta\s+property="og:url"\s+content="([^"]*)"\s*\/?>/i],
    ['Open Graph image', OG_IMAGE_URL, /<meta\s+property="og:image"\s+content="([^"]*)"\s*\/?>/i],
  ];
  for (const [label, value, pattern] of expected) {
    if (extractExactlyOnce(html, pattern, `source index ${label}`) !== value) {
      throw new Error(`Source index ${label} has drifted from SITE_CONFIG.`);
    }
  }

  const sourceNoscript = extractExactlyOnce(html, /(<noscript>[\s\S]*?<\/noscript>)/i, 'source index noscript fallback');
  if (sourceNoscript !== homeNoscript()) {
    throw new Error('Source index noscript fallback has drifted from SITE_CONFIG or portfolio data.');
  }

  const nodes = parseJsonLdScripts(html, 'Source index').flatMap(schemaNodes);
  const person = nodes.find((node) => node['@type'] === 'Person');
  const website = nodes.find((node) => node['@type'] === 'WebSite');
  if (!person || !website) throw new Error('Source index schema must contain Person and WebSite nodes.');
  const worksFor = person.worksFor as JsonLd | undefined;
  const occupation = person.hasOccupation as JsonLd | undefined;
  const sameAs = person.sameAs as unknown;
  if (
    person.name !== SITE_CONFIG.identity.name
    || person.jobTitle !== SITE_CONFIG.role
    || person.url !== HOME_URL
    || person.email !== `mailto:${SITE_CONFIG.contact.email}`
    || person.image !== OG_IMAGE_URL
    || !Array.isArray(sameAs) || !sameAs.includes(SITE_CONFIG.social.github)
    || worksFor?.name !== SITE_CONFIG.employment.organization
    || occupation?.name !== SITE_CONFIG.employment.role
    || website.inLanguage !== SITE_CONFIG.language
  ) {
    throw new Error('Source index JSON-LD key values have drifted from SITE_CONFIG.');
  }
}

async function validatePublicDrift(): Promise<void> {
  for (const [file, expected] of Object.entries(generatedPublicFiles())) {
    const actual = await readFile(path.join(PUBLIC_DIR, file), 'utf8');
    if (actual !== expected) {
      throw new Error(`public/${file} has drifted from generated SEO content.`);
    }
  }
}

async function writeRoute(route: string, html: string): Promise<void> {
  const routeDir = path.resolve(DIST_DIR, `.${route}`);
  const relative = path.relative(DIST_DIR, routeDir);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Route resolves outside dist/: "${route}".`);
  }
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), html);
}

async function verifyGeneratedOutput(): Promise<void> {
  const expectedRoutes = ['/', '/about/', '/projects/', ...QUESTS_DATA.map(projectRoute)];
  const expectedFiles = [
    'index.html',
    '404.html',
    'seo.css',
    'sitemap.xml',
    'robots.txt',
    'llms.txt',
    'manifest.webmanifest',
    'favicon.svg',
    SITE_CONFIG.resume.path.slice(1),
    SITE_CONFIG.seo.ogImagePath.slice(1),
    ...expectedRoutes.slice(1).map((route) => `${route.slice(1)}index.html`),
  ];
  await Promise.all(expectedFiles.map(async (file) => {
    try {
      await access(path.join(DIST_DIR, file));
    } catch {
      throw new Error(`Generated SEO artifact is missing: dist/${file}`);
    }
  }));

  const routeDocuments = await Promise.all(expectedRoutes.map(async (route) => ({
    route,
    html: await readFile(path.join(DIST_DIR, route === '/' ? 'index.html' : `${route.slice(1)}index.html`), 'utf8'),
  })));
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const canonicals = new Set<string>();
  for (const { route, html } of routeDocuments) {
    const label = `Generated route ${route}`;
    if ((html.match(/<h1\b/gi) ?? []).length !== 1) throw new Error(`${label} must contain exactly one h1.`);
    if (extractExactlyOnce(html, /<html\s+lang="([^"]+)"/i, `${label} lang`) !== SITE_CONFIG.language) {
      throw new Error(`${label} must use SITE_CONFIG.language.`);
    }
    const title = extractExactlyOnce(html, /<title>([\s\S]*?)<\/title>/i, `${label} title`);
    const description = extractExactlyOnce(html, /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i, `${label} description`);
    const canonical = extractExactlyOnce(html, /<link\s+rel="canonical"\s+href="([^"]*)"\s*\/?>/i, `${label} canonical`);
    if (canonical !== absoluteUrl(route)) throw new Error(`${label} has an incorrect canonical URL.`);
    if (titles.has(title) || descriptions.has(description) || canonicals.has(canonical)) {
      throw new Error(`${label} has duplicate title, description, or canonical metadata.`);
    }
    titles.add(title);
    descriptions.add(description);
    canonicals.add(canonical);
    parseJsonLdScripts(html, label);
  }

  const home = routeDocuments[0].html;
  if (home.includes('FAQPage') || !home.includes(SITE_CONFIG.seo.homeTitle) || !home.includes(OG_IMAGE_URL)) {
    throw new Error('Generated homepage metadata or JSON-LD is inconsistent.');
  }

  const about = await readFile(path.join(DIST_DIR, 'about/index.html'), 'utf8');
  if (!about.includes('FAQPage') || !about.includes(FAQ_ITEMS[0].question)) {
    throw new Error('About FAQ must be visible and represented in JSON-LD.');
  }

  const sitemap = await readFile(path.join(DIST_DIR, 'sitemap.xml'), 'utf8');
  for (const route of expectedRoutes) {
    if (!sitemap.includes(`<loc>${escapeXml(absoluteUrl(route))}</loc>`)) {
      throw new Error(`Sitemap is missing ${route}.`);
    }
  }

  const robots = await readFile(path.join(DIST_DIR, 'robots.txt'), 'utf8');
  if (!robots.includes('User-agent: OAI-SearchBot')) {
    throw new Error('robots.txt is missing OAI-SearchBot.');
  }

  const notFound = await readFile(path.join(DIST_DIR, '404.html'), 'utf8');
  if (!notFound.includes('noindex, follow')) {
    throw new Error('404.html must be noindex, follow.');
  }

  for (const [file, expected] of Object.entries(generatedPublicFiles())) {
    const actual = await readFile(path.join(DIST_DIR, file), 'utf8');
    if (actual !== expected) throw new Error(`dist/${file} differs from generated content.`);
  }
}

async function generate(): Promise<void> {
  await validateInputs();
  await validateSourceIndex();
  await validatePublicDrift();
  if (CHECK_ONLY) {
    console.log(`SEO source and public drift validation passed for ${QUESTS_DATA.length} projects.`);
    return;
  }

  await access(path.join(DIST_DIR, 'index.html'));
  await postProcessHomepage();
  await writeRoute('/about/', aboutPage());
  await writeRoute('/projects/', projectsPage());
  await Promise.all(QUESTS_DATA.map((quest) => writeRoute(projectRoute(quest), projectPage(quest))));
  await writeFile(path.join(DIST_DIR, '404.html'), notFoundPage());
  await Promise.all(Object.entries(generatedPublicFiles()).map(([file, content]) => writeFile(path.join(DIST_DIR, file), content)));
  await verifyGeneratedOutput();
  console.log(`Generated and verified SEO output for ${QUESTS_DATA.length + 3} indexable routes.`);
}

generate().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
